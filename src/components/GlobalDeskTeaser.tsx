import { ChevronRight, Globe2 } from "lucide-react";

// Homepage entry point to the Global Desk business unit (/global-desk).
// The landing page itself renders Spanish by default with an EN/ES toggle;
// this teaser uses the site's English shell copy.
export function GlobalDeskTeaser() {
  return (
    <section className="border-y border-gold/20 bg-navy-deep px-6 py-16 md:py-20 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
            <Globe2 size={13} className="text-gold" />
            Global Desk
          </p>
          <h2 className="mt-4 font-serif text-2xl leading-snug text-white md:text-3xl">
            Global Desk — international exposure for luxury property
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-white/65">
            For developers and agencies: place Spanish luxury property into the Miami MLS
            international listings section, with local representation preserved.
          </p>
        </div>
        <div className="flex-shrink-0">
          <a
            href="/global-desk"
            className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
          >
            Enter the Global Desk
            <ChevronRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
