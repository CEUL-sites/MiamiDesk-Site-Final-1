import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { AgentReferral } from "../components/AgentReferral";
import { CarlosTrust } from "../components/CarlosTrust";
import { LeadForm } from "../components/LeadForm";
import { PageHero } from "../components/PageHero";
import { BadgeCheck } from "lucide-react";
import { CONTACT } from "../constants";

export default function AgentsPage() {
  return (
    <>
      <Helmet>
        <title>Agent Referral Network | South Florida, LATAM & Madrid | United Realty Group</title>
        <meta name="description" content="Refer South Florida, Spanish, or LATAM clients to United Realty Group. Industry-standard referral fees at closing. 48-hour response. Bilateral Miami ↔ Madrid coverage. FL SL705771." />
        <meta name="keywords" content="real estate referral fee Florida, agent referral South Florida, Realtor referral Miami, LATAM client referral Miami, Spain real estate referral, cross-border referral network, United Realty Group referral, Miami agent referral program" />
        <link rel="canonical" href="https://homesprofessional.com/agents" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Agent Referral Network", "item": "https://homesprofessional.com/agents" }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Real Estate Agent Referral Network",
          "name": "Agent Referral Network — South Florida, Spain & LATAM",
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Carlos Uzcategui — United Realty Group",
            "url": "https://homesprofessional.com",
            "telephone": "+1-954-865-6622"
          },
          "areaServed": [
            { "@type": "City", "name": "Miami" },
            { "@type": "City", "name": "Fort Lauderdale" },
            { "@type": "City", "name": "Weston" },
            { "@type": "City", "name": "Madrid" }
          ],
          "description": "Industry-standard referral fees at closing. 48-hour response commitment. Bilateral South Florida ↔ Madrid cross-border coverage. FL Realtor® SL705771.",
          "url": "https://homesprofessional.com/agents",
          "offers": {
            "@type": "Offer",
            "description": "Industry-standard referral fee paid at closing. No upfront cost.",
            "eligibleCustomerType": "Licensed Real Estate Agent"
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How do real estate agent referral fees work in Florida?", "acceptedAnswer": { "@type": "Answer", "text": "Industry-standard referral fees are paid at closing as a percentage of the gross commission. The referral fee is agreed in writing before client introduction. No upfront cost. FL Realtor® SL705771 licensed principal of record." } },
            { "@type": "Question", "name": "Can I refer clients with South Florida and Spain connections?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our team covers South Florida seller and buyer transactions, plus cross-border referrals — Spain sellers wanting U.S. MLS exposure and LATAM buyers seeking South Florida property. One licensed contact covers all three markets." } },
            { "@type": "Question", "name": "How quickly will my referral be responded to?", "acceptedAnswer": { "@type": "Answer", "text": "Every inbound referral receives a personal response within 48 hours. Your client is in professional hands from day one, and you stay updated on transaction progress." } }
          ]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <PageHero
          eyebrow="Agent Referral Network"
          headline="Refer Your Client."
          headlineGold="We Handle South Florida."
          subhead="Industry-standard referral fees paid at closing. 48-hour response commitment. Bilateral coverage — Miami to Madrid."
          ctaLabel="Send a Referral"
          ctaHref="/contact"
          whatsappHref={CONTACT.whatsappUS}
          badge="United Realty Group · FL SL705771 · Licensed 2001"
        />
        <AgentReferral />
        <CarlosTrust />
        <section className="bg-navy-deep py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Agent Referral Desk</p>
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
