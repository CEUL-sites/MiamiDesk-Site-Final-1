import { Helmet } from "react-helmet-async";
import { BadgeCheck, ChevronRight, Download } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LazyVideo } from "../components/LazyVideo";
import { SellerIntakeForm } from "../components/forms/SellerIntakeForm";
import { CONTACT, LEAD_MAGNETS } from "../constants";

const CORAL_GABLES_FAQS = [
  {
    q: "What price range do Coral Gables homes typically sell for?",
    a: "Coral Gables is one of Miami-Dade's most enduring luxury markets. Single-family homes range from approximately $1.5M for well-maintained traditional homes to $10M+ for waterfront estates and fully renovated Mediterranean-revival properties. Condominiums and townhomes occupy a wide band below that. Carlos provides a precise CMA — comparable market analysis — for your specific street and condition at no cost, with no obligation to list.",
  },
  {
    q: "How long does it take to sell in Coral Gables?",
    a: "Well-positioned Coral Gables homes in the $1.5M–$4M band have transacted at varying velocities depending on the market cycle, condition, and listing strategy. Overpriced properties in this market accumulate days on market quickly and typically sell below where they should. Per Miami and South Florida REALTORS® MLS data, pricing discipline and buyer-agent activation are the primary predictors of outcome — not listing volume or portal exposure.",
  },
  {
    q: "Who buys in Coral Gables?",
    a: "Coral Gables attracts a sophisticated buyer profile: domestic executives relocating to Miami, Latin American HNW families relocating permanently or establishing a second home, European buyers diversifying into U.S. real estate, and buyers attracted to the Mediterranean architecture, walkability, and proximity to Brickell and Downtown. Carlos's international referral network directly reaches these segments.",
  },
  {
    q: "Is the neighborhood fully walkable and close to Brickell?",
    a: "Coral Gables borders Brickell and Downtown Coconut Grove, with Miracle Mile as its commercial center. The University of Miami is within the city. The combination of historic architecture, tree canopy, walkability, and proximity to Miami's financial center makes it one of the most consistently sought-after markets in Miami-Dade County.",
  },
  {
    q: "What is included in the free seller strategy review?",
    a: "A confidential review covering your property's current MLS positioning potential, a pricing analysis based on current Miami and South Florida REALTORS® MLS data, a buyer profile assessment, and a distribution plan. No listing commitment required. Submit the form below or contact Carlos directly via WhatsApp.",
  },
];

export default function SellCoralGablesPage() {
  return (
    <>
      <Helmet>
        <title>Sell Your Home in Coral Gables, FL | Luxury MLS Positioning | Carlos Uzcategui</title>
        <meta name="description" content="Coral Gables listing agent — MLS positioning, luxury buyer network, international distribution. Free strategy review. Carlos Uzcategui, FL SL705771." />
        <meta name="keywords" content="sell home Coral Gables FL, Coral Gables listing agent, Coral Gables real estate agent, luxury homes Coral Gables, sell house Coral Gables, Miami-Dade luxury realtor, Coral Gables waterfront homes for sale" />
        <link rel="canonical" href="https://homesprofessional.com/sell-coral-gables" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/sell-coral-gables" />
        <meta property="og:title" content="Sell Your Coral Gables Home | Professional MLS Positioning | Carlos Uzcategui" />
        <meta property="og:description" content="Professional luxury seller representation in Coral Gables, FL — MLS activation, international buyer network, and distribution through the Miami MLS. Free confidential strategy review." />
        <meta property="og:image" content="https://homesprofessional.com/images/carlos-headshot.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sell Your Coral Gables Home | Carlos Uzcategui, FL SL705771" />
        <meta name="twitter:description" content="Professional MLS positioning and international buyer activation for Coral Gables, FL sellers. Free strategy review — no listing commitment." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/carlos-headshot.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Sell in South Florida", "item": "https://homesprofessional.com/sell-south-florida" },
            { "@type": "ListItem", "position": 3, "name": "Sell in Coral Gables", "item": "https://homesprofessional.com/sell-coral-gables" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": CORAL_GABLES_FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Carlos Uzcategui — Coral Gables FL Listing Agent",
          "url": "https://homesprofessional.com/sell-coral-gables",
          "areaServed": {
            "@type": "City",
            "name": "Coral Gables",
            "addressRegion": "FL",
            "postalCode": "33134",
            "addressCountry": "US"
          },
          "telephone": CONTACT.phoneUS,
          "email": CONTACT.email,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "15951 SW 41 St #700",
            "addressLocality": "Weston",
            "addressRegion": "FL",
            "postalCode": "33331",
            "addressCountry": "US"
          },
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
          <LazyVideo
            eager
            src="/videos/advisor-brand.mp4"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.18] pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/30 to-navy-deep/80 pointer-events-none" />
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Coral Gables, FL · Luxury Seller Advisory</p>
            <h1
              className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white"
              style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}
            >
              Sell your Coral Gables property with precision positioning<br />
              <em className="not-italic italic text-gold">and global buyer-network access.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              Coral Gables's luxury buyer pool is international by nature. Mediterranean architecture, Miracle Mile,
              and Brickell adjacency create consistent demand — from domestic executives to Latin American HNW families
              and European investors. Sell with the reach that matches that audience.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                Request a Free Strategy Review
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={CONTACT.whatsappUS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                WhatsApp Carlos
              </a>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2">
              <a
                href={LEAD_MAGNETS.sellerNetSheet.url}
                download
                className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline"
              >
                <Download size={11} />
                Download Seller's Net Sheet 2026
              </a>
            </div>
            <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              United Realty Group · CLHMS · Certified Luxury Home Marketing Specialist · FL SL705771
            </p>
          </div>
        </section>

        {/* Market context */}
        <section className="bg-ivory py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">The Coral Gables Market</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Miami-Dade's most architecturally distinguished luxury market.
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/65">
              Coral Gables is Miami-Dade County's master-planned luxury city — established in the 1920s and consistently in demand since.
              Its Mediterranean revival architecture, tree-lined boulevards, and international schools create a buyer profile unlike
              any other South Florida market: predominantly executive, bilingual, and internationally connected.
              Listing here requires an agent who understands both the property and the buyer.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { label: "Architecture", value: "Mediterranean Revival", sub: "Historic character preservation + modern renovations" },
                { label: "Buyer Profile", value: "Executive & International", sub: "Domestic + LATAM + European buyer pool" },
                { label: "Location", value: "Brickell Adjacent", sub: "Minutes to Miami's financial center + UM campus" },
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

        {/* Luxury positioning */}
        <section className="bg-navy-deep py-14 md:py-20 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Luxury Listing Strategy</p>
                <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
                  Coral Gables listings require<br />
                  <em className="not-italic italic text-gold">a complete strategy, not a sign.</em>
                </h2>
                <p className="mt-6 font-sans text-base leading-relaxed text-white/65">
                  The strongest Coral Gables transactions are won before the listing goes live — through pricing discipline, professional presentation, and buyer-agent relationship activation. Carlos builds the strategy before the MLS entry.
                </p>
              </div>
              <div className="space-y-px border border-white/10">
                {[
                  { label: "Pricing", text: "CMA built on current Miami MLS data — sold comps, active competition, expired listings, days on market by price band" },
                  { label: "Presentation", text: "Professional photography guidance, MLS narrative, and documentation package for buyer agents" },
                  { label: "Distribution", text: "Miami MLS activation → 93,000 agents → eligible syndication → 200+ global portals in 19 languages" },
                  { label: "Buyer pipeline", text: "Direct LATAM and European buyer channels via international referral network and partner associations in 75+ countries" },
                ].map((step) => (
                  <div key={step.label} className="flex gap-6 bg-navy p-6">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/70 w-28 flex-shrink-0 pt-0.5">{step.label}</span>
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Coral Gables Sellers Ask</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">
                Common questions.
              </h2>
            </div>
            <div className="divide-y divide-white/8">
              {CORAL_GABLES_FAQS.map((faq) => (
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Coral Gables Market Research</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="/journal/selling-coral-gables-2026" className="block border border-hairline bg-white p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 mb-3">Seller Strategy</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">Selling in Coral Gables in 2026 — What Luxury Sellers Need to Know</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the market guide →</p>
              </a>
              <a href="/journal/how-to-choose-a-listing-agent-south-florida-2026" className="block border border-hairline bg-white p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 mb-3">Seller Strategy</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">7 Questions to Ask Before You Sign a Listing Agreement in South Florida</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the guide →</p>
              </a>
            </div>
          </div>
        </section>

        {/* Confidential intake */}
        <section className="bg-navy-deep py-16 md:py-24" id="contact">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Coral Gables Seller Review</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Request a private property positioning review.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                No listing commitment required. Carlos reviews every submission personally — typically within one business day.
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
              Coral Gables, FL
            </p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
