import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight, ChevronDown, Globe2, Building2, Landmark, Crown,
  FileCheck, BarChart3, Network, ShieldCheck, Languages, MessageCircle,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LazyVideo } from "../components/LazyVideo";
import { MiamiRealtorsBadge } from "../components/MiamiRealtorsBadge";
import { CONTACT } from "../constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
    icon: Network,
    title: "MLS Placement",
    body: "Your property is entered as a listed property by the licensed principal of record — syndicated through 260+ U.S. MLSs and eligible to appear across 200+ global portals in 19 languages, subject to platform and eligibility rules.",
  },
  {
    num: "02",
    icon: FileCheck,
    title: "Documented Agent Outreach",
    body: "Professional, peer-to-peer outreach to the South Florida agents actively representing qualified international buyers for your property type and price tier. Every contact is documented.",
  },
  {
    num: "03",
    icon: BarChart3,
    title: "Campaign Reporting",
    body: "Written activity reporting to your ownership or agency team: agent contacts made, showing requests, buyer positioning feedback, and platform distribution confirmation.",
  },
];

const BUYER_MARKETS = [
  {
    key: "latam",
    label: "Latin America",
    headline: "The dominant force in South Florida luxury.",
    body: "Capital from Mexico, Colombia, Venezuela, Brazil, Argentina, and the broader region moves through Miami first. For owners of prime property, these are the buyers actively transacting at the top of the market — and they are represented by agents already inside the network.",
  },
  {
    key: "europe",
    label: "Europe",
    headline: "Second-home demand and asset diversification.",
    body: "Spanish, Italian, French, and UK buyers treat South Florida as a dollar-denominated second-home and diversification market. The 437+ international agreements and 19-language syndication place prime listings in front of the European agents representing that demand.",
  },
  {
    key: "northam",
    label: "North America",
    headline: "A deep, financeable domestic pool.",
    body: "Relocators leaving the Northeast and California — plus Canadian seasonal buyers — form a large, qualified buyer base drawn by Florida's tax structure and lifestyle. The 260+ U.S. MLS data exchange extends reach far beyond South Florida itself.",
  },
  {
    key: "gulf",
    label: "Middle East & Asia",
    headline: "A stable store of value.",
    body: "Gulf and Asian capital increasingly views South Florida real estate as a stable, dollar-denominated asset. Global-portal syndication across 19 languages reaches the international agents representing these buyers, subject to platform eligibility.",
  },
];

const OWNER_TYPES = [
  {
    icon: Crown,
    title: "Private owners of prime property",
    body: "High-net-worth owners of trophy residences, waterfront estates, and signature condos who want institutional U.S. exposure — not a single-portal listing.",
  },
  {
    icon: Building2,
    title: "Developers & branded residences",
    body: "Pre-construction and branded-residence inventory seeking professional buyer-agent channels into the U.S. and LATAM market at the pre-sale stage.",
  },
  {
    icon: Globe2,
    title: "International agencies",
    body: "Spanish, European, and LATAM agencies with prime listings that deserve direct, professional access to the Miami buyer pool — through a licensed principal of record.",
  },
  {
    icon: Landmark,
    title: "South Florida owners, global appeal",
    body: "Owners of South Florida property whose buyer is more likely to arrive from São Paulo, Madrid, or Mexico City than from down the street.",
  },
];

const REACH_STATS = [
  { v: "93,000", l: "Member Agents" },
  { v: "200+",   l: "Global Portals" },
  { v: "19",     l: "Languages" },
  { v: "437+",   l: "Intl. Agreements" },
  { v: "75+",    l: "Countries" },
  { v: "260+",   l: "U.S. MLSs" },
];

export default function GlobalDeskPage() {
  const [activeMarket, setActiveMarket] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>Global Desk — Prime Property Exposure in the Miami MLS | HomesProfessional.com</title>
        <meta
          name="description"
          content="Prime international property placed directly into the Miami REALTORS® MLS by a licensed principal of record — 93,000 agents, 200+ global portals, 19 languages. A formal listing, not a referral."
        />
        <link rel="canonical" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/spain-desk" />
        <meta property="og:title" content="Global Desk — Prime Property Exposure in the Miami MLS" />
        <meta
          property="og:description"
          content="Your prime property. The U.S. buyer network. One licensed principal. A formal Miami MLS listing with documented agent outreach and campaign reporting — not a referral."
        />
        <meta property="og:url" content="https://homesprofessional.com/global-desk" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Global Desk — Prime Property Exposure in the Miami MLS | HomesProfessional.com" />
        <meta name="twitter:description" content="Your prime property placed directly into the Miami REALTORS® MLS by a licensed principal of record. A formal listing, not a referral." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
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
          "description": "Carlos Uzcategui places eligible international and prime inventory directly into the Miami and South Florida REALTORS® MLS as the licensed principal of record.",
          "areaServed": ["Spain", "Latin America", "Europe", "South Florida"],
          "url": "https://homesprofessional.com/global-desk",
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-[#060D18] pb-20 lg:pb-0">
        <Navbar />

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-[#060D18] pt-28 pb-16 md:pt-36 md:pb-24 px-6 text-white">
          <LazyVideo
            src="/videos/dollhouse_global_reach.mp4"
            eager
            className="absolute inset-0 h-full w-full object-cover opacity-[0.28]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060D18]/70 via-[#060D18]/55 to-[#060D18]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(22,68,158,0.30),transparent_70%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_70%,rgba(176,141,87,0.10),transparent_70%)]" />

          <div className="relative mx-auto max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold"
            >
              The Global Desk · Miami REALTORS® MLS · Licensed Principal of Record
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08 }}
              className="mt-6 font-serif leading-[1.05] text-white"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", fontWeight: 400 }}
            >
              Your prime property deserves
              <br />
              <em className="italic text-gold">the buyers Miami already commands.</em>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-white/65"
            >
              The world's most active buyers for prime real estate transact through the Miami
              REALTORS® network — the largest local Realtor® association on earth. The Global Desk
              places eligible property directly inside it, through a licensed principal of record.
              Not adjacent to the market. Inside it.
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
                WhatsApp the Desk
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-7 font-mono text-[9px] uppercase tracking-[0.22em] text-white/40"
            >
              <span>Formal MLS Listing</span>
              <span className="text-gold/40">·</span>
              <span>Documented Outreach</span>
              <span className="text-gold/40">·</span>
              <span>Written Reporting</span>
              <span className="text-gold/40">·</span>
              <span>Not a Referral</span>
            </motion.div>
          </div>
        </section>

        {/* ── Reframe — why this matters (LIGHT) ── */}
        <section className="bg-ivory py-16 md:py-24 px-6 text-navy">
          <div className="mx-auto max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-deep"
            >
              The Reframe
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="mt-5 max-w-3xl font-serif text-3xl leading-[1.2] md:text-4xl"
            >
              The buyer for your property is rarely local.
              <span className="text-gold-deep"> The network that reaches them is.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mt-7 max-w-3xl font-sans text-lg leading-[1.85] text-navy/70"
            >
              Prime real estate does not sell to whoever walks past it. It sells to a small,
              mobile, international pool of buyers — and that pool searches, qualifies, and
              transacts through professional agent relationships. In South Florida, those
              relationships live inside one place: the Miami and South Florida REALTORS® MLS.
              A listing that sits outside it is visible to portals. A listing inside it is
              visible to the agents who actually represent the buyers.
            </motion.p>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                {
                  t: "Visibility is not exposure",
                  b: "Being findable on a portal is not the same as being presented by an agent who represents a qualified buyer. The MLS is where representation happens.",
                },
                {
                  t: "The principal of record matters",
                  b: "Only a licensed U.S. principal can place a property into the MLS. That is the structural difference between a referral and a real listing.",
                },
                {
                  t: "One market, global demand",
                  b: "Miami trades as an international city. Its agent network already carries Latin American, European, and North American buyer demand every day.",
                },
              ].map((c, i) => (
                <motion.div
                  key={c.t}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className="border-l-2 border-gold/50 pl-5"
                >
                  <h3 className="font-serif text-xl text-navy">{c.t}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-navy/60">{c.b}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mechanism — how it works (NAVY, with video panel) ── */}
        <section className="relative overflow-hidden border-t border-gold/15 bg-navy py-16 md:py-24 px-6 text-white">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">How It Works</p>
                <h2 className="mt-5 font-serif text-3xl leading-[1.15] md:text-4xl">
                  A formal listing. Not a referral.
                </h2>
                <p className="mt-6 font-sans text-base leading-[1.85] text-white/65">
                  Carlos Uzcategui, a Florida Realtor® licensed since 2001, places eligible property
                  directly into the Miami and South Florida REALTORS® MLS as the licensed principal
                  of record. The day it goes live, the property sits inside the world's largest local
                  Realtor® association — 93,000 member agents representing active international buyer
                  demand.
                </p>
                <div className="mt-7">
                  <MiamiRealtorsBadge />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                className="relative overflow-hidden border border-gold/20"
                style={{ paddingBottom: "62%" }}
              >
                <LazyVideo
                  src="/videos/best_exposure_listings.mp4"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/60">
                    Miami MLS · Institutional Exposure
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Stat strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-14 grid grid-cols-3 gap-y-8 border-y border-white/10 py-8 md:grid-cols-6"
            >
              {REACH_STATS.map((s) => (
                <div key={s.l} className="text-center">
                  <div className="font-serif text-3xl text-gold">{s.v}</div>
                  <div className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-white/40">{s.l}</div>
                </div>
              ))}
            </motion.div>

            {/* Three steps */}
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {STEPS.map((step, i) => {
                const StepIcon = step.icon;
                return (
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
                    <div className="flex h-11 w-11 items-center justify-center border border-gold/25 bg-gold/8">
                      <StepIcon size={18} className="text-gold" />
                    </div>
                    <h3 className="mt-5 font-serif text-2xl text-white">{step.title}</h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-white/55">{step.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Interactive buyer-market selector (WHITE) ── */}
        <section className="bg-white py-16 md:py-24 px-6 text-navy">
          <div className="mx-auto max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-deep"
            >
              Where the Demand Comes From
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="mt-5 max-w-3xl font-serif text-3xl leading-[1.2] md:text-4xl"
            >
              One network. Four buyer worlds.
            </motion.h2>
            <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-navy/60">
              The Miami REALTORS® network does not represent a single market — it carries the
              global capital flows that converge on South Florida. Select a region to see how it
              reaches your property.
            </p>

            {/* Tabs */}
            <div className="mt-10 flex flex-wrap gap-2">
              {BUYER_MARKETS.map((m, i) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setActiveMarket(i)}
                  className={`px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300 ${
                    activeMarket === i
                      ? "bg-navy text-white"
                      : "border border-navy/15 text-navy/55 hover:border-gold/50 hover:text-navy"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={BUYER_MARKETS[activeMarket].key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="mt-6 border border-bone bg-ivory p-8 md:p-10"
              >
                <div className="flex items-center gap-3">
                  <Globe2 size={18} className="text-gold-deep" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-deep">
                    {BUYER_MARKETS[activeMarket].label}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-2xl text-navy md:text-3xl">
                  {BUYER_MARKETS[activeMarket].headline}
                </h3>
                <p className="mt-4 max-w-3xl font-sans text-base leading-[1.85] text-navy/70">
                  {BUYER_MARKETS[activeMarket].body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── Who it's for (NAVY-DEEP) ── */}
        <section className="border-t border-gold/15 bg-navy-deep py-16 md:py-24 px-6 text-white">
          <div className="mx-auto max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold"
            >
              Who It's For
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="mt-5 max-w-3xl font-serif text-3xl leading-[1.2] md:text-4xl"
            >
              Built for owners of property the world wants.
            </motion.h2>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {OWNER_TYPES.map((o, i) => {
                const OwnerIcon = o.icon;
                return (
                  <motion.div
                    key={o.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="flex gap-5 border border-white/10 bg-white/[0.03] p-7"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-gold/25 bg-gold/8">
                      <OwnerIcon size={18} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl text-white">{o.title}</h3>
                      <p className="mt-2.5 font-sans text-sm leading-relaxed text-white/55">{o.body}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Distribution + engagement (IVORY) ── */}
        <section className="bg-ivory py-16 md:py-24 px-6 text-navy">
          <div className="mx-auto max-w-5xl grid gap-12 md:grid-cols-2 md:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center gap-3">
                <Languages size={18} className="text-gold-deep" />
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-deep">Distribution</p>
              </div>
              <h3 className="mt-5 font-serif text-2xl text-navy md:text-3xl">
                Listed once. Distributed globally.
              </h3>
              <p className="mt-5 font-sans text-base leading-[1.85] text-navy/70">
                Eligible listings are syndicated across 200+ international portals in 19 languages
                and supported by 437+ international referral agreements spanning 75+ countries — the
                infrastructure that puts a single property in front of representing agents on four
                continents. Platform appearance is subject to eligibility and MLS rules.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-gold-deep" />
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-deep">How Engagement Works</p>
              </div>
              <h3 className="mt-5 font-serif text-2xl text-navy md:text-3xl">
                Structured, written, and discreet.
              </h3>
              <p className="mt-5 font-sans text-base leading-[1.85] text-navy/70">
                Each engagement is structured per property and market — referral cooperation,
                co-listing, or advisory — with written agreements executed before any listing
                activity begins. Terms are set in direct conversation, not posted publicly. Referral
                agreements are honored in both directions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Bridge: Agency & Developer partnership page ── */}
        <section className="border-t border-gold/20 bg-navy-deep px-6 py-12 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Agencies · Developers · Family Offices</p>
            <h2 className="mt-4 font-serif text-2xl leading-tight md:text-3xl">
              Representing prime Spanish inventory?<br />
              <em className="not-italic italic text-gold">There is a dedicated desk for you.</em>
            </h2>
            <a
              href="/spain-mls-listing"
              className="group mt-7 inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
            >
              List Spanish Inventory on the Miami MLS
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </section>

        {/* ── FAQ (NAVY) ── */}
        <section className="border-t border-gold/15 bg-navy py-16 md:py-24 px-6 text-white">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Common Questions</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
                What owners ask before they engage.
              </h2>
            </div>

            <div className="mt-12 divide-y divide-white/8">
              {GLOBAL_DESK_FAQS.map((faq, i) => (
                <div key={faq.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-serif text-lg leading-snug text-white">{faq.q}</span>
                    <ChevronDown
                      size={20}
                      className={`mt-0.5 flex-shrink-0 text-gold transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 font-sans text-[0.9rem] leading-relaxed text-white/75">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Journal crosslinks ── */}
        <section className="bg-white border-t border-hairline py-12 px-6">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-6">International Seller Research</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="/journal/international-owners-south-florida-mls-2026" className="block border border-hairline bg-ivory p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 mb-3">International</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">International Property Owners and the South Florida MLS — How U.S. Market Activation Works</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the guide →</p>
              </a>
              <a href="/journal/seller-closing-costs-south-florida-2026" className="block border border-hairline bg-ivory p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold/70 mb-3">Seller Strategy</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">What Does It Cost to Sell a Home in South Florida — A Guide to Net Proceeds</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the cost guide →</p>
              </a>
            </div>
          </div>
        </section>

        {/* ── CTA (IVORY) ── */}
        <section className="bg-ivory py-16 md:py-20 px-6 text-center text-navy">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif italic leading-tight text-navy" style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}>
              Put your property inside the network that already holds its buyer.
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-navy/60">
              Start with a private distribution assessment. Carlos reviews each property
              and responds himself.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-navy px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy-deep"
              >
                Request a Miami MLS Distribution Assessment
                <ChevronRight size={14} />
              </a>
              <a
                href={CONTACT.whatsappSpain}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-navy/25 px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70 transition-colors hover:border-gold hover:text-gold-deep"
              >
                <MessageCircle size={13} />
                WhatsApp the Desk · +34 646 85 30 78
              </a>
            </div>
            <p className="mt-9 font-mono text-[9px] uppercase tracking-[0.2em] text-navy/35">
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
