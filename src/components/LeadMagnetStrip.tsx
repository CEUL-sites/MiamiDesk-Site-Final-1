import { useId, useRef, useState, type FormEvent } from "react";
import { Download, ArrowRight, Loader2, CheckCircle2, FileText } from "lucide-react";
import { LEAD_MAGNETS } from "../constants";
import { trackFunnelEvent } from "../lib/analytics";

const encodeForm = (data: Record<string, string>) => new URLSearchParams(data).toString();

type GateVariant = "primary" | "secondary";

interface MagnetGateProps {
  /** Stable guide id sent to the pipeline + analytics (e.g. "seller-net-sheet-2026"). */
  guide: string;
  /** Lead language tag for nurture routing. */
  language: "en" | "es";
  /** PDF path delivered on success. */
  downloadUrl: string;
  /** Heading + body copy. */
  title: string;
  description: string;
  eyebrow: string;
  variant: GateVariant;
  /** Optional analytics event fired in addition to the generic download_guide. */
  legacyEvent?: string;
}

/**
 * Email-gated lead-magnet card. Both magnets are gated so every PDF download
 * leaves a contactable lead tagged by magnet + language. On submit we (1) post
 * to the Netlify form (→ submission-created → Sheets/email/WhatsApp/nurture)
 * and (2) fire-and-forget the lead-acknowledgment function which emails the PDF
 * immediately. The on-page download link is revealed as a convenience.
 */
function MagnetGate({ guide, language, downloadUrl, title, description, eyebrow, variant, legacyEvent }: MagnetGateProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const emailId = useId();
  const statusId = useId();
  const renderedAt = useRef(Date.now());

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm({
          "form-name": "lead-magnet-download",
          "bot-field": "",
          formRenderedAt: String(renderedAt.current),
          email,
          guide,
          language,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      // Deliver the guide by email so the lead keeps it even without clicking
      // the on-page download, and gets a branded, down-funnel touch.
      fetch("/.netlify/functions/lead-acknowledgment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formName: "lead-magnet-download", email, guide, language }),
      }).catch(() => {});
      trackFunnelEvent("download_guide", { guide, language });
      if (legacyEvent) trackFunnelEvent(legacyEvent, { gate: "email" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const isPrimary = variant === "primary";
  const cardBorder = isPrimary ? "border-gold/35" : "border-hairline";
  const iconWrap = isPrimary ? "border-gold/30 bg-gold/8" : "border-navy/15 bg-navy/5";
  const iconColor = isPrimary ? "text-gold" : "text-navy/50";
  const eyebrowColor = isPrimary ? "text-gold-ink" : "text-ink-primary/70";
  const submitBtn = isPrimary
    ? "bg-navy-deep text-white hover:opacity-90"
    : "bg-white text-navy-deep border border-navy/25 hover:border-gold hover:text-gold";
  const downloadBtn = isPrimary
    ? "bg-gold text-navy-deep hover:opacity-90"
    : "border border-navy/25 text-navy-deep hover:border-gold hover:text-gold";

  return (
    <div className={`border ${cardBorder} bg-white p-5 flex flex-col md:p-7`}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 flex h-10 w-10 items-center justify-center border ${iconWrap}`}>
          <FileText size={18} className={iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${eyebrowColor}`}>{eyebrow}</p>
          <h3 className="mt-1 font-serif text-xl leading-snug text-navy-deep">{title}</h3>
          <p className="mt-2 font-sans text-sm leading-relaxed text-ink-primary/60">{description}</p>
        </div>
      </div>

      <div className="mt-4 flex-1 flex flex-col justify-end md:mt-6">
        {status === "success" ? (
          <div className="flex flex-col items-start gap-3" role="status" aria-live="polite">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-ink">
              <CheckCircle2 size={13} /> Ready to download
            </span>
            <a
              href={downloadUrl}
              download
              className={`inline-flex items-center gap-2 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors ${downloadBtn}`}
            >
              <Download size={13} />
              Download guide
            </a>
            <p className="font-sans text-xs text-ink-primary/70">
              We have emailed you a copy as well. Want numbers for your specific property?{" "}
              <a href="/home-value" className="text-gold-ink underline underline-offset-2 hover:text-navy-deep">
                Request a free home valuation
              </a>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor={emailId} className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-primary/70">
              Email address
            </label>
            <input
              required
              id={emailId}
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              autoComplete="email"
              inputMode="email"
              aria-describedby={status === "error" ? statusId : undefined}
              className="w-full border border-hairline bg-ivory px-4 py-3 font-sans text-base text-ink-primary placeholder:text-ink-primary/70 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/40"
            />
            <p id={statusId} role="status" aria-live="polite" className="min-h-0">
              {status === "error" && (
                <span className="font-sans text-xs text-red-700">Could not send — please try again.</span>
              )}
            </p>
            <button
              type="submit"
              disabled={status === "submitting"}
              className={`flex items-center justify-center gap-2 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] transition-opacity disabled:opacity-60 ${submitBtn}`}
            >
              {status === "submitting"
                ? <><Loader2 size={13} className="animate-spin" /> Sending…</>
                : <><Download size={13} /> Get the free guide <ArrowRight size={13} /></>}
            </button>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-primary/70">
              One email. No subscription. No listing commitment.
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-primary/70">
              Florida Licensed Realtor® SL705771 · United Realty Group · Equal Housing Opportunity
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export function LeadMagnetStrip() {
  return (
    <section className="bg-ivory border-t border-b border-gold/15 py-8 md:py-20">
      {/* Netlify form detection (build-time) — a single definition covers both
          magnets since `guide` distinguishes them. */}
      <form name="lead-magnet-download" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input name="formRenderedAt" type="hidden" />
        <input name="email" type="email" />
        <input name="guide" type="hidden" />
        <input name="language" type="hidden" />
        <p hidden><label>Do not fill: <input name="bot-field" /></label></p>
      </form>

      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold-ink mb-2">Free Resources</p>
        <h2 className="font-serif text-3xl leading-tight text-navy-deep md:text-4xl max-w-2xl">
          Know your numbers before you list.
        </h2>
        <p className="mt-3 font-sans text-base text-ink-primary/70 max-w-xl">
          Two professional guides — for sellers reviewing net proceeds and for buyers evaluating the South Florida market.
        </p>

        <div className="mt-6 grid gap-4 md:mt-10 md:grid-cols-2 md:gap-6">
          <MagnetGate
            variant="primary"
            guide="seller-net-sheet-2026"
            language="en"
            downloadUrl={LEAD_MAGNETS.sellerNetSheet.url}
            eyebrow="Seller Guide · Free"
            title={LEAD_MAGNETS.sellerNetSheet.title}
            description={LEAD_MAGNETS.sellerNetSheet.description}
            legacyEvent="net_sheet_download"
          />
          <MagnetGate
            variant="secondary"
            guide="buyer-brief-q3-2026"
            language="en"
            downloadUrl={LEAD_MAGNETS.buyerBrief.url}
            eyebrow="Buyer Guide · Free"
            title={LEAD_MAGNETS.buyerBrief.title}
            description={LEAD_MAGNETS.buyerBrief.description}
          />
        </div>
      </div>
    </section>
  );
}
