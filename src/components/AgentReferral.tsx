import { Award, ChevronRight, DollarSign, Globe, Users, Zap } from "lucide-react";
import { motion } from "motion/react";
import { CONTACT } from "../constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const BENEFITS = [
  { icon: DollarSign, title: "Referral Fee at Closing", desc: "Industry-standard referral fees paid at closing. Your client relationship stays yours — we handle the Florida transaction." },
  { icon: Zap,         title: "48-Hour Response",       desc: "Every inbound referral receives a personal response within 48 hours. Your client is in professional hands from day one." },
  { icon: Globe,       title: "Miami ↔ Madrid Coverage", desc: "South Florida listings, buyer representation, and Spain cross-border transactions. One licensed contact covers all three markets." },
  { icon: Users,       title: "Bilingual — EN / ES",    desc: "Your LATAM clients receive full service in Spanish from a licensed Florida principal. No language barrier, no dropped handoff." },
  { icon: Award,       title: "Credentialed & Compliant", desc: "FL SL705771 · CLHMS · Certified Seller Rep · United Realty Group. Your referral goes to a compliant, insured professional." },
];

const REFERRAL_TYPES = [
  {
    tag: "Seller Side",
    title: "South Florida Seller Referral",
    desc: "Client has a South Florida property to list. Carlos manages full MLS activation, staging advisory, pricing strategy, and buyer-agent outreach. You stay connected to your client.",
    cta: "#contact",
  },
  {
    tag: "Buyer Side",
    title: "Buyer Relocation Referral",
    desc: "Client relocating to or investing in South Florida — from LATAM, Spain, or any U.S. market. Full buyer representation, neighborhood advisory, and transaction management.",
    cta: "#contact",
  },
  {
    tag: "Cross-Border",
    title: "Spain Desk Referral",
    desc: "LATAM buyer seeking luxury property in Spain, or a Spain/Europe seller wanting U.S. MLS exposure. Carlos bridges both directions through the Miami and Madrid desks.",
    cta: CONTACT.whatsappSpain,
  },
];

export function AgentReferral() {
  return (
    <section id="referral" className="border-t border-gold/20 bg-ivory py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-start">

          {/* LEFT — value proposition */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Agent Partner Network</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-navy lg:text-5xl">
              Refer your client.<br />
              <span className="italic text-gold">We handle the rest.</span>
            </h2>
            <p className="mt-7 max-w-lg font-sans text-lg leading-relaxed text-navy/75">
              Carlos is your South Florida principal. Send your buyers, sellers, or cross-border clients from Spain, Latin America, or anywhere in the U.S. — and earn a referral fee at closing. Your relationship. Our market.
            </p>

            <div className="mt-10 space-y-6">
              {BENEFITS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center border border-gold/30 bg-gold/8">
                    <Icon size={16} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-navy">{title}</p>
                    <p className="mt-1 font-sans text-sm leading-relaxed text-navy/65">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={CONTACT.whatsappUS}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-gold px-7 py-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-navy transition-all hover:bg-gold-soft active:scale-95"
              >
                WhatsApp — Submit Referral
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center border border-navy/25 px-7 py-4 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-navy transition-all hover:border-gold hover:text-gold active:scale-95"
              >
                Send Referral by Form
              </a>
            </div>

            <div className="mt-8 border border-gold/20 bg-white p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold">Referral Terms</p>
              <p className="mt-3 font-sans text-sm leading-relaxed text-navy/65">
                Industry-standard referral fee at closing. Commission split agreed in writing before client introduction. Licensed Florida principal of record. Equal Housing Opportunity.
              </p>
              <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.18em] text-navy/40">{CONTACT.licenseDisplay} · United Realty Group</p>
            </div>
          </motion.div>

          {/* RIGHT — referral type cards */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
            className="flex flex-col gap-5"
          >
            {REFERRAL_TYPES.map((type, i) => (
              <a
                key={type.title}
                href={type.cta}
                target={type.cta.startsWith("https") ? "_blank" : undefined}
                rel={type.cta.startsWith("https") ? "noopener noreferrer" : undefined}
                className="group block border border-bone bg-white p-7 transition-all duration-300 hover:border-gold hover:shadow-xl hover:shadow-navy/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold/70">{type.tag}</p>
                    <h3 className="mt-2 font-serif text-2xl text-navy transition-colors duration-300 group-hover:text-gold">{type.title}</h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-navy/65">{type.desc}</p>
                  </div>
                  <span className="flex-shrink-0 font-serif text-5xl text-gold/15 transition-colors duration-300 group-hover:text-gold/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-4 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.18em] text-gold/55 transition-colors duration-300 group-hover:text-gold">
                  Submit inquiry <ChevronRight size={10} className="transition-transform group-hover:translate-x-0.5" />
                </p>
              </a>
            ))}

            <div className="grid grid-cols-3 gap-px border border-bone bg-bone">
              {[
                { value: "25", label: "Years Active" },
                { value: "EN/ES", label: "Bilingual" },
                { value: "FL+ES", label: "Markets" },
              ].map((s) => (
                <div key={s.label} className="bg-white p-5 text-center">
                  <div className="font-serif text-2xl text-gold">{s.value}</div>
                  <div className="font-mono mt-1 text-[8px] uppercase tracking-[0.18em] text-navy/45">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
