import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { fig } from "../data/figures";
import { ArrowRight, Camera, Database, Globe2, House, MessagesSquare, Radar, UsersRound } from "lucide-react";

const MERGER = "https://www.miamirealtors.com/2026/04/20/miami-realtors-and-rworld-announce-merger-creating-the-worlds-largest-local-realtor-association/";
const GUIDE = "https://www.miamirealtors.com/wp-content/uploads/bsk-pdf-manager/2019/10/MIAMI-linkworld.pdf";
const CHANNELS = [
  { id: "regional", icon: House,
    en: { label: "Local MLS", metric: `${fig("members")} association members`, title: "Position the property for local agent discovery.", detail: "Carlos prepares eligible listings for the South Florida MLS environment and coordinates outreach to agents working with relevant buyers. Association membership describes the professional infrastructure available to the campaign." },
    es: { label: "MLS local", metric: `${fig("members").replaceAll(",", ".")} miembros de la asociación`, title: "Posicionar la propiedad para el descubrimiento profesional local.", detail: "Carlos prepara propiedades elegibles para el entorno MLS del sur de Florida y coordina contactos con agentes que trabajan con compradores relevantes. La cifra de miembros describe la infraestructura profesional disponible para la campaña." } },
  { id: "national", icon: Database,
    en: { label: "National MLS exchange", metric: `${fig("usMls")} U.S. MLSs via RPR · ${fig("mlsDataExchanges")} MLS data exchanges`, title: "Connect the listing with national professional channels.", detail: "MIAMI's distribution program shares listings through RPR with 260+ U.S. MLSs. The association also reports 11 MLS data exchanges. We review the channels applicable to your property and coordinate relevant relocation-agent follow-up." },
    es: { label: "Intercambio MLS nacional", metric: `${fig("usMls")} MLS de EE. UU. vía RPR · ${fig("mlsDataExchanges")} intercambios de datos MLS`, title: "Conectar la propiedad con canales profesionales nacionales.", detail: "El programa de MIAMI comparte propiedades mediante RPR con 260+ MLS de EE. UU. La asociación también informa de 11 intercambios de datos MLS. Revisamos los canales aplicables a su propiedad y coordinamos seguimiento con agentes de reubicación relevantes." } },
  { id: "global", icon: Globe2,
    en: { label: "Eligible global channels", metric: `${fig("globalWebsites")} global portals · ${fig("languages")} languages · ${fig("internationalAgreements")} international agreements`, title: "Prepare the property for relevant international discovery.", detail: "MIAMI's distribution materials describe 200+ websites and apps and property search in 19 languages. Its international agreements create professional cooperation routes. Carlos coordinates relevant Spain and LATAM relationships according to property fit and written cooperation terms." },
    es: { label: "Canales globales elegibles", metric: `${fig("globalWebsites")} portales globales · ${fig("languages")} idiomas · ${fig("internationalAgreements")} acuerdos internacionales`, title: "Preparar la propiedad para el descubrimiento internacional relevante.", detail: "Los materiales de MIAMI describen 200+ sitios y aplicaciones y búsqueda de propiedades en 19 idiomas. Sus acuerdos internacionales crean vías de cooperación profesional. Carlos coordina relaciones relevantes con España y LATAM según la propiedad y los términos escritos de cooperación." } },
  { id: "brokerage", icon: UsersRound,
    en: { label: "Brokerage cooperation", metric: "United Realty Group · Florida office network", title: "Coordinate the professionals around the assignment.", detail: "Carlos leads the property's pricing, positioning, negotiation and communication through United Realty Group. Brokerage relationships support agent coordination and introductions appropriate to the assignment." },
    es: { label: "Cooperación de corretaje", metric: "United Realty Group · Red de oficinas en Florida", title: "Coordinar a los profesionales del encargo.", detail: "Carlos dirige el precio, posicionamiento, negociación y comunicación a través de United Realty Group. Las relaciones de corretaje apoyan la coordinación e introducciones adecuadas al encargo." } },
] as const;
const PILLARS = [
  { icon: Camera, en: ["Media", "Prepare photography, video and staging direction agreed before launch."], es: ["Material visual", "Preparar fotografía, video y puesta en escena acordados antes del lanzamiento."] },
  { icon: Globe2, en: ["Distribution", "Position the eligible listing and coordinate the professional channels relevant to the property."], es: ["Distribución", "Posicionar la propiedad elegible y coordinar los canales profesionales relevantes."] },
  { icon: Radar, en: ["Agent activation", "Reach relevant buyer agents by submarket, property type and price range, then coordinate follow-up."], es: ["Activación de agentes", "Contactar a agentes relevantes por mercado, tipo de propiedad y precio, y coordinar seguimiento."] },
  { icon: MessagesSquare, en: ["Reporting", "Review showing feedback, agent response and competing inventory together to recommend the next action."], es: ["Informes", "Revisar opiniones de visitas, respuesta de agentes y competencia para recomendar el siguiente paso."] },
] as const;

export function Distribution({ lang = "en" }: { lang?: "en" | "es" }) {
  const es = lang === "es";
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const [followScroll, setFollowScroll] = useState(false);
  const scenes = useRef<(HTMLElement | null)[]>([]);
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const current = CHANNELS[active][lang];
  const prefix = `distribution-${lang}`;
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const update = () => setFollowScroll(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!followScroll || manual || typeof IntersectionObserver === "undefined") return;
    const intersecting = new Set<HTMLElement>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) intersecting.add(entry.target as HTMLElement);
        else intersecting.delete(entry.target as HTMLElement);
      });
      const focus = window.innerHeight * 0.425;
      const distance = (scene: HTMLElement) => {
        const rect = scene.getBoundingClientRect();
        return Math.abs(rect.top + rect.height / 2 - focus);
      };
      const nearest = [...intersecting].sort((a, b) => distance(a) - distance(b))[0];
      if (nearest) {
        const index = scenes.current.indexOf(nearest);
        if (index >= 0) setActive(index);
      }
    }, { rootMargin: "-25% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] });
    scenes.current.forEach((scene) => { if (scene) observer.observe(scene); });
    return () => observer.disconnect();
  }, [followScroll, manual]);
  const pick = (index: number) => { setManual(true); setActive(index); };
  const navigate = (event: KeyboardEvent) => {
    let index = active;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") index = (active + 1) % CHANNELS.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") index = (active + CHANNELS.length - 1) % CHANNELS.length;
    else if (event.key === "Home") index = 0;
    else if (event.key === "End") index = CHANNELS.length - 1;
    else return;
    event.preventDefault(); pick(index); controls.current[index]?.focus();
  };
  return <section id="reach" data-seller-story className="bg-[#0b1a30] text-white">
    <div className="distribution-story mx-auto max-w-7xl gap-x-14 px-6 py-14 md:py-20">
      <header className="distribution-intro">
        <p className="story-eyebrow text-gold-soft">{es ? "Distribución profesional" : "Professional distribution"}</p>
        <h2 className="mt-4 font-serif text-4xl leading-[1.08] md:text-5xl">{es ? "Distribución profesional." : "Professional distribution."}</h2>
        <p className="mt-4 font-serif text-2xl leading-snug md:text-3xl">{es ? "Una ruta coordinada al mercado." : "A coordinated route to market."}</p>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85">{es ? "Carlos combina posicionamiento específico, infraestructura de la mayor asociación local de REALTORS® del mundo y contacto con agentes compradores relevantes." : "Carlos combines property-specific positioning, the world's largest local Realtor association's infrastructure and relevant buyer-agent outreach."}</p>
        <div className="mt-7 border-t border-white/25 pt-5"><p className="font-serif text-6xl text-gold-soft md:text-7xl">{es ? fig("members").replaceAll(",", ".") : fig("members")}</p><p className="mt-2 text-base font-semibold">{es ? "Miembros de la asociación" : "Association members"}</p><p className="mt-3 text-sm leading-relaxed text-white/80">MIAMI REALTORS® + RWorld · {es ? "Efectivo el 11 de mayo de 2026" : "Effective May 11, 2026"}</p></div>
      </header>
      <div className="distribution-visual mt-8 min-w-0 lg:mt-0"><div className="distribution-pin">
        <figure className="mx-auto w-48 overflow-hidden rounded-md border border-gold/70"><img src="/images/posters/luxury_waterfront_drone-20261012.jpg" width={1080} height={1920} loading="lazy" decoding="async" alt={es ? "Vista ilustrativa de una propiedad junto al agua" : "Illustrative waterfront property presentation"} className="h-36 w-full object-cover" /><figcaption className="bg-gold px-3 py-3 text-center text-sm font-semibold text-navy-deep">{es ? "Su propiedad" : "Your property"}</figcaption></figure>
        <div aria-hidden="true" className="distribution-connectors"><svg viewBox="0 0 400 50" preserveAspectRatio="none" className="h-full w-full" fill="none"><path d="M200 0V22H50V50M200 22H150V50M200 22H250V50M200 22H350V50" stroke="#8793a4" strokeWidth="1.5" /><path d={`M200 0V22H${50 + active * 100}V50`} stroke="#D4AE78" strokeWidth="2.5" /></svg></div>
        <div role="tablist" aria-label={es ? "Canales de distribución" : "Distribution channels"} onKeyDown={navigate} className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {CHANNELS.map((channel, index) => <button key={channel.id} type="button" role="tab" ref={(el) => { controls.current[index] = el; }} id={`${prefix}-tab-${channel.id}`} aria-controls={`${prefix}-panel`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => pick(index)} className={`distribution-route min-h-24 rounded-md border px-3 py-4 text-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-soft ${active === index ? "border-gold-soft bg-gold/15 text-gold-soft" : "border-white/40 text-white hover:border-gold-soft"}`}><channel.icon size={24} aria-hidden="true" className="mx-auto mb-2" /><span className="text-sm font-semibold leading-snug">{channel[lang].label}</span></button>)}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/80">{es ? "Esquema de distribución. Las conexiones no representan alcance medido. Se aplican elegibilidad, normas MLS y participación." : "Distribution schematic. Connections do not represent measured reach. Eligibility, MLS rules and platform participation apply."}</p>
        <div id={`${prefix}-panel`} role="tabpanel" aria-labelledby={`${prefix}-tab-${CHANNELS[active].id}`} tabIndex={0} className="mt-5 rounded-md border border-white/25 p-5 focus-visible:outline-2 focus-visible:outline-gold-soft"><p className="text-sm font-semibold text-gold-soft">{current.metric}</p><h3 className="mt-3 font-serif text-2xl leading-snug text-white">{current.title}</h3><p className="mt-3 text-base leading-relaxed text-white/85 lg:hidden">{current.detail}</p></div>
        {followScroll && manual && <button type="button" onClick={() => setManual(false)} className="mt-3 min-h-11 text-sm text-gold-soft underline underline-offset-4">{es ? "Seguir el desplazamiento" : "Follow the scroll"}</button>}
      </div></div>
      <div className="distribution-scenes mt-8">{CHANNELS.map((channel, index) => <article key={channel.id} ref={(el) => { scenes.current[index] = el; }} data-distribution-scene={channel.id} className={`distribution-scene border-t py-6 ${active === index ? "border-gold-soft" : "border-white/25"}`}><p className="story-eyebrow text-gold-soft">{String(index + 1).padStart(2, "0")} · {channel[lang].label}</p><h3 className="mt-3 font-serif text-2xl leading-snug text-white">{channel[lang].title}</h3><p className="mt-3 text-sm font-semibold text-gold-soft">{channel[lang].metric}</p><p className="mt-3 text-base leading-relaxed text-white/85">{channel[lang].detail}</p></article>)}</div>
      <div className="distribution-sources mt-8 border-t border-white/25 pt-5 text-sm leading-relaxed text-white/80">
        <p>{es ? "Fuentes: " : "Sources: "}<a href={MERGER} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">MIAMI · {es ? "anuncio de fusión, abril de 2026" : "merger announcement, April 2026"}</a>; <a href={GUIDE} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">MIAMI · {es ? "guía de distribución, 2025" : "distribution guide, 2025"}</a>; <a href="https://www.urgfl.com/office-locations/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">United Realty Group</a>.</p>
        <p className="mt-3">{es ? "No todas las propiedades aparecen en todos los sitios. La distribución depende de elegibilidad, normas MLS, aprobación del corretaje y participación de las plataformas. La escala y los acuerdos de la asociación no garantizan atención, contactos, precio ni venta." : "Not all properties appear on all sites. Distribution depends on eligibility, MLS rules, brokerage approval and platform participation. Association scale and agreements do not guarantee attention, leads, price or sale."}</p>
        <details className="mt-4"><summary className="min-h-11 cursor-pointer text-white">{es ? "Elegibilidad de distribución" : "Distribution eligibility"}</summary><p>{es ? "La distribución está sujeta al tipo de propiedad y su elegibilidad, normas MLS, aprobación del corretaje, participación de las plataformas y disponibilidad de socios de sindicación." : "Distribution is subject to property type and eligibility, MLS rules, brokerage approval, platform participation and syndication partner availability."}</p></details>
      </div>
    </div>
    <div className="bg-white-soft text-navy-deep"><div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
      <p className="story-eyebrow text-gold-ink">{es ? "Nuestro proceso" : "The Listing System"}</p><h3 className="mt-4 max-w-4xl font-serif text-3xl leading-tight md:text-4xl">{es ? "Qué sucede cuando su propiedad se anuncia con Carlos." : "What happens when your home lists with Carlos."}</h3>
      <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-4">{PILLARS.map((pillar, index) => <article key={index} className="border-t border-bone pt-5"><div className="flex items-center gap-4"><span className="font-serif text-4xl text-gold-ink">{String(index + 1).padStart(2, "0")}</span><pillar.icon size={27} aria-hidden="true" /></div><h4 className="mt-4 font-serif text-2xl">{pillar[lang][0]}</h4><p className="mt-3 text-base leading-relaxed text-navy">{pillar[lang][1]}</p></article>)}</div>
      <div className="mt-9 rounded-md border border-bone p-5 md:p-7"><h4 className="font-serif text-xl">{es ? "Su informe: evidencia para la siguiente decisión." : "Your seller update: evidence for the next decision."}</h4><p className="mt-2 text-sm leading-relaxed text-navy">{es ? "Categorías de ejemplo; el informe real refleja su propiedad y los datos disponibles." : "Sample categories; the actual report reflects your property and available data."}</p><ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{(es ? ["Opiniones de visitas", "Propiedades competidoras", "Conversaciones con agentes", "Acción recomendada y próxima revisión"] : ["Showing feedback", "Competing listings", "Agent conversations", "Recommended action and next review"]).map((label) => <li key={label} className="border-l-2 border-gold pl-3 text-sm font-semibold">{label}</li>)}</ul></div>
      <a href={es ? "/es/vender#contact" : "/sell#contact"} className="story-cta mt-8">{es ? "Solicitar una llamada privada de estrategia" : "Request a Private Property Strategy Call"}<ArrowRight size={18} aria-hidden="true" /></a><p className="mt-3 text-sm leading-relaxed text-navy">{es ? "Carlos revisa la propiedad y se pone en contacto para coordinar la conversación." : "Carlos reviews the property and contacts you to arrange the conversation."}</p><p className="mt-6 text-sm leading-relaxed text-navy">Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.</p>
    </div></div>
  </section>;
}
