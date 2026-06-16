import type { Handler, HandlerEvent } from "@netlify/functions";

const BRIDGE_TOKEN = process.env.BRIDGE_API_TOKEN ?? "";
// Dataset slug is configurable so this matches every other Bridge function.
// Default "miamire" (Miami Realtors Exchange); override via BRIDGE_DATASET_ID.
const BRIDGE_DATASET_ID = (process.env.BRIDGE_DATASET_ID ?? "miamire").trim();
const BRIDGE_BASE = `https://api.bridgedataoutput.com/api/v2/OData/${BRIDGE_DATASET_ID}/Property`;

const cache: Map<string, { body: string; expires: number }> = new Map();
const CACHE_TTL_MS = 1800 * 1000; // 30-minute cache for listings page

const ALLOWED_ZONES = new Set([
  "Miami", "Brickell", "Coral Gables", "Coconut Grove", "Key Biscayne",
  "Miami Beach", "Bal Harbour", "Sunny Isles Beach", "Aventura", "Weston",
  "Pinecrest", "Doral", "Hialeah", "Homestead", "Kendall",
  "Fort Lauderdale", "Hollywood", "Hallandale Beach", "Pembroke Pines",
  "Coral Springs", "Boca Raton", "Plantation", "Miramar",
  "Sunrise", "North Miami", "Pompano Beach",
]);

const ALLOWED_TYPES = new Set(["Residential", "Condominium", "Single Family Residence"]);
const ALLOWED_STATUS = new Set(["Active", "Pending"]);

// Whitelisted sort orders — never interpolate raw client input into $orderby.
const SORTS: Record<string, string> = {
  newest: "ModificationTimestamp desc",
  "price-desc": "ListPrice desc",
  "price-asc": "ListPrice asc",
};

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  if (!BRIDGE_TOKEN) {
    return {
      statusCode: 503,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "not_configured" }),
    };
  }

  const qs = event.queryStringParameters ?? {};

  const zone = (qs.zone ?? "").trim();
  const status = ALLOWED_STATUS.has(qs.status ?? "") ? (qs.status as string) : "Active";
  const minPrice = qs.minPrice ? Math.max(0, parseInt(qs.minPrice, 10)) : 0;
  const maxPrice = qs.maxPrice ? parseInt(qs.maxPrice, 10) : 0;
  const beds = qs.beds ? Math.max(0, parseInt(qs.beds, 10)) : 0;
  const propType = ALLOWED_TYPES.has(qs.type ?? "") ? (qs.type as string) : "";
  const orderby = SORTS[qs.sort ?? "newest"] ?? SORTS.newest;
  // Keyword search across street address / building name. Escaped + length-capped.
  const keyword = (qs.q ?? "").trim().replace(/'/g, "''").slice(0, 60);
  const page = Math.max(1, parseInt(qs.page ?? "1", 10));
  const perPage = 24;
  const skip = (page - 1) * perPage;

  if (zone && !ALLOWED_ZONES.has(zone)) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Invalid zone" }),
    };
  }

  const filters: string[] = [`StandardStatus eq '${status}'`];
  if (zone) filters.push(`City eq '${zone.replace(/'/g, "''")}'`);
  if (minPrice > 0) filters.push(`ListPrice ge ${minPrice}`);
  if (maxPrice > 0) filters.push(`ListPrice le ${maxPrice}`);
  if (beds > 0) filters.push(`BedroomsTotal ge ${beds}`);
  if (propType) filters.push(`PropertyType eq '${propType.replace(/'/g, "''")}'`);
  if (keyword) filters.push(`(contains(UnparsedAddress,'${keyword}') or contains(City,'${keyword}'))`);

  const $filter = filters.join(" and ");

  const cacheKey = `${$filter}|${orderby}|${page}`;
  const cached = cache.get(cacheKey);
  if (cached && cached.expires > Date.now()) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=1800", "X-Cache": "HIT" },
      body: cached.body,
    };
  }

  const params = new URLSearchParams({
    $filter,
    $orderby: orderby,
    $top: String(perPage),
    $skip: String(skip),
    $count: "true",
    $select: "ListingId,UnparsedAddress,City,StateOrProvince,PostalCode,ListPrice,BedroomsTotal,BathroomsTotalDecimal,LivingArea,PropertyType,StandardStatus,DaysOnMarket,ListOfficeName,ModificationTimestamp,Media",
  });

  try {
    const res = await fetch(`${BRIDGE_BASE}?${params.toString()}`, {
      headers: { Authorization: `Bearer ${BRIDGE_TOKEN}` },
    });
    if (!res.ok) {
      return {
        statusCode: res.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: `Bridge error: ${res.status}` }),
      };
    }
    const data = await res.json();
    const value = data?.value ?? [];
    const totalCount: number = data?.["@odata.count"] ?? value.length;

    const body = JSON.stringify({ value, totalCount, lastUpdated: new Date().toISOString(), page, perPage });
    cache.set(cacheKey, { body, expires: Date.now() + CACHE_TTL_MS });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=1800",
        "Access-Control-Allow-Origin": "https://homesprofessional.com",
      },
      body,
    };
  } catch {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "fetch_failed" }),
    };
  }
};
