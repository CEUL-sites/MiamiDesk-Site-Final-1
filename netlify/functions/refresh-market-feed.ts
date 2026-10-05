import type { Context } from "@netlify/functions";
import { mlsStore } from "./_shared/mlsStore";

const BRIDGE_TOKEN = process.env.BRIDGE_API_TOKEN ?? "";
const BRIDGE_DATASET = (process.env.BRIDGE_DATASET_ID ?? process.env.BRIDGE_DATASET ?? "miamire").trim();
const BRIDGE_BASE = process.env.BRIDGE_BASE_URL
  ?? `https://api.bridgedataoutput.com/api/v2/OData/${BRIDGE_DATASET}/Property`;



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

async function fetchFeed(config: FeedConfig, fetchImpl: typeof fetch, startedAt: number): Promise<{
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

  const res = await fetchImpl(`${BRIDGE_BASE}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${BRIDGE_TOKEN}` },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    throw new Error(`Bridge API responded ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  if (!Array.isArray(data?.value)) throw new Error("Invalid Bridge response");
  const value: unknown[] = data.value;
  const lastUpdated = new Date(startedAt).toISOString();

  return { value, lastUpdated, listingCount: value.length };
}

interface Writer { setJSON(key: string, data: unknown): Promise<unknown> }

export async function refreshMarketFeeds(store: Writer, fetchImpl: typeof fetch = fetch, now = Date.now()) {
  const results: { blobKey: string; listingCount: number; lastUpdated: string }[] = [];
  const errors: { blobKey: string; error: string }[] = [];
  for (const config of FEED_CONFIGS) {
    try {
      const feed = await fetchFeed(config, fetchImpl, now);
      await store.setJSON(config.blobKey, {
        ...feed, lastSuccessfulRefresh: feed.lastUpdated,
      });
      results.push({ blobKey: config.blobKey, listingCount: feed.listingCount, lastUpdated: feed.lastUpdated });
      // Health-write failure must not invalidate an already committed valid feed.
      try { await store.setJSON(`${config.blobKey}:health`, { ok: true, lastAttempt: feed.lastUpdated, listingCount: feed.listingCount }); }
      catch { console.error('[refresh-market-feed] health write failed'); }
      console.info('[refresh-market-feed] success', results[results.length - 1]);
    } catch {
      // Do not log upstream URLs, response bodies or credentials.
      const error = 'bridge_or_storage_refresh_failed';
      errors.push({ blobKey: config.blobKey, error });
      console.error('[refresh-market-feed] failed', { blobKey: config.blobKey, lastAttempt: new Date(now).toISOString() });
      try { await store.setJSON(`${config.blobKey}:health`, { ok: false, lastAttempt: new Date(now).toISOString(), error }); }
      catch { console.error('[refresh-market-feed] health write failed'); }
    }
  }
  return { ok: errors.length === 0, results, errors };
}

// Netlify V2 scheduled function: platform-only invocation; manual refresh uses
// the authenticated dashboard Run now action, never a public URL.
const scheduledRefresh = async (_request: Request, context: Context) => {
  if (!BRIDGE_TOKEN) throw new Error('Bridge server token not configured');
  const result = await refreshMarketFeeds(mlsStore('market-feed', context.deploy.context));
  if (!result.ok) throw new Error('Market feed refresh failed; prior inventory retained');
  return Response.json({ ok: true, results: result.results });
};
export default scheduledRefresh;
