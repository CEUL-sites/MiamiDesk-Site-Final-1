import { Link } from "react-router-dom";

/**
 * Contextual cross-links between the city seller pages.
 *
 * The footer already links every city sitewide, but sitewide boilerplate links
 * carry little topical weight. These in-content links between geographically
 * adjacent markets build a proper hub-and-spoke topical cluster: each /sell-<city>
 * page passes relevance to its neighbours, lifting the whole set in local search.
 */

type CityMeta = { slug: string; label: string };

const CITY: Record<string, CityMeta> = {
  "sell-miami":            { slug: "sell-miami",            label: "Miami" },
  "sell-brickell":         { slug: "sell-brickell",         label: "Brickell" },
  "sell-downtown-miami":   { slug: "sell-downtown-miami",   label: "Downtown Miami" },
  "sell-coral-gables":     { slug: "sell-coral-gables",     label: "Coral Gables" },
  "sell-doral":            { slug: "sell-doral",            label: "Doral" },
  "sell-kendall":          { slug: "sell-kendall",          label: "Kendall" },
  "sell-aventura":         { slug: "sell-aventura",         label: "Aventura" },
  "sell-north-miami":      { slug: "sell-north-miami",      label: "North Miami" },
  "sell-hallandale-beach": { slug: "sell-hallandale-beach", label: "Hallandale Beach" },
  "sell-weston":           { slug: "sell-weston",           label: "Weston" },
  "sell-fort-lauderdale":  { slug: "sell-fort-lauderdale",  label: "Fort Lauderdale" },
  "sell-pompano-beach":    { slug: "sell-pompano-beach",    label: "Pompano Beach" },
  "sell-coral-springs":    { slug: "sell-coral-springs",    label: "Coral Springs" },
  "sell-pembroke-pines":   { slug: "sell-pembroke-pines",   label: "Pembroke Pines" },
  "sell-plantation":       { slug: "sell-plantation",       label: "Plantation" },
  "sell-sunrise":          { slug: "sell-sunrise",          label: "Sunrise" },
};

// Geographic adjacency — each market links to 3-4 nearby markets.
const ADJACENCY: Record<string, string[]> = {
  "sell-miami":            ["sell-brickell", "sell-downtown-miami", "sell-coral-gables", "sell-kendall"],
  "sell-brickell":         ["sell-downtown-miami", "sell-miami", "sell-coral-gables", "sell-north-miami"],
  "sell-downtown-miami":   ["sell-brickell", "sell-miami", "sell-north-miami", "sell-coral-gables"],
  "sell-coral-gables":     ["sell-miami", "sell-brickell", "sell-kendall", "sell-doral"],
  "sell-doral":            ["sell-miami", "sell-coral-gables", "sell-kendall", "sell-weston"],
  "sell-kendall":          ["sell-miami", "sell-coral-gables", "sell-doral", "sell-brickell"],
  "sell-aventura":         ["sell-north-miami", "sell-hallandale-beach", "sell-miami", "sell-fort-lauderdale"],
  "sell-north-miami":      ["sell-aventura", "sell-miami", "sell-downtown-miami", "sell-hallandale-beach"],
  "sell-hallandale-beach": ["sell-aventura", "sell-fort-lauderdale", "sell-pompano-beach", "sell-north-miami"],
  "sell-weston":           ["sell-plantation", "sell-sunrise", "sell-pembroke-pines", "sell-coral-springs"],
  "sell-fort-lauderdale":  ["sell-plantation", "sell-sunrise", "sell-pompano-beach", "sell-hallandale-beach"],
  "sell-pompano-beach":    ["sell-fort-lauderdale", "sell-coral-springs", "sell-hallandale-beach"],
  "sell-coral-springs":    ["sell-sunrise", "sell-plantation", "sell-pompano-beach", "sell-weston"],
  "sell-pembroke-pines":   ["sell-weston", "sell-plantation", "sell-hallandale-beach", "sell-fort-lauderdale"],
  "sell-plantation":       ["sell-sunrise", "sell-weston", "sell-fort-lauderdale", "sell-coral-springs"],
  "sell-sunrise":          ["sell-plantation", "sell-weston", "sell-coral-springs", "sell-fort-lauderdale"],
};

export function NearbyMarkets({ current }: { current: string }) {
  const neighbors = (ADJACENCY[current] ?? [])
    .map((slug) => CITY[slug])
    .filter(Boolean);

  if (neighbors.length === 0) return null;

  return (
    <section className="bg-white border-t border-hairline py-10">
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold mb-5">
          Nearby Markets
        </p>
        <div className="flex flex-wrap gap-3">
          {neighbors.map((n) => (
            <Link
              key={n.slug}
              to={`/${n.slug}`}
              className="border border-hairline px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-primary/60 hover:border-gold/50 hover:text-gold transition-colors"
            >
              Sell in {n.label} →
            </Link>
          ))}
          <Link
            to="/sell-south-florida"
            className="border border-gold/40 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold hover:bg-gold/5 transition-colors"
          >
            All South Florida →
          </Link>
        </div>
      </div>
    </section>
  );
}
