// Shared Google Places loader — used by HeroSellerForm and SellerIntakeForm.
// Loads the Maps JS API once; callers attach their own Autocomplete instances.

declare global {
  interface Window {
    google: typeof google;
    initGooglePlaces?: () => void;
    gm_authFailure?: () => void;
  }
}

export const MAPS_KEY = (import.meta.env as Record<string, string>)["VITE_GOOGLE_MAPS_KEY"] ?? "";

const callbacks: (() => void)[] = [];
const failureCallbacks: (() => void)[] = [];
let placesUnavailable = false;

function failPlacesLoad() {
  placesUnavailable = true;
  callbacks.length = 0;
  while (failureCallbacks.length) failureCallbacks.shift()?.();
}

export function loadGooglePlaces(onReady: () => void, onFailure?: () => void) {
  if (window.google?.maps?.places) { onReady(); return; }
  if (!MAPS_KEY) return; // no key — plain input fallback
  if (placesUnavailable) { onFailure?.(); return; }
  callbacks.push(onReady);
  if (onFailure) failureCallbacks.push(onFailure);
  if (document.getElementById("gm-places-script")) return; // already loading
  window.initGooglePlaces = () => {
    while (callbacks.length) callbacks.shift()?.();
  };
  window.gm_authFailure = failPlacesLoad;
  const s = document.createElement("script");
  s.id = "gm-places-script";
  s.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&libraries=places&loading=async&callback=initGooglePlaces`;
  s.async = true;
  s.defer = true;
  s.onerror = failPlacesLoad;
  document.head.appendChild(s);
}
