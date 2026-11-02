import { trackMicroConversion } from "../lib/analytics";
import { CountyExplorer } from "../components/CountyExplorer";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChevronRight,
  Globe,
  GraduationCap,
  Landmark,
  MapPin,
  Palmtree,
  Plane,
  TrendingUp,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { Testimonials } from "../components/Testimonials";
import { FaqAccordion } from "../components/FaqAccordion";
import { ASSOCIATION_STATS, CONTACT, URG_CITIES } from "../constants";

const MIAMI_DADE = URG_CITIES.filter((c) => c.region === "Miami-Dade County").map((c) => c.city);
const BROWARD = URG_CITIES.filter((c) => c.region === "Broward County").map((c) => c.city);
const PALM_BEACH = URG_CITIES.filter((c) => c.region === "Palm Beach County").map((c) => c.city);

const MEMBER_COUNT = ASSOCIATION_STATS.memberCount.toLocaleString("en-US");
const GLOBAL_PORTALS = `${ASSOCIATION_STATS.globalWebsites}+`;
const US_MLS = `${ASSOCIATION_STATS.usMls}+`;
const INTERNATIONAL_AGREEMENTS = `${ASSOCIATION_STATS.internationalAgreements}+`;
const MLS_DATA_EXCHANGES = String(ASSOCIATION_STATS.mlsDataExchanges);

const COUNTIES = [
  {
    name: "Miami-Dade County",
    stat: `${MIAMI_DADE.length} cities covered`,
    character:
      "Urban core and international gateway. Brickell, Coral Gables, Aventura, Doral, Miami Beach, and Coconut Grove form the primary entry point for Latin American, European, and domestic capital into South Florida—combining waterfront condominiums and established single-family estates.",
    highlights: [
      "Condominium underwriting requires close review of reserve studies, milestone inspections, floor height, and exposure.",
      "Single-family submarkets (Coral Gables, Pinecrest, Coconut Grove, Doral) trade on school corridors, lot size, and architectural updates.",
      "High cooperation velocity among Miami and South Florida REALTORS® buyer agents representing domestic and international purchasers.",
    ],
    featuredLinks: [
      { label: "Coral Gables", href: "/sell-coral-gables" },
      { label: "Brickell", href: "/sell-brickell" },
      { label: "Doral", href: "/sell-doral" },
      { label: "Aventura", href: "/sell-aventura" },
      { label: "Downtown Miami", href: "/sell-downtown-miami" },
      { label: "Miami", href: "/sell-miami" },
      { label: "Kendall", href: "/sell-kendall" },
      { label: "North Miami", href: "/sell-north-miami" },
    ],
    cities: MIAMI_DADE,
  },
  {
    name: "Broward County",
    stat: `${BROWARD.length} cities covered`,
    character:
      "Domestic relocation, executive family communities, and deepwater coastal estates. Weston, Plantation, Coral Springs, and Pembroke Pines anchor the western single-family corridor with A-rated public and private schools, while Fort Lauderdale, Pompano Beach, and Hallandale Beach lead the coastal waterfront segment.",
    highlights: [
      "Western gated and master-planned communities (Weston, Plantation) attract relocating families, executives, and move-up sellers.",
      "Homestead portability and post-occupancy transition agreements are critical levers for equity-rich Broward homeowners.",
      "Waterfront properties in Fort Lauderdale and Pompano Beach trade on dockage depth, ocean access, and seawall/roof insurability.",
    ],
    featuredLinks: [
      { label: "Weston", href: "/sell-weston" },
      { label: "Fort Lauderdale", href: "/sell-fort-lauderdale" },
      { label: "Plantation", href: "/sell-plantation" },
      { label: "Coral Springs", href: "/sell-coral-springs" },
      { label: "Pembroke Pines", href: "/sell-pembroke-pines" },
      { label: "Sunrise", href: "/sell-sunrise" },
      { label: "Pompano Beach", href: "/sell-pompano-beach" },
      { label: "Hallandale Beach", href: "/sell-hallandale-beach" },
    ],
    cities: BROWARD,
  },
  {
    name: "Palm Beach County",
    stat: `${PALM_BEACH.length} cities covered`,
    character:
      "Financial-sector migration, golf-club communities, and coastal luxury. Boca Raton, Delray Beach, and West Palm Beach draw Northeast and Midwest wealth migration alongside seasonal and full-time buyers at the $1.5M+ tier.",
    highlights: [
      "Strong Northeast and California tax-migration demand across Boca Raton, Delray Beach, and West Palm Beach.",
      "Club membership rules, HOA capital contributions, and roof/impact-glass specifications heavily influence net seller proceeds.",
      "Integrated tri-county MLS exposure connects Palm Beach listings with buyer agents across Broward and Miami-Dade.",
    ],
    featuredLinks: [
      { label: "Request Palm Beach CMA", href: "/home-value" },
      { label: "Live Market Statistics", href: "/market-data" },
      { label: "Private Seller Consultation", href: "/contact?intent=seller&market=palm-beach" },
    ],
    cities: PALM_BEACH,
  },
];

const SOUTH_FL_DRIVERS = [
  {
    icon: Landmark,
    title: "No state income tax",
    body: "Florida's absence of personal state income tax provides a permanent structural pull for relocating executives, business owners, and high-earning households from the Northeast, Midwest, and California.",
  },
  {
    icon: Plane,
    title: "The U.S. gateway to the Americas & Europe",
    body: "Miami International Airport, Fort Lauderdale-Hollywood International, and PortMiami make South Florida the primary landing point for Latin American and European capital.",
  },
  {
    icon: Building2,
    title: "Financial & corporate expansion",
    body: "Asset managers, family offices, private-equity firms, and legal practices have established permanent South Florida offices across Brickell, Coral Gables, Fort Lauderdale, and West Palm Beach.",
  },
  {
    icon: GraduationCap,
    title: "Established school & family corridors",
    body: "Weston, Pinecrest, Coral Gables, Parkland, and Boca Raton anchor sustained domestic family demand independent of seasonal resort cycles.",
  },
  {
    icon: Palmtree,
    title: "Year-round coastal & boating liquidity",
    body: "Oceanfront condominiums, deepwater yachting estates, and club communities keep South Florida liquid across primary, secondary, and relocation buyer segments.",
  },
  {
    icon: TrendingUp,
    title: "Cooperating buyer-agent ecosystem",
    body: "Over 90% of residential transactions in the MLS close through cooperating buyer agents—making accurate pricing, reverse prospecting, and agent-to-agent negotiation decisive.",
  },
];

const INTL_MARKETS = [
  {
    region: "Latin America",
    note: "Colombia, Venezuela, Argentina, Brazil, Mexico, Chile, Peru, and Panama represent the deepest historical cross-border buyer and seller corridor into Miami-Dade and Broward.",
  },
  {
    region: "Spain & Portugal",
    note: "Madrid, Marbella, Costa del Sol, Barcelona, and Lisbon—connected through our Bilateral Spain-Miami Desk where Carlos serves as the Florida-licensed principal of record alongside local Spanish agencies.",
  },
  {
    region: "United Kingdom, Europe & Canada",
    note: "London, Paris, Frankfurt, Zürich, Toronto, and Montreal—supported by international bilateral REALTOR® agreements and multilingual portal syndication.",
  },
  {
    region: "Domestic U.S. Wealth Corridors",
    note: "New York, New Jersey, Connecticut, Massachusetts, Illinois, and California—reached via 260+ U.S. MLSs syndicated through RPR and 11 direct North American data exchanges.",
  },
];

const MARKETS_FAQS = [
  {
    q: "What counties does Carlos Uzcategui serve in South Florida?",
    a: `Carlos serves Miami-Dade, Broward, and Palm Beach counties through Florida License SL705771, United Realty Group, and ${ASSOCIATION_STATS.associationName} listing-distribution infrastructure.`,
  },
  {
    q: "Does Carlos sell real estate in Spain?",
    a: "Carlos is licensed exclusively in Florida (SL705771). Where applicable, he acts as the Florida licensed principal of record for Miami Global Listing Desk activation while affiliated local Spanish agencies handle local buyer qualification, showings, and negotiation.",
  },
  {
    q: "Which cities in South Florida does United Realty Group cover?",
    a: `United Realty Group covers ${URG_CITIES.length} cities across three counties: Miami-Dade (including Miami, Coral Gables, North Miami, Aventura, Miami Beach, Doral, and Hialeah), Broward (including Weston, Plantation, Fort Lauderdale, Coral Springs, and Pembroke Pines), and Palm Beach (including Boca Raton, Delray Beach, and West Palm Beach).`,
  },
  {
    q: "What is United Realty Group's South Florida footprint?",
    a: `United Realty Group has ${ASSOCIATION_STATS.urgAgents} licensed agents and a ${ASSOCIATION_STATS.urgOfficeNetwork}. Carlos works from the official Weston branch as a REALTOR® and Florida real estate licensee SL705771.`,
  },
  {
    q: "How does the Miami MLS reach international buyers?",
    a: `${ASSOCIATION_STATS.associationName} is the world's largest local REALTOR® association with ${MEMBER_COUNT} member agents. Eligible listings may be distributed to ${GLOBAL_PORTALS} global portals in ${ASSOCIATION_STATS.languages} languages, syndicated through ${US_MLS} U.S. MLSs via RPR, supported by ${INTERNATIONAL_AGREEMENTS} signed international agreements and ${MLS_DATA_EXCHANGES} MLS data exchanges. Carlos represents South Florida sellers through United Realty Group, with ${ASSOCIATION_STATS.urgAgents} agents and a ${ASSOCIATION_STATS.urgOfficeNetwork}. Any activation is subject to brokerage, platform, MLS, legal, and compliance requirements.`,
  },
] as const;

export default function MarketsPage() {
  const [activeCounty, setActiveCounty] = useState(0);

  return (
    <>
      <Helmet>
        <title>Markets Served: South Florida & Bilateral Global Desk | Carlos Uzcategui</title>
        <meta
          name="description"
          content={`South Florida real estate markets across Miami-Dade, Broward, and Palm Beach plus bilateral international distribution through ${ASSOCIATION_STATS.associationName}: ${MEMBER_COUNT} members, ${GLOBAL_PORTALS} portals.`}
        />
        <link rel="canonical" href="https://homesprofessional.com/markets" />
        <meta
          property="og:title"
          content="Markets Served: South Florida & Bilateral Global Desk | HomesProfessional.com"
        />
        <meta
          property="og:description"
          content="South Florida listing distribution and selected international activation through Carlos Uzcategui, REALTOR® and Florida real estate licensee SL705771, United Realty Group, and Miami Global Listing Desk."
        />
        <meta property="og:url" content="https://homesprofessional.com/markets" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Markets Served: South Florida & Bilateral Global Desk | HomesProfessional.com"
        />
        <meta
          name="twitter:description"
          content="Seller distribution positioning across South Florida, Spain, and international referral channels through Miami Global Listing Desk."
        />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>

      <JsonLd
        id="markets-breadcrumb"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://homesprofessional.com/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "Markets",
              item: "https://homesprofessional.com/markets",
            },
          ],
        }}
      />

      <JsonLd
        id="markets-faq"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: MARKETS_FAQS.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }}
      />

      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-28 lg:pb-0">
        <Navbar />

        {/* Section 1: Regional Intelligence Hero + Interactive County Explorer */}
        <section className="advisory-hero" aria-labelledby="markets-hero-heading">
          <div className="advisory-hero-inner">
            <div>
              <p className="advisory-eyebrow">South Florida · Regional Market Intelligence</p>
              <h1 id="markets-hero-heading">
                One Region. Distinct Markets. Different Strategies.
              </h1>
              <p className="advisory-summary">
                Explore Miami-Dade, Broward and Palm Beach, then discuss the local evidence that matters to your property and next move.
              </p>
              <div className="advisory-actions">
                <a
                  href="#county-intelligence"
                  className="advisory-primary"
                  onClick={() =>
                    trackMicroConversion("hp_cta_click", {
                      type: "explore_market",
                      location: "markets_hero",
                    })
                  }
                >
                  Explore County Submarkets
                </a>
                <a
                  href="/home-value"
                  className="advisory-secondary"
                  onClick={() =>
                    trackMicroConversion("hp_cta_click", {
                      type: "property_market_review",
                      location: "markets_hero",
                    })
                  }
                >
                  Request a Property-Specific CMA
                </a>
              </div>
              <p className="advisory-note">
                {CONTACT.licenseDisplay} · United Realty Group · 25 Years South Florida Experience
              </p>
            </div>
            <CountyExplorer selected={activeCounty} onSelect={setActiveCounty} />
          </div>
        </section>

        {/* Section 2: Tri-County Submarket Intelligence */}
        <section id="county-intelligence" className="scroll-mt-24 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <div className="max-w-3xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                  South Florida Tri-County Coverage
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                  Three counties, one integrated MLS.{" "}
                  <span className="font-light italic text-gold-ink">
                    Distinct pricing and buyer dynamics.
                  </span>
                </h2>
                <p className="mt-4 font-sans text-base leading-relaxed text-ink-primary/70">
                  Carlos represents South Florida sellers and buyers through United Realty Group, with{" "}
                  {CONTACT.stats.urgAgents} agents across the {CONTACT.stats.urgOfficeNetwork} (19 Florida office locations). Select a county below to review submarket character, underwriting priorities, and dedicated community guides.
                </p>
              </div>
              <a
                href="/market-data"
                className="inline-flex items-center gap-2 border border-bone bg-ivory px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-navy-deep transition-colors hover:border-gold hover:text-gold-ink"
              >
                View Live MLS Market Statistics
                <ArrowRight size={13} />
              </a>
            </div>

            {/* Interactive County Tab Switcher */}
            <div
              role="tablist"
              aria-label="South Florida counties"
              className="grid grid-cols-1 divide-y divide-hairline border border-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0"
            >
              {COUNTIES.map((county, i) => {
                const isSelected = activeCounty === i;
                return (
                  <button
                    key={county.name}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveCounty(i)}
                    className={`px-6 py-5 text-left transition-colors ${
                      isSelected
                        ? "bg-navy-deep text-white"
                        : "bg-ivory/60 text-navy/65 hover:bg-ivory hover:text-navy-deep"
                    }`}
                  >
                    <span className="block font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">
                      {county.name}
                    </span>
                    <span
                      className={`mt-1.5 block font-mono text-[10px] uppercase tracking-[0.14em] ${
                        isSelected ? "text-gold" : "text-gold-ink"
                      }`}
                    >
                      {county.stat}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active County Intelligence Panel */}
            <div className="border border-t-0 border-hairline bg-white p-8 md:p-12">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gold shrink-0" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-ink">
                      {COUNTIES[activeCounty].stat} · MLS Regional Profile
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl text-navy-deep md:text-3xl">
                    {COUNTIES[activeCounty].name}
                  </h3>
                  <p className="mt-4 font-sans text-[15px] leading-relaxed text-ink-primary/75">
                    {COUNTIES[activeCounty].character}
                  </p>

                  <div className="mt-6 space-y-3 border-t border-hairline pt-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-ink">
                      Key Valuation & Transaction Considerations
                    </p>
                    {COUNTIES[activeCounty].highlights.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <BadgeCheck size={15} className="mt-0.5 shrink-0 text-gold" />
                        <p className="font-sans text-sm leading-relaxed text-ink-primary/75">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Linked Submarket Guides + Full Coverage Note */}
                <div className="border border-bone bg-ivory p-7 lg:col-span-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-ink">
                    Dedicated Submarket Seller Guides
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2.5">
                    {COUNTIES[activeCounty].featuredLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center gap-1.5 border border-bone bg-white px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-navy-deep transition-colors hover:border-gold hover:text-gold-ink"
                      >
                        {link.label}
                        <ArrowRight size={11} className="text-gold" />
                      </a>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-bone pt-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-navy/70">
                      All {COUNTIES[activeCounty].name} Municipalities Served
                    </p>
                    <p className="mt-2 font-sans text-xs leading-relaxed text-ink-primary/65">
                      {COUNTIES[activeCounty].cities.join(" · ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-5 font-sans text-xs italic text-ink-primary/65">
              Markets are served through Florida License SL705771 and United Realty Group, with eligible MLS and distribution activity subject to applicable brokerage, platform, legal, and compliance requirements.
            </p>
          </div>
        </section>

        {/* Section 3: Structural Market Drivers & Brokerage Scale */}
        <section className="bg-navy-deep py-20 md:py-28 text-white">
          <div className="mx-auto max-w-6xl px-6">
            {/* Upper 2-Column: URG Brokerage Footprint + Weston Office */}
            <div className="grid gap-12 border-b border-white/10 pb-16 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                  Brokerage & MLS Infrastructure
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
                  Local execution across 19 Florida office locations.
                </h2>
                <p className="mt-5 font-sans text-[15px] leading-relaxed text-white/75">
                  United Realty Group provides the Florida brokerage infrastructure behind Carlos's representation: {CONTACT.stats.urgAgents} agents across the {CONTACT.stats.urgOfficeNetwork}. Combined with {ASSOCIATION_STATS.associationName} ({MEMBER_COUNT} member agents, {GLOBAL_PORTALS} global consumer portals in {ASSOCIATION_STATS.languages} languages, and {US_MLS} U.S. MLSs via RPR), every listing is positioned where cooperating buyer agents actively search.
                </p>
                <p className="mt-4 font-sans text-[15px] leading-relaxed text-white/75">
                  Because over 90% of residential sales in the MLS close through cooperating buyer agents, Carlos pairs accurate submarket pricing with MLS reverse prospecting to identify agents with matched buyer searches—backed by 25 years of South Florida contract, inspection, appraisal, and post-occupancy negotiation.
                </p>
              </div>

              <div className="lg:col-span-5">
                <figure className="overflow-hidden border border-white/15 bg-[#060D18]">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src="/images/urg-weston-office.webp"
                      alt="United Realty Group office interior in Weston, Florida"
                      width={1920}
                      height={2560}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-[center_42%]"
                    />
                  </div>
                  <figcaption className="border-t border-white/10 px-6 py-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                      United Realty Group · Weston Office
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/70">
                      {CONTACT.stats.urgAgents} Agents · 19 Florida Office Locations · {CONTACT.licenseDisplay}
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Lower Grid: 6 Structural Drivers */}
            <div className="pt-16">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-gold shrink-0" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                    South Florida Demand Fundamentals
                  </p>
                </div>
                <h3 className="mt-4 font-serif text-3xl leading-tight text-white">
                  Why capital and households keep moving to South Florida.
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-white/65 sm:text-base">
                  Understanding which structural force drives your specific neighborhood is the first step in positioning a property for maximum buyer-agent engagement.
                </p>
              </div>

              <div className="mt-10 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
                {SOUTH_FL_DRIVERS.map((d) => {
                  const Icon = d.icon;
                  return (
                    <div key={d.title} className="bg-navy-deep p-7">
                      <Icon size={20} className="text-gold" strokeWidth={1.5} />
                      <h4 className="mt-4 font-serif text-lg text-white">{d.title}</h4>
                      <p className="mt-2.5 font-sans text-[13.5px] leading-relaxed text-white/65">
                        {d.body}
                      </p>
                    </div>
                  );
                })}
              </div>

              <p className="mt-6 font-sans text-xs italic text-white/65">
                Context only. Structural market drivers are described qualitatively and do not predict price, timing, or outcome for any individual property.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: International Corridors & Bilateral Spain-Miami Desk */}
        <section className="border-b border-hairline bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              {/* Left Column: 4 Feeder Corridors */}
              <div className="lg:col-span-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                  Cross-Border Feeder Markets
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                  The domestic and international corridors that drive South Florida demand.
                </h2>
                <p className="mt-4 font-sans text-base leading-relaxed text-ink-primary/70">
                  {ASSOCIATION_STATS.associationName} maintains {INTERNATIONAL_AGREEMENTS} bilateral international partner agreements and syndicates eligible listings across {US_MLS} U.S. MLSs via RPR.
                </p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {INTL_MARKETS.map((m) => (
                    <div key={m.region} className="border-l-2 border-gold bg-ivory p-5">
                      <h3 className="font-serif text-lg text-navy-deep">{m.region}</h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-ink-primary/70">
                        {m.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Bilateral Spain-Miami Global Desk Card */}
              <div className="border border-bone bg-navy-deep p-8 text-white md:p-10 lg:col-span-5">
                <div className="flex items-center gap-2 text-gold">
                  <Globe size={15} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.26em]">
                    Bilateral Spain · Miami Desk
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-2xl leading-snug text-white">
                  Spain & International Property Positioning on the Miami MLS
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-white/75">
                  Carlos is licensed exclusively in Florida (SL705771). For eligible prime properties in Spain (Madrid, Marbella, Costa del Sol, Costa Blanca, Ibiza, Barcelona) and Latin America, he serves as the Florida-licensed principal of record on the Miami MLS while local Spanish agencies manage on-the-ground showings, qualification, and local execution.
                </p>
                <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                  {[
                    "Direct Miami MLS placement for eligible international properties",
                    "Cooperation with local Spanish agencies & developer sales teams",
                    "Bilingual English / Spanish reporting for U.S. & international buyers",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <BadgeCheck size={15} className="mt-0.5 shrink-0 text-gold" />
                      <span className="font-sans text-xs leading-relaxed text-white/75">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <a
                    href="/global-desk"
                    className="group inline-flex w-full items-center justify-center gap-2 bg-gold px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:bg-white"
                  >
                    Explore the Miami Global Listing Desk
                    <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
                <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
                  Formal Referral & Co-Listing Structure · FL License SL705771
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Client Testimonials, Regional Markets FAQ, & Consultation CTA */}
        <Testimonials />

        <section className="border-t border-bone bg-ivory py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                Markets & Coverage FAQ
              </p>
              <h2 className="mt-3 font-serif text-3xl text-navy-deep">
                Frequently asked about South Florida & international coverage
              </h2>
            </div>

            <div className="mt-10 border border-bone bg-white px-6 py-2 md:px-10">
              <FaqAccordion faqs={MARKETS_FAQS} tone="light" defaultOpen={0} />
            </div>

            {/* Executive Consultation CTA Card */}
            <div className="mt-16 border border-bone bg-white p-8 text-center md:p-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                Private Strategy Consultation
              </p>
              <h3 className="mt-3 font-serif text-2xl text-navy-deep md:text-3xl">
                Review your property's submarket data before making a move.
              </h3>
              <p className="mx-auto mt-3 max-w-2xl font-sans text-sm leading-relaxed text-ink-primary/70 sm:text-base">
                Carlos will review active competition, recent closed comparables, and absorption trends for your specific neighborhood with no obligation to list.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/home-value"
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-navy-deep px-8 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy-deep"
                >
                  Request a Property Valuation (CMA)
                  <ChevronRight size={14} />
                </a>
                <a
                  href="/contact?intent=seller"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-navy/25 px-7 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:border-navy hover:bg-navy hover:text-white"
                >
                  Schedule a Private Strategy Review
                </a>
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-primary/65">
                {CONTACT.licenseDisplay} · United Realty Group · Equal Housing Opportunity
              </p>
            </div>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
