import { getStore } from "@netlify/blobs";

// ── Lead dead-letter store ──────────────────────────────────────────────
// When every alert channel (Google Sheets + email + WhatsApp) fails for a
// lead, both notification paths (submission-created and lead-notify) would
// otherwise leave that lead's data only in the function invocation logs,
// where it's easy to miss and awkward to recover. Before giving up, each
// path stores the full lead payload here so it's recoverable from the
// Netlify Blobs UI (or `netlify blobs:get`) instead of being lost.

export const DEAD_LETTER_STORE = "lead-dead-letter";

/** Persist a lead that could not be delivered through any alert channel. Never throws. */
export async function storeDeadLetter(source: string, lead: Record<string, unknown>): Promise<void> {
  try {
    const at = new Date().toISOString();
    const key = `${at}|${source}`;
    await getStore(DEAD_LETTER_STORE).setJSON(key, { source, lead, at });
  } catch (err) {
    console.error("storeDeadLetter failed:", err instanceof Error ? err.message : err);
  }
}
