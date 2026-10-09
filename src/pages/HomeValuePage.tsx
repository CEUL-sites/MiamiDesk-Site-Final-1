import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { BadgeCheck, TrendingUp, Clock, Target } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { SellerIntakeForm } from "../components/forms/SellerIntakeForm";
import { SellerNetCalculator } from "../components/SellerNetCalculator";
import { CONTACT } from "../constants";

const HOW_IT_WORKS = [
  {
    icon: Target,
    title: "Submit Your Property",
    body: "Share your address, property type, and timeline. Carlos reviews every submission personally - no automated reports, no scripts.",
  },
  {
    icon: TrendingUp,
    title: "MLS Comparable Analysis",
    body: "Active listings, recent closings, pending sales, and absorption rate for your specific submarket and property type - pulled from the Miami and South Florida REALTORSr MLS.",
  },
  {
    icon: Clock,
    title: "Private Consultation",
    body: "You receive a property-level positioning analysis and realistic price range - not a Zestimate. A real, market-specific review with no obligation to list.",
  },
];

const NEIGHBORHOODS = [
  "Coral Gables", "Weston", "Brickell", "Miami Beach", "Pinecrest",
  "Coconut Grove", "Aventura", "Bal Harbour", "Sunny Isles Beach",
  "Key Biscayne", "Palmetto Bay", "Doral", "Fort Lauderdale", "Hollywood",
  "Hallandale Beach", "Boca Raton", "Delray Beach", "Plantation",
  "Pembroke Pines", "Coral Springs", "West Palm Beach", "Kendall",
];

const WHAT_YOU_GET = [
  "Active and closed MLS comparables for your specific submarket",
  "Absorption rate - how quickly similar properties are selling right now",
  "Price-per-square-foot range adjusted for condition, floor, view, and lot",
  "Competitive positioning recommendation against current active inventory",
  "Days-on-market risk assessment at various price points",
  "Private consultation - no obligation to list, no pressure",
];

const HOME_VALUE_FAQS = [
  {
    "q": "How much is my South Florida home worth?",
    "a": "A comparative market analysis (CMA) reviews similar recently sold homes, active competition and available pending-sale information alongside your property's location, condition and features. Carlos uses that evidence to discuss a market value range and listing strategy. A CMA is an estimate, not an appraisal or a guarantee of sale price."
  },
  {
    "q": "How does a professional CMA differ from an online home value estimate?",
    "a": "An online estimate can be a starting point. A property-specific CMA adds a professional review of comparable sales, condition, improvements and current competition. The quality of either estimate depends on the available data and the property; neither guarantees a sale price."
  },
  {
    "q": "Does requesting a home valuation mean I have to list with Carlos?",
    "a": "No. Carlos provides the confidential review at no cost, with no obligation to list. Share your address, contact details and timing. Carlos reviews the information and contacts you to arrange the conversation."
  },
  {
    "q": "Do you review homes in Broward and Palm Beach as well as Miami-Dade?",
    "a": "Yes. Carlos provides South Florida seller representation through United Realty Group, including Weston, Fort Lauderdale, Miami, Coral Gables, Doral, Aventura and Boca Raton. The analysis uses comparables relevant to your property's location and type."
  }
];

export default function HomeValuePage() {
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
        <meta property="og:description" content="What is your South Florida home worth? Request an MLS-based comparative market analysis and pricing review from Carlos Uzcategui. No obligation to list." />
        <meta property="og:url" content="https://homesprofessional.com/home-value" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="South Florida Home Value & CMA | Carlos Uzcategui" />
        <meta name="twitter:description" content="What is your South Florida home worth? Request an MLS-based comparative market analysis and pricing review from Carlos Uzcategui. No obligation to list." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>
      <JsonLd id="home-value-faq" data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: HOME_VALUE_FAQS.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }} />
      <JsonLd id="home-value-service" data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Free South Florida Home Valuation",
          provider: { "@id": "https://homesprofessional.com/#agent" },
          serviceType: "Comparative Market Analysis",
          description: "Free, professional home valuation using Miami and South Florida REALTORSr MLS data. No obligation to list.",
          areaServed: "South Florida",
          url: "https://homesprofessional.com/home-value",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            description: "Free comparative market analysis - no listing commitment required.",
          },
        }} />

      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-[#060D18] px-6 py-20 md:py-28 text-center sm:px-10 text-white">
          <div className="pointer-events-none absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-gold/[0.04] blur-[100px]" aria-hidden="true" />
          <div className="pointer-events-none absolute left-0 bottom-0 h-[350px] w-[350px] rounded-full bg-[#16449E]/[0.08] blur-[90px]" aria-hidden="true" />

          <div className="relative mx-auto max-w-4xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
              Free � Confidential � Professional Real Estate Advisory
            </p>
            <h1
              className="mt-6 font-serif leading-tight text-white tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)" }}
            >
              What Is Your South Florida<br />
              <em className="italic text-gold font-normal">Property Worth Today?</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/75 sm:text-lg">
              Receive a private MLS-based valuation, local absorption analysis, and preliminary net-proceeds review prepared personally by Carlos-not an automated estimate.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#valuation-form"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-all hover:bg-white hover:text-navy-deep shadow-[0_8px_25px_rgba(176,141,87,0.35)]"
              >
                Request My Free Valuation
              </a>
              <a
                href="#net-calculator"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-gold/60 hover:text-gold"
              >
                Calculate Net Proceeds 
              </a>
            </div>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
              {CONTACT.licenseDisplay} � United Realty Group � 25 Years South Florida Experience
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              The Process
            </p>
            <h2 className="mx-auto mt-5 max-w-2xl text-center font-serif text-3xl leading-tight text-navy-deep">
              A professional valuation, not an automated estimate.
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {HOW_IT_WORKS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex flex-col items-start border-t-2 border-gold/40 pt-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center border border-gold/30 font-mono text-[10px] text-gold">
                        {i + 1}
                      </span>
                      <Icon size={16} className="text-gold/60" />
                    </div>
                    <h3 className="font-serif text-xl text-navy-deep">{step.title}</h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-navy/60">{step.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Service area chips */}
        <section className="border-t border-b border-bone bg-ivory py-10">
          <div className="mx-auto max-w-5xl px-6">
            <p className="mb-5 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-navy/70">
              Service areas - Miami-Dade � Broward � Palm Beach
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {NEIGHBORHOODS.map((n) => (
                <span
                  key={n}
                  className="border border-bone px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-navy/70"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Why not Zestimate - two-col */}
        <section className="bg-white py-16 md:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                  The Problem With Automated Estimates
                </p>
                <h2 className="mt-5 font-serif text-3xl leading-tight text-navy-deep">
                  Why a Zestimate isn't enough for a South Florida sale.
                </h2>
                <div className="mt-8 space-y-5 font-sans text-sm leading-relaxed text-navy/65">
                  <p>
                    Online estimates can provide a starting point. A property-specific review considers comparable sales, current competition, condition, improvements and features such as a condo's floor and view or a home's lot and community.
                  </p>
                  <p>
                    We explain the comparable evidence and the limits of the analysis so you can discuss an asking-price range and preparation priorities. Estimates depend on available data and are not appraisals or guarantees of sale price.
                  </p>
                  <p>
                    A licensed real estate professional who knows the sub-market pulls actual MLS comparables,
                    adjusts for condition and upgrades, and gives you a realistic range with a
                    positioning strategy - not just a number.
                  </p>
                </div>
              </div>

              <div className="border border-bone bg-ivory p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                  What Carlos Provides
                </p>
                <ul className="mt-6 space-y-4">
                  {WHAT_YOU_GET.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <BadgeCheck size={14} className="mt-0.5 flex-shrink-0 text-gold" />
                      <span className="font-sans text-sm leading-relaxed text-navy/70">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-bone pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-navy/70">
                  No listing commitment � No automated reports � No obligation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bridge: valuation -> listing distribution funnel */}
        <section className="border-t border-hairline bg-white py-12">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="font-sans text-base leading-relaxed text-navy/70">
              A comparative market analysis informs your pricing decision. We then connect that price position with property presentation, relevant buyer-agent outreach and a negotiation plan. MLS visibility and eligible syndication depend on the property, applicable rules and participating channels.
            </p>
            <a
              href="/sell"
              className="mt-5 inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-gold underline underline-offset-4 transition-colors hover:text-navy"
            >
              See how the listing system works 
            </a>
          </div>
        </section>

        <SellerNetCalculator sourcePage="home-value" />

        {/* Form */}
        <section className="bg-navy-deep py-16 md:py-24" id="valuation-form">
          <div className="mx-auto max-w-3xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                Confidential Valuation Request
              </p>
              <h2 className="mt-3 font-serif text-3xl text-white">
                Submit Your Property for a Free Review
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                Carlos reviews every submission personally. No listing commitment required.
              </p>
            </div>
            <SellerIntakeForm sourcePage="home-value" />
            <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
              <BadgeCheck size={14} className="text-gold" />
              Confidential � No commitment required � Equal Housing Opportunity
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-ivory py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold text-center">
              Common Questions
            </p>
            <h2 className="mt-5 text-center font-serif text-2xl text-navy-deep">
              Frequently asked about home valuations
            </h2>
            <div className="mt-10 space-y-6">
              {HOME_VALUE_FAQS.map(({ q, a }) => (
                <div key={q} className="border-t border-bone pt-6">
                  <h3 className="font-serif text-lg text-navy-deep">{q}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-navy/65">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journal crosslinks */}
        <section className="bg-white border-t border-hairline py-12">
          <div className="mx-auto max-w-3xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Further Reading</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="/journal/what-is-my-home-worth-south-florida-2026" className="block border border-hairline bg-ivory p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 mb-3">Market Analysis</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">What Is My South Florida Home Worth? A Seller's Pricing Guide for 2026</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the valuation guide </p>
              </a>
              <a href="/journal/when-to-list-south-florida-home-2026" className="block border border-hairline bg-ivory p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 mb-3">Market Analysis</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">When to List Your South Florida Home - Timing, Pricing, and the Cost of Waiting</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the timing guide </p>
              </a>
            </div>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
