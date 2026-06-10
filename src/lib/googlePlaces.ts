// Shared Google Places loader — used by HeroSellerForm and SellerIntakeForm.
// Loads the Maps JS API once; callers attach their own Autocomplete instances.

declare global {
  interface Window {
    google: typeof google;
    initGooglePlaces?: () => void;
  }
}

export const MAPS_KEY = (import.meta.env as Record<string, string>)["VITE_GOOGLE_MAPS_KEY"] ?? "";

const callbacks: (() => void)[] = [];

export function loadGooglePlaces(onReady: () => void) {
  if (window.google?.maps?.places) { onReady(); return; }
  if (!MAPS_KEY) return; // no key — plain input fallback
  callbacks.push(onReady);
  if (document.getElementById("gm-places-script")) return; // already loading
  window.initGooglePlaces = () => {
    while (callbacks.length) callbacks.shift()?.();
  };
  const s = document.createElement("script");
  s.id = "gm-places-script";
  s.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&libraries=places&loading=async&callback=initGooglePlaces`;
  s.async = true;
  s.defer = true;
  document.head.appendChild(s);
}
