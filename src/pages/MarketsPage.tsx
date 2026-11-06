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
import { CountUp } from "../components/CountUp";
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
    tagline: "Urban core, international gateway, waterfront condominiums, and single-family estates.",
    character:
      "Urban core and international gateway. Brickell, Coral Gables, Aventura, Doral, Miami Beach, and Coconut Grove form the primary entry point for Latin American, European, and domestic capital into South Florida—combining waterfront condominiums and established single-family estates.",
    highlights: [
      "Condominium underwriting: reserve studies, milestone inspections & floor height",
      "Single-family corridors (Coral Gables, Pinecrest, Doral): school districts & lot scale",
      "High cooperation velocity across 93,000 association member agents",
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
    tagline: "Executive gated family communities, Homestead portability, and deepwater yachting estates.",
    character:
      "Domestic relocation, executive family communities, and deepwater coastal estates. Weston, Plantation, Coral Springs, and Pembroke Pines anchor the western single-family corridor with A-rated public and private schools, while Fort Lauderdale, Pompano Beach, and Hallandale Beach lead the coastal waterfront segment.",
    highlights: [
      "Master-planned communities (Weston, Plantation) for relocating families & executives",
      "Homestead portability & post-occupancy transition levers for move-up sellers",
      "Deepwater dockage, ocean access & roof/seawall insurability in Fort Lauderdale",
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
    tagline: "Northeast wealth migration, private golf-club communities, and coastal luxury.",
    character:
      "Financial-sector migration, golf-club communities, and coastal luxury. Boca Raton, Delray Beach, and West Palm Beach draw Northeast and Midwest wealth migration alongside seasonal and full-time buyers at the $1.5M+ tier.",
    highlights: [
      "Strong Northeast & West Coast tax-migration demand across Boca Raton & Delray Beach",
      "Club equity rules, HOA capital contributions & impact-glass underwriting",
      "Integrated tri-county MLS exposure connecting Broward and Miami-Dade buyer agents",
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
    label: "01 · Tax Structure",
    title: "No state income tax",
    body: "Florida's absence of personal state income tax provides a permanent structural pull for relocating executives, business owners, and high-earning households from the Northeast, Midwest, and California.",
  },
  {
    icon: Plane,
    label: "02 · Global Gateway",
    title: "The U.S. gateway to the Americas & Europe",
    body: "Miami International Airport, Fort Lauderdale-Hollywood International, and PortMiami make South Florida the primary landing point for Latin American and European capital.",
  },
  {
    icon: Building2,
    label: "03 · Corporate Hub",
    title: "Financial & corporate expansion",
    body: "Asset managers, family offices, private-equity firms, and legal practices have established permanent South Florida offices across Brickell, Coral Gables, Fort Lauderdale, and West Palm Beach.",
  },
  {
    icon: GraduationCap,
    label: "04 · School Corridors",
    title: "Established school & family corridors",
    body: "Weston, Pinecrest, Coral Gables, Parkland, and Boca Raton anchor sustained domestic family demand independent of seasonal resort cycles.",
  },
  {
    icon: Palmtree,
    label: "05 · Coastal Liquidity",
    title: "Year-round coastal & boating liquidity",
    body: "Oceanfront condominiums, deepwater yachting estates, and club communities keep South Florida liquid across primary, secondary, and relocation buyer segments.",
  },
  {
    icon: TrendingUp,
    label: "06 · Agent Network",
    title: "Cooperating buyer-agent ecosystem",
    body: "Over 90% of residential transactions in the MLS close through cooperating buyer agents—making accurate pricing, reverse prospecting, and agent-to-agent negotiation decisive.",
  },
];

const INTL_MARKETS = [
  {
    id: "latam",
    region: "Latin America",
    tag: "Primary Cross-Border Corridor",
    hubs: "Colombia · Venezuela · Argentina · Brazil · Mexico · Chile · Peru · Panama",
    note: "Colombia, Venezuela, Argentina, Brazil, Mexico, Chile, Peru, and Panama represent the deepest historical cross-border buyer and seller corridor into Miami-Dade and Broward.",
  },
  {
    id: "spain",
    region: "Spain & Portugal",
    tag: "Bilateral Spain–Miami Desk",
    hubs: "Madrid · Marbella · Costa del Sol · Barcelona · Ibiza · Lisbon",
    note: "Madrid, Marbella, Costa del Sol, Barcelona, and Lisbon—connected through our Bilateral Spain-Miami Desk where Carlos serves as the Florida-licensed principal of record alongside local Spanish agencies.",
  },
  {
    id: "europe",
    region: "United Kingdom, Europe & Canada",
    tag: "437+ International Agreements",
    hubs: "London · Paris · Frankfurt · Zürich · Toronto · Montreal",
    note: "London, Paris, Frankfurt, Zürich, Toronto, and Montreal—supported by international bilateral REALTOR® agreements and multilingual portal syndication.",
  },
  {
    id: "domestic",
    region: "Domestic U.S. Wealth Corridors",
    tag: "260+ U.S. MLSs via RPR",
    hubs: "New York · New Jersey · Connecticut · Massachusetts · Illinois · California",
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
  const [activeDriver, setActiveDriver] = useState(0);
  const [activeCorridor, setActiveCorridor] = useState(0);

  const currentDriver = SOUTH_FL_DRIVERS[activeDriver];
  const DriverIcon = currentDriver.icon;
  const currentCorridor = INTL_MARKETS[activeCorridor];

  return (
    <>
      <Helmet>
        <title>Markets Served: South Florida &amp; Bilateral Global Desk | Carlos Uzcategui</title>
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

        {/* Section 2: Interactive Tri-County Submarket Intelligence */}
        <section id="county-intelligence" className="scroll-mt-24 bg-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                  South Florida Tri-County Coverage
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                  Three counties, one integrated MLS.{" "}
                  <span className="font-light italic text-gold-ink">
                    Distinct pricing and buyer dynamics.
                  </span>
                </h2>
              </div>
              <a
                href="/market-data"
                className="inline-flex items-center gap-2 rounded-lg border border-bone bg-ivory px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-navy-deep transition-colors hover:border-gold hover:text-gold-ink"
              >
                View Live MLS Market Statistics
                <ArrowRight size={13} />
              </a>
            </div>

            {/* Interactive County Tab Switcher */}
            <div
              role="tablist"
              aria-label="South Florida counties"
              className="grid grid-cols-1 gap-3 sm:grid-cols-3"
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
                    className={`rounded-xl border px-6 py-4 text-left transition-all ${
                      isSelected
                        ? "border-gold bg-navy-deep text-white shadow-lg"
                        : "border-bone bg-ivory/60 text-navy-deep hover:border-gold/60 hover:bg-white"
                    }`}
                  >
                    <span className="block font-serif text-lg">
                      {county.name}
                    </span>
                    <span
                      className={`mt-1 block font-mono text-[10px] uppercase tracking-[0.16em] ${
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
            <div className="mt-4 rounded-xl border border-bone bg-white p-6 shadow-sm md:p-8">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gold shrink-0" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-ink">
                      {COUNTIES[activeCounty].stat} · MLS Regional Profile
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-2xl text-navy-deep md:text-3xl">
                    {COUNTIES[activeCounty].name}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink-primary/80">
                    {COUNTIES[activeCounty].tagline}
                  </p>
                  <p className="sr-only">{COUNTIES[activeCounty].character}</p>

                  <div className="mt-5 grid gap-2.5">
                    {COUNTIES[activeCounty].highlights.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 rounded-lg border border-bone bg-ivory/60 p-3">
                        <BadgeCheck size={15} className="mt-0.5 shrink-0 text-gold" />
                        <p className="font-sans text-xs leading-snug text-ink-primary/85 sm:text-sm">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Linked Submarket Guides + Collapsible Municipalities */}
                <div className="rounded-xl border border-bone bg-ivory p-6 lg:col-span-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-ink font-semibold">
                    Dedicated Submarket Seller Guides
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {COUNTIES[activeCounty].featuredLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-bone bg-white px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-navy-deep transition-colors hover:border-gold hover:text-gold-ink"
                      >
                        {link.label}
                        <ArrowRight size={11} className="text-gold" />
                      </a>
                    ))}
                  </div>

                  <details className="mt-5 border-t border-bone pt-4">
                    <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.16em] text-navy/75 hover:text-gold-ink">
                      All {COUNTIES[activeCounty].name} Municipalities Served ({COUNTIES[activeCounty].cities.length}) ↓
                    </summary>
                    <p className="mt-2 font-sans text-xs leading-relaxed text-ink-primary/65">
                      {COUNTIES[activeCounty].cities.join(" · ")}
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Demand Drivers & Brokerage Scale */}
        <section className="bg-navy-deep py-16 md:py-24 text-white">
          <div className="mx-auto max-w-6xl px-6">
            {/* Upper 2-Column: URG Brokerage Stat Grid + Weston Office */}
            <div className="grid gap-10 border-b border-white/10 pb-14 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                  Brokerage &amp; MLS Infrastructure
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight text-white md:text-4xl">
                  Local execution across 19 Florida office locations.
                </h2>
                <p className="mt-3 font-sans text-sm leading-relaxed text-white/80">
                  Over 90% of residential sales in the MLS close through cooperating buyer agents. Carlos pairs submarket pricing with MLS reverse prospecting through United Realty Group.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { value: CONTACT.stats.urgAgents, label: "URG FL Agents" },
                    { value: "19", label: "FL Office Locations" },
                    { value: MEMBER_COUNT, label: "Association Members" },
                    { value: US_MLS, label: "U.S. MLSs via RPR" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg border border-white/12 bg-white/[0.04] p-3.5">
                      <p className="font-serif text-2xl text-gold">
                        <CountUp value={s.value} />
                      </p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/80">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <figure className="overflow-hidden rounded-xl border border-white/15 bg-[#060D18]">
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
                  <figcaption className="border-t border-white/10 px-5 py-3.5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                      United Realty Group · Weston Office
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-white/70">
                      {CONTACT.stats.urgAgents} Agents · 19 Florida Office Locations · {CONTACT.licenseDisplay}
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Lower Interactive 6-Driver Explorer (Replaces 6-Card Wall) */}
            <div className="pt-14">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-gold shrink-0" />
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                      South Florida Demand Fundamentals
                    </p>
                  </div>
                  <h3 className="mt-2 font-serif text-2xl leading-tight text-white md:text-3xl">
                    Why capital and households keep moving to South Florida.
                  </h3>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
                  Tap any driver to inspect
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6" role="tablist" aria-label="Demand fundamentals">
                {SOUTH_FL_DRIVERS.map((d, idx) => {
                  const Icon = d.icon;
                  const selected = activeDriver === idx;
                  return (
                    <button
                      key={d.title}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveDriver(idx)}
                      className={`flex flex-col justify-between rounded-xl border p-3.5 text-left transition-all ${
                        selected
                          ? "border-gold bg-gold text-navy-deep shadow-lg"
                          : "border-white/12 bg-white/[0.03] text-white hover:border-gold/50"
                      }`}
                    >
                      <Icon size={16} className={selected ? "text-navy-deep" : "text-gold"} />
                      <span className={`mt-2.5 block font-mono text-[9px] uppercase tracking-[0.14em] ${selected ? "text-navy-deep font-bold" : "text-white/80"}`}>
                        {d.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded-xl border border-gold/30 bg-white/[0.04] p-6">
                <div className="flex items-center gap-3">
                  <DriverIcon size={20} className="text-gold shrink-0" />
                  <h4 className="font-serif text-xl text-white">{currentDriver.title}</h4>
                </div>
                <p className="mt-2 font-sans text-sm leading-relaxed text-white/85">
                  {currentDriver.body}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Interactive Cross-Border Corridors & Bilateral Spain-Miami Desk */}
        <section className="border-b border-hairline bg-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
              {/* Left Column: Interactive 4-Corridor Selector (7 cols) */}
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                    Cross-Border Feeder Markets
                  </p>
                  <h2 className="mt-3 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                    Domestic &amp; international corridors driving South Florida demand.
                  </h2>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink-primary/70">
                    {ASSOCIATION_STATS.associationName} maintains {INTERNATIONAL_AGREEMENTS} bilateral international partner agreements and syndicates eligible listings across {US_MLS} U.S. MLSs via RPR.
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-2.5" role="tablist" aria-label="Feeder corridors">
                    {INTL_MARKETS.map((m, idx) => {
                      const selected = activeCorridor === idx;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          role="tab"
                          aria-selected={selected}
                          onClick={() => setActiveCorridor(idx)}
                          className={`rounded-xl border p-4 text-left transition-all ${
                            selected
                              ? "border-gold bg-navy-deep text-white shadow-md"
                              : "border-bone bg-ivory/60 text-navy-deep hover:border-gold/60"
                          }`}
                        >
                          <span className={`block font-mono text-[9px] uppercase tracking-[0.14em] ${selected ? "text-gold" : "text-gold-ink"}`}>
                            {m.tag}
                          </span>
                          <span className="mt-1 block font-serif text-base">{m.region}</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 rounded-xl border border-bone bg-ivory p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink font-semibold">
                      Key Origin Cities: {currentCorridor.hubs}
                    </p>
                    <h3 className="mt-2 font-serif text-xl text-navy-deep">{currentCorridor.region}</h3>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-ink-primary/80">
                      {currentCorridor.note}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Bilateral Spain-Miami Global Desk Card (5 cols) */}
              <div className="flex flex-col justify-between rounded-xl border border-bone bg-navy-deep p-7 text-white md:p-8 lg:col-span-5">
                <div>
                  <div className="flex items-center gap-2 text-gold">
                    <Globe size={15} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.26em]">
                      Bilateral Spain · Miami Desk
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl leading-snug text-white">
                    Spain &amp; International Property Positioning on the Miami MLS
                  </h3>
                  <p className="mt-3 font-sans text-xs leading-relaxed text-white/80 sm:text-sm">
                    Carlos is licensed exclusively in Florida (SL705771). For eligible prime properties in Spain and Latin America, he serves as the Florida-licensed principal of record on the Miami MLS while local agencies manage on-the-ground showings and closing.
                  </p>
                  <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-4">
                    {[
                      "Direct Miami MLS placement for eligible international properties",
                      "Cooperation with local Spanish agencies & developer sales teams",
                      "Bilingual English / Spanish reporting for U.S. & international buyers",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <BadgeCheck size={15} className="mt-0.5 shrink-0 text-gold" />
                        <span className="font-sans text-xs leading-relaxed text-white/85">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <a
                    href="/global-desk"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded bg-gold px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:bg-white"
                  >
                    Explore the Miami Global Listing Desk
                    <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Client Testimonials, Regional Markets FAQ, & Consultation CTA */}
        <Testimonials />

        <section className="border-t border-bone bg-ivory py-16 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                Markets &amp; Coverage FAQ
              </p>
              <h2 className="mt-3 font-serif text-3xl text-navy-deep">
                Frequently asked about South Florida &amp; international coverage
              </h2>
            </div>

            <div className="mt-8 rounded-xl border border-bone bg-white px-6 py-2 md:px-10">
              <FaqAccordion faqs={MARKETS_FAQS} tone="light" defaultOpen={0} />
            </div>

            {/* Executive Consultation CTA Card */}
            <div className="mt-12 rounded-xl border border-bone bg-white p-8 text-center shadow-sm md:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                Private Strategy Consultation
              </p>
              <h3 className="mt-2 font-serif text-2xl text-navy-deep md:text-3xl">
                Review your property's submarket data before making a move.
              </h3>
              <p className="mx-auto mt-2 max-w-xl font-sans text-sm leading-relaxed text-ink-primary/70">
                Carlos reviews active competition, closed comparables, and absorption trends for your neighborhood with no obligation.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="/home-value"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-navy-deep px-8 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy-deep"
                >
                  Request a Property Valuation (CMA)
                  <ChevronRight size={14} />
                </a>
                <a
                  href="/contact?intent=seller"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded border border-navy/25 px-7 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:border-navy hover:bg-navy hover:text-white"
                >
                  Schedule a Private Strategy Review
                </a>
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-primary/65">
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
