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
  officePhoneUS: "+1 954-450-2000",
  whatsappUS: "https://wa.me/19548656622?text=Hello%20Carlos%2C%20I%20am%20considering%20selling%20a%20property%20in%20South%20Florida%20and%20would%20like%20a%20private%20seller%20strategy%20review.",
  whatsappSpain: "https://wa.me/34646853078?text=Hello%20Carlos%2C%20I%20would%20like%20to%20ask%20about%20South%20Florida%20and%20Spain%20real%20estate%20opportunities.",
  address: "15951 SW 41 St #700, Weston, FL 33331",
  spainOffice: "Madrid, Spain",
  linkedin: "https://linkedin.com/in/carlosuz",
  calendly: "https://calendly.com/carlosre",
  web: "HomesProfessional.com",
  headshot: "https://lh3.googleusercontent.com/d/1JZ1hv1IfBykkfoy2TYmGK9M5N2Xwwklx",
  stats: {
    experience: "25",
    agents: "93,000",
    offices: "20",
    urgAgents: "3,500+",
    brokerage: "United Realty Group",
    network: "Miami and South Florida REALTORS®"
  }
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
    title: "Activating Spanish Inventory in the Miami MLS",
    description: "The professional framework for listing Spanish-owned property through a licensed U.S. principal of record — with institutional American market exposure from day one.",
  },
};

export const NAVIGATION = [
  { name: "Sellers", href: "/sell" },
  { name: "Buyers", href: "/buy" },
  { name: "New Construction", href: "/new-construction" },
  { name: "Markets", href: "/markets" },
  { name: "Agents", href: "/agents" },
  { name: "Madrid", href: "/madrid" },
  { name: "Spain Desk", href: "/spain-desk" },
  { name: "Journal", href: "/journal" },
  { name: "Contact", href: "/contact" },
];

// Verified figures per the build brief (Section 2). Single source of truth is
// src/data/figures.json (with per-figure sources/citations); these mirror it
// for legacy imports. Figures the brief flags (437+, 11, $69B) are kept WITH a
// primary-source citation rather than removed.
export const ASSOCIATION_STATS = {
  memberCount: 93000,
  mlsRank: "third-largest MLS in the United States",
  globalWebsites: 200,
  languages: 19,
  partnerAssociations: 300,
  professionals: "1 million+",
  countries: 70,
  usMls: 260,
  internationalAgreements: 437,
  mlsDataExchanges: 11,
  annualVolume: "$69B",
  urgAgents: "3,500+",
  urgOffices: 20,
  mergerDate: "May 11, 2026",
  associationName: "Miami and South Florida REALTORS®"
};

// NEO (New Estate Only) — Carlos's official embed (newestateonly.com).
// Public embed key from the NEO dashboard; the loader injects content into #NEOiframe.
export const NEO = {
  loader: "https://assets.newestateonly.com/iframe-loader/load.js",
  key: "69a57c73d098c3620b75ec83",
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

