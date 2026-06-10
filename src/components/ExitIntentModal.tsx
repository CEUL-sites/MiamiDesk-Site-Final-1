import { useEffect, useState, type FormEvent } from "react";
import { CheckCircle2, Download, FileText, Loader2, X } from "lucide-react";
import { LEAD_MAGNETS } from "../constants";
import { pushEvent } from "../lib/analytics";

// Exit-intent capture — desktop only, once per session, deliberately quiet.
// When the cursor leaves through the top of the viewport (closing/leaving),
// offer the Seller's Net Sheet in exchange for an email. Arms only after a
// 12s dwell so quick bounces and accidental moves never see it.

const SHOWN_KEY = "hp_exit_intent_shown";
const ARM_DELAY_MS = 12_000;

const encodeForm = (data: Record<string, string>) => new URLSearchParams(data).toString();

export function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SHOWN_KEY) === "1") return;
    } catch { return; }
    // Touch-primary devices have no exit-intent signal — skip entirely
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let armed = false;
    const armTimer = window.setTimeout(() => { armed = true; }, ARM_DELAY_MS);

    const onMouseOut = (e: MouseEvent) => {
      if (!armed || e.relatedTarget || e.clientY > 0) return;
      try { sessionStorage.setItem(SHOWN_KEY, "1"); } catch { /* private mode */ }
      setOpen(true);
      pushEvent("exit_intent_shown", { offer: "seller-net-sheet" });
      document.removeEventListener("mouseout", onMouseOut);
    };
    document.addEventListener("mouseout", onMouseOut);
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

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
          guide: "seller-net-sheet-2026-exit-intent",
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      pushEvent("exit_intent_capture", { offer: "seller-net-sheet" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] hidden items-center justify-center bg-navy-deep/70 backdrop-blur-sm lg:flex"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Free Seller's Net Sheet"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md border border-gold/30 bg-white shadow-2xl shadow-black/50"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-3 top-3 p-1.5 text-navy/35 transition-colors hover:text-navy"
        >
          <X size={16} />
        </button>

        <div className="border-b border-bone bg-navy-deep px-8 py-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-gold">Before you go</p>
          <h3 className="mt-2 font-serif text-2xl leading-snug text-white">
            Know what you'd actually keep.
          </h3>
        </div>

        <div className="p-8">
          {status === "success" ? (
            <div className="flex flex-col items-start gap-4">
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
            </div>
          ) : (
            <>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-gold/30 bg-gold/8">
                  <FileText size={18} className="text-gold" />
                </div>
                <p className="font-sans text-sm leading-relaxed text-navy/65">
                  The free <strong className="text-navy">{LEAD_MAGNETS.sellerNetSheet.title}</strong> —
                  commissions, taxes, and closing costs, line by line.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full border border-hairline bg-ivory px-4 py-3 font-sans text-sm text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-gold/50"
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
                    : <><Download size={13} /> Send Me the Free Guide</>}
                </button>
              </form>
              <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.12em] text-navy/35">
                One email. No subscription. No listing commitment.
              </p>
              <a href="/home-value" className="mt-4 inline-block font-sans text-xs text-gold underline underline-offset-2 hover:text-navy">
                Or get a free home valuation instead →
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
