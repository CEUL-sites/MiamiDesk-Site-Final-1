import { useRef, useState, type KeyboardEvent } from "react";
import { Check, Crosshair, LineChart, Radio, SlidersHorizontal } from "lucide-react";
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
  return <section id="seller-execution" data-sticky-cta-guard className="bg-white-soft px-6 py-14 text-navy-deep md:py-20">
    <div className="mx-auto max-w-7xl">
      <p className="story-eyebrow text-gold-ink">{es ? "Ejecución del encargo" : "Listing execution"}</p>
      <h2 className="mt-4 max-w-4xl font-serif text-3xl leading-tight md:text-5xl">{es ? "Qué hace Carlos después del lanzamiento." : "What Carlos Does After the Listing Goes Live"}</h2>
      <p className="mt-5 max-w-3xl text-base leading-relaxed text-navy">{es ? "El alcance crea oportunidades. El posicionamiento, seguimiento y evidencia guían las decisiones durante la campaña." : "Distribution creates the opportunity. Positioning, follow-up and evidence guide the decisions during the campaign."}</p>
      <div className="mt-8 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <figure className="lg:order-2"><img src="/images/carlos-media-team-editorial-20261012.jpg" alt={es ? "Carlos Uzcategui con el equipo de fotografía y video de la propiedad" : "Carlos Uzcategui with the property media team preparing photography and video at a waterfront home"} width={1600} height={901} loading="lazy" decoding="async" className="aspect-video w-full rounded-md object-cover" /><figcaption className="mt-3 text-sm leading-relaxed text-navy">{es ? "Carlos con el equipo de medios · Preparación antes de la presentación." : "Carlos with the property media team · Preparation before presentation."}</figcaption></figure>
        <div className="min-w-0 lg:order-1">
          <div role="tablist" aria-label={es ? "Etapas de ejecución" : "Listing execution stages"} onKeyDown={navigate} className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {STEPS.map((step, index) => <button key={step.label} type="button" role="tab" ref={(el) => { controls.current[index] = el; }} id={`${prefix}-tab-${index}`} aria-selected={active === index} aria-controls={`${prefix}-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} className={`min-h-12 rounded-sm border px-2 py-3 text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-ink ${active === index ? "border-gold bg-gold text-navy-deep" : "border-bone text-navy hover:border-gold-ink"}`}>{es ? ES_LABELS[index] : step.label}</button>)}
          </div>
          <div className="mt-4 rounded-md bg-[#0b1a30] text-white">
            {STEPS.map((step, index) => <div key={step.label} role="tabpanel" id={`${prefix}-panel-${index}`} aria-labelledby={`${prefix}-tab-${index}`} hidden={index !== active} inert={index !== active ? true : undefined} tabIndex={index === active ? 0 : -1} className="p-6 focus-visible:outline-2 focus-visible:outline-gold-soft md:p-8">
              <div className="flex items-center gap-3 text-gold-soft"><step.icon size={22} aria-hidden="true" /><p className="text-sm font-semibold">{es ? "Etapa" : "Stage"} {String(index + 1).padStart(2, "0")} / 04 · {es ? ES_LABELS[index] : step.label}</p></div>
              <h3 className="mt-5 font-serif text-2xl leading-snug text-white md:text-3xl">{step[lang].title}</h3><p className="mt-3 text-base leading-relaxed text-white/85">{step[lang].copy}</p>
              <ul className="mt-5 space-y-3">{step[lang].points.map((point) => <li key={point} className="flex items-start gap-3 text-sm leading-relaxed"><Check size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-gold-soft" />{point}</li>)}</ul>
              <p className="mt-6 border-t border-white/25 pt-4 text-sm leading-relaxed text-white/85">{es ? "Entrega" : "Deliverable"}: {step[lang].deliverable}</p>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  </section>;
}
