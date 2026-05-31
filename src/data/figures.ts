// Single source of truth for every stat displayed on the site.
// All figures come from data/figures.json (see Section 2 of the build brief).
// Components must import from here — no hard-coded numbers in JSX.
import raw from "./figures.json";

export type Figure = { value: string; label: string; source: string };

export const FIGURES = raw;

/** Convenience getter for a figure's display value (e.g. "93,000"). */
export const fig = (key: keyof typeof raw): string => {
  const f = raw[key] as unknown as Figure;
  return typeof f === "string" ? f : f.value;
};

/** Convenience getter for a figure's label. */
export const figLabel = (key: keyof typeof raw): string => {
  const f = raw[key] as unknown as Figure;
  return typeof f === "string" ? "" : f.label;
};
