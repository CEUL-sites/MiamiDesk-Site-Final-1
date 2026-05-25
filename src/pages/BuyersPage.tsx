import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { BuyersRelocation } from "../components/BuyersRelocation";
import { BuyerMandateForm } from "../components/forms/BuyerMandateForm";
import { BadgeCheck } from "lucide-react";
import { CONTACT } from "../constants";

export default function BuyersPage() {
  return (
    <>
      <Helmet>
        <title>Buy a Home in South Florida | MLS Buyer Representation | United Realty Group</title>
        <meta name="description" content="Full MLS access across Miami-Dade, Broward, and Palm Beach. Expert buyer representation for primary homes, investment properties, and relocation. Free buyer consultation — United Realty Group · FL SL705771." />
        <meta name="keywords" content="buy home South Florida, Miami real estate buyer, Coral Gables homes for sale, Brickell condos, Miami Beach real estate, South Florida buyer agent, relocation Miami" />
        <link rel="canonical" href="https://homesprofessional.com/buy" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "South Florida Buyer Representation",
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "serviceType": "Real Estate Buyer Representation",
          "description": "Full-service buyer representation including full MLS access, neighborhood analysis, offer strategy, and closing coordination across Miami-Dade, Broward, and Palm Beach counties.",
          "areaServed": "South Florida",
          "url": "https://homesprofessional.com/buy",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "description": "Free buyer consultation — no commitment required."
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Do I need a buyer's agent in South Florida?", "acceptedAnswer": { "@type": "Answer", "text": "A buyer's agent costs you nothing — the seller pays the commission. You get full MLS access, negotiation support, market analysis, and closing coordination at no cost to you." } },
            { "@type": "Question", "name": "Can I buy a home in South Florida from abroad?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We specialize in serving international buyers, particularly from Spain and Latin America. Bilingual English/Spanish representation and remote transaction management are available." } },
            { "@type": "Question", "name": "What is the buying process in Miami?", "acceptedAnswer": { "@type": "Answer", "text": "The process includes buyer consultation, property search via full MLS access, offer submission, inspection period, financing coordination, and closing. Timeline is typically 30–60 days from accepted offer to close." } }
          ]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <section className="bg-navy-deep py-24 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">South Florida Buyer Strategy</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight text-white md:text-5xl">
            The right property.<br />
            <em className="not-italic italic text-gold">The right representation.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55">
            Buyer representation across Miami-Dade, Broward, and Palm Beach — backed by 25 years of local relationships and United Realty Group's 3,500+ agents across 19 offices.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-gold px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
            >
              Brief Your Search →
            </a>
            <a
              href={CONTACT.whatsappUS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              WhatsApp Carlos →
            </a>
          </div>
          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
            United Realty Group · CLHMS · FL SL705771 · Buyer representation across Miami-Dade, Broward &amp; Palm Beach
          </p>
        </section>
        <BuyersRelocation />
        <section className="bg-navy-deep py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Confidential Buyer Desk</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Ready to start your search?</h2>
            </div>
            <BuyerMandateForm />
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
