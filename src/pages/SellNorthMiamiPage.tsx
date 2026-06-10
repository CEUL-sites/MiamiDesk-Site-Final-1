import { Helmet } from "react-helmet-async";
import { BadgeCheck, ChevronRight, Download } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LazyVideo } from "../components/LazyVideo";
import { SellerIntakeForm } from "../components/forms/SellerIntakeForm";
import { NeighborhoodMarketStats } from "../components/NeighborhoodMarketStats";
import { CONTACT, LEAD_MAGNETS } from "../constants";

const NORTH_MIAMI_FAQS = [
  {
    q: "What are current market conditions in North Miami?",
    a: "North Miami is a growing submarket within Miami-Dade that benefits from coastal adjacency and accessible price points relative to neighboring Aventura and North Miami Beach. Per Miami and South Florida REALTORS® MLS data, demand is supported by a diverse local buyer pool and increasing attention from buyers priced out of directly coastal markets. Carlos provides a submarket-specific pricing analysis as part of every seller strategy review.",
  },
  {
    q: "How does North Miami pricing compare to coastal markets?",
    a: "North Miami generally offers more competitive entry points than adjacent coastal markets such as North Miami Beach, Aventura, and Bal Harbour. This value positioning attracts buyers who want proximity to coastal amenities without coastal pricing. Market comparables vary by street, neighborhood, and property type — Carlos reviews these specifically for each property rather than applying a blanket area average.",
  },
  {
    q: "What buyer profiles are most active in North Miami?",
    a: "North Miami draws a genuinely diverse buyer pool — local move-up buyers, first-time buyers from within Miami-Dade, domestic relocators, and a growing share of international buyers who find value positioning relative to Aventura and the beaches. Carlos's network spans the Miami and South Florida REALTORS® association of 93,000 member agents and an international referral pipeline reaching buyers in 75+ countries.",
  },
  {
    q: "How does proximity to Aventura and the beaches affect demand?",
    a: "Adjacency to the Aventura corridor and access to North Miami Beach's coastal amenities are consistent draw factors for buyers evaluating the submarket. Properties within reasonable distance of Biscayne Bay, parks, and the A1A corridor typically generate stronger buyer engagement. Carlos accounts for these proximity factors when structuring pricing and positioning strategy.",
  },
  {
    q: "What does the seller strategy review cover?",
    a: "A free, confidential session where Carlos reviews your property, its MLS positioning potential, current market comparables specific to the North Miami submarket, and your distribution strategy — with no listing commitment required. Submit the form below or contact Carlos directly via WhatsApp.",
  },
];

export default function SellNorthMiamiPage() {
  return (
    <>
      <Helmet>
        <title>Sell Your Home in North Miami, FL | MLS Positioning & Buyer-Agent Activation | Carlos Uzcategui</title>
        <meta name="description" content="North Miami, FL listing agent — MLS positioning, diverse buyer activation, buyer-agent network. Free strategy review. Carlos Uzcategui, FL SL705771." />
        <meta name="keywords" content="sell home North Miami FL, North Miami Florida listing agent, North Miami real estate agent, sell house North Miami Florida, North Miami FL realtor, Miami-Dade listing agent, North Miami homes for sale" />
        <link rel="canonical" href="https://homesprofessional.com/sell-north-miami" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/sell-north-miami" />
        <meta property="og:title" content="Sell Your North Miami, FL Home | Professional MLS Positioning | Carlos Uzcategui" />
        <meta property="og:description" content="Professional seller representation in North Miami, FL — MLS activation, diverse buyer-agent network access, and international distribution. Free confidential strategy review." />
        <meta property="og:image" content="https://homesprofessional.com/images/carlos-headshot.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sell Your North Miami, FL Home | Carlos Uzcategui, FL SL705771" />
        <meta name="twitter:description" content="Professional MLS positioning and buyer-agent activation for North Miami, FL home sellers. Free strategy review — no listing commitment." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/carlos-headshot.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Sell in South Florida", "item": "https://homesprofessional.com/sell-south-florida" },
            { "@type": "ListItem", "position": 3, "name": "Sell in North Miami", "item": "https://homesprofessional.com/sell-north-miami" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": NORTH_MIAMI_FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Carlos Uzcategui — North Miami FL Listing Agent",
          "url": "https://homesprofessional.com/sell-north-miami",
          "areaServed": { "@type": "City", "name": "North Miami", "addressRegion": "FL", "postalCode": "33161", "addressCountry": "US" },
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">North Miami, FL · Seller Advisory</p>
            <h1 className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}>
              Sell your North Miami home with the reach<br />
              <em className="not-italic italic text-gold">of the world's largest local Realtor® network.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              North Miami's growing submarket, coastal adjacency, and diverse buyer pool require a listing agent who
              understands both the local demand landscape and the international network capable of reaching every
              qualified buyer. Professional MLS positioning. Buyer-agent activation. International distribution.
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Why North Miami</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              A growing submarket with coastal adjacency and value positioning within the Aventura corridor.
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/65">
              North Miami sits in the northeast quadrant of Miami-Dade County, bordered by North Miami Beach and the
              Aventura corridor — markets that command a significant coastal premium. That proximity gives North Miami
              sellers a structural advantage: buyers seeking coastal access and community infrastructure at accessible
              price points consistently look here. The submarket draws a genuinely diverse buyer pool, from local
              move-up buyers to domestic relocators and international buyers who prioritize value relative to the
              directly coastal alternatives.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { label: "Buyer Profile", value: "Diverse / Local + International", sub: "Move-up buyers, domestic relocators, and international buyers valuing coastal adjacency" },
                { label: "Location", value: "NE Miami-Dade / Aventura Corridor", sub: "Positioned between coastal markets with strong access to beaches and amenities" },
                { label: "Market Type", value: "Value-Positioned / Coastal Adjacent", sub: "Accessible price points relative to Aventura, North Miami Beach, and Bal Harbour" },
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
                  Your North Miami listing reaches every buyer,<br />
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
                    "Direct international buyer pipeline across 75+ countries",
                    "437+ international agreements reaching buyers across 6 continents",
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
                  { label: "Strategy", text: "Pricing analysis specific to the North Miami submarket, including proximity-to-coast and neighborhood-level comparables" },
                  { label: "Positioning", text: "Professional MLS activation through United Realty Group" },
                  { label: "Distribution", text: "Buyer-agent outreach + international referral network" },
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">North Miami Sellers Ask</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">Common questions.</h2>
            </div>
            <div className="divide-y divide-white/8">
              {NORTH_MIAMI_FAQS.map((faq) => (
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-6">North Miami Market Research</p>
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
        <NeighborhoodMarketStats city="North Miami" />

        {/* Confidential intake */}
        <section className="bg-navy-deep py-16 md:py-24" id="contact">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">North Miami Seller Review</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Request a private property positioning review.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                No listing commitment required. Carlos reviews every North Miami submission personally before responding — typically within one business day.
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
              North Miami, FL
            </p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
