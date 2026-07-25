import { useEffect, useRef, type CSSProperties } from "react";

/* Aurora blob background for dark sections.
 * CSS-only by default. Pass `interactive` on page heroes to add the same
 * cursor-following spotlight + gentle blob parallax the home hero uses —
 * guarded to fine-pointer devices without reduced-motion, inert elsewhere.
 * Usage: first child inside any `relative overflow-hidden` dark section. */

const KEYFRAMES = `
@keyframes ab1 {
  0%,100% { transform: translate(0,0) scale(1); }
  33%  { transform: translate(3vw,-4vh) scale(1.07); }
  66%  { transform: translate(-2vw,3vh) scale(0.95); }
}
@keyframes ab2 {
  0%,100% { transform: translate(0,0) scale(1); }
  40%  { transform: translate(-4vw,3vh) scale(1.09); }
  70%  { transform: translate(2vw,-3vh) scale(0.96); }
}
@keyframes ab3 {
  0%,100% { transform: translate(0,0) scale(1); }
  25%  { transform: translate(2vw,-3vh) scale(1.06); }
  60%  { transform: translate(-3vw,2vh) scale(0.94); }
}
@media (prefers-reduced-motion: reduce) {
  .aurora-blob { animation: none !important; }
}
`;

type Variant = "default" | "subtle" | "warm";

const CONFIGS: Record<Variant, {
  blobs: { style: CSSProperties; anim: string }[];
}> = {
  default: {
    blobs: [
      {
        style: {
          width: "70vw", height: "70vw", top: "-20%", left: "-15%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(22,68,158,0.58) 0%, rgba(22,68,158,0.18) 50%, transparent 72%)",
          filter: "blur(72px)",
          animation: "ab1 26s ease-in-out infinite",
        },
        anim: "",
      },
      {
        style: {
          width: "55vw", height: "55vw", bottom: "-18%", right: "-12%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(14,48,128,0.62) 0%, rgba(8,30,80,0.22) 50%, transparent 72%)",
          filter: "blur(90px)",
          animation: "ab2 32s ease-in-out infinite",
        },
        anim: "",
      },
      {
        style: {
          width: "44vw", height: "44vw", bottom: "-10%", left: "20%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(176,105,28,0.28) 0%, rgba(176,141,87,0.08) 52%, transparent 72%)",
          filter: "blur(100px)",
          animation: "ab3 38s ease-in-out infinite",
        },
        anim: "",
      },
    ],
  },
  subtle: {
    blobs: [
      {
        style: {
          width: "65vw", height: "65vw", top: "-25%", left: "-20%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(22,68,158,0.32) 0%, rgba(22,68,158,0.09) 55%, transparent 75%)",
          filter: "blur(80px)",
          animation: "ab1 30s ease-in-out infinite",
        },
        anim: "",
      },
      {
        style: {
          width: "50vw", height: "50vw", bottom: "-20%", right: "-15%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(14,48,128,0.36) 0%, rgba(8,30,80,0.10) 55%, transparent 75%)",
          filter: "blur(100px)",
          animation: "ab2 36s ease-in-out infinite",
        },
        anim: "",
      },
      {
        style: {
          width: "38vw", height: "38vw", top: "20%", right: "5%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(176,141,87,0.14) 0%, rgba(176,141,87,0.04) 55%, transparent 75%)",
          filter: "blur(110px)",
          animation: "ab3 42s ease-in-out infinite",
        },
        anim: "",
      },
    ],
  },
  warm: {
    blobs: [
      {
        style: {
          width: "72vw", height: "72vw", top: "-22%", left: "-18%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(22,68,158,0.48) 0%, rgba(22,68,158,0.14) 50%, transparent 72%)",
          filter: "blur(72px)",
          animation: "ab1 28s ease-in-out infinite",
        },
        anim: "",
      },
      {
        style: {
          width: "58vw", height: "58vw", bottom: "-15%", right: "-10%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(176,105,28,0.44) 0%, rgba(176,141,87,0.14) 48%, transparent 70%)",
          filter: "blur(88px)",
          animation: "ab2 34s ease-in-out infinite",
        },
        anim: "",
      },
      {
        style: {
          width: "46vw", height: "46vw", top: "10%", right: "15%",
          background: "radial-gradient(ellipse at 50% 50%, rgba(14,48,128,0.50) 0%, rgba(8,30,80,0.16) 52%, transparent 72%)",
          filter: "blur(95px)",
          animation: "ab3 40s ease-in-out infinite",
        },
        anim: "",
      },
    ],
  },
};

// Parallax depth per blob slot when `interactive` — matches the home hero's
// range so sub-page heroes feel like the same physical space.
const DEPTHS = [18, -12, 24];

export function AuroraBackground({
  variant = "default",
  interactive = false,
}: {
  variant?: Variant;
  interactive?: boolean;
}) {
  const { blobs } = CONFIGS[variant];
  const rootRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive) return;
    const root = rootRef.current;
    const spot = spotRef.current;
    if (!root || typeof window.matchMedia !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const els: HTMLDivElement[] = Array.from(root.querySelectorAll(".aurora-blob"));
    let tx = 0.5, ty = 0.4;          // raw cursor, normalized to the section
    let sx = 0.5, sy = 0.4;          // smoothed spotlight position
    const cx = new Array(els.length).fill(0);
    const cy = new Array(els.length).fill(0);
    let active = false;
    let raf = 0;

    function onMove(e: MouseEvent) {
      const r = root!.getBoundingClientRect();
      tx = (e.clientX - r.left) / Math.max(r.width, 1);
      ty = (e.clientY - r.top) / Math.max(r.height, 1);
      active = ty >= -0.1 && ty <= 1.1;   // fade the spotlight once the cursor leaves the section
    }
    function onLeave() { active = false; }

    function tick() {
      sx += (tx - sx) * 0.12;
      sy += (ty - sy) * 0.12;
      if (spot) {
        spot.style.setProperty("--mx", `${(sx * 100).toFixed(2)}%`);
        spot.style.setProperty("--my", `${(sy * 100).toFixed(2)}%`);
        spot.style.opacity = active ? "1" : "0";
      }
      const ox = (tx - 0.5) * 2, oy = (ty - 0.5) * 2;
      els.forEach((b, i) => {
        const depth = DEPTHS[i % DEPTHS.length];
        cx[i] += (ox * depth - cx[i]) * 0.03;
        cy[i] += (oy * depth - cy[i]) * 0.03;
        b.style.setProperty("translate", `${cx[i].toFixed(2)}px ${cy[i].toFixed(2)}px`);
      });
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [interactive]);

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <style>{KEYFRAMES}</style>
      {blobs.map((b, i) => (
        <div
          key={i}
          className="aurora-blob absolute rounded-full"
          style={{ ...b.style, willChange: "transform" }}
        />
      ))}
      {interactive && (
        <div
          ref={spotRef}
          className="absolute inset-0"
          style={{
            opacity: 0,
            transition: "opacity 0.6s ease",
            mixBlendMode: "screen",
            background:
              "radial-gradient(420px circle at var(--mx,50%) var(--my,40%), rgba(60,120,235,0.16) 0%, rgba(176,141,87,0.09) 35%, transparent 65%)",
            willChange: "background",
          } as CSSProperties}
        />
      )}
    </div>
  );
}
