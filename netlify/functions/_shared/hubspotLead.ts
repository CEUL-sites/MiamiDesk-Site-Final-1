import { createHash } from "node:crypto";
import { getStore } from "@netlify/blobs";
import { storeDeadLetter } from "./leadDeadLetter";

type Fields = Record<string, string>;
interface Lead { name?: string; email?: string; phone?: string; formName?: string; formRenderedAt?: string; sourcePage?: string; [key: string]: unknown }
interface Dependencies { fetch?: typeof fetch; store?: ReturnType<typeof getStore>; token?: string; enabled?: boolean; ownerId?: string; deadLetter?: typeof storeDeadLetter }
const API = "https://api.hubapi.com";
const OMIT = new Set(["bot-field", "botField", "lat", "lng"]);
const escape = (v: string) => v.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export function inquiryKey(lead: Lead, fields: Fields): string {
  const identity = String(lead.email || fields.email || lead.phone || fields.phone || fields.whatsapp || "").trim().toLowerCase();
  const form = String(lead.formName || fields["form-name"] || "unknown");
  // A timestamp shared by both paths identifies this form instance. Older
  // cached forms fall back to the existing 30-minute deduplication window.
  const instance = String(fields.formRenderedAt || lead.formRenderedAt || Math.floor(Date.now() / 1_800_000));
  const detail = ["propertyAddress", "location", "targetNeighborhoods", "message", "priorListing", "clientSummary", "timeline", "priceRange", "propertyCount", "listPath"]
    .map(k => fields[k] || "");
  return createHash("sha256").update(JSON.stringify([identity, form, instance, detail])).digest("hex");
}

export function inquiryNote(lead: Lead, fields: Fields, key: string): string {
  const merged = { ...lead, ...fields };
  const lines = Object.entries(merged).filter(([k, v]) => !OMIT.has(k) && typeof v === "string" && v !== "")
    .map(([k, v]) => `${escape(k)}: ${escape(String(v).slice(0, 6000))}`);
  return `<p>HomesProfessional website inquiry</p><p>Inquiry ID: ${key}</p><p>${lines.join("<br>").slice(0, 45000)}</p><p>Inquiry follow-up only. No marketing subscription or workflow enrollment granted by this integration. Consult existing communication restrictions before outreach.</p>`;
}

/** Add an inquiry to CRM without changing existing profile, owner or restrictions. */
export async function syncHubspotLead(lead: Lead, fields: Fields = {}, deps: Dependencies = {}): Promise<string> {
  const enabled = deps.enabled ?? process.env.HUBSPOT_SYNC_ENABLED === "true";
  const token = deps.token ?? process.env.HUBSPOT_ACCESS_TOKEN ?? "";
  if (!enabled) return "disabled";
  const deadLetter = deps.deadLetter ?? storeDeadLetter;
  const email = String(lead.email || fields.email || "").trim().toLowerCase();
  const phone = String(lead.phone || fields.phone || fields.whatsapp || "").trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!validEmail && !phone) return "no contact details";
  if (!token) {
    await deadLetter("hubspot-sync", { lead, fields, reason: "missing server credential" });
    return "not configured";
  }
  const key = inquiryKey(lead, fields);
  let contactId = "";
  let phase = "claim";
  try {
    const store = deps.store ?? getStore({ name: "hubspot-inquiries", consistency: "strong" });
    // Atomic claim prevents the two notifier paths from creating two notes.
    // A claimed but incomplete inquiry needs reconciliation, never blind replay.
    const claimed = await store.setJSON(key, { status: "pending", at: new Date().toISOString(), lead, fields }, { onlyIfNew: true });
    if (!claimed.modified) return "already captured";
    const request = async (path: string, method = "GET", body?: unknown) => {
      const response = await (deps.fetch ?? fetch)(API + path, {
        method, headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        ...(body ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(5000),
      });
      return response;
    };
    phase = "lookup";
    let response: Response;
    if (validEmail) {
      response = await request(`/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email&properties=email`);
      if (response.ok) contactId = String((await response.json()).id);
      else if (response.status !== 404) throw new Error(`lookup HTTP ${response.status}`);
    } else if (/^\+[1-9]\d{6,14}$/.test(phone)) {
      response = await request("/crm/v3/objects/contacts/search", "POST", {
        filterGroups: [{ filters: [{ propertyName: "phone", operator: "EQ", value: phone }] }], limit: 2,
      });
      if (!response.ok) throw new Error(`phone lookup HTTP ${response.status}`);
      const matches = await response.json();
      if (matches.total > 1) throw new Error("ambiguous phone identity");
      if (matches.total === 1) contactId = String(matches.results[0].id);
    }
    if (!contactId) {
      phase = "create contact";
      // A local phone number creates its own contact for this inquiry. Do not
      // guess a country code or merge a different person's national number.
      const properties: Fields = validEmail ? { email } : {};
      // Preserve the supplied full name without guessing which tokens are surnames.
      if (lead.name) properties.firstname = String(lead.name).slice(0, 200);
      if (phone) properties.phone = phone.slice(0, 100);
      const owner = deps.ownerId ?? process.env.HUBSPOT_OWNER_ID;
      if (owner) properties.hubspot_owner_id = owner;
      response = await request("/crm/v3/objects/contacts", "POST", { properties });
      if (response.status === 409 && validEmail) response = await request(`/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email&properties=email`);
      if (!response.ok) throw new Error(`contact HTTP ${response.status}`);
      contactId = String((await response.json()).id);
    }
    if (!/^\d+$/.test(contactId)) throw new Error("invalid contact ID");
    phase = "create note";
    await store.setJSON(key, { status: "pending-note", contactId, at: new Date().toISOString(), lead, fields });
    response = await request("/crm/v3/objects/notes", "POST", {
      properties: { hs_timestamp: new Date().toISOString(), hs_note_body: inquiryNote(lead, fields, key) },
      associations: [{ to: { id: contactId }, types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 }] }],
    });
    if (!response.ok) throw new Error(`note HTTP ${response.status}`);
    const noteId = String((await response.json()).id);
    await store.setJSON(key, { status: "synced", contactId, noteId, at: new Date().toISOString() });
    return "ok";
  } catch (error) {
    // Do not log HubSpot response bodies, credentials or personal information.
    const reason = error instanceof Error ? error.message : "unknown failure";
    console.error("HubSpot inquiry sync needs review:", phase, reason);
    await deadLetter("hubspot-sync", { inquiryId: key, contactId, phase, lead, fields, reason });
    return "needs review";
  }
}
