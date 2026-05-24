import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { ReferralIntakeForm } from "../components/forms/ReferralIntakeForm";
import { CONTACT } from "../constants";

const PARTNER_TYPES = [
  {
    number: "01",
    title: "South Florida Buyer & Seller Referrals",
    body: "Licensed agents from any U.S. state or country can refer South Florida buyers and sellers. We handle the transaction end-to-end and pay a documented referral fee at closing. Formal written referral agreement executed before engagement.",
    tag: "BUYER REFERRALS · SELLER REFERRALS · ALL COUNTIES"
  },
  {
    number: "02",
    title: "Spain Agencies & Developers",
    body: "Spanish agencies and developers seeking Miami MLS placement, LATAM buyer exposure, and U.S. principal-of-record representation. We provide formal MLS listing, bilingual agent outreach, and inquiry coordination from a licensed Florida principal.",
    tag: "MADRID · MARBELLA · COSTA DEL SOL · MLS ACTIVATION"
  },
  {
    number: "03",
    title: "Agents Seeking Spain Inventory",
    body: "South Florida and U.S.-based agents with clients looking to acquire in Spain: we bridge the gap through active referral relationships with Madrid's top agencies — Engel & Völkers, Lucas Fox, Knight Frank, and others. Bilingual coordination available.",
    tag: "SPAIN BUYER REFERRALS · MADRID AGENCIES · CROSS-BORDER"
  },
  {
    number: "04",
    title: "URG Team & Collaboration",
    body: "Licensed Realtors exploring United Realty Group affiliation, team collaboration, or Florida market expansion. United Realty Group operates 19 Florida offices with 3,000+ agents statewide. Confidential conversations welcome.",
    tag: "UNITED REALTY GROUP · 19 OFFICES · TEAM COLLABORATION"
  },
];

export default function AgentsPage() {
  return (
    <>
      <Helmet>
        <title>Agent & Agency Partner Desk | South Florida Referrals | United Realty Group</title>
        <meta name="description" content="South Florida referrals. Spain inventory. Cross-border cooperation. Licensed agents, Spain agencies, and developers — formal referral agreements, written compliance, bilingual service. United Realty Group · FL SL705771." />
        <meta name="keywords" content="real estate agent referral South Florida, Miami buyer referral, Spain agency MLS placement, cross-border referral, licensed agent network, United Realty Group referral" />
        <link rel="canonical" href="https://homesprofessional.com/agents" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Agent & Agency Partner Desk",
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "serviceType": "Real Estate Agent & Agency Referral Network",
          "description": "Formal referral program for licensed agents, Spain agencies, developers, and cross-border cooperation. Written agreements, bilingual service, 437+ international referral agreements.",
          "url": "https://homesprofessional.com/agents"
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        <section className="bg-navy-deep py-24 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Agent & Agency Partner Desk · United Realty Group</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-tight text-white md:text-5xl">
            Agent & Agency Partner Desk
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/60">
            South Florida referrals. Spain inventory. Cross-border cooperation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={CONTACT.whatsappUS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
            >
              WhatsApp Carlos
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/20 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              Submit a Referral
            </a>
          </div>
        </section>

        <section className="bg-ivory py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Partnership channels</p>
            <h2 className="mt-4 font-serif text-3xl text-navy md:text-4xl">Who we work with.</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {PARTNER_TYPES.map((p) => (
                <article key={p.title} className="group relative overflow-hidden border border-bone bg-white p-8 transition-all duration-500 hover:border-b-4 hover:border-b-gold hover:shadow-xl">
                  <span className="absolute -right-3 -top-2 font-serif text-[5rem] leading-none text-gold/10 transition-colors group-hover:text-gold/25">{p.number}</span>
                  <div className="relative">
                    <h3 className="font-serif text-2xl text-navy">{p.title}</h3>
                    <p className="mt-4 font-sans text-sm leading-relaxed text-navy/65">{p.body}</p>
                    <p className="font-mono mt-6 text-[9px] uppercase tracking-[0.2em] text-gold/75">{p.tag}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy-deep py-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { v: "437+", l: "International Agreements", d: "Signed referral agreements with real estate associations worldwide." },
                { v: "Written", l: "Referral Agreements", d: "Every referral is documented with a formal written agreement before client engagement." },
                { v: "Day 1", l: "MLS Activation", d: "Referred listings enter the 93,000-agent MLS network the day they go live." },
              ].map((item) => (
                <div key={item.l} className="border border-gold/15 p-7">
                  <div className="font-serif text-3xl text-gold">{item.v}</div>
                  <div className="font-mono mt-2 text-[9px] uppercase tracking-[0.2em] text-white/45">{item.l}</div>
                  <p className="mt-3 font-sans text-sm text-white/55">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy-deep py-14 md:py-20 border-t border-gold/10">
          <div className="mx-auto max-w-3xl px-6">
            <ReferralIntakeForm />
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
