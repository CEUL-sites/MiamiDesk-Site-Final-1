import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { SellerSection } from "../components/SellerSection";
import { PropertyShowcase3D } from "../components/PropertyShowcase3D";
import { ReachAdvantage } from "../components/ReachAdvantage";
import { ExposureSyndication } from "../components/ExposureSyndication";
import { PartnersMarquee } from "../components/PartnersMarquee";
import { LeadForm } from "../components/LeadForm";
import { NeighborhoodGrid } from "../components/NeighborhoodGrid";
import { PageHero } from "../components/PageHero";
import { BadgeCheck } from "lucide-react";
import { CONTACT } from "../constants";

export default function SellersPage() {
  return (
    <>
      <Helmet>
        <title>Sell Your South Florida Home | 93,000 Realtors + 200 Global Portals | United Realty Group</title>
        <meta name="description" content="Your listing reaches 93,000 Realtors and 200+ global portals in 19 languages the day it goes live. Coral Gables, Brickell, Miami Beach, Weston, Aventura. Free strategy review — no commitment." />
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
            { "@type": "HowToStep", "position": 3, "name": "Launch", "text": "Live MLS activation through United Realty Group with simultaneous syndication to 200+ global portals in 19 languages the day your property goes live." },
            { "@type": "HowToStep", "position": 4, "name": "Activate", "text": "Targeted outreach to buyer agents, international referral channels, and LATAM and Spain pipeline activation." },
            { "@type": "HowToStep", "position": 5, "name": "Negotiate", "text": "Offer review, terms strategy, inspection response, and closing coordination." }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How do I sell my home fast in South Florida?", "acceptedAnswer": { "@type": "Answer", "text": "The fastest path to sale combines correct pricing with full Miami MLS activation — reaching 93,000 buyer agents the day your listing goes live, plus syndication to 200+ global portals. Our free seller strategy review covers pricing, timing, and buyer profile before listing." } },
            { "@type": "Question", "name": "How long does it take to sell a home in Miami?", "acceptedAnswer": { "@type": "Answer", "text": "In 2025, Miami-Dade properties priced $500K–$1.5M are moving in 30–60 days with correct positioning. Above $2M, typical cycles run 60–120 days. We provide a neighborhood-specific timeline assessment as part of every free seller strategy review." } },
            { "@type": "Question", "name": "What is included in the free seller strategy review?", "acceptedAnswer": { "@type": "Answer", "text": "The review is completely free with no listing commitment required. It covers pricing analysis, market timing, positioning recommendation, and a professional buyer profile for your property." } },
            { "@type": "Question", "name": "Which South Florida neighborhoods do you serve?", "acceptedAnswer": { "@type": "Answer", "text": "We serve all of Miami-Dade, Broward, and Palm Beach counties including Coral Gables, Brickell, Miami Beach, Aventura, Weston, Doral, Fort Lauderdale, Boca Raton, and West Palm Beach." } }
          ]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <PageHero
          eyebrow="South Florida Seller Strategy"
          headline="Sell Your South Florida Home."
          headlineGold="Maximum Global Exposure."
          subhead="Your listing activates inside the Miami and South Florida REALTORS® MLS — 93,000 member agents, 200+ global portals, 19 languages — the day it goes live."
          ctaLabel="Get My Free Strategy Review"
          ctaHref="/contact"
          whatsappHref={CONTACT.whatsappUS}
          badge="United Realty Group · CLHMS · Certified Seller Rep · FL SL705771"
        />
        <ReachAdvantage />
        <SellerSection />
        <PropertyShowcase3D />
        <ExposureSyndication />
        <PartnersMarquee />
        <NeighborhoodGrid />
        <section className="bg-navy-deep py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Confidential Seller Desk</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Ready to move forward?</h2>
            </div>
            <LeadForm />
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
