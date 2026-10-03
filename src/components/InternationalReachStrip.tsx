import { ChevronRight } from "lucide-react";

export function InternationalReachStrip() {
  return (
    <section className="border-t border-gold/20 bg-navy-deep py-10 px-6">
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
          International Reach
        </p>
        <p className="mt-4 max-w-3xl font-sans text-base leading-relaxed text-white/65">
          We coordinate relevant international inquiries alongside MLS visibility and eligible distribution. International owners and agencies can request a separate professional activation review through the Global Desk.
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
