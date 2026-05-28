import { MLSTicker } from "./MLSTicker";

export function BuyerMarketIntelligence() {
  return (
    <section className="bg-navy-deep text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">
              Live South Florida MLS Intelligence
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-5xl">
              See the market moving before you make a move.
            </h2>
          </div>
          <p className="max-w-3xl font-sans text-base leading-[1.85] text-white/58">
            Buyer decisions improve when inventory, pricing, location, and timing are
            evaluated with real market context. The buyer advisory process uses South
            Florida MLS intelligence and professional market review to help identify
            stronger opportunities before acting.
          </p>
        </div>
      </div>

      <MLSTicker
        fallbackMode="empty"
        liveLabel="SOUTH FLORIDA MLS · LIVE INVENTORY · BUYER MARKET INTELLIGENCE"
        staticLabel="SOUTH FLORIDA MLS · BUYER MARKET INTELLIGENCE"
      />

      <div className="mx-auto max-w-7xl px-6 py-5">
        <p className="max-w-4xl font-sans text-[11px] leading-relaxed text-white/38">
          MLS/property data is provided through authorized data sources and may update
          or change. Availability, pricing, status, and property details should be
          independently verified before making a purchase decision.
        </p>
      </div>
    </section>
  );
}
