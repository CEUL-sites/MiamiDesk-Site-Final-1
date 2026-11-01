import { useEffect, useId, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { pushEvent } from "../lib/analytics";
import "./association-films.css";

const FILMS = {
  miami: { id: "SgqCKBQykVs", title: "MIAMI Global City of the Future", duration: "0:35", published: "2022-06-06" },
  broward: { id: "0M0J4PAiYNI", title: "Top 20 Reasons to Visit & Buy in Broward", duration: "2:11", published: "2016-09-14" },
  rankings: { id: "0OmztZur7pw", title: "Miami in the Rankings", duration: "4:52", published: "2019-05-03" },
} as const;
type FilmKey = keyof typeof FILMS;

const COPY = {
  en: {
    triggers: { miami: "Watch the Miami perspective · 0:35", broward: "Watch the Broward perspective · 2:11", rankings: "Watch Miami in the Rankings · 4:52" },
    featureTitle: "The Miami connection",
    featureSummary: "A 35-second introduction from MIAMI Association of REALTORS®",
    watch: "Watch film", heading: "South Florida, in perspective", close: "Close video",
    choices: { miami: "Miami · 0:35", broward: "Broward · 2:11", rankings: "Miami rankings · 4:52" },
    source: "Source: MIAMI Association of REALTORS® · Published",
    archive: "Archival association films. Rankings and market references reflect their original publication, not current market data. English-language videos; captions depend on the publisher.",
    reload: "Reload video", privacy: "Playing loads video from YouTube.",
  },
  es: {
    triggers: { miami: "Ver la perspectiva de Miami · 0:35", broward: "Ver la perspectiva de Broward · 2:11", rankings: "Ver Miami in the Rankings · 4:52" },
    featureTitle: "La conexión con Miami",
    featureSummary: "Una introducción de 35 segundos de MIAMI Association of REALTORS®",
    watch: "Ver vídeo", heading: "Una perspectiva del sur de Florida", close: "Cerrar vídeo",
    choices: { miami: "Miami · 0:35", broward: "Broward · 2:11", rankings: "Rankings de Miami · 4:52" },
    source: "Fuente: MIAMI Association of REALTORS® · Publicado",
    archive: "Vídeos de archivo de la asociación. Los rankings y referencias de mercado corresponden a su publicación original, no a datos actuales. Vídeos en inglés; subtítulos según disponibilidad del editor.",
    reload: "Volver a cargar el vídeo", privacy: "Al reproducir, se carga vídeo de YouTube.",
  },
} as const;

interface AssociationFilmsProps {
  initialFilm?: FilmKey;
  lang?: "en" | "es";
  location: string;
  tone?: "dark" | "light";
  variant?: "compact" | "feature";
}

/** No player or remote thumbnail is mounted until the visitor chooses to watch. */
export function AssociationFilms({ initialFilm = "miami", lang = "en", location, tone = "dark", variant = "compact" }: AssociationFilmsProps) {
  const [selected, setSelected] = useState<FilmKey>(initialFilm);
  const [active, setActive] = useState(false);
  const [inlineFallback, setInlineFallback] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  const t = COPY[lang];
  const film = FILMS[selected];

  useEffect(() => {
    if (!active || inlineFallback) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [active, inlineFallback]);

  function open() {
    pushEvent("association_film_open", { film_key: initialFilm, location, language: lang });
    setSelected(initialFilm);
    setActive(true);
    if (typeof dialog.current?.showModal !== "function") {
      setInlineFallback(true);
      return;
    }
    dialog.current.showModal();
  }

  function select(key: FilmKey) {
    setSelected(key);
    pushEvent("association_film_selected", { film_key: key, location, language: lang });
  }

  function closed() {
    setActive(false);
    setInlineFallback(false);
    trigger.current?.focus();
  }

  function close() {
    if (inlineFallback) closed();
    else dialog.current?.close();
  }

  return (
    <div className={`association-films association-films--${tone} association-films--${variant}`}>
      <button ref={trigger} type="button" onClick={open} className="association-film-trigger" aria-haspopup="dialog" aria-controls={`${id}-dialog`}>
        <span className="association-film-play"><Play size={variant === "feature" ? 24 : 16} aria-hidden="true" fill="currentColor" /></span>
        {variant === "feature" ? (
          <span className="association-film-feature-copy">
            <span className="association-film-feature-title">{t.featureTitle}</span>
            <span className="association-film-feature-summary">{t.featureSummary}</span>
            <span className="association-film-feature-action">{t.watch}</span>
          </span>
        ) : <span>{t.triggers[initialFilm]}</span>}
      </button>
      <dialog ref={dialog} id={`${id}-dialog`} className="association-film-dialog" open={inlineFallback || undefined} data-inline-fallback={inlineFallback || undefined} lang={lang} aria-labelledby={`${id}-heading`} aria-describedby={`${id}-archive`} onClose={closed}>
        <header className="association-film-dialog-header">
          <h2 id={`${id}-heading`}>{t.heading}</h2>
          <button type="button" className="association-film-close" autoFocus aria-label={t.close} onClick={close}><X size={22} aria-hidden="true" /></button>
        </header>
        <div className="association-film-options">
          {(Object.keys(FILMS) as FilmKey[]).map(key => <button key={key} type="button" aria-pressed={selected === key} onClick={() => select(key)}>{t.choices[key]}</button>)}
        </div>
        <div className="association-film-player">
          {active && <iframe key={`${film.id}-${reloadKey}`} src={`https://www.youtube-nocookie.com/embed/${film.id}?rel=0&autoplay=1&playsinline=1`} title={film.title} allow="autoplay; encrypted-media; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />}
        </div>
        <div className="association-film-details">
          <h3 lang="en">{film.title}</h3>
          <p className="association-film-source">{t.source} <time dateTime={film.published}>{film.published}</time></p>
          <p id={`${id}-archive`} className="association-film-archive">{t.archive}</p>
          <div className="association-film-fallback"><button type="button" onClick={() => setReloadKey(key => key + 1)}>{t.reload}</button><span>{t.privacy}</span></div>
        </div>
      </dialog>
    </div>
  );
}
