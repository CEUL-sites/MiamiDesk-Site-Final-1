import { Helmet } from "react-helmet-async";
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
    body: "Share your address, property type, and timeline. Carlos reviews every submission personally — no automated reports, no scripts.",
  },
  {
    icon: TrendingUp,
    title: "MLS Comparable Analysis",
    body: "Active listings, recent closings, pending sales, and absorption rate for your specific submarket and property type — pulled from the Miami and South Florida REALTORS® MLS.",
  },
  {
    icon: Clock,
    title: "Private Consultation",
    body: "You receive a property-level positioning analysis and realistic price range — not a Zestimate. A real, market-specific review with no obligation to list.",
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
  "Absorption rate — how quickly similar properties are selling right now",
  "Price-per-square-foot range adjusted for condition, floor, view, and lot",
  "Competitive positioning recommendation against current active inventory",
  "Days-on-market risk assessment at various price points",
  "Private consultation — no obligation to list, no pressure",
];

export default function HomeValuePage() {
  return (
    <>
      <Helmet>
        <title>What Is My South Florida Home Worth? Free Professional Valuation | HomesProfessional.com</title>
        <meta
          name="description"
          content="Free professional home valuation from a licensed South Florida REALTOR® — a real MLS analysis, not an algorithm. Carlos Uzcategui, FL SL705771."
        />
        <meta
          name="keywords"
          content="what is my home worth miami, free home valuation south florida, coral gables home value, weston home value, miami beach property value, brickell condo value, miami home estimate, south florida property valuation, sell home miami"
        />
        <link rel="canonical" href="https://homesprofessional.com/home-value" />
        <meta property="og:title" content="What Is My South Florida Home Worth? | Free Professional Valuation" />
        <meta property="og:description" content="Free MLS-based home valuation from a licensed South Florida REALTOR® with 25 years of market experience. Not an algorithm — a real analysis for your property." />
        <meta property="og:url" content="https://homesprofessional.com/home-value" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="What Is My South Florida Home Worth? Free Professional Valuation" />
        <meta name="twitter:description" content="Free MLS-based home valuation from a licensed South Florida REALTOR® — not an algorithm. 25 years of market experience. No obligation." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How much is my South Florida home worth?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "South Florida home values vary significantly by neighborhood, property type, condition, and current absorption rates. A licensed REALTOR® provides a Comparative Market Analysis (CMA) using live MLS data to give you an accurate, property-specific valuation — not an algorithm estimate.",
              },
            },
            {
              "@type": "Question",
              name: "Is an online home value estimate accurate in Miami?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Automated valuation tools (Zestimate, Redfin estimate) have a median error rate of 7–14% in South Florida's luxury market, which can represent $200,000–$500,000 on a $2M property. A professional CMA from a local REALTOR® accounts for submarket nuance, condition, upgrades, floor premiums, and current absorption rates.",
              },
            },
            {
              "@type": "Question",
              name: "What is a Comparative Market Analysis (CMA) in real estate?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "A CMA is a professional evaluation by a licensed REALTOR® comparing your property to recently sold, active, and pending listings of similar properties nearby. It accounts for location, size, condition, upgrades, and current demand to determine a realistic market value range — far more accurate than public records-based AVMs.",
              },
            },
            {
              "@type": "Question",
              name: "Is the home valuation request really free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Carlos Uzcategui provides a confidential market analysis at no cost, with no obligation to list. Submit your property address and details — Carlos reviews every request personally and responds directly.",
              },
            },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Free South Florida Home Valuation",
          provider: { "@id": "https://homesprofessional.com/#agent" },
          serviceType: "Comparative Market Analysis",
          description: "Free, professional home valuation using Miami and South Florida REALTORS® MLS data. No obligation to list.",
          areaServed: "South Florida",
          url: "https://homesprofessional.com/home-value",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
            description: "Free comparative market analysis — no listing commitment required.",
          },
        })}</script>
      </Helmet>

      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="bg-navy-deep px-6 py-20 md:py-28 text-center sm:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            Free · Confidential · Professional
          </p>
          <h1
            className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white"
            style={{ fontSize: "clamp(2rem, 5.5vw, 3.4rem)" }}
          >
            What Is Your South Florida<br />
            <em className="not-italic italic text-gold">Property Worth Today?</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
            Not an algorithm. A real MLS-based analysis from a licensed REALTOR® with
            25 years in South Florida. Carlos reviews and answers
            every request himself.
          </p>
          <a
            href="#valuation-form"
            className="mt-8 inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
          >
            Request My Free Valuation
          </a>
          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
            {CONTACT.licenseDisplay} · United Realty Group · 25 Years Licensed
          </p>
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
            <p className="mb-5 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-navy/40">
              Service areas — Miami-Dade · Broward · Palm Beach
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {NEIGHBORHOODS.map((n) => (
                <span
                  key={n}
                  className="border border-bone px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-navy/60"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Why not Zestimate — two-col */}
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
                    Automated valuation models are trained on broad datasets and cannot account for
                    South Florida's hyper-local dynamics: the premium for a Coral Gables street over
                    the next block, the Brickell condo floor premium, or a Weston lot backing to a
                    golf course in a specific HOA community.
                  </p>
                  <p>
                    In the Miami-Dade luxury segment, the median AVM error rate can represent
                    $200,000–$500,000 in either direction on a $2M–$4M property. Pricing too low
                    means leaving equity on the table. Pricing too high means days-on-market
                    accumulation — and the stigma that follows.
                  </p>
                  <p>
                    A licensed REALTOR® who knows the sub-market pulls actual MLS comparables,
                    adjusts for condition and upgrades, and gives you a realistic range with a
                    positioning strategy — not just a number.
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
                <p className="mt-6 border-t border-bone pt-5 font-mono text-[8px] uppercase tracking-[0.14em] text-navy/35">
                  No listing commitment · No automated reports · No obligation
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bridge: valuation -> listing distribution funnel */}
        <section className="border-t border-hairline bg-white py-12">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="font-sans text-base leading-relaxed text-navy/70">
              A valuation tells you what your home is worth. Selling at that number is a
              distribution question — your listing in front of the 93,000 member agents who
              search the Miami MLS for their buyers every day, in South Florida and abroad.
            </p>
            <a
              href="/sell-south-florida"
              className="mt-5 inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-gold underline underline-offset-4 transition-colors hover:text-navy"
            >
              See how the listing system works →
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
            <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              <BadgeCheck size={14} className="text-gold" />
              Confidential · No commitment required · Equal Housing Opportunity
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
              {[
                {
                  q: "How accurate is a professional CMA compared to Zillow?",
                  a: "A CMA prepared by a local REALTOR® accounts for submarket nuance, recent condition-adjusted comparables, and current absorption data that automated tools cannot access. In South Florida's luxury segment, the practical gap is often six figures.",
                },
                {
                  q: "Does requesting a valuation mean I have to list with Carlos?",
                  a: "No. The valuation is free and carries no obligation. Many sellers use it to understand their position before making a decision about timing. Carlos reviews every submission personally — it is a professional consultation, not a sales call.",
                },
                {
                  q: "How long does the valuation take?",
                  a: "Carlos responds personally to every request. For properties in active submarkets with good comparable data, the analysis can be prepared quickly. For unique properties in thin markets, slightly more time allows for a more rigorous analysis.",
                },
                {
                  q: "Do you serve areas outside Miami-Dade?",
                  a: "Yes. Carlos serves the full Miami and South Florida REALTORS® MLS footprint — Miami-Dade, Broward, and Palm Beach counties — through United Realty Group.",
                },
              ].map(({ q, a }) => (
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
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 mb-3">Market Analysis</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">What Is My South Florida Home Worth? A Seller's Pricing Guide for 2026</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the valuation guide →</p>
              </a>
              <a href="/journal/when-to-list-south-florida-home-2026" className="block border border-hairline bg-ivory p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 mb-3">Market Analysis</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">When to List Your South Florida Home — Timing, Pricing, and the Cost of Waiting</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the timing guide →</p>
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
