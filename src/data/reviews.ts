// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for every client review on the site.
//
// Both the *display* (homepage marquee, /reviews page) and the *schema*
// (AggregateRating + Review JSON-LD on the agent entity and city pages) derive
// from this file. Do NOT hard-code review text, counts, or rating values
// anywhere else — `REVIEW_COUNT` and `AGGREGATE_RATING` below are the canonical
// figures, so the structured-data count always matches what is actually shown.
//
// Compliance:
//  • Reviews are verbatim third-party client statements (Realtor.com® Verified
//    Reviews + signed client testimonials) — not first-party marketing copy.
//  • `verified: true` marks the Realtor.com® five-star reviews that carry
//    category ratings; only these feed AggregateRating/`REVIEW_COUNT`.
//  • The "10 days / 12% over asking" line survives only as one verbatim review
//    entry (Andres P.) — it must never be reused as a headline, hero, or stat.
//  • Source: Carlos's verified Realtor.com® agent profile.
// ─────────────────────────────────────────────────────────────────────────────

export const REALTOR_PROFILE_URL =
  "https://www.realtor.com/realestateagents/56b2bc997e54f7010020ea51";

export interface Review {
  /** Reviewer display name. */
  name: string;
  /** City/area shown under the name (omit for short undated testimonials). */
  location?: string;
  /** ISO `YYYY-MM-DD`. Present on Realtor.com® verified reviews only. */
  date?: string;
  /** Star rating (all current reviews are 5). */
  rating: number;
  /** True = Realtor.com® verified review with category ratings → counts toward AggregateRating. */
  verified: boolean;
  /** Primary language of the review body. */
  language: "en" | "es";
  /** Realtor.com® category breakdown (verified reviews only). */
  categories?: Record<string, number>;
  /** Full review body — used on /reviews and as the schema `reviewBody`. */
  text: string;
  /** Condensed body for the homepage marquee card (falls back to `text`). */
  cardText?: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Maria Isabel Onate",
    location: "Weston, FL",
    date: "2024-01-21",
    rating: 5,
    verified: true,
    language: "en",
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "I recently had the pleasure of working with Carlos Uzcategui and I can't speak highly enough of the exceptional service I received. From the moment we started working together, Carlos demonstrated a deep understanding of the local housing market and was able to provide me with invaluable insights that helped me make informed decisions. His professionalism, attention to detail, and superb communication skills made the entire process smooth and stress-free. Carlos went above and beyond to ensure that my needs and preferences were met. I was continually impressed by his knowledge, negotiation skills, and dedication to achieving the best possible outcome.",
    cardText: "Carlos demonstrated a deep understanding of the local housing market and provided invaluable insights that helped me make informed decisions. His professionalism, attention to detail, and superb communication skills made the entire process smooth and stress-free.",
  },
  {
    name: "Diego Tolotto",
    location: "Weston, FL",
    date: "2023-12-18",
    rating: 5,
    verified: true,
    language: "en",
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "Carlos was exceptional in selling our home swiftly at a great price and securing a beneficial 7-month post-occupancy that eased our family's relocation, at a low rental per month. His professionalism and skillful negotiation made the entire process seamless. We're grateful for the smooth transition he facilitated for our family.",
    cardText: "Carlos was exceptional in selling our home swiftly at a great price and securing a beneficial 7-month post-occupancy that eased our family's relocation. His professionalism and skillful negotiation made the entire process seamless.",
  },
  {
    name: "Hind",
    location: "Weston, FL",
    date: "2021-12-06",
    rating: 5,
    verified: true,
    language: "en",
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "Despite the low inventory and the very competitive market Carlos got us our dream home. He understood my personality and my needs and was very patient. He is very professional what made the experience very smooth and very pleasant. He is a fantastic agent and more importantly an awesome human being!",
    cardText: "Despite the low inventory and the very competitive market, Carlos got us our dream home. He understood my personality and my needs and was very patient. He is a fantastic agent and more importantly an awesome human being.",
  },
  {
    name: "Raimundo Vazquez",
    location: "Doral, FL",
    date: "2022-11-09",
    rating: 5,
    verified: true,
    language: "en",
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "Amazing negotiating skills and professional work on time with a 1031 exchange that was wonderfully done, sold a retail property (KFC tenant) Bought both this house and another in Miami. I definitely recommend Carlos as your go to realtor for any real estate needs.",
    cardText: "Amazing negotiating skills and professional work on a 1031 exchange — sold a retail property and bought two properties in Miami. I definitely recommend Carlos as your go-to realtor for any real estate needs.",
  },
  {
    name: "Railiss LLC",
    location: "Miami, FL",
    date: "2022-11-09",
    rating: 5,
    verified: true,
    language: "en",
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "Thank you for your professional skills in negotiating the sale of our property and purchase also through a 1031 exchange of our next investment. I recommend Carlos for sure. Thank you.",
    cardText: "Thank you for your professional skills in negotiating the sale of our property and purchase through a 1031 exchange of our next investment. I recommend Carlos for sure. Thank you.",
  },
  {
    name: "Marisela",
    location: "Weston, FL",
    date: "2020-10-26",
    rating: 5,
    verified: true,
    language: "en",
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "Carlos is an excellent realtor, with high professionalism, always there for you in the process from the beginning through the end. Carlos is my realtor and my family realtor and we recommend him without any doubt.",
  },
  {
    name: "A. Martinez",
    location: "Sunrise, FL",
    date: "2020-10-16",
    rating: 5,
    verified: true,
    language: "en",
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "Carlos maintained the same level of professionalism and dedication through the whole experience. From the moment he listed the property until we closed the transaction he made himself available at all times.",
  },
  {
    name: "Gustavo Riveira",
    location: "Weston, FL",
    date: "2020-10-16",
    rating: 5,
    verified: true,
    language: "en",
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "Carlos made our negotiation fluid and quick. He is a excellent professional; always was there until the end of the process. We left completely satisfied with his job.",
    cardText: "Carlos made our negotiation fluid and quick. He is an excellent professional — always was there until the end of the process. We left completely satisfied with his job.",
  },
  {
    name: "Juan J.",
    location: "Boca Raton, FL",
    date: "2020-10-15",
    rating: 5,
    verified: true,
    language: "en",
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "This was our first time buying a house and I have to say that I am extremely grateful to have met Carlos. He expertly guided us though the whole process and was there for us every step of the way. He was our advocate in every decision we had to make, and went above and beyond to guarantee that everything was the way we wanted it to be but also that we were making the right choices. Thank you Carlos for getting us our dream home!",
    cardText: "This was our first time buying a house and I am extremely grateful to have met Carlos. He expertly guided us through the whole process and was there for us every step of the way. He was our advocate in every decision we had to make. Thank you Carlos for getting us our dream home.",
  },
  {
    name: "Juan",
    location: "Pembroke Pines, FL",
    date: "2020-10-15",
    rating: 5,
    verified: true,
    language: "en",
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "I have been working with Carlos for more than 10 years and I am very happy with the results, I have buy and sell units with him and it's been a great investment working with him and following his recommendations, I recommend Carlos 100%.",
    cardText: "I have been working with Carlos for more than 10 years and I am very happy with the results. I have bought and sold units with him and it's been a great investment working with him and following his recommendations. I recommend Carlos 100%.",
  },
  {
    name: "Andres P.",
    location: "Weston, FL",
    date: "2020-10-15",
    rating: 5,
    verified: true,
    language: "en",
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "Our house went under contract 10 days after we put it on the market at 12% over asking price. We accepted and Carlos who was incredibly friendly and helpful walked us through every step of the closing process. It couldn't have been a more pleasant experience.",
    cardText: "Our house went under contract 10 days after we put it on the market at 12% over asking price. Carlos was incredibly friendly and helpful and walked us through every step of the closing process. It couldn't have been a more pleasant experience.",
  },
  // ── Signed client testimonials (no Realtor.com® category ratings) ──────────
  {
    name: "Isabel Caicedo",
    location: "South Florida",
    rating: 5,
    verified: false,
    language: "en",
    text: "Carlos is an outstanding realtor agent and human being. He was very knowledgeable and professional. He showed us different options that fitted our budget and was very patient. With him we were able to find our dream home. I extremely recommend him.",
  },
  {
    name: "Rafael Caraballo",
    location: "South Florida",
    rating: 5,
    verified: false,
    language: "en",
    text: "Carlos is a professional Realtor — he has all the knowledge and experience and always kept me informed of every action during the selling process. I am extremely satisfied with Carlos, so I highly recommend him.",
  },
  {
    name: "Marzia Piazza",
    location: "South Florida",
    rating: 5,
    verified: false,
    language: "es",
    text: "Excelente persona, tiene muy buenos lugares para mostrar. Es muy cumplido y ayuda en la búsqueda adecuada que la persona necesita. Te atiende con agrado siempre que lo necesitas aún después de la venta. Lo recomiendo ampliamente.",
  },
  {
    name: "Crisanto Bello",
    location: "South Florida",
    rating: 5,
    verified: false,
    language: "es",
    text: "Te escribo para agradecerte el habernos conseguido el apartamento. Estamos muy contentos. Y la vista es espectacular. Sabemos que nos conseguiste buen precio — ya que se estaban vendiendo muy por encima de lo que compramos. Todo gracias a tu gestión.",
  },
  {
    name: "Julio Bango Jimenez",
    location: "South Florida",
    rating: 5,
    verified: false,
    language: "es",
    text: "Gracias Carlos por un trabajo tan profesional por tantos años y en varias transacciones exitosas.",
  },
];

/** Realtor.com® verified reviews — the set that backs AggregateRating. */
export const VERIFIED_REVIEWS: Review[] = REVIEWS.filter((r) => r.verified);

/** Signed client testimonials without category ratings. */
export const CLIENT_TESTIMONIALS: Review[] = REVIEWS.filter((r) => !r.verified);

/** Canonical count for structured data — matches the verified reviews shown. */
export const REVIEW_COUNT = VERIFIED_REVIEWS.length;

/** Average rating, derived from the verified reviews (one decimal). */
export const RATING_VALUE = (
  VERIFIED_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / (REVIEW_COUNT || 1)
).toFixed(1);

/** Ready-to-embed schema.org AggregateRating, derived from the data above. */
export const AGGREGATE_RATING = {
  "@type": "AggregateRating",
  ratingValue: RATING_VALUE,
  reviewCount: String(REVIEW_COUNT),
  bestRating: "5",
  worstRating: "1",
} as const;

/** Build schema.org Review nodes from the verified reviews for JSON-LD. */
export function buildReviewSchema(reviews: Review[] = VERIFIED_REVIEWS) {
  return reviews.map((r) => {
    // Guard a malformed date — `new Date(bad).toISOString()` throws RangeError
    // and would blank the prerendered page.
    const parsed = r.date ? new Date(r.date) : null;
    const validDate = parsed && !Number.isNaN(parsed.getTime());
    return {
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      ...(validDate ? { datePublished: r.date } : {}),
      reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5", worstRating: "1" },
      reviewBody: r.text,
    };
  });
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "Jan 2024" — parses the ISO string by parts to avoid timezone drift. */
export function formatReviewDateShort(date?: string): string {
  if (!date) return "";
  const [y, m] = date.split("-").map(Number);
  if (!y || !m) return "";
  return `${MONTHS[m - 1].slice(0, 3)} ${y}`;
}

/** "January 21, 2024" — parses the ISO string by parts to avoid timezone drift. */
export function formatReviewDateLong(date?: string): string {
  if (!date) return "";
  const [y, m, d] = date.split("-").map(Number);
  if (!y || !m || !d) return "";
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
