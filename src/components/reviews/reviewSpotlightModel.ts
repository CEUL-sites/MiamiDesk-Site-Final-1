export function wrapReviewIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  return ((index % length) + length) % length;
}

export function reviewWindow(activeIndex: number, length: number) {
  const active = wrapReviewIndex(activeIndex, length);
  return {
    previous: wrapReviewIndex(active - 1, length),
    active,
    next: wrapReviewIndex(active + 1, length),
  };
}

export function shouldAutoAdvance(input: {
  inView: boolean;
  paused: boolean;
  documentVisible: boolean;
  reducedMotion: boolean;
}): boolean {
  return input.inView && !input.paused && input.documentVisible && !input.reducedMotion;
}
