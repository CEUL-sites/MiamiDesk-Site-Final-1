import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AssociationFilms } from "../components/AssociationFilms";
import "../components/agent-partner-hero.css";
import { JsonLd } from "../components/SEO/JsonLd";
import {
  BadgeCheck,
  ChevronRight,
  MessageSquare,
  Globe2,
  Languages,
  Building2,
  Handshake,
  UserPlus,
  BookOpen,
  Star,
  Users,
  CheckCircle2,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LazyVideo } from "../components/LazyVideo";
import { FaqAccordion, type FaqItem } from "../components/FaqAccordion";
import { AgencyPartnerForm } from "../components/forms/AgencyPartnerForm";
import { ReferralIntakeForm } from "../components/forms/ReferralIntakeForm";
import { GilmarGlobalDeskSection } from "../components/GilmarGlobalDeskSection";
import { Tilt3D } from "../components/Tilt3D";
import { CONTACT } from "../constants";

const SERVICES = [
  {
    group: "exposure",
    title: "Miami-Facing Listing Review",
    body: "Selected properties reviewed for positioning fit, buyer profile alignment, and international presentation suitability across South Florida channels.",
  },
  {
    group: "exposure",
    title: "Bilingual Property Positioning",
    body: "English and Spanish property narrative development tailored specifically for U.S. and Latin American cooperating buyer agents.",
  },
  {
    group: "exposure",
    title: "South Florida Agent-Network Reach",
    body: "Visibility within the 93,000-member Miami and South Florida REALTORS® ecosystem — the world's largest local REALTOR® association.",
  },
  {
    group: "exposure",
    title: "U.S. and LATAM Buyer Channels",
    body: "Structured exposure to Florida-based buyer agents representing qualified domestic, Latin American, and international capital.",
  },
  {
    group: "protection",
    title: "Professional Listing Packaging",
    body: "Dedicated property landing presentation designed for cooperating buyer-agent discovery and review, far beyond standard portal links.",
  },
  {
    group: "protection",
    title: "Referral Inquiry Coordination",
    body: "Every buyer inquiry or referral opportunity is coordinated through formal, documented professional channels with transparent terms.",
  },
  {
    group: "protection",
    title: "Bilateral Co-Listing Architecture",
    body: "Formal cooperation structure where the local agent retains the seller mandate while Carlos serves as the Florida licensee of record.",
  },
  {
    group: "protection",
    title: "Documented Fee Protection",
    body: "All referral compensation and co-broker terms are executed under formal written agreements prior to client engagement and paid at closing.",
  },
] as const;

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Submit Listing or Referral",
    body: "Submit property details, portfolio overview, or client referral using the intake desk below. Carlos reviews every submission personally.",
  },
  {
    number: "02",
    title: "Miami Desk Fit Review",
    body: "Carlos evaluates positioning suitability, buyer profile alignment, referral structure, and the most effective collaboration protocol.",
  },
  {
    number: "03",
    title: "Written Terms & Packaging",
    body: "Scope, documentation, and referral compensation are agreed in writing before activation. Approved listings are packaged for Miami-facing exposure.",
  },
  {
    number: "04",
    title: "Execution & Inquiries",
    body: "Buyer inquiries, cooperating agent introductions, and transaction milestones are coordinated directly with you throughout closing.",
  },
] as const;

const BILATERAL_ROLES = [
  {
    id: "local",
    tag: "Role 01 · Local Agent",
    title: "Retains Full Authority",
    subtitle: "Mandate · Client · Fee",
    points: [
      "The seller relationship and local authority",
      "The local listing mandate and exclusivity",
      "Direct client advisory and on-the-ground showings",
      "Local fee and agreed transaction commission",
    ],
  },
  {
    id: "miami",
    tag: "Role 02 · Miami Desk",
    title: "U.S. & LATAM Exposure",
    subtitle: "Florida License SL705771",
    points: [
      "Miami MLS & 93,000-member agent ecosystem",
      "Bilingual English / Spanish property packaging",
      "U.S. and Latin American buyer-channel reach",
      "Structured referral inquiry and tour coordination",
    ],
  },
  {
    id: "governance",
    tag: "Role 03 · Governance",
    title: "Written Legal Protection",
    subtitle: "Compliance & Terms",
    points: [
      "Written bilateral cooperation agreement",
      "Documented referral structure before engagement",
      "Transparent scope, milestones, and fees",
      "Full compliance with applicable real estate licensing",
    ],
  },
] as const;

const AGENTS_FAQS: FaqItem[] = [
  {
    q: "Does the local agent keep the client relationship?",
    a: "Yes. The local agent retains the seller mandate, the client relationship, and all local market authority. The Miami Desk supports only the international exposure layer. Any buyer inquiry or referral is coordinated back through the local agent.",
  },
  {
    q: "What markets does the Miami Desk serve for international agents?",
    a: "Spain (Madrid, Marbella, Costa del Sol, Barcelona, Mallorca, Ibiza), Latin America, and other international markets. Properties are reviewed individually for positioning suitability and buyer profile alignment.",
  },
  {
    q: "What is the Miami and South Florida REALTORS® network?",
    a: "Miami and South Florida REALTORS® is the world's largest local REALTOR® association, with 93,000 member agents and listing syndication reaching 260+ U.S. MLSs via the RPR data exchange. It has over 437 signed international agreements, providing a professional referral infrastructure across 75+ countries.",
  },
];

const WA_CAREERS =
  "https://wa.me/19548656622?text=" +
  encodeURIComponent(
    "Hi Carlos, I'm a real estate agent (or getting licensed) and I'd like to learn about building my career with you at United Realty Group.",
  );

export default function AgentsPage() {
  const [activeTab, setActiveTab] = useState<"referral" | "listing">("referral");
  const [activeRole, setActiveRole] = useState(0);
  const [serviceGroup, setServiceGroup] = useState<"exposure" | "protection">("exposure");
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [careerTrack, setCareerTrack] = useState<"new" | "experienced">("new");

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#submit-listing") {
        setActiveTab("listing");
      } else if (hash === "#south-florida-referral") {
        setActiveTab("referral");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const currentRole = BILATERAL_ROLES[activeRole];
  const currentStep = PROCESS_STEPS[activeProcessStep];

  return (
    <>
      <Helmet>
        <title>For Real Estate Agents | Referrals, Miami Exposure &amp; Careers</title>
        <meta
          name="description"
          content="Three ways agents work with Carlos: refer a buyer or seller for a fee at closing, add Miami-facing exposure to a listing, or join URG with 25-year mentorship."
        />
        <link rel="canonical" href="https://homesprofessional.com/agents" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/agents" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/agents" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/agentes" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/agents" />
        <meta property="og:title" content="Win More Seller Mandates With a South Florida Exposure Strategy" />
        <meta
          property="og:description"
          content="Give your agency a listing-presentation advantage local competitors cannot match: documented South Florida-facing exposure for your sellers, where eligible. You keep the mandate."
        />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>

      <JsonLd
        id="agents-service"
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Miami Desk — International Listing Exposure & Agent Referral",
          provider: { "@id": "https://homesprofessional.com/#agent" },
          serviceType: "International Real Estate Listing Exposure & Referral",
          description:
            "A Miami-facing exposure and referral coordination service for international real estate agents, agencies, and developers seeking access to the South Florida real estate network and U.S. buyer channels.",
          areaServed: ["South Florida", "Spain", "Latin America", "Europe"],
          url: "https://homesprofessional.com/agents",
          availableLanguage: ["English", "Spanish"],
        }}
      />

      <JsonLd
        id="agents-faq"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: AGENTS_FAQS.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }}
      />

      <JsonLd
        id="agents-breadcrumbs"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://homesprofessional.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Agents & Referrals",
              item: "https://homesprofessional.com/agents",
            },
          ],
        }}
      />

      <main id="main-content" className="min-h-screen bg-white-soft grain-overlay pb-28 lg:pb-0">
        <Navbar />

        {/* ── SECTION 1: Agent Partner Hero ────────────────────────── */}
        <section className="agent-partner-hero" aria-labelledby="agent-partner-heading">
          <picture className="agent-partner-art" aria-hidden="true">
            <source media="(max-width: 767px)" srcSet="/images/global-desk-panorama-mobile.webp" />
            <img
              src="/images/global-desk-panorama-desktop.webp"
              alt=""
              width="1920"
              height="800"
              fetchPriority="high"
            />
          </picture>
          <div className="agent-partner-layout">
            <div className="agent-partner-copy">
              <p className="agent-partner-eyebrow">Agents · Referrals · International Cooperation</p>
              <h1 id="agent-partner-heading">
                Your clients.<span>A connected South Florida partner.</span>
              </h1>
              <p className="agent-partner-summary">
                Refer a client, discuss selected international inventory, or explore a career with United Realty Group.
                Carlos coordinates the next step personally.
              </p>
              <div className="agent-partner-actions" data-sticky-cta-guard>
                <a href="#choose-path" className="agent-partner-primary">
                  Choose Your Professional Path
                  <ChevronRight size={16} aria-hidden="true" />
                </a>
                <a href="#gilmar-global-desk" className="agent-partner-secondary">
                  GILMAR Spain 4% Desk
                </a>
                <a
                  href={CONTACT.whatsappBroker}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="agent-partner-secondary"
                >
                  <MessageSquare size={16} aria-hidden="true" />
                  Message Carlos Directly
                </a>
              </div>
              <p className="agent-partner-credentials">
                Carlos Uzcategui · Licensed since 2001 · United Realty Group · English / Español
              </p>
            </div>
            <div className="agent-partner-film" data-sticky-cta-guard>
              <AssociationFilms location="agents_hero" variant="feature" />
            </div>
          </div>
          <p className="agent-partner-caption">Conceptual architecture · Not a property listing</p>
        </section>

        {/* ── Institutional Proof Strip ────────────────────────────── */}
        <div className="border-b border-hairline bg-white">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-hairline border-x border-hairline md:grid-cols-4">
            {[
              { icon: Globe2, value: "93,000", label: "MIAMI REALTORS® member agents" },
              { icon: Handshake, value: "437+", label: "International agreements · 75+ countries" },
              { icon: Languages, value: "19", label: "Languages · 200+ global portals" },
              { icon: Building2, value: "25 yrs", label: "Florida licensed · bilingual" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center px-4 py-5 text-center md:py-7">
                <s.icon size={18} className="text-gold" strokeWidth={1.5} />
                <span className="mt-3 font-serif text-2xl text-navy-deep md:text-3xl">{s.value}</span>
                <span className="mt-1.5 font-mono text-[10px] uppercase leading-snug tracking-[0.16em] text-navy/70">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 2: Choose Your Path ──────────────────────────── */}
        <section className="scroll-mt-24 bg-white py-12 md:py-16" id="choose-path">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8 text-center md:mb-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">How Agents Work With Carlos</p>
              <h2 className="mx-auto mt-3 max-w-3xl font-serif text-2xl leading-tight text-navy-deep md:text-4xl">
                One desk. Three ways to win.
              </h2>
              <p className="mx-auto mt-2 max-w-xl font-sans text-sm leading-relaxed text-ink-primary/65">
                Structured, documented broker cooperation with a direct response from Carlos.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: Handshake,
                  tag: "Path 01 · Referrals",
                  title: "Refer a buyer or seller",
                  body: "Send a South Florida or cross-border client referral under a formal written agreement and get paid at closing.",
                  points: [
                    "Both directions — buyers and sellers",
                    "Local + cross-border coordination",
                    "Documented fee protection at closing",
                  ],
                  cta: "Submit a referral",
                  href: "#south-florida-referral",
                  onClick: () => setActiveTab("referral"),
                },
                {
                  icon: Globe2,
                  tag: "Path 02 · Exposure",
                  title: "Give a listing international reach",
                  body: "Add bilingual South Florida MLS and U.S./LATAM buyer-agent exposure to eligible prime inventory while keeping your local mandate.",
                  points: [
                    "You keep the mandate & client",
                    "93,000-member association ecosystem",
                    "Bilingual U.S. and LATAM buyer channels",
                  ],
                  cta: "Submit a listing",
                  href: "#submit-listing",
                  onClick: () => setActiveTab("listing"),
                },
                {
                  icon: UserPlus,
                  tag: "Path 03 · Careers",
                  title: "Join URG or get mentored",
                  body: "Build your business alongside an active 25-year Florida licensee running live seller, buyer, and cross-border desks.",
                  points: [
                    "New agents — build a clear pipeline",
                    "Switching from another brokerage",
                    "Direct mentorship from an active producer",
                  ],
                  cta: "Explore joining",
                  href: "#join-urg",
                  onClick: undefined,
                },
              ].map((p) => (
                <Tilt3D key={p.title} maxTilt={4} className="h-full">
                  <div className="flex h-full flex-col justify-between rounded-xl border border-hairline bg-white p-6 transition-all duration-300 hover:border-gold hover:shadow-lg">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-ink font-semibold">
                          {p.tag}
                        </span>
                        <p.icon size={20} className="text-gold" strokeWidth={1.5} />
                      </div>
                      <h3 className="mt-3 font-serif text-xl leading-snug text-navy-deep">{p.title}</h3>
                      <p className="mt-2 font-sans text-xs leading-relaxed text-ink-primary/70">{p.body}</p>
                      <ul className="mt-4 space-y-2">
                        {p.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2">
                            <BadgeCheck size={14} className="mt-0.5 flex-shrink-0 text-gold" />
                            <span className="font-sans text-xs leading-snug text-ink-primary/80">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href={p.href}
                      onClick={p.onClick}
                      className="group mt-6 inline-flex items-center gap-1.5 self-start border-b border-gold pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-navy-deep transition-colors hover:text-gold"
                    >
                      {p.cta}
                      <ChevronRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </Tilt3D>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: Interactive Bilateral Architecture, Deliverables & 4-Step Stepper ─ */}
        <section className="bg-ivory py-14 md:py-20 border-t border-hairline">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end mb-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink font-semibold">
                  Bilateral Architecture · Cross-Border Protocol
                </p>
                <h2 className="mt-2 font-serif text-2xl leading-tight text-navy-deep md:text-4xl">
                  You keep the mandate. We support the international layer.
                </h2>
              </div>
              <p className="max-w-md font-sans text-sm leading-relaxed text-ink-primary/70">
                Select any role or sequence step below to inspect how mandates, fees, and buyer introductions are governed.
              </p>
            </div>

            {/* Interactive 2-Column Command Deck: Role Switcher (Left) + 4-Step Sequence Stepper (Right) */}
            <div className="grid gap-6 lg:grid-cols-12 mb-10">
              {/* Left: Interactive 3-Role Switcher (6 cols) */}
              <div className="flex flex-col justify-between rounded-xl border border-bone bg-white p-6 shadow-sm lg:col-span-6">
                <div>
                  <div className="grid grid-cols-3 gap-2" role="tablist" aria-label="Bilateral roles">
                    {BILATERAL_ROLES.map((r, idx) => {
                      const selected = activeRole === idx;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          role="tab"
                          aria-selected={selected}
                          onClick={() => setActiveRole(idx)}
                          className={`rounded-lg border px-3 py-2.5 text-left transition-all ${
                            selected
                              ? "border-gold bg-navy-deep text-white shadow"
                              : "border-bone bg-ivory/60 text-navy-deep hover:border-gold/60"
                          }`}
                        >
                          <span className={`block font-mono text-[9px] uppercase tracking-[0.14em] ${selected ? "text-gold" : "text-gold-ink"}`}>
                            0{idx + 1}
                          </span>
                          <span className="mt-0.5 block truncate font-serif text-sm">
                            {r.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 rounded-xl bg-navy-deep p-5 text-white">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">
                          {currentRole.tag}
                        </span>
                        <h3 className="mt-0.5 font-serif text-xl text-white">{currentRole.title}</h3>
                      </div>
                      <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-gold">
                        {currentRole.subtitle}
                      </span>
                    </div>
                    <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                      {currentRole.points.map((item) => (
                        <li key={item} className="flex items-start gap-2 rounded border border-white/10 bg-white/[0.03] p-2.5">
                          <BadgeCheck size={14} className="mt-0.5 flex-shrink-0 text-gold" />
                          <span className="font-sans text-xs leading-snug text-white/85">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right: Interactive 4-Step Sequence Stepper (6 cols) */}
              <div className="flex flex-col justify-between rounded-xl border border-bone bg-white p-6 shadow-sm lg:col-span-6">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-ink font-semibold">
                      Four Steps · No Ambiguity
                    </p>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-navy/60">
                      Step {currentStep.number} of 04
                    </span>
                  </div>

                  <div className="mt-3 grid grid-cols-4 gap-2" role="tablist" aria-label="Collaboration sequence">
                    {PROCESS_STEPS.map((s, idx) => {
                      const selected = activeProcessStep === idx;
                      return (
                        <button
                          key={s.number}
                          type="button"
                          role="tab"
                          aria-selected={selected}
                          onClick={() => setActiveProcessStep(idx)}
                          className={`rounded-lg border p-2.5 text-center transition-all ${
                            selected
                              ? "border-gold bg-gold text-navy-deep font-bold shadow"
                              : "border-bone bg-ivory/60 text-navy-deep hover:border-gold/60"
                          }`}
                        >
                          <span className="block font-mono text-xs">{s.number}</span>
                          <span className="mt-0.5 block truncate font-sans text-[10px]">
                            {s.title.split(" ")[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 rounded-xl border border-gold/30 bg-ivory p-5">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-ink">
                      Step {currentStep.number}
                    </span>
                    <h4 className="mt-1 font-serif text-xl text-navy-deep">{currentStep.title}</h4>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-ink-primary/80">
                      {currentStep.body}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-hairline pt-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-navy/65">
                    Written terms before client contact
                  </span>
                  <a
                    href="#south-florida-referral"
                    className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-gold-ink hover:underline"
                  >
                    Open Intake Desk ↓
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive 2-Category Deliverables Filter (Replaces 8-Card Wall) */}
            <div className="mb-10">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold-ink font-semibold">
                    Core Deliverables
                  </p>
                  <h3 className="mt-1 font-serif text-2xl text-navy-deep">What the Miami Desk Provides</h3>
                </div>
                <div className="inline-flex rounded-lg border border-bone bg-white p-1" role="tablist" aria-label="Deliverable categories">
                  {[
                    { id: "exposure", label: "01 · Exposure & Positioning (4)" },
                    { id: "protection", label: "02 · Co-Listing & Fee Protection (4)" },
                  ].map((tab) => {
                    const selected = serviceGroup === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setServiceGroup(tab.id as "exposure" | "protection")}
                        className={`rounded-md px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-all ${
                          selected
                            ? "bg-navy-deep text-gold font-bold"
                            : "text-navy/70 hover:text-navy-deep"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {SERVICES.map((s) => {
                  const visible = s.group === serviceGroup;
                  return (
                    <div
                      key={s.title}
                      hidden={!visible}
                      className="rounded-xl border border-bone bg-white p-5 shadow-sm"
                    >
                      <CheckCircle2 size={16} className="text-gold" />
                      <h4 className="mt-3 font-serif text-base font-medium text-navy-deep">{s.title}</h4>
                      <p className="mt-1.5 font-sans text-xs leading-relaxed text-ink-primary/70">{s.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pull Quote */}
            <div className="rounded-xl border border-gold/30 bg-navy-deep p-6 text-center md:p-8 text-white">
              <blockquote className="mx-auto max-w-3xl font-serif text-xl leading-relaxed text-white md:text-2xl">
                &ldquo;The internet creates visibility. <span className="text-gold">Agent networks create movement.</span> A
                listing is not fully marketed until buyer agents know how to present it.&rdquo;
              </blockquote>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
                Carlos Uzcategui, REALTOR® · Florida License SL705771 · United Realty Group
              </p>
            </div>
          </div>
        </section>

        {/* ── GILMAR × United Realty Group 4% Buyer-Agent Co-Brokering Showcase ── */}
        <GilmarGlobalDeskSection variant="agents" />

        {/* ── SECTION 4: Unified Partner & Referral Intake Desk ─────── */}
        <section className="bg-navy-deep py-12 md:py-18 text-white">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center mb-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Professional Collaboration</p>
              <h2 className="mt-3 font-serif text-3xl text-white md:text-4xl">Partner &amp; Referral Intake Desk</h2>
              <p className="mx-auto mt-3 max-w-xl font-sans text-sm leading-relaxed text-white/60">
                Select your path below to register a client referral or submit an international listing for review.
                Carlos evaluates each inquiry personally under strict confidentiality.
              </p>
            </div>

            {/* Hidden Anchors for direct link navigation */}
            <div id="south-florida-referral" className="scroll-mt-28" />
            <div id="submit-listing" className="scroll-mt-28" />

            {/* 2-Tab Switcher */}
            <div className="flex justify-center border-b border-white/10 mb-8">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("referral");
                  window.history.replaceState(null, "", "#south-florida-referral");
                }}
                className={`px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-all border-b-2 -mb-px ${
                  activeTab === "referral"
                    ? "border-gold text-gold font-bold bg-white/5"
                    : "border-transparent text-white/60 hover:text-white"
                }`}
              >
                Path 01 · Client Referral Registration
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("listing");
                  window.history.replaceState(null, "", "#submit-listing");
                }}
                className={`px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-all border-b-2 -mb-px ${
                  activeTab === "listing"
                    ? "border-gold text-gold font-bold bg-white/5"
                    : "border-transparent text-white/60 hover:text-white"
                }`}
              >
                Path 02 · International Listing Inquiry
              </button>
            </div>

            {/* Tab Panel 1: Client Referral Form */}
            <div className={activeTab === "referral" ? "block" : "hidden"}>
              <div className="mb-6 text-center">
                <h3 className="font-serif text-2xl text-white">South Florida Client Referral Desk</h3>
                <p className="mx-auto mt-2 max-w-lg font-sans text-xs leading-relaxed text-white/60">
                  Register your professional profile or submit an authorized buyer or seller client referral.
                  Written agreement executed prior to client contact. Paid at closing.
                </p>
              </div>
              <ReferralIntakeForm />
              <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                  <BadgeCheck size={14} className="text-gold" />
                  Licensed Professionals Only · Formal Written Agreements · Equal Housing Opportunity
                </div>
                <p className="font-sans text-[11px] leading-relaxed text-white/70">
                  Referral fee compensation is subject to a written referral agreement executed prior to client engagement.
                  Florida real estate brokerage services are provided through United Realty Group. International referral
                  opportunities may be handled through formal broker-to-broker agreements depending on jurisdiction and
                  applicable regulations.
                </p>
              </div>
            </div>

            {/* Tab Panel 2: International Listing / Agency Form */}
            <div className={activeTab === "listing" ? "block" : "hidden"}>
              <div className="mb-6 text-center">
                <h3 className="font-serif text-2xl text-white">Miami Desk · Listing &amp; Agency Inquiry</h3>
                <p className="mx-auto mt-2 max-w-lg font-sans text-xs leading-relaxed text-white/60">
                  Submit a property, portfolio, or agency profile for South Florida exposure review.
                  Carlos personally evaluates market fit, buyer profile alignment, and cooperation structure.
                </p>
              </div>
              <AgencyPartnerForm />
              <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
                  <BadgeCheck size={14} className="text-gold" />
                  Confidential · No Obligation · Professional Review · Equal Housing Opportunity
                </div>
                <p className="font-sans text-[11px] leading-relaxed text-white/70">
                  Exposure, marketing, and referral coordination do not guarantee a buyer, offer, sale, or closing. All
                  collaborations are subject to professional review, property suitability, local law, broker compliance,
                  MLS/platform rules where applicable, and written agreement. Florida real estate brokerage services are
                  provided through United Realty Group.
                </p>
              </div>
            </div>

            {/* Direct Contact Bar */}
            <div className="mt-12 border border-gold/20 bg-white/5 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Direct Broker Communication</p>
                <h4 className="mt-1 font-serif text-xl text-white">Prefer to speak directly?</h4>
                <p className="mt-1 font-sans text-xs text-white/60 max-w-md">
                  For agency directors, brokerages, and developer sales teams exploring ongoing collaboration.
                  Bilingual English / Spanish.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={CONTACT.whatsappBroker}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-navy-deep font-bold transition-opacity hover:opacity-90"
                >
                  <MessageSquare size={13} />
                  WhatsApp Carlos
                </a>
                <a
                  href={CONTACT.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:border-gold hover:text-gold"
                >
                  Schedule Call
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: Interactive Career Track Switcher, Brand Film & Agent FAQ ─── */}
        <section className="bg-ivory py-12 md:py-18 border-t border-hairline" id="join-urg">
          <div className="mx-auto max-w-6xl px-6">
            {/* Header + Interactive Track Toggle */}
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink font-semibold">
                  Career Opportunity · South Florida
                </p>
                <h2 className="mt-2 max-w-2xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                  Don&apos;t just join a brokerage.{" "}
                  <span className="text-gold-ink">Join a desk that already moves business.</span>
                </h2>
              </div>

              <div className="inline-flex rounded-lg border border-bone bg-white p-1" role="tablist" aria-label="Agent career tracks">
                {[
                  { id: "new", label: "New to Real Estate" },
                  { id: "experienced", label: "Experienced · Switching Agency" },
                ].map((tab) => {
                  const selected = careerTrack === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setCareerTrack(tab.id as "new" | "experienced")}
                      className={`rounded-md px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-all ${
                        selected
                          ? "bg-navy-deep text-gold font-bold"
                          : "text-navy/70 hover:text-navy-deep"
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brand Film & Interactive Career Track Panel */}
            <div className="mb-10 grid gap-6 overflow-hidden rounded-xl border border-gold/30 bg-navy-deep p-6 text-white md:grid-cols-12 md:p-8">
              <div className="relative min-h-[240px] overflow-hidden rounded-lg bg-black/40 md:col-span-6">
                <LazyVideo
                  src="/videos/advisor-brand.mp4"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/15 to-navy-deep/20 pointer-events-none" />
                <div className="absolute left-4 top-4">
                  <span className="inline-flex items-center gap-2 border border-gold/40 bg-navy-deep/75 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                    United Realty Group · Brand Film
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-serif text-xl leading-snug text-white">
                    See what working inside the brokerage looks like.
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/75">
                    {CONTACT.stats.urgAgents} agents · {CONTACT.stats.urgOfficeNetwork}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between md:col-span-6">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                    {careerTrack === "new" ? "Track 01 · Newly Licensed Agents" : "Track 02 · Experienced Producers"}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl text-white">
                    {careerTrack === "new"
                      ? "Start your career with a 25-year mentor."
                      : "Bring your book. Gain a bilateral desk."}
                  </h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-white/80">
                    {careerTrack === "new"
                      ? "Learn MLS pricing, listing preparation, and international buyer-agent coordination directly alongside an active producer—not a back-office manager."
                      : "Keep your independence while plugging into United Realty Group's 19 Florida office locations and the 93,000-member association ecosystem."}
                  </p>

                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {[
                      "Direct mentorship from an active 25-year producer",
                      "Bilingual English / Spanish international niche",
                      "93,000-member association & 200+ global portals",
                      `${CONTACT.stats.urgAgents} agents · ${CONTACT.stats.urgOfficeNetwork}`,
                    ].map((point) => (
                      <li key={point} className="flex items-start gap-2 rounded border border-white/10 bg-white/[0.04] p-2.5">
                        <BadgeCheck size={14} className="mt-0.5 flex-shrink-0 text-gold" />
                        <span className="font-sans text-xs leading-snug text-white/85">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
                  <a
                    href={WA_CAREERS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded bg-gold px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-navy-deep transition-opacity hover:opacity-90"
                  >
                    <UserPlus size={14} />
                    Ask About Joining URG
                  </a>
                  <a
                    href="/la-comision-secreta"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold hover:underline"
                  >
                    <BookOpen size={14} />
                    Preview Career Guide Book →
                  </a>
                </div>
              </div>
            </div>

            {/* Visible FAQ Section matching FAQPage Schema */}
            <div className="border-t border-hairline pt-12 md:pt-14">
              <div className="mb-8 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">Frequently Asked Questions</p>
                <h3 className="mt-2 font-serif text-2xl text-navy-deep md:text-3xl">
                  Questions for Real Estate Professionals
                </h3>
              </div>
              <div className="mx-auto max-w-3xl">
                <FaqAccordion faqs={AGENTS_FAQS} tone="light" defaultOpen={0} />
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
