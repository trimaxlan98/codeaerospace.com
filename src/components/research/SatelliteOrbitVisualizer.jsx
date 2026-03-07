import React, { useId } from 'react';
import { motion, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// ── Orbital constants ──────────────────────────────────────────
const CX = 200;
const CY = 200;
const RX = 140;          // orbit semi-major axis (px)
const RY = 56;           // orbit semi-minor axis (px)
const ORBIT_TILT = -15;  // inclination in degrees
const SWEEP_R = 178;     // radar sweep radius
const PERIOD_MS = 10000; // one orbit = 10 s

// Radar sweep trailing arc (25 deg behind leading edge)
const TRAIL_RAD = -25 * Math.PI / 180;
const SWEEP_EX = +(SWEEP_R * Math.cos(TRAIL_RAD)).toFixed(2);
const SWEEP_EY = +(SWEEP_R * Math.sin(TRAIL_RAD)).toFixed(2);

// ── Component ─────────────────────────────────────────────────
const SatelliteOrbitVisualizer = () => {
  const { t } = useLanguage();
  const uid = useId().replace(/:/g, '');

  // Single motion value drives the whole orbit — no React re-renders
  const progress = useMotionValue(0);
  useAnimationFrame((time) => {
    progress.set((time % PERIOD_MS) / PERIOD_MS);
  });

  // Satellite position in the LOCAL (tilted) frame — pure derived transforms
  const localX = useTransform(progress, (p) => RX * Math.cos(p * Math.PI * 2));
  const localY = useTransform(progress, (p) => RY * Math.sin(p * Math.PI * 2));

  return (
    <div className="relative w-full select-none">
      {/* Section label */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-[10px] font-mono text-[#00d9ff]/50 uppercase tracking-[0.3em]">
          {t('research.simulator.title')}
        </span>
        <span className="flex items-center gap-1.5 text-[9px] font-mono text-green-400/60 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {t('research.simulator.status')}
        </span>
      </div>

      <svg
        viewBox="0 0 400 400"
        className="w-full"
        aria-label="NGSO satellite orbit simulation"
        style={{ filter: 'drop-shadow(0 0 28px rgba(0,217,255,0.07))' }}
      >
        <defs>
          {/* ── Technical grid for Earth surface ── */}
          <pattern
            id={`egrid-${uid}`}
            width="9"
            height="9"
            patternUnits="userSpaceOnUse"
          >
            <path d="M9 0L0 0 0 9" fill="none" stroke="#00d9ff" strokeWidth="0.35" opacity="0.45" />
          </pattern>

          {/* ── Clip Earth circle ── */}
          <clipPath id={`eclip-${uid}`}>
            <circle cx={CX} cy={CY} r={44} />
          </clipPath>

          {/* ── Earth body gradient ── */}
          <radialGradient id={`egrad-${uid}`} cx="38%" cy="32%" r="72%">
            <stop offset="0%"   stopColor="#1e3a6e" />
            <stop offset="60%"  stopColor="#0d1e40" />
            <stop offset="100%" stopColor="#060a1c" />
          </radialGradient>

          {/* ── Atmosphere glow gradient ── */}
          <radialGradient id={`agrad-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="72%"  stopColor="transparent" />
            <stop offset="100%" stopColor="#00d9ff" stopOpacity="0.18" />
          </radialGradient>

          {/* ── Satellite multi-layer glow filter ── */}
          <filter id={`sglow-${uid}`} x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6"   result="wide" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="tight" />
            <feMerge>
              <feMergeNode in="wide" />
              <feMergeNode in="tight" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Range rings (background reference) ── */}
        {[78, 108, 138, 168, 193].map((r) => (
          <circle
            key={r}
            cx={CX} cy={CY} r={r}
            fill="none"
            stroke="#00d9ff"
            strokeWidth="0.25"
            opacity={r === 193 ? 0.05 : 0.07}
          />
        ))}

        {/* ── Crosshair lines ── */}
        {[
          [CX - 190, CY, CX - 53, CY],
          [CX + 53, CY, CX + 190, CY],
          [CX, CY - 190, CX, CY - 53],
          [CX, CY + 53, CX, CY + 190],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#00d9ff"
            strokeWidth="0.3"
            opacity="0.09"
            strokeDasharray="3 5"
          />
        ))}

        {/* ── Radar sweep (rotates around center) ── */}
        <g transform={`translate(${CX}, ${CY})`}>
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
          >
            {/* Leading line */}
            <line
              x1="0" y1="0" x2={SWEEP_R} y2="0"
              stroke="#00d9ff"
              strokeWidth="1"
              strokeOpacity="0.45"
            />
            {/* Trailing glow sector */}
            <path
              d={`M 0 0 L ${SWEEP_EX} ${SWEEP_EY} A ${SWEEP_R} ${SWEEP_R} 0 0 1 ${SWEEP_R} 0 Z`}
              fill="#00d9ff"
              fillOpacity="0.055"
            />
          </motion.g>
        </g>

        {/* ── Orbit ellipse + satellite (tilted frame) ── */}
        <g transform={`translate(${CX}, ${CY}) rotate(${ORBIT_TILT})`}>
          {/* Dashed orbit path */}
          <ellipse
            cx="0" cy="0"
            rx={RX} ry={RY}
            fill="none"
            stroke="#00d9ff"
            strokeWidth="0.7"
            strokeOpacity="0.2"
            strokeDasharray="5 4"
          />

          {/* Satellite with glow */}
          <motion.g style={{ x: localX, y: localY }} filter={`url(#sglow-${uid})`}>
            {/* Outer halo pulse */}
            <circle r="11" fill="#00d9ff" fillOpacity="0.07" />
            {/* Solar panel — left */}
            <rect x="-15" y="-1.8" width="10" height="3.6" rx="0.6" fill="#00d9ff" fillOpacity="0.55" />
            {/* Solar panel — right */}
            <rect x="5"   y="-1.8" width="10" height="3.6" rx="0.6" fill="#00d9ff" fillOpacity="0.55" />
            {/* Satellite body */}
            <circle r="4.5" fill="#00d9ff" fillOpacity="0.88" />
            {/* Core bright point */}
            <circle r="1.8" fill="#ffffff" fillOpacity="0.95" />
          </motion.g>
        </g>

        {/* ── Earth (rendered on top of orbit so it clips the far arc) ── */}
        {/* Atmosphere halo */}
        <circle cx={CX} cy={CY} r="51" fill={`url(#agrad-${uid})`} />
        {/* Earth body */}
        <circle cx={CX} cy={CY} r="44" fill={`url(#egrad-${uid})`} />
        {/* Grid overlay */}
        <rect
          x={CX - 44} y={CY - 44}
          width="88" height="88"
          fill={`url(#egrid-${uid})`}
          clipPath={`url(#eclip-${uid})`}
        />
        {/* Border ring */}
        <circle
          cx={CX} cy={CY} r="44"
          fill="none"
          stroke="#00d9ff"
          strokeWidth="0.9"
          strokeOpacity="0.35"
        />
        {/* TERRA label */}
        <text
          x={CX} y={CY + 3}
          textAnchor="middle"
          fill="#00d9ff"
          fontSize="7"
          fontFamily="monospace"
          opacity="0.4"
          letterSpacing="2"
        >
          TERRA
        </text>

        {/* ── Corner watermarks ── */}
        <text x="10" y="18"  fill="#00d9ff" fontSize="7"   fontFamily="monospace" opacity="0.28">CO.DE_AEROSPACE</text>
        <text x="10" y="28"  fill="#00d9ff" fontSize="5.5" fontFamily="monospace" opacity="0.16">SIM_NGSO_v1.2.8</text>
        <text x="390" y="392" textAnchor="end" fill="#00d9ff" fontSize="5.5" fontFamily="monospace" opacity="0.16">LEO 550KM / INC 53.0°</text>
      </svg>
    </div>
  );
};

export default SatelliteOrbitVisualizer;
