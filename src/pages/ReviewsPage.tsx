import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { JsonLd } from "../components/SEO/JsonLd";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { RecentlyRepresented } from "../components/RecentlyRepresented";
import { Tilt3D } from "../components/Tilt3D";
import { ReviewMarquee } from "../components/reviews/ReviewMarquee";
import { ReviewModal } from "../components/reviews/ReviewModal";
import {
  VERIFIED_REVIEWS,
  CLIENT_TESTIMONIALS,
  REVIEW_COUNT,
  RATING_VALUE,
  AGGREGATE_RATING,
  buildReviewSchema,
  formatReviewDateLong,
  type Review,
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
  const [activeReview, setActiveReview] = useState<Review | null>(null);

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
        <title>Client Reviews — Carlos Uzcategui, South Florida REALTOR®</title>
        <meta name="description" content="Verified client reviews for Carlos Uzcategui, FL SL705771 — South Florida REALTOR®, United Realty Group. What Miami, Weston & Coral Gables clients say." />
        <link rel="canonical" href="https://homesprofessional.com/reviews" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta property="og:title" content="Client Reviews — Carlos Uzcategui, South Florida REALTOR®" />
        <meta property="og:description" content="Verified five-star client reviews for Carlos Uzcategui, FL SL705771 — sellers and buyers across South Florida." />
        <meta property="og:url" content="https://homesprofessional.com/reviews" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>
      <JsonLd id="reviews-review" data={reviewSchema} />
      <JsonLd
        id="reviews-breadcrumb"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://homesprofessional.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Client Reviews",
              item: "https://homesprofessional.com/reviews",
            },
          ],
        }}
      />

      <main id="main-content" className="min-h-screen overflow-x-hidden bg-white-soft pb-28 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="bg-navy-deep px-6 pt-24 pb-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Verified Reviews · Realtor.com®</p>
          <h1 className="mx-auto mt-5 max-w-3xl font-serif text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
            What Clients Say
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-white/65">
            {REVIEW_COUNT} five-star reviews from sellers and buyers across South Florida — sourced from Realtor.com® Verified Reviews. Click any review card to inspect the full verified record.
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
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/75 hover:text-gold transition-colors"
            >
              View on Realtor.com® →
            </a>
          </div>
        </section>

        {/* Interactive Auto-Scrolling Marquee Ribbon */}
        <ReviewMarquee tone="dark" />

        {/* Verified reviews grid (3D Tilt + Modal Popup on Click) */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-ink">Verified Reviews</p>
                <div className="flex items-center gap-1.5 border border-gold/30 bg-gold/5 px-3 py-1">
                  <BadgeCheck size={12} className="text-gold-ink shrink-0" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold-ink">Realtor.com® Verified</span>
                </div>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-navy/60">
                Click any card to open verified breakdown
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {VERIFIED_REVIEWS.map((r) => (
                <Tilt3D key={r.name} maxTilt={4} className="h-full">
                  <button
                    type="button"
                    onClick={() => setActiveReview(r)}
                    className="group flex h-full w-full flex-col justify-between border border-hairline bg-white p-8 text-left shadow-sm transition-all duration-300 hover:border-gold hover:shadow-[0_18px_45px_rgba(11,30,63,0.1)]"
                  >
                    <div>
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                          <p className="font-sans font-semibold text-navy-deep group-hover:text-gold-ink transition-colors">{r.name}</p>
                          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-navy/70">{r.location} · {formatReviewDateLong(r.date)}</p>
                        </div>
                        <div className="flex flex-shrink-0 items-center gap-1 border border-gold/25 bg-gold/5 px-2.5 py-1">
                          <BadgeCheck size={11} className="text-gold-ink" />
                          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold-ink">Verified</span>
                        </div>
                      </div>
                      <Stars />
                      <div className="mt-4 mb-5 grid grid-cols-2 gap-x-4 gap-y-1.5 border-y border-hairline py-3">
                        {Object.entries(r.categories ?? {}).map(([cat]) => (
                          <div key={cat} className="flex items-center gap-1.5">
                            <svg width="8" height="8" viewBox="0 0 12 12" fill="currentColor" className="flex-shrink-0 text-gold">
                              <path d="M6 1l1.39 2.82L10.5 4.24l-2.25 2.19.53 3.1L6 8.02l-2.78 1.51.53-3.1L1.5 4.24l3.11-.42z"/>
                            </svg>
                            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-navy/75">{cat}</span>
                          </div>
                        ))}
                      </div>
                      <p className="font-sans text-sm leading-relaxed text-ink-primary/75">{r.text}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-ink">
                        Inspect Full Verified Record
                      </span>
                      <ArrowUpRight size={14} className="text-gold-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </button>
                </Tilt3D>
              ))}
            </div>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-navy/70">
              Individual results vary and are not a prediction of any sale outcome.
            </p>
          </div>
        </section>

        {/* Recently represented — renders only when Carlos has populated the curated data file */}
        <RecentlyRepresented />

        {/* Client testimonials (3D Tilt + Modal Popup on Click) */}
        <section className="bg-ivory py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="mb-10 font-mono text-[10px] uppercase tracking-[0.28em] text-gold-ink">Client Testimonials</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {CLIENT_TESTIMONIALS.map((t) => (
                <Tilt3D key={t.name} maxTilt={4} className="h-full">
                  <button
                    type="button"
                    onClick={() => setActiveReview(t)}
                    className="group flex h-full w-full flex-col justify-between border border-hairline bg-white p-7 text-left transition-all duration-300 hover:border-gold hover:shadow-[0_14px_35px_rgba(11,30,63,0.08)]"
                  >
                    <div>
                      <Stars />
                      <p className="mt-4 font-sans text-sm italic leading-relaxed text-ink-primary/75">"{t.text}"</p>
                    </div>
                    <div className="mt-5 flex items-end justify-between border-t border-hairline pt-4">
                      <div>
                        <p className="font-sans text-xs font-semibold text-navy-deep">{t.name}</p>
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-navy/70">South Florida</p>
                      </div>
                      <ArrowUpRight size={13} className="text-gold-ink opacity-70 group-hover:opacity-100" />
                    </div>
                  </button>
                </Tilt3D>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy-deep px-6 py-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Ready to Work Together?</p>
          <h2 className="mt-4 font-serif text-3xl text-white">Request a private seller strategy review.</h2>
          <p className="mx-auto mt-4 max-w-lg font-sans text-sm leading-relaxed text-white/60">
            No listing commitment required. Our team reviews every inquiry.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="/home-value" className="bg-gold px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90">
              Free Home Valuation
            </a>
            <a href="/contact" className="border border-white/25 px-8 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:border-gold hover:text-gold">
              Request a Strategy Review
            </a>
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
            Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity
          </p>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>

      <ReviewModal review={activeReview} onClose={() => setActiveReview(null)} />
    </>
  );
}
