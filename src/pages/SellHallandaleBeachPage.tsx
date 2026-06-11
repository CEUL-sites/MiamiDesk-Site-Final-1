import { Helmet } from "react-helmet-async";
import { BadgeCheck, ChevronRight, Download } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LazyVideo } from "../components/LazyVideo";
import { SellerIntakeForm } from "../components/forms/SellerIntakeForm";
import { NeighborhoodMarketStats } from "../components/NeighborhoodMarketStats";
import { CONTACT, LEAD_MAGNETS } from "../constants";

const HALLANDALE_BEACH_FAQS = [
  {
    q: "Who buys in Hallandale Beach?",
    a: "Hallandale Beach has one of the highest concentrations of international buyer activity in South Broward — particularly buyers from South America and Europe who seek condo-style living with beach and amenity access. Seasonal buyers from the Northeast and Midwest are also consistently active in the market. The city's position between Miami-Dade and core Broward County gives it broad appeal across multiple buyer profiles. Carlos's international referral network directly reaches these buyer pools through 437+ agreements in 75+ countries.",
  },
  {
    q: "How does the condo-heavy inventory affect pricing and days on market?",
    a: "Hallandale Beach's inventory is dominated by condominiums, which means pricing and days on market are sensitive to building-specific factors: floor, unit type, view, building financials, special assessments, and HOA reserves. Two identical-sized units in different buildings — or on different floors of the same building — can carry meaningfully different values. Per Miami and South Florida REALTORS® MLS data, building-level comparables are the correct analytical unit for pricing. Carlos reviews these specifics for every seller.",
  },
  {
    q: "How do international buyers approach Hallandale Beach specifically?",
    a: "International buyers — particularly from Venezuela, Colombia, Brazil, Argentina, and Western Europe — view Hallandale Beach as a gateway market: coastal access, established amenity infrastructure, and positioning between two major metro areas at price points that can be more accessible than Miami Beach or Fort Lauderdale Beach. The condo format suits buyers seeking a turnkey South Florida base. Carlos's network includes direct referral pipelines from South American and European buyer markets through the association's 200+ global portals and 19-language syndication.",
  },
  {
    q: "What seasonal patterns affect Hallandale Beach sales?",
    a: "Hallandale Beach follows South Florida's broader seasonal rhythm — with heightened buyer activity in the fall-through-spring window when seasonal residents and snowbirds are active in the region. International buyer activity can be less seasonal and more calendar-driven by source-country conditions. Listing timing relative to these patterns is part of the strategy discussion. Carlos provides a timing recommendation as part of the seller strategy review.",
  },
  {
    q: "What does the seller strategy review cover?",
    a: "A free, confidential session where Carlos reviews your building, floor, unit type, view, and current building financial status — alongside MLS comparables and distribution strategy — with no listing commitment required. Submit the form below or contact Carlos directly via WhatsApp.",
  },
];

export default function SellHallandaleBeachPage() {
  return (
    <>
      <Helmet>
        <title>Sell Your Home in Hallandale Beach, FL | MLS Positioning & International Buyer Activation | Carlos Uzcategui</title>
        <meta name="description" content="Hallandale Beach, FL listing agent — MLS positioning, international and seasonal buyer activation, condo-specific market strategy. Free strategy review. Carlos Uzcategui, FL SL705771." />
        <meta name="keywords" content="sell condo Hallandale Beach FL, Hallandale Beach Florida listing agent, Hallandale Beach real estate agent, sell house Hallandale Beach Florida, Hallandale Beach FL realtor, South Broward listing agent, Hallandale Beach international buyers" />
        <link rel="canonical" href="https://homesprofessional.com/sell-hallandale-beach" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/sell-hallandale-beach" />
        <meta property="og:title" content="Sell Your Hallandale Beach, FL Home | Professional MLS Positioning | Carlos Uzcategui" />
        <meta property="og:description" content="Professional seller representation in Hallandale Beach, FL — MLS activation, international buyer pipeline, condo-specific positioning. Free confidential strategy review." />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sell Your Hallandale Beach, FL Home | Carlos Uzcategui, FL SL705771" />
        <meta name="twitter:description" content="Professional MLS positioning and international buyer-agent activation for Hallandale Beach, FL sellers. Free strategy review — no listing commitment." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Sell in South Florida", "item": "https://homesprofessional.com/sell-south-florida" },
            { "@type": "ListItem", "position": 3, "name": "Sell in Hallandale Beach", "item": "https://homesprofessional.com/sell-hallandale-beach" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": HALLANDALE_BEACH_FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Carlos Uzcategui — Hallandale Beach FL Listing Agent",
          "url": "https://homesprofessional.com/sell-hallandale-beach",
          "areaServed": { "@type": "City", "name": "Hallandale Beach", "addressRegion": "FL", "postalCode": "33009", "addressCountry": "US" },
          "telephone": CONTACT.phoneUS,
          "email": CONTACT.email,
          "address": { "@type": "PostalAddress", "streetAddress": "15951 SW 41 St #700", "addressLocality": "Weston", "addressRegion": "FL", "postalCode": "33331", "addressCountry": "US" },
          "memberOf": { "@type": "Organization", "name": "United Realty Group" },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "15",
            "bestRating": "5",
            "worstRating": "1"
          }
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep px-6 pt-20 pb-10 md:pt-28 md:pb-12 text-center sm:px-10">
          <LazyVideo eager src="/videos/advisor-brand.mp4" className="absolute inset-0 h-full w-full object-cover opacity-[0.14] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep/80 pointer-events-none" />
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Hallandale Beach, FL · Seller Advisory</p>
            <h1 className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}>
              Sell your Hallandale Beach home with the reach<br />
              <em className="not-italic italic text-gold">of the world's largest local Realtor® network.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              Hallandale Beach's international buyer concentration, condo-heavy market, and position between
              Miami-Dade and core Broward County require a listing agent with direct access to the international
              buyer pipelines that drive this market. Professional MLS positioning. International buyer activation.
              Building-specific pricing strategy.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a href="#contact" className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90">
                Request a Free Strategy Review
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-white/20 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white">
                WhatsApp Carlos
              </a>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2">
              <a href={LEAD_MAGNETS.sellerNetSheet.url} download className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline">
                <Download size={11} />
                Download Seller's Net Sheet 2026
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Why Hallandale Beach</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              South Broward's international buyer concentration, positioned between two major county markets.
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/65">
              Hallandale Beach occupies a strategically distinct position in South Broward — within reach of both
              Miami-Dade and core Broward amenities, with a beach address and a condo-dominated inventory that
              draws a concentrated international buyer pool. South American buyers from Venezuela, Colombia, Brazil,
              and Argentina, alongside European buyers, have established Hallandale Beach as a consistent
              international acquisition target. The market's condo-heavy structure means building-level factors —
              floor, view, unit type, HOA financials — are central to every pricing and positioning decision.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { label: "Buyer Profile", value: "International + Seasonal", sub: "South American and European buyer presence alongside seasonal Northeast/Midwest demand" },
                { label: "Location", value: "South Broward / Both-County Access", sub: "Positioned between Miami-Dade and core Broward — accessible to both county markets" },
                { label: "Market Type", value: "Condo-Heavy / Amenity-Rich Communities", sub: "Building-specific factors drive pricing — floor, view, unit type, and HOA financials matter" },
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
                  Your Hallandale Beach listing reaches every buyer,<br />
                  <em className="not-italic italic text-gold">everywhere they're looking.</em>
                </h2>
                <p className="mt-6 font-sans text-base leading-relaxed text-white/65">
                  Professional MLS activation through United Realty Group means your property enters the network of Florida's #1 brokerage by closed homes — 3,500+ agents across 20 South Florida offices — not a portal, a professional infrastructure.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Miami and South Florida REALTORS® MLS — 93,000 member agents",
                    "Eligible syndication across 200+ global portals in 19 languages",
                    "United Realty Group — 3,500+ agents across 20 Florida offices",
                    "International buyer pipeline + seasonal relocation network",
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
                  { label: "Strategy", text: "Pricing analysis specific to building, floor, unit type, view, and HOA financial status" },
                  { label: "Positioning", text: "Professional MLS activation through United Realty Group" },
                  { label: "Distribution", text: "International buyer pipeline + seasonal relocation network" },
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Hallandale Beach Sellers Ask</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">Common questions.</h2>
            </div>
            <div className="divide-y divide-white/8">
              {HALLANDALE_BEACH_FAQS.map((faq) => (
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Hallandale Beach Market Research</p>
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

        {/* Live market snapshot — Bridge IDX via city-stats */}
        <NeighborhoodMarketStats city="Hallandale Beach" />

        {/* Confidential intake */}
        <section className="bg-navy-deep py-16 md:py-24" id="contact">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Hallandale Beach Seller Review</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Request a private property positioning review.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                No listing commitment required. Carlos reviews every Hallandale Beach submission personally before responding — typically within one business day.
              </p>
            </div>
            <SellerIntakeForm />
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
              Hallandale Beach, FL
            </p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
