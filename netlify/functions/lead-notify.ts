import type { Handler, HandlerEvent } from "@netlify/functions";
import { dedupKey, markAlerted } from "./_shared/leadDedup";
import { sendWhatsAppAlert } from "./_shared/whatsapp";
import { storeDeadLetter } from "./_shared/leadDeadLetter";
import { corsHeaders as buildCorsHeaders, isForbiddenOrigin, rateLimit } from "./_shared/requestGuard";
import { scoreLead, formatLeadWhatsApp, formatLeadEmail, formatLeadEmailSubject } from "./_shared/leadScore";

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
  desk?: string;
  botField?: string;
  formRenderedAt?: string;
  // Lead-triage signals — see _shared/leadScore.ts. formName is the Netlify
  // form-name and is distinct from sourcePage (the page the form sat on).
  formName?: string;
  valueBand?: string;
  occupancy?: string;
  placeId?: string;
  messagingConsent?: string;
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
  desk: string;
  formName: string;
  valueBand: string;
  occupancy: string;
  placeId: string;
  messagingConsent: string;
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
    desk: p.desk || "",
    // Fall back to sourcePage so older cached bundles — which POST without
    // formName — still score on their best available signal instead of
    // dropping to the unknown-form bucket.
    formName: p.formName || p.sourcePage || "",
    valueBand: p.valueBand || "",
    occupancy: p.occupancy || "",
    placeId: p.placeId || "",
    messagingConsent: p.messagingConsent || "",
  };
}

export const handler: Handler = async (event: HandlerEvent) => {
  const corsHeaders = buildCorsHeaders(event);

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  // This endpoint is publicly reachable by URL (it's a fetch target baked into
  // the client bundle, not a Netlify Forms submission), so unlike the forms
  // themselves it gets none of Netlify's own bot filtering for free. Reject
  // requests spoofing a foreign Origin, throttle by IP, and re-run the same
  // honeypot + submit-time heuristic submission-created.ts applies.
  if (isForbiddenOrigin(event)) {
    return { statusCode: 403, headers: corsHeaders, body: JSON.stringify({ error: "Forbidden origin." }) };
  }

  const retryAfter = rateLimit(event, "lead-notify", 5, 10 * 60_000);
  if (retryAfter !== null) {
    return {
      statusCode: 429,
      headers: { ...corsHeaders, "Retry-After": String(retryAfter) },
      body: JSON.stringify({ error: "Too many requests." }),
    };
  }

  let raw: LeadPayload;
  try {
    raw = JSON.parse(event.body ?? "{}");
  } catch {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const honeypot = (raw.botField || "").trim();
  const renderedAt = Number(raw.formRenderedAt || 0);
  const tooFast = renderedAt > 0 && Date.now() - renderedAt < 1500;
  if (honeypot !== "" || !renderedAt || tooFast) {
    console.log("lead-notify: rejected as spam", { honeypotFilled: honeypot !== "", hasTimestamp: !!renderedAt, tooFast });
    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ success: true }) };
  }

  const lead = normalize(raw);

  // Need at least one way to reach the lead, otherwise there's nothing to alert.
  if (!lead.email.includes("@") && !lead.phone) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Missing email and phone" }) };
  }

  const scored = scoreLead(lead);
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
          desk: lead.desk,
          // Priority columns so the sheet can be sorted by what to work first.
          tier: scored.tier,
          score: scored.score,
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
    const text = formatLeadEmail(lead, scored, {
      timestamp,
      via: "backup notifier (lead-notify)",
    });
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: TO_EMAIL,
          subject: formatLeadEmailSubject(lead, scored),
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
  const wa = await sendWhatsAppAlert(formatLeadWhatsApp(lead, scored), CALLMEBOT_KEY);
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
    body: JSON.stringify({ success: true, alerted, tier: scored.tier, score: scored.score, results }),
  };
};
