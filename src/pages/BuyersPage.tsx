import { useState } from "react";
import { trackMicroConversion } from "../lib/analytics";
import "../components/advisory-heroes.css";
import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { AuroraBackground } from "../components/AuroraBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { BuyerMandateForm } from "../components/forms/BuyerMandateForm";
import { FaqAccordion } from "../components/FaqAccordion";
import { ListingsBrowser } from "../components/listings/ListingsBrowser";
import { GilmarGlobalDeskSection } from "../components/GilmarGlobalDeskSection";
import { RealtorAssociationVideoHub } from "../components/RealtorAssociationVideoHub";
import { UrgCorporateShowcase } from "../components/UrgCorporateShowcase";
import { Tilt3D } from "../components/Tilt3D";
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  Check,
  Globe2,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  Plane,
  Search,
  Sun,
  Trophy,
  Waves,
} from "lucide-react";
import { CONTACT } from "../constants";
import { FloridaBuyerJourney } from "../components/FloridaBuyerJourney";

// Condensed from "Top 20 Reasons to Buy & Live in Miami" — Miami and South
// Florida REALTORS® (MiamiRealtors.com). Keep claims attributed; no guarantees.
const WHY_FLORIDA = [
  {
    category: "wealth",
    icon: Banknote,
    title: "No state income tax",
    desc: "Florida has no personal state income tax — a structural advantage for relocating professionals, retirees, and business owners.",
  },
  {
    category: "wealth",
    icon: Landmark,
    title: "Finance and business connectivity",
    desc: "Brickell and the wider South Florida business corridor support professionals, entrepreneurs, investors, and relocating companies.",
  },
  {
    category: "wealth",
    icon: Globe2,
    title: "An established international buyer ecosystem",
    desc: "Bilingual professional services, global transportation links, and long-established international communities support cross-border purchasers.",
  },
  {
    category: "connectivity",
    icon: Plane,
    title: "Regional and international connectivity",
    desc: "International air service, major highways, seaports, and intercity rail connect South Florida with domestic and overseas markets.",
  },
  {
    category: "connectivity",
    icon: Waves,
    title: "Waterfront and coastal property choices",
    desc: "Oceanfront, bayfront, riverfront, and boating communities create distinct property types with different insurance, maintenance, and ownership considerations.",
  },
  {
    category: "connectivity",
    icon: Sun,
    title: "A subtropical, year-round market",
    desc: "South Florida's climate supports permanent residents, seasonal owners, and international buyers across the calendar.",
  },
  {
    category: "lifestyle",
    icon: GraduationCap,
    title: "Schools and university access",
    desc: "Public, private, and higher-education options shape neighborhood selection for families and long-term relocations.",
  },
  {
    category: "lifestyle",
    icon: HeartPulse,
    title: "Healthcare and quality-of-life infrastructure",
    desc: "Major hospital systems, outdoor living, and year-round recreation are practical considerations for relocations and second-home purchases.",
  },
  {
    category: "lifestyle",
    icon: Trophy,
    title: "Culture, dining, and professional sports",
    desc: "Arts, culinary districts, major events, and professional sports give buyers a wide range of urban and lifestyle environments.",
  },
] as const;

const UNDERWRITING_PILLARS = [
  {
    id: "underwrite",
    label: "01 · Property Underwriting",
    title: "Comps, HOA Reserves & Insurability",
    summary: "Every target residence is evaluated against closed MLS comparables, condo reserve studies, roof/wind mitigation, and flood parameters before an offer is drafted.",
    bullets: [
      "Closed-sale price-per-sq-ft verification",
      "Condo milestone & reserve budget review",
      "Roof age, impact glass & insurance context",
    ],
  },
  {
    id: "network",
    label: "02 · 3,500+ Agent Footprint",
    title: "Statewide Brokerage Reach",
    summary: `Backed by ${CONTACT.stats.urgAgents} licensed agents across the ${CONTACT.stats.urgOfficeNetwork} (19 Florida office locations) for direct agent-to-agent intelligence.`,
    bullets: [
      `${CONTACT.stats.urgAgents} agents · 19 Florida office locations`,
      "Direct listing-agent relationship coordination",
      "Tri-county coverage: Miami-Dade, Broward, Palm Beach",
    ],
  },
  {
    id: "execution",
    label: "03 · Contract & Escrow Protection",
    title: "Bilingual Negotiation Through Closing",
    summary: "25 years of structuring contingencies, inspection remedies, appraisal defenses, and remote international closings in English and Spanish.",
    bullets: [
      "Inspection & appraisal contingency defense",
      "Bilingual English / Spanish transaction desk",
      "Title, lender & escrow milestone tracking",
    ],
  },
] as const;

const BUYER_FAQS = [
  {
    q: "Do I need a buyer's agent in South Florida?",
    a: "A buyer's agent provides professional property search, negotiation support, market analysis, and closing coordination. Carlos works through United Realty Group's brokerage framework and applicable MLS, platform, legal, and compliance requirements.",
  },
  {
    q: "What does United Realty Group's size mean for me as a buyer?",
    a: "United Realty Group has 3,500+ agents across the Florida office network. For a buyer, that supports local coordination and buyer-agent cooperation across South Florida, subject to brokerage, platform, and compliance requirements.",
  },
  {
    q: "Can I buy a home in South Florida from abroad?",
    a: "Yes. We specialize in serving international buyers, particularly from Spain and Latin America. Bilingual English/Spanish representation, foreign-national financing introductions, and remote transaction management are available.",
  },
  {
    q: "What is the buying process in Miami?",
    a: "The process includes buyer consultation, professional property search, offer submission, inspection, financing coordination, title review, and closing. Timing depends on the contract, financing, property, and parties involved.",
  },
] as const;

export default function BuyersPage() {
  const [activePillar, setActivePillar] = useState(0);
  const [driverCategory, setDriverCategory] = useState<"wealth" | "connectivity" | "lifestyle">("wealth");

  const currentPillar = UNDERWRITING_PILLARS[activePillar];

  return (
    <>
      <Helmet>
        <title>Buy in South Florida · 25 Years + a 3,500-Agent Network</title>
        <meta
          name="description"
          content="Buyer representation across South Florida — 25 years, backed by United Realty Group's 3,500+ agents across the Florida office network. FL SL705771."
        />
        <link rel="canonical" href="https://homesprofessional.com/buy" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/buy" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/buy" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/comprar" />
        <meta
          property="og:title"
          content="Buy in South Florida | 25 Years + 3,500+ Agents Behind Every Purchase | Carlos Uzcategui"
        />
        <meta
          property="og:description"
          content="Buyer representation across Miami-Dade, Broward, and Palm Beach — backed by United Realty Group: 3,500+ agents; Florida office network. Bilingual English/Spanish. FL SL705771."
        />
        <meta property="og:url" content="https://homesprofessional.com/buy" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Buy in South Florida | 25 Years + 3,500+ Agents Behind Every Purchase"
        />
        <meta
          name="twitter:description"
          content="Professional MLS search, negotiation, and closing coordination across Miami-Dade, Broward, and Palm Beach through United Realty Group."
        />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>

      <JsonLd
        id="buyers-service"
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "South Florida Buyer Representation",
          provider: { "@id": "https://homesprofessional.com/#agent" },
          serviceType: "Real Estate Buyer Representation",
          description:
            "Buyer representation including professional MLS search, neighborhood analysis, offer strategy, and closing coordination across Miami-Dade, Broward, and Palm Beach counties — backed by United Realty Group's 3,500+ agents across the Florida office network.",
          areaServed: "South Florida",
          url: "https://homesprofessional.com/buy",
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            description: "Free buyer consultation — no commitment required.",
          },
        }}
      />

      <JsonLd
        id="buyers-faq"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: BUYER_FAQS.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }}
      />

      <JsonLd
        id="buyers-breadcrumb"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://homesprofessional.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Buy in South Florida",
              item: "https://homesprofessional.com/buy",
            },
          ],
        }}
      />

      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-28 lg:pb-0">
        <Navbar />

        {/* Section 1: Executive Buyer Representation Hero */}
        <section className="advisory-hero" aria-labelledby="buyer-hero-heading">
          <div className="advisory-hero-inner">
            <div>
              <p className="advisory-eyebrow">South Florida · Buyer representation</p>
              <h1 id="buyer-hero-heading">
                Know What You’re Buying—Before You Decide What to Pay.
              </h1>
              <p className="advisory-summary">
                Property analysis, local market guidance and experienced negotiation across Miami-Dade, Broward and Palm Beach, with bilingual coordination from search to closing.
              </p>
              <div className="advisory-actions">
                <a
                  href="#buyer-mandate"
                  className="advisory-primary"
                  onClick={() =>
                    trackMicroConversion("hp_cta_click", {
                      type: "buyer_consultation",
                      location: "buyers_hero",
                    })
                  }
                >
                  Request a Private Buyer Consultation
                </a>
                <a
                  href="#search"
                  className="advisory-secondary"
                  onClick={() =>
                    trackMicroConversion("hp_cta_click", {
                      type: "search_mls_hero",
                      location: "buyers_hero",
                    })
                  }
                >
                  <Search size={15} className="mr-1.5 inline" /> Search Live MLS
                </a>
                <a
                  href="/markets"
                  className="advisory-secondary"
                  onClick={() =>
                    trackMicroConversion("hp_cta_click", {
                      type: "explore_markets",
                      location: "buyers_hero",
                    })
                  }
                >
                  Explore South Florida Markets
                </a>
              </div>
              <p className="advisory-note">
                Florida licensed since 2001 · United Realty Group · English / Spanish
              </p>
            </div>
            <figure className="advisory-photo">
              <picture>
                <source
                  media="(max-width: 1023px)"
                  srcSet="/images/buyers-architecture-mobile.webp"
                />
                <img
                  src="/images/buyers-architecture.webp"
                  width="1400"
                  height="933"
                  fetchPriority="high"
                  alt="Conceptual residential interior opening onto a South Florida garden and waterway"
                />
              </picture>
              <figcaption>Conceptual residential imagery · Not a property listing</figcaption>
            </figure>
          </div>
        </section>

        {/* Primary Live Bridge IDX Search Browser */}
        <ListingsBrowser
          compact
          heading="Search Live Miami & South Florida MLS Inventory"
          subtitle="Filter active and pending residences across Weston, Coral Gables, Brickell, Fort Lauderdale, Aventura, and Boca Raton — or click any property card to inspect the interactive gallery."
        />

        {/* Section 2: Six-Stage Acquisition Mandate */}
        <FloridaBuyerJourney />

        {/* MIAMI REALTORS® + RWorld Video Hub (Only a REALTOR® · Buyer Advocacy) */}
        <RealtorAssociationVideoHub variant="buyers" />

        {/* Section 3: Interactive Buyer Underwriting & Specialized Desks */}
        <section className="border-t border-hairline bg-white py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
              {/* Left Column: Interactive 3-Pillar Buyer Underwriting Deck (7 cols) */}
              <div className="lg:col-span-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                  The Network Behind Your Purchase
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                  One agent negotiates for you.{" "}
                  <span className="font-light italic text-gold-ink">
                    {CONTACT.stats.urgAgents} stand behind him.
                  </span>
                </h2>

                {/* Interactive Pillar Tabs */}
                <div
                  role="tablist"
                  aria-label="Buyer representation pillars"
                  className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3"
                >
                  {UNDERWRITING_PILLARS.map((pillar, idx) => {
                    const selected = activePillar === idx;
                    return (
                      <button
                        key={pillar.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setActivePillar(idx)}
                        className={`rounded-lg border px-3.5 py-3 text-left transition-all ${
                          selected
                            ? "border-gold bg-navy-deep text-white shadow-md"
                            : "border-bone bg-ivory/70 text-navy-deep hover:border-gold/60"
                        }`}
                      >
                        <span className={`block font-mono text-[9px] uppercase tracking-[0.16em] ${selected ? "text-gold" : "text-gold-ink"}`}>
                          {pillar.label}
                        </span>
                        <span className="mt-1 block font-serif text-sm leading-snug">
                          {pillar.title}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Pillar Detail Card */}
                <div className="mt-3 rounded-xl border border-gold/35 bg-navy-deep p-6 text-white shadow-lg">
                  <p className="font-serif text-xl text-gold">{currentPillar.title}</p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-white/85">
                    {currentPillar.summary}
                  </p>
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    {currentPillar.bullets.map((b) => (
                      <div key={b} className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
                        <Check size={13} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                        <span className="font-sans text-xs leading-snug text-white/90">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Portrait Card (5 cols) */}
              <div className="lg:col-span-5">
                <Tilt3D maxTilt={4}>
                  <figure className="overflow-hidden rounded-xl border border-bone bg-navy-deep shadow-[0_20px_50px_rgba(11,30,63,0.14)]">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src="/images/carlos-waterfront-editorial-20261012.jpg"
                        alt="Carlos Uzcategui conducting a local property review on the Miami waterfront"
                        width={1920}
                        height={1081}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-[center_42%]"
                      />
                    </div>
                    <figcaption className="border-t border-white/10 bg-navy-deep px-6 py-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                        {CONTACT.licenseDisplay}
                      </p>
                      <p className="mt-1 font-serif text-lg text-white">
                        25 Years of South Florida Acquisition &amp; Contract Negotiation
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/65">
                        United Realty Group · {CONTACT.stats.urgAgents} Agents · 19 Florida Office Locations
                      </p>
                    </figcaption>
                  </figure>
                </Tilt3D>
              </div>
            </div>

            {/* Specialized Buyer Advisory Desks — Compact 3-Card Row */}
            <div className="mt-14 border-t border-hairline pt-12">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                    Specialized Buyer Desks
                  </p>
                  <h3 className="mt-1.5 font-serif text-2xl text-navy-deep md:text-3xl">
                    New Developments, Cross-Border &amp; Local Programs
                  </h3>
                </div>
                <a
                  href="/listings"
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink transition-colors hover:text-navy-deep"
                >
                  Browse Active MLS Opportunities →
                </a>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <Tilt3D maxTilt={4} className="h-full">
                  <div className="flex h-full flex-col justify-between rounded-xl border border-bone bg-ivory p-6 transition-all duration-300 hover:border-gold hover:shadow-md">
                    <div>
                      <div className="flex items-center gap-2 text-gold-ink">
                        <Building2 size={17} />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                          Pre-Construction · NEO Portal
                        </span>
                      </div>
                      <h4 className="mt-3 font-serif text-xl text-navy-deep">
                        South Florida New Developments
                      </h4>
                      <p className="mt-2 font-sans text-xs leading-relaxed text-ink-primary/75">
                        Independent buyer representation on developer contracts, staged deposit schedules, and delivery timelines.
                      </p>
                    </div>
                    <a
                      href="/new-construction"
                      className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-navy-deep underline decoration-gold underline-offset-4 hover:text-gold-ink"
                    >
                      Open Pre-Construction Feed <ArrowRight size={13} />
                    </a>
                  </div>
                </Tilt3D>

                <Tilt3D maxTilt={4} className="h-full">
                  <div className="flex h-full flex-col justify-between rounded-xl border border-bone bg-ivory p-6 transition-all duration-300 hover:border-gold hover:shadow-md">
                    <div>
                      <div className="flex items-center gap-2 text-gold-ink">
                        <Globe2 size={17} />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                          Cross-Border &amp; Spain Desk
                        </span>
                      </div>
                      <h4 className="mt-3 font-serif text-xl text-navy-deep">
                        International &amp; Spain Introductions
                      </h4>
                      <p className="mt-2 font-sans text-xs leading-relaxed text-ink-primary/75">
                        Bilingual acquisition support in Florida plus formal introductions to GILMAR Consulting Inmobiliario in Spain.
                      </p>
                    </div>
                    <a
                      href="#gilmar-global-desk"
                      className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-navy-deep underline decoration-gold underline-offset-4 hover:text-gold-ink"
                    >
                      Explore GILMAR Portfolio <ArrowRight size={13} />
                    </a>
                  </div>
                </Tilt3D>

                <Tilt3D maxTilt={4} className="h-full">
                  <div className="flex h-full flex-col justify-between rounded-xl border border-bone bg-ivory p-6 transition-all duration-300 hover:border-gold hover:shadow-md">
                    <div>
                      <div className="flex items-center gap-2 text-gold-ink">
                        <Home size={17} />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                          Weston Buyer Resource
                        </span>
                      </div>
                      <h4 className="mt-3 font-serif text-xl text-navy-deep">
                        Weston Purchase Assistance Guide
                      </h4>
                      <p className="mt-2 font-sans text-xs leading-relaxed text-ink-primary/75">
                        City of Weston program guide (up to $120,000 for eligible primary-residence buyers, subject to municipal rules).
                      </p>
                    </div>
                    <a
                      href="/journal/weston-homebuyer-purchase-assistance-2026"
                      className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-navy-deep underline decoration-gold underline-offset-4 hover:text-gold-ink"
                    >
                      Read Weston Housing Guide <ArrowRight size={13} />
                    </a>
                  </div>
                </Tilt3D>
              </div>
            </div>
          </div>
        </section>

        {/* United Realty Group Corporate HQ, 19 FL Office Locations & Affiliated Lending / Title Partners */}
        <UrgCorporateShowcase variant="buyers" />

        {/* GILMAR × United Realty Group Spain Acquisition Desk */}
        <GilmarGlobalDeskSection variant="buyers" />

        {/* Section 4: Interactive 3-Lens Regional Fundamentals Explorer (Replaces 9-Card Wall) */}
        <section className="relative overflow-hidden bg-navy-deep py-16 md:py-24">
          <AuroraBackground variant="subtle" />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end mb-10">
              <div className="max-w-xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                  Market Fundamentals · Moving to Florida
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-tight text-white md:text-4xl">
                  Why buyers keep choosing South Florida.
                </h2>
              </div>

              {/* Interactive 3-Category Filter */}
              <div className="inline-flex flex-wrap rounded-xl border border-white/15 bg-white/[0.04] p-1" role="tablist" aria-label="South Florida demand drivers">
                {[
                  { id: "wealth", label: "Tax & Business" },
                  { id: "connectivity", label: "Global & Coastal" },
                  { id: "lifestyle", label: "Schools & Lifestyle" },
                ].map((tab) => {
                  const selected = driverCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setDriverCategory(tab.id as "wealth" | "connectivity" | "lifestyle")}
                      className={`rounded-lg px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-all ${
                        selected
                          ? "bg-gold text-navy-deep font-bold shadow"
                          : "text-white/75 hover:text-white"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {WHY_FLORIDA.map((r) => {
                const visible = r.category === driverCategory;
                return (
                  <div key={r.title} hidden={!visible}>
                    <Tilt3D maxTilt={4} className="h-full">
                      <div className="h-full rounded-xl border border-white/12 bg-navy-deep/95 p-6 transition-colors hover:border-gold/40">
                        <r.icon size={20} className="text-gold" />
                        <h3 className="mt-4 font-serif text-lg leading-snug text-white">{r.title}</h3>
                        <p className="mt-2 font-sans text-xs leading-relaxed text-white/75">
                          {r.desc}
                        </p>
                      </div>
                    </Tilt3D>
                  </div>
                );
              })}
            </div>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
              Source: Miami and South Florida REALTORS® — "Top 20 Reasons to Buy &amp; Live in Miami" (MiamiRealtors.com)
            </p>
          </div>
        </section>

        {/* Section 5: Confidential Buyer Mandate Form & Buyer FAQ */}
        <section id="buyer-mandate" className="scroll-mt-24 bg-ivory py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                Confidential Buyer Desk
              </p>
              <h2 className="mt-3 font-serif text-3xl text-navy-deep md:text-4xl">
                Define Your South Florida Acquisition Brief
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-navy/70">
                Share your target neighborhoods, budget, and timeline. Carlos reviews every mandate personally from his Weston office.
              </p>
            </div>

            <div className="shadow-[0_20px_50px_rgba(11,30,63,0.08)]">
              <BuyerMandateForm />
            </div>

            <div className="mt-5 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-navy/70">
              <BadgeCheck size={14} className="text-gold" />
              Confidential · {CONTACT.licenseDisplay} · United Realty Group · Equal Housing Opportunity
            </div>

            {/* Visible Buyer FAQ Accordion (100% Parity with FAQPage JSON-LD) */}
            <div className="mt-20 border-t border-bone pt-16">
              <div className="text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                  Buyer Representation FAQ
                </p>
                <h3 className="mt-3 font-serif text-2xl text-navy-deep md:text-3xl">
                  Common questions about buying in South Florida
                </h3>
              </div>

              <div className="mt-8 border border-bone bg-white px-6 py-2 md:px-10">
                <FaqAccordion faqs={BUYER_FAQS} tone="light" defaultOpen={0} />
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
