import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { AuroraBackground } from "../components/AuroraBackground";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { MLSTicker } from "../components/MLSTicker";
import { BuyerMandateForm } from "../components/forms/BuyerMandateForm";
import {
  BadgeCheck,
  Download,
  Banknote,
  Sun,
  Globe2,
  HeartPulse,
  Landmark,
  Waves,
  GraduationCap,
  Plane,
  Trophy,
} from "lucide-react";
import { CONTACT, LEAD_MAGNETS, URG_CITIES } from "../constants";
import { LazyVideo } from "../components/LazyVideo";
import { NeoEmbed } from "../components/NeoEmbed";
import { Tilt3D } from "../components/Tilt3D";

// Florida buyer service — the primary track. Spain is a separate, second desk below.
const FL_SERVICES = [
  {
    number: "01",
    title: "Buyer consultation & search brief",
    desc: "A structured conversation about budget, neighborhoods, timeline, and financing — so every showing that follows is deliberate, not exploratory.",
  },
  {
    number: "02",
    title: "Professional MLS search — plus the network",
    desc: `Eligible inventory across Miami-Dade, Broward, and Palm Beach is reviewed through the applicable professional MLS and brokerage framework, supported by ${CONTACT.stats.urgAgents} United Realty Group agents.`,
  },
  {
    number: "03",
    title: "Neighborhood & market intelligence",
    desc: "Absorption, pricing history, HOA and condo health, insurance realities, school zones, and commute patterns — the context portals don't show.",
  },
  {
    number: "04",
    title: "Offer strategy & negotiation",
    desc: "Offer structure, escalation discipline, contingency strategy, and hands-on negotiation — informed by 25 years of closed South Florida transactions.",
  },
  {
    number: "05",
    title: "Financing coordination",
    desc: "Introductions to lenders for conventional, jumbo, and foreign-national programs — including buyers purchasing from abroad with international income or assets.",
  },
  {
    number: "06",
    title: "Inspection, escrow & closing",
    desc: "Inspection period management, repair negotiation, and coordination with the selected title, escrow, lending, and closing professionals.",
  },
];

// Condensed from "Top 20 Reasons to Buy & Live in Miami" — Miami and South
// Florida REALTORS® (MiamiRealtors.com). Keep claims attributed; no guarantees.
const WHY_FLORIDA = [
  {
    icon: Banknote,
    title: "No state income tax",
    desc: "Florida has no personal state income tax — a structural advantage for relocating professionals, retirees, and business owners.",
  },
  {
    icon: Sun,
    title: "A subtropical, year-round market",
    desc: "South Florida's climate supports permanent residents, seasonal owners, and international buyers across the calendar.",
  },
  {
    icon: Globe2,
    title: "An established international buyer ecosystem",
    desc: "Bilingual professional services, global transportation links, and long-established international communities support cross-border purchasers.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare and quality-of-life infrastructure",
    desc: "Major hospital systems, outdoor living, and year-round recreation are practical considerations for relocations and second-home purchases.",
  },
  {
    icon: Landmark,
    title: "Finance and business connectivity",
    desc: "Brickell and the wider South Florida business corridor support professionals, entrepreneurs, investors, and relocating companies.",
  },
  {
    icon: Waves,
    title: "Waterfront and coastal property choices",
    desc: "Oceanfront, bayfront, riverfront, and boating communities create distinct property types with different insurance, maintenance, and ownership considerations.",
  },
  {
    icon: GraduationCap,
    title: "Schools and university access",
    desc: "Public, private, and higher-education options shape neighborhood selection for families and long-term relocations.",
  },
  {
    icon: Plane,
    title: "Regional and international connectivity",
    desc: "International air service, major highways, seaports, and intercity rail connect South Florida with domestic and overseas markets.",
  },
  {
    icon: Trophy,
    title: "Culture, dining, and professional sports",
    desc: "Arts, culinary districts, major events, and professional sports give buyers a wide range of urban and lifestyle environments.",
  },
];

const COUNTY_ORDER = ["Broward County", "Miami-Dade County", "Palm Beach County"];

export default function BuyersPage() {
  return (
    <>
      <Helmet>
        <title>Buy in South Florida · 25 Years + a 3,500-Agent Network | HomesProfessional.com</title>
        <meta name="description" content="Buyer representation across Miami-Dade, Broward & Palm Beach — 25 years of experience backed by United Realty Group's 3,500+ agents and 20 Florida offices. Bilingual EN/ES. FL SL705771." />
        <meta name="keywords" content="buy home South Florida, Miami real estate buyer, United Realty Group buyer agent, Broward County homes, Miami-Dade real estate, relocation Florida, South Florida buyer agent, moving to Florida" />
        <link rel="canonical" href="https://homesprofessional.com/buy" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/buy" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/buy" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/comprar" />
        <meta property="og:title" content="Buy in South Florida | 25 Years + 3,500+ Agents Behind Every Purchase | Carlos Uzcategui" />
        <meta property="og:description" content="Buyer representation across Miami-Dade, Broward, and Palm Beach — backed by United Realty Group: 3,500+ agents, 20 Florida offices. Bilingual English/Spanish. FL SL705771." />
        <meta property="og:url" content="https://homesprofessional.com/buy" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Buy in South Florida | 25 Years + 3,500+ Agents Behind Every Purchase" />
        <meta name="twitter:description" content="Professional MLS search, negotiation, and closing coordination across Miami-Dade, Broward, and Palm Beach through United Realty Group." />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>
      <JsonLd id="buyers-service" data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "South Florida Buyer Representation",
          "provider": { "@id": "https://homesprofessional.com/#agent" },
          "serviceType": "Real Estate Buyer Representation",
          "description": "Buyer representation including professional MLS search, neighborhood analysis, offer strategy, and closing coordination across Miami-Dade, Broward, and Palm Beach counties — backed by United Realty Group's 3,500+ agents and 20 Florida offices.",
          "areaServed": "South Florida",
          "url": "https://homesprofessional.com/buy",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "description": "Free buyer consultation — no commitment required."
          }
        }} />
      <JsonLd id="buyers-faq" data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Do I need a buyer's agent in South Florida?", "acceptedAnswer": { "@type": "Answer", "text": "A buyer's agent provides professional property search, negotiation support, market analysis, and closing coordination. Carlos works through United Realty Group's brokerage framework and applicable MLS, platform, legal, and compliance requirements." } },
            { "@type": "Question", "name": "What does United Realty Group's size mean for me as a buyer?", "acceptedAnswer": { "@type": "Answer", "text": "United Realty Group has 3,500+ agents across 20 Florida offices. For a buyer, that supports local coordination and buyer-agent cooperation across South Florida, subject to brokerage, platform, and compliance requirements." } },
            { "@type": "Question", "name": "Can I buy a home in South Florida from abroad?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. We specialize in serving international buyers, particularly from Spain and Latin America. Bilingual English/Spanish representation, foreign-national financing introductions, and remote transaction management are available." } },
            { "@type": "Question", "name": "What is the buying process in Miami?", "acceptedAnswer": { "@type": "Answer", "text": "The process includes buyer consultation, professional property search, offer submission, inspection, financing coordination, title review, and closing. Timing depends on the contract, financing, property, and parties involved." } }
          ]
        }} />
      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-20 lg:pb-0">
        <Navbar />

        {/* ── Hero — 25 years + the network behind it ─────────────── */}
        <section className="relative overflow-hidden bg-navy-deep px-6 py-16 md:py-20 text-center sm:px-10">
          <LazyVideo
            src="/videos/south_florida_showcase.mp4"
            idle
            className="absolute inset-0 h-full w-full object-cover opacity-[0.32]"
          />
          <AuroraBackground interactive />
          {/* Readability scrim stays the topmost background layer — the aurora
              must never wash out the headline. */}
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/60 via-navy-deep/40 to-navy-deep/80 pointer-events-none" />
          <div className="relative z-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">South Florida Buyer Representation</p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif leading-tight text-white" style={{ fontSize: "clamp(1.9rem, 5.5vw, 3rem)" }}>
            25 years of South Florida transactions —<br />
            <em className="italic text-gold">and {CONTACT.stats.urgAgents} agents behind every purchase.</em>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/55">
            Direct buyer representation across Miami-Dade, Broward, and Palm Beach — in English or Spanish —
            through United Realty Group's professional Florida brokerage framework, with {CONTACT.stats.urgAgents} agents
            and {CONTACT.stats.urgOffices} Florida offices.
          </p>
          {/* Scale strip — the strength story in four figures */}
          <Tilt3D className="mx-auto mt-8 max-w-3xl">
            <div className="grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
              {[
                { value: `${CONTACT.stats.experience} yrs`, label: "Licensed since 2001" },
                { value: CONTACT.stats.urgAgents, label: "URG agents statewide" },
                { value: CONTACT.stats.urgOffices, label: "Florida offices" },
                { value: "EN / ES", label: "Bilingual coordination" },
              ].map((s) => (
                <div key={s.label} className="bg-navy-deep/80 px-4 py-4">
                  <p className="font-serif text-2xl text-gold">{s.value}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </Tilt3D>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact"
              className="hero-cta-main inline-flex items-center gap-2 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep"
            >
              Request a Buyer Consultation
            </a>
            <a
              href={CONTACT.whatsappUS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/20 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-gold/50 hover:text-white"
            >
              WhatsApp Carlos
            </a>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2">
            <a
              href={LEAD_MAGNETS.buyerBrief.url}
              download
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold/70 underline-offset-2 hover:text-gold hover:underline"
            >
              <Download size={11} />
              Download Miami Buyer Brief Q3 2026
            </a>
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
            United Realty Group · CLHMS · FL SL705771 · Buyer representation across Miami-Dade, Broward &amp; Palm Beach
          </p>
          </div>
        </section>

        {/* Active market bridge — Miami-Dade & Broward ~$1M listings */}
        <MLSTicker />

        {/* ── The network behind your purchase — URG ──────────────── */}
        <section className="bg-white py-16 md:py-24 border-t border-hairline">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">The Network Behind Your Purchase</p>
                <h2 className="mt-5 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                  One agent negotiates for you.<br />
                  <span className="italic text-gold-ink font-light">{CONTACT.stats.urgAgents} stand behind him.</span>
                </h2>
                <p className="mt-5 font-sans text-[15px] leading-relaxed text-ink-primary/65">
                  Carlos represents buyers through United Realty Group's professional Florida brokerage framework:
                  {" "}{CONTACT.stats.urgAgents} agents and {CONTACT.stats.urgOffices} Florida offices. That scale supports
                  local coordination across Miami-Dade, Broward, and Palm Beach while Carlos remains the accountable buyer representative.
                </p>
                <p className="mt-4 font-sans text-[15px] leading-relaxed text-ink-primary/65">
                  For a buyer, scale supports coordinated local market review and professional cooperation
                  across South Florida. Carlos remains the accountable representative for search strategy,
                  property analysis, offer preparation, and transaction coordination.
                </p>
                <ul className="mt-7 space-y-3">
                  {[
                    `${CONTACT.stats.urgAgents} licensed agents across ${CONTACT.stats.urgOffices} Florida offices`,
                    "Deep office coverage of Broward & Miami-Dade — Plantation HQ, Weston, Pembroke Pines, Kendall, Hialeah, Aventura, Fort Lauderdale & more",
                    "Eligible MLS search and buyer-agent coordination",
                    "Bilingual English / Spanish representation",
                    "Professional brokerage and compliance framework",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                      <span className="font-sans text-[14px] leading-snug text-ink-primary/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Local market proof and URG team video */}
              <div className="space-y-px overflow-hidden border border-hairline bg-hairline shadow-xl shadow-navy/10">
                <figure className="bg-navy-deep">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src="/images/carlos-miami-river.webp"
                      alt="Carlos Uzcategui at a Miami waterfront property"
                      width={1920}
                      height={1081}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-[center_42%]"
                    />
                  </div>
                  <figcaption className="bg-navy-deep px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                    Carlos Uzcategui · Local property review · Miami waterfront
                  </figcaption>
                </figure>
                <div className="bg-navy-deep">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src="https://www.youtube.com/embed/M8Hx5D5ghag?si=XAE-_zpkAJCVf_Yp&rel=0&modestbranding=1"
                    title="United Realty Group — the team behind every South Florida purchase"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>
                <div className="bg-navy-deep px-5 py-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">United Realty Group · The Team</p>
                  <p className="font-mono mt-0.5 text-[10px] uppercase tracking-[0.15em] text-white/70">
                    {CONTACT.stats.urgAgents} agents · {CONTACT.stats.urgOffices} Florida offices
                  </p>
                </div>
                </div>
              </div>
            </div>

            {/* County coverage — regional URG presence */}
            <div className="mt-14 border-t border-hairline pt-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">Coverage · Broward · Miami-Dade · Palm Beach</p>
              <div className="mt-6 grid gap-8 md:grid-cols-3">
                {COUNTY_ORDER.map((county) => (
                  <div key={county}>
                    <h3 className="font-serif text-lg text-navy-deep">{county}</h3>
                    <p className="mt-2 font-sans text-[13px] leading-relaxed text-ink-primary/60">
                      {URG_CITIES.filter((c) => c.region === county).map((c) => c.city).join(" · ")}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-sans text-xs italic text-ink-primary/70">
                All representation is through Florida License SL705771 and United Realty Group. MLS search and related
                activity are subject to brokerage, platform, legal, and compliance requirements.
              </p>
            </div>
          </div>
        </section>

        {/* ── Buying in Florida — the complete service ────────────── */}
        <section className="bg-bone-warm py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 max-w-2xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">Service One · Buying in Florida</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                The complete Florida buyer service.
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-ink-primary/60">
                Direct, licensed representation from first conversation to closing day — one accountable
                professional, with the resources of a statewide brokerage behind every step.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
              {FL_SERVICES.map((s) => (
                <div
                  key={s.number}
                  className="relative overflow-hidden border border-bone bg-white p-6 transition-colors duration-500 hover:border-gold/40"
                >
                  <div className="absolute top-4 right-4 select-none font-serif text-6xl font-bold leading-none text-navy/5">
                    {s.number}
                  </div>
                  <h3 className="max-w-[85%] font-serif text-xl text-navy-deep">{s.title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/65">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Florida — relocation case ───────────────────────── */}
        <section className="relative overflow-hidden bg-navy-deep py-16 md:py-24">
          <AuroraBackground variant="subtle" />
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <div className="mb-10 max-w-2xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Moving to Florida</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
                Why buyers keep choosing South Florida.
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-white/55">
                Relocation is the largest decision most buyers make. These are the fundamentals that
                keep pulling people — and capital — to Miami-Dade and Broward.
              </p>
            </div>
            <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {WHY_FLORIDA.map((r) => (
                <div key={r.title} className="bg-navy-deep/90 p-6">
                  <r.icon size={20} className="text-gold" />
                  <h3 className="mt-4 font-serif text-lg leading-snug text-white">{r.title}</h3>
                  <p className="mt-2 font-sans text-[13px] leading-relaxed text-white/55">{r.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
              Source: Miami and South Florida REALTORS® — "Top 20 Reasons to Buy &amp; Live in Miami" (MiamiRealtors.com)
            </p>
          </div>
        </section>

        {/* ── New Construction Feed ──────────────────────────── */}
        <section className="bg-white py-12 md:py-16 border-t border-hairline">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">New Construction · South Florida</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                Pre-construction inventory — live feed.
              </h2>
              <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-ink-primary/60">
                New-development projects across South Florida, accessed through the NEO platform. Carlos provides
                advisory representation for buyers navigating deposit structures, delivery timelines, and developer terms.
              </p>
              <a
                href="/new-construction"
                className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink transition-colors hover:text-gold"
              >
                Full pre-construction advisory →
              </a>
            </div>
            <div className="w-full overflow-hidden">
              <NeoEmbed lang="en" />
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-primary/70 text-center">
              Live pre-construction inventory via NEO · newestateonly.com · Subject to change without notice. Not a guarantee of availability or pricing.
            </p>
          </div>
        </section>

        {/* ── Service Two — Buying in Spain (separate desk) ───────── */}
        <section className="bg-bone-warm py-16 md:py-20 border-t border-hairline">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">Service Two · Buying in Spain</p>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                  Buying in Spain — a separate, referral-based service.
                </h2>
                <p className="mt-4 font-sans text-base leading-relaxed text-ink-primary/60">
                  Spain works differently, and it is handled differently. Carlos is licensed in Florida —
                  not in Spain — so for Spanish purchases he acts as your introduction point: connecting
                  you with trusted, vetted local professionals in Madrid and beyond through formal
                  referral relationships, with clarity before every introduction and transparency throughout.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Introductions to established local agencies and legal professionals in Spain",
                    "Bilingual coordination in English and Spanish from first call to referral",
                    "One familiar point of contact while local experts handle the Spanish transaction",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                      <span className="font-sans text-[14px] leading-snug text-ink-primary/70">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-navy-deep px-7 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90"
                  >
                    Request a Spain Buyer Introduction →
                  </a>
                  <a
                    href={CONTACT.whatsappSpain}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-navy/20 px-7 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-colors hover:border-navy/50"
                  >
                    WhatsApp · Spain Line
                  </a>
                </div>
              </div>
              <div className="border border-bone bg-white p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">How the two services differ</p>
                <div className="mt-5 space-y-5">
                  <div>
                    <h3 className="font-serif text-lg text-navy-deep">Florida — direct representation</h3>
                    <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-ink-primary/60">
                      Licensed buyer representation (FL SL705771) with professional MLS search, negotiation, and
                      closing coordination through United Realty Group and applicable platform requirements.
                    </p>
                  </div>
                  <div className="border-t border-bone pt-5">
                    <h3 className="font-serif text-lg text-navy-deep">Spain — professional introductions</h3>
                    <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-ink-primary/60">
                      Formal referral relationships with local professionals who are licensed and
                      established in the Spanish market. Carlos coordinates; local experts execute.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Buyer mandate form ──────────────────────────────────── */}
        <section className="relative overflow-hidden bg-navy-deep py-14 md:py-20">
          <AuroraBackground variant="subtle" />
          <div className="relative z-10 mx-auto max-w-5xl px-6">
            <div className="mb-8 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Confidential Buyer Desk</p>
              <h2 className="mt-3 font-serif text-3xl text-white">Ready to start your search?</h2>
            </div>
            <BuyerMandateForm />
            <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
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
