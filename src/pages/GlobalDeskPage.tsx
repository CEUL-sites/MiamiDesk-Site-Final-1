import "../components/advisory-heroes.css";
import { DistributionMetrics } from "../components/DistributionMetrics";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Check, Handshake, Mail, MessageCircle, UserRoundCheck, UsersRound } from "lucide-react";
import { motion } from "motion/react";
import { Footer } from "../components/Footer";
import { GlobalActivationFlow, type ActivationStage } from "../components/GlobalActivationFlow";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { Navbar } from "../components/Navbar";
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

const reveal = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55 } } };

export default function GlobalDeskPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [intakeTab, setIntakeTab] = useState<"developer" | "cooperation">("developer");

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
      </Helmet>
      <JsonLd id="global-desk-breadcrumb" data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://homesprofessional.com/" }, { "@type": "ListItem", position: 2, name: "Miami Global Desk", item: "https://homesprofessional.com/global-desk" }] }} />
      <JsonLd
        id="global-desk-faq"
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Can Spanish or European properties be listed directly on the Miami MLS?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Through a bilateral mandate structure, Carlos Uzcategui operates as the licensed Florida principal of record (Realtor® SL705771 · United Realty Group) placing eligible prime international inventory directly into the Miami MLS for discovery by 93,000 South Florida member agents and their buyer clients, while the local Spanish agency retains the mandate, on-the-ground client relationship, and local closing.",
              },
            },
            {
              "@type": "Question",
              name: "Is Miami Global Desk another property portal?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. It is a professional activation and cooperation layer for selected international property entering a South Florida real estate conversation.",
              },
            },
            {
              "@type": "Question",
              name: "Does my local mandate change?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. The originating agency, developer, or listing professional keeps the mandate, client relationship, local negotiation, and closing.",
              },
            },
            {
              "@type": "Question",
              name: "Who provides property photography, renderings, and documentation?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Originating listing principals, developers, and cooperating agencies provide verified professional photography, architectural renderings, floor plans, and property documentation. The Miami Global Desk provides licensed Florida MLS activation, professional distribution across the 93,000-member network, bilingual property positioning, and broker-to-broker cooperation management. Carlos operates as the licensed Florida-side principal of record (Realtor® SL705771 · United Realty Group) and does not hold a real estate broker or agency license in Spain.",
              },
            },
            {
              "@type": "Question",
              name: "What happens when buyer interest is identified?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Relevant interest can be prepared and introduced to the originating team, which controls the local transaction and next steps.",
              },
            },
            {
              "@type": "Question",
              name: "Is exposure or a buyer guaranteed?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Activation is subject to brokerage approval, platform rules, property eligibility, cooperation terms, and applicable compliance requirements.",
              },
            },
          ],
        }}
      />

      <main id="main-content" className="min-h-screen overflow-x-hidden bg-white text-navy pb-20 lg:pb-0">
        <Navbar />

        <section data-sticky-cta-guard className="advisory-hero" aria-labelledby="global-hero-heading">
          <div className="global-language" aria-label="Global Desk language">{(["en","es"] as Lang[]).map(option => <button key={option} type="button" onClick={() => chooseLanguage(option)} aria-pressed={lang === option} aria-label={option === "en" ? "EN — View Global Desk in English" : "ES — Ver Global Desk en español"}>{option.toUpperCase()}</button>)}</div>
          <div className="advisory-hero-inner"><div>
            <p className="advisory-eyebrow">Miami Global Desk</p>
            <h1 id="global-hero-heading">{lang === "es" ? "Propiedad internacional. Conexiones profesionales en el sur de Florida." : "International Property. A South Florida Professional Audience."}</h1>
            <p className="advisory-summary">{lang === "es" ? "Preparamos inventario internacional seleccionado para su presentación y cooperación con agentes de compradores del sur de Florida, junto con agencias y promotores autorizados." : "We prepare selected overseas inventory for relevant South Florida buyer-agent discovery and cooperation, working with authorized agencies and developers."}</p>
            <div className="advisory-actions"><a href="#listing-request" className="advisory-primary" onClick={() => pushEvent("global_desk_cta_click", {cta_type: "private_discussion",cta_location: "hero",language: lang})}>{lang === "es" ? "Consultar una propiedad internacional" : "Discuss an International Listing"}</a><a href="#how-it-works" className="advisory-secondary" onClick={() => pushEvent("global_desk_cta_click", {cta_type: "explore_activation",cta_location: "hero",language: lang})}>{lang === "es" ? "Explorar el modelo de activación" : "Explore the Activation Model"}</a></div>
            <p className="advisory-note">{lang === "es" ? "Su equipo conserva el mandato local, la negociación y el cierre. La activación está sujeta a los requisitos aplicables de la correduría, MLS, licencias y cooperación." : "Your team retains the local mandate, negotiation and closing. Activation is subject to applicable brokerage, MLS, licensing and cooperation requirements."}</p>
          </div><figure className="global-connections">
            <svg viewBox="0 0 500 330" role="img" aria-label={lang === "es" ? "Relaciones profesionales: Miami, Madrid y Latinoamérica" : "Professional relationships between Miami, Madrid and Latin America"}>
              <path className="connection" d="M100 125 Q240 -15 400 65 M100 125 Q70 240 230 260 M400 65 Q420 250 230 260" />
              <circle cx="100" cy="125" r="7" fill="#d7bc8b" /><circle cx="400" cy="65" r="5" fill="#d7bc8b" /><circle cx="230" cy="260" r="5" fill="#d7bc8b" />
              <text x="70" y="160">Miami</text><text x="370" y="42">Madrid</text><text x="170" y="300">{lang === "es" ? "Latinoamérica" : "Latin America"}</text>
            </svg>
            <figcaption className="advisory-note">{lang === "es" ? "Esquema de cooperación profesional. No representa actividad en tiempo real ni exposición garantizada." : "Professional cooperation schematic. Not live activity or guaranteed exposure."}</figcaption>
          </figure></div>
        </section>

        <section aria-label="Network proof" className="border-b border-bone bg-white px-6 py-10 md:py-12">
          <div className="mx-auto max-w-6xl">
            <DistributionMetrics lang={lang} />
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-20 bg-ivory px-6 py-16 md:py-24">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }} variants={reveal} className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center"><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-ink">{t.workflowKicker}</p><h2 className="mt-4 text-balance font-serif text-4xl leading-tight text-navy-deep md:text-5xl">{t.workflowTitle}</h2><p className="mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed text-navy/70 md:text-lg">{t.workflowBody}</p></div>
            <div className="mt-10 border-y border-bone bg-white px-3 py-7 md:mt-14 md:px-8 md:py-10"><GlobalActivationFlow stages={[...t.stages]} ariaLabel={t.workflowTitle} selectedLabel={t.selectedStage} /></div>
            <div id="local-network" className="scroll-mt-24 mt-12 lg:mt-16">
              <div className="max-w-4xl">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-ink">{t.networkKicker}</p>
                <h3 className="mt-4 text-balance font-serif text-4xl leading-[1.08] text-navy-deep md:text-5xl">{t.networkTitle}</h3>
                <p className="mt-5 max-w-3xl font-sans text-base leading-[1.8] text-navy/72 md:text-lg">{t.networkBody}</p>
              </div>

              <div className="mt-9 grid items-start gap-6 lg:grid-cols-[1.16fr_0.84fr] lg:gap-8">
                <motion.figure initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="flex min-w-0 flex-col overflow-hidden border border-bone bg-white shadow-sm">
                  <div className="relative aspect-video w-full overflow-hidden bg-navy-deep">
                    <iframe src="https://www.youtube-nocookie.com/embed/M8Hx5D5ghag?rel=0&modestbranding=1" title={t.teamVideoTitle} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="absolute inset-0 h-full w-full border-0" />
                  </div>
                  <figcaption className="flex min-h-14 items-center bg-navy-deep px-5 py-4 font-mono text-[9px] font-semibold uppercase tracking-[0.19em] text-gold sm:px-6 sm:text-[10px]">{t.teamVideoLabel}</figcaption>
                </motion.figure>

                <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="relative overflow-hidden bg-navy-deep px-6 py-7 text-white sm:px-7 sm:py-8" aria-label={t.networkTitle}>
                  <div aria-hidden="true" className="absolute bottom-8 left-[3.2rem] top-8 w-px bg-gold/45 sm:left-[3.95rem]" />
                  <ol className="relative space-y-7">
                    {t.networkSteps.map(([title, body], index) => {
                      const StepIcon = [UsersRound, UserRoundCheck, Handshake][index];
                      return (
                        <li key={title} className="relative grid grid-cols-[3.25rem_1fr] gap-4 sm:grid-cols-[3.75rem_1fr] sm:gap-4">
                          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-gold bg-navy-deep text-gold"><StepIcon size={21} strokeWidth={1.45} aria-hidden="true" /></div>
                          <div className="pt-0.5">
                            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-gold">0{index + 1}</p>
                            <h4 className="mt-1 font-serif text-xl leading-tight text-white sm:text-[1.35rem]">{title}</h4>
                            <p className="mt-2 font-sans text-[13px] leading-[1.55] text-white/70">{body}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </motion.div>
              </div>

              <div className="mt-8 flex justify-start lg:justify-center">
                <a href="#listing-request" onClick={() => pushEvent("global_desk_cta_click", { cta_type: "network_activation", cta_location: "local_network", language: lang })} className="inline-flex min-h-12 items-center justify-center gap-3 border border-gold bg-white px-7 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-navy transition-colors hover:bg-gold hover:text-navy-deep">{t.networkCta}<ArrowRight size={15} /></a>
              </div>
            </div>
          </motion.div>
        </section>


        <section id="mandate" data-sticky-cta-guard data-global-partnership className="bg-white-soft px-6 py-14 text-navy-deep md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
              <header>
                <p className="story-eyebrow text-gold-ink">{lang === "es" ? "Mandato local · Cooperación en EE. UU." : "Local mandate · U.S. cooperation"}</p>
                <h2 className="mt-4 font-serif text-4xl leading-[1.08] md:text-5xl">{t.mandateTitleA}<br />{t.mandateTitleB}</h2>
                <p className="mt-5 hidden text-base leading-relaxed text-navy lg:block">{t.mandateBody}</p>
              </header>
              <figure>
                <img src="/images/carlos-waterfront-editorial-20261012.jpg" alt={lang === "es" ? "Carlos Uzcategui junto al waterfront de Miami" : "Carlos Uzcategui at the Miami waterfront"} width={1920} height={1080} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-md object-cover object-[62%_center]" />
              </figure>
              <p className="text-base leading-relaxed text-navy lg:hidden">{t.mandateBody}</p>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <article className="rounded-md border border-bone p-6">
                <Handshake size={26} aria-hidden="true" className="text-gold-ink" />
                <h3 className="mt-4 font-serif text-2xl">{lang === "es" ? "Socio local" : "Local partner"}</h3>
                <p className="mt-3 text-base leading-relaxed text-navy">{lang === "es" ? "Mandato · Visitas · Negociación local y cierre" : "Mandate · Showings · Local negotiation and closing"}</p>
              </article>
              <article className="rounded-md border border-bone p-6">
                <UsersRound size={26} aria-hidden="true" className="text-gold-ink" />
                <h3 className="mt-4 font-serif text-2xl">Carlos / United Realty Group</h3>
                <p className="mt-3 text-base leading-relaxed text-navy">{lang === "es" ? "Revisión de elegibilidad · Activación aprobada en EE. UU. · Introducciones profesionales" : "Eligibility review · Approved U.S. activation · Professional introductions"}</p>
              </article>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-navy">{lang === "es" ? "Sujeto a elegibilidad de la propiedad, aprobación del corretaje, normas MLS y términos escritos de cooperación." : "Subject to property eligibility, brokerage approval, MLS rules and written cooperation terms."}</p>
            <a href="#listing-request" onClick={() => { setIntakeTab("cooperation"); pushEvent("global_desk_cta_click", { cta_type: "cooperation_review", cta_location: "mandate", language: lang }); }} className="story-cta mt-6">{lang === "es" ? "Conversar sobre cooperación España–sur de Florida" : "Discuss a Spain–South Florida Cooperation Opportunity"}<ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </section>

        <section id="carlos" data-sticky-cta-guard data-global-principal className="border-y border-bone bg-white-soft px-6 py-14 text-navy-deep md:py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
            <figure className="mx-auto w-full max-w-[280px] lg:max-w-sm">
              <img src="/images/carlos-headshot.jpg" alt={lang === "es" ? "Carlos Uzcategui, Realtor con licencia de Florida SL705771, United Realty Group" : "Carlos Uzcategui, Florida Licensed Realtor SL705771, United Realty Group"} width={800} height={817} loading="lazy" decoding="async" className="aspect-[4/5] w-full rounded-md object-cover object-top" />
            </figure>
            <div className="min-w-0">
              <p className="story-eyebrow text-gold-ink">{t.trustKicker}</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">{t.trustTitle}</h2>
              <ul className="mt-6 space-y-4">{t.credentials.map((credential) => <li key={credential} className="flex items-start gap-3 text-base leading-relaxed text-navy"><Check size={22} aria-hidden="true" className="mt-0.5 shrink-0 text-gold-ink" />{credential}</li>)}</ul>
              <a href="#listing-request" onClick={() => pushEvent("global_desk_cta_click", { cta_type: "principal_review", cta_location: "principal", language: lang })} className="story-cta mt-7">{t.closeCta}<ArrowRight size={18} aria-hidden="true" /></a>
              <p className="mt-4 text-base leading-relaxed text-navy">{lang === "es" ? "Comparta los detalles de la propiedad y del mandato. Carlos revisa la elegibilidad antes de proponer una vía de cooperación." : "Share the property and mandate details. Carlos reviews eligibility before proposing a cooperation route."}</p>
            </div>
          </div>
          <div className="mx-auto mt-9 grid max-w-6xl gap-4 border-y border-bone py-5 text-base text-navy sm:grid-cols-3">
            <a href={WA_US} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 underline underline-offset-4"><MessageCircle size={20} aria-hidden="true" />USA +1 954-865-6622</a>
            <a href={WA_ES} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-3 underline underline-offset-4"><MessageCircle size={20} aria-hidden="true" />España +34 646 85 30 78</a>
            <a href="mailto:contact@carlosre.com" className="inline-flex min-h-11 items-center gap-3 underline underline-offset-4"><Mail size={20} aria-hidden="true" />contact@carlosre.com</a>
          </div>
          <p className="mx-auto mt-5 max-w-6xl text-sm leading-relaxed text-navy">{t.compliance}</p>
        </section>
        <section className="bg-white px-6 py-14 md:py-20"><div className="mx-auto max-w-4xl"><h2 className="text-center font-serif text-3xl text-navy-deep md:text-4xl">{t.faqTitle}</h2><div className="mt-8 divide-y divide-bone border-y border-bone">{t.faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 font-serif text-lg text-navy-deep marker:hidden">{question}<span aria-hidden="true" className="font-sans text-xl text-gold-ink transition-transform group-open:rotate-45">+</span></summary><p className="max-w-3xl pb-2 pt-3 font-sans text-base leading-[1.8] text-navy/70">{answer}</p></details>)}</div></div></section>
        <JsonLd id="global-desk-faq" data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: t.faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }} />

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

              {intakeTab === "developer" ? (
                <div>
                  <div className="mb-8 text-center">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">{t.formIntro}</p>
                    <p className="mx-auto mt-3 max-w-2xl font-sans text-sm leading-relaxed text-white/70">{t.formBody}</p>
                  </div>
                  <GlobalDeskListingForm lang={lang} />
                </div>
              ) : (
                <div>
                  <AgencyPartnerForm
                    source="global-desk-cooperation"
                    eyebrow={lang === "es" ? "Miami Global Desk · Cooperación Profesional" : "Miami Global Desk · Professional Cooperation"}
                    heading={lang === "es" ? "Registro de Agencias y Brokers Colaboradores" : "Licensed Broker & Agent Cooperation Intake"}
                    intro={lang === "es" ? "Para agencias, brokers y agentes inmobiliarios licenciados fuera del sur de Florida. Comparta el perfil de su cliente o cartera para estructurar un acuerdo de cooperación profesional y referido." : "For licensed agents, brokers, and cooperating agencies outside South Florida. Submit client profiles or portfolio inquiries to structure formal broker-to-broker cooperation and referral agreements."}
                  />
                </div>
              )}
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
