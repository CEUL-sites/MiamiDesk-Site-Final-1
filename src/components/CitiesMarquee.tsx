import { URG_CITIES } from "../constants";

const cityLoop = [...URG_CITIES, ...URG_CITIES, ...URG_CITIES];
const regionLoop = cityLoop.map((item) => item.region);

export function CitiesMarquee() {
  return (
    <section id="cities" className="border-y border-bone bg-ivory py-16">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">United Realty Group · South Florida Coverage</p>
        <h2 className="mt-4 font-serif text-4xl text-navy lg:text-5xl">19 cities. One professional network.</h2>
        <p className="mx-auto mt-5 max-w-3xl font-sans text-base leading-relaxed text-navy/60">
          United Realty Group maintains active offices and agent networks across Miami-Dade, Broward, and Palm Beach counties, the three counties that define South Florida's real estate market.
        </p>
      </div>

      <div className="marquee-container mt-12 border-y border-gold/10 py-6">
        <div className="marquee-track gap-8">
          {cityLoop.map((item, index) => (
            <div key={`${item.city}-${index}`} className="flex items-center gap-8">
              <span className="font-serif text-4xl font-semibold uppercase tracking-wider text-navy lg:text-5xl">{item.city}</span>
              <span className="text-3xl text-gold">·</span>
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-container py-5">
        <div className="marquee-track-reverse gap-8">
          {regionLoop.map((region, index) => (
            <div key={`${region}-${index}`} className="flex items-center gap-8">
              <span className="font-sans text-xl font-light italic text-navy/40">{region}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold/50" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4 px-6">
        {[
          "Miami-Dade · 9 Cities",
          "Broward · 8 Cities",
          "Palm Beach · 3 Cities"
        ].map((pill) => (
          <span key={pill} className="border border-gold/40 bg-navy px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
            {pill}
          </span>
        ))}
      </div>
    </section>
  );
}
