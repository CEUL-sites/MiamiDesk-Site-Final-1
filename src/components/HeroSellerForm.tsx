import { motion } from "motion/react";
import { ArrowRight, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { CONTACT } from "../constants";
import { trackLead } from "../lib/analytics";
import { getAttribution } from "../lib/attribution";

type Lang = "en" | "es";

const encodeForm = (data: Record<string, string>) => new URLSearchParams(data).toString();

const COPY = {
  en: {
    eyebrow: "Private Seller Strategy Review",
    badge: "Free · Confidential",
    address: "Property address — South Florida or Spain",
    name: "Full name",
    phone: "Phone / WhatsApp",
    markets: ["Greater Miami / South Florida", "Marbella / Costa del Sol", "Madrid", "Other — Spain", "Other"],
    timelines: ["Exploring options", "Immediately", "30–90 days", "3–6 months", "6+ months"],
    submit: "Request a Private Seller Strategy Review",
    sending: "Sending…",
    trust: "★★★★★ 5.0 · 15 reviews · Carlos replies within 1 business day · No listing commitment",
    prefer: "Prefer WhatsApp?",
    preferLink: "Message Carlos directly",
    successTag: "Seller Request Received",
    successTitle: "Carlos will personally review your property.",
    successBody: "Expect a confidential response within one business day. For urgent timing, reach us on WhatsApp.",
    successCta: "Continue on WhatsApp →",
    timeout: "Request timed out — please use WhatsApp or try again.",
    failed: "Couldn't send — please use WhatsApp or try again.",
  },
  es: {
    eyebrow: "Revisión Privada de Estrategia de Venta",
    badge: "Gratis · Confidencial",
    address: "Dirección de la propiedad — Miami o España",
    name: "Nombre completo",
    phone: "Teléfono / WhatsApp",
    markets: ["Gran Miami / Sur de Florida", "Marbella / Costa del Sol", "Madrid", "Otra — España", "Otra"],
    timelines: ["Explorando opciones", "De inmediato", "30–90 días", "3–6 meses", "6+ meses"],
    submit: "Solicite una Revisión de Estrategia de Venta Privada",
    sending: "Enviando…",
    trust: "★★★★★ 5.0 · 15 reseñas · Carlos responde en 1 día hábil · Sin compromiso",
    prefer: "¿Prefiere WhatsApp?",
    preferLink: "Escriba a Carlos directamente",
    successTag: "Solicitud Recibida",
    successTitle: "Carlos revisará su propiedad personalmente.",
    successBody: "Recibirá una respuesta confidencial en un día hábil. Para asuntos urgentes, contáctenos por WhatsApp.",
    successCta: "Continuar por WhatsApp →",
    timeout: "La solicitud expiró — use WhatsApp o inténtelo de nuevo.",
    failed: "No se pudo enviar — use WhatsApp o inténtelo de nuevo.",
  },
} as const;

export function HeroSellerForm({ lang = "en" }: { lang?: Lang }) {
  const t = COPY[lang];
  const initial = { name: "", phone: "", propertyAddress: "", city: t.markets[0], timeline: t.timelines[0] };
  const [form, setForm]     = useState(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError]   = useState("");

  const update = (k: keyof typeof initial) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setError("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: controller.signal,
        body: encodeForm({ "form-name": "seller-hero", "bot-field": "", ...form, sourcePage: `hero-${lang}`, ...getAttribution() }),
      });
      if (!res.ok) throw new Error(String(res.status));
      trackLead("seller", { form: "seller-hero", page: `hero-${lang}` });
      setStatus("success");
      setForm(initial);
    } catch (err) {
      setError(err instanceof DOMException && err.name === "AbortError" ? t.timeout : t.failed);
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-[#0A1525]/90 border border-gold/30 backdrop-blur-xl px-6 py-8 text-center shadow-2xl shadow-black/50"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
          <CheckCircle2 size={26} />
        </div>
        <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold mb-2">{t.successTag}</p>
        <h3 className="font-serif text-2xl text-white">{t.successTitle}</h3>
        <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed text-white/55">{t.successBody}</p>
        <a
          href={CONTACT.whatsappUS}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold/80 hover:text-gold transition-colors"
        >
          {t.successCta}
        </a>
      </motion.div>
    );
  }

  const inputCls =
    "w-full rounded-lg bg-white/[0.05] border border-white/12 px-4 py-3 font-sans text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-gold/50 focus:bg-white/[0.08]";
  const selectCls = inputCls + " cursor-pointer appearance-none pr-9";

  return (
    <form
      name="seller-hero"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="rounded-2xl bg-[#0A1525]/80 border border-white/12 backdrop-blur-xl p-5 sm:p-6 text-left shadow-2xl shadow-black/50"
    >
      <input type="hidden" name="form-name" value="seller-hero" />
      <p aria-hidden="true" className="hidden">
        <label>Don't fill this out: <input name="bot-field" /></label>
      </p>

      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-gold">{t.eyebrow}</span>
        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">{t.badge}</span>
      </div>

      <div className="relative">
        <MapPin size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/60" />
        <input
          required
          name="propertyAddress"
          type="text"
          value={form.propertyAddress}
          onChange={update("propertyAddress")}
          placeholder={t.address}
          className={inputCls + " pl-10"}
          aria-label={t.address}
        />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input required name="name" type="text" value={form.name} onChange={update("name")} placeholder={t.name} className={inputCls} aria-label={t.name} />
        <input required name="phone" type="tel" value={form.phone} onChange={update("phone")} placeholder={t.phone} className={inputCls} aria-label={t.phone} />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="relative">
          <select name="city" value={form.city} onChange={update("city")} className={selectCls} aria-label="Market">
            {t.markets.map((m) => <option key={m}>{m}</option>)}
          </select>
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/60">▾</span>
        </div>
        <div className="relative">
          <select name="timeline" value={form.timeline} onChange={update("timeline")} className={selectCls} aria-label="Timeline">
            {t.timelines.map((tl) => <option key={tl}>{tl}</option>)}
          </select>
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/60">▾</span>
        </div>
      </div>

      {status === "error" && <p className="mt-3 font-sans text-[13px] text-red-400/90">{error}</p>}

      <p className="mt-4 text-center font-sans text-[10px] leading-relaxed tracking-[0.04em] text-gold/80">
        {t.trust}
      </p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="hero-cta-main mt-4 flex w-full items-center justify-center gap-2.5 rounded-lg px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep disabled:opacity-60"
      >
        {status === "submitting"
          ? <><Loader2 size={15} className="animate-spin" /> {t.sending}</>
          : <>{t.submit} <ArrowRight size={15} /></>}
      </button>

      <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
        {t.prefer}{" "}
        <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="text-gold/70 hover:text-gold underline underline-offset-2">
          {t.preferLink}
        </a>
      </p>
    </form>
  );
}
