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
import {
  ArrowRight,
  BadgeCheck,
  Banknote,
  Building2,
  Globe2,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  Plane,
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
    icon: Banknote,
    title: "No state income tax",
    desc: "Florida has no personal state income tax — a structural advantage for relocating professionals, retirees, and business owners.",
  },
  {
    icon: Sun,
    title: "A subtropical, year-round market",
    desc: "South Florida's climate supports permanent residents, seasonal owners, and international buyers across the calendar.",
  },
  {
    icon: Globe2,
    title: "An established international buyer ecosystem",
    desc: "Bilingual professional services, global transportation links, and long-established international communities support cross-border purchasers.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare and quality-of-life infrastructure",
    desc: "Major hospital systems, outdoor living, and year-round recreation are practical considerations for relocations and second-home purchases.",
  },
  {
    icon: Landmark,
    title: "Finance and business connectivity",
    desc: "Brickell and the wider South Florida business corridor support professionals, entrepreneurs, investors, and relocating companies.",
  },
  {
    icon: Waves,
    title: "Waterfront and coastal property choices",
    desc: "Oceanfront, bayfront, riverfront, and boating communities create distinct property types with different insurance, maintenance, and ownership considerations.",
  },
  {
    icon: GraduationCap,
    title: "Schools and university access",
    desc: "Public, private, and higher-education options shape neighborhood selection for families and long-term relocations.",
  },
  {
    icon: Plane,
    title: "Regional and international connectivity",
    desc: "International air service, major highways, seaports, and intercity rail connect South Florida with domestic and overseas markets.",
  },
  {
    icon: Trophy,
    title: "Culture, dining, and professional sports",
    desc: "Arts, culinary districts, major events, and professional sports give buyers a wide range of urban and lifestyle environments.",
  },
];

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

        {/* Section 2: Six-Stage Acquisition Mandate */}
        <FloridaBuyerJourney />

        {/* Section 3: Principal Accountability & Specialized Acquisition Desks */}
        <section className="border-t border-hairline bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
              {/* Left Column: Principal Accountability + URG Infrastructure */}
              <div className="lg:col-span-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                  The Network Behind Your Purchase
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                  One agent negotiates for you.
                  <br />
                  <span className="font-light italic text-gold-ink">
                    {CONTACT.stats.urgAgents} stand behind him.
                  </span>
                </h2>
                <p className="mt-5 font-sans text-[15px] leading-relaxed text-ink-primary/70">
                  Carlos represents buyers through United Realty Group's Florida brokerage framework:{" "}
                  {CONTACT.stats.urgAgents} licensed agents across the {CONTACT.stats.urgOfficeNetwork} (19 Florida office locations). That footprint supports local submarket intelligence and agent-to-agent cooperation across Miami-Dade, Broward, and Palm Beach while Carlos remains your single accountable advisor.
                </p>
                <p className="mt-4 font-sans text-[15px] leading-relaxed text-ink-primary/70">
                  Whether acquiring a primary residence in Weston or Coral Gables, a waterfront condominium in Brickell or Sunny Isles Beach, or an investment property, every property is underwritten against verified MLS comparables, HOA/condo reserve health, insurance parameters, and contract contingencies before an offer is submitted.
                </p>
                <ul className="mt-7 space-y-3">
                  {[
                    `${CONTACT.stats.urgAgents} licensed agents across the ${CONTACT.stats.urgOfficeNetwork} (19 Florida office locations)`,
                    "Direct MLS property underwriting, comparable sales review, and inspection/appraisal defense",
                    "Established peer relationships with listing agents across Miami-Dade, Broward, and Palm Beach",
                    "Bilingual English / Spanish transaction management for domestic and international buyers",
                    "Full brokerage compliance and escrow coordination from initial brief to closing",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <BadgeCheck size={16} className="mt-0.5 shrink-0 text-gold" />
                      <span className="font-sans text-[14px] leading-snug text-ink-primary/75">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Editorial Portrait Card */}
              <div className="lg:col-span-5">
                <figure className="overflow-hidden border border-bone bg-navy-deep shadow-[0_20px_50px_rgba(11,30,63,0.14)]">
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
                      25 Years of South Florida Acquisition & Contract Negotiation
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/65">
                      United Realty Group · {CONTACT.stats.urgAgents} Agents · 19 Florida Office Locations
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* Specialized Buyer Advisory Desks (Consolidating Pre-Construction, Cross-Border/Spain, and Weston Programs) */}
            <div className="mt-16 border-t border-hairline pt-14">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                    Specialized Buyer Desks
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-navy-deep md:text-3xl">
                    Tailored guidance for new developments, international buyers, and local programs.
                  </h3>
                </div>
                <a
                  href="/listings"
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink transition-colors hover:text-navy-deep"
                >
                  Browse Active MLS Opportunities →
                </a>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {/* Card 1: Pre-Construction */}
                <div className="flex flex-col justify-between border border-bone bg-ivory p-7">
                  <div>
                    <div className="flex items-center gap-2.5 text-gold-ink">
                      <Building2 size={18} />
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                        Pre-Construction · NEO Portal
                      </span>
                    </div>
                    <h4 className="mt-4 font-serif text-xl text-navy-deep">
                      South Florida New Developments
                    </h4>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/70">
                      Access live South Florida pre-construction inventory via the NEO platform. Carlos represents buyers independently in reviewing developer contracts, staged deposit schedules, reserve budgets, and delivery timelines.
                    </p>
                  </div>
                  <a
                    href="/new-construction"
                    className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-navy-deep underline decoration-gold underline-offset-4 transition-colors hover:text-gold-ink"
                  >
                    Open Live Pre-Construction Feed
                    <ArrowRight size={13} />
                  </a>
                </div>

                {/* Card 2: International & Cross-Border / Spain Referrals */}
                <div className="flex flex-col justify-between border border-bone bg-ivory p-7">
                  <div>
                    <div className="flex items-center gap-2.5 text-gold-ink">
                      <Globe2 size={18} />
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                        Cross-Border & Spain Desk
                      </span>
                    </div>
                    <h4 className="mt-4 font-serif text-xl text-navy-deep">
                      International Buyers & Spain Introductions
                    </h4>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/70">
                      Bilingual English/Spanish acquisition support for Latin American and European buyers purchasing in Florida, plus formal referral introductions to vetted local agencies and legal counsel for clients purchasing in Spain.
                    </p>
                  </div>
                  <a
                    href="/global-desk"
                    className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-navy-deep underline decoration-gold underline-offset-4 transition-colors hover:text-gold-ink"
                  >
                    Visit the International & Spain Desk
                    <ArrowRight size={13} />
                  </a>
                </div>

                {/* Card 3: Weston & Broward Municipal Programs */}
                <div className="flex flex-col justify-between border border-bone bg-ivory p-7">
                  <div>
                    <div className="flex items-center gap-2.5 text-gold-ink">
                      <Home size={18} />
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                        Weston Buyer Resource
                      </span>
                    </div>
                    <h4 className="mt-4 font-serif text-xl text-navy-deep">
                      Weston Purchase Assistance Guide
                    </h4>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/70">
                      The City of Weston describes purchase assistance of up to $120,000 for eligible primary-residence buyers, subject to financial need, available funds, mortgage approval, and Broward County eligibility rules.
                    </p>
                  </div>
                  <a
                    href="/journal/weston-homebuyer-purchase-assistance-2026"
                    className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-navy-deep underline decoration-gold underline-offset-4 transition-colors hover:text-gold-ink"
                  >
                    Read the Weston Housing Guide
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Why Buyers & Capital Choose South Florida */}
        <section className="relative overflow-hidden bg-navy-deep py-20 md:py-28">
          <AuroraBackground variant="subtle" />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-2xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                Market Fundamentals · Moving to Florida
              </p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
                Why buyers keep choosing South Florida.
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-white/65">
                Relocation and capital allocation depend on long-term regional fundamentals. These nine structural drivers support residential demand across Miami-Dade, Broward, and Palm Beach.
              </p>
            </div>

            <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_FLORIDA.map((r) => (
                <div key={r.title} className="bg-navy-deep/95 p-7">
                  <r.icon size={20} className="text-gold" />
                  <h3 className="mt-4 font-serif text-lg leading-snug text-white">{r.title}</h3>
                  <p className="mt-2.5 font-sans text-[13.5px] leading-relaxed text-white/65">
                    {r.desc}
                  </p>
                </div>
              ))}
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
