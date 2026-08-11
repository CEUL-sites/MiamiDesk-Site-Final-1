// Lead triage — turns a raw submission into a priority tier, the reasons
// behind it, and one-tap contact links for Carlos's phone.
//
// Why this exists: both notifier paths (submission-created.ts and the
// lead-notify.ts backup) used to format every lead identically. A seller with
// a verified $5M address and an "Immediately" timeline arrived looking exactly
// like a lead-magnet PDF download, and the phone number arrived as plain text
// that had to be copy-pasted before it could be dialled. Speed-to-lead is the
// highest-value lever in residential real estate, so the alert now leads with
// *who to call first* and *how to call them in one tap*.
//
// This module is deliberately pure — no env vars, no I/O, no DOM. That is what
// lets scripts/verify-lead-score.ts import it and assert on real form values
// without a network or a browser, matching the *Model.ts convention used on
// the front end (heroSellerFormModel.ts, mobileStickyModel.ts).
//
// Scoring is a transparent 0–100 sum of five signals. It is a triage aid, not
// a prediction, and it never suppresses a lead: every lead is still delivered
// through every configured channel. The tier only changes how the alert reads.
//
// formatLeadWhatsApp/formatLeadEmail below accept an OPTIONAL, already-fetched
// market-context argument (see _shared/leadMarketContext.ts) and render a
// short block when it's present. The fetch itself — Bridge API, timeouts,
// caching — stays entirely out of this file on purpose: only a type import is
// taken from leadMarketContext.ts (erased at compile time, zero runtime
// footprint) so this module keeps doing no I/O of its own and
// scripts/verify-lead-score.ts keeps testing it without a network call.

import type { LeadMarketContext } from "./leadMarketContext";

export type LeadTier = "P1" | "P2" | "P3";

export interface ScorableLead {
  name?: string;
  email?: string;
  phone?: string;
  propertyAddress?: string;
  city?: string;
  timeline?: string;
  valueBand?: string;
  occupancy?: string;
  /** Netlify form name — seller-intake, seller-hero, buyer-mandate, … */
  formName?: string;
  /** First-touch attribution chain, e.g. "google / cpc / brickell-sellers". */
  leadSource?: string;
  /** "yes" when the lead opted into WhatsApp/SMS follow-up. */
  messagingConsent?: string;
  /** Google Places id — present only when the address was picked from autocomplete. */
  placeId?: string;
  /** Spain desk routing hint, when the form carries one. */
  desk?: string;
}

export interface LeadScore {
  /** 0–100. Sum of the five signal scores below. */
  score: number;
  tier: LeadTier;
  /** Short human-readable label, e.g. "P1 · Call now". */
  tierLabel: string;
  /** Why the lead landed in this tier — shown verbatim in the alert. */
  reasons: string[];
  /** The recommended first move, phrased as an instruction. */
  nextAction: string;
  /** Per-signal breakdown, kept for logs and for the verify script. */
  signals: {
    timeline: number;
    address: number;
    value: number;
    reachability: number;
    intent: number;
  };
}

// ── Text normalisation ──────────────────────────────────────────────────
// Form values arrive with three different dash characters and in two
// languages: "30-90 days" (LeadForm), "30–90 days" (HeroSellerForm),
// "0 – 3 months" (SellerIntakeForm), "30–90 días" (Spanish). Collapsing all
// dash variants and the spaces around them is what lets one set of patterns
// match every form.
const normalize = (value?: string): string =>
  (value ?? "")
    .toLowerCase()
    .replace(/[‐-―−]/g, "-") // ‐ ‑ ‒ – — ― and minus → "-"
    .replace(/\s+/g, " ")
    .replace(/\s*-\s*/g, "-")
    .trim();

// ── 1. Timeline urgency (0–30) — the strongest single predictor ──────────
// Ordered most-specific first: "6-12 months" must classify as mid before the
// long-horizon "6+" pattern can claim it.
type Urgency = "immediate" | "near" | "mid" | "long" | "exploring" | "unknown";

const classifyUrgency = (timeline?: string): Urgency => {
  const t = normalize(timeline);
  if (!t) return "unknown";
  if (/(immediately|de inmediato|inmediato|asap|ready now|0-3 (months|meses))/.test(t)) return "immediate";
  if (/(30-90 (days|dias|días)|3-6 (months|meses)|1-3 (months|meses))/.test(t)) return "near";
  if (/6-12 (months|meses)/.test(t)) return "mid";
  if (/(6\+|12\+|más de 12|mas de 12|over 12)/.test(t)) return "long";
  if (/(explorator|exploring|explorando|no fixed date|sin fecha)/.test(t)) return "exploring";
  return "unknown";
};

const URGENCY_SCORE: Record<Urgency, number> = {
  immediate: 30,
  near: 22,
  mid: 12,
  long: 6,
  exploring: 3,
  // Neutral rather than zero — several forms simply don't ask, and a lead
  // shouldn't be demoted for a question it was never shown.
  unknown: 8,
};

const URGENCY_REASON: Partial<Record<Urgency, string>> = {
  immediate: "Immediate timeline",
  near: "Near-term timeline (under 6 months)",
  mid: "6–12 month horizon",
  exploring: "Exploratory — no fixed date",
};

// ── 2. Address specificity (0–20) — a real address means a real property ──
type AddressQuality = "verified" | "street" | "area" | "none";

const classifyAddress = (lead: ScorableLead): AddressQuality => {
  const address = (lead.propertyAddress ?? "").trim();
  if (!address) return "none";
  // placeId is only ever set by Google Places autocomplete, so its presence
  // means the seller selected a real, geocoded property.
  if ((lead.placeId ?? "").trim()) return "verified";
  const wordCount = address.split(/\s+/).filter(Boolean).length;
  if (/\d/.test(address) && wordCount >= 3) return "street";
  return "area";
};

const ADDRESS_SCORE: Record<AddressQuality, number> = {
  verified: 20,
  street: 14,
  area: 7,
  none: 0,
};

const ADDRESS_REASON: Partial<Record<AddressQuality, string>> = {
  verified: "Verified property address",
  street: "Street-level address given",
  none: "No property address",
};

// ── 3. Value band (0–20) — scales with the size of the engagement ────────
// Parses the lower bound out of every band shipped by the forms:
//   "$500K – $1M", "$2M – $5M", "$25M+"          (SellerIntakeForm)
//   "Under €500,000", "€1M – €3M", "Over €10M"   (SpainSellerForm)
// "Prefer not to say" and anything unparseable return null (scored neutral).
export const parseValueFloor = (band?: string): number | null => {
  const s = normalize(band);
  if (!s) return null;
  if (/(prefer not|no decir|prefiero no)/.test(s)) return null;

  // "Under €500,000" is an upper bound — the floor of that bucket is zero.
  const isUnder = /^(under|below|less than|menos de|hasta)\b/.test(s);

  const match = s.match(/([\d][\d.,]*)\s*(k|m|thousand|million|millón|millon|millones)?/);
  if (!match) return null;

  const value = Number(match[1].replace(/,/g, ""));
  if (!Number.isFinite(value)) return null;
  if (isUnder) return 0;

  const unit = match[2] ?? "";
  if (/^k$|thousand/.test(unit)) return value * 1_000;
  if (/^m$|million|millón|millon|millones/.test(unit)) return value * 1_000_000;
  return value;
};

const scoreValue = (band?: string): { points: number; reason?: string } => {
  const floor = parseValueFloor(band);
  if (floor === null) return { points: 6 };
  if (floor >= 5_000_000) return { points: 20, reason: "$5M+ value band" };
  if (floor >= 2_000_000) return { points: 16, reason: "$2M+ value band" };
  if (floor >= 1_000_000) return { points: 12, reason: "$1M+ value band" };
  if (floor >= 500_000) return { points: 8 };
  return { points: 4 };
};

// ── 4. Reachability (0–15) — can Carlos actually make contact right now? ──
const scoreReachability = (lead: ScorableLead): { points: number; reasons: string[] } => {
  const hasPhone = Boolean((lead.phone ?? "").trim());
  const hasEmail = (lead.email ?? "").includes("@");
  const reasons: string[] = [];

  let points = 0;
  if (hasPhone && hasEmail) points += 10;
  else if (hasPhone) points += 7;
  else if (hasEmail) points += 4;

  if (!hasPhone) reasons.push("Email only — no phone");

  // An explicit WhatsApp/SMS opt-in removes the main barrier to an immediate
  // first touch, which is exactly what this whole module optimises for.
  if (normalize(lead.messagingConsent) === "yes") {
    points += 5;
    reasons.push("WhatsApp/SMS consent given");
  }

  return { points, reasons };
};

// ── 5. Form intent (0–15) — how much work the lead was willing to do ──────
// A completed long-form intake is a materially stronger signal than a PDF
// download, independent of anything the lead typed into it.
const FORM_INTENT: Record<string, number> = {
  "seller-intake": 15,
  "seller-hero": 11,
  "seller-consultation": 11,
  "spain-seller": 11,
  "global-desk-listing": 10,
  "buyer-mandate": 8,
  "referral-intake": 7,
  "agency-partner-intake": 7,
  "seller-valuation-step1": 5,
  "lead-magnet-download": 2,
};

const scoreIntent = (formName?: string): { points: number; reason?: string } => {
  const key = normalize(formName);
  if (key in FORM_INTENT) {
    const points = FORM_INTENT[key];
    if (key === "seller-intake") return { points, reason: "Completed full seller intake" };
    if (key === "lead-magnet-download") return { points, reason: "Content download only" };
    if (key === "seller-valuation-step1") return { points, reason: "Partial form — step 1 only" };
    return { points };
  }
  return { points: 6 };
};

// ── Tiering ─────────────────────────────────────────────────────────────
const TIER_LABEL: Record<LeadTier, string> = {
  P1: "P1 · Call now",
  P2: "P2 · Call today",
  P3: "P3 · Nurture",
};

const NEXT_ACTION: Record<LeadTier, string> = {
  P1: "Call now. If there's no answer, send a WhatsApp before the hour is out.",
  P2: "Call today. WhatsApp first if calling isn't practical.",
  P3: "Nurture sequence handles this one. Add a personal note if you have capacity.",
};

export const MAX_LEAD_SCORE = 100;

export function scoreLead(lead: ScorableLead): LeadScore {
  const urgency = classifyUrgency(lead.timeline);
  const addressQuality = classifyAddress(lead);
  const value = scoreValue(lead.valueBand);
  const reach = scoreReachability(lead);
  const intent = scoreIntent(lead.formName);

  const signals = {
    timeline: URGENCY_SCORE[urgency],
    address: ADDRESS_SCORE[addressQuality],
    value: value.points,
    reachability: reach.points,
    intent: intent.points,
  };

  const score = Math.min(
    MAX_LEAD_SCORE,
    signals.timeline + signals.address + signals.value + signals.reachability + signals.intent,
  );

  const tier: LeadTier = score >= 70 ? "P1" : score >= 45 ? "P2" : "P3";

  const reasons = [
    URGENCY_REASON[urgency],
    ADDRESS_REASON[addressQuality],
    value.reason,
    ...reach.reasons,
    intent.reason,
  ].filter((r): r is string => Boolean(r));

  return {
    score,
    tier,
    tierLabel: TIER_LABEL[tier],
    reasons,
    nextAction: NEXT_ACTION[tier],
    signals,
  };
}

// ── Phone normalisation — the "one tap to call" half of speed-to-lead ────
export interface NormalizedPhone {
  /** E.164 with leading "+", e.g. "+13055550142". Null when not confidently derivable. */
  e164: string | null;
  /** What to print in the alert. Falls back to the raw input so nothing is ever lost. */
  display: string;
  /** wa.me deep link that opens a chat with the lead. Null when e164 is null. */
  waLink: string | null;
}

const SPAIN_MARKET = /(spain|españa|espana|madrid|marbella|costa del sol|málaga|malaga)/;

/**
 * Best-effort E.164 normalisation.
 *
 * Deliberately conservative: when the country can't be determined the links
 * are omitted rather than guessed, because a wa.me link to the wrong country
 * is worse than no link at all. Carlos still sees the raw number either way.
 */
export function normalizePhone(raw?: string, marketHint?: string): NormalizedPhone {
  const trimmed = (raw ?? "").trim();
  if (!trimmed) return { e164: null, display: "—", waLink: null };

  const hadPlus = trimmed.startsWith("+");
  let digits = trimmed.replace(/\D/g, "");

  // "00" is the international access prefix in both the US and Spain.
  if (!hadPlus && digits.startsWith("00")) digits = digits.slice(2);

  const isSpain = SPAIN_MARKET.test(normalize(marketHint));

  let e164Digits: string | null = null;
  if (hadPlus || trimmed.startsWith("00")) {
    e164Digits = digits;
  } else if (digits.length === 10) {
    e164Digits = `1${digits}`; // NANP without the country code
  } else if (digits.length === 11 && digits.startsWith("1")) {
    e164Digits = digits;
  } else if (digits.length === 9 && isSpain) {
    e164Digits = `34${digits}`; // Spanish numbers are 9 digits
  }

  // E.164 allows 7–15 digits. Anything outside that is a typo, not a number.
  if (e164Digits && (e164Digits.length < 7 || e164Digits.length > 15)) {
    e164Digits = null;
  }

  if (!e164Digits) return { e164: null, display: trimmed, waLink: null };

  return {
    e164: `+${e164Digits}`,
    display: `+${e164Digits}`,
    waLink: `https://wa.me/${e164Digits}`,
  };
}

// ── Alert formatting ────────────────────────────────────────────────────
// Both notifier paths render the same shape, so an alert reads identically
// whether it came through Netlify Forms or the direct backup POST.

export interface AlertLead extends ScorableLead {
  message?: string;
  sourcePage?: string;
}

/**
 * "1450 Brickell Ave, Miami" — but not "Marbella, Marbella / Costa del Sol".
 *
 * SpainSellerForm and GlobalDeskListingForm set propertyAddress and city from
 * the same input, so joining them blindly repeats the location back at Carlos.
 */
const formatLocation = (address?: string, city?: string): string => {
  const a = (address ?? "").trim();
  const c = (city ?? "").trim();
  if (!a) return c;
  if (!c) return a;

  const an = normalize(a);
  const cn = normalize(c);
  if (an === cn || an.includes(cn) || cn.includes(an)) return a;

  // The city field is often a market-picker label ("Marbella / Costa del Sol")
  // whose leading place name is already in the address. Comparing the whole
  // string misses that, so compare the city's first token on a word boundary.
  const cityHead = cn.split(/[^a-z0-9áéíóúüñ]+/i).filter(Boolean)[0];
  if (cityHead && new RegExp(`\\b${cityHead}\\b`).test(an)) return a;

  return `${a}, ${c}`;
};

/** Join non-empty blocks with a blank line between them. */
const joinBlocks = (blocks: string[][]): string =>
  blocks
    .map((lines) => lines.filter(Boolean).join("\n"))
    .filter(Boolean)
    .join("\n\n");

/** "Aug 11" — short enough for a WhatsApp line, unambiguous enough for an
 *  email one. Empty string (dropped by joinBlocks) on an unparseable date
 *  rather than printing "Invalid Date" into an alert. */
const formatMarketAsOf = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "America/New_York" });
};

/** "Miami" or "Miami (Brickell)" — states the submarket the numbers describe
 *  so Carlos never reads a city-wide figure as if it were the exact address. */
const formatMarketCityLabel = (ctx: LeadMarketContext): string =>
  ctx.requestedAs ? `${ctx.city} (${ctx.requestedAs})` : ctx.city;

/**
 * Short WhatsApp block: city + as-of date, the three headline numbers (median
 * list price always present; $/sqft and days-on-market only when their own
 * sample cleared MIN_SAMPLE), active count, and a compact not-guaranteed note
 * so Carlos knows this is IDX data before he quotes it. Empty array — and
 * therefore no block at all, via joinBlocks — when there's no context.
 */
const marketContextWhatsAppLines = (ctx?: LeadMarketContext | null): string[] => {
  if (!ctx) return [];
  const asOf = formatMarketAsOf(ctx.asOf);
  const stats = [
    `Median list $${ctx.medianListPrice.toLocaleString()}`,
    ctx.medianPricePerSqft != null ? `$${ctx.medianPricePerSqft.toLocaleString()}/sqft` : "",
    ctx.avgDaysOnMarket != null ? `${ctx.avgDaysOnMarket} days on mkt` : "",
  ].filter(Boolean).join(" · ");

  return [
    `📈 ${formatMarketCityLabel(ctx)} market${asOf ? ` · MLS snapshot ${asOf}` : ""}`,
    stats,
    `${ctx.activeCount} active · IDX data, not guaranteed — verify before quoting`,
  ];
};

/**
 * Fuller email block: same numbers labeled out explicitly, the source name,
 * and the complete IDX_DISCLAIMER text — email has "room for full detail" the
 * WhatsApp alert doesn't. Empty array when there's no context.
 */
const marketContextEmailLines = (ctx?: LeadMarketContext | null): string[] => {
  if (!ctx) return [];
  const asOf = formatMarketAsOf(ctx.asOf);

  return [
    `Market snapshot — ${formatMarketCityLabel(ctx)}`,
    `Median list price: $${ctx.medianListPrice.toLocaleString()}`,
    ctx.medianPricePerSqft != null ? `Price per sq ft: $${ctx.medianPricePerSqft.toLocaleString()}` : "",
    ctx.avgDaysOnMarket != null ? `Avg days on market: ${ctx.avgDaysOnMarket}` : "",
    `Active listings: ${ctx.activeCount}`,
    `Source: ${ctx.source}${asOf ? ` · as of ${asOf}` : ""}`,
    ctx.disclaimer,
  ];
};

/**
 * WhatsApp alert body.
 *
 * WhatsApp auto-links two things in plain text: a phone number in
 * international "+…" form, and a bare https URL. That is why the number is
 * printed as E.164 and the wa.me link is printed raw — together they give
 * Carlos tap-to-dial and tap-to-chat without any markup.
 *
 * `marketContext` is optional and already-fetched by the caller (see
 * _shared/leadMarketContext.ts) — this function only renders it. Omitting it,
 * or passing null/undefined, reproduces today's alert byte-for-byte.
 */
export function formatLeadWhatsApp(
  lead: AlertLead,
  scored: LeadScore,
  marketContext?: LeadMarketContext | null,
): string {
  const marketHint = `${lead.city ?? ""} ${lead.desk ?? ""} ${lead.propertyAddress ?? ""}`;
  const phone = normalizePhone(lead.phone, marketHint);
  const location = formatLocation(lead.propertyAddress, lead.city);

  return joinBlocks([
    [`${scored.tierLabel} — ${scored.score}/${MAX_LEAD_SCORE}`],
    [
      `👤 ${lead.name || "—"}`,
      `📞 ${phone.display}`,
      phone.waLink ? `💬 ${phone.waLink}` : "",
      `📧 ${lead.email || "—"}`,
    ],
    [
      location ? `📍 ${location}` : "",
      `⏱ ${lead.timeline || "—"}${lead.valueBand ? ` · ${lead.valueBand}` : ""}`,
      lead.message ? `📝 ${lead.message.slice(0, 200)}` : "",
    ],
    marketContextWhatsAppLines(marketContext),
    [
      scored.reasons.length ? `Why ${scored.tier}: ${scored.reasons.join(" · ")}` : "",
      `▶ ${scored.nextAction}`,
    ],
    [
      `Via: ${lead.sourcePage || lead.formName || "homesprofessional.com"}`,
      lead.leadSource ? `📊 Source: ${lead.leadSource}` : "",
    ],
  ]);
}

/** Subject line — the tier leads so the inbox is triageable without opening anything. */
export function formatLeadEmailSubject(lead: AlertLead, scored: LeadScore): string {
  const who = lead.name || lead.email || "New lead";
  return `[${scored.tier}] ${who} — ${lead.sourcePage || lead.formName || "HomesProfessional.com"}`;
}

/**
 * Plain-text email body. Mirrors the WhatsApp alert, with room for full detail.
 *
 * `marketContext` is optional and already-fetched by the caller (see
 * _shared/leadMarketContext.ts) — appended as a new trailing parameter so
 * every existing 3-arg call site keeps compiling and rendering unchanged.
 */
export function formatLeadEmail(
  lead: AlertLead,
  scored: LeadScore,
  extras: { timestamp: string; landingPage?: string; fullDetails?: string; via?: string } = { timestamp: "" },
  marketContext?: LeadMarketContext | null,
): string {
  const marketHint = `${lead.city ?? ""} ${lead.desk ?? ""} ${lead.propertyAddress ?? ""}`;
  const phone = normalizePhone(lead.phone, marketHint);

  return joinBlocks([
    [
      `${scored.tierLabel} — score ${scored.score}/${MAX_LEAD_SCORE}`,
      `▶ ${scored.nextAction}`,
      scored.reasons.length ? `Why ${scored.tier}: ${scored.reasons.join(" · ")}` : "",
    ],
    [
      `Name: ${lead.name || "—"}`,
      `Phone: ${phone.display}`,
      phone.e164 ? `Call: tel:${phone.e164}` : "",
      phone.waLink ? `WhatsApp: ${phone.waLink}` : "",
      `Email: ${lead.email || "—"}`,
      `Property / Location: ${formatLocation(lead.propertyAddress, lead.city) || "—"}`,
      `Timeline: ${lead.timeline || "—"}`,
      lead.valueBand ? `Value band: ${lead.valueBand}` : "",
      lead.occupancy ? `Occupancy: ${lead.occupancy}` : "",
      lead.message ? `Message: ${lead.message}` : "",
    ],
    marketContextEmailLines(marketContext),
    [
      `Form: ${lead.sourcePage || lead.formName || "—"}`,
      extras.timestamp ? `Received: ${extras.timestamp} ET` : "",
      `📊 Lead Source: ${lead.leadSource || "direct"}`,
      extras.landingPage ? `Landing page: ${extras.landingPage}` : "",
      extras.via ? `Delivered via: ${extras.via}` : "",
    ],
    [
      `Score breakdown — timeline ${scored.signals.timeline}, address ${scored.signals.address}, ` +
        `value ${scored.signals.value}, reachability ${scored.signals.reachability}, intent ${scored.signals.intent}`,
    ],
    extras.fullDetails ? ["All fields:", extras.fullDetails] : [],
    ["---", "Carlos Uzcategui · FL SL705771 · United Realty Group", "HomesProfessional.com"],
  ]);
}
