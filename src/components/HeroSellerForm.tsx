import { motion } from "motion/react";
import { ArrowRight, MapPin, Loader2, CheckCircle2 } from "lucide-react";
import { useState, useRef, useEffect, type ChangeEvent, type FormEvent } from "react";
import { CONTACT } from "../constants";
import { trackLead } from "../lib/analytics";
import { getAttribution } from "../lib/attribution";

type Lang = "en" | "es";

// Google Places — declared globally, loaded lazily below
declare global {
  interface Window {
    google: typeof google;
    initGooglePlaces?: () => void;
  }
}

const MAPS_KEY = (import.meta.env as Record<string, string>)["VITE_GOOGLE_MAPS_KEY"] ?? "";

function loadGooglePlaces(onReady: () => void) {
  if (window.google?.maps?.places) { onReady(); return; }
  if (!MAPS_KEY) return; // no key — plain input fallback
  if (document.getElementById("gm-places-script")) {
    // already loading — wait for callback
    window.initGooglePlaces = onReady;
    return;
  }
  window.initGooglePlaces = onReady;
  const s = document.createElement("script");
  s.id = "gm-places-script";
  s.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&libraries=places&loading=async&callback=initGooglePlaces`;
  s.async = true;
  s.defer = true;
  document.head.appendChild(s);
}

const encodeForm = (data: Record<string, string>) => new URLSearchParams(data).toString();

const COPY = {
  en: {
    eyebrow: "Private Seller Strategy Review",
    badge: "Free · Confidential",
    address: "Property address — South Florida or Spain",
    name: "Full name",
    phone: "Phone / WhatsApp",
    email: "Email (optional)",
    markets: [
      "Greater Miami / S. Florida",
      "Marbella / Costa del Sol",
      "Madrid",
      "Other — Spain",
      "Other",
    ],
    timelines: ["Exploring options", "Immediately", "30–90 days", "3–6 months", "6+ months"],
    submit: "Request My Strategy Review",
    sending: "Sending…",
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
    email: "Email (opcional)",
    markets: [
      "Gran Miami / Sur de Florida",
      "Marbella / Costa del Sol",
      "Madrid",
      "Otra — España",
      "Otra",
    ],
    timelines: ["Explorando opciones", "De inmediato", "30–90 días", "3–6 meses", "6+ meses"],
    submit: "Solicitar Mi Revisión de Estrategia",
    sending: "Enviando…",
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
  const initial = {
    name: "", phone: "", email: "",
    propertyAddress: "",
    city: t.markets[0],
    timeline: t.timelines[0],
    lat: "", lng: "", placeId: "",
  };
  const [form, setForm]       = useState(initial);
  const [status, setStatus]   = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError]     = useState("");
  const [mapPin, setMapPin]   = useState<{ lat: number; lng: number; address: string } | null>(null);
  const addressRef            = useRef<HTMLInputElement>(null);

  // Wire up Google Places Autocomplete — capture lat/lng for map pin
  useEffect(() => {
    loadGooglePlaces(() => {
      const input = addressRef.current;
      if (!input || !window.google?.maps?.places) return;

      const ac = new window.google.maps.places.Autocomplete(input, {
        types: ["address"],
        componentRestrictions: { country: ["us", "es"] },
        fields: ["formatted_address", "geometry", "place_id"],
      });

      ac.addListener("place_changed", () => {
        const place = ac.getPlace();
        const addr   = place.formatted_address ?? input.value;
        const lat    = place.geometry?.location?.lat() ?? null;
        const lng    = place.geometry?.location?.lng() ?? null;
        const placeId = place.place_id ?? "";
        setForm((f) => ({
          ...f,
          propertyAddress: addr,
          lat: lat != null ? String(lat) : "",
          lng: lng != null ? String(lng) : "",
          placeId,
        }));
        if (lat != null && lng != null) {
          setMapPin({ lat, lng, address: addr });
        }
      });
    });
  }, []);

  const update = (k: keyof typeof initial) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

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
        body: encodeForm({
          "form-name": "seller-hero",
          "bot-field": "",
          ...form,
          sourcePage: `hero-${lang}`,
          mapUrl: form.lat && form.lng
            ? `https://www.google.com/maps?q=${form.lat},${form.lng}`
            : "",
          ...getAttribution(),
        }),
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

  // ── Success state ──────────────────────────────────────────────────────
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
  const selectCls =
    inputCls + " cursor-pointer appearance-none pr-9";

  return (
    <form
      name="seller-hero"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="rounded-2xl bg-[#0A1525]/90 border border-white/12 backdrop-blur-xl p-5 sm:p-7 text-left shadow-2xl shadow-black/60"
    >
      <input type="hidden" name="form-name" value="seller-hero" />
      <input type="hidden" name="email"   value={form.email} />
      <input type="hidden" name="lat"     value={form.lat} />
      <input type="hidden" name="lng"     value={form.lng} />
      <input type="hidden" name="placeId" value={form.placeId} />
      <p aria-hidden="true" className="hidden">
        <label>Don't fill this out: <input name="bot-field" /></label>
      </p>

      {/* Header row */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-gold">{t.eyebrow}</span>
        <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">{t.badge}</span>
      </div>

      {/* Address — Google Places Autocomplete */}
      <div className="relative">
        <MapPin size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gold/70 z-10" />
        <input
          required
          ref={addressRef}
          name="propertyAddress"
          type="text"
          value={form.propertyAddress}
          onChange={update("propertyAddress")}
          placeholder={t.address}
          autoComplete="off"
          className="w-full rounded-lg bg-white/[0.08] border border-gold/25 px-4 py-4 pl-11 font-sans text-[15px] text-white placeholder:text-white/30 outline-none transition-all focus:border-gold/60 focus:bg-white/[0.11] focus:ring-2 focus:ring-gold/15"
          aria-label={t.address}
        />
      </div>

      {/* Map pin preview — appears after Google Places selection */}
      {mapPin && MAPS_KEY && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.35 }}
          className="mt-3 overflow-hidden rounded-lg border border-gold/30 relative"
        >
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${mapPin.lat},${mapPin.lng}&zoom=15&size=600x160&scale=2&markers=color:0xB08D57%7Clabel:%7C${mapPin.lat},${mapPin.lng}&map_id=&style=feature:poi|visibility:off&style=feature:transit|visibility:off&key=${MAPS_KEY}`}
            alt={`Map pin: ${mapPin.address}`}
            className="w-full object-cover"
            width="600"
            height="160"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 px-3 py-2.5">
            <MapPin size={11} className="text-gold flex-shrink-0" />
            <p className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-gold/90 truncate">{mapPin.address}</p>
          </div>
        </motion.div>
      )}

      {/* Name + Phone */}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          required name="name" type="text"
          value={form.name} onChange={update("name")}
          placeholder={t.name} className={inputCls} aria-label={t.name}
        />
        <input
          required name="phone" type="tel"
          value={form.phone} onChange={update("phone")}
          placeholder={t.phone} className={inputCls} aria-label={t.phone}
        />
      </div>

      {/* Market + Timeline — each full-width row so labels never truncate */}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="relative">
          <select
            name="city" value={form.city} onChange={update("city")}
            className={selectCls} aria-label="Market"
          >
            {t.markets.map((m) => <option key={m}>{m}</option>)}
          </select>
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/60 text-xs">▾</span>
        </div>
        <div className="relative">
          <select
            name="timeline" value={form.timeline} onChange={update("timeline")}
            className={selectCls} aria-label="Timeline"
          >
            {t.timelines.map((tl) => <option key={tl}>{tl}</option>)}
          </select>
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/60 text-xs">▾</span>
        </div>
      </div>

      {status === "error" && (
        <p className="mt-3 font-sans text-[13px] text-red-400/90">{error}</p>
      )}

      {/* CTA button */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="hero-cta-main mt-5 flex w-full items-center justify-center gap-2.5 rounded-lg px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep disabled:opacity-60"
      >
        {status === "submitting"
          ? <><Loader2 size={15} className="animate-spin" />{t.sending}</>
          : <>{t.submit}<ArrowRight size={15} /></>}
      </button>

      {/* Single trust row — stars + proof */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="flex gap-0.5 shrink-0" aria-hidden="true">
          {[0,1,2,3,4].map(i => (
            <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill="#B08D57">
              <path d="M6 0l1.35 4.15H12L8.32 6.72 9.67 10.87 6 8.3 2.33 10.87 3.68 6.72 0 4.15h4.65z"/>
            </svg>
          ))}
        </span>
        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/35 leading-snug">
          5.0 · Replies within 1 business day · No listing commitment
        </span>
      </div>

      {/* WhatsApp fallback */}
      <p className="mt-3 text-center font-mono text-[8px] uppercase tracking-[0.14em] text-white/25">
        {t.prefer}{" "}
        <a
          href={CONTACT.whatsappUS}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold/60 hover:text-gold underline underline-offset-2 transition-colors"
        >
          {t.preferLink}
        </a>
      </p>
    </form>
  );
}
