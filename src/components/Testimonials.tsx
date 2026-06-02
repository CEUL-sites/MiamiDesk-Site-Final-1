import type { FC } from "react";

const REVIEWS_ROW1 = [
  {
    name: "Maria Isabel Onate",
    location: "Weston, FL",
    date: "Jan 2024",
    verified: true,
    text: "Carlos demonstrated a deep understanding of the local housing market and provided invaluable insights that helped me make informed decisions. His professionalism, attention to detail, and superb communication skills made the entire process smooth and stress-free.",
  },
  {
    name: "Andres P.",
    location: "Weston, FL",
    date: "Oct 2020",
    verified: true,
    text: "Our house went under contract 10 days after we put it on the market at 12% over asking price. Carlos was incredibly friendly and helpful and walked us through every step of the closing process. It couldn't have been a more pleasant experience.",
  },
  {
    name: "Diego Tolotto",
    location: "Weston, FL",
    date: "Dec 2023",
    verified: true,
    text: "Carlos was exceptional in selling our home swiftly at a great price and securing a beneficial 7-month post-occupancy that eased our family's relocation. His professionalism and skillful negotiation made the entire process seamless.",
  },
  {
    name: "Hind",
    location: "Weston, FL",
    date: "Dec 2021",
    verified: true,
    text: "Despite the low inventory and the very competitive market, Carlos got us our dream home. He understood my personality and my needs and was very patient. He is a fantastic agent and more importantly an awesome human being!",
  },
  {
    name: "A. Martinez",
    location: "Sunrise, FL",
    date: "Oct 2020",
    verified: true,
    text: "Carlos maintained the same level of professionalism and dedication through the whole experience. From the moment he listed the property until we closed the transaction he made himself available at all times.",
  },
  {
    name: "Isabel Caicedo",
    location: "South Florida",
    date: "",
    verified: false,
    text: "Carlos is an outstanding realtor agent and human being. He was very knowledgeable and professional. He showed us different options that fitted our budget and was very patient. With him we were able to find our dream home. I extremely recommend him.",
  },
  {
    name: "Rafael Caraballo",
    location: "South Florida",
    date: "",
    verified: false,
    text: "Carlos is a professional Realtor — he has all the knowledge and experience and always kept me informed of every action during the selling process. I am extremely satisfied with Carlos, so I highly recommend him.",
  },
];

const REVIEWS_ROW2 = [
  {
    name: "Juan J.",
    location: "Boca Raton, FL",
    date: "Oct 2020",
    verified: true,
    text: "This was our first time buying a house and I am extremely grateful to have met Carlos. He expertly guided us through the whole process and was there for us every step of the way. He was our advocate in every decision we had to make. Thank you Carlos for getting us our dream home!",
  },
  {
    name: "Raimundo Vazquez",
    location: "Doral, FL",
    date: "Nov 2022",
    verified: true,
    text: "Amazing negotiating skills and professional work on a 1031 exchange — sold a retail property and bought two properties in Miami. I definitely recommend Carlos as your go-to realtor for any real estate needs.",
  },
  {
    name: "Railiss LLC",
    location: "Miami, FL",
    date: "Nov 2022",
    verified: true,
    text: "Thank you for your amazing professional skills in negotiating the sale of our property and purchase through a 1031 exchange of our next investment. I recommend Carlos for sure — maybe the best Realtor in Miami. Thank you!!!",
  },
  {
    name: "Gustavo Riveira",
    location: "Weston, FL",
    date: "Oct 2020",
    verified: true,
    text: "Carlos made our negotiation fluid and quick. He is an excellent professional — always was there until the end of the process. We left completely satisfied with his job.",
  },
  {
    name: "Marisela",
    location: "Weston, FL",
    date: "Oct 2020",
    verified: true,
    text: "Carlos is an excellent realtor, with high professionalism, always there for you in the process from the beginning through the end. Carlos is my realtor and my family realtor and we recommend him without any doubt.",
  },
  {
    name: "Juan",
    location: "Pembroke Pines, FL",
    date: "Oct 2020",
    verified: true,
    text: "I have been working with Carlos for more than 10 years and I am very happy with the results. I have bought and sold units with him and it's been a great investment working with him and following his recommendations. I recommend Carlos 100%.",
  },
  {
    name: "Crisanto Bello",
    location: "South Florida",
    date: "",
    verified: false,
    text: "Te escribo para agradecerte el habernos conseguido el apartamento. Estamos muy contentos. Y la vista es espectacular. Sabemos que nos conseguiste buen precio — ya que se estaban vendiendo muy por encima de lo que compramos. Todo gracias a tu gestión.",
  },
  {
    name: "Julio Bango Jimenez",
    location: "South Florida",
    date: "",
    verified: false,
    text: "Gracias Carlos por un trabajo tan profesional por tantos años y en varias transacciones exitosas.",
  },
];

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
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold mb-3">
              Client Reviews
            </p>
            <h2 className="font-serif text-3xl text-white">
              What Clients Say
            </h2>
          </div>
          <a
            href="https://www.realtor.com/realestateagents/carlos-uzcategui_plantation_fl_13543289_496481835"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40 hover:text-gold transition-colors flex-shrink-0"
          >
            View on Realtor.com® →
          </a>
        </div>
      </div>

      {/* Single scrolling row — all reviews */}
      <div className="marquee-container">
        <div className="marquee-track-slow flex" style={{ animationDuration: "120s" }}>
          {[...REVIEWS_ROW1, ...REVIEWS_ROW2, ...REVIEWS_ROW1, ...REVIEWS_ROW2].map((r, i) => (
            <ReviewCard key={i} name={r.name} location={r.location} date={r.date} verified={r.verified} text={r.text} />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 mt-10">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
          Reviews sourced from Realtor.com® Verified Reviews and client testimonials. Individual results vary.
        </p>
      </div>
    </section>
  );
}
