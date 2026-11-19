// Blobs-backed counters for the Miami Desk quota (see aiDeskQuotaModel.ts).
//
// Counters live in Netlify Blobs so they survive cold starts and are shared
// across function instances. Blobs has no atomic increment, so two truly
// simultaneous requests can both read N and write N+1 — an off-by-one at
// worst, which is acceptable for a cost ceiling. If Blobs is unreachable the
// counters fall back to per-instance memory rather than failing the chat.

import { getStore } from "@netlify/blobs";
import type { HandlerEvent } from "@netlify/functions";
import { type SessionRecord, dayKey, hashIp } from "./aiDeskQuotaModel";

export const QUOTA_STORE = "ai-desk-quota";

const memory = new Map<string, unknown>();

async function readJSON<T>(key: string): Promise<T | null> {
  try {
    return ((await getStore(QUOTA_STORE).get(key, { type: "json" })) as T | null) ?? null;
  } catch {
    return (memory.get(key) as T | undefined) ?? null;
  }
}

async function writeJSON(key: string, value: unknown): Promise<void> {
  memory.set(key, value);
  try {
    await getStore(QUOTA_STORE).setJSON(key, value);
  } catch {
    /* memory fallback already holds it */
  }
}

export const clientIp = (event: HandlerEvent): string =>
  event.headers["x-nf-client-connection-ip"] ||
  (event.headers["x-forwarded-for"] ?? "").split(",")[0].trim() ||
  "unknown";

export const loadSession = (sid: string) => readJSON<SessionRecord>(`s/${sid}`);
export const saveSession = (sid: string, rec: SessionRecord) => writeJSON(`s/${sid}`, rec);

interface IpDay {
  turns: number;
  sessions: number;
}

export async function loadIpDay(secret: string, ip: string, now = Date.now()) {
  const key = `ip/${dayKey(now)}/${hashIp(secret, ip)}`;
  const rec = (await readJSON<IpDay>(key)) ?? { turns: 0, sessions: 0 };
  return { key, rec };
}

export const saveIpDay = (key: string, rec: IpDay) => writeJSON(key, rec);

export async function loadGlobalDay(now = Date.now()) {
  const key = `g/${dayKey(now)}`;
  const rec = (await readJSON<{ turns: number }>(key)) ?? { turns: 0 };
  return { key, rec };
}

export const saveGlobalDay = (key: string, rec: { turns: number }) => writeJSON(key, rec);

// ── Cloudflare Turnstile (optional) ───────────────────────────────────────
// Active only when TURNSTILE_SECRET_KEY is set. Checked once, when a new chat
// session is created, so a human pays one invisible check per conversation.

export const turnstileEnabled = (): boolean => Boolean((process.env.TURNSTILE_SECRET_KEY ?? "").trim());

export async function verifyTurnstile(token: unknown, ip: string): Promise<boolean> {
  const secret = (process.env.TURNSTILE_SECRET_KEY ?? "").trim();
  if (!secret) return true;
  if (typeof token !== "string" || !token || token.length > 2048) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }).toString(),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    // Cloudflare unreachable: fail open — the rate limits and daily caps still apply.
    return true;
  }
}
