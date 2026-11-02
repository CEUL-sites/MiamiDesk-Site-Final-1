import { ExternalLink } from "lucide-react";
import "./global-research-links.css";

/** Official references, separate from property-specific reach and eligibility. */
export function GlobalResearchLinks({ lang = "en" }: { lang?: "en" | "es" }) {
  const es = lang === "es";
  return (
    <aside className="global-research-links" data-sticky-cta-guard aria-label={es ? "Recursos internacionales de Florida Realtors" : "Florida Realtors international resources"}>
      <div className="global-research-copy">
        <p className="font-sans text-sm leading-relaxed text-navy/75">
          {es ? "Recursos oficiales: investigación sobre compradores internacionales y programas globales de Florida Realtors®." : "Official resources: Florida Realtors® international buyer research and global programs."}
        </p>
        <div className="global-research-actions">
          <a href="https://www.floridarealtors.org/global" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-sans text-sm text-gold-ink underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-ink">
            {es ? "Programas globales de Florida Realtors®" : "Florida Realtors® Global programs"}<ExternalLink size={14} aria-hidden="true" />
          </a>
          <a href="https://www.floridarealtors.org/tools-research/reports/international-home-buyers-sellers-profile-florida" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-sans text-sm text-gold-ink underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-ink">
            {es ? "Estudio de compradores internacionales" : "International buyer research"}<ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
        <p className="mt-1 font-sans text-xs leading-relaxed text-navy/70">
          {es ? "Información de contexto; la elegibilidad y la distribución se revisan para cada propiedad." : "Market context; eligibility and distribution are reviewed for each property."}
        </p>
      </div>
      <figure className="global-research-film">
        <div className="relative aspect-video overflow-hidden bg-navy-deep">
          <iframe src="https://www.youtube-nocookie.com/embed/RXNXHt09Tdo?rel=0&playsinline=1" title={es ? "Florida Realtors® en CiMi 360, Brasil" : "Florida Realtors® at CiMi 360, Brazil"} loading="lazy" width="560" height="315" allow="encrypted-media; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="absolute inset-0 h-full w-full border-0" />
        </div>
        <figcaption className="mt-3 font-sans text-xs leading-relaxed text-navy/70">
          {es ? "Florida Realtors® en CiMi 360. Vídeo de la asociación, publicado el " : "Florida Realtors® at CiMi 360. Association footage, published "}
          <time dateTime="2026-09-16">{es ? "16 de septiembre de 2026." : "September 16, 2026."}</time>
          {es ? " Duración: 3:03." : " Duration: 3:03."}
        </figcaption>
      </figure>
    </aside>
  );
}
