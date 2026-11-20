// Weston 4-bedroom market report — November 2026.
//
// Transcribed verbatim from Miami MLS (SEFMLS) Matrix "Statistics Sheet"
// exports run by Carlos on 2026-11-20. Criteria on every sheet:
//   Property Type: Single Family, Condo/Co-Op/Villa/Townhouse
//   County: Broward · City: Weston · #Beds: 4
//   Status: Closed, Jan 1 – Dec 31 of each year (2026: Jan 1 – Nov 20)
//   Active snapshot: Status Active, as of Nov 20, 2026
// Price-band counts and the below-list count were tallied from the matching
// listing-level exports (189 closed 2026 YTD, 66 active).
//
// Transcribe, never interpolate. Derived values (percent changes, months of
// inventory) are computed in this file from the printed figures so the
// arithmetic is auditable.

export const WESTON_REPORT_PERIOD = "Nov 2026";
export const WESTON_REPORT_AS_OF = "Nov 20, 2026";
export const WESTON_REPORT_UPDATED = "2026-11-20";

export const WESTON_REPORT_SOURCE =
  "Source: Miami MLS (SEFMLS) · Weston, Broward County · 4 bedrooms · single-family, townhouse, villa and condo · closed Jan 1, 2020 – Nov 20, 2026 · 2026 is year to date · Information believed accurate but not guaranteed.";

export const WESTON_NOW_SOURCE =
  "Source: Miami MLS (SEFMLS) · active listings as of Nov 20, 2026 · closed Jan 1 – Nov 20, 2026 · price-band and below-list counts tallied from MLS listing-level exports · months of inventory = active listings ÷ (2026 closed sales ÷ 10.6 months), approximate; bands with few sales are volatile.";

export interface WestonYear {
  year: number;
  ytd?: boolean;
  closed: number;
  medianSale: number;
  avgSale: number;
  medianPsf: number;
  medianDom: number;
  saleToList: number; // median SP/LP, percent
}

export const WESTON_YEARS: WestonYear[] = [
  { year: 2020, closed: 343, medianSale: 530000, avgSale: 561034.42, medianPsf: 237.91, medianDom: 32, saleToList: 98 },
  { year: 2021, closed: 395, medianSale: 630000, avgSale: 695702.04, medianPsf: 274.8, medianDom: 11, saleToList: 100 },
  { year: 2022, closed: 284, medianSale: 815000, avgSale: 874028.0, medianPsf: 349.78, medianDom: 12, saleToList: 100 },
  { year: 2023, closed: 203, medianSale: 825000, avgSale: 876035.67, medianPsf: 367.66, medianDom: 21, saleToList: 98 },
  { year: 2024, closed: 203, medianSale: 895000, avgSale: 963367.48, medianPsf: 392.51, medianDom: 20, saleToList: 97 },
  { year: 2025, closed: 219, medianSale: 850000, avgSale: 909408.4, medianPsf: 378.34, medianDom: 50, saleToList: 97 },
  { year: 2026, ytd: true, closed: 189, medianSale: 885000, avgSale: 970504.94, medianPsf: 389.18, medianDom: 42, saleToList: 96 },
];

export const WESTON_ACTIVE = {
  count: 66,
  medianList: 955000,
  avgList: 1029871.86,
  medianListPsf: 413.15,
  medianDom: 50,
};

/** 2026 YTD closings that sold below their final list price (from the 189-row export). */
export const WESTON_2026_BELOW_LIST = 163;

/** Months elapsed Jan 1 – Nov 20, 2026 (324 days ÷ 30.4375). */
export const WESTON_2026_MONTHS = 10.6;

export interface WestonBand {
  label: string;
  sold2026: number;
  active: number;
}

export const WESTON_BANDS: WestonBand[] = [
  { label: "Under $800K", sold2026: 56, active: 13 },
  { label: "$800K–$1M", sold2026: 74, active: 27 },
  { label: "$1M–$1.25M", sold2026: 36, active: 15 },
  { label: "$1.25M–$1.5M", sold2026: 12, active: 7 },
  { label: "$1.5M+", sold2026: 11, active: 4 },
];

export const pct = (a: number, b: number) => ((a / b - 1) * 100);
export const monthsOfInventory = (active: number, sold: number) => active / (sold / WESTON_2026_MONTHS);
