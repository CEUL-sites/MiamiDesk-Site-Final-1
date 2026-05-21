import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { BuyersRelocation } from "../components/BuyersRelocation";
import { CarlosTrust } from "../components/CarlosTrust";
import { LeadForm } from "../components/LeadForm";
import { PageHero } from "../components/PageHero";
import { BadgeCheck } from "lucide-react";
import { CONTACT } from "../constants";

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
        <PageHero
          eyebrow="South Florida Buyer Representation"
          headline="Find Your South Florida Property."
          headlineGold="Local Knowledge. Global Network."
          subhead="Twenty-five years of Miami-Dade, Broward, and Palm Beach transactions. Bilingual English and Spanish. LATAM investor experience from Brickell to Weston."
          ctaLabel="Start Your Property Search"
          ctaHref="/contact"
          whatsappHref={CONTACT.whatsappUS}
          badge="Bilingual EN · ES · 25 Years · FL SL705771"
        />
        <BuyersRelocation />
        <CarlosTrust />
        <section className="bg-navy-deep py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Confidential Buyer Desk</p>
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
