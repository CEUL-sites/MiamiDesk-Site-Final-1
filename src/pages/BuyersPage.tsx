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
        <title>Buy Property in South Florida | Bilingual Realtor® | LATAM Investors | United Realty Group</title>
        <meta name="description" content="25 years of South Florida buyer representation. Bilingual English and Spanish. LATAM investor specialists. Miami-Dade, Broward, Palm Beach — Coral Gables, Brickell, Weston, Aventura. Free consultation." />
        <meta name="keywords" content="buy home South Florida, buy property Miami, LATAM real estate investor Florida, bilingual realtor Miami, Spanish-speaking agent South Florida, buy condo Brickell, buy house Coral Gables, buy home Weston, relocate to Miami, United Realty Group buyer agent" />
        <link rel="canonical" href="https://homesprofessional.com/buy" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Buy Property in South Florida", "item": "https://homesprofessional.com/buy" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Real Estate Buyer Representation",
          "name": "South Florida Buyer Representation — Bilingual EN/ES",
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Carlos Uzcategui — United Realty Group",
            "url": "https://homesprofessional.com",
            "telephone": "+1-954-865-6622",
            "knowsLanguage": ["English", "Spanish"]
          },
          "areaServed": [
            { "@type": "AdministrativeArea", "name": "Miami-Dade County" },
            { "@type": "AdministrativeArea", "name": "Broward County" },
            { "@type": "AdministrativeArea", "name": "Palm Beach County" }
          ],
          "description": "Bilingual buyer representation in South Florida. LATAM investor experience. 25 years of Miami-Dade, Broward, and Palm Beach transactions. English and Spanish service.",
          "url": "https://homesprofessional.com/buy"
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Can LATAM investors buy property in South Florida?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. South Florida is one of the most active markets for Latin American investors. Our bilingual team has 25 years of experience representing LATAM buyers in Miami-Dade, Broward, and Palm Beach counties. We provide full service in English and Spanish." } },
            { "@type": "Question", "name": "What neighborhoods are best for buyers in South Florida?", "acceptedAnswer": { "@type": "Answer", "text": "Top buyer markets include Brickell (urban condos), Coral Gables (luxury residential), Miami Beach (waterfront), Weston (family-friendly), Aventura (luxury condos), and Doral (investor activity). We provide neighborhood-specific advisory for every buyer." } },
            { "@type": "Question", "name": "Do you offer bilingual buyer representation in Spanish?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our team provides full buyer representation in both English and Spanish. LATAM and Spanish-speaking buyers receive complete service in their preferred language throughout the transaction." } }
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
