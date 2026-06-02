import type { Handler, HandlerEvent } from "@netlify/functions";

// Set these in Netlify → Site settings → Environment variables:
// GOOGLE_SHEET_WEBHOOK  — the Apps Script web app URL (see setup guide)
// CALLMEBOT_APIKEY      — your CallMeBot API key (see setup guide)
// Uses the same env var as submission-created.ts — set GOOGLE_SHEETS_WEBHOOK_URL in Netlify dashboard.
const SHEET_WEBHOOK = process.env.GOOGLE_SHEETS_WEBHOOK_URL ?? "";
const CALLMEBOT_KEY = process.env.CALLMEBOT_APIKEY ?? "";
const NOTIFY_PHONE = "19548656622"; // Carlos's WhatsApp — no + or spaces

interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  propertyAddress: string;
  city: string;
  timeline: string;
  message: string;
  sourcePage?: string;
}

function buildWhatsAppMessage(lead: LeadPayload): string {
  const lines = [
    "🏠 *New Lead — HomesProfessional.com*",
    "",
    `👤 *${lead.name}*`,
    `📞 ${lead.phone}`,
    `📧 ${lead.email}`,
    `📍 ${lead.propertyAddress}, ${lead.city}`,
    `⏱ Timeline: ${lead.timeline}`,
    lead.message ? `💬 ${lead.message}` : "",
    "",
    `_Via: ${lead.sourcePage ?? "homesprofessional.com"}_`,
  ].filter((l) => l !== undefined);
  return lines.join("\n");
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

  let lead: LeadPayload;
  try {
    lead = JSON.parse(event.body ?? "{}");
  } catch {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  if (!lead.name || !lead.email || !lead.phone) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: "Missing required fields" }) };
  }

  const results: Record<string, string> = {};

  // ── 1. Google Sheets via Apps Script webhook ────────────────────────────
  if (SHEET_WEBHOOK) {
    try {
      const sheetRes = await fetch(SHEET_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timestamp: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          propertyAddress: lead.propertyAddress ?? "",
          city: lead.city ?? "",
          timeline: lead.timeline ?? "",
          message: lead.message ?? "",
          sourcePage: lead.sourcePage ?? "homesprofessional.com",
        }),
      });
      results.sheets = sheetRes.ok ? "ok" : `error ${sheetRes.status}`;
    } catch (err) {
      results.sheets = `failed: ${err instanceof Error ? err.message : "unknown"}`;
    }
  } else {
    results.sheets = "not configured";
  }

  // ── 2. WhatsApp notification via CallMeBot ──────────────────────────────
  if (CALLMEBOT_KEY) {
    try {
      const text = encodeURIComponent(buildWhatsAppMessage(lead));
      const waUrl = `https://api.callmebot.com/whatsapp.php?phone=${NOTIFY_PHONE}&text=${text}&apikey=${CALLMEBOT_KEY}`;
      const waRes = await fetch(waUrl);
      results.whatsapp = waRes.ok ? "ok" : `error ${waRes.status}`;
    } catch (err) {
      results.whatsapp = `failed: ${err instanceof Error ? err.message : "unknown"}`;
    }
  } else {
    results.whatsapp = "not configured";
  }

  return {
    statusCode: 200,
    headers: corsHeaders,
    body: JSON.stringify({ success: true, results }),
  };
};
