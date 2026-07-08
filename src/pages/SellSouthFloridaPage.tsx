import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { BadgeCheck, ChevronRight, Download } from "lucide-react";
import { AuroraBackground } from "../components/AuroraBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { DesktopStickyCTA } from "../components/DesktopStickyCTA";
import { ExitIntentModal } from "../components/ExitIntentModal";
import { ProofStrip } from "../components/ProofStrip";
import { LazyVideo } from "../components/LazyVideo";
import { HeroReachBar } from "../components/HeroReachBar";
import { SellerSection } from "../components/SellerSection";
import { ReachAdvantage } from "../components/ReachAdvantage";
import { ExposureSyndication } from "../components/ExposureSyndication";
import { AdvisorBrand } from "../components/AdvisorBrand";
import { FAQ } from "../components/FAQ";
import { Testimonials } from "../components/Testimonials";
import { SellerIntakeForm } from "../components/forms/SellerIntakeForm";
import { SellerNetCalculator } from "../components/SellerNetCalculator";
import { CONTACT, LEAD_MAGNETS, SOURCES, MESSAGING } from "../constants";

const WHO_THIS_IS_FOR = [
  {
    title: "South Florida Homeowners",
    body: "Selling a home in Miami-Dade, Broward, or Palm Beach — where MLS strategy decides the outcome.",
  },
  {
    title: "International Property Owners in Florida",
    body: "Non-resident owners of Florida property. Full advisory and MLS positioning, wherever you live.",
  },
  {
    title: "Investors Exiting South Florida Positions",
    body: "Condo investors and portfolio sellers. Pricing discipline and distribution matter most at exit.",
  },
  {
    title: "Latin American & European Sellers",
    body: "Bilingual advisory in English and Spanish, through a licensed Florida professional.",
  },
];

export default function SellSouthFloridaPage() {
  return (
    <>
      <Helmet>
        <title>Sell With South Florida MLS Exposure | Carlos Uzcategui, United Realty Group</title>
        <meta name="description" content="South Florida seller advisory — professional MLS positioning, buyer-agent activation, and distribution. Carlos Uzcategui, FL SL705771, United Realty Group." />
        <meta name="keywords" content="sell home South Florida, sell house Miami, Miami MLS listing, Coral Gables realtor, Brickell condo for sale, Miami Beach seller agent, Weston home for sale, South Florida listing agent, United Realty Group" />
        <link rel="canonical" href="https://homesprofessional.com/sell-south-florida" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/sell-south-florida" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/sell-south-florida" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/vender" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/sell-south-florida" />
        <meta property="og:title" content="Sell With South Florida MLS Exposure | Carlos Uzcategui, United Realty Group" />
        <meta property="og:description" content="Professional MLS positioning, buyer-agent activation, and distribution through the network that moves serious South Florida transactions. Free, confidential seller strategy review." />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sell With South Florida MLS Exposure | Carlos Uzcategui" />
        <meta name="twitter:description" content="Professional MLS positioning and buyer-agent distribution for South Florida sellers. Free, confidential strategy review." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>
      <JsonLd id="sell-south-florida-breadcrumb" data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Sell in South Florida", "item": "https://homesprofessional.com/sell-south-florida" }
          ]
        }} />
      <JsonLd id="sell-south-florida-howto" data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Sell Your South Florida Property",
          "description": "A 5-step process to position, prepare, launch, activate, and close your South Florida property with MLS exposure and international distribution.",
          "totalTime": "P30D",
          "tool": [
            { "@type": "HowToTool", "name": "Miami and South Florida REALTORS® MLS" },
            { "@type": "HowToTool", "name": "200+ Global Portals in 19 Languages" },
            { "@type": "HowToTool", "name": "United Realty Group Agent Network" }
          ],
          "step": [
            { "@type": "HowToStep", "position": 1, "name": "Position", "text": "Pricing analysis, timing strategy, buyer profile identification, and property narrative development." },
            { "@type": "HowToStep", "position": 2, "name": "Prepare", "text": "Presentation guidance, professional photography coordination, MLS data accuracy, and launch sequencing." },
            { "@type": "HowToStep", "position": 3, "name": "Launch", "text": "Professional MLS activation through United Realty Group with eligible syndication across approved distribution channels and expanded buyer-agent visibility." },
            { "@type": "HowToStep", "position": 4, "name": "Activate", "text": "Targeted outreach to buyer agents, international referral channels, and LATAM and Spain pipeline activation." },
            { "@type": "HowToStep", "position": 5, "name": "Negotiate", "text": "Offer review, terms strategy, inspection response, and closing coordination." }
          ]
        }} />
      <JsonLd id="sell-south-florida-faq" data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How do I sell my South Florida home?", "acceptedAnswer": { "@type": "Answer", "text": "It starts with positioning — the right price, the right timing, and professional MLS activation. Carlos provides a no-cost strategy review to assess your property, advise on pricing, and launch through the Miami MLS with professional buyer-agent visibility and eligible syndication across approved distribution channels. No obligation. Just a strategy." } },
            { "@type": "Question", "name": "What is the Miami MLS and why does it matter?", "acceptedAnswer": { "@type": "Answer", "text": "The Miami and South Florida REALTORS® MLS is the world's largest local Realtor® association — over 93,000 member agents. When your property is listed, it reaches every agent's buyer pipeline and eligible listings may be distributed across 200+ global portals in 19 languages. The MLS is where qualified buyers are found." } },
            { "@type": "Question", "name": "Do you work with Latin American and Spanish buyers?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. South Florida's luxury market runs on Latin American capital. Carlos built those relationships deal by deal over 25 years. Miami Global Listing Desk connects selected Spanish and international inventory to South Florida buyer-agent activation through Carlos Uzcategui, Florida Realtor®, and United Realty Group." } },
            { "@type": "Question", "name": "How long does it take to sell in South Florida?", "acceptedAnswer": { "@type": "Answer", "text": "It varies by price band, condition, and positioning. Per Miami and South Florida REALTORS® MLS data, well-positioned homes in the lower price bands have typically transacted faster than luxury product above $2M. Carlos provides a neighborhood-specific timeline assessment as part of every seller strategy review — this is not a guarantee of any specific outcome, and no listing commitment is required." } },
            { "@type": "Question", "name": "Can a Spanish property be promoted through the Global Desk?", "acceptedAnswer": { "@type": "Answer", "text": "Miami Global Listing Desk can help selected Spanish and international prime properties enter the South Florida professional real estate ecosystem through Carlos Uzcategui, Florida Realtor®, operating through United Realty Group. Any MLS, portal, brokerage, or cooperation activity is subject to brokerage, platform, and compliance requirements and does not guarantee placement, leads, buyers, commissions, or sales." } },
            { "@type": "Question", "name": "Is the seller strategy review really free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, and there is no listing commitment required. The review covers pricing analysis, market timing, positioning recommendation, and a professional profile of the most likely buyer for your property." } }
          ]
        }} />
      <JsonLd id="sell-south-florida-service" data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Seller representation and MLS listing — South Florida",
          "serviceType": "Real estate listing and seller representation",
          "areaServed": { "@type": "AdministrativeArea", "name": "South Florida" },
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Carlos Uzcategui",
            "url": "https://homesprofessional.com/sell-south-florida"
          },
          "url": "https://homesprofessional.com/sell-south-florida"
        }} />
      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep px-6 pt-20 pb-10 md:pt-28 md:pb-12 text-center sm:px-10">
          <AuroraBackground variant="warm" />
          {/* Cinematic drone background */}
          <LazyVideo
            eager
            src="/videos/luxury_waterfront_drone.mp4"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.13] pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep/80 pointer-events-none" />
          <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">South Florida Listing Advisory</p>
          <h1
            className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white"
            style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}
          >
            The more agents who can sell your home,{" "}
            <em className="italic text-gold">the more buyers compete for it.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl font-sans text-base leading-relaxed text-white/60">
            Most serious buyers — local and international — arrive through their own
            agent. I put your home in front of all of them, so the right buyer finds
            it — wherever in the world they're searching from.
          </p>

          {/* What you get — the concrete deliverables of the review */}
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
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
            >
              Get My Home Value &amp; Strategy
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

          {/* Risk-reversal + social proof — lowers friction right at the CTA */}
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

          <div className="mt-5 flex items-center justify-center gap-2">
            <a
              href={LEAD_MAGNETS.sellerNetSheet.url}
              download
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline"
            >
              <Download size={11} />
              Or download the Seller's Net Sheet 2026
            </a>
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
            United Realty Group · CLHMS · Certified Seller Rep · FL SL705771 · 25 Years Licensed in Florida
          </p>
          <HeroReachBar />
          </div>{/* end relative */}
        </section>

        <ProofStrip />
        <ReachAdvantage />

        {/* Miami Realtors Association — Why You Need a Miami Realtor */}
        <section className="bg-white py-10 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-6 md:mb-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">Why Miami MLS Representation Matters</p>
              <h2 className="mt-3 font-serif text-2xl leading-tight text-navy-deep max-w-2xl mx-auto md:mt-5 md:text-4xl">
                The case for professional representation — from the Association itself.
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-ink-primary/60 md:mt-5">
                In the Association's own words: what a REALTOR® changes about your transaction.
              </p>
            </div>
            {/* Responsive 16:9 video embed */}
            <div className="relative w-full overflow-hidden" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                width="560"
                height="315"
                src="https://www.youtube-nocookie.com/embed/U2BlBCFaiCo?si=jpLfmggFUuTw-qIG"
                title="Why You Need a Miami REALTOR® — Miami and South Florida REALTORS®"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-ink-primary/70 md:mt-4">
              Video: Miami and South Florida REALTORS® · miamirealtors.com
            </p>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="bg-ivory py-10 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">Who this is for</p>
            <h2 className="mt-3 max-w-3xl font-serif text-2xl leading-tight text-navy-deep md:mt-5 md:text-4xl">
              South Florida sellers at every stage and location.
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-px border border-hairline bg-hairline md:mt-10 md:grid-cols-2">
              {WHO_THIS_IS_FOR.map((item) => (
                <div key={item.title} className="bg-white p-3 md:p-7">
                  <h3 className="font-serif text-base leading-snug text-navy-deep md:text-xl">{item.title}</h3>
                  <p className="mt-1.5 font-sans text-xs leading-snug text-ink-primary/65 md:mt-2 md:text-sm md:leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Neighborhood seller pages */}
        <section className="bg-white border-t border-hairline py-5 md:py-10">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-ink mb-3 md:mb-5">Sell by Neighborhood</p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {[
                { label: "Miami",            href: "/sell-miami" },
                { label: "Brickell",         href: "/sell-brickell" },
                { label: "Downtown Miami",   href: "/sell-downtown-miami" },
                { label: "Coral Gables",     href: "/sell-coral-gables" },
                { label: "Doral",            href: "/sell-doral" },
                { label: "Kendall",          href: "/sell-kendall" },
                { label: "Aventura",         href: "/sell-aventura" },
                { label: "North Miami",      href: "/sell-north-miami" },
                { label: "Hallandale Beach", href: "/sell-hallandale-beach" },
                { label: "Weston",           href: "/sell-weston" },
                { label: "Fort Lauderdale",  href: "/sell-fort-lauderdale" },
                { label: "Pompano Beach",    href: "/sell-pompano-beach" },
                { label: "Coral Springs",    href: "/sell-coral-springs" },
                { label: "Pembroke Pines",   href: "/sell-pembroke-pines" },
                { label: "Plantation",       href: "/sell-plantation" },
                { label: "Sunrise",          href: "/sell-sunrise" },
                { label: "All Markets",      href: "/markets" },
              ].map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="border border-hairline px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-primary/60 hover:border-gold/50 hover:text-gold transition-colors md:px-5 md:py-2.5"
                >
                  {n.label} →
                </a>
              ))}
            </div>
          </div>
        </section>

        <SellerSection />

        {/* Why Buyer-Agent Relationships Matter */}
        <section className="relative overflow-hidden bg-navy-deep pt-8 pb-10 md:pt-20 md:pb-24 text-white">
          <AuroraBackground variant="subtle" />
          <LazyVideo
            src="/videos/best_exposure_listings.mp4"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.10]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/75 to-navy-deep/90" />
          <div className="relative mx-auto max-w-5xl px-6">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                The Professional Market
              </p>
              <h2 className="mt-3 font-serif text-2xl leading-tight text-white md:mt-5 md:text-4xl">
                Why buyer-agent relationships<br />
                <em className="italic text-gold">are half the strategy.</em>
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-white/65 md:mt-6">
                {SOURCES.buyerAgentStatement} A strong listing makes your property easy
                for those agents to find, show, defend, and recommend.
              </p>
              <div className="mt-3 border-l-2 border-gold/40 pl-5 md:mt-4">
                <p className="font-serif text-lg text-white/80 italic leading-relaxed">
                  "{MESSAGING.buyerAgentMessenger}"
                </p>
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70 md:mt-3">
                Source: {SOURCES.nar}
              </p>
            </div>

            <div className="mt-8 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 md:mt-14">
              {[
                {
                  title: "What a buyer agent needs from your listing",
                  items: [
                    "Clear MLS positioning and accurate data",
                    "Strong broker remarks where MLS rules allow",
                    "Fast response to agent inquiries and showing requests",
                    "Access instructions that reduce friction, not create it",
                    "Buyer-agent follow-up after showings",
                  ],
                },
                {
                  title: "What builds confidence for the buyer's decision",
                  items: [
                    "Pre-positioned disclosures and documentation",
                    "Improvement history and HOA detail package",
                    "Seller terms and timeline clarity",
                    "Neighborhood context and comparable support",
                    "Offer-quality review and negotiation strategy",
                  ],
                },
              ].map((col) => (
                <div key={col.title} className="bg-navy p-5 md:p-8">
                  <h3 className="font-serif text-lg text-white mb-3 md:mb-5">{col.title}</h3>
                  <ul className="space-y-2 md:space-y-3">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 font-sans text-sm text-white/65">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ExposureSyndication />
        <Testimonials />
        <AdvisorBrand />
        <SellerNetCalculator sourcePage="sell-south-florida" />
        <FAQ />

        {/* Journal crosslinks */}
        <section className="bg-ivory py-8 md:py-16">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink mb-4 md:mb-6">Seller Research Library</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
              <a href="/journal/seller-closing-costs-south-florida-2026" className="block border border-hairline bg-white p-4 hover:border-gold/40 transition-colors md:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink mb-2 md:mb-3">Seller Strategy</p>
                <h3 className="font-serif text-sm leading-snug text-navy-deep md:text-lg">What Does It Cost to Sell a Home in South Florida — A Guide to Net Proceeds</h3>
                <p className="mt-1.5 font-sans text-xs text-ink-primary/70 md:mt-2 md:text-sm">Read the cost guide →</p>
              </a>
              <a href="/journal/hoa-impact-home-sale-south-florida-2026" className="block border border-hairline bg-white p-4 hover:border-gold/40 transition-colors md:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink mb-2 md:mb-3">Seller Strategy</p>
                <h3 className="font-serif text-sm leading-snug text-navy-deep md:text-lg">HOA Financials and Your Home's Sale Price — What South Florida Sellers Need to Know</h3>
                <p className="mt-1.5 font-sans text-xs text-ink-primary/70 md:mt-2 md:text-sm">Read the HOA guide →</p>
              </a>
              <a href="/journal/when-to-list-south-florida-home-2026" className="block border border-hairline bg-white p-4 hover:border-gold/40 transition-colors md:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink mb-2 md:mb-3">Market Analysis</p>
                <h3 className="font-serif text-sm leading-snug text-navy-deep md:text-lg">When to List Your South Florida Home — Timing, Pricing, and the Cost of Waiting</h3>
                <p className="mt-1.5 font-sans text-xs text-ink-primary/70 md:mt-2 md:text-sm">Read the timing guide →</p>
              </a>
              <a href="/journal/florida-homestead-portability-benefits-2026" className="block border border-hairline bg-white p-4 hover:border-gold/40 transition-colors md:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink mb-2 md:mb-3">Seller Strategy</p>
                <h3 className="font-serif text-sm leading-snug text-navy-deep md:text-lg">Florida Homestead and Save Our Homes Portability — What Owners Should Understand Before They Sell</h3>
                <p className="mt-1.5 font-sans text-xs text-ink-primary/70 md:mt-2 md:text-sm">Read the homestead guide →</p>
              </a>
              <a href="/journal/home-sale-capital-gains-exclusion-500k-2026" className="block border border-hairline bg-white p-4 hover:border-gold/40 transition-colors md:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink mb-2 md:mb-3">Seller Strategy</p>
                <h3 className="font-serif text-sm leading-snug text-navy-deep md:text-lg">The $250,000 / $500,000 Home Sale Capital Gains Exclusion — How It Works for Primary Residences</h3>
                <p className="mt-1.5 font-sans text-xs text-ink-primary/70 md:mt-2 md:text-sm">Read the tax-exclusion guide →</p>
              </a>
              <a href="/journal/1031-exchange-south-florida-investment-property-2026" className="block border border-hairline bg-white p-4 hover:border-gold/40 transition-colors md:p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink mb-2 md:mb-3">Seller Strategy</p>
                <h3 className="font-serif text-sm leading-snug text-navy-deep md:text-lg">The 1031 Exchange — Deferring Capital Gains When You Sell South Florida Investment Property</h3>
                <p className="mt-1.5 font-sans text-xs text-ink-primary/70 md:mt-2 md:text-sm">Read the 1031 guide →</p>
              </a>
            </div>
          </div>
        </section>

        {/* Confidential intake */}
        <section className="bg-navy-deep py-10 md:py-24" id="contact">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-5 text-center md:mb-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Confidential Seller Desk</p>
              <h2 className="mt-2 font-serif text-2xl text-white md:mt-3 md:text-3xl">Request a private property positioning review.</h2>
              <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/50 md:mt-4">
                No listing commitment required. Carlos reviews every submission personally before responding.
              </p>
            </div>
            <SellerIntakeForm sourcePage="sell-south-florida" />
            <div className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70 md:mt-6">
              <BadgeCheck size={14} className="text-gold" />
              Confidential · Licensed Professionals · Equal Housing Opportunity
            </div>
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
