import { useState } from "react";
import { Play } from "lucide-react";
import { pushEvent } from "../lib/analytics";
import "./association-films.css";

const FILMS = {
  miami: {
    id: "SgqCKBQykVs",
    src: "/videos/miami_realtor_association.mp4",
    poster: "/images/posters/miami_realtor_association.jpg",
    title: "MIAMI Global City of the Future",
    subtitleEn: "93,000 MIAMI REALTORS® · Global Exposure",
    subtitleEs: "93,000 MIAMI REALTORS® · Exposición Global",
    duration: "0:35",
    published: "2022-06-06",
  },
  broward: {
    id: "0M0J4PAiYNI",
    src: "/videos/south_florida_showcase.mp4",
    poster: "/images/posters/south_florida_showcase.jpg",
    title: "South Florida & Broward Prime Corridors",
    subtitleEn: "3,500+ URG Agents · 19 FL Office Locations",
    subtitleEs: "3,500+ Agentes URG · 19 Ubicaciones en Florida",
    duration: "2:11",
    published: "2016-09-14",
  },
  rankings: {
    id: "0OmztZur7pw",
    src: "/videos/split_miami_spain_mls.mp4",
    poster: "/images/posters/split_miami_spain_mls.jpg",
    title: "Bilateral Spain & LATAM MLS Bridge",
    subtitleEn: "437+ International Partner Agreements",
    subtitleEs: "437+ Acuerdos Internacionales",
    duration: "4:52",
    published: "2019-05-03",
  },
} as const;
type FilmKey = keyof typeof FILMS;

const COPY = {
  en: {
    triggers: {
      miami: "Watch the Miami perspective · 0:35",
      broward: "Watch the Broward perspective · 2:11",
      rankings: "Watch Miami in the Rankings · 4:52",
    },
    featureTitle: "The Miami connection",
    featureSummary: "Interactive South Florida & Global MLS video showcase",
    heading: "South Florida, in perspective",
    hide: "Hide player",
    choices: {
      miami: "01 · Miami MLS",
      broward: "02 · Broward & URG",
      rankings: "03 · Global Bridge",
    },
    source: "HomesProfessional.com · Native HD Showcase · No sign-in required",
  },
  es: {
    triggers: {
      miami: "Ver la perspectiva de Miami · 0:35",
      broward: "Ver la perspectiva de Broward · 2:11",
      rankings: "Ver Miami in the Rankings · 4:52",
    },
    featureTitle: "La conexión con Miami",
    featureSummary: "Presentación interactiva del ecosistema MLS de Miami y alcance global",
    heading: "Una perspectiva del sur de Florida",
    hide: "Ocultar vídeo",
    choices: {
      miami: "01 · Miami MLS",
      broward: "02 · Broward y URG",
      rankings: "03 · Puente Global",
    },
    source: "HomesProfessional.com · Vídeo nativo en el sitio · Sin inicio de sesión",
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
  initialFilm = "miami",
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
          {/* Top 3-Channel Selector Bar */}
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
