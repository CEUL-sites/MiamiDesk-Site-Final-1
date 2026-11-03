import { useEffect, useRef } from "react";
import { BadgeCheck, ExternalLink, Star, X } from "lucide-react";
import { type Review, REALTOR_PROFILE_URL, formatReviewDateLong } from "../../data/reviews";
import { CONTACT } from "../../constants";

export function ReviewModal({
  review,
  onClose,
  lang = "en",
}: {
  review: Review | null;
  onClose: () => void;
  lang?: "en" | "es";
}) {
  const es = lang === "es";
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!review) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [review, onClose]);

  if (!review) return null;

  const categories = Object.entries(review.categories ?? {});

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-navy-deep/85 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={es ? `Reseña de ${review.name}` : `Review by ${review.name}`}
      onClick={onClose}
    >
      <div
        className="relative my-8 w-full max-w-2xl border border-gold/40 bg-[#071526] p-6 text-white shadow-[0_30px_80px_rgba(0,0,0,0.65)] sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold/40 via-gold to-gold/40" />

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={es ? "Cerrar" : "Close"}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center border border-white/15 bg-navy/80 text-white/75 transition-colors hover:border-gold hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 pr-10">
          <div className="flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} size={16} className="fill-gold text-gold" />
            ))}
          </div>
          {review.verified && (
            <span className="inline-flex items-center gap-1.5 border border-gold/35 bg-gold/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-gold">
              <BadgeCheck size={13} />
              {es ? "Reseña Verificada en Realtor.com®" : "Realtor.com® Verified Review"}
            </span>
          )}
        </div>

        <h3 className="mt-4 font-serif text-2xl text-white sm:text-3xl">{review.name}</h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-gold/80">
          {review.location ?? "South Florida"}
          {review.date ? ` · ${formatReviewDateLong(review.date)}` : ""}
        </p>

        {/* Full Verbatim Quote */}
        <blockquote className="mt-6 border-l-2 border-gold/60 bg-white/[0.03] p-5 font-serif text-lg leading-relaxed text-white/95 sm:text-xl">
          &ldquo;{review.text}&rdquo;
        </blockquote>

        {/* Category Star Breakdown */}
        {categories.length > 0 && (
          <div className="mt-6">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
              {es ? "Calificación por Categoría (Realtor.com®)" : "Verified Category Breakdown (Realtor.com®)"}
            </p>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {categories.map(([cat, score]) => (
                <div
                  key={cat}
                  className="flex items-center justify-between border border-white/10 bg-navy/60 px-3.5 py-2.5"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/80">
                    {cat}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-xs font-semibold text-gold">
                    {score}.0 <Star size={12} className="fill-gold text-gold" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
          <a
            href={REALTOR_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-gold underline decoration-gold/50 underline-offset-4 transition-colors hover:text-white"
          >
            {es ? "Verificar perfil en Realtor.com®" : "Verify on Realtor.com® Profile"}
            <ExternalLink size={13} />
          </a>

          <a
            href="/contact"
            onClick={onClose}
            className="inline-flex items-center justify-center bg-gold px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-colors hover:bg-gold-soft"
          >
            {es ? "Solicitar Consulta Privada" : "Request Private Strategy Review"}
          </a>
        </div>

        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-white/50">
          {CONTACT.licenseDisplay} · {CONTACT.brokerage} · Individual experiences do not guarantee future sale outcomes.
        </p>
      </div>
    </div>
  );
}
