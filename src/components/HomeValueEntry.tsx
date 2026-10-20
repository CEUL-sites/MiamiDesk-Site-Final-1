import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import { HeroSellerForm } from "./HeroSellerForm";
import { loadGooglePlaces } from "../lib/googlePlaces";
import { restoreManualAddressEntry } from "./heroSellerFormModel";
import { trackMicroConversion } from "../lib/analytics";

const COPY = {
  en: {
    eyebrow: "Your property's value",
    title: "What could your home sell for?",
    body: "Start with your address. Get a property-specific pricing review from Carlos.",
    address: "South Florida property address",
    placeholder: "Enter your street address and unit",
    submit: "Request My Home Value Review",
    detail: "Prepared personally using comparable sales, current competition and your home's features.",
    privacy: "Free · Confidential · No listing commitment",
    disclaimer: "Prepared personally by Carlos. Not an instant automated estimate, an appraisal or a guarantee of sale price.",
    market: "Explore city and county market data",
    edit: "Change address",
    confirm: "Your property",
    next: "How should Carlos reach you?",
    map: "Address preview",
    mapNote: "Confirm the address and unit. Map placement is approximate.",
    openMap: "View address on Google Maps",
    error: "Enter your property address to continue.",
  },
  es: {
    eyebrow: "El valor de su propiedad",
    title: "¿Por cuánto podría vender su casa?",
    body: "Empiece por la dirección. Carlos prepara una revisión de precio para su propiedad.",
    address: "Dirección de la propiedad en el sur de Florida",
    placeholder: "Calle, número y unidad de su propiedad",
    submit: "Solicitar revisión del valor de mi casa",
    detail: "Preparada personalmente con ventas comparables, la competencia actual y las características de su propiedad.",
    privacy: "Gratis · Confidencial · Sin compromiso de venta",
    disclaimer: "Carlos prepara la revisión personalmente. Esta revisión no es una tasación, una estimación automática ni una garantía de precio de venta.",
    market: "Consultar datos de mercado por ciudad y condado",
    edit: "Cambiar dirección",
    confirm: "Su propiedad",
    next: "¿Cómo puede Carlos contactarle?",
    map: "Vista previa de la dirección",
    mapNote: "Confirme la dirección y la unidad. La ubicación del mapa es aproximada.",
    openMap: "Ver dirección en Google Maps",
    error: "Ingrese la dirección de su propiedad para continuar.",
  },
};

export function AddressMapEmbed({ address, title }: { address: string; title: string }) {
  // Google Maps' embeddable website view is independent of the Places API key.
  // Mount only after the visitor confirms an address, never on the initial page.
  return <iframe className="home-value-map" title={title} src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />;
}

export function HomeValueEntry({ lang = "en" }: { lang?: "en" | "es" }) {
  const t = COPY[lang];
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const placesInput = useRef<HTMLInputElement | null>(null);
  const listener = useRef<google.maps.MapsEventListener | null>(null);
  const contactHeading = useRef<HTMLHeadingElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const [sceneVisible, setSceneVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => () => { listener.current?.remove(); }, []);
  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) { setSceneVisible(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setSceneVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (contact) contactHeading.current?.focus({ preventScroll: true });
  }, [contact]);

  function initPlaces() {
    const field = input.current;
    if (!field || placesInput.current === field) return;
    placesInput.current = field;
    loadGooglePlaces(() => {
      if (input.current !== field || !window.google?.maps?.places) return;
      const autocomplete = new window.google.maps.places.Autocomplete(field, {
        types: ["address"], componentRestrictions: { country: ["us"] },
        fields: ["formatted_address"],
      });
      listener.current?.remove();
      listener.current = autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        setAddress(place.formatted_address || field.value);
        setError(false);
      });
    }, () => {
      requestAnimationFrame(() => restoreManualAddressEntry(input.current, t.placeholder));
    });
  }

  function continueToContact(event: FormEvent) {
    event.preventDefault();
    if (!address.trim()) { setError(true); input.current?.focus(); return; }
    setAddress(address.trim());
    setError(false);
    setContact(true);
    trackMicroConversion("hp_cta_click", { type: "home_value_review", location: `homepage-valuation-${lang}` });
  }

  return (
    <section id="home-value-review" className="home-value-entry" aria-labelledby={`${id}-title`}>
      <div className="home-value-layout">
        <div className="home-value-copy">
          <p className="home-value-eyebrow">{t.eyebrow}</p>
          <h2 id={`${id}-title`}>{t.title}</h2>
          <p className="home-value-intro">{t.body}</p>
          <p className="home-value-detail">{t.detail}</p>
          <a className="home-value-market" href="/market-data">{t.market}<ArrowRight size={15} aria-hidden="true" /></a>
        </div>
        <div className="home-value-card">
          {!contact ? <>
            <div ref={scene} className="home-value-scene" data-visible={sceneVisible} aria-hidden="true">
              <svg viewBox="0 0 420 250" fill="none" focusable="false">
                <path d="M20 137 202 33 400 139 220 240Z" fill="#e5e9e5" />
                <path d="m20 167 185-105 196 106M70 105l199 107M146 62l199 107" stroke="#c4cec8" strokeWidth="2" />
                <path d="m148 166 66-38 66 38-66 38Z" fill="#B08D57" fillOpacity=".16" stroke="#B08D57" />
                <ellipse cx="214" cy="177" rx="45" ry="14" fill="#112d40" fillOpacity=".12" />
                <g className="home-value-house">
                  <path d="m172 101 42-24 42 24v57l-42 24-42-24Z" fill="#fff" stroke="#7c8e8c" />
                  <path d="m214 182 42-24v-57l-42 24Z" fill="#d4ddd7" stroke="#7c8e8c" />
                  <path d="m163 96 51-53 51 53-51 29Z" fill="#112d40" />
                  <path d="m214 43 51 53-9 5-42-44Z" fill="#24465a" />
                  <path d="m187 136 12 7v29l-12-7Z" fill="#B08D57" />
                  <path d="m230 140 12-7v17l-12 7Z" fill="#8ba9a7" />
                </g>
                <circle cx="300" cy="58" r="17" fill="#B08D57" /><path d="m294 58 4 4 8-9" stroke="white" strokeWidth="2" />
              </svg>
              <span><MapPin size={13} />{lang === "es" ? "El punto de partida es su casa" : "Your home is the starting point"}</span>
            </div>
            <form onSubmit={continueToContact} noValidate className="home-value-address-form">
              <label htmlFor={`${id}-address`}>{t.address}</label>
              <div className="home-value-input-wrap"><MapPin size={18} aria-hidden="true" />
                <input id={`${id}-address`} ref={input} name="propertyAddress" type="text" autoComplete="street-address" value={address} placeholder={t.placeholder} maxLength={300} onFocus={initPlaces} onChange={event => { setAddress(event.target.value); setError(false); }} aria-invalid={error} aria-describedby={error ? `${id}-error` : undefined} />
              </div>
              {error && <p role="alert" id={`${id}-error`}>{t.error}</p>}
              <button type="submit">{t.submit}<ArrowRight size={17} aria-hidden="true" /></button>
            </form>
            <p className="home-value-privacy"><ShieldCheck size={14} aria-hidden="true" />{t.privacy}</p>
          </> : <>
            <div className="home-value-selected"><div><p>{t.confirm}</p><strong>{address}</strong></div><button type="button" onClick={() => { setContact(false); requestAnimationFrame(() => input.current?.focus({ preventScroll: true })); }}>{t.edit}</button></div>
            <AddressMapEmbed address={address} title={t.map} />
            <a className="home-value-map-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`} target="_blank" rel="noopener noreferrer">{t.openMap} ↗</a>
            <p className="home-value-map-note">{t.mapNote}</p>
            <h3 ref={contactHeading} tabIndex={-1}>{t.next}</h3>
            <HeroSellerForm compact progressiveDesktop valuation initialAddress={address} sourcePage={`homepage-valuation-${lang}`} lang={lang} />
          </>}
          <p className="home-value-disclaimer">{t.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
