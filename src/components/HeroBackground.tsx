import { useEffect, useRef, type CSSProperties } from "react";

const BLOBS = [
  // dominant royal blue — fills upper-left quadrant
  {
    id: "hb1",
    style: { width: "80vw", height: "80vw", top: "-25%", left: "-20%",
      background: "radial-gradient(ellipse at 50% 50%, rgba(22,68,158,0.72) 0%, rgba(22,68,158,0.28) 45%, transparent 70%)" },
    depth: 22,
    anim: "hb1 24s ease-in-out infinite",
  },
  // indigo / deep periwinkle — upper-right
  {
    id: "hb2",
    style: { width: "65vw", height: "65vw", top: "-20%", right: "-18%",
      background: "radial-gradient(ellipse at 50% 50%, rgba(40,30,120,0.62) 0%, rgba(14,48,128,0.22) 50%, transparent 72%)" },
    depth: -14,
    anim: "hb2 30s ease-in-out infinite",
  },
  // warm gold — lower-left accent
  {
    id: "hb3",
    style: { width: "52vw", height: "52vw", bottom: "-15%", left: "5%",
      background: "radial-gradient(ellipse at 50% 50%, rgba(176,105,28,0.38) 0%, rgba(176,141,87,0.12) 48%, transparent 70%)" },
    depth: 30,
    anim: "hb3 36s ease-in-out infinite",
  },
  // deep navy fill — lower-right
  {
    id: "hb4",
    style: { width: "62vw", height: "62vw", bottom: "-28%", right: "-12%",
      background: "radial-gradient(ellipse at 50% 50%, rgba(8,30,80,0.80) 0%, rgba(8,30,80,0.28) 50%, transparent 72%)" },
    depth: -10,
    anim: "hb4 27s ease-in-out infinite",
  },
];

const KEYFRAMES = `
@keyframes hb1 {
  0%,100% { transform: translate(0px, 0px) scale(1);    }
  25%      { transform: translate(4vw, -3vh) scale(1.06); }
  50%      { transform: translate(-2vw, 5vh) scale(0.97); }
  75%      { transform: translate(3vw, 2vh) scale(1.03);  }
}
@keyframes hb2 {
  0%,100% { transform: translate(0px, 0px) scale(1);     }
  30%      { transform: translate(-5vw, 4vh) scale(1.08);  }
  60%      { transform: translate(3vw, -5vh) scale(0.95); }
  80%      { transform: translate(-2vw, 2vh) scale(1.04); }
}
@keyframes hb3 {
  0%,100% { transform: translate(0px, 0px) scale(1);      }
  20%      { transform: translate(3vw, -4vh) scale(1.10);  }
  55%      { transform: translate(-4vw, 3vh) scale(0.93);  }
  80%      { transform: translate(2vw, -2vh) scale(1.05);  }
}
@keyframes hb4 {
  0%,100% { transform: translate(0px, 0px) scale(1);     }
  35%      { transform: translate(-3vw, -5vh) scale(1.07); }
  65%      { transform: translate(4vw, 3vh) scale(0.96);  }
  85%      { transform: translate(-1vw, -2vh) scale(1.02); }
}
@media (prefers-reduced-motion: reduce) {
  .hero-blob { animation: none !important; }
}
`;

export function HeroBackground() {
  const blobRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const spotRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const blobs = blobRefs.current.filter(Boolean) as HTMLDivElement[];
    const spot  = spotRef.current;

    // target (raw cursor, 0..1) and smoothed values
    let tx = 0.5, ty = 0.4;          // target, normalized
    let sx = 0.5, sy = 0.4;          // smoothed spotlight, normalized
    const cx = new Array(blobs.length).fill(0);  // smoothed blob offset px
    const cy = new Array(blobs.length).fill(0);
    let active = false;
    let raf: number;

    function onMove(e: MouseEvent) {
      tx = e.clientX / window.innerWidth;
      ty = e.clientY / window.innerHeight;
      active = true;
    }
    function onLeave() { active = false; }

    function tick() {
      // spotlight — smooth follow toward raw cursor
      sx += (tx - sx) * 0.12;
      sy += (ty - sy) * 0.12;
      if (spot) {
        spot.style.setProperty("--mx", `${(sx * 100).toFixed(2)}%`);
        spot.style.setProperty("--my", `${(sy * 100).toFixed(2)}%`);
        spot.style.opacity = active ? "1" : "0";
      }

      // blobs — parallax drift toward cursor by depth
      const ox = (tx - 0.5) * 2;   // -1..1
      const oy = (ty - 0.5) * 2;
      blobs.forEach((b, i) => {
        const depth = BLOBS[i].depth;
        cx[i] += (ox * depth - cx[i]) * 0.032;
        cy[i] += (oy * depth - cy[i]) * 0.032;
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
  }, []);

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#060D18", pointerEvents: "none" }}
      aria-hidden="true"
    >
      <style>{KEYFRAMES}</style>

      {BLOBS.map((blob, i) => (
        <div
          key={blob.id}
          ref={el => { blobRefs.current[i] = el; }}
          className="hero-blob absolute rounded-full"
          style={{
            ...blob.style,
            filter: "blur(80px)",
            animation: blob.anim,
            willChange: "transform, translate",
          }}
        />
      ))}

      {/* Cursor-following spotlight — brand blue core with gold halo, additive glow */}
      <div
        ref={spotRef}
        className="absolute inset-0"
        style={{
          opacity: 0,
          transition: "opacity 0.6s ease",
          mixBlendMode: "screen",
          background:
            "radial-gradient(420px circle at var(--mx,50%) var(--my,40%), rgba(60,120,235,0.20) 0%, rgba(176,141,87,0.10) 35%, transparent 65%)",
          willChange: "background",
        } as CSSProperties}
      />
    </div>
  );
}
