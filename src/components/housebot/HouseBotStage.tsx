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
}

export function HouseBotStage({ mode, size, onUnavailable }: HouseBotStageProps) {
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

  useEffect(() => {
    setAllow3D(
      shouldRender3D({
        desktop,
        reducedMotion,
        automated: typeof navigator !== "undefined" && navigator.webdriver === true,
        webgl: detectWebGL(),
      }),
    );
  }, [desktop, reducedMotion]);

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
        src={HOUSEBOT_ASSETS.poster}
        alt=""
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => onUnavailable?.()}
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
