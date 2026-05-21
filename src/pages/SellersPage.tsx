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
import { BadgeCheck } from "lucide-react";

export default function SellersPage() {
  return (
    <>
      <Helmet>
        <title>Sell Your South Florida Home | Maximum MLS Exposure | Carlos Uzcategui, Realtor®</title>
        <meta name="description" content="Your listing reaches 93,000 Realtors and 200+ global portals in 19 languages the day it goes live. Weston, Coral Gables, Brickell, Miami Beach. Free strategy review." />
        <link rel="canonical" href="https://homesprofessional.com/sell" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Sell Your South Florida Home", "item": "https://homesprofessional.com/sell" }
          ]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <div className="pt-24 pb-8 bg-navy text-white text-center px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-4">South Florida Seller Strategy</p>
          <h1 className="font-serif text-4xl lg:text-6xl text-white leading-tight">
            Sell Your South Florida Home.<br />
            <span className="italic text-gold">Maximum Global Exposure.</span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl font-sans text-lg font-light leading-relaxed text-white/65">
            Your listing activates inside the Miami and South Florida REALTORS® MLS — 93,000 member agents, 200+ global portals, 19 languages — the day it goes live.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 border border-gold/20 bg-white/4 px-4 py-2.5 backdrop-blur-sm">
            <BadgeCheck size={14} className="text-gold flex-shrink-0" />
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">
              United Realty Group · CLHMS · Certified Seller Rep · FL SL705771
            </span>
          </div>
        </div>
        <SellerSection />
        <PropertyShowcase3D />
        <ReachAdvantage />
        <ExposureSyndication />
        <PartnersMarquee />
        <NeighborhoodGrid />
        <section id="contact" className="bg-ivory py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-6">
            <LeadForm />
            <div className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-navy/30">
              <BadgeCheck size={14} className="text-gold" />
              Confidential · Direct to Carlos · Equal Housing Opportunity
            </div>
          </div>
        </section>
        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
