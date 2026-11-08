import counties from "../data/heroCounties.json";
import { pushEvent } from "../lib/analytics";
import "./advisory-heroes.css";

interface CountyDetail {
  corridorTag: string;
  directionLabel: string;
  mapLabel: string;
  mapSubLabel: string;
  labelY: number;
  pinX: number;
  pinY: number;
  citiesCount: string;
  urgBranches: string;
  text: string;
  submarkets: readonly string[];
  links: readonly [string, string][];
}

// Indexed to match heroCounties.json:
// 0 = Miami-Dade County (South), 1 = Broward County (Central), 2 = Palm Beach County (North)
const COUNTY_DETAILS: readonly CountyDetail[] = [
  {
    corridorTag: "South Corridor · International Gateway",
    directionLabel: "South · Global Core",
    mapLabel: "MIAMI-DADE",
    mapSubLabel: "Coral Gables · Brickell · Doral",
    labelY: 274,
    pinX: 118,
    pinY: 266,
    citiesCount: "19 Municipalities",
    urgBranches: "Aventura · Hialeah · Kendall",
    text: "Urban condominiums, historic single-family enclaves, and bayfront estates across Coral Gables, Brickell, Aventura, Doral, Miami Beach, and Pinecrest—connecting domestic relocation with Latin American and European buyers.",
    submarkets: [
      "Coral Gables",
      "Brickell",
      "Doral",
      "Aventura",
      "Miami Beach",
      "Pinecrest",
      "Sunny Isles Beach",
      "Key Biscayne",
    ],
    links: [
      ["Coral Gables", "/sell-coral-gables"],
      ["Brickell", "/sell-brickell"],
      ["Doral", "/sell-doral"],
      ["Aventura", "/sell-aventura"],
      ["Miami", "/sell-miami"],
    ],
  },
  {
    corridorTag: "Central Corridor · Executive & Coastal Hub",
    directionLabel: "Central · Weston & Coastal",
    mapLabel: "BROWARD",
    mapSubLabel: "Weston · Fort Lauderdale · Plantation",
    labelY: 175,
    pinX: 132,
    pinY: 176,
    citiesCount: "22 Municipalities",
    urgBranches: "Weston · Plantation HQ · Fort Lauderdale · Coral Springs",
    text: "Master-planned executive communities in Weston, Plantation, and Coral Springs paired with deepwater yachting and oceanfront estates in Fort Lauderdale, Pompano Beach, and Hallandale Beach.",
    submarkets: [
      "Weston (Carlos Desk)",
      "Fort Lauderdale",
      "Plantation",
      "Coral Springs",
      "Pembroke Pines",
      "Parkland",
      "Pompano Beach",
      "Hallandale Beach",
    ],
    links: [
      ["Weston", "/sell-weston"],
      ["Fort Lauderdale", "/sell-fort-lauderdale"],
      ["Plantation", "/sell-plantation"],
      ["Coral Springs", "/sell-coral-springs"],
      ["Pompano Beach", "/sell-pompano-beach"],
    ],
  },
  {
    corridorTag: "North Corridor · Club & Coastal Estates",
    directionLabel: "North · Palm Beach Corridor",
    mapLabel: "PALM BEACH",
    mapSubLabel: "Boca Raton · Delray · West Palm",
    labelY: 86,
    pinX: 142,
    pinY: 126,
    citiesCount: "11 Municipalities",
    urgBranches: "Boca Raton · Delray Beach · Wellington · Palm Beach Gardens",
    text: "Private golf-club communities, equestrian estates, and oceanfront residences across Boca Raton, Delray Beach, West Palm Beach, Wellington, and Jupiter—driven by Northeast, Midwest, and California wealth migration.",
    submarkets: [
      "Boca Raton",
      "Delray Beach",
      "West Palm Beach",
      "Wellington",
      "Palm Beach Gardens",
      "Jupiter",
      "Boynton Beach",
      "Royal Palm Beach",
    ],
    links: [
      ["Boca Raton Seller Guide", "/journal/selling-boca-raton-home-2026"],
      ["Boca Raton Net Proceeds", "/journal/net-proceeds-boca-raton-2026-july"],
      ["Palm Beach CMA Review", "/home-value"],
      ["Private Seller Consultation", "/contact?intent=seller&market=palm-beach"],
    ],
  },
];

// Geographic North-to-South display order so the top button ("Palm Beach County")
// aligns directly with the top (northern) polygon on the map, Broward is in the middle,
// and Miami-Dade is at the bottom (south).
const NORTH_TO_SOUTH_INDICES = [2, 1, 0] as const;

export function CountyExplorer({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (index: number) => void;
}) {
  function select(index: number) {
    onSelect(index);
    pushEvent("market_selected", {
      county: counties[index].name,
      location: "markets_hero",
    });
  }

  const activeCounty = counties[selected] ?? counties[0];
  const activeDetail = COUNTY_DETAILS[selected] ?? COUNTY_DETAILS[0];

  return (
    <div id="market-explorer" className="county-explorer">
      {/* Left Column: Geographic SVG Map with On-Map Labels & Compass */}
      <div className="relative flex flex-col items-center">
        <div className="mb-2 flex w-full items-center justify-between border-b border-white/15 pb-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#d7bc8b]">
          <span>↑ North · Gold Coast</span>
          <span>Tri-County MLS</span>
        </div>
        <svg
          viewBox="0 0 230 380"
          role="group"
          aria-label="Select a South Florida county"
        >
          {counties.map((county, index) => {
            const isSelected = selected === index;
            const detail = COUNTY_DETAILS[index];
            return (
              <g key={county.id}>
                <path
                  d={county.path}
                  fillRule="evenodd"
                  role="button"
                  tabIndex={0}
                  aria-label={county.name}
                  aria-pressed={isSelected}
                  onClick={() => select(index)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      select(index);
                    }
                  }}
                >
                  <title>{county.name}</title>
                </path>
                {/* On-map county label so geography is unmistakable */}
                <text
                  x={78}
                  y={detail.labelY}
                  textAnchor="middle"
                  pointerEvents="none"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    fill: isSelected ? "#071722" : "#f9f7f2",
                  }}
                >
                  {detail.mapLabel}
                </text>
                {/* Coastal city pin marker */}
                <circle
                  cx={detail.pinX}
                  cy={detail.pinY}
                  r={isSelected ? 4 : 2.5}
                  fill={isSelected ? "#071722" : "#d7bc8b"}
                  stroke={isSelected ? "#f9f7f2" : "none"}
                  strokeWidth={1.2}
                  pointerEvents="none"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Right Column: North-to-South Aligned County Selector Buttons */}
      <div className="county-options">
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d7bc8b]">
          Select County (North → South)
        </p>
        {NORTH_TO_SOUTH_INDICES.map((countyIndex) => {
          const county = counties[countyIndex];
          const detail = COUNTY_DETAILS[countyIndex];
          const isSelected = selected === countyIndex;
          return (
            <button
              key={county.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => select(countyIndex)}
              className="group transition-all"
            >
              <span className="block font-mono text-[9px] uppercase tracking-[0.16em] opacity-75">
                {detail.directionLabel}
              </span>
              <span className="mt-0.5 flex items-center justify-between font-serif text-base">
                <span>{county.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em]">
                  {detail.citiesCount}
                </span>
              </span>
              <span className="mt-0.5 block font-sans text-[11px] opacity-80">
                {detail.mapSubLabel}
              </span>
            </button>
          );
        })}
        <p className="advisory-note" style={{ marginTop: "6px" }}>
          19 URG Florida office locations across all three counties
        </p>
      </div>

      {/* Bottom Full-Width Detail Drawer: Submarket Pills, URG Branches & Direct Links */}
      <div className="county-detail" aria-live="polite">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d7bc8b]">
              {activeDetail.corridorTag}
            </p>
            <h2>{activeCounty.name}</h2>
          </div>
          <span className="border border-[#d7bc8b]/40 bg-[#d7bc8b]/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[#d7bc8b]">
            URG Offices: {activeDetail.urgBranches}
          </span>
        </div>

        <p>{activeDetail.text}</p>

        {/* Key Submarket Pills */}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {activeDetail.submarkets.map((city) => (
            <span
              key={city}
              className="border border-white/15 bg-white/[0.04] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/85"
            >
              {city}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 border-t border-white/15 pt-2">
          {activeDetail.links.map(([name, href]) => (
            <a key={href + name} href={href}>
              {name} →
            </a>
          ))}
        </div>
      </div>

      <p
        className="advisory-note"
        style={{ gridColumn: "1 / -1", marginTop: 0 }}
      >
        Boundaries:{" "}
        <a
          href="https://www.census.gov/geographies/mapping-files/time-series/geo/carto-boundary-file.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          U.S. Census Bureau, 2025
        </a>
        . Simplified for display. No live market data.
      </p>
    </div>
  );
}
