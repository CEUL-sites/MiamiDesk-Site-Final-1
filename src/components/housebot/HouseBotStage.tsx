// The House Bot figure itself: poster first, WebGL swapped in when allowed.
//
// - Poster (housebot-poster.webp) is always rendered first and stays as the
//   fallback for mobile, prefers-reduced-motion, prerender, no-WebGL, and any
//   GLB load failure.
// - The three.js chunk is imported only after the window load event AND once
//   the figure is on screen (IntersectionObserver), so it never competes with
//   the hero headline/image for LCP.
// - Rendering pauses when off-screen or when the tab is hidden.

import { Component, Suspense, lazy, useEffect, useRef, useState, type ReactNode } from "react";
import {
  DESKTOP_MIN_WIDTH,
  HOUSEBOT_ASSETS,
  canLookAgain,
  lookDirectionFor,
  shouldAnimate2D,
  shouldRender3D,
  type LookDirection,
} from "./houseBotModel";

const HouseBotCanvas = lazy(() => import("./HouseBotCanvas"));

type BoundaryProps = { children: ReactNode; onError: () => void };

class CanvasErrorBoundary extends Component<BoundaryProps, { failed: boolean }> {
  declare readonly props: BoundaryProps;
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/** False under the Node test harness (mock window, no document) and very old browsers. */
function hasDom(): boolean {
  return typeof document !== "undefined" && typeof window.addEventListener === "function";
}

function detectWebGL(): boolean {
  if (!hasDom()) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Resolves after first paint: the load event, then an idle slot. */
function afterFirstPaint(cb: () => void): () => void {
  if (!hasDom()) return () => {};
  let cancelled = false;
  let idleId: number | undefined;
  const run = () => {
    if (cancelled) return;
    const ric = (window as Window & { requestIdleCallback?: (fn: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) idleId = ric(() => !cancelled && cb(), { timeout: 2000 });
    else idleId = window.setTimeout(() => !cancelled && cb(), 300);
  };
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener("load", run);
    const cic = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback;
    if (idleId !== undefined) {
      if (cic) cic(idleId);
      window.clearTimeout(idleId);
    }
  };
}

function useMedia(query: string, initial = false): boolean {
  const [match, setMatch] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(query);
    setMatch(mq.matches);
    const on = () => setMatch(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

export interface HouseBotStageProps {
  mode: "hero" | "dock";
  /** Pixel size of the square figure. */
  size: number;
  /** Fired when the poster image fails (assets missing) — the caller hides the bot. */
  onUnavailable?: () => void;
  /** Increment to play the Greet wave (3D clip or rendered image). */
  greetSignal?: number;
  /** Increment to play Present — the lean toward a section or CTA. */
  presentSignal?: number;
}

// The Greet image is fetched once and replayed from a fresh blob URL each
// time: a new URL restarts the animation from frame 0 without re-downloading.
let greetBuffer: Promise<Blob | null> | null = null;
const loadGreet = () =>
  (greetBuffer ??= fetch(HOUSEBOT_ASSETS.greet2D)
    .then((r) => (r.ok ? r.blob() : null))
    .catch(() => null));
const GREET_MS = 2000;

export function HouseBotStage({ mode, size, onUnavailable, greetSignal = 0, presentSignal = 0 }: HouseBotStageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);
  const reducedMotion = useMedia("(prefers-reduced-motion: reduce)", true);
  const [painted, setPainted] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [allow3D, setAllow3D] = useState(false);
  const [mounted3D, setMounted3D] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [nodSignal, setNodSignal] = useState(0);
  const [look, setLook] = useState<{ dir: LookDirection; n: number } | null>(null);
  const lastLookAt = useRef<number | null>(null);
  const [animate2D, setAnimate2D] = useState(false);
  const [src2D, setSrc2D] = useState<string>(HOUSEBOT_ASSETS.poster);

  useEffect(() => {
    const env = {
      desktop,
      reducedMotion,
      automated: typeof navigator !== "undefined" && navigator.webdriver === true,
      webgl: detectWebGL(),
    };
    setAllow3D(shouldRender3D(env));
    setAnimate2D(shouldAnimate2D(env));
  }, [desktop, reducedMotion]);

  // Phones / no-WebGL: swap the poster for the rendered Idle loop once the
  // page has painted and the bot is on screen.
  useEffect(() => {
    if (animate2D && painted && inView && src2D === HOUSEBOT_ASSETS.poster) setSrc2D(HOUSEBOT_ASSETS.idle2D);
    if (!animate2D && src2D !== HOUSEBOT_ASSETS.poster) setSrc2D(HOUSEBOT_ASSETS.poster);
  }, [animate2D, painted, inView, src2D]);

  // Greet / Present on the rendered-image path both play the wave.
  const gesture2D = greetSignal + presentSignal;
  useEffect(() => {
    if (!gesture2D || !animate2D) return;
    let url: string | null = null;
    let timer = 0;
    let cancelled = false;
    void loadGreet().then((blob) => {
      if (cancelled || !blob) return;
      url = URL.createObjectURL(blob);
      setSrc2D(url);
      timer = window.setTimeout(() => setSrc2D(HOUSEBOT_ASSETS.idle2D), GREET_MS);
    });
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (url) window.setTimeout(() => URL.revokeObjectURL(url as string), GREET_MS);
    };
  }, [gesture2D, animate2D]);

  useEffect(() => afterFirstPaint(() => setPainted(true)), []);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!hasDom()) return;
    const on = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", on);
    return () => document.removeEventListener("visibilitychange", on);
  }, []);

  // Mount the canvas the first time all gates pass; keep it mounted after
  // (paused via frameloop) so scrolling back does not re-greet or re-parse.
  useEffect(() => {
    if (allow3D && painted && inView && !failed) setMounted3D(true);
  }, [allow3D, painted, inView, failed]);

  // Look_Left / Look_Right when the cursor is far to one side (hero only).
  useEffect(() => {
    if (!mounted3D || mode !== "hero" || !hasDom()) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (e.clientY < r.top - 400 || e.clientY > r.bottom + 400) return;
        const dir = lookDirectionFor(e.clientX, r.left, r.right);
        const now = performance.now();
        if (dir && canLookAgain(now, lastLookAt.current)) {
          lastLookAt.current = now;
          setLook((prev) => ({ dir, n: (prev?.n ?? 0) + 1 }));
        }
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mounted3D, mode]);

  const show3D = mounted3D && !failed;

  return (
    <div
      ref={ref}
      className="relative"
      style={{ width: size, height: size }}
      onMouseEnter={() => show3D && setNodSignal((n) => n + 1)}
    >
      <img
        src={src2D}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => (src2D === HOUSEBOT_ASSETS.poster ? onUnavailable?.() : setSrc2D(HOUSEBOT_ASSETS.poster))}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
          show3D && ready ? "opacity-0" : "opacity-100"
        }`}
      />
      {show3D && (
        <div className={`absolute inset-0 transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}>
          <CanvasErrorBoundary onError={() => setFailed(true)}>
            <Suspense fallback={null}>
              <HouseBotCanvas
                mode={mode}
                active={inView && tabVisible}
                nodSignal={nodSignal}
                // The hero canvas runs its own Greet → Present intro.
                greetSignal={mode === "dock" ? greetSignal : 0}
                presentSignal={mode === "dock" ? presentSignal : 0}
                look={look}
                onReady={() => setReady(true)}
              />
            </Suspense>
          </CanvasErrorBoundary>
        </div>
      )}
    </div>
  );
}
