import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight, ChevronDown, Globe2, Network, FileCheck, BarChart3,
  Layers, MessageCircle,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LazyVideo } from "../components/LazyVideo";
import { SpainReel } from "../components/SpainReel";
import { MiamiRealtorsBadge } from "../components/MiamiRealtorsBadge";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// US WhatsApp for the desk; Madrid WhatsApp for international-seller blocks.
const WA_US = "https://wa.me/19548656622";
const WA_MADRID = "https://wa.me/34646853078";

const GLOBAL_DESK_FAQS = [
  {
    q: "Is the Global Desk a referral service or a formal listing?",
    a: "A formal listing. Carlos Uzcategui, Florida Licensed Realtor® SL705771, places eligible property directly into the Miami REALTORS® MLS as the licensed principal of record. The property enters the daily working ecosystem of the network's member agents, who can present it to their own buyer clients, with referral-commission incentives extended to producing agents. This is a formal listing position — not a referral passed to someone else.",
  },
  {
    q: "What types of properties qualify for placement?",
    a: "Eligible properties typically include South Florida residential and commercial inventory with international appeal, and select Spain, European, and Latin American inventory that qualifies for U.S. MLS placement under applicable MLS rules and agreements. Eligibility is assessed per-property during the initial strategy conversation — not all international inventory qualifies, and Carlos reviews each submission before engaging.",
  },
  {
    q: "Which buyer markets does the network reach?",
    a: "The Miami REALTORS® network — the largest local REALTOR® association — includes 93,000 member agents representing active Latin American, European, North American, and Middle Eastern buyer demand. Eligible listings can appear across 200+ global portals in 19 languages, subject to platform eligibility and MLS rules, supported by 437+ international agreements.",
  },
  {
    q: "What is included in outreach reporting?",
    a: "Activity reporting includes documented agent outreach contacts, showing requests, buyer positioning feedback from the agent network, and platform distribution confirmation. Outreach activity is tracked and reported to the ownership or agency team in writing.",
  },
  {
    q: "How is compensation structured?",
    a: "Marketing engagements and commission or referral activity are administered through separate entities — commission and referral activity through United Realty Group, consistent with Florida Statute §475. Terms are set in direct conversation, not posted publicly, as they vary by property type, jurisdiction, and engagement structure. Written agreements are executed before any listing activity begins, and referral agreements are honored in both directions.",
  },
];

// Region selector — Latin America is the default, primary buyer engine.
const BUYER_MARKETS = [
  {
    key: "latam",
    label: "Latin America",
    headline: "The primary buyer engine.",
    body: "Capital from Mexico, Colombia, Argentina, Brazil, Venezuela, and across the region treats South Florida as a dollar-denominated safe-harbor market. For owners in Spain and Europe whose own demand is driven by Latin American buyers, the network reaches those buyers' agents directly — the same buyers, sourced through the largest local REALTOR® association.",
  },
  {
    key: "europe",
    label: "Europe",
    headline: "Second-home demand and asset diversification.",
    body: "Spanish, Italian, French, and UK owners treat South Florida as a dollar-denominated second-home and diversification market — and increasingly position European premium property for Miami-network exposure to reach Latin American and North American buyers. The 437+ international agreements and 19-language syndication place prime listings in front of the European agents representing that demand.",
  },
  {
    key: "northam",
    label: "North America",
    headline: "Relocation and second-home acquisition.",
    body: "U.S. and Canadian buyers relocating or acquiring second homes move through the network's 260+ syndicated U.S. MLSs and 11 MLS data exchanges with the largest U.S. and Canadian systems.",
  },
  {
    key: "gulf",
    label: "Middle East & Asia",
    headline: "Dollar-asset acquisition.",
    body: "Private and institutional capital seeking U.S. dollar real estate assets reaches South Florida through 200+ global portals publishing in 19 languages.",
  },
];

const SERVICE_LEVELS = [
  {
    num: "01",
    icon: Network,
    title: "MLS Positioning",
    body: "Formal placement of eligible property inside the Miami REALTORS® MLS through a licensed Florida principal of record. The property enters the daily working ecosystem of the network's member agents, who can present it to their own buyers. Monthly marketing engagement. Written confirmation of placement.",
  },
  {
    num: "02",
    icon: FileCheck,
    title: "Positioning + Network Outreach",
    body: "Everything in MLS Positioning, plus documented outreach campaigns to cooperating agents across target buyer markets, referral-commission incentives extended to producing agents, and periodic written reporting on outreach activity.",
  },
  {
    num: "03",
    icon: BarChart3,
    title: "Managed Distribution",
    body: "A full-service mandate: MLS positioning, multi-market agent outreach and campaign management, CRM-tracked buyer and agent pipeline, referral-fee and commission transaction coordination through United Realty Group, and monthly written performance reporting.",
  },
];

// Verified figures only — see HARD CONSTRAINTS. Do not substitute or inflate.
const REACH_STATS = [
  { v: "93,000", l: "Member Agents" },
  { v: "200+",   l: "Global Portals" },
  { v: "19",     l: "Languages" },
  { v: "260+",   l: "U.S. MLSs" },
  { v: "437+",   l: "Intl. Agreements" },
  { v: "11",     l: "MLS Data Exchanges" },
];

export default function GlobalDeskPage() {
  const [activeMarket, setActiveMarket] = useState(0); // Latin America default
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Helmet>
        <title>The Global Desk — Premium Property in the Miami REALTORS® Network | HomesProfessional.com</title>
        <meta
          name="description"
          content="The Global Desk places eligible premium property — anywhere in the world — formally inside the Miami REALTORS® MLS through a licensed principal of record, reaching the Latin American, European, and North American buyers the network already represents."
        />
        <link rel="canonical" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/spain-desk" />
        <meta property="og:title" content="The Global Desk — Premium Property in the Miami REALTORS® Network" />
        <meta
          property="og:description"
          content="Eligible premium property placed formally inside the Miami REALTORS® MLS by a licensed principal of record — reaching the Latin American and global buyers who move through Miami. A formal listing position, not a referral."
        />
        <meta property="og:url" content="https://homesprofessional.com/global-desk" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Global Desk — Premium Property in the Miami REALTORS® Network | HomesProfessional.com" />
        <meta name="twitter:description" content="Premium property positioned formally inside the Miami REALTORS® MLS by a licensed principal of record. A formal listing position, not a referral." />
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
          "name": "The Global Desk — Miami REALTORS® MLS Positioning",
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "serviceType": "International Premium Property MLS Positioning",
          "description": "Carlos Uzcategui, licensed Florida principal of record, places eligible premium property from any market formally inside the Miami REALTORS® MLS, where the network's member agents can present it to their buyers. Bilateral referral flow with affiliated Madrid agencies reaches European and Latin American buyers for South Florida property.",
          "areaServed": ["Spain", "Latin America", "Europe", "North America", "South Florida"],
          "url": "https://homesprofessional.com/global-desk",
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-[#060D18] pb-20 lg:pb-0">
        <Navbar />

        {/* ── 3.1 Hero ── */}
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
              Premium property, wherever it sits,
              <br />
              <em className="italic text-gold">positioned where the buyers already move.</em>
            </motion.h1>
            {/* Alternate headlines for Carlos to choose from:
                 A) "The buyers move through Miami. Your listing should be inside the network."
                 B) "List where Latin American and global capital already searches." */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-white/65"
            >
              The world's most active buyers for prime real estate move through the Miami
              REALTORS® network — the largest local REALTOR® association. The Global Desk places
              eligible property from any market formally inside it, through a licensed principal of
              record, so the network's member agents can present it to their buyers. Not adjacent to
              the market. Inside it.
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
                href={WA_US}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/25 px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/75 transition-colors hover:border-gold/60 hover:text-white"
              >
                WhatsApp the Desk
              </a>
            </motion.div>

            {/* Trust strip */}
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

        {/* ── 3.2 What the Global Desk does (IVORY) ── */}
        <section className="bg-ivory py-16 md:py-24 px-6 text-navy">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-deep">
                  What the Global Desk Does
                </p>
                <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-[1.18] md:text-4xl">
                  Formal position inside the network, not exposure adjacent to it.
                </h2>
                <p className="mt-7 max-w-2xl font-sans text-lg leading-[1.85] text-navy/70">
                  For an owner of premium property, the question is not whether a listing is
                  advertised — it is whether it sits inside the infrastructure the most active
                  buyers already work through. The Global Desk places eligible property directly
                  into the Miami REALTORS® MLS, where 93,000 member agents can present it to their
                  buyer clients as part of their daily working ecosystem. Producing agents are
                  extended referral-commission incentives to bring qualified buyers. Carlos serves
                  as the licensed Florida principal of record. This is a formal listing position —
                  not a referral passed to someone else.
                </p>
                <div className="mt-8">
                  <MiamiRealtorsBadge />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE }}
                className="relative mx-auto w-full max-w-[300px] overflow-hidden border border-gold/25 shadow-2xl shadow-navy-deep/30"
                style={{ aspectRatio: "9 / 16" }}
              >
                <SpainReel
                  clips={[
                    "/videos/spain_seller_journey.mp4",
                    "/videos/spain_seller_journey_2.mp4",
                  ]}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-navy-deep/10" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-mono text-[8px] uppercase tracking-[0.25em] text-gold/85">
                    Any Market → Miami REALTORS® MLS
                  </p>
                  <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.22em] text-white/55">
                    Formal Position · Principal of Record
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Network reach stat strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-14 grid grid-cols-3 gap-y-8 border-y border-navy/10 py-8 md:grid-cols-6"
            >
              {REACH_STATS.map((s) => (
                <div key={s.l} className="text-center">
                  <div className="font-serif text-3xl text-gold-deep">{s.v}</div>
                  <div className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-navy/45">{s.l}</div>
                </div>
              ))}
            </motion.div>
            {/* REVIEWER FLAG — $69B 2025 transaction volume. Previously removed from public copy.
                If used, attribute strictly to the Miami and South Florida REALTORS® network's
                combined 2025 volume — never to Carlos or United Realty Group. DO NOT publish
                until Carlos confirms. Placeholder location for an approved figure, e.g.:
                { v: "$69B", l: "Network 2025 Volume" } — left out pending approval. */}
          </div>
        </section>

        {/* ── 3.3 Where the demand comes from (region selector, WHITE) ── */}
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
              global capital flows that converge on South Florida, and it reaches the agents who
              represent those buyers. Select a region to see how the network connects a listing to
              its demand.
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

        {/* ── 3.4 Bilateral flow (NAVY-DEEP) ── */}
        <section className="border-t border-gold/15 bg-navy-deep py-16 md:py-24 px-6 text-white">
          <div className="mx-auto max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold"
            >
              Bilateral Flow
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="mt-5 max-w-3xl font-serif text-3xl leading-[1.2] md:text-4xl"
            >
              Two directions, one network.
            </motion.h2>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col border border-white/10 bg-white/[0.03] p-8"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                  For owners outside the United States
                </p>
                <p className="mt-4 font-sans text-base leading-[1.85] text-white/65">
                  Carlos places eligible premium property inside the Miami REALTORS® MLS as the
                  licensed Florida principal of record. The listing gains formal U.S. market
                  position and reaches the network's member agents, who present it to their buyers —
                  with referral-commission incentives for producing agents. A formal listing
                  position, not a referral handoff.
                </p>
                <a
                  href={WA_MADRID}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 self-start border border-white/25 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/75 transition-colors hover:border-gold/60 hover:text-white"
                >
                  <MessageCircle size={13} />
                  WhatsApp Madrid Desk
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="flex flex-col border border-white/10 bg-white/[0.03] p-8"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                  For South Florida owners with European or LATAM buyer profiles
                </p>
                <p className="mt-4 font-sans text-base leading-[1.85] text-white/65">
                  Carlos coordinates with affiliated Madrid agencies to reach buyers relocating and
                  investing from Europe and Latin America into Florida. Bilateral referral flow, in
                  both directions.
                </p>
                <a
                  href="/sell-south-florida"
                  className="mt-7 inline-flex items-center gap-2 self-start border border-white/25 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/75 transition-colors hover:border-gold/60 hover:text-white"
                >
                  South Florida Seller Strategy
                  <ChevronRight size={13} />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 3.5 Service levels (IVORY) ── */}
        <section className="bg-ivory py-16 md:py-24 px-6 text-navy">
          <div className="mx-auto max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-deep"
            >
              Service Levels
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="mt-5 max-w-3xl font-serif text-3xl leading-[1.2] md:text-4xl"
            >
              Three levels of distribution. One standard of placement.
            </motion.h2>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {SERVICE_LEVELS.map((level, i) => {
                const LevelIcon = level.icon;
                return (
                  <motion.div
                    key={level.num}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, delay: i * 0.1 }}
                    className="relative border border-gold/25 bg-white p-8"
                  >
                    <span className="font-serif text-6xl text-gold/15 absolute top-3 right-4 leading-none select-none">
                      {level.num}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center border border-gold/30 bg-gold/8">
                      <LevelIcon size={18} className="text-gold-deep" />
                    </div>
                    <p className="mt-5 font-mono text-[9px] uppercase tracking-[0.2em] text-gold-deep">
                      Level {level.num.replace(/^0/, "")}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl text-navy">{level.title}</h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-navy/65">{level.body}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-12 flex justify-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-navy px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy-deep"
              >
                Request a Distribution Assessment
                <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Bridge: dedicated agency / Spanish inventory desk ── */}
        <section className="border-t border-gold/20 bg-navy-deep px-6 py-12 text-center text-white">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Agencies · Developers · Family Offices</p>
            <h2 className="mt-4 font-serif text-2xl leading-tight md:text-3xl">
              Representing prime Spanish inventory?<br />
              <em className="not-italic italic text-gold">There is a dedicated desk for you.</em>
            </h2>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href="/spain-mls-listing"
                className="group inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                List Spanish Inventory on the Miami MLS
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="/agents"
                className="inline-flex items-center gap-2 border border-white/25 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/75 transition-colors hover:border-gold/60 hover:text-white"
              >
                Broker Cooperation
                <Layers size={13} />
              </a>
            </div>
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

        {/* ── 3.6 Closing CTA (IVORY) ── */}
        <section className="bg-ivory py-16 md:py-20 px-6 text-center text-navy">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif italic leading-tight text-navy" style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}>
              Position your property where the buyers already are.
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-navy/60">
              Begin with a distribution assessment: a written read on which buyer markets the
              network reaches for your property, and which service level fits the mandate.
            </p>
            <div className="mt-9 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-navy px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy-deep"
              >
                Request a Distribution Assessment
                <ChevronRight size={14} />
              </a>
              <a
                href={WA_US}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-navy/25 px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70 transition-colors hover:border-gold hover:text-gold-deep"
              >
                <MessageCircle size={13} />
                WhatsApp the Desk
              </a>
              <a
                href={WA_MADRID}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-navy/25 px-8 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70 transition-colors hover:border-gold hover:text-gold-deep"
              >
                <MessageCircle size={13} />
                WhatsApp Madrid Desk
              </a>
            </div>
            {/* ── 3.7 Compliance footer ── */}
            <p className="mt-9 font-mono text-[9px] uppercase tracking-[0.2em] text-navy/35">
              Carlos Uzcategui · Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity
            </p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
