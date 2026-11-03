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
    title: "Miami-Facing Listing Review",
    body: "Selected properties reviewed for positioning fit, buyer profile alignment, and international presentation suitability across South Florida channels.",
  },
  {
    title: "Bilingual Property Positioning",
    body: "English and Spanish property narrative development tailored specifically for U.S. and Latin American cooperating buyer agents.",
  },
  {
    title: "South Florida Agent-Network Reach",
    body: "Visibility within the 93,000-member Miami and South Florida REALTORS® ecosystem — the world's largest local REALTOR® association.",
  },
  {
    title: "U.S. and LATAM Buyer Channels",
    body: "Structured exposure to Florida-based buyer agents representing qualified domestic, Latin American, and international capital.",
  },
  {
    title: "Professional Listing Packaging",
    body: "Dedicated property landing presentation designed for cooperating buyer-agent discovery and review, far beyond standard portal links.",
  },
  {
    title: "Referral Inquiry Coordination",
    body: "Every buyer inquiry or referral opportunity is coordinated through formal, documented professional channels with transparent terms.",
  },
  {
    title: "Bilateral Co-Listing Architecture",
    body: "Formal cooperation structure where the local agent retains the seller mandate while Carlos serves as the Florida licensee of record.",
  },
  {
    title: "Documented Fee Protection",
    body: "All referral compensation and co-broker terms are executed under formal written agreements prior to client engagement and paid at closing.",
  },
];

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
];

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

  return (
    <>
      <Helmet>
        <title>For Real Estate Agents | Referrals, Miami Exposure & Careers</title>
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
              <p className="agent-partner-film-note">Archival association film · June 2022</p>
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
            <div className="mb-8 text-center md:mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">How Agents Work With Carlos</p>
              <h2 className="mx-auto mt-3 max-w-3xl font-serif text-2xl leading-tight text-navy-deep md:text-4xl">
                One desk. Three ways to win.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl font-sans text-sm leading-relaxed text-ink-primary/65 md:text-base">
                Wherever you are in your business, there is a structured, documented way to work together — and a
                personal response from Carlos, not a call center.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Handshake,
                  tag: "Path 01 · Referrals",
                  title: "Refer a buyer or seller",
                  body: "Have a client buying or selling in South Florida — or a U.S./international buyer looking abroad? Send the referral, keep the client relationship, and get paid at closing under a formal written agreement.",
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
                  body: "International and premium listing agents can add a Miami-facing exposure layer — bilingual packaging into the South Florida network and U.S./LATAM buyer channels. You keep the mandate.",
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
                  body: "New to real estate, or an experienced agent ready for a change? Build your career alongside an active 25-year agent who runs live seller, buyer, and cross-border desks on the same MLS you'll work.",
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
                  <div className="flex h-full flex-col border border-hairline bg-white p-6 transition-all duration-300 hover:border-gold hover:shadow-lg md:p-8">
                    <p.icon size={22} className="text-gold" strokeWidth={1.5} />
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-gold/80">{p.tag}</p>
                    <h3 className="mt-2 font-serif text-xl leading-snug text-navy-deep">{p.title}</h3>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/70">{p.body}</p>
                    <ul className="mt-5 space-y-2.5">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5">
                          <BadgeCheck size={14} className="mt-0.5 flex-shrink-0 text-gold" />
                          <span className="font-sans text-[13px] leading-snug text-ink-primary/75">{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href={p.href}
                      onClick={p.onClick}
                      className="group mt-7 inline-flex items-center gap-1.5 self-start border-b border-gold pb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-navy-deep transition-colors hover:text-gold"
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

        {/* ── SECTION 3: Bilateral Co-Listing & Referral Architecture ─ */}
        <section className="bg-ivory py-12 md:py-18 border-t border-hairline">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 text-center md:mb-14">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
                Bilateral Architecture · Cross-Border Protocol
              </p>
              <h2 className="mx-auto mt-3 max-w-3xl font-serif text-2xl leading-tight text-navy-deep md:text-4xl">
                You keep the mandate. We support the international layer.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl font-sans text-sm leading-relaxed text-ink-primary/65 md:text-base">
                The Miami Desk is designed to complement local market representation — not replace it. The local agent
                maintains full authority over the seller relationship, the mandate, and local market operations.
              </p>
            </div>

            {/* Role Separation Grid */}
            <div className="grid gap-6 md:grid-cols-3 mb-12">
              <Tilt3D maxTilt={4} className="h-full">
                <div className="h-full border border-hairline bg-white p-6 md:p-8">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Role 01 · Local Agent</span>
                  <h3 className="mt-2 font-serif text-xl text-navy-deep">Retains Full Authority</h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-navy/60">Mandate · Client · Fee</p>
                  <ul className="mt-5 space-y-3">
                    {[
                      "The seller relationship and local authority",
                      "The local listing mandate and exclusivity",
                      "Direct client advisory and on-the-ground showings",
                      "Local fee and agreed transaction commission",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <BadgeCheck size={14} className="mt-0.5 flex-shrink-0 text-gold" />
                        <span className="font-sans text-xs leading-snug text-ink-primary/75 md:text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Tilt3D>

              <Tilt3D maxTilt={4} className="h-full">
                <div className="h-full bg-gold/[0.04] border-2 border-gold/40 p-6 md:p-8">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Role 02 · Miami Desk</span>
                  <h3 className="mt-2 font-serif text-xl text-navy-deep">U.S. &amp; LATAM Exposure</h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-gold/80">Florida License SL705771</p>
                  <ul className="mt-5 space-y-3">
                    {[
                      "Miami MLS & 93,000-member agent ecosystem",
                      "Bilingual English / Spanish property packaging",
                      "U.S. and Latin American buyer-channel reach",
                      "Structured referral inquiry and tour coordination",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <BadgeCheck size={14} className="mt-0.5 flex-shrink-0 text-gold" />
                        <span className="font-sans text-xs leading-snug text-ink-primary/75 md:text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Tilt3D>

              <Tilt3D maxTilt={4} className="h-full">
                <div className="h-full border border-hairline bg-white p-6 md:p-8">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">Role 03 · Governance</span>
                  <h3 className="mt-2 font-serif text-xl text-navy-deep">Written Legal Protection</h3>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-navy/60">Compliance &amp; Terms</p>
                  <ul className="mt-5 space-y-3">
                    {[
                      "Written bilateral cooperation agreement",
                      "Documented referral structure before engagement",
                      "Transparent scope, milestones, and fees",
                      "Full compliance with applicable real estate licensing",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <BadgeCheck size={14} className="mt-0.5 flex-shrink-0 text-gold" />
                        <span className="font-sans text-xs leading-snug text-ink-primary/75 md:text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Tilt3D>
            </div>

            {/* Core Services Deliverables */}
            <div className="mb-12">
              <div className="mb-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold">Core Deliverables</p>
                <h3 className="mt-1 font-serif text-2xl text-navy-deep">What the Miami Desk Provides</h3>
              </div>
              <div className="grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
                {SERVICES.map((s) => (
                  <div key={s.title} className="bg-white p-5 md:p-6">
                    <CheckCircle2 size={16} className="text-gold" />
                    <h4 className="mt-3 font-serif text-base font-medium text-navy-deep">{s.title}</h4>
                    <p className="mt-2 font-sans text-xs leading-relaxed text-ink-primary/65">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaboration Process */}
            <div className="mb-12">
              <div className="mb-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold">Step-by-Step Sequence</p>
                <h3 className="mt-1 font-serif text-2xl text-navy-deep">Four Steps. No Ambiguity.</h3>
              </div>
              <div className="grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
                {PROCESS_STEPS.map((step) => (
                  <div key={step.number} className="bg-white p-5 md:p-6">
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-gold font-bold">
                      {step.number}
                    </span>
                    <h4 className="mt-2 font-serif text-base text-navy-deep">{step.title}</h4>
                    <p className="mt-2 font-sans text-xs leading-relaxed text-ink-primary/65">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pull Quote */}
            <div className="border border-gold/30 bg-navy-deep p-6 text-center md:p-10 text-white">
              <Globe2 size={26} className="mx-auto text-gold/70" strokeWidth={1.25} />
              <blockquote className="mx-auto mt-4 max-w-3xl font-serif text-xl leading-relaxed text-white md:text-2xl">
                &ldquo;The internet creates visibility. <span className="text-gold">Agent networks create movement.</span> A
                listing is not fully marketed until buyer agents know how to present it.&rdquo;
              </blockquote>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
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

        {/* ── SECTION 5: Join URG, Career Guide & Visible Agent FAQ ─── */}
        <section className="bg-ivory py-12 md:py-18 border-t border-hairline" id="join-urg">
          <div className="mx-auto max-w-6xl px-6">
            {/* Header */}
            <div className="mb-8 md:mb-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Career Opportunity · South Florida</p>
              <h2 className="mt-3 max-w-3xl font-serif text-3xl leading-tight text-navy-deep md:text-4xl">
                Don&apos;t just join a brokerage.<br />
                <span className="text-gold">Join a desk that already moves business.</span>
              </h2>
              <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-ink-primary/65 md:text-base">
                United Realty Group provides a coordinated Florida brokerage platform — {CONTACT.stats.urgAgents} agents
                across the {CONTACT.stats.urgOfficeNetwork}. Whatever stage you are at, you work directly with Carlos — an
                active 25-year agent on the same MLS, not a branch manager reviewing paperwork.
              </p>
            </div>

            {/* Brand Film & Business Case */}
            <div className="mb-10 grid gap-px overflow-hidden border border-gold/25 bg-gold/10 md:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[240px] overflow-hidden bg-navy-deep md:min-h-[420px]">
                <LazyVideo
                  src="/videos/advisor-brand.mp4"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/15 to-navy-deep/20 pointer-events-none" />
                <div className="absolute left-6 top-6">
                  <span className="inline-flex items-center gap-2 border border-gold/40 bg-navy-deep/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-gold backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                    United Realty Group · Brand Film
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <p className="font-serif text-xl leading-snug text-white md:text-2xl">
                    See what working inside the brokerage looks like.
                  </p>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                    {CONTACT.stats.urgAgents} agents · {CONTACT.stats.urgOfficeNetwork}
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center bg-navy-deep p-6 md:p-8 text-white">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold/80">Why agents grow here</p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-white/70 md:text-[15px]">
                  The agents who build the fastest are the ones who plug into demand that already exists instead of
                  generating every lead alone. Carlos runs active seller, buyer, and cross-border desks on the same MLS
                  you will work — and brings 25 years of in-market relationships to the agents around him.
                </p>
                <ul className="mt-5 space-y-3">
                  {[
                    "Mentorship from an active producer — not a back-office manager",
                    "A bilingual, international niche most local agents cannot serve",
                    "Where appropriate, qualified overflow inquiries are routed to affiliated agents",
                    "Coordinated infrastructure: listing marketing, MLS reach, brokerage support, and compliance",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <BadgeCheck size={14} className="mt-0.5 flex-shrink-0 text-gold" />
                      <span className="font-sans text-xs leading-snug text-white/75 md:text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Two Audiences Grid: New vs Experienced */}
            <div className="mb-10 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
              <div className="bg-white p-6 md:p-8">
                <UserPlus size={20} className="text-gold" strokeWidth={1.5} />
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-gold/80">New to Real Estate</p>
                <h3 className="mt-2 font-serif text-lg leading-snug text-navy-deep md:text-xl">
                  Start your career the right way.
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/70">
                  From licensing to your first closing, you get a clear path and a mentor who has done it for 25 years —
                  instead of a desk and a login. Learn the MLS, listing strategy, and how to build a pipeline from zero in
                  a competitive, international market.
                </p>
              </div>

              <div className="bg-white p-6 md:p-8">
                <Handshake size={20} className="text-gold" strokeWidth={1.5} />
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-gold/80">
                  Experienced · Switching Agency
                </p>
                <h3 className="mt-2 font-serif text-lg leading-snug text-navy-deep md:text-xl">
                  Ready for a change and real guidance.
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-ink-primary/70">
                  Already licensed but underserved by your current brokerage? Bring your book, keep your independence, and
                  gain a hands-on partner working the same market. For agents who want mentorship and growth — not just a
                  lower split and silence.
                </p>
              </div>
            </div>

            {/* Growth Pillars + Book Card Layout */}
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start mb-14">
              <div>
                <div className="grid grid-cols-1 gap-px border border-hairline bg-hairline sm:grid-cols-2">
                  {[
                    {
                      icon: Building2,
                      title: "Platform for Coordinated Execution",
                      body: `United Realty Group supports its agents through the ${CONTACT.stats.urgOfficeNetwork}, providing a statewide brokerage framework for listing execution and compliant transactions.`,
                    },
                    {
                      icon: Globe2,
                      title: "Association Reach, Built In",
                      body: "Every affiliated agent enters the Miami and South Florida REALTORS® ecosystem — a 93,000-member association, 200+ global portals in 19 languages, and 437+ international referral agreements.",
                    },
                    {
                      icon: Users,
                      title: "Built for a Bilingual Market",
                      body: "South Florida runs on English and Spanish — and so does the international buyer pool. An agent who can work both fluently competes for mandates monolingual agents cannot reach.",
                    },
                    {
                      icon: Star,
                      title: "Active Producer Mentorship",
                      body: "Carlos has worked this market since 2001 and is actively closing transactions on the same MLS today. You learn current strategy from someone doing the work now.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="bg-white p-5 md:p-6">
                      <item.icon size={18} className="text-gold" strokeWidth={1.5} />
                      <h4 className="mt-3 font-serif text-base text-navy-deep">{item.title}</h4>
                      <p className="mt-2 font-sans text-xs leading-relaxed text-ink-primary/65">{item.body}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <a
                    href={WA_CAREERS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-navy-deep px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-gold hover:text-navy-deep font-semibold"
                  >
                    <UserPlus size={14} />
                    Ask About Joining URG
                  </a>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-navy/70">
                    Personal response from Carlos
                  </p>
                </div>

                <p className="mt-4 font-sans text-xs italic text-ink-primary/60">
                  All license affiliations are subject to United Realty Group&apos;s standard broker requirements, Florida
                  DBPR licensing, and applicable MLS membership rules. Contact Carlos directly for current affiliate terms.
                </p>
              </div>

              {/* Book Teaser Card */}
              <div className="relative overflow-hidden border border-gold/30 bg-navy-deep shadow-xl text-white">
                <div className="absolute right-4 top-4 z-10">
                  <span className="bg-gold px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-navy-deep font-bold">
                    Coming Soon
                  </span>
                </div>
                <div className="p-6 md:p-8">
                  <BookOpen size={32} className="text-gold" strokeWidth={1.25} />
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-gold/70">
                    The South Florida Career Guide
                  </p>
                  <h3 className="mt-2 font-serif text-2xl leading-snug text-white">
                    How to Become a Successful<br />
                    <em className="italic text-gold">Real Estate Agent in South Florida</em>
                  </h3>
                  <p className="mt-3 font-sans text-xs leading-relaxed text-white/60 md:text-sm">
                    A practical guide to starting and building a real estate career in one of the most competitive and
                    internationally connected markets in the United States — from licensing, to your first transaction, to
                    working inside a professional network.
                  </p>
                </div>
                <div className="border-t border-white/10 px-6 py-4 md:px-8">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-gold/70">What&apos;s inside</p>
                  <ul className="space-y-2">
                    {[
                      "Florida real estate licensing — step by step",
                      "Choosing the right brokerage for your career",
                      "Building a pipeline from zero in South Florida",
                      "Working with international and Latin American buyers",
                      "MLS, listing strategy, and the agent network",
                      "What 25 years in this market actually teaches you",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-gold" />
                        <span className="font-sans text-xs leading-snug text-white/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-white/10 p-6 md:px-8">
                  <a
                    href="/la-comision-secreta"
                    className="flex w-full items-center justify-center gap-2 bg-gold px-6 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep font-bold transition-opacity hover:opacity-90"
                  >
                    <BookOpen size={14} />
                    Preview the Book
                  </a>
                  <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                    By Carlos Uzcategui · FL SL705771 · United Realty Group
                  </p>
                </div>
              </div>
            </div>

            {/* Visible FAQ Section matching FAQPage Schema */}
            <div className="border-t border-hairline pt-12 md:pt-16">
              <div className="mb-8 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Frequently Asked Questions</p>
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
