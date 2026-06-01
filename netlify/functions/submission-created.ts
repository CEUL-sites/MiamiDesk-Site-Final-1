import type { Handler, HandlerEvent } from "@netlify/functions";

const GOOGLE_SHEETS_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CALLMEBOT_APIKEY = process.env.CALLMEBOT_APIKEY;
const NOTIFY_PHONE = "19548656622";
const TO_EMAIL = "contact@carlosre.com";
const FROM_EMAIL = "leads@homesprofessional.com";

export const handler: Handler = async (event: HandlerEvent) => {
  try {
    const body = JSON.parse(event.body || "{}");
    const payload = body.payload || body;   // Netlify wraps event data in { payload: {...} }
    const fields = payload.data || {};
    const formName = fields["form-name"] || payload.form_name || "unknown";
    const timestamp = new Date().toISOString();
    const name = fields.name || fields.licenseeName || "";
    const email = fields.email || "";
    const phone = fields.phone || fields.preferredContact || "";
    const propertyAddress = fields.propertyAddress || fields.targetNeighborhoods || "";
    const city = fields.city || fields.country || "";
    const timeline = fields.timeline || fields.referralType || "";
    const message = fields.message || fields.clientSummary || fields.valueBand || "";
    const sourcePage = formName;

    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ timestamp, name, email, phone, propertyAddress, city, timeline, message, sourcePage }),
        });
      } catch (sheetErr) {
        console.error("Google Sheets error:", sheetErr);
      }
    } else {
      console.error("GOOGLE_SHEETS_WEBHOOK_URL is not set.");
    }

    if (RESEND_API_KEY) {
      const emailBody = `New lead from HomesProfessional.com\n\nForm: ${formName}\nReceived: ${timestamp}\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nProperty Address: ${propertyAddress}\nCity: ${city}\nTimeline: ${timeline}\nMessage: ${message}\n\n---\nCarlos Uzcategui · FL SL705771 · United Realty Group\nHomesProfessional.com`;
      try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
          body: JSON.stringify({ from: FROM_EMAIL, to: TO_EMAIL, subject: `New Lead: ${formName} — HomesProfessional.com`, text: emailBody }),
        });
        if (!resendResponse.ok) console.error("Resend error:", await resendResponse.text());
      } catch (emailErr) {
        console.error("Email send error:", emailErr);
      }
    } else {
      console.error("RESEND_API_KEY is not set.");
    }

    // ── WhatsApp notification via CallMeBot ──────────────────────────────
    if (CALLMEBOT_APIKEY) {
      try {
        const msg = encodeURIComponent(
          `🏠 New Lead — HomesProfessional.com\n\n👤 ${name || "—"}\n📞 ${phone || "—"}\n📧 ${email || "—"}\n📍 ${propertyAddress}${city ? ", " + city : ""}\n⏱ ${timeline || "—"}\n💬 ${message || "—"}\n\nVia: ${sourcePage}`
        );
        await fetch(`https://api.callmebot.com/whatsapp.php?phone=${NOTIFY_PHONE}&text=${msg}&apikey=${CALLMEBOT_APIKEY}`);
      } catch (waErr) {
        console.error("WhatsApp notification error:", waErr);
      }
    }

    return { statusCode: 200, body: "OK" };
  } catch (err) {
    console.error("submission-created fatal error:", err);
    return { statusCode: 200, body: "OK" };
  }
};
