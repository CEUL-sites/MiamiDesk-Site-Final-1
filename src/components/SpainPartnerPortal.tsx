import { ArrowRight, BadgeCheck, Building2, Landmark, Lock, Scale, ShieldCheck } from "lucide-react";
import { CONTACT } from "../constants";
import { GILMAR_PORTAL_URL } from "./GilmarGlobalDeskSection";

/**
 * Global Desk → Spain Partner Portal.
 *
 * A compact gateway, not a showcase. The residences, IDX selector, deal-flow
 * pipeline and advisory pillars live on the GILMAR landing page (/gilmar-spain);
 * this block only establishes the partner and sends the visitor there.
 *
 * The portal is multi-partner by design. GILMAR is the founding partner. The
 * open slots deliberately name no other company: compliance rule 8 bars naming
 * a Spanish agency without a signed cooperation agreement on file. Add a
 * partner here only once that agreement exists.
 *
 * Compensation gating: no rate, percentage or amount appears here.
 */

type Lang = "en" | "es";

const GILMAR_STATS = [
  { value: "1983", en: "Founded", es: "Fundación" },
  { value: "36", en: "Teams", es: "Equipos" },
  { value: "10", en: "Languages", es: "Idiomas" },
  { value: "2,000+", en: "Spain listings", es: "Propiedades" },
] as const;

const GILMAR_SAFEGUARDS = [
  {
    icon: Scale,
    en: "Registry title and charge verification, contract review and notary coordination",
    es: "Verificación registral y de cargas, revisión de contratos y coordinación notarial",
  },
  {
    icon: Landmark,
    en: "Official valuations through THIRSA, homologated by the Bank of Spain",
    es: "Tasaciones oficiales a través de THIRSA, homologada por el Banco de España",
  },
  {
    icon: Building2,
    en: "In-house mortgage desk (Centro Hipotecario) for resident and international buyers",
    es: "Centro Hipotecario propio para compradores residentes e internacionales",
  },
  {
    icon: ShieldCheck,
    en: "Referral terms written per case and paid through United Realty Group to your brokerage",
    es: "Condiciones escritas por operación, abonadas vía United Realty Group a su brokerage",
  },
] as const;

const PARTNER_SLOTS = [
  {
    en: ["New-development partners", "Spanish developers admitted by signed cooperation agreement."],
    es: ["Promotoras asociadas", "Promotoras españolas admitidas mediante acuerdo de cooperación firmado."],
  },
  {
    en: ["Regional agency partners", "Local agencies in markets outside the founding partner's coverage."],
    es: ["Agencias regionales asociadas", "Agencias locales en mercados fuera de la cobertura del socio fundador."],
  },
] as const;

export function SpainPartnerPortal({ lang = "en" }: { lang?: Lang }) {
  const es = lang === "es";
  const gilmarHref = es ? `${GILMAR_PORTAL_URL}?lang=es` : GILMAR_PORTAL_URL;
  const registerHref = es ? "/es/agentes#referral-form" : "/agents#south-florida-referral";

  return (
    <section
      id="gilmar-global-desk"
      aria-labelledby="spain-partner-portal-heading"
      className="relative scroll-mt-20 overflow-hidden border-y border-gold/25 bg-[#071526] py-16 text-white md:py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Portal header */}
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-gold">
            {es ? "PORTAL DE SOCIOS EN ESPAÑA · ESPAÑA ↔ FLORIDA" : "SPAIN PARTNER PORTAL · SPAIN ↔ FLORIDA"}
          </p>
          <h2
            id="spain-partner-portal-heading"
            className="mt-4 text-balance font-serif text-3xl leading-tight text-white md:text-5xl"
          >
            {es
              ? "España, a través de socios que responden por escrito."
              : "Spain, through partners who answer in writing."}
          </h2>
          <p className="mt-5 font-sans text-base leading-relaxed text-white/75 md:text-lg">
            {es
              ? "Cada promotora y agencia del portal opera bajo un acuerdo de cooperación firmado con United Realty Group. Su comprador recibe ejecución local en España; su relación y su honorario quedan documentados antes de la primera presentación."
              : "Every developer and agency in the portal works under a signed cooperation agreement with United Realty Group. Your buyer gets local execution in Spain; your relationship and your fee are documented before the first introduction."}
          </p>
        </div>

        {/* Founding partner — GILMAR */}
        <article className="relative mt-10 overflow-hidden border border-gold/40 bg-navy-deep shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
          <img
            src="/images/gilmar/balcon-terrace.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            width="1159"
            height="820"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#06111F] via-[#06111F]/92 to-[#06111F]/70" />

          <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 bg-gold px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-navy-deep">
                  <BadgeCheck size={12} aria-hidden="true" />
                  {es ? "Socio fundador" : "Founding partner"}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
                  Madrid · Costa del Sol · {es ? "Sevilla" : "Seville"} · {es ? "Canarias" : "Canary Islands"}
                </span>
              </div>

              <div className="mt-6 inline-flex items-center gap-4 bg-white px-4 py-2.5">
                <img
                  src="/images/gilmar/gilmar-consulting-horizontal.png"
                  alt="GILMAR Consulting Inmobiliario"
                  width="120"
                  height="43"
                  loading="lazy"
                  className="h-8 w-auto object-contain"
                />
                <span className="font-serif text-lg text-navy-deep" aria-hidden="true">×</span>
                <img
                  src="/images/urg-logo-original.webp"
                  alt="United Realty Group"
                  width="110"
                  height="35"
                  loading="lazy"
                  className="h-7 w-auto object-contain"
                />
              </div>

              <h3 className="mt-6 font-serif text-2xl leading-snug text-white md:text-3xl">
                {es
                  ? "Cuatro décadas de práctica en España, con servicios jurídicos, hipotecarios y de tasación propios."
                  : "Four decades of practice in Spain, with legal, mortgage and valuation services in house."}
              </h3>

              <dl className="mt-6 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
                {GILMAR_STATS.map((stat) => (
                  <div key={stat.value} className="bg-[#071526]/90 px-4 py-3">
                    <dt className="sr-only">{es ? stat.es : stat.en}</dt>
                    <dd className="font-serif text-2xl font-semibold text-gold md:text-3xl">{stat.value}</dd>
                    <dd className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/60" aria-hidden="true">
                      {es ? stat.es : stat.en}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">
                {es ? "Fuente: información de GILMAR, revisada nov. 2026" : "Source: GILMAR information, reviewed Nov 2026"}
              </p>
            </div>

            <div className="flex flex-col justify-between gap-6 lg:col-span-5">
              <ul className="space-y-3.5">
                {GILMAR_SAFEGUARDS.map(({ icon: Icon, en, es: esText }) => (
                  <li key={en} className="flex items-start gap-3 font-sans text-sm leading-relaxed text-white/80">
                    <Icon size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                    <span>{es ? esText : en}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <a
                  href={gilmarHref}
                  className="inline-flex items-center justify-between gap-3 bg-gold px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-navy-deep shadow-lg transition-colors hover:bg-gold-soft"
                >
                  {es ? "Ver residencias y catálogo GILMAR" : "View GILMAR residences & portfolio"}
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
                <a
                  href={registerHref}
                  className="inline-flex items-center justify-between gap-3 border border-white/25 px-6 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-white transition-colors hover:border-gold hover:text-gold"
                >
                  {es ? "Registrar un cliente para España" : "Register a client for Spain"}
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </article>

        {/* Additional partner slots — no company named until an agreement is signed */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {PARTNER_SLOTS.map((slot) => {
            const [title, body] = es ? slot.es : slot.en;
            return (
              <div key={slot.en[0]} className="flex items-start gap-4 border border-dashed border-white/20 bg-white/[0.02] p-5">
                <Lock size={16} className="mt-1 shrink-0 text-gold/70" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/80">
                    {es ? "Admisión por acuerdo escrito" : "Admitted by written agreement"}
                  </p>
                  <p className="mt-1.5 font-serif text-lg text-white">{title}</p>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-white/60">{body}</p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 max-w-4xl font-sans text-[11px] leading-relaxed text-white/50">
          {es
            ? "Los socios del portal se incorporan solo tras un acuerdo de cooperación firmado y la aprobación de United Realty Group. Disponibilidad, precios e impuestos en España requieren confirmación escrita vigente. Las condiciones de cooperación se emiten por escrito tras el registro del cliente, se documentan fuera del MLS y no garantizan aceptación, venta ni pago. "
            : "Portal partners are added only after a signed cooperation agreement and United Realty Group approval. Spanish availability, pricing and taxes require current written confirmation. Cooperation terms are issued in writing after client registration, are documented outside the MLS, and do not guarantee acceptance, a sale or payment. "}
          {CONTACT.licenseDisplay} · {CONTACT.brokerage}.
        </p>
      </div>
    </section>
  );
}
