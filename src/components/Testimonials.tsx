import type { FC } from "react";
import {
  REVIEWS,
  REALTOR_PROFILE_URL,
  RATING_VALUE,
  REVIEW_COUNT,
  formatReviewDateShort,
} from "../data/reviews";

function StarRow() {
  return (
    <div className="flex gap-0.5 mb-3">
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className="text-gold">
          <path d="M6 1l1.39 2.82L10.5 4.24l-2.25 2.19.53 3.1L6 8.02l-2.78 1.51.53-3.1L1.5 4.24l3.11-.42z"/>
        </svg>
      ))}
    </div>
  );
}

interface ReviewCardProps {
  name: string;
  location: string;
  date: string;
  verified: boolean;
  text: string;
}

const ReviewCard: FC<ReviewCardProps> = ({ name, location, date, verified, text }) => {
  return (
    <div className="mx-3 flex w-80 flex-shrink-0 flex-col rounded-none border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
      <StarRow />
      <p className="font-sans text-sm font-light leading-relaxed text-white/75 flex-1">
        "{text}"
      </p>
      <div className="mt-5 flex items-end justify-between gap-2 border-t border-white/10 pt-4">
        <div>
          <p className="font-sans text-xs font-semibold text-white">{name}</p>
          <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/40 mt-0.5">
            {location}{date ? ` · ${date}` : ""}
          </p>
        </div>
        {verified ? (
          <span className="flex-shrink-0 flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.12em] text-gold/70">
            <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/></svg>
            Verified
          </span>
        ) : (
          <span className="flex-shrink-0 font-mono text-[8px] uppercase tracking-[0.12em] text-white/30">
            Realtor.com
          </span>
        )}
      </div>
    </div>
  );
};

export function Testimonials() {
  return (
    <section className="bg-navy-deep pt-12 pb-16 overflow-hidden border-t border-gold/10">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold mb-3">
              Client Reviews
            </p>
            <h2 className="font-serif text-3xl text-white">
              What My Clients Say
            </h2>
            <div className="mt-3 flex items-center gap-2.5">
              <span className="flex gap-0.5" aria-hidden="true">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} width="14" height="14" viewBox="0 0 12 12" fill="currentColor" className="text-gold">
                    <path d="M6 1l1.39 2.82L10.5 4.24l-2.25 2.19.53 3.1L6 8.02l-2.78 1.51.53-3.1L1.5 4.24l3.11-.42z"/>
                  </svg>
                ))}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/55">
                {RATING_VALUE} average · {REVIEW_COUNT} verified Realtor.com® reviews
              </span>
            </div>
          </div>
          <a
            href={REALTOR_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-shrink-0 items-center gap-2 self-start border border-gold/40 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold/10 sm:self-auto"
          >
            Reviews verified on Realtor.com® →
          </a>
        </div>
      </div>

      {/* Single scrolling row — all reviews, sourced from src/data/reviews.ts */}
      <div className="marquee-container">
        <div className="marquee-track-slow flex" style={{ animationDuration: "120s" }}>
          {REVIEWS.map((r, i) => (
            <ReviewCard key={`r${i}`} name={r.name} location={r.location ?? ""} date={formatReviewDateShort(r.date)} verified={r.verified} text={r.cardText ?? r.text} />
          ))}
          <div aria-hidden="true" className="flex">
            {REVIEWS.map((r, i) => (
              <ReviewCard key={`c${i}`} name={r.name} location={r.location ?? ""} date={formatReviewDateShort(r.date)} verified={r.verified} text={r.cardText ?? r.text} />
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 mt-10">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
          Reviews sourced from Carlos's{" "}
          <a href={REALTOR_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-white/40 underline hover:text-gold">
            verified Realtor.com® profile
          </a>{" "}
          and client testimonials. Individual results vary and are not a prediction of any sale outcome.
        </p>
      </div>
    </section>
  );
}
