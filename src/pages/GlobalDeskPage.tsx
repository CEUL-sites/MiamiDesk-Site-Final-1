import { motion } from "motion/react";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Globe2,
  Handshake,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import { GlobalDeskListingForm } from "../components/forms/GlobalDeskListingForm";
import { LazyVideo } from "../components/LazyVideo";
import { MobileStickyCTA } from "../components/MobileStickyCTA";
import { Navbar } from "../components/Navbar";
import { JsonLd } from "../components/SEO/JsonLd";
import {
  GLOBAL_DESK_CONTENT,
  GLOBAL_DESK_STATS,
  type GlobalDeskLang,
} from "./globalDeskContent";

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};

const pathIcons = [Building2, Globe2] as const;
const levelIcons = [Globe2, ClipboardCheck, CircleDollarSign] as const;

function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  light?: boolean;
}) {
  return (
    <motion.header
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fade}
      className="max-w-4xl"
    >
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-ink">
        {eyebrow}
      </p>
      <h2
        className={`mt-5 max-w-4xl font-serif text-3xl leading-[1.08] sm:text-4xl md:text-5xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={`mt-6 max-w-3xl font-sans text-base leading-[1.8] sm:text-lg ${
            light ? "text-white/70" : "text-navy/70"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </motion.header>
  );
}

function CheckList({ items, light = false }: { items: readonly string[]; light?: boolean }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Check size={16} className="mt-1 shrink-0 text-gold-ink" aria-hidden="true" />
          <span className={`font-sans text-sm leading-relaxed sm:text-base ${light ? "text-white/80" : "text-navy/75"}`}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function GlobalDeskPage() {
  const { pathname } = useLocation();
  const lang: GlobalDeskLang = pathname.startsWith("/es/") ? "es" : "en";
  const t = GLOBAL_DESK_CONTENT[lang];
  const canonical =
    lang === "es"
      ? "https://homesprofessional.com/es/global-desk"
      : "https://homesprofessional.com/global-desk";

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <meta
          name="keywords"
          content={
            lang === "es"
              ? "activación inmobiliaria internacional, cooperación inmobiliaria sur de Florida, promotoras España Miami, agentes compradores Florida"
              : "international property activation, South Florida buyer agent cooperation, developer mandate Miami, international listing cooperation"
          }
        />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="x-default" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="en" href="https://homesprofessional.com/global-desk" />
        <link rel="alternate" hrefLang="es" href="https://homesprofessional.com/es/global-desk" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={t.meta.title} />
        <meta property="og:description" content={t.meta.description} />
        <meta property="og:image" content="https://homesprofessional.com/images/og-default.png" />
        <meta property="og:locale" content={lang === "es" ? "es_ES" : "en_US"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.meta.title} />
        <meta name="twitter:description" content={t.meta.description} />
        <meta name="twitter:image" content="https://homesprofessional.com/images/og-default.png" />
      </Helmet>

      <JsonLd
        id="global-desk-breadcrumb"
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: lang === "es" ? "Inicio" : "Home",
              item: lang === "es" ? "https://homesprofessional.com/es" : "https://homesprofessional.com",
            },
            { "@type": "ListItem", position: 2, name: "Global Desk", item: canonical },
          ],
        }}
      />

      <main id="main-content" className="min-h-screen bg-ivory text-navy">
        <Navbar />

        <section className="relative isolate min-h-[760px] overflow-hidden bg-[#06111f] px-6 pb-20 pt-28 text-white sm:px-10 md:pb-28 md:pt-36">
          <LazyVideo
            eager
            src="/videos/miami_realtor_association.mp4"
            poster="/images/posters/miami_realtor_association.jpg"
            className="pointer-events-none absolute inset-y-0 right-0 -z-20 h-full w-full object-cover object-center opacity-55 md:w-[62%]"
          />
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,#06111f_0%,#06111f_43%,rgba(6,17,31,0.76)_67%,rgba(6,17,31,0.44)_100%)]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[#06111f] to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-7xl"
          >
            <div className="max-w-3xl">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                {t.eyebrow}
              </p>
              <h1 className="mt-6 font-serif text-[clamp(2.75rem,6.4vw,6.3rem)] leading-[0.98] tracking-[-0.025em] text-white">
                {t.heroTitle}
              </h1>
              <p className="mt-7 max-w-2xl font-sans text-base leading-[1.75] text-white/82 sm:text-lg">
                {t.heroBody}
              </p>
              <p className="mt-4 max-w-2xl border-l border-gold/60 pl-5 font-sans text-sm leading-[1.75] text-white/68 sm:text-base">
                {t.heroLicensed}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#listing-request"
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-gold px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-navy-deep transition-colors hover:bg-white"
                >
                  {t.heroPrimary}
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
                <a
                  href="#relationships"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-gold/65 px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-navy-deep"
                >
                  {t.heroSecondary}
                  <ChevronRight size={15} aria-hidden="true" />
                </a>
              </div>
              <p className="mt-7 font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-white/55">
                {t.heroTrust}
              </p>
            </div>
          </motion.div>
        </section>

        <section id="audience" className="scroll-mt-20 bg-ivory px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow={t.audience.eyebrow} title={t.audience.title} intro={t.audience.intro} />
            <div className="mt-12 grid border-y border-navy/15 md:grid-cols-2">
              {t.audience.paths.map((path, index) => {
                const Icon = pathIcons[index];
                return (
                  <article
                    key={path.title}
                    className="group px-0 py-9 first:border-b first:border-navy/15 md:px-10 md:first:border-b-0 md:first:border-r md:first:border-navy/15 md:first:pl-0"
                  >
                    <Icon size={26} strokeWidth={1.4} className="text-gold-ink" aria-hidden="true" />
                    <h3 className="mt-6 font-serif text-2xl text-navy md:text-3xl">{path.title}</h3>
                    <p className="mt-4 max-w-xl font-sans text-base leading-[1.8] text-navy/70">{path.body}</p>
                    <a
                      href={index === 0 ? "#listing-request" : "#relationships"}
                      className="mt-6 inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-gold-ink hover:text-navy"
                    >
                      {path.cta} <ArrowRight size={14} aria-hidden="true" />
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="difference" className="scroll-mt-20 overflow-hidden bg-navy-deep text-white">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.18fr_0.82fr]">
            <div className="px-6 py-20 md:px-12 md:py-28 lg:pl-16">
              <SectionHeading
                eyebrow={t.difference.eyebrow}
                title={t.difference.title}
                intro={t.difference.intro}
                light
              />
              <div className="mt-12 grid gap-8 sm:grid-cols-[1fr_auto_1fr] sm:items-start">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
                    {t.difference.passive.title}
                  </p>
                  <CheckList items={t.difference.passive.items} light />
                </div>
                <ArrowRight size={24} className="mt-10 hidden text-gold sm:block" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                    {t.difference.active.title}
                  </p>
                  <CheckList items={t.difference.active.items} light />
                </div>
              </div>
            </div>
            <figure className="relative min-h-[340px] overflow-hidden border-t border-white/10 lg:min-h-full lg:border-l lg:border-t-0">
              <LazyVideo
                src="/videos/miami_madrid_transition.mp4"
                poster="/images/posters/miami_madrid_transition.jpg"
                rootMargin="180px"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />
            </figure>
          </div>
        </section>

        <section id="mandate" className="scroll-mt-20 bg-white px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow={t.mandate.eyebrow} title={t.mandate.title} intro={t.mandate.intro} />
            <div className="mt-14 grid border-y border-navy/15 md:grid-cols-[1fr_auto_1fr]">
              <div className="py-10 md:pr-12">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-navy/55">
                  {t.mandate.retainsTitle}
                </p>
                <CheckList items={t.mandate.retains} />
              </div>
              <div className="hidden w-px bg-navy/15 md:block" />
              <div className="border-t border-navy/15 py-10 md:border-t-0 md:pl-12">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-gold-ink">
                  {t.mandate.addsTitle}
                </p>
                <CheckList items={t.mandate.adds} />
              </div>
            </div>
          </div>
        </section>

        <section id="proof" className="scroll-mt-20 bg-[#07172a] px-6 py-20 text-white md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.4fr] lg:items-end">
              <SectionHeading eyebrow={t.proof.eyebrow} title={t.proof.title} intro={t.proof.body} light />
              <div className="grid border-y border-gold/25 sm:grid-cols-3">
                {GLOBAL_DESK_STATS.map((stat) => (
                  <article
                    key={stat.value}
                    className="border-b border-gold/20 py-8 last:border-b-0 sm:border-b-0 sm:border-r sm:px-7 sm:last:border-r-0"
                  >
                    <p className="font-serif text-5xl text-gold">{stat.value}</p>
                    <p className="mt-3 font-sans text-sm leading-relaxed text-white/82">{stat[lang]}</p>
                    <p className="mt-5 font-mono text-[8px] uppercase leading-relaxed tracking-[0.13em] text-white/45">
                      {stat.source}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="buyer-introduction" className="scroll-mt-20 bg-navy-deep px-6 py-20 text-white md:py-28">
          <div className="mx-auto max-w-6xl text-center">
            <SectionHeading
              eyebrow={t.buyerIntroduction.eyebrow}
              title={t.buyerIntroduction.title}
              intro={t.buyerIntroduction.body}
              light
            />
            <p className="mx-auto mt-8 max-w-3xl border-y border-gold/30 py-6 font-serif text-xl leading-relaxed text-gold sm:text-2xl">
              {t.buyerIntroduction.core}
            </p>
            <div className="mt-14 grid gap-8 text-left md:grid-cols-3">
              {t.buyerIntroduction.levels.map((level, index) => {
                const Icon = levelIcons[index];
                return (
                  <article key={level.title} className="relative border-t border-white/18 pt-7">
                    <div className="flex items-center justify-between">
                      <Icon size={24} strokeWidth={1.4} className="text-gold" aria-hidden="true" />
                      <span className="font-mono text-[10px] tracking-[0.2em] text-white/35">0{index + 1}</span>
                    </div>
                    <h3 className="mt-6 font-serif text-2xl leading-tight text-white">{level.title}</h3>
                    <p className="mt-4 font-sans text-sm leading-[1.75] text-white/68">{level.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="agent-protection" className="scroll-mt-20 bg-ivory px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow={t.agentProtection.eyebrow}
              title={t.agentProtection.title}
              intro={t.agentProtection.intro}
            />
            <div className="mt-12 grid border-y border-navy/15 md:grid-cols-2">
              {t.agentProtection.paths.map((path, index) => (
                <article
                  key={path.title}
                  className="py-9 first:border-b first:border-navy/15 md:px-10 md:first:border-b-0 md:first:border-r md:first:pl-0"
                >
                  {index === 0 ? (
                    <UserRoundCheck size={26} strokeWidth={1.4} className="text-gold-ink" aria-hidden="true" />
                  ) : (
                    <Handshake size={26} strokeWidth={1.4} className="text-gold-ink" aria-hidden="true" />
                  )}
                  <h3 className="mt-5 font-serif text-2xl text-navy">{path.title}</h3>
                  <p className="mt-4 font-sans text-base leading-[1.8] text-navy/70">{path.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-7 flex items-start gap-3 text-navy/65">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-gold-ink" aria-hidden="true" />
              <p className="font-sans text-sm leading-relaxed">{t.agentProtection.protection}</p>
            </div>
          </div>
        </section>

        <section id="activation" className="scroll-mt-20 bg-white px-6 py-20 md:py-28">
          <div className="mx-auto max-w-6xl">
            <SectionHeading eyebrow={t.activation.eyebrow} title={t.activation.title} />
            <ol className="mt-14 grid border-y border-navy/15 md:grid-cols-4">
              {t.activation.steps.map(([title, body], index) => (
                <li
                  key={title}
                  className="border-b border-navy/12 py-8 last:border-b-0 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0"
                >
                  <span className="font-serif text-4xl text-gold-ink">0{index + 1}</span>
                  <h3 className="mt-5 font-serif text-2xl text-navy">{title}</h3>
                  <p className="mt-3 font-sans text-sm leading-[1.75] text-navy/68">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="relationships" className="scroll-mt-20 overflow-hidden bg-[#07172a] text-white">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-[0.72fr_1.28fr]">
            <figure className="relative min-h-[330px] overflow-hidden">
              <img
                src="/images/urg-weston-office.webp"
                alt={
                  lang === "es"
                    ? "Recepción de United Realty Group en Weston, Florida"
                    : "United Realty Group reception in Weston, Florida"
                }
                width="1400"
                height="900"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#07172a]/35" />
            </figure>
            <div className="px-6 py-20 md:px-14 md:py-28">
              <SectionHeading
                eyebrow={t.relationships.eyebrow}
                title={t.relationships.title}
                intro={t.relationships.body}
                light
              />
              <a
                href="#listing-request"
                className="mt-9 inline-flex min-h-12 items-center gap-2 bg-gold px-6 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-navy-deep transition-colors hover:bg-white"
              >
                {t.relationships.cta}
                <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section id="listing-request" className="scroll-mt-20 bg-ivory px-6 py-20 md:py-28">
          <div className="mx-auto max-w-5xl">
            <SectionHeading eyebrow={t.eyebrow} title={t.finalTitle} intro={t.finalBody} />
            <div className="mt-12 border-t border-navy/15 pt-10">
              <GlobalDeskListingForm lang={lang} />
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 bg-white px-6 py-20 md:py-28">
          <div className="mx-auto max-w-4xl">
            <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
            <div className="mt-10 divide-y divide-navy/12 border-y border-navy/12">
              {t.faq.items.map(([question, answer]) => (
                <details key={question} className="group py-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-serif text-xl text-navy">
                    {question}
                    <ChevronRight
                      size={17}
                      className="shrink-0 text-gold-ink transition-transform group-open:rotate-90"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="mt-4 max-w-3xl font-sans text-base leading-[1.8] text-navy/70">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <JsonLd
          id="global-desk-faq"
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: t.faq.items.map(([question, answer]) => ({
              "@type": "Question",
              name: question,
              acceptedAnswer: { "@type": "Answer", text: answer },
            })),
          }}
        />

        <Footer />
        <MobileStickyCTA />
      </main>
    </>
  );
}
