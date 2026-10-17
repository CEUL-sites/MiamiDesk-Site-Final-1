import { StoryVideo } from "./StoryVideo";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, Film, Layers, Map, Plane } from "lucide-react";

/** One user-controlled illustrative clip, a persistent poster and native controls. */

const REEL = [
  {
    id: "film",
    icon: Film,
    clip: "/videos/luxury_home_walkthrough.mp4",
    en: {
      label: "Property film",
      copy: "A walkthrough cut to the way a buyer actually moves through the property, coordinated with the property media team.",
    },
    es: {
      label: "Película de la propiedad",
      copy: "Un recorrido montado según cómo se mueve realmente un comprador por la propiedad, coordinado con el equipo de medios.",
    },
  },
  {
    id: "aerial",
    icon: Plane,
    clip: "/videos/luxury_waterfront_drone.mp4",
    en: {
      label: "Aerial and setting",
      copy: "Aerial coverage that places the property in its setting — frontage, approach, and the streets and water around it.",
    },
    es: {
      label: "Vista aérea y entorno",
      copy: "Cobertura aérea que sitúa la propiedad en su entorno: su frente, el acceso y las calles y el agua a su alrededor.",
    },
  },
  {
    id: "tour",
    icon: Layers,
    clip: "/videos/matterport_tour_2.mp4",
    en: {
      label: "3D tour preview",
      copy: "An illustrative video preview of a 3D presentation. A navigable property-specific tour and floor plan are reviewed separately as part of the agreed media scope.",
    },
    es: {
      label: "Vista previa 3D",
      copy: "Un video ilustrativo de una presentación 3D. El recorrido navegable específico y el plano se revisan por separado según el alcance acordado.",
    },
  },
  {
    id: "global",
    icon: Map,
    clip: "/videos/waterfront_house_global_reach.mp4",
    en: {
      label: "Global presentation",
      copy: "The same media set travels with the listing into eligible syndication, where the property is presented to buyers searching in other languages.",
    },
    es: {
      label: "Presentación global",
      copy: "El mismo material acompaña a la propiedad en la sindicación elegible, donde se presenta a compradores que buscan en otros idiomas.",
    },
  },
] as const;

const SHELL = {
  en: {
    eyebrow: "Property presentation",
    title: "How the property is presented to the market.",
    railLabel: "Property presentation formats",
    note: "Media scope varies by property and is agreed before launch · Syndication subject to eligibility, MLS rules and platform participation",
  },
  es: {
    eyebrow: "Presentación de la propiedad",
    title: "Cómo se presenta la propiedad al mercado.",
    railLabel: "Formatos de presentación de la propiedad",
    note: "El alcance del material varía según la propiedad y se acuerda antes del lanzamiento · La sindicación está sujeta a elegibilidad, normas del MLS y participación de las plataformas",
  },
} as const;

function posterFor(clip: string) {
  return clip.replace("/videos/", "/images/posters/").replace(".mp4", "-20261012.jpg");
}

export function MarketingReel3D({ lang = "en", ctaHref = "#list-here" }: { lang?: "en" | "es"; ctaHref?: string }) {
  const [active, setActive] = useState(0);
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const es = lang === "es";
  const current = REEL[active];
  const prefix = "reel-"+lang;
  const onKeyDown = (event: KeyboardEvent) => {
    let index: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") index = (active + 1) % REEL.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") index = (active + REEL.length - 1) % REEL.length;
    else if (event.key === "Home") index = 0;
    else if (event.key === "End") index = REEL.length - 1;
    else return;
    event.preventDefault(); setActive(index); controls.current[index]?.focus();
  };
  return <section data-sticky-cta-guard data-property-media className="visual-story bg-[#0b1a30] px-6 py-16 text-white md:py-24">
    <div className="mx-auto max-w-7xl cinema-layout">
      <div className="min-w-0">
        <p className="story-eyebrow text-gold-soft">{SHELL[lang].eyebrow}</p>
        <h2 className="visual-section-title mt-5 font-serif">{es ? "Presentar la propiedad en su entorno." : "Present the property in its setting."}</h2>
        <div role="tablist" aria-label={SHELL[lang].railLabel} onKeyDown={onKeyDown} className="cinema-tabs">
          {REEL.map((item,index) => <button type="button" role="tab" key={item.id} ref={el => {controls.current[index]=el;}} id={prefix+"-tab-"+item.id} aria-selected={index===active} aria-controls={prefix+"-stage"} tabIndex={index===active?0:-1} onClick={() => setActive(index)} className="cinema-tab"><img src={posterFor(item.clip)} alt="" width={48} height={60} loading="lazy"/><span>{item[lang].label}</span></button>)}
        </div>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/85">{current[lang].copy}</p>
        <p className="mt-4 text-sm leading-relaxed text-white/85">{es ? "El alcance del material se acuerda antes del lanzamiento." : "Media scope is agreed before launch."}</p>
        <a href={ctaHref} className="story-cta mt-7">{es ? "Solicitar una llamada privada de estrategia" : "Request a Private Property Strategy Call"}<ArrowRight size={18} aria-hidden="true" /></a>
        <p className="mt-3 text-sm leading-relaxed text-white/85">{es ? "Nuestro equipo revisa su propiedad y se pone en contacto para coordinar la conversación." : "Our team reviews the property and contacts you to arrange the conversation."}</p>
      </div>
      <div className="cinema-screen" id={prefix+"-stage"} role="tabpanel" aria-labelledby={prefix+"-tab-"+current.id} tabIndex={0}>
        {current.id !== "film" && <><img className="cinema-ghost cinema-ghost--left" src={posterFor(REEL[(active+3)%4].clip)} alt="" loading="lazy"/>
        <img className="cinema-ghost cinema-ghost--right" src={posterFor(REEL[(active+1)%4].clip)} alt="" loading="lazy"/></>}
        <div key={current.id}><StoryVideo src={current.clip} poster={posterFor(current.clip)} label={current[lang].label} shape={current.id==="film"?"landscape":"portrait"} lang={lang} note={es ? "Vista previa ilustrativa del material visual." : "Illustrative media preview."}/></div>
      </div>
    </div>
    <div className="mx-auto mt-10 max-w-7xl border-t border-white/20 pt-5 text-sm leading-relaxed text-white/80"><details><summary className="min-h-11 cursor-pointer">{es ? "Alcance de la presentación y distribución" : "Presentation and distribution scope"}</summary><p>{SHELL[lang].note}</p></details><p className="mt-3">Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.</p></div>
  </section>;
}
