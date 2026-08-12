import { resolveMlsCity, MIN_SAMPLE, IDX_DISCLAIMER, MLS_SOURCE_LABEL, median, type ResolvedCity } from "./mlsCity";
import type { LeadTier } from "./leadScore";

// Live MLS market context for P1/P2 lead alerts — see leadScore.ts for tiering.
//
// The alert already tells Carlos WHO to call first (tier + one-tap phone
// link). This adds WHAT to say: the submarket's median list price, days on
// market, price per sq ft, and active listing count, so a P1/P2 alert opens a
// credible pricing conversation instead of just a name.
//
// Reuses the exact city vocabulary city-stats.ts already serves publicly (see
// ./mlsCity), so "Weston" means the same MLS City filter in both places, and
// the same MIN_SAMPLE floor that keeps city-stats.ts from publishing a median
// computed from a handful of listings.
//
// The one rule this module answers to above everything else: an MLS hiccup
// must NEVER delay or drop a lead alert. Every path below — timeout, fetch
// error, missing token, unresolved city, thin sample — resolves to `null`,
// and the caller (lead-notify.ts / submission-created.ts) renders the alert
// exactly as it would with no context at all. See leadScore.ts's
// formatLeadWhatsApp/formatLeadEmail, which already no-op on a null context.

export interface LeadMarketContext {
  /** MLS `City` field these numbers describe, e.g. "Miami". May be a wider
   *  submarket than the lead's own input — see `requestedAs`. */
  city: string;
  /** What the lead/form actually said, e.g. "Brickell", only when it differs
   *  from `city` (i.e. an alias or address-derived match was used). Null when
   *  the lead's input already was the MLS city verbatim. */
  requestedAs: string | null;
  /** Always present when a context is returned at all — the whole context is
   *  withheld (see MIN_SAMPLE) rather than publish a median built on a thin
   *  price sample. */
  medianListPrice: number;
  /** Null when the days-on-market sample for this city is below MIN_SAMPLE,
   *  independent of whether the price sample cleared the floor. */
  avgDaysOnMarket: number | null;
  /** Null when the $/sqft sample for this city is below MIN_SAMPLE. */
  medianPricePerSqft: number | null;
  /** Total active residential listings Bridge reports for this city — a
   *  direct count, not an aggregate, so it is never gated by MIN_SAMPLE. */
  activeCount: number;
  /** ISO timestamp of the underlying Bridge fetch (persists across cache hits,
   *  so a cached value still reports when the number was actually true). */
  asOf: string;
  source: string;
  disclaimer: string;
}

export interface LeadMarketContextDeps {
  /** Injectable for tests — defaults to the global fetch. Production never
   *  sets this; it exists so scripts/verify-lead-market.ts can exercise
   *  every branch (populated / thin-sample / timeout / error) with zero
   *  network calls. */
  fetchImpl?: typeof fetch;
  /** Injectable Bridge token override for tests; defaults to
   *  process.env.BRIDGE_API_TOKEN, read fresh on every call (not cached in a
   *  module-level const) so tests can toggle "missing token" without a
   *  subprocess per case. */
  bridgeToken?: string;
  /** Injectable Bridge base URL override for tests; defaults to the same env
   *  resolution city-stats.ts uses. */
  bridgeBase?: string;
  /** Hard timeout in ms for the whole lookup. Defaults to 2500. Overridable
   *  so the timeout test doesn't have to actually wait 2.5s. */
  timeoutMs?: number;
  /** Injectable clock for tests (cache expiry math). Defaults to Date.now. */
  now?: () => number;
}

/** Minimal shape this module needs from a lead — a structural subset of
 *  leadScore.ts's ScorableLead, so every real call site (which passes a full
 *  lead/scorable object) just works without an import cycle. */
export interface MarketContextLeadInput {
  city?: string;
  propertyAddress?: string;
}

const DEFAULT_TIMEOUT_MS = 2500;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

function getBridgeToken(): string {
  return (process.env.BRIDGE_API_TOKEN ?? "").trim();
}

function getBridgeBase(): string {
  const dataset = (process.env.BRIDGE_DATASET_ID ?? process.env.BRIDGE_DATASET ?? "miamire").trim();
  return (process.env.BRIDGE_BASE_URL ?? `https://api.bridgedataoutput.com/api/v2/OData/${dataset}/Property`).trim();
}

/** Only P1/P2 alerts spend Bridge quota — P3 is nurture-track and this must
 *  never be called for it. Kept as a named, independently-testable decision
 *  rather than an inline tier check at each call site. */
export function shouldFetchMarketContext(tier: LeadTier): boolean {
  return tier === "P1" || tier === "P2";
}

// 24h in-memory cache, one entry per resolved MLS city — the same ephemeral-
// per-cold-start trade-off CLAUDE.md already accepts for the other
// Bridge-backed functions' in-memory caches (bridge-listings.ts,
// ticker-listings.ts). A lead alert doesn't need Blobs-grade persistence
// across cold starts, just to not re-spend quota on every lead that lands in
// the same city inside one warm instance. Caches the raw *sample* (including a
// thin one) so a chronically thin city isn't re-queried on every lead either —
// but never caches a timeout/error/no-token/unknown-city result, since those
// are either deterministic-for-the-process (no point caching) or transient
// (worth retrying next lead, not memoizing as "no data for 24h").
//
// The sample is cached rather than the finished LeadMarketContext because the
// context carries `requestedAs`, which is specific to the alias the lead typed
// ("Brickell") while the key is the resolved MLS city ("Miami"). Caching the
// context would label the next genuine Miami lead's alert "Miami (Brickell)",
// and — queried the other way round — strip a Brickell lead's submarket label.
// The sample is genuinely per-MLS-city, so it is the part that is safe to
// share; the context is rebuilt per request.
type CacheEntry = { sample: RawSample; asOf: string; expires: number };
const cache = new Map<string, CacheEntry>();

function delay<T>(ms: number, value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/**
 * Best-effort city resolution: the lead's own `city` field first, then a
 * fallback scan of `propertyAddress`'s comma-separated segments (several
 * forms — HeroSellerForm chief among them — collect a broad market label like
 * "Greater Miami / S. Florida" in `city` and the real, specific city only
 * inside the free-typed address). Both paths go through the SAME exact-match
 * allowlist as city-stats.ts, so this can only ever resolve to a real MLS
 * city or nothing — never a fuzzy guess.
 */
function resolveLeadCity(lead: MarketContextLeadInput): ResolvedCity | null {
  const direct = resolveMlsCity(lead.city ?? "");
  if (direct) return direct;

  const address = (lead.propertyAddress ?? "").trim();
  if (!address) return null;
  const segments = address.split(",").map((s) => s.trim()).filter(Boolean);
  // Walk from the end — a city name is far more likely to be the trailing
  // segment of a typed address ("1450 Brickell Ave, Miami") than the leading one.
  for (let i = segments.length - 1; i >= 0; i--) {
    const match = resolveMlsCity(segments[i]);
    if (match) return match;
  }
  return null;
}

interface RawSample {
  activeCount: number;
  prices: number[];
  doms: number[];
  ppsf: number[];
}

/** The proven city-stats.ts Bridge query, reused as-is (same filter, same
 *  three fields), with an AbortController wired to `timeoutMs` so a slow
 *  Bridge response can't hold the alert hostage even if the outer race
 *  somehow didn't win first. */
async function fetchRawSample(
  mlsCity: string,
  opts: { token: string; base: string; timeoutMs: number; fetchImpl: typeof fetch },
): Promise<RawSample> {
  const $filter =
    `City eq '${mlsCity.replace(/'/g, "''")}' and PropertyType eq 'Residential' and StandardStatus eq 'Active'`;
  const params = new URLSearchParams({
    $filter,
    $orderby: "ModificationTimestamp desc",
    $top: "200",
    $count: "true",
    $select: "ListPrice,DaysOnMarket,LivingArea",
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs);
  try {
    const res = await opts.fetchImpl(`${opts.base}?${params.toString()}`, {
      headers: { Authorization: `Bearer ${opts.token}` },
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`Bridge API responded ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const rows: { ListPrice?: number; DaysOnMarket?: number; LivingArea?: number }[] = data?.value ?? [];
    const activeCount: number = data?.["@odata.count"] ?? rows.length;

    const prices = rows.map((r) => r.ListPrice).filter((p): p is number => typeof p === "number" && p > 0);
    const doms = rows.map((r) => r.DaysOnMarket).filter((d): d is number => typeof d === "number" && d >= 0);
    const ppsf = rows
      .filter((r) => typeof r.ListPrice === "number" && r.ListPrice > 0 && typeof r.LivingArea === "number" && r.LivingArea! > 100)
      .map((r) => Math.round(r.ListPrice! / r.LivingArea!));

    return { activeCount, prices, doms, ppsf };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Applies the MIN_SAMPLE floor. The whole context is withheld when the price
 * sample itself is thin — the same threshold city-stats.ts's `available` flag
 * uses — because there is no downstream "available" check on a phone alert
 * the way there is on the public stats card; this module has to enforce it
 * itself before a number ever reaches Carlos. Days-on-market and $/sqft are
 * additionally, independently gated on their own sample sizes, since a city
 * can have decent price coverage but sparse sqft/DOM data on the same rows —
 * never interpolated or borrowed from a different sample.
 */
function buildContext(resolved: ResolvedCity, sample: RawSample, asOf: string): LeadMarketContext | null {
  if (sample.prices.length < MIN_SAMPLE) return null;

  return {
    city: resolved.mlsCity,
    requestedAs: resolved.requested !== resolved.mlsCity ? resolved.requested : null,
    medianListPrice: median(sample.prices) as number, // non-null: prices.length already cleared MIN_SAMPLE above
    avgDaysOnMarket:
      sample.doms.length >= MIN_SAMPLE
        ? Math.round(sample.doms.reduce((a, b) => a + b, 0) / sample.doms.length)
        : null,
    medianPricePerSqft: sample.ppsf.length >= MIN_SAMPLE ? median(sample.ppsf) : null,
    activeCount: sample.activeCount,
    asOf,
    source: MLS_SOURCE_LABEL,
    disclaimer: IDX_DISCLAIMER,
  };
}

async function computeLeadMarketContext(
  lead: MarketContextLeadInput,
  deps: LeadMarketContextDeps,
): Promise<LeadMarketContext | null> {
  const token = deps.bridgeToken ?? getBridgeToken();
  if (!token) return null;

  const resolved = resolveLeadCity(lead);
  if (!resolved) return null;

  const now = deps.now ?? Date.now;
  const cacheKey = resolved.mlsCity.toLowerCase();
  const cached = cache.get(cacheKey);
  if (cached && cached.expires > now()) return buildContext(resolved, cached.sample, cached.asOf);

  const base = deps.bridgeBase ?? getBridgeBase();
  const fetchImpl = deps.fetchImpl ?? fetch;
  const timeoutMs = deps.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  const sample = await fetchRawSample(resolved.mlsCity, { token, base, timeoutMs, fetchImpl });
  const asOf = new Date(now()).toISOString();
  cache.set(cacheKey, { sample, asOf, expires: now() + CACHE_TTL_MS });
  return buildContext(resolved, sample, asOf);
}

/**
 * Resolves a lead's submarket and returns a live MLS snapshot, or `null` when
 * there's nothing safe to say. Never throws, never runs long — call only for
 * P1/P2 leads (see `shouldFetchMarketContext`); P3 must skip this entirely so
 * no quota is spent on nurture-track leads.
 *
 * Hard-timeout AND try/catch, both unconditionally: `Promise.race` against a
 * `timeoutMs` timer is the primary guarantee that this resolves in time no
 * matter what (a hung fetch, a hung DNS lookup, anything); the AbortController
 * inside fetchRawSample is a second, independent cut against the same clock;
 * the outer try/catch is the backstop against anything else — a malformed
 * response, a thrown error of any shape. Whichever fires, the result is the
 * same: `null`, logged, alert unaffected.
 */
export async function getLeadMarketContext(
  lead: MarketContextLeadInput,
  deps: LeadMarketContextDeps = {},
): Promise<LeadMarketContext | null> {
  const timeoutMs = deps.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  try {
    return await Promise.race([
      computeLeadMarketContext(lead, deps),
      delay(timeoutMs, null),
    ]);
  } catch (err) {
    console.error(
      "leadMarketContext: suppressed — alert still sends without market context:",
      err instanceof Error ? err.message : err,
    );
    return null;
  }
}
