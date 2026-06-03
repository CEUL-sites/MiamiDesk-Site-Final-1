import { useEffect, useRef } from "react";

/* Animated gradient orbs — navy/gold palette, canvas-rendered for GPU smoothness */
const ORBS = [
  // warm gold glow — lower-left
  { bx: 0.12, by: 0.65, r: 0.55, sx: 0.011, sy: 0.009, ax: 0.06, ay: 0.05, phx: 0,   phy: 0.5, rgb: "176,105,28",  a: 0.22 },
  // royal blue — upper-right
  { bx: 0.78, by: 0.28, r: 0.62, sx: 0.008, sy: 0.012, ax: 0.07, ay: 0.06, phx: 1.2, phy: 2.1, rgb: "22,68,158",   a: 0.40 },
  // deep blue fill — center-bottom
  { bx: 0.50, by: 0.90, r: 0.72, sx: 0.007, sy: 0.006, ax: 0.05, ay: 0.04, phx: 0.8, phy: 1.5, rgb: "8,30,80",     a: 0.52 },
  // mid blue — upper band
  { bx: 0.42, by: 0.18, r: 0.58, sx: 0.010, sy: 0.008, ax: 0.08, ay: 0.05, phx: 2.4, phy: 0.9, rgb: "14,48,128",   a: 0.34 },
  // gold accent — right edge
  { bx: 0.88, by: 0.72, r: 0.40, sx: 0.014, sy: 0.011, ax: 0.05, ay: 0.04, phx: 1.7, phy: 3.2, rgb: "176,141,87",  a: 0.13 },
];

export function HeroBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf: number;
    let t = 0;

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function draw() {
      const { width: w, height: h } = canvas;
      if (!w || !h) return;

      ctx.fillStyle = "#060D18";
      ctx.fillRect(0, 0, w, h);

      const dim = Math.max(w, h);
      for (const o of ORBS) {
        const cx = (o.bx + Math.sin(t * o.sx + o.phx) * o.ax) * w;
        const cy = (o.by + Math.cos(t * o.sy + o.phy) * o.ay) * h;
        const radius = o.r * dim;

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        g.addColorStop(0,    `rgba(${o.rgb},${o.a})`);
        g.addColorStop(0.45, `rgba(${o.rgb},${+(o.a * 0.28).toFixed(3)})`);
        g.addColorStop(1,    `rgba(${o.rgb},0)`);

        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      t += 1;
    }

    function loop() {
      draw();
      if (!reduced) raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw();
    });
    ro.observe(canvas);
    resize();
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}
