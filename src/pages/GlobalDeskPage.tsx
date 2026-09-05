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
    mandateTitleA: "Your mandate stays with you.",
    mandateTitleB: "We add the U.S. activation layer.",
    mandateBody: "Miami Global Desk is an additional professional distribution and agent-cooperation layer—not another consumer portal and not a replacement for the originating listing team.",
    mandatePoints: ["You retain the listing mandate and control of the local transaction.", "We prepare selected property for professional visibility within the Greater Miami agent network.", "Qualified buyer interest can be introduced directly back to your team."],
    trustKicker: "South Florida principal",
    trustTitle: "Carlos Uzcategui",
    trustSub: "South Florida real estate since 2001",
    trustBody: "A Florida-licensed principal coordinating bilingual property review, U.S. activation, and structured introductions through United Realty Group.",
    credentials: ["Licensed since 2001 · 25 years in South Florida", "Certified Luxury Home Marketing Specialist · Certified Seller Representative", "United Realty Group · 3,500+ agents · 19 Florida office locations", "Bilingual coordination · South Florida ↔ Spain and LATAM"],
    closeTitle: "Ready to expand your property’s professional reach in the U.S.?",
    closeBody: "Present one qualified property or request a private discussion about an agency, developer, or portfolio activation route.",
    closeCta: "Request a Private Global Desk Discussion",
    formIntro: "Present a qualified opportunity",
    formBody: "The existing secure request process remains available below. Commercial terms and eligibility are reviewed privately, property by property.",
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
    mandateTitleA: "Su mandato permanece con usted.",
    mandateTitleB: "Nosotros añadimos la activación en EE. UU.",
    mandateBody: "Miami Global Desk es una capa adicional de distribución profesional y cooperación entre agentes; no es otro portal de consumo ni reemplaza al equipo captador de origen.",
    mandatePoints: ["Usted conserva el mandato y el control de la operación local.", "Preparamos propiedades seleccionadas para visibilidad profesional dentro de la red de agentes de Greater Miami.", "El interés comprador cualificado puede regresar directamente a su equipo."],
    trustKicker: "Principal en el sur de Florida",
    trustTitle: "Carlos Uzcategui",
    trustSub: "Sector inmobiliario del sur de Florida desde 2001",
    trustBody: "Un principal con licencia de Florida que coordina revisión bilingüe, activación en EE. UU. e introducciones estructuradas a través de United Realty Group.",
    credentials: ["Licenciado desde 2001 · 25 años en el sur de Florida", "Certified Luxury Home Marketing Specialist · Certified Seller Representative", "United Realty Group · 3,500+ agentes · 19 ubicaciones de oficinas en Florida", "Coordinación bilingüe · sur de Florida ↔ España y LATAM"],
    closeTitle: "¿Listo para ampliar el alcance profesional de su propiedad en EE. UU.?",
    closeBody: "Presente una propiedad cualificada o solicite una conversación privada sobre una ruta de activación para agencia, promotora o portafolio.",
    closeCta: "Solicitar conversación privada Global Desk",
    formIntro: "Presente una oportunidad cualificada",
    formBody: "El proceso seguro de solicitud existente permanece disponible. Los términos comerciales y la elegibilidad se revisan en privado, propiedad por propiedad.",
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

      <main id="main-content" className="min-h-screen overflow-x-hidden bg-white text-navy pb-20 lg:pb-0">
        <Navbar />

        <section className="relative isolate min-h-[760px] overflow-hidden border-b border-bone bg-white px-6 pb-16 pt-28 sm:pt-32 lg:min-h-[810px] lg:pb-20 lg:pt-36">
          <img src="/images/global-desk-hero-madrid-v2.webp" alt="Madrid skyline from a contemporary international-property terrace at golden hour" width={1672} height={941} fetchPriority="high" decoding="async" className="absolute inset-0 -z-20 h-full w-full object-cover object-[68%_center]" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.88)_72%,rgba(255,255,255,0.7)_100%)] lg:bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_36%,rgba(255,255,255,0.94)_50%,rgba(255,255,255,0.18)_76%,rgba(255,255,255,0)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-white to-transparent" />
          <div className="relative mx-auto max-w-7xl">
            <div className="flex justify-end lg:absolute lg:right-0 lg:top-0" aria-label="Global Desk language">
              <div className="inline-flex border border-navy/15 bg-white/90 p-1 shadow-sm backdrop-blur-sm">
                {(["en", "es"] as Lang[]).map((option) => {
                  const languageLabel = option === "en" ? "View Global Desk in English" : "Ver Global Desk en español";
                  return <button key={option} type="button" onClick={() => chooseLanguage(option)} aria-label={languageLabel} title={languageLabel} aria-pressed={lang === option} className={`min-h-11 min-w-11 px-3 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors ${lang === option ? "bg-navy text-white" : "text-navy/65 hover:text-navy"}`}>{option}</button>;
                })}
              </div>
            </div>
            <motion.div initial="hidden" animate="show" variants={reveal} className="mt-10 max-w-[760px] lg:mt-0">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-ink">{t.product}</p>
              <h1 className="mt-6 max-w-[760px] text-balance font-serif text-[clamp(2.75rem,4.45vw,4.5rem)] leading-[0.98] text-navy-deep">{t.title}</h1>
              <p className="mt-7 max-w-[620px] font-sans text-lg font-semibold leading-relaxed text-navy md:text-xl">{t.lead}</p>
              <p className="mt-3 max-w-[600px] font-sans text-base leading-relaxed text-navy/75 md:text-lg">{t.body}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#how-it-works" onClick={() => pushEvent("global_desk_cta_click", { cta_type: "explore_activation", cta_location: "hero", language: lang })} className="inline-flex min-h-12 items-center justify-center gap-3 bg-navy px-7 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-gold hover:text-navy">{t.explore}<ArrowRight size={15} /></a>
                <a href="#listing-request" onClick={() => pushEvent("global_desk_cta_click", { cta_type: "private_discussion", cta_location: "hero", language: lang })} className="inline-flex min-h-12 items-center justify-center border border-navy/25 bg-white/80 px-7 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-navy transition-colors hover:border-gold hover:text-gold-ink">{t.discuss}</a>
              </div>
              <p className="mt-7 max-w-[620px] font-mono text-[9px] uppercase leading-relaxed tracking-[0.13em] text-navy/60">{t.compliance}</p>
            </motion.div>
          </div>
        </section>

        <section aria-label="Network proof" className="border-b border-bone bg-white px-6 py-10 md:py-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 md:grid-cols-3 md:gap-0">
              {t.proof.map(([value, label], index) => <div key={value} className={`text-center md:px-8 ${index > 0 ? "md:border-l md:border-bone" : ""}`}><p className="font-serif text-4xl leading-none text-navy-deep md:text-5xl">{value}</p><p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink">{label}</p></div>)}
            </div>
            <p className="mt-8 text-center font-mono text-[9px] uppercase tracking-[0.13em] text-navy/50">{t.proofNote}</p>
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

        <section id="mandate" className="bg-white text-navy">
          <div className="grid min-h-[680px] lg:grid-cols-2">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="flex items-center px-6 py-16 sm:px-10 lg:px-[max(4rem,calc((100vw-80rem)/2))] lg:py-24">
              <div className="max-w-xl"><h2 className="font-serif text-4xl leading-[1.08] text-navy-deep md:text-5xl">{t.mandateTitleA}<br /><span className="text-gold-ink">{t.mandateTitleB}</span></h2><p className="mt-6 font-sans text-base leading-[1.8] text-navy/75 md:text-lg">{t.mandateBody}</p><ul className="mt-8 space-y-5">{t.mandatePoints.map((point) => <li key={point} className="flex gap-4 border-t border-bone pt-5 font-sans text-sm leading-relaxed text-navy md:text-base"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-gold text-gold-ink"><Check size={13} /></span>{point}</li>)}</ul></div>
            </motion.div>
            <figure className="relative min-h-[420px] overflow-hidden lg:min-h-full"><img src="/images/carlos-miami-river.webp" alt="Carlos Uzcategui at a Miami waterfront property, representing the South Florida activation layer" width={1920} height={1080} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-center" /><figcaption className="absolute bottom-5 left-5 border border-white/25 bg-navy-deep/88 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white backdrop-blur-sm">International property → South Florida activation</figcaption></figure>
          </div>
        </section>

        <section id="carlos" className="border-y border-bone bg-ivory px-6 py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <motion.figure initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal} className="mx-auto w-full max-w-sm overflow-hidden border border-bone bg-white p-3 shadow-sm lg:mx-0"><img src="/images/carlos-headshot.jpg" alt="Carlos Uzcategui, Florida Licensed Realtor with United Realty Group" width={800} height={817} loading="lazy" decoding="async" className="aspect-[4/5] w-full object-cover object-top" /></motion.figure>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={reveal}><p className="font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-gold-ink">{t.trustKicker}</p><h2 className="mt-4 font-serif text-5xl leading-none text-navy-deep md:text-6xl">{t.trustTitle}</h2><p className="mt-3 font-serif text-2xl text-gold-ink">{t.trustSub}</p><p className="mt-6 max-w-2xl font-sans text-base leading-[1.8] text-navy/75 md:text-lg">{t.trustBody}</p><div className="mt-8 grid gap-px border border-bone bg-bone sm:grid-cols-2">{t.credentials.map((credential) => <p key={credential} className="bg-white p-5 font-sans text-sm font-semibold leading-relaxed text-navy">{credential}</p>)}</div></motion.div>
          </div>
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
        <MobileStickyCTA />
      </main>
    </>
  );
}
