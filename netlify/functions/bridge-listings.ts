import type { Handler, HandlerEvent } from "@netlify/functions";

const BRIDGE_TOKEN = process.env.BRIDGE_API_TOKEN ?? "";
// BRIDGE_DATASET_ID: set in Netlify env vars. Common values: "miamire", "mar", "miami".
// Verify your dataset ID in the Bridge Data Output dashboard → API Access.
const BRIDGE_DATASET_ID = (process.env.BRIDGE_DATASET_ID ?? "miamire").trim();
const BRIDGE_BASE = `https://api.bridgedataoutput.com/api/v2/OData/${BRIDGE_DATASET_ID}/Property`;

// Simple in-process cache: key → { body, expires }
const cache: Map<string, { body: string; expires: number }> = new Map();
const CACHE_TTL_MS = 3600 * 1000;

function buildFilter(params: {
  city: string;
  status: string;
  minPrice?: number;
  maxPrice?: number;
  propertyType?: string;
  mlsArea?: string;
}): string {
  const parts: string[] = [];

  if (params.city) {
    parts.push(`City eq '${params.city.replace(/'/g, "''")}'`);
  }
  if (params.mlsArea) {
    parts.push(`MLSAreaMajor eq '${params.mlsArea.replace(/'/g, "''")}'`);
  }
  if (params.status) {
    parts.push(`StandardStatus eq '${params.status}'`);
  }
  if (params.minPrice) {
    parts.push(`ListPrice ge ${params.minPrice}`);
  }
  if (params.maxPrice) {
    parts.push(`ListPrice le ${params.maxPrice}`);
  }
  if (params.propertyType) {
    parts.push(`PropertyType eq '${params.propertyType.replace(/'/g, "''")}'`);
  }

  return parts.join(" and ");
}

export const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  if (!BRIDGE_TOKEN) {
    return {
      statusCode: 503,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "API token not configured" }),
    };
  }

  const qs = event.queryStringParameters ?? {};

  const city = (qs.city ?? "").trim();
  const top = Math.min(parseInt(qs.top ?? "50", 10) || 50, 50);
  const status = (qs.status ?? "Active").trim();
  const minPrice = qs.minPrice ? parseInt(qs.minPrice, 10) : undefined;
  const maxPrice = qs.maxPrice ? parseInt(qs.maxPrice, 10) : undefined;
  const propertyType = qs.propertyType?.trim();
  const mlsArea = qs.mlsArea?.trim();

  if (!city) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "city param is required" }),
    };
  }

  const cacheKey = JSON.stringify({ city, top, status, minPrice, maxPrice, propertyType, mlsArea });
  const cached = cache.get(cacheKey);
  if (cached && cached.expires > Date.now()) {
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
        "X-Cache": "HIT",
      },
      body: cached.body,
    };
  }

  const $filter = buildFilter({ city, status, minPrice, maxPrice, propertyType, mlsArea });

  const $select = [
    "ListingId", "ListingKey", "UnparsedAddress", "City", "PostalCode",
    "ListPrice", "BedroomsTotal", "BathroomsTotalInteger", "BathroomsTotalDecimal",
    "LivingArea", "PropertyType", "StandardStatus", "DaysOnMarket",
    "MLSAreaMajor", "Media",
  ].join(",");

  const params = new URLSearchParams({
    access_token: BRIDGE_TOKEN,
    $filter,
    $orderby: "ListPrice desc",
    $top: String(top),
    $count: "true",
    $select,
  });

  try {
    const res = await fetch(`${BRIDGE_BASE}?${params.toString()}`);
    if (!res.ok) {
      let bridgeDetail = "";
      try { bridgeDetail = await res.text(); } catch { /* ignore */ }
      return {
        statusCode: res.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: `Bridge API error: ${res.status}`,
          dataset: BRIDGE_DATASET_ID,
          detail: bridgeDetail.slice(0, 500),
        }),
      };
    }

    const data = await res.json();
    const value = data?.value ?? [];
    const totalCount: number = data?.["@odata.count"] ?? value.length;

    const responseBody = JSON.stringify({
      value,
      totalCount,
      lastUpdated: new Date().toISOString(),
    });

    cache.set(cacheKey, { body: responseBody, expires: Date.now() + CACHE_TTL_MS });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
        "X-Cache": "MISS",
        "Access-Control-Allow-Origin": "https://homesprofessional.com",
      },
      body: responseBody,
    };
  } catch {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to fetch listings" }),
    };
  }
};
