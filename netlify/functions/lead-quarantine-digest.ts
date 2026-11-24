import type { Handler, HandlerEvent } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { connectBlobs } from "./_shared/connectBlobs";
import { QUARANTINE_STORE } from "./_shared/leadSpam";
import { listReviewInquiries } from "./_shared/hubspotQueue.mjs";

// Daily digest of leads held by the spam screen (_shared/leadSpam.ts).
// Scheduled @daily in netlify.toml. Nothing is ever deleted: a lead stays in
// the `lead-quarantine` Blobs store, and this email lets Carlos spot a real
// one and contact it by hand. It also lists inquiries the HubSpot sync holds for
// review, every day until they are resolved, because those never retry on their
// own. Sends nothing when both lists are empty.

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const FROM_EMAIL = process.env.RESEND_FROM ?? "leads@homesprofessional.com";
const TO_EMAIL = "contact@carlosre.com";
const LOOKBACK_MS = 24 * 60 * 60 * 1000;

type Entry = {
  source: string;
  at: string;
  assessment: { reasons: string[]; weight: number };
  lead: Record<string, string>;
};

type ReviewJob = { form: string; at: string; lastError?: string; fields: Record<string, string> };

export const handler: Handler = async (event: HandlerEvent) => {
  connectBlobs(event);
  const store = getStore(QUARANTINE_STORE);
  const since = Date.now() - LOOKBACK_MS;

  const { blobs } = await store.list();
  const recent = blobs.filter((b) => Date.parse(b.key.split("|")[0]) >= since);
  const entries = (await Promise.all(recent.map((b) => store.get(b.key, { type: "json" })))) as (Entry | null)[];

  // Both lead paths can hold the same submission — show it once.
  const seen = new Set<string>();
  const unique = entries.filter((e): e is Entry => {
    if (!e) return false;
    const id = `${(e.lead.email || "").toLowerCase()}|${(e.lead.phone || "").replace(/\D/g, "")}|${e.lead.name || e.lead.licenseeName || ""}`;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });

  let review: ReviewJob[] = [];
  try {
    review = (await listReviewInquiries()) as ReviewJob[];
  } catch (err) {
    console.error("lead-quarantine-digest: review list unavailable:", err instanceof Error ? err.name : "unknown");
  }

  if ((unique.length === 0 && review.length === 0) || !RESEND_API_KEY) {
    return { statusCode: 200, body: JSON.stringify({ held: unique.length, review: review.length, sent: false }) };
  }

  const reviewLines = review.map((j, i) => [
    `${i + 1}. ${j.fields.name || "(no name)"} — ${j.form}`,
    `   Phone: ${j.fields.phone || "—"} · Email: ${j.fields.email || "—"}`,
    `   Not synced because: ${j.lastError || "unknown"}`,
    `   Received: ${new Date(j.at).toLocaleString("en-US", { timeZone: "America/New_York" })} ET`,
  ].join("\n"));

  const lines = unique.map((e, i) => {
    const l = e.lead;
    return [
      `${i + 1}. ${l.name || l.licenseeName || "(no name)"} — ${l.formName || l.sourcePage || e.source}`,
      `   Phone: ${l.phone || l.whatsapp || "—"} · Email: ${l.email || "—"}`,
      `   Property / Location: ${[l.propertyAddress || l.location, l.city].filter(Boolean).join(", ") || "—"}`,
      `   Held because: ${e.assessment.reasons.join("; ")}`,
      `   Received: ${new Date(e.at).toLocaleString("en-US", { timeZone: "America/New_York" })} ET`,
    ].join("\n");
  });

  const text = [
    ...(review.length
      ? [
          `${review.length} inquiry(ies) are NOT in HubSpot and need your review. They will not retry on their own.`,
          "",
          ...reviewLines,
          "",
        ]
      : []),
    ...(unique.length
      ? [
          `${unique.length} submission(s) were held by the spam screen in the last 24 hours.`,
          "None of them were added to HubSpot, Sheets, the auto-reply or the nurture sequence.",
          "If one is a real person, contact them directly — the full record stays in the lead-quarantine store.",
          "",
          ...lines,
        ]
      : []),
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: review.length
        ? `[Leads] ${review.length} not in HubSpot, review needed (${unique.length} held by spam screen)`
        : `[Spam screen] ${unique.length} submission(s) held — review if needed`,
      text,
    }),
  });
  if (!res.ok) console.error("lead-quarantine-digest Resend error:", res.status, await res.text());

  return { statusCode: 200, body: JSON.stringify({ held: unique.length, review: review.length, sent: res.ok }) };
};
