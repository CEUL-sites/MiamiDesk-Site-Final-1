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
// the listing enters an MLS backed by 437+ international agreements and 93,000 member agents.
// ──────────────────────────────────────────────────────────────────────────

/** Headline reach figures — verified (src/data/figures.json). */
export const GLOBAL_REACH = {
  /** International partner associations (MIAMI Global Council). */
  partnerAssociations: "300+",
  /** Real estate professionals reached through the international referral network. */
  professionals: "1 million+",
  /** Countries with at least one partner association. */
  countries: "70+",
  /** Global websites featuring MIAMI listings. */
  globalWebsites: "200+",
} as const;

export interface PartnerRegion {
  /** Region key used for grouping in the UI. */
  region: string;
  /** Spanish region name. */
  regionEs: string;
  /** Short descriptor of why this region matters to a MIAMI seller. */
  note: string;
  /** Spanish version of the note. */
  noteEs: string;
  /** Countries / territories within the region that have partner associations. */
  countries: string[];
  /** A handful of flagship partner associations, for credibility. */
  flagship: string[];
}

// Regions ordered by relevance to the South Florida ↔ Spain / LATAM seller story.
export const PARTNER_REGIONS: PartnerRegion[] = [
  {
    region: "Latin America & the Caribbean",
    regionEs: "Latinoamérica y el Caribe",
    note:
      "The dominant source of international buyers in South Florida — and of luxury buyers in Spain. The network reaches the agents who represent them.",
    noteEs:
      "La principal procedencia de compradores internacionales en el Sur de Florida — y de compradores de lujo en España. La red llega a los agentes que los representan.",
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
    regionEs: "Europa",
    note:
      "Spain, France, Italy, Germany and beyond — the cross-border channel for Spanish inventory and European buyers seeking U.S. assets.",
    noteEs:
      "España, Francia, Italia, Alemania y más — el canal transfronterizo para inmuebles españoles y compradores europeos que buscan activos en EE. UU.",
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
    regionEs: "Asia-Pacífico",
    note:
      "High-net-worth capital from China, India, Korea and Southeast Asia — buyers who acquire South Florida property as a global asset.",
    noteEs:
      "Capital de alto patrimonio de China, India, Corea y el Sudeste Asiático — compradores que adquieren propiedad en el Sur de Florida como activo global.",
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
    regionEs: "Oriente Medio y África",
    note:
      "Sovereign and private wealth from the Gulf and a growing African professional network — increasingly active in U.S. luxury markets.",
    noteEs:
      "Patrimonio soberano y privado del Golfo y una creciente red profesional africana — cada vez más activos en los mercados de lujo de EE. UU.",
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
    regionEs: "Federaciones Mundiales",
    note:
      "Global bodies that multiply reach across every continent at once — one agreement, thousands of member firms.",
    noteEs:
      "Organismos globales que multiplican el alcance en todos los continentes a la vez — un acuerdo, miles de firmas miembro.",
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
