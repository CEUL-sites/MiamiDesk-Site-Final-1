import { Helmet } from "react-helmet-async";
import { Star, ExternalLink } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { CONTACT, REVIEW_PROFILES } from "../constants";
import { RATING_VALUE, REVIEW_COUNT } from "../data/reviews";

// Fix 17 (funnel) — a single destination that routes past clients to Carlos's
// public review profiles. Linked from confirmation/thank-you flows and shared
// directly after a closing. Outbound links open the review surface in a new tab.

const DESTINATIONS = [
  {
    name: "Realtor.com®",
    href: REVIEW_PROFILES.realtor,
    label: "Verified agent profile",
    description:
      "Carlos's verified Realtor.com® profile, where his existing five-star reviews live. Realtor.com® reviews carry the most weight for buyers and sellers comparing agents.",
    cta: "Review on Realtor.com®",
  },
  {
    name: "Google",
    href: REVIEW_PROFILES.google,
    label: "Google Business Profile",
    description:
      "Leave a review on Google so future South Florida sellers and buyers can find it in local search. Opens Carlos's business listing on Google Maps.",
    cta: "Review on Google",
  },
];

export default function LeaveReviewPage() {
  return (
    <>
      <Helmet>
        <title>Leave a Review — Carlos Uzcategui, South Florida REALTOR® | HomesProfessional.com</title>
        <meta
          name="description"
          content="Worked with Carlos Uzcategui, FL SL705771? Share your experience on Realtor.com® or Google in under a minute. Your review helps other South Florida families."
        />
        <link rel="canonical" href="https://homesprofessional.com/leave-a-review" />
        <meta property="og:title" content="Leave a Review — Carlos Uzcategui, South Florida REALTOR®" />
        <meta
          property="og:description"
          content="Share your experience working with Carlos Uzcategui on Realtor.com® or Google."
        />
        <meta property="og:url" content="https://homesprofessional.com/leave-a-review" />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>

      <main className="min-h-screen bg-white-soft pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="bg-navy-deep px-6 pt-24 pb-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Thank You</p>
          <h1
            className="mx-auto mt-5 max-w-3xl font-serif text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
          >
            Leave Carlos a review
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-white/60">
            If Carlos helped you buy or sell in South Florida, a short review helps the next family
            choose with confidence. It takes about a minute — pick whichever is easiest for you.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2" aria-hidden="true">
            <span className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={15} className="fill-gold text-gold" />
              ))}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
              {RATING_VALUE} · {REVIEW_COUNT} verified reviews
            </span>
          </div>
        </section>

        {/* Destinations */}
        <section className="bg-white py-16">
          <div className="mx-auto grid max-w-4xl gap-6 px-6 md:grid-cols-2">
            {DESTINATIONS.map((d) => (
              <a
                key={d.name}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col border border-hairline bg-white p-8 transition-colors hover:border-gold"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold">{d.label}</p>
                <h2 className="mt-2 font-serif text-2xl text-navy-deep">{d.name}</h2>
                <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-ink-primary/70">
                  {d.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 self-start border border-gold/40 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gold transition-colors group-hover:bg-gold/10">
                  {d.cta}
                  <ExternalLink size={13} />
                </span>
              </a>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl px-6 text-center font-sans text-sm leading-relaxed text-ink-primary/60">
            Prefer to share privately first? Email{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-navy-deep underline hover:text-gold">
              {CONTACT.email}
            </a>{" "}
            or message Carlos on{" "}
            <a
              href={CONTACT.whatsappUS}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy-deep underline hover:text-gold"
            >
              WhatsApp
            </a>
            .
          </p>
        </section>

        {/* Compliance footer band */}
        <section className="bg-navy-deep py-12 text-center px-6">
          <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
            {CONTACT.name} · {CONTACT.shortLicense} · {CONTACT.brokerage} · Equal Housing Opportunity
          </p>
        </section>

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
