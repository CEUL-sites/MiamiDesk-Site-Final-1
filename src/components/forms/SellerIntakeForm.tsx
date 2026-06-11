import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2, MapPin, Send, TrendingUp } from "lucide-react";
import { CONTACT } from "../../constants";
import { trackLead, trackFunnelEvent } from "../../lib/analytics";
import { getAttribution, getLeadSource } from "../../lib/attribution";
import { notifyLeadDirect } from "../../lib/leadNotify";
import { loadGooglePlaces, MAPS_KEY } from "../../lib/googlePlaces";

const CITIES = [
  "Aventura", "Bal Harbour", "Boca Raton", "Brickell", "Coconut Grove",
  "Coral Gables", "Coral Springs", "Doral", "Fort Lauderdale", "Hallandale Beach",
  "Hialeah", "Hollywood", "Homestead", "Kendall", "Key Biscayne",
  "Miami", "Miami Beach", "Miami Lakes", "Miramar", "Palm Beach",
  "Pembroke Pines", "Pinecrest", "Plantation", "Pompano Beach", "South Miami",
  "Sunny Isles Beach", "Sunrise", "Weston", "West Palm Beach", "Other",
];

const VALUE_BANDS = [
  "$500K – $1M", "$1M – $2M", "$2M – $5M", "$5M – $10M", "$10M – $25M", "$25M+",
];

const INITIAL: Record<string, string> = {
  name: "", email: "", phone: "", propertyAddress: "", city: "",
  valueBand: "", occupancy: "", timeline: "", priorListing: "",
  preferredContact: "WhatsApp", source: "seller-intake",
  lat: "", lng: "", placeId: "", messagingConsent: "no",
};

interface CitySnapshot {
  available: boolean;
  city: string;
  activeCount: number;
  medianListPrice: number | null;
  avgDaysOnMarket: number | null;
  medianPricePerSqft: number | null;
}

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function encodeForm(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

export function SellerIntakeForm() {
  const [form, setForm] = useState(INITIAL);
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [err, setErr] = useState("");
  const [stepErr, setStepErr] = useState("");
  const [snapshot, setSnapshot] = useState<CitySnapshot | null>(null);
  const addressRef = useRef<HTMLInputElement>(null);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  // Google Places Autocomplete on the step-1 address field — captures lat/lng
  // and auto-selects the city when it matches our list.
  useEffect(() => {
    if (step !== 1) return;
    loadGooglePlaces(() => {
      const input = addressRef.current;
      if (!input || !window.google?.maps?.places) return;
      const ac = new window.google.maps.places.Autocomplete(input, {
        types: ["address"],
        componentRestrictions: { country: ["us"] },
        fields: ["formatted_address", "geometry", "place_id", "address_components"],
      });
      ac.addListener("place_changed", () => {
        const place = ac.getPlace();
        const addr = place.formatted_address ?? input.value;
        const lat = place.geometry?.location?.lat() ?? null;
        const lng = place.geometry?.location?.lng() ?? null;
        const locality = place.address_components?.find((c) => c.types.includes("locality"))?.long_name ?? "";
        const matchedCity = CITIES.find((c) => c.toLowerCase() === locality.toLowerCase()) ?? "";
        setForm((f) => ({
          ...f,
          propertyAddress: addr,
          lat: lat != null ? String(lat) : "",
          lng: lng != null ? String(lng) : "",
          placeId: place.place_id ?? "",
          city: matchedCity || f.city,
        }));
      });
    });
  }, [step]);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.propertyAddress.trim() || !form.city) {
      setStepErr("Please enter the property address and city to continue.");
      return;
    }
    setStepErr("");

    // Record the partial lead immediately — even if the visitor never
    // completes step 2, Carlos sees the address in the lead sheet.
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeForm({
        "form-name": "seller-valuation-step1",
        "bot-field": "",
        propertyAddress: form.propertyAddress,
        city: form.city,
        lat: form.lat,
        lng: form.lng,
        placeId: form.placeId,
        sourcePage: "seller-intake-step1",
        ...getAttribution(),
      }),
    }).catch(() => {});
    trackFunnelEvent("seller_intake_step1", { city: form.city });

    // Market snapshot for the interstitial — best-effort, never blocks step 2.
    setSnapshot(null);
    if (form.city && form.city !== "Other") {
      fetch(`/.netlify/functions/city-stats?city=${encodeURIComponent(form.city)}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((d: CitySnapshot | null) => { if (d?.available) setSnapshot(d); })
        .catch(() => {});
    }
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErr("");
    const ctrl = new AbortController();
    const t = window.setTimeout(() => ctrl.abort(), 12000);
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: ctrl.signal,
        body: encodeForm({ "form-name": "seller-intake", "bot-field": "", ...form, sourcePage: "seller-intake", ...getAttribution() }),
      });
      if (!res.ok) throw new Error("submission_failed");
      notifyLeadDirect({
        name: form.name, email: form.email, phone: form.phone,
        propertyAddress: form.propertyAddress, city: form.city, timeline: form.timeline,
        message: form.priorListing, sourcePage: "seller-intake", leadSource: getLeadSource(),
      });
      // Trigger auto-reply
      fetch("/.netlify/functions/lead-acknowledgment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formName: "seller-intake", name: form.name, email: form.email, phone: form.phone }),
      }).catch(() => {});
      trackLead("seller", { form: "seller-intake" }); window.location.href = "/thanks/seller";
    } catch (e: unknown) {
      setErr(
        (e as { name?: string }).name === "AbortError"
          ? "The request timed out. Please WhatsApp Carlos directly."
          : "Could not submit. Please try WhatsApp below."
      );
      setStatus("error");
    } finally {
      window.clearTimeout(t);
    }
  };

  if (status === "success") {
    return (
      <div className="border border-bone bg-white p-10 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center bg-gold/10 text-gold">
          <CheckCircle2 size={30} />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Strategy Review Requested</p>
        <h3 className="mt-3 font-serif text-2xl text-navy">Carlos will review your property details personally.</h3>
        <p className="mt-4 font-sans text-sm leading-relaxed text-navy/55 max-w-md mx-auto">
          You will receive a confirmation to {form.email || "your email"} within minutes. Carlos responds within one business day from his Weston, Florida office.
        </p>
        <p className="mt-6 font-sans text-sm text-navy/55">
          For immediate questions:{" "}
          <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="text-gold underline">
            WhatsApp {CONTACT.phoneUS}
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="border border-bone bg-white">
      <div className="border-b border-bone bg-navy-deep px-8 py-6">
        <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold">Confidential Seller Desk</p>
        <h3 className="mt-2 font-serif text-2xl text-white">
          {step === 1 ? "Where is the property?" : "Schedule a 30-minute listing strategy call"}
        </h3>
        <p className="mt-2 font-sans text-sm text-white/50">
          {step === 1
            ? "Start with the address — Carlos prepares an MLS-based positioning analysis for every submission."
            : "Almost done — Carlos reviews every submission personally before responding."}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/55">
            <span className="text-white/35">Prefer to talk now?</span>
            <a href={CONTACT.whatsappUS} target="_blank" rel="noopener noreferrer" className="text-gold transition-colors hover:text-white">WhatsApp US +1 954-865-6622</a>
            <a href={CONTACT.whatsappSpain} target="_blank" rel="noopener noreferrer" className="text-gold transition-colors hover:text-white">WhatsApp ES +34 646 85 30 78</a>
            <a href={`mailto:${CONTACT.email}`} className="text-gold transition-colors hover:text-white">{CONTACT.email}</a>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">Step {step} of 2</span>
        </div>
      </div>

      {step === 1 ? (
        <form onSubmit={handleStep1} className="space-y-6 p-8">
          <Field label="Property Address *">
            <div className="relative">
              <MapPin size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/70 z-10" />
              <input
                required
                ref={addressRef}
                name="propertyAddress"
                type="text"
                placeholder={MAPS_KEY ? "Start typing your street address…" : "Street address or building name"}
                autoComplete="street-address"
                style={{ paddingLeft: "2.75rem" }}
                className="form-input w-full"
                value={form.propertyAddress}
                onChange={set("propertyAddress")}
              />
            </div>
          </Field>

          <Field label="City *">
            <select required name="city" className="form-input w-full" value={form.city} onChange={set("city")}>
              <option value="">Select city…</option>
              {CITIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>

          {stepErr && <p className="font-sans text-sm text-red-600">{stepErr}</p>}

          <button type="submit" className="group flex w-full items-center justify-center gap-3 bg-navy py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-all hover:bg-gold">
            See My Market Snapshot
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>

          <p className="text-center font-mono text-[8px] uppercase tracking-[0.18em] text-navy/30">
            Free · Confidential · No listing commitment · {CONTACT.licenseDisplay}
          </p>
        </form>
      ) : (
        <form
          name="seller-intake"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="space-y-6 p-8"
        >
          <input type="hidden" name="form-name" value="seller-intake" />
          <input type="hidden" name="source" value="seller-intake" />
          <input type="hidden" name="propertyAddress" value={form.propertyAddress} />
          <input type="hidden" name="city" value={form.city} />
          <input type="hidden" name="lat" value={form.lat} />
          <input type="hidden" name="lng" value={form.lng} />
          <input type="hidden" name="placeId" value={form.placeId} />
          <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
            <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
          </div>

          {/* Market snapshot interstitial — live MLS context for their city */}
          {snapshot && (
            <div className="border border-gold/30 bg-ivory p-5">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-gold" />
                <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-gold">
                  {form.city} market right now
                </p>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {snapshot.medianListPrice != null && (
                  <div>
                    <p className="font-serif text-xl text-navy">{usd.format(snapshot.medianListPrice)}</p>
                    <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-navy/45">Median asking price</p>
                  </div>
                )}
                {snapshot.avgDaysOnMarket != null && (
                  <div>
                    <p className="font-serif text-xl text-navy">{snapshot.avgDaysOnMarket} days</p>
                    <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-navy/45">Avg. on market</p>
                  </div>
                )}
                <div>
                  <p className="font-serif text-xl text-navy">{snapshot.activeCount.toLocaleString("en-US")}</p>
                  <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-navy/45">Active listings</p>
                </div>
              </div>
              <p className="mt-4 font-sans text-xs leading-relaxed text-navy/55">
                Active residential listings in {snapshot.city}, per Miami and South Florida REALTORS® MLS via IDX.
                Your full analysis — comparables, absorption, and positioning — is prepared personally by Carlos. Complete the details below to receive it.
              </p>
            </div>
          )}

          <div className="flex items-start justify-between gap-4">
            <p className="font-sans text-sm text-navy/55">
              <span className="font-medium text-navy">{form.propertyAddress}</span>
              {form.city ? `, ${form.city}` : ""}
            </p>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-gold hover:underline"
            >
              <ArrowLeft size={11} /> Edit address
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full Name *">
              <input required name="name" type="text" placeholder="Your name" className="form-input" value={form.name} onChange={set("name")} />
            </Field>
            <Field label="Email Address *">
              <input required name="email" type="email" placeholder="your@email.com" className="form-input" value={form.email} onChange={set("email")} />
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Phone / WhatsApp *">
              <input required name="phone" type="tel" placeholder="+1 or +34..." className="form-input" value={form.phone} onChange={set("phone")} />
            </Field>
            <Field label="Preferred Contact *">
              <select required name="preferredContact" className="form-input w-full" value={form.preferredContact} onChange={set("preferredContact")}>
                <option>WhatsApp</option>
                <option>Email</option>
                <option>Phone call</option>
              </select>
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Estimated Value *">
              <select required name="valueBand" className="form-input w-full" value={form.valueBand} onChange={set("valueBand")}>
                <option value="">Select range…</option>
                {VALUE_BANDS.map((v) => <option key={v}>{v}</option>)}
              </select>
            </Field>
            <Field label="Occupancy *">
              <select required name="occupancy" className="form-input w-full" value={form.occupancy} onChange={set("occupancy")}>
                <option value="">Select…</option>
                <option>Owner-occupied</option>
                <option>Tenanted</option>
                <option>Vacant</option>
              </select>
            </Field>
          </div>

          <Field label="Selling Timeline *">
            <select required name="timeline" className="form-input w-full" value={form.timeline} onChange={set("timeline")}>
              <option value="">Select…</option>
              <option>0 – 3 months</option>
              <option>3 – 6 months</option>
              <option>6 – 12 months</option>
              <option>Exploratory — no fixed date</option>
            </select>
          </Field>

          <Field label="Prior Listing History (optional)">
            <textarea name="priorListing" rows={3} placeholder="Has this property been listed before? Any relevant context about prior attempts, pricing history, or condition." className="form-input" value={form.priorListing} onChange={set("priorListing")} />
          </Field>

          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              name="messagingConsent"
              checked={form.messagingConsent === "yes"}
              onChange={(e) => setForm((f) => ({ ...f, messagingConsent: e.target.checked ? "yes" : "no" }))}
              className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#B08D57]"
            />
            <span className="font-sans text-xs leading-relaxed text-navy/55">
              I agree to receive updates about my inquiry by WhatsApp or SMS at the number provided.
              Message and data rates may apply. Reply STOP to opt out. (Optional)
            </span>
          </label>

          {status === "error" && (
            <p className="font-sans text-sm text-red-600">{err}</p>
          )}

          <button type="submit" disabled={status === "submitting"} className="group flex w-full items-center justify-center gap-3 bg-navy py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-white transition-all hover:bg-gold disabled:opacity-60">
            {status === "submitting" ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            {status === "submitting" ? "Sending…" : "Request My Confidential Analysis"}
          </button>

          <p className="text-center font-mono text-[8px] uppercase tracking-[0.18em] text-navy/30">
            {CONTACT.licenseDisplay} · United Realty Group · Equal Housing Opportunity
          </p>
        </form>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[9px] uppercase tracking-[0.2em] text-navy/55">{label}</label>
      {children}
    </div>
  );
}
