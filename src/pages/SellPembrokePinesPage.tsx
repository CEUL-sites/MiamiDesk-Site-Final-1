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
import { HeroSellerForm } from "../components/HeroSellerForm";
import { NeighborhoodMarketStats } from "../components/NeighborhoodMarketStats";
import { CityListingsSample } from "../components/CityListingsSample";
import { NearbyMarkets } from "../components/NearbyMarkets";
import { FaqAccordion } from "../components/FaqAccordion";
import { CONTACT, LEAD_MAGNETS } from "../constants";
import figures from "../data/figures.json";
import { PembrokePinesMarketReport } from "../components/PembrokePinesMarketReport";
import { pembrokePinesReport } from "../data/pembrokePinesReport";

const ppLatest = pembrokePinesReport.years[pembrokePinesReport.years.length - 1];
const ppThrough = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${pembrokePinesReport.dataThrough}T00:00:00Z`));

// Publication date of the November 2026 market report (videos + dataset).
const REPORT_PUBLISHED = "2026-11-24";
const REPORT_OG = "https://homesprofessional.com/images/reports/pembroke-pines-2026-11-og.jpg";
const PAGE_TITLE = "Pembroke Pines FL Listing Agent | Carlos Uzcategui";
const PAGE_DESCRIPTION = "Sell your Pembroke Pines, FL home with Carlos Uzcategui at United Realty Group. Nov 2026 4-bedroom MLS market report and a private seller review.";

const PEMBROKE_PINES_FAQS = [
  {
    q: "What is the current home market like in Pembroke Pines, FL?",
    a: "Pembroke Pines offers a wide range of housing options — from established single-family communities to master-planned sections like Silver Lakes, Pembroke Falls, and Chapel Trail. Per Miami and South Florida REALTORS® MLS data, pricing varies by community, build decade, and HOA amenity tier. Carlos provides a community-specific pricing analysis as part of every seller strategy review.",
  },
  {
    q: "How long does it take to sell a home in Pembroke Pines?",
    a: `Timing depends on the community, condition, price position and competing inventory. For 4-bedroom single-family homes, the median time on market in 2026 year to date was ${ppLatest.medianDaysOnMarket} days (Miami MLS, closed sales through ${ppThrough}). That is a city median, not a forecast for your home. Carlos provides a property-specific review; it is not a guarantee of outcome.`,
  },
  {
    q: "Do you work with sellers and buyers' agents in English and Spanish?",
    a: "Yes. Carlos and our team work in English and Spanish, with local sellers and with owners who live outside Florida. Every Pembroke Pines listing is offered to all qualified buyers through the Miami MLS and its syndication channels, in line with fair housing law.",
  },
  {
    q: "What are the most in-demand communities in Pembroke Pines?",
    a: "Master-planned communities with on-site amenities, security and proximity to schools attract steady buyer interest in Pembroke Pines. Silver Lakes, Pembroke Falls, and Chapel Trail are among the established names buyers ask about. Community health — financials, deferred maintenance, pending assessments — directly affects positioning strategy.",
  },
  {
    q: "What is the seller strategy review?",
    a: "A free, confidential session where our team reviews your property, its MLS positioning potential, current market comparables, and distribution strategy — with no listing commitment required. Submit the form below or contact Carlos directly via WhatsApp.",
  },
];

export default function SellPembrokePinesPage() {
  return (
    <>
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href="https://homesprofessional.com/sell-pembroke-pines" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/sell-pembroke-pines" />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:image" content={REPORT_OG} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={PAGE_TITLE} />
        <meta name="twitter:description" content={PAGE_DESCRIPTION} />
        <meta name="twitter:image" content={REPORT_OG} />
      </Helmet>
      <JsonLd id="sell-pembroke-pines-breadcrumb" data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Sell in South Florida", "item": "https://homesprofessional.com/sell" },
            { "@type": "ListItem", "position": 3, "name": "Sell in Pembroke Pines", "item": "https://homesprofessional.com/sell-pembroke-pines" }
          ]
        }} />
      <JsonLd id="sell-pembroke-pines-faq" data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": PEMBROKE_PINES_FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        }} />
      <JsonLd id="sell-pembroke-pines-service" data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Seller representation and MLS listing — Pembroke Pines, FL",
          "serviceType": "Real estate listing and seller representation",
          "areaServed": { "@type": "City", "name": "Pembroke Pines", "addressRegion": "FL", "addressCountry": "US" },
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "url": "https://homesprofessional.com/sell-pembroke-pines"
        }} />
      {([
        { lang: "en", name: "Pembroke Pines 4-bedroom market report, November 2026", description: "43-second briefing on Pembroke Pines, FL 4-bedroom single-family home prices, closed sales, days on market and sale-to-list results, 2020 to November 2026, from Miami MLS data." },
        { lang: "es", name: "Informe de mercado de viviendas de 4 habitaciones en Pembroke Pines, noviembre 2026", description: "Resumen de 43 segundos sobre precios, ventas cerradas, días en el mercado y relación venta/lista de viviendas unifamiliares de 4 habitaciones en Pembroke Pines, FL, de 2020 a noviembre de 2026, con datos del Miami MLS." },
      ] as const).map((v) => (
        <JsonLd key={v.lang} id={`sell-pembroke-pines-report-video-${v.lang}`} data={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": v.name,
          "description": v.description,
          "thumbnailUrl": `https://homesprofessional.com/images/reports/pembroke-pines-2026-11-poster-${v.lang}.jpg`,
          "contentUrl": `https://homesprofessional.com/videos/pembroke-pines-market-report-2026-11-${v.lang}.mp4`,
          "uploadDate": REPORT_PUBLISHED,
          "duration": "PT43S",
          "inLanguage": v.lang
        }} />
      ))}
      <JsonLd id="sell-pembroke-pines-report-dataset" data={{
          "@context": "https://schema.org",
          "@type": "Dataset",
          "name": "Pembroke Pines, FL 4-bedroom single-family home sales 2020-2026 (Miami MLS)",
          "description": "Closed sales, median and average sale price, median price per square foot, median days on market, median sale-to-list ratio and sales above, at and below final list price for 4-bedroom single-family detached homes in Pembroke Pines, Broward County, by year from 2020 through November 23, 2026, plus median sale price by subdivision.",
          "url": "https://homesprofessional.com/sell-pembroke-pines#pembroke-pines-market-report",
          "temporalCoverage": `2020-01-01/${pembrokePinesReport.dataThrough}`,
          "spatialCoverage": { "@type": "Place", "name": "Pembroke Pines, Florida" },
          "dateModified": REPORT_PUBLISHED,
          "publisher": { "@id": "https://homesprofessional.com/#agent" },
          "isBasedOn": "Miami MLS (SEFMLS)"
        }} />
      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep px-6 pt-20 pb-10 md:pt-28 md:pb-12 text-center sm:px-10">
          <LazyVideo idle src="/videos/luxury_listing_showcase.mp4" className="absolute inset-0 h-full w-full object-cover opacity-[0.14] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep/80 pointer-events-none" />
          <div className="relative">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Pembroke Pines, FL · Seller Advisory</p>
            <h1 className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}>
              Sell your Pembroke Pines home with the reach<br />
              <em className="italic text-gold">of the world's largest local REALTOR® association.</em>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
              Pembroke Pines' master-planned communities, schools and established neighborhoods call for pricing built on
              community-level evidence and wide professional exposure.
              Professional MLS positioning. Buyer-agent outreach. International distribution.
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

            {/* Address-first seller form above the fold; the full intake remains at #contact. */}
            <div className="mx-auto mt-8 max-w-xl">
              <HeroSellerForm progressiveDesktop sourcePage="sell-pembroke-pines-hero" />
            </div>
            <p className="mt-4 font-sans text-[13px] text-white/60">
              Want the pricing analysis first?{" "}
              <a href="/home-value" className="text-gold underline underline-offset-4 hover:text-white">Request a home value review</a>
            </p>

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
              <p className="font-sans text-sm italic leading-relaxed text-white/55">"Professional, responsive, and knowledgeable about the Pembroke Pines market. The strategy review was detailed and genuinely useful from the start."</p>
              <footer className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-gold/50">— Patricia M., Pembroke Pines, FL</footer>
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

        <PembrokePinesMarketReport />

        {/* Market positioning */}
        <section className="bg-ivory py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Why Pembroke Pines</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              A Broward residential market defined by its range of communities and price points.
            </h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-relaxed text-ink-primary/65">
              Pembroke Pines combines master-planned communities with everyday convenience: Pembroke Lakes Mall, C.B. Smith Park,
              Memorial Hospital West and direct access to I-75 and Florida's Turnpike. The city's range of price points, schools
              and suburban character draw first-time buyers and move-up families from across the region.
            </p>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline sm:grid-cols-3">
              {[
                { label: "Price Range", value: "Broad Mid-Market", sub: "Townhomes to large single-family homes across established sections" },
                { label: "Community Type", value: "Master-Planned Sections", sub: "Silver Lakes, Pembroke Falls, Chapel Trail and more" },
                { label: "Value Position", value: "Relative to Weston", sub: "Comparable community amenities at a different price point" },
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
                  Your Pembroke Pines listing, placed where<br />
                  <em className="italic text-gold">professional buyer agents work every day.</em>
                </h2>
                <p className="mt-6 font-sans text-base leading-relaxed text-white/65">
                  Professional MLS placement through United Realty Group means your property enters the network of a Florida brokerage with 3,500+ agents across the Florida office network — not a portal, but a coordinated professional infrastructure.
                </p>
                <ul className="mt-8 space-y-3">
                  {[
                    "Miami and South Florida REALTORS® MLS — 93,000 association members",
                    "Eligible syndication across 200+ global portals in 19 languages",
                    "United Realty Group — 3,500+ agents across the Florida office network",
                    "Bilingual English and Spanish representation",
                    "437+ international agreements across 75+ countries",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 font-sans text-sm text-white/70">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-sans text-[11px] leading-relaxed text-white/45">Sources: {figures.members.source} · {figures.globalWebsites.source} · {figures.languages.source} · {figures.partnerAssociations.source} · {figures.countries.source} · {figures.urgAgents.source}.</p>
              </div>
              <div className="space-y-px border border-white/10">
                {[
                  { label: "Strategy", text: "Pricing analysis + CMA specific to your Pembroke Pines community" },
                  { label: "Positioning", text: "Professional MLS placement through United Realty Group" },
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
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Pembroke Pines Sellers Ask</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white lg:text-5xl">Common questions.</h2>
            </div>
            <FaqAccordion faqs={PEMBROKE_PINES_FAQS} />
          </div>
        </section>

        {/* Journal crosslinks */}
        <section className="bg-ivory py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-6">Pembroke Pines Market Research</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="/journal/selling-pembroke-pines-home-2026" className="block border border-hairline bg-white p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 mb-3">Seller Strategy</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">Selling a Home in Pembroke Pines — Community Choice and Buyer Pool Depth</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the market analysis →</p>
              </a>
              <a href="/journal/hoa-impact-home-sale-south-florida-2026" className="block border border-hairline bg-white p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 mb-3">Seller Strategy</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">HOA Financials and Your Home's Sale Price — What Pembroke Pines Sellers Need to Know</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the HOA guide →</p>
              </a>
            </div>
          </div>
        </section>

        {/* Market snapshot — MIAMI REALTORS® April 2026 city report (src/data/cityMarketStats.ts) */}
        <NeighborhoodMarketStats city="Pembroke Pines" />
        <CityListingsSample city="Pembroke Pines" />
        <NearbyMarkets current="sell-pembroke-pines" />

        {/* Confidential intake */}
        <section className="bg-navy-deep py-16 md:py-24" id="contact">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Pembroke Pines Seller Review</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Request a private property positioning review.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                No listing commitment required. Our team reviews every Pembroke Pines submission before responding.
              </p>
            </div>
            <SellerIntakeForm sourcePage="sell-pembroke-pines" />
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
              <a href="/sell" className="hover:text-gold">Sell in South Florida</a>
              {" · "}
              Pembroke Pines, FL
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
