import type { Handler, HandlerEvent } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

// City-level market snapshot from Bridge IDX — active residential listings only.
// Serves NeighborhoodMarketStats (sell pages) and the SellerIntakeForm step-1
// interstitial. Responses are cached in Netlify Blobs for 24h per city so the
// Bridge API quota is touched at most once a day per market.

const BRIDGE_TOKEN = process.env.BRIDGE_API_TOKEN ?? "";
const BRIDGE_DATASET = process.env.BRIDGE_DATASET ?? "miamire";
const BRIDGE_BASE = process.env.BRIDGE_BASE_URL
  ?? `https://api.bridgedataoutput.com/api/v2/OData/${BRIDGE_DATASET}/Property`;

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
// Below this many active listings the medians are too thin to show publicly.
const MIN_SAMPLE = 8;

const IDX_DISCLAIMER =
  "Listing information is provided in part by the Miami and South Florida REALTORS® " +
  "and/or BeachesMLS via IDX. Information is deemed reliable but not guaranteed and is " +
  "subject to change without notice. Verify all information before making real estate decisions.";

// Cities we serve stats for — matches the seller intake city list + sell pages.
const ALLOWED_CITIES = [
  "Aventura", "Bal Harbour", "Boca Raton", "Brickell", "Coconut Grove",
  "Coral Gables", "Coral Springs", "Doral", "Downtown Miami", "Fort Lauderdale",
  "Hallandale Beach", "Hialeah", "Hollywood", "Homestead", "Kendall", "Key Biscayne",
  "Miami", "Miami Beach", "Miami Lakes", "Miramar", "North Miami", "Palm Beach",
  "Pembroke Pines", "Pinecrest", "Plantation", "Pompano Beach", "South Miami",
  "Sunny Isles Beach", "Sunrise", "Weston", "West Palm Beach",
];
const CITY_LOOKUP = new Map(ALLOWED_CITIES.map((c) => [c.toLowerCase(), c]));

// Neighborhoods whose MLS "City" field is the parent municipality.
const CITY_ALIASES: Record<string, string> = {
  brickell: "Miami",
  "coconut grove": "Miami",
  "downtown miami": "Miami",
  kendall: "Miami",
};

interface CityStats {
  available: boolean;
  city: string;
  activeCount: number;
  medianListPrice: number | null;
  avgDaysOnMarket: number | null;
  medianPricePerSqft: number | null;
  lastUpdated: string;
}

function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

async function fetchCityStats(city: string): Promise<CityStats> {
  const $filter =
    `City eq '${city.replace(/'/g, "''")}' and PropertyType eq 'Residential' and StandardStatus eq 'Active'`;
  const params = new URLSearchParams({
    $filter,
    $orderby: "ModificationTimestamp desc",
    $top: "200",
    $count: "true",
    $select: "ListPrice,DaysOnMarket,LivingArea",
  });

  const res = await fetch(`${BRIDGE_BASE}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${BRIDGE_TOKEN}` },
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

  return {
    available: prices.length >= MIN_SAMPLE,
    city,
    activeCount,
    medianListPrice: median(prices),
    avgDaysOnMarket: doms.length ? Math.round(doms.reduce((a, b) => a + b, 0) / doms.length) : null,
    medianPricePerSqft: median(ppsf),
    lastUpdated: new Date().toISOString(),
  };
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=3600",
  };
  const unavailable = (city: string) =>
    ({ statusCode: 200, headers, body: JSON.stringify({ available: false, city, disclaimer: IDX_DISCLAIMER }) });

  const raw = (event.queryStringParameters?.city ?? "").trim().toLowerCase();
  const requested = CITY_LOOKUP.get(raw);
  if (!requested) return unavailable(raw);
  const mlsCity = CITY_ALIASES[raw] ?? requested;

  if (!BRIDGE_TOKEN) return unavailable(mlsCity);

  const blobKey = `city:${mlsCity.toLowerCase().replace(/\s+/g, "-")}`;
  let store: ReturnType<typeof getStore> | null = null;
  let cached: (CityStats & { stale?: boolean }) | null = null;
  try {
    store = getStore("city-stats");
    cached = (await store.get(blobKey, { type: "json" })) as CityStats | null;
  } catch {
    // Blobs unavailable — fall through to a direct fetch without caching
  }

  if (cached && Date.now() - new Date(cached.lastUpdated).getTime() < CACHE_TTL_MS) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ...cached, source: "Miami and South Florida REALTORS® MLS", disclaimer: IDX_DISCLAIMER }),
    };
  }

  try {
    const stats = await fetchCityStats(mlsCity);
    if (store) {
      try { await store.setJSON(blobKey, stats); } catch { /* cache write is best-effort */ }
    }
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ...stats, source: "Miami and South Florida REALTORS® MLS", disclaimer: IDX_DISCLAIMER }),
    };
  } catch (err) {
    console.error("city-stats fetch error:", err instanceof Error ? err.message : err);
    // Serve the expired cache rather than nothing
    if (cached) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ...cached, stale: true, source: "Miami and South Florida REALTORS® MLS", disclaimer: IDX_DISCLAIMER }),
      };
    }
    return unavailable(mlsCity);
  }
};
