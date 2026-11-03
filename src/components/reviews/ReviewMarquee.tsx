import { useState } from "react";
import { BadgeCheck, Sparkles, Star } from "lucide-react";
import { REVIEWS, type Review, formatReviewDateShort } from "../../data/reviews";
import { ReviewModal } from "./ReviewModal";

export function ReviewMarquee({
  lang = "en",
  tone = "dark",
}: {
  lang?: "en" | "es";
  tone?: "dark" | "light";
}) {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const es = lang === "es";
  const dark = tone === "dark";

  // Duplicate list for seamless infinite CSS scroll loop
  const trackItems = [...REVIEWS, ...REVIEWS];

  return (
    <div className={`relative w-full max-w-full overflow-hidden py-6 ${dark ? "bg-navy-deep" : "bg-ivory/70 border-t border-hairline"}`}>
      <style>{`
        @keyframes review-marquee-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .review-marquee-track {
          display: flex;
          width: max-content;
          animation: review-marquee-scroll 68s linear infinite;
        }
        .review-marquee-track:hover,
        .review-marquee-track:focus-within {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .review-marquee-track {
            animation: none;
            flex-wrap: wrap;
            width: 100%;
          }
        }
      `}</style>

      <div className="mx-auto mb-3 flex max-w-7xl items-center justify-between px-6">
        <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] ${dark ? "text-gold" : "text-gold-ink"}`}>
          <Sparkles size={12} />
          {es
            ? "Haga clic en cualquier tarjeta para abrir la reseña completa verificada"
            : "Interactive Feed · Click any review card to open full verified story"}
        </span>
      </div>

      <div className="review-marquee-track gap-4 px-6">
        {trackItems.map((r, idx) => (
          <button
            key={`${r.name}-${idx}`}
            type="button"
            onClick={() => setSelectedReview(r)}
            className={`group flex w-[310px] shrink-0 flex-col justify-between border p-5 text-left transition-all duration-300 hover:-translate-y-1 sm:w-[350px] ${
              dark
                ? "border-gold/25 bg-[#081729]/95 text-white shadow-[0_12px_30px_rgba(0,0,0,0.35)] hover:border-gold hover:shadow-[0_18px_40px_rgba(176,141,87,0.2)]"
                : "border-bone bg-white text-navy shadow-[0_10px_28px_rgba(11,30,63,0.08)] hover:border-gold hover:shadow-[0_16px_36px_rgba(11,30,63,0.16)]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, s) => (
                    <Star key={s} size={13} className="fill-gold text-gold" />
                  ))}
                </div>
                {r.verified && (
                  <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.14em] text-gold">
                    <BadgeCheck size={12} />
                    {es ? "Verificada" : "Verified"}
                  </span>
                )}
              </div>

              <p className={`mt-3 line-clamp-3 font-sans text-xs leading-relaxed ${dark ? "text-white/80" : "text-navy/80"}`}>
                &ldquo;{r.cardText ?? r.text}&rdquo;
              </p>
            </div>

            <div className={`mt-4 flex items-center justify-between border-t pt-3 ${dark ? "border-white/10" : "border-bone"}`}>
              <div>
                <p className={`font-sans text-xs font-semibold ${dark ? "text-white" : "text-navy-deep"}`}>
                  {r.name}
                </p>
                <p className={`font-mono text-[9px] uppercase tracking-[0.14em] ${dark ? "text-white/60" : "text-navy/60"}`}>
                  {r.location ?? "South Florida"}
                  {r.date ? ` · ${formatReviewDateShort(r.date)}` : ""}
                </p>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-gold group-hover:underline">
                {es ? "Leer más →" : "Full Story →"}
              </span>
            </div>
          </button>
        ))}
      </div>

      <ReviewModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
        lang={lang}
      />
    </div>
  );
}
