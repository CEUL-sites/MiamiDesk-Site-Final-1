import { useState } from "react";
import { Play } from "lucide-react";
import { pushEvent } from "../lib/analytics";
import "./association-films.css";

const FILMS = {
  realtor: {
    id: "perfect-strangers",
    src: "/videos/only_a_realtor_perfect_strangers.mp4",
    poster: "/images/posters/only_a_realtor_perfect_strangers.jpg",
    title: "Only a REALTOR® — Perfect Strangers",
    subtitleEn: "MIAMI REALTORS® + RWorld · 93,000 Member Ecosystem",
    subtitleEs: "MIAMI REALTORS® + RWorld · Ecosistema de 93,000 Miembros",
    duration: "0:30",
    published: "2024-01-15",
  },
  miami: {
    id: "box-of-memories",
    src: "/videos/only_a_realtor_box_of_memories.mp4",
    poster: "/images/posters/only_a_realtor_box_of_memories.jpg",
    title: "Only a REALTOR® — Box of Memories",
    subtitleEn: "RWorld Official Campaign · Seller & Family Transition",
    subtitleEs: "Campaña Oficial RWorld · Transición Familiar y Venta",
    duration: "0:30",
    published: "2024-06-20",
  },
  broward: {
    id: "spencer-melissa",
    src: "/videos/only_a_realtor_spencer_melissa.mp4",
    poster: "/images/posters/only_a_realtor_spencer_melissa.jpg",
    title: "Only a REALTOR® — Spencer & Melissa Story",
    subtitleEn: "Why South Florida Sellers Use a Licensed REALTOR®",
    subtitleEs: "Por qué los propietarios eligen a un REALTOR® con licencia",
    duration: "1:18",
    published: "2024-04-12",
  },
  rankings: {
    id: "kyle-marie",
    src: "/videos/only_a_realtor_kyle_marie.mp4",
    poster: "/images/posters/only_a_realtor_kyle_marie.jpg",
    title: "Only a REALTOR® — International Relocation (Kyle & Marie)",
    subtitleEn: "437+ International Partner Agreements · Cross-Border Advisory",
    subtitleEs: "437+ Acuerdos Internacionales · Asesoría Transfronteriza",
    duration: "1:22",
    published: "2024-04-12",
  },
} as const;
type FilmKey = keyof typeof FILMS;

const COPY = {
  en: {
    triggers: {
      realtor: "Watch Only a REALTOR® · Perfect Strangers (0:30)",
      miami: "Watch Only a REALTOR® · Box of Memories (0:30)",
      broward: "Watch Seller Story · Spencer & Melissa (1:18)",
      rankings: "Watch International Relocation · Kyle & Marie (1:22)",
    },
    featureTitle: "Only a REALTOR® · Official Broadcast Series",
    featureSummary: "Official RWorld & MIAMI REALTORS® campaign films",
    heading: "Why Use a REALTOR® — Official Campaign Series",
    hide: "Hide player",
    choices: {
      realtor: "01 · Perfect Strangers",
      miami: "02 · Box of Memories",
      broward: "03 · Seller Story",
      rankings: "04 · Global Move",
    },
    source: "MIAMI REALTORS® + RWorld · Official Campaign Broadcast",
  },
  es: {
    triggers: {
      realtor: "Ver Only a REALTOR® · Perfect Strangers (0:30)",
      miami: "Ver Only a REALTOR® · Box of Memories (0:30)",
      broward: "Ver Historia de Venta · Spencer y Melissa (1:18)",
      rankings: "Ver Relocalización Internacional · Kyle y Marie (1:22)",
    },
    featureTitle: "Only a REALTOR® · Serie Oficial de Campaña",
    featureSummary: "Films oficiales de RWorld y MIAMI REALTORS®",
    heading: "Por qué elegir un REALTOR® — Serie Oficial",
    hide: "Ocultar vídeo",
    choices: {
      realtor: "01 · Perfect Strangers",
      miami: "02 · Box of Memories",
      broward: "03 · Historia Venta",
      rankings: "04 · Mudanza Global",
    },
    source: "MIAMI REALTORS® + RWorld · Emisión Oficial de Campaña",
  },
} as const;

interface AssociationFilmsProps {
  initialFilm?: FilmKey;
  lang?: "en" | "es";
  location: string;
  tone?: "dark" | "light";
  variant?: "compact" | "feature";
}

/** Inline native video showcase — zero popups, zero YouTube sign-in walls. */
export function AssociationFilms({
  initialFilm = "realtor",
  lang = "en",
  location,
  tone = "dark",
  variant = "compact",
}: AssociationFilmsProps) {
  const [selected, setSelected] = useState<FilmKey>(initialFilm);
  const [expanded, setExpanded] = useState(variant === "feature");
  const t = COPY[lang];
  const film = FILMS[selected];

  function select(key: FilmKey) {
    if (key === selected) return;
    setSelected(key);
    pushEvent("association_film_selected", { film_key: key, location, language: lang });
  }

  function toggleCompact() {
    const next = !expanded;
    setExpanded(next);
    if (next) {
      pushEvent("association_film_open", { film_key: selected, location, language: lang });
    }
  }

  // Feature variant (used in /agents hero): always-on inline video command deck, zero popup.
  if (variant === "feature") {
    return (
      <div className={`association-films association-films--${tone} association-films--feature`}>
        <div className="overflow-hidden border border-[#e8d1a760] bg-[#071722f2] shadow-2xl backdrop-blur-md">
          {/* Top 4-Channel Selector Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/15 bg-black/30 px-3.5 py-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#e8d1a7]">
              {t.featureTitle}
            </span>
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label={t.heading}>
              {(Object.keys(FILMS) as FilmKey[]).map((key) => {
                const isSelected = selected === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => select(key)}
                    className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#d7bc8b] text-[#071722] font-semibold"
                        : "border border-white/20 bg-white/[0.04] text-white/75 hover:border-[#d7bc8b] hover:text-white"
                    }`}
                  >
                    {t.choices[key]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Inline Auto-Playing Video Stage */}
          <div className="relative aspect-video w-full bg-[#040d14]">
            <video
              key={film.src}
              src={film.src}
              poster={film.poster}
              aria-label={film.title}
              controls
              playsInline
              autoPlay
              muted
              loop
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Caption & Attribution Footer */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-4 py-3">
            <div>
              <p className="font-serif text-base text-white">{film.title}</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#e8d1a7]">
                {lang === "es" ? film.subtitleEs : film.subtitleEn}
              </p>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/55">
              {t.source}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Compact variant: inline expandable drawer right in place (no modal popup)
  return (
    <div className={`association-films association-films--${tone} association-films--compact`}>
      <button
        type="button"
        onClick={toggleCompact}
        aria-expanded={expanded}
        className="association-film-trigger"
      >
        <span className="association-film-play">
          <Play size={16} aria-hidden="true" fill="currentColor" />
        </span>
        <span>{expanded ? t.hide : t.triggers[initialFilm]}</span>
      </button>

      {expanded && (
        <div className="mt-3 max-w-xl overflow-hidden border border-[#e8d1a760] bg-[#071722f2] shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-white/15 px-3 py-2">
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label={t.heading}>
              {(Object.keys(FILMS) as FilmKey[]).map((key) => {
                const isSelected = selected === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => select(key)}
                    className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#d7bc8b] text-[#071722] font-semibold"
                        : "border border-white/20 bg-white/[0.04] text-white/75 hover:border-[#d7bc8b] hover:text-white"
                    }`}
                  >
                    {t.choices[key]}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="relative aspect-video w-full bg-[#040d14]">
            <video
              key={film.src}
              src={film.src}
              poster={film.poster}
              aria-label={film.title}
              controls
              playsInline
              autoPlay
              muted
              loop
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="px-3.5 py-2.5">
            <p className="font-serif text-sm text-white">{film.title}</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#e8d1a7]">
              {lang === "es" ? film.subtitleEs : film.subtitleEn}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
