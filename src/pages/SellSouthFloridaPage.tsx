import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { BadgeCheck } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { DesktopStickyCTA } from "../components/DesktopStickyCTA";
import { ExitIntentModal } from "../components/ExitIntentModal";
import { SellersReachHero } from "../components/SellersReachHero";
import { SellerSellingSystem } from "../components/SellerSellingSystem";
import { SellerNetCalculator } from "../components/SellerNetCalculator";
import { Testimonials } from "../components/Testimonials";
import { FAQ } from "../components/FAQ";
import { SellerIntakeForm } from "../components/forms/SellerIntakeForm";

export default function SellSouthFloridaPage() {
  return (
    <>
      <Helmet>
        <title>South Florida Seller Representation | Carlos Uzcategui</title>
        <meta
          name="description"
          content="Selling a home in South Florida? Strategic MLS positioning, cooperating buyer-agent relations, contract defense, and estimated proceeds with Carlos Uzcategui. No listing commitment."
        />
        <link rel="canonical" href="https://homesprofessional.com/sell" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/sell" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/sell" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/vender" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/sell" />
        <meta property="og:title" content="South Florida Seller Representation | Carlos Uzcategui" />
        <meta
          property="og:description"
          content="Selling a home in South Florida? Strategic MLS positioning, cooperating buyer-agent relations, contract defense, and estimated proceeds with Carlos Uzcategui. No listing commitment."
        />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="South Florida Seller Representation | Carlos Uzcategui" />
        <meta
          name="twitter:description"
          content="Selling a home in South Florida? Strategic MLS positioning, cooperating buyer-agent relations, contract defense, and estimated proceeds with Carlos Uzcategui. No listing commitment."
        />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>

      <JsonLd
        id="sell-south-florida-breadcrumb"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://homesprofessional.com/" },
            { "@type": "ListItem", position: 2, name: "Sell in South Florida", item: "https://homesprofessional.com/sell" },
          ],
        }}
      />

      <JsonLd
        id="sell-south-florida-howto"
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Sell Your South Florida Property",
          description:
            "A structured 4-stage process to position, prepare, distribute on the MLS, and negotiate your South Florida property with professional visibility and contract protection.",
          tool: [
            { "@type": "HowToTool", name: "Miami and South Florida REALTORS® MLS" },
            { "@type": "HowToTool", name: "Eligible approved syndication channels" },
            { "@type": "HowToTool", name: "United Realty Group Agent Network" },
          ],
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "Position",
              text: "Pricing analysis, timing strategy, buyer profile identification, and property narrative development.",
            },
            {
              "@type": "HowToStep",
              position: 2,
              name: "Prepare",
              text: "Presentation guidance, professional photography, HOA estoppel packages, and launch sequencing.",
            },
            {
              "@type": "HowToStep",
              position: 3,
              name: "Distribute",
              text: "Professional MLS activation through United Realty Group with eligible syndication across approved distribution channels.",
            },
            {
              "@type": "HowToStep",
              position: 4,
              name: "Negotiate",
              text: "Cooperating buyer-agent relations, MLS reverse prospecting, contract term strategy, and closing coordination.",
            },
          ],
        }}
      />

      <JsonLd
        id="sell-south-florida-service"
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Seller representation and MLS listing - South Florida",
          serviceType: "Real estate listing and seller representation",
          areaServed: { "@type": "AdministrativeArea", name: "South Florida" },
          provider: {
            "@id": "https://homesprofessional.com/#agent",
          },
          url: "https://homesprofessional.com/sell",
        }}
      />

      <main id="main-content" className="seller-page min-h-screen bg-white-soft grain-overlay pb-28 lg:pb-0">
        <Navbar />

        {/* Section 1: Executive Seller Hero */}
        <SellersReachHero />

        {/* Section 2 & 3: 4-Stage Selling System & The Cooperating Market Reality (>90%) */}
        <SellerSellingSystem />

        {/* Section 4: Interactive Net Proceeds Calculator */}
        <SellerNetCalculator sourcePage="sell-south-florida" />

        {/* Section 5: Proven Client Track Record (Diego Tolotto post-occupancy & verified reviews) */}
        <Testimonials />

        {/* Section 6: Seller FAQ, Research Library & Confidential Intake */}
        <FAQ />

        {/* Seller Research Library */}
        <section className="bg-ivory py-12 md:py-20 border-t border-hairline" aria-labelledby="research-library-heading">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl mb-8 md:mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink font-semibold">
                Seller Research &amp; Advisory
              </p>
              <h2 id="research-library-heading" className="mt-2 font-serif text-2xl text-navy-deep sm:text-3xl md:text-4xl">
                Critical Financial &amp; Legal Guides Before You List
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
              <a
                href="/journal/seller-closing-costs-south-florida-2026"
                className="group flex flex-col justify-between border border-hairline bg-white p-6 transition-all duration-300 hover:border-gold hover:shadow-md"
              >
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-ink font-semibold mb-2">Net Proceeds Strategy</p>
                  <h3 className="font-serif text-lg leading-snug text-navy-deep group-hover:text-gold-ink transition-colors">
                    What Does It Cost to Sell a Home in South Florida — A Guide to Net Proceeds
                  </h3>
                  <p className="mt-2.5 font-sans text-xs leading-relaxed text-navy/70">
                    A realistic accounting of Florida documentary stamp taxes, title fees, and settlement prorations.
                  </p>
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-navy font-medium">Read the guide →</p>
              </a>

              <a
                href="/journal/hoa-impact-home-sale-south-florida-2026"
                className="group flex flex-col justify-between border border-hairline bg-white p-6 transition-all duration-300 hover:border-gold hover:shadow-md"
              >
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-ink font-semibold mb-2">Condo &amp; HOA Advisory</p>
                  <h3 className="font-serif text-lg leading-snug text-navy-deep group-hover:text-gold-ink transition-colors">
                    HOA Financials and Your Home's Sale Price — What South Florida Sellers Need to Know
                  </h3>
                  <p className="mt-2.5 font-sans text-xs leading-relaxed text-navy/70">
                    How reserve studies, milestone inspections, and HOA estoppel packages impact buyer financing.
                  </p>
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-navy font-medium">Read the guide →</p>
              </a>

              <a
                href="/journal/when-to-list-south-florida-home-2026"
                className="group flex flex-col justify-between border border-hairline bg-white p-6 transition-all duration-300 hover:border-gold hover:shadow-md"
              >
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-ink font-semibold mb-2">Market Analysis</p>
                  <h3 className="font-serif text-lg leading-snug text-navy-deep group-hover:text-gold-ink transition-colors">
                    When to List Your South Florida Home — Timing, Pricing, and the Cost of Waiting
                  </h3>
                  <p className="mt-2.5 font-sans text-xs leading-relaxed text-navy/70">
                    Seasonal inventory shifts, winter migration patterns, and competitive positioning windows.
                  </p>
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-navy font-medium">Read the guide →</p>
              </a>

              <a
                href="/journal/florida-homestead-portability-benefits-2026"
                className="group flex flex-col justify-between border border-hairline bg-white p-6 transition-all duration-300 hover:border-gold hover:shadow-md"
              >
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-ink font-semibold mb-2">Tax Strategy</p>
                  <h3 className="font-serif text-lg leading-snug text-navy-deep group-hover:text-gold-ink transition-colors">
                    Florida Homestead &amp; Save Our Homes Portability — What Owners Must Understand
                  </h3>
                  <p className="mt-2.5 font-sans text-xs leading-relaxed text-navy/70">
                    How transferring accumulated tax assessment savings protects your equity when upgrading or downsizing.
                  </p>
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-navy font-medium">Read the guide →</p>
              </a>

              <a
                href="/journal/home-sale-capital-gains-exclusion-500k-2026"
                className="group flex flex-col justify-between border border-hairline bg-white p-6 transition-all duration-300 hover:border-gold hover:shadow-md"
              >
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-ink font-semibold mb-2">Capital Gains</p>
                  <h3 className="font-serif text-lg leading-snug text-navy-deep group-hover:text-gold-ink transition-colors">
                    The $250,000 / $500,000 Capital Gains Exclusion for Primary Residences
                  </h3>
                  <p className="mt-2.5 font-sans text-xs leading-relaxed text-navy/70">
                    IRS Section 121 rules, ownership timelines, and documentation best practices.
                  </p>
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-navy font-medium">Read the guide →</p>
              </a>

              <a
                href="/journal/1031-exchange-south-florida-investment-property-2026"
                className="group flex flex-col justify-between border border-hairline bg-white p-6 transition-all duration-300 hover:border-gold hover:shadow-md"
              >
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold-ink font-semibold mb-2">Portfolio Exit</p>
                  <h3 className="font-serif text-lg leading-snug text-navy-deep group-hover:text-gold-ink transition-colors">
                    The 1031 Exchange — Deferring Capital Gains on South Florida Investment Sales
                  </h3>
                  <p className="mt-2.5 font-sans text-xs leading-relaxed text-navy/70">
                    Strict 45-day identification and 180-day closing deadlines for residential and commercial replacement assets.
                  </p>
                </div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-navy font-medium">Read the guide →</p>
              </a>
            </div>
          </div>
        </section>

        {/* Confidential Seller Strategy Intake Form */}
        <section className="bg-navy-deep py-16 md:py-24 text-white" id="contact" aria-labelledby="seller-intake-heading">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center md:mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
                Private Advisory Desk
              </p>
              <h2 id="seller-intake-heading" className="mt-2 font-serif text-3xl text-white sm:text-4xl">
                Request Your Private Seller Strategy Review.
              </h2>
              <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/70 md:text-base">
                Carlos reviews your property details, pricing comps, and next-move priorities, then contacts you to arrange a strategy conversation. No listing commitment.
              </p>
            </div>

            <SellerIntakeForm sourcePage="sell-south-florida" />

            <div className="mt-6 flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
              <BadgeCheck size={14} className="text-gold" />
              Confidential · Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity
            </div>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
        <DesktopStickyCTA ctaHref="#contact" />
        <ExitIntentModal />
      </main>
    </>
  );
}
