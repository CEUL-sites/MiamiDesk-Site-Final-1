import type { Handler, HandlerEvent } from "@netlify/functions";

const BRIDGE_TOKEN = process.env.BRIDGE_API_TOKEN ?? "";
const BRIDGE_BASE = "https://api.bridgedataoutput.com/api/v2/OData/miamire/Property";

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

  const params = new URLSearchParams({
    access_token: BRIDGE_TOKEN,
    $filter: "StandardStatus eq 'Active' or StandardStatus eq 'Pending'",
    $orderby: "ModificationTimestamp desc",
    $top: "24",
    $select: [
      "ListingId", "UnparsedAddress", "City", "PostalCode",
      "ListPrice", "BedroomsTotal", "BathroomsTotalDecimal",
      "LivingArea", "PropertyType", "StandardStatus",
    ].join(","),
  });

  try {
    const res = await fetch(`${BRIDGE_BASE}?${params.toString()}`);
    if (!res.ok) {
      return {
        statusCode: res.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: `Bridge API error: ${res.status}` }),
      };
    }
    const data = await res.json();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
        "Access-Control-Allow-Origin": "https://homesprofessional.com",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to fetch listings" }),
    };
  }
};
