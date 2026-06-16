// ──────────────────────────────────────────────────────────────────────────
// Shared types + helpers for live Bridge IDX listings.
//
// Used by the /listings search browser (ListingsBrowser) and the per-city
// active-listings sample (CityListingsSample). The Bridge server token never
// reaches the client — every fetch goes through the listings-search Netlify
// Function proxy, which holds BRIDGE_API_TOKEN server-side.
// ──────────────────────────────────────────────────────────────────────────

export interface BridgeListing {
  ListingId?: string;
  ListingKey?: string;
  UnparsedAddress?: string;
  City?: string;
  StateOrProvince?: string;
  PostalCode?: string;
  ListPrice?: number;
  BedroomsTotal?: number;
  BathroomsTotalDecimal?: number;
  LivingArea?: number;
  PropertyType?: string;
  StandardStatus?: string;
  DaysOnMarket?: number;
  ListOfficeName?: string;
  ModificationTimestamp?: string;
  Media?: { MediaURL?: string }[];
}

export interface ListingsSearchResponse {
  value: BridgeListing[];
  totalCount?: number;
  lastUpdated?: string | null;
  page?: number;
  perPage?: number;
  error?: string;
}

/** Primary photo URL, or null when the listing has no media. */
export function listingPhoto(listing: BridgeListing): string | null {
  return listing.Media?.[0]?.MediaURL ?? null;
}

/** Stable React key for a listing. */
export function listingKey(listing: BridgeListing, fallback: number | string): string {
  return listing.ListingKey ?? listing.ListingId ?? listing.UnparsedAddress ?? String(fallback);
}

/** "Coral Gables · 33134" — city and ZIP when present. */
export function listingLocality(listing: BridgeListing): string {
  return [listing.City, listing.PostalCode].filter(Boolean).join(" · ");
}

/**
 * Most-recent ModificationTimestamp across a set of listings — drives the
 * "Last updated" line in the IDX footer, sourced from the Bridge data itself
 * rather than the time of the request.
 */
export function mostRecentModification(listings: BridgeListing[]): string | null {
  let latest = 0;
  for (const l of listings) {
    if (!l.ModificationTimestamp) continue;
    const t = Date.parse(l.ModificationTimestamp);
    if (!Number.isNaN(t) && t > latest) latest = t;
  }
  return latest > 0 ? new Date(latest).toISOString() : null;
}

export function formatListingDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "";
  return new Date(t).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * REQUIRED IDX compliance disclaimer for any page that displays live MLS
 * listings, per the Miami and South Florida REALTORS® IDX program rules.
 */
export const IDX_DISCLAIMER =
  "Listing information is provided in part through the IDX program of the Miami and South Florida REALTORS®. " +
  "Information deemed reliable but not guaranteed and should be independently verified. " +
  "Properties displayed may be listed by other brokerages.";
