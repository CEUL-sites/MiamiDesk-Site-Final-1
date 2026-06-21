import { useState, type FormEvent } from "react";
import { Download, ArrowRight, Loader2, CheckCircle2, FileText } from "lucide-react";
import { LEAD_MAGNETS } from "../constants";
import { trackFunnelEvent } from "../lib/analytics";

const encodeForm = (data: Record<string, string>) => new URLSearchParams(data).toString();

export function LeadMagnetStrip() {
  const [email, setEmail]   = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

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
          email,
          guide: "seller-net-sheet-2026",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      // Deliver the guide by email so the lead keeps it even without clicking
      // the on-page download, and gets a branded, down-funnel touch.
      fetch("/.netlify/functions/lead-acknowledgment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formName: "lead-magnet-download", email, guide: "seller-net-sheet-2026" }),
      }).catch(() => {});
      trackFunnelEvent("net_sheet_download", { gate: "email" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-ivory border-t border-b border-gold/15 py-14 md:py-20">
      {/* Netlify form detection */}
      <form name="lead-magnet-download" data-netlify="true" netlify-honeypot="bot-field" hidden>
        <input name="email" type="email" />
        <input name="guide" type="hidden" />
        <p aria-hidden="true"><label>Do not fill: <input name="bot-field" /></label></p>
      </form>

      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-2">Free Resources</p>
        <h2 className="font-serif text-3xl leading-tight text-navy-deep md:text-4xl max-w-2xl">
          Know your numbers before you list.
        </h2>
        <p className="mt-3 font-sans text-base text-ink-primary/60 max-w-xl">
          Two professional guides — for sellers reviewing net proceeds and for buyers evaluating the South Florida market.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">

          {/* ── Primary: Seller's Net Sheet — email-gated ───────── */}
          <div className="border border-gold/35 bg-white p-7 flex flex-col">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center border border-gold/30 bg-gold/8">
                <FileText size={18} className="text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold">Seller Guide · Free</p>
                <h3 className="mt-1 font-serif text-xl leading-snug text-navy-deep">
                  {LEAD_MAGNETS.sellerNetSheet.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink-primary/60">
                  {LEAD_MAGNETS.sellerNetSheet.description}
                </p>
              </div>
            </div>

            <div className="mt-6 flex-1 flex flex-col justify-end">
              {status === "success" ? (
                <div className="flex flex-col items-start gap-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-gold">
                    <CheckCircle2 size={13} /> Ready to download
                  </span>
                  <a
                    href={LEAD_MAGNETS.sellerNetSheet.url}
                    download
                    className="inline-flex items-center gap-2 bg-gold px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-navy-deep transition-opacity hover:opacity-90"
                  >
                    <Download size={13} />
                    Download Net Sheet
                  </a>
                  <p className="font-sans text-xs text-ink-primary/55">
                    We've emailed you a copy too. Want numbers for your specific property?{" "}
                    <a href="/home-value" className="text-gold underline underline-offset-2 hover:text-navy-deep">
                      Get a free home valuation →
                    </a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input type="hidden" name="form-name" value="lead-magnet-download" />
                  <input type="hidden" name="guide"     value="seller-net-sheet-2026" />
                  <p aria-hidden="true" className="hidden">
                    <label>Do not fill: <input name="bot-field" /></label>
                  </p>
                  <input
                    required
                    type="email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    autoComplete="email"
                    inputMode="email"
                    className="w-full border border-hairline bg-ivory px-4 py-3 font-sans text-base text-ink-primary placeholder:text-ink-primary/35 outline-none transition-colors focus:border-gold/50"
                    aria-label="Email address to receive the guide"
                  />
                  {status === "error" && (
                    <p className="font-sans text-xs text-red-600/80">Could not send — please try again.</p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex items-center justify-center gap-2 bg-navy-deep px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {status === "submitting"
                      ? <><Loader2 size={13} className="animate-spin" /> Sending…</>
                      : <><Download size={13} /> Get the Free Guide <ArrowRight size={13} /></>}
                  </button>
                  <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink-primary/35">
                    One email. No subscription. No listing commitment.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* ── Secondary: Buyer Brief — direct download ─────────── */}
          <div className="border border-hairline bg-white p-7 flex flex-col">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center border border-white/20 bg-navy/5">
                <FileText size={18} className="text-navy/50" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-primary/40">Buyer Guide · Free</p>
                <h3 className="mt-1 font-serif text-xl leading-snug text-navy-deep">
                  {LEAD_MAGNETS.buyerBrief.title}
                </h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-ink-primary/60">
                  {LEAD_MAGNETS.buyerBrief.description}
                </p>
              </div>
            </div>

            <div className="mt-6 flex-1 flex flex-col justify-end">
              <a
                href={LEAD_MAGNETS.buyerBrief.url}
                download
                className="inline-flex items-center gap-2 border border-navy/25 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-navy-deep transition-colors hover:border-gold hover:text-gold"
              >
                <Download size={13} />
                Download Buyer Brief
              </a>
              <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.12em] text-ink-primary/35">
                No form required. Direct download.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
