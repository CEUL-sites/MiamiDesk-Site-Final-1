import { Helmet } from "react-helmet-async";
import { BadgeCheck, ChevronRight, Download } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LazyVideo } from "../components/LazyVideo";
import { HeroReachBar } from "../components/HeroReachBar";
import { SellerIntakeForm } from "../components/forms/SellerIntakeForm";
import { NeighborhoodMarketStats } from "../components/NeighborhoodMarketStats";
import { CityListingsSample } from "../components/CityListingsSample";
import { NearbyMarkets } from "../components/NearbyMarkets";
import { CONTACT, LEAD_MAGNETS } from "../constants";

const BRICKELL_FAQS = [
  {
    q: "What is the current condominium market in Brickell, Miami?",
    a: "Brickell's condominium market spans luxury high-rise towers in the financial district through mid-market urban units, with significant variation by building, floor, view, and amenity tier. Per Miami and South Florida REALTORS® MLS data, pricing ranges widely across the market. Carlos provides a no-cost comparable analysis specific to your building and unit as part of every seller strategy review.",
  },
  {
    q: "Are Brickell condominiums attractive to international investors?",
    a: "Yes — Brickell has been one of the most consistent targets for Latin American, European, and North American institutional capital in South Florida. The financial district location, walkable urban core, and proximity to Miami Beach and the airport make Brickell a primary destination for investors seeking U.S. real estate exposure in a globally recognized urban market.",
  },
  {
    q: "What should I know about short-term rental restrictions in Brickell?",
    a: "Short-term rental eligibility (Airbnb, VRBO, etc.) varies significantly by building in Brickell — and affects buyer pool depth. Some buildings explicitly allow short-term rentals, some restrict them, and HOA rules can override condo documents. Carlos reviews your specific building's rental eligibility as part of the listing strategy to ensure accurate representation to buyers.",
  },
  {
    q: "What are FIRPTA considerations for foreign sellers in Brickell?",
    a: "Foreign sellers of U.S. property are generally subject to FIRPTA withholding (Foreign Investment in Real Property Tax Act), which requires the buyer to withhold a percentage of the gross sales price and remit it to the IRS. Carlos works with licensed closing attorneys who routinely handle FIRPTA compliance for international sellers — this is a standard part of the Brickell transaction process. Carlos is not a tax or legal advisor; consult a qualified professional for your specific situation.",
  },
  {
    q: "What is the seller strategy review?",
    a: "A free, confidential session where Carlos reviews your property, its MLS positioning potential, current market comparables, and distribution strategy — with no listing commitment required. Submit the form below or contact Carlos directly via WhatsApp.",
  },
];

export default function SellBrickellPage() {
  return (
    <>
      <Helmet>
        <title>Sell Your Brickell Condo | Miami MLS Positioning & International Activation | Carlos Uzcategui</title>
        <meta name="description" content="Brickell condo listing agent, Miami — MLS positioning, international investor activation, buyer-agent network. Free strategy review. FL SL705771." />
        <meta name="keywords" content="sell condo Brickell Miami, Brickell listing agent, Brickell real estate agent, sell Brickell condo Miami, Brickell FL realtor, Miami-Dade listing agent, Brickell luxury condo for sale" />
        <link rel="canonical" href="https://homesprofessional.com/sell-brickell" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/sell-brickell" />
        <meta property="og:title" content="Sell Your Brickell Condo | Professional MLS Positioning | Carlos Uzcategui" />
        <meta property="og:description" content="Professional seller representation in Brickell, Miami — MLS activation, international investor outreach, and global portal distribution. Free confidential strategy review." />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sell Your Brickell Condo | Carlos Uzcategui, FL SL705771" />
        <meta name="twitter:description" content="Professional MLS positioning and buyer-agent activation for Brickell, Miami condo sellers. Free strategy review — no listing commitment." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Sell in South Florida", "item": "https://homesprofessional.com/sell-south-florida" },
            { "@type": "ListItem", "position": 3, "name": "Sell in Brickell", "item": "https://homesprofessional.com/sell-brickell" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": BRICKELL_FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Carlos Uzcategui — Brickell Miami Listing Agent",
          "url": "https://homesprofessional.com/sell-brickell",
          "areaServed": { "@type": "City", "name": "Brickell", "addressRegion": "FL", "postalCode": "33131", "addressCountry": "US" },
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
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Seller representation and MLS listing — Brickell, FL",
          "serviceType": "Real estate listing and seller representation",
          "areaServed": { "@type": "City", "name": "Brickell", "addressRegion": "FL", "addressCountry": "US" },
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Carlos Uzcategui",
            "url": "https://homesprofessional.com/sell-brickell"
          },
          "url": "https://homesprofessional.com/sell-brickell"
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep px-6 pt-20 pb-10 md:pt-28 md:pb-12 text-center sm:px-10">
          <LazyVideo eager src="/videos/digital_twin_exposure.mp4" className="absolute inset-0 h-full w-full object-cover opacity-[0.14] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep/80 pointer-events-none" />
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Brickell, Miami · Seller Advisory</p>
            <h1 className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}>
              Sell your Brickell condo with the reach<br />
              <em className="not-italic italic text-gold">of the world's largest local Realtor® network.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              Brickell's urban luxury market and high international investor demand require a listing agent
              who activates both the local professional network and the global capital flow that defines Miami's financial district.
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
                Get My Brickell Home Value &amp; Strategy
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
              <p className="font-sans text-sm italic leading-relaxed text-white/55">"Selling in Brickell requires someone who knows the investor buyer. Carlos's positioning advice and distribution strategy reflected that expertise from the first conversation."</p>
              <footer className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/50">— J. Padron, Brickell, FL</footer>
            </blockquote>

            <div className="mt-5 flex items-center justify-center gap-2">
              <a href={LEAD_MAGNETS.sellerNetSheet.url} download className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline">
                <Download size={11} />
                Or download the Seller's Net Sheet 2026
              </a>
            </div>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              United Realty Group · CLHMS · FL SL705771 · 25 Years Licensed in Florida · Office: Weston, FL 33331
            </p>
            <HeroReachBar />
          </div>
        </section>

        {/* Market positioning */}
        <section className="bg-ivory py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Why Brickell</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Miami's financial district — a consistent target for domestic and international capital.
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/65">
              Brickell's urban walkability, luxury tower inventory, and positioning at the intersection of
              Latin American, European, and North American capital flows make it one of the most reliably
              internationalized real estate markets in South Florida.
              The presence of major financial institutions, direct airport access, and proximity to Miami Beach
              sustain investor demand across economic cycles.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { label: "Buyer Profile", value: "International + Investor", sub: "Latin American, European, and North American capital flows" },
                { label: "Property Type", value: "Urban Luxury High-Rise", sub: "Financial district towers, walkable urban core" },
                { label: "Market Driver", value: "Capital Preservation", sub: "Global investors seeking U.S. real estate exposure" },
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
                  Your Brickell listing reaches every buyer,<br />
                  <em className="not-italic italic text-gold">everywhere they're looking.</em>
                </h2>
                <p className="mt-6 font-sans text-base leading-relaxed text-white/65">
                  Professional MLS activation through United Realty Group means your property enters the network of a full-service brokerage founded in 2002 — 3,500+ agents across 20 South Florida offices — not a portal, a professional infrastructure.
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
                  { label: "Strategy", text: "Pricing analysis + CMA specific to your Brickell building and unit tier" },
                  { label: "Positioning", text: "Professional MLS activation through United Realty Group" },
                  { label: "Distribution", text: "International investor outreach + buyer-agent network" },
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Brickell Sellers Ask</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">Common questions.</h2>
            </div>
            <div className="divide-y divide-white/8">
              {BRICKELL_FAQS.map((faq) => (
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Brickell Market Research</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="/journal/selling-brickell-condo-2026" className="block border border-hairline bg-white p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 mb-3">Seller Strategy</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">Selling a Brickell Condo in 2026 — Positioning, Pricing, and the International Buyer</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the market guide →</p>
              </a>
              <a href="/journal/hoa-impact-home-sale-south-florida-2026" className="block border border-hairline bg-white p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 mb-3">Seller Strategy</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">HOA Financials and Your Condo's Sale Price — Reserve Funds, Recertification, and Financing Eligibility</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the HOA guide →</p>
              </a>
            </div>
          </div>
        </section>

        {/* Market snapshot — MIAMI REALTORS® April 2026 city report (src/data/cityMarketStats.ts) */}
        <NeighborhoodMarketStats city="Brickell" />
        <CityListingsSample city="Miami" />
        <NearbyMarkets current="sell-brickell" />

        {/* Confidential intake */}
        <section className="bg-navy-deep py-16 md:py-24" id="contact">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Brickell Seller Review</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Request a private property positioning review.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                No listing commitment required. Carlos reviews every Brickell submission personally before responding.
              </p>
            </div>
            <SellerIntakeForm sourcePage="sell-brickell" />
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
              Brickell, Miami
            </p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
