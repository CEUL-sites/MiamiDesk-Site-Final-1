import { useEffect, useRef, useState } from "react";
import { ArrowRight, Building2, CheckCircle2, Globe2, Lock, ShieldCheck, X } from "lucide-react";
import { Tilt3D } from "./Tilt3D";
import { CONTACT } from "../constants";

export const GILMAR_PORTAL_URL = "/gilmar-spain";

export interface GilmarResidence {
  id: string;
  code: string;
  name: string;
  location: string;
  region: string;
  unitLabel: string;
  price: string;
  priceNote: string;
  specs: string;
  terraceSpec: string;
  badgeLabel: string;
  summary: string;
  highlights: string[];
  address: string;
  complianceNote: string;
  image: string;
}

export const GILMAR_RESIDENCES: readonly GilmarResidence[] = [
  {
    id: "elysian-fuerteventura",
    code: "01 / SELECTED RESIDENCE",
    name: "The Elysian Collection",
    location: "Caleta de Fuste · Fuerteventura",
    region: "Canary Islands · Spain",
    unitLabel: "Block M · Floor 3B · Unit 69",
    price: "€366,000",
    priceNote: "Selected-unit price · Tax treatment to confirm",
    specs: "3 Bedrooms · 2 Bathrooms · 134 m² Built",
    terraceSpec: "105.75 m² interior living + 63.30 m² across two terraces",
    badgeLabel: "New Development · Canary Islands",
    summary:
      "An elevated three-bedroom residence with two terraces, views toward the Atlantic and Caleta de Fuste, and an open living, dining, and kitchen area with an island.",
    highlights: [
      "105.75 m² interior living space + 63.30 m² across two terraces",
      "One en-suite bathroom · Private parking included · Communal pool",
    ],
    address: "Urbanización Castillo 3, Fase P, número 1 · Caleta de Fuste, Fuerteventura, Canary Islands, Spain",
    complianceNote:
      "GILMAR identifies Block M, Floor 3B, Unit 69. Current availability, delivery, unit plan, and whether the quoted price includes IGIC require written confirmation.",
    image: "/images/gilmar/elysian.jpg",
  },
  {
    id: "balcon-estepona",
    code: "02 / SELECTED RESIDENCE",
    name: "Balcón del Mediterráneo",
    location: "Selwo · Estepona",
    region: "Costa del Sol · Spain",
    unitLabel: "First-Floor Residence · 3 En-Suite Bedrooms",
    price: "€1,442,000 + VAT",
    priceNote: "GILMAR quoted price · Purchase costs additional",
    specs: "3 En-Suite Bedrooms + Guest WC · 205.09 m² Built",
    terraceSpec: "27.55 m² private terrace · 2 underground parking spaces",
    badgeLabel: "Costa del Sol · New Golden Mile",
    summary:
      "A first-floor residence in Selwo on Estepona’s New Golden Mile. Three en-suite bedrooms and a separate guest toilet accompany generous living and dining areas and a private terrace.",
    highlights: [
      "27.55 m² private terrace + two underground parking spaces & storage room",
      "Communal pools, wellness and spa facilities, gym, and landscaped gardens",
    ],
    address: "Urbanización Balcón del Mediterráneo, Calle El Burgo, s/n · 29680 Estepona, Málaga, Spain",
    complianceNote:
      "Exact block, staircase, unit code, plan, and delivery are awaiting confirmation. The price excludes VAT and other purchase costs; request a current written quotation.",
    image: "/images/gilmar/balcon-residence.jpg",
  },
  {
    id: "be-grand-malaga",
    code: "03 / SELECTED RESIDENCE",
    name: "Be Grand El Limonar",
    location: "Muelle Uno · El Limonar",
    region: "Málaga · Spain",
    unitLabel: "Fifth Floor · Unit C · Private Pool",
    price: "€1,950,000 + VAT",
    priceNote: "GILMAR quoted price · Purchase costs additional",
    specs: "2 Bedrooms · 2 Bathrooms · 120.30 m² Reported Built",
    terraceSpec: "186.55 m² reported outdoor area · Private pool",
    badgeLabel: "Málaga Capital · Prime Coastal",
    summary:
      "A two-bedroom residence in El Limonar with an open living, dining, and kitchen area. GILMAR reports private outdoor space and a private pool, with Porcelanosa finishes and Siemens kitchen appliances.",
    highlights: [
      "186.55 m² reported outdoor area with private pool + 93.05 m² enclosed built",
      "Shared pools, sea-view chill-out areas, and fitness center · Est. completion end of 2027",
    ],
    address: "Calle Ramal de Monte Sancha, 28 · El Limonar, Málaga, Spain",
    complianceNote:
      "Confirm the fifth-floor designation, private outdoor layout, exact plan, area definitions, delivery, and availability in writing.",
    image: "/images/gilmar/be-grand-muelle-uno-c-garden.webp",
  },
];

type GilmarVariant = "global-desk" | "agents" | "buyers";

/**
 * Compensation gating — deliberate, do not undo.
 * No commission rate, percentage, or amount is published in this component.
 * Terms are determined per transaction and level of service and issued in
 * writing to the registering professional after client registration and
 * brokerage approval. Buyers never see agent-compensation language.
 * tests/seller-page-layout.test.ts asserts no "%" appears here.
 */
const AGENT_TERMS = {
  badge: { en: "Agent terms on registration", es: "Condiciones al registrar cliente" },
  note: {
    en: "Cooperating compensation varies by asset class (new developments, resale residential, investment real estate, or commercial) and level of service. Each case carries its own negotiated referral fee, respected in writing once approved by GILMAR Spain and paid at closing through United Realty Group directly to your brokerage.",
    es: "La compensación de cooperación varía según el producto (obra nueva, segunda mano, inversión o comercial) y el nivel de servicio. Cada caso cuenta con su propio honorario negociado, respetado por escrito tras la aprobación de GILMAR España y abonado al cierre a través de United Realty Group directamente a su brokerage.",
  },
  steps: {
    eyebrow: { en: "HOW NEGOTIATED REFERRALS WORK", es: "CÓMO FUNCIONA CADA REFERENCIA NEGOCIADA" },
    heading: { en: "Negotiated referral fees by asset class — protected in writing.", es: "Honorarios negociados por tipo de activo — protegidos por escrito." },
    payoff: { en: "Paid through United Realty Group to your brokerage.", es: "Pago a través de United Realty Group a su brokerage." },
    items: [
      {
        en: ["Register your license and client", "Identify yourself, your brokerage, and your client’s target product (new development, resale, investment, or commercial) prior to any introduction to GILMAR."],
        es: ["Registre su licencia y cliente", "Identifíquese, indique su brokerage y el tipo de activo (obra nueva, segunda mano, inversión o comercial) antes de cualquier presentación a GILMAR."],
      },
      {
        en: ["Negotiated fee approved by GILMAR Spain", "Each referral receives its own negotiated fee based on the property category and level of service—respected in writing once approved by GILMAR Spain."],
        es: ["Honorario negociado y aprobado por GILMAR España", "Cada referencia cuenta con su propio honorario negociado según el producto y alcance de servicio, respetado por escrito tras la aprobación de GILMAR España."],
      },
      {
        en: ["Paid via United Realty Group at closing", "GILMAR executes locally in Spain. At closing, United Realty Group disburses the agreed referral fee directly to your brokerage."],
        es: ["Pago vía United Realty Group al cierre", "GILMAR gestiona la operación en España y, al cierre, United Realty Group abona el honorario acordado directamente a su brokerage."],
      },
    ],
  },
} as const;

const ADVISORY_PILLARS = [
  {
    titleEn: "Legal & Tax Advisory",
    titleEs: "Asesoramiento Jurídico y Fiscal",
    bodyEn:
      "Registry title verification, charge checks, purchase contract review, notary coordination, and transaction tax guidance.",
    bodyEs:
      "Verificación registral, revisión de cargas y contratos, coordinación notarial y orientación fiscal en cada operación.",
  },
  {
    titleEn: "Financing & Centro Hipotecario",
    titleEs: "Centro Hipotecario y Financiación",
    bodyEn:
      "Dedicated mortgage intermediation comparing Spanish banking structures for resident and international buyers.",
    bodyEs:
      "Intermediación hipotecaria propia comparando soluciones bancarias para compradores residentes e internacionales.",
  },
  {
    titleEn: "Official Valuations (THIRSA)",
    titleEs: "Tasaciones Oficiales (THIRSA)",
    bodyEn:
      "Independent market studies and official property appraisals through THIRSA, homologated by the Bank of Spain.",
    bodyEs:
      "Estudios de mercado y tasaciones oficiales a través de THIRSA, sociedad homologada por el Banco de España.",
  },
  {
    titleEn: "Renovations, Interior Design & After-Sales",
    titleEs: "Reformas, Interiorismo y Posventa",
    bodyEn:
      "Turnkey architectural remodeling via Soluciones Constructivas, home staging, utility setup, insurance, and Capital Markets advisory.",
    bodyEs:
      "Reformas integrales con Soluciones Constructivas, interiorismo, gestión posventa de suministros y Capital Markets.",
  },
] as const;

function registerTarget(variant: GilmarVariant, es: boolean) {
  if (variant === "agents") return "#south-florida-referral";
  if (variant === "buyers") return "#buyer-mandate";
  return es ? "/es/agentes#referral-form" : "/agents#south-florida-referral";
}

function GilmarResidenceModal({
  residence,
  variant,
  lang,
  onClose,
}: {
  residence: GilmarResidence;
  variant: GilmarVariant;
  lang: "en" | "es";
  onClose: () => void;
}) {
  const es = lang === "es";
  const showAgentTerms = variant !== "buyers";
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-navy-deep/85 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={residence.name}
      onClick={onClose}
    >
      <div
        className="relative my-8 w-full max-w-2xl border border-gold/40 bg-[#071526] text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center border border-white/15 bg-navy/85 text-white/80 transition-colors hover:border-gold hover:text-gold"
        >
          <X size={18} />
        </button>

        <div className="relative h-56 w-full overflow-hidden bg-navy">
          <img
            src={residence.image}
            alt={`${residence.name} — ${residence.location}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071526] via-[#071526]/40 to-transparent" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="bg-gold px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-navy-deep">
              {showAgentTerms ? AGENT_TERMS.badge[lang] : residence.badgeLabel}
            </span>
            <span className="border border-white/20 bg-navy-deep/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/90">
              {residence.code}
            </span>
          </div>
          <div className="absolute bottom-3 left-6 right-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
              {residence.location} · {residence.region}
            </p>
            <h3 className="mt-1 font-serif text-2xl text-white sm:text-3xl">{residence.name}</h3>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <p className="font-serif text-3xl font-semibold text-gold">{residence.price}</p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/60">
                {residence.priceNote}
              </p>
            </div>
            <div className="text-right">
              <p className="font-sans text-xs font-semibold text-white">{residence.unitLabel}</p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-gold/80">
                {residence.specs}
              </p>
            </div>
          </div>

          <p className="mt-5 font-sans text-sm leading-relaxed text-white/85">{residence.summary}</p>

          <ul className="mt-5 space-y-2.5">
            {residence.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-xs leading-relaxed text-white/80">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-gold" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 border border-white/10 bg-white/[0.03] p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
              {showAgentTerms
                ? es ? "Ubicación y protocolo entre agencias" : "Location & brokerage protocol"
                : "Location & confirmation status"}
            </p>
            <p className="mt-1 font-sans text-xs text-white/75">{residence.address}</p>
            <p className="mt-2 font-sans text-[11px] leading-relaxed text-white/60">
              {residence.complianceNote}
              {showAgentTerms ? ` ${AGENT_TERMS.note[lang]}` : ""}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={registerTarget(variant, es)}
              onClick={onClose}
              className="inline-flex flex-1 items-center justify-center gap-2 bg-gold px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:bg-gold-soft"
            >
              {showAgentTerms
                ? es ? "Registrar un cliente para esta residencia" : "Register a client for this residence"
                : "Request the brief for this residence"}
              <ArrowRight size={13} />
            </a>
            <a
              href={es ? `${GILMAR_PORTAL_URL}?lang=es` : GILMAR_PORTAL_URL}
              className="inline-flex items-center justify-center gap-2 border border-white/25 px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:border-gold hover:text-gold"
            >
              {es ? "Ver en el portal GILMAR × URG" : "View in the GILMAR × URG portal"}
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GilmarGlobalDeskSection({
  variant = "global-desk",
  lang = "en",
}: {
  variant?: GilmarVariant;
  lang?: "en" | "es";
}) {
  const showAgentTerms = variant !== "buyers";
  const [selectedResidence, setSelectedResidence] = useState<GilmarResidence | null>(null);
  const es = lang === "es";

  const copy = {
    "global-desk": {
      eyebrow: es
        ? "ESPAÑA ↔ FLORIDA · MIAMI GLOBAL LISTINGS SERVICE · GILMAR × UNITED REALTY GROUP"
        : "SPAIN ↔ FLORIDA · MIAMI GLOBAL LISTINGS SERVICE · GILMAR × UNITED REALTY GROUP",
      heading: es
        ? "Sus clientes. Más de 2.000 propiedades en España. La experiencia de GILMAR."
        : "Your clients. 2,000+ Spanish properties. GILMAR’s expertise.",
      subtitle: es
        ? "Cooperación documentada entre GILMAR Consulting Inmobiliario (establecida en 1983 · 36 equipos comerciales en España · 10 idiomas) y United Realty Group (Florida · 3.500+ agentes). Regístrese para explorar el catálogo IDX de más de 2.000 propiedades en España o solicite una selección personalizada."
        : "Documented cooperation between GILMAR Consulting Inmobiliario (established 1983 · 36 commercial teams across Spain · 10 service languages) and United Realty Group (Florida · 3,500+ agents). Register to unlock guided browsing across 2,000+ active Spanish listings or request a tailored shortlist.",
      primaryCta: es ? "Abrir el portal GILMAR × URG ↗" : "Open the GILMAR × URG portal ↗",
      secondaryCta: es ? "Registrar un cliente para España" : "Register a client for Spain",
      secondaryHref: registerTarget("global-desk", es),
    },
    agents: {
      eyebrow: "SPAIN CO-BROKERING & IDX ACCESS DESK · GILMAR × UNITED REALTY GROUP",
      heading: "Have a client exploring Spain? Register them before the introduction.",
      subtitle:
        "You bring the client relationship. GILMAR (established 1983 · 36 commercial teams across Spain) handles viewings, negotiation, and closing in Spain. Our team at United Realty Group documents the cooperation brokerage to brokerage, so your name and your brokerage stay identified on the file. Compensation is determined per transaction and level of service and issued in writing once your license and client are registered.",
      primaryCta: "Open the GILMAR × URG portal ↗",
      secondaryCta: "Register a client for Spain",
      secondaryHref: "#south-florida-referral",
    },
    buyers: {
      eyebrow: "EXPLORING SPAIN? · GILMAR × UNITED REALTY GROUP BILATERAL DESK",
      heading: "Guided access to 2,000+ residences across Spain with full advisory support.",
      subtitle:
        "Through our bilateral cooperation with GILMAR Consulting Inmobiliario (established 1983, with 36 commercial teams across Madrid, Marbella, Estepona, Málaga, Seville, Cádiz, and the Canary Islands), registered clients gain guided access to 2,000+ active properties plus legal, tax, mortgage, valuation, and after-sales support.",
      primaryCta: "View the GILMAR × URG Spain selection ↗",
      secondaryCta: "Register to browse Spain inventory",
      secondaryHref: "#buyer-mandate",
    },
  }[variant];

  return (
    <section
      id="gilmar-global-desk"
      className="relative overflow-hidden border-y border-gold/25 bg-[#071526] py-16 text-white md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Partner Lockup Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 border border-gold/35 bg-gold/10 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
            <Globe2 size={12} />
            {copy.eyebrow}
          </div>
          <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/75">
            <span>GILMAR (Est. 1983 · 36 Spain Teams)</span>
            <span className="text-gold">×</span>
            <span>United Realty Group (3,500+ FL Agents)</span>
          </div>
        </div>

        {/* Intro + Stats */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
              {copy.heading}
            </h2>
            <p className="mt-4 max-w-3xl font-sans text-base leading-relaxed text-white/75">
              {copy.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 border border-white/15 bg-white/[0.03] p-4 lg:col-span-4">
            <div>
              <p className="font-serif text-2xl font-semibold text-gold md:text-3xl">1983</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/65">
                {es ? "Fundación GILMAR" : "GILMAR Founded"}
              </p>
            </div>
            <div className="border-l border-white/10 pl-3">
              <p className="font-serif text-2xl font-semibold text-gold md:text-3xl">36</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/65">
                {es ? "Equipos España" : "Teams in Spain"}
              </p>
            </div>
            <div className="border-l border-white/10 pl-3">
              <p className="font-serif text-2xl font-semibold text-gold md:text-3xl">2,000+</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/65">
                {es ? "Propiedades IDX" : "Spain Listings"}
              </p>
            </div>
          </div>
        </div>

        {/* 3 Interactive 3D Residence Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {GILMAR_RESIDENCES.map((res) => (
            <Tilt3D key={res.id} maxTilt={4} className="h-full">
              <button
                type="button"
                onClick={() => setSelectedResidence(res)}
                className="group flex h-full w-full flex-col overflow-hidden border border-gold/25 bg-navy/80 text-left shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold hover:shadow-[0_24px_56px_rgba(176,141,87,0.22)]"
              >
                <div className="relative h-52 w-full overflow-hidden bg-navy-deep">
                  <img
                    src={res.image}
                    alt={`${res.name} — ${res.location}`}
                    loading="lazy"
                    width="420"
                    height="208"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/30 to-transparent" />
                  <div className="absolute left-3 top-3 bg-gold px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-navy-deep">
                    {showAgentTerms ? AGENT_TERMS.badge[lang] : res.badgeLabel}
                  </div>
                  <div className="absolute right-3 top-3 border border-white/20 bg-navy-deep/85 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/90">
                    {res.code}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                      {res.location}
                    </span>
                    <span className="border border-gold/40 bg-navy-deep/90 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-gold opacity-0 transition-opacity group-hover:opacity-100">
                      {es ? "Ver ficha →" : "Inspect Brief →"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-2xl text-white transition-colors group-hover:text-gold">
                        {res.name}
                      </h3>
                    </div>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                      {res.unitLabel}
                    </p>
                    <p className="mt-3 font-serif text-2xl font-semibold text-gold">
                      {res.price}
                    </p>
                    <p className="mt-3 font-sans text-xs leading-relaxed text-white/75">
                      {res.summary}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-white/10 pt-3.5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/80">
                      {res.specs}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/55">
                        {res.region}
                      </span>
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                        {es ? "Ver ficha →" : "Unit details →"}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </Tilt3D>
          ))}
        </div>

        {/* Compensation process — rates are never published here; see AGENT_TERMS */}
        {showAgentTerms && (
          <div className="mt-10 border border-white/15 bg-white/[0.03] p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              {AGENT_TERMS.steps.eyebrow[lang]}
            </p>
            <h3 className="mt-2 font-serif text-2xl text-white md:text-3xl">
              {AGENT_TERMS.steps.heading[lang]}{" "}
              <em className="text-gold">{AGENT_TERMS.steps.payoff[lang]}</em>
            </h3>
            <ol className="mt-6 grid gap-6 md:grid-cols-3">
              {AGENT_TERMS.steps.items.map((item, i) => (
                <li key={item.en[0]} className="border-t border-gold/40 pt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">0{i + 1}</p>
                  <p className="mt-2 font-serif text-xl text-white">{item[lang][0]}</p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-white/75">{item[lang][1]}</p>
                </li>
              ))}
            </ol>
            <a
              href={registerTarget(variant, es)}
              className="mt-7 inline-flex items-center justify-center gap-2 bg-gold px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:bg-gold-soft"
            >
              {es ? "Registrar un cliente y recibir las condiciones" : "Register a client and receive the written terms"}
              <ArrowRight size={13} />
            </a>
          </div>
        )}

        {/* Registration-Gated 2,000+ Spain IDX Portfolio */}
        <div className="mt-8 border border-gold/30 bg-white/[0.04] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              <Lock size={14} />
              <span>
                {es
                  ? "CATÁLOGO IDX PRIVADO · MÁS DE 2.000 PROPIEDADES EN ESPAÑA"
                  : "REGISTERED PORTFOLIO ACCESS · 2,000+ ACTIVE SPAIN LISTINGS"}
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
              {es ? "Acceso habilitado previo registro" : "Registration required to browse"}
            </span>
          </div>
          <h3 className="mt-3 font-serif text-2xl text-white">
            {es
              ? "Explore más de 2.000 propiedades en España tras su registro"
              : "Register Once to Browse GILMAR’s 2,000+ Property IDX Feed"}
          </h3>
          <p className="mt-2 max-w-4xl font-sans text-sm leading-relaxed text-white/75">
            {es
              ? "La cartera de GILMAR supera las 2.000 viviendas activas en España (1.061 en Madrid, 737 en Costa del Sol, 201 en Islas Canarias y 23 en Cádiz, además de Sevilla y Obra Nueva) entre pisos, áticos, chalets y promociones exclusivas. El acceso completo al buscador IDX se habilita tras el registro."
              : "GILMAR’s active inventory exceeds 2,000 residential listings across Spain (1,061 in Madrid, 737 in Costa del Sol, 201 in the Canary Islands, and 23 in Cádiz, plus Seville and New Developments) spanning apartments, penthouses, villas, and Obra Nueva. Complete IDX browsing and private dossiers unlock upon registration."}
          </p>
        </div>

        {/* GILMAR Integral Advisory Pillars (from gilmar.es/servicios/asesoramiento/) */}
        <div className="mt-6 border border-white/10 bg-navy/60 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              <Building2 size={14} />
              <span>
                {es
                  ? "SERVICIOS INTEGRALES GILMAR · MADRID · COSTA DEL SOL · SEVILLA · CANARIAS"
                  : "GILMAR INTEGRAL BUYER ADVISORY · 36 TEAMS · 10 LANGUAGES"}
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
              {es ? "Respaldo integral en origen y destino" : "End-to-end execution across Spain"}
            </span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ADVISORY_PILLARS.map((pillar) => (
              <div key={pillar.titleEn} className="border border-white/10 bg-white/[0.02] p-4">
                <h4 className="font-serif text-base text-gold">
                  {es ? pillar.titleEs : pillar.titleEn}
                </h4>
                <p className="mt-2 font-sans text-xs leading-relaxed text-white/70">
                  {es ? pillar.bodyEs : pillar.bodyEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Beyond the 3 Developments: Tailored Shortlist & Portal Launch Bar */}
        <div className="mt-8 grid gap-6 border border-gold/30 bg-white/[0.04] p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              <Globe2 size={15} />
              <span>
                {es
                  ? "MÁS ALLÁ DE LAS PROMOCIONES · MADRID · MARBELLA · COSTA DEL SOL · CANARIAS"
                  : "BEYOND THE DEVELOPMENTS · MADRID · MARBELLA · ESTEPONA · MÁLAGA · SOTOGRANDE · CANARY ISLANDS"}
              </span>
            </div>
            <h3 className="mt-2 font-serif text-2xl text-white">
              {es
                ? "¿Busca otra zona o presupuesto en España (€500K a €5M+)?"
                : "Looking for a different Spanish market or budget band (€500K to €5M+)?"}
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-white/75">
              {es
                ? "Comparta su perfil de búsqueda o el de su cliente. Coordinamos una selección personalizada con GILMAR y registramos por escrito la cooperación entre agencias a través de United Realty Group."
                : showAgentTerms
                  ? "Share your client brief. We coordinate a tailored GILMAR shortlist and document the written brokerage-to-brokerage cooperation through United Realty Group before client introduction."
                  : "Share your acquisition criteria. Our team coordinates a tailored GILMAR shortlist and a documented introduction to the GILMAR team in Spain."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <a
              href={es ? `${GILMAR_PORTAL_URL}?lang=es` : GILMAR_PORTAL_URL}
              className="inline-flex items-center justify-center gap-2 bg-gold px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep shadow-lg transition-colors hover:bg-gold-soft"
            >
              {copy.primaryCta.replace(" ↗", "")}
              <ArrowRight size={13} />
            </a>
            <a
              href={copy.secondaryHref}
              className="inline-flex items-center justify-center gap-2 border border-white/25 px-5 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:border-gold hover:text-gold"
            >
              {copy.secondaryCta}
              <ArrowRight size={13} />
            </a>
          </div>
        </div>

        {/* Compliance Disclosure */}
        <div className="mt-5 flex items-start gap-2.5 text-[11px] leading-relaxed text-white/60">
          <ShieldCheck size={15} className="mt-0.5 shrink-0 text-gold" />
          <p>
            {es
              ? "Unidades seleccionadas según información de GILMAR (revisada en noviembre de 2026). Disponibilidad, precios, impuestos y entrega requieren confirmación escrita vigente. Las imágenes son ilustrativas y no muestran las residencias concretas."
              : "Selected units based on GILMAR information (reviewed Nov 2026). Availability, prices, taxes, and delivery require current written confirmation. Images are illustrative and do not depict the specific residences."}
            {showAgentTerms &&
              (es
                ? " Los honorarios de cooperación son negociables, se determinan por operación y nivel de servicio, no se publican en esta página y se documentan fuera del MLS: las condiciones se emiten por escrito tras el registro del cliente y requieren un acuerdo firmado y la aprobación de United Realty Group. El registro no garantiza aceptación ni pago."
                : " Cooperating compensation is negotiable, determined per transaction and level of service, is not published on this page, and is documented outside the MLS: terms are issued in writing after client registration and require a signed agreement and United Realty Group approval. Registration does not guarantee acceptance or payment.")}{" "}
            {CONTACT.licenseDisplay} · {CONTACT.brokerage}.
          </p>
        </div>
      </div>

      {selectedResidence && (
        <GilmarResidenceModal
          residence={selectedResidence}
          variant={variant}
          lang={lang}
          onClose={() => setSelectedResidence(null)}
        />
      )}
    </section>
  );
}
