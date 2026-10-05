import type { Context } from "@netlify/functions";
import { mlsStore } from "./_shared/mlsStore";
import { isMlsFresh, mlsCacheControl } from "../../src/lib/mlsFreshness";
import { resolveMlsCity, MIN_SAMPLE, IDX_DISCLAIMER, MLS_SOURCE_LABEL, median } from "./_shared/mlsCity";

// City-level market snapshot from Bridge IDX — active residential listings only.
// Legacy public API; current sell-page statistics are dated official reports. Responses are cached in Netlify Blobs for 6h per city so the
// Bridge API quota is touched at most four times a day per market.
//
// The city vocabulary (ALLOWED_CITIES/CITY_ALIASES/resolveMlsCity), the
// MIN_SAMPLE floor, the IDX disclaimer text, and median() live in
// ./_shared/mlsCity so the lead market-context lookup (_shared/
// leadMarketContext.ts) shares the exact same idea of "Weston" instead of a
// second, driftable copy. Everything below — the Bridge fetch itself, the
// Blobs cache, the response shape — is unchanged.

const BRIDGE_TOKEN = process.env.BRIDGE_API_TOKEN ?? "";
const BRIDGE_DATASET = (process.env.BRIDGE_DATASET_ID ?? process.env.BRIDGE_DATASET ?? "miamire").trim();
const BRIDGE_BASE = process.env.BRIDGE_BASE_URL
  ?? `https://api.bridgedataoutput.com/api/v2/OData/${BRIDGE_DATASET}/Property`;

const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

interface CityStats {
  available: boolean;
  city: string;
  activeCount: number;
  medianListPrice: number | null;
  avgDaysOnMarket: number | null;
  medianPricePerSqft: number | null;
  lastUpdated: string;
}

async function fetchCityStats(city: string, fetchImpl: typeof fetch, now: number): Promise<CityStats> {
  const $filter =
    `City eq '${city.replace(/'/g, "''")}' and PropertyType eq 'Residential' and StandardStatus eq 'Active'`;
  const params = new URLSearchParams({
    $filter,
    $orderby: "ModificationTimestamp desc",
    $top: "200",
    $count: "true",
    $select: "ListPrice,DaysOnMarket,LivingArea",
  });

  const res = await fetchImpl(`${BRIDGE_BASE}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${BRIDGE_TOKEN}` },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) {
    throw new Error(`Bridge API responded ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  if (!Array.isArray(data?.value)) throw new Error("Invalid Bridge response");
  const rows: { ListPrice?: number; DaysOnMarket?: number; LivingArea?: number }[] = data?.value ?? [];
  const activeCount: number = data?.["@odata.count"] ?? rows.length;

  const prices = rows.map((r) => r.ListPrice).filter((p): p is number => typeof p === "number" && p > 0);
  const doms = rows.map((r) => r.DaysOnMarket).filter((d): d is number => typeof d === "number" && d >= 0);
  const ppsf = rows
    .filter((r) => typeof r.ListPrice === "number" && r.ListPrice > 0 && typeof r.LivingArea === "number" && r.LivingArea! > 100)
    .map((r) => Math.round(r.ListPrice! / r.LivingArea!));

  return {
    available: prices.length >= MIN_SAMPLE,
    city,
    activeCount,
    medianListPrice: median(prices),
    avgDaysOnMarket: doms.length ? Math.round(doms.reduce((a, b) => a + b, 0) / doms.length) : null,
    medianPricePerSqft: median(ppsf),
    lastUpdated: new Date(now).toISOString(),
  };
}

export default async (request: Request, context: Context) => {
  if (request.method !== "GET") return new Response("Method Not Allowed", { status: 405, headers: { "Cache-Control": "no-store" } });

  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=3600",
  };
  const unavailable = (city: string) =>
    new Response(JSON.stringify({ available: false, city, disclaimer: IDX_DISCLAIMER }), { headers: { ...headers, "Cache-Control": "no-store" } });

  const raw = (new URL(request.url).searchParams.get("city") ?? "").trim().toLowerCase();
  const resolved = resolveMlsCity(raw);
  if (!resolved) return unavailable(raw);
  const mlsCity = resolved.mlsCity;

  if (!BRIDGE_TOKEN) return unavailable(mlsCity);

  let store: SnapshotStore | null = null;
  try {
    store = mlsStore('city-stats', context.deploy.context);
  } catch { /* direct Bridge fallback when storage is unavailable */ }
  const result = await loadCitySnapshot(mlsCity, store);
  return new Response(result.body, { status: result.statusCode, headers: result.headers });
};

interface SnapshotStore {
  get(key: string, options: { type: 'json' }): Promise<unknown>;
  setJSON(key: string, data: unknown): Promise<unknown>;
}
export async function loadCitySnapshot(city: string, store: SnapshotStore | null, fetchImpl: typeof fetch = fetch, now = Date.now()) {
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };
  const unavailable = () => ({ statusCode: 200, headers, body: JSON.stringify({ available: false, city, stale: true, disclaimer: IDX_DISCLAIMER }) });
  const key = `city:${city.toLowerCase().replace(/\s+/g, '-')}`;
  let cached: CityStats | null = null;
  try { cached = await store?.get(key, { type: 'json' }) as CityStats | null; }
  catch { /* proceed to direct fetch */ }
  const cachedFresh = cached && isMlsFresh(cached.lastUpdated, now);
  const respond = (stats: CityStats, stale = false) => ({
    statusCode: 200,
    headers: { ...headers, 'Cache-Control': mlsCacheControl(stats.lastUpdated, now) },
    body: JSON.stringify({ ...stats, lastSuccessfulRefresh: stats.lastUpdated, stale, source: MLS_SOURCE_LABEL, disclaimer: IDX_DISCLAIMER }),
  });
  if (cachedFresh && now - Date.parse(cached!.lastUpdated) < CACHE_TTL_MS) return respond(cached!);
  try {
    const stats = await fetchCityStats(city, fetchImpl, now);
    try { await store?.setJSON(key, { ...stats, lastSuccessfulRefresh: stats.lastUpdated }); }
    catch { console.warn('[city-stats] cache write failed'); }
    return respond(stats);
  } catch {
    console.error('[city-stats] Bridge fetch failed');
    return cachedFresh ? respond(cached!, true) : unavailable();
  }
}
