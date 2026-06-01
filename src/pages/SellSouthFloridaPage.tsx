import { Helmet } from "react-helmet-async";
import { BadgeCheck, ChevronRight, Download } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { SellerSection } from "../components/SellerSection";
import { ReachAdvantage } from "../components/ReachAdvantage";
import { ExposureSyndication } from "../components/ExposureSyndication";
import { PartnersMarquee } from "../components/PartnersMarquee";
import { GlobalPartnerNetwork } from "../components/GlobalPartnerNetwork";
import { SellerIntakeForm } from "../components/forms/SellerIntakeForm";
import { CONTACT, LEAD_MAGNETS } from "../constants";

const PILLARS = [
  {
    title: "Pricing Strategy",
    body: "Comparable analysis, absorption data, and buyer-profile mapping set a number the market can act on. Overpriced inventory accumulates days on market and ultimately closes below a correctly set initial ask.",
  },
  {
    title: "MLS Positioning",
    body: "Professional MLS activation through the Miami and South Florida REALTORS® — the third-largest MLS in the United States — with accurate data, layered search visibility, and buyer-agent activation from day one.",
  },
  {
    title: "Buyer-Agent Exposure",
    body: "93,000 member agents inside the Miami and South Florida REALTORS® network. A well-positioned listing reaches the agents who already have qualified buyers. Activation is structural, not accidental.",
  },
  {
    title: "International Visibility",
    body: "500+ global portals in 19 languages. 437+ international agreements. A referral network of 1 million+ professionals across 70+ countries. The right buyer may not be local.",
  },
  {
    title: "Negotiation & Offer Management",
    body: "Offer review, terms strategy, inspection response, appraisal context, and closing coordination — all managed from a position of informed seller authority, not pressure.",
  },
  {
    title: "Seller Advisory, Start to Close",
    body: "From preparation to close, the advisory is continuous: presentation guidance, media coordination, timeline management, and professional representation through every inflection point.",
  },
];

export default function SellSouthFloridaPage() {
  return (
    <>
      <Helmet>
        <title>Sell Your South Florida Property With Institutional-Level Positioning | HomesProfessional.com</title>
        <meta name="description" content="South Florida seller advisory: pricing strategy, professional MLS positioning, buyer-agent activation, international visibility, and negotiation through every step. Carlos Uzcategui, FL SL705771, United Realty Group." />
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
          "description": "A 5-step process to position, prepare, launch, activate, and close your South Florida property with institutional-level MLS exposure.",
          "totalTime": "P30D",
          "tool": [
            { "@type": "HowToTool", "name": "Miami and South Florida REALTORS® MLS" },
            { "@type": "HowToTool", "name": "500+ Global Portals in 19 Languages" },
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
        <section className="overflow-hidden bg-navy-deep px-6 py-20 md:py-28 text-center sm:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">South Florida Listing Advisory</p>
          <h1
            className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white"
            style={{ fontSize: "clamp(1.9rem, 5.5vw, 3.2rem)" }}
          >
            Sell Your South Florida Property<br />
            <em className="not-italic italic text-gold">With Institutional-Level Positioning.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
            Your home's value is not determined only by its features. It is shaped by pricing, positioning,
            buyer-agent activation, MLS distribution, digital exposure, and negotiation strategy.
            Listing strategy is not decoration. It is market positioning.
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
        </section>

        <ReachAdvantage />

        {/* Six Pillars of Positioning */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">What shapes the outcome</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Built for sellers who need more than a sign, a portal, and a prayer.
            </h2>
            <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-ink-primary/60">
              Real estate is local. Serious exposure is networked. Every element below is part of an active advisory engagement — not a checklist handed to you after signing.
            </p>
            <div className="mt-12 grid gap-px border border-hairline bg-hairline md:grid-cols-2 lg:grid-cols-3">
              {PILLARS.map((p) => (
                <div key={p.title} className="bg-white p-8">
                  <h3 className="font-serif text-xl text-navy-deep">{p.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/65">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <SellerSection />
        <ExposureSyndication />
        <PartnersMarquee />
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
