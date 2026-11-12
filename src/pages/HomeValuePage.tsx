import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { ArrowDown, ArrowRight, BadgeCheck, Clock, Layers, Scale, ShieldCheck, Target, TrendingUp } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { SellerIntakeForm } from "../components/forms/SellerIntakeForm";
import { SellerNetCalculator } from "../components/SellerNetCalculator";
import { FaqAccordion } from "../components/FaqAccordion";
import { CONTACT } from "../constants";

const HOW_IT_WORKS = [
  {
    id: "step-1",
    num: "01",
    icon: Target,
    title: "Submit Your Property",
    shortLabel: "01 · Address Intake",
    body: "Enter your street address and city. Our team reviews every submission—no automated reports or call-center scripts.",
  },
  {
    id: "step-2",
    num: "02",
    icon: TrendingUp,
    title: "MLS Comparable & Absorption Analysis",
    shortLabel: "02 · Live MLS Comps",
    body: "Active competition, recent closed sales, pending contracts, and months-of-inventory pulled directly from the Miami and South Florida REALTORS® MLS.",
  },
  {
    id: "step-3",
    num: "03",
    icon: Clock,
    title: "Private Strategy Review",
    shortLabel: "03 · Pricing Brief",
    body: "You receive a property-specific price range and positioning brief tailored to your timeline, with zero obligation to list.",
  },
] as const;

const WHAT_YOU_GET = [
  "Active, pending, and closed MLS comparables for your specific submarket",
  "Current absorption rate—how quickly comparable properties are going under contract",
  "Price-per-square-foot adjustments for condition, floor height, view, impact glass, and lot",
  "Competitive positioning strategy against current active inventory in your price band",
  "Days-on-market and appraisal risk assessment across pricing scenarios",
  "Private review with Carlos Uzcategui—no obligation to list, no sales pressure",
];

const METHODOLOGY_LENSES = [
  {
    id: "variance",
    label: "01 · 15%–30% Property Variance",
    icon: Layers,
    stat: "15%–30% Spread",
    headline: "Why Neighboring South Florida Addresses Trade 15% to 30% Apart",
    body: "Online algorithms offer a broad starting point, but they cannot inspect interior condition, impact-glass upgrades, roof age, waterfront exposure, condo floor height, or special-assessment reserves. In South Florida luxury and residential submarkets, those property-specific factors routinely separate two neighboring addresses by 15% to 30%.",
  },
  {
    id: "cma",
    label: "02 · Verified MLS CMA",
    icon: Scale,
    stat: "Live MLS Data",
    headline: "Verified Closed Sales, Active Competition & Pending Absorption",
    body: "A property-specific Comparative Market Analysis (CMA) evaluates verified closed sales, active competing listings, and pending absorption so you can establish a defensible asking-price range before going to market. Estimates depend on available data and are not formal appraisals or guarantees of sale price.",
  },
  {
    id: "execution",
    label: "03 · >90% Agent Activation",
    icon: ShieldCheck,
    stat: "93,000 Agents",
    headline: "From Pricing Precision to Cooperating Buyer-Agent Execution",
    body: "Accurate pricing is the foundation of listing performance. When you decide to sell, your price position connects directly with structured presentation on the Miami and South Florida REALTORS® MLS—where over 90% of residential sales close through cooperating buyer agents—supported by MLS reverse prospecting for matched buyer searches and 25 years of South Florida contract and escrow negotiation.",
  },
] as const;

const HOME_VALUE_FAQS = [
  {
    q: "How much is my South Florida home worth?",
    a: "A comparative market analysis (CMA) reviews similar recently sold homes, active competition and available pending-sale information alongside your property's location, condition and features. Carlos uses that evidence to discuss a market value range and listing strategy. A CMA is an estimate, not an appraisal or a guarantee of sale price.",
  },
  {
    q: "How does a professional CMA differ from an online home value estimate?",
    a: "An online estimate can be a starting point. A property-specific CMA adds a professional review of comparable sales, condition, improvements and current competition. The quality of either estimate depends on the available data and the property; neither guarantees a sale price.",
  },
  {
    q: "Does requesting a home valuation mean I have to list with Carlos?",
    a: "No. Carlos provides the confidential review at no cost, with no obligation to list. Share your address, contact details and timing. Our team reviews the information and contacts you to arrange the conversation.",
  },
  {
    q: "Do you review homes in Broward and Palm Beach as well as Miami-Dade?",
    a: "Yes. Carlos provides South Florida seller representation through United Realty Group, including Weston, Fort Lauderdale, Miami, Coral Gables, Doral, Aventura and Boca Raton. The analysis uses comparables relevant to your property's location and type.",
  },
];

export default function HomeValuePage() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [activeLensIndex, setActiveLensIndex] = useState(0);

  return (
    <>
      <Helmet>
        <title>South Florida Home Value & CMA | Carlos Uzcategui</title>
        <meta
          name="description"
          content="What is your South Florida home worth? Request an MLS-based comparative market analysis and pricing review from Carlos Uzcategui. No obligation to list."
        />
        <link rel="canonical" href="https://homesprofessional.com/home-value" />
        <meta property="og:title" content="South Florida Home Value & CMA | Carlos Uzcategui" />
        <meta
          property="og:description"
          content="What is your South Florida home worth? Request an MLS-based comparative market analysis and pricing review from Carlos Uzcategui. No obligation to list."
        />
        <meta property="og:url" content="https://homesprofessional.com/home-value" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="South Florida Home Value & CMA | Carlos Uzcategui" />
        <meta
          name="twitter:description"
          content="What is your South Florida home worth? Request an MLS-based comparative market analysis and pricing review from Carlos Uzcategui. No obligation to list."
        />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>

      <JsonLd
        id="home-value-faq"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: HOME_VALUE_FAQS.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }}
      />

      <JsonLd
        id="home-value-service"
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Free South Florida Home Valuation",
          provider: { "@id": "https://homesprofessional.com/#agent" },
          serviceType: "Comparative Market Analysis",
          description:
            "Free, professional home valuation using Miami and South Florida REALTORS® MLS data. No obligation to list.",
          areaServed: "South Florida",
          url: "https://homesprofessional.com/home-value",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            description: "Free comparative market analysis - no listing commitment required.",
          },
        }}
      />

      <JsonLd
        id="home-value-breadcrumb"
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
              name: "South Florida Home Valuation",
              item: "https://homesprofessional.com/home-value",
            },
          ],
        }}
      />

      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-28 lg:pb-0">
        <Navbar />

        {/* Section 1: Address-First Split-Screen Valuation Hero */}
        <section className="relative overflow-hidden bg-[#060D18] pt-24 pb-20 md:pt-32 md:pb-28 text-white">
          <div
            className="pointer-events-none absolute right-0 top-0 h-[480px] w-[480px] rounded-full bg-gold/[0.05] blur-[110px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute left-0 bottom-0 h-[380px] w-[380px] rounded-full bg-[#16449E]/[0.08] blur-[100px]"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-7xl px-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-12">
            {/* Left Column: Editorial Positioning & Interactive 3-Step Process */}
            <div className="lg:col-span-6 lg:pr-4">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
                Confidential · MLS Comparative Analysis · South Florida
              </p>
              <h1
                className="mt-5 font-serif leading-[1.08] tracking-tight text-white"
                style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.6rem)" }}
              >
                What Is Your South Florida{" "}
                <em className="font-normal italic text-gold">Property Worth Today?</em>
              </h1>
              <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-white/75 sm:text-lg">
                Receive a private MLS-based valuation, submarket absorption analysis, and preliminary net-proceeds review prepared by our team.
              </p>

              {/* Interactive 3-Step Executive Process Selector */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <div
                  role="tablist"
                  aria-label="Three-Step Valuation Process"
                  className="grid grid-cols-3 gap-2"
                >
                  {HOW_IT_WORKS.map((step, i) => {
                    const isSelected = activeStepIndex === i;
                    return (
                      <button
                        key={step.id}
                        type="button"
                        role="tab"
                        id={`hv-step-tab-${step.id}`}
                        aria-selected={isSelected}
                        aria-controls={`hv-step-panel-${step.id}`}
                        onClick={() => setActiveStepIndex(i)}
                        className={`border px-3 py-2.5 text-left transition-all ${
                          isSelected
                            ? "border-gold bg-gold/[0.12] text-white"
                            : "border-white/15 bg-white/[0.03] text-white/65 hover:border-white/35 hover:text-white"
                        }`}
                      >
                        <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
                          {step.shortLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {HOW_IT_WORKS.map((step, i) => {
                  const Icon = step.icon;
                  const isSelected = activeStepIndex === i;
                  return (
                    <div
                      key={step.id}
                      id={`hv-step-panel-${step.id}`}
                      role="tabpanel"
                      aria-labelledby={`hv-step-tab-${step.id}`}
                      hidden={!isSelected}
                      className="mt-3 border border-white/15 bg-white/[0.04] p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-6 w-6 items-center justify-center border border-gold/40 bg-gold/10 font-mono text-[10px] text-gold">
                            {step.num}
                          </span>
                          <h2 className="font-serif text-lg text-white">{step.title}</h2>
                        </div>
                        <Icon size={16} className="text-gold" aria-hidden="true" />
                      </div>
                      <p className="mt-2.5 font-sans text-sm leading-relaxed text-white/75">
                        {step.body}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Secondary Navigation to Net Calculator & Seller System */}
              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
                <a
                  href="#net-calculator"
                  className="inline-flex min-h-11 items-center gap-2 border border-white/20 bg-white/[0.03] px-5 py-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-gold hover:text-gold"
                >
                  Calculate Estimated Net Proceeds
                  <ArrowDown size={14} className="text-gold" />
                </a>
                <a
                  href="/sell"
                  className="inline-flex min-h-11 items-center gap-2 px-2 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gold/90 transition-colors hover:text-white"
                >
                  Explore Seller Representation
                  <ArrowRight size={14} />
                </a>
              </div>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                {CONTACT.licenseDisplay} · United Realty Group · 25 Years South Florida Experience
              </p>
            </div>

            {/* Right Column: Immediate Address-First Valuation Form */}
            <div id="valuation-form" className="mt-12 lg:col-span-6 lg:mt-0">
              <div id="contact" className="shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                <SellerIntakeForm sourcePage="home-value" />
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
                <BadgeCheck size={14} className="text-gold" />
                Confidential Review · No Commitment Required · Equal Housing Opportunity
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Valuation Methodology Comparator & Deliverables */}
        <section className="border-b border-hairline bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
              {/* Left Column: Interactive 3-Lens Valuation Comparator */}
              <div className="lg:col-span-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                  Valuation Methodology
                </p>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-navy-deep sm:text-4xl">
                  Why an automated estimate is not enough for a South Florida sale.
                </h2>
                <p className="mt-3 font-sans text-sm leading-relaxed text-navy/70">
                  Select a valuation factor below to compare automated estimates against a principal-prepared MLS review.
                </p>

                <div
                  role="tablist"
                  aria-label="Valuation Methodology Factors"
                  className="mt-6 grid gap-2 sm:grid-cols-3"
                >
                  {METHODOLOGY_LENSES.map((lens, idx) => {
                    const isSelected = activeLensIndex === idx;
                    return (
                      <button
                        key={lens.id}
                        type="button"
                        role="tab"
                        id={`hv-method-tab-${lens.id}`}
                        aria-selected={isSelected}
                        aria-controls={`hv-method-panel-${lens.id}`}
                        onClick={() => setActiveLensIndex(idx)}
                        className={`border px-3.5 py-3 text-left transition-all ${
                          isSelected
                            ? "border-navy-deep bg-navy-deep text-white"
                            : "border-bone bg-ivory/60 text-navy hover:border-gold/60"
                        }`}
                      >
                        <span
                          className={`block font-mono text-[10px] uppercase tracking-[0.15em] ${
                            isSelected ? "text-gold" : "text-gold-ink"
                          }`}
                        >
                          {lens.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {METHODOLOGY_LENSES.map((lens, idx) => {
                  const Icon = lens.icon;
                  const isSelected = activeLensIndex === idx;
                  return (
                    <div
                      key={lens.id}
                      id={`hv-method-panel-${lens.id}`}
                      role="tabpanel"
                      aria-labelledby={`hv-method-tab-${lens.id}`}
                      hidden={!isSelected}
                      className="border border-t-0 border-bone bg-ivory/40 p-6"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="inline-flex items-center gap-2">
                          <Icon size={16} className="text-gold-ink" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-ink">
                            {lens.stat}
                          </span>
                        </div>
                      </div>
                      <h3 className="mt-3 font-serif text-xl text-navy-deep">
                        {lens.headline}
                      </h3>
                      <p className="mt-3 font-sans text-sm leading-relaxed text-navy/75">
                        {lens.body}
                      </p>
                      <a
                        href="/sell"
                        className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-navy-deep underline decoration-gold underline-offset-4 transition-colors hover:text-gold-ink"
                      >
                        See how the South Florida selling system works
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: What Carlos Provides Card */}
              <div className="border border-bone bg-ivory p-8 md:p-10 lg:col-span-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                  What Your Review Includes
                </p>
                <h3 className="mt-3 font-serif text-2xl text-navy-deep">
                  Prepared by our team from live MLS data.
                </h3>
                <ul className="mt-6 space-y-3.5">
                  {WHAT_YOU_GET.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <BadgeCheck size={16} className="mt-0.5 shrink-0 text-gold" />
                      <span className="font-sans text-sm leading-relaxed text-navy/75">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-bone pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-ink">
                    Tri-County Coverage · Miami-Dade · Broward · Palm Beach
                  </p>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-navy/65">
                    Weston · Coral Gables · Brickell · Miami Beach · Pinecrest · Coconut Grove · Aventura · Sunny Isles Beach · Key Biscayne · Doral · Fort Lauderdale · Plantation · Boca Raton
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-bone pt-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-navy/70">
                    No listing commitment · No obligation
                  </span>
                  <a
                    href="#valuation-form"
                    className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-ink transition-colors hover:text-navy-deep"
                  >
                    Start Address Review ↑
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Interactive Seller Net Proceeds Calculator */}
        <SellerNetCalculator sourcePage="home-value" />

        {/* Section 4: Valuation FAQ & Seller Research Guides */}
        <section className="border-t border-bone bg-ivory py-20 md:py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                Common Questions
              </p>
              <h2 className="mt-4 font-serif text-3xl text-navy-deep">
                Frequently asked about South Florida home valuations
              </h2>
            </div>

            <div className="mt-10 border border-bone bg-white px-6 py-2 md:px-10">
              <FaqAccordion faqs={HOME_VALUE_FAQS} tone="light" defaultOpen={0} />
            </div>

            {/* Valuation & Timing Research Guides */}
            <div className="mt-16 border-t border-bone pt-12">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">
                    Seller Advisory Research
                  </p>
                  <h3 className="mt-2 font-serif text-2xl text-navy-deep">
                    South Florida Pricing & Timing Guides
                  </h3>
                </div>
                <a
                  href="/journal"
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink hover:text-navy-deep transition-colors"
                >
                  View All Articles →
                </a>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <a
                  href="/journal/what-is-my-home-worth-south-florida-2026"
                  className="group block border border-bone bg-white p-6 transition-all hover:border-gold/50 hover:shadow-sm"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink mb-3">
                    Valuation Methodology
                  </p>
                  <h4 className="font-serif text-lg leading-snug text-navy-deep group-hover:text-gold-ink transition-colors">
                    What Is My South Florida Home Worth? A Seller's Pricing Guide for 2026
                  </h4>
                  <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-navy/70 group-hover:text-navy-deep">
                    Read the valuation guide
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </p>
                </a>

                <a
                  href="/journal/when-to-list-south-florida-home-2026"
                  className="group block border border-bone bg-white p-6 transition-all hover:border-gold/50 hover:shadow-sm"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink mb-3">
                    Market Timing
                  </p>
                  <h4 className="font-serif text-lg leading-snug text-navy-deep group-hover:text-gold-ink transition-colors">
                    When to List Your South Florida Home - Timing, Pricing, and the Cost of Waiting
                  </h4>
                  <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-navy/70 group-hover:text-navy-deep">
                    Read the timing guide
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </p>
                </a>
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
