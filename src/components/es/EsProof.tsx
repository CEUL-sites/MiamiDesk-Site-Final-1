import {
  VERIFIED_REVIEWS,
  REALTOR_PROFILE_URL,
  RATING_VALUE,
  formatReviewDateShort,
} from "../../data/reviews";

// Spanish counterpart of components/Proof.tsx — same layout/classes, Spanish
// copy. Reviews are verbatim third-party client statements and must NOT be
// translated; we prefer Spanish-language verified reviews (language === "es")
// and fall back to English ones to fill out three cards, since verbatim
// reviews cannot be authored to order.

function StarRow({ size = 12 }: { size?: number }) {
  return (
    <span className="flex gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 12 12" fill="currentColor" className="text-gold">
          <path d="M6 1l1.39 2.82L10.5 4.24l-2.25 2.19.53 3.1L6 8.02l-2.78 1.51.53-3.1L1.5 4.24l3.11-.42z" />
        </svg>
      ))}
    </span>
  );
}

function pickReviews() {
  const spanish = VERIFIED_REVIEWS.filter((r) => r.language === "es");
  if (spanish.length >= 3) return spanish.slice(0, 3);
  const english = VERIFIED_REVIEWS.filter((r) => r.language !== "es");
  return [...spanish, ...english].slice(0, 3);
}

export function EsProof() {
  const reviews = pickReviews();

  return (
    <section className="bg-navy-deep py-10 border-t border-gold/10 md:py-16">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header — the ProofStrip rating strip, static */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between md:pb-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold mb-3">
              {/* TODO: native Madrid editor review */}
              Reseñas de Clientes
            </p>
            {/* TODO: native Madrid editor review */}
            <h2 className="font-serif text-3xl text-white">Lo Que Dicen Mis Clientes</h2>
            <div className="mt-3 flex items-center gap-2.5">
              <StarRow size={14} />
              {/* TODO: native Madrid editor review */}
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                {RATING_VALUE} de promedio · Reseñas verificadas en Realtor.com®
              </span>
            </div>
          </div>
          <a
            href={REALTOR_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-shrink-0 items-center gap-2 self-start border border-gold/40 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold/10 sm:self-auto"
          >
            {/* TODO: native Madrid editor review */}
            Reseñas verificadas en Realtor.com® →
          </a>
        </div>

        {/* 2-3 full testimonials — static grid, no rotation */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:mt-10 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="flex flex-col rounded-none border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <StarRow />
              <p className="mt-3 flex-1 font-sans text-sm font-light leading-relaxed text-white/75">
                "{r.text}"
              </p>
              <div className="mt-5 flex items-end justify-between gap-2 border-t border-white/10 pt-4">
                <div>
                  <p className="font-sans text-xs font-semibold text-white">{r.name}</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-white/70">
                    {r.location}{r.date ? ` · ${formatReviewDateShort(r.date)}` : ""}
                  </p>
                </div>
                <span className="flex flex-shrink-0 items-center gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-gold">
                  <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  {/* TODO: native Madrid editor review */}
                  Verificada
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
