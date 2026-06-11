import { ArrowRight } from "lucide-react";

/**
 * Slim mid-page conversion band — placed right after social proof, where
 * visitor trust peaks. One message, one action: the free valuation.
 */
export function SellerCtaBand() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-12 md:py-14">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.06] blur-[100px]" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold">Thinking of selling?</p>
          <h2 className="mt-2 font-serif text-2xl leading-snug text-white md:text-3xl">
            Find out what your home could sell for.
          </h2>
          <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
            Free MLS-based valuation · Confidential · No listing commitment
          </p>
        </div>
        <a
          href="/home-value"
          className="group inline-flex flex-shrink-0 items-center gap-2.5 bg-gold px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90"
        >
          Get My Free Valuation
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
