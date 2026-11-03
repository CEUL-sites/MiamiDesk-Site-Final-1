import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, ExternalLink, Globe2, ShieldCheck, Sparkles, X } from "lucide-react";
import { Tilt3D } from "./Tilt3D";
import { CONTACT } from "../constants";

export const GILMAR_PORTAL_URL = "https://gilmar-urg-global-desk.ucarlos.chatgpt.site";

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
  commission: string;
  summary: string;
  highlights: string[];
  address: string;
  complianceNote: string;
  image: string;
}

export const GILMAR_RESIDENCES: readonly GilmarResidence[] = [
  {
    id: "elysian-fuerteventura",
    code: "01 / AGENT KIT",
    name: "The Elysian Collection",
    location: "Caleta de Fuste · Fuerteventura",
    region: "Canary Islands · Spain",
    unitLabel: "Block M · Floor 3B · Unit 69",
    price: "€366,000",
    priceNote: "Selected-unit price · Tax treatment to confirm",
    specs: "3 Bedrooms · 2 Bathrooms · 134 m² Built",
    terraceSpec: "105.75 m² interior living + 63.30 m² across two terraces",
    commission: "4% Buyer-Agent Commission",
    summary:
      "An elevated three-bedroom residence with two terraces, views toward the Atlantic and Caleta de Fuste, and an open living, dining, and kitchen area with an island.",
    highlights: [
      "105.75 m² interior living space + 63.30 m² across two terraces",
      "One en-suite bathroom · Private parking included · Communal pool",
      "4% buyer-agent commission of sale price (handled between brokerages; subject to written agreement & URG approval)",
    ],
    address: "Urbanización Castillo 3, Fase P, número 1 · Caleta de Fuste, Fuerteventura, Canary Islands, Spain",
    complianceNote:
      "GILMAR identifies Block M, Floor 3B, Unit 69. Current availability, delivery, unit plan, and whether the quoted price includes IGIC require written confirmation.",
    image: "/images/global-desk-panorama-desktop.webp",
  },
  {
    id: "balcon-estepona",
    code: "02 / AGENT KIT",
    name: "Balcón del Mediterráneo",
    location: "Selwo · Estepona",
    region: "Costa del Sol · Spain",
    unitLabel: "First-Floor Residence · 3 En-Suite Bedrooms",
    price: "€1,442,000 + VAT",
    priceNote: "GILMAR quoted price · Purchase costs additional",
    specs: "3 En-Suite Bedrooms + Guest WC · 205.09 m² Built",
    terraceSpec: "27.55 m² private terrace · 2 underground parking spaces",
    commission: "4% Buyer-Agent Commission",
    summary:
      "A first-floor residence in Selwo on Estepona’s New Golden Mile. Three en-suite bedrooms and a separate guest toilet accompany generous living and dining areas and a private terrace.",
    highlights: [
      "27.55 m² private terrace + two underground parking spaces & storage room",
      "Communal pools, wellness and spa facilities, gym, and landscaped gardens",
      "4% buyer-agent commission of sale price (handled between brokerages; subject to written agreement & URG approval)",
    ],
    address: "Urbanización Balcón del Mediterráneo, Calle El Burgo, s/n · 29680 Estepona, Málaga, Spain",
    complianceNote:
      "Exact block, staircase, unit code, plan, and delivery are awaiting confirmation. The price excludes VAT and other purchase costs; request a current written quotation.",
    image: "/images/global-desk-hero-madrid-v2.webp",
  },
  {
    id: "be-grand-malaga",
    code: "03 / AGENT KIT",
    name: "Be Grand El Limonar",
    location: "Muelle Uno · El Limonar",
    region: "Málaga · Spain",
    unitLabel: "Fifth Floor · Unit C · Private Pool",
    price: "€1,950,000 + VAT",
    priceNote: "GILMAR quoted price · Purchase costs additional",
    specs: "2 Bedrooms · 2 Bathrooms · 120.30 m² Reported Built",
    terraceSpec: "186.55 m² reported outdoor area · Private pool",
    commission: "4% Buyer-Agent Commission",
    summary:
      "A two-bedroom residence in El Limonar with an open living, dining, and kitchen area. GILMAR reports private outdoor space and a private pool, with Porcelanosa finishes and Siemens kitchen appliances.",
    highlights: [
      "186.55 m² reported outdoor area with private pool + 93.05 m² enclosed built",
      "Shared pools, sea-view chill-out areas, and fitness center · Est. completion end of 2027",
      "4% buyer-agent commission of sale price (handled between brokerages; subject to written agreement & URG approval)",
    ],
    address: "Calle Ramal de Monte Sancha, 28 · El Limonar, Málaga, Spain",
    complianceNote:
      "Confirm the fifth-floor designation, private outdoor layout, exact plan, area definitions, delivery, and availability in writing.",
    image: "/images/madrid-gran-via-editorial.webp",
  },
];

function GilmarResidenceModal({
  residence,
  onClose,
}: {
  residence: GilmarResidence;
  onClose: () => void;
}) {
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
              {residence.commission}
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
              Location &amp; Brokerage Protocol
            </p>
            <p className="mt-1 font-sans text-xs text-white/75">{residence.address}</p>
            <p className="mt-2 font-sans text-[11px] leading-relaxed text-white/60">
              {residence.complianceNote} Buyer-agent commission: 4% of the sale price, handled between brokerages. Compensation is negotiable; eligibility, calculation basis, and payment require a written agreement and United Realty Group approval.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={GILMAR_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 bg-gold px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:bg-gold-soft"
            >
              Open in GILMAR × URG Portal
              <ExternalLink size={13} />
            </a>
            <a
              href="/contact?desk=global"
              onClick={onClose}
              className="inline-flex items-center justify-center border border-white/25 px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:border-gold hover:text-gold"
            >
              Request Agent Kit / Shortlist
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
  variant?: "global-desk" | "agents" | "buyers";
  lang?: "en" | "es";
}) {
  const [selectedResidence, setSelectedResidence] = useState<GilmarResidence | null>(null);
  const es = lang === "es";

  const copy = {
    "global-desk": {
      eyebrow: es
        ? "ESPAÑA ↔ FLORIDA · MIAMI GLOBAL LISTINGS SERVICE · GILMAR × UNITED REALTY GROUP"
        : "SPAIN ↔ FLORIDA · MIAMI GLOBAL LISTINGS SERVICE · GILMAR × UNITED REALTY GROUP",
      heading: es
        ? "Sus clientes. Las propiedades de España. La experiencia de GILMAR."
        : "Your Clients. Spain’s Properties. GILMAR’s Expertise.",
      subtitle: es
        ? "Cooperación documentada entre GILMAR Real Estate (establecida en 1983 · 36 equipos comerciales en España · 10 idiomas) y United Realty Group (Florida · 3.500+ agentes). Explore tres residencias seleccionadas en Fuerteventura, Estepona y Málaga o solicite una selección personalizada en Madrid y Costa del Sol."
        : "Documented cooperation between GILMAR Real Estate (established 1983 · 36 commercial teams across Spain · 10 service languages) and United Realty Group (Florida · 3,500+ agents). Explore three selected residences across Fuerteventura, Estepona, and Málaga—or request a tailored GILMAR shortlist in Madrid and Costa del Sol.",
      primaryCta: es ? "Abrir Portal GILMAR × URG ↗" : "Launch GILMAR × URG Global Portal ↗",
      secondaryCta: es ? "Tengo un Cliente para España" : "I Have a Client · Coordinate Introduction",
      secondaryHref: "#listing-request",
    },
    agents: {
      eyebrow: "SPAIN CO-BROKERING & REFERRAL DESK · GILMAR × UNITED REALTY GROUP",
      heading: "Have a Client Exploring Spain? Earn 4% Buyer-Agent Commission on Selected GILMAR Residences.",
      subtitle:
        "You bring the client relationship; GILMAR (est. 1983 · 36 commercial teams across Spain) handles local viewings and closing in Spain while Carlos Uzcategui and United Realty Group coordinate written brokerage-to-brokerage protection so your name and brokerage stay identified from day one.",
      primaryCta: "I Have a Client — Open GILMAR × URG Desk ↗",
      secondaryCta: "Register a Spain Referral Below",
      secondaryHref: "#south-florida-referral",
    },
    buyers: {
      eyebrow: "EXPLORING SPAIN? · GILMAR × UNITED REALTY GROUP BILATERAL DESK",
      heading: "Acquiring a Second Home, Investment, or Relocation Residence in Spain.",
      subtitle:
        "Through our bilateral cooperation with GILMAR Real Estate (Spain’s premier real estate group since 1983, with 36 commercial teams across Madrid, Marbella, Estepona, Málaga, Sevilla, and the Canary Islands), we coordinate curated Spanish property shortlists and private introductions from our Florida desk.",
      primaryCta: "Explore GILMAR × URG Spain Portfolio ↗",
      secondaryCta: "Request a Tailored Spain Shortlist",
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
            <Sparkles size={12} />
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
                GILMAR Founded
              </p>
            </div>
            <div className="border-l border-white/10 pl-3">
              <p className="font-serif text-2xl font-semibold text-gold md:text-3xl">36</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/65">
                Teams in Spain
              </p>
            </div>
            <div className="border-l border-white/10 pl-3">
              <p className="font-serif text-2xl font-semibold text-gold md:text-3xl">4%</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/65">
                Selected Co-Broke
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
                    {res.commission}
                  </div>
                  <div className="absolute right-3 top-3 border border-white/20 bg-navy-deep/85 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-white/90">
                    {res.code}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
                      {res.location}
                    </span>
                    <span className="border border-gold/40 bg-navy-deep/90 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-gold opacity-0 transition-opacity group-hover:opacity-100">
                      Inspect Brief →
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-2xl text-white group-hover:text-gold transition-colors">
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
                        {es ? "Ver Ficha + Kit →" : "Unit Details & Kit →"}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </Tilt3D>
          ))}
        </div>

        {/* Beyond the 3 Developments: Tailored Shortlist & Portal Launch Bar */}
        <div className="mt-10 grid gap-6 border border-gold/30 bg-white/[0.04] p-6 sm:p-8 lg:grid-cols-12 lg:items-center">
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
                : "Looking for a Different Spanish Market or Budget Band (€500K to €5M+)?"}
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-white/75">
              {es
                ? "Comparta su perfil de búsqueda o el de su cliente. Coordinamos una selección personalizada con GILMAR y registramos por escrito la cooperación entre agencias a través de United Realty Group."
                : "Share your client brief or acquisition criteria. We coordinate a tailored GILMAR shortlist and document the written brokerage-to-brokerage cooperation through United Realty Group before client introduction."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <a
              href={GILMAR_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gold px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep shadow-lg transition-colors hover:bg-gold-soft"
            >
              {copy.primaryCta}
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
            Selected units based on GILMAR information (reviewed Nov 2026). Availability, prices, taxes, and delivery require current written confirmation. Buyer-agent commission of 4% of the sale price is handled between brokerages and documented outside the MLS; eligibility, calculation basis, and payment require a signed written agreement and United Realty Group approval. {CONTACT.licenseDisplay} · {CONTACT.brokerage}.
          </p>
        </div>
      </div>

      {selectedResidence && (
        <GilmarResidenceModal
          residence={selectedResidence}
          onClose={() => setSelectedResidence(null)}
        />
      )}
    </section>
  );
}
