import { Helmet } from "react-helmet-async";
import { BadgeCheck, ChevronRight, MessageSquare } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { ReferralIntakeForm } from "../components/forms/ReferralIntakeForm";
import { CONTACT, SOURCES } from "../constants";

const PATHWAYS = [
  {
    number: "01",
    title: "Refer a South Florida Seller",
    body: "Your seller client needs representation in Miami-Dade, Broward, or Palm Beach. We take the listing, handle the full transaction, and pay your referral fee at closing through a formal written agreement executed before any client contact.",
    cta: "Submit a Seller Referral",
    anchor: "#submit-referral",
  },
  {
    number: "02",
    title: "Refer a South Florida Buyer",
    body: "Your buyer is relocating to or investing in South Florida. Full MLS access, neighborhood advisory, offer strategy, and closing coordination — documented referral fee paid at closing.",
    cta: "Submit a Buyer Referral",
    anchor: "#submit-referral",
  },
  {
    number: "03",
    title: "Refer a Spain or International Opportunity",
    body: "Spain-based client seeking Miami-facing exposure, or a Spanish property owner seeking access to the South Florida network. Formal broker-to-broker coordination. Compliant referral agreement. Paid at closing where applicable.",
    cta: "Submit an International Referral",
    anchor: "#submit-referral",
  },
];

const AUDIENCE_CARDS = [
  {
    title: "Buyer Agents",
    body: "Agents advising active buyers need accurate data, fast access, clear terms, and a listing they can explain with confidence. Every listing handled here is built with the buyer agent in mind.",
  },
  {
    title: "Referral Agents",
    body: "Agents outside South Florida need a trusted licensed partner who will protect the client relationship and execute a formal written referral agreement before engagement.",
  },
  {
    title: "International Agents",
    body: "Agencies in Spain, Latin America, and Europe need a U.S.-licensed professional who can connect buyer demand or inventory to the South Florida market through documented cooperation.",
  },
  {
    title: "Professional Advisors",
    body: "Attorneys, accountants, relocation professionals, and trusted advisors often know when a real estate need exists before the market does. Professional introductions are welcomed and handled with discretion.",
  },
];

const PROFESSIONAL_SIGNALS = [
  {
    title: "Immigration Attorneys",
    body: "Clients relocating to or from the U.S., Spain, or Latin America frequently need residential real estate coordination as part of a broader legal or residency process.",
  },
  {
    title: "Estate Attorneys",
    body: "Inherited property, family-owned assets, succession planning, and forced or voluntary sale situations often require prompt, professional, and confidential real estate execution.",
  },
  {
    title: "Accountants & Tax Advisors",
    body: "Sale planning, non-resident ownership, FIRPTA compliance, investment property decisions, and capital gains planning create real estate needs that advisors see early.",
  },
  {
    title: "Relocation Consultants",
    body: "School, employment, residency, and family-move triggers generate buyer and seller needs in South Florida where a trusted professional referral changes the outcome.",
  },
  {
    title: "Title & Closing Professionals",
    body: "Transaction coordination, closing readiness, documentation completeness, and issue resolution are improved when the listing agent and closing professional work collaboratively.",
  },
  {
    title: "Wealth & Family Advisors",
    body: "Asset repositioning, second homes, investment property, and family transition planning regularly involve real estate decisions where a discreet, experienced professional matters.",
  },
];

const NETWORK_STATS = [
  {
    value: "437+",
    label: "International Agreements",
    desc: "Signed referral agreements with real estate organizations worldwide through Miami and South Florida REALTORS® — creating structured pathways for cross-border cooperation.",
  },
  {
    value: "93,000",
    label: "Member Agents",
    desc: "Miami and South Florida REALTORS® — the world's largest local REALTOR® association — providing maximum buyer-agent visibility for referred listings from day one.",
  },
  {
    value: "2M+",
    label: "Professionals",
    desc: "International referral network across 75+ countries and 300+ partner associations — a global professional channel for serious cross-border real estate situations.",
  },
];

export default function AgentsPage() {
  return (
    <>
      <Helmet>
        <title>Professional Referral & Agent Network | Carlos Uzcategui | HomesProfessional.com</title>
        <meta name="description" content="Real estate moves through trust. Carlos Uzcategui works with agents, brokers, attorneys, accountants, relocation advisors, and international professionals whose clients need disciplined real estate execution in South Florida or cross-border situations. FL SL705771, United Realty Group." />
        <meta name="keywords" content="real estate agent referral South Florida, Miami buyer referral, South Florida MLS referral, Spain referral real estate, international agent network, attorney client referral real estate, United Realty Group referral" />
        <link rel="canonical" href="https://homesprofessional.com/agents" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Professional Referral & Agent Network",
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "serviceType": "Real Estate Referral & Professional Cooperation",
          "description": "A referral desk and professional cooperation channel for licensed real estate agents, brokers, and professional advisors. Three referral pathways: South Florida sellers, South Florida buyers, and international/Spain opportunities. Formal agreements. Documented compensation. Paid at closing.",
          "url": "https://homesprofessional.com/agents"
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How does the referral program work for licensed agents?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Submit a referral via the form or contact Carlos directly. We execute a formal written referral agreement before engaging the referred client, handle the full South Florida transaction, and pay the referral fee at closing per the executed agreement. Licensed real estate professionals only."
              }
            },
            {
              "@type": "Question",
              "name": "What referral fee do you pay?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Referral fees are negotiated per transaction and documented in writing before any client engagement. Contact Carlos to discuss the specific opportunity. Subject to applicable law, brokerage approval, and written agreement."
              }
            },
            {
              "@type": "Question",
              "name": "Do you accept international agent referrals?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We work with licensed agents from any state or country. Bilingual English/Spanish service available for Spain and Latin America referrals. International property opportunities handled through formal broker-to-broker agreements or cooperating professional relationships depending on jurisdiction."
              }
            },
            {
              "@type": "Question",
              "name": "Can non-licensed professionals such as attorneys or accountants make introductions?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Professional introductions from attorneys, accountants, relocation consultants, and similar advisors are welcomed and handled with discretion. Compensation arrangements for non-licensed professionals are subject to applicable law, licensing rules, and required disclosures — and are reviewed case by case where legally permitted and properly documented."
              }
            }
          ]
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* ── Hero ── */}
        <section className="overflow-hidden bg-navy-deep px-6 pt-20 pb-10 md:pt-28 md:pb-12 text-center sm:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
            Professional Referral & Agent Network · United Realty Group · Florida & Spain
          </p>
          <h1
            className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white"
            style={{ fontSize: "clamp(2.0rem, 5.5vw, 3.4rem)" }}
          >
            Real estate moves<br />
            <em className="not-italic italic text-gold">through trust.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/60">
            Carlos Uzcategui works with agents, brokers, attorneys, accountants, relocation advisors,
            and international professionals whose clients need disciplined real estate execution in South Florida,
            Madrid, or cross-border situations. Formal agreements. Documented relationships. No shortcuts.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#submit-referral"
              className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
            >
              Submit a Referral or Introduction
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={CONTACT.whatsappBroker}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              <MessageSquare size={14} />
              Schedule a Professional Conversation
            </a>
          </div>
          <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
            United Realty Group · FL SL705771 · Miami and South Florida REALTORS® · Equal Housing Opportunity
          </p>
        </section>

        {/* ── Why Agent-to-Agent Cooperation Matters ── */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Why Agent-to-Agent Cooperation Matters
            </p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              The agent network is not a side channel.<br />
              <em className="not-italic italic">It is the transaction channel.</em>
            </h2>
            <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-ink-primary/65">
              {SOURCES.buyerAgentStatement} A listing strategy must therefore be built not only for
              buyers, but for the agents advising those buyers. Carlos's role is to make each listing
              clear, credible, shareable, and easy for qualified buyer agents to act on — while managing
              the full professional network around every transaction.
            </p>
            <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.16em] text-ink-primary/35">
              Source: {SOURCES.nar}
            </p>
            <div className="mt-12 grid gap-px border border-hairline bg-hairline sm:grid-cols-2">
              {AUDIENCE_CARDS.map((card) => (
                <div key={card.title} className="bg-ivory p-8">
                  <h3 className="font-serif text-xl text-navy-deep">{card.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/65">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Three Referral Pathways ── */}
        <section className="bg-ivory py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Three Referral Pathways</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Send the right client through the right channel.
            </h2>
            <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-ink-primary/60">
              Every referral is handled through a formal written agreement before we engage your client.
              Confidential. Professional. Documented. For licensed real estate professionals.
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

        {/* ── Network stats ── */}
        <section className="bg-navy-deep py-16 md:py-20 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold text-center mb-10">
              Why this network matters for your referral
            </p>
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

        {/* ── How referrals work ── */}
        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">How it works</p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
              Professional process. No shortcuts.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {[
                { step: "01", title: "Submit the Referral or Introduction", body: "Use the form below or contact Carlos directly via WhatsApp. Share the client type, property details or search criteria, and your contact information." },
                { step: "02", title: "Formal Agreement Executed", body: "Before any client engagement, we execute a written referral agreement documenting the fee, the referred client, and the terms of cooperation. No exceptions." },
                { step: "03", title: "Transaction Management", body: "We handle the full South Florida transaction — advisory, MLS, offers, negotiations, and closing coordination. You remain the referring professional of record." },
                { step: "04", title: "Referral Fee at Closing", body: "For licensed real estate professionals: your fee is paid at closing per the executed agreement. Documented. No ambiguity. Professional introductions from other advisors are reviewed separately per applicable law." },
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

        {/* ── Professional Signals ── */}
        <section className="bg-navy py-20 md:py-28 text-white">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Professional Signals That Create Real Estate Opportunity
            </p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl leading-tight text-white md:text-4xl">
              Most buyers do not purchase alone.<br />
              <em className="not-italic italic text-gold">They rely on professionals they trust.</em>
            </h2>
            <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-white/60">
              Attorneys, accountants, relocation consultants, and trusted advisors often identify real
              estate needs before the market does. Professional introductions are welcomed and handled
              with discretion. Cooperation arrangements for non-licensed professionals are reviewed
              case by case where legally permitted and properly documented.
            </p>
            <div className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {PROFESSIONAL_SIGNALS.map((p) => (
                <div key={p.title} className="bg-navy-deep p-7">
                  <h3 className="font-serif text-lg text-white">{p.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-white/55">{p.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a
                href="#submit-referral"
                className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                Introduce a Client Situation →
              </a>
            </div>
          </div>
        </section>

        {/* ── Referral intake form ── */}
        <section className="bg-navy-deep py-16 md:py-24" id="submit-referral">
          <div className="mx-auto max-w-5xl px-6">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                Referral Desk · Submit
              </p>
              <h2 className="mt-3 font-serif text-3xl text-white">
                Submit a referral for review.
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/50">
                For licensed real estate professionals and professional advisors.
                All submissions are treated as confidential. Carlos reviews every submission personally.
              </p>
            </div>
            <ReferralIntakeForm />
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
                <BadgeCheck size={14} className="text-gold" />
                Confidential · Equal Housing Opportunity
              </div>
              <p className="font-sans text-[10px] leading-relaxed text-white/25">
                Professional cooperation and compensation are subject to applicable law, licensing rules,
                written agreement, brokerage approval, and required disclosures. Referral fee compensation
                for licensed real estate professionals is subject to a written referral agreement executed
                prior to client engagement. Professional introductions from attorneys, accountants, and
                non-licensed advisors may be reviewed case by case where legally permitted and properly
                documented. Florida brokerage services are provided through United Realty Group.
                International referral opportunities may be handled through formal broker-to-broker
                agreements or cooperating professional relationships depending on jurisdiction and applicable regulations.
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
