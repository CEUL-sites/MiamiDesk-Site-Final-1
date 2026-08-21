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
    heroEyebrow: "Miami Global Listing Desk · Activación internacional de inmuebles",
    heroTitle: "Gane el mandato localmente. Active inmuebles seleccionados en EE. UU.",
    heroSub:
      "Para agentes inmobiliarios individuales con mandatos prime cualificados. Usted conserva la relación con el propietario y la representación local; Miami Global Desk evalúa y activa inventario seleccionado para el mercado profesional de Miami y el sur de Florida, sujeto a los requisitos aplicables.",
    heroCta: "Activar una propiedad",
    heroWhatsApp: "WhatsApp España",
    heroTrust: "Florida Licensed Realtor® SL705771 · United Realty Group · sujeto a requisitos de corretaje, plataforma y cumplimiento",
    heroPartnerCta: "Convertirse en socio",
    mandateEyebrow: "Su mandato. Nuestra activación en EE. UU.",
    mandateTitle: "Una ventaja que el propietario puede entender en una sola conversación.",
    mandateCards: [
      ["Gane o proteja el mandato", "Presente una estrategia de activación internacional que complementa — no sustituye — su autoridad local."],
      ["Usted mantiene la relación", "El profesional local conserva la estrategia con el propietario, las visitas, la negociación y el conocimiento de mercado."],
      ["Active solo lo que encaja", "Cada inmueble se revisa antes de entrar en una ruta profesional de Miami y el sur de Florida."],
    ],
    ownerRouteTitle: "Si un propietario llega directamente",
    ownerRoute: "Cuando sea necesario, podemos facilitar una introducción a un profesional local cualificado que pueda trabajar con el propietario y con nosotros.",
    ownerRouteNote: "El propietario decide libremente si desea contratarlo; no asignamos automáticamente agentes a consumidores.",
    marketEyebrow: "La ventaja para ganar mandatos",
    marketTitle: "Una propuesta que el agente puede presentar al propietario.",
    marketLead:
      "Su propietario no necesita una promesa vaga de “exposición global”. Necesita saber qué cambia: usted mantiene el mandato local y el inmueble, si es apto, puede activar una ruta profesional hacia el mercado de Miami y el sur de Florida.",
    marketBody:
      "Para un agente individual, la ventaja es concreta: una conversación de captación más sólida, una presentación bilingüe más clara y un marco de cooperación documentado. El agente local sigue siendo la referencia del propietario para estrategia, visitas, negociación y decisiones del mercado local.",
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
    structureEyebrow: "Protección del profesional local",
    structureBody:
      "Miami Global Desk trabaja con el profesional local que controla un mandato cualificado; no sustituye esa representación ni solicita propietarios ya representados. Si un propietario llega directamente y necesita representación local, podemos facilitar una introducción a un profesional cualificado. El propietario decide libremente si desea contratarlo. Las visitas, la negociación local y la cualificación del comprador permanecen con el profesional local que corresponda.",
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
    twoWaysTitle: "Dos formas de trabajar con el Desk",
    wayExclusiveTitle: "Una propiedad, un mandato cualificado",
    wayExclusiveBody:
      "Un agente individual puede presentar una propiedad prime con autoridad documentada. Revisamos encaje, información, materiales y la ruta profesional de activación antes de proponer el alcance.",
    wayPortfolioTitle: "Agencia, cartera o promoción",
    wayPortfolioBody:
      "Las agencias, promotoras y organizaciones de ventas autorizadas pueden estructurar una relación de activación para inventario seleccionado. El alcance se define por escrito y operación por operación.",
    twoWaysClosing: "Términos y condiciones, en propuesta privada.",
    scopesEyebrow: "Alcances de activación",
    scopes: [
      ["Material para el mandato", "Explicación clara que el agente puede llevar a su presentación de captación, con la ruta de activación y el papel protegido del profesional local."],
      ["Activación de propiedad", "Revisión de encaje, presentación bilingüe y rutas de cooperación para inventario seleccionado, sujetas a requisitos de corretaje, plataforma y cumplimiento."],
      ["Desk de agencias", "Relación estructurada para una agencia, cartera o promoción, con condiciones privadas y documentación de cooperación."],
    ],
    stepsTitle: "La activación, en cuatro pasos",
    steps: [
      ["Presente el mandato", "Una propiedad prime basta. El profesional local confirma su autoridad para someterla a revisión."],
      ["Revisión de encaje", "Carlos evalúa el inmueble, el mercado, la documentación y la viabilidad profesional antes de proponer un alcance."],
      ["Plan de activación en EE. UU.", "La propiedad apta recibe materiales claros, contexto bilingüe y una ruta de cooperación hacia el ecosistema profesional del sur de Florida."],
      ["Cooperación y seguimiento", "El profesional local sigue siendo el punto de referencia; las introducciones, la actividad y la cooperación se registran y se coordinan según corresponda."],
    ],
    midCta: "Activar un mandato cualificado",
    midCtaAlt: "¿Prefiere hablar primero?",
    faqEyebrow: "Preguntas frecuentes",
    faqTitle: "Preguntas de un profesional local y su propietario",
    faqs: [
      [
        "¿Puede un agente inmobiliario individual utilizar Miami Global Desk?",
        "Sí. Un agente individual con un mandato prime cualificado puede presentar una propiedad. No necesita ser una agencia grande ni aportar una cartera.",
      ],
      [
        "¿El propietario pierde la relación con su agente local?",
        "No. Miami Global Desk no sustituye al profesional local ni solicita propietarios ya representados. El agente local mantiene la relación, la estrategia, las visitas, la negociación y el conocimiento del mercado local.",
      ],
      [
        "¿Qué ocurre si un propietario llega directamente?",
        "Cuando resulta conveniente, podemos facilitar una introducción a un profesional local cualificado. El propietario decide libremente si desea contratarlo; no asignamos automáticamente agentes a consumidores.",
      ],
      [
        "¿Cómo se estructura la cooperación?",
        "Carlos Uzcategui, Florida Realtor® SL705771, opera el servicio a través de United Realty Group. El alcance, la compensación cuando corresponda y cualquier actividad de MLS, portal o corretaje se documentan de forma privada y están sujetos a aprobación y requisitos aplicables.",
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
    heroEyebrow: "Miami Global Desk · International Listing Activation",
    heroTitle: "Win the Mandate Locally. Activate Selected Inventory in the U.S.",
    heroSub:
      "For individual listing professionals with qualified prime mandates. You retain the owner relationship and local representation; Miami Global Desk evaluates and activates selected inventory for the Miami and South Florida professional market, subject to applicable requirements.",
    heroCta: "Activate a Property",
    heroWhatsApp: "WhatsApp Spain",
    heroTrust: "Florida Licensed Realtor® SL705771 · United Realty Group · subject to brokerage, platform, property-eligibility, and compliance requirements",
    heroPartnerCta: "Become a Partner",
    mandateEyebrow: "Your Mandate. Our U.S. Activation.",
    mandateTitle: "An advantage the owner can understand in one conversation.",
    mandateCards: [
      ["Win or protect the mandate", "Present an international activation strategy that extends — rather than replaces — your local authority."],
      ["You retain the relationship", "The local professional remains responsible for owner strategy, showings, negotiation, and local-market judgment."],
      ["Activate only what fits", "Each property is reviewed before it enters a Miami and South Florida professional-market route."],
    ],
    ownerRouteTitle: "When an owner comes to us directly",
    ownerRoute: "Where needed, we can facilitate an introduction to an appropriate qualified local professional who can work with the owner and with us.",
    ownerRouteNote: "The owner independently decides whether to retain that professional; we do not automatically assign agents to consumers.",
    marketEyebrow: "The mandate-winning advantage",
    marketTitle: "A proposition your listing agent can put in front of the owner.",
    marketLead:
      "An owner does not need a vague promise of “global exposure.” They need to understand what changes: their local agent retains the mandate while an eligible property gains a credible route into the Miami and South Florida professional market.",
    marketBody:
      "For an individual listing agent, the advantage is tangible: a stronger mandate conversation, clearer bilingual presentation, and a documented cooperation framework. The local professional remains the owner’s point of reference for strategy, showings, negotiation, and local-market decisions.",
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
    structureEyebrow: "Local-professional protection",
    structureBody:
      "Miami Global Desk works with the local professional who controls a qualified mandate; it does not replace that representation or solicit already-represented owners. If an owner arrives directly and local representation is needed, we can facilitate an introduction to an appropriate qualified local professional. The owner independently decides whether to retain that professional. Showings, local negotiation, and buyer qualification remain with the appropriate local professional.",
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
    twoWaysTitle: "Two ways to work with the Desk",
    wayExclusiveTitle: "One property, one qualified mandate",
    wayExclusiveBody:
      "An individual agent can present one prime property with documented authority. We review fit, information, materials, and the professional activation route before proposing scope.",
    wayPortfolioTitle: "Agency, portfolio, or development",
    wayPortfolioBody:
      "Brokerages, developers, and authorized sales organizations can structure an activation relationship for selected inventory. Scope is defined in writing and transaction by transaction.",
    twoWaysClosing: "Terms and conditions in a private proposal.",
    scopesEyebrow: "Activation scopes",
    scopes: [
      ["Mandate materials", "A clear explanation an agent can take into a listing presentation, including the activation route and the protected role of the local professional."],
      ["Property activation", "Fit review, bilingual presentation, and cooperation paths for selected inventory, subject to brokerage, platform, and compliance requirements."],
      ["Agency Desk", "A structured relationship for an agency, portfolio, or development, with private terms and documented cooperation."],
    ],
    stepsTitle: "Activation in four steps",
    steps: [
      ["Present the mandate", "One prime property is enough. The local professional confirms authority to submit it for review."],
      ["Review the fit", "Carlos reviews the property, market, documentation, and professional feasibility before proposing scope."],
      ["Build the U.S. activation route", "Eligible inventory receives clear materials, bilingual context, and cooperation paths into the South Florida professional ecosystem."],
      ["Coordinate and report", "The local professional remains the point of reference; introductions, activity, and cooperation are recorded and coordinated as appropriate."],
    ],
    midCta: "Activate a qualified mandate",
    midCtaAlt: "Prefer to talk first?",
    faqEyebrow: "Common questions",
    faqTitle: "Questions a local professional—and their owner—will ask",
    faqs: [
      [
        "Can an individual listing agent use Miami Global Desk?",
        "Yes. An individual agent with a qualified prime mandate may present a property. You do not need to be a large agency or submit a portfolio.",
      ],
      [
        "Does the owner lose their local agent relationship?",
        "No. Miami Global Desk does not replace the local professional or solicit already-represented owners. The local agent retains the relationship, strategy, showings, negotiation, and local-market expertise.",
      ],
      [
        "What happens if an owner comes directly to Miami Global Desk?",
        "Where appropriate, we can facilitate an introduction to a qualified local professional. The owner independently decides whether to retain that professional; we do not automatically assign agents to consumers.",
      ],
      [
        "How is cooperation structured?",
        "Carlos Uzcategui, Florida Realtor® SL705771, provides the service through United Realty Group. Scope, any applicable compensation, and any MLS, portal, or brokerage activity are documented privately and remain subject to applicable approval and requirements.",
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
      ? "Miami Global Desk — Activación Internacional de Inmuebles"
      : "Miami Global Desk — International Listing Activation";
  const pageDescription =
    lang === "es"
      ? "Servicio B2B de activación internacional para profesionales locales con mandatos inmobiliarios cualificados, operado por Carlos Uzcategui, Florida Realtor®, a través de United Realty Group."
      : "South Florida-based B2B international listing-activation service for local professionals with qualified property mandates, operated by Carlos Uzcategui, Florida Realtor®, through United Realty Group.";

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
              {t.heroTitle}
            </h1>

            {/* Subtitle with high readability */}
            <p className="mt-6 max-w-2xl font-sans text-base sm:text-lg leading-relaxed text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
              {t.heroSub}
            </p>

            {/* Network Proof — Luxury Glass Cards */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 max-w-3xl">
              {[
                { v: "93,000", label: lang === "es" ? "Miembros de la asociación" : "Association Members" },
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
                href="mailto:contact@carlosre.com?subject=Miami%20Global%20Desk%20Partner%20Request"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
              >
                <FileCheck size={15} className="text-gold" />
                {t.heroPartnerCta}
              </a>
            </div>

            {/* Credibility & Compliance Footnote */}
            <div className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] leading-relaxed text-white/70">
              <ShieldCheck size={14} className="text-gold shrink-0" />
              <span>{t.heroTrust}</span>
            </div>
          </motion.div>
        </section>

        {/* ── Section C — Market Argument ── */}
        <section className="relative overflow-hidden border-y border-gold/20 bg-[#06111F] px-6 py-16 md:py-24">
          <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-gold/[0.03] blur-[100px]" />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fade}
            className="mx-auto max-w-5xl"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
              {t.marketEyebrow}
            </p>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl text-white leading-tight tracking-tight">
              {t.marketTitle}
            </h2>
            
            <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
              <div className="rounded-2xl border border-gold/30 bg-white/[0.03] p-7 sm:p-9 backdrop-blur-md shadow-lg">
                <div className="h-0.5 w-10 bg-gold mb-5" />
                <p className="font-serif text-xl sm:text-2xl leading-relaxed text-white/95 italic">
                  "{t.marketLead}"
                </p>
              </div>
              <div className="space-y-5 text-white/75 font-sans text-base leading-relaxed">
                <p>{t.marketBody}</p>
                <div className="pt-4 border-t border-white/10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
                  <ShieldCheck size={14} />
                  <span>Bilingual Presentation · Compliant Brokerage Framework</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Section D — Distribution Advantage ── */}
        <section className="bg-ivory px-6 py-16 text-navy md:py-24 border-b border-bone">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink font-semibold">{t.distEyebrow}</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">{t.distIntro}</h2>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FIGURES.map((f) => (
                <div
                  key={f.v}
                  className="group rounded-xl border border-bone/80 bg-white p-6 shadow-xs transition-all duration-300 hover:border-gold hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="h-0.5 w-6 bg-gold/50 transition-all duration-300 group-hover:w-full group-hover:bg-gold" />
                    <div className="mt-3 font-serif text-3xl sm:text-4xl text-navy-deep tracking-tight">{f.v}</div>
                    <div className="mt-2 font-sans text-sm font-medium leading-snug text-navy/75">{f[lang]}</div>
                  </div>
                  {f.caption && (
                    <p className="mt-4 border-t border-hairline pt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-navy/55">
                      {t.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Activation line */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fade}
              className="mt-10 rounded-xl border-l-4 border-gold bg-white p-6 sm:p-7 shadow-xs"
            >
              <p className="font-serif text-lg sm:text-xl leading-relaxed text-navy-deep">
                {t.activation}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Mandate advantage — agent-facing and owner-presentable ── */}
        <section id="partner-route" className="bg-white px-6 py-16 text-navy md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-ink">{t.mandateEyebrow}</p>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">{t.mandateTitle}</h2>
              </div>
              <p className="max-w-2xl font-sans text-base leading-[1.85] text-navy/75 md:text-lg">{t.marketBody}</p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {t.mandateCards.map(([title, body], index) => (
                <motion.article
                  key={title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={fade}
                  className="relative overflow-hidden rounded-2xl border border-bone/80 bg-ivory p-7 shadow-xs"
                >
                  <span className="font-mono text-[10px] font-semibold tracking-[0.24em] text-gold-ink">0{index + 1}</span>
                  <h3 className="mt-5 font-serif text-2xl leading-tight text-navy-deep">{title}</h3>
                  <p className="mt-4 font-sans text-sm leading-[1.8] text-navy/75">{body}</p>
                </motion.article>
              ))}
            </div>

            <motion.aside
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fade}
              className="mt-8 grid gap-5 border-l-4 border-gold bg-navy-deep p-7 text-white md:grid-cols-[auto_1fr]"
            >
              <ShieldCheck size={28} className="text-gold" />
              <div>
                <h3 className="font-serif text-2xl text-white">{t.ownerRouteTitle}</h3>
                <p className="mt-3 max-w-3xl font-sans text-base leading-[1.8] text-white/75">{t.ownerRoute}</p>
                <p className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-gold">{t.ownerRouteNote}</p>
              </div>
            </motion.aside>
          </div>
        </section>

        {/* ── Section E — The structure, stated plainly ── */}
        <section className="bg-ivory px-6 py-16 text-navy md:py-24 border-y border-bone">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fade}
            className="mx-auto max-w-4xl rounded-2xl border border-bone/80 bg-white p-8 sm:p-12 shadow-xs"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink font-semibold">{t.structureEyebrow}</p>
            <p className="mt-6 font-sans text-base sm:text-lg leading-[1.9] text-navy/80">{t.structureBody}</p>
          </motion.div>
        </section>

        {/* Property-presentation proof — authentic media */}
        <section className="bg-white px-6 py-16 text-navy md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <motion.figure
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fade}
              className="overflow-hidden rounded-2xl border border-bone/80 bg-navy-deep shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden sm:aspect-video">
                <img
                  src="/images/carlos-property-media-team.webp"
                  alt={t.proofAlt}
                  width={1920}
                  height={1080}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <figcaption className="px-6 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/75 bg-navy-deep border-t border-white/10">
                {t.proofCaption}
              </figcaption>
            </motion.figure>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fade}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink font-semibold">{t.proofEyebrow}</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-navy-deep md:text-4xl">{t.proofTitle}</h2>
              <p className="mt-5 font-sans text-base leading-[1.85] text-navy/75">{t.proofBody}</p>
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
                <>¿Agente individual, agencia o promotora? Presente un mandato cualificado o solicite una conversación de colaboración.</>
              ) : (
                <>Individual listing agent, agency, or developer? Submit one qualified mandate or request a partner conversation.</>
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
