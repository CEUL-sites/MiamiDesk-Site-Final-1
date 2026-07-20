import { useMemo, useState, type FormEvent } from "react";
import { ArrowRight, Calculator, CheckCircle2, Loader2, Lock } from "lucide-react";
import { LEAD_MAGNETS } from "../constants";
import { trackLead } from "../lib/analytics";
import { getAttribution, getLeadSource } from "../lib/attribution";
import { notifyLeadDirect } from "../lib/leadNotify";

// Interactive seller net-proceeds estimator — the highest-intent artifact a
// "considering selling" homeowner can engage with. Sliders update live; the
// written breakdown + 2026 net sheet PDF is delivered by email, which is the
// lead capture. Submissions post to the existing `seller-consultation`
// Netlify form so they flow through submission-created → Sheets/WhatsApp.
//
// Compliance: every figure is labeled an estimate; commissions stated as
// fully negotiable; no outcome, price, or timeline guarantees.

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 });

const COMMISSION_OPTIONS = [4.5, 5, 5.5, 6];

// Florida documentary stamp tax on the deed — $0.70 per $100 statewide
// ($0.60 in Miami-Dade for single-family; we use the conservative statewide
// rate and label it an estimate).
const DOC_STAMP_RATE = 0.007;
// Owner's title policy (FL promulgated rates ≈ 0.5–0.55%) + settlement,
// lien search, estoppel and recording — rolled into one labeled estimate.
const TITLE_CLOSING_RATE = 0.0075;

const encodeForm = (data: Record<string, string>) => new URLSearchParams(data).toString();

type Lang = "en" | "es";

const COPY = {
  en: {
    eyebrow: "Seller Net Proceeds · Estimator",
    headline: "What would you actually walk away with?",
    intro:
      "Move the sliders to model your sale. Selling costs in Florida are knowable in advance — sellers who see the full math early make better listing decisions.",
    priceLabel: "Estimated sale price",
    priceMin: "$200K",
    priceMax: "$5M",
    payoffLabel: "Remaining mortgage payoff",
    payoffMin: "$0",
    payoffMax: "$3M",
    commissionLabel: "Total commission — fully negotiable, set at listing",
    breakdownHeading: "Estimated breakdown",
    rowSalePrice: "Sale price",
    rowCommission: (commission: number) => `Commission (${commission}%)`,
    rowDocStamps: "Documentary stamps (est.)",
    rowTitleClosing: "Title & closing costs (est.)",
    rowPayoff: "Mortgage payoff",
    netLabel: "Estimated net proceeds",
    successOnItsWay: "On its way",
    successBody: "Carlos will follow up with your written breakdown. Meanwhile, the full 2026 net sheet is ready now:",
    downloadLabel: "Download the Net Sheet",
    formIntro:
      "Get this breakdown in writing — plus the line items this quick model can't show (prorations, HOA estoppel, your county's exact rates):",
    namePlaceholder: "Your name",
    nameAriaLabel: "Your name",
    emailPlaceholder: "Email address",
    emailAriaLabel: "Email address",
    phonePlaceholder: "WhatsApp / phone (optional)",
    phoneAriaLabel: "WhatsApp or phone (optional)",
    errorMessage: "Could not send — please try again.",
    submitLabel: "Email Me My Net Sheet",
    submittingLabel: "Sending…",
    confidentialLine: "Confidential · No listing commitment · No spam",
    disclaimer:
      "Estimates for planning purposes only — not a guarantee of sale price, costs, or proceeds. " +
      "Commissions are fully negotiable and not set by law. Documentary stamp, title, and closing " +
      "figures use typical Florida rates; actual amounts vary by county, contract terms, and " +
      "property. Your written net sheet is prepared against your specific situation.",
  },
  es: {
    // TODO: native Madrid editor review
    eyebrow: "Estimador de Ganancias Netas del Vendedor",
    // TODO: native Madrid editor review
    headline: "¿Cuánto se quedaría realmente?",
    // TODO: native Madrid editor review
    intro:
      "Mueva los controles para simular su venta. Los costos de venta en Florida se pueden conocer de antemano — los vendedores que ven los números completos desde el principio toman mejores decisiones de listado.",
    // TODO: native Madrid editor review
    priceLabel: "Precio de venta estimado",
    priceMin: "$200K",
    priceMax: "$5M",
    // TODO: native Madrid editor review
    payoffLabel: "Saldo restante de la hipoteca",
    payoffMin: "$0",
    payoffMax: "$3M",
    // TODO: native Madrid editor review
    commissionLabel: "Comisión total — totalmente negociable, se define al momento de listar",
    // TODO: native Madrid editor review
    breakdownHeading: "Desglose estimado",
    // TODO: native Madrid editor review
    rowSalePrice: "Precio de venta",
    // TODO: native Madrid editor review
    rowCommission: (commission: number) => `Comisión (${commission}%)`,
    // TODO: native Madrid editor review
    rowDocStamps: "Timbres documentales (est.)",
    // TODO: native Madrid editor review
    rowTitleClosing: "Título y costos de cierre (est.)",
    // TODO: native Madrid editor review
    rowPayoff: "Saldo de la hipoteca",
    // TODO: native Madrid editor review
    netLabel: "Ganancia neta estimada",
    // TODO: native Madrid editor review
    successOnItsWay: "En camino",
    // TODO: native Madrid editor review
    successBody: "Carlos se pondrá en contacto con su desglose por escrito. Mientras tanto, la hoja de ganancias completa de 2026 ya está disponible:",
    // TODO: native Madrid editor review
    downloadLabel: "Descargar la Hoja de Ganancias",
    // TODO: native Madrid editor review
    formIntro:
      "Reciba este desglose por escrito — además de las partidas que este modelo rápido no puede mostrar (prorrateos, estoppel de HOA, las tarifas exactas de su condado):",
    // TODO: native Madrid editor review
    namePlaceholder: "Su nombre",
    // TODO: native Madrid editor review
    nameAriaLabel: "Su nombre",
    // TODO: native Madrid editor review
    emailPlaceholder: "Correo electrónico",
    // TODO: native Madrid editor review
    emailAriaLabel: "Correo electrónico",
    // TODO: native Madrid editor review
    phonePlaceholder: "WhatsApp / teléfono (opcional)",
    // TODO: native Madrid editor review
    phoneAriaLabel: "WhatsApp o teléfono (opcional)",
    // TODO: native Madrid editor review
    errorMessage: "No se pudo enviar — inténtelo de nuevo.",
    // TODO: native Madrid editor review
    submitLabel: "Enviarme Mi Hoja de Ganancias",
    // TODO: native Madrid editor review
    submittingLabel: "Enviando…",
    // TODO: native Madrid editor review
    confidentialLine: "Confidencial · Sin compromiso de listado · Sin spam",
    // TODO: native Madrid editor review
    disclaimer:
      "Estimaciones solo para fines de planificación — no constituyen una garantía del precio de " +
      "venta, los costos o las ganancias. Las comisiones son totalmente negociables y no están " +
      "fijadas por ley. Las cifras de timbres documentales, título y cierre utilizan tasas típicas " +
      "de Florida; los montos reales varían según el condado, los términos del contrato y la " +
      "propiedad. Su hoja de ganancias por escrito se prepara según su situación específica.",
  },
} as const;

export function SellerNetCalculator({ sourcePage, lang = "en" }: { sourcePage: string; lang?: Lang }) {
  const t = COPY[lang];
  const [price, setPrice] = useState(750_000);
  const [payoff, setPayoff] = useState(0);
  const [commission, setCommission] = useState(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const rows = useMemo(() => {
    const commissionAmt = price * (commission / 100);
    const docStamps = price * DOC_STAMP_RATE;
    const titleClosing = price * TITLE_CLOSING_RATE;
    const net = price - commissionAmt - docStamps - titleClosing - payoff;
    return { commissionAmt, docStamps, titleClosing, net };
  }, [price, payoff, commission]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    const summary =
      `Net sheet request — est. value ${usd.format(price)}, payoff ${usd.format(payoff)}, ` +
      `commission ${commission}%, est. net ${usd.format(rows.net)}`;
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm({
          "form-name": "seller-consultation",
          "bot-field": "",
          name, email, phone, propertyAddress: "", city: "",
          timeline: "Exploring options",
          message: summary,
          source: "net-proceeds-calculator",
          sourcePage,
          ...getAttribution(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      notifyLeadDirect({ name, email, phone, message: summary, sourcePage, leadSource: getLeadSource() });
      trackLead("seller", { form: "net-proceeds-calculator", page: sourcePage, lang });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full border border-hairline bg-ivory px-4 py-3 font-sans text-base text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-gold/50";

  return (
    <section className="bg-white border-t border-hairline py-10 md:py-24" id="net-calculator">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center gap-2">
          <Calculator size={14} className="text-gold" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink">{t.eyebrow}</p>
        </div>
        <h2 className="mt-3 max-w-3xl font-serif text-2xl leading-tight text-navy-deep md:mt-5 md:text-4xl">
          {t.headline}
        </h2>
        <p className="mt-3 max-w-2xl font-sans text-sm leading-relaxed text-ink-primary/60 md:mt-4">
          {t.intro}
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-10 md:mt-10">
          {/* Controls */}
          <div className="space-y-5 md:space-y-7">
            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="calc-price" className="font-mono text-[10px] uppercase tracking-[0.22em] text-navy/70">
                  {t.priceLabel}
                </label>
                <span className="font-serif text-2xl text-navy-deep">{usd.format(price)}</span>
              </div>
              <input
                id="calc-price" type="range" min={200_000} max={5_000_000} step={25_000}
                value={price} onChange={(e) => setPrice(Number(e.target.value))}
                className="mt-3 w-full accent-[#B08D57]"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-navy/70">
                <span>{t.priceMin}</span><span>{t.priceMax}</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="calc-payoff" className="font-mono text-[10px] uppercase tracking-[0.22em] text-navy/70">
                  {t.payoffLabel}
                </label>
                <span className="font-serif text-2xl text-navy-deep">{usd.format(payoff)}</span>
              </div>
              <input
                id="calc-payoff" type="range" min={0} max={3_000_000} step={25_000}
                value={payoff} onChange={(e) => setPayoff(Number(e.target.value))}
                className="mt-3 w-full accent-[#B08D57]"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-navy/70">
                <span>{t.payoffMin}</span><span>{t.payoffMax}</span>
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] uppercase tracking-[0.22em] text-navy/70">
                {t.commissionLabel}
              </label>
              <div className="mt-3 flex gap-2">
                {COMMISSION_OPTIONS.map((c) => (
                  <button
                    key={c} type="button" onClick={() => setCommission(c)}
                    className={`flex-1 border px-3 py-2.5 font-mono text-[11px] tracking-[0.08em] transition-colors ${
                      commission === c
                        ? "border-gold bg-gold/10 text-navy-deep font-bold"
                        : "border-hairline bg-white text-navy/70 hover:border-gold/40"
                    }`}
                    aria-pressed={commission === c}
                  >
                    {c}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live breakdown */}
          <div className="border border-hairline bg-ivory p-5 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-ink">{t.breakdownHeading}</p>
            <dl className="mt-4 space-y-2 font-sans text-sm md:mt-5 md:space-y-3">
              {[
                [t.rowSalePrice, usd.format(price), false],
                [t.rowCommission(commission), `− ${usd.format(rows.commissionAmt)}`, false],
                [t.rowDocStamps, `− ${usd.format(rows.docStamps)}`, false],
                [t.rowTitleClosing, `− ${usd.format(rows.titleClosing)}`, false],
                [t.rowPayoff, `− ${usd.format(payoff)}`, false],
              ].map(([label, value]) => (
                <div key={label as string} className="flex items-baseline justify-between gap-4">
                  <dt className="text-navy/70">{label}</dt>
                  <dd className="font-mono text-[13px] text-navy-deep whitespace-nowrap">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 border-t border-gold/30 pt-3 flex items-baseline justify-between gap-4 md:mt-5 md:pt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-navy/70">{t.netLabel}</p>
              <p className="font-serif text-3xl text-navy-deep">{usd.format(Math.max(0, rows.net))}</p>
            </div>

            {/* Email gate */}
            {status === "success" ? (
              <div className="mt-4 border border-gold/30 bg-white p-4 md:mt-6 md:p-5">
                <p className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-gold-ink">
                  <CheckCircle2 size={13} /> {t.successOnItsWay}
                </p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-navy/65">
                  {t.successBody}
                </p>
                <a
                  href={LEAD_MAGNETS.sellerNetSheet.url}
                  download
                  className="mt-3 inline-flex items-center gap-2 bg-navy-deep px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90"
                >
                  {t.downloadLabel} <ArrowRight size={13} />
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 md:mt-6">
                <p className="font-sans text-[13px] leading-relaxed text-navy/65">
                  {t.formIntro}
                </p>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  <input
                    required type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder} autoComplete="name" aria-label={t.nameAriaLabel}
                    className={inputCls}
                  />
                  <input
                    required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder} autoComplete="email" inputMode="email" aria-label={t.emailAriaLabel}
                    className={inputCls}
                  />
                </div>
                <input
                  type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  placeholder={t.phonePlaceholder} autoComplete="tel" inputMode="tel" aria-label={t.phoneAriaLabel}
                  className={`${inputCls} mt-2.5`}
                />
                {status === "error" && (
                  <p className="mt-2 font-sans text-xs text-red-600/80">{t.errorMessage}</p>
                )}
                <button
                  type="submit" disabled={status === "submitting"}
                  className="mt-3 flex w-full items-center justify-center gap-2 bg-gold px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-navy-deep transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {status === "submitting"
                    ? <><Loader2 size={14} className="animate-spin" /> {t.submittingLabel}</>
                    : <>{t.submitLabel} <ArrowRight size={14} /></>}
                </button>
                <p className="mt-2.5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-navy/70">
                  <Lock size={9} className="text-gold-ink" /> {t.confidentialLine}
                </p>
              </form>
            )}
          </div>
        </div>

        <p className="mt-4 max-w-3xl font-sans text-[11px] leading-relaxed text-ink-primary/70 md:mt-6">
          {t.disclaimer}
        </p>
      </div>
    </section>
  );
}
