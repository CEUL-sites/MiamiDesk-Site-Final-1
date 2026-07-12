import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
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
import { AGGREGATE_RATING } from "../data/reviews";

const DORAL_FAQS = [
  {
    q: "What is the current home market like in Doral, FL?",
    a: "Doral's residential market includes master-planned communities with newer construction single-family homes and townhomes across a range of price points. Per Miami and South Florida REALTORS® MLS data, pricing varies by community, lot size, build year, and proximity to major corridors. Carlos provides a community-specific pricing analysis as part of every seller strategy review.",
  },
  {
    q: "How long does it take to sell a home in Doral?",
    a: "Doral homes in communities with strong HOA management, good schools, and competitive pricing have moved efficiently in recent cycles — particularly properties targeting the Latin American buyer pool that drives much of the local demand. Timeline varies by price range and community. This is not a guarantee of outcome; Carlos provides a property-specific estimate during the strategy review.",
  },
  {
    q: "Is Doral a strong market for Latin American buyers?",
    a: "Yes — Doral has one of the highest concentrations of Venezuelan and Colombian buyer demand in Miami-Dade County. The city's strong Latin American community infrastructure, bilingual environment, proximity to international schools, and airport access make it a consistent relocation destination for buyers from Venezuela, Colombia, and across Latin America. Carlos's network directly reaches these buyer profiles.",
  },
  {
    q: "What community types are most in demand in Doral?",
    a: "Gated communities with newer construction, controlled access, and strong HOA management consistently attract the deepest buyer pools in Doral. Communities with proximity to top-rated schools and the Doral corridor typically generate more competitive offer activity. Carlos provides a community-level demand assessment as part of the seller strategy review.",
  },
  {
    q: "What is the seller strategy review?",
    a: "A free, confidential session where Carlos reviews your property, its MLS positioning potential, current market comparables, and distribution strategy — with no listing commitment required. Submit the form below or contact Carlos directly via WhatsApp.",
  },
];

export default function SellDoralPage() {
  return (
    <>
      <Helmet>
        <title>Sell Your Home in Doral, FL | MLS Positioning & Buyer-Agent Activation | Carlos Uzcategui</title>
        <meta name="description" content="Doral, FL listing agent — MLS positioning, Latin American buyer activation, buyer-agent network. Free strategy review. Carlos Uzcategui, FL SL705771." />
        <meta name="keywords" content="sell home Doral FL, Doral Florida listing agent, Doral real estate agent, sell house Doral Florida, Doral FL realtor, Miami-Dade listing agent, Doral gated community homes" />
        <link rel="canonical" href="https://homesprofessional.com/sell-doral" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/sell-doral" />
        <meta property="og:title" content="Sell Your Doral, FL Home | Professional MLS Positioning | Carlos Uzcategui" />
        <meta property="og:description" content="Professional seller representation in Doral, FL — MLS activation, Latin American buyer-agent network access, and international distribution. Free confidential strategy review." />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sell Your Doral, FL Home | Carlos Uzcategui, FL SL705771" />
        <meta name="twitter:description" content="Professional MLS positioning and buyer-agent activation for Doral, FL home sellers. Free strategy review — no listing commitment." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>
      <JsonLd id="sell-doral-breadcrumb" data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Sell in South Florida", "item": "https://homesprofessional.com/sell-south-florida" },
            { "@type": "ListItem", "position": 3, "name": "Sell in Doral", "item": "https://homesprofessional.com/sell-doral" }
          ]
        }} />
      <JsonLd id="sell-doral-faq" data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": DORAL_FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        }} />
      <JsonLd id="sell-doral-agent" data={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Carlos Uzcategui — Doral FL Listing Agent",
          "url": "https://homesprofessional.com/sell-doral",
          "areaServed": { "@type": "City", "name": "Doral", "addressRegion": "FL", "postalCode": "33178", "addressCountry": "US" },
          "telephone": CONTACT.phoneUS,
          "email": CONTACT.email,
          "address": { "@type": "PostalAddress", "streetAddress": "15951 SW 41 St #700", "addressLocality": "Weston", "addressRegion": "FL", "postalCode": "33331", "addressCountry": "US" },
          "memberOf": { "@type": "Organization", "name": "United Realty Group" },
          "aggregateRating": AGGREGATE_RATING
        }} />
      <JsonLd id="sell-doral-service" data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Seller representation and MLS listing — Doral, FL",
          "serviceType": "Real estate listing and seller representation",
          "areaServed": { "@type": "City", "name": "Doral", "addressRegion": "FL", "addressCountry": "US" },
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Carlos Uzcategui",
            "url": "https://homesprofessional.com/sell-doral"
          },
          "url": "https://homesprofessional.com/sell-doral"
        }} />
      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep px-6 pt-20 pb-10 md:pt-28 md:pb-12 text-center sm:px-10">
          <LazyVideo idle src="/videos/dollhouse_global_reach.mp4" className="absolute inset-0 h-full w-full object-cover opacity-[0.14] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep/80 pointer-events-none" />
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Doral, FL · Seller Advisory</p>
            <h1 className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}>
              Sell your Doral home with the reach<br />
              <em className="italic text-gold">of the world's largest local Realtor® network.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              Doral's master-planned communities and one of the highest Latin American buyer concentrations in Miami-Dade
              demand a listing agent who understands both the local market and the international demand that drives it.
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
                Get My Doral Home Value &amp; Strategy
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
              <p className="font-sans text-sm italic leading-relaxed text-white/55">"As a Venezuelan family selling in Doral, we needed someone who truly understood our buyer community. Carlos built his practice in this market — it shows."</p>
              <footer className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-gold/50">— Luis C., Doral, FL</footer>
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Why Doral</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              A master-planned community with one of South Florida's deepest Latin American buyer pools.
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/65">
              Doral combines newer construction, gated communities, strong bilingual infrastructure, and exceptional
              airport proximity into one of Miami-Dade's most consistent demand markets. Venezuelan, Colombian, and
              broader Latin American buyers have made Doral a primary relocation and investment destination —
              drawn by the community's schools, safety, and cultural familiarity.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { label: "Buyer Profile", value: "LATAM + International", sub: "Among the highest Venezuelan and Colombian buyer concentrations in Miami-Dade" },
                { label: "Community Type", value: "Master-Planned & Gated", sub: "Newer construction with strong HOA management" },
                { label: "Access", value: "Airport + Corridors", sub: "Proximity to MIA and major expressways drives relocation demand" },
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
                  Your Doral listing reaches every buyer,<br />
                  <em className="italic text-gold">everywhere they're looking.</em>
                </h2>
                <p className="mt-6 font-sans text-base leading-relaxed text-white/65">
                  Professional MLS activation through United Realty Group means your property enters the network of a full-service brokerage founded in 2002 — 3,500+ agents across 21 South Florida offices — not a portal, a professional infrastructure.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Miami and South Florida REALTORS® MLS — 93,000 member agents",
                    "Eligible syndication across 200+ global portals in 19 languages",
                    "United Realty Group — 3,500+ agents across 21 Florida offices",
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
                  { label: "Strategy", text: "Pricing analysis + CMA specific to your Doral community and build year" },
                  { label: "Positioning", text: "Professional MLS activation through United Realty Group" },
                  { label: "Distribution", text: "Buyer-agent outreach + LATAM referral network" },
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Doral Sellers Ask</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">Common questions.</h2>
            </div>
            <div className="divide-y divide-white/8">
              {DORAL_FAQS.map((faq) => (
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Doral Market Research</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="/journal/selling-doral-home-2026" className="block border border-hairline bg-white p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 mb-3">Seller Strategy</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">Selling Your Doral Home — What the Latin American Buyer Pool Actually Means for Price and Timeline</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the market analysis →</p>
              </a>
              <a href="/journal/hoa-impact-home-sale-south-florida-2026" className="block border border-hairline bg-white p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 mb-3">Seller Strategy</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">HOA Financials and Your Home's Sale Price — What Doral Sellers Need to Know</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the HOA guide →</p>
              </a>
            </div>
          </div>
        </section>

        {/* Market snapshot — MIAMI REALTORS® April 2026 city report (src/data/cityMarketStats.ts) */}
        <NeighborhoodMarketStats city="Doral" />
        <CityListingsSample city="Doral" />
        <NearbyMarkets current="sell-doral" />

        {/* Confidential intake */}
        <section className="bg-navy-deep py-16 md:py-24" id="contact">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Doral Seller Review</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Request a private property positioning review.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                No listing commitment required. Carlos reviews every Doral submission personally before responding.
              </p>
            </div>
            <SellerIntakeForm sourcePage="sell-doral" />
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
              Doral, FL
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
