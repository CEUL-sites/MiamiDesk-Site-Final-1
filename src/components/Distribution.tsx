import { fig } from "../data/figures";
import { DistributionMetrics } from "./DistributionMetrics";
import { ArrowRight, Camera, ChevronDown, Database, Globe2, House, MessagesSquare, Radar, UsersRound } from "lucide-react";

const MERGER = "https://www.miamirealtors.com/2026/04/20/miami-realtors-and-rworld-announce-merger-creating-the-worlds-largest-local-realtor-association/";
const GUIDE = "https://www.miamirealtors.com/wp-content/uploads/bsk-pdf-manager/2019/10/MIAMI-linkworld.pdf";
const CHANNELS = [
  { id: "regional", icon: House,
    en: { label: "Local buyer-agent visibility", benefit: "Position eligible listings for South Florida agent discovery.", metric: `${fig("members")} association members`, title: "Position the property for local agent discovery.", detail: "Carlos prepares eligible listings for the South Florida MLS environment and coordinates outreach to agents working with relevant buyers. Association membership describes the professional infrastructure available to the campaign." },
    es: { label: "Agentes compradores locales", benefit: "Posicionar propiedades elegibles para su búsqueda profesional.", metric: `${fig("members").replace(/,/g, ".")} miembros de la asociación`, title: "Posicionar la propiedad para el descubrimiento profesional local.", detail: "Carlos prepara propiedades elegibles para el entorno MLS del sur de Florida y coordina contactos con agentes que trabajan con compradores relevantes. La cifra de miembros describe la infraestructura profesional disponible para la campaña." } },
  { id: "national", icon: Database,
    en: { label: "National professional discovery", benefit: "Coordinate relocation-agent follow-up through applicable exchange channels.", metric: `${fig("usMls")} U.S. MLSs via RPR · ${fig("mlsDataExchanges")} MLS data exchanges`, title: "Connect the listing with national professional channels.", detail: "MIAMI's distribution program shares listings through RPR with 260+ U.S. MLSs. The association also reports 11 MLS data exchanges. We review the channels applicable to your property and coordinate relevant relocation-agent follow-up." },
    es: { label: "Conexiones profesionales en EE. UU.", benefit: "Coordinar seguimiento con agentes de reubicación mediante canales aplicables.", metric: `${fig("usMls")} MLS de EE. UU. vía RPR · ${fig("mlsDataExchanges")} intercambios de datos MLS`, title: "Conectar la propiedad con canales profesionales nacionales.", detail: "El programa de MIAMI comparte propiedades mediante RPR con 260+ MLS de EE. UU. La asociación también informa de 11 intercambios de datos MLS. Revisamos los canales aplicables a su propiedad y coordinamos seguimiento con agentes de reubicación relevantes." } },
  { id: "global", icon: Globe2,
    en: { label: "Eligible international channels", benefit: "Use relevant channels and relationships in Spain and Latin America.", metric: `${fig("globalWebsites")} global portals · ${fig("languages")} languages · ${fig("internationalAgreements")} international agreements`, title: "Prepare the property for relevant international discovery.", detail: "MIAMI's distribution materials describe 200+ websites and apps and property search in 19 languages. Its international agreements create professional cooperation routes. Carlos coordinates relevant Spain and LATAM relationships according to property fit and written cooperation terms." },
    es: { label: "Canales internacionales elegibles", benefit: "Utilizar canales y relaciones relevantes en España y Latinoamérica.", metric: `${fig("globalWebsites")} portales globales · ${fig("languages")} idiomas · ${fig("internationalAgreements")} acuerdos internacionales`, title: "Preparar la propiedad para el descubrimiento internacional relevante.", detail: "Los materiales de MIAMI describen 200+ sitios y aplicaciones y búsqueda de propiedades en 19 idiomas. Sus acuerdos internacionales crean vías de cooperación profesional. Carlos coordina relaciones relevantes con España y LATAM según la propiedad y los términos escritos de cooperación." } },
  { id: "brokerage", icon: UsersRound,
    en: { label: "Brokerage-led coordination", benefit: "Coordinated agent introductions and follow-up.", metric: "United Realty Group · Florida office network", title: "Coordinate the professionals around the assignment.", detail: "Carlos leads the property's pricing, positioning, negotiation and communication through United Realty Group. Brokerage relationships support agent coordination and introductions appropriate to the assignment." },
    es: { label: "Coordinación con United Realty Group", benefit: "Presentaciones y seguimiento coordinados con agentes.", metric: "United Realty Group · Red de oficinas en Florida", title: "Coordinar a los profesionales del encargo.", detail: "Carlos dirige el precio, posicionamiento, negociación y comunicación a través de United Realty Group. Las relaciones de corretaje apoyan la coordinación e introducciones adecuadas al encargo." } },
] as const;
const PILLARS = [
  { icon: Camera, en: ["Media", "Prepare photography, video and staging direction agreed before launch."], es: ["Material visual", "Preparar fotografía, video y puesta en escena acordados antes del lanzamiento."] },
  { icon: Globe2, en: ["Distribution", "Position the eligible listing and coordinate the professional channels relevant to the property."], es: ["Distribución", "Posicionar la propiedad elegible y coordinar los canales profesionales relevantes."] },
  { icon: Radar, en: ["Agent activation", "Reach relevant buyer agents by submarket, property type and price range, then coordinate follow-up."], es: ["Activación de agentes", "Contactar a agentes relevantes por mercado, tipo de propiedad y precio, y coordinar seguimiento."] },
  { icon: MessagesSquare, en: ["Reporting", "Review showing feedback, agent response and competing inventory together to recommend the next action."], es: ["Informes", "Revisar opiniones de visitas, respuesta de agentes y competencia para recomendar el siguiente paso."] },
] as const;

export function Distribution({ lang = "en" }: { lang?: "en" | "es" }) {
  const es = lang === "es";
  return <section id="reach" data-seller-story aria-labelledby={`distribution-title-${lang}`} className="bg-[#0b1a30] text-white">
    <div className="distribution-story mx-auto max-w-7xl gap-x-14 px-6 py-14 md:py-20">
      <header className="distribution-intro">
        <p className="story-eyebrow text-gold-soft">{es ? "Distribución profesional" : "Professional distribution"}</p>
        <h2 id={`distribution-title-${lang}`} className="mt-4 max-w-lg font-serif text-[2rem] leading-[1.1] sm:text-4xl md:text-5xl">
          {es ? "Su propiedad." : "Your home."}<br />
          {es ? "Posicionada para captar interés." : "Positioned for buyer discovery."}
        </h2>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-white/85">{es ? "Coordinamos presentación, canales de distribución elegibles y contacto con agentes compradores relevantes para su propiedad." : "We coordinate property presentation, eligible distribution channels and relevant buyer-agent outreach around your home."}</p>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/75">{es ? "Carlos dirige la estrategia y la coordinación profesional a través de United Realty Group." : "Carlos leads the strategy and professional coordination through United Realty Group."}</p>
      </header>
      <div className="distribution-visual mt-8 min-w-0 lg:mt-0" data-sticky-cta-guard>
        <div className="flex items-center gap-4 rounded-md border border-gold-soft/50 px-4 py-4 md:px-5 md:py-5">
          <House size={32} aria-hidden="true" className="shrink-0 text-gold-soft" />
          <div className="min-w-0 border-l border-white/25 pl-4">
            <p className="font-serif text-xl text-white">{es ? "Su propiedad" : "Your property"}</p>
            <p className="mt-1 text-sm leading-relaxed text-white/80">{es ? "Posicionamiento · Presentación · Perfil del comprador" : "Positioning · Presentation · Buyer profile"}</p>
          </div>
        </div>
        <div className="mt-3 grid items-start gap-3 lg:grid-cols-2">
          {CHANNELS.map((channel) => <article key={channel.id} data-distribution-scene={channel.id} aria-labelledby={`distribution-${lang}-${channel.id}`} className="distribution-channel min-w-0 rounded-md border border-white/25">
            <details>
              <summary className="cursor-pointer rounded-md p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-soft lg:p-5">
                <span className="flex items-start gap-3 lg:relative lg:block lg:pr-5">
                  <channel.icon size={26} aria-hidden="true" className="mt-1 shrink-0 text-gold-soft lg:mb-3" />
                  <span className="block min-w-0 flex-1">
                    <span id={`distribution-${lang}-${channel.id}`} className="block text-base font-semibold leading-snug text-white lg:font-serif lg:text-xl">{channel[lang].label}</span>
                    <span className="mt-2 block text-sm leading-relaxed text-white/85">{channel[lang].benefit}</span>
                  </span>
                  <ChevronDown size={18} aria-hidden="true" className="distribution-channel-chevron mt-1 shrink-0 text-gold-soft lg:absolute lg:right-0 lg:top-0" />
                </span>
                <span className="sr-only">{es ? "Cómo utilizamos este canal" : "How we use this channel"}</span>
              </summary>
              <div className="mx-4 border-t border-white/15 pb-4 pt-4 lg:mx-5 lg:pb-5">
                <p className="text-sm font-semibold leading-relaxed text-gold-soft">{channel[lang].metric}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/85">{channel[lang].detail}</p>
              </div>
            </details>
          </article>)}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/80">{es ? "Los canales dependen de la elegibilidad de la propiedad, las normas MLS y la participación. No representan alcance medido ni garantizado." : "Channels depend on property eligibility, MLS rules and participation. They do not represent measured or guaranteed reach."}</p>
        <a href="#list-here" className="story-cta mt-5 w-full">{es ? "Solicitar mi estrategia de venta" : "Request My Property Strategy"}<ArrowRight size={18} aria-hidden="true" className="shrink-0" /></a>
        <p className="mt-3 text-sm leading-relaxed text-white/80">{es ? "Cuéntenos sobre su propiedad y sus plazos. Carlos se pondrá en contacto para coordinar una conversación privada de estrategia." : "Tell us about your property and timing. Carlos will contact you to arrange a private strategy conversation."}</p>
      </div>
      <div className="distribution-sources mt-10 border-t border-white/25 pt-6 text-sm leading-relaxed text-white/80" data-sticky-cta-guard>
        <p className="story-eyebrow text-gold-soft">{es ? "Escala de la infraestructura · No es alcance de su propiedad" : "Infrastructure scale · Not your property's measured reach"}</p>
        <h3 className="mt-3 mb-6 font-serif text-3xl text-white">{es ? "Infraestructura de distribución" : "Distribution infrastructure"}</h3>
        <DistributionMetrics lang={lang} dark />
        <p className="mt-5">{es ? "Fuentes: " : "Sources: "}<a href={MERGER} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">MIAMI · {es ? "anuncio de fusión, abril de 2026" : "merger announcement, April 2026"}</a>; <a href={GUIDE} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">MIAMI · {es ? "guía de distribución, 2025" : "distribution guide, 2025"}</a>; <a href="https://www.urgfl.com/office-locations/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">United Realty Group</a>.</p>
        <p className="mt-3">{es ? "No todas las propiedades aparecen en todos los sitios. La distribución depende de elegibilidad, normas MLS, aprobación del corretaje y participación de las plataformas. La escala y los acuerdos de la asociación no garantizan atención, contactos, precio ni venta." : "Not all properties appear on all sites. Distribution depends on eligibility, MLS rules, brokerage approval and platform participation. Association scale and agreements do not guarantee attention, leads, price or sale."}</p>
        <details className="mt-4"><summary className="min-h-11 cursor-pointer py-3 text-white focus-visible:outline-2 focus-visible:outline-gold-soft">{es ? "Elegibilidad de distribución" : "Distribution eligibility"}</summary><p>{es ? "La distribución está sujeta al tipo de propiedad y su elegibilidad, normas MLS, aprobación del corretaje, participación de las plataformas y disponibilidad de socios de sindicación." : "Distribution is subject to property type and eligibility, MLS rules, brokerage approval, platform participation and syndication partner availability."}</p></details>
      </div>
    </div>
    <div className="bg-white-soft text-navy-deep"><div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
      <p className="story-eyebrow text-gold-ink">{es ? "Nuestro proceso" : "The Listing System"}</p><h3 className="mt-4 max-w-4xl font-serif text-3xl leading-tight md:text-4xl">{es ? "Qué sucede cuando su propiedad se anuncia con Carlos." : "What happens when your home lists with Carlos."}</h3>
      <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-4">{PILLARS.map((pillar, index) => <article key={index} className="border-t border-bone pt-5"><div className="flex items-center gap-4"><span className="font-serif text-4xl text-gold-ink">{String(index + 1).padStart(2, "0")}</span><pillar.icon size={27} aria-hidden="true" /></div><h4 className="mt-4 font-serif text-2xl">{pillar[lang][0]}</h4><p className="mt-3 text-base leading-relaxed text-navy">{pillar[lang][1]}</p></article>)}</div>
      <div className="mt-9 rounded-md border border-bone p-5 md:p-7"><h4 className="font-serif text-xl">{es ? "Su informe: evidencia para la siguiente decisión." : "Your seller update: evidence for the next decision."}</h4><p className="mt-2 text-sm leading-relaxed text-navy">{es ? "Categorías de ejemplo; el informe real refleja su propiedad y los datos disponibles." : "Sample categories; the actual report reflects your property and available data."}</p><ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{(es ? ["Opiniones de visitas", "Propiedades competidoras", "Conversaciones con agentes", "Acción recomendada y próxima revisión"] : ["Showing feedback", "Competing listings", "Agent conversations", "Recommended action and next review"]).map((label) => <li key={label} className="border-l-2 border-gold pl-3 text-sm font-semibold">{label}</li>)}</ul></div>
      <a href="#list-here" className="story-cta mt-8">{es ? "Solicitar mi estrategia de venta" : "Request My Property Strategy"}<ArrowRight size={18} aria-hidden="true" /></a><p className="mt-3 text-sm leading-relaxed text-navy">{es ? "Cuéntenos sobre su propiedad y sus plazos. Carlos se pondrá en contacto para coordinar una conversación privada de estrategia." : "Tell us about your property and timing. Carlos will contact you to arrange a private strategy conversation."}</p><p className="mt-6 text-sm leading-relaxed text-navy">Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.</p>
    </div></div>
  </section>;
}
