import { getStore } from "@netlify/blobs";
import { isValidPhoneNumber } from "libphonenumber-js";

// ── Lead spam assessment ────────────────────────────────────────────────
// The honeypot + submit-time checks stop dumb POST bots, but browser-driven
// bots fill the real form, wait, and pass both. They give themselves away in
// the content instead: keyboard-mash names ("Cmqxi Drqvwbww"), invented
// places ("Vrjak", "Upshg"), unassigned phone numbers, Gmail dot-trick
// addresses. Those often carry a REAL victim's email/phone, so letting them
// into the auto-reply, nurture drip or WhatsApp is how the site ends up
// emailing and texting people who never asked — a deliverability and TCPA
// problem, not just inbox noise.
//
// Design rules:
//   - Pure and deterministic. lead-notify and submission-created race through
//     leadDedup, so both must reach the same verdict for the same lead.
//   - Hard fails (honeypot, sub-1.5s submit) are dropped silently.
//   - Content signals are weighted; a lead reaching QUARANTINE_AT is held in
//     the `lead-quarantine` Blobs store — never deleted — and listed in the
//     daily quarantine digest so a real lead can always be recovered.
//   - A single weak signal never blocks a lead.

export type SpamVerdict = "ok" | "quarantine" | "drop";

export interface SpamInput {
  name?: string;
  email?: string;
  phone?: string;
  propertyAddress?: string;
  botField?: string;
  formRenderedAt?: string | number;
  /** When false, a missing formRenderedAt adds a weak signal instead of nothing. */
  timestampExpected?: boolean;
  now?: number;
}

export interface SpamAssessment {
  verdict: SpamVerdict;
  weight: number;
  reasons: string[];
}

export const QUARANTINE_AT = 2;
export const QUARANTINE_STORE = "lead-quarantine";

const VOWELS = new Set(["a", "e", "i", "o", "u", "y"]);
// Consonant clusters that are normal in real names (Schmidt, Christopher,
// Fitzgerald, Hughes, Nguyen). Stripped before measuring consonant runs.
const COMMON_CLUSTERS = /(sch|tch|chr|ch|sh|th|ph|ck|gh|ng|tz|ll|rr|nn|ss|tt|cz|sz|rz)/g;
// Word-initial consonant clusters that occur in English/Spanish place names.
const ALLOWED_ONSETS = new Set([
  "bl", "br", "ch", "cl", "cr", "dr", "fl", "fr", "gl", "gr", "kn", "ph", "pl", "pr",
  "sc", "sh", "sk", "sl", "sm", "sn", "sp", "st", "sw", "th", "tr", "tw", "wh", "wr",
  "chr", "phr", "sch", "scr", "shr", "spl", "spr", "squ", "str", "thr", "ll",
]);

const lettersOnly = (s: string) => s.toLowerCase().normalize("NFD").replace(/[^a-z]/g, "");

const longestConsonantRun = (word: string): number => {
  let best = 0;
  let run = 0;
  for (const ch of word) {
    if (VOWELS.has(ch)) run = 0;
    else best = Math.max(best, ++run);
  }
  return best;
};

const vowelRatio = (word: string): number =>
  word.length === 0 ? 1 : [...word].filter((c) => VOWELS.has(c)).length / word.length;

const leadingOnset = (word: string): string => {
  let i = 0;
  while (i < word.length && !VOWELS.has(word[i])) i++;
  return word.slice(0, i);
};

// Three-plus-letter onsets that real surnames start with across the
// languages this site serves (English, Spanish, Polish, German, Slavic,
// Southern African). Two-letter onsets are never flagged on names.
const NAME_ONSETS = new Set([
  ...ALLOWED_ONSETS,
  "brz", "prz", "krz", "trz", "drz", "grz", "strz", "szcz", "szcz", "chrz",
  "tsch", "schw", "schl", "schm", "schn", "schr", "spr", "shch", "tsh", "hrv",
  "zdr", "zgr", "skr", "skl", "sht", "phl", "chl", "chw", "vls", "mst", "pss",
]);

/**
 * True for a name token no human name produces (Cmqxi, Drqvwbww, Avrtvwgj).
 * Deliberately strict: ordinary names with long consonant runs (Armstrong,
 * Goldstein, Bergstrom, Strzelecki, McDonald) must pass, because this signal
 * alone is enough to hold a lead.
 */
export function isGibberishNameToken(raw: string): boolean {
  // "Mc"/"Mac" prefixes (McDonald, McGregor) are not part of the onset.
  const w = lettersOnly(raw).replace(/^ma?c(?=[^aeiouy])/, "");
  if (w.length < 4) return false;
  if (vowelRatio(w) === 0) return true;
  const onset = leadingOnset(w);
  // Onsets opening with m/n are prenasalised clusters in Southern African and
  // other names (Ndlovu, Mbhele, Nkwanyana) — never flag those on the onset.
  if (onset.length >= 3 && !NAME_ONSETS.has(onset) && !/^[mn]/.test(onset)) return true;
  return longestConsonantRun(w.replace(COMMON_CLUSTERS, "a")) >= 6;
}

/** True for a place/address token that is not a word (Vrjak, Upshg). */
export function isGibberishPlaceToken(raw: string): boolean {
  const w = lettersOnly(raw);
  if (w.length < 4) return false;
  if (vowelRatio(w) === 0) return true;
  const onset = leadingOnset(w);
  if (onset.length >= 2 && !ALLOWED_ONSETS.has(onset)) return true;
  if (w.length <= 7 && longestConsonantRun(w) >= 4) return true;
  return longestConsonantRun(w.replace(COMMON_CLUSTERS, "a")) >= 4;
}

const tokens = (s: string) => s.split(/[\s,.\-/#]+/).filter(Boolean);

export function assessLeadSpam(input: SpamInput): SpamAssessment {
  const reasons: string[] = [];
  const now = input.now ?? Date.now();

  // ── Hard fails ──────────────────────────────────────────────────────────
  if ((input.botField || "").trim() !== "") {
    return { verdict: "drop", weight: 99, reasons: ["honeypot filled"] };
  }
  const renderedAt = Number(input.formRenderedAt || 0);
  if (renderedAt > 0) {
    const elapsed = now - renderedAt;
    if (elapsed >= 0 && elapsed < 1500) {
      return { verdict: "drop", weight: 99, reasons: [`submitted ${elapsed}ms after render`] };
    }
  }

  // ── Weighted content signals ────────────────────────────────────────────
  let weight = 0;
  const add = (w: number, reason: string) => { weight += w; reasons.push(reason); };

  const name = (input.name || "").trim();
  if (name && tokens(name).some(isGibberishNameToken)) add(2, "name looks machine-generated");

  // A street address normally carries a number; a letters-only value made of
  // non-words is not a property anyone owns.
  const address = (input.propertyAddress || "").trim();
  if (address && !/\d/.test(address) && tokens(address).some(isGibberishPlaceToken)) {
    add(2, "property/location is not a real place");
  }

  const phone = (input.phone || "").replace(/[^\d+]/g, "");
  if (phone) {
    const e164 = phone.startsWith("+") ? phone : phone.length === 10 ? `+1${phone}` : `+${phone}`;
    let valid = false;
    try { valid = isValidPhoneNumber(e164); } catch { valid = false; }
    if (!valid) add(1, "phone number is not a valid/assigned number");
  }

  const email = (input.email || "").trim().toLowerCase();
  const [local = "", domain = ""] = email.split("@");
  if ((domain === "gmail.com" || domain === "googlemail.com") && (local.match(/\./g) || []).length >= 3) {
    add(1, "Gmail dot-pattern address used by form bots");
  }

  if (!renderedAt && input.timestampExpected) add(1, "posted without the form's render timestamp");

  return { verdict: weight >= QUARANTINE_AT ? "quarantine" : "ok", weight, reasons };
}

/** Hold a suspected-spam lead for review. Never throws — must not break the lead path. */
export async function storeQuarantine(source: string, lead: Record<string, unknown>, assessment: SpamAssessment): Promise<void> {
  try {
    const at = new Date().toISOString();
    await getStore(QUARANTINE_STORE).setJSON(`${at}|${source}`, { source, at, assessment, lead });
  } catch (err) {
    console.error("storeQuarantine failed:", err instanceof Error ? err.message : err);
  }
}
