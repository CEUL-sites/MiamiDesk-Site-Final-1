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
        <title>Agent Referral Network | South Florida & Madrid | CarlosRE | United Realty Group</title>
        <meta name="description" content="Refer your South Florida, Spanish, or LATAM clients to Carlos Uzcategui. Industry-standard referral fees at closing. Bilateral agreements. FL Realtor® SL705771." />
        <link rel="canonical" href="https://homesprofessional.com/agents" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Agent Referral Network", "item": "https://homesprofessional.com/agents" }
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
