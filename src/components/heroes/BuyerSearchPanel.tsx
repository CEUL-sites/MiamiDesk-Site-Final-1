import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { trackMicroConversion } from "../../lib/analytics";
import "./hero-video.css";

/**
 * Buyers hero panel: three quick pickers that open the live MLS search
 * pre-filtered (ListingsBrowser reads zone/type/minPrice/maxPrice from the URL),
 * plus a hand-off to the private buyer consultation form on the same page.
 * Values mirror the server-side whitelists in netlify/functions/listings-search.ts.
 */
const CITIES = ["Weston", "Coral Gables", "Brickell", "Miami Beach", "Fort Lauderdale", "Boca Raton"] as const;

const TYPES = [
  { value: "Single Family Residence", label: "Single-family" },
  { value: "Condominium", label: "Condominium" },
] as const;

const BUDGETS = [
  { label: "Under $750K", min: "", max: "750000" },
  { label: "$750K–$2M", min: "750000", max: "2000000" },
  { label: "$2M–$5M", min: "2000000", max: "5000000" },
  { label: "$5M+", min: "5000000", max: "" },
] as const;

function Pills<T extends string>({
  legend,
  options,
  value,
  onPick,
}: {
  legend: string;
  options: readonly { key: T; label: string }[];
  value: T;
  onPick: (key: T) => void;
}) {
  return (
    <fieldset className="mt-4">
      <legend className="hero-panel-kicker">{legend}</legend>
      <div className="hero-pills">
        {options.map((option) => (
          <button key={option.key} type="button" aria-pressed={value === option.key} onClick={() => onPick(option.key)}>
            {option.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function BuyerSearchPanel() {
  const [city, setCity] = useState<string>(CITIES[0]);
  const [type, setType] = useState<string>(TYPES[0].value);
  const [budget, setBudget] = useState<string>(BUDGETS[1].label);

  const range = BUDGETS.find((b) => b.label === budget) ?? BUDGETS[1];
  const params = new URLSearchParams({ zone: city, type });
  if (range.min) params.set("minPrice", range.min);
  if (range.max) params.set("maxPrice", range.max);
  const searchHref = `/listings?${params.toString()}#search`;
  const typeLabel = TYPES.find((t) => t.value === type)?.label ?? "";

  return (
    <div className="hero-panel" data-sticky-cta-guard>
      <h2>Build your search.</h2>
      <Pills legend="City" options={CITIES.map((c) => ({ key: c, label: c }))} value={city} onPick={setCity} />
      <Pills legend="Property type" options={TYPES.map((t) => ({ key: t.value, label: t.label }))} value={type} onPick={setType} />
      <Pills legend="Price range" options={BUDGETS.map((b) => ({ key: b.label, label: b.label }))} value={budget} onPick={setBudget} />
      <p className="mt-4 text-sm text-[#e4eaee]" aria-live="polite">
        {typeLabel} · {city} · {budget}
      </p>
      <a
        href={searchHref}
        className="hero-panel-primary"
        onClick={() => trackMicroConversion("hp_cta_click", { type: "search_mls_preset", location: "buyers_hero_panel" })}
      >
        See live MLS listings <ArrowRight size={16} aria-hidden="true" />
      </a>
      <a
        href="#buyer-mandate"
        className="hero-panel-secondary"
        onClick={() => trackMicroConversion("hp_cta_click", { type: "buyer_consultation", location: "buyers_hero_panel" })}
      >
        Or have Carlos curate a private shortlist <ArrowRight size={14} aria-hidden="true" />
      </a>
      <p className="hero-video-sources mt-3">Live Miami MLS data via Bridge IDX · Conceptual AI-generated imagery</p>
    </div>
  );
}
