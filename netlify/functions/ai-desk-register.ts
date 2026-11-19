import type { Handler, HandlerEvent } from "@netlify/functions";
import { corsHeaders, isForbiddenOrigin, rateLimit } from "./_shared/requestGuard";
import { connectBlobs } from "./_shared/connectBlobs";
import { assessLeadSpam, storeQuarantine } from "./_shared/leadSpam";
import { loadSession, saveSession } from "./_shared/aiDeskQuota";
import { sessionSecret, turnsLeft, verifySession } from "./_shared/aiDeskQuotaModel";

// Miami Desk registration gate.
//
// After FREE_TURNS questions the chat asks for name + email or phone. This
// endpoint only decides whether the session is unlocked; the lead itself is
// delivered by the browser down the normal two paths (Netlify Forms
// "ai-desk-registration" + lead-notify), which screen and de-duplicate it.
//
// Unlocking requires a clean spam verdict here too, so a bot cannot buy more
// model calls with junk contact details:
//   - drop       → 400, nothing unlocked
//   - quarantine → held for Carlos's daily digest, chat hands off (no unlock)
//   - ok         → session.registered = true

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[a-z]{2,}$/i;

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = corsHeaders(event);
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  if (isForbiddenOrigin(event)) return { statusCode: 403, headers, body: JSON.stringify({ error: "Forbidden origin." }) };

  const retryAfter = rateLimit(event, "ai-desk-register", 5, 600_000);
  if (retryAfter !== null) {
    return { statusCode: 429, headers: { ...headers, "Retry-After": String(retryAfter) }, body: JSON.stringify({ error: "Too many attempts. Please wait a moment." }) };
  }

  const secret = sessionSecret(process.env);
  if (!secret) return { statusCode: 500, headers, body: JSON.stringify({ error: "Not configured." }) };

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid request." }) };
  }

  const name = str(body.name, 120);
  const email = str(body.email, 254);
  const phone = str(body.phone, 40);
  if (name.length < 2 || (!email && !phone) || (email && !EMAIL_RE.test(email))) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Please enter your name and a valid email or phone number.", field: true }) };
  }

  const verified = verifySession(secret, body.sessionToken);
  connectBlobs(event);
  const session = verified ? await loadSession(verified.sid) : null;
  if (!verified || !session) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "This conversation has expired. Please reload the page.", expired: true }) };
  }

  const spam = assessLeadSpam({
    name,
    email,
    phone,
    botField: str(body.botField, 200),
    formRenderedAt: str(body.formRenderedAt, 20),
    timestampExpected: true,
  });
  if (spam.verdict === "drop") {
    console.log("ai-desk-register: dropped", { reasons: spam.reasons });
    return { statusCode: 400, headers, body: JSON.stringify({ error: "We could not verify this submission." }) };
  }
  if (spam.verdict === "quarantine") {
    console.log("ai-desk-register: quarantined", { reasons: spam.reasons });
    await storeQuarantine("ai-desk-register", { name, email, phone, interest: str(body.interest, 40) }, spam);
    return { statusCode: 200, headers, body: JSON.stringify({ unlocked: false, handoff: true }) };
  }

  session.registered = true;
  await saveSession(verified.sid, session);
  return { statusCode: 200, headers, body: JSON.stringify({ unlocked: true, turnsLeft: turnsLeft(session) }) };
};
