import { getStore } from "@netlify/blobs";

// ── Lead-alert de-duplication ────────────────────────────────────────────
// Two paths can alert Carlos about the same lead:
//   1. submission-created  — fired asynchronously by Netlify Forms.
//   2. lead-notify         — called synchronously by the form (a backup so a
//                            lead is never lost if Netlify drops or spam-files
//                            the submission).
// Whichever delivers an alert first writes a short-lived marker here; the other
// path checks it and skips its own alert so Carlos isn't notified twice for the
// same lead. The marker is only written when an alert actually reached Carlos
// (WhatsApp or email), so a failed backup never suppresses the primary path.

export const DEDUP_STORE = "lead-alert-dedup";

// How long two alerts for the same contact are treated as the same lead.
// A genuine new inquiry from the same person later still alerts.
const WINDOW_MS = 30 * 60 * 1000; // 30 minutes

/** Stable key for a lead: email if present, else digits of phone. */
export function dedupKey(email?: string, phone?: string): string | null {
  const e = (email || "").trim().toLowerCase();
  if (e.includes("@")) return "e:" + e;
  const p = (phone || "").replace(/\D/g, "");
  if (p.length >= 7) return "p:" + p;
  return null;
}

/** True if Carlos was already alerted about this lead within the window. */
export async function wasAlerted(key: string | null): Promise<boolean> {
  if (!key) return false;
  try {
    const v = (await getStore(DEDUP_STORE).get(key, { type: "json" })) as { at: string } | null;
    if (!v?.at) return false;
    return Date.now() - new Date(v.at).getTime() < WINDOW_MS;
  } catch {
    // On any storage error, fail open — better a possible duplicate than a miss.
    return false;
  }
}

/** Record that Carlos has been alerted about this lead. Non-fatal on error. */
export async function markAlerted(key: string | null): Promise<void> {
  if (!key) return;
  try {
    await getStore(DEDUP_STORE).setJSON(key, { at: new Date().toISOString() });
  } catch {
    /* non-fatal — dedup is best-effort */
  }
}
