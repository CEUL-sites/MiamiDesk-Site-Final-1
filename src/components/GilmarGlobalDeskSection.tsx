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
  taxBadgeEn: string;
  taxBadgeEs: string;
  unitLabel: string;
  priceEur: number;
  priceSuffixEn: string;
  priceSuffixEs: string;
  price: string;
  priceNote: string;
  builtSqm: number;
  builtSqft: number;
  outdoorSqm: number;
  outdoorSqft: number;
  bedsBathsEn: string;
  bedsBathsEs: string;
  specs: string;
  terraceSpec: string;
  badgeLabel: string;
  summary: string;
  highlights: string[];
  address: string;
  complianceNote: string;
  image: string;
}

const EUR_TO_USD_RATE = 1.1052;

function fmtUsdApprox(eur: number, es: boolean): string {
  return new Intl.NumberFormat(es ? "es-ES" : "en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(eur * EUR_TO_USD_RATE));
}

export const GILMAR_RESIDENCES: readonly GilmarResidence[] = [
  {
    id: "elysian-fuerteventura",
    code: "01 / SELECTED RESIDENCE",
    name: "The Elysian Collection",
    location: "Caleta de Fuste · Fuerteventura",
    region: "Canary Islands · Spain",
    taxBadgeEn: "IGIC Canary Islands (to confirm)",
    taxBadgeEs: "IGIC Canarias (por confirmar)",
    unitLabel: "Block M · Floor 3B · Unit 69",
    priceEur: 366000,
    priceSuffixEn: "",
    priceSuffixEs: "",
    price: "€366,000",
    priceNote: "Selected-unit price · IGIC treatment to confirm",
    builtSqm: 134,
    builtSqft: 1442,
    outdoorSqm: 63.3,
    outdoorSqft: 681,
    bedsBathsEn: "3 Beds · 2 Baths",
    bedsBathsEs: "3 Dorm. · 2 Baños",
    specs: "3 Bedrooms · 2 Bathrooms · 134 m² Built",
    terraceSpec: "105.75 m² interior living + 63.30 m² across two terraces",
    badgeLabel: "New Development · Canary Islands",
    summary:
      "Elevated 3-bedroom residence facing the Atlantic with two terraces and open island kitchen.",
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
    taxBadgeEn: "IVA Mainland (+ VAT)",
    taxBadgeEs: "IVA Península (+ IVA)",
    unitLabel: "First-Floor Residence · 3 En-Suite Bedrooms",
    priceEur: 1442000,
    priceSuffixEn: "+ VAT",
    priceSuffixEs: "+ IVA",
    price: "€1,442,000 + VAT",
    priceNote: "GILMAR quoted price · Purchase costs additional",
    builtSqm: 205.09,
    builtSqft: 2208,
    outdoorSqm: 27.55,
    outdoorSqft: 297,
    bedsBathsEn: "3 En-Suite + WC",
    bedsBathsEs: "3 Suites + Aseo",
    specs: "3 En-Suite Bedrooms + Guest WC · 205.09 m² Built",
    terraceSpec: "27.55 m² private terrace · 2 underground parking spaces",
    badgeLabel: "Costa del Sol · New Golden Mile",
    summary:
      "First-floor New Golden Mile residence with three en-suite bedrooms, private terrace, and spa access.",
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
    taxBadgeEn: "IVA Mainland (+ VAT)",
    taxBadgeEs: "IVA Península (+ IVA)",
    unitLabel: "Fifth Floor · Unit C · Private Pool",
    priceEur: 1950000,
    priceSuffixEn: "+ VAT",
    priceSuffixEs: "+ IVA",
    price: "€1,950,000 + VAT",
    priceNote: "GILMAR quoted price · Purchase costs additional",
    builtSqm: 120.3,
    builtSqft: 1295,
    outdoorSqm: 186.55,
    outdoorSqft: 2008,
    bedsBathsEn: "2 Beds · 2 Baths",
    bedsBathsEs: "2 Dorm. · 2 Baños",
    specs: "2 Bedrooms · 2 Bathrooms · 120.30 m² Reported Built",
    terraceSpec: "186.55 m² reported outdoor area · Private pool",
    badgeLabel: "Málaga Capital · Prime Coastal",
    summary:
      "El Limonar coastal residence featuring reported private pool, Porcelanosa finishes, and Siemens kitchen.",
    highlights: [
      "186.55 m² reported outdoor area with private pool + 120.30 m² defined built area",
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

const SPAIN_IDX_HUBS = [
  {
    id: "madrid",
    nameEn: "Madrid",
    nameEs: "Madrid",
    count: "1,061",
    subEn: "Salamanca · Chamberí · La Moraleja · Pozuelo",
    subEs: "Salamanca · Chamberí · La Moraleja · Pozuelo",
  },
  {
    id: "costa",
    nameEn: "Costa del Sol",
    nameEs: "Costa del Sol",
    count: "737",
    subEn: "Marbella · Estepona · Benahavís · Málaga",
    subEs: "Marbella · Estepona · Benahavís · Málaga",
  },
  {
    id: "canarias",
    nameEn: "Canary Islands",
    nameEs: "Islas Canarias",
    count: "201",
    subEn: "Tenerife · Gran Canaria · Lanzarote · Fuerteventura",
    subEs: "Tenerife · Gran Canaria · Lanzarote · Fuerteventura",
  },
  {
    id: "andalucia",
    nameEn: "Seville & Cádiz",
    nameEs: "Sevilla y Cádiz",
    count: "23+",
    subEn: "Seville Capital · Aljarafe · Sotogrande · Costa de la Luz",
    subEs: "Sevilla Capital · Aljarafe · Sotogrande · Costa de la Luz",
  },
] as const;

const PIPELINE_NODES = [
  {
    step: "01",
    titleEn: "Florida Agent Registration (GD-Ref)",
    titleEs: "Registro en Florida (GD-Ref)",
    buyerAgencyEn: "Submit Florida license, brokerage email, and client initials to issue your GD-Ref prior to introduction.",
    buyerAgencyEs: "Envíe licencia de Florida, email de su brokerage e iniciales para emitir su GD-Ref.",
    referralEn: "Register license and client initials before introduction to establish written protection.",
    referralEs: "Registre licencia e iniciales del cliente antes de la presentación para proteger su relación.",
  },
  {
    step: "02",
    titleEn: "Written Fee & GILMAR Approval",
    titleEs: "Acuerdo Escrito y Aprobación",
    buyerAgencyEn: "Receive case-by-case written buyer-agency terms approved by GILMAR Spain and your brokerage.",
    buyerAgencyEs: "Reciba condiciones escritas de agencia de comprador aprobadas por GILMAR España y su brokerage.",
    referralEn: "Receive negotiated asset-specific referral terms documented in writing by GILMAR Spain.",
    referralEs: "Reciba honorarios negociados por escrito según el tipo de activo aprobados por GILMAR España.",
  },
  {
    step: "03",
    titleEn: "GILMAR Execution (36 Teams · 10 Languages)",
    titleEs: "Ejecución GILMAR (36 Equipos · 10 Idiomas)",
    buyerAgencyEn: "GILMAR teams handle local showings, Centro Hipotecario, legal, and tax while you represent the buyer.",
    buyerAgencyEs: "Equipos GILMAR ejecutan visitas, hipoteca y asesoría mientras usted representa al comprador.",
    referralEn: "United Realty Group and GILMAR manage local viewings, advisory, and negotiation without travel.",
    referralEs: "United Realty Group y GILMAR gestionan visitas, asesoría y negociación sin necesidad de viajar.",
  },
  {
    step: "04",
    titleEn: "Spanish Notary & Closing",
    titleEs: "Notaría y Cierre en España",
    buyerAgencyEn: "Deed execution before a Spanish notary with GILMAR legal, registry, and after-sales coordination.",
    buyerAgencyEs: "Escritura pública ante notario español con coordinación jurídica, registral y posventa.",
    referralEn: "Transaction closing supervised through public deed execution with full registry checks.",
    referralEs: "Cierre supervisado hasta la firma de escritura pública con verificación registral.",
  },
  {
    step: "05",
    titleEn: "Payout via United Realty Group",
    titleEs: "Pago vía United Realty Group",
    buyerAgencyEn: "GILMAR remits to United Realty Group at closing; URG disburses broker to broker to your brokerage.",
    buyerAgencyEs: "GILMAR liquida a United Realty Group al cierre y URG abona de brokerage a brokerage.",
    referralEn: "United Realty Group disburses the agreed referral fee directly to your brokerage at closing.",
    referralEs: "United Realty Group abona el honorario de referencia acordado a su brokerage al cierre.",
  },
] as const;

export function GilmarGlobalDeskSection({
  variant = "global-desk",
  lang = "en",
}: {
  variant?: GilmarVariant;
  lang?: "en" | "es";
}) {
  const showAgentTerms = variant !== "buyers";
  const [selectedResidence, setSelectedResidence] = useState<GilmarResidence | null>(null);
  const [currencyMode, setCurrencyMode] = useState<"eur" | "usd">("eur");
  const [areaMode, setAreaMode] = useState<"sqm" | "sqft">("sqm");
  const [pipelineMode, setPipelineMode] = useState<"buyer_agency" | "referral">("buyer_agency");
  const [activePipelineNode, setActivePipelineNode] = useState<number>(0);
  const [activeIdxHub, setActiveIdxHub] = useState<string>("madrid");
  const es = lang === "es";

  const selectedIdxHub = SPAIN_IDX_HUBS.find((h) => h.id === activeIdxHub) ?? SPAIN_IDX_HUBS[0];
  const currentPipelineNode = PIPELINE_NODES[activePipelineNode] ?? PIPELINE_NODES[0];

  const copy = {
    "global-desk": {
      eyebrow: es
        ? "ESPAÑA ↔ FLORIDA · MIAMI GLOBAL LISTINGS SERVICE · GILMAR × UNITED REALTY GROUP"
        : "SPAIN ↔ FLORIDA · MIAMI GLOBAL LISTINGS SERVICE · GILMAR × UNITED REALTY GROUP",
      heading: es
        ? "Sus clientes. Más de 2.000 propiedades en España. La experiencia de GILMAR."
        : "Your clients. 2,000+ Spanish properties. GILMAR’s expertise.",
      subtitle: es
        ? "Cooperación documentada entre GILMAR (1983 · 36 equipos · 10 idiomas) y United Realty Group (Florida · 3.500+ agentes)."
        : "Documented bilateral corridor connecting GILMAR (est. 1983 · 36 teams · 10 languages) and United Realty Group (3,500+ FL agents).",
      primaryCta: es ? "Abrir el portal GILMAR × URG ↗" : "Open the GILMAR × URG portal ↗",
      secondaryCta: es ? "Registrar un cliente para España" : "Register a client for Spain",
      secondaryHref: registerTarget("global-desk", es),
    },
    agents: {
      eyebrow: "SPAIN CO-BROKERING & IDX ACCESS DESK · GILMAR × UNITED REALTY GROUP",
      heading: "Have a client exploring Spain? Register them before the introduction.",
      subtitle:
        "You keep the client relationship. GILMAR (36 Spain teams) executes locally while United Realty Group documents brokerage-to-brokerage terms in writing.",
      primaryCta: "Open the GILMAR × URG portal ↗",
      secondaryCta: "Register a client for Spain",
      secondaryHref: "#south-florida-referral",
    },
    buyers: {
      eyebrow: "EXPLORING SPAIN? · GILMAR × UNITED REALTY GROUP BILATERAL DESK",
      heading: "Guided access to 2,000+ residences across Spain with full advisory support.",
      subtitle:
        "Guided access to 2,000+ active Spanish listings backed by GILMAR legal, tax, mortgage, valuation, and after-sales specialists.",
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
            <span>United Realty Group (3,500+ FL Agents · Florida office network)</span>
          </div>
        </div>

        {/* Intro + Animated Pedestal Stats + Live Telemetry Switcher */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
              {copy.heading}
            </h2>
            <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-white/75">
              {copy.subtitle}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="inline-flex border border-white/15 bg-white/[0.04] p-0.5" role="group" aria-label={es ? "Selector de divisa" : "Currency switcher"}>
                <button
                  type="button"
                  onClick={() => setCurrencyMode("eur")}
                  aria-pressed={currencyMode === "eur"}
                  className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${currencyMode === "eur" ? "bg-gold font-bold text-navy-deep" : "text-white/70 hover:text-white"}`}
                >
                  EUR (€)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrencyMode("usd")}
                  aria-pressed={currencyMode === "usd"}
                  className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${currencyMode === "usd" ? "bg-gold font-bold text-navy-deep" : "text-white/70 hover:text-white"}`}
                >
                  {es ? "USD ($ · Ref. BCE)" : "USD ($ · ECB Ref)"}
                </button>
              </div>
              <div className="inline-flex border border-white/15 bg-white/[0.04] p-0.5" role="group" aria-label={es ? "Selector de superficie" : "Area unit switcher"}>
                <button
                  type="button"
                  onClick={() => setAreaMode("sqm")}
                  aria-pressed={areaMode === "sqm"}
                  className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${areaMode === "sqm" ? "bg-gold font-bold text-navy-deep" : "text-white/70 hover:text-white"}`}
                >
                  m²
                </button>
                <button
                  type="button"
                  onClick={() => setAreaMode("sqft")}
                  aria-pressed={areaMode === "sqft"}
                  className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${areaMode === "sqft" ? "bg-gold font-bold text-navy-deep" : "text-white/70 hover:text-white"}`}
                >
                  ft²
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 border border-gold/25 bg-white/[0.03] p-4 lg:col-span-5">
            <div>
              <p className="font-serif text-2xl font-semibold text-gold md:text-3xl">1983</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/65">
                {es ? "Fundación GILMAR" : "GILMAR Founded"}
              </p>
            </div>
            <div className="border-l border-white/10 pl-3">
              <p className="font-serif text-2xl font-semibold text-gold md:text-3xl">36</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/65">
                {es ? "Equipos · 10 Idiomas" : "Teams · 10 Languages"}
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

        {/* 3 Interactive 3D Perspective Residence Cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {GILMAR_RESIDENCES.map((res) => {
            const usdDisplay = fmtUsdApprox(res.priceEur, es);
            const primaryPrice = currencyMode === "usd" ? `${usdDisplay} (${es ? "aprox." : "approx."})` : res.price;
            const secondaryPrice = currencyMode === "usd" ? res.price : `${usdDisplay} (${es ? "aprox." : "approx."})`;
            const builtVal = areaMode === "sqft" ? `${res.builtSqft.toLocaleString()} ft²` : `${res.builtSqm} m²`;
            const outdoorVal = areaMode === "sqft" ? `${res.outdoorSqft.toLocaleString()} ft²` : `${res.outdoorSqm} m²`;

            return (
              <Tilt3D key={res.id} maxTilt={5} className="h-full">
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
                    <div className="absolute right-3 top-3 border border-white/20 bg-navy-deep/85 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/90">
                      {es ? res.taxBadgeEs : res.taxBadgeEn}
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
                      <h3 className="font-serif text-2xl text-white transition-colors group-hover:text-gold">
                        {res.name}
                      </h3>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/60">
                        {res.unitLabel}
                      </p>
                      <p className="mt-3 font-serif text-2xl font-semibold text-gold">
                        {primaryPrice}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/55">
                        {secondaryPrice}
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-2 border border-white/10 bg-white/[0.03] p-2.5">
                        <div>
                          <span className="block font-mono text-[9px] uppercase tracking-[0.12em] text-white/55">
                            {es ? "Construidos" : "Built"}
                          </span>
                          <span className="font-serif text-sm font-semibold text-white">{builtVal}</span>
                        </div>
                        <div className="border-l border-white/10 pl-2">
                          <span className="block font-mono text-[9px] uppercase tracking-[0.12em] text-white/55">
                            {es ? "Exterior" : "Outdoor"}
                          </span>
                          <span className="font-serif text-sm font-semibold text-white">{outdoorVal}</span>
                        </div>
                      </div>
                      <p className="mt-3 font-sans text-xs leading-relaxed text-white/75">
                        {res.summary}
                      </p>
                    </div>

                    <div className="mt-5 border-t border-white/10 pt-3.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/65">
                          {es ? res.bedsBathsEs : res.bedsBathsEn} · {res.region}
                        </span>
                        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
                          {es ? "Ver ficha →" : "Unit details →"}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </Tilt3D>
            );
          })}
        </div>

        {/* Interactive 5-Stage 3D Deal-Flow Pipeline */}
        {showAgentTerms && (
          <div className="mt-10 border border-white/15 bg-white/[0.03] p-6 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                  {AGENT_TERMS.steps.eyebrow[lang]}
                </p>
                <h3 className="mt-2 font-serif text-2xl text-white md:text-3xl">
                  {AGENT_TERMS.steps.heading[lang]}{" "}
                  <em className="text-gold">{AGENT_TERMS.steps.payoff[lang]}</em>
                </h3>
              </div>

              <div className="inline-flex border border-gold/40 bg-navy-deep p-0.5" role="group" aria-label={es ? "Modalidad" : "Cooperation mode"}>
                <button
                  type="button"
                  onClick={() => setPipelineMode("buyer_agency")}
                  aria-pressed={pipelineMode === "buyer_agency"}
                  className={`px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${pipelineMode === "buyer_agency" ? "bg-gold font-bold text-navy-deep" : "text-white/70 hover:text-white"}`}
                >
                  {es ? "Agencia de comprador" : "Buyer Agency"}
                </button>
                <button
                  type="button"
                  onClick={() => setPipelineMode("referral")}
                  aria-pressed={pipelineMode === "referral"}
                  className={`px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${pipelineMode === "referral" ? "bg-gold font-bold text-navy-deep" : "text-white/70 hover:text-white"}`}
                >
                  {es ? "Solo referencia" : "Referral Only"}
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" role="tablist">
              {PIPELINE_NODES.map((node, idx) => {
                const selected = activePipelineNode === idx;
                return (
                  <button
                    key={node.step}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActivePipelineNode(idx)}
                    className={`flex flex-col border p-4 text-left transition-all ${
                      selected
                        ? "border-gold bg-gold/15 shadow-[0_8px_24px_rgba(201,168,76,0.18)]"
                        : "border-white/15 bg-navy/60 hover:border-gold/45"
                    }`}
                  >
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                      {node.step}
                    </span>
                    <span className="mt-1.5 font-serif text-sm font-semibold text-white">
                      {es ? node.titleEs : node.titleEn}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border border-gold/30 bg-navy-deep/90 p-5">
              <div className="max-w-2xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                  {es ? `Etapa ${currentPipelineNode.step}` : `Stage ${currentPipelineNode.step}`} ·{" "}
                  {pipelineMode === "buyer_agency"
                    ? es ? "Agencia de comprador hasta el cierre" : "Buyer Agency Through Closing"
                    : es ? "Solo referencia" : "Referral Only"}
                </p>
                <p className="mt-1.5 font-sans text-sm text-white/85">
                  {pipelineMode === "buyer_agency"
                    ? es ? currentPipelineNode.buyerAgencyEs : currentPipelineNode.buyerAgencyEn
                    : es ? currentPipelineNode.referralEs : currentPipelineNode.referralEn}
                </p>
              </div>

              <a
                href={registerTarget(variant, es)}
                className="inline-flex items-center justify-center gap-2 bg-gold px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:bg-gold-soft"
              >
                {es ? "Registrar un cliente y recibir las condiciones" : "Register a client and receive the written terms"}
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        )}

        {/* Interactive 3D Spain Regional IDX Selector */}
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
            <div className="flex flex-wrap gap-2">
              {SPAIN_IDX_HUBS.map((hub) => {
                const active = hub.id === activeIdxHub;
                return (
                  <button
                    key={hub.id}
                    type="button"
                    onClick={() => setActiveIdxHub(hub.id)}
                    aria-pressed={active}
                    className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                      active
                        ? "border-gold bg-gold font-bold text-navy-deep"
                        : "border-white/20 bg-navy/70 text-white/80 hover:border-gold/50"
                    }`}
                  >
                    {es ? hub.nameEs : hub.nameEn} · {hub.count}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-6 border-t border-white/10 pt-5 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                {es ? selectedIdxHub.nameEs : selectedIdxHub.nameEn}
              </p>
              <div className="mt-1 flex items-baseline gap-4">
                <span className="font-serif text-4xl font-semibold text-white">{selectedIdxHub.count}</span>
                <span className="font-sans text-sm text-white/75">
                  {es ? selectedIdxHub.subEs : selectedIdxHub.subEn}
                </span>
              </div>
            </div>
            <div className="md:col-span-4 md:text-right">
              <a
                href={copy.secondaryHref}
                className="inline-flex items-center gap-2 bg-gold px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-navy-deep hover:bg-gold-soft"
              >
                {es ? "Desbloquear IDX" : "Unlock IDX Feed"}
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* 3D Tilt GILMAR Integral Advisory Pillars */}
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
              <Tilt3D key={pillar.titleEn} maxTilt={4} className="h-full">
                <div className="h-full border border-white/15 bg-white/[0.03] p-4 transition-colors hover:border-gold/50">
                  <h4 className="font-serif text-base text-gold">
                    {es ? pillar.titleEs : pillar.titleEn}
                  </h4>
                  <p className="mt-2 font-sans text-xs leading-relaxed text-white/70">
                    {es ? pillar.bodyEs : pillar.bodyEn}
                  </p>
                </div>
              </Tilt3D>
            ))}
          </div>
        </div>

        {/* Portal Launch Bar */}
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

        {/* Progressive Disclosure Compliance Disclosure */}
        <details className="mt-5 border border-white/15 bg-white/[0.03] px-4 py-3 text-[11px] leading-relaxed text-white/65">
          <summary className="flex cursor-pointer items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
            <ShieldCheck size={14} className="shrink-0 text-gold" />
            <span>
              {es
                ? "Divulgaciones regulatorias, fuente de unidades y cooperación fuera del MLS"
                : "Regulatory disclosures, unit source & non-MLS cooperation caveats"}
            </span>
          </summary>
          <p className="mt-3">
            {es
              ? "Unidades seleccionadas según información de GILMAR (revisada en noviembre de 2026). Disponibilidad, precios, impuestos y entrega requieren confirmación escrita vigente. Las imágenes son ilustrativas y no muestran las residencias concretas."
              : "Selected units based on GILMAR information (reviewed Nov 2026). Availability, prices, taxes, and delivery require current written confirmation. Images are illustrative and do not depict the specific residences."}
            {showAgentTerms &&
              (es
                ? " Los honorarios de cooperación son negociables, se determinan por operación y nivel de servicio, no se publican en esta página y se documentan fuera del MLS: las condiciones se emiten por escrito tras el registro del cliente y requieren un acuerdo firmado y la aprobación de United Realty Group. El registro no garantiza aceptación ni pago."
                : " Cooperating compensation is negotiable, determined per transaction and level of service, is not published on this page, and is documented outside the MLS: terms are issued in writing after client registration and require a signed agreement and United Realty Group approval. Registration does not guarantee acceptance or payment.")}{" "}
            {CONTACT.licenseDisplay} · {CONTACT.brokerage}.
          </p>
        </details>
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
