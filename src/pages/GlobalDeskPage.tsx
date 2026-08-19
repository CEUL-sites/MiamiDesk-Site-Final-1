import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { motion } from "motion/react";
import { ChevronRight, MessageCircle, FileCheck, KeyRound, ClipboardList, Globe, ShieldCheck } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { LazyVideo } from "../components/LazyVideo";
import { GlobalDeskListingForm } from "../components/forms/GlobalDeskListingForm";

type Lang = "es" | "en";

const WA_ES = "https://wa.me/34646853078";
const WA_US = "https://wa.me/19548656622";

// Verified figures only (§3.5). Do not substitute or inflate.
// $69B is the association network's combined 2025 transaction volume —
// never the principal's or United Realty Group's. Caption is mandatory.
const FIGURES = [
  { v: "93,000", es: "miembros", en: "members" },
  { v: "200+", es: "portales globales · 19 idiomas", en: "global portals · 19 languages" },
  { v: "260+", es: "MLS de EE. UU. vía RPR", en: "U.S. MLSs via RPR" },
  { v: "437+", es: "acuerdos internacionales", en: "signed international agreements" },
  { v: "11", es: "intercambios de datos MLS", en: "MLS data exchanges" },
  { v: "$69B", es: "volumen 2025 de la red asociativa", en: "association-network 2025 volume", caption: true },
];

const C = {
  es: {
    unit: "Miami Global Listing Desk · un servicio de homesprofessional.com",
    toggleLabel: "Idioma",
    brokerageAlt: "Recepción de United Realty Group en la oficina de Weston, Florida",
    brokerageCaption: "United Realty Group, Weston: infraestructura de corretaje en el sur de Florida.",
    waES: "WhatsApp España",
    waUS: "WhatsApp EE. UU.",
    heroEyebrow: "Miami Global Listing Desk · Activación internacional de propiedades",
    heroTitle: "Conectando propiedad prime española con agentes compradores del área de Miami.",
    heroSub:
      "Miami Global Listing Desk ayuda a propiedades prime seleccionadas de España y otros mercados internacionales a entrar en el ecosistema inmobiliario profesional del sur de Florida. Operado por Carlos Uzcategui, Florida Realtor®, a través de United Realty Group.",
    heroCta: "Solicitar una presentación privada",
    heroWhatsApp: "WhatsApp España",
    heroTrust: "Florida Licensed Realtor® SL705771 · United Realty Group · sujeto a requisitos de corretaje, plataforma y cumplimiento",
    marketEyebrow: "Mercados y compradores",
    marketTitle: "Inventario internacional preparado para conversaciones profesionales con agentes compradores.",
    marketLead:
      "Los propietarios internacionales necesitan algo mas preciso que publicidad generica: materiales claros, contexto bilingue y una via de cooperacion que agentes compradores del area de Miami puedan entender y compartir con clientes de Estados Unidos y America Latina.",
    marketBody:
      "El ecosistema profesional del sur de Florida permite que inventario internacional seleccionado sea presentado con claridad a agentes compradores del área de Miami. Para un propietario, promotor o agencia española, la ventaja está en combinar presentación local, materiales bilingües y una estructura profesional de cooperación sujeta a requisitos de corretaje, plataforma y cumplimiento.",
    distEyebrow: "La ventaja de distribución",
    distIntro:
      "La activación se apoya en la infraestructura profesional de distribución inmobiliaria del sur de Florida:",
    caption: "Cifra de la red asociativa, no del principal ni de United Realty Group.",
    activation:
      "La exposición es infraestructura. La activación de agentes compradores depende de información clara, cooperación profesional, compensación cuando corresponda y requisitos de corretaje, plataforma y cumplimiento.",
    bridgeEyebrow: "España, en su contexto local",
    bridgeTitle: "Un mercado contemporáneo y una identidad de lugar histórica.",
    bridgeBody:
      "La conversación empieza por cómo se entiende un lugar localmente y lleva inventario seleccionado a una conversación clara y profesional con agentes compradores del área de Miami.",
    granViaAlt: "Vista sobre Gran Vía y los edificios del centro de Madrid",
    granViaCaption: "Madrid, España: Gran Vía y su entorno urbano central.",
    segoviaAlt: "Acueducto romano de Segovia junto al centro histórico",
    segoviaCaption: "Segovia, España: el acueducto romano junto al casco histórico.",
    structureEyebrow: "La estructura, dicha con claridad",
    structureBody:
      "Miami Global Listing Desk es un servicio de distribución internacional y activación de agentes compradores con base en el sur de Florida, operado por Carlos Uzcategui, Florida Realtor®, a través de United Realty Group. La representación local en España puede ser gestionada por agencias profesionales afiliadas: visitas, negociación local y cualificación del comprador. Cualquier actividad de MLS, portal, corretaje o cooperación está sujeta a requisitos de corretaje, plataforma y cumplimiento.",
    proofEyebrow: "Preparación profesional",
    proofTitle: "Inventario preparado para una cooperación clara.",
    proofBody:
      "Carlos coordina fotografía y materiales de presentación para que inventario seleccionado pueda ser entendido y evaluado por agentes compradores del sur de Florida dentro del marco profesional aplicable.",
    proofAlt: "Producción profesional de medios en una residencia frente al agua en Miami",
    proofCaption: "Producción de fotografía y video para la presentación profesional de una propiedad en Miami.",
    howEyebrow: "Cómo funciona",
    coopTitle: "Cooperación profesional — operación por operación",
    coopBody:
      "Cada oportunidad se estructura operación por operación. Cuando corresponde, la compensación, los referidos, la cooperación entre agencias, la presentación en plataformas y cualquier actividad MLS se documentan y canalizan a través del marco profesional aplicable, incluyendo United Realty Group y los requisitos legales y de cumplimiento correspondientes. No se garantiza colocación, leads, compradores, comisiones ni ventas.",
    twoWaysTitle: "Dos formas de listar",
    wayExclusiveTitle: "Una propiedad, en exclusiva",
    wayExclusiveBody:
      "Liste una sola propiedad (o varias concretas) bajo un acuerdo de exclusiva de venta a seis meses. La comisión la paga el vendedor al cierre. Sin cuota mensual.",
    wayPortfolioTitle: "Una cartera, con plan de activación",
    wayPortfolioBody:
      "Presente varias propiedades bajo un plan de activación y marketing, sin exclusiva. Incluye la estructura de referidos vía United Realty Group; algunos planes añaden difusión profesional dirigida a agentes compradores del área de Miami.",
    twoWaysClosing: "Términos y condiciones, en propuesta privada.",
    scopesEyebrow: "Planes de activación",
    scopes: [
      ["Preparación", "Presentación profesional para inventario internacional seleccionado, con datos claros, materiales bilingües y marco de cooperación vía URG."],
      ["Activación", "Añade difusión profesional dirigida a agentes compradores del área de Miami, sujeta a requisitos de corretaje, plataforma y cumplimiento."],
      ["Mesa de Promotor", "Programa a medida para obra nueva y carteras de múltiples unidades."],
    ],
    stepsTitle: "El proceso, en cuatro pasos",
    steps: [
      ["Envíe la propiedad", "Una sola propiedad o una cartera. Sin compromiso — Carlos revisa cada solicitud personalmente."],
      ["Propuesta por escrito", "Vía de representación — exclusiva o plan de activación — con alcance y términos en propuesta privada."],
      ["Activación en el sur de Florida", "Presentación profesional, materiales bilingües y rutas de cooperación para agentes compradores del área de Miami."],
      ["Cooperación profesional", "La cooperación se estructura operación por operación. Su representación local en España puede preservarse."],
    ],
    midCta: "Solicitar una propuesta privada",
    midCtaAlt: "¿Prefiere hablar primero?",
    faqEyebrow: "Preguntas frecuentes",
    faqTitle: "Lo que todo propietario pregunta",
    faqs: [
      [
        "¿Pierdo a mi agente o mi representación en España?",
        "No. La representación local española se preserva. Las visitas, la negociación local y la cualificación del comprador en España las gestionan agencias con licencia de la red afiliada — su relación local no cambia.",
      ],
      [
        "¿Cuánto cuesta?",
        "En la vía exclusiva, la comisión la paga el vendedor al cierre — sin cuota mensual. Los planes de colocación de cartera se detallan en una propuesta privada, operación por operación.",
      ],
      [
        "¿Quién atiende al comprador estadounidense?",
        "Agentes compradores del ecosistema profesional del sur de Florida pueden revisar, compartir y cooperar sobre inventario seleccionado cuando la información, el marco de corretaje y los requisitos de cumplimiento lo permiten.",
      ],
      [
        "¿Es un acuerdo con licencia?",
        "Sí. El servicio es operado por Carlos Uzcategui, Florida Realtor® SL705771, a través de United Realty Group. Cualquier actividad de MLS, portal, corretaje o cooperación está sujeta a aprobación y requisitos aplicables.",
      ],
    ],
    footerCompliance: "Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity",
    footerCredibility:
      "Carlos Uzcategui — REALTOR® con licencia en Florida desde 2001. CLHMS. United Realty Group: 3,500+ agentes, 20 oficinas en Florida.",
    footerContacts: "Contacto",
    footerAddress: "15951 SW 41 St. #700, Weston, FL 33331",
  },
  en: {
    unit: "Miami Global Listing Desk · a homesprofessional.com service",
    toggleLabel: "Language",
    brokerageAlt: "United Realty Group reception area at the Weston, Florida office",
    brokerageCaption: "United Realty Group, Weston: South Florida brokerage infrastructure.",
    waES: "WhatsApp Spain",
    waUS: "WhatsApp USA",
    heroEyebrow: "Miami Global Listing Desk · International property distribution",
    heroTitle: "Prepare Selected International Inventory for Miami-Area Buyer-Agent Discovery",
    heroSub:
      "For international property owners, developers, and listing agents: prepare selected inventory for discovery and professional cooperation by Miami-area buyer agents. Operated by Carlos Uzcategui, Florida Realtor®, through United Realty Group.",
    heroCta: "Request a Private Introduction",
    heroWhatsApp: "WhatsApp Spain",
    heroTrust: "Florida Licensed Realtor® SL705771 · United Realty Group · subject to brokerage, platform, property-eligibility, and compliance requirements",
    marketEyebrow: "Markets and buyers",
    marketTitle: "International inventory prepared for professional buyer-agent conversations.",
    marketLead:
      "International property owners need something more precise than generic exposure: clear materials, bilingual context, and a cooperation path that Miami-area buyer agents can understand and share with U.S. and Latin American clients.",
    marketBody:
      "The South Florida professional real estate ecosystem gives selected international inventory a clearer path to buyer-agent discovery. For a Spanish luxury owner, developer, or agency, the advantage is bilingual presentation, brokerage structure, and buyer-agent activation through a compliant professional framework.",
    distEyebrow: "Distribution advantage",
    distIntro:
      "The service is built around South Florida's professional real estate distribution infrastructure:",
    caption: "Association-network figure — not the principal's or United Realty Group's volume.",
    activation:
      "Exposure is infrastructure. Buyer-agent activation depends on clear information, professional cooperation, appropriate compensation where applicable, and brokerage, platform, and compliance requirements.",
    bridgeEyebrow: "Spain, in local context",
    bridgeTitle: "A contemporary market and a historic place identity.",
    bridgeBody:
      "The conversation starts with how a place is understood locally, then carries selected inventory into a clear, professional discussion with Miami-area buyer agents.",
    granViaAlt: "View over Gran Via and central Madrid buildings",
    granViaCaption: "Madrid, Spain: Gran Via and its surrounding central urban fabric.",
    segoviaAlt: "Roman aqueduct in Segovia beside the historic city center",
    segoviaCaption: "Segovia, Spain: the Roman aqueduct along the historic city edge.",
    structureEyebrow: "The structure, stated plainly",
    structureBody:
      "Miami Global Listing Desk helps selected Spanish and international prime properties enter the South Florida professional real estate ecosystem. Operated by Carlos Uzcategui, Florida Realtor®, through United Realty Group, the service is designed to make qualified inventory easier for Miami-area buyer agents to discover, understand, share with U.S. and Latin American clients, and cooperate through a professional brokerage framework.",
    proofEyebrow: "Professional preparation",
    proofTitle: "Inventory prepared for clear professional cooperation.",
    proofBody:
      "Carlos coordinates photography and property-presentation materials so selected inventory can be understood and evaluated by South Florida buyer agents within the applicable professional framework.",
    proofAlt: "Professional property-media production at a waterfront Miami residence",
    proofCaption: "Photography and video production for the professional presentation of a Miami property.",
    howEyebrow: "How it works",
    coopTitle: "Professional cooperation — transaction by transaction",
    coopBody:
      "Each opportunity is structured transaction by transaction. Where applicable, compensation, referrals, inter-agency cooperation, platform presentation, and any MLS activity are documented through the appropriate professional framework, including United Realty Group and applicable legal and compliance requirements. No placement, lead, buyer, commission, or sale is guaranteed.",
    twoWaysTitle: "Two ways to list",
    wayExclusiveTitle: "A single property, exclusive",
    wayExclusiveBody:
      "List one property (or specific properties) under a six-month exclusive right-to-sell agreement. Commission is paid by the seller at close. No monthly fee.",
    wayPortfolioTitle: "A portfolio, activation plan",
    wayPortfolioBody:
      "Present multiple properties under an activation and marketing plan, non-exclusive. Includes the referral structure via United Realty Group; some plans add professional outreach directed to Miami-area buyer agents.",
    twoWaysClosing: "Terms and conditions in a private proposal.",
    scopesEyebrow: "Activation plans",
    scopes: [
      ["Readiness", "Professional presentation for selected international inventory, with clear facts, bilingual materials, and a cooperation framework via URG."],
      ["Activation", "Adds professional buyer-agent outreach in the Miami-area ecosystem, subject to brokerage, platform, and compliance requirements."],
      ["Developer Desk", "Bespoke program for new-build and multi-unit portfolios."],
    ],
    stepsTitle: "The process, in four steps",
    steps: [
      ["Submit the property", "A single property or a portfolio. No commitment — Carlos reviews every submission personally."],
      ["Written proposal", "Representation path — exclusive or activation plan — with scope and terms in a private proposal."],
      ["South Florida activation", "Professional presentation, bilingual materials, and cooperation pathways for Miami-area buyer agents."],
      ["Professional cooperation", "Cooperation is structured transaction by transaction. Your local Spanish representation can be preserved."],
    ],
    midCta: "Request a private proposal",
    midCtaAlt: "Prefer to talk first?",
    faqEyebrow: "Common questions",
    faqTitle: "What every owner asks",
    faqs: [
      [
        "Do I lose my agent or my representation in Spain?",
        "No. Local Spanish representation is preserved. Showings, local negotiation, and buyer qualification in Spain are handled by licensed agencies within the affiliated network — your local relationship doesn't change.",
      ],
      [
        "What does it cost?",
        "On the exclusive path, the commission is paid by the seller at closing — no monthly fee. Portfolio activation plans are detailed in a private proposal, transaction by transaction.",
      ],
      [
        "Who handles the American buyer?",
        "Miami-area buyer agents in the South Florida professional real estate ecosystem may review, share, and cooperate on selected inventory when the information, brokerage framework, and compliance requirements support it.",
      ],
      [
        "Is this a licensed arrangement?",
        "Yes. Carlos Uzcategui, Florida Realtor® SL705771, provides the service through United Realty Group. Any MLS, portal, brokerage, or cooperation activity is subject to applicable approval and requirements.",
      ],
    ],
    footerCompliance: "Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity",
    footerCredibility:
      "Carlos Uzcategui — Florida-licensed REALTOR® since 2001. CLHMS. United Realty Group: 3,500+ agents, 20 Florida offices.",
    footerContacts: "Contact",
    footerAddress: "15951 SW 41 St. #700, Weston, FL 33331",
  },
} as const;

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function GlobalDeskPage() {
  // English is the default render; an explicit visitor choice persists across visits.
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gd-lang");
      if (saved === "es" || saved === "en") setLang(saved);
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  const pick = (l: Lang) => {
    setLang(l);
    try {
      localStorage.setItem("gd-lang", l);
    } catch {
      /* ignore */
    }
  };

  const t = C[lang];
  const pageTitle =
    lang === "es"
      ? "Miami Global Listing Desk — Activación internacional de propiedades"
      : "Miami Global Listing Desk — International Property Distribution";
  const pageDescription =
    lang === "es"
      ? "Servicio de distribución internacional y activación de agentes compradores operado por Carlos Uzcategui, Florida Realtor®, a través de United Realty Group."
      : "South Florida-based international property distribution and buyer-agent activation service operated by Carlos Uzcategui, Florida Realtor®, through United Realty Group.";

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/spain-desk" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/global-desk" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:locale" content={lang === "es" ? "es_ES" : "en_US"} />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>
      <JsonLd id="global-desk-breadcrumb" data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://homesprofessional.com/" },
            { "@type": "ListItem", position: 2, name: "Global Desk", item: "https://homesprofessional.com/global-desk" },
          ],
        }} />
      <main id="main-content" className="min-h-screen bg-[#060D18] text-white pb-20 lg:pb-0">
        <Navbar />

        {/* ── Elevated Luxury Hero with High Video Visibility & Sharp Text Contrast ── */}
        <section className="relative overflow-hidden px-6 pt-28 pb-16 sm:pt-32 md:pt-36 md:pb-24">
          {/* Background Video with enhanced visibility */}
          <LazyVideo
            src="/videos/dollhouse_global_reach.mp4"
            poster="/images/og-default.png"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.45]"
          />
          {/* Balanced contrast overlays — ensures video is clearly visible while text pops */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#060D18]/85 via-[#060D18]/55 to-[#060D18]/95" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,rgba(22,68,158,0.25),transparent_75%)]" />
          <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-gold/[0.04] blur-[120px]" />

          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            className="relative mx-auto max-w-4xl text-left"
          >
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-[#06111F]/80 px-4 py-1.5 backdrop-blur-md shadow-md">
              <Globe size={13} className="text-gold" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold font-semibold">
                {t.heroEyebrow}
              </span>
            </div>

            {/* Main Title with sharp drop shadow & gold accents */}
            <h1
              className="mt-6 max-w-4xl font-serif leading-[1.08] text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
              style={{ fontSize: "clamp(2.2rem, 5.2vw, 3.9rem)", fontWeight: 400 }}
            >
              {lang === "es" ? (
                <>
                  Conectando Propiedad Prime Española con{" "}
                  <em className="italic text-gold font-normal">Agentes Compradores de Miami.</em>
                </>
              ) : (
                <>
                  Prime Property Anywhere, Prepared for{" "}
                  <em className="italic text-gold font-normal">Miami-Area Buyer-Agent Discovery.</em>
                </>
              )}
            </h1>

            {/* Subtitle with high readability */}
            <p className="mt-6 max-w-2xl font-sans text-base sm:text-lg leading-relaxed text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              {t.heroSub}
            </p>

            {/* Network Proof — Luxury Glass Cards */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 max-w-3xl">
              {[
                { v: "93,000", label: lang === "es" ? "Agentes Miembros" : "Association Members" },
                { v: "200+", label: lang === "es" ? "Portales Globales · 19 Idiomas" : "Global Portals · 19 Languages" },
                { v: "437+", label: lang === "es" ? "Acuerdos Internacionales" : "International Agreements" },
              ].map((f) => (
                <div
                  key={f.v}
                  className="group rounded-xl border border-gold/30 bg-[#06111F]/85 p-4 backdrop-blur-md transition-all duration-300 hover:border-gold/60 hover:bg-[#06111F]/95 shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                >
                  <div className="h-0.5 w-7 bg-gold/60 transition-all duration-300 group-hover:w-full group-hover:bg-gold" />
                  <div className="mt-2.5 font-serif text-2xl sm:text-3xl text-gold tracking-tight drop-shadow-sm">{f.v}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80">{f.label}</div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#listing-request"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gold px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-all hover:bg-white hover:text-navy-deep shadow-[0_8px_25px_rgba(176,141,87,0.35)]"
              >
                {t.heroCta}
                <ChevronRight size={15} />
              </a>
              <a
                href={lang === "es" ? WA_ES : WA_US}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
              >
                <MessageCircle size={15} className="text-gold" />
                {lang === "es" ? t.heroWhatsApp : "WhatsApp Carlos"}
              </a>
            </div>

            {/* Credibility & Compliance Footnote */}
            <div className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] leading-relaxed text-white/70">
              <ShieldCheck size={14} className="text-gold shrink-0" />
              <span>{t.heroTrust}</span>
            </div>
          </motion.div>
        </section>

        {/* ── Section C — Market argument (lead; sourced) ── */}
        <section className="border-y border-gold/20 bg-navy-deep px-6 py-16 md:py-24">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fade}
            className="mx-auto max-w-3xl"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.marketEyebrow}</p>

            <h2 className="mt-8 max-w-3xl font-serif text-3xl leading-tight text-white md:text-4xl">
              {t.marketTitle}
            </h2>
            <p className="mt-6 max-w-3xl font-serif text-xl leading-[1.55] text-white/90 md:text-2xl">
              {t.marketLead}
            </p>

            <p className="mt-8 max-w-3xl font-sans text-lg leading-[1.85] text-white/70">
              {t.marketBody}
            </p>
          </motion.div>
        </section>

        {/* ── Section D — Distribution advantage (figure grid + activation) ── */}
        <section className="bg-ivory px-6 py-16 text-navy md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">{t.distEyebrow}</p>
            <p className="mt-5 max-w-3xl font-serif text-2xl leading-snug text-navy md:text-3xl">{t.distIntro}</p>

            <div className="mt-12 grid grid-cols-2 gap-px border border-navy/10 bg-navy/10 md:grid-cols-3">
              {FIGURES.map((f) => (
                <div key={f.v} className="bg-ivory p-7">
                  <div className="font-serif text-4xl text-gold-ink">{f.v}</div>
                  <div className="mt-2 font-sans text-sm leading-snug text-navy/70">{f[lang]}</div>
                  {f.caption && (
                    <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-navy/70">
                      {t.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Activation line — directly beneath the grid */}
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fade}
              className="mt-8 max-w-3xl border-l-2 border-gold pl-5 font-serif text-xl leading-relaxed text-navy md:text-2xl"
            >
              {t.activation}
            </motion.p>
          </div>
        </section>

        {/* Spain-to-Miami editorial bridge — authentic place context before the service mechanics. */}
        <section className="bg-white px-6 py-16 text-navy md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">{t.bridgeEyebrow}</p>
              <h2 className="mt-5 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">{t.bridgeTitle}</h2>
              <p className="mt-5 font-sans text-base leading-[1.85] text-navy/70 md:text-lg">{t.bridgeBody}</p>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              <div className="contents">
                <figure>
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src="/images/madrid-gran-via-editorial.webp"
                      alt={t.granViaAlt}
                      width={1081}
                      height={1920}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-navy/60">
                    {t.granViaCaption}
                  </figcaption>
                </figure>

                <figure>
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src="/images/segovia-aqueduct-editorial.webp"
                      alt={t.segoviaAlt}
                      width={1081}
                      height={1920}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-navy/60">
                    {t.segoviaCaption}
                  </figcaption>
                </figure>
              </div>

              <figure>
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="/images/united-realty-group-offices.jpg"
                    alt={t.brokerageAlt}
                    width={3000}
                    height={4000}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <figcaption className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-navy/60">
                  {t.brokerageCaption}
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ── Section E — The structure, stated plainly ── */}
        <section className="bg-white px-6 py-16 text-navy md:py-24">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fade}
            className="mx-auto max-w-3xl"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">{t.structureEyebrow}</p>
            <p className="mt-6 font-sans text-lg leading-[1.9] text-navy/75">{t.structureBody}</p>
          </motion.div>
        </section>

        {/* Property-presentation proof — authentic media, secondary to the service explanation */}
        <section className="bg-bone-warm px-6 py-16 text-navy md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <motion.figure
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fade}
              className="overflow-hidden bg-navy-deep"
            >
              <div className="aspect-[16/10] overflow-hidden sm:aspect-video">
                <img
                  src="/images/property-media-production.jpg"
                  alt={t.proofAlt}
                  width={4000}
                  height={2252}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <figcaption className="px-5 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                {t.proofCaption}
              </figcaption>
            </motion.figure>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fade}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">{t.proofEyebrow}</p>
              <h2 className="mt-5 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">{t.proofTitle}</h2>
              <p className="mt-5 font-sans text-base leading-[1.85] text-navy/70">{t.proofBody}</p>
            </motion.div>
          </div>
        </section>

        {/* ── Section F — How it works (the constant + two ways to list) ── */}
        <section className="bg-navy-deep px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.howEyebrow}</p>

            {/* Four-step overview — the simple version first; the mechanics
                blocks below carry the detail for readers who want it. */}
            <h2 className="mt-6 font-serif text-2xl text-white md:text-3xl">{t.stepsTitle}</h2>
            <ol className="mt-8 grid gap-5 md:grid-cols-4">
              {t.steps.map(([title, body], i) => (
                <motion.li
                  key={title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fade}
                  className="border-t-2 border-gold/60 pt-5"
                >
                  <span className="font-serif text-3xl text-gold">{i + 1}</span>
                  <h3 className="mt-3 font-serif text-lg text-white">{title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-white/65">{body}</p>
                </motion.li>
              ))}
            </ol>

            {/* Block 1 — cooperating commission */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fade}
              className="mt-8 border border-gold/30 bg-white/[0.04] p-8 md:p-10"
            >
              <div className="flex h-11 w-11 items-center justify-center border border-gold/30 bg-gold/10">
                <FileCheck size={18} className="text-gold" />
              </div>
              <h2 className="mt-5 font-serif text-2xl text-white md:text-3xl">{t.coopTitle}</h2>
              <p className="mt-4 max-w-3xl font-sans text-base leading-[1.85] text-white/70">{t.coopBody}</p>
            </motion.div>

            {/* Block 2 — two ways to list */}
            <h3 className="mt-14 font-serif text-2xl text-white md:text-3xl">{t.twoWaysTitle}</h3>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fade}
                className="flex flex-col border border-white/12 bg-white/[0.03] p-8"
              >
                <KeyRound size={20} className="text-gold" />
                <h4 className="mt-4 font-serif text-xl text-white">{t.wayExclusiveTitle}</h4>
                <p className="mt-3 font-sans text-base leading-[1.8] text-white/65">{t.wayExclusiveBody}</p>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fade}
                className="flex flex-col border border-white/12 bg-white/[0.03] p-8"
              >
                <ClipboardList size={20} className="text-gold" />
                <h4 className="mt-4 font-serif text-xl text-white">{t.wayPortfolioTitle}</h4>
                <p className="mt-3 font-sans text-base leading-[1.8] text-white/65">{t.wayPortfolioBody}</p>
              </motion.div>
            </div>

            {/* Placement plan scopes (named, no prices) */}
            <div className="mt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">{t.scopesEyebrow}</p>
              <div className="mt-4 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
                {t.scopes.map(([name, desc]) => (
                  <div key={name} className="bg-navy-deep p-6">
                    <p className="font-serif text-lg text-gold">{name}</p>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-white/55">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">{t.twoWaysClosing}</p>

            {/* Mid-page conversion point — momentum dies without one between
                the mechanics and the (long) intake form. */}
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/10 pt-10">
              <a
                href="#listing-request"
                className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-navy-deep shadow-lg shadow-gold/25 transition-opacity hover:opacity-90"
              >
                {t.midCta}
                <ChevronRight size={14} />
              </a>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                {t.midCtaAlt}{" "}
                <a href={WA_ES} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center text-gold underline underline-offset-2 hover:opacity-80">
                  {t.waES}
                </a>{" "}
                ·{" "}
                <a href={WA_US} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center text-gold underline underline-offset-2 hover:opacity-80">
                  {t.waUS}
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ── Section F2 — FAQ (objection handling; content mirrors the
             mechanics sections above, reformatted for scanning) ── */}
        <section className="bg-white px-6 py-16 text-navy md:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">{t.faqEyebrow}</p>
            <h2 className="mt-5 font-serif text-2xl text-navy md:text-3xl">{t.faqTitle}</h2>
            <div className="mt-9 divide-y divide-navy/10 border-y border-navy/10">
              {t.faqs.map(([q, a]) => (
                <details key={q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-navy">
                    {q}
                    <ChevronRight size={16} className="shrink-0 text-gold-ink transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 max-w-2xl font-sans text-base leading-[1.8] text-navy/70">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <JsonLd
          id="global-desk-faq"
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": t.faqs.map(([q, a]) => ({
              "@type": "Question",
              "name": q,
              "acceptedAnswer": { "@type": "Answer", "text": a },
            })),
          }}
        />

        {/* ── Section G — Listing intake form ── */}
        <section id="listing-request" className="scroll-mt-20 bg-[#060D18] px-6 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <GlobalDeskListingForm lang={lang} />
            <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
              {lang === "es" ? (
                <>¿Agencia o promotora? Vea el proceso completo de alta:{" "}
                  <a href="/spain-mls-listing" className="text-gold underline underline-offset-2 hover:text-white">Inmueble en España → listado en el Miami MLS</a></>
              ) : (
                <>Agency or developer? Review the full activation process:{" "}
                  <a href="/spain-mls-listing" className="text-gold underline underline-offset-2 hover:text-white">Spain property → Miami MLS listing</a></>
              )}
            </p>
          </div>
        </section>

        {/* ── Section H — Compliance footer block ── */}
        <section className="border-t border-gold/20 bg-navy-deep px-6 py-14">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">{t.footerCompliance}</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
              <a href="mailto:contact@carlosre.com" className="inline-flex items-center py-2 hover:text-gold">contact@carlosre.com</a>
              <span className="text-gold/40">·</span>
              <a href={WA_US} target="_blank" rel="noopener noreferrer" className="inline-flex items-center py-2 hover:text-gold">{t.waUS} +1 954-865-6622</a>
              <span className="text-gold/40">·</span>
              <a href={WA_ES} target="_blank" rel="noopener noreferrer" className="inline-flex items-center py-2 hover:text-gold">{t.waES} +34 646 85 30 78</a>
              <span className="text-gold/40">·</span>
              <a href="tel:+19544502000" className="inline-flex items-center py-2 underline underline-offset-2 hover:text-gold">1-954-450-2000</a>
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">{t.footerAddress}</p>
            <p className="mx-auto mt-6 max-w-2xl font-sans text-xs leading-relaxed text-white/55">{t.footerCredibility}</p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
