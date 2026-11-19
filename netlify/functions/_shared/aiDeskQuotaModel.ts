// Miami Desk AI — cost/abuse quota model (pure; no Blobs, no network).
//
// Every Gemini call costs money, so the limits are enforced on the SERVER,
// never trusted from the browser:
//
//   - A conversation is identified by a signed session token the server
//     issues (HMAC). The browser cannot forge one or reset its counter.
//   - FREE_TURNS questions per session, then the visitor must register
//     (name + email or phone, spam-screened) to unlock up to REGISTERED_TURNS.
//   - Per-IP daily caps on questions and on new sessions stop a bot from
//     minting fresh sessions to dodge the per-session limit.
//   - A site-wide daily ceiling bounds the worst-case bill even against a
//     distributed botnet; past it the desk points to WhatsApp / the contact form.
//
// scripts/verify-ai-desk-quota.ts asserts on everything in this file.

import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";

export const FREE_TURNS = 5;
export const REGISTERED_TURNS = 15;
export const IP_DAILY_TURNS = 40;
export const IP_DAILY_SESSIONS = 8;
export const GLOBAL_DAILY_DEFAULT = 300;
/** Longest visitor message forwarded to the model. Matches the input's maxLength. */
export const MAX_USER_CHARS = 600;
/** Assistant turns are echoed back by the browser; cap them too. */
export const MAX_ASSISTANT_CHARS = 4000;
export const MAX_MESSAGES = REGISTERED_TURNS * 2 + 2;
export const SESSION_TTL_MS = 24 * 60 * 60 * 1000;

export type Gate = "register" | "handoff" | "ip_daily" | "global_daily";

export interface SessionRecord {
  turns: number;
  registered: boolean;
  createdAt: number;
}

export interface TurnInput {
  session: SessionRecord;
  ipTurnsToday: number;
  globalTurnsToday: number;
  globalCap: number;
}

export type TurnDecision = { allow: true } | { allow: false; gate: Gate };

/** Order matters: the visitor-specific gates are reported before the shared ones. */
export function decideTurn({ session, ipTurnsToday, globalTurnsToday, globalCap }: TurnInput): TurnDecision {
  if (session.turns >= REGISTERED_TURNS) return { allow: false, gate: "handoff" };
  if (!session.registered && session.turns >= FREE_TURNS) return { allow: false, gate: "register" };
  if (ipTurnsToday >= IP_DAILY_TURNS) return { allow: false, gate: "ip_daily" };
  if (globalTurnsToday >= globalCap) return { allow: false, gate: "global_daily" };
  return { allow: true };
}

export function turnsLeft(session: SessionRecord): number {
  const cap = session.registered ? REGISTERED_TURNS : FREE_TURNS;
  return Math.max(0, cap - session.turns);
}

export function parseGlobalCap(raw: string | undefined): number {
  const n = Number.parseInt(String(raw ?? ""), 10);
  return Number.isFinite(n) && n > 0 ? n : GLOBAL_DAILY_DEFAULT;
}

export interface DeskMessageLike {
  role?: unknown;
  content?: unknown;
}

/** True when the conversation is within the size limits forwarded to the model. */
export function messagesWithinLimits(messages: unknown): messages is { role: string; content: string }[] {
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) return false;
  return messages.every((m: DeskMessageLike) => {
    if (typeof m?.content !== "string" || (m.role !== "user" && m.role !== "assistant")) return false;
    const max = m.role === "user" ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS;
    return m.content.length > 0 && m.content.length <= max;
  });
}

export function dayKey(now = Date.now()): string {
  return new Date(now).toISOString().slice(0, 10);
}

// ── Session tokens ─────────────────────────────────────────────────────────
// token = base64url(JSON{sid,iat}) + "." + base64url(HMAC-SHA256(secret, payload))
// The token only identifies the session. Turn counts and the registered flag
// live server-side, so a forged or replayed token gains nothing.

const b64url = (buf: Buffer) => buf.toString("base64url");

export function signSession(secret: string, sid: string, iat = Date.now()): string {
  const payload = b64url(Buffer.from(JSON.stringify({ sid, iat })));
  const mac = b64url(createHmac("sha256", secret).update(payload).digest());
  return `${payload}.${mac}`;
}

export function verifySession(secret: string, token: unknown, now = Date.now()): { sid: string; iat: number } | null {
  if (typeof token !== "string" || token.length > 300) return null;
  const [payload, mac] = token.split(".");
  if (!payload || !mac) return null;
  const expected = createHmac("sha256", secret).update(payload).digest();
  let given: Buffer;
  try {
    given = Buffer.from(mac, "base64url");
  } catch {
    return null;
  }
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;
  try {
    const { sid, iat } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof sid !== "string" || !/^[a-f0-9]{32}$/.test(sid) || typeof iat !== "number") return null;
    if (now - iat > SESSION_TTL_MS || iat > now + 60_000) return null;
    return { sid, iat };
  } catch {
    return null;
  }
}

export function newSessionId(): string {
  return randomBytes(16).toString("hex");
}

/**
 * HMAC secret for session tokens. AI_DESK_SESSION_SECRET when configured;
 * otherwise derived from the (server-only) Gemini key so the quota works
 * without a new environment variable.
 */
export function sessionSecret(env: Record<string, string | undefined>): string | null {
  const explicit = (env.AI_DESK_SESSION_SECRET ?? "").trim();
  if (explicit) return explicit;
  const gemini = (env.GEMINI_API_KEY ?? env.Gemini_API_Key ?? "").trim();
  return gemini ? createHash("sha256").update(`ai-desk-session:${gemini}`).digest("hex") : null;
}

/** IPs are stored only as a keyed hash (privacy) and only for daily counters. */
export function hashIp(secret: string, ip: string): string {
  return createHmac("sha256", secret).update(`ip:${ip}`).digest("hex").slice(0, 32);
}
