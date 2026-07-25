import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { AGGREGATE_RATING } from "../data/reviews";
import { BadgeCheck, ChevronRight, Download } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { DesktopStickyCTA } from "../components/DesktopStickyCTA";
import { ExitIntentModal } from "../components/ExitIntentModal";
import { LazyVideo } from "../components/LazyVideo";
import { HeroReachBar } from "../components/HeroReachBar";
import { SellerIntakeForm } from "../components/forms/SellerIntakeForm";
import { NeighborhoodMarketStats } from "../components/NeighborhoodMarketStats";
import { CityListingsSample } from "../components/CityListingsSample";
import { NearbyMarkets } from "../components/NearbyMarkets";
import { CONTACT, LEAD_MAGNETS } from "../constants";

const CORAL_SPRINGS_FAQS = [
  {
    q: "What is the current home market like in Coral Springs, FL?",
    a: "Coral Springs has consistently attracted demand from families prioritizing Broward County's top-rated school districts. Per Miami and South Florida REALTORS® MLS data, pricing varies by community, lot size, build year, and school zone proximity. Carlos provides a community-specific pricing analysis and CMA as part of every seller strategy review.",
  },
  {
    q: "How long does it take to sell a home in Coral Springs?",
    a: "Coral Springs homes in school-priority corridors with competitive pricing have typically moved in weeks rather than months in active market cycles. Properties at higher price points or with unusual configurations may carry longer exposure periods. Carlos provides a neighborhood-specific timeline estimate — this is not a guarantee of outcome.",
  },
  {
    q: "Which Coral Springs communities have the strongest buyer demand?",
    a: "Communities in the Eagle Trace, Heron Bay, Wyndham Lakes, and similar corridors with A-rated school access, well-maintained HOAs, and proximity to the Sawgrass Expressway consistently attract deep buyer pools. School zone assignment is often a primary filter for Coral Springs buyers — Carlos assesses this as part of the pricing and positioning strategy.",
  },
  {
    q: "What types of buyers are most active in Coral Springs?",
    a: "Coral Springs attracts primarily family-oriented buyers — domestic relocators, South Florida move-up buyers, and Latin American families seeking established suburban infrastructure. The city's bilingual service environment and school quality make it a consistent destination for Venezuelan, Colombian, and Brazilian families relocating within South Florida.",
  },
  {
    q: "What is the seller strategy review?",
    a: "A free, confidential session where Carlos reviews your property, its MLS positioning potential, current market comparables, and distribution strategy — with no listing commitment required. Submit the form below or contact Carlos directly via WhatsApp.",
  },
];

export default function SellCoralSpringsPage() {
  return (
    <>
      <Helmet>
        <title>Sell Your Home in Coral Springs, FL | MLS Positioning & Buyer-Agent Activation | Carlos Uzcategui</title>
        <meta name="description" content="Coral Springs, FL listing agent — MLS positioning, buyer-agent activation, school-zone expertise. Free strategy review. Carlos Uzcategui, FL SL705771." />
        <meta name="keywords" content="sell home Coral Springs FL, Coral Springs listing agent, Coral Springs real estate agent, sell house Coral Springs Florida, Coral Springs FL realtor, Broward County listing agent, Coral Springs gated homes" />
        <link rel="canonical" href="https://homesprofessional.com/sell-coral-springs" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/sell-coral-springs" />
        <meta property="og:title" content="Sell Your Coral Springs, FL Home | Professional MLS Positioning | Carlos Uzcategui" />
        <meta property="og:description" content="Professional seller representation in Coral Springs, FL — MLS activation, school-zone positioning, and buyer-agent network access. Free confidential strategy review." />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sell Your Coral Springs, FL Home | Carlos Uzcategui, FL SL705771" />
        <meta name="twitter:description" content="Professional MLS positioning and buyer-agent activation for Coral Springs, FL home sellers. Free strategy review — no listing commitment." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>
      <JsonLd id="sell-coral-springs-breadcrumb" data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Sell in South Florida", "item": "https://homesprofessional.com/sell-south-florida" },
            { "@type": "ListItem", "position": 3, "name": "Sell in Coral Springs", "item": "https://homesprofessional.com/sell-coral-springs" }
          ]
        }} />
      <JsonLd id="sell-coral-springs-faq" data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": CORAL_SPRINGS_FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        }} />
      <JsonLd id="sell-coral-springs-agent" data={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Carlos Uzcategui — Coral Springs FL Listing Agent",
          "url": "https://homesprofessional.com/sell-coral-springs",
          "areaServed": { "@type": "City", "name": "Coral Springs", "addressRegion": "FL", "postalCode": "33065", "addressCountry": "US" },
          "telephone": CONTACT.phoneUS,
          "email": CONTACT.email,
          "address": { "@type": "PostalAddress", "streetAddress": "15951 SW 41 St #700", "addressLocality": "Weston", "addressRegion": "FL", "postalCode": "33331", "addressCountry": "US" },
          "memberOf": { "@type": "Organization", "name": "United Realty Group" },
          "aggregateRating": AGGREGATE_RATING
        }} />
      <JsonLd id="sell-coral-springs-service" data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Seller representation and MLS listing — Coral Springs, FL",
          "serviceType": "Real estate listing and seller representation",
          "areaServed": { "@type": "City", "name": "Coral Springs", "addressRegion": "FL", "addressCountry": "US" },
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Carlos Uzcategui",
            "url": "https://homesprofessional.com/sell-coral-springs"
          },
          "url": "https://homesprofessional.com/sell-coral-springs"
        }} />
      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep px-6 pt-20 pb-10 md:pt-28 md:pb-12 text-center sm:px-10">
          <LazyVideo idle src="/videos/matterport_tour_global.mp4" className="absolute inset-0 h-full w-full object-cover opacity-[0.14] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep/80 pointer-events-none" />
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Coral Springs, FL · Seller Advisory</p>
            <h1 className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}>
              Sell your Coral Springs home with the reach<br />
              <em className="italic text-gold">of the world's largest local Realtor® association.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              Coral Springs' A-rated schools, planned communities, and sustained family buyer demand require
              a listing agent who understands how school-zone positioning affects buyer pool depth and pricing strategy.
              Professional MLS positioning. Buyer-agent activation. International distribution.
            </p>
            <ul className="mx-auto mt-7 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
              {[
                "MLS-based pricing & positioning",
                "Your most likely buyer — local & global",
                "A clear net-proceeds estimate",
              ].map((item) => (
                <li key={item} className="inline-flex items-center gap-2 font-sans text-[13px] text-white/75">
                  <BadgeCheck size={15} className="flex-shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="#contact" className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90">
                Get My Coral Springs Home Value &amp; Strategy
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/20 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white">
                WhatsApp Carlos
              </a>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5">
              <span className="flex gap-0.5" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#B08D57">
                    <path d="M6 0l1.35 4.15H12L8.32 6.72 9.67 10.87 6 8.3 2.33 10.87 3.68 6.72 0 4.15h4.65z" />
                  </svg>
                ))}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                5.0 · Free &amp; confidential · No listing commitment · Personal reply from Carlos
              </span>
            </div>

            <blockquote className="mx-auto mt-5 max-w-md border-l-2 border-gold/30 pl-4 text-left">
              <p className="font-sans text-sm italic leading-relaxed text-white/55">"School zone positioning made all the difference. Carlos knew exactly which buyers were active in our section of Coral Springs and how to reach them."</p>
              <footer className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-gold/50">— Sandra V., Coral Springs, FL</footer>
            </blockquote>

            <div className="mt-5 flex items-center justify-center gap-2">
              <a href={LEAD_MAGNETS.sellerNetSheet.url} download className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline">
                <Download size={11} />
                Or download the Seller's Net Sheet 2026
              </a>
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
              United Realty Group · CLHMS · FL SL705771 · 25 Years Licensed in Florida · Office: Weston, FL 33331
            </p>
            <HeroReachBar />
          </div>
        </section>

        {/* Market positioning */}
        <section className="bg-ivory py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Why Coral Springs</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              A master-planned Broward community with consistent school-driven family buyer demand.
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/65">
              Coral Springs was purpose-planned as a family community and that character has sustained its demand through multiple market cycles.
              The city's A-rated Broward County schools, gated and non-gated community variety, and excellent Sawgrass Expressway access
              draw both domestic move-up buyers and Latin American families specifically seeking established suburban infrastructure.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { label: "Buyer Profile", value: "Family-Oriented", sub: "Domestic move-up + LATAM families prioritizing school access" },
                { label: "School District", value: "A-Rated Schools", sub: "Broward County — consistent academic performance" },
                { label: "Community Type", value: "Planned & Gated", sub: "Diverse options from established to master-planned sections" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white p-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">{stat.label}</p>
                  <p className="mt-3 font-serif text-2xl text-navy-deep">{stat.value}</p>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-ink-primary/50">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Distribution advantage */}
        <section className="bg-navy-deep py-14 md:py-20 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">The Network Advantage</p>
                <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
                  Your Coral Springs listing reaches every buyer,<br />
                  <em className="italic text-gold">everywhere they're looking.</em>
                </h2>
                <p className="mt-6 font-sans text-base leading-relaxed text-white/65">
                  Professional MLS activation through United Realty Group means your property enters the network of a full-service brokerage founded in 2002 — 3,500+ agents across 20 Florida offices — not a portal, a professional infrastructure.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Miami and South Florida REALTORS® MLS — 93,000 member agents",
                    "Eligible syndication across 200+ global portals in 19 languages",
                    "United Realty Group — 3,500+ agents across 20 Florida offices",
                    "Direct LATAM and European buyer pipeline",
                    "437+ international agreements across 75+ countries",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 font-sans text-sm text-white/70">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-px border border-white/10">
                {[
                  { label: "Strategy", text: "Pricing analysis + CMA specific to your Coral Springs neighborhood and school zone" },
                  { label: "Positioning", text: "Professional MLS activation through United Realty Group" },
                  { label: "Distribution", text: "Family buyer-agent outreach + LATAM referral network" },
                  { label: "Negotiation", text: "Offer review, terms strategy, and closing coordination" },
                ].map((step) => (
                  <div key={step.label} className="flex gap-6 bg-navy p-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/70 w-24 flex-shrink-0 pt-0.5">{step.label}</span>
                    <p className="font-sans text-sm text-white/65">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gold/20 bg-navy py-12 md:py-20 text-white">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Coral Springs Sellers Ask</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">Common questions.</h2>
            </div>
            <div className="divide-y divide-white/8">
              {CORAL_SPRINGS_FAQS.map((faq) => (
                <div key={faq.q} className="py-6">
                  <p className="font-serif text-lg text-white leading-snug mb-3">{faq.q}</p>
                  <p className="font-sans text-[0.9rem] leading-relaxed text-white/65">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Journal crosslinks */}
        <section className="bg-ivory py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Coral Springs Market Research</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="/journal/selling-coral-springs-home-2026" className="block border border-hairline bg-white p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 mb-3">Seller Strategy</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">Selling Your Coral Springs Home — How School-Zone Positioning Drives Buyer Demand</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the seller guide →</p>
              </a>
              <a href="/journal/hoa-impact-home-sale-south-florida-2026" className="block border border-hairline bg-white p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 mb-3">Seller Strategy</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">HOA Financials and Your Home's Sale Price — What Coral Springs Sellers Need to Know</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the HOA guide →</p>
              </a>
            </div>
          </div>
        </section>

        {/* Market snapshot — MIAMI REALTORS® April 2026 city report (src/data/cityMarketStats.ts) */}
        <NeighborhoodMarketStats city="Coral Springs" />
        <CityListingsSample city="Coral Springs" />
        <NearbyMarkets current="sell-coral-springs" />

        {/* Confidential intake */}
        <section className="bg-navy-deep py-16 md:py-24" id="contact">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Coral Springs Seller Review</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Request a private property positioning review.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                No listing commitment required. Carlos reviews every Coral Springs submission personally before responding.
              </p>
            </div>
            <SellerIntakeForm sourcePage="sell-coral-springs" />
            <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
              <BadgeCheck size={14} className="text-gold" />
              Confidential · Licensed Professional · Equal Housing Opportunity
            </div>
          </div>
        </section>

        {/* Footer breadcrumb */}
        <section className="bg-ivory py-6 border-t border-hairline">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-sans text-xs text-ink-primary/70">
              <a href="/" className="hover:text-gold">Home</a>
              {" · "}
              <a href="/sell-south-florida" className="hover:text-gold">Sell in South Florida</a>
              {" · "}
              Coral Springs, FL
            </p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
        <DesktopStickyCTA />
        <ExitIntentModal />
      </main>
    </>
  );
}
