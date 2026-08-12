// Shared MLS "city" vocabulary — extracted out of city-stats.ts so it has one
// home instead of two copies that can quietly drift apart (a city added to
// one list but not the other, an alias that means something different in
// each place). Both the public city-stats endpoint and the lead
// market-context lookup (_shared/leadMarketContext.ts) import from here.
//
// Extraction was deliberately conservative: city-stats.ts's own Bridge fetch
// call, caching, and response shape are untouched — only the parts that are
// pure data/pure functions (the city list, the alias map, the MIN_SAMPLE
// floor, the IDX disclaimer text, and the median() helper) moved. That keeps
// city-stats.ts's behavior byte-identical after the swap.

// Cities we serve stats for — matches the seller intake city list + sell pages.
export const ALLOWED_CITIES = [
  "Aventura", "Bal Harbour", "Boca Raton", "Brickell", "Coconut Grove",
  "Coral Gables", "Coral Springs", "Doral", "Downtown Miami", "Fort Lauderdale",
  "Hallandale Beach", "Hialeah", "Hollywood", "Homestead", "Kendall", "Key Biscayne",
  "Miami", "Miami Beach", "Miami Lakes", "Miramar", "North Miami", "Palm Beach",
  "Pembroke Pines", "Pinecrest", "Plantation", "Pompano Beach", "South Miami",
  "Sunny Isles Beach", "Sunrise", "Weston", "West Palm Beach",
];
export const CITY_LOOKUP = new Map(ALLOWED_CITIES.map((c) => [c.toLowerCase(), c]));

// Neighborhoods whose MLS "City" field is the parent municipality.
export const CITY_ALIASES: Record<string, string> = {
  brickell: "Miami",
  "coconut grove": "Miami",
  "downtown miami": "Miami",
  kendall: "Miami",
};

export interface ResolvedCity {
  /** Display-cased name as it appears in ALLOWED_CITIES, e.g. "Brickell". */
  requested: string;
  /** The MLS `City` field value to query Bridge with, e.g. "Miami". */
  mlsCity: string;
}

/**
 * Case-insensitive lookup against the allowed city list, alias-resolved to
 * the MLS `City` field value Bridge actually stores. Null when the input
 * doesn't exactly match a known city — never a fuzzy guess.
 */
export function resolveMlsCity(rawCity: string): ResolvedCity | null {
  const raw = (rawCity ?? "").trim().toLowerCase();
  if (!raw) return null;
  const requested = CITY_LOOKUP.get(raw);
  if (!requested) return null;
  const mlsCity = CITY_ALIASES[raw] ?? requested;
  return { requested, mlsCity };
}

// Below this many active listings (with a usable ListPrice) the medians are
// too thin to trust — publicly (city-stats.ts) or privately (a lead alert).
export const MIN_SAMPLE = 8;

export const IDX_DISCLAIMER =
  "Listing information is provided in part by the Miami and South Florida REALTORS® " +
  "and/or BeachesMLS via IDX. Information is deemed reliable but not guaranteed and is " +
  "subject to change without notice. Verify all information before making real estate decisions.";

export const MLS_SOURCE_LABEL = "Miami and South Florida REALTORS® MLS";

export function median(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}
