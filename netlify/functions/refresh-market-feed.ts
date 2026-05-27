import type { Handler, HandlerEvent } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

const BRIDGE_TOKEN = process.env.BRIDGE_API_TOKEN ?? "";
const BRIDGE_DATASET = process.env.BRIDGE_DATASET ?? "miamire";
const BRIDGE_BASE = process.env.BRIDGE_BASE_URL
  ?? `https://api.bridgedataoutput.com/api/v2/OData/${BRIDGE_DATASET}/Property`;

const REFRESH_SECRET = process.env.MARKET_FEED_REFRESH_SECRET ?? "";

// ── Feed configuration ────────────────────────────────────────────────────────
// To add more cities, add entries here. Each entry defines:
//   blobKey  – key used in Netlify Blobs store "market-feed"
//   city     – Bridge API City filter value
//   filter   – additional OData $filter fragment (price range, propertyType, etc.)
interface FeedConfig {
  blobKey: string;
  city: string;
  extraFilter: string;
}

const FEED_CONFIGS: FeedConfig[] = [
  {
    blobKey: "weston-sfr-850k-1200k",
    city: "Weston",
    extraFilter:
      "PropertyType eq 'Residential' and StandardStatus eq 'Active' and ListPrice ge 850000 and ListPrice le 1200000",
  },
];

const $SELECT = [
  "ListingId",
  "ListingKey",
  "UnparsedAddress",
  "City",
  "PostalCode",
  "ListPrice",
  "BedroomsTotal",
  "BathroomsTotalDecimal",
  "LivingArea",
  "PropertyType",
  "StandardStatus",
  "DaysOnMarket",
  "ListOfficeName",
  "Media",
].join(",");

async function fetchFeed(config: FeedConfig): Promise<{
  value: unknown[];
  lastUpdated: string;
  listingCount: number;
}> {
  const $filter = `City eq '${config.city.replace(/'/g, "''")}' and ${config.extraFilter}`;

  const params = new URLSearchParams({
    $filter,
    $orderby: "ModificationTimestamp desc",
    $top: "12",
    $select: $SELECT,
  });

  const res = await fetch(`${BRIDGE_BASE}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${BRIDGE_TOKEN}` },
  });

  if (!res.ok) {
    throw new Error(`Bridge API responded ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  const value: unknown[] = data?.value ?? [];
  const lastUpdated = new Date().toISOString();

  return { value, lastUpdated, listingCount: value.length };
}

export const handler: Handler = async (event: HandlerEvent) => {
  // ── 503 if Bridge token not configured ─────────────────────────────────────
  if (!BRIDGE_TOKEN) {
    return {
      statusCode: 503,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: "BRIDGE_API_TOKEN not configured" }),
    };
  }

  // ── Auth: HTTP POST requires x-refresh-secret header ──────────────────────
  // Scheduled invocations have no httpMethod — allow them through unconditionally.
  if (event.httpMethod) {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    const incomingSecret = event.headers?.["x-refresh-secret"] ?? "";
    if (!REFRESH_SECRET || incomingSecret !== REFRESH_SECRET) {
      return {
        statusCode: 401,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ok: false, error: "Unauthorized" }),
      };
    }
  }

  // ── Fetch and store each feed config ────────────────────────────────────────
  const store = getStore("market-feed");
  const results: { blobKey: string; listingCount: number; lastUpdated: string }[] = [];
  const errors: { blobKey: string; error: string }[] = [];

  for (const config of FEED_CONFIGS) {
    try {
      const feed = await fetchFeed(config);
      await store.setJSON(config.blobKey, {
        value: feed.value,
        lastUpdated: feed.lastUpdated,
        listingCount: feed.listingCount,
      });
      results.push({
        blobKey: config.blobKey,
        listingCount: feed.listingCount,
        lastUpdated: feed.lastUpdated,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      errors.push({ blobKey: config.blobKey, error: message });
    }
  }

  const ok = errors.length === 0;
  const statusCode = ok ? 200 : errors.length === FEED_CONFIGS.length ? 502 : 207;

  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ok,
      results,
      ...(errors.length > 0 ? { errors } : {}),
    }),
  };
};
