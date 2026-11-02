import { useState } from "react";
import { Play } from "lucide-react";
import "./embedded-film.css";

export const SITE_PREVIEW = {
  src: "/videos/miami_realtor_association.mp4",
  poster: "/images/posters/miami_realtor_association.jpg",
  title: "HomesProfessional property presentation preview",
} as const;

export function SiteVideoPreview({ lang = "en", onError }: { lang?: "en" | "es"; onError?: () => void }) {
  return <video className="embedded-film-native" src={SITE_PREVIEW.src} poster={SITE_PREVIEW.poster} aria-label={lang === "es" ? "Vista previa ilustrativa de presentación inmobiliaria de HomesProfessional" : SITE_PREVIEW.title} controls playsInline autoPlay muted preload="none" onError={onError} />;
}

/** YouTube restrictions cannot be read through a cross-origin iframe or bypassed by this site. */
export function EmbeddedFilm({ videoId, title, duration, lang = "en", onPreviewChange }: {
  videoId: string; title: string; duration: string; lang?: "en" | "es"; onPreviewChange: (preview: boolean) => void;
}) {
  const [mode, setMode] = useState<"choice" | "original" | "preview" | "error">("choice");
  const es = lang === "es";
  function choose(next: typeof mode) { setMode(next); onPreviewChange(next === "preview" || next === "error"); }

  return <div className="embedded-film">
    <div className="embedded-film-toolbar">
      <p>{es ? "Si YouTube solicita iniciar sesión, puede ver nuestra vista previa sin salir de esta página." : "If YouTube asks you to sign in, you can play our preview without leaving this page."}</p>
      {mode !== "preview" && mode !== "error" ? <button type="button" onClick={() => choose("preview")}>{es ? "Ver nuestra vista previa · 0:10" : "Play our on-site preview · 0:10"}</button> : <button type="button" onClick={() => choose("original")}>{es ? "Intentar el vídeo original" : "Try the original association film"}</button>}
    </div>
    <div className={`embedded-film-stage${mode === "original" ? " embedded-film-stage--youtube" : mode === "choice" ? " embedded-film-stage--choice" : ""}`}>
      {mode === "choice" && <div className="embedded-film-choice">
        <div><p>{title}</p><button type="button" onClick={() => choose("original")}><Play size={18} aria-hidden="true" />{es ? "Reproducir vídeo de la asociación" : "Play association film"}<span>· {duration}</span></button><small>{es ? "Reproductor de YouTube · Puede solicitar iniciar sesión" : "YouTube player · May require sign-in"}</small></div>
      </div>}
      {mode === "original" && <iframe src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0&autoplay=1&playsinline=1`} title={title} allow="autoplay; encrypted-media; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen onError={() => choose("choice")} />}
      {mode === "preview" && <SiteVideoPreview lang={lang} onError={() => choose("error")} />}
      {mode === "error" && <div className="embedded-film-error" role="status"><p>{es ? "La vista previa no se ha cargado. Vuelva a intentarlo." : "The preview could not load. Please try again."}</p><button type="button" onClick={() => choose("preview")}>{es ? "Reintentar vista previa" : "Retry on-site preview"}</button></div>}
    </div>
  </div>;
}
