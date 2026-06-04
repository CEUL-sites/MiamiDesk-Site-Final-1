import { ChevronRight } from "lucide-react";

export function InternationalReachStrip() {
  return (
    <section className="border-t border-gold/20 bg-navy-deep py-10 px-6">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
          International Reach
        </p>
        <p className="mt-4 max-w-3xl font-sans text-base leading-relaxed text-white/65">
          A meaningful share of South Florida demand originates abroad. Eligible listings reach 93,000
          member agents and 200+ global portals in 19 languages — and international owners can route
          inventory into the same network through the Global Desk.
        </p>
        <a
          href="/global-desk"
          className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold transition-colors hover:text-gold/70"
        >
          Explore the Global Desk
          <ChevronRight size={13} />
        </a>
      </div>
    </section>
  );
}
