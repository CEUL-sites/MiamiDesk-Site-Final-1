import { useEffect, useRef } from "react";

/* ─── Step data ─────────────────────────────────────────────────────────── */
const STEPS = [
  {
    num: "01", title: "Position", sub: "Set the Foundation",
    badge: "Strategy in 24 Hours",
    text: "Pricing, timing, buyer profile, property narrative, and preparation strategy — all aligned before a single door opens to the market.",
    stats: [{ v: "24h", l: "Turnaround" }, { v: "100%", l: "Tailored" }, { v: "Step 1", l: "of 5" }],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><line x1="12" y1="3" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="21"/><line x1="3" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="21" y2="12"/></svg>`,
  },
  {
    num: "02", title: "Prepare", sub: "Build the Asset",
    badge: "100% MLS Data Accuracy",
    text: "Presentation guidance, media planning, listing copy, MLS data accuracy, and launch sequencing — every detail crafted before a single buyer sees it.",
    stats: [{ v: "HD", l: "Photography" }, { v: "100%", l: "Accuracy" }, { v: "Zero", l: "Errors" }],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>`,
  },
  {
    num: "03", title: "Launch", sub: "Maximum Exposure",
    badge: "93K Agent Pipeline — Day One",
    text: "Professional MLS positioning and eligible syndication across approved distribution channels, buyer-agent visibility, and expanded exposure infrastructure where applicable.",
    stats: [{ v: "93K", l: "Agents Notified" }, { v: "200+", l: "Global Portals" }, { v: "19", l: "Languages" }],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
  },
  {
    num: "04", title: "Activate", sub: "Agents on the Ground",
    badge: "3,000+ Agents · 19 Offices",
    text: "United Realty Group's 3,000+ agents across 19 South Florida offices begin showing, qualifying buyers, following up — and activating the Spain & LATAM referral pipeline.",
    stats: [{ v: "3K+", l: "Active Agents" }, { v: "19", l: "Offices" }, { v: "2", l: "Continents" }],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  },
  {
    num: "05", title: "Negotiate", sub: "Close with Confidence",
    badge: "Full Closing Coordination",
    text: "Offer review, terms strategy, inspection response, closing coordination, and move-forward planning — from first offer to final signature with no surprises.",
    stats: [{ v: "0", l: "Surprises" }, { v: "100%", l: "Managed" }, { v: "✓", l: "Closed" }],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  },
];

const HW = ["Online", "exposure", "gets", "your", "listing", "seen."];
const ITALIC = "The world's largest agent network gets it sold.";

/* ─── Scoped CSS injected once ──────────────────────────────────────────── */
const CSS = `
.sss-wrap { position:relative; overflow:hidden; background:#070f1c; color:#f0ece2; font-family:'Raleway',sans-serif; }
.sss-canvas { position:absolute; inset:0; z-index:0; pointer-events:none; }
.sss-page { position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; padding:88px 48px 96px; }
.sss-inner { max-width:1240px; width:100%; }

/* eyebrow */
.sss-eye { display:flex; align-items:center; gap:14px; font-size:10px; letter-spacing:.42em; text-transform:uppercase; color:#c4a45a; font-weight:300; margin-bottom:30px; opacity:0; transform:translateY(10px); transition:opacity .8s ease,transform .8s ease; }
.sss-eye.on { opacity:1; transform:translateY(0); }
.sss-eye::before,.sss-eye::after { content:''; flex:1; max-width:48px; height:1px; background:linear-gradient(90deg,transparent,#c4a45a); }
.sss-eye::after { background:linear-gradient(90deg,#c4a45a,transparent); }

/* headline */
.sss-hl { font-family:'Playfair Display',Georgia,serif; font-size:clamp(42px,5.6vw,78px); font-weight:500; line-height:1.07; color:#f0ece2; }
.sss-w { display:inline-block; opacity:0; transform:translateY(30px); transition:opacity .5s ease,transform .55s cubic-bezier(.22,1,.36,1); }
.sss-w.on { opacity:1; transform:translateY(0); }

/* italic typewriter */
.sss-italic { font-family:'Playfair Display',Georgia,serif; font-style:italic; font-weight:400; font-size:clamp(36px,5vw,68px); color:#c4a45a; display:block; margin-top:6px; opacity:0; transition:opacity .4s ease; }
.sss-italic.on { opacity:1; }
.sss-cursor { display:inline-block; width:3px; height:.82em; background:#c4a45a; margin-left:3px; vertical-align:middle; animation:sss-blink .9s step-end infinite; }
.sss-cursor.done { animation:none; opacity:0; }
@keyframes sss-blink { 0%,100%{opacity:1} 50%{opacity:0} }

/* desc */
.sss-desc { font-size:clamp(14px,1.4vw,16px); font-weight:300; line-height:1.85; color:rgba(240,236,226,.52); max-width:540px; margin-top:28px; opacity:0; transform:translateY(14px); transition:opacity .8s ease,transform .8s ease; }
.sss-desc.on { opacity:1; transform:translateY(0); }

/* flow track */
.sss-flow { margin-top:80px; position:relative; }
.sss-track { position:absolute; top:90px; left:calc(10% + 0px); right:calc(10% + 0px); height:1px; background:rgba(196,164,90,.1); z-index:0; }
.sss-tf { height:100%; width:0%; background:linear-gradient(90deg,#c4a45a,#e8cc80); box-shadow:0 0 8px rgba(196,164,90,.55); transition:width 2.2s cubic-bezier(.4,0,.2,1); }
.sss-tf.on { width:100%; }
.sss-tg { position:absolute; top:-4px; left:0; width:10px; height:10px; border-radius:50%; background:#e8cc80; box-shadow:0 0 16px #c4a45a,0 0 32px rgba(196,164,90,.4); opacity:0; transition:left 2.2s cubic-bezier(.4,0,.2,1),opacity .2s ease; }
.sss-tg.on { left:100%; opacity:1; }

/* nodes row */
.sss-nodes { display:flex; justify-content:space-between; align-items:flex-start; position:relative; z-index:1; }
.sss-node { display:flex; flex-direction:column; align-items:center; cursor:pointer; width:20%; user-select:none; }

/* bubble shell */
.sss-bwrap { width:180px; height:180px; position:relative; display:flex; align-items:center; justify-content:center; }

/* pulse rings */
.sss-ring { position:absolute; top:50%; left:50%; border-radius:50%; border:1px solid #c4a45a; transform:translate(-50%,-50%) scale(.85); opacity:0; pointer-events:none; }
.sss-r1 { width:118px; height:118px; }
.sss-r2 { width:152px; height:152px; }
.sss-r3 { width:178px; height:178px; }
.sss-node.on .sss-r1 { animation:sss-pr 2s ease-out infinite; }
.sss-node.on .sss-r2 { animation:sss-pr 2s ease-out infinite .55s; }
.sss-node.on .sss-r3 { animation:sss-pr 2s ease-out infinite 1.1s; }
@keyframes sss-pr { 0%{transform:translate(-50%,-50%) scale(.86);opacity:.75} 100%{transform:translate(-50%,-50%) scale(1.12);opacity:0} }

/* main bubble */
.sss-bubble { width:90px; height:90px; border-radius:50%; background:radial-gradient(circle at 35% 35%,#162b48,#0b1929); border:1.5px solid rgba(196,164,90,.28); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; position:relative; opacity:0; transform:scale(.55) translateY(20px); transition:opacity .55s cubic-bezier(.22,1,.36,1),transform .55s cubic-bezier(.22,1,.36,1),border-color .35s ease,box-shadow .35s ease; }
.sss-bubble.pop { opacity:1; transform:scale(1) translateY(0); }
.sss-node:hover .sss-bubble { border-color:rgba(196,164,90,.65); box-shadow:0 0 28px rgba(196,164,90,.22); transform:scale(1.07) translateY(-3px); }
.sss-node.on .sss-bubble { border-color:#c4a45a; box-shadow:0 0 40px rgba(196,164,90,.38),0 0 70px rgba(196,164,90,.12),inset 0 0 22px rgba(196,164,90,.07); background:radial-gradient(circle at 35% 35%,#1e3352,#0f2038); transform:scale(1.1) translateY(-4px); }

/* gold arc on active */
.sss-bubble::before { content:''; position:absolute; top:4px; left:50%; transform:translateX(-50%); width:40px; height:2px; border-radius:2px; background:linear-gradient(90deg,transparent,#c4a45a,transparent); opacity:0; transition:opacity .35s ease; }
.sss-node.on .sss-bubble::before,.sss-node:hover .sss-bubble::before { opacity:1; }

.sss-bnum { font-family:'Playfair Display',Georgia,serif; font-size:30px; font-weight:500; line-height:1; color:#f0ece2; transition:color .3s ease; }
.sss-node.on .sss-bnum { color:#e8cc80; }
.sss-bico { width:17px; height:17px; flex-shrink:0; }
.sss-bico svg { width:100%; height:100%; stroke:rgba(196,164,90,.4); fill:none; stroke-width:1.5; transition:stroke .3s ease; }
.sss-node.on .sss-bico svg,.sss-node:hover .sss-bico svg { stroke:#c4a45a; }
.sss-nlabel { font-family:'Playfair Display',Georgia,serif; font-size:19px; font-weight:500; color:rgba(240,236,226,.52); margin-top:14px; letter-spacing:.02em; transition:color .3s ease; text-align:center; }
.sss-node.on .sss-nlabel,.sss-node:hover .sss-nlabel { color:#f0ece2; }

/* detail panel */
.sss-panel { margin-top:36px; max-height:0; overflow:hidden; transition:max-height .75s cubic-bezier(.4,0,.2,1); }
.sss-panel.open { max-height:360px; }
.sss-pi { border:1px solid rgba(196,164,90,.18); border-radius:3px; background:linear-gradient(135deg,rgba(14,28,48,.97),rgba(8,16,30,.99)); display:grid; grid-template-columns:300px 1fr; overflow:hidden; opacity:0; transform:translateY(24px); transition:opacity .5s ease .18s,transform .5s ease .18s; }
.sss-panel.open .sss-pi { opacity:1; transform:translateY(0); }
.sss-pl { padding:48px 40px; border-right:1px solid rgba(196,164,90,.1); position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:center; }
.sss-pl::after { content:attr(data-n); position:absolute; bottom:-24px; right:-8px; font-family:'Playfair Display',Georgia,serif; font-size:180px; font-weight:300; color:rgba(196,164,90,.05); line-height:1; pointer-events:none; user-select:none; }
.sss-p-eye { font-size:9.5px; letter-spacing:.38em; text-transform:uppercase; color:#c4a45a; font-weight:300; margin-bottom:10px; font-family:'JetBrains Mono',monospace; }
.sss-p-title { font-family:'Playfair Display',Georgia,serif; font-size:42px; font-weight:500; color:#f0ece2; line-height:1.06; margin-bottom:18px; }
.sss-p-badge { display:inline-flex; align-items:center; gap:8px; font-size:10.5px; letter-spacing:.14em; text-transform:uppercase; color:#c4a45a; font-weight:300; border:1px solid rgba(196,164,90,.3); padding:8px 16px; border-radius:2px; width:fit-content; font-family:'JetBrains Mono',monospace; }
.sss-p-badge::before { content:''; display:block; width:5px; height:5px; border-radius:50%; background:#c4a45a; flex-shrink:0; box-shadow:0 0 6px #c4a45a; }
.sss-pr { padding:48px 52px; display:flex; flex-direction:column; justify-content:center; }
.sss-p-text { font-size:clamp(14px,1.5vw,16.5px); font-weight:300; line-height:1.88; color:rgba(240,236,226,.78); margin-bottom:28px; }
.sss-stats { display:flex; gap:36px; flex-wrap:wrap; }
.sss-stat { opacity:0; transform:translateY(12px); transition:opacity .4s ease,transform .4s ease; }
.sss-panel.open .sss-stat { opacity:1; transform:translateY(0); }
.sss-panel.open .sss-stat:nth-child(1){transition-delay:.32s}
.sss-panel.open .sss-stat:nth-child(2){transition-delay:.48s}
.sss-panel.open .sss-stat:nth-child(3){transition-delay:.64s}
.sss-sv { font-family:'Playfair Display',Georgia,serif; font-size:36px; font-weight:500; color:#c4a45a; line-height:1; }
.sss-sl { font-size:10px; letter-spacing:.2em; text-transform:uppercase; color:rgba(240,236,226,.52); font-weight:300; margin-top:5px; font-family:'JetBrains Mono',monospace; }

/* CTA */
.sss-cta { display:flex; align-items:center; gap:24px; margin-top:56px; flex-wrap:wrap; opacity:0; transform:translateY(16px); transition:opacity .8s ease,transform .8s ease; }
.sss-cta.on { opacity:1; transform:translateY(0); }
.sss-btn { font-family:'Raleway',sans-serif; font-size:10px; letter-spacing:.28em; text-transform:uppercase; border:none; cursor:pointer; padding:15px 30px; transition:transform .2s ease,background .3s ease,border-color .3s ease,color .3s ease; }
.sss-btn:hover { transform:translateY(-2px); }
.sss-btn-gold { background:#c4a45a; color:#070f1c; }
.sss-btn-gold:hover { background:#e8cc80; }
.sss-btn-outline { background:transparent; color:#c4a45a; border:1px solid rgba(196,164,90,.38); }
.sss-btn-outline:hover { border-color:#c4a45a; color:#e8cc80; }

/* replay + key hint — inside section */
.sss-replay { position:absolute; bottom:28px; right:36px; z-index:20; display:flex; align-items:center; gap:8px; font-size:10px; letter-spacing:.24em; text-transform:uppercase; color:rgba(196,164,90,.5); background:none; border:none; cursor:pointer; opacity:0; transition:opacity .4s ease,color .3s ease; font-family:'JetBrains Mono',monospace; }
.sss-replay.on { opacity:1; }
.sss-replay:hover { color:#c4a45a; }
.sss-replay svg { width:13px; height:13px; stroke:currentColor; fill:none; stroke-width:1.5; }
.sss-keyhint { position:absolute; bottom:28px; left:36px; z-index:20; font-size:10px; letter-spacing:.18em; color:rgba(196,164,90,.35); display:flex; align-items:center; gap:10px; opacity:0; transition:opacity .6s ease; font-family:'JetBrains Mono',monospace; }
.sss-keyhint.on { opacity:1; }
.sss-key { display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px; border:1px solid rgba(196,164,90,.25); border-radius:4px; font-size:11px; color:rgba(196,164,90,.5); }

/* responsive */
@media(max-width:960px){
  .sss-page { padding:56px 28px 80px; }
  .sss-nodes { flex-wrap:wrap; gap:28px; justify-content:center; }
  .sss-node { width:calc(33% - 20px); }
  .sss-track { display:none; }
  .sss-panel.open { max-height:680px; }
  .sss-pi { grid-template-columns:1fr; }
  .sss-pl { border-right:none; border-bottom:1px solid rgba(196,164,90,.1); }
  .sss-keyhint { display:none; }
}
@media(max-width:560px){
  .sss-node { width:calc(50% - 16px); }
  .sss-bubble { width:76px; height:76px; }
  .sss-bnum { font-size:24px; }
  .sss-bwrap { width:140px; height:140px; }
}
`;

/* ─── Component ─────────────────────────────────────────────────────────── */
export function SellerStrategySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const curStepRef = useRef(-1);
  const readyRef = useRef(false);
  const rafRef = useRef(0);
  const styleInjected = useRef(false);

  /* inject scoped CSS once */
  useEffect(() => {
    if (styleInjected.current) return;
    styleInjected.current = true;
    const tag = document.createElement("style");
    tag.textContent = CSS;
    document.head.appendChild(tag);
    return () => { document.head.removeChild(tag); styleInjected.current = false; };
  }, []);

  /* canvas + animation sequence */
  useEffect(() => {
    const cv = canvasRef.current;
    const sec = sectionRef.current;
    if (!cv || !sec) return;

    const cx = cv.getContext("2d")!;
    let W = 0, H = 0, t = 0;
    type Building = { x: number; w: number; h: number; wins: { f: number; c: number; lit: boolean; blink: boolean; ph: number }[] };
    type Pt = { x: number; y: number; vx: number; vy: number; r: number; a: number; pulse: number; pulsing: boolean };
    type Edge = { a: number; b: number; d: number };
    let bldgs: Building[] = [];
    let pts: Pt[] = [];
    let edges: Edge[] = [];

    function makeSkyline() {
      bldgs = [];
      let x = 0;
      while (x < W) {
        const bw = 24 + Math.random() * 36;
        const bh = 50 + Math.random() * H * 0.38;
        const floors = Math.floor(bh / 16);
        const cols = Math.max(1, Math.floor(bw / 11));
        const wins: Building["wins"] = [];
        for (let f = 0; f < floors; f++)
          for (let c = 0; c < cols; c++)
            wins.push({ f, c, lit: Math.random() > 0.38, blink: Math.random() > 0.88, ph: Math.random() * 6.28 });
        bldgs.push({ x, w: bw, h: bh, wins });
        x += bw + 2 + Math.random() * 14;
      }
    }
    function makeNet() {
      pts = [];
      for (let i = 0; i < 42; i++)
        pts.push({ x: Math.random() * W, y: Math.random() * H * 0.68, vx: (Math.random() - 0.5) * 0.14, vy: (Math.random() - 0.5) * 0.1, r: Math.random() * 1.4 + 0.4, a: Math.random() * 0.45 + 0.15, pulse: 0, pulsing: false });
      edges = [];
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.hypot(dx, dy);
          if (d < W * 0.2) edges.push({ a: i, b: j, d });
        }
    }
    function resize() {
      W = cv.width = sec.offsetWidth;
      H = cv.height = sec.offsetHeight;
      makeSkyline(); makeNet();
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(sec);

    function frame() {
      cx.clearRect(0, 0, W, H);
      t += 0.007;
      const sky = cx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "#050d18"); sky.addColorStop(0.55, "#090f20"); sky.addColorStop(1, "#06101e");
      cx.fillStyle = sky; cx.fillRect(0, 0, W, H);
      const hz = H * 0.70;
      const hg = cx.createRadialGradient(W / 2, hz, 0, W / 2, hz, W * 0.55);
      hg.addColorStop(0, "rgba(196,164,90,.055)"); hg.addColorStop(1, "rgba(196,164,90,0)");
      cx.fillStyle = hg; cx.fillRect(0, 0, W, H);
      const baseY = H;
      bldgs.forEach(b => {
        const ty = baseY - b.h;
        cx.fillStyle = "rgba(6,14,26,.9)"; cx.fillRect(b.x, ty, b.w, b.h);
        cx.strokeStyle = "rgba(25,50,85,.5)"; cx.lineWidth = 0.6; cx.strokeRect(b.x, ty, b.w, b.h);
        b.wins.forEach(w => {
          const wx = b.x + 4 + w.c * 11, wy = ty + 10 + w.f * 16;
          if (wy > baseY - 8 || wx + 7 > b.x + b.w - 3 || !w.lit) return;
          const alpha = w.blink ? Math.max(0, (Math.sin(t * 1.8 + w.ph) + 1) * 0.5 * 0.22) : 0.14 + Math.sin(t * 0.4 + w.ph) * 0.04;
          cx.fillStyle = `rgba(196,164,90,${alpha})`; cx.fillRect(wx, wy, 6, 8);
        });
      });
      cx.strokeStyle = "rgba(196,164,90,.07)"; cx.lineWidth = 0.5;
      cx.beginPath(); cx.moveTo(0, H * 0.70); cx.lineTo(W, H * 0.70); cx.stroke();
      edges.forEach(e => {
        const a = pts[e.a], b = pts[e.b];
        const alpha = Math.max(0, 0.13 - e.d / (W * 0.2) * 0.13);
        cx.strokeStyle = `rgba(196,164,90,${alpha})`; cx.lineWidth = 0.5;
        cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke();
      });
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H * 0.68) p.vy *= -1;
        if (!p.pulsing && Math.random() < 0.0025) { p.pulsing = true; p.pulse = 0; }
        if (p.pulsing) {
          p.pulse = Math.min(p.pulse + 0.04, 1);
          if (p.pulse >= 1) p.pulsing = false;
          cx.beginPath(); cx.arc(p.x, p.y, p.r + p.pulse * 14, 0, Math.PI * 2);
          cx.strokeStyle = `rgba(196,164,90,${0.45 * (1 - p.pulse)})`; cx.lineWidth = 0.6; cx.stroke();
        }
        cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        cx.fillStyle = `rgba(196,164,90,${p.a * 0.55})`; cx.fill();
      });
      const sx = ((t * 65) % (W + 260)) - 130;
      const sg = cx.createLinearGradient(sx - 110, 0, sx + 110, H);
      sg.addColorStop(0, "rgba(196,164,90,0)"); sg.addColorStop(0.5, "rgba(196,164,90,.028)"); sg.addColorStop(1, "rgba(196,164,90,0)");
      cx.fillStyle = sg; cx.fillRect(0, 0, W, H);
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);

    /* ── start sequence when section scrolls into view ── */
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { io.disconnect(); runSeq(); }
    }, { threshold: 0.15 });
    io.observe(sec);

    /* ── activate step ── */
    function activate(i: number) {
      const panel = sec.querySelector(".sss-panel")!;
      if (curStepRef.current === i) {
        sec.querySelector(`#sss-nd${i}`)?.classList.remove("on");
        panel.classList.remove("open");
        curStepRef.current = -1; return;
      }
      if (curStepRef.current !== -1) sec.querySelector(`#sss-nd${curStepRef.current}`)?.classList.remove("on");
      curStepRef.current = i;
      sec.querySelector(`#sss-nd${i}`)?.classList.add("on");
      const s = STEPS[i];
      const pl = sec.querySelector(".sss-pl") as HTMLElement;
      const pr = sec.querySelector(".sss-pr") as HTMLElement;
      pl.setAttribute("data-n", s.num);
      pl.innerHTML = `<div class="sss-p-eye">Step ${s.num} of 05 — ${s.sub}</div><div class="sss-p-title">${s.title}</div><div class="sss-p-badge">${s.badge}</div>`;
      pr.innerHTML = `<p class="sss-p-text">${s.text}</p><div class="sss-stats">${s.stats.map(f => `<div class="sss-stat"><div class="sss-sv">${f.v}</div><div class="sss-sl">${f.l}</div></div>`).join("")}</div>`;
      panel.classList.remove("open");
      requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add("open")));
    }
    (window as any).__sssActivate = activate;

    /* ── typewriter ── */
    function typeIt(cb: () => void) {
      const el = sec.querySelector("#sss-it-txt") as HTMLElement;
      const cursor = sec.querySelector("#sss-cur") as HTMLElement;
      sec.querySelector(".sss-italic")?.classList.add("on");
      let idx = 0;
      const iv = setInterval(() => {
        el.textContent = ITALIC.slice(0, idx++);
        if (idx > ITALIC.length) { clearInterval(iv); setTimeout(() => { cursor.classList.add("done"); cb(); }, 900); }
      }, 50);
    }

    /* ── entry sequence ── */
    function runSeq() {
      readyRef.current = false; curStepRef.current = -1;
      const words = [...sec.querySelectorAll(".sss-w")] as HTMLElement[];
      setTimeout(() => sec.querySelector(".sss-eye")?.classList.add("on"), 400);
      words.forEach((w, i) => setTimeout(() => w.classList.add("on"), 720 + i * 105));
      const afterWords = 720 + HW.length * 105 + 60;
      setTimeout(() => typeIt(() => {
        sec.querySelector(".sss-desc")?.classList.add("on");
        setTimeout(() => { sec.querySelector(".sss-tf")?.classList.add("on"); sec.querySelector(".sss-tg")?.classList.add("on"); }, 350);
        STEPS.forEach((_, i) => setTimeout(() => sec.querySelector(`#sss-bb${i}`)?.classList.add("pop"), 450 + i * 155));
        setTimeout(() => {
          sec.querySelector(".sss-cta")?.classList.add("on");
          sec.querySelector(".sss-replay")?.classList.add("on");
          sec.querySelector(".sss-keyhint")?.classList.add("on");
          readyRef.current = true;
          activate(0);
        }, 450 + STEPS.length * 155 + 400);
      }), afterWords);
    }

    /* ── replay ── */
    function replaySeq() {
      readyRef.current = false; curStepRef.current = -1;
      sec.querySelector(".sss-eye")?.classList.remove("on");
      sec.querySelectorAll(".sss-w").forEach(w => w.classList.remove("on"));
      sec.querySelector(".sss-italic")?.classList.remove("on");
      (sec.querySelector("#sss-it-txt") as HTMLElement).textContent = "";
      sec.querySelector("#sss-cur")?.classList.remove("done");
      sec.querySelector(".sss-desc")?.classList.remove("on");
      sec.querySelector(".sss-tf")?.classList.remove("on");
      sec.querySelector(".sss-tg")?.classList.remove("on");
      STEPS.forEach((_, i) => { sec.querySelector(`#sss-bb${i}`)?.classList.remove("pop"); sec.querySelector(`#sss-nd${i}`)?.classList.remove("on"); });
      sec.querySelector(".sss-panel")?.classList.remove("open");
      sec.querySelector(".sss-cta")?.classList.remove("on");
      setTimeout(runSeq, 250);
    }
    (window as any).__sssReplay = replaySeq;

    /* ── keyboard nav ── */
    function handleKey(e: KeyboardEvent) {
      if (!readyRef.current) return;
      if (e.key === "ArrowRight") activate(Math.min(curStepRef.current + 1, 4));
      if (e.key === "ArrowLeft") activate(Math.max(curStepRef.current - 1, 0));
    }
    document.addEventListener("keydown", handleKey);

    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      document.removeEventListener("keydown", handleKey);
      delete (window as any).__sssActivate;
      delete (window as any).__sssReplay;
    };
  }, []);

  return (
    <section ref={sectionRef} className="sss-wrap" style={{ minHeight: "100vh" }}>
      <canvas ref={canvasRef} className="sss-canvas" />

      <div className="sss-page">
        <div className="sss-inner">

          {/* eyebrow */}
          <div className="sss-eye">Seller Strategy</div>

          {/* headline */}
          <h2 className="sss-hl">
            {HW.map((w, i) => <span key={i} className="sss-w">{w}{" "}</span>)}
          </h2>
          <span className="sss-italic">
            <span id="sss-it-txt" />
            <span className="sss-cursor" id="sss-cur" />
          </span>
          <p className="sss-desc">
            Selling well is not just putting a property online. It is positioning the asset
            correctly, launching it through the right professional channels, and creating
            visibility where serious buyer activity begins.
          </p>

          {/* flow */}
          <div className="sss-flow">
            <div className="sss-track">
              <div className="sss-tf" />
              <div className="sss-tg" />
            </div>
            <div className="sss-nodes">
              {STEPS.map((s, i) => (
                <div
                  key={i}
                  className="sss-node"
                  id={`sss-nd${i}`}
                  onClick={() => (window as any).__sssActivate?.(i)}
                >
                  <div className="sss-bwrap">
                    <div className="sss-ring sss-r1" />
                    <div className="sss-ring sss-r2" />
                    <div className="sss-ring sss-r3" />
                    <div className="sss-bubble" id={`sss-bb${i}`}>
                      <span className="sss-bnum">{s.num}</span>
                      <span className="sss-bico" dangerouslySetInnerHTML={{ __html: s.icon }} />
                    </div>
                  </div>
                  <span className="sss-nlabel">{s.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* detail panel */}
          <div className="sss-panel">
            <div className="sss-pi">
              <div className="sss-pl" />
              <div className="sss-pr" />
            </div>
          </div>

          {/* CTA */}
          <div className="sss-cta">
            <a href="/contact" className="sss-btn sss-btn-gold">Schedule a Strategy Call</a>
            <a href="/sell" className="sss-btn sss-btn-outline">Explore Our Exposure System →</a>
          </div>

        </div>
      </div>

      {/* replay */}
      <button
        className="sss-replay"
        onClick={() => (window as any).__sssReplay?.()}
        aria-label="Replay animation"
      >
        <svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4" /></svg>
        Replay
      </button>

      {/* key hint */}
      <div className="sss-keyhint">
        <span className="sss-key">←</span>
        <span className="sss-key">→</span>
        Navigate Steps
      </div>
    </section>
  );
}
