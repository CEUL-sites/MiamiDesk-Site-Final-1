// Conservative display limit: one hour below SEFMLS's 12-hour refresh standard.
// Retrieval time is distinct from a listing's ModificationTimestamp.
export const MLS_MAX_DISPLAY_AGE_MS = 11 * 60 * 60 * 1000;
export const MLS_BROWSER_REFRESH_MS = 30 * 60 * 1000;

export function mlsAge(timestamp: unknown, now = Date.now()): number | null {
  if (typeof timestamp !== 'string') return null;
  const age = now - Date.parse(timestamp);
  return Number.isFinite(age) && age >= 0 ? age : null;
}
export function isMlsFresh(timestamp: unknown, now = Date.now()): boolean {
  const age = mlsAge(timestamp, now);
  return age !== null && age < MLS_MAX_DISPLAY_AGE_MS;
}
export function mlsCacheControl(timestamp: unknown, now = Date.now(), maxSeconds = 3600): string {
  const age = mlsAge(timestamp, now);
  if (age === null || age >= MLS_MAX_DISPLAY_AGE_MS) return 'no-store';
  const seconds = Math.max(0, Math.min(maxSeconds, Math.floor((MLS_MAX_DISPLAY_AGE_MS - age) / 1000)));
  return `public, max-age=${seconds}, must-revalidate`;
}
