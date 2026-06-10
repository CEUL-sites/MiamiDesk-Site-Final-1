import type { Handler, HandlerEvent } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { NURTURE_STORE, type NurtureLead } from "./_shared/nurture";

// Seller forms whose leads enter the automated nurture sequence
// (sent by the scheduled seller-nurture function).
const NURTURE_FORMS = new Set(["seller-intake", "seller-hero", "seller-consultation"]);

// Env var names — set these in Netlify → Site settings → Environment variables.
// GOOGLE_SHEETS_WEBHOOK_URL  — Google Apps Script web app URL (doPost webhook)
// RESEND_API_KEY             — Resend API key for email notifications
// CALLMEBOT_APIKEY           — CallMeBot API key for WhatsApp notifications
const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL ?? "";
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const CALLMEBOT_APIKEY = process.env.CALLMEBOT_APIKEY ?? "";
const NOTIFY_PHONE = "19548656622"; // Carlos's WhatsApp — no + or spaces
const TO_EMAIL = "contact@carlosre.com";
const FROM_EMAIL = process.env.RESEND_FROM ?? "leads@homesprofessional.com";

export const handler: Handler = async (event: HandlerEvent) => {
  try {
    const body = JSON.parse(event.body || "{}");
    // Netlify wraps the submission event in { payload: { data: {...}, form_name: "..." } }
    const payload = body.payload || body;
    const fields: Record<string, string> = payload.data || {};

    const formName = payload.form_name || fields["form-name"] || "unknown";
    const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

    // ── Normalised fields (shared across all forms) ──────────────────────
    const name    = fields.name || fields.licenseeName || "";
    const email   = fields.email || "";
    const phone   = fields.phone || "";
    // propertyAddress covers seller/LeadForm; targetNeighborhoods covers buyer form
    const propertyAddress = fields.propertyAddress || fields.targetNeighborhoods || "";
    const city    = fields.city || fields.country || "";
    // timeline covers seller/buyer; referralType covers referral form
    const timeline = fields.timeline || fields.referralType || "";
    // message covers LeadForm; priorListing covers seller; clientSummary covers referral;
    // valueBand covers seller (secondary fallback)
    const message = fields.message || fields.priorListing || fields.clientSummary || fields.valueBand || "";

    // ── Lead source attribution (first-touch UTM / referrer) ─────────────
    // Captured client-side on landing and attached to every submission, so
    // Carlos sees which channel & campaign produced each lead.
    const utmSource   = fields.utm_source || "";
    const utmMedium   = fields.utm_medium || "";
    const utmCampaign = fields.utm_campaign || "";
    const landingPage = fields.landing_page || "";
    const leadSource = [
      utmSource || "direct",
      utmMedium,
      utmCampaign,
    ].filter(Boolean).join(" / ") || "direct";

    // ── Form-specific extra fields (sent to Sheets as readable detail block) ──
    // Capture everything the narrow mapping above would otherwise drop.
    const extraParts: string[] = [];
    const SKIP_KEYS = new Set([
      "bot-field", "form-name", "source", "sourcePage",
      // attribution surfaced separately as leadSource — don't duplicate in dump
      "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
      "gclid", "fbclid", "msclkid", "li_fat_id", "landing_page", "first_seen", "referrer",
    ]);
    for (const [k, v] of Object.entries(fields)) {
      if (!SKIP_KEYS.has(k) && v) {
        extraParts.push(`${k}: ${v}`);
      }
    }
    const fullDetails = extraParts.join(" | ");

    // ── 1. Google Sheets via Apps Script webhook ─────────────────────────
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        const sheetsRes = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp,
            formType: formName,
            name,
            email,
            phone,
            propertyAddress,
            city,
            timeline,
            message,
            details: fullDetails, // full field dump — nothing is discarded
            sourcePage: formName,
            leadSource,            // channel / medium / campaign
            landingPage,
          }),
        });
        if (!sheetsRes.ok) {
          console.error("Google Sheets webhook returned", sheetsRes.status, await sheetsRes.text());
        }
      } catch (sheetErr) {
        console.error("Google Sheets error:", sheetErr);
      }
    } else {
      console.error("GOOGLE_SHEETS_WEBHOOK_URL is not set — submission not logged to Sheets.");
    }

    // ── 2. Email notification via Resend ────────────────────────────────
    if (RESEND_API_KEY) {
      const emailBody = [
        `New lead from HomesProfessional.com`,
        ``,
        `Form: ${formName}`,
        `Received: ${timestamp} ET`,
        ``,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Property / Location: ${propertyAddress}${city ? ", " + city : ""}`,
        `Timeline / Type: ${timeline}`,
        `Message: ${message}`,
        ``,
        `📊 Lead Source: ${leadSource}`,
        landingPage ? `Landing page: ${landingPage}` : "",
        ``,
        `All fields:`,
        fullDetails,
        ``,
        `---`,
        `Carlos Uzcategui · FL SL705771 · United Realty Group`,
        `HomesProfessional.com`,
      ].join("\n");

      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: FROM_EMAIL,
            to: TO_EMAIL,
            subject: `New Lead: ${formName} — HomesProfessional.com`,
            text: emailBody,
          }),
        });
        if (!resendRes.ok) {
          console.error("Resend error:", resendRes.status, await resendRes.text());
        }
      } catch (emailErr) {
        console.error("Email send error:", emailErr);
      }
    } else {
      console.error("RESEND_API_KEY is not set — email notification skipped.");
    }

    // ── 3. WhatsApp notification via CallMeBot ───────────────────────────
    if (CALLMEBOT_APIKEY) {
      const waLines = [
        `🏠 New Lead — HomesProfessional.com`,
        ``,
        `👤 ${name || "—"}`,
        `📞 ${phone || "—"}`,
        `📧 ${email || "—"}`,
        `📍 ${propertyAddress}${city ? ", " + city : ""}`,
        `⏱ ${timeline || "—"}`,
        message ? `💬 ${message.slice(0, 200)}` : "",
        ``,
        `Via: ${formName}`,
        `📊 Source: ${leadSource}`,
      ].filter(Boolean).join("\n");

      try {
        const waUrl = `https://api.callmebot.com/whatsapp.php?phone=${NOTIFY_PHONE}&text=${encodeURIComponent(waLines)}&apikey=${CALLMEBOT_APIKEY}`;
        const waRes = await fetch(waUrl);
        if (!waRes.ok) {
          console.error("CallMeBot WhatsApp error:", waRes.status);
        }
      } catch (waErr) {
        console.error("WhatsApp notification error:", waErr);
      }
    }

    // ── 4. Seller nurture enrollment (Netlify Blobs) ─────────────────────
    // First submission wins — a repeat submission never resets a lead's
    // position in the sequence.
    if (NURTURE_FORMS.has(formName) && email.includes("@")) {
      try {
        const store = getStore(NURTURE_STORE);
        const key = email.trim().toLowerCase();
        const existing = await store.get(key, { type: "json" });
        if (!existing) {
          const lead: NurtureLead = {
            email: key,
            name,
            city,
            timeline,
            formName,
            enrolledAt: new Date().toISOString(),
            stage: 0,
            lastSentAt: null,
            unsubscribed: false,
          };
          await store.setJSON(key, lead);
        }
      } catch (nurtureErr) {
        console.error("Nurture enrollment error:", nurtureErr);
      }
    }

    return { statusCode: 200, body: "OK" };
  } catch (err) {
    console.error("submission-created fatal error:", err);
    // Always return 200 — Netlify retries on non-200 which can cause duplicates
    return { statusCode: 200, body: "OK" };
  }
};
