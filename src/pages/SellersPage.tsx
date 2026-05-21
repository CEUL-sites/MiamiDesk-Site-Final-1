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
        <SellerSection />
        <PropertyShowcase3D />
        <ReachAdvantage />
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
