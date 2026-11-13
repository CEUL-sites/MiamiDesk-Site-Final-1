// Owner WhatsApp alert through Meta's official WhatsApp Cloud API.
//
// This replaces the CallMeBot bridge, which answered every request from
// Netlify's servers with "403 Forbidden" and so never delivered an alert in
// production. The Cloud API is Meta's own endpoint: no third-party relay.
//
// The alert is optional. Until the three settings below exist the sender
// reports `configured: false` and the CRM queue completes the inquiry without
// retrying — the HubSpot task reminder and the Resend email are the standing
// owner alerts and do not depend on this channel.
//
// Setup (one-time, operational — see ENVIRONMENT_VARIABLES.md):
//   WHATSAPP_CLOUD_TOKEN      permanent System User token (server-side only)
//   WHATSAPP_PHONE_NUMBER_ID  the sending number's ID from Meta's API Setup page
//   WHATSAPP_ALERT_TEMPLATE   approved utility template name (default below)
// Optional: WHATSAPP_ALERT_TO, WHATSAPP_ALERT_TEMPLATE_LANG, WHATSAPP_API_VERSION.
//
// A business-initiated message must use an approved template. The template
// body takes five variables, in this order:
//   {{1}} inquiry type  {{2}} name  {{3}} contact  {{4}} location  {{5}} HubSpot link

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
  return !!env.WHATSAPP_CLOUD_TOKEN && !!env.WHATSAPP_PHONE_NUMBER_ID;
}

export async function sendWhatsAppAlert(
  alert: OwnerAlert,
  env: Record<string, string | undefined> = process.env,
  fetcher: typeof fetch = fetch,
): Promise<WhatsAppResult> {
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
