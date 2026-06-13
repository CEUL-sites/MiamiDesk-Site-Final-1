import { Helmet } from "react-helmet-async";
import { BadgeCheck, ChevronRight, Download } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LazyVideo } from "../components/LazyVideo";
import { SellerIntakeForm } from "../components/forms/SellerIntakeForm";
import { NeighborhoodMarketStats } from "../components/NeighborhoodMarketStats";
import { CONTACT, LEAD_MAGNETS } from "../constants";
import { CityProcessSteps } from "../components/CityProcessSteps";

const DOWNTOWN_MIAMI_FAQS = [
  {
    q: "How does condo versus fee-simple ownership affect positioning when selling in Downtown Miami?",
    a: "The overwhelming majority of Downtown Miami residential inventory is condo — meaning buyers are acquiring a unit interest within a building governed by a condominium association. Fee-simple sales in the area are rare and typically involve mixed-use or commercial-residential structures. For condo sellers, positioning requires preparation of HOA financials, reserve study status, special assessment disclosures, milestone inspection documentation (per Florida SB 4-D), and building certification status. Buyers and their lenders scrutinize these documents closely. Carlos advises on the full documentation package before listing.",
  },
  {
    q: "What drives buyer demand in Downtown Miami?",
    a: "Downtown Miami's buyer demand is driven by urban core access — proximity to Brickell's financial district, Port Miami, Bayfront Park, and the Brightline rail hub — combined with its concentration of high-rise inventory at price points that compare favorably to Brickell proper. Investor buyers seeking rental yield and international buyers acquiring urban pied-à-terre properties are the dominant profiles. Owner-occupant demand exists but is secondary to investor and international acquisition activity.",
  },
  {
    q: "How do international buyers approach Downtown Miami acquisitions?",
    a: "International buyers — particularly from Latin America and Europe — approach Downtown Miami with a combination of investment thesis and lifestyle utility. The asset class is familiar, the rental demand is verifiable, and the location adjacency to Brickell and Port Miami is well understood internationally. Currency considerations, FIRPTA withholding, and foreign-national financing eligibility are all relevant factors. Carlos works with buyers and their advisors on positioning the sale to international buyer profiles through multilingual portal distribution and direct referral network activation.",
  },
  {
    q: "What disclosure requirements apply to condo sales in Downtown Miami?",
    a: "Florida law requires condominium sellers to provide buyers with a disclosure package that includes the declaration of condominium, bylaws, rules and regulations, current budget, most recent year-end financial statements, and any pending special assessments. Buildings three stories or taller are also subject to Florida's structural integrity reserve and milestone inspection requirements enacted under SB 4-D. Carlos coordinates with sellers to ensure disclosure packages are complete and compliant before the listing goes live.",
  },
  {
    q: "What is the seller strategy review?",
    a: "A free, confidential session where Carlos reviews your property, its MLS positioning potential, building-level documentation requirements, current market comparables, and distribution strategy — with no listing commitment required. Submit the form below or contact Carlos directly via WhatsApp.",
  },
];

export default function SellDowntownMiamiPage() {
  return (
    <>
      <Helmet>
        <title>Sell Your Condo in Downtown Miami, FL | MLS Positioning & Investor Buyer Activation | Carlos Uzcategui</title>
        <meta name="description" content="Downtown Miami, FL listing agent — condo MLS positioning, investor and international buyer activation, global portal distribution. Free strategy review. Carlos Uzcategui, FL SL705771." />
        <meta name="keywords" content="sell condo Downtown Miami FL, Downtown Miami listing agent, Downtown Miami real estate agent, sell Downtown Miami condo, Miami urban core listing agent, Brickell adjacent condos for sale" />
        <link rel="canonical" href="https://homesprofessional.com/sell-downtown-miami" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/sell-downtown-miami" />
        <meta property="og:title" content="Sell Your Downtown Miami Condo | Professional MLS Positioning | Carlos Uzcategui" />
        <meta property="og:description" content="Professional seller representation in Downtown Miami — condo MLS activation, investor and international buyer-agent network access. Free confidential strategy review." />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sell Your Downtown Miami Condo | Carlos Uzcategui, FL SL705771" />
        <meta name="twitter:description" content="Professional MLS positioning and buyer-agent activation for Downtown Miami condo sellers. Free strategy review — no listing commitment." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Sell in South Florida", "item": "https://homesprofessional.com/sell-south-florida" },
            { "@type": "ListItem", "position": 3, "name": "Sell in Downtown Miami", "item": "https://homesprofessional.com/sell-downtown-miami" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": DOWNTOWN_MIAMI_FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Carlos Uzcategui — Downtown Miami FL Listing Agent",
          "url": "https://homesprofessional.com/sell-downtown-miami",
          "areaServed": { "@type": "City", "name": "Downtown Miami", "addressRegion": "FL", "postalCode": "33132", "addressCountry": "US" },
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Downtown Miami, FL · Seller Advisory</p>
            <h1 className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}>
              Sell your Downtown Miami condo with the reach<br />
              <em className="not-italic italic text-gold">of the world's largest local Realtor® network.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              Downtown Miami's high-rise condo market demands specialist positioning — building-level documentation, investor activation, and international reach to the Latin American and global buyer pool driving urban core demand. MLS positioning. Buyer-agent activation. Global distribution.
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Why Downtown Miami</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Urban core investment market with high-rise condo concentration and strong investor and international buyer demand.
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/65">
              Downtown Miami is Miami-Dade's densest residential investment market — a high-rise corridor adjacent to
              Brickell's financial district, Bayfront Park, and Port Miami. The buyer pool is predominantly investor
              and international, drawn by rental yield potential, urban core access, and Brightline rail connectivity.
              Effective positioning requires building-level due diligence preparation alongside the distribution
              infrastructure to reach global buyer demand.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { label: "Market Type", value: "Urban Investment Core", sub: "High-rise condo concentration with strong investor and international acquisition demand" },
                { label: "Location", value: "Brickell Adjacent", sub: "Proximity to financial district, Bayfront Park, Port Miami, and Brightline rail hub" },
                { label: "Buyer Profile", value: "Investor + International", sub: "Domestic and international buyers seeking urban core rental yield and pied-à-terre positioning" },
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
                  Your Downtown Miami listing reaches every buyer,<br />
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
                    "Direct Latin American and European investor buyer pipeline",
                    "437+ international agreements across 75+ countries",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 font-sans text-sm text-white/70">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <CityProcessSteps steps={[
                  { label: "Strategy", text: "Pricing analysis + CMA specific to your building, floor, view, and current Downtown Miami condo comparables" },
                  { label: "Positioning", text: "Professional MLS activation with complete condo disclosure package preparation" },
                  { label: "Distribution", text: "Buyer-agent outreach + investor and international referral network activation across 75+ countries" },
                  { label: "Negotiation", text: "Offer review, terms strategy, and closing coordination for domestic and international transactions" },
                ]} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gold/20 bg-navy py-12 md:py-20 text-white">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-12 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Downtown Miami Sellers Ask</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">Common questions.</h2>
            </div>
            <div className="divide-y divide-white/8">
              {DOWNTOWN_MIAMI_FAQS.map((faq) => (
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
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Downtown Miami Market Research</p>
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
        <NeighborhoodMarketStats city="Downtown Miami" />

        {/* Confidential intake */}
        <section className="bg-navy-deep py-16 md:py-24" id="contact">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Downtown Miami Seller Review</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Request a private property positioning review.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                No listing commitment required. Carlos reviews every Downtown Miami submission personally before responding.
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
              Downtown Miami, FL
            </p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
