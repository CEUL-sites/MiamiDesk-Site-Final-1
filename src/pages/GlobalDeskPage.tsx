import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  ChevronRight, ChevronDown, Globe2, Network, FileCheck, BarChart3,
  Layers, MessageCircle, Building2, Handshake, Landmark,
  ShieldCheck, Globe,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LazyVideo } from "../components/LazyVideo";
import { SpainReel } from "../components/SpainReel";
import { MiamiRealtorsBadge } from "../components/MiamiRealtorsBadge";
import { AgencyPartnerForm } from "../components/forms/AgencyPartnerForm";
import { fig } from "../data/figures";
import { trackContact, trackFunnelEvent } from "../lib/analytics";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Hero stagger — mirrors the homepage Hero so both heros animate in identically.
const heroContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const heroItem: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// US WhatsApp for the desk; Madrid WhatsApp for international-seller blocks.
// Pre-filled so an inbound chat arrives already segmented to the right desk —
// English to the US desk, Spanish to the Madrid desk.
const WA_US =
  "https://wa.me/19548656622?text=" +
  encodeURIComponent(
    "Hello Carlos, I'd like to discuss placing a property through the Global Desk into the Miami REALTORS® network. Could we start a distribution assessment?"
  );
const WA_MADRID =
  "https://wa.me/34646853078?text=" +
  encodeURIComponent(
    "Hola Carlos, represento inventario prime y me gustaría conocer la Mesa España: colocar la propiedad en la sindicación del MIAMI International MLS (RWorld) con usted como principal de registro en Florida."
  );

const GLOBAL_DESK_FAQS = [
  {
    q: "Is the Global Desk a referral service or a formal listing?",
    a: "A formal listing position. Carlos Uzcategui, Florida Licensed Realtor® SL705771, places eligible property through United Realty Group as the licensed Florida principal of record — not a referral passed to someone else. The vehicle depends on where the property sits: South Florida property enters the core Southeast Florida MLS (SEFMLS), the daily working ecosystem of the network's member agents; Spanish, European, and Latin American property is placed into the MIAMI International MLS (RWorld) syndication platform, the association-backed international channel that distributes listings to the global agent and broker network in 100+ languages. Both reach the agents who hold the buyers.",
  },
  {
    q: "Which MLS does an international property actually enter?",
    a: "Property located outside the U.S. does not enter the core Southeast Florida MLS daily-search system, whose rules assume owner-signed listings within the South Florida service area. International inventory is placed into the MIAMI International MLS (RWorld) — the association's international syndication platform, distributing across thousands of partner agent and broker websites worldwide in 100+ languages — with Carlos as licensed Florida principal of record through United Realty Group. Placement is subject to MLS rules and per-property eligibility.",
  },
  {
    q: "What types of properties qualify for placement?",
    a: "Eligible properties typically include South Florida residential and commercial inventory with international appeal, and select Spain, European, and Latin American inventory that qualifies for MIAMI International MLS (RWorld) syndication under applicable MLS rules and agreements. Eligibility is assessed per-property during the initial strategy conversation — not all international inventory qualifies, and Carlos reviews each submission before engaging.",
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
    a: "Two distinct layers, kept separate. Marketing services are engaged through a separate marketing entity; the marketing fee is for those services and is not contingent on a transaction closing. All real-estate commission and referral compensation is handled solely through United Realty Group, consistent with Florida Statute §475. Specific terms are set in direct conversation, not posted publicly, as they vary by property type, jurisdiction, and engagement structure. Written agreements are executed before any listing activity begins, and referral agreements are honored in both directions.",
  },
];

// Region selector — Latin America is the default, primary buyer engine.
const BUYER_MARKETS = [
  {
    key: "latam",
    label: "Latin America",
    headline: "The primary buyer engine.",
    body: "Capital from Mexico, Colombia, Argentina, Brazil, Venezuela, and across the region treats South Florida as a dollar-denominated safe-harbor market. For owners, developers, and agencies whose own demand is driven by Latin American buyers, the Miami REALTORS® network reaches those buyers' agents directly — the same buyers, through the agents who already represent them, inside the largest local REALTOR® association on earth.",
  },
  {
    key: "europe",
    label: "Europe",
    headline: "Second-home demand and asset diversification.",
    body: "Spanish, Italian, French, and UK buyers treat South Florida as a dollar-denominated second-home and diversification market. 437+ international agreements and 19-language syndication put prime listings in front of the European agents who represent that demand. Spanish luxury developers and agencies are served directly through the Spain Desk.",
  },
  {
    key: "northam",
    label: "North America",
    headline: "Relocation and second-home acquisition.",
    body: "U.S. and Canadian buyers relocating or acquiring second homes move through the network's 260+ syndicated U.S. MLSs and 11 MLS data exchanges with the largest U.S. and Canadian systems — reaching the agents who manage those moves.",
  },
  {
    key: "gulf",
    label: "Middle East & Asia",
    headline: "Dollar-asset acquisition.",
    body: "Private and institutional capital seeking U.S. dollar real estate assets reaches South Florida through 200+ global portals publishing in 19 languages — and through the agents who place that capital.",
  },
];

const SERVICE_LEVELS = [
  {
    num: "01",
    icon: Network,
    title: "MLS Positioning",
    body: "Eligible premium property placed formally through a licensed Florida principal of record — South Florida property into the core Southeast Florida MLS, the daily working ecosystem of the network's 93,000 member agents; international property into the MIAMI International MLS (RWorld) syndication platform, reaching the global agent and broker network. Monthly marketing engagement. Written confirmation of placement.",
  },
  {
    num: "02",
    icon: FileCheck,
    title: "Positioning + Network Outreach",
    body: "Everything in MLS Positioning, plus documented outreach campaigns that put the property directly in front of cooperating buyer agents across your target markets. Referral-commission incentives are extended to producing agents, with periodic written reporting on outreach activity.",
  },
  {
    num: "03",
    icon: BarChart3,
    title: "Managed Distribution",
    body: "A full-service mandate: MLS positioning, multi-market buyer-agent outreach and campaign management, a CRM-tracked buyer and agent pipeline, referral-fee and commission coordination through United Realty Group, and monthly written performance reporting.",
  },
];

// Verified figures only — every value resolves from src/data/figures.json via
// fig(), so the JSON is the single source of truth (no hard-coded stats in JSX).
// $69B is the Miami & South Florida REALTORS® network's combined 2025 member
// transaction volume — never Carlos's or United Realty Group's. See the
// attribution microcopy rendered beneath the stat strip.
const REACH_STATS = [
  { v: fig("networkVolume"),          l: "2025 Network Volume" },
  { v: fig("members"),                l: "Member Agents" },
  { v: fig("globalWebsites"),         l: "Global Portals" },
  { v: fig("languages"),              l: "Languages" },
  { v: fig("usMls"),                  l: "U.S. MLSs" },
  { v: fig("internationalAgreements"), l: "Intl. Agreements" },
];

export default function GlobalDeskPage() {
  const [activeMarket, setActiveMarket] = useState(0); // Latin America default
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Every primary CTA fires an analytics event tagged with the buyer-market tab
  // that is active when it is clicked, so intent can be segmented by region.
  const ctaEvent = (cta: string) =>
    trackFunnelEvent("global_desk_cta", {
      cta,
      buyer_market: BUYER_MARKETS[activeMarket].key,
    });
  // WhatsApp deep links additionally fire the standard Contact conversion.
  const waEvent = (location: string) => {
    trackContact("whatsapp", location);
    ctaEvent(location);
  };

  return (
    <>
      <Helmet>
        <title>Global Desk | Miami REALTORS® MLS Distribution for International Luxury Listings | Carlos Uzcategui</title>
        <meta
          name="description"
          content="The Global Desk places eligible premium property from Spain, Europe, and Latin America into the MIAMI International MLS (RWorld) syndication platform — and South Florida property into the core MLS of 93,000 member agents — through a licensed Florida principal of record. $69B network volume."
        />
        <link rel="canonical" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/spain-desk" />
        <meta property="og:title" content="Global Desk — Miami REALTORS® MLS Distribution for International Luxury Listings" />
        <meta
          property="og:description"
          content="Spanish, European, and Latin American prime property placed into the MIAMI International MLS (RWorld) international syndication platform through a licensed U.S. principal of record. A formal listing position, not a referral."
        />
        <meta property="og:url" content="https://homesprofessional.com/global-desk" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Global Desk — Miami REALTORS® MLS Distribution for International Luxury Listings" />
        <meta name="twitter:description" content="Spanish and international prime property placed into the MIAMI International MLS (RWorld) syndication platform by a licensed U.S. principal of record. A formal listing position, not a referral." />
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
          "description": "Carlos Uzcategui, licensed Florida principal of record through United Realty Group, places eligible premium property formally through the right vehicle for its location: South Florida property into the core Southeast Florida MLS, the daily working ecosystem of 93,000 member agents; Spanish and international property — including luxury developments and prime agency listings from Madrid, Marbella, and the Costa del Sol — into the MIAMI International MLS (RWorld) syndication platform, reaching the global agent and broker network in 100+ languages. Bilateral referral flow with affiliated Madrid agencies reaches European and Latin American buyers for South Florida property.",
          "areaServed": ["Spain", "Latin America", "Europe", "North America", "South Florida"],
          "url": "https://homesprofessional.com/global-desk",
        })}</script>
      </Helmet>
      <main className="min-h-screen bg-[#060D18] pb-20 lg:pb-0">
        <Navbar />

        {/* ── 3.1 Hero ── Mirrors the homepage Hero: centered column, layered
            grain/grid/vignette texture, pill eyebrow, gold-italic serif headline,
            scrolling network ticker, and an icon trust row. */}
        <section className="hero-root relative overflow-hidden bg-[#060D18] pt-28 pb-20 md:pt-36 md:pb-28 px-6 text-white">
          <style>{`
            .gd-hero-grain {
              position:absolute; inset:0; pointer-events:none; opacity:0.025;
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
              background-size: 180px;
            }
            .gd-hero-grid {
              position:absolute; inset:0; pointer-events:none;
              background-image:
                linear-gradient(rgba(176,141,87,0.03) 1px, transparent 1px),
                linear-gradient(90deg,rgba(176,141,87,0.03) 1px, transparent 1px);
              background-size:64px 64px;
              mask-image:radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%);
            }
            .gd-hero-vignette {
              position:absolute; bottom:0; left:0; right:0; height:220px; pointer-events:none;
              background:linear-gradient(to top, rgba(6,13,24,0.95) 0%, transparent 100%);
            }
            @keyframes gd-exposure-scroll {
              from { transform: translateX(0); }
              to   { transform: translateX(-50%); }
            }
            .gd-exposure-track {
              animation: gd-exposure-scroll 12s linear infinite;
              display: flex;
              will-change: transform;
            }
            .gd-exposure-track:hover { animation-play-state: paused; }
            @media (prefers-reduced-motion: reduce) {
              .gd-exposure-track { animation: none; }
            }
          `}</style>

          <LazyVideo
            src="/videos/dollhouse_global_reach.mp4"
            eager
            poster="/images/og-default.png"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.22]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060D18]/75 via-[#060D18]/60 to-[#060D18]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(22,68,158,0.30),transparent_70%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_70%,rgba(176,141,87,0.10),transparent_70%)]" />
          <div className="gd-hero-grain"    aria-hidden="true" />
          <div className="gd-hero-grid"     aria-hidden="true" />
          <div className="gd-hero-vignette" aria-hidden="true" />

          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
          >
            {/* Eyebrow pill */}
            <motion.div variants={heroItem}>
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.07] px-3 py-1.5 sm:px-3.5">
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.2em] text-gold">
                  <span className="sm:hidden">Miami REALTORS® MLS · Principal of Record</span>
                  <span className="hidden sm:inline">The Global Desk · Miami REALTORS® MLS · Licensed Principal of Record</span>
                </span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={heroItem}
              className="mt-6 font-serif leading-[1.05] text-white"
              style={{ fontSize: "clamp(2.1rem, 5.5vw, 4.5rem)", fontWeight: 400 }}
            >
              Give Premium Property the Reach of
              <br className="hidden md:block" aria-hidden="true" />{" "}
              <em className="italic text-gold">93,000 Miami Buyer Agents.</em>
            </motion.h1>
            {/* Alternate headlines for Carlos to choose from — all in the
                main hero's "...the Reach of..." voice:
                 A) "Premium Property, Backed by the Reach of the World's Largest Local Realtor® Association."
                 B) "Premium Property, in Front of Every Buyer Agent in the Miami Network." */}

            {/* Italic serif subtitle — matches the homepage hero cadence */}
            <motion.p
              variants={heroItem}
              className="mt-6 font-serif italic text-white/70"
              style={{ fontSize: "clamp(1rem, 2.2vw, 1.35rem)" }}
            >
              Your market is local — the buyers are global.
            </motion.p>

            {/* Supporting copy */}
            <motion.p
              variants={heroItem}
              className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/65 md:text-lg"
            >
              The world's most active buyers for prime real estate transact through the Miami
              REALTORS® network — the largest local REALTOR® association, with 93,000 member agents
              and $69 billion in combined 2025 transaction volume. The Global Desk places eligible
              property from any market formally inside it, through a licensed principal of record, so
              the network's agents can present it to their buyers. Not adjacent to the market. Inside
              it.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={heroItem}
              className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center"
            >
              <a
                href="/contact?desk=global"
                onClick={() => ctaEvent("hero_distribution_assessment")}
                className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep shadow-lg shadow-gold/25 transition-opacity hover:opacity-90"
              >
                Request a Distribution Assessment
                <ChevronRight size={14} />
              </a>
              <a
                href={WA_US}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => waEvent("hero_whatsapp_us")}
                className="inline-flex items-center gap-2 border border-white/25 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-gold/60 hover:text-white"
              >
                <MessageCircle size={13} />
                WhatsApp the Desk
              </a>
            </motion.div>

            {/* Network ticker — same scrolling marquee as the homepage hero */}
            <motion.div
              variants={heroItem}
              className="relative mt-9 w-full max-w-xl overflow-hidden border border-gold/20 bg-white/[0.03]"
            >
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-[#060D18] to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-[#060D18] to-transparent" />
              <div className="gd-exposure-track">
                {[0, 1].map((copy) => (
                  <span key={copy} className="flex shrink-0 items-center gap-2 pl-6 pr-12 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] whitespace-nowrap text-white/55">
                    <span className="text-gold">Network</span>{" "}·{" "}
                    <span className="text-white">{fig("networkVolume")}</span> 2025 Volume{" "}·{" "}
                    <span className="text-white">{fig("members")}</span> Member Agents{" "}·{" "}
                    <span className="text-white">{fig("globalWebsites")}</span> Global Portals{" "}·{" "}
                    <span className="text-white">{fig("languages")}</span> Languages{" "}·{" "}
                    <span className="text-white">{fig("usMls")}</span> U.S. MLSs{" "}·{" "}
                    <span className="text-white">{fig("internationalAgreements")}</span> Intl. Agreements
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Trust row */}
            <motion.div
              variants={heroItem}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
            >
              {[
                { icon: ShieldCheck, text: "Formal MLS Listing" },
                { icon: FileCheck,   text: "Documented Outreach" },
                { icon: BarChart3,   text: "Written Reporting" },
                { icon: Globe,       text: "Not a Referral" },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white/60">
                  <Icon size={12} className="text-gold flex-shrink-0" />
                  {text}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── 3.2 The Spain Desk — lead pillar (NAVY-DEEP panel) ── */}
        {/* AGENT NOTE: do not name any specific third-party agency or developer in public copy.
            Write to the partner profile only until a signed cooperation agreement and the firm's
            written consent are in place. */}
        <section className="relative overflow-hidden border-y-2 border-gold/40 bg-navy-deep py-20 md:py-28 px-6 text-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_15%_0%,rgba(201,168,76,0.10),transparent_70%)]" />
          <div className="relative mx-auto max-w-6xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold"
            >
              The Spain Desk · Madrid · Marbella · Costa del Sol
            </motion.p>

            {/* Institutional credibility strip — verified affiliations only (§9). */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.04 }}
              className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/55"
            >
              <span className="text-gold">{fig("clhms")}</span>
              <span className="text-gold/40">·</span>
              <span>MIAMI REALTORS® Global Council / RWorld</span>
              <span className="text-gold/40">·</span>
              <span>{fig("yearsLicensed")} Years Licensed ({fig("license")})</span>
              <span className="text-gold/40">·</span>
              <span>URG Brokerage of Record · §475</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="mt-5 max-w-4xl font-serif text-3xl leading-[1.15] md:text-5xl"
            >
              Spanish prime inventory,
              <br />
              <em className="italic text-gold">placed where its buyers' agents already work.</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mt-7 max-w-3xl font-sans text-lg leading-[1.85] text-white/70"
            >
              {/* Spanish prime-segment demand framing — prime-segment market data, 2025.
                  Internationals dominate; Americans are the fastest-growing and highest-spending
                  cohort; Latin American capital leads specifically in Madrid. */}
              Spanish prime demand is overwhelmingly international: roughly two-thirds of sales above
              €2.5M are to non-resident buyers. In Marbella and the Costa del Sol the leading
              nationalities are British, German, Dutch, and — increasingly — American, the
              fastest-growing and highest-spending cohort; Latin American capital leads specifically
              in Madrid. The U.S. and Latin American buyer agents who represent that demand already
              work through the MIAMI International MLS (RWorld) network. The Spain Desk places Spanish
              prime property there through a licensed Florida principal of record — reaching the
              highest-growth slice of international demand through the agents who hold those buyers.
            </motion.p>

            {/* Two audience blocks */}
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col border border-gold/25 bg-white/[0.04] p-8"
              >
                <div className="flex h-11 w-11 items-center justify-center border border-gold/30 bg-gold/8">
                  <Building2 size={18} className="text-gold" />
                </div>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                  For Developers
                </p>
                <h3 className="mt-2 font-serif text-2xl text-white">New-build and prime developments.</h3>
                <p className="mt-3 font-sans text-base leading-[1.8] text-white/70">
                  Place eligible units from a Spanish development into the MIAMI International MLS
                  (RWorld) syndication platform, where the international agent and broker network —
                  and the U.S. and Latin American buyer agents who hold the demand — can present them
                  in 100+ languages. Producing agents are extended referral-commission incentives to
                  bring qualified buyers. Carlos serves as the licensed Florida principal of record
                  under a written cooperation agreement — formal institutional exposure for a Spanish
                  development, not an advertising placement.
                </p>
                <a
                  href="#spain-intake"
                  onClick={() => ctaEvent("pillar_developer_brief")}
                  className="mt-7 inline-flex items-center gap-2 self-start bg-gold px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
                >
                  Request a Developer Distribution Brief
                  <ChevronRight size={13} />
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="flex flex-col border border-gold/25 bg-white/[0.04] p-8"
              >
                <div className="flex h-11 w-11 items-center justify-center border border-gold/30 bg-gold/8">
                  <Handshake size={18} className="text-gold" />
                </div>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                  For Agencies
                </p>
                <h3 className="mt-2 font-serif text-2xl text-white">Agency-to-agency cooperation.</h3>
                <p className="mt-3 font-sans text-base leading-[1.8] text-white/70">
                  Your prime listings gain MIAMI International MLS (RWorld) distribution while your
                  agency keeps the local mandate — showings, negotiation, and buyer qualification in
                  Spain remain yours. Carlos lists the property as the licensed U.S. principal of
                  record. The flow runs both ways: buyers relocating or investing from the Miami
                  network into Spain are routed to your agency, and South Florida sellers with Spanish
                  and Latin American buyer profiles reach your market through coordinated referral.
                </p>
                <a
                  href="#spain-intake"
                  onClick={() => ctaEvent("pillar_agency_proposal")}
                  className="mt-7 inline-flex items-center gap-2 self-start bg-gold px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
                >
                  Request an Agency Cooperation Proposal
                  <ChevronRight size={13} />
                </a>
              </motion.div>
            </div>

            {/* Legitimacy callout */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-10 flex flex-col items-start gap-4 border-y border-gold/40 py-7 sm:flex-row sm:items-center sm:gap-8"
            >
              <Landmark size={22} className="flex-shrink-0 text-gold" />
              <div className="flex flex-wrap gap-x-8 gap-y-2 font-serif text-lg text-white/90">
                <span>A licensed Florida principal of record.</span>
                <span>Written cooperation in both directions.</span>
                <span className="text-gold">No workaround.</span>
              </div>
            </motion.div>

            {/* Spain Desk CTAs */}
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="/contact?desk=spain-agency"
                onClick={() => ctaEvent("spain_agency_contact")}
                className="inline-flex items-center gap-2 border border-white/25 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-gold/60 hover:text-white"
              >
                Request an Agency Cooperation Proposal
                <ChevronRight size={13} />
              </a>
              <a
                href="/contact?desk=spain-developer"
                onClick={() => ctaEvent("spain_developer_contact")}
                className="inline-flex items-center gap-2 border border-white/25 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-gold/60 hover:text-white"
              >
                Request a Developer Distribution Brief
                <ChevronRight size={13} />
              </a>
              <a
                href={WA_MADRID}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => waEvent("spain_whatsapp_madrid")}
                className="inline-flex items-center gap-2 bg-gold px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
              >
                <MessageCircle size={13} />
                WhatsApp the Madrid Desk
              </a>
            </div>

            {/* On-page qualifying intake — a developer or agency can submit here
                without bouncing to /contact. Reuses the shared AgencyPartnerForm,
                tailored with the Spanish prime markets. */}
            <div id="spain-intake" className="mt-14 scroll-mt-24">
              <AgencyPartnerForm
                source="spain-desk-intake"
                eyebrow="Spain Desk · Distribution Assessment"
                heading="Submit a development, portfolio, or agency inquiry"
                intro="For Spanish developers, agencies, and prime owners. Tell Carlos the market, price band, and unit count — every submission is reviewed personally and treated as confidential."
                markets={["Madrid", "Marbella", "Costa del Sol", "Other"]}
              />
            </div>
          </div>
        </section>

        {/* ── 3.3 What the Global Desk does (IVORY) ── */}
        <section className="bg-ivory py-16 md:py-24 px-6 text-navy">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold-deep">
                  The Mechanism
                </p>
                <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-[1.18] md:text-4xl">
                  The reach isn't a portal. It's the agents who hold the buyers.
                </h2>
                <p className="mt-7 max-w-2xl font-sans text-lg leading-[1.85] text-navy/70">
                  For an owner, developer, or cooperating agency, the question is not whether a
                  listing is advertised — it is whether it sits inside the infrastructure the most
                  active buyers already work through. The Global Desk places eligible premium property
                  formally, with Carlos as the licensed Florida principal of record, through the
                  vehicle that fits the property: South Florida property enters the core Southeast
                  Florida MLS — the daily working ecosystem of the network's 93,000 member agents;
                  Spanish and international property is placed into the MIAMI International MLS (RWorld)
                  syndication platform, reaching the global agent and broker network in 100+
                  languages. Producing agents are extended referral-commission incentives to bring
                  qualified buyers. A formal listing position — not a referral passed to someone else.
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
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                    Any Market → SEFMLS or RWorld
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
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
                  <div className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-navy/55">{s.l}</div>
                </div>
              ))}
            </motion.div>

            {/* $69B attribution microcopy — required wherever network volume appears (§6). */}
            <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-navy/45">
              {fig("networkVolume")} — Miami &amp; South Florida REALTORS® combined member transaction volume, 2025
            </p>

            {/* United Realty Group — Carlos's brokerage of record. Approved figures only (§6).
                No unverifiable brokerage ranking ("#1", "Most Closed Homes") appears in public
                copy — none is independently substantiated; only defensible, attributed facts. */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-navy/55"
            >
              <span className="text-gold-deep">United Realty Group</span>
              <span className="text-gold/40">·</span>
              <span>Carlos's Brokerage of Record</span>
              <span className="text-gold/40">·</span>
              <span>{fig("urgAgents")} Agents</span>
              <span className="text-gold/40">·</span>
              <span>{fig("urgOffices")} Florida Offices</span>
            </motion.div>
          </div>
        </section>

        {/* ── 3.4 Where the demand comes from (region selector, WHITE) ── */}
        <section className="bg-white py-16 md:py-24 px-6 text-navy">
          <div className="mx-auto max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-deep"
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
                  className={`px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-all duration-300 ${
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
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold-deep">
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

        {/* ── 3.5 Two directions, one network (NAVY) ── */}
        <section className="border-t border-gold/15 bg-navy-deep py-16 md:py-24 px-6 text-white">
          <div className="mx-auto max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold"
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
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                  For owners outside the United States
                </p>
                <p className="mt-4 font-sans text-base leading-[1.85] text-white/70">
                  Carlos places eligible premium property into the MIAMI International MLS (RWorld)
                  syndication platform as the licensed Florida principal of record. The listing gains
                  formal U.S.-backed market position and reaches the international agent and broker
                  network in 100+ languages, who present it to their buyers — with referral-commission
                  incentives for producing agents. A formal listing position, not a referral handoff.
                </p>
                <a
                  href={WA_MADRID}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => waEvent("two_directions_whatsapp_madrid")}
                  className="mt-7 inline-flex items-center gap-2 self-start border border-white/25 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-gold/60 hover:text-white"
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
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
                  For South Florida owners with European or LATAM buyer profiles
                </p>
                <p className="mt-4 font-sans text-base leading-[1.85] text-white/65">
                  Carlos coordinates with affiliated Madrid agencies to put your South Florida listing
                  in front of the European and Latin American buyers — and the agents who represent
                  them — relocating and investing into Florida. The referral flow runs in both
                  directions.
                </p>
                <a
                  href="/sell-south-florida"
                  className="mt-7 inline-flex items-center gap-2 self-start border border-white/25 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/75 transition-colors hover:border-gold/60 hover:text-white"
                >
                  South Florida Seller Strategy
                  <ChevronRight size={13} />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 3.6 Service levels (IVORY) ── */}
        <section className="bg-ivory py-16 md:py-24 px-6 text-navy">
          <div className="mx-auto max-w-5xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-deep"
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
              Three levels of reach. One standard of placement.
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
                    <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-gold-deep">
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
                href="/contact?desk=global"
                onClick={() => ctaEvent("service_levels_distribution_assessment")}
                className="inline-flex items-center gap-2 bg-navy px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy-deep"
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
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Agencies · Developers · Family Offices</p>
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
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">Common Questions</p>
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
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold mb-6">International Seller Research</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <a href="/journal/international-owners-south-florida-mls-2026" className="block border border-hairline bg-ivory p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold/70 mb-3">International</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">International Property Owners and the South Florida MLS — How U.S. Market Activation Works</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the guide →</p>
              </a>
              <a href="/journal/seller-closing-costs-south-florida-2026" className="block border border-hairline bg-ivory p-6 hover:border-gold/40 transition-colors">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold/70 mb-3">Seller Strategy</p>
                <h3 className="font-serif text-lg text-navy-deep leading-snug">What Does It Cost to Sell a Home in South Florida — A Guide to Net Proceeds</h3>
                <p className="mt-2 font-sans text-sm text-ink-primary/55">Read the cost guide →</p>
              </a>
            </div>
          </div>
        </section>

        {/* ── 3.7 Closing CTA (IVORY) ── */}
        <section className="bg-ivory py-16 md:py-20 px-6 text-center text-navy">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif italic leading-tight text-navy" style={{ fontSize: "clamp(1.7rem, 3vw, 2.6rem)" }}>
              Put your property in front of the agents who hold the buyers.
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-navy/60">
              Begin with a distribution assessment: a written read on which buyer markets — and which
              of the network's 93,000 member agents — the reach connects to your property, and which
              service level fits the mandate.
            </p>
            <div className="mt-9 flex flex-col flex-wrap items-center justify-center gap-4 sm:flex-row">
              <a
                href="/contact?desk=global"
                onClick={() => ctaEvent("closing_distribution_assessment")}
                className="inline-flex items-center justify-center gap-2 bg-navy px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy-deep"
              >
                Request a Distribution Assessment
                <ChevronRight size={14} />
              </a>
              <a
                href={WA_US}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => waEvent("closing_whatsapp_us")}
                className="inline-flex items-center justify-center gap-2 border border-navy/25 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-navy/70 transition-colors hover:border-gold hover:text-gold-deep"
              >
                <MessageCircle size={13} />
                WhatsApp the Desk
              </a>
              <a
                href={WA_MADRID}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => waEvent("closing_whatsapp_madrid")}
                className="inline-flex items-center justify-center gap-2 border border-navy/25 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-navy/70 transition-colors hover:border-gold hover:text-gold-deep"
              >
                <MessageCircle size={13} />
                WhatsApp Madrid Desk
              </a>
            </div>
            {/* ── 3.8 Compliance footer ── */}
            <p className="mt-9 font-mono text-[11px] uppercase tracking-[0.2em] text-navy/35">
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
