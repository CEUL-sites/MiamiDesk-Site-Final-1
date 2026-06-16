import type { Handler } from "@netlify/functions";

const BRIDGE_TOKEN = process.env.BRIDGE_API_TOKEN ?? "";
// Dataset slug is configurable so this matches every other Bridge function.
const BRIDGE_DATASET_ID = (process.env.BRIDGE_DATASET_ID ?? "miamire").trim();
const BRIDGE_BASE  = `https://api.bridgedataoutput.com/api/v2/OData/${BRIDGE_DATASET_ID}/Property`;

let cache: { body: string; expires: number } | null = null;
const CACHE_TTL_MS = 3600 * 1000;

const SELECT = "ListingId,UnparsedAddress,City,PostalCode,ListPrice,BedroomsTotal,BathroomsTotalDecimal,LivingArea,PropertyType,StandardStatus";
const STATUS  = "(StandardStatus eq 'Active' or StandardStatus eq 'Pending')";

async function fetchBucket(
  priceMin: number,
  priceMax: number | null,
  top: number,
): Promise<Record<string, unknown>[]> {
  const priceClause = priceMax
    ? `ListPrice ge ${priceMin} and ListPrice lt ${priceMax}`
    : `ListPrice ge ${priceMin}`;
  const params = new URLSearchParams({
    $filter:  `${STATUS} and ${priceClause}`,
    $orderby: "ListPrice desc",
    $top:     String(top),
    $select:  SELECT,
  });
  const res = await fetch(`${BRIDGE_BASE}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${BRIDGE_TOKEN}` },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data?.value ?? []) as Record<string, unknown>[];
}

/** Interleave three buckets at a 2-2-1 ratio (cheap · mid · luxury) */
function blend(
  cheap: Record<string, unknown>[],
  mid:   Record<string, unknown>[],
  lux:   Record<string, unknown>[],
): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  let ci = 0, mi = 0, li = 0;
  while (ci < cheap.length || mi < mid.length || li < lux.length) {
    for (let k = 0; k < 2 && ci < cheap.length; k++) out.push(cheap[ci++]);
    for (let k = 0; k < 2 && mi < mid.length;   k++) out.push(mid[mi++]);
    if (li < lux.length) out.push(lux[li++]);
  }
  return out;
}

export const handler: Handler = async () => {
  if (!BRIDGE_TOKEN) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      body: JSON.stringify({ value: [], live: false, error: "Bridge IDX token not configured" }),
    };
  }

  if (cache && cache.expires > Date.now()) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" },
      body: cache.body,
    };
  }

  try {
    // Three price buckets — parallel fetches
    // cheap  (~50%): $600K–$1.5M  → around $1M, above and below
    // mid    (~40%): $1.5M–$5M   → aspirational range
    // luxury (~10%): $5M+         → small luxury slice
    const [cheap, mid, lux] = await Promise.all([
      fetchBucket(600_000,   1_500_000, 15),
      fetchBucket(1_500_000, 5_000_000, 12),
      fetchBucket(5_000_000, null,       3),
    ]);

    const value = blend(cheap, mid, lux);

    const body = JSON.stringify({
      value,
      live: true,
      source: "Bridge IDX / Miami REALTORS dataset",
      updatedAt: new Date().toISOString(),
    });
    cache = { body, expires: Date.now() + CACHE_TTL_MS };
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "https://homesprofessional.com",
      },
      body,
    };
  } catch {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: [], live: false, error: "fetch_failed" }),
    };
  }
};
