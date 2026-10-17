import { StoryVideo } from "./StoryVideo";
import { useRef, useState, type KeyboardEvent } from "react";
import { Crosshair, LineChart, Radio, SlidersHorizontal } from "lucide-react";
import { nextStage, previousStage } from "./listingStageDeckModel";

const STEPS = [
  { label: "POSITION", icon: Crosshair,
    en: { title: "Build the property's market position.", copy: "Price strategy, presentation, buyer profile, property narrative and launch timing.", points: ["Review closed-sale evidence and active competition", "Define the property story and relevant buyer profile", "Agree on presentation and launch timing"], deliverable: "Property positioning and launch plan" },
    es: { title: "Definir el posicionamiento de la propiedad.", copy: "Estrategia de precio, presentación, perfil del comprador, relato de la propiedad y momento de lanzamiento.", points: ["Revisar ventas cerradas y competencia activa", "Definir el relato y perfil comprador relevante", "Acordar presentación y momento de lanzamiento"], deliverable: "Posicionamiento y plan de lanzamiento" } },
  { label: "ACTIVATE", icon: Radio,
    en: { title: "Reach relevant buyer agents.", copy: "Identify and reach agents working with relevant buyers by location, property type and price range.", points: ["Identify the relevant submarket and price band", "Prepare property-specific agent outreach", "Coordinate follow-up on qualified interest"], deliverable: "Coordinated agent outreach" },
    es: { title: "Contactar con agentes compradores relevantes.", copy: "Identificar y contactar a agentes que trabajan con compradores relevantes por ubicación, tipo de propiedad y rango de precio.", points: ["Identificar el mercado y rango de precio relevantes", "Preparar contacto profesional específico", "Coordinar seguimiento del interés cualificado"], deliverable: "Contacto coordinado con agentes" } },
  { label: "REPORT", icon: LineChart,
    en: { title: "Review the evidence together.", copy: "Provide structured updates on showing activity, online engagement, buyer-agent response and competing inventory.", points: ["Summarize showing feedback and agent response", "Review engagement separately from received inquiries", "Identify new competition and price changes"], deliverable: "Seller update and next review" },
    es: { title: "Revisar juntos la evidencia.", copy: "Proporcionar informes sobre visitas, interacción digital, respuesta de agentes compradores y propiedades competidoras.", points: ["Resumir opiniones de visitas y respuesta profesional", "Distinguir interacción de consultas recibidas", "Identificar nueva competencia y cambios de precio"], deliverable: "Informe al vendedor y próxima revisión" } },
  { label: "ADJUST", icon: SlidersHorizontal,
    en: { title: "Recommend the next action from market evidence.", copy: "Recommend changes from market evidence, property response and competitive movement—not guesswork.", points: ["Compare the property's response with current competition", "Review pricing, presentation and follow-up options", "Agree on the next action and review date"], deliverable: "Recommended action for the owner's decision" },
    es: { title: "Recomendar el siguiente paso con evidencia de mercado.", copy: "Recomendar cambios basados en evidencia de mercado, respuesta a la propiedad y movimiento competitivo.", points: ["Comparar la respuesta con la competencia actual", "Revisar precio, presentación y seguimiento", "Acordar el siguiente paso y fecha de revisión"], deliverable: "Acción recomendada para decisión del propietario" } },
] as const;
const ES_LABELS = ["POSICIONAR", "ACTIVAR", "INFORMAR", "AJUSTAR"];

export function SellerExecutionSystem({ lang = "en" }: { lang?: "en" | "es" }) {
  const [active, setActive] = useState(0);
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const es = lang === "es";
  const prefix = `execution-${lang}`;
  const navigate = (event: KeyboardEvent) => {
    let index: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") index = nextStage(active, STEPS.length);
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") index = previousStage(active, STEPS.length);
    else if (event.key === "Home") index = 0;
    else if (event.key === "End") index = STEPS.length - 1;
    else return;
    event.preventDefault(); setActive(index); controls.current[index]?.focus();
  };
  const media = [
    { src: "/videos/stories/experience.mp4", poster: "/images/posters/story-experience.jpg" },
    { src: "/videos/stories/activation.mp4", poster: "/images/posters/story-activation.jpg" },
    { src: "", poster: "/images/carlos-media-team-editorial-20261012.jpg" },
    { src: "", poster: "/images/posters/luxury_waterfront_drone-20261012.jpg" },
  ];
  const current = STEPS[active][lang];
  return <section id="seller-execution" data-sticky-cta-guard className="visual-story bg-white-soft px-6 py-16 text-navy-deep md:py-24">
    <div className="mx-auto max-w-7xl execution-layout">
      <div className="min-w-0">
        <p className="story-eyebrow text-gold-ink">{es ? "Ejecución del encargo" : "Listing execution"}</p>
        <h2 className="visual-section-title mt-5 font-serif">{es ? "Qué hace nuestro equipo después del lanzamiento." : "What Our Team Does After the Listing Goes Live"}</h2>
        <p className="mt-5 max-w-lg text-base leading-relaxed">{es ? "El alcance crea oportunidades. El posicionamiento, seguimiento y evidencia guían las decisiones durante la campaña." : "Distribution creates the opportunity. Positioning, follow-up and evidence guide the decisions during the campaign."}</p>
        <div role="tablist" aria-label={es ? "Etapas de ejecución" : "Listing execution stages"} onKeyDown={navigate} className="execution-chapters">
          {STEPS.map((step, index) => <button key={step.label} type="button" role="tab" ref={(el) => { controls.current[index] = el; }} id={prefix+"-tab-"+index} aria-selected={active === index} aria-controls={prefix+"-panel-"+index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} className="execution-chapter"><img src={media[index].poster} alt="" loading="lazy" width={64} height={64}/><span>{es ? ES_LABELS[index] : step.label}</span></button>)}
        </div>
        {STEPS.map((step, index) => <div key={step.label} role="tabpanel" id={prefix+"-panel-"+index} aria-labelledby={prefix+"-tab-"+index} hidden={active !== index} tabIndex={active === index ? 0 : -1} className="execution-panel">
          <h3 className="font-serif">{step[lang].title}</h3>
          <p>{step[lang].copy}</p>
          <details><summary>{es ? "Ver las acciones" : "See the actions"}</summary><ul>{step[lang].points.map(point => <li key={point}>{point}</li>)}</ul></details>
          <p className="execution-deliverable">{es ? "Entrega" : "Deliverable"}: {step[lang].deliverable}</p>
        </div>)}
        <a href="#list-here" className="story-cta">{es ? "Solicitar mi estrategia de venta" : "Request My Property Strategy"} <span aria-hidden="true">↗</span></a>
        <p className="mt-3 text-sm leading-relaxed">{es ? "Nuestro equipo revisa su propiedad y le contacta para coordinar la conversación." : "Our team reviews your property and contacts you to arrange the conversation."}</p>
      </div>
      <div className="execution-visual">
        {active < 2 ? <div key={active}><StoryVideo src={media[active].src} poster={media[active].poster} label={current.title} lang={lang} shape="bubble" note={es ? "Extracto visual ilustrativo · Texto del video en inglés" : "A short visual chapter · Illustrative footage"}/></div> : <div className="execution-ledger">
          <p className="story-eyebrow text-gold-soft">{es ? "Etapa" : "Stage"} {String(active + 1).padStart(2, "0")} / 04 · {es ? ES_LABELS[active] : STEPS[active].label}</p>
          <h3 className="font-serif">{current.title}</h3>
          <ul>{current.points.map(point => <li key={point}>{point}</li>)}</ul>
          <small>{es ? "Esquema del proceso. No representa resultados de una campaña." : "Process illustration. This is not a campaign performance report."}</small>
        </div>}
      </div>
    </div>
    <p className="mx-auto mt-10 max-w-7xl text-xs leading-relaxed text-navy">Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.</p>
  </section>;
}
