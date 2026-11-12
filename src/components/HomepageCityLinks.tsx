import { Link } from "react-router-dom";

const COUNTIES = [
  {
    name: "Miami-Dade County",
    cities: [
      { label: "Brickell", to: "/sell-brickell" },
      { label: "Downtown Miami", to: "/sell-downtown-miami" },
      { label: "Miami", to: "/sell-miami" },
      { label: "Coral Gables", to: "/sell-coral-gables" },
      { label: "Kendall", to: "/sell-kendall" },
      { label: "Doral", to: "/sell-doral" },
      { label: "Aventura", to: "/sell-aventura" },
      { label: "North Miami", to: "/sell-north-miami" },
    ],
  },
  {
    name: "Broward County",
    cities: [
      { label: "Weston", to: "/sell-weston" },
      { label: "Pembroke Pines", to: "/sell-pembroke-pines" },
      { label: "Coral Springs", to: "/sell-coral-springs" },
      { label: "Plantation", to: "/sell-plantation" },
      { label: "Sunrise", to: "/sell-sunrise" },
      { label: "Fort Lauderdale", to: "/sell-fort-lauderdale" },
      { label: "Pompano Beach", to: "/sell-pompano-beach" },
      { label: "Hallandale Beach", to: "/sell-hallandale-beach" },
    ],
  },
] as const;

export function HomepageCityLinks() {
  return (
    <section
      id="city-seller-links"
      aria-labelledby="city-seller-links-heading"
      className="border-t border-hairline bg-ivory py-12 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-ink font-semibold">
          Seller Guides by Market
        </p>
        <h2
          id="city-seller-links-heading"
          className="mt-3 font-serif text-2xl text-navy-deep sm:text-3xl tracking-tight"
        >
          Sell a Home in Miami-Dade or Broward
        </h2>
        <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-navy/75">
          Choose your city for a seller guide with local market context and sources.
        </p>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {COUNTIES.map((county) => (
            <div key={county.name}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-navy/60 font-semibold">
                {county.name}
              </h3>
              <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                {county.cities.map((city) => (
                  <li key={city.to}>
                    <Link
                      to={city.to}
                      className="font-sans text-sm text-navy-deep underline decoration-gold/50 underline-offset-4 transition-colors hover:text-gold-ink"
                    >
                      Sell a home in {city.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-navy-deep">
          <Link to="/home-value" className="underline decoration-gold/50 underline-offset-4 hover:text-gold-ink">
            Request a home valuation
          </Link>
          <Link to="/sell" className="underline decoration-gold/50 underline-offset-4 hover:text-gold-ink">
            Seller services overview
          </Link>
        </p>
      </div>
    </section>
  );
}
