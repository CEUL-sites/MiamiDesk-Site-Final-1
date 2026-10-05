import { MLS_BROWSER_REFRESH_MS } from './mlsFreshness';

export function isMlsPrerender(): boolean {
  return typeof navigator !== 'undefined' && /ReactSnap|HeadlessChrome/i.test(navigator.userAgent);
}

// One request per 30 minutes only while visible. On returning to a sleeping
// tab, clear the old inventory before requesting new data. No static IDX cards
// are baked into build-time HTML.
export function watchMlsRefresh(refresh: () => void, clear: () => void, env = {
  document,
  window,
  setInterval: window.setInterval.bind(window),
  clearInterval: window.clearInterval.bind(window),
}) {
  const update = () => {
    if (env.document.visibilityState !== 'visible') return;
    clear();
    refresh();
  };
  const timer = env.setInterval(update, MLS_BROWSER_REFRESH_MS);
  env.document.addEventListener('visibilitychange', update);
  env.window.addEventListener('pageshow', update);
  return () => {
    env.clearInterval(timer);
    env.document.removeEventListener('visibilitychange', update);
    env.window.removeEventListener('pageshow', update);
  };
}

// AbortController supports older Safari versions as well as modern browsers.
export async function fetchMls(url: string): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try { return await fetch(url, { signal: controller.signal }); }
  finally { clearTimeout(timer); }
}
