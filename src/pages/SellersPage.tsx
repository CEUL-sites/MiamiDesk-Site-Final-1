import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { SellerSection } from "../components/SellerSection";
import { ReachAdvantage } from "../components/ReachAdvantage";
import { ExposureSyndication } from "../components/ExposureSyndication";
import { PartnersMarquee } from "../components/PartnersMarquee";
import { GlobalPartnerNetwork } from "../components/GlobalPartnerNetwork";
import { SellerIntakeForm } from "../components/forms/SellerIntakeForm";
import { BadgeCheck, Download } from "lucide-react";
import { CONTACT, LEAD_MAGNETS } from "../constants";

export default function SellersPage() {
  return (
    <>
      <Helmet>
        <title>Sell Your South Florida Home | Seller Strategy Review | United Realty Group</title>
        <meta name="description" content="Senior seller advisory: pricing discipline, professional MLS positioning, buyer-agent visibility, and expanded exposure infrastructure across South Florida. Free strategy review — Carlos Uzcategui · FL SL705771." />
        <meta name="keywords" content="sell home South Florida, sell house Miami, Miami MLS listing, Coral Gables realtor, Brickell condo for sale, Miami Beach seller agent, Weston home for sale, South Florida listing agent, United Realty Group" />
        <link rel="canonical" href="https://homesprofessional.com/sell" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Sell Your South Florida Home", "item": "https://homesprofessional.com/sell" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "How to Sell Your South Florida Home",
          "description": "A proven 5-step process to position, prepare, launch, activate, and close your South Florida property with maximum MLS exposure.",
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
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How do I sell my home fast in South Florida?", "acceptedAnswer": { "@type": "Answer", "text": "The fastest path to sale combines correct pricing with professional MLS activation through the Miami and South Florida REALTORS® — providing buyer-agent visibility and eligible syndication across approved distribution channels. Our free seller strategy review covers pricing, timing, and buyer profile before listing." } },
            { "@type": "Question", "name": "How long does it take to sell a home in Miami?", "acceptedAnswer": { "@type": "Answer", "text": "In 2025, Miami-Dade properties priced $500K–$1.5M are moving in 30–60 days with correct positioning. Above $2M, typical cycles run 60–120 days. We provide a neighborhood-specific timeline assessment as part of every free seller strategy review." } },
            { "@type": "Question", "name": "What is included in the free seller strategy review?", "acceptedAnswer": { "@type": "Answer", "text": "The review is completely free with no listing commitment required. It covers pricing analysis, market timing, positioning recommendation, and a professional buyer profile for your property." } },
            { "@type": "Question", "name": "Which South Florida neighborhoods do you serve?", "acceptedAnswer": { "@type": "Answer", "text": "We serve all of Miami-Dade, Broward, and Palm Beach counties including Coral Gables, Brickell, Miami Beach, Aventura, Weston, Doral, Fort Lauderdale, Boca Raton, and West Palm Beach." } }
          ]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <section className="overflow-hidden bg-navy-deep px-6 py-16 md:py-20 text-center sm:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">South Florida Seller Strategy</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3rem)" }}>
            Sell Your South Florida Home.<br />
            <em className="not-italic italic text-gold">Professional Positioning. Expanded Exposure.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55">
            Senior seller advisory built around pricing discipline, professional MLS positioning, buyer-agent visibility, and eligible syndication across approved distribution channels.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={CONTACT.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
            >
              Schedule a Strategy Call
            </a>
            <a
              href={CONTACT.whatsappUS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              WhatsApp
            </a>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2">
            <a
              href={LEAD_MAGNETS.sellerNetSheet.url}
              download
              className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline"
            >
              <Download size={11} />
              Download Seller's Net Sheet 2026
            </a>
          </div>
          <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
            United Realty Group · CLHMS · Certified Seller Rep · FL SL705771
          </p>
        </section>
        <ReachAdvantage />
        <SellerSection />
        <ExposureSyndication />
        <PartnersMarquee />
        <GlobalPartnerNetwork />
        <section className="bg-navy-deep py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Confidential Seller Desk</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Ready to move forward?</h2>
            </div>
            <SellerIntakeForm />
            <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
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
