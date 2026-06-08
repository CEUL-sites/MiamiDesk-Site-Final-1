import { Helmet } from "react-helmet-async";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { Testimonials } from "../components/Testimonials";

const VERIFIED_REVIEWS = [
  {
    name: "Maria Isabel Onate",
    location: "Weston, FL",
    date: "January 21, 2024",
    rating: 5,
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "I recently had the pleasure of working with Carlos Uzcategui and I can't speak highly enough of the exceptional service I received. From the moment we started working together, Carlos demonstrated a deep understanding of the local housing market and was able to provide me with invaluable insights that helped me make informed decisions. His professionalism, attention to detail, and superb communication skills made the entire process smooth and stress-free. Carlos went above and beyond to ensure that my needs and preferences were met. I was continually impressed by his knowledge, negotiation skills, and dedication to achieving the best possible outcome.",
  },
  {
    name: "Diego Tolotto",
    location: "Weston, FL",
    date: "December 18, 2023",
    rating: 5,
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "Carlos was exceptional in selling our home swiftly at a great price and securing a beneficial 7-month post-occupancy that eased our family's relocation, at a low rental per month. His professionalism and skillful negotiation made the entire process seamless. We're grateful for the smooth transition he facilitated for our family.",
  },
  {
    name: "Hind",
    location: "Weston, FL",
    date: "December 6, 2021",
    rating: 5,
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "Despite the low inventory and the very competitive market Carlos got us our dream home. He understood my personality and my needs and was very patient. He is very professional what made the experience very smooth and very pleasant. He is a fantastic agent and more importantly an awesome human being!",
  },
  {
    name: "Raimundo Vazquez",
    location: "Doral, FL",
    date: "November 9, 2022",
    rating: 5,
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "Amazing negotiating skills and professional work on time with a 1031 exchange that was wonderfully done, sold a retail property (KFC tenant) Bought both this house and another in Miami. I definitely recommend Carlos as your go to realtor for any real estate needs.",
  },
  {
    name: "Railiss LLC",
    location: "Miami, FL",
    date: "November 9, 2022",
    rating: 5,
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "Thank you for your amazing professional skills in negotiating the sale of our property and purchase also through a 1031 exchange of our next investment. I recommend Carlos for sure, maybe the best Realtor in Miami. Thank you!!!",
  },
  {
    name: "Marisela",
    location: "Weston, FL",
    date: "October 26, 2020",
    rating: 5,
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "Carlos is an excellent realtor, with high professionalism, always there for you in the process from the beginning through the end. Carlos is my realtor and my family realtor and we recommend him without any doubt.",
  },
  {
    name: "A. Martinez",
    location: "Sunrise, FL",
    date: "October 16, 2020",
    rating: 5,
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "Carlos maintained the same level of professionalism and dedication through the whole experience. From the moment he listed the property until we closed the transaction he made himself available at all times.",
  },
  {
    name: "Gustavo Riveira",
    location: "Weston, FL",
    date: "October 16, 2020",
    rating: 5,
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "Carlos made our negotiation fluid and quick. He is a excellent professional; always was there until the end of the process. We left completely satisfied with his job.",
  },
  {
    name: "Juan J.",
    location: "Boca Raton, FL",
    date: "October 15, 2020",
    rating: 5,
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "This was our first time buying a house and I have to say that I am extremely grateful to have met Carlos. He expertly guided us though the whole process and was there for us every step of the way. He was our advocate in every decision we had to make, and went above and beyond to guarantee that everything was the way we wanted it to be but also that we were making the right choices. Thank you Carlos for getting us our dream home!",
  },
  {
    name: "Juan",
    location: "Pembroke Pines, FL",
    date: "October 15, 2020",
    rating: 5,
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "I have been working with Carlos for more than 10 years and I am very happy with the results, I have buy and sell units with him and it's been a great investment working with him and following his recommendations, I recommend Carlos 100%.",
  },
  {
    name: "Andres P.",
    location: "Weston, FL",
    date: "October 15, 2020",
    rating: 5,
    categories: { Responsiveness: 5, "Market expertise": 5, "Negotiation skills": 5, "Professionalism & communication": 5 },
    text: "Our house went under contract 10 days after we put it on the market at 12% over asking price. We accepted and Carlos who was incredibly friendly and helpful walked us through every step of the closing process. It couldn't have been a more pleasant experience.",
  },
];

const TESTIMONIALS = [
  {
    name: "Isabel Caicedo",
    text: "Carlos is an outstanding realtor agent and human being. He was very knowledgable and professional. He showed us different options that fitted our budget and was very patient. With him we were able to find our dream home. I extremely recommend him.",
  },
  {
    name: "Rafael Caraballo",
    text: "Carlos is a professional Realtor, he has all the knowledge/experience and always kept me informed of every action during the selling process. I am extremely satisfied with Carlos, so I highly recommend him!!!",
  },
  {
    name: "Marzia Piazza",
    text: "Excelente persona, tiene muy buenos lugares para mostrar. Es muy cumplido y ayuda en la búsqueda adecuada que la persona necesita. Te atiende con agrado siempre que lo necesitas aún después de la venta. Lo recomiendo ampliamente.",
  },
  {
    name: "Crisanto Bello",
    text: "Te escribo para agradecerte el habernos conseguido el apartamento. Estamos muy contentos. Y la vista es espectacular. Sabemos que nos conseguiste buen precio — ya que se estaban vendiendo muy por encima de lo que compramos. Todo gracias a tu gestión.",
  },
  {
    name: "Julio Bango Jimenez",
    text: "Gracias Carlos por un trabajo tan profesional por tantos años y en varias transacciones exitosas.",
  },
];

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
  return (
    <>
      <Helmet>
        <title>Client Reviews — Carlos Uzcategui, South Florida REALTOR® | HomesProfessional.com</title>
        <meta name="description" content="Verified client reviews for Carlos Uzcategui, FL SL705771 — South Florida REALTOR®, United Realty Group. What Miami, Weston & Coral Gables clients say." />
        <meta name="keywords" content="Carlos Uzcategui reviews, South Florida realtor reviews, Miami real estate agent reviews, Weston realtor reviews, United Realty Group agent reviews" />
        <link rel="canonical" href="https://homesprofessional.com/reviews" />
        <meta property="og:title" content="Client Reviews — Carlos Uzcategui, South Florida REALTOR®" />
        <meta property="og:description" content="Verified client reviews for Carlos Uzcategui, FL SL705771. 15 five-star reviews from sellers and buyers across South Florida." />
        <meta property="og:url" content="https://homesprofessional.com/reviews" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "@id": "https://homesprofessional.com/#agent",
          "name": "Carlos Uzcategui",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "15",
            "bestRating": "5",
            "worstRating": "1"
          }
        })}</script>
      </Helmet>

      <main className="min-h-screen bg-white-soft pb-20 lg:pb-0">
        <Navbar />

        {/* Hero */}
        <section className="bg-navy-deep px-6 pt-24 pb-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Verified Reviews · Realtor.com®</p>
          <h1 className="mx-auto mt-5 max-w-3xl font-serif text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
            What Clients Say
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-sans text-base leading-relaxed text-white/55">
            15 five-star reviews from sellers and buyers across South Florida — sourced from Realtor.com® Verified Reviews.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Stars />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">5.0 · 15 Reviews</span>
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
                      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-navy/40 mt-0.5">{r.location} · {r.date}</p>
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
                    {Object.entries(r.categories).map(([cat]) => (
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
          </div>
        </section>

        {/* Client testimonials */}
        <section className="bg-ivory py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold mb-10">Client Testimonials</p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {TESTIMONIALS.map((t) => (
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
              Contact Carlos
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
