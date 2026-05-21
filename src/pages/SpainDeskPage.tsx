import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { InternationalBridge } from "../components/InternationalBridge";
import { CarlosTrust } from "../components/CarlosTrust";
import { LeadForm } from "../components/LeadForm";
import { PageHero } from "../components/PageHero";
import { BadgeCheck } from "lucide-react";
import { CONTACT } from "../constants";

export default function SpainDeskPage() {
  return (
    <>
      <Helmet>
        <title>Spain to Miami MLS | List Spanish Property in U.S. | United Realty Group</title>
        <meta name="description" content="List your Spanish or LATAM property in the Miami MLS. Reach 93,000 U.S. Realtors representing LATAM and North American buyers. Licensed Florida principal. Bilingual EN/ES. Madrid & Miami offices." />
        <meta name="keywords" content="Spain Miami real estate, list Spanish property Miami MLS, Madrid property US buyers, Marbella real estate LATAM buyers, Spain to US real estate, cross-border real estate agent, Florida principal Spain, agente inmobiliario Florida, listar propiedad Miami MLS, comprador latinoamericano España" />
        <link rel="canonical" href="https://homesprofessional.com/spain-desk" />
        <link rel="alternate" hreflang="es" href="https://homesprofessional.com/spain-desk" />
        <link rel="alternate" hreflang="en" href="https://homesprofessional.com/spain-desk" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Spain Desk — Miami MLS International", "item": "https://homesprofessional.com/spain-desk" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "International Real Estate — Spain and LATAM to Miami MLS",
          "name": "Spain Desk — Miami MLS International Activation",
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Carlos Uzcategui — United Realty Group",
            "url": "https://homesprofessional.com",
            "telephone": "+34-646-853-078",
            "knowsLanguage": ["English", "Spanish"]
          },
          "areaServed": [
            { "@type": "Country", "name": "Spain" },
            { "@type": "City", "name": "Madrid" },
            { "@type": "City", "name": "Marbella" },
            { "@type": "City", "name": "Costa del Sol" },
            { "@type": "City", "name": "Miami" },
            { "@type": "City", "name": "South Florida" }
          ],
          "description": "Licensed Florida principal activating Spanish and LATAM properties in the Miami MLS — reaching 93,000 U.S. Realtors who represent LATAM and North American buyers, the dominant purchasers of Spanish luxury real estate.",
          "url": "https://homesprofessional.com/spain-desk",
          "inLanguage": ["en", "es"]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Can Spanish property be listed in the Miami MLS?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. As a licensed Florida principal of record, our team activates Spanish and LATAM properties within the Miami MLS ecosystem — reaching 93,000 U.S. Realtors who represent LATAM and North American buyers, the dominant purchasers of luxury Spanish real estate. This is a formal MLS listing, not a referral." } },
            { "@type": "Question", "name": "Who are the buyers of luxury property in Madrid and Marbella?", "acceptedAnswer": { "@type": "Answer", "text": "The majority of luxury real estate buyers in Spain — particularly in Madrid, Marbella, and the Costa del Sol — come from Latin America and North America. These buyers are represented by U.S. Realtors inside the Miami MLS." } },
            { "@type": "Question", "name": "Do you provide bilingual advisory for Spain real estate?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our team provides full bilingual advisory in English and Spanish. Spanish inquiries are answered in Spanish within one business day. We maintain offices in both Miami and Madrid." } },
            { "@type": "Question", "name": "What is the Spain Desk and how does it work?", "acceptedAnswer": { "@type": "Answer", "text": "The Spain Desk is our international real estate activation bridge. As a licensed U.S. principal, we list Spanish and LATAM properties directly in the Miami MLS, creating formal access to 93,000 agents and their LATAM and North American buyer pipelines." } }
          ]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <PageHero
          eyebrow="International Activation Bridge"
          headline="Your Spanish Property."
          headlineGold="The Miami MLS. One Licensed U.S. Principal."
          subhead="The majority of luxury buyers in Madrid, Marbella, and the Costa del Sol come from Latin America and North America. Our licensed team lists your property directly into their Realtors' pipelines."
          ctaLabel="Activate My Property in the U.S."
          ctaHref="/contact"
          whatsappHref={CONTACT.whatsappSpain}
          badge="Spanish inquiries answered in Spanish · FL SL705771"
        />
        <InternationalBridge />
        <CarlosTrust />
        <section className="bg-navy-deep py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Spain Desk · International</p>
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
