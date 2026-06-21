// Official city-level market statistics — MIAMI REALTORS® Association
// Monthly market statistics reports, May 2026, based on MLS sales data
// compiled by Florida Realtors®. Median prices reflect CLOSED sales (not
// asking prices). City-level figures are YTD (January–May 2026).
// County-level monthly PDFs from miamirealtors.com/market-statistics/.
//
// To update for a new month: download the latest county reports from
// miamirealtors.com → News → South Florida Market Stats, transcribe the
// by-City rows below, and bump MARKET_STATS_PERIOD.
//
// NOTE: ytdClosedSales is used only to determine which segment (SFH vs
// Condo) is the lead for display; it is never shown to users directly.
// Values below retain the April 2026 YTD totals for this purpose since
// May 2026 city PDFs only publish YoY % changes, not absolute counts.

export const MARKET_STATS_PERIOD = "May 2026";

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
  // ytdClosedSales retained from April 2026 for lead-segment logic only (not displayed)
  "Miami":              { county: "Miami-Dade", singleFamily: s(790_000, 7, 48, 373), condoTownhome: s(570_000, 17, 67, 849) },
  "Miami Beach":        { county: "Miami-Dade", singleFamily: s(8_800_000, 10, 64, 79), condoTownhome: s(505_000, 14, 96, 536) },
  "Coral Gables":       { county: "Miami-Dade", singleFamily: s(2_423_000, 5, 53, 129), condoTownhome: s(648_000, 7, 57, 71) },
  "Aventura":           { county: "Miami-Dade", condoTownhome: s(420_000, 20, 94, 262) },
  "Sunny Isles Beach":  { county: "Miami-Dade", condoTownhome: s(444_000, 21, 104, 221) },
  "Bal Harbour":        { county: "Miami-Dade", condoTownhome: s(639_000, 15, 38, 45) }, // no May 2026 city data — April 2026 retained
  "Key Biscayne":       { county: "Miami-Dade", singleFamily: s(4_438_000, 13, 32, 16), condoTownhome: s(1_525_000, 8, 40, 63) },
  "Doral":              { county: "Miami-Dade", singleFamily: s(1_074_000, 6, 42, 89), condoTownhome: s(438_000, 8, 65, 160) },
  "Kendall":            { county: "Miami-Dade", singleFamily: s(1_070_000, 4, 23, 102), condoTownhome: s(365_000, 6, 38, 124) },
  "Hialeah":            { county: "Miami-Dade", singleFamily: s(650_000, 5, 31, 142), condoTownhome: s(279_000, 7, 36, 145) },
  "Homestead":          { county: "Miami-Dade", singleFamily: s(540_000, 6, 57, 130), condoTownhome: s(320_000, 12, 52, 108) },
  "North Miami":        { county: "Miami-Dade", singleFamily: s(830_000, 7, 28, 62), condoTownhome: s(252_000, 23, 52, 46) },
  "North Miami Beach":  { county: "Miami-Dade", singleFamily: s(483_000, 8, 29, 50), condoTownhome: s(195_000, 31, 86, 49) },
  "Miami Lakes":        { county: "Miami-Dade", singleFamily: s(975_000, 4, 35, 37), condoTownhome: s(440_000, 3, 44, 35) },
  "South Miami":        { county: "Miami-Dade", singleFamily: s(923_000, 5, 14, 34) },
  "Pinecrest":          { county: "Miami-Dade", singleFamily: s(2_025_000, 8, 29, 63) },
  "Surfside":           { county: "Miami-Dade", singleFamily: s(1_825_000, 6, 42, 18), condoTownhome: s(1_284_000, 15, 137, 30) },

  // ── Broward County ───────────────────────────────────────────────────
  "Fort Lauderdale":    { county: "Broward", singleFamily: s(730_000, 7, 49, 493), condoTownhome: s(445_000, 11, 75, 577) },
  "Hollywood":          { county: "Broward", singleFamily: s(556_000, 6, 32, 324), condoTownhome: s(333_000, 16, 74, 258) },
  "Pembroke Pines":     { county: "Broward", singleFamily: s(688_000, 3, 26, 283), condoTownhome: s(235_000, 9, 56, 261) },
  "Coral Springs":      { county: "Broward", singleFamily: s(725_000, 2, 17, 268), condoTownhome: s(233_000, 11, 61, 125) },
  "Miramar":            { county: "Broward", singleFamily: s(610_000, 4, 44, 255), condoTownhome: s(380_000, 8, 46, 102) },
  "Plantation":         { county: "Broward", singleFamily: s(725_000, 4, 36, 209), condoTownhome: s(250_000, 9, 71, 119) },
  "Pompano Beach":      { county: "Broward", singleFamily: s(515_000, 5, 45, 199), condoTownhome: s(305_000, 9, 70, 340) },
  "Weston":             { county: "Broward", singleFamily: s(895_000, 5, 56, 173), condoTownhome: s(348_000, 7, 69, 72) },
  "Sunrise":            { county: "Broward", singleFamily: s(520_000, 3, 31, 162), condoTownhome: s(160_000, 11, 71, 199) },
  "Hallandale Beach":   { county: "Broward", singleFamily: s(395_000, 12, 110, 18), condoTownhome: s(236_000, 21, 110, 196) },

  // ── Palm Beach County ────────────────────────────────────────────────
  "West Palm Beach":    { county: "Palm Beach", singleFamily: s(675_000, 5, 46, 345), condoTownhome: s(347_000, 9, 76, 293) },
  "Boca Raton":         { county: "Palm Beach", singleFamily: s(1_208_000, 4, 33, 302), condoTownhome: s(640_000, 8, 69, 266) },
  "Palm Beach":         { county: "Palm Beach", singleFamily: s(15_800_000, 13, 82, 51), condoTownhome: s(1_450_000, 9, 62, 156) },
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
