import type { Handler, HandlerEvent } from "@netlify/functions";
import { dedupKey, markAlerted } from "./_shared/leadDedup";
import { sendWhatsAppAlert } from "./_shared/whatsapp";
import { storeDeadLetter } from "./_shared/leadDeadLetter";

// Synchronous backup notifier. The forms call this directly (keepalive) at the
// same time they POST to Netlify Forms, so a lead is delivered even if Netlify
// drops or spam-files the submission and never fires submission-created.
// Delivers the same three channels as submission-created: Google Sheets, email
// (Resend), and WhatsApp (CallMeBot). Writes a dedup marker on a successful
// alert so submission-created won't notify Carlos a second time.
//
// Env vars (Netlify → Site settings → Environment variables):
//   GOOGLE_SHEETS_WEBHOOK_URL — Apps Script web app URL
//   RESEND_API_KEY            — Resend API key for email
//   CALLMEBOT_APIKEY          — CallMeBot API key for WhatsApp
const SHEET_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK_URL ?? "";
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const CALLMEBOT_KEY = process.env.CALLMEBOT_APIKEY ?? "";
const TO_EMAIL = "contact@carlosre.com";
const FROM_EMAIL = process.env.RESEND_FROM ?? "leads@homesprofessional.com";

interface LeadPayload {
  name?: string;
  licenseeName?: string;
  agentName?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  propertyAddress?: string;
  city?: string;
  timeline?: string;
  message?: string;
  sourcePage?: string;
  leadSource?: string;
}

interface NormalizedLead {
  name: string;
  email: string;
  phone: string;
  propertyAddress: string;
  city: string;
  timeline: string;
  message: string;
  sourcePage: string;
  leadSource: string;
}

function normalize(p: LeadPayload): NormalizedLead {
  return {
    name: p.name || p.licenseeName || p.agentName || "",
    email: (p.email || "").trim(),
    phone: p.phone || p.whatsapp || "",
    propertyAddress: p.propertyAddress || "",
    city: p.city || "",
    timeline: p.timeline || "",
    message: p.message || "",
    sourcePage: p.sourcePage || "homesprofessional.com",
    leadSource: p.leadSource || "",
  };
}

function buildWhatsAppMessage(l: NormalizedLead): string {
  return [
    "🏠 *New Lead — HomesProfessional.com*",
    "",
    `👤 *${l.name || "—"}*`,
    `📞 ${l.phone || "—"}`,
    `📧 ${l.email || "—"}`,
    `📍 ${l.propertyAddress}${l.city ? ", " + l.city : ""}`,
    `⏱ ${l.timeline || "—"}`,
    l.message ? `💬 ${l.message.slice(0, 200)}` : "",
    "",
    `_Via: ${l.sourcePage}_`,
    l.leadSource ? `📊 Source: ${l.leadSource}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export const handler: Handler = async (event: HandlerEvent) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "https://homesprofessional.com",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let raw: LeadPayload;
  try {
    raw = JSON.parse(event.body ?? "{}");
  } catch {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const lead = normalize(raw);

  // Need at least one way to reach the lead, otherwise there's nothing to alert.
  if (!lead.email.includes("@") && !lead.phone) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Missing email and phone" }) };
  }

  const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  const results: Record<string, string> = {};
  const alertKey = dedupKey(lead.email, lead.phone);
  let alerted = false; // true once an actual alert (email/WhatsApp) reaches Carlos

  // ── 1. Google Sheets via Apps Script webhook ────────────────────────────
  if (SHEET_WEBHOOK) {
    try {
      const res = await fetch(SHEET_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp,
          formType: lead.sourcePage,
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          propertyAddress: lead.propertyAddress,
          city: lead.city,
          timeline: lead.timeline,
          message: lead.message,
          sourcePage: lead.sourcePage,
          leadSource: lead.leadSource,
          via: "lead-notify-backup",
        }),
      });
      results.sheets = res.ok ? "ok" : `error ${res.status}`;
      // Mark the Sheets channel so submission-created doesn't write a 2nd row.
      if (res.ok) await markAlerted(alertKey, "sheets");
    } catch (err) {
      results.sheets = `failed: ${err instanceof Error ? err.message : "unknown"}`;
    }
  } else {
    results.sheets = "not configured";
  }

  // ── 2. Email notification via Resend ────────────────────────────────────
  if (RESEND_API_KEY) {
    const text = [
      "New lead from HomesProfessional.com (backup notifier)",
      "",
      `Source: ${lead.sourcePage}`,
      `Received: ${timestamp} ET`,
      "",
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Phone: ${lead.phone}`,
      `Property / Location: ${lead.propertyAddress}${lead.city ? ", " + lead.city : ""}`,
      `Timeline / Type: ${lead.timeline}`,
      `Message: ${lead.message}`,
      lead.leadSource ? `\n📊 Lead Source: ${lead.leadSource}` : "",
      "",
      "---",
      "Carlos Uzcategui · FL SL705771 · United Realty Group",
    ].join("\n");
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: TO_EMAIL,
          subject: `New Lead: ${lead.sourcePage} — HomesProfessional.com`,
          text,
        }),
      });
      results.email = res.ok ? "ok" : `error ${res.status}`;
      if (res.ok) alerted = true;
      else console.error("lead-notify Resend error:", res.status, await res.text());
    } catch (err) {
      results.email = `failed: ${err instanceof Error ? err.message : "unknown"}`;
    }
  } else {
    results.email = "not configured";
  }

  // ── 3. WhatsApp notification via CallMeBot ──────────────────────────────
  // CallMeBot returns HTTP 200 even on rejection, so sendWhatsAppAlert inspects
  // the body and reports the true outcome (logged for diagnosis).
  const wa = await sendWhatsAppAlert(buildWhatsAppMessage(lead), CALLMEBOT_KEY);
  results.whatsapp = wa.detail;
  if (wa.ok) alerted = true;
  else if (CALLMEBOT_KEY) console.error("lead-notify CallMeBot:", wa.detail);

  // Only suppress the primary path's alert if one actually reached Carlos.
  if (alerted) {
    await markAlerted(alertKey, "alert");
  }

  // If nothing reached Carlos and the Sheets row wasn't written either, the
  // lead would otherwise only exist in these logs — preserve it.
  if (!alerted && results.sheets !== "ok") {
    await storeDeadLetter("lead-notify", { ...lead, results });
    results.deadLetter = "stored";
  }

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ success: true, alerted, results }),
  };
};
