import type { HandlerEvent } from "@netlify/functions";

// Cost guard for the paid Gemini-backed endpoints (ai-desk, nano-banana-stage).
// Two layers:
//   1. Origin allowlist — browser calls must come from the site itself (or a
//      Netlify deploy preview). Cross-site pages can no longer script the
//      endpoints via CORS.
//   2. Per-IP sliding-window rate limit — in-memory per function instance.
//      Not a hard distributed quota (each warm lambda keeps its own window,
//      and a cold start resets it), but it turns "loop this URL and burn the
//      Gemini bill" into a trickle without adding storage round-trips to the
//      hot path.

const ALLOWED_ORIGINS = [
  /^https:\/\/(www\.)?homesprofessional\.com$/,
  /^https:\/\/(deploy-preview-\d+--)?miamidesk\.netlify\.app$/,
];

/** CORS headers scoped to the requesting origin when it is allowlisted. */
export const corsHeaders = (event: HandlerEvent): Record<string, string> => {
  const origin = event.headers.origin ?? "";
  const allowed = ALLOWED_ORIGINS.some((re) => re.test(origin));
  return {
    "Content-Type": "application/json",
    ...(allowed
      ? {
          "Access-Control-Allow-Origin": origin,
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
          "Vary": "Origin",
        }
      : {}),
  };
};

/** True when the request carries an Origin header from a non-allowlisted site. */
export const isForbiddenOrigin = (event: HandlerEvent): boolean => {
  const origin = event.headers.origin ?? "";
  if (!origin) return false; // same-origin/non-browser calls carry no Origin; rate limit still applies
  return !ALLOWED_ORIGINS.some((re) => re.test(origin));
};

const clientIp = (event: HandlerEvent): string =>
  event.headers["x-nf-client-connection-ip"] ??
  (event.headers["x-forwarded-for"] ?? "").split(",")[0].trim() ??
  "unknown";

type Window = { timestamps: number[] };
const buckets = new Map<string, Window>();
let lastPrune = Date.now();

/**
 * Sliding-window limiter. Returns null when allowed, or a retry-after (secs)
 * when the caller exceeded `max` requests in the past `windowMs`.
 */
export const rateLimit = (
  event: HandlerEvent,
  key: string,
  max: number,
  windowMs: number,
): number | null => {
  const now = Date.now();

  // Opportunistic prune so idle IPs don't accumulate across a warm instance.
  if (now - lastPrune > windowMs) {
    for (const [k, w] of buckets) {
      w.timestamps = w.timestamps.filter((t) => now - t < windowMs);
      if (w.timestamps.length === 0) buckets.delete(k);
    }
    lastPrune = now;
  }

  const id = `${key}:${clientIp(event)}`;
  const bucket = buckets.get(id) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);

  if (bucket.timestamps.length >= max) {
    const oldest = bucket.timestamps[0];
    return Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
  }

  bucket.timestamps.push(now);
  buckets.set(id, bucket);
  return null;
};
