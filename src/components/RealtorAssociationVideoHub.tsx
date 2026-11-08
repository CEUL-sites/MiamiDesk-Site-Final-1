import { useState } from "react";
import { ArrowRight, BadgeCheck, ExternalLink, Film, Globe2, Handshake, ShieldCheck, Tv } from "lucide-react";

type Variant = "agents" | "buyers" | "global-desk";

interface ChannelItem {
  id: string;
  tabLabelEn: string;
  tabLabelEs: string;
  badgeEn: string;
  badgeEs: string;
  titleEn: string;
  titleEs: string;
  summaryEn: string;
  summaryEs: string;
  videoSrc: string;
  posterSrc: string;
  metrics: readonly { value: string; labelEn: string; labelEs: string }[];
  externalLinks: readonly { labelEn: string; labelEs: string; href: string }[];
}

const CHANNELS: readonly ChannelItem[] = [
  {
    id: "perfect-strangers",
    tabLabelEn: "01 · Only a REALTOR®",
    tabLabelEs: "01 · Only a REALTOR®",
    badgeEn: "MIAMI REALTORS® + RWorld Campaign · Perfect Strangers",
    badgeEs: "Campaña MIAMI REALTORS® + RWorld · Perfect Strangers",
    titleEn: "Perfect Strangers Become Coordinated Closings Through the 93,000-Agent Network.",
    titleEs: "Desconocidos se convierten en cierres coordinados a través de la red de 93,000 agentes.",
    summaryEn:
      "In South Florida, over 90% of residential transactions close through cooperating buyer and seller agents working inside the MLS ecosystem—connecting two sides who never met before.",
    summaryEs:
      "En el sur de Florida, más del 90% de las operaciones residenciales se cierran mediante agentes colaboradores dentro del ecosistema MLS—conectando a compradores y vendedores con seguridad contractual.",
    videoSrc: "/videos/only_a_realtor_perfect_strangers.mp4",
    posterSrc: "/images/posters/miami_realtor_association.jpg",
    metrics: [
      { value: "93,000", labelEn: "MIAMI REALTORS® Members", labelEs: "Miembros MIAMI REALTORS®" },
      { value: ">90%", labelEn: "Cooperating Agent Closings", labelEs: "Cierres entre Agentes" },
      { value: "25 Yrs", labelEn: "Licensed FL Principal", labelEs: "Licencia FL desde 2001" },
    ],
    externalLinks: [
      {
        labelEn: "RWorld Videos: Box of Memories ↗",
        labelEs: "RWorld Videos: Box of Memories ↗",
        href: "https://rworldvideos.com/programs/box-of-memories?utm_source=product&utm_medium=share&utm_campaign=content_share&utm_term=2362789&utm_content=copy",
      },
      {
        labelEn: "NAR Campaign Spot · Chair (0:15) ↗",
        labelEs: "Spot REALTOR® · Chair (0:15) ↗",
        href: "https://www.youtube.com/watch?v=z71JEYcLC7o",
      },
    ],
  },
  {
    id: "box-of-memories",
    tabLabelEn: "02 · Buyer Advocacy",
    tabLabelEs: "02 · Defensa del Comprador",
    badgeEn: "RWorld Videos · Box of Memories & That's Who We R®",
    badgeEs: "RWorld Videos · Box of Memories y Representación",
    titleEn: "Every Inspection, Reserve Study & Contract Term Underwritten Before You Sign.",
    titleEs: "Cada inspección, reserva de condominio y cláusula revisada antes de firmar.",
    summaryEn:
      "Algorithms show photos; a licensed REALTOR® underwrites roof age, impact glass, condo milestone reserves, flood zones, and appraisal comparables across Miami-Dade, Broward, and Palm Beach.",
    summaryEs:
      "Los portales muestran fotos; un REALTOR® con licencia evalúa reservas de condominio, seguros, zonas de inundación y comparables reales en Miami-Dade, Broward y Palm Beach.",
    videoSrc: "/videos/luxury_home_walkthrough.mp4",
    posterSrc: "/images/posters/luxury_home_walkthrough.jpg",
    metrics: [
      { value: "3,500+", labelEn: "URG Florida Agents", labelEs: "Agentes URG en Florida" },
      { value: "19", labelEn: "FL Office Locations", labelEs: "Ubicaciones en Florida" },
      { value: "CLHMS", labelEn: "Luxury Specialist", labelEs: "Especialista CLHMS" },
    ],
    externalLinks: [
      {
        labelEn: "Watch 'Box of Memories' on RWorld ↗",
        labelEs: "Ver 'Box of Memories' en RWorld ↗",
        href: "https://rworldvideos.com/programs/box-of-memories?utm_source=product&utm_medium=share&utm_campaign=content_share&utm_term=2362789&utm_content=copy",
      },
      {
        labelEn: "NAR Campaign Spot · Donut (0:15) ↗",
        labelEs: "Spot REALTOR® · Donut (0:15) ↗",
        href: "https://www.youtube.com/watch?v=JDjhs9hF9f0",
      },
      {
        labelEn: "NAR Campaign Spot · Dog (0:15) ↗",
        labelEs: "Spot REALTOR® · Dog (0:15) ↗",
        href: "https://www.youtube.com/watch?v=icZrgxe8K5I",
      },
    ],
  },
  {
    id: "miami-rankings",
    tabLabelEn: "03 · Miami in the Rankings",
    tabLabelEs: "03 · Miami en los Rankings",
    badgeEn: "MIAMI Association of REALTORS® · Global Market Standing",
    badgeEs: "MIAMI Association of REALTORS® · Posicionamiento Global",
    titleEn: "#1 U.S. Destination for International Capital & Global Buyer Corridors.",
    titleEs: "Mercado nº 1 en EE. UU. para capital internacional y compradores globales.",
    summaryEn:
      "Backed by 260+ U.S. MLS boards via RPR and 200+ global consumer portals in 19 languages, Miami and South Florida connect domestic wealth migration with European and Latin American capital.",
    summaryEs:
      "Respaldado por más de 260 MLS de EE. UU. vía RPR y más de 200 portales globales en 19 idiomas, el sur de Florida conecta la migración patrimonial de EE. UU. con capital europeo y latinoamericano.",
    videoSrc: "/videos/miami_realtor_association.mp4",
    posterSrc: "/images/posters/miami_realtor_association.jpg",
    metrics: [
      { value: "260+", labelEn: "U.S. MLSs via RPR", labelEs: "MLS de EE. UU. vía RPR" },
      { value: "200+", labelEn: "Global Portals (19 Langs)", labelEs: "Portales (19 Idiomas)" },
      { value: "#1", labelEn: "U.S. Int'l Buyer Share", labelEs: "Mercado Internacional EE. UU." },
    ],
    externalLinks: [
      {
        labelEn: "Miami in the Rankings (YouTube 4:52) ↗",
        labelEs: "Miami in the Rankings (YouTube 4:52) ↗",
        href: "https://www.youtube.com/watch?v=0OmztZur7pw",
      },
      {
        labelEn: "Association Broadcast Archive ↗",
        labelEs: "Archivo Audiovisual de la Asociación ↗",
        href: "https://www.youtube.com/watch?v=wrKmN-d8WTk",
      },
    ],
  },
  {
    id: "global-bridge",
    tabLabelEn: "04 · 437+ Global Partners",
    tabLabelEs: "04 · 437+ Socios Globales",
    badgeEn: "Bilateral MLS Syndication · Spain, LATAM & South Florida",
    badgeEs: "Sindicación Bilateral MLS · España, LATAM y Sur de Florida",
    titleEn: "Your Local Mandate Protected. Activated Across 437+ International Partner Associations.",
    titleEs: "Su mandato local protegido. Activado ante más de 437 asociaciones internacionales.",
    summaryEn:
      "Originating agencies in Madrid, Marbella, and Latin America keep their local client mandate while Carlos activates U.S. MLS visibility as the Florida-licensed principal of record (SL705771).",
    summaryEs:
      "Las agencias de origen en Madrid, Marbella y Latinoamérica conservan su mandato local mientras Carlos activa la exposición en el MLS de EE. UU. como principal licenciado en Florida (SL705771).",
    videoSrc: "/videos/split_miami_spain_mls.mp4",
    posterSrc: "/images/posters/split_miami_spain_mls.jpg",
    metrics: [
      { value: "437+", labelEn: "International Agreements", labelEs: "Acuerdos Internacionales" },
      { value: "11", labelEn: "Direct MLS Data Exchanges", labelEs: "Intercambios Directos MLS" },
      { value: "EN / ES", labelEn: "Bilateral Desk Execution", labelEs: "Ejecución Bilateral" },
    ],
    externalLinks: [
      {
        labelEn: "Florida Realtors® Global Network ↗",
        labelEs: "Red Global de Florida Realtors® ↗",
        href: "https://www.floridarealtors.org/global",
      },
      {
        labelEn: "RWorld Videos: Box of Memories ↗",
        labelEs: "RWorld Videos: Box of Memories ↗",
        href: "https://rworldvideos.com/programs/box-of-memories?utm_source=product&utm_medium=share&utm_campaign=content_share&utm_term=2362789&utm_content=copy",
      },
    ],
  },
] as const;

const HEADER_COPY: Record<
  Variant,
  {
    eyebrowEn: string;
    eyebrowEs: string;
    headingEn: string;
    headingEs: string;
    subEn: string;
    subEs: string;
    ctaLabelEn: string;
    ctaLabelEs: string;
    ctaHref: string;
  }
> = {
  agents: {
    eyebrowEn: "MIAMI REALTORS® + RWorld · Broadcast & Campaign Reel",
    eyebrowEs: "MIAMI REALTORS® + RWorld · Presentación Audiovisual",
    headingEn: "Why the 93,000-Agent REALTOR® Network Wins for Your Clients",
    headingEs: "Por qué la red de 93,000 agentes REALTOR® impulsa a sus clientes",
    subEn:
      "Explore the official 'Only a REALTOR® — Perfect Strangers' film and our 4-channel breakdown of how cooperating agent infrastructure protects your referrals and co-listings.",
    subEs:
      "Explore el film oficial 'Only a REALTOR® — Perfect Strangers' y cómo la infraestructura de agentes colaboradores protege sus referidos y captaciones.",
    ctaLabelEn: "Register a Client Referral or Co-Listing",
    ctaLabelEs: "Registrar un Referido o Co-Exclusiva",
    ctaHref: "#south-florida-referral",
  },
  buyers: {
    eyebrowEn: "Only a REALTOR® · Buyer Protection & MLS Intelligence",
    eyebrowEs: "Only a REALTOR® · Protección al Comprador e Inteligencia MLS",
    headingEn: "The REALTOR® Advantage Behind Every South Florida Acquisition",
    headingEs: "La ventaja de contar con un REALTOR® en el sur de Florida",
    subEn:
      "Watch 'Only a REALTOR® — Perfect Strangers' and inspect how 93,000 member agents, 3,500+ URG licensees, and 25 years of contract underwriting protect your purchase.",
    subEs:
      "Vea 'Only a REALTOR® — Perfect Strangers' y descubra cómo 93,000 agentes miembros y 25 años de experiencia protegen su compra.",
    ctaLabelEn: "Request a Private Buyer Consultation",
    ctaLabelEs: "Solicitar Consulta Privada de Comprador",
    ctaHref: "#buyer-mandate",
  },
  "global-desk": {
    eyebrowEn: "MIAMI REALTORS® + RWorld · Global Broadcast Showcase",
    eyebrowEs: "MIAMI REALTORS® + RWorld · Escaparate Audiovisual Global",
    headingEn: "Inside the World's Largest Local REALTOR® Ecosystem",
    headingEs: "Dentro de la asociación local de REALTORS® más grande del mundo",
    subEn:
      "Watch 'Only a REALTOR® — Perfect Strangers' and see how Miami's 93,000-member agent network and 437+ international partner associations connect global inventory with qualified buyers.",
    subEs:
      "Vea 'Only a REALTOR® — Perfect Strangers' y cómo la red de 93,000 agentes en Miami y más de 437 acuerdos internacionales conectan propiedades globales con compradores cualificados.",
    ctaLabelEn: "Request a Private Global Desk Discussion",
    ctaLabelEs: "Solicitar Conversación Privada Global Desk",
    ctaHref: "#listing-request",
  },
};

export function RealtorAssociationVideoHub({
  variant = "agents",
  lang = "en",
}: {
  variant?: Variant;
  lang?: "en" | "es";
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const es = lang === "es";
  const header = HEADER_COPY[variant];
  const current = CHANNELS[activeIndex];

  return (
    <section
      aria-label={es ? header.eyebrowEs : header.eyebrowEn}
      className="border-y border-bone bg-[#060F1E] py-14 text-white md:py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Top Header Row */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-gold/35 bg-gold/10 px-3 py-1">
              <Film size={13} className="text-gold" />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                {es ? header.eyebrowEs : header.eyebrowEn}
              </span>
            </div>
            <h2 className="mt-3.5 font-serif text-3xl leading-tight text-white md:text-4xl">
              {es ? header.headingEs : header.headingEn}
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm leading-relaxed text-white/70">
            {es ? header.subEs : header.subEn}
          </p>
        </div>

        {/* 4-Channel Interactive Selector Bar */}
        <div
          role="tablist"
          aria-label={es ? header.headingEs : header.headingEn}
          className="mt-8 grid grid-cols-2 gap-2 lg:grid-cols-4"
        >
          {CHANNELS.map((ch, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={ch.id}
                type="button"
                role="tab"
                id={`realtor-hub-tab-${variant}-${ch.id}`}
                aria-selected={isSelected}
                aria-controls={`realtor-hub-panel-${variant}-${ch.id}`}
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center justify-between gap-2 border px-4 py-3 text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-gold bg-gold text-[#060F1E] font-semibold shadow-lg"
                    : "border-white/15 bg-white/[0.04] text-white/80 hover:border-gold/60 hover:text-white"
                }`}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.16em]">
                  {es ? ch.tabLabelEs : ch.tabLabelEn}
                </span>
                <Tv size={14} className={isSelected ? "text-[#060F1E]" : "text-gold"} />
              </button>
            );
          })}
        </div>

        {/* Main Split Showcase Stage */}
        <div
          id={`realtor-hub-panel-${variant}-${current.id}`}
          role="tabpanel"
          aria-labelledby={`realtor-hub-tab-${variant}-${current.id}`}
          className="mt-4 grid gap-6 border border-white/15 bg-[#0A192F] p-5 shadow-2xl lg:grid-cols-12 lg:items-center lg:gap-8 lg:p-7"
        >
          {/* Left 7 Cols: Native On-Site HD Video Player (Zero Popup, Zero Sign-In Wall) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video w-full overflow-hidden border border-gold/35 bg-black shadow-xl">
              <video
                key={current.videoSrc}
                src={current.videoSrc}
                poster={current.posterSrc}
                controls
                playsInline
                autoPlay
                muted
                loop
                preload="metadata"
                className="h-full w-full object-cover"
                aria-label={es ? current.titleEs : current.titleEn}
              />
            </div>

            {/* Direct Source & Campaign Companion Links */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border border-white/10 bg-white/[0.03] px-3.5 py-2.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
                {es ? "Fuentes Oficiales de la Campaña:" : "Official Campaign Sources:"}
              </span>
              <div className="flex flex-wrap items-center gap-3">
                {current.externalLinks.map((link) => (
                  <a
                    key={link.href + link.labelEn}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[10px] text-white/80 underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold"
                  >
                    {es ? link.labelEs : link.labelEn}
                    <ExternalLink size={11} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Executive Takeaway, Metrics & Direct Action */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                {es ? current.badgeEs : current.badgeEn}
              </p>
              <h3 className="mt-2.5 font-serif text-2xl leading-snug text-white">
                {es ? current.titleEs : current.titleEn}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/75">
                {es ? current.summaryEs : current.summaryEn}
              </p>

              {/* 3 Metric Chips */}
              <div className="mt-5 grid grid-cols-3 gap-2 border-y border-white/15 py-4">
                {current.metrics.map((m) => (
                  <div key={m.labelEn} className="bg-white/[0.03] px-2.5 py-2 text-center">
                    <p className="font-serif text-xl text-gold">{m.value}</p>
                    <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/65">
                      {es ? m.labelEs : m.labelEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={header.ctaHref}
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-gold px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#060F1E] transition-colors hover:bg-gold-light"
              >
                {es ? header.ctaLabelEs : header.ctaLabelEn}
                <ArrowRight size={13} />
              </a>
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/60">
                <BadgeCheck size={13} className="text-gold" />
                FL SL705771 · United Realty Group
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
