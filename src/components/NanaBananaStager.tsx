import { useState } from "react";
import { Sparkles, RefreshCw, AlertCircle } from "lucide-react";

const SCENES = [
  { key: "miami-waterfront", label: "Miami Waterfront",   sub: "Brickell · Coconut Grove" },
  { key: "coral-gables",     label: "Coral Gables",       sub: "Mediterranean Revival" },
  { key: "brickell-condo",   label: "Brickell Condo",     sub: "High-rise · City view" },
  { key: "weston-family",    label: "Weston Family Home", sub: "A-rated schools corridor" },
  { key: "madrid-luxury",    label: "Madrid Luxury",      sub: "Salamanca · Recoletos" },
] as const;

type SceneKey = (typeof SCENES)[number]["key"];

export function NanaBananaStager() {
  const [activeScene, setActiveScene] = useState<SceneKey>("miami-waterfront");
  const [loading, setLoading]         = useState(false);
  const [imageData, setImageData]     = useState<string | null>(null);
  const [mimeType, setMimeType]       = useState("image/png");
  const [error, setError]             = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    setImageData(null);
    try {
      const res = await fetch("/.netlify/functions/nano-banana-stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scene: activeScene }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error || "Image generation failed.");
      } else {
        setImageData(data.imageData);
        setMimeType(data.mimeType || "image/png");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-hairline bg-white">
      {/* Scene selector */}
      <div className="flex flex-wrap gap-0 divide-x divide-hairline border-b border-hairline overflow-hidden">
        {SCENES.map((s) => (
          <button
            key={s.key}
            onClick={() => { setActiveScene(s.key); setImageData(null); setError(null); }}
            className={`flex-1 min-w-[140px] px-4 py-4 text-left transition-all duration-150 ${
              activeScene === s.key
                ? "bg-navy-deep text-white"
                : "bg-white text-navy/50 hover:bg-ivory hover:text-navy"
            }`}
          >
            <span className={`font-mono text-[9px] uppercase tracking-[0.18em] block font-semibold ${
              activeScene === s.key ? "text-white" : ""
            }`}>
              {s.label}
            </span>
            <span className={`font-mono text-[8px] uppercase tracking-[0.13em] mt-1 block ${
              activeScene === s.key ? "text-gold" : "text-navy/30"
            }`}>
              {s.sub}
            </span>
          </button>
        ))}
      </div>

      {/* Canvas / output */}
      <div className="relative bg-navy-deep aspect-[16/9] flex items-center justify-center overflow-hidden">
        {imageData ? (
          <img
            src={`data:${mimeType};base64,${imageData}`}
            alt={`AI-generated property visualization — ${activeScene}`}
            className="w-full h-full object-cover"
          />
        ) : loading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="h-10 w-10 border border-gold/30 rounded-full animate-spin border-t-gold" />
              <Sparkles size={16} className="text-gold absolute inset-0 m-auto" />
            </div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-gold/70 animate-pulse">
              Nano Banana generating…
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-3 max-w-xs text-center px-6">
            <AlertCircle size={20} className="text-gold/60" />
            <p className="font-sans text-sm text-white/60">{error}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 max-w-xs text-center px-6">
            <Sparkles size={24} className="text-gold/50" strokeWidth={1.25} />
            <p className="font-sans text-sm text-white/50">
              Select a scene above and generate an AI property visualization.
            </p>
          </div>
        )}

        {/* Watermark overlay when image shown */}
        {imageData && (
          <div className="absolute bottom-3 right-3 bg-navy-deep/70 backdrop-blur-sm px-3 py-1.5">
            <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-white/50">
              AI visualization · Nano Banana · Not an actual property photo
            </p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4 border-t border-hairline px-5 py-4">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-navy/40">
            Powered by Nano Banana · Google Gemini image generation
          </p>
          <p className="font-sans text-[10px] text-navy/30 mt-0.5">
            AI-generated visualizations for illustrative purposes only.
          </p>
        </div>
        <button
          onClick={generate}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-navy-deep px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-all hover:bg-gold hover:text-navy-deep disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          {loading ? (
            <RefreshCw size={12} className="animate-spin" />
          ) : (
            <Sparkles size={12} />
          )}
          {imageData ? "Regenerate" : "Generate"}
        </button>
      </div>
    </div>
  );
}
