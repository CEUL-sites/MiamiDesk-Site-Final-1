import { Helmet } from "react-helmet-async";
import { BadgeCheck, ChevronRight, MessageSquare } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { ReferralIntakeForm } from "../components/forms/ReferralIntakeForm";
import { CONTACT } from "../constants";

const PATHWAYS = [
  {
    number: "01",
    title: "Refer a South Florida Seller",
    body: "Your seller client needs representation in Miami-Dade, Broward, or Palm Beach. We take the listing, handle the full transaction, and pay your referral fee at closing. Formal written agreement before we engage.",
    cta: "Submit a Seller Referral",
    anchor: "#submit-referral",
  },
  {
    number: "02",
    title: "Refer a South Florida Buyer",
    body: "Your buyer is relocating to or investing in South Florida. Full MLS access, neighborhood-level advisory, offer strategy, and closing coordination — you receive a documented referral fee at closing.",
    cta: "Submit a Buyer Referral",
    anchor: "#submit-referral",
  },
  {
    number: "03",
    title: "Refer a Spain Buyer or Inventory Opportunity",
    body: "Spain-based client seeking Miami-facing exposure, or a Spanish property owner seeking access to the South Florida network. Formal broker-to-broker coordination. Compliant referral or cooperating broker agreement. Paid at closing where applicable.",
    cta: "Submit an International Referral",
    anchor: "#submit-referral",
  },
];

const NETWORK_STATS = [
  { value: "437+", label: "International Agreements", desc: "Signed referral agreements with real estate organizations worldwide through Miami and South Florida REALTORS®." },
  { value: "93,000", label: "Member Agents", desc: "Miami and South Florida REALTORS® — the world's largest local REALTOR® association — for maximum buyer-agent visibility on referred listings." },
  { value: "2M+", label: "Professionals", desc: "International referral network of 2 million+ professionals across 70+ countries and 300+ partner associations." },
];

export default function AgentsPage() {
  return (
    <>
      <Helmet>
        <title>South Florida & Spain Real Estate Referral Desk | HomesProfessional.com</title>
        <meta name="description" content="A referral desk for licensed agents: refer South Florida sellers, buyers, and Spain inventory opportunities. Formal written agreements. Paid at closing. Carlos Uzcategui, FL SL705771, United Realty Group." />
        <meta name="keywords" content="real estate agent referral South Florida, Miami buyer referral, South Florida MLS referral, Spain referral real estate, international agent network, United Realty Group referral" />
        <link rel="canonical" href="https://homesprofessional.com/agents" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "South Florida & Spain Referral Desk",
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "serviceType": "Real Estate Agent Referral",
          "description": "A referral desk for licensed real estate professionals. Three pathways: refer a South Florida seller, refer a South Florida buyer, or refer a Spain buyer or inventory opportunity. Formal agreements. Paid at closing.",
          "url": "https://homesprofessional.com/agents"
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "How does the referral program work?", "acceptedAnswer": { "@type": "Answer", "text": "Submit a referral via the form or contact Carlos directly. We execute a formal written referral agreement before engaging the referred client, handle the transaction in South Florida, and pay the referral fee at closing." } },
            { "@type": "Question", "name": "What referral fee do you pay?", "acceptedAnswer": { "@type": "Answer", "text": "Referral fees are negotiated per transaction and documented in writing before engagement. Contact Carlos to discuss the specific opportunity." } },
            { "@type": "Question", "name": "Do you accept international agent referrals?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We work with licensed agents from any state or country. Bilingual English/Spanish service is available for Spain and Latin America referrals. International property opportunities handled through formal broker-to-broker agreements." } }
          ]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="overflow-hidden bg-navy-deep px-6 py-20 md:py-28 text-center sm:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Referral Desk · United Realty Group · Florida & Spain</p>
          <h1
            className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white"
            style={{ fontSize: "clamp(2.0rem, 5.5vw, 3.4rem)" }}
          >
            A Referral Desk for<br />
            <em className="not-italic italic text-gold">South Florida and Spain.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
            Licensed professionals: refer your South Florida sellers, buyers, and Spain inventory opportunities through a desk built for compliant, professional broker-to-broker coordination.
            Formal written agreements. Documented compensation. Paid at closing.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#submit-referral"
              className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
            >
              Submit a Referral
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={CONTACT.whatsappBroker}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              <MessageSquare size={14} />
              WhatsApp: Broker-to-Broker
            </a>
          </div>
          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
            United Realty Group · FL SL705771 · Miami and South Florida REALTORS® · Equal Housing Opportunity
          </p>
        </section>

        {/* Three Pathways */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Three Referral Pathways</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Send the right client through the right channel.
            </h2>
            <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-ink-primary/60">
              Every referral is handled through a formal written agreement before we engage your client. Confidential. Professional. Documented.
            </p>
            <div className="mt-12 grid gap-px border border-hairline bg-hairline md:grid-cols-3">
              {PATHWAYS.map((p) => (
                <div key={p.number} className="flex flex-col bg-white p-8">
                  <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold mb-4">{p.number}</div>
                  <h3 className="font-serif text-xl text-navy-deep">{p.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/65 flex-1">{p.body}</p>
                  <a href={p.anchor} className="mt-6 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-gold hover:underline underline-offset-2">
                    {p.cta} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Network stats */}
        <section className="bg-navy-deep py-16 md:py-20 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold text-center mb-10">Why this network matters for your referral</p>
            <div className="grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
              {NETWORK_STATS.map((s) => (
                <div key={s.value} className="bg-navy-deep p-8">
                  <div className="font-serif text-4xl text-gold">{s.value}</div>
                  <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">{s.label}</div>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-white/55">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How referrals work */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">How it works</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Professional process. No shortcuts.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {[
                { step: "01", title: "Submit the Referral", body: "Use the form below or contact Carlos directly via WhatsApp. Share the client type, property details or search criteria, and your contact information." },
                { step: "02", title: "Formal Agreement Executed", body: "Before any client engagement, we execute a written referral agreement documenting your fee, the referred client, and the terms of cooperation." },
                { step: "03", title: "Transaction Management", body: "We handle the full South Florida transaction — advisory, MLS, offers, negotiations, and closing coordination. You remain the referring agent of record." },
                { step: "04", title: "Referral Fee at Closing", body: "Your fee is paid at closing per the executed agreement. Documented. Professional. No ambiguity." },
              ].map((step) => (
                <div key={step.step} className="border border-hairline p-7">
                  <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold mb-4">{step.step}</div>
                  <h3 className="font-serif text-xl text-navy-deep">{step.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/65">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Referral intake form */}
        <section className="bg-navy-deep py-16 md:py-24" id="submit-referral">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Referral Desk · Submit</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Submit a referral for review.</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                For licensed real estate professionals only. All submissions are confidential.
                Carlos reviews every submission personally before responding.
              </p>
            </div>
            <ReferralIntakeForm />
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                <BadgeCheck size={14} className="text-gold" />
                Confidential · Licensed Professionals Only · Equal Housing Opportunity
              </div>
              <p className="font-sans text-[10px] leading-relaxed text-white/25">
                Referral fee compensation is subject to a written referral agreement executed prior to client engagement.
                Florida real estate brokerage services are provided through United Realty Group. International referral
                opportunities may be handled through formal broker-to-broker agreements or cooperating professional relationships
                depending on jurisdiction and applicable regulations.
              </p>
            </div>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
