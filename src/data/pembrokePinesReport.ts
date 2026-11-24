// Pembroke Pines 4-bedroom market report, November 2026.
// Every figure is transcribed from Miami MLS (SEFMLS) exports supplied by Carlos Uzcategui. Do not round, edit or extrapolate.
// Annual figures: MLS Matrix statistics sheets (closed, single-family, 4 bedrooms, City of Pembroke Pines), one per year.
// Above/at/below-list counts and subdivision medians: computed from the 2,851 individual closed-sale records (RE1 listing exports),
//   which reconcile exactly with the statistics sheets on count, median and maximum sale price for every year.
// 2026 = Jan 1 – Nov 23, 2026 (year to date). Above/at/below-list excludes 1 sale in 2022 and 1 in 2025 with no list price.

export const pembrokePinesReport = {
  slug: 'pembroke-pines-2026-11',
  city: 'Pembroke Pines',
  county: 'Broward',
  segment: '4 bedrooms · single-family detached · closed sales',
  dataThrough: '2026-11-23',
  source: {
    en: 'Source: Miami MLS (SEFMLS) · Pembroke Pines, Broward County · 4 bedrooms · single-family detached · closed Jan 1, 2020 – Nov 23, 2026 · 2026 is year to date · Information believed accurate but not guaranteed.',
    es: 'Fuente: Miami MLS (SEFMLS) · Pembroke Pines, condado de Broward · 4 habitaciones · unifamiliar independiente · vendidas 1 ene 2020 – 23 nov 2026 · 2026 es año en curso · Información confiable pero no garantizada.',
  },
  headline: { medianChangePct: 60.1, from: 460000, to: 736500, fromYear: 2020, toLabel: '2026 YTD' },
  years: [
  {
    "year": 2020,
    "ytd": false,
    "closedSales": 489,
    "medianSalePrice": 460000,
    "averageSalePrice": 471958,
    "medianPricePerSqFt": 203.55,
    "medianDaysOnMarket": 17,
    "medianSaleToListPct": 99,
    "medianLivingAreaSqFt": 2332,
    "salesAboveList": 117,
    "salesAtList": 87,
    "salesBelowList": 285
  },
  {
    "year": 2021,
    "ytd": false,
    "closedSales": 522,
    "medianSalePrice": 544500,
    "averageSalePrice": 562107,
    "medianPricePerSqFt": 241.2,
    "medianDaysOnMarket": 9,
    "medianSaleToListPct": 100,
    "medianLivingAreaSqFt": 2330,
    "salesAboveList": 263,
    "salesAtList": 85,
    "salesBelowList": 174
  },
  {
    "year": 2022,
    "ytd": false,
    "closedSales": 461,
    "medianSalePrice": 665000,
    "averageSalePrice": 688726,
    "medianPricePerSqFt": 295.97,
    "medianDaysOnMarket": 13,
    "medianSaleToListPct": 100,
    "medianLivingAreaSqFt": 2292,
    "salesAboveList": 205,
    "salesAtList": 66,
    "salesBelowList": 189
  },
  {
    "year": 2023,
    "ytd": false,
    "closedSales": 366,
    "medianSalePrice": 700000,
    "averageSalePrice": 711305,
    "medianPricePerSqFt": 307.27,
    "medianDaysOnMarket": 22,
    "medianSaleToListPct": 99,
    "medianLivingAreaSqFt": 2291,
    "salesAboveList": 83,
    "salesAtList": 70,
    "salesBelowList": 213
  },
  {
    "year": 2024,
    "ytd": false,
    "closedSales": 341,
    "medianSalePrice": 717000,
    "averageSalePrice": 732603,
    "medianPricePerSqFt": 324.42,
    "medianDaysOnMarket": 26,
    "medianSaleToListPct": 98,
    "medianLivingAreaSqFt": 2286,
    "salesAboveList": 54,
    "salesAtList": 51,
    "salesBelowList": 236
  },
  {
    "year": 2025,
    "ytd": false,
    "closedSales": 348,
    "medianSalePrice": 718000,
    "averageSalePrice": 736020,
    "medianPricePerSqFt": 328.92,
    "medianDaysOnMarket": 35,
    "medianSaleToListPct": 98,
    "medianLivingAreaSqFt": 2249,
    "salesAboveList": 38,
    "salesAtList": 58,
    "salesBelowList": 251
  },
  {
    "year": 2026,
    "ytd": true,
    "closedSales": 324,
    "medianSalePrice": 736500,
    "averageSalePrice": 754860,
    "medianPricePerSqFt": 326.09,
    "medianDaysOnMarket": 27,
    "medianSaleToListPct": 98,
    "medianLivingAreaSqFt": 2280,
    "salesAboveList": 47,
    "salesAtList": 63,
    "salesBelowList": 214
  }
],
  velocity: { peakYear: 2021, peakSales: 522, sales2025: 348, salesChange2021to2025Pct: -33.3, domFrom2021: 9, domTo2025: 35 },
  listPrice: { aboveList2021Pct: 50, aboveList2021: '263 of 522', aboveList2025Pct: 11, aboveList2025: '38 of 347', belowList2026Pct: 66, belowList2026: '214 of 324' },
  indexed2026: { medianPrice: 160.1, pricePerSqFt: 160.2 },
  // Subdivision medians: only where both compared years have >= 5 sales. Names follow the MLS legal subdivision, grouped where spellings differ.
  subdivisions: [
  {
    "name": "Silver Lakes",
    "sales2020to2026": 328,
    "median2020": 462500,
    "n2020": 57,
    "medianLatest": 710000.0,
    "nLatest": 38,
    "latestYear": 2026,
    "changePct": 53.5
  },
  {
    "name": "Pembroke Falls",
    "sales2020to2026": 252,
    "median2020": 527500.0,
    "n2020": 52,
    "medianLatest": 850000,
    "nLatest": 27,
    "latestYear": 2026,
    "changePct": 61.1
  },
  {
    "name": "Towngate",
    "sales2020to2026": 189,
    "median2020": 442500.0,
    "n2020": 36,
    "medianLatest": 705500.0,
    "nLatest": 28,
    "latestYear": 2026,
    "changePct": 59.4
  },
  {
    "name": "Pembroke Lakes",
    "sales2020to2026": 178,
    "median2020": 445000,
    "n2020": 21,
    "medianLatest": 724000.0,
    "nLatest": 24,
    "latestYear": 2026,
    "changePct": 62.7
  },
  {
    "name": "Chapel Trail",
    "sales2020to2026": 151,
    "median2020": 515000.0,
    "n2020": 20,
    "medianLatest": 750000,
    "nLatest": 17,
    "latestYear": 2026,
    "changePct": 45.6
  },
  {
    "name": "Westfork",
    "sales2020to2026": 118,
    "median2020": 502450.0,
    "n2020": 22,
    "medianLatest": 806000.0,
    "nLatest": 16,
    "latestYear": 2026,
    "changePct": 60.4
  },
  {
    "name": "Boulevard Heights",
    "sales2020to2026": 117,
    "median2020": 362500.0,
    "n2020": 18,
    "medianLatest": 595000,
    "nLatest": 15,
    "latestYear": 2026,
    "changePct": 64.1
  },
  {
    "name": "Pasadena Lakes",
    "sales2020to2026": 104,
    "median2020": 412000.0,
    "n2020": 12,
    "medianLatest": 660000,
    "nLatest": 13,
    "latestYear": 2026,
    "changePct": 60.2
  },
  {
    "name": "Walnut Creek",
    "sales2020to2026": 88,
    "median2020": 422500.0,
    "n2020": 18,
    "medianLatest": 692500.0,
    "nLatest": 8,
    "latestYear": 2026,
    "changePct": 63.9
  },
  {
    "name": "Westview",
    "sales2020to2026": 71,
    "median2020": 412500,
    "n2020": 11,
    "medianLatest": 649500.0,
    "nLatest": 6,
    "latestYear": 2026,
    "changePct": 57.5
  },
  {
    "name": "Pembroke Shores",
    "sales2020to2026": 70,
    "median2020": 554000,
    "n2020": 11,
    "medianLatest": 885000.0,
    "nLatest": 8,
    "latestYear": 2026,
    "changePct": 59.7
  },
  {
    "name": "Pembroke Isles",
    "sales2020to2026": 67,
    "median2020": 515000.0,
    "n2020": 10,
    "medianLatest": 815000,
    "nLatest": 13,
    "latestYear": 2026,
    "changePct": 58.3
  },
  {
    "name": "Big Sky",
    "sales2020to2026": 60,
    "median2020": 511750.0,
    "n2020": 12,
    "medianLatest": 797500.0,
    "nLatest": 6,
    "latestYear": 2026,
    "changePct": 55.8
  },
  {
    "name": "Hollywood Lakes Country Club",
    "sales2020to2026": 54,
    "median2020": 492750.0,
    "n2020": 12,
    "medianLatest": 802500.0,
    "nLatest": 8,
    "latestYear": 2026,
    "changePct": 62.9
  },
  {
    "name": "Lakeside South",
    "sales2020to2026": 51,
    "median2020": 404500.0,
    "n2020": 8,
    "medianLatest": 640000.0,
    "nLatest": 8,
    "latestYear": 2026,
    "changePct": 58.2
  }
],
  // Active-listing snapshot ("Pembroke Pines right now"): PENDING. Carlos will supply the Active statistics sheet and RE1 export.
  active: null,
} as const;
