import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { AGGREGATE_RATING, REALTOR_PROFILE_URL } from "../data/reviews";
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
import { FaqAccordion } from "../components/FaqAccordion";
import { CONTACT, LEAD_MAGNETS } from "../constants";
import { getCityMarketStats, segmentPeriod } from "../data/cityMarketStats";

const weston = getCityMarketStats("Weston")!;
const westonSingleFamily = weston.stats.singleFamily!;
const westonPeriod = segmentPeriod(weston.stats.county, "singleFamily");
const westonMedian = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(westonSingleFamily.medianSalePrice);

const WESTON_FAQS = [
  {
    q: "How do I choose a listing agent in Weston, FL?",
    a: "Ask for a pricing analysis specific to your community, a preparation and media plan, relevant buyer-agent outreach, reporting and a negotiation strategy. Carlos Uzcategui leads Weston seller representation through United Realty Group. Start with a private review of your property and next-move priorities; no listing commitment is required.",
  },
  {
    q: "What is the current median home price in Weston, FL?",
    a: `The median closed sale price for Weston single-family homes was ${westonMedian} in ${westonPeriod}, according to the MIAMI REALTORSr city report based on MLS data compiled by Florida Realtorsr. This city median is not a valuation of your home. Carlos reviews competing properties, condition and terms specific to your community.`,
  },
  {
    q: "How long does it take to sell a home in Weston?",
    a: "Timing varies with your community, property type, condition, asking price and competing inventory. We review recent comparable sales, current listings and your preferred closing date to discuss a property-specific plan. Market averages do not guarantee a sale or closing date.",
  },
  {
    q: "What affects the asking price of a Weston home?",
    a: "Comparable sales, current competition, lot characteristics, condition, improvements and community-specific documents help inform the price position. For HOA properties, we also review available fees, restrictions and required documentation. A city median alone cannot determine the value of your home.",
  },
  {
    q: "Can I sell my Weston home while living outside Florida?",
    a: "Yes. Carlos coordinates the South Florida listing and communication in English or Spanish through United Realty Group. We discuss property access, your local contact, documentation and timing. Your attorney and tax advisor handle legal and tax requirements relevant to your circumstances.",
  },
  {
    q: "What happens after I request a Weston seller strategy review?",
    a: "Share your address, contact details, timing and priorities. Carlos reviews your property and contacts you to arrange a private conversation about comparable homes, preparation, pricing, buyer reach and estimated proceeds. The review is free and carries no listing commitment.",
  },
];

export default function SellWestonPage() {
  return (
    <>
      <Helmet>
        <title>Weston FL Listing Agent | Carlos Uzcategui</title>
        <meta name="description" content="Sell your Weston, FL home with Carlos Uzcategui at United Realty Group. Community-specific pricing, buyer-agent outreach and a private seller strategy review." />
        <link rel="canonical" href="https://homesprofessional.com/sell-weston" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/sell-weston" />
        <meta property="og:title" content="Weston FL Listing Agent | Carlos Uzcategui" />
        <meta property="og:description" content="Sell your Weston, FL home with Carlos Uzcategui at United Realty Group. Community-specific pricing, buyer-agent outreach and a private seller strategy review." />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Weston FL Listing Agent | Carlos Uzcategui" />
        <meta name="twitter:description" content="Sell your Weston, FL home with Carlos Uzcategui at United Realty Group. Community-specific pricing, buyer-agent outreach and a private seller strategy review." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>
      <JsonLd id="sell-weston-breadcrumb" data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Sell in South Florida", "item": "https://homesprofessional.com/sell" },
            { "@type": "ListItem", "position": 3, "name": "Sell in Weston", "item": "https://homesprofessional.com/sell-weston" }
          ]
        }} />
      <JsonLd id="sell-weston-faq" data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": WESTON_FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        }} />
      <JsonLd id="sell-weston-agent" data={{
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": "Carlos Uzcategui - Weston FL Listing Agent",
          "url": "https://homesprofessional.com/sell-weston",
          "areaServed": {
            "@type": "City",
            "name": "Weston",
            "addressRegion": "FL",
            "postalCode": "33326",
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
          "aggregateRating": AGGREGATE_RATING
        }} />
      <JsonLd id="sell-weston-service" data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Seller representation and MLS listing - Weston, FL",
          "serviceType": "Real estate listing and seller representation",
          "areaServed": { "@type": "City", "name": "Weston", "addressRegion": "FL", "addressCountry": "US" },
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Carlos Uzcategui",
            "url": "https://homesprofessional.com/sell-weston"
          },
          "url": "https://homesprofessional.com/sell-weston"
        }} />
      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep px-6 pt-20 pb-10 md:pt-28 md:pb-12 text-center sm:px-10">
          <LazyVideo
            idle
            src="/videos/advisor-brand.mp4"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.14] pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep/80 pointer-events-none" />
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Weston, FL � Listing Agent &amp; Seller Representation</p>
            <h1
              className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white"
              style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}
            >
              What would your Weston home compete against today?<br />
              <em className="italic text-gold">Build the sale around price, proceeds and your next move.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              We review your community's competing homes, position the listing for relevant buyers and their agents,
              and plan the offer terms and timing around your next move. Carlos leads the strategy through United Realty Group.
            </p>
            <ul className="mx-auto mt-7 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
              {[
                "MLS-based pricing & positioning",
                "Your most likely buyer - local & global",
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
                Get My Weston Home Value &amp; Strategy
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
                5.0 � Free &amp; confidential � No listing commitment � Personal reply from Carlos
              </span>
            </div>

            <div className="mx-auto mt-5 max-w-xl border-l-2 border-gold/60 pl-4 text-left">
              <p className="font-sans text-sm leading-relaxed text-white/85"><strong className="text-white">A Weston seller's move:</strong> A verified client review describes a negotiated seven-month post-occupancy arrangement that supported the family's relocation. The right terms can matter alongside the sale price.</p>
              <a href={REALTOR_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-sans text-xs text-gold underline underline-offset-4 hover:text-white">Read Diego Tolotto's verified review on Realtor.comr</a>
              <p className="mt-1 font-sans text-xs text-white/70">Individual terms and results vary.</p>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2">
              <a href={LEAD_MAGNETS.sellerNetSheet.url} download className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline">
                <Download size={11} />
                Or download the Seller's Net Sheet 2026
              </a>
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
              United Realty Group � CLHMS � FL SL705771 � 25 Years Licensed in Florida � Office: Weston, FL 33331
            </p>
            <HeroReachBar />
          </div>
        </section>

        {/* Market positioning */}
        <section className="bg-ivory py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Why Weston</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              One of South Florida's most consistently demanded residential markets.
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/65">
              Weston combines master-planned suburban infrastructure with one of the highest concentrations of internationally connected buyers in South Florida.
              The city's A-rated Broward County schools, gated communities, and proximity to the airport create sustained demand - particularly from Latin American and European buyers who have made Weston a primary destination for family relocation.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { label: "Buyer Profile", value: "International + Local", sub: "Highest LATAM buyer concentration in Broward" },
                { label: "School District", value: "A-Rated Schools", sub: "Broward County - consistent academic ranking" },
                { label: "Community Types", value: "Gated & Master-Planned", sub: "20+ distinct communities - HOA-governed" },
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
                  Position your Weston listing for the right buyer agents,<br />
                  <em className="italic text-gold">then respond to the market evidence.</em>
                </h2>
                <p className="mt-6 font-sans text-base leading-relaxed text-white/65">
                  Professional MLS activation through United Realty Group means your property enters the network of a Florida brokerage with 3,500+ agents across the Florida office network - not a portal, but a coordinated professional infrastructure.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Miami and South Florida REALTORSr MLS - 93,000 member agents",
                    "Eligible syndication across 200+ global portals in 19 languages",
                    "United Realty Group - 3,500+ agents across the Florida office network",
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
                  { label: "Strategy", text: "Pricing analysis + CMA specific to your Weston community" },
                  { label: "Positioning", text: "Professional MLS activation through United Realty Group" },
                  { label: "Distribution", text: "Buyer-agent outreach + international referral network" },
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Weston Sellers Ask</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">
                Common questions.
              </h2>
            </div>
            <FaqAccordion faqs={WESTON_FAQS} />
          </div>
        </section>

        {/* Journal crosslinks */}
        <section className="bg-ivory py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Weston Guides &amp; Market Research</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="/journal/selling-weston-florida-2026" className="block border border-hairline bg-white p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 mb-3">Seller Strategy</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">Selling Your Weston Home in 2026: What Actually Moves the Needle</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the market guide </p>
              </a>
              <a href="/journal/weston-4-bedroom-single-family-market-june-2026" className="block border border-hairline bg-white p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 mb-3">Market Analysis</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">Weston 4-Bedroom Single-Family Market - June 2026 Analysis</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the market data </p>
              </a>
              <a href="/journal/hoa-impact-home-sale-south-florida-2026" className="block border border-hairline bg-white p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 mb-3">Seller Strategy</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">HOA Financials and Your Home's Sale Price - What Weston Sellers Need to Know</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the HOA guide </p>
              </a>
              <a href="/journal/weston-homebuyer-purchase-assistance-2026" className="block border border-hairline bg-white p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 mb-3">Weston Housing Resource</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">Housing Assistance for Weston Buyers and Homeowners</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Purchase, repair, and accessibility options </p>
              </a>
            </div>
          </div>
        </section>

        {/* Market snapshot - MIAMI REALTORSr April 2026 city report (src/data/cityMarketStats.ts) */}
        <NeighborhoodMarketStats city="Weston" />
        <CityListingsSample city="Weston" propertyType="Residential" sellerContext />
        <NearbyMarkets current="sell-weston" />

        {/* Confidential intake */}
        <section className="bg-navy-deep py-16 md:py-24" id="contact">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Weston Seller Review</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Find out what your Weston home would compete against-and what you could keep.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                Carlos reviews relevant sales and competing listings, your timing and the terms that affect proceeds. No listing commitment required.
              </p>
            </div>
            <SellerIntakeForm sourcePage="sell-weston" />
            <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
              <BadgeCheck size={14} className="text-gold" />
              Confidential � Licensed Professional � Equal Housing Opportunity
            </div>
          </div>
        </section>

        {/* Footer breadcrumb */}
        <section className="bg-ivory py-6 border-t border-hairline">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-sans text-xs text-ink-primary/70">
              <a href="/" className="hover:text-gold">Home</a>
              {" � "}
              <a href="/sell" className="hover:text-gold">Sell in South Florida</a>
              {" � "}
              Weston, FL
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
