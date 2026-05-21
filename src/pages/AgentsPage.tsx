import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { AgentReferral } from "../components/AgentReferral";
import { CarlosTrust } from "../components/CarlosTrust";
import { LeadForm } from "../components/LeadForm";
import { BadgeCheck } from "lucide-react";

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
        <div className="pt-24 pb-8 bg-navy text-white text-center px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-4">Agent Partner Network</p>
          <h1 className="font-serif text-4xl lg:text-6xl text-white leading-tight">
            Refer Your Client.<br />
            <span className="italic text-gold">We Handle South Florida.</span>
          </h1>
          <p className="mt-6 mx-auto max-w-2xl font-sans text-lg font-light leading-relaxed text-white/65">
            Send your South Florida, Spanish, or LATAM clients to Carlos Uzcategui. Industry-standard referral fees at closing. Bilateral agreements. Your relationship stays yours.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 border border-gold/20 bg-white/4 px-4 py-2.5 backdrop-blur-sm">
            <BadgeCheck size={14} className="text-gold flex-shrink-0" />
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">
              FL Realtor® SL705771 · United Realty Group · Equal Housing Opportunity
            </span>
          </div>
        </div>
        <AgentReferral />
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
