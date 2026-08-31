import type { Handler } from "@netlify/functions";
import {
  APPROVED_CITIES,
  MAX_PRICE,
  MIN_PRICE,
  mostRecentListingModification,
  selectTickerListings,
  TtlResponseCache,
  type RawTickerListing,
} from "./_shared/tickerInventory";

const BRIDGE_TOKEN = process.env.BRIDGE_API_TOKEN ?? "";
const BRIDGE_DATASET_ID = (process.env.BRIDGE_DATASET_ID ?? "miamire").trim();
const BRIDGE_BASE = `https://api.bridgedataoutput.com/api/v2/OData/${BRIDGE_DATASET_ID}/Property`;
const CACHE_TTL_MS = 30 * 60 * 1000;
const MAX_DATA_AGE_MS = 24 * 60 * 60 * 1000;
const cache = new TtlResponseCache();

const SELECT = [
  "ListingId", "ListingKey", "UnparsedAddress", "City", "PostalCode", "ListPrice",
  "BedroomsTotal", "BathroomsTotalDecimal", "LivingArea", "PropertyType", "PropertySubType",
  "StandardStatus", "ModificationTimestamp", "ListOfficeName",
].join(",");

const RESIDENTIAL_FILTER = [
  "StandardStatus eq 'Active'",
  "PropertyType eq 'Residential'",
  "(PropertySubType eq 'Single Family Residence' or PropertySubType eq 'Condominium' or PropertySubType eq 'Townhouse')",
  `ListPrice ge ${MIN_PRICE} and ListPrice le ${MAX_PRICE}`,
  `(${APPROVED_CITIES.map((city) => `City eq '${city.replace(/'/g, "''")}'`).join(" or ")})`,
].join(" and ");

export interface TickerPayload {
  value: ReturnType<typeof selectTickerListings>;
  live: boolean;
  source: string;
  dataFreshness: string | null;
  fetchedAt: string;
  error?: string;
}

export async function loadTickerPayload(fetchImpl: typeof fetch, fetchedAt = new Date().toISOString()): Promise<TickerPayload> {
  const params = new URLSearchParams({
    $filter: RESIDENTIAL_FILTER,
    $orderby: "ModificationTimestamp desc",
    $top: "100",
    $select: SELECT,
  });
  const response = await fetchImpl(`${BRIDGE_BASE}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${BRIDGE_TOKEN}` },
  });
  if (!response.ok) throw new Error(`Bridge IDX responded ${response.status}`);
  const data = await response.json();
  const value = selectTickerListings((data?.value ?? []) as RawTickerListing[]);
  const dataFreshness = mostRecentListingModification(value);
  const freshnessAge = dataFreshness ? Date.parse(fetchedAt) - Date.parse(dataFreshness) : Number.POSITIVE_INFINITY;
  const isFresh = freshnessAge >= 0 && freshnessAge <= MAX_DATA_AGE_MS;
  return {
    value: isFresh ? value : [],
    live: value.length > 0 && isFresh,
    source: "Bridge IDX / Miami and South Florida REALTORS dataset",
    dataFreshness,
    fetchedAt,
    ...(value.length === 0 ? { error: "no_valid_inventory" } : !isFresh ? { error: "stale_inventory" } : {}),
  };
}

function json(statusCode: number, body: string, cacheControl: string, cacheStatus?: string) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": cacheControl,
      "Access-Control-Allow-Origin": "https://homesprofessional.com",
      ...(cacheStatus ? { "X-Cache": cacheStatus } : {}),
    },
    body,
  };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod && event.httpMethod !== "GET") return json(405, JSON.stringify({ error: "method_not_allowed" }), "no-store");
  if (!BRIDGE_TOKEN) {
    return json(503, JSON.stringify({ value: [], live: false, dataFreshness: null, error: "not_configured" }), "no-store");
  }
  const cached = cache.get();
  if (cached) return json(200, cached, "public, max-age=300, stale-while-revalidate=900", "HIT");
  try {
    const payload = await loadTickerPayload(fetch);
    const body = JSON.stringify(payload);
    cache.set(body, CACHE_TTL_MS);
    return json(200, body, "public, max-age=300, stale-while-revalidate=900", "MISS");
  } catch {
    return json(502, JSON.stringify({ value: [], live: false, dataFreshness: null, error: "fetch_failed" }), "no-store");
  }
};
