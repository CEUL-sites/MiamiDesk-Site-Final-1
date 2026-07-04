import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Small animated robot mascot for the AI Intelligence Desk.
 * Serves as visual AI-use disclosure and professional branding.
 * Hover reveals the disclosure tooltip.
 */
export function AiRobotMascot() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      role="img"
      aria-label="AI Desk — Powered by Gemini. This conversation is handled by AI. Carlos Uzcategui responds personally to qualified inquiries."
    >
      <style>{`
        @keyframes robot-blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.08); }
        }
        @keyframes robot-antenna-pulse {
          0%, 100% { opacity: 0.6; r: 3; }
          50% { opacity: 1; r: 4.5; }
        }
        @keyframes robot-chest-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes robot-bob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .robot-eye-l { animation: robot-blink 5.5s ease-in-out infinite; transform-origin: center; }
        .robot-eye-r { animation: robot-blink 5.5s ease-in-out 0.15s infinite; transform-origin: center; }
        .robot-antenna-tip { animation: robot-antenna-pulse 2s ease-in-out infinite; }
        .robot-chest-green { animation: robot-chest-pulse 2.2s ease-in-out infinite; }
        .robot-body { animation: robot-bob 3.5s ease-in-out infinite; }
      `}</style>

      {/* Robot SVG */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="cursor-pointer"
      >
        <svg
          viewBox="0 0 52 72"
          width="52"
          height="72"
          aria-hidden="true"
          className="overflow-visible"
        >
          {/* ── Antenna ── */}
          <line x1="26" y1="2" x2="26" y2="10" stroke="#B08D57" strokeWidth="1.75" strokeLinecap="round"/>
          <circle className="robot-antenna-tip" cx="26" cy="2" r="3" fill="#B08D57"/>

          {/* ── Head ── */}
          <g className="robot-body">
            <rect x="6" y="10" width="40" height="30" rx="6" fill="#06111F" stroke="#B08D57" strokeWidth="1.5"/>

            {/* Ear tabs */}
            <rect x="1"  y="18" width="5" height="10" rx="2.5" fill="#06111F" stroke="#B08D57" strokeWidth="1.25"/>
            <rect x="46" y="18" width="5" height="10" rx="2.5" fill="#06111F" stroke="#B08D57" strokeWidth="1.25"/>

            {/* Eye sockets */}
            <rect x="12" y="17" width="12" height="12" rx="3" fill="#0B1E3F"/>
            <rect x="28" y="17" width="12" height="12" rx="3" fill="#0B1E3F"/>

            {/* Eyes */}
            <g className="robot-eye-l">
              <rect x="13" y="18" width="10" height="10" rx="2.5" fill="#B08D57" opacity="0.9"/>
              <circle cx="16" cy="21" r="1.5" fill="white" opacity="0.45"/>
            </g>
            <g className="robot-eye-r">
              <rect x="29" y="18" width="10" height="10" rx="2.5" fill="#B08D57" opacity="0.9"/>
              <circle cx="32" cy="21" r="1.5" fill="white" opacity="0.45"/>
            </g>

            {/* Mouth grill */}
            <rect x="13" y="33" width="26" height="3" rx="1.5" fill="#0B1E3F"/>
            {[0,1,2,3,4].map((i) => (
              <line key={i} x1={16 + i * 5} y1="33" x2={16 + i * 5} y2="36"
                stroke="#B08D57" strokeWidth="0.75" opacity="0.6"/>
            ))}

            {/* Neck */}
            <rect x="21" y="40" width="10" height="5" rx="2" fill="#B08D57" opacity="0.35"/>

            {/* ── Body ── */}
            <rect x="8" y="45" width="36" height="26" rx="5" fill="#06111F" stroke="#B08D57" strokeWidth="1.5"/>

            {/* Chest panel */}
            <rect x="14" y="50" width="24" height="16" rx="3" fill="#0A1628" stroke="#B08D57" strokeWidth="0.75"/>

            {/* Status LEDs */}
            <circle cx="20" cy="56" r="2.5" fill="#B08D57" className="robot-chest-green" style={{ animationDelay: "0s" }}/>
            <circle cx="26" cy="56" r="2.5" fill="#10b981" className="robot-chest-green" style={{ animationDelay: "0.4s" }}/>
            <circle cx="32" cy="56" r="2.5" fill="#B08D57" className="robot-chest-green" style={{ animationDelay: "0.8s" }}/>

            {/* Chest text indicator */}
            <text x="26" y="63.5" textAnchor="middle" fontSize="4" fill="#B08D57" opacity="0.55"
              fontFamily="monospace" letterSpacing="0.5">AI</text>
          </g>
        </svg>
      </motion.div>

      {/* Label under robot */}
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold/50">AI Desk</p>

      {/* Disclosure tooltip — appears on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 z-50 w-56 border border-gold/25 bg-navy-deep/95 backdrop-blur-sm p-3 shadow-xl shadow-black/50"
            role="tooltip"
          >
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
              style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "6px solid rgba(176,141,87,0.25)" }}
            />
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold mb-1.5">AI Disclosure</p>
            <p className="font-sans text-[11px] leading-relaxed text-white/70">
              This conversation is handled by AI (Gemini). Carlos Uzcategui reviews
              every qualified inquiry personally and responds directly.
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-gold/50">
              Powered by Google Gemini · FL SL705771
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
