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
  const [failed, setFailed] = useState(false);
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const player = useRef<HTMLElement | null>(null);
  const t = SHELL[lang];
  const es = lang === "es";
  const current = REEL[active];
  const prefix = `reel-${lang}`;
  const pick = (index: number) => {
    setFailed(false); setActive(index);
    if (window.matchMedia("(max-width: 1023px)").matches) player.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
  };
  const onKeyDown = (event: KeyboardEvent) => {
    let index: number;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") index = (active + 1) % REEL.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") index = (active + REEL.length - 1) % REEL.length;
    else if (event.key === "Home") index = 0;
    else if (event.key === "End") index = REEL.length - 1;
    else return;
    event.preventDefault(); pick(index); controls.current[index]?.focus();
  };
  return (
    <section data-sticky-cta-guard data-property-media className="bg-[#0b1a30] px-6 py-14 text-white md:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="story-eyebrow text-gold-soft">{t.eyebrow}</p>
        <h2 className="mt-4 max-w-4xl font-serif text-3xl leading-tight md:text-5xl">{es ? "Presentar la propiedad en su entorno." : "Present the property in its setting."}</h2>
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[220px_minmax(0,1fr)_260px] lg:gap-8">
          <figure ref={player} className="order-1 mx-auto min-w-0 scroll-mt-24 lg:order-2" style={{ width: "100%", maxWidth: current.id === "film" ? "100%" : "340px" }}>
            <div id={`${prefix}-stage`} role="tabpanel" aria-labelledby={`${prefix}-tab-${current.id}`} tabIndex={0} className="overflow-hidden rounded-md border border-white/30 focus-visible:outline-2 focus-visible:outline-gold-soft" style={{ aspectRatio: current.id === "film" ? "16 / 9" : "9 / 16" }}>
              <video key={current.clip} src={current.clip} poster={posterFor(current.clip)} controls preload="none" playsInline aria-label={current[lang].label} onError={() => setFailed(true)} className="h-full w-full object-contain" />
            </div>
            <figcaption className="mt-3 text-center text-sm leading-relaxed text-white/85">{es ? "Vista previa ilustrativa del material visual." : "Illustrative media preview."}</figcaption>
            {failed && <p role="status" className="mt-3 text-sm leading-relaxed text-white">{es ? "Vista previa no disponible. Carlos puede revisar con usted el alcance propuesto." : "Preview unavailable. Carlos can review the proposed media scope with you."}</p>}
          </figure>
          <div role="tablist" aria-label={t.railLabel} onKeyDown={onKeyDown} className="order-2 grid grid-cols-2 gap-3 lg:order-1 lg:grid-cols-1">
            {REEL.map((item, index) => <button type="button" role="tab" key={item.id} ref={(el) => { controls.current[index] = el; }} id={`${prefix}-tab-${item.id}`} aria-selected={index === active} aria-controls={`${prefix}-stage`} tabIndex={index === active ? 0 : -1} onClick={() => pick(index)} className={`flex min-h-14 items-center gap-3 rounded-md border px-3 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-soft ${index === active ? "border-gold-soft bg-gold/15 text-gold-soft" : "border-white/35 text-white hover:border-gold-soft"}`}>
              <item.icon size={22} aria-hidden="true" className="shrink-0" /><span className="text-sm font-semibold leading-snug">{item[lang].label}</span>
            </button>)}
          </div>
          <div className="order-3 min-w-0">
            <p className="story-eyebrow text-gold-soft">{current[lang].label}</p>
            <p className="mt-4 text-base leading-relaxed text-white/90">{current[lang].copy}</p>
            <p className="mt-5 text-sm leading-relaxed text-white/85">{es ? "El alcance del material se acuerda antes del lanzamiento." : "Media scope is agreed before launch."}</p>
          </div>
        </div>
        <p className="mt-7 border-t border-white/25 pt-5 text-sm leading-relaxed text-white/85">{t.note}</p>
        <div className="mt-7 grid gap-4 lg:grid-cols-2 lg:items-center">
          <a href={ctaHref} className="story-cta">{es ? "Solicitar una llamada privada de estrategia" : "Request a Private Property Strategy Call"}<ArrowRight size={18} aria-hidden="true" /></a>
          <p className="text-sm leading-relaxed text-white/85">{es ? "Carlos revisa su propiedad y se pone en contacto para coordinar la conversación." : "Carlos reviews the property and contacts you to arrange the conversation."}</p>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-white/85">Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity.</p>
      </div>
    </section>
  );
}
