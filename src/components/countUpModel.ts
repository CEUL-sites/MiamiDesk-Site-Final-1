/**
 * Figure parsing for the animated stat counters.
 *
 * The site's verified figures are written the way they are cited — "93,000",
 * "200+", "3,500+" — and they must be displayed exactly that way. So the
 * counter never rebuilds a figure from a number: it splits the string once,
 * animates only the digits, and reassembles it with the original prefix,
 * grouping and suffix intact. A figure the parser does not recognise is
 * returned unanimated rather than approximated.
 */

export interface ParsedFigure {
  /** Text before the digits, e.g. "$". */
  prefix: string;
  /** The numeric value the counter animates toward. */
  value: number;
  /** Text after the digits, e.g. "+" or "M". */
  suffix: string;
  /** True when the source figure used thousands separators. */
  grouped: boolean;
  /** False when the figure has no digits to animate — render it verbatim. */
  animatable: boolean;
}

export function parseFigure(raw: string): ParsedFigure {
  const match = raw.match(/^([^\d]*)([\d,]+)(.*)$/);
  if (!match) {
    return { prefix: raw, value: 0, suffix: "", grouped: false, animatable: false };
  }
  const [, prefix, digits, suffix] = match;
  const value = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(value)) {
    return { prefix: raw, value: 0, suffix: "", grouped: false, animatable: false };
  }
  return { prefix, value, suffix, grouped: digits.includes(","), animatable: true };
}

/** Rebuild the display string for an in-progress count. */
export function formatFigure(parsed: ParsedFigure, current: number): string {
  if (!parsed.animatable) return parsed.prefix;
  const rounded = Math.round(current);
  const digits = parsed.grouped ? rounded.toLocaleString("en-US") : String(rounded);
  return `${parsed.prefix}${digits}${parsed.suffix}`;
}

/**
 * Eased progress, 0..1. Cubic ease-out so the figure decelerates onto its final
 * value instead of snapping — the last digits need to be readable, since the
 * number is the claim being made.
 */
export function countEase(t: number): number {
  const clamped = Math.min(1, Math.max(0, t));
  return 1 - Math.pow(1 - clamped, 3);
}
