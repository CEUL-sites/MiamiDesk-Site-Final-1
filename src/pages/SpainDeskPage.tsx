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
        <title>Spain to Miami MLS | List Spanish Property in U.S. | Carlos Uzcategui</title>
        <meta name="description" content="Activate your Spanish or LATAM property in the Miami MLS. Reach 93,000 U.S. Realtors representing the exact LATAM and North American buyers your market depends on." />
        <link rel="canonical" href="https://homesprofessional.com/spain-desk" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Spain Desk", "item": "https://homesprofessional.com/spain-desk" }
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
