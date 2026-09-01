import { motion, type Variants } from "motion/react";
import { HeroSellerForm } from "./HeroSellerForm";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const DISTRIBUTION_STATS = [
  { value: "93,000", label: "Member Agents" },
  { value: "200+", label: "Global Portals · 19 Languages" },
  { value: "260+", label: "U.S. MLSs via RPR" },
  { value: "437+", label: "International Agreements" },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
};

export function Hero() {
  return (
    <section className="hero-root relative overflow-hidden bg-[#060D18] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundSize: "180px",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto grid w-full max-w-[1440px] lg:h-[790px] lg:grid-cols-[minmax(640px,0.95fr)_minmax(0,1.05fr)]"
      >
        <div className="flex flex-col px-5 pb-8 pt-28 sm:px-8 sm:pt-32 lg:overflow-hidden lg:px-12 lg:pb-7 lg:pt-28 xl:pl-20 xl:pr-8">
          <div className="max-w-[650px]">
            <motion.h1
              variants={item}
              className="font-serif text-[clamp(2.65rem,11.2vw,4.5rem)] font-normal leading-[0.98] tracking-[-0.035em] text-white lg:text-[3.15rem] xl:text-[3.45rem]"
            >
              Sell With the Reach of the{" "}
              <em className="block pt-2 italic text-gold lg:inline lg:pt-0">
                World's Largest Local REALTOR® Association.
              </em>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-5 max-w-[580px] font-sans text-base leading-7 text-white/78 lg:leading-[1.65]"
            >
              Carlos pairs private pricing and positioning strategy with institutional distribution across South Florida and global buyer markets.
            </motion.p>
          </div>

          <motion.div
            variants={item}
            className="relative mt-7 overflow-hidden border-y border-gold/35 lg:hidden"
          >
            <img
              src="/images/homepage-hero-waterfront-v2.jpg"
              alt="Modern South Florida waterfront residence at sunset"
              width="1536"
              height="1024"
              fetchPriority="high"
              className="aspect-[16/10] w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#060D18] to-transparent"
            />
          </motion.div>

          <motion.div
            id="list-here"
            variants={item}
            className="mt-6 w-full max-w-[520px] scroll-mt-24 lg:mt-5"
          >
            <HeroSellerForm />
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="relative hidden h-[790px] overflow-hidden lg:block"
        >
          <img
            src="/images/homepage-hero-waterfront-v2.jpg"
            alt="Modern South Florida waterfront residence at sunset"
            width="1536"
            height="1024"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#060D18] via-[#060D18]/75 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#060D18]/75 to-transparent"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.72, duration: 0.6 }}
        className="relative z-20 border-y border-gold/35 bg-[#06101d]"
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 px-5 sm:px-8 lg:grid-cols-[repeat(4,minmax(0,1fr))_1.45fr] lg:px-12 xl:px-20">
          {DISTRIBUTION_STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`py-5 text-center lg:py-6 ${
                index % 2 === 0 ? "border-r border-white/12" : ""
              } ${index < 2 ? "border-b border-white/12 lg:border-b-0" : ""} ${
                index > 0 ? "lg:border-l lg:border-white/12" : ""
              }`}
            >
              <p className="font-serif text-[2rem] leading-none text-gold sm:text-[2.25rem]">{stat.value}</p>
              <p className="mt-2 px-2 font-sans text-[12px] leading-4 text-white/78 sm:text-[13px]">
                {stat.label}
              </p>
            </div>
          ))}

          <p className="col-span-2 border-t border-white/12 py-5 text-center font-sans text-[11px] leading-5 text-white/65 lg:col-span-1 lg:border-l lg:border-t-0 lg:pl-8 lg:text-left">
            Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity. Eligible exposure varies by property type, MLS rules, platform participation, and syndication partner availability.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
