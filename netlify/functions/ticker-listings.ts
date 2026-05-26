import type { Handler } from "@netlify/functions";

const BRIDGE_TOKEN = process.env.BRIDGE_API_TOKEN ?? "";
const BRIDGE_BASE = "https://api.bridgedataoutput.com/api/v2/OData/miamire/Property";

let cache: { body: string; expires: number } | null = null;
const CACHE_TTL_MS = 3600 * 1000;

export const handler: Handler = async () => {
  if (!BRIDGE_TOKEN) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      body: JSON.stringify({
        value: [],
        live: false,
        error: "Bridge IDX token not configured",
      }),
    };
  }

  if (cache && cache.expires > Date.now()) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" },
      body: cache.body,
    };
  }

  const params = new URLSearchParams({
    access_token: BRIDGE_TOKEN,
    $filter: "(StandardStatus eq 'Active' or StandardStatus eq 'Pending') and ListPrice ge 900000",
    $orderby: "ListPrice desc",
    $top: "30",
    $select: "ListingId,UnparsedAddress,City,PostalCode,ListPrice,BedroomsTotal,BathroomsTotalDecimal,LivingArea,PropertyType,StandardStatus",
  });

  try {
    const res = await fetch(`${BRIDGE_BASE}?${params.toString()}`);
    if (!res.ok) {
      return {
        statusCode: res.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: [], live: false, error: `Bridge API error: ${res.status}` }),
      };
    }
    const data = await res.json();
    const body = JSON.stringify({
      value: data?.value ?? [],
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
