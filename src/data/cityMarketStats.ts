// Official city-level market statistics — MIAMI REALTORS® + RWorld
// "City and Zip Code" housing reports, April 2026, based on MLS sales data
// compiled by Florida Realtors®. Median prices reflect CLOSED sales (not
// asking prices). Transcribed from the by-City tables of the county PDFs:
//
//   miamirealtors.com/wp-content/uploads/bsk-pdf-manager/2026/05/
//     Miami-Dade-County-City-and-Zip-Code-Apr-2026.pdf
//     Broward-County-City-and-Zip-Code-Apr-2026.pdf
//     Palm-Beach-County-City-and-Zip-Code-Apr-2026.pdf
//
// To update for a new month: download the latest county reports from
// miamirealtors.com → News → South Florida Market Stats, transcribe the
// by-City rows below, and bump MARKET_STATS_PERIOD.

export const MARKET_STATS_PERIOD = "April 2026";

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
  "Miami":              { county: "Miami-Dade", singleFamily: s(843_000, 7, 40, 373), condoTownhome: s(605_000, 16, 89, 849) },
  "Miami Beach":        { county: "Miami-Dade", singleFamily: s(5_200_000, 11, 98, 79), condoTownhome: s(620_000, 15, 66, 536) },
  "Coral Gables":       { county: "Miami-Dade", singleFamily: s(2_721_000, 5, 26, 129), condoTownhome: s(620_000, 8, 64, 71) },
  "Aventura":           { county: "Miami-Dade", condoTownhome: s(450_000, 20, 91, 262) },
  "Sunny Isles Beach":  { county: "Miami-Dade", condoTownhome: s(905_000, 21, 87, 221) },
  "Bal Harbour":        { county: "Miami-Dade", condoTownhome: s(639_000, 15, 38, 45) },
  "Key Biscayne":       { county: "Miami-Dade", singleFamily: s(4_438_000, 13, 32, 16), condoTownhome: s(1_800_000, 8, 37, 63) },
  "Doral":              { county: "Miami-Dade", singleFamily: s(1_013_000, 6, 41, 89), condoTownhome: s(478_000, 9, 35, 160) },
  "Kendall":            { county: "Miami-Dade", singleFamily: s(1_093_000, 4, 27, 102), condoTownhome: s(423_000, 6, 56, 124) },
  "Hialeah":            { county: "Miami-Dade", singleFamily: s(630_000, 5, 49, 142), condoTownhome: s(270_000, 7, 51, 145) },
  "Homestead":          { county: "Miami-Dade", singleFamily: s(453_000, 7, 84, 130), condoTownhome: s(279_000, 12, 55, 108) },
  "North Miami":        { county: "Miami-Dade", singleFamily: s(490_000, 7, 33, 62), condoTownhome: s(253_000, 22, 47, 46) },
  "North Miami Beach":  { county: "Miami-Dade", singleFamily: s(483_000, 8, 29, 50), condoTownhome: s(560_000, 30, 52, 49) },
  "Miami Lakes":        { county: "Miami-Dade", singleFamily: s(950_000, 3, 111, 37), condoTownhome: s(440_000, 3, 44, 35) },
  "South Miami":        { county: "Miami-Dade", singleFamily: s(1_355_000, 5, 16, 34) },
  "Pinecrest":          { county: "Miami-Dade", singleFamily: s(2_350_000, 8, 24, 63) },
  "Surfside":           { county: "Miami-Dade", singleFamily: s(2_200_000, 9, 124, 18), condoTownhome: s(1_800_000, 14, 133, 30) },

  // ── Broward County ───────────────────────────────────────────────────
  "Fort Lauderdale":    { county: "Broward", singleFamily: s(820_000, 7, 53, 493), condoTownhome: s(544_000, 11, 69, 577) },
  "Hollywood":          { county: "Broward", singleFamily: s(549_000, 6, 46, 324), condoTownhome: s(253_000, 15, 60, 258) },
  "Pembroke Pines":     { county: "Broward", singleFamily: s(624_000, 3, 26, 283), condoTownhome: s(241_000, 8, 61, 261) },
  "Coral Springs":      { county: "Broward", singleFamily: s(686_000, 2, 17, 268), condoTownhome: s(203_000, 12, 46, 125) },
  "Miramar":            { county: "Broward", singleFamily: s(625_000, 4, 28, 255), condoTownhome: s(355_000, 8, 52, 102) },
  "Plantation":         { county: "Broward", singleFamily: s(753_000, 4, 29, 209), condoTownhome: s(258_000, 8, 39, 119) },
  "Pompano Beach":      { county: "Broward", singleFamily: s(562_000, 6, 43, 199), condoTownhome: s(263_000, 10, 64, 340) },
  "Weston":             { county: "Broward", singleFamily: s(889_000, 5, 31, 173), condoTownhome: s(360_000, 7, 39, 72) },
  "Sunrise":            { county: "Broward", singleFamily: s(490_000, 3, 26, 162), condoTownhome: s(178_000, 11, 76, 199) },
  "Hallandale Beach":   { county: "Broward", singleFamily: s(1_580_000, 11, 113, 18), condoTownhome: s(254_000, 21, 69, 196) },

  // ── Palm Beach County ────────────────────────────────────────────────
  "West Palm Beach":    { county: "Palm Beach", singleFamily: s(610_000, 6, 49, 345), condoTownhome: s(340_000, 10, 75, 293) },
  "Boca Raton":         { county: "Palm Beach", singleFamily: s(1_343_000, 4, 18, 302), condoTownhome: s(543_000, 8, 62, 266) },
  "Palm Beach":         { county: "Palm Beach", singleFamily: s(10_750_000, 14, 120, 51), condoTownhome: s(1_900_000, 12, 109, 156) },
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
