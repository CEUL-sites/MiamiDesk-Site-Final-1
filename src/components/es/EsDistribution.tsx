import { motion } from "motion/react";
import { useState } from "react";
import { DistributionMetrics } from "../DistributionMetrics";
import { ArrowRight, Camera, Globe2, MessagesSquare, Radar, CheckCircle2, Share2 } from "lucide-react";
import { LazyVideo } from "../LazyVideo";
import { Tilt3D } from "../Tilt3D";

// Spanish counterpart of components/Distribution.tsx — same 3D architecture,
// DistributionMetrics integration, and PILLARS structure, translated to Spanish.
// CTA points to /es/vender#contact or #list-here.

const ECOSYSTEM_CHANNELS = [
  {
    id: "regional",
    step: "01",
    title: "Ecosistema MLS Regional",
    scope: "Núcleo Local del Sur de Florida",
    metrics: "93.000 Profesionales con Licencia",
    detail:
      "La entrada directa al MLS de Miami posiciona su propiedad en el flujo de trabajo diario de 93.000 agentes miembros en los condados de Miami-Dade, Broward, Palm Beach y Martin.",
    connectorHighlight: "Búsqueda activa en el MLS y prospección directa de compradores calificados",
  },
  {
    id: "national",
    step: "02",
    title: "Intercambio Nacional MLS",
    scope: "Reciprocidad en Estados Unidos",
    metrics: "260+ MLS en EE. UU. vía RPR",
    detail:
      "Sindicación en más de 260 sistemas MLS de Estados Unidos a través de Realtors Property Resource (RPR) y 11 acuerdos de reciprocidad directa de datos en Norteamérica.",
    connectorHighlight: "Intercambio de datos interestatal con los principales mercados de procedencia",
  },
  {
    id: "global",
    step: "03",
    title: "Sindicación Global y Mesa Bilateral",
    scope: "Flujo Internacional de Capital",
    metrics: "200+ Portales · 19 Idiomas",
    detail:
      "Difusión mundial en más de 200 portales internacionales en 19 idiomas, respaldada por más de 437 acuerdos bilaterales en más de 75 países y el puente Madrid-Miami de Carlos.",
    connectorHighlight: "Integración multilingüe de listados y referencias entre corredores internacionales",
  },
  {
    id: "brokerage",
    step: "04",
    title: "Red de Correduría y Título Interno",
    scope: "Coordinación en Todo el Estado",
    metrics: "3.500+ Agentes · Red de Oficinas",
    detail:
      "Una red coordinada en Florida que abarca desde Weston y Aventura hasta Boca Raton y Orlando, con supervisión de título interna para la máxima seguridad jurídica.",
    connectorHighlight: "Red interna de agentes y coordinación privada de visitas",
  },
];

const PILLARS = [
  {
    icon: Camera,
    step: "01",
    title: "Material visual que gana el clic",
    body:
      "Fotografía profesional, video cinematográfico y dirección de puesta en escena aprobados antes del lanzamiento. Material diseñado para captar al comprador en el primer fotograma.",
  },
  {
    icon: Globe2,
    step: "02",
    title: "Distribución más allá del MLS",
    body:
      "Posicionamiento profesional en el MLS dentro del ecosistema MIAMI REALTORS® + RWorld, con contacto dirigido a agentes compradores y canales elegibles.",
  },
  {
    icon: Radar,
    step: "03",
    title: "Activación de agentes compradores",
    body:
      "Contacto directo con los agentes que representan a compradores activos en su submercado y rango de precio: locales, de reubicación e internacionales.",
  },
  {
    icon: MessagesSquare,
    step: "04",
    title: "Reportes semanales, estrategia real",
    body:
      "Comentarios de visitas y análisis del MLS cada semana por WhatsApp o correo electrónico, con recomendaciones de precio guiadas por datos reales del mercado.",
  },
];

export function EsDistribution() {
  const [activeChannel, setActiveChannel] = useState(0);

  return (
    <section id="reach" className="relative overflow-hidden bg-navy-deep text-white">

      {/* Cinematic reach backdrop */}
      <LazyVideo
        src="/videos/cinematic_house_reach.mp4"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.11]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-deep/80 to-navy-deep" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.05] blur-[150px]" />

      {/* 3D Perspective ambient grid floor overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[650px] opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(176,141,87,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(176,141,87,0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse 70% 50% at 50% 20%, #000 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 50% 20%, #000 60%, transparent 100%)",
        }}
      />

      {/* ── Header — el argumento del ecosistema de colocación ──────────── */}
      <div className="relative border-b border-gold/15 px-6 py-10 text-center md:py-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold font-semibold"
        >
          Distribución · United Realty Group · Red de oficinas en Florida
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mt-4 max-w-5xl font-serif leading-[1.08] text-white md:mt-6"
          style={{ fontSize: "clamp(2.2rem, 4.6vw, 4rem)" }}
        >
          Su propiedad entra al ecosistema del MLS profesional<br />
          <em className="italic text-gold">utilizado en todo el sur de Florida.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-4 max-w-3xl font-sans text-base leading-relaxed text-white/80 md:mt-6"
        >
          Cuando una propiedad se lista bajo el mandato de Carlos Uzcategui, se conecta directamente a la infraestructura estructural de distribución de la mayor asociación local de agentes inmobiliarios del mundo. Posicionamos las propiedades elegibles para el descubrimiento activo por agentes compradores, con sindicación nacional y amplificación bilateral internacional.
        </motion.p>

        {/* Credencial de la asociación */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 flex flex-col items-center gap-3 md:mt-8"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-gold/30 bg-white/[0.04] px-5 py-2 backdrop-blur-md">
            <img
              src="/images/miami-realtors-logo.png"
              alt="MIAMI Association of REALTORS®"
              width="140"
              height="48"
              loading="lazy"
              className="h-7 w-auto opacity-90"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <span className="hidden sm:inline-block h-3 w-px bg-gold/30" />
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/75">
              Impulsado por la membresía en Miami and South Florida REALTORS®
            </p>
          </div>
        </motion.div>

        {/* ── Nexo Visual 3D de Distribución y Conectores ──── */}
        <div className="mx-auto mt-10 max-w-5xl md:mt-14">
          <div className="relative mx-auto flex w-fit items-center gap-3 rounded-full border border-gold/50 bg-gradient-to-r from-navy-deep via-[#0d2244] to-navy-deep px-6 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(212,175,55,0.4)] backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
            </span>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
              Origen del Listado · Nexo Central de Distribución
            </span>
            <span className="rounded bg-gold/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-gold-soft">
              Red Activa
            </span>
          </div>

          {/* Rieles conectores 3D / Conductos SVG */}
          <div aria-hidden="true" className="hidden lg:block relative h-12 w-full mt-2">
            <svg className="w-full h-full stroke-gold/45" fill="none" preserveAspectRatio="none" viewBox="0 0 1000 48">
              <path d="M 500 0 C 500 24, 166 24, 166 48" strokeWidth="1.5" className="opacity-70" />
              <path d="M 500 0 L 500 48" strokeWidth="1.5" className="opacity-90" />
              <path d="M 500 0 C 500 24, 833 24, 833 48" strokeWidth="1.5" className="opacity-70" />
              <circle cx="500" cy="0" r="3.5" fill="#B08D57" />
              <circle cx="166" cy="48" r="3.5" fill="#B08D57" />
              <circle cx="500" cy="48" r="3.5" fill="#B08D57" />
              <circle cx="833" cy="48" r="3.5" fill="#B08D57" />
            </svg>
          </div>
        </div>

        {/* ── Cuadrícula 3D de Métricas de Distribución ──────────────────── */}
        <div className="relative mx-auto max-w-6xl mt-4 px-2 sm:px-6">
          <DistributionMetrics lang="es" dark />
        </div>
      </div>

      {/* ── Explorador Interactivo de 4 Canales de Distribución ──────── */}
      <div className="relative mx-auto max-w-6xl border-b border-gold/15 px-6 py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">Canales de Distribución</p>
            <h3 className="mt-2 font-serif text-2xl text-white md:text-3xl">
              Cuatro vías sincronizadas hacia compradores calificados.
            </h3>
          </div>
          <p className="font-sans text-xs text-white/60 max-w-md">
            Las características describen la propiedad; la distribución multicanal genera la tensión competitiva que define el precio final de venta.
          </p>
        </div>

        {/* Selector de Canales */}
        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {ECOSYSTEM_CHANNELS.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(idx)}
              className={`flex flex-col items-start rounded-xl border p-4 text-left transition-all duration-300 ${
                activeChannel === idx
                  ? "border-gold bg-gold/15 shadow-[0_8px_20px_rgba(176,141,87,0.25)]"
                  : "border-white/10 bg-white/[0.03] hover:border-gold/40 hover:bg-white/[0.06]"
              }`}
            >
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-gold">
                CANAL {ch.step}
              </span>
              <span className="mt-1 font-serif text-sm font-semibold text-white">
                {ch.title}
              </span>
              <span className="mt-1 font-mono text-[10px] text-white/60">
                {ch.metrics}
              </span>
            </button>
          ))}
        </div>

        {/* Detalle 3D del Canal Activo */}
        <Tilt3D className="mt-6" maxTilt={3}>
          <div className="rounded-2xl border border-gold/30 bg-gradient-to-r from-navy-deep via-[#0d2244]/80 to-navy-deep p-6 md:p-8 backdrop-blur-md shadow-[0_15px_40px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gold/15 pb-5">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
                  CANAL {ECOSYSTEM_CHANNELS[activeChannel].step} · {ECOSYSTEM_CHANNELS[activeChannel].scope}
                </span>
                <h4 className="mt-1 font-serif text-xl text-white md:text-2xl">
                  {ECOSYSTEM_CHANNELS[activeChannel].title}
                </h4>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-gold/30 bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] text-gold-soft">
                <CheckCircle2 size={14} className="text-gold" />
                <span>{ECOSYSTEM_CHANNELS[activeChannel].metrics}</span>
              </div>
            </div>

            <p className="mt-5 font-sans text-sm leading-relaxed text-white/80 max-w-3xl">
              {ECOSYSTEM_CHANNELS[activeChannel].detail}
            </p>

            <div className="mt-5 flex items-center gap-2.5 font-mono text-[11px] text-white/70">
              <Share2 size={13} className="text-gold shrink-0" />
              <span>Arquitectura del Conector: <strong className="text-white font-medium">{ECOSYSTEM_CHANNELS[activeChannel].connectorHighlight}</strong></span>
            </div>
          </div>
        </Tilt3D>
      </div>

      <details className="relative mx-auto max-w-6xl border-b border-gold/15 px-6 py-5 text-white/70">
        <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.2em] text-gold/80">
          Elegibilidad de distribución
        </summary>
        <p className="mt-3 max-w-4xl font-sans text-xs leading-relaxed">
          La distribución está sujeta al tipo de propiedad y su elegibilidad, las normas del MLS, la aprobación de la correduría, la participación en plataformas y la disponibilidad de los socios de sindicación.
        </p>
      </details>

      {/* ── Cómo se ejecuta el sistema de listado ─────────────────────── */}
      <div className="relative mx-auto max-w-6xl px-6 py-12 md:py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">El Sistema de Listado</p>
        <h3 className="mt-3 max-w-2xl font-serif text-2xl leading-tight text-white md:mt-4 md:text-4xl">
          Lo que realmente sucede cuando su propiedad se lista con Carlos.
        </h3>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 md:mt-12">
          {PILLARS.map(({ icon: Icon, step, title, body }) => (
            <div key={step} className="h-full">
              <Tilt3D className="h-full" maxTilt={4}>
                <div className="group relative flex h-full flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 hover:border-gold/50 hover:bg-white/[0.06] hover:shadow-[0_12px_35px_rgba(0,0,0,0.55)] md:p-7">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-[2.2rem] leading-none text-gold md:text-[2.8rem]">{step}</span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy-deep">
                        <Icon size={20} />
                      </div>
                    </div>
                    <div className="mt-4 h-px w-10 bg-gold/40 transition-all duration-300 group-hover:w-16 md:mt-5" />
                    <h4 className="mt-4 font-serif text-lg leading-snug text-white md:mt-5">{title}</h4>
                  </div>
                  <p className="mt-2.5 font-sans text-[13px] leading-relaxed text-white/70 md:mt-4">{body}</p>
                </div>
              </Tilt3D>
            </div>
          ))}
        </div>

        <aside className="mt-8 rounded-xl border border-gold/30 bg-white/[0.05] p-6 md:mt-10 md:flex md:items-start md:gap-10 md:p-8" aria-label="Muestra del informe para el propietario">
          <div className="md:max-w-xs">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">Informe para el propietario</p>
            <h4 className="mt-2 font-serif text-2xl text-white">Evidencia para guiar la siguiente decisión.</h4>
            <p className="mt-2 font-sans text-sm leading-relaxed text-white/75">Una muestra de las categorías que revisamos juntos; el informe real refleja su propiedad y los datos disponibles.</p>
          </div>
          <ul className="mt-5 grid flex-1 gap-3 font-sans text-sm text-white/85 sm:grid-cols-2 md:mt-0">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
              <span>Actividad de visitas y comentarios de compradores</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
              <span>Conversaciones relevantes con agentes</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
              <span>Nuevas propiedades competidoras y cambios de precio</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
              <span>Acción recomendada y fecha de la próxima revisión</span>
            </li>
          </ul>
        </aside>

        <p className="mt-6 font-sans text-xs leading-relaxed text-white/75">Fuentes: comunicados de MIAMI REALTORS® + RWorld de mayo y abril de 2026; United Realty Group. El tamaño de la asociación y los acuerdos no garantizan atención a una propiedad ni referencias.</p>

        {/* CTA único */}
        <div className="mt-10 flex justify-center md:mt-14">
          <a
            href="/es/vender#contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-9 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-all hover:bg-white hover:text-navy-deep shadow-[0_8px_25px_rgba(176,141,87,0.35)] md:py-4.5"
          >
            Solicitar Revisión Privada de Estrategia
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

    </section>
  );
}
