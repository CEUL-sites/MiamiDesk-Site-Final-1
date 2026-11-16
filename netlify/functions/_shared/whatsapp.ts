// Owner alerts for incoming website inquiries.
// CallMeBot is selected when CALLMEBOT_APIKEY is configured. The key must be
// authorized for Carlos's personal US WhatsApp number and the service permits
// only personal use; do not mistake HTTP success for device delivery.
// The optional Meta Cloud sender remains available if CallMeBot is absent.
//
// CallMeBot previously returned HTTP 403 from Netlify. A 2026 bot-number
// migration may require reauthorizing the same phone with the replacement bot.
// Full lead details stay inside HubSpot; CallMeBot receives only the category
// and secure HubSpot record URL. Keep all keys server-side, never in VITE_ vars.
//
// This alert is independent of Resend email and HubSpot task reminders.

const DEFAULT_TO = "+19548656622"; // Carlos's WhatsApp, country code included
const DEFAULT_TEMPLATE = "website_lead_alert";
const DEFAULT_API_VERSION = "v25.0";

export interface OwnerAlert {
  type: string;
  name: string;
  contact: string;
  location: string;
  link: string;
}

export interface WhatsAppResult {
  /** True only when Meta accepted the message for delivery. */
  ok: boolean;
  /** False when the channel is not set up; the caller must not retry. */
  configured: boolean;
  /** Outcome for logs. Never contains the token. */
  detail: string;
}

// Template variables may not contain newlines, tabs, or runs of 4+ spaces,
// and may not be empty.
export const templateText = (value?: string): string =>
  (value || "").replace(/\s+/g, " ").trim().slice(0, 200) || "—";

export function whatsappConfigured(env: Record<string, string | undefined> = process.env): boolean {
  return !!env.CALLMEBOT_APIKEY?.trim() || (!!env.WHATSAPP_CLOUD_TOKEN && !!env.WHATSAPP_PHONE_NUMBER_ID);
}


// CallMeBot accepts a GET request containing an API key in the query string.
// Keep the URL out of logs and never forward customer PII. CallMeBot's free
// offering is labeled personal-use only and may block commercial automation.
export async function sendCallMeBotAlert(
  alert: OwnerAlert,
  env: Record<string, string | undefined> = process.env,
  fetcher: typeof fetch = fetch,
): Promise<WhatsAppResult> {
  const key = env.CALLMEBOT_APIKEY?.trim();
  if (!key) return {ok:false,configured:false,detail:"CallMeBot API key missing"};
  const recipient = (env.WHATSAPP_ALERT_TO || DEFAULT_TO).replace(/\D/g, "");
  if (recipient !== "19548656622") {
    return {ok:false,configured:true,detail:"CallMeBot alert recipient is not Carlos's US WhatsApp"};
  }
  // The personal relay should receive NO name, phone, email, address,
  // property value, or customer message. HubSpot requires authenticated login.
  const type = templateText(alert.type.split(" · ")[0]).slice(0, 65);
  const hubspotLink = /^https:\/\/app\.hubspot\.com\/contacts\/149513532\/contact\/\d+$/.test(alert.link)
    ? alert.link : "https://app.hubspot.com/contacts/149513532/";
  const text = `HomesProfessional new ${type} inquiry. Open in HubSpot: ${hubspotLink}`;
  const params = new URLSearchParams({ phone: "+" + recipient, text, apikey: key });
  try {
    const response = await fetcher(`https://api.callmebot.com/whatsapp.php?${params}`,{
      method:"GET",redirect:"error",signal:AbortSignal.timeout(7000)
    });
    const body = (await response.text().catch(() => "")).slice(0, 500);
    // The documented API returns HTML like "Message queued." on 200; do
    // not treat an unrelated HTTP 200 or an error page as a delivery.
    const ok = response.ok && /message\s+(queued|sent)|sent\s+successfully/i.test(body)
      && !/error|forbidden|invalid|blocked|denied/i.test(body);
    return {ok,configured:true,detail:ok
      ? "queued by CallMeBot; delivery must be checked on device"
      : `CallMeBot rejected alert (HTTP ${response.status}; reauthorization may be required)`};
  } catch(err) {
    return {ok:false,configured:true,detail:`CallMeBot unavailable: ${err instanceof Error ? err.name : "network error"}`};
  }
}

export async function sendWhatsAppAlert(
  alert: OwnerAlert,
  env: Record<string, string | undefined> = process.env,
  fetcher: typeof fetch = fetch,
): Promise<WhatsAppResult> {
  if (env.CALLMEBOT_APIKEY?.trim()) return sendCallMeBotAlert(alert,env,fetcher);
  if (!whatsappConfigured(env)) {
    return { ok: false, configured: false, detail: "not configured (WhatsApp Cloud API settings missing)" };
  }
  const version = env.WHATSAPP_API_VERSION || DEFAULT_API_VERSION;
  const url = `https://graph.facebook.com/${version}/${encodeURIComponent(env.WHATSAPP_PHONE_NUMBER_ID!)}/messages`;
  const body = {
    messaging_product: "whatsapp",
    to: (env.WHATSAPP_ALERT_TO || DEFAULT_TO).replace(/[^\d]/g, ""),
    type: "template",
    template: {
      name: env.WHATSAPP_ALERT_TEMPLATE || DEFAULT_TEMPLATE,
      language: { code: env.WHATSAPP_ALERT_TEMPLATE_LANG || "en" },
      components: [{
        type: "body",
        parameters: [alert.type, alert.name, alert.contact, alert.location, alert.link]
          .map((text) => ({ type: "text", text: templateText(text) })),
      }],
    },
  };
  try {
    const res = await fetcher(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${env.WHATSAPP_CLOUD_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json().catch(() => ({}))) as {
      messages?: { id?: string }[];
      error?: { message?: string; code?: number };
    };
    const ok = res.ok && !!data.messages?.[0]?.id;
    return {
      ok,
      configured: true,
      detail: ok ? "ok" : `whatsapp cloud ${res.status}: ${String(data.error?.code ?? "")} ${String(data.error?.message ?? "no message id").slice(0, 160)}`.trim(),
    };
  } catch (err) {
    return { ok: false, configured: true, detail: `fetch failed: ${err instanceof Error ? err.name : "unknown"}` };
  }
}
