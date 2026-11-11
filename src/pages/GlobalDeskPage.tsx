import "../components/global-desk-hero.css";
import { AssociationFilms } from "../components/AssociationFilms";
import { GlobalResearchLinks } from "../components/GlobalResearchLinks";
import { DistributionMetrics } from "../components/DistributionMetrics";
import { GilmarGlobalDeskSection } from "../components/GilmarGlobalDeskSection";
import { RealtorAssociationVideoHub } from "../components/RealtorAssociationVideoHub";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, Handshake, Mail, MessageCircle, ShieldCheck, UserRoundCheck, UsersRound } from "lucide-react";
import { FaqAccordion } from "../components/FaqAccordion";
import { Footer } from "../components/Footer";
import { GlobalActivationFlow, type ActivationStage } from "../components/GlobalActivationFlow";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { Navbar } from "../components/Navbar";
import { HeroVideoBackdrop } from "../components/heroes/HeroVideoBackdrop";
import { JsonLd } from "../components/SEO/JsonLd";
import { GlobalDeskListingForm } from "../components/forms/GlobalDeskListingForm";
import { AgencyPartnerForm } from "../components/forms/AgencyPartnerForm";
import { pushEvent } from "../lib/analytics";

type Lang = "en" | "es";

const WA_US = "https://wa.me/19548656622";
const WA_ES = "https://wa.me/34646853078";

const COPY = {
  en: {
    product: "Miami Global Desk · International Listing Activation",
    title: "International Prime Property—Activated for South Florida’s Professional Buyer-Agent Market.",
    lead: "For agencies and developers: Carlos and United Realty Group prepare selected inventory for Greater Miami agent discovery and qualified buyer introductions.",
    body: "Your team retains the mandate, client relationship, local negotiation, and closing.",
    explore: "Explore U.S. Activation",
    discuss: "Request a Private Discussion",
    proof: [["93,000", "Association members"], ["World’s largest", "Local Realtor® association"], ["437+", "Signed international agreements"]],
    proofNote: "Source: Miami and South Florida REALTORS® merger announcement. Effective May 11, 2026.",
    workflowKicker: "A direct professional route",
    workflowTitle: "How Miami Global Desk works",
    workflowBody: "One activation path into the Greater Miami professional agent network. The originating agency or developer keeps the mandate and closes the local transaction.",
    selectedStage: "Selected stage",
    stages: [
      { title: "International property and local mandate", shortTitle: ["International property", "Local mandate"], detail: "Your agency, developer, or authorized listing professional keeps the property mandate and the local relationship." },
      { title: "South Florida activation", shortTitle: ["South Florida", "activation"], detail: "Carlos and United Realty Group prepare the opportunity for an eligible professional activation route in South Florida." },
      { title: "Greater Miami agent network", shortTitle: ["Greater Miami", "agent network"], detail: "Local real estate agents can evaluate eligible, selected inventory for buyers they represent." },
      { title: "Qualified introduction", shortTitle: ["Qualified buyer", "introduction"], detail: "Relevant interest can be prepared, qualified, and introduced directly back to the originating team." },
      { title: "Local negotiation and closing", shortTitle: ["Local negotiation", "and closing"], detail: "Your local team manages visits, negotiation, documentation, and closing in the property’s jurisdiction." },
    ] satisfies ActivationStage[],
    networkKicker: "Local market connection",
    networkTitle: "Local agents. Qualified buyer relationships. Brokerage structure.",
    networkBody: "Selected international inventory is prepared for professional review by Greater Miami real estate agents—not anonymous consumer traffic.",
    networkSteps: [
      ["Greater Miami agent review", "Local agents assess relevance for buyers they represent."],
      ["Buyer representation", "Interest stays connected to the buyer’s real estate professional."],
      ["Broker-to-broker coordination", "Carlos and United Realty Group structure the professional introduction."],
    ],
    networkCta: "Discuss an activation",
    teamVideoTitle: "United Realty Group — the team behind the Greater Miami activation layer",
    teamVideoLabel: "United Realty Group · Professional network",
    mandateTitleA: "Your local mandate.",
    mandateTitleB: "A coordinated U.S. route.",
    mandateBody: "Your team leads the local transaction. Carlos coordinates eligible South Florida professional exposure and broker cooperation.",
    mandatePoints: ["You retain the listing mandate and control of the local transaction.", "We prepare selected property for professional visibility within the Greater Miami agent network.", "Qualified buyer interest can be introduced directly back to your team."],
    trustKicker: "South Florida principal",
    trustTitle: "Carlos Uzcategui",
    trustSub: "South Florida real estate since 2001",
    trustBody: "A Florida-licensed principal coordinating bilingual property review, U.S. activation, and structured introductions through United Realty Group.",
    credentials: ["Florida licensed since 2001", "CLHMS · Certified Luxury Home Marketing Specialist · Certified Seller Representative", "English & Spanish · South Florida, Spain and LATAM coordination", "United Realty Group · Florida office network"],
    closeTitle: "Ready to expand your property’s professional reach in the U.S.?",
    closeBody: "Present one qualified property or request a private discussion about an agency, developer, or portfolio activation route.",
    closeCta: "Request a Private Global Desk Discussion",
    formIntro: "Present a qualified opportunity",
    formBody: "Tell us whether you represent a property, agency or development, and what you want to discuss. We review eligibility and commercial terms privately, property by property, before proposing an activation route.",
    faqTitle: "Common questions",
    faqs: [
      ["Can Spanish or European properties be listed directly on the Miami MLS?", "Yes. Through a bilateral mandate structure, Carlos Uzcategui operates as the licensed Florida principal of record (Realtor® SL705771 · United Realty Group) placing eligible prime international inventory directly into the Miami MLS for discovery by 93,000 South Florida member agents and their buyer clients, while the local Spanish agency retains the mandate, on-the-ground client relationship, and local closing."],
      ["Is Miami Global Desk another property portal?", "No. It is a professional activation and cooperation layer for selected international property entering a South Florida real estate conversation."],
      ["Does my local mandate change?", "No. The originating agency, developer, or listing professional keeps the mandate, client relationship, local negotiation, and closing."],
      ["Who provides property photography, renderings, and documentation?", "Originating listing principals, developers, and cooperating agencies provide verified professional photography, architectural renderings, floor plans, and property documentation. The Miami Global Desk provides licensed Florida MLS activation, professional distribution across the 93,000-member network, bilingual property positioning, and broker-to-broker cooperation management. Carlos operates as the licensed Florida-side principal of record (Realtor® SL705771 · United Realty Group) and does not hold a real estate broker or agency license in Spain."],
      ["What happens when buyer interest is identified?", "Relevant interest can be prepared and introduced to the originating team, which controls the local transaction and next steps."],
      ["Is exposure or a buyer guaranteed?", "No. Activation is subject to brokerage approval, platform rules, property eligibility, cooperation terms, and applicable compliance requirements."],
    ],
    compliance: "Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.",
    pageTitle: "Miami Global Desk | International Listing Activation",
    pageDescription: "Miami Global Desk activates selected international property for professional South Florida visibility and buyer-agent cooperation while the local listing mandate remains with the originating team.",
  },
  es: {
    product: "Miami Global Desk · Activación Internacional de Propiedades",
    title: "Posicione su propiedad internacional ante el mercado inmobiliario profesional del sur de Florida.",
    lead: "Miami Global Desk conecta propiedades internacionales seleccionadas con la red local de agentes inmobiliarios de Greater Miami.",
    body: "Cree visibilidad y oportunidades de cooperación con agentes locales que representan compradores cualificados, mientras el mandato, la relación con el cliente y la operación permanecen con su equipo.",
    explore: "Explorar la activación en EE. UU.",
    discuss: "Solicitar conversación privada",
    proof: [["93,000", "Miembros de la asociación"], ["La más grande del mundo", "Asociación local de Realtors®"], ["437+", "Acuerdos internacionales firmados"]],
    proofNote: "Fuente: anuncio de fusión de Miami and South Florida REALTORS®. Vigente desde el 11 de mayo de 2026.",
    workflowKicker: "Una ruta profesional directa",
    workflowTitle: "Cómo funciona Miami Global Desk",
    workflowBody: "Una sola ruta de activación hacia la red profesional de agentes de Greater Miami. La agencia o promotora de origen conserva el mandato y cierra la operación local.",
    selectedStage: "Etapa seleccionada",
    stages: [
      { title: "Propiedad internacional y mandato local", shortTitle: ["Propiedad internacional", "Mandato local"], detail: "Su agencia, promotora o profesional autorizado conserva el mandato y la relación local." },
      { title: "Activación en el sur de Florida", shortTitle: ["Activación en", "sur de Florida"], detail: "Carlos y United Realty Group preparan la oportunidad para una ruta profesional elegible en el sur de Florida." },
      { title: "Red de agentes de Greater Miami", shortTitle: ["Red de agentes", "de Greater Miami"], detail: "Agentes inmobiliarios locales pueden evaluar inventario elegible y seleccionado para compradores que representan." },
      { title: "Introducción cualificada", shortTitle: ["Introducción de", "interés cualificado"], detail: "El interés relevante puede prepararse, cualificarse y presentarse directamente al equipo de origen." },
      { title: "Negociación y cierre local", shortTitle: ["Negociación y", "cierre local"], detail: "Su equipo local gestiona visitas, negociación, documentación y cierre en la jurisdicción del inmueble." },
    ] satisfies ActivationStage[],
    networkKicker: "Conexión con el mercado local",
    networkTitle: "Agentes locales. Relaciones con compradores cualificados. Estructura de brokerage.",
    networkBody: "El inventario internacional seleccionado se prepara para la revisión profesional de agentes inmobiliarios de Greater Miami, no para tráfico anónimo de consumidores.",
    networkSteps: [
      ["Revisión por agentes de Greater Miami", "Agentes locales evalúan la relevancia para los compradores que representan."],
      ["Representación del comprador", "El interés permanece conectado con el profesional inmobiliario del comprador."],
      ["Coordinación broker a broker", "Carlos y United Realty Group estructuran la presentación profesional."],
    ],
    networkCta: "Conversar sobre una activación",
    teamVideoTitle: "United Realty Group — el equipo detrás de la capa de activación en Greater Miami",
    teamVideoLabel: "United Realty Group · Red profesional",
    mandateTitleA: "Su mandato local.",
    mandateTitleB: "Una ruta coordinada en EE. UU.",
    mandateBody: "Su equipo dirige la operación local. Carlos coordina exposición profesional elegible en el sur de Florida y cooperación entre corredores.",
    mandatePoints: ["Usted conserva el mandato y el control de la operación local.", "Preparamos propiedades seleccionadas para visibilidad profesional dentro de la red de agentes de Greater Miami.", "El interés comprador cualificado puede regresar directamente a su equipo."],
    trustKicker: "Principal en el sur de Florida",
    trustTitle: "Carlos Uzcategui",
    trustSub: "Sector inmobiliario del sur de Florida desde 2001",
    trustBody: "Un principal con licencia de Florida que coordina revisión bilingüe, activación en EE. UU. e introducciones estructuradas a través de United Realty Group.",
    credentials: ["Licenciado en Florida desde 2001", "CLHMS · Certified Luxury Home Marketing Specialist · Certified Seller Representative", "Inglés y español · Coordinación sur de Florida, España y LATAM", "United Realty Group · Red de oficinas en Florida"],
    closeTitle: "¿Listo para ampliar el alcance profesional de su propiedad en EE. UU.?",
    closeBody: "Presente una propiedad cualificada o solicite una conversación privada sobre una ruta de activación para agencia, promotora o portafolio.",
    closeCta: "Solicitar conversación privada Global Desk",
    formIntro: "Presente una oportunidad cualificada",
    formBody: "Indíquenos si representa una propiedad, agencia o promoción y qué desea explorar. Revisamos la elegibilidad y las condiciones comerciales en privado antes de proponer una vía de activación.",
    faqTitle: "Preguntas frecuentes",
    faqs: [
      ["¿Pueden las propiedades de España o Europa publicarse directamente en el MLS de Miami?", "Sí. Mediante una estructura de mandato bilateral, Carlos Uzcategui opera como principal de registro con licencia en Florida (Realtor® SL705771 · United Realty Group), posicionando inventario internacional prime elegible directamente en el MLS de Miami ante 93.000 agentes miembros del sur de Florida y sus clientes compradores, mientras la agencia local en España conserva el mandato, la relación con el cliente y el cierre local."],
      ["¿Miami Global Desk es otro portal inmobiliario?", "No. Es una capa profesional de activación y cooperación para propiedades internacionales seleccionadas que entran en una conversación inmobiliaria en el sur de Florida."],
      ["¿Cambia mi mandato local?", "No. La agencia, promotora o profesional de origen conserva el mandato, la relación con el cliente, la negociación local y el cierre."],
      ["¿Quién proporciona la fotografía, infografías y documentación de la propiedad?", "Los promotores, agencias colaboradoras y profesionales con mandato de origen proporcionan fotografía profesional verificada, infografías arquitectónicas, planos y documentación del inmueble. Miami Global Desk aporta la activación en el MLS de Florida, distribución profesional ante la red de 93.000 miembros, posicionamiento bilingüe y gestión de cooperación broker a broker. Carlos opera como principal de registro con licencia en Florida (Realtor® SL705771 · United Realty Group) y no posee licencia de agencia ni corretaje en España."],
      ["¿Qué ocurre cuando se identifica interés comprador?", "El interés relevante puede prepararse y presentarse al equipo de origen, que controla la operación local y los siguientes pasos."],
      ["¿Se garantiza exposición o comprador?", "No. La activación está sujeta a aprobación de corretaje, reglas de plataforma, elegibilidad del inmueble, términos de cooperación y requisitos de cumplimiento."],
    ],
    compliance: "Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.",
    pageTitle: "Miami Global Desk | Activación Internacional de Propiedades",
    pageDescription: "Miami Global Desk activa propiedades internacionales seleccionadas para visibilidad profesional y cooperación con agentes compradores del sur de Florida, preservando el mandato local.",
  },
} as const;

export default function GlobalDeskPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [intakeTab, setIntakeTab] = useState<"developer" | "cooperation">("developer");
  const [activeNetStep, setActiveNetStep] = useState(0);
  const [activeMandateRole, setActiveMandateRole] = useState<"local" | "florida" | "protection">("local");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gd-lang");
      if (saved === "en" || saved === "es") setLang(saved);
    } catch { /* Keep the English default when storage is unavailable. */ }
  }, []);

  const chooseLanguage = (next: Lang) => {
    setLang(next);
    try { localStorage.setItem("gd-lang", next); } catch { /* Visible selection still works. */ }
  };

  const t = COPY[lang];
  const whatsapp = lang === "es" ? WA_ES : WA_US;
  const whatsappMessage = lang === "es"
    ? "Hola Carlos, deseo solicitar una conversación privada sobre una oportunidad cualificada para Miami Global Desk."
    : "Hello Carlos, I would like a private discussion about a qualified Miami Global Desk opportunity.";

  const mandateRoles = lang === "es"
    ? {
        local: {
          badge: "En Jurisdicción de Origen",
          title: "Socio local (Agencia / Promotor)",
          summary: "Mandato · Visitas · Negociación local y cierre",
          points: [
            "Conserva el mandato exclusivo y la relación directa con el propietario.",
            "Coordina visitas presenciales, due diligence legal y notaría local.",
            "Dirige la negociación final y el cierre en la jurisdicción del inmueble.",
          ],
        },
        florida: {
          badge: "En el Sur de Florida",
          title: "Carlos / United Realty Group",
          summary: "Revisión de elegibilidad · Activación aprobada en EE. UU. · Introducciones profesionales",
          points: [
            "Opera como Realtor® con licencia en Florida (SL705771) ante el ecosistema MLS.",
            "Posiciona el activo bilingüe ante la red de 93,000 miembros de la asociación.",
            "Filtra y estructura introducciones con agentes de compradores cualificados.",
          ],
        },
        protection: {
          badge: "Acuerdo Bilateral Escrito",
          title: "Protección de Mandato y Honorarios",
          summary: "Términos comerciales firmados propiedad por propiedad antes de activar.",
          points: [
            t.mandatePoints[0],
            t.mandatePoints[1],
            t.mandatePoints[2],
          ],
        },
      }
    : {
        local: {
          badge: "In Originating Jurisdiction",
          title: "Local partner (Agency / Developer)",
          summary: "Mandate · Showings · Local negotiation and closing",
          points: [
            "Retains the primary listing mandate and direct seller relationship.",
            "Manages on-the-ground property showings, legal due diligence, and local notary.",
            "Controls final contract negotiation and closing in the property's jurisdiction.",
          ],
        },
        florida: {
          badge: "In South Florida",
          title: "Carlos / United Realty Group",
          summary: "Eligibility review · Approved U.S. activation · Professional introductions",
          points: [
            "Operates as the Florida-licensed Realtor® of record (SL705771 · United Realty Group).",
            "Prepares bilingual positioning for the 93,000-member South Florida ecosystem.",
            "Screens and structures introductions with cooperating buyer agents.",
          ],
        },
        protection: {
          badge: "Written Bilateral Terms",
          title: "Mandate & Fee Protection",
          summary: "Commercial cooperation agreed in writing property by property before launch.",
          points: [
            t.mandatePoints[0],
            t.mandatePoints[1],
            t.mandatePoints[2],
          ],
        },
      };

  const currentRole = mandateRoles[activeMandateRole];

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{t.pageTitle}</title>
        <meta name="description" content={t.pageDescription} />
        <link rel="canonical" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/spain-desk" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://homesprofessional.com/global-desk" />
        <meta property="og:title" content={t.pageTitle} />
        <meta property="og:description" content={t.pageDescription} />
        <meta property="og:locale" content={lang === "es" ? "es_ES" : "en_US"} />
        <meta property="og:image" content="https://homesprofessional.com/images/global-desk-hero-madrid-v2.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.pageTitle} />
        <meta name="twitter:description" content={t.pageDescription} />
        <meta name="twitter:image" content="https://homesprofessional.com/images/global-desk-hero-madrid-v2.webp" />
      </Helmet>
      <JsonLd id="global-desk-breadcrumb" data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://homesprofessional.com/" }, { "@type": "ListItem", position: 2, name: "Miami Global Desk", item: "https://homesprofessional.com/global-desk" }] }} />
      <JsonLd
        id="global-desk-faq"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: t.faqs.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        }}
      />

      <main id="main-content" className="min-h-screen overflow-x-hidden bg-white text-navy pb-28 lg:pb-0">
        <Navbar />

        <section data-sticky-cta-guard className="global-desk-hero" aria-labelledby="global-hero-heading" lang={lang}>
          <div className="global-desk-hero-art" aria-hidden="true">
            <HeroVideoBackdrop name="global" />
          </div>
          <div className="global-desk-hero-inner">
            <div className="global-desk-hero-topline">
              <p className="global-desk-hero-eyebrow">Miami Global Desk</p>
              <div className="global-desk-hero-language" role="group" aria-label={lang === "es" ? "Idioma de Global Desk" : "Global Desk language"}>
                {(["en", "es"] as Lang[]).map(option => (
                  <button key={option} type="button" onClick={() => chooseLanguage(option)} aria-pressed={lang === option} aria-label={option === "en" ? "EN — View Global Desk in English" : "ES — Ver Global Desk en español"}>{option.toUpperCase()}</button>
                ))}
              </div>
            </div>
            <div className="global-desk-hero-copy">
              <h1 id="global-hero-heading">
                <span>{lang === "es" ? "Propiedad internacional." : "International Property."}</span>{" "}
                <span>{lang === "es" ? "Conexiones con agentes en Miami." : "Miami Agent Connections."}</span>
              </h1>
              <p className="global-desk-hero-summary">{lang === "es" ? "Para propietarios, agencias y promotores: presentamos propiedades internacionales seleccionadas a agentes de compradores del sur de Florida." : "For property owners, agencies and developers: introduce selected international inventory to relevant South Florida buyer agents."}</p>
              <div className="global-desk-hero-actions">
                <a href="#listing-request" className="global-desk-hero-primary" onClick={() => pushEvent("global_desk_cta_click", {cta_type: "private_discussion",cta_location: "hero",language: lang})}>{lang === "es" ? "Consultar su propiedad" : "Discuss Your Listing"}<ArrowRight size={18} aria-hidden="true" /></a>
                <a href="#gilmar-global-desk" className="global-desk-hero-secondary" onClick={() => pushEvent("global_desk_cta_click", {cta_type: "explore_gilmar_spain",cta_location: "hero",language: lang})}>{lang === "es" ? "Ver Portal GILMAR España" : "GILMAR Spain Showcase"}</a>
                <a href="#how-it-works" className="global-desk-hero-secondary" onClick={() => pushEvent("global_desk_cta_click", {cta_type: "explore_activation",cta_location: "hero",language: lang})}>{lang === "es" ? "Cómo funciona" : "How It Works"}</a>
              </div>
              <p className="global-desk-hero-signature">Carlos Uzcategui <span aria-hidden="true">·</span> United Realty Group</p>
              <AssociationFilms lang={lang} location="global_desk_hero" />
            </div>
            <div className="global-desk-hero-footer">
              <p className="global-desk-hero-geography">Madrid <span aria-hidden="true">·</span> {lang === "es" ? "Latinoamérica" : "Latin America"} <ArrowRight size={14} aria-hidden="true" /> Miami</p>
              <p className="global-desk-hero-terms">{lang === "es" ? "Su equipo conserva el mandato local, la negociación y el cierre." : "Your team retains the local mandate, negotiation and closing."}<span>{lang === "es" ? "Activación sujeta a los requisitos de la correduría, MLS, licencias y cooperación." : "Activation subject to brokerage, MLS, licensing and cooperation requirements."}</span></p>
            </div>
            <p className="global-desk-hero-caption">{lang === "es" ? "Arquitectura conceptual · No es una propiedad en venta" : "Conceptual architecture · Not a property listing"}</p>
          </div>
        </section>

        <section aria-label="Network proof" className="border-b border-bone bg-white px-6 py-10 md:py-12">
          <div className="mx-auto max-w-6xl">
            <DistributionMetrics lang={lang} />
            <GlobalResearchLinks lang={lang} />
          </div>
        </section>

        {/* GILMAR × United Realty Group Active Bilateral Showcase */}
        <GilmarGlobalDeskSection variant="global-desk" lang={lang} />

        {/* MIAMI REALTORS® + RWorld Video Hub (Only a REALTOR® · Global Ecosystem) */}
        <RealtorAssociationVideoHub variant="global-desk" lang={lang} />

        <section id="how-it-works" className="scroll-mt-20 bg-ivory px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-ink">{t.workflowKicker}</p>
              <h2 className="mt-4 text-balance font-serif text-4xl leading-tight text-navy-deep md:text-5xl">{t.workflowTitle}</h2>
              <p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-navy/80 md:text-lg">{t.workflowBody}</p>
            </div>
            <div className="mt-10 border-y border-bone bg-white px-3 py-7 md:mt-14 md:px-8 md:py-10">
              <GlobalActivationFlow stages={[...t.stages]} ariaLabel={t.workflowTitle} selectedLabel={t.selectedStage} />
            </div>

            <div id="local-network" className="scroll-mt-24 mt-12 lg:mt-16">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                <div className="max-w-3xl">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-ink">{t.networkKicker}</p>
                  <h3 className="mt-3 text-balance font-serif text-3xl leading-[1.08] text-navy-deep md:text-5xl">{t.networkTitle}</h3>
                </div>
                <p className="max-w-md font-sans text-sm leading-relaxed text-navy/75">{t.networkBody}</p>
              </div>

              <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-[1.16fr_0.84fr] lg:gap-8">
                <figure className="flex min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-bone bg-white shadow-sm">
                  <div className="relative aspect-video w-full overflow-hidden bg-navy-deep">
                    <video
                      src="/videos/urg_corporate_hq.mp4"
                      poster="/images/urg-corporate-hq-aerial.jpg"
                      title={t.teamVideoTitle}
                      controls
                      playsInline
                      muted
                      autoPlay
                      loop
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                    <a
                      href="https://www.youtube.com/watch?v=M8Hx5D5ghag"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-embed="https://www.youtube-nocookie.com/embed/M8Hx5D5ghag?rel=0&modestbranding=1"
                      className="sr-only"
                    >
                      {t.teamVideoTitle}
                    </a>
                  </div>
                  <figcaption className="flex min-h-14 flex-wrap items-center justify-between gap-2 bg-navy-deep px-5 py-4 font-mono text-[9px] font-semibold uppercase tracking-[0.19em] text-gold sm:px-6 sm:text-[10px]">
                    <span>{t.teamVideoLabel} · Plantation HQ &amp; 19 FL Office Locations</span>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-white/60">3,500+ FL Agents</span>
                      <a
                        href="https://www.urgfl.com/office-locations/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-white/20 px-2.5 py-1 text-[9px] text-white/80 transition-colors hover:border-gold hover:text-gold"
                      >
                        {lang === "es" ? "19 Oficinas en FL ↗" : "19 FL Office Locations ↗"}
                      </a>
                      <a
                        href="https://www.youtube.com/watch?v=M8Hx5D5ghag"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-gold/40 px-2.5 py-1 text-[9px] text-gold transition-colors hover:border-gold hover:text-white"
                      >
                        {lang === "es" ? "Ver en YouTube ↗" : "Watch on YouTube ↗"}
                      </a>
                    </div>
                  </figcaption>
                </figure>

                {/* Interactive 3-Step Network Selector instead of static list */}
                <div className="flex flex-col justify-between rounded-xl bg-navy-deep p-5 text-white sm:p-6" aria-label={t.networkTitle}>
                  <div className="space-y-3" role="tablist" aria-label={t.networkTitle}>
                    {t.networkSteps.map(([title, body], index) => {
                      const StepIcon = [UsersRound, UserRoundCheck, Handshake][index];
                      const selected = activeNetStep === index;
                      return (
                        <button
                          key={title}
                          type="button"
                          role="tab"
                          aria-selected={selected}
                          onClick={() => setActiveNetStep(index)}
                          className={`flex w-full items-start gap-3.5 rounded-lg border p-4 text-left transition-all ${
                            selected
                              ? "border-gold bg-white/[0.08] shadow-md"
                              : "border-white/10 bg-white/[0.02] hover:border-gold/40"
                          }`}
                        >
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
                              selected
                                ? "border-gold bg-gold text-navy-deep"
                                : "border-gold/40 bg-navy-deep text-gold"
                            }`}
                          >
                            <StepIcon size={18} strokeWidth={1.6} aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-gold">
                              0{index + 1} · {lang === "es" ? "Paso" : "Step"}
                            </p>
                            <h4 className="mt-0.5 font-serif text-lg leading-tight text-white">{title}</h4>
                            <p className="mt-1 font-sans text-xs leading-relaxed text-white/80">{body}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                    <a
                      href="#listing-request"
                      onClick={() => pushEvent("global_desk_cta_click", { cta_type: "network_activation", cta_location: "local_network", language: lang })}
                      className="inline-flex w-full items-center justify-center gap-2 rounded bg-gold px-5 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-navy-deep transition-colors hover:bg-white"
                    >
                      {t.networkCta}
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Bilateral Mandate Architecture */}
        <section id="mandate" data-sticky-cta-guard data-global-partnership className="bg-white-soft px-6 py-14 text-navy-deep md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Left Column: Interactive Role Switcher (7 cols) */}
              <div className="lg:col-span-7">
                <p className="story-eyebrow text-gold-ink">
                  {lang === "es" ? "Mandato local · Cooperación en EE. UU." : "Local mandate · U.S. cooperation"}
                </p>
                <h2 className="mt-3 font-serif text-3xl leading-[1.08] sm:text-4xl md:text-5xl">
                  {t.mandateTitleA} <span className="text-gold-ink">{t.mandateTitleB}</span>
                </h2>
                <p className="mt-3 font-sans text-sm leading-relaxed text-navy/80 sm:text-base">
                  {t.mandateBody}
                </p>

                {/* Role Switcher Tabs */}
                <div className="mt-6 grid grid-cols-3 gap-2" role="tablist" aria-label="Bilateral mandate roles">
                  {[
                    { id: "local", icon: Handshake, label: lang === "es" ? "Socio local" : "Local partner" },
                    { id: "florida", icon: UsersRound, label: "Carlos / URG" },
                    { id: "protection", icon: ShieldCheck, label: lang === "es" ? "Protección" : "Protection" },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const selected = activeMandateRole === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setActiveMandateRole(tab.id as "local" | "florida" | "protection")}
                        className={`flex items-center gap-2 rounded-lg border px-3.5 py-3 text-left transition-all ${
                          selected
                            ? "border-gold bg-navy-deep text-white shadow-md"
                            : "border-bone bg-white text-navy-deep hover:border-gold/60"
                        }`}
                      >
                        <Icon size={16} className={selected ? "text-gold shrink-0" : "text-gold-ink shrink-0"} aria-hidden="true" />
                        <span className="truncate font-mono text-[10px] font-semibold uppercase tracking-[0.12em]">
                          {tab.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Role Detail Card */}
                <article className="mt-3 rounded-xl border border-gold/35 bg-navy-deep p-6 text-white shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <h3 className="font-serif text-xl text-white">{currentRole.title}</h3>
                    <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-gold">
                      {currentRole.badge}
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-gold">
                    {currentRole.summary}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {currentRole.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5 font-sans text-xs leading-relaxed text-white/85 sm:text-sm">
                        <Check size={15} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <a
                    href="#listing-request"
                    onClick={() => {
                      setIntakeTab("cooperation");
                      pushEvent("global_desk_cta_click", { cta_type: "cooperation_review", cta_location: "mandate", language: lang });
                    }}
                    className="story-cta"
                  >
                    {lang === "es" ? "Conversar sobre cooperación España–sur de Florida" : "Discuss a Spain–South Florida Cooperation Opportunity"}
                    <ArrowRight size={18} aria-hidden="true" />
                  </a>
                  <p className="text-xs leading-relaxed text-navy/70">
                    {lang === "es"
                      ? "Sujeto a elegibilidad de la propiedad, aprobación del corretaje, normas MLS y términos escritos de cooperación."
                      : "Subject to property eligibility, brokerage approval, MLS rules and written cooperation terms."}
                  </p>
                </div>
              </div>

              {/* Right Column: Editorial Waterfront Visual (5 cols) */}
              <figure className="lg:col-span-5">
                <img
                  src="/images/carlos-waterfront-editorial-20261012.jpg"
                  alt={lang === "es" ? "Carlos Uzcategui junto al waterfront de Miami" : "Carlos Uzcategui at the Miami waterfront"}
                  width={1920}
                  height={1080}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full rounded-xl object-cover object-[62%_center] shadow-lg"
                />
              </figure>
            </div>
          </div>
        </section>

        <section id="carlos" data-sticky-cta-guard data-global-principal className="border-y border-bone bg-white-soft px-6 py-14 text-navy-deep md:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-12">
            <figure className="mx-auto w-full max-w-[260px] lg:max-w-xs">
              <img src="/images/carlos-headshot.jpg" alt={lang === "es" ? "Carlos Uzcategui, Realtor con licencia de Florida SL705771, United Realty Group" : "Carlos Uzcategui, Florida Licensed Realtor SL705771, United Realty Group"} width={800} height={817} loading="lazy" decoding="async" className="aspect-[4/5] w-full rounded-xl object-cover object-top shadow-md" />
            </figure>
            <div className="min-w-0">
              <p className="story-eyebrow text-gold-ink">{t.trustKicker}</p>
              <h2 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{t.trustTitle}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {t.credentials.map((credential) => (
                  <div key={credential} className="flex items-start gap-2.5 rounded-lg border border-bone bg-white p-3.5 text-sm leading-snug text-navy shadow-sm">
                    <Check size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-gold-ink" />
                    <span>{credential}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a href="#listing-request" onClick={() => pushEvent("global_desk_cta_click", { cta_type: "principal_review", cta_location: "principal", language: lang })} className="story-cta">{t.closeCta}<ArrowRight size={18} aria-hidden="true" /></a>
                <p className="text-xs leading-relaxed text-navy/75 max-w-sm">{lang === "es" ? "Comparta los detalles de la propiedad y del mandato. Carlos revisa la elegibilidad antes de proponer una vía de cooperación." : "Share the property and mandate details. Carlos reviews eligibility before proposing a cooperation route."}</p>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-9 grid max-w-6xl gap-4 border-y border-bone py-5 text-base text-navy sm:grid-cols-3">
            <a href={WA_US} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 underline underline-offset-4"><MessageCircle size={20} aria-hidden="true" />USA +1 954-865-6622</a>
            <a href={WA_ES} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 underline underline-offset-4"><MessageCircle size={20} aria-hidden="true" />España +34 646 85 30 78</a>
            <a href="mailto:contact@carlosre.com" className="inline-flex min-h-11 items-center gap-3 underline underline-offset-4"><Mail size={20} aria-hidden="true" />contact@carlosre.com</a>
          </div>
          <p className="mx-auto mt-5 max-w-6xl text-sm leading-relaxed text-navy">{t.compliance}</p>
        </section>

        <section className="bg-white px-6 py-14 md:py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-center font-serif text-3xl text-navy-deep md:text-4xl">{t.faqTitle}</h2>
            <FaqAccordion
              faqs={t.faqs.map(([q, a]) => ({ q, a }))}
              tone="light"
              defaultOpen={0}
              className="mt-8"
            />
          </div>
        </section>

        <section id="listing-request" className="scroll-mt-20 bg-navy-deep px-6 py-16 text-white md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 border-b border-white/12 pb-14 lg:grid-cols-[1fr_auto] lg:items-end"><div className="max-w-3xl"><h2 className="text-balance font-serif text-4xl leading-tight text-white md:text-5xl">{t.closeTitle}</h2><p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/70 md:text-lg">{t.closeBody}</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><a href={`${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noopener noreferrer" onClick={() => pushEvent("global_desk_cta_click", { cta_type: "whatsapp_private_discussion", cta_location: "close", language: lang })} className="inline-flex min-h-12 items-center justify-center gap-3 bg-gold px-7 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-navy-deep transition-colors hover:bg-white"><MessageCircle size={15} />{t.closeCta}</a><a href="mailto:contact@carlosre.com" className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/20 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white/80 transition-colors hover:border-gold hover:text-gold"><Mail size={14} />contact@carlosre.com</a></div></div>
            <div className="mx-auto mt-14 max-w-3xl">
              {/* Move 7: Bifurcated Global Desk Inbound Tabs */}
              <div className="mb-8 flex justify-center">
                <div className="inline-flex rounded-lg border border-white/15 bg-white/[0.05] p-1 shadow-inner">
                  <button
                    type="button"
                    onClick={() => {
                      setIntakeTab("developer");
                      pushEvent("global_desk_tab_switch", { tab: "developer", language: lang });
                    }}
                    className={`rounded-md px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-all sm:px-6 ${
                      intakeTab === "developer"
                        ? "bg-gold text-navy-deep shadow-md font-bold"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {lang === "es" ? "Promotores y Mandatos Prime" : "Developer & Prime Mandates"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIntakeTab("cooperation");
                      pushEvent("global_desk_tab_switch", { tab: "cooperation", language: lang });
                    }}
                    className={`rounded-md px-4 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition-all sm:px-6 ${
                      intakeTab === "cooperation"
                        ? "bg-gold text-navy-deep shadow-md font-bold"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {lang === "es" ? "Agencias y Brokers Colaboradores" : "Broker & Agent Cooperation"}
                  </button>
                </div>
              </div>

              <div className={intakeTab === "developer" ? "block" : "hidden"}>
                <div className="mb-8 text-center">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">{t.formIntro}</p>
                  <p className="mx-auto mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/70">{t.formBody}</p>
                </div>
                <GlobalDeskListingForm lang={lang} />
              </div>

              <div className={intakeTab === "cooperation" ? "block" : "hidden"}>
                <AgencyPartnerForm
                  source="global-desk-cooperation"
                  eyebrow={lang === "es" ? "Miami Global Desk · Cooperación Profesional" : "Miami Global Desk · Professional Cooperation"}
                  heading={lang === "es" ? "Registro de Agencias y Brokers Colaboradores" : "Licensed Broker & Agent Cooperation Intake"}
                  intro={lang === "es" ? "Para agencias, brokers y agentes inmobiliarios licenciados fuera del sur de Florida. Comparta el perfil de su cliente o cartera para estructurar un acuerdo de cooperación profesional y referido." : "For licensed agents, brokers, and cooperating agencies outside South Florida. Submit client profiles or portfolio inquiries to structure formal broker-to-broker cooperation and referral agreements."}
                />
              </div>
            </div>
            <div className="mt-12 border-t border-white/10 pt-8 text-center"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">{t.compliance}</p><div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-3 font-mono text-[10px] uppercase tracking-[0.12em] text-white/55"><a href={WA_US} target="_blank" rel="noopener noreferrer" className="hover:text-gold">WhatsApp USA +1 954-865-6622</a><a href={WA_ES} target="_blank" rel="noopener noreferrer" className="hover:text-gold">WhatsApp Spain +34 646 85 30 78</a><a href="tel:+19544502000" className="hover:text-gold">Office 1-954-450-2000</a></div></div>
          </div>
        </section>

        <Footer />
        <MobileStickyCTA lang={lang} />
      </main>
    </>
  );
}
