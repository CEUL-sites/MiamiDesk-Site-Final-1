import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { AGGREGATE_RATING } from "../data/reviews";
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

const PLANTATION_FAQS = [
  {
    q: "What is the current home market like in Plantation, FL?",
    a: "Plantation is an established Broward suburb known for mature tree canopy, well-maintained neighborhoods, and proximity to the Sawgrass Expressway corridor. Per Miami and South Florida REALTORS® MLS data, pricing varies by neighborhood, lot size, build decade, and proximity to top-rated schools and commercial centers. Carlos provides a neighborhood-specific analysis as part of every seller strategy review.",
  },
  {
    q: "How long does it take to sell a home in Plantation?",
    a: "Plantation homes in established neighborhoods with competitive pricing and good school access have moved efficiently in recent market cycles. Properties requiring significant updates or at higher price points may carry longer timelines. Carlos provides a property-specific estimate — this is not a guarantee of outcome.",
  },
  {
    q: "Is Plantation a good market for families relocating to South Florida?",
    a: "Yes — Plantation's combination of established infrastructure, Broward County school quality, and central location between Miami and Fort Lauderdale make it a consistent destination for both domestic and international families. The city's professional community and proximity to major employers also drive relocation demand from corporate buyers.",
  },
  {
    q: "What are Plantation's most sought-after neighborhoods?",
    a: "Plantation's demand centers on established neighborhoods with mature landscaping, maintained HOAs, and proximity to Plantation Town Center and the expressway network. Neighborhoods in the Plantation Key, American Heritage, and Royal Palm corridors attract consistent buyer interest. Lot size, pool presence, and build quality directly affect positioning.",
  },
  {
    q: "What is the seller strategy review?",
    a: "A free, confidential session where Carlos reviews your property, its MLS positioning potential, current market comparables, and distribution strategy — with no listing commitment required. Submit the form below or contact Carlos directly via WhatsApp.",
  },
];

export default function SellPlantationPage() {
  return (
    <>
      <Helmet>
        <title>Sell Your Home in Plantation, FL | MLS Positioning & Buyer-Agent Activation | Carlos Uzcategui</title>
        <meta name="description" content="Plantation, FL listing agent — MLS positioning, buyer-agent activation, neighborhood expertise. Free strategy review. Carlos Uzcategui, FL SL705771." />
        <meta name="keywords" content="sell home Plantation FL, Plantation Florida listing agent, Plantation real estate agent, sell house Plantation Florida, Plantation FL realtor, Broward County listing agent, Plantation FL homes for sale" />
        <link rel="canonical" href="https://homesprofessional.com/sell-plantation" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/sell-plantation" />
        <meta property="og:title" content="Sell Your Plantation, FL Home | Professional MLS Positioning | Carlos Uzcategui" />
        <meta property="og:description" content="Professional seller representation in Plantation, FL — MLS activation, buyer-agent network access, and established neighborhood expertise. Free confidential strategy review." />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sell Your Plantation, FL Home | Carlos Uzcategui, FL SL705771" />
        <meta name="twitter:description" content="Professional MLS positioning and buyer-agent activation for Plantation, FL home sellers. Free strategy review — no listing commitment." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>
      <JsonLd id="sell-plantation-breadcrumb" data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Sell in South Florida", "item": "https://homesprofessional.com/sell-south-florida" },
            { "@type": "ListItem", "position": 3, "name": "Sell in Plantation", "item": "https://homesprofessional.com/sell-plantation" }
          ]
        }} />
      <JsonLd id="sell-plantation-faq" data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": PLANTATION_FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        }} />
      <JsonLd id="sell-plantation-agent" data={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Carlos Uzcategui — Plantation FL Listing Agent",
          "url": "https://homesprofessional.com/sell-plantation",
          "areaServed": { "@type": "City", "name": "Plantation", "addressRegion": "FL", "postalCode": "33324", "addressCountry": "US" },
          "telephone": CONTACT.phoneUS,
          "email": CONTACT.email,
          "address": { "@type": "PostalAddress", "streetAddress": "1200 S Pine Island Rd Suite 600", "addressLocality": "Plantation", "addressRegion": "FL", "postalCode": "33324", "addressCountry": "US" },
          "memberOf": { "@type": "Organization", "name": "United Realty Group" },
          "aggregateRating": AGGREGATE_RATING
        }} />
      <JsonLd id="sell-plantation-service" data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Seller representation and MLS listing — Plantation, FL",
          "serviceType": "Real estate listing and seller representation",
          "areaServed": { "@type": "City", "name": "Plantation", "addressRegion": "FL", "addressCountry": "US" },
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Carlos Uzcategui",
            "url": "https://homesprofessional.com/sell-plantation"
          },
          "url": "https://homesprofessional.com/sell-plantation"
        }} />
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep px-6 pt-20 pb-10 md:pt-28 md:pb-12 text-center sm:px-10">
          <LazyVideo eager src="/videos/matterport_tour_global.mp4" className="absolute inset-0 h-full w-full object-cover opacity-[0.14] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep/80 pointer-events-none" />
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Plantation, FL · Seller Advisory</p>
            <h1 className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}>
              Sell your Plantation home with the reach<br />
              <em className="italic text-gold">of the world's largest local Realtor® network.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              Plantation's established neighborhoods, central Broward location, and family buyer demand require
              a listing agent who understands neighborhood-level value drivers and can activate the full buyer-agent network.
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
                Get My Plantation Home Value &amp; Strategy
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
              <p className="font-sans text-sm italic leading-relaxed text-white/55">"Central Broward location but the buyer pool requires specific activation. Carlos understood that and came with the right network approach from the start."</p>
              <footer className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/50">— Roberto F., Plantation, FL</footer>
            </blockquote>

            <div className="mt-5 flex items-center justify-center gap-2">
              <a href={LEAD_MAGNETS.sellerNetSheet.url} download className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline">
                <Download size={11} />
                Or download the Seller's Net Sheet 2026
              </a>
            </div>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              United Realty Group · CLHMS · FL SL705771 · 25 Years Licensed in Florida · Broward Office: Plantation, FL 33324
            </p>
            <HeroReachBar />
          </div>
        </section>

        {/* Market positioning */}
        <section className="bg-ivory py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Why Plantation</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              An established Broward suburb with mature neighborhoods and central market access.
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/65">
              Plantation's tree-canopied streets, established neighborhood character, and central Broward
              County location between Miami and Fort Lauderdale make it a consistent destination for families,
              professionals, and move-up buyers. The city's proximity to the Sawgrass Expressway, top-rated schools,
              and the United Realty Group Plantation office creates natural advantages for seller representation.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { label: "Neighborhood Character", value: "Established & Mature", sub: "Tree canopy, maintained HOAs, and diverse lot sizes" },
                { label: "Location", value: "Central Broward", sub: "Between Miami and Fort Lauderdale — expressway access" },
                { label: "Buyer Profile", value: "Family + Professional", sub: "Domestic move-up and relocation buyers across segments" },
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
                  Your Plantation listing reaches every buyer,<br />
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
                  { label: "Strategy", text: "Pricing analysis + CMA specific to your Plantation neighborhood and lot" },
                  { label: "Positioning", text: "Professional MLS activation through United Realty Group" },
                  { label: "Distribution", text: "Buyer-agent outreach + local and international referral network" },
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Plantation Sellers Ask</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">Common questions.</h2>
            </div>
            <div className="divide-y divide-white/8">
              {PLANTATION_FAQS.map((faq) => (
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Plantation Market Research</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="/journal/selling-plantation-home-2026" className="block border border-hairline bg-white p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 mb-3">Seller Strategy</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">Selling Your Plantation, FL Home — How Established Neighborhoods Are Priced and Positioned</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the seller guide →</p>
              </a>
              <a href="/journal/when-to-list-south-florida-home-2026" className="block border border-hairline bg-white p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 mb-3">Market Analysis</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">When to List Your South Florida Home — Timing, Pricing, and the Cost of Waiting</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the timing guide →</p>
              </a>
            </div>
          </div>
        </section>

        {/* Market snapshot — MIAMI REALTORS® April 2026 city report (src/data/cityMarketStats.ts) */}
        <NeighborhoodMarketStats city="Plantation" />
        <CityListingsSample city="Plantation" />
        <NearbyMarkets current="sell-plantation" />

        {/* Confidential intake */}
        <section className="bg-navy-deep py-16 md:py-24" id="contact">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Plantation Seller Review</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Request a private property positioning review.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                No listing commitment required. Carlos reviews every Plantation submission personally before responding.
              </p>
            </div>
            <SellerIntakeForm sourcePage="sell-plantation" />
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
              Plantation, FL
            </p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
