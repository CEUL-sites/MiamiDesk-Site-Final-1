import {
  REVIEWS,
  REALTOR_PROFILE_URL,
  RATING_VALUE,
} from "../data/reviews";
import { ReviewSpotlight } from "./reviews/ReviewSpotlight";

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

export function Proof() {
  return (
    <section className="border-t border-gold/10 bg-navy-deep py-10 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between md:pb-10">
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
              Client Reviews
            </p>
            <h2 className="font-serif text-3xl text-white">What My Clients Say</h2>
            <div className="mt-3 flex items-center gap-2.5">
              <StarRow size={14} />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                {RATING_VALUE} average &middot; Verified Realtor.com{"\u00AE"} reviews
              </span>
            </div>
          </div>
          <a
            href={REALTOR_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 self-start border border-gold/40 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold/10 sm:self-auto"
          >
            Reviews verified on Realtor.com{"\u00AE"} &rarr;
          </a>
        </div>

        <ReviewSpotlight reviews={REVIEWS} />

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 md:mt-10">
          Individual results vary and are not a prediction of any sale outcome.
        </p>
      </div>
    </section>
  );
}
