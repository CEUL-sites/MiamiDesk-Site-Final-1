import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { CONTACT } from "../constants";

const GLOBAL_DESK_FAQS = [
  {
    q: "Is the Global Desk a referral service or a formal listing?",
    a: "It is a formal listing. Carlos Uzcategui, Florida Licensed Realtor® SL705771, places eligible inventory directly into the Miami and South Florida REALTORS® MLS as the licensed principal of record — giving the property institutional access to 93,000 member agents. This is not a referral or co-marketing arrangement; it is a full MLS activation.",
  },
  {
    q: "What types of properties qualify for Global Desk activation?",
    a: "Eligible properties typically include South Florida residential and commercial inventory with international appeal, and select Spain and LATAM inventory that qualifies for U.S. MLS placement under applicable MLS rules and agreements. Eligibility is assessed per-property during the initial strategy conversation — not all international inventory qualifies, and Carlos reviews each submission before engaging.",
  },
  {
    q: "Which buyer markets does the Global Desk reach?",
    a: "The Miami and South Florida REALTORS® MLS network includes 93,000 member agents representing active Latin American, European, North American, and Middle Eastern buyer demand. Listed properties are eligible to appear across 200+ global portals in 19 languages, subject to platform eligibility and MLS rules. The buyer pipeline is further supported by 437+ international agreements across 75+ countries.",
  },
  {
    q: "What is included in campaign reporting?",
    a: "Activity reporting includes documented agent outreach contacts, showing requests, buyer positioning feedback from the agent network, and platform distribution confirmation. Every campaign is tracked and reported to the referring agency or property ownership team in writing.",
  },
  {
    q: "How is compensation structured for Global Desk engagements?",
    a: "Compensation terms are set in direct conversation — not posted publicly — as they vary by property type, jurisdiction, and engagement structure (referral, co-listing, or advisory). Written agreements are executed before any listing activity begins. Referral agreements are honored both directions.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "MLS Placement",
    body: "Entered as a listed property, syndicated through 260+ U.S. MLSs and eligible to appear across 200+ global portals in 19 languages, subject to platform and eligibility rules.",
  },
  {
    num: "02",
    title: "Documented Agent Outreach",
    body: "Professional outreach to South Florida agents actively working qualified international buyers. Every campaign documented.",
  },
  {
    num: "03",
    title: "Campaign Reporting",
    body: "Activity reporting to your agency or ownership team: agent contacts, showing requests, positioning data, professional feedback.",
  },
];

export default function GlobalDeskPage() {
  return (
    <>
      <Helmet>
        <title>Global Desk — Miami MLS International Activation | HomesProfessional.com</title>
        <meta
          name="description"
          content="Carlos Uzcategui places eligible international inventory directly into the Miami and South Florida REALTORS® MLS as the licensed principal of record — 93,000 member agents, 200+ global portals, 19 languages."
        />
        <link rel="canonical" href="https://homesprofessional.com/global-desk" />
        <meta property="og:title" content="Global Desk — Miami MLS International Activation" />
        <meta
          property="og:description"
          content="Your inventory. The U.S. market. One licensed principal. Formal MLS listing, documented agent outreach, and campaign reporting — not a referral."
        />
        <meta property="og:url" content="https://homesprofessional.com/global-desk" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/carlos-headshot.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Global Desk — Miami MLS International Activation | HomesProfessional.com" />
        <meta name="twitter:description" content="Your inventory. The U.S. market. One licensed principal. Formal MLS listing, documented agent outreach, and campaign reporting." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/carlos-headshot.png" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://homesprofessional.com/" },
            { "@type": "ListItem", "position": 2, "name": "Global Desk", "item": "https://homesprofessional.com/global-desk" },
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": GLOBAL_DESK_FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Miami MLS International Activation — Global Desk",
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "serviceType": "International Real Estate MLS Activation",
          "description": "Carlos Uzcategui places eligible international inventory directly into the Miami and South Florida REALTORS® MLS as the licensed principal of record.",
          "areaServed": ["Spain", "Latin America", "South Florida"],
          "url": "https://homesprofessional.com/global-desk",
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-[#060D18] pb-20 lg:pb-0">
        <Navbar />

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-[#060D18] pt-28 pb-16 md:pt-36 md:pb-24 px-6 text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(22,68,158,0.28),transparent_70%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_60%,rgba(176,141,87,0.07),transparent_70%)]" />

          <div className="relative mx-auto max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold"
            >
              International Activation · Miami MLS · Licensed Principal of Record
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="mt-6 font-serif leading-[1.05] text-white"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", fontWeight: 400 }}
            >
              Your inventory. The U.S. market.
              <br />
              <em className="italic text-gold">One licensed principal.</em>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-white/60"
            >
              The majority of buyers for prime property in Spain and Latin America originate in the
              Americas. The listing strategy has to reach them where they search — inside the U.S.
              professional network, not adjacent to it.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.26 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                Request a Distribution Assessment
                <ChevronRight size={14} />
              </a>
              <a
                href={CONTACT.whatsappSpain}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/25 px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/75 transition-colors hover:border-gold/60 hover:text-white"
              >
                WhatsApp Spain Desk
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── Mechanism ── */}
        <section className="border-t border-gold/15 bg-navy py-16 md:py-24 px-6 text-white">
          <div className="mx-auto max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold"
            >
              How It Works
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="mt-6 max-w-3xl font-sans text-lg leading-[1.85] text-white/70"
            >
              Carlos Uzcategui, a Florida Realtor® licensed since 2001, places eligible international
              inventory directly into the Miami and South Florida REALTORS® MLS as the licensed
              principal of record. The day it goes live, the property sits inside the world's largest
              local Realtor® association — 93,000 member agents representing active Latin American,
              European, and North American buyer demand. Not a referral. A formal listing.
            </motion.p>

            {/* Stat strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-10 flex flex-wrap gap-x-10 gap-y-6"
            >
              {[
                { v: "93,000", l: "Member Agents" },
                { v: "260+",   l: "U.S. MLSs" },
                { v: "200+",   l: "Global Portals" },
                { v: "19",     l: "Languages" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-serif text-3xl text-gold">{s.v}</div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">{s.l}</div>
                </div>
              ))}
            </motion.div>

            {/* Three steps */}
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="relative border border-gold/20 bg-navy-deep/60 p-8"
                >
                  <span className="font-serif text-6xl text-gold/10 absolute top-3 right-4 leading-none select-none">
                    {step.num}
                  </span>
                  <h3 className="font-serif text-2xl text-white">{step.title}</h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-white/55">{step.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who it's for + engagement terms ── */}
        <section className="border-t border-gold/15 bg-navy-deep py-16 md:py-24 px-6 text-white">
          <div className="mx-auto max-w-5xl grid gap-10 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Who It's For</p>
              <p className="mt-5 font-sans text-base leading-relaxed text-white/65">
                Spanish and LATAM agencies, developers, and HNW owners seeking institutional U.S.
                exposure — and South Florida owners with globally appealing property.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">How Engagement Works</p>
              <p className="mt-5 font-sans text-base leading-relaxed text-white/65">
                Structured per property and market — referral cooperation, co-listing, or advisory,
                with written agreements where applicable. Terms are set in direct conversation, not
                posted. Referral agreements honored both directions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="border-t border-gold/20 bg-navy py-14 px-6 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl italic text-white" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}>
              Ready to put your inventory inside the world's largest local Realtor® network?
            </h2>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-gold px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                Request a Miami MLS Distribution Assessment
              </a>
              <a
                href={CONTACT.whatsappSpain}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border border-white/25 px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/75 transition-colors hover:border-gold hover:text-gold"
              >
                WhatsApp Spain Desk · +34 646 85 30 78
              </a>
            </div>
            <p className="font-mono mt-8 text-[9px] uppercase tracking-[0.2em] text-white/30">
              Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity
            </p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
