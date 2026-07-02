import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { AGGREGATE_RATING } from "../data/reviews";
import { BadgeCheck, ChevronRight, Download } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LazyVideo } from "../components/LazyVideo";
import { SellerIntakeForm } from "../components/forms/SellerIntakeForm";
import { NeighborhoodMarketStats } from "../components/NeighborhoodMarketStats";
import { CityListingsSample } from "../components/CityListingsSample";
import { NearbyMarkets } from "../components/NearbyMarkets";
import { CONTACT, LEAD_MAGNETS } from "../constants";

const POMPANO_BEACH_FAQS = [
  {
    q: "What is driving Pompano Beach's market activity?",
    a: "Pompano Beach has seen sustained activity driven by a combination of coastal access, active development along its main corridors, and a property mix that spans beachfront, intracoastal, and single-family inland options. The market draws both seasonal buyers from the Northeast and Midwest and investor buyers targeting income-producing properties. Per Miami and South Florida REALTORS® MLS data, conditions vary by property type and proximity to water. Carlos provides a property-specific analysis as part of every seller strategy review.",
  },
  {
    q: "How do waterfront and intracoastal properties differ in positioning versus inland homes?",
    a: "Waterfront and intracoastal properties in Pompano Beach command a pricing premium and attract a more concentrated buyer profile — typically seasonal buyers, second-home purchasers, and investors who prioritize water access and lifestyle. Inland single-family homes draw a broader pool including primary residence buyers and value-focused investors. Each property type requires distinct MLS positioning and buyer-agent messaging. Carlos tailors the strategy to the specific property category.",
  },
  {
    q: "What buyer profiles target Pompano Beach?",
    a: "Pompano Beach attracts a diverse mix: seasonal buyers from the Northeast and Midwest, national investors seeking Broward County rental income, and international buyers — particularly from Latin America and Canada — who value the beach access and price points relative to Fort Lauderdale and Boca Raton. Carlos's network reaches all of these buyer types through the Miami and South Florida REALTORS® MLS, 200+ global portals in 19 languages, and a direct international referral pipeline.",
  },
  {
    q: "How does new development affect pricing of existing homes?",
    a: "Pompano Beach's active development corridor is expanding the inventory of new construction, which can influence buyer comparisons with existing resale properties. For existing home sellers, this means MLS positioning, condition, and pricing need to account for the competitive new-construction alternative. Carlos incorporates current development activity into the pricing and positioning strategy for every Pompano Beach seller review.",
  },
  {
    q: "What does the seller strategy review cover?",
    a: "A free, confidential session where Carlos reviews your property's type, condition, water proximity, and MLS positioning potential — alongside current market comparables and distribution strategy — with no listing commitment required. Submit the form below or contact Carlos directly via WhatsApp.",
  },
];

export default function SellPompanoBeachPage() {
  return (
    <>
      <Helmet>
        <title>Sell Your Home in Pompano Beach, FL | MLS Positioning & Buyer-Agent Activation | Carlos Uzcategui</title>
        <meta name="description" content="Pompano Beach, FL listing agent — MLS positioning, seasonal and investor buyer activation, coastal and intracoastal market strategy. Free strategy review. Carlos Uzcategui, FL SL705771." />
        <meta name="keywords" content="sell home Pompano Beach FL, Pompano Beach Florida listing agent, Pompano Beach real estate agent, sell house Pompano Beach Florida, Pompano Beach FL realtor, Broward County listing agent, Pompano Beach waterfront homes" />
        <link rel="canonical" href="https://homesprofessional.com/sell-pompano-beach" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/sell-pompano-beach" />
        <meta property="og:title" content="Sell Your Pompano Beach, FL Home | Professional MLS Positioning | Carlos Uzcategui" />
        <meta property="og:description" content="Professional seller representation in Pompano Beach, FL — MLS activation, seasonal and investor buyer-agent network, international distribution. Free confidential strategy review." />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sell Your Pompano Beach, FL Home | Carlos Uzcategui, FL SL705771" />
        <meta name="twitter:description" content="Professional MLS positioning and buyer-agent activation for Pompano Beach, FL home sellers. Free strategy review — no listing commitment." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>
      <JsonLd id="sell-pompano-beach-breadcrumb" data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Sell in South Florida", "item": "https://homesprofessional.com/sell-south-florida" },
            { "@type": "ListItem", "position": 3, "name": "Sell in Pompano Beach", "item": "https://homesprofessional.com/sell-pompano-beach" }
          ]
        }} />
      <JsonLd id="sell-pompano-beach-faq" data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": POMPANO_BEACH_FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        }} />
      <JsonLd id="sell-pompano-beach-agent" data={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Carlos Uzcategui — Pompano Beach FL Listing Agent",
          "url": "https://homesprofessional.com/sell-pompano-beach",
          "areaServed": { "@type": "City", "name": "Pompano Beach", "addressRegion": "FL", "postalCode": "33060", "addressCountry": "US" },
          "telephone": CONTACT.phoneUS,
          "email": CONTACT.email,
          "address": { "@type": "PostalAddress", "streetAddress": "15951 SW 41 St #700", "addressLocality": "Weston", "addressRegion": "FL", "postalCode": "33331", "addressCountry": "US" },
          "memberOf": { "@type": "Organization", "name": "United Realty Group" },
          "aggregateRating": AGGREGATE_RATING
        }} />
      <JsonLd id="sell-pompano-beach-service" data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Seller representation and MLS listing — Pompano Beach, FL",
          "serviceType": "Real estate listing and seller representation",
          "areaServed": { "@type": "City", "name": "Pompano Beach", "addressRegion": "FL", "addressCountry": "US" },
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Carlos Uzcategui",
            "url": "https://homesprofessional.com/sell-pompano-beach"
          },
          "url": "https://homesprofessional.com/sell-pompano-beach"
        }} />
      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep px-6 pt-20 pb-10 md:pt-28 md:pb-12 text-center sm:px-10">
          <LazyVideo eager src="/videos/luxury_waterfront_drone.mp4" className="absolute inset-0 h-full w-full object-cover opacity-[0.14] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep/80 pointer-events-none" />
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Pompano Beach, FL · Seller Advisory</p>
            <h1 className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}>
              Sell your Pompano Beach home with the reach<br />
              <em className="italic text-gold">of the world's largest local Realtor® network.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              Pompano Beach's coastal access, active development corridor, and mix of beach, intracoastal, and inland
              property types attract seasonal and investor buyers from across the country and internationally.
              Professional MLS positioning. Buyer-agent activation. Seasonal buyer pipeline.
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
                Get My Pompano Beach Home Value &amp; Strategy
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
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/45">
                5.0 · Free &amp; confidential · No listing commitment · Personal reply from Carlos
              </span>
            </div>

            <blockquote className="mx-auto mt-5 max-w-md border-l-2 border-gold/30 pl-4 text-left">
              <p className="font-sans text-sm italic leading-relaxed text-white/55">"Coastal Broward is a seasonal and investor market. Carlos's distribution strategy reached both domestic seasonal buyers and the international investor pool."</p>
              <footer className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/50">— Thomas E., Pompano Beach, FL</footer>
            </blockquote>

            <div className="mt-5 flex items-center justify-center gap-2">
              <a href={LEAD_MAGNETS.sellerNetSheet.url} download className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline">
                <Download size={11} />
                Or download the Seller's Net Sheet 2026
              </a>
            </div>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              United Realty Group · CLHMS · FL SL705771 · Office: Weston, FL 33331
            </p>
          </div>
        </section>

        {/* Market positioning */}
        <section className="bg-ivory py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Why Pompano Beach</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Coastal access, an active development corridor, and strong seasonal and investor buyer demand.
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/65">
              Pompano Beach spans a range of property types — beachfront and Intracoastal condos and single-family
              homes, inland residential neighborhoods, and an expanding new construction corridor. This breadth
              produces a correspondingly diverse buyer pool: seasonal buyers from the Northeast and Midwest who
              return consistently, investor buyers targeting Broward County income properties, and international
              buyers attracted by beach access at price points more accessible than Fort Lauderdale or Boca Raton.
              Each property type and price point requires a distinct positioning approach.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { label: "Property Mix", value: "Beach · Intracoastal · Single-Family", sub: "Diverse property types across price points — each with its own buyer profile and positioning strategy" },
                { label: "Buyer Profile", value: "Seasonal + Investor", sub: "National and international buyers — seasonal Northeast/Midwest demand and income-property investor interest" },
                { label: "Corridor", value: "Active Development", sub: "New construction expanding existing inventory — a relevant competitive factor for resale positioning" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white p-7">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold">{stat.label}</p>
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
                  Your Pompano Beach listing reaches every buyer,<br />
                  <em className="italic text-gold">everywhere they're looking.</em>
                </h2>
                <p className="mt-6 font-sans text-base leading-relaxed text-white/65">
                  Professional MLS activation through United Realty Group means your property enters the network of a full-service brokerage founded in 2002 — 3,500+ agents across 20 South Florida offices — not a portal, a professional infrastructure.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Miami and South Florida REALTORS® MLS — 93,000 member agents",
                    "Eligible syndication across 200+ global portals in 19 languages",
                    "United Realty Group — 3,500+ agents across 20 Florida offices",
                    "Seasonal buyer pipeline + national relocation network",
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
                  { label: "Strategy", text: "Pricing analysis specific to property type and proximity to water, beach, or new development corridors" },
                  { label: "Positioning", text: "Professional MLS activation through United Realty Group" },
                  { label: "Distribution", text: "Seasonal buyer pipeline + national relocation network" },
                  { label: "Negotiation", text: "Offer review, terms strategy, and closing coordination" },
                ].map((step) => (
                  <div key={step.label} className="flex gap-6 bg-navy p-6">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/70 w-24 flex-shrink-0 pt-0.5">{step.label}</span>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Pompano Beach Sellers Ask</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">Common questions.</h2>
            </div>
            <div className="divide-y divide-white/8">
              {POMPANO_BEACH_FAQS.map((faq) => (
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Pompano Beach Market Research</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="/journal/latin-american-buyers-south-florida-2026" className="block border border-hairline bg-white p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 mb-3">Buyer Intelligence</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">Latin American Buyers in South Florida 2026 — Where They're Looking and What They're Buying</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the market analysis →</p>
              </a>
              <a href="/sell-south-florida" className="block border border-hairline bg-white p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 mb-3">Seller Advisory</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">South Florida Seller Strategy — How MLS Distribution Works</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the full seller guide →</p>
              </a>
            </div>
          </div>
        </section>

        {/* Market snapshot — MIAMI REALTORS® April 2026 city report (src/data/cityMarketStats.ts) */}
        <NeighborhoodMarketStats city="Pompano Beach" />
        <CityListingsSample city="Pompano Beach" />
        <NearbyMarkets current="sell-pompano-beach" />

        {/* Confidential intake */}
        <section className="bg-navy-deep py-16 md:py-24" id="contact">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Pompano Beach Seller Review</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Request a private property positioning review.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                No listing commitment required. Carlos reviews every Pompano Beach submission personally before responding.
              </p>
            </div>
            <SellerIntakeForm sourcePage="sell-pompano-beach" />
            <div className="mt-6 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              <BadgeCheck size={14} className="text-gold" />
              Confidential · Licensed Professional · Equal Housing Opportunity
            </div>
          </div>
        </section>

        {/* Footer breadcrumb */}
        <section className="bg-ivory py-6 border-t border-hairline">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-sans text-xs text-ink-primary/40">
              <a href="/" className="hover:text-gold">Home</a>
              {" · "}
              <a href="/sell-south-florida" className="hover:text-gold">Sell in South Florida</a>
              {" · "}
              Pompano Beach, FL
            </p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
