import type { Handler } from "@netlify/functions";

const BRIDGE_TOKEN = process.env.BRIDGE_API_TOKEN ?? "";
const BRIDGE_BASE = "https://api.bridgedataoutput.com/api/v2/OData/miamire/Property";

let cache: { body: string; expires: number } | null = null;
const CACHE_TTL_MS = 3600 * 1000;

// Representative South Florida listings shown when Bridge API is not yet configured.
const SAMPLE_LISTINGS = [
  { ListingId: "A11500001", UnparsedAddress: "1000 Brickell Ave #3200", City: "Miami", PostalCode: "33131", ListPrice: 2850000, BedroomsTotal: 3, BathroomsTotalDecimal: 3, LivingArea: 2340, PropertyType: "Condominium", StandardStatus: "Active" },
  { ListingId: "A11500002", UnparsedAddress: "3485 Main Hwy", City: "Coconut Grove", PostalCode: "33133", ListPrice: 5200000, BedroomsTotal: 5, BathroomsTotalDecimal: 4.5, LivingArea: 4890, PropertyType: "Single Family Residence", StandardStatus: "Active" },
  { ListingId: "A11500003", UnparsedAddress: "900 Biscayne Blvd #4700", City: "Miami", PostalCode: "33132", ListPrice: 1750000, BedroomsTotal: 2, BathroomsTotalDecimal: 2, LivingArea: 1620, PropertyType: "Condominium", StandardStatus: "Active" },
  { ListingId: "A11500004", UnparsedAddress: "601 Coral Way", City: "Coral Gables", PostalCode: "33134", ListPrice: 3400000, BedroomsTotal: 4, BathroomsTotalDecimal: 3.5, LivingArea: 3210, PropertyType: "Single Family Residence", StandardStatus: "Pending" },
  { ListingId: "A11500005", UnparsedAddress: "1000 S Pointe Dr #1704", City: "Miami Beach", PostalCode: "33139", ListPrice: 4100000, BedroomsTotal: 3, BathroomsTotalDecimal: 3, LivingArea: 2780, PropertyType: "Condominium", StandardStatus: "Active" },
  { ListingId: "A11500006", UnparsedAddress: "15901 Collins Ave #1801", City: "Sunny Isles Beach", PostalCode: "33160", ListPrice: 6750000, BedroomsTotal: 4, BathroomsTotalDecimal: 4.5, LivingArea: 3980, PropertyType: "Condominium", StandardStatus: "Active" },
  { ListingId: "A11500007", UnparsedAddress: "485 Brickell Ave #4502", City: "Miami", PostalCode: "33131", ListPrice: 1290000, BedroomsTotal: 2, BathroomsTotalDecimal: 2, LivingArea: 1190, PropertyType: "Condominium", StandardStatus: "Active" },
  { ListingId: "A11500008", UnparsedAddress: "2525 Salzedo St", City: "Coral Gables", PostalCode: "33134", ListPrice: 8900000, BedroomsTotal: 6, BathroomsTotalDecimal: 6.5, LivingArea: 7200, PropertyType: "Single Family Residence", StandardStatus: "Active" },
  { ListingId: "A11500009", UnparsedAddress: "17001 Collins Ave #4305", City: "Sunny Isles Beach", PostalCode: "33160", ListPrice: 3200000, BedroomsTotal: 3, BathroomsTotalDecimal: 3.5, LivingArea: 2450, PropertyType: "Condominium", StandardStatus: "Active" },
  { ListingId: "A11500010", UnparsedAddress: "6301 SW 57th Ave", City: "South Miami", PostalCode: "33143", ListPrice: 1850000, BedroomsTotal: 4, BathroomsTotalDecimal: 3, LivingArea: 2680, PropertyType: "Single Family Residence", StandardStatus: "Pending" },
  { ListingId: "A11500011", UnparsedAddress: "701 Brickell Key Blvd #2101", City: "Miami", PostalCode: "33131", ListPrice: 2100000, BedroomsTotal: 3, BathroomsTotalDecimal: 2.5, LivingArea: 2010, PropertyType: "Condominium", StandardStatus: "Active" },
  { ListingId: "A11500012", UnparsedAddress: "10 Edgewater Dr #1205", City: "Coral Gables", PostalCode: "33133", ListPrice: 1480000, BedroomsTotal: 2, BathroomsTotalDecimal: 2, LivingArea: 1540, PropertyType: "Condominium", StandardStatus: "Active" },
];

export const handler: Handler = async () => {
  if (!BRIDGE_TOKEN) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=3600" },
      body: JSON.stringify({ value: SAMPLE_LISTINGS }),
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
    $filter: "StandardStatus eq 'Active' or StandardStatus eq 'Pending'",
    $orderby: "ModificationTimestamp desc",
    $top: "24",
    $select: "ListingId,UnparsedAddress,City,PostalCode,ListPrice,BedroomsTotal,BathroomsTotalDecimal,LivingArea,PropertyType,StandardStatus",
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
    const body = JSON.stringify({ value: data?.value ?? [] });
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
      body: JSON.stringify({ error: "fetch_failed" }),
    };
  }
};
