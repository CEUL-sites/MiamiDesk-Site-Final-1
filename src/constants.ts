export const CONTACT = {
  name: "Carlos Uzcategui",
  title: "Florida Licensed Realtor® since 2001",
  licenseDisplay: "Carlos Uzcategui · Florida Licensed Realtor® SL705771",
  shortLicense: "Florida Licensed Realtor® SL705771",
  brokerage: "United Realty Group",
  brokerageDisplay: "United Realty Group associate",
  email: "contact@carlosre.com",
  phoneUS: "+1 954-865-6622",
  phoneUSDisplay: "(954) 865-6622",
  phoneUSLink: "tel:+19548656622",
  phoneSpain: "+34 646 853 078",
  phoneSpainDisplay: "+34 646 853 078",
  phoneSpainLink: "tel:+34646853078",
  officePhoneUS: "+1 954-450-2000",
  whatsappUS: "https://wa.me/19548656622?text=Hello%20Carlos%2C%20I%20am%20considering%20selling%20a%20property%20in%20South%20Florida%20and%20would%20like%20a%20private%20seller%20strategy%20review.",
  whatsappSpain: "https://wa.me/34646853078?text=Hello%20Carlos%2C%20I%20would%20like%20to%20ask%20about%20South%20Florida%20and%20Spain%20real%20estate%20opportunities.",
  whatsappBroker: "https://wa.me/19548656622?text=Hello%20Carlos%2C%20I%20am%20a%20licensed%20real%20estate%20professional%20and%20would%20like%20to%20schedule%20a%20broker-to-broker%20conversation%20about%20a%20referral%20or%20international%20cooperation%20opportunity.",
  whatsappBrokerSpain: "https://wa.me/34646853078?text=Hola%20Carlos%2C%20soy%20un%20profesional%20inmobiliario%20y%20me%20gustar%C3%ADa%20hablar%20sobre%20un%20referido%20o%20una%20cooperaci%C3%B3n%20internacional.",
  address: "15951 SW 41 St #700, Weston, FL 33331",
  spainOffice: "Madrid, Spain",
  linkedin: "https://linkedin.com/in/carlosuz",
  calendly: "https://calendly.com/carlosre",
  web: "HomesProfessional.com",
  headshot: "/images/carlos-headshot.png",
  stats: {
    experience: "25",
    agents: "93,000",
    offices: "20",
    urgAgents: "3,500+",
    urgOffices: "20",
    urgFounded: "2002",
    brokerage: "United Realty Group",
    network: "Miami and South Florida REALTORS®"
  }
};

// Strip trailing slashes so `/global-desk/` matches `/global-desk` — React
// Router serves both, and useLocation().pathname keeps the visitor's slash.
const normalizePath = (path: string): string => path.replace(/\/+$/, "") || "/";

// Routes whose audience converts on the Spain WhatsApp line (+34) rather than
// the US line. Shared by every floating/sticky contact control so a Spanish
// prospect is never routed to the US number.
export const isSpainMarketRoute = (path: string): boolean => {
  const p = normalizePath(path);
  return (
    p === "/es" ||
    p.startsWith("/es/") ||
    ["/madrid", "/spain-desk", "/global-desk", "/spain-mls-listing", "/la-comision-secreta"].includes(p)
  );
};

// Routes rendered in Spanish — controls the language of sticky-CTA labels.
export const isSpanishLangRoute = (path: string): boolean => {
  const p = normalizePath(path);
  return p === "/es" || p.startsWith("/es/") || p === "/la-comision-secreta";
};

export const LEAD_MAGNETS = {
  sellerNetSheet: {
    url: "/south-florida-sellers-net-sheet-2026.pdf",
    title: "South Florida Seller's Net Sheet 2026",
    description: "What you actually keep — modelled at $3M and $8M sale prices, across Miami-Dade, Broward, and Palm Beach Counties.",
  },
  buyerBrief: {
    url: "/miami-buyer-brief-q3-2026.pdf",
    title: "Miami Buyer Brief Q3 2026",
    description: "Neighbourhood profiles, foreign-national financing, FIRPTA, and the typical closing timeline — for buyers relocating from Latin America and Spain into South Florida.",
  },
  spainActivation: {
    url: "/spain-mls-activation-methodology-brief.pdf",
    title: "Activating Spanish Inventory Through South Florida",
    description: "The professional framework for selected Spanish-owned property to pursue South Florida buyer-agent activation through Carlos Uzcategui, Florida Realtor®, and United Realty Group.",
  },
};

// Where past clients are routed to leave a public review (Fix 17 funnel).
// Realtor.com is Carlos's verified agent profile (direct review link).
// GOOGLE: no Google Business Profile Place ID is on file, so this opens Maps
// to his business listing where a review can be left. When the GBP Place ID is
// known, replace `google` with the direct deep link:
//   https://search.google.com/local/writereview?placeid=<PLACE_ID>
export const REVIEW_PROFILES = {
  realtor: "https://www.realtor.com/realestateagents/56b2bc997e54f7010020ea51",
  google:
    "https://www.google.com/maps/search/?api=1&query=Carlos%20Uzcategui%20United%20Realty%20Group%20Weston%20FL",
};

export const NAVIGATION = [
  { name: "Sellers",      href: "/sell-south-florida" },
  { name: "Home Value",   href: "/home-value" },
  { name: "Buyers",       href: "/buy" },
  { name: "Markets",      href: "/markets" },
  { name: "Agents",       href: "/agents" },
  { name: "Global Desk",  href: "/global-desk" },
  { name: "Journal",      href: "/journal" },
  { name: "Contact",      href: "/contact" },
];

// Verified figures only. Single source of truth is src/data/figures.json
// (with per-figure sources/citations); these mirror it for legacy imports.
// Attribute $69B only to the association network's combined 2025 transaction volume,
// never to Carlos or United Realty Group. Do NOT add any
// time-based promise (Day 1, 24 hours, same-day, instant).
// Do NOT add unverifiable brokerage superlatives ("#1 Florida", "Most Closed Homes",
// "leading transactional brokerage"): no independent authority supports them and they
// create Fla. Admin. Code R. 61J2-10.025(1) deceptive-advertising exposure.
export const ASSOCIATION_STATS = {
  memberCount: 93000,
  mlsRank: "world's largest local REALTOR® association",
  globalWebsites: 200,
  globalWebsitesAlt: 200,
  languages: 19,
  internationalAgreements: 437,
  countries: 75,
  usMls: 260,
  mlsDataExchanges: 11,
  networkVolume: "$69B",
  networkVolumeLabel: "combined 2025 association-network transaction volume",
  // Defensible, attributed URG description — no unverifiable ranking.
  urgScale: "3,500+ agents · 20 Florida offices",
  urgAgents: "3,500+",
  urgOffices: 20,
  associationName: "Miami and South Florida REALTORS®"
};

// NEO (New Estate Only) — Carlos's official embed (newestateonly.com).
// Public embed key from the NEO dashboard; the loader injects content into #NEOiframe.
export const NEO = {
  loader: "https://assets.newestateonly.com/iframe-loader/load.js",
  key: "69a57c73d098c3620b75ec83",
};


// Source references — single source of truth for citation language used site-wide.
// Do not add a percentage to NAR_BUYER_AGENT unless the exact figure is verified
// against the current NAR Profile of Home Buyers and Sellers report.
export const SOURCES = {
  nar: "National Association of REALTORS® Profile of Home Buyers and Sellers",
  miamiRealtors: "Miami and South Florida REALTORS®",
  buyerAgentStatement:
    "According to NAR buyer/seller profile data, the overwhelming majority of U.S. buyers purchase through a real estate agent or broker.",
  buyerAgentThesis:
    "Buyer demand is often created online, but transactions are executed through professional relationships.",
};

// Reusable messaging blocks for the buyer-agent distribution thesis.
// Used in SellerProcess, AgentsPage, SpainDeskPage.
export const MESSAGING = {
  distributionPrinciple:
    "The internet creates visibility. Agent networks create movement.",
  listingIsIncomplete:
    "A listing is not fully marketed until buyer agents know how to present it.",
  networkIsThesis:
    "The agent network is not a side channel. It is the transaction channel.",
  buyerAgentMessenger:
    "The buyer's agent is often the messenger, interpreter, and confidence builder between your property and the buyer's decision.",
  spainCooperation:
    "In Spain, where there is no single MLS-style cooperation system comparable to South Florida, professional relationships matter even more. My cross-border role is to help structure cooperation between international buyer demand and serious local agencies — with clarity before introductions and transparency throughout.",
};

export const URG_CITIES = [
  { city: "Weston", region: "Broward County" },
  { city: "Plantation", region: "Broward County" },
  { city: "Coral Springs", region: "Broward County" },
  { city: "Pembroke Pines", region: "Broward County" },
  { city: "Miramar", region: "Broward County" },
  { city: "Hollywood", region: "Broward County" },
  { city: "Hallandale Beach", region: "Broward County" },
  { city: "Fort Lauderdale", region: "Broward County" },
  { city: "Sunrise", region: "Broward County" },
  { city: "Parkland", region: "Broward County" },
  { city: "Deerfield Beach", region: "Broward County" },
  { city: "Pompano Beach", region: "Broward County" },
  { city: "Boca Raton", region: "Palm Beach County" },
  { city: "Delray Beach", region: "Palm Beach County" },
  { city: "West Palm Beach", region: "Palm Beach County" },
  { city: "Miami", region: "Miami-Dade County" },
  { city: "Coral Gables", region: "Miami-Dade County" },
  { city: "Brickell", region: "Miami-Dade County" },
  { city: "Aventura", region: "Miami-Dade County" },
  { city: "Miami Beach", region: "Miami-Dade County" },
  { city: "Miami Lakes", region: "Miami-Dade County" },
  { city: "Doral", region: "Miami-Dade County" },
  { city: "Hialeah", region: "Miami-Dade County" },
  { city: "Kendall", region: "Miami-Dade County" },
  { city: "Homestead", region: "Miami-Dade County" },
];

