import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { ReferralIntakeForm } from "../components/forms/ReferralIntakeForm";
import { BadgeCheck } from "lucide-react";

export default function AgentsPage() {
  return (
    <>
      <Helmet>
        <title>Agent Referral Network | South Florida | United Realty Group</title>
        <meta name="description" content="Licensed agents: refer your South Florida buyers and sellers to our team. Formal referral agreements, fast closings, bilingual service. United Realty Group · FL SL705771." />
        <meta name="keywords" content="real estate agent referral South Florida, Miami buyer referral, South Florida MLS referral, licensed agent network, United Realty Group referral" />
        <link rel="canonical" href="https://homesprofessional.com/agents" />
        <meta property="og:title" content="Agent Referral Network | South Florida | United Realty Group" />
        <meta property="og:description" content="Licensed agents: refer your South Florida buyers and sellers to our team. Formal referral agreements, fast closings, bilingual service. United Realty Group · FL SL705771." />
        <meta property="og:url" content="https://homesprofessional.com/agents" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="HomesProfessional.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Agent Referral Network | South Florida | United Realty Group" />
        <meta name="twitter:description" content="Licensed agents: refer your South Florida buyers and sellers to our team. Formal referral agreements, fast closings, bilingual service. United Realty Group · FL SL705771." />
        <meta name="twitter:image" content="https://homesprofessional.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Agent-to-Agent Referral Network",
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "serviceType": "Real Estate Agent Referral",
          "description": "Confidential buyer and seller referral program for licensed agents. Formal referral agreements with United Realty Group. 437+ international referral agreements.",
          "url": "https://homesprofessional.com/agents"
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How does the agent referral program work?", "acceptedAnswer": { "@type": "Answer", "text": "Submit a referral via the form or contact our team directly. We execute a formal referral agreement, handle the transaction in South Florida, and pay your referral fee at closing." } },
            { "@type": "Question", "name": "What referral fee do you pay?", "acceptedAnswer": { "@type": "Answer", "text": "Referral fees are negotiated per transaction and documented in writing before we engage the referred client. Contact our team for details." } },
            { "@type": "Question", "name": "Do you accept international agent referrals?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We have 437+ signed referral agreements with international real estate associations. Bilingual English/Spanish service is available for Spain and Latin America referrals." } }
          ]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />
        <section className="overflow-hidden bg-navy-deep px-6 py-16 md:py-20 text-center sm:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Agent Referral Program · United Realty Group</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3rem)" }}>
            Refer Your South Florida Clients.<br />
            <em className="not-italic italic text-gold">Formal Agreements. Paid at Closing.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55">
            Licensed agents from any state or country: send us your South Florida buyers and sellers. We handle the transaction and pay your referral fee at closing.
          </p>
        </section>
        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { title: "437+", sub: "International Agreements", desc: "Signed referral agreements with real estate associations worldwide." },
                { title: "93,000", sub: "Member Agents", desc: "Miami and South Florida REALTORS® MLS network for maximum buyer exposure." },
                { title: "Day 1", sub: "Professional Activation", desc: "Your referred listing enters professional MLS positioning and buyer-agent visibility from the start." },
              ].map((item) => (
                <div key={item.title} className="border border-gold/15 p-8 text-center">
                  <div className="font-serif text-4xl text-gold">{item.title}</div>
                  <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">{item.sub}</div>
                  <p className="mt-4 font-sans text-sm text-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-navy-deep py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Submit a Referral</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Send us your client</h2>
            </div>
            <ReferralIntakeForm />
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
