import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { motion } from "motion/react";
import {
  Building2, ChevronRight, ClipboardCheck, FileSignature, Globe2,
  Handshake, Landmark, MessageCircle, Network, ShieldCheck,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { AgencyPartnerForm } from "../components/forms/AgencyPartnerForm";
import { pushEvent } from "../lib/analytics";
import { CONTACT } from "../constants";

type Lang = "en" | "es";

const WA_ES = "https://wa.me/34646853078";
const WA_US = "https://wa.me/19548656622";

// Verified figures only — src/data/figures.json is the source of truth.
// Every figure is the association network's or URG's, never Carlos's own.
const FIGURES = [
  { v: "93,000", en: "member agents — Miami and South Florida REALTORS®", es: "agentes miembros — Miami and South Florida REALTORS®" },
  { v: "437+", en: "signed international association agreements", es: "acuerdos internacionales firmados entre asociaciones" },
  { v: "200+", en: "global portals · 19 languages — eligible syndication", es: "portales globales · 19 idiomas — sindicación elegible" },
  { v: "260+", en: "U.S. MLSs connected via the RPR national exchange", es: "MLS de EE. UU. conectados vía el intercambio nacional RPR" },
  { v: "3,500+", en: "United Realty Group agents · 21 Florida offices", es: "agentes de United Realty Group · 21 oficinas en Florida" },
  { v: "75+", en: "countries in the association's partner network", es: "países en la red de asociaciones colaboradoras" },
];

const C = {
  en: {
    htmlTitle: "Global Desk — International Property Distribution to the Miami Network | Carlos Uzcategui",
    metaDesc:
      "A formal cooperation channel connecting eligible international inventory to Miami's real-estate distribution ecosystem. Local representation preserved. Coordinated by a Florida-licensed Realtor® through United Realty Group.",
    unit: "a homesprofessional.com service",
    toggleLabel: "Language",
    waES: "WhatsApp Spain",
    waUS: "WhatsApp U.S.",
    heroEyebrow: "Global Desk · International Inventory Distribution",
    heroTitle: "International property, connected to Miami's real-estate distribution ecosystem.",
    heroSub:
      "A formal cooperation channel for agencies, developers, and authorized property representatives seeking U.S. and Latin American buyer-agent exposure — while preserving their local client relationship and transaction management.",
    heroCta: "Request a Confidential Inventory Review",
    heroCta2: "Discuss an Agency Partnership",
    heroTrust:
      "Coordinated by Carlos Uzcategui · Florida-licensed Realtor® since 2001 (SL705771) · United Realty Group · CLHMS",
    whoEyebrow: "Who the Global Desk serves",
    whoH2: "Two pathways. One cooperation structure.",
    whoNote:
      "Local representation preserved. International distribution expanded. The Global Desk is distribution and cooperation infrastructure — not a replacement for the local agency.",
    who: [
      {
        icon: Building2,
        tag: "Primary",
        t: "Luxury agencies & brokerages",
        d: "Prime residential portfolios seeking structured exposure to U.S. and Latin American buyer-agent channels — with your agency remaining the client-facing professional in your market.",
        cta: "Start an agency conversation",
      },
      {
        icon: Landmark,
        tag: "Primary",
        t: "Developers & project sales teams",
        d: "New-construction and multi-unit inventory positioned for international distribution under a program structured by written agreement.",
        cta: "Discuss a developer program",
      },
      {
        icon: Handshake,
        tag: "Secondary",
        t: "Family offices & authorized owners",
        d: "Significant eligible property handled confidentially. Where a local agency already represents the property, that relationship can remain in place.",
        cta: "Request a confidential review",
      },
    ],
    distEyebrow: "The distribution case",
    distH2: "Agent-to-agent distribution — not another property portal.",
    distBody:
      "A portal advertises a property and waits. Agent-to-agent distribution puts inventory in front of the professionals who already represent qualified buyers — with a documented cooperation structure that gives those agents a professional reason to present it. On acceptance, eligible inventory connects to the distribution infrastructure of the Miami and South Florida REALTORS® network:",
    distQualifier:
      "Figures describe the association network and United Realty Group — not Carlos Uzcategui's individual reach. Access, syndication, and placement vary by property, platform participation, and applicable MLS rules. Source: Miami and South Florida REALTORS®; United Realty Group.",
    scopeNote:
      "A property located outside the U.S. does not enter the core Southeast Florida residential MLS daily-search system. Eligible international inventory is positioned through the association's international platform and agent-to-agent channels — the exact channel depends on the property and the written agreement.",
    howEyebrow: "How cooperation works",
    howH2: "Five steps, documented in writing.",
    steps: [
      ["Inventory review", "Submit the property or portfolio confidentially. Carlos reviews every inquiry personally — eligibility is assessed property by property."],
      ["Written structure & approval", "The cooperation, compensation, and referral structure is documented in writing and subject to brokerage approval before any activation."],
      ["Eligible placement & distribution", "Where eligible, inventory is positioned in the appropriate international platform and syndication channels, subject to MLS rules and platform participation."],
      ["Buyer-agent cooperation", "Documented cooperation gives U.S. and Latin American buyer-side agents a professional basis to present the property to their clients."],
      ["Inquiry & transaction coordination", "Inquiries are qualified and coordinated with the local professional, who continues to manage the client relationship and local transaction work."],
    ],
    splitEyebrow: "The division of roles",
    keepH3: "What remains with the local agency",
    keep: [
      "The seller relationship and local mandate",
      "Showings and local market work",
      "Local disclosure and documentation",
      "Local negotiation and transaction responsibilities, per the written agreement",
    ],
    addH3: "What the Global Desk adds",
    add: [
      "Florida-licensed coordination through United Realty Group, the licensed Florida brokerage",
      "Positioning within the Miami and South Florida REALTORS® network",
      "A documented buyer-agent cooperation and referral structure",
      "Bilingual U.S.–Spain–Latin America communication",
      "Direct agent outreach where included in the agreed program",
    ],
    engageEyebrow: "Engagement options",
    engageH2: "Structured by written agreement.",
    engage: [
      ["Single eligible property", "One significant property reviewed and, where eligible, placed under a written cooperation agreement."],
      ["Selected portfolio", "A curated set of properties under one cooperation framework, with distribution scoped per property."],
      ["Developer / new-construction program", "A bespoke structure for project sales teams and multi-unit inventory."],
    ],
    engageNote:
      "Commercial terms are presented in a private proposal and documented in writing before any activation. No terms are published publicly.",
    credEyebrow: "Credibility",
    cred: [
      "Florida-licensed Realtor® since 2001 · SL705771",
      "Certified Luxury Home Marketing Specialist (CLHMS)",
      "United Realty Group — 3,500+ agents · 21 Florida offices",
      "Miami and South Florida REALTORS® member",
      "Madrid-based international relationship development",
    ],
    credNote:
      "Carlos Uzcategui is licensed in Florida only. He is not licensed as a real estate professional in Spain or any other jurisdiction; international activity is conducted through referral, cooperation, and marketing structures permitted under applicable rules.",
    faqEyebrow: "Common questions",
    faqH2: "What principals ask first.",
    faqs: [
      [
        "Does the local agency lose its client?",
        "No. The written cooperation agreement keeps the local agency as the client-facing professional in its market. Showings, local negotiation, and the seller relationship remain local; the Global Desk adds U.S.-side distribution and coordination.",
      ],
      [
        "Is this a portal advertisement or a formal cooperation?",
        "A formal cooperation. The structure is documented in writing, subject to brokerage approval and applicable MLS rules, and built around agent-to-agent distribution — not a consumer listing upload.",
      ],
      [
        "Does every property qualify?",
        "No. Eligibility is reviewed property by property. A property located outside the U.S. does not enter the core Southeast Florida residential MLS daily-search system; eligible inventory is positioned through the association's international platform and agent channels, per the written agreement.",
      ],
      [
        "How are inquiries handled?",
        "Buyer-agent and direct inquiries are qualified on the U.S. side and coordinated with the local professional, who manages the client relationship and the local side of any transaction.",
      ],
      [
        "How are compensation and referrals documented?",
        "In writing, before activation, through United Realty Group as the licensed Florida brokerage and subject to broker approval. No compensation terms are published publicly; each arrangement is transaction-specific.",
      ],
      [
        "What information is needed for review?",
        "Only the short inquiry below: who you are, the market, the type and approximate scale of the inventory, and a link if available. Photography, plans, and documentation are requested only after an opportunity is qualified.",
      ],
    ],
    finalEyebrow: "Confidential inventory review",
    finalH2: "Start the conversation.",
    finalSub:
      "Submit the short form below. Carlos reviews every inquiry personally and responds with next steps — typically a brief call, followed by a private written proposal where there is a fit.",
    formEyebrow: "Global Desk · Confidential Inventory Review",
    formHeading: "Request a confidential inventory review",
    formIntro:
      "For agencies, developers, family offices, and authorized representatives. No photography or documentation is needed at this stage.",
    complianceLine:
      "All cooperation, placement, syndication, referral compensation, and distribution are subject to review, written agreement, brokerage approval, applicable MLS rules, jurisdictional requirements, property eligibility, and platform participation. No buyers, offers, timelines, or placement outcomes are guaranteed.",
    footerCompliance: "Carlos Uzcategui · Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity",
  },
  es: {
    htmlTitle: "Global Desk — Distribución internacional de inventario hacia la red de Miami | Carlos Uzcategui",
    metaDesc:
      "Un canal formal de colaboración que conecta inventario internacional elegible con el ecosistema inmobiliario de Miami. Representación local preservada. Coordinado por un Realtor® con licencia en Florida a través de United Realty Group.",
    unit: "un servicio de homesprofessional.com",
    toggleLabel: "Idioma",
    waES: "WhatsApp España",
    waUS: "WhatsApp EE. UU.",
    heroEyebrow: "Global Desk · Distribución internacional de inventario",
    heroTitle: "Su inventario internacional, conectado con el ecosistema inmobiliario de Miami.",
    heroSub:
      "Un canal formal de colaboración para agencias, promotores y representantes autorizados que buscan ampliar su exposición ante agentes de compradores de Estados Unidos y Latinoamérica — preservando la relación local con el cliente y la gestión de la operación.",
    heroCta: "Solicitar una revisión confidencial de inventario",
    heroCta2: "Conversar sobre una colaboración entre agencias",
    heroTrust:
      "Coordinado por Carlos Uzcategui · Realtor® con licencia en Florida desde 2001 (SL705771) · United Realty Group · CLHMS",
    whoEyebrow: "A quién sirve el Global Desk",
    whoH2: "Dos vías. Una misma estructura de colaboración.",
    whoNote:
      "Representación local preservada. Distribución internacional ampliada. El Global Desk es infraestructura de distribución y colaboración — no un sustituto de la agencia local.",
    who: [
      {
        icon: Building2,
        tag: "Principal",
        t: "Agencias de lujo",
        d: "Carteras residenciales prime que buscan exposición estructurada ante los canales de agentes de compradores de EE. UU. y Latinoamérica — con su agencia como profesional de referencia ante el cliente en su mercado.",
        cta: "Iniciar una conversación de agencia",
      },
      {
        icon: Landmark,
        tag: "Principal",
        t: "Promotores y equipos de venta de proyecto",
        d: "Obra nueva e inventario de múltiples unidades posicionado para distribución internacional bajo un programa estructurado por acuerdo escrito.",
        cta: "Conversar sobre un programa de promotor",
      },
      {
        icon: Handshake,
        tag: "Secundaria",
        t: "Family offices y propietarios autorizados",
        d: "Propiedad elegible significativa, gestionada con confidencialidad. Si una agencia local ya representa la propiedad, esa relación puede mantenerse.",
        cta: "Solicitar una revisión confidencial",
      },
    ],
    distEyebrow: "El argumento de distribución",
    distH2: "Distribución de agente a agente — no otro portal inmobiliario.",
    distBody:
      "Un portal anuncia una propiedad y espera. La distribución de agente a agente pone el inventario ante los profesionales que ya representan a compradores cualificados — con una estructura de colaboración documentada que da a esos agentes una razón profesional para presentarlo. Tras la aceptación, el inventario elegible se conecta con la infraestructura de distribución de la red de Miami and South Florida REALTORS®:",
    distQualifier:
      "Las cifras describen la red asociativa y United Realty Group — no el alcance individual de Carlos Uzcategui. El acceso, la sindicación y la colocación varían según la propiedad, la participación de cada plataforma y las reglas del MLS aplicables. Fuente: Miami and South Florida REALTORS®; United Realty Group.",
    scopeNote:
      "Un inmueble situado fuera de EE. UU. no entra en el sistema de búsqueda diaria del MLS residencial del sureste de Florida. El inventario internacional elegible se posiciona a través de la plataforma internacional de la asociación y de los canales de agente a agente — el canal exacto depende de la propiedad y del acuerdo escrito.",
    howEyebrow: "Cómo funciona la colaboración",
    howH2: "Cinco pasos, documentados por escrito.",
    steps: [
      ["Revisión de inventario", "Envíe la propiedad o cartera de forma confidencial. Carlos revisa cada consulta personalmente — la elegibilidad se evalúa propiedad por propiedad."],
      ["Estructura escrita y aprobación", "La estructura de colaboración, compensación y referidos se documenta por escrito y está sujeta a la aprobación del broker antes de cualquier activación."],
      ["Colocación y distribución elegibles", "Cuando es elegible, el inventario se posiciona en la plataforma internacional y los canales de sindicación apropiados, sujeto a las reglas del MLS y a la participación de cada plataforma."],
      ["Cooperación con agentes de compradores", "La cooperación documentada da a los agentes del comprador de EE. UU. y Latinoamérica una base profesional para presentar la propiedad a sus clientes."],
      ["Coordinación de consultas y operación", "Las consultas se cualifican y se coordinan con el profesional local, que sigue gestionando la relación con el cliente y la parte local de la operación."],
    ],
    splitEyebrow: "El reparto de funciones",
    keepH3: "Lo que permanece con la agencia local",
    keep: [
      "La relación con el vendedor y el mandato local",
      "Las visitas y el trabajo de mercado local",
      "La documentación e información local",
      "La negociación local y las responsabilidades de la operación, según el acuerdo escrito",
    ],
    addH3: "Lo que aporta el Global Desk",
    add: [
      "Coordinación con licencia de Florida a través de United Realty Group, broker con licencia en Florida",
      "Posicionamiento dentro de la red de Miami and South Florida REALTORS®",
      "Una estructura documentada de cooperación y referidos con agentes de compradores",
      "Comunicación bilingüe EE. UU.–España–Latinoamérica",
      "Difusión directa a agentes cuando el programa acordado la incluye",
    ],
    engageEyebrow: "Opciones de colaboración",
    engageH2: "Estructurado por acuerdo escrito.",
    engage: [
      ["Una propiedad elegible", "Una propiedad significativa, revisada y — cuando es elegible — colocada bajo un acuerdo de colaboración escrito."],
      ["Una cartera seleccionada", "Un conjunto curado de propiedades bajo un mismo marco de colaboración, con distribución definida propiedad por propiedad."],
      ["Programa de promotor / obra nueva", "Una estructura a medida para equipos de venta de proyecto e inventario de múltiples unidades."],
    ],
    engageNote:
      "Los términos comerciales se presentan en una propuesta privada y se documentan por escrito antes de cualquier activación. No se publican términos.",
    credEyebrow: "Credibilidad",
    cred: [
      "Realtor® con licencia en Florida desde 2001 · SL705771",
      "Certified Luxury Home Marketing Specialist (CLHMS)",
      "United Realty Group — 3,500+ agentes · 21 oficinas en Florida",
      "Miembro de Miami and South Florida REALTORS®",
      "Desarrollo de relaciones internacionales con base en Madrid",
    ],
    credNote:
      "Carlos Uzcategui tiene licencia únicamente en Florida. No está licenciado como profesional inmobiliario en España ni en ninguna otra jurisdicción; la actividad internacional se realiza mediante estructuras de referido, colaboración y marketing permitidas por la normativa aplicable.",
    faqEyebrow: "Preguntas frecuentes",
    faqH2: "Lo que los directores preguntan primero.",
    faqs: [
      [
        "¿Pierde la agencia local a su cliente?",
        "No. El acuerdo de colaboración escrito mantiene a la agencia local como profesional de referencia ante el cliente en su mercado. Las visitas, la negociación local y la relación con el vendedor siguen siendo locales; el Global Desk añade la distribución y coordinación del lado estadounidense.",
      ],
      [
        "¿Es un anuncio en un portal o una colaboración formal?",
        "Una colaboración formal. La estructura se documenta por escrito, está sujeta a la aprobación del broker y a las reglas del MLS aplicables, y se construye sobre la distribución de agente a agente — no sobre la publicación en un portal de consumo.",
      ],
      [
        "¿Califica cualquier propiedad?",
        "No. La elegibilidad se revisa propiedad por propiedad. Un inmueble situado fuera de EE. UU. no entra en el sistema de búsqueda diaria del MLS residencial del sureste de Florida; el inventario elegible se posiciona a través de la plataforma internacional de la asociación y de los canales de agentes, según el acuerdo escrito.",
      ],
      [
        "¿Cómo se gestionan las consultas?",
        "Las consultas de agentes de compradores y las directas se cualifican en el lado estadounidense y se coordinan con el profesional local, que gestiona la relación con el cliente y la parte local de cualquier operación.",
      ],
      [
        "¿Cómo se documentan la compensación y los referidos?",
        "Por escrito, antes de la activación, a través de United Realty Group como broker con licencia en Florida y sujeto a la aprobación del broker. No se publican términos de compensación; cada acuerdo es específico de la operación.",
      ],
      [
        "¿Qué información se necesita para la revisión?",
        "Solo el breve formulario de abajo: quién es usted, el mercado, el tipo y la escala aproximada del inventario, y un enlace si lo tiene. La fotografía, los planos y la documentación se solicitan únicamente cuando la oportunidad ha sido cualificada.",
      ],
    ],
    finalEyebrow: "Revisión confidencial de inventario",
    finalH2: "Inicie la conversación.",
    finalSub:
      "Envíe el breve formulario. Carlos revisa cada consulta personalmente y responde con los siguientes pasos — normalmente una llamada breve, seguida de una propuesta privada por escrito cuando hay encaje.",
    formEyebrow: "Global Desk · Revisión confidencial de inventario",
    formHeading: "Solicite una revisión confidencial de inventario",
    formIntro:
      "Para agencias, promotores, family offices y representantes autorizados. En esta fase no se necesita fotografía ni documentación.",
    complianceLine:
      "Toda colaboración, colocación, sindicación, compensación de referidos y distribución está sujeta a revisión, acuerdo escrito, aprobación del broker, reglas del MLS aplicables, requisitos jurisdiccionales, elegibilidad de la propiedad y participación de cada plataforma. No se garantizan compradores, ofertas, plazos ni resultados de colocación.",
    footerCompliance: "Carlos Uzcategui · Realtor® con licencia en Florida SL705771 · United Realty Group · Equal Housing Opportunity",
  },
} as const;

const URLS: Record<Lang, string> = {
  en: "https://homesprofessional.com/global-desk",
  es: "https://homesprofessional.com/es/global-desk",
};

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const track = (cta: string, lang: Lang) => () =>
  pushEvent("global_desk_cta", { cta, language: lang, page_path: window.location.pathname });

export default function GlobalDeskPage({ lang = "en" }: { lang?: Lang }) {
  const t = C[lang];

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{t.htmlTitle}</title>
        <meta name="description" content={t.metaDesc} />
        <link rel="canonical" href={URLS[lang]} />
        <link rel="alternate" hrefLang="x-default" href={URLS.en} />
        <link rel="alternate" hrefLang="en" href={URLS.en} />
        <link rel="alternate" hrefLang="es" href={URLS.es} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URLS[lang]} />
        <meta property="og:title" content={t.htmlTitle} />
        <meta property="og:description" content={t.metaDesc} />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <JsonLd id="global-desk-breadcrumb" data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: lang === "es" ? "Inicio" : "Home", item: lang === "es" ? "https://homesprofessional.com/es" : "https://homesprofessional.com/" },
            { "@type": "ListItem", position: 2, name: "Global Desk", item: URLS[lang] },
          ],
        }} />
      <JsonLd id="global-desk-service" data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Global Desk — International Inventory Distribution",
          provider: { "@id": "https://homesprofessional.com/#agent" },
          serviceType: "International real estate distribution and cooperation",
          description:
            "A formal cooperation channel connecting eligible international property inventory to Miami's real-estate distribution ecosystem, coordinated by a Florida-licensed Realtor® through United Realty Group, with local representation preserved. Placement, syndication, and compensation are subject to written agreement, brokerage approval, MLS rules, and property eligibility.",
          areaServed: ["Spain", "Latin America", "United States", "South Florida"],
          availableLanguage: ["English", "Spanish"],
          url: URLS[lang],
        }} />
      <JsonLd
        id="global-desk-faq"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: t.faqs.map(([q, a]) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }}
      />

      <main id="main-content" className="min-h-screen bg-[#060D18] text-white pb-20 lg:pb-0">
        <Navbar />

        {/* ── Identity bar: unit label, language switch, WhatsApp lines ── */}
        <div className="border-b border-gold/20 bg-navy-deep">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-serif text-lg leading-none text-white">Global Desk</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">{t.unit}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div
                className="flex items-center border border-white/15 font-mono text-[10px] uppercase"
                role="group"
                aria-label={t.toggleLabel}
              >
                {(["en", "es"] as const).map((l) => (
                  <a
                    key={l}
                    href={l === "en" ? "/global-desk" : "/es/global-desk"}
                    aria-current={lang === l ? "page" : undefined}
                    onClick={track(`language_${l}`, lang)}
                    className={`px-3 py-1.5 tracking-[0.18em] transition-colors ${
                      lang === l ? "bg-gold text-navy-deep" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {l.toUpperCase()}
                  </a>
                ))}
              </div>
              <a
                href={WA_ES}
                target="_blank"
                rel="noopener noreferrer"
                onClick={track("whatsapp_spain_header", lang)}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-gold"
              >
                <MessageCircle size={12} className="text-gold/70" />
                {t.waES} +34 646 85 30 78
              </a>
              <a
                href={WA_US}
                target="_blank"
                rel="noopener noreferrer"
                onClick={track("whatsapp_us_header", lang)}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-gold"
              >
                <MessageCircle size={12} className="text-gold/70" />
                {t.waUS} +1 954-865-6622
              </a>
            </div>
          </div>
        </div>

        {/* ── Hero ── */}
        <section className="relative overflow-hidden px-6 pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(22,68,158,0.28),transparent_70%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_82%_75%,rgba(176,141,87,0.10),transparent_70%)]" />
          <motion.div initial="hidden" animate="show" variants={fade} className="relative mx-auto max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.07] px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold/85">{t.heroEyebrow}</span>
            </span>
            <h1
              className="mt-7 max-w-3xl font-serif leading-[1.08] text-white"
              style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 400 }}
            >
              {t.heroTitle}
            </h1>
            <p className="mt-7 max-w-2xl font-sans text-lg leading-relaxed text-white/65">{t.heroSub}</p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#inventory-review"
                onClick={track("hero_primary", lang)}
                className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-navy-deep shadow-lg shadow-gold/25 transition-opacity hover:opacity-90"
              >
                {t.heroCta}
                <ChevronRight size={14} />
              </a>
              <a
                href={WA_ES}
                target="_blank"
                rel="noopener noreferrer"
                onClick={track("hero_partnership", lang)}
                className="inline-flex items-center gap-2 border border-white/25 px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 transition-colors hover:border-gold/60 hover:text-gold"
              >
                <MessageCircle size={14} />
                {t.heroCta2}
              </a>
            </div>

            <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.16em] leading-relaxed text-white/70">
              {t.heroTrust}
            </p>
          </motion.div>
        </section>

        {/* ── Who the Global Desk serves ── */}
        <section className="border-y border-gold/20 bg-navy-deep px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.whoEyebrow}</p>
            <h2 className="mt-5 max-w-3xl font-serif text-2xl leading-snug text-white md:text-3xl">{t.whoH2}</h2>
            <p className="mt-5 max-w-3xl border-l-2 border-gold pl-5 font-serif text-lg leading-relaxed text-white/80">
              {t.whoNote}
            </p>
            <div className="mt-10 grid gap-px border border-white/10 bg-white/10 md:grid-cols-3">
              {t.who.map(({ icon: Icon, tag, t: title, d, cta }) => (
                <div key={title} className="flex flex-col bg-navy-deep p-8">
                  <div className="flex items-center justify-between">
                    <Icon size={20} className="text-gold" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/70">{tag}</span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-white">{title}</h3>
                  <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-white/60">{d}</p>
                  <a
                    href="#inventory-review"
                    onClick={track(`pathway_${tag.toLowerCase()}`, lang)}
                    className="mt-6 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold transition-opacity hover:opacity-80"
                  >
                    {cta}
                    <ChevronRight size={12} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── The distribution case ── */}
        <section className="bg-ivory px-6 py-16 text-navy md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">{t.distEyebrow}</p>
            <h2 className="mt-5 max-w-3xl font-serif text-2xl leading-snug text-navy md:text-3xl">{t.distH2}</h2>
            <p className="mt-6 max-w-3xl font-sans text-base leading-[1.85] text-navy/75">{t.distBody}</p>

            <div className="mt-10 grid grid-cols-2 gap-px border border-navy/10 bg-navy/10 md:grid-cols-3">
              {FIGURES.map((f) => (
                <div key={f.v + f.en} className="bg-ivory p-7">
                  <div className="font-serif text-3xl text-gold-ink md:text-4xl">{f.v}</div>
                  <div className="mt-2 font-sans text-sm leading-snug text-navy/70">{f[lang]}</div>
                </div>
              ))}
            </div>

            <p className="mt-6 max-w-4xl font-sans text-xs leading-relaxed text-navy/60">{t.distQualifier}</p>
            <p className="mt-4 max-w-4xl border-l-2 border-gold pl-5 font-sans text-sm leading-relaxed text-navy/75">
              {t.scopeNote}
            </p>
          </div>
        </section>

        {/* ── How cooperation works ── */}
        <section className="bg-navy-deep px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.howEyebrow}</p>
            <h2 className="mt-6 font-serif text-2xl text-white md:text-3xl">{t.howH2}</h2>
            <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
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
                  <h3 className="mt-3 font-serif text-lg leading-snug text-white">{title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-white/65">{body}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Division of roles ── */}
        <section className="bg-white px-6 py-16 text-navy md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">{t.splitEyebrow}</p>
            <div className="mt-8 grid gap-px border border-navy/10 bg-navy/10 md:grid-cols-2">
              <div className="bg-white p-8 md:p-10">
                <ShieldCheck size={22} className="text-gold-ink" />
                <h3 className="mt-4 font-serif text-2xl text-navy">{t.keepH3}</h3>
                <ul className="mt-5 space-y-3">
                  {t.keep.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-sans text-sm leading-relaxed text-navy/75">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-ink" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 md:p-10">
                <Network size={22} className="text-gold-ink" />
                <h3 className="mt-4 font-serif text-2xl text-navy">{t.addH3}</h3>
                <ul className="mt-5 space-y-3">
                  {t.add.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-sans text-sm leading-relaxed text-navy/75">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-ink" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Engagement options ── */}
        <section className="bg-navy-deep px-6 py-16 md:py-24">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.engageEyebrow}</p>
            <h2 className="mt-5 font-serif text-2xl text-white md:text-3xl">{t.engageH2}</h2>
            <div className="mt-8 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
              {t.engage.map(([name, desc], i) => (
                <div key={name} className="bg-navy-deep p-7">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.22em] text-gold/55">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-3 font-serif text-lg text-gold">{name}</p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-white/60">{desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 flex items-start gap-2.5 font-sans text-sm leading-relaxed text-white/60">
              <FileSignature size={16} className="mt-0.5 flex-shrink-0 text-gold" />
              {t.engageNote}
            </p>
          </div>
        </section>

        {/* ── Credibility ── */}
        <section className="border-y border-gold/20 bg-navy px-6 py-14 md:py-16">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.credEyebrow}</p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
              {t.cred.map((item) => (
                <span key={item} className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/75">
                  <ClipboardCheck size={12} className="flex-shrink-0 text-gold" />
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-4xl font-sans text-xs leading-relaxed text-white/55">{t.credNote}</p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-white px-6 py-16 text-navy md:py-24">
          <div className="mx-auto max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">{t.faqEyebrow}</p>
            <h2 className="mt-5 font-serif text-2xl text-navy md:text-3xl">{t.faqH2}</h2>
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

        {/* ── Final CTA + inquiry form ── */}
        <section id="inventory-review" className="scroll-mt-20 bg-[#060D18] px-6 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{t.finalEyebrow}</p>
              <h2 className="mt-3 font-serif text-3xl text-white">{t.finalH2}</h2>
              <p className="mx-auto mt-4 max-w-xl font-sans text-sm leading-relaxed text-white/55">{t.finalSub}</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.16em]">
                <a href={WA_ES} target="_blank" rel="noopener noreferrer" onClick={track("whatsapp_spain_final", lang)} className="inline-flex items-center gap-1.5 py-2 text-gold transition-colors hover:text-white">
                  <MessageCircle size={12} /> {t.waES}
                </a>
                <a href={WA_US} target="_blank" rel="noopener noreferrer" onClick={track("whatsapp_us_final", lang)} className="inline-flex items-center gap-1.5 py-2 text-gold transition-colors hover:text-white">
                  <MessageCircle size={12} /> {t.waUS}
                </a>
                <a href={CONTACT.calendly} target="_blank" rel="noopener noreferrer" onClick={track("calendar_final", lang)} className="inline-flex items-center gap-1.5 py-2 text-gold transition-colors hover:text-white">
                  <Globe2 size={12} /> {lang === "es" ? "Reservar 30 minutos" : "Book 30 minutes"}
                </a>
              </div>
            </div>
            <AgencyPartnerForm
              lang={lang}
              source="global-desk-inquiry"
              eyebrow={t.formEyebrow}
              heading={t.formHeading}
              intro={t.formIntro}
            />
            <p className="mx-auto mt-8 max-w-2xl text-center font-sans text-xs leading-relaxed text-white/50">
              {t.complianceLine}
            </p>
          </div>
        </section>

        {/* ── Compliance footer block ── */}
        <section className="border-t border-gold/20 bg-navy-deep px-6 py-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">{t.footerCompliance}</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">
              <a href="mailto:contact@carlosre.com" className="inline-flex items-center py-2 hover:text-gold">contact@carlosre.com</a>
              <span className="text-gold/40">·</span>
              <a href={WA_US} target="_blank" rel="noopener noreferrer" className="inline-flex items-center py-2 hover:text-gold">{t.waUS} +1 954-865-6622</a>
              <span className="text-gold/40">·</span>
              <a href={WA_ES} target="_blank" rel="noopener noreferrer" className="inline-flex items-center py-2 hover:text-gold">{t.waES} +34 646 85 30 78</a>
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">{CONTACT.address}</p>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
