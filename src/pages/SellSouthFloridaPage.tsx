import { Helmet } from "react-helmet-async";
import { BadgeCheck, ChevronRight, Download } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { SellerSection } from "../components/SellerSection";
import { ReachAdvantage } from "../components/ReachAdvantage";
import { GlobalPartnerNetwork } from "../components/GlobalPartnerNetwork";
import { SellerIntakeForm } from "../components/forms/SellerIntakeForm";
import { CONTACT, LEAD_MAGNETS } from "../constants";

const WHO_THIS_IS_FOR = [
  {
    title: "South Florida Homeowners",
    body: "Selling a primary residence in Miami-Dade, Broward, or Palm Beach? The right MLS strategy and buyer-agent activation determine outcome more than the listing platform.",
  },
  {
    title: "International Property Owners in Florida",
    body: "Florida-based property owned by non-resident or internationally-based sellers. Full advisory, MLS positioning, and coordination through every step — regardless of where you are located.",
  },
  {
    title: "Investors Exiting South Florida Positions",
    body: "Condo investors, portfolio sellers, and buy-to-let holders across the Miami MLS footprint. Pricing discipline and structural distribution matter most at exit.",
  },
  {
    title: "Latin American & European Sellers",
    body: "Spanish and Latin American property owners with Florida assets. Bilingual advisory in English and Spanish. Compliant representation through a licensed Florida professional.",
  },
];

export default function SellSouthFloridaPage() {
  return (
    <>
      <Helmet>
        <title>Sell With South Florida MLS Exposure | Carlos Uzcategui, United Realty Group</title>
        <meta name="description" content="South Florida seller advisory: MLS positioning, buyer-agent activation, international visibility, and negotiation through every step. Carlos Uzcategui, FL SL705771, United Realty Group." />
        <meta name="keywords" content="sell home South Florida, sell house Miami, Miami MLS listing, Coral Gables realtor, Brickell condo for sale, Miami Beach seller agent, Weston home for sale, South Florida listing agent, United Realty Group" />
        <link rel="canonical" href="https://homesprofessional.com/sell-south-florida" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Sell in South Florida", "item": "https://homesprofessional.com/sell-south-florida" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Sell Your South Florida Property",
          "description": "A 5-step process to position, prepare, launch, activate, and close your South Florida property with MLS exposure and international distribution.",
          "totalTime": "P30D",
          "tool": [
            { "@type": "HowToTool", "name": "Miami and South Florida REALTORS® MLS" },
            { "@type": "HowToTool", "name": "500+ Global Websites in 19 Languages" },
            { "@type": "HowToTool", "name": "United Realty Group Agent Network" }
          ],
          "step": [
            { "@type": "HowToStep", "position": 1, "name": "Position", "text": "Pricing analysis, timing strategy, buyer profile identification, and property narrative development." },
            { "@type": "HowToStep", "position": 2, "name": "Prepare", "text": "Presentation guidance, professional photography coordination, MLS data accuracy, and launch sequencing." },
            { "@type": "HowToStep", "position": 3, "name": "Launch", "text": "Professional MLS activation through United Realty Group with eligible syndication across approved distribution channels and expanded buyer-agent visibility." },
            { "@type": "HowToStep", "position": 4, "name": "Activate", "text": "Targeted outreach to buyer agents, international referral channels, and LATAM and Spain pipeline activation." },
            { "@type": "HowToStep", "position": 5, "name": "Negotiate", "text": "Offer review, terms strategy, inspection response, and closing coordination." }
          ]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="relative overflow-hidden bg-navy-deep px-6 py-20 md:py-28 text-center sm:px-10">
          {/* Cinematic drone background */}
          <video autoPlay muted loop playsInline aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.13] pointer-events-none">
            <source src="/videos/luxury_waterfront_drone.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-navy-deep/80 pointer-events-none" />
          <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">South Florida Listing Advisory</p>
          <h1
            className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white"
            style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}
          >
            Expose Your Property to<br />
            <em className="not-italic italic text-gold">the South Florida Buyer Network.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
            Features describe a property. Distribution determines its price.
            Professional MLS positioning, buyer-agent activation, and international
            visibility — structured for sellers who need more than a sign in the yard.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
            >
              Request a Confidential Property Review
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
            United Realty Group · CLHMS · Certified Seller Rep · FL SL705771 · 25 Years Licensed in Florida
          </p>
          </div>{/* end relative */}
        </section>

        <ReachAdvantage />

        {/* Miami Realtors Association — Why You Need a Miami Realtor */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Why Miami MLS Representation Matters</p>
              <h2 className="mt-5 font-serif text-3xl leading-tight text-navy-deep md:text-4xl max-w-2xl mx-auto">
                The case for professional representation — from the Association itself.
              </h2>
              <p className="mx-auto mt-5 max-w-xl font-sans text-sm leading-relaxed text-ink-primary/60">
                Miami and South Florida REALTORS® is the world's largest local REALTOR® association. This is their explanation
                of what a REALTOR® brings to every transaction — and why it matters in one of the most competitive real estate
                markets in the United States.
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
            <p className="mt-4 text-center font-mono text-[8px] uppercase tracking-[0.18em] text-ink-primary/35">
              Video: Miami and South Florida REALTORS® · miamirealtors.com
            </p>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="bg-ivory py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Who this is for</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              South Florida sellers at every stage and location.
            </h2>
            <div className="mt-10 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
              {WHO_THIS_IS_FOR.map((item) => (
                <div key={item.title} className="bg-white p-7">
                  <h3 className="font-serif text-xl text-navy-deep">{item.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-ink-primary/65">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SellerSection />
        <GlobalPartnerNetwork />

        {/* Confidential intake */}
        <section className="bg-navy-deep py-16 md:py-24" id="contact">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Confidential Seller Desk</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Request a private property positioning review.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                No listing commitment required. Carlos reviews every submission personally before responding.
              </p>
            </div>
            <SellerIntakeForm />
            <div className="mt-6 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
              <BadgeCheck size={14} className="text-gold" />
              Confidential · Licensed Professionals · Equal Housing Opportunity
            </div>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
