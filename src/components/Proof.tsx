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
    <section id="client-reviews" className="scroll-mt-24 border-t border-gold/20 bg-[#06101D] py-12 md:py-20 relative overflow-hidden">
      {/* Soft ambient background glow */}
      <div className="pointer-events-none absolute right-0 top-0 h-[450px] w-[450px] rounded-full bg-gold/[0.03] blur-[100px]" aria-hidden="true" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-[350px] w-[350px] rounded-full bg-[#16449E]/[0.08] blur-[90px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 border-b border-gold/15 pb-8 sm:flex-row sm:items-end sm:justify-between md:pb-10">
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">
              Client Reviews &amp; Track Record
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight">What My Clients Say</h2>
            <div className="mt-3 flex items-center gap-2.5">
              <StarRow size={15} />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/80">
                {RATING_VALUE} / 5.0 Average &middot; Verified Realtor.com{"\u00AE"} Reviews
              </span>
            </div>
          </div>
          <a
            href={REALTOR_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-gold/45 bg-white/[0.03] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gold backdrop-blur-sm transition-all hover:bg-gold hover:text-navy-deep sm:self-auto"
          >
            Read all reviews on Realtor.com{"\u00AE"} &rarr;
          </a>
        </div>

        <aside className="mt-8 rounded-xl border border-gold/25 bg-white/[0.03] p-6 md:p-8" aria-label="Weston client-reported example">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-gold">Weston · Client-reported example</p>
          <h3 className="mt-3 font-serif text-2xl text-white">The sale and the next move, negotiated together.</h3>
          <dl className="mt-5 grid gap-5 font-sans text-sm leading-relaxed md:grid-cols-3">
            <div><dt className="font-semibold text-white">Seller priority</dt><dd className="mt-2 text-white/75">Coordinate the home sale with the family's relocation.</dd></div>
            <div><dt className="font-semibold text-white">Carlos's action</dt><dd className="mt-2 text-white/75">Negotiate post-closing occupancy alongside the sale terms.</dd></div>
            <div><dt className="font-semibold text-white">Reported result</dt><dd className="mt-2 text-white/75">The client describes a seven-month occupancy arrangement that eased the transition.</dd></div>
          </dl>
          <p className="mt-5 font-sans text-xs leading-relaxed text-white/70">Source: Diego Tolotto's verified client review, December 18, 2023. This is a review-based example; no sale price or contract documentation is presented.</p>
          <a href={REALTOR_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center font-sans text-sm text-gold underline">Read the client reviews →</a>
        </aside>
        <ReviewSpotlight reviews={REVIEWS} />

        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 md:mt-12 text-center sm:text-left">
          Individual results vary and are not a prediction of any sale outcome.
        </p>
      </div>
    </section>
  );
}
