import { useEffect, useRef, type ReactNode } from "react";

/* Pointer-tracked 3D tilt wrapper for hero cards and stat strips.
 * Adds a subtle perspective rotation toward the cursor plus a moving gold
 * sheen, so flat panels read as physical objects. Interaction only engages
 * on fine-pointer devices without reduced-motion — on touch / reduced-motion
 * it renders as a plain static wrapper, and it is inert during prerender. */

const MAX_TILT_DEG = 5;
const LERP = 0.12;

export function Tilt3D({
  children,
  className = "",
  maxTilt = MAX_TILT_DEG,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const sheen = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = outer.current;
    const card = inner.current;
    const glow = sheen.current;
    if (!el || !card) return;
    if (typeof window.matchMedia !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    // target and smoothed rotation, normalized -1..1
    let tx = 0, ty = 0, sx = 0, sy = 0;
    let hovering = false;
    let raf = 0;
    let running = false;

    function frame() {
      sx += (tx - sx) * LERP;
      sy += (ty - sy) * LERP;
      card!.style.transform =
        `perspective(900px) rotateX(${(-sy * maxTilt).toFixed(3)}deg) rotateY(${(sx * maxTilt).toFixed(3)}deg)`;
      if (glow) {
        glow.style.opacity = hovering ? "1" : "0";
        glow.style.backgroundPosition = `${(50 + sx * 40).toFixed(2)}% ${(50 + sy * 40).toFixed(2)}%`;
      }
      // settle and stop the loop once the card is back at rest
      if (!hovering && Math.abs(sx) < 0.001 && Math.abs(sy) < 0.001) {
        card!.style.transform = "";
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    }
    function ensureLoop() {
      if (!running) { running = true; raf = requestAnimationFrame(frame); }
    }
    function onMove(e: PointerEvent) {
      const r = el!.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
      hovering = true;
      ensureLoop();
    }
    function onLeave() {
      tx = 0; ty = 0;
      hovering = false;
      ensureLoop();
    }

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [maxTilt]);

  return (
    <div ref={outer} className={className} style={{ perspective: "900px" }}>
      <div ref={inner} className="relative will-change-transform" style={{ transformStyle: "preserve-3d" }}>
        {children}
        <div
          ref={sheen}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0,
            transition: "opacity 0.5s ease",
            mixBlendMode: "screen",
            background:
              "radial-gradient(120% 90% at 50% 50%, rgba(176,141,87,0.14) 0%, rgba(255,255,255,0.05) 35%, transparent 70%)",
            backgroundSize: "160% 160%",
            backgroundPosition: "50% 50%",
          }}
        />
      </div>
    </div>
  );
}
