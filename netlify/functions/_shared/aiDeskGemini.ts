// Gemini model selection and error classification for the Miami Desk.
//
// - Models are tried in order. A model Google has retired or renamed fails
//   with "not found"; the desk then falls through to the next one instead of
//   going dark. GEMINI_MODEL (optional env) is tried first.
// - Errors are reduced to a short category that is safe to show in the
//   browser response and logs (never the key, never Google's raw text), so a
//   misconfigured key can be diagnosed from the outside.

export type GeminiErrorCode = "key_invalid" | "key_restricted" | "quota" | "model_unavailable" | "transient" | "upstream";

export function geminiModels(env: Record<string, string | undefined>): string[] {
  const list = [
    (env.GEMINI_MODEL ?? "").trim(),
    "gemini-2.5-flash",
    "gemini-flash-latest",
    "gemini-3-flash-preview",
    "gemini-3.1-flash-lite",
    "gemini-flash-lite-latest",
  ].filter(Boolean);
  return [...new Set(list)];
}

export function classifyGeminiError(message: string): GeminiErrorCode {
  const m = message.toLowerCase();
  if (/api key not valid|api_key_invalid|invalid api key|api key expired|unauthenticated/.test(m)) return "key_invalid";
  if (/referer|referrer|ip address|permission_denied|permission denied|has not been used in project|is disabled|forbidden|403/.test(m)) return "key_restricted";
  if (/resource_exhausted|quota|rate limit|429/.test(m)) return "quota";
  if (/not found|not_found|404|is not supported|no longer available|deprecated/.test(m)) return "model_unavailable";
  if (/unavailable|overloaded|503|500|internal error|deadline|timed? ?out|aborted|aborterror|econnreset|fetch failed|socket hang up/.test(m)) return "transient";
  return "upstream";
}
