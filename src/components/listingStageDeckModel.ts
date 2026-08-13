/**
 * Deck geometry for the listing-execution stage deck.
 *
 * Kept out of the component so a verify script can assert on it without a DOM,
 * the same way heroSellerFormModel and mobileStickyModel are.
 */

/**
 * Where a card sits in the stack relative to the active one.
 *
 * 0 is the front card; 1, 2, 3 recede behind it. Positions wrap, so advancing
 * past the last stage sends the front card to the back rather than emptying the
 * deck — the deck never runs out and never shows a gap.
 */
export function deckPosition(index: number, active: number, total: number): number {
  if (total <= 0) return 0;
  return ((index - active) % total + total) % total;
}

/** Visual depth for a card at stack position `d`, clamped so far cards stay legible. */
export function deckLayer(d: number): { lift: number; scale: number; opacity: number; z: number } {
  const depth = Math.min(d, 3);
  return {
    // Guarded against -0, which reads as a negative offset in a transform string
    // and compares unequal to 0 under strict equality.
    lift: depth === 0 ? 0 : -depth * 13,
    scale: 1 - depth * 0.045,
    opacity: depth === 0 ? 1 : Math.max(0.24, 0.5 - (depth - 1) * 0.12),
    z: 100 - depth,
  };
}

/** Next stage, wrapping at the end. */
export function nextStage(active: number, total: number): number {
  if (total <= 0) return 0;
  return (active + 1) % total;
}

/** Previous stage, wrapping at the start. */
export function previousStage(active: number, total: number): number {
  if (total <= 0) return 0;
  return (active - 1 + total) % total;
}

/**
 * Whether the deck should advance on its own.
 *
 * Auto-advance is a hint that the deck is explorable, not a carousel that steals
 * control: it stops for good the moment a visitor picks a stage, and it never
 * starts for a visitor who asked for reduced motion or while the deck is off
 * screen (an unseen timer only burns battery and desynchronises the deck from
 * what the visitor returns to).
 */
export function shouldAutoAdvance(state: {
  inView: boolean;
  engaged: boolean;
  reducedMotion: boolean;
}): boolean {
  return state.inView && !state.engaged && !state.reducedMotion;
}
