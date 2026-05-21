import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { BuyersRelocation } from "../components/BuyersRelocation";
import { CarlosTrust } from "../components/CarlosTrust";
import { LeadForm } from "../components/LeadForm";
import { BadgeCheck } from "lucide-react";

export default function BuyersPage() {
  return (
    <>
      <Helmet>
        <title>Buy in South Florida | Bilingual Realtor® | LATAM Investors | Carlos Uzcategui</title>
        <meta name="description" content="25 years of South Florida buyer representation. Bilingual English and Spanish. LATAM investor experience. Miami-Dade, Broward, Palm Beach. Coral Gables, Brickell, Weston, Aventura." />
        <link rel="canonical" href="https://homesprofessional.com/buy" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Buy in South Florida", "item": "https://homesprofessional.com/buy" }
          ]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <div className="pt-24 pb-8 bg-navy text-white text-center px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-4">South Florida Buyer Representation</p>
          <h1 className="font-serif text-4xl lg:text-6xl text-white leading-tight">
            Find Your South Florida Property.<br />
            <span className="italic text-gold">Local Knowledge. Global Network.</span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl font-sans text-lg font-light leading-relaxed text-white/65">
            Twenty-five years of South Florida buyer representation. Bilingual English and Spanish. LATAM investor experience across Miami-Dade, Broward, and Palm Beach.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 border border-gold/20 bg-white/4 px-4 py-2.5 backdrop-blur-sm">
            <BadgeCheck size={14} className="text-gold flex-shrink-0" />
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">
              United Realty Group · Bilingual EN / ES · FL SL705771
            </span>
          </div>
        </div>
        <BuyersRelocation />
        <CarlosTrust />
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
