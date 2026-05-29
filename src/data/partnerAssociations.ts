// ──────────────────────────────────────────────────────────────────────────
// MIAMI REALTORS® — International Partner Association Network
//
// Source: MIAMI REALTORS® "Partner Associations / Global Markets" reach sheet
// (MiamiRealtors.com/GlobalPartners). The MIAMI Association of REALTORS® holds
// the most international partner agreements of any local REALTOR® association
// in the world — connecting MIAMI-listed property to a global professional
// network of buyers' agents.
//
// These figures are why a South Florida or Spain seller listing through a
// MIAMI / South Florida REALTORS® member reaches far beyond the local market:
// the listing enters an MLS whose member network is formally connected to
// 300+ real estate associations across 70+ countries.
// ──────────────────────────────────────────────────────────────────────────

/** Headline reach figures, taken directly from the MIAMI REALTORS® reach sheet. */
export const GLOBAL_REACH = {
  /** Partner associations worldwide — "the most of any REALTOR® association in the world." */
  partnerAssociations: "300+",
  /** Real estate professionals the network links MIAMI properties to, worldwide. */
  professionals: "2 million+",
  /** Web sites that feature MIAMI listings through syndication partners. */
  websites: "500+",
  /** Countries and territories with at least one signed partner association. */
  countries: "70+",
} as const;

export interface PartnerRegion {
  /** Region key used for grouping in the UI. */
  region: string;
  /** Short descriptor of why this region matters to a MIAMI seller. */
  note: string;
  /** Countries / territories within the region that have partner associations. */
  countries: string[];
  /** A handful of flagship partner associations, for credibility. */
  flagship: string[];
}

// Regions ordered by relevance to the South Florida ↔ Spain / LATAM seller story.
export const PARTNER_REGIONS: PartnerRegion[] = [
  {
    region: "Latin America & the Caribbean",
    note:
      "The dominant source of international buyers in South Florida — and of luxury buyers in Spain. The network reaches the agents who represent them.",
    countries: [
      "Argentina",
      "Bahamas",
      "Belize",
      "Bolivia",
      "Brazil",
      "Cayman Islands",
      "Chile",
      "Colombia",
      "Costa Rica",
      "Dominican Republic",
      "Ecuador",
      "El Salvador",
      "Grenada",
      "Guatemala",
      "Honduras",
      "Jamaica",
      "Mexico",
      "Nicaragua",
      "Panama",
      "Paraguay",
      "Peru",
      "Puerto Rico",
      "Uruguay",
      "U.S. Virgin Islands",
      "Venezuela",
    ],
    flagship: [
      "Asociación Mexicana de Profesionales Inmobiliarios (AMPI)",
      "Confederación Inmobiliaria de Latinoamérica (CILA)",
      "Cámara Inmobiliaria Argentina (CIA)",
      "Asociación Panameña de Corredores de Bienes Raíces (ACOBIR)",
      "FECEPAC — 8 Central American associations",
    ],
  },
  {
    region: "Europe",
    note:
      "Spain, France, Italy, Germany and beyond — the cross-border channel for Spanish inventory and European buyers seeking U.S. assets.",
    countries: [
      "Albania",
      "Andorra",
      "Austria",
      "Belgium",
      "Bulgaria",
      "Czech Republic",
      "Denmark",
      "Finland",
      "France",
      "Georgia",
      "Germany",
      "Greece",
      "Hungary",
      "Ireland",
      "Italy",
      "Luxembourg",
      "Netherlands",
      "Norway",
      "Poland",
      "Portugal",
      "Romania",
      "Russia",
      "Serbia",
      "Slovak Republic",
      "Spain",
      "Sweden",
      "Ukraine",
      "United Kingdom",
    ],
    flagship: [
      "Spanish International Realty Alliance (SIRA)",
      "Federación de Asociaciones Inmobiliarias (FAI) — Spain",
      "Col·legi d'Agents de la Propietat Immobiliària de Barcelona",
      "Italian Federation of Real Estate Agents (FIAIP)",
      "Fédération Nationale de l'Immobilier (FNAIM) — France",
    ],
  },
  {
    region: "Asia-Pacific",
    note:
      "High-net-worth capital from China, India, Korea and Southeast Asia — buyers who acquire South Florida property as a global asset.",
    countries: [
      "Australia",
      "Cambodia",
      "China",
      "Hong Kong",
      "India",
      "Indonesia",
      "Japan",
      "Korea",
      "Mongolia",
      "Philippines",
      "Singapore",
      "Taiwan",
      "Thailand",
      "Vietnam",
    ],
    flagship: [
      "China Real Estate Association (CREA)",
      "NAR India — covering 28 member associations",
      "Korea Association of Realtors",
      "Institute of Estate Agents (IEA) — Singapore",
    ],
  },
  {
    region: "Middle East & Africa",
    note:
      "Sovereign and private wealth from the Gulf and a growing African professional network — increasingly active in U.S. luxury markets.",
    countries: [
      "Israel",
      "Lebanon",
      "Morocco",
      "Nigeria",
      "Saudi Arabia",
      "Tunisia",
      "Turkey",
      "United Arab Emirates",
      "Uzbekistan",
    ],
    flagship: [
      "Dubai Land Department",
      "Abu Dhabi Real Estate Centre (ADREC)",
      "Dubai Real Estate Institute (DREI)",
      "Real Estate Cluster (REC) — Saudi Arabia",
    ],
  },
  {
    region: "Worldwide Federations",
    note:
      "Global bodies that multiply reach across every continent at once — one agreement, thousands of member firms.",
    countries: ["FIABCI (International)", "CCIM Institute", "AREAA Global"],
    flagship: [
      "FIABCI — International Real Estate Federation",
      "World Property Business Club",
      "AREAA Global (Asian Real Estate Association of America)",
      "CCIM Institute",
    ],
  },
];

/** Total distinct countries/territories represented across all regions. */
export const PARTNER_COUNTRY_COUNT = PARTNER_REGIONS.filter(
  (r) => r.region !== "Worldwide Federations",
).reduce((sum, r) => sum + r.countries.length, 0);
