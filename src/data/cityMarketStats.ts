// Official city-level market statistics — Florida REALTORS®/MIAMI REALTORS®
// "Local Residential Market Metrics" Q2 2026 quarterly city reports (data
// released Friday, July 17, 2026; next release Friday, October 16, 2026).
// Median sale price and months supply of inventory below are transcribed
// verbatim, per city/CDP, from the Single-Family Homes tables in the
// Miami-Dade, Broward, and Palm Beach county PDFs, and from the
// Townhouses-and-Condos tables in the Palm Beach county PDF (Miami-Dade
// and Broward condo city tables not yet provided — see PRIOR_STATS_PERIOD
// below). Median prices reflect CLOSED sales
// (not asking prices). County-level quarterly PDFs from
// miamirealtors.com/market-statistics/.
//
// To update for a new quarter: download the latest county reports from
// miamirealtors.com → News → South Florida Market Stats, transcribe the
// by-City "Median Sale Price" and "Months Supply of Inventory" rows below,
// and bump MARKET_STATS_PERIOD.
//
// NOTE: ytdClosedSales is used only to determine which segment (SFH vs
// Condo) is the lead for display; it is never shown to users directly.
// Values below retain prior totals for this purpose — the Q2 2026 city
// PDFs, like prior releases, only publish per-period closed sales and YoY
// % changes, not absolute YTD counts.

export const MARKET_STATS_PERIOD = "Q2 2026";

// Q2 2026 city-level sources on file: SINGLE-FAMILY for all three counties,
// and CONDO/TOWNHOME for Palm Beach. Condo/townhome city figures for
// Miami-Dade and Broward are retained from the May 2026 monthly city reports
// (the latest city-level source provided for that segment) and must be
// labeled with that period wherever they are displayed — never as Q2 2026.
export const PRIOR_STATS_PERIOD = "May 2026";

/** The report period a given county+segment's figures are actually sourced from. */
export function segmentPeriod(
  county: CityMarketStats["county"],
  segment: "singleFamily" | "condoTownhome",
): string {
  return segment === "singleFamily" || county === "Palm Beach"
    ? MARKET_STATS_PERIOD
    : PRIOR_STATS_PERIOD;
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
  "Miami":              { county: "Miami-Dade", singleFamily: s(799_000, 6.6, 48, 373), condoTownhome: s(570_000, 17, 67, 849) },
  "Miami Beach":        { county: "Miami-Dade", singleFamily: s(5_275_000, 8.5, 64, 79), condoTownhome: s(505_000, 14, 96, 536) },
  "Coral Gables":       { county: "Miami-Dade", singleFamily: s(2_635_000, 5.1, 53, 129), condoTownhome: s(648_000, 7, 57, 71) },
  "Aventura":           { county: "Miami-Dade", condoTownhome: s(420_000, 20, 94, 262) },
  "Sunny Isles Beach":  { county: "Miami-Dade", condoTownhome: s(444_000, 21, 104, 221) },
  "Bal Harbour":        { county: "Miami-Dade", condoTownhome: s(639_000, 15, 38, 45) }, // no Q2 2026 city condo data — prior period retained
  "Key Biscayne":       { county: "Miami-Dade", singleFamily: s(3_000_000, 12.9, 32, 16), condoTownhome: s(1_525_000, 8, 40, 63) },
  "Doral":              { county: "Miami-Dade", singleFamily: s(1_022_500, 6.1, 42, 89), condoTownhome: s(438_000, 8, 65, 160) },
  "Kendall":            { county: "Miami-Dade", singleFamily: s(1_100_000, 4.2, 23, 102), condoTownhome: s(365_000, 6, 38, 124) },
  "Hialeah":            { county: "Miami-Dade", singleFamily: s(600_000, 4.9, 31, 142), condoTownhome: s(279_000, 7, 36, 145) },
  "Homestead":          { county: "Miami-Dade", singleFamily: s(500_000, 5.7, 57, 130), condoTownhome: s(320_000, 12, 52, 108) },
  "North Miami":        { county: "Miami-Dade", singleFamily: s(570_000, 6.4, 28, 62), condoTownhome: s(252_000, 23, 52, 46) },
  "North Miami Beach":  { county: "Miami-Dade", singleFamily: s(513_500, 6.8, 29, 50), condoTownhome: s(195_000, 31, 86, 49) },
  "Miami Lakes":        { county: "Miami-Dade", singleFamily: s(912_500, 4.2, 35, 37), condoTownhome: s(440_000, 3, 44, 35) },
  "South Miami":        { county: "Miami-Dade", singleFamily: s(1_261_250, 4.3, 14, 34) },
  "Pinecrest":          { county: "Miami-Dade", singleFamily: s(2_500_000, 7.3, 29, 63) },
  "Surfside":           { county: "Miami-Dade", singleFamily: s(2_225_000, 4.5, 42, 18), condoTownhome: s(1_284_000, 15, 137, 30) },

  // ── Broward County ───────────────────────────────────────────────────
  "Fort Lauderdale":    { county: "Broward", singleFamily: s(762_500, 6.3, 49, 493), condoTownhome: s(445_000, 11, 75, 577) },
  "Hollywood":          { county: "Broward", singleFamily: s(560_000, 5.7, 32, 324), condoTownhome: s(333_000, 16, 74, 258) },
  "Pembroke Pines":     { county: "Broward", singleFamily: s(660_000, 2.9, 26, 283), condoTownhome: s(235_000, 9, 56, 261) },
  "Coral Springs":      { county: "Broward", singleFamily: s(700_000, 2.6, 17, 268), condoTownhome: s(233_000, 11, 61, 125) },
  "Miramar":            { county: "Broward", singleFamily: s(612_000, 3.4, 44, 255), condoTownhome: s(380_000, 8, 46, 102) },
  "Plantation":         { county: "Broward", singleFamily: s(725_000, 3.7, 36, 209), condoTownhome: s(250_000, 9, 71, 119) },
  "Pompano Beach":      { county: "Broward", singleFamily: s(549_500, 5.1, 45, 199), condoTownhome: s(305_000, 9, 70, 340) },
  "Weston":             { county: "Broward", singleFamily: s(920_275, 4.9, 56, 173), condoTownhome: s(348_000, 7, 69, 72) },
  "Sunrise":            { county: "Broward", singleFamily: s(500_500, 2.6, 31, 162), condoTownhome: s(160_000, 11, 71, 199) },
  "Hallandale Beach":   { county: "Broward", singleFamily: s(580_000, 9.8, 110, 18), condoTownhome: s(236_000, 21, 110, 196) },

  // ── Palm Beach County ────────────────────────────────────────────────
  "West Palm Beach":    { county: "Palm Beach", singleFamily: s(651_000, 4.8, 46, 345), condoTownhome: s(364_500, 8.4, 76, 293) },
  "Boca Raton":         { county: "Palm Beach", singleFamily: s(1_300_000, 3.9, 33, 302), condoTownhome: s(578_000, 7.0, 69, 266) },
  "Palm Beach":         { county: "Palm Beach", singleFamily: s(13_640_000, 9.6, 82, 51), condoTownhome: s(1_725_000, 7.6, 62, 156) },
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
