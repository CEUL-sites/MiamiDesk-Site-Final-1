import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Review } from "../../data/reviews";
import { formatReviewDateShort } from "../../data/reviews";
import { reviewWindow, shouldAutoAdvance, wrapReviewIndex } from "./reviewSpotlightModel";

const AUTO_ADVANCE_INTERVAL_MS = 9_000;
const SWIPE_THRESHOLD_PX = 44;

export interface ReviewSpotlightProps {
  reviews: Review[];
  compact?: boolean;
}

function ReviewMeta({ review }: { review: Review }) {
  return (
    <div className="mt-5 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
      <div>
        <p className="font-sans text-xs font-semibold text-white">{review.name}</p>
        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-white/70">
          {review.location}{review.date ? ` · ${formatReviewDateShort(review.date)}` : ""}
        </p>
      </div>
      {review.verified && (
        <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-gold">
          <BadgeCheck size={13} aria-hidden="true" />
          Verified
        </span>
      )}
    </div>
  );
}

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }, (_, index) => (
        <Star key={index} size={14} className="fill-gold text-gold" aria-hidden="true" />
      ))}
    </div>
  );
}

function ReviewPreview({ review }: { review: Review }) {
  return (
    <article aria-hidden="true" className="flex min-h-[18rem] flex-col border border-white/10 bg-white/[0.03] p-5 opacity-60">
      <ReviewStars rating={review.rating} />
      <p className="mt-4 line-clamp-6 flex-1 font-sans text-sm font-light leading-relaxed text-white/70">
        &ldquo;{review.text}&rdquo;
      </p>
      <ReviewMeta review={review} />
    </article>
  );
}

export function ReviewSpotlight({ reviews, compact = false }: ReviewSpotlightProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [pointerPaused, setPointerPaused] = useState(false);
  const [touchPaused, setTouchPaused] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const moveTo = useCallback((index: number) => {
    setActiveIndex(wrapReviewIndex(index, reviews.length));
  }, [reviews.length]);

  const moveBy = useCallback((amount: number) => {
    setActiveIndex((current) => wrapReviewIndex(current + amount, reviews.length));
  }, [reviews.length]);

  useEffect(() => {
    setActiveIndex((current) => wrapReviewIndex(current, reviews.length));
  }, [reviews.length]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.2,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setDocumentVisible(document.visibilityState === "visible");
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  const paused = hoverPaused || focusPaused || pointerPaused || touchPaused;
  const canAutoAdvance = shouldAutoAdvance({ inView, paused, documentVisible, reducedMotion });

  useEffect(() => {
    if (!canAutoAdvance || reviews.length < 2) return;
    const interval = window.setInterval(() => moveBy(1), AUTO_ADVANCE_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [canAutoAdvance, moveBy, reviews.length]);

  if (reviews.length === 0) return null;

  const { active, previous, next } = reviewWindow(activeIndex, reviews.length);
  const activeReview = reviews[active];
  const activeTransition = reducedMotion
    ? undefined
    : { initial: { opacity: 0, x: 18 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -18 }, transition: { duration: 0.25 } };
  const activeCardHeight = compact ? "h-[31rem] sm:h-[27rem]" : "h-[36rem] sm:h-[31rem] lg:h-[29rem]";

  return (
    <div
      ref={sectionRef}
      data-sticky-cta-guard=""
      className="mt-8"
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={() => setFocusPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusPaused(false);
      }}
      onPointerDown={() => setPointerPaused(true)}
      onPointerUp={() => setPointerPaused(false)}
      onPointerCancel={() => setPointerPaused(false)}
      onTouchStart={(event) => {
        setTouchPaused(true);
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        setTouchPaused(false);
        const startX = touchStartX.current;
        const endX = event.changedTouches[0]?.clientX;
        touchStartX.current = null;
        if (startX === null || endX === undefined) return;

        const delta = startX - endX;
        if (Math.abs(delta) >= SWIPE_THRESHOLD_PX) moveBy(delta > 0 ? 1 : -1);
      }}
      onTouchCancel={() => {
        touchStartX.current = null;
        setTouchPaused(false);
      }}
    >
      <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.4fr)_minmax(0,0.75fr)]">
        <div className="hidden lg:block">
          <ReviewPreview review={reviews[previous]} />
        </div>

        <div className={`${activeCardHeight} overflow-hidden border border-gold/30 bg-white/[0.05] p-6 sm:p-8`}>
          <AnimatePresence initial={false} mode="wait">
            <motion.article key={activeReview.name} aria-live="polite" className="flex h-full flex-col" {...activeTransition}>
              <ReviewStars rating={activeReview.rating} />
              <p className="mt-4 flex-1 overflow-y-auto pr-2 font-serif text-lg leading-relaxed text-white sm:text-xl">
                &ldquo;{activeReview.text}&rdquo;
              </p>
              <ReviewMeta review={activeReview} />
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="hidden lg:block">
          <ReviewPreview review={reviews[next]} />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => moveTo(previous)}
          disabled={reviews.length < 2}
          aria-label="Show previous review"
          title="Show previous review"
          className="flex size-11 items-center justify-center border border-gold/40 text-gold transition-colors hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => moveTo(next)}
          disabled={reviews.length < 2}
          aria-label="Show next review"
          title="Show next review"
          className="flex size-11 items-center justify-center border border-gold/40 text-gold transition-colors hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep"
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
