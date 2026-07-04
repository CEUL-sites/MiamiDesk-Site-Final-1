import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Camera, Globe2, MessagesSquare, Radar } from "lucide-react";
import { LazyVideo } from "../LazyVideo";

// Spanish counterpart of components/Distribution.tsx — same TOP_STATS
// figures and PILLARS structure, same classes/animations, copy translated
// to Spanish. CTA points to /es/vender#contact (not the English page).

const TOP_STATS = [
  {
    value: 93000,
    display: "93,000",
    suffix: "",
    // TODO: native Madrid editor review
    label: "Agentes Miembros",
    sublabel: "Miami & South Florida REALTORS®",
    // TODO: native Madrid editor review
    desc: "Cada agente miembro trabaja desde el mismo inventario del MLS en el que se coloca su propiedad.",
  },
  {
    value: 437,
    display: "437",
    suffix: "+",
    // TODO: native Madrid editor review
    label: "Acuerdos Internacionales",
    sublabel: "MIAMI Global Council",
    // TODO: native Madrid editor review
    desc: "Mercados directos de compradores en más de 75 países — más que cualquier otra asociación local.",
  },
  {
    value: 3500,
    display: "3,500",
    suffix: "+",
    // TODO: native Madrid editor review
    label: "Agentes de United Realty Group",
    sublabel: "Fundada en 2002 · 20 oficinas en Florida",
    // TODO: native Madrid editor review
    desc: "Una correduría de servicio completo con una compañía de título interna detrás de cada propiedad.",
  },
];

const PILLARS = [
  {
    icon: Camera,
    step: "01",
    // TODO: native Madrid editor review
    title: "Material visual que gana el clic",
    // TODO: native Madrid editor review
    body:
      "Fotografía profesional, video cinematográfico y dirección de puesta en escena — aprobados antes del lanzamiento. Los compradores buscan primero en línea; su propiedad gana desde el primer fotograma.",
  },
  {
    icon: Globe2,
    step: "02",
    // TODO: native Madrid editor review
    title: "Distribución más allá del MLS",
    // TODO: native Madrid editor review
    body:
      "Hacia el ecosistema del MLS de Miami que 93,000 agentes usan a diario — luego distribuido a los principales portales de EE. UU. y a más de 200 canales internacionales en 19 idiomas.",
  },
  {
    icon: Radar,
    step: "03",
    // TODO: native Madrid editor review
    title: "Activación de agentes compradores",
    // TODO: native Madrid editor review
    body:
      "Contacto directo con los agentes que trabajan con compradores en su rango de precio — locales, de reubicación e internacionales — para que su propiedad se muestre, no solo se liste.",
  },
  {
    icon: MessagesSquare,
    step: "04",
    // TODO: native Madrid editor review
    title: "Reportes semanales, estrategia real",
    // TODO: native Madrid editor review
    body:
      "Visitas, comentarios y análisis cada semana por WhatsApp o correo electrónico — con ajustes de precio recomendados a partir de los datos, no de conjeturas.",
  },
];

function AnimatedNumber({ display, suffix }: { display: string; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (inView) setVisible(true);
  }, [inView]);

  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <span className="font-serif" style={{ lineHeight: 1 }}>
        {display}
        {suffix && <span className="text-gold/80">{suffix}</span>}
      </span>
    </div>
  );
}

function StatCard({ stat, index }: { stat: typeof TOP_STATS[0]; index: number; key?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay: index * 0.09 }}
      className="group relative flex flex-col justify-between border-b border-gold/15 p-4 transition-colors duration-500 hover:bg-white/[0.03] md:p-8 lg:border-b-0 lg:border-r lg:p-10 last:border-r-0"
    >
      <div className="mb-3 md:mb-8 h-px w-10 bg-gold/40 transition-all duration-500 group-hover:w-full group-hover:bg-gold/20" />
      <div className="font-serif text-gold" style={{ fontSize: "clamp(3.2rem, 6vw, 5.5rem)", lineHeight: 1 }}>
        <AnimatedNumber display={stat.display} suffix={stat.suffix} />
      </div>
      <div className="mt-3 md:mt-5">
        <p className="font-sans text-sm font-semibold uppercase tracking-[0.15em] text-white">{stat.label}</p>
        <p className="font-mono mt-1 text-[10px] uppercase tracking-[0.2em] text-gold/60">{stat.sublabel}</p>
      </div>
      <p className="mt-3 font-sans text-sm leading-relaxed text-white/70 md:mt-5">{stat.desc}</p>
    </motion.div>
  );
}

export function EsDistribution() {
  return (
    <section id="reach" className="relative overflow-hidden bg-navy-deep text-white">

      {/* Cinematic reach backdrop */}
      <LazyVideo
        src="/videos/cinematic_house_reach.mp4"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.10]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/85 via-navy-deep/70 to-navy-deep/90" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[120px]" />

      {/* ── Header — the ecosystem-placement argument ──────────── */}
      <div className="relative border-b border-gold/15 px-6 py-7 text-center md:py-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold"
        >
          {/* TODO: native Madrid editor review */}
          Distribución · United Realty Group
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mt-4 max-w-5xl font-serif leading-[1.08] text-white md:mt-6"
          style={{ fontSize: "clamp(2.2rem, 4.6vw, 4rem)" }}
        >
          {/* TODO: native Madrid editor review */}
          Su propiedad entra al ecosistema<br />
          {/* TODO: native Madrid editor review */}
          <em className="italic text-gold">que 93,000 agentes del Sur de Florida usan cada día.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-white/70 md:mt-6"
        >
          {/* TODO: native Madrid editor review */}
          Los compradores no encuentran propiedades — sus agentes lo hacen. Su propiedad
          entra en el mismo inventario del MLS que esos agentes consultan a diario, en el
          Sur de Florida y en más de 75 países.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 flex flex-col items-center gap-3 md:mt-10"
        >
          <img
            src="/images/miami-realtors-logo.png"
            alt="MIAMI Association of REALTORS®"
            width="170"
            height="58"
            loading="lazy"
            className="h-9 w-auto opacity-85"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          {/* TODO: native Madrid editor review */}
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70">
            Impulsado por la membresía en Miami and South Florida REALTORS®
          </p>
        </motion.div>
      </div>

      {/* ── Stats row ────────────────────────────────────────────── */}
      <div className="relative grid border-b border-gold/15 lg:grid-cols-3">
        {TOP_STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      {/* ── How the listing system executes ─────────────────────── */}
      <div className="relative mx-auto max-w-6xl px-6 py-10 md:py-16">
        {/* TODO: native Madrid editor review */}
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">El Sistema de Listado</p>
        {/* TODO: native Madrid editor review */}
        <h3 className="mt-4 max-w-2xl font-serif text-2xl leading-tight text-white md:mt-5 md:text-4xl">
          Lo que realmente sucede cuando su propiedad se lista con Carlos.
        </h3>

        <div className="mt-7 grid grid-cols-2 gap-px border border-white/10 bg-white/10 lg:grid-cols-4 md:mt-12">
          {PILLARS.map(({ icon: Icon, step, title, body }) => (
            <div key={step} className="group relative bg-navy-deep p-4 transition-colors duration-300 hover:bg-white/[0.03] md:p-7">
              <div className="flex items-center justify-between">
                <span className="font-serif text-[2rem] leading-none text-gold/90 md:text-[2.6rem]">{step}</span>
                <Icon size={20} className="text-gold/45 transition-colors duration-300 group-hover:text-gold" />
              </div>
              <div className="mt-3 h-px w-10 bg-gold/40 transition-all duration-300 group-hover:w-16 md:mt-5" />
              <h4 className="mt-3 font-serif text-lg leading-snug text-white md:mt-5">{title}</h4>
              <p className="mt-2 font-sans text-[13px] leading-relaxed text-white/70 md:mt-3">{body}</p>
            </div>
          ))}
        </div>

        {/* Single CTA naming a specific outcome */}
        <div className="mt-8 flex justify-center md:mt-12">
          <a
            href="/es/vender#contact"
            className="group inline-flex items-center gap-2.5 bg-gold px-8 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90 md:py-4"
          >
            {/* TODO: native Madrid editor review */}
            Solicite Su Análisis de Distribución
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

    </section>
  );
}
