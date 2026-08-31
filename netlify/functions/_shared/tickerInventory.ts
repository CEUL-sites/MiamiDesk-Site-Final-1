export interface RawTickerListing {
  ListingId?: unknown;
  ListingKey?: unknown;
  UnparsedAddress?: unknown;
  City?: unknown;
  PostalCode?: unknown;
  ListPrice?: unknown;
  BedroomsTotal?: unknown;
  BathroomsTotalDecimal?: unknown;
  LivingArea?: unknown;
  PropertyType?: unknown;
  PropertySubType?: unknown;
  StandardStatus?: unknown;
  ModificationTimestamp?: unknown;
  ListOfficeName?: unknown;
}

export interface TickerListing {
  ListingId: string;
  ListingKey: string;
  UnparsedAddress: string;
  City: string;
  PostalCode: string;
  ListPrice: number;
  BedroomsTotal: number | null;
  BathroomsTotalDecimal: number | null;
  LivingArea: number | null;
  PropertyType: "Residential";
  PropertySubType: "Single Family Residence" | "Condominium" | "Townhouse";
  StandardStatus: "Active";
  ModificationTimestamp: string;
  ListOfficeName: string;
}

export const TICKER_LIMIT = 6;
export const MIN_PRICE = 150_000;
export const MAX_PRICE = 50_000_000;
export const MIN_PPSF = 75;
export const MAX_PPSF = 10_000;

const APPROVED_CITIES_BY_COUNTY = {
  "Miami-Dade": [
    "Aventura", "Bal Harbour", "Bay Harbor Islands", "Coral Gables", "Coconut Grove",
    "Doral", "Golden Beach", "Hialeah", "Homestead", "Indian Creek", "Key Biscayne",
    "Miami", "Miami Beach", "Miami Lakes", "North Miami", "North Miami Beach",
    "Palmetto Bay", "Pinecrest", "South Miami", "Sunny Isles Beach", "Surfside",
  ],
  Broward: [
    "Coconut Creek", "Cooper City", "Coral Springs", "Dania Beach", "Davie",
    "Deerfield Beach", "Fort Lauderdale", "Hallandale Beach", "Hollywood", "Lauderdale-by-the-Sea",
    "Lighthouse Point", "Miramar", "Oakland Park", "Parkland", "Pembroke Pines",
    "Plantation", "Pompano Beach", "Southwest Ranches", "Sunrise", "Weston", "Wilton Manors",
  ],
  "Palm Beach": [
    "Boca Raton", "Boynton Beach", "Delray Beach", "Highland Beach", "Juno Beach",
    "Jupiter", "Jupiter Inlet Colony", "Lake Worth Beach", "Lantana", "Manalapan",
    "North Palm Beach", "Palm Beach", "Palm Beach Gardens", "Royal Palm Beach",
    "Singer Island", "Wellington", "West Palm Beach",
  ],
} as const;

export const APPROVED_CITIES = Object.values(APPROVED_CITIES_BY_COUNTY).flat();

const CITY_TO_COUNTY = new Map<string, string>();
for (const [county, cities] of Object.entries(APPROVED_CITIES_BY_COUNTY)) {
  for (const city of cities) CITY_TO_COUNTY.set(city.toLowerCase(), county);
}

const APPROVED_SUBTYPES = new Set(["Single Family Residence", "Condominium", "Townhouse"]);

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function finite(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? number : null;
}

function validAddress(address: string): boolean {
  return address.length >= 6 && /\d/.test(address) && /[a-z]/i.test(address)
    && !/^(address|location) (withheld|unavailable)$/i.test(address);
}

function normalize(raw: RawTickerListing): TickerListing | null {
  const listingId = text(raw.ListingId);
  const listingKey = text(raw.ListingKey);
  const address = text(raw.UnparsedAddress);
  const city = text(raw.City);
  const price = finite(raw.ListPrice);
  const area = finite(raw.LivingArea);
  const propertyType = text(raw.PropertyType);
  const propertySubType = text(raw.PropertySubType);
  const status = text(raw.StandardStatus);
  const modified = text(raw.ModificationTimestamp);
  const modifiedMs = Date.parse(modified);

  if ((!listingId && !listingKey) || !validAddress(address) || !CITY_TO_COUNTY.has(city.toLowerCase())) return null;
  if (propertyType !== "Residential" || !APPROVED_SUBTYPES.has(propertySubType) || status !== "Active") return null;
  if (price === null || price < MIN_PRICE || price > MAX_PRICE || Number.isNaN(modifiedMs)) return null;
  if (area !== null && area > 0) {
    const ppsf = price / area;
    if (ppsf < MIN_PPSF || ppsf > MAX_PPSF) return null;
  }

  return {
    ListingId: listingId,
    ListingKey: listingKey || listingId,
    UnparsedAddress: address,
    City: city,
    PostalCode: text(raw.PostalCode),
    ListPrice: price,
    BedroomsTotal: finite(raw.BedroomsTotal),
    BathroomsTotalDecimal: finite(raw.BathroomsTotalDecimal),
    LivingArea: area !== null && area > 0 ? area : null,
    PropertyType: "Residential",
    PropertySubType: propertySubType as TickerListing["PropertySubType"],
    StandardStatus: "Active",
    ModificationTimestamp: new Date(modifiedMs).toISOString(),
    ListOfficeName: text(raw.ListOfficeName),
  };
}

function priceBand(price: number): string {
  if (price < 1_000_000) return "under-1m";
  if (price < 3_000_000) return "1m-3m";
  return "3m-plus";
}

/** Validates and returns a deterministic round-robin sample by county and price band. */
export function selectTickerListings(raw: RawTickerListing[], limit = TICKER_LIMIT): TickerListing[] {
  const seen = new Set<string>();
  const buckets = new Map<string, TickerListing[]>();
  for (const item of raw) {
    const listing = normalize(item);
    if (!listing) continue;
    const identity = (listing.ListingKey || listing.ListingId).toLowerCase();
    if (seen.has(identity)) continue;
    seen.add(identity);
    const county = CITY_TO_COUNTY.get(listing.City.toLowerCase())!;
    const bucket = `${county}|${priceBand(listing.ListPrice)}`;
    const values = buckets.get(bucket) ?? [];
    values.push(listing);
    buckets.set(bucket, values);
  }
  const bucketOrder = [
    "Miami-Dade|under-1m", "Broward|1m-3m", "Palm Beach|3m-plus",
    "Palm Beach|under-1m", "Miami-Dade|1m-3m", "Broward|3m-plus",
    "Broward|under-1m", "Palm Beach|1m-3m", "Miami-Dade|3m-plus",
  ];
  const selected: TickerListing[] = [];
  let round = 0;
  while (selected.length < limit) {
    let added = false;
    for (const key of bucketOrder) {
      const next = buckets.get(key)?.[round];
      if (!next) continue;
      selected.push(next);
      added = true;
      if (selected.length === limit) break;
    }
    if (!added) break;
    round += 1;
  }
  return selected;
}

export function mostRecentListingModification(listings: TickerListing[]): string | null {
  if (listings.length === 0) return null;
  return listings.reduce((latest, listing) =>
    listing.ModificationTimestamp > latest ? listing.ModificationTimestamp : latest,
  listings[0].ModificationTimestamp);
}

export class TtlResponseCache {
  private entry: { body: string; expires: number } | null = null;
  get(now = Date.now()): string | null {
    return this.entry && this.entry.expires > now ? this.entry.body : null;
  }
  set(body: string, ttlMs: number, now = Date.now()): void {
    this.entry = { body, expires: now + ttlMs };
  }
  clear(): void {
    this.entry = null;
  }
}
