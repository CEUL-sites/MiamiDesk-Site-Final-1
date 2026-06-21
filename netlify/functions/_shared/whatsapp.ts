// Shared CallMeBot WhatsApp sender for the lead notifiers.
//
// Two gotchas this centralizes:
//
//  1. CallMeBot's whatsapp.php endpoint ALWAYS returns HTTP 200 — even when the
//     message is rejected (missing/invalid API key, phone not registered to the
//     key, rate limited). The real outcome is in the plain-text response body.
//     A bare `res.ok` check therefore reports success while nothing is
//     delivered. We inspect the body and surface the real result + a diagnostic
//     string for the Netlify function logs.
//
//  2. The phone MUST include the country code with a leading "+", URL-encoded as
//     %2B (a literal "+" in a query string decodes to a space). We encode it.
//     CALLMEBOT_PHONE overrides the default number without a code change.
//
// Setup (one-time, operational — not code):
//   • Carlos's WhatsApp number must activate CallMeBot by messaging the bot
//     (see https://www.callmebot.com/blog/free-api-whatsapp-messages/) to get
//     an API key tied to that number.
//   • Set CALLMEBOT_APIKEY (and optionally CALLMEBOT_PHONE) in Netlify env vars.

const DEFAULT_PHONE = "+19548656622"; // Carlos's WhatsApp, country code included

export interface WhatsAppResult {
  /** True only when CallMeBot actually accepted the message for delivery. */
  ok: boolean;
  /** Human-readable outcome for logs ("ok" or the CallMeBot error body). */
  detail: string;
}

export async function sendWhatsAppAlert(
  message: string,
  apikey: string,
  phone: string = process.env.CALLMEBOT_PHONE || DEFAULT_PHONE,
): Promise<WhatsAppResult> {
  if (!apikey) return { ok: false, detail: "not configured (CALLMEBOT_APIKEY missing)" };

  const url =
    `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(message)}&apikey=${encodeURIComponent(apikey)}`;

  try {
    const res = await fetch(url);
    const body = (await res.text()).trim();
    const lower = body.toLowerCase();
    // Success bodies say the message was queued/sent; error bodies (still HTTP
    // 200) contain words like "error", "invalid", "not registered", "wrong".
    const looksSuccess = /queued|message sent|sent to|message processed/.test(lower);
    const looksError = /error|invalid|wrong|not registered|need to send|expired|apikey/.test(lower);
    const ok = res.ok && looksSuccess && !looksError;
    return {
      ok,
      detail: ok ? "ok" : `callmebot ${res.status}: ${body.slice(0, 200) || "empty body"}`,
    };
  } catch (err) {
    return { ok: false, detail: `fetch failed: ${err instanceof Error ? err.message : "unknown"}` };
  }
}
