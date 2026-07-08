import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { ChevronRight, MessageSquare, MapPin, Globe, Building2, Palmtree, Landmark, Plane, GraduationCap, TrendingUp } from "lucide-react";
import { AuroraBackground } from "../components/AuroraBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LazyVideo } from "../components/LazyVideo";
import { MiamiRealtorsBadge } from "../components/MiamiRealtorsBadge";
import { Testimonials } from "../components/Testimonials";
import { CONTACT, URG_CITIES } from "../constants";

// Group URG cities by county
const MIAMI_DADE = URG_CITIES.filter((c) => c.region === "Miami-Dade County").map((c) => c.city);
const BROWARD    = URG_CITIES.filter((c) => c.region === "Broward County").map((c) => c.city);
const PALM_BEACH = URG_CITIES.filter((c) => c.region === "Palm Beach County").map((c) => c.city);

const COUNTIES = [
  {
    name: "Miami-Dade County",
    stat: `${MIAMI_DADE.length} cities covered`,
    character: "Urban core and international gateway. Brickell, Coral Gables, Aventura, Doral, Miami Beach, Coconut Grove — the primary entry point for Latin American, European, and Gulf capital into South Florida. Condo and luxury single-family market with deep foreign-national buyer demand.",
    cities: MIAMI_DADE,
  },
  {
    name: "Broward County",
    stat: `${BROWARD.length} cities covered`,
    character: "Domestic relocation and family move-up market. Weston, Plantation, Coral Springs, Pembroke Pines — A-rated school districts, established single-family inventory, and the western corridor connecting to Palm Beach. Fort Lauderdale's waterfront drives a separate luxury condo segment.",
    cities: BROWARD,
  },
  {
    name: "Palm Beach County",
    stat: `${PALM_BEACH.length} cities covered`,
    character: "Financial-sector migration and seasonal luxury. Boca Raton and Delray Beach attract professional relocators from the Northeast; West Palm Beach anchors a growing institutional market. Demand is driven by both domestic migration and international buyers at the $2M+ tier.",
    cities: PALM_BEACH,
  },
];

// Qualitative structural drivers — no performance figures, compliance-safe
const SOUTH_FL_DRIVERS = [
  {
    icon: Landmark,
    title: "No state income tax",
    body: "Florida is one of a small number of U.S. states with no personal state income tax — a structural pull for domestic relocators, business owners, and high-earning households moving from the Northeast and California.",
  },
  {
    icon: Plane,
    title: "The U.S. gateway to the Americas",
    body: "Miami International Airport and PortMiami make South Florida the primary landing point for Latin American and European capital. The region trades as an international city, not a regional one.",
  },
  {
    icon: Landmark,
    title: "Brickell — a financial migration",
    body: "Asset managers, private-equity offices, and fintech firms have expanded South Florida footprints over the past several years, reinforcing demand for urban-core condos and waterfront single-family inventory.",
  },
  {
    icon: Building2,
    title: "A deep new-construction pipeline",
    body: "Branded residences and pre-construction towers across Miami-Dade and the Broward waterfront continue to draw international pre-sale buyers — a segment where MLS positioning and agent-network reach matter most.",
  },
  {
    icon: GraduationCap,
    title: "A-rated school corridors",
    body: "Weston, Parkland, Pinecrest, and Coral Gables anchor the family move-up market. School-district quality drives sustained domestic demand independent of the luxury and investor segments.",
  },
  {
    icon: Palmtree,
    title: "A year-round destination market",
    body: "Beaches, marinas, and a no-winter climate keep South Florida liquid as a second-home and lifestyle market through every season — buyer demand is not confined to a single window.",
  },
];

const MADRID_NEIGHBORHOODS = [
  "Salamanca", "Recoletos", "Justicia", "Retiro", "Chamberí", "Chamartín",
  "La Moraleja", "Las Tablas", "El Viso", "Almagro", "Castellana", "Chueca",
  "La Latina", "Jerónimos", "Pozuelo de Alarcón",
];

const INTL_MARKETS = [
  {
    region: "Latin America",
    note: "Colombia, Venezuela, Argentina, Brazil, Mexico, Panama — the largest source of active buyer and seller pipelines into South Florida. Introductions flow through professional brokerage coordination, not marketing promises.",
  },
  {
    region: "Spain & Portugal",
    note: "Madrid, Barcelona, Marbella, Lisbon — direct referral relationships with established local agencies and family offices. The formal referral mechanism is documented and compliant with both Florida and Spanish professional standards.",
  },
  {
    region: "United Kingdom & Europe",
    note: "London, Monaco, Zürich — UHNW and family office introductions through MIAMI Global Council associations and cooperating international broker relationships.",
  },
  {
    region: "Middle East & Gulf",
    note: "Dubai, Abu Dhabi, Riyadh — reached through the Miami and South Florida REALTORS® 437+ signed international agreements with Gulf-region real estate organizations.",
  },
];

const PILLARS = [
  {
    title: "Pricing discipline",
    body: "Comparable analysis and absorption data set the number. Overpriced inventory accumulates days on market and ultimately closes below a correctly set initial ask.",
  },
  {
    title: "Structural MLS distribution",
    body: "Listing through a Miami and South Florida REALTORS® member places the property inside the world's largest local REALTOR® association — 93,000 member agents, eligible listings on 200+ global portals in 19 languages.",
  },
  {
    title: "International demand access",
    body: "The Miami MLS is backed by 437+ international agreements across 75+ countries — reaching the agents who represent Latin American, European, and Gulf buyers actively searching for South Florida property.",
  },
];

export default function MarketsPage() {
  const [activeCounty, setActiveCounty] = useState(0);
  return (
    <>
      <Helmet>
        <title>Markets Served: South Florida · Madrid · International | HomesProfessional.com</title>
        <meta
          name="description"
          content={`South Florida full MLS coverage across Miami-Dade, Broward, and Palm Beach — ${URG_CITIES.length} cities through United Realty Group's ${CONTACT.stats.urgOffices} offices. Madrid and Spain through professional referral relationships. Carlos Uzcategui, FL SL705771.`}
        />
        <link rel="canonical" href="https://homesprofessional.com/markets" />
        <meta property="og:title" content="Markets Served: South Florida · Madrid · International | HomesProfessional.com" />
        <meta property="og:description" content="Full MLS coverage across Miami-Dade, Broward, and Palm Beach through United Realty Group's 20 offices. Madrid and Spain through professional referral. Carlos Uzcategui, FL SL705771." />
        <meta property="og:url" content="https://homesprofessional.com/markets" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Markets Served: South Florida · Madrid · International | HomesProfessional.com" />
        <meta name="twitter:description" content="Full MLS coverage across Miami-Dade, Broward, and Palm Beach. 25 cities. Madrid and Spain through professional referral." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>
      <JsonLd id="markets-breadcrumb" data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Markets", "item": "https://homesprofessional.com/markets" }
          ]
        }} />
      <JsonLd id="markets-faq" data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What counties does Carlos Uzcategui serve in South Florida?",
              "acceptedAnswer": { "@type": "Answer", "text": "Carlos serves Miami-Dade, Broward, and Palm Beach counties directly through United Realty Group's 21 South Florida offices and full Miami and South Florida REALTORS® MLS access." }
            },
            {
              "@type": "Question",
              "name": "Does Carlos sell real estate in Spain?",
              "acceptedAnswer": { "@type": "Answer", "text": "Carlos is licensed exclusively in Florida (SL705771). Spain and Madrid properties are handled through formal professional referral relationships with established local agencies — not direct sales by Carlos in Spain." }
            },
            {
              "@type": "Question",
              "name": "Which cities in South Florida does United Realty Group cover?",
              "acceptedAnswer": { "@type": "Answer", "text": `United Realty Group covers ${URG_CITIES.length} cities across three counties: Miami-Dade (including Miami, Coral Gables, Brickell, Aventura, Miami Beach, Doral, and Hialeah), Broward (including Weston, Plantation, Fort Lauderdale, Coral Springs, and Pembroke Pines), and Palm Beach (including Boca Raton, Delray Beach, and West Palm Beach).` }
            },
            {
              "@type": "Question",
              "name": "What is United Realty Group's South Florida footprint?",
              "acceptedAnswer": { "@type": "Answer", "text": "United Realty Group operates 20 offices across South Florida with 3,500+ licensed agents statewide. It is one of Florida's largest independently owned brokerages, established in 2002." }
            },
            {
              "@type": "Question",
              "name": "How does the Miami MLS reach international buyers?",
              "acceptedAnswer": { "@type": "Answer", "text": "The Miami and South Florida REALTORS® MLS — the world's largest local REALTOR® association with 93,000 member agents — holds 437+ signed international agreements across 75+ countries. Eligible listed properties can be distributed to 200+ global portals in 19 languages." }
            },
          ]
        }} />

      <main id="main-content" className="min-h-screen bg-white-soft pb-20 lg:pb-0">
        <Navbar />

        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-navy-deep py-20 md:py-28 text-center">
          <LazyVideo
            eager
            src="/videos/south_florida_showcase.mp4"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.16] pointer-events-none"
          />
          <AuroraBackground variant="warm" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_20%,rgba(11,30,63,0.88),rgba(6,17,31,0.97))]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_80%,rgba(176,141,87,0.07),transparent_50%)]" />
          <div className="relative mx-auto max-w-4xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">South Florida · Madrid & Spain · International Referral</p>
            <h1 className="mx-auto mt-6 max-w-3xl font-serif leading-[1.1] text-white" style={{ fontSize: "clamp(2.1rem, 5vw, 3.6rem)" }}>
              South Florida's full MLS footprint.<br />
              <em className="italic text-gold">Madrid, through professional partnership.</em>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl font-sans text-base leading-[1.85] text-white/60">
              Direct coverage across Miami-Dade, Broward, and Palm Beach through United Realty Group's {CONTACT.stats.urgOffices} South Florida offices
              and {CONTACT.stats.agents}-member MLS. Spain and international markets served through formal referral and cooperating broker relationships.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="/contact" className="group inline-flex items-center gap-2 bg-gold px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90">
                Request a Private Listing Review
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/25 px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-gold hover:text-gold">
                <MessageSquare size={15} /> WhatsApp Carlos
              </a>
            </div>
            <div className="mt-12"><MiamiRealtorsBadge variant="dark" /></div>
          </div>
        </section>

        {/* ── Network reach visual stat panel ───────────────────── */}
        <div className="bg-navy-deep border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-10">
            {/* SVG network connector row */}
            <div className="hidden lg:block mb-8 px-4">
              <svg viewBox="0 0 900 48" className="w-full" aria-hidden="true">
                {/* Connecting line */}
                <line x1="112" y1="24" x2="788" y2="24" stroke="#B08D57" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.35" />
                {/* Dots at stat centers */}
                {[112, 337, 562, 788].map((cx) => (
                  <g key={cx}>
                    <circle cx={cx} cy="24" r="3" fill="#B08D57" opacity="0.6" />
                    <circle cx={cx} cy="24" r="7" fill="none" stroke="#B08D57" strokeWidth="0.5" opacity="0.25" />
                  </g>
                ))}
              </svg>
            </div>
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 lg:grid-cols-4">
              {[
                { value: CONTACT.stats.urgOffices, label: "URG offices", sub: "across South Florida" },
                { value: CONTACT.stats.urgAgents,  label: "URG agents", sub: "statewide · bilingual" },
                { value: String(URG_CITIES.length), label: "cities served", sub: "across 3 counties" },
                { value: "93,000", label: "MIAMI REALTORS®", sub: "world's largest local association" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center bg-navy-deep px-6 py-8 text-center">
                  <span className="font-serif text-4xl text-gold md:text-5xl">{s.value}</span>
                  <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">{s.label}</span>
                  <span className="mt-1 font-sans text-[10px] text-white/70">{s.sub}</span>
                </div>
              ))}
            </div>
            {/* Second row — MLS reach */}
            <div className="mt-px grid grid-cols-3 gap-px border border-t-0 border-white/10 bg-white/10">
              {[
                { value: "437+", label: "International agreements", sub: "across 75+ countries" },
                { value: "200+", label: "Global portals", sub: "eligible listing syndication" },
                { value: "19", label: "Languages", sub: "property presentation" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center bg-navy-deep/60 px-6 py-5 text-center">
                  <span className="font-serif text-2xl text-gold/80">{s.value}</span>
                  <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">{s.label}</span>
                  <span className="mt-0.5 font-sans text-[10px] text-white/70">{s.sub}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
              Miami and South Florida REALTORS® · United Realty Group · Carlos Uzcategui FL SL705771
            </p>
          </div>
        </div>

        {/* ── South Florida: County-by-county ────────────────────── */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">South Florida Coverage</p>
              <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                Three counties, one integrated MLS.<br />
                <span className="text-gold">Direct access across every market.</span>
              </h2>
              <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-ink-primary/60">
                United Realty Group operates {CONTACT.stats.urgOffices} offices across South Florida. Every listing represented by
                Carlos enters the Miami and South Florida REALTORS® MLS — {CONTACT.stats.agents} member agents with reach into
                200+ global portals in 19 languages.
              </p>
            </div>

            {/* Interactive county tab switcher */}
            <div className="flex divide-x divide-hairline border border-hairline overflow-hidden">
              {COUNTIES.map((county, i) => (
                <button
                  key={county.name}
                  onClick={() => setActiveCounty(i)}
                  className={`flex-1 px-4 py-5 text-left transition-all duration-200 ${
                    activeCounty === i
                      ? "bg-navy-deep text-white"
                      : "bg-white text-navy/50 hover:bg-ivory hover:text-navy"
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold block">
                    {county.name.replace(" County", "")}
                  </span>
                  <span className={`font-mono text-[10px] uppercase tracking-[0.14em] mt-1.5 block ${
                    activeCounty === i ? "text-gold" : "text-navy/35"
                  }`}>
                    {county.stat}
                  </span>
                </button>
              ))}
            </div>

            {/* County detail panel */}
            <div className="border border-t-0 border-hairline bg-white p-8 md:p-12">
              <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-start">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin size={13} className="text-gold flex-shrink-0" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                      {COUNTIES[activeCounty].stat}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-navy-deep">{COUNTIES[activeCounty].name}</h3>
                  <p className="mt-5 font-sans text-[15px] leading-relaxed text-ink-primary/70">
                    {COUNTIES[activeCounty].character}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70 mb-4">Cities covered</p>
                  <div className="flex flex-wrap gap-2">
                    {COUNTIES[activeCounty].cities.map((city) => (
                      <span
                        key={city}
                        className="inline-block border border-navy/10 bg-ivory px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-navy/70 hover:border-gold/40 hover:text-navy transition-colors cursor-default"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-6 font-sans text-xs text-ink-primary/70 italic">
              All markets served directly through Florida License SL705771, United Realty Group, and full Miami and South Florida REALTORS® MLS access.
            </p>
          </div>
        </section>


        {/* ── Inside United Realty Group — team video ────────────── */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              {/* Left — context */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Inside the Network</p>
                <h2 className="mt-5 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                  The agents who move South Florida.
                </h2>
                <p className="mt-5 font-sans text-[15px] leading-relaxed text-ink-primary/65">
                  United Realty Group is one of Florida's largest independently owned brokerages —
                  {" "}{CONTACT.stats.urgAgents} agents across {CONTACT.stats.urgOffices} South Florida offices.
                  That is the network a listing enters when it is represented: working buyer agents
                  with active clients, not a directory of names.
                </p>
                <ul className="mt-7 space-y-3">
                  {[
                    `${CONTACT.stats.urgAgents} licensed agents across Miami-Dade, Broward, Palm Beach & Orange`,
                    "Full Miami and South Florida REALTORS® MLS access",
                    "Bilingual English / Spanish representation",
                    "Independent brokerage — established 2002",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                      <span className="font-sans text-[14px] leading-snug text-ink-primary/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Right — video */}
              <div className="overflow-hidden border border-hairline bg-navy-deep shadow-xl shadow-navy/10">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src="https://www.youtube.com/embed/M8Hx5D5ghag?si=Mno7hIj23lN-mTbU&rel=0&modestbranding=1"
                    title="United Realty Group — the South Florida agent network"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
                <div className="bg-navy-deep px-5 py-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">United Realty Group · The Team</p>
                  <p className="font-mono mt-0.5 text-[10px] uppercase tracking-[0.15em] text-white/70">
                    {CONTACT.stats.urgAgents} agents · {CONTACT.stats.urgOffices} offices · South Florida
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── South Florida Market Intelligence ──────────────────── */}
        <section className="relative overflow-hidden bg-navy-deep py-20 md:py-28 text-white">
          <LazyVideo
            src="/videos/luxury_waterfront_drone.mp4"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.22] pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/95 via-navy-deep/80 to-navy-deep pointer-events-none" />
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-2">
              <TrendingUp size={13} className="text-gold flex-shrink-0" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">South Florida Market Intelligence</p>
            </div>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-white md:text-4xl">
              Why capital keeps moving to South Florida.
            </h2>
            <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              South Florida does not trade on weather alone. A small number of structural forces keep
              demand deep across price bands — from first move-up buyers to international ultra-prime.
              Understanding which force drives a given submarket is the first step in positioning a listing correctly.
            </p>

            {/* Featured top driver (wide) + remaining grid */}
            <div className="mt-12">
              {(() => {
                const FeaturedIcon = SOUTH_FL_DRIVERS[0].icon;
                return (
                  <div className="border border-white/10 bg-white/[0.04] p-8 md:p-10 mb-px">
                    <div className="grid md:grid-cols-[auto_1fr] md:gap-10 md:items-start">
                      <FeaturedIcon size={28} className="text-gold mb-4 md:mb-0 md:mt-1" strokeWidth={1.25} />
                      <div>
                        <h3 className="font-serif text-2xl text-white">{SOUTH_FL_DRIVERS[0].title}</h3>
                        <p className="mt-3 font-sans text-[15px] leading-relaxed text-white/65">{SOUTH_FL_DRIVERS[0].body}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
              <div className="grid gap-px border border-white/10 border-t-0 bg-white/10 md:grid-cols-2 lg:grid-cols-5">
                {SOUTH_FL_DRIVERS.slice(1).map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <div key={d.title} className={`bg-navy-deep p-8 ${i === 0 ? "lg:col-span-2" : i === 1 ? "lg:col-span-3" : ""}`}>
                      <Icon size={20} className="text-gold" strokeWidth={1.5} />
                      <h3 className="mt-5 font-serif text-lg text-white">{d.title}</h3>
                      <p className="mt-3 font-sans text-[14px] leading-relaxed text-white/60">{d.body}</p>
                    </div>
                  );
                })}
                {/* Video tile fills the trailing grid cells (5 drivers left an empty
                    gap before) and shows the listing-marketing standard. */}
                <div className="relative overflow-hidden bg-navy-deep lg:col-span-2">
                  <LazyVideo
                    src="/videos/luxury_home_walkthrough.mp4"
                    className="absolute inset-0 h-full w-full object-cover opacity-[0.5]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-navy-deep/10 pointer-events-none" />
                  <div className="relative flex h-full flex-col justify-end p-8">
                    <TrendingUp size={20} className="text-gold" strokeWidth={1.5} />
                    <h3 className="mt-5 font-serif text-lg text-white">Marketed to match the demand</h3>
                    <p className="mt-3 font-sans text-[14px] leading-relaxed text-white/70">
                      Cinematic media and virtual tours position each listing for the buyer
                      pool these forces create — local, domestic, and international.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-8 font-sans text-xs italic text-white/70 max-w-3xl">
              Context only. Structural market drivers are described qualitatively and do not predict price, timing, or
              outcome for any individual property. Neighborhood-specific data is reviewed live as part of every seller strategy session,
              sourced from the Miami and South Florida REALTORS® MLS.
            </p>
          </div>
        </section>

        {/* ── International Referral Markets ────────────────────── */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">International Referral Markets</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              The markets that drive South Florida demand —<br />
              <span className="text-gold">reached through professional cooperation.</span>
            </h2>
            <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-ink-primary/60">
              The Miami and South Florida REALTORS® network holds 437+ signed international agreements across 75+ countries.
              Buyer-side referral introductions flow through professional brokerage coordination.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {INTL_MARKETS.map((m) => (
                <div key={m.region} className="border-l-2 border-gold/50 bg-ivory pl-6 pr-6 py-6">
                  <h3 className="font-serif text-xl text-navy-deep">{m.region}</h3>
                  <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-primary/65">{m.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Madrid & Spain — cinematic split ──────────────────── */}
        <section className="overflow-hidden bg-navy-deep text-white">
          <div className="grid lg:grid-cols-[0.45fr_0.55fr]">

            {/* Left: cinematic video panel */}
            <div className="relative min-h-[320px] lg:min-h-0">
              <LazyVideo
                src="/videos/miami_madrid_transition.mp4"
                className="absolute inset-0 h-full w-full object-cover opacity-[0.55]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/20 via-transparent to-navy-deep pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep/80 lg:hidden pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-end p-8 lg:justify-center lg:p-12 pointer-events-none">
                <div className="flex items-center gap-2 mb-3">
                  <Globe size={13} className="text-gold" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Madrid &amp; Spain</p>
                </div>
                <p className="font-serif text-2xl text-white leading-tight max-w-xs">
                  Spain, through formal professional partnership.
                </p>
              </div>
            </div>

            {/* Right: content */}
            <div className="py-16 px-8 lg:px-14 lg:py-24">
              <p className="font-sans text-[15px] leading-relaxed text-white/60">
                Carlos is licensed exclusively in Florida (SL705771). Spain and Madrid properties are not sold directly —
                they are served through formal referral relationships with established local agencies and, where appropriate,
                through South Florida buyer-agent activation via Carlos Uzcategui, Florida Realtor®, and United Realty Group.
              </p>
              <p className="mt-4 font-sans text-[15px] leading-relaxed text-white/60">
                Spanish property owners, developers, and agencies seeking Miami-facing distribution access a compliant,
                documented professional channel — not a marketing promise or unlicensed representation.
              </p>

              <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold mb-4">What the Global Desk provides</p>
                <ul className="space-y-3">
                  {[
                    "Professional presentation for selected international inventory",
                    "Buyer-agent activation in the South Florida professional ecosystem",
                    "Eligible platform and portal activity subject to applicable requirements",
                    "Formal referral introductions from Spanish agencies",
                    "Bilingual English/Spanish representation and reporting",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                      <span className="font-sans text-[14px] leading-snug text-white/65">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70 mb-4">
                  Madrid districts &amp; submarkets referenced
                </p>
                <div className="flex flex-wrap gap-2">
                  {MADRID_NEIGHBORHOODS.map((n) => (
                    <span
                      key={n}
                      className="inline-block border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70"
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex gap-4 flex-wrap">
                <a
                  href="/global-desk"
                  className="group inline-flex items-center gap-2 bg-gold px-7 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
                >
                  Global Desk — how it works
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                Spain introductions · Referral &amp; cooperating agency · Not direct sales in Spain
              </p>
            </div>

          </div>
        </section>

        {/* ── How the strategy works ────────────────────────────── */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">The listing strategy</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Price, distribute, reach the right buyer.
            </h2>
            <div className="mt-12 divide-y divide-hairline border border-hairline">
              {PILLARS.map((p, i) => (
                <div key={p.title} className="flex items-start gap-8 p-8 md:p-10">
                  <div className="font-serif text-5xl text-gold/30 leading-none mt-1 w-14 flex-shrink-0 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-navy-deep">{p.title}</h3>
                    <p className="mt-3 font-sans text-[15px] leading-relaxed text-ink-primary/65">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-primary/70">
              Live MLS market data available on request as part of every seller strategy review.
            </p>
          </div>
        </section>

        {/* ── Sell by Neighborhood ────────────────────────────────── */}
        <section className="bg-ivory border-t border-hairline py-10">
          <div className="mx-auto max-w-6xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold mb-5">Sell by Neighborhood</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Weston",           href: "/sell-weston" },
                { label: "Coral Gables",     href: "/sell-coral-gables" },
                { label: "Aventura",         href: "/sell-aventura" },
                { label: "Brickell",         href: "/sell-brickell" },
                { label: "Doral",            href: "/sell-doral" },
                { label: "Fort Lauderdale",  href: "/sell-fort-lauderdale" },
                { label: "Coral Springs",    href: "/sell-coral-springs" },
                { label: "Pembroke Pines",   href: "/sell-pembroke-pines" },
                { label: "Plantation",       href: "/sell-plantation" },
                { label: "Sunrise",          href: "/sell-sunrise" },
              ].map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="border border-hairline px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-primary/60 hover:border-gold/50 hover:text-gold transition-colors"
                >
                  {n.label} →
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Cross-border CTA ──────────────────────────────────── */}
        <section className="bg-ivory py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Start Here</p>
            <h2 className="mt-5 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              South Florida seller or international property inquiry.
            </h2>
            <p className="mt-6 font-sans text-[17px] leading-[1.7] text-ink-primary/70">
              Whether the property is in Weston, Brickell, or Madrid — every inquiry gets a direct response from Carlos, a
              clear scope of what representation looks like, and a market positioning review before any commitment.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 bg-navy-deep px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy-deep"
              >
                Request a Market Review
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="/global-desk"
                className="group inline-flex items-center gap-2 border border-navy/25 px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:border-navy hover:bg-navy hover:text-white"
              >
                Global Desk — Spain &amp; International
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-primary/70">
              Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity
            </p>
          </div>
        </section>

        <Testimonials />
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
