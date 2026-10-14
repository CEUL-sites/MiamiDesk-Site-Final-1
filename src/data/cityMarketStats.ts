// Official city-level market statistics — Florida REALTORS®/MIAMI REALTORS®
// "Local Residential Market Metrics" Q2 2026 quarterly city reports (data
// released Friday, July 17, 2026; next release Friday, October 16, 2026).
// Median closed-sale prices, median days to contract and months supply are
// transcribed from official county city reports. Miami-Dade and Broward
// single-family and condo/townhome rows were rechecked October 14, 2026.
// No Q3 period is assigned before official publication.
// ytdClosedSales retains historical totals used only for display ordering.

export const MARKET_STATS_PERIOD = "Q2 2026";

// Q2 2026 city-level reports verified for both segments in all three counties.
// Keep the prior-period export for historical references elsewhere.
export const PRIOR_STATS_PERIOD = "May 2026";

/** The report period a given county+segment's figures are actually sourced from. */
export function segmentPeriod(
  county: CityMarketStats["county"],
  segment: "singleFamily" | "condoTownhome",
): string {
  return MARKET_STATS_PERIOD;
}

export interface SegmentStats {
  /** Median closed-sale price, USD */
  medianSalePrice: number;
  /** Months of supply of inventory */
  monthsSupply: number;
  /** Median days from listing to contract */
  medianDaysToContract: number;
  /** Year-to-date closed sales */
  ytdClosedSales: number;
}

export interface CityMarketStats {
  county: "Miami-Dade" | "Broward" | "Palm Beach";
  singleFamily?: SegmentStats;
  condoTownhome?: SegmentStats;
}

const s = (
  medianSalePrice: number,
  monthsSupply: number,
  medianDaysToContract: number,
  ytdClosedSales: number,
): SegmentStats => ({ medianSalePrice, monthsSupply, medianDaysToContract, ytdClosedSales });

export const CITY_MARKET_STATS: Record<string, CityMarketStats> = {
  // ── Miami-Dade County ────────────────────────────────────────────────
  // ytdClosedSales retained from prior period for lead-segment logic only (not displayed)
  "Miami":              { county: "Miami-Dade", singleFamily: s(799_000, 6.6, 67, 373), condoTownhome: s(595_000, 16, 105, 849) },
  "Miami Beach":        { county: "Miami-Dade", singleFamily: s(5_275_000, 8.5, 112, 79), condoTownhome: s(521_688, 12.4, 111, 536) },
  "Coral Gables":       { county: "Miami-Dade", singleFamily: s(2_635_000, 5.1, 47, 129), condoTownhome: s(590_000, 6.4, 94, 71) },
  "Aventura":           { county: "Miami-Dade", condoTownhome: s(420_000, 17.7, 133, 262) },
  "Sunny Isles Beach":  { county: "Miami-Dade", condoTownhome: s(550_000, 19.8, 165, 221) },
  "Bal Harbour":        { county: "Miami-Dade", condoTownhome: s(1_550_000, 14.1, 67, 45) },
  "Key Biscayne":       { county: "Miami-Dade", singleFamily: s(3_000_000, 12.9, 69, 16), condoTownhome: s(1_525_000, 7.4, 40, 63) },
  "Doral":              { county: "Miami-Dade", singleFamily: s(1_022_500, 6.1, 45, 89), condoTownhome: s(467_500, 7.5, 54, 160) },
  "Kendall":            { county: "Miami-Dade", singleFamily: s(1_100_000, 4.2, 32, 102), condoTownhome: s(372_500, 6.4, 53, 124) },
  "Hialeah":            { county: "Miami-Dade", singleFamily: s(600_000, 4.9, 52, 142), condoTownhome: s(281_000, 6.6, 58, 145) },
  "Homestead":          { county: "Miami-Dade", singleFamily: s(500_000, 5.7, 59, 130), condoTownhome: s(336_500, 11.8, 47, 108) },
  "North Miami":        { county: "Miami-Dade", singleFamily: s(570_000, 6.4, 45, 62), condoTownhome: s(205_000, 24.5, 54, 46) },
  "North Miami Beach":  { county: "Miami-Dade", singleFamily: s(513_500, 6.8, 62, 50), condoTownhome: s(275_000, 29.8, 149, 49) },
  "Miami Lakes":        { county: "Miami-Dade", singleFamily: s(912_500, 4.2, 60, 37), condoTownhome: s(432_000, 2.9, 44, 35) },
  "South Miami":        { county: "Miami-Dade", singleFamily: s(1_261_250, 4.3, 27, 34) },
  "Pinecrest":          { county: "Miami-Dade", singleFamily: s(2_500_000, 7.3, 74, 63) },
  "Surfside":           { county: "Miami-Dade", singleFamily: s(2_225_000, 4.5, 119, 18), condoTownhome: s(1_541_750, 13.8, 134, 30) },

  // ── Broward County ───────────────────────────────────────────────────
  "Fort Lauderdale":    { county: "Broward", singleFamily: s(762_500, 6.3, 56, 493), condoTownhome: s(483_263, 10.4, 85, 577) },
  "Hollywood":          { county: "Broward", singleFamily: s(560_000, 5.7, 47, 324), condoTownhome: s(318_500, 14.2, 75, 258) },
  "Pembroke Pines":     { county: "Broward", singleFamily: s(660_000, 2.9, 26, 283), condoTownhome: s(235_000, 8.1, 75, 261) },
  "Coral Springs":      { county: "Broward", singleFamily: s(700_000, 2.6, 17, 268), condoTownhome: s(222_500, 10.7, 70, 125) },
  "Miramar":            { county: "Broward", singleFamily: s(612_000, 3.4, 43, 255), condoTownhome: s(365_000, 7.8, 61, 102) },
  "Plantation":         { county: "Broward", singleFamily: s(725_000, 3.7, 36, 209), condoTownhome: s(278_500, 7.9, 58, 119) },
  "Pompano Beach":      { county: "Broward", singleFamily: s(549_500, 5.1, 45, 199), condoTownhome: s(274_000, 8.7, 72, 340) },
  "Weston":             { county: "Broward", singleFamily: s(920_275, 4.9, 47, 173), condoTownhome: s(349_000, 7.4, 51, 72) },
  "Sunrise":            { county: "Broward", singleFamily: s(500_500, 2.6, 27, 162), condoTownhome: s(160_000, 10.2, 78, 199) },
  "Hallandale Beach":   { county: "Broward", singleFamily: s(580_000, 9.8, 64, 18), condoTownhome: s(240_000, 19.6, 113, 196) },

  // ── Palm Beach County ────────────────────────────────────────────────
  "West Palm Beach":    { county: "Palm Beach", singleFamily: s(651_000, 4.8, 53, 345), condoTownhome: s(364_500, 8.4, 84, 293) },
  "Boca Raton":         { county: "Palm Beach", singleFamily: s(1_300_000, 3.9, 27, 302), condoTownhome: s(578_000, 7, 64, 266) },
  "Palm Beach":         { county: "Palm Beach", singleFamily: s(13_640_000, 9.6, 108, 51), condoTownhome: s(1_725_000, 7.6, 95, 156) },
};

// Neighborhoods the MLS reports under their parent municipality.
export const STATS_AREA_ALIASES: Record<string, string> = {
  "Brickell": "Miami",
  "Coconut Grove": "Miami",
  "Downtown Miami": "Miami",
};

export interface CityStatsLookup {
  /** The municipality the figures are reported for (alias-resolved). */
  dataCity: string;
  /** True when `area` is a neighborhood reported under a parent city. */
  isParentCityData: boolean;
  stats: CityMarketStats;
}

export function getCityMarketStats(area: string): CityStatsLookup | null {
  const trimmed = area.trim();
  const dataCity = STATS_AREA_ALIASES[trimmed] ?? trimmed;
  const stats = CITY_MARKET_STATS[dataCity];
  if (!stats) return null;
  return { dataCity, isParentCityData: dataCity !== trimmed, stats };
}
