import { Helmet } from "react-helmet-async";
import { JsonLd } from "../components/SEO/JsonLd";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { Testimonials } from "../components/Testimonials";
import { RecentlyRepresented } from "../components/RecentlyRepresented";
import {
  VERIFIED_REVIEWS,
  CLIENT_TESTIMONIALS,
  REVIEW_COUNT,
  RATING_VALUE,
  AGGREGATE_RATING,
  buildReviewSchema,
  formatReviewDateLong,
} from "../data/reviews";

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 12 12" fill="currentColor" className="text-gold">
          <path d="M6 1l1.39 2.82L10.5 4.24l-2.25 2.19.53 3.1L6 8.02l-2.78 1.51.53-3.1L1.5 4.24l3.11-.42z"/>
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  // Emit the actual verified reviews (visible on this page) as Review nodes so
  // Google can show star rich-snippets — an AggregateRating alone is weak and
  // can be ignored without the underlying reviews present. Both the rating and
  // the review nodes derive from src/data/reviews.ts, so the count here always
  // matches the verified reviews rendered below and the sitewide #agent schema.
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": "https://homesprofessional.com/#agent",
    name: "Carlos Uzcategui",
    aggregateRating: AGGREGATE_RATING,
    review: buildReviewSchema(VERIFIED_REVIEWS),
  };
  return (
    <>
      <Helmet>
        <title>Client Reviews — Carlos Uzcategui, South Florida REALTOR® | HomesProfessional.com</title>
        <meta name="description" content="Verified client reviews for Carlos Uzcategui, FL SL705771 — South Florida REALTOR®, United Realty Group. What Miami, Weston & Coral Gables clients say." />
        <meta name="keywords" content="Carlos Uzcategui reviews, South Florida realtor reviews, Miami real estate agent reviews, Weston realtor reviews, United Realty Group agent reviews" />
        <link rel="canonical" href="https://homesprofessional.com/reviews" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta property="og:title" content="Client Reviews — Carlos Uzcategui, South Florida REALTOR®" />
        <meta property="og:description" content="Verified five-star client reviews for Carlos Uzcategui, FL SL705771 — sellers and buyers across South Florida." />
        <meta property="og:url" content="https://homesprofessional.com/reviews" />
      </Helmet>
      <JsonLd id="reviews-review" data={reviewSchema} />

      <main className="min-h-screen bg-white-soft pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="bg-navy-deep px-6 pt-24 pb-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Verified Reviews · Realtor.com®</p>
          <h1 className="mx-auto mt-5 max-w-3xl font-serif text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
            What Clients Say
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-white/55">
            {REVIEW_COUNT} five-star reviews from sellers and buyers across South Florida — sourced from Realtor.com® Verified Reviews.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Stars />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">{RATING_VALUE} · {REVIEW_COUNT} Reviews</span>
          </div>
          <div className="mt-4">
            <a
              href="https://www.realtor.com/realestateagents/56b2bc997e54f7010020ea51"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35 hover:text-gold transition-colors"
            >
              View on Realtor.com® →
            </a>
          </div>
        </section>

        {/* Verified reviews grid */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex items-center gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">Verified Reviews</p>
              <div className="flex items-center gap-1.5 border border-gold/30 bg-gold/5 px-3 py-1">
                <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor" className="text-gold flex-shrink-0">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/>
                </svg>
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-gold/80">Realtor.com® Verified</span>
              </div>
            </div>

            <div className="grid gap-px border border-hairline bg-hairline md:grid-cols-2">
              {VERIFIED_REVIEWS.map((r) => (
                <div key={r.name} className="bg-white p-8">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="font-sans font-semibold text-navy-deep">{r.name}</p>
                      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-navy/40 mt-0.5">{r.location} · {formatReviewDateLong(r.date)}</p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-1 border border-gold/20 bg-gold/5 px-2 py-0.5">
                      <svg width="9" height="9" viewBox="0 0 20 20" fill="currentColor" className="text-gold">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd"/>
                      </svg>
                      <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-gold/70">Verified</span>
                    </div>
                  </div>
                  <Stars />
                  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 mb-5">
                    {Object.entries(r.categories ?? {}).map(([cat]) => (
                      <div key={cat} className="flex items-center gap-1.5">
                        <svg width="8" height="8" viewBox="0 0 12 12" fill="currentColor" className="text-gold flex-shrink-0">
                          <path d="M6 1l1.39 2.82L10.5 4.24l-2.25 2.19.53 3.1L6 8.02l-2.78 1.51.53-3.1L1.5 4.24l3.11-.42z"/>
                        </svg>
                        <span className="font-mono text-[7.5px] uppercase tracking-[0.1em] text-navy/40">{cat}</span>
                      </div>
                    ))}
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-ink-primary/70">{r.text}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 font-mono text-[8px] uppercase tracking-[0.2em] text-navy/35">
              Individual results vary and are not a prediction of any sale outcome.
            </p>
          </div>
        </section>

        {/* Recently represented — renders only when Carlos has populated the curated data file */}
        <RecentlyRepresented />

        {/* Client testimonials */}
        <section className="bg-ivory py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold mb-10">Client Testimonials</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {CLIENT_TESTIMONIALS.map((t) => (
                <div key={t.name} className="border border-hairline bg-white p-7">
                  <Stars />
                  <p className="mt-4 font-sans text-sm leading-relaxed text-ink-primary/70 italic">"{t.text}"</p>
                  <p className="mt-5 font-sans text-xs font-semibold text-navy-deep">{t.name}</p>
                  <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-navy/35 mt-0.5">South Florida</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scrolling marquee */}
        <Testimonials />

        {/* CTA */}
        <section className="bg-navy-deep py-16 text-center px-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Ready to Work Together?</p>
          <h2 className="mt-4 font-serif text-3xl text-white">Request a private seller strategy review.</h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-sm leading-relaxed text-white/50">
            No listing commitment required. Carlos reviews every inquiry personally.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="/home-value" className="bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90">
              Free Home Valuation
            </a>
            <a href="/contact" className="border border-white/25 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:border-gold hover:text-gold">
              Request a Strategy Review
            </a>
          </div>
          <p className="mt-6 font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
            Carlos Uzcategui · FL SL705771 · United Realty Group · Equal Housing Opportunity
          </p>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
