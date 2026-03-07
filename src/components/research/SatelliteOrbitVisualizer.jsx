import React, { useId, useRef } from 'react';
import { motion, useMotionValue, useTransform, useAnimationFrame, useMotionValueEvent } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// ── Orbital constants ──────────────────────────────────────────
const CX = 200;
const CY = 200;
const RX = 140;
const RY = 56;
const ORBIT_TILT = -15;
const TILT_RAD = ORBIT_TILT * Math.PI / 180;
const PERIOD_MS = 10000;


// Ground station — north pole of Earth SVG
const GS_X = CX;
const GS_Y = CY - 44;

// ── Component ─────────────────────────────────────────────────
const SatelliteOrbitVisualizer = ({ onLinkChange }) => {
  const { t } = useLanguage();
  const uid = useId().replace(/:/g, '');

  // Refs for imperative DOM updates — zero React re-renders
  const beamRef     = useRef(null);
  const beamGlowRef = useRef(null);
  const coordLblRef = useRef(null);
  const coordGrpRef = useRef(null);
  const prevLinkRef = useRef(null);

  // Single motion value drives the whole animation
  const progress = useMotionValue(0);
  useAnimationFrame((time) => {
    progress.set((time % PERIOD_MS) / PERIOD_MS);
  });

  // Satellite position in the LOCAL (tilted) frame — for the existing orbit group
  const localX = useTransform(progress, (p) => RX * Math.cos(p * Math.PI * 2));
  const localY = useTransform(progress, (p) => RY * Math.sin(p * Math.PI * 2));

  // Global satellite coordinates (compensating for ORBIT_TILT)
  const satGlobalX = useTransform(progress, (p) =>
    CX + (RX * Math.cos(p * 2 * Math.PI) * Math.cos(TILT_RAD)
        - RY * Math.sin(p * 2 * Math.PI) * Math.sin(TILT_RAD))
  );
  const satGlobalY = useTransform(progress, (p) =>
    CY + (RX * Math.cos(p * 2 * Math.PI) * Math.sin(TILT_RAD)
        + RY * Math.sin(p * 2 * Math.PI) * Math.cos(TILT_RAD))
  );

  // Single subscription — updates beam, label, and link status each frame
  useMotionValueEvent(progress, 'change', () => {
    const gx = satGlobalX.get();
    const gy = satGlobalY.get();
    const isNorth = gy < CY; // northern hemisphere → link active

    // Tracking beam — crisp dashed line
    if (beamRef.current) {
      beamRef.current.setAttribute('x2', String(gx));
      beamRef.current.setAttribute('y2', String(gy));
      beamRef.current.setAttribute('stroke-opacity', isNorth ? '0.30' : '0');
    }

    // Tracking beam — soft glow duplicate
    if (beamGlowRef.current) {
      beamGlowRef.current.setAttribute('x2', String(gx));
      beamGlowRef.current.setAttribute('y2', String(gy));
      beamGlowRef.current.setAttribute('stroke-opacity', isNorth ? '0.10' : '0');
    }

    // Coordinate label text
    if (coordLblRef.current) {
      const latVal = (CY - gy) / RY * 53;
      const lonVal = (gx - CX) / RX * 180;
      const latStr = `${Math.abs(latVal).toFixed(1)}°${latVal >= 0 ? 'N' : 'S'}`;
      const lonStr = `${Math.abs(lonVal).toFixed(1)}°${lonVal >= 0 ? 'E' : 'W'}`;
      coordLblRef.current.textContent = `${latStr}  ${lonStr}`;
    }

    // Coordinate label group position (follows satellite)
    if (coordGrpRef.current) {
      coordGrpRef.current.setAttribute('transform', `translate(${gx},${gy})`);
    }

    // Notify parent only when link state transitions (avoids flooding setState)
    if (isNorth !== prevLinkRef.current) {
      prevLinkRef.current = isNorth;
      onLinkChange?.(isNorth);
    }
  });

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
          {/* Earth surface grid */}
          <pattern id={`egrid-${uid}`} width="9" height="9" patternUnits="userSpaceOnUse">
            <path d="M9 0L0 0 0 9" fill="none" stroke="#00d9ff" strokeWidth="0.35" opacity="0.45" />
          </pattern>

          <clipPath id={`eclip-${uid}`}>
            <circle cx={CX} cy={CY} r={44} />
          </clipPath>

          <radialGradient id={`egrad-${uid}`} cx="38%" cy="32%" r="72%">
            <stop offset="0%"   stopColor="#1e3a6e" />
            <stop offset="60%"  stopColor="#0d1e40" />
            <stop offset="100%" stopColor="#060a1c" />
          </radialGradient>

          <radialGradient id={`agrad-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="72%"  stopColor="transparent" />
            <stop offset="100%" stopColor="#00d9ff" stopOpacity="0.18" />
          </radialGradient>

          {/* Satellite multi-layer glow */}
          <filter id={`sglow-${uid}`} x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6"   result="wide" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="tight" />
            <feMerge>
              <feMergeNode in="wide" />
              <feMergeNode in="tight" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Tracking beam glow */}
          <filter id={`bglow-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
          </filter>
        </defs>

        {/* ── Range rings — 3 subtle rings ── */}
        {[108, 148, 178].map((r) => (
          <circle
            key={r}
            cx={CX} cy={CY} r={r}
            fill="none"
            stroke="#00d9ff"
            strokeWidth="0.2"
            opacity="0.05"
          />
        ))}

        {/* ── Crosshair lines ── */}
        {[
          [CX - 190, CY, CX - 53, CY],
          [CX + 53,  CY, CX + 190, CY],
          [CX, CY - 190, CX, CY - 53],
          [CX, CY + 53,  CX, CY + 190],
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


        {/* ── Tracking beam — glow layer (imperative) ── */}
        <line
          ref={beamGlowRef}
          x1={GS_X} y1={GS_Y}
          x2={GS_X} y2={GS_Y}
          stroke="#00d9ff"
          strokeWidth="5"
          strokeOpacity="0"
          filter={`url(#bglow-${uid})`}
        />

        {/* ── Tracking beam — crisp solid line (imperative) ── */}
        <line
          ref={beamRef}
          x1={GS_X} y1={GS_Y}
          x2={GS_X} y2={GS_Y}
          stroke="#00d9ff"
          strokeWidth="1.2"
          strokeOpacity="0"
        />

        {/* ── Orbit ellipse + satellite (tilted frame) ── */}
        <g transform={`translate(${CX}, ${CY}) rotate(${ORBIT_TILT})`}>
          <ellipse
            cx="0" cy="0"
            rx={RX} ry={RY}
            fill="none"
            stroke="#00d9ff"
            strokeWidth="2.5"
            strokeOpacity="0.45"
            strokeDasharray="7 5"
          />
          <motion.g style={{ x: localX, y: localY }} filter={`url(#sglow-${uid})`}>
            <circle r="11" fill="#00d9ff" fillOpacity="0.07" />
            <rect x="-15" y="-1.8" width="10" height="3.6" rx="0.6" fill="#00d9ff" fillOpacity="0.55" />
            <rect x="5"   y="-1.8" width="10" height="3.6" rx="0.6" fill="#00d9ff" fillOpacity="0.55" />
            <circle r="4.5" fill="#00d9ff" fillOpacity="0.88" />
            <circle r="1.8" fill="#ffffff" fillOpacity="0.95" />
          </motion.g>
        </g>

        {/* ── Earth (rendered on top of orbit — clips far arc) ── */}
        <circle cx={CX} cy={CY} r="51" fill={`url(#agrad-${uid})`} />
        <circle cx={CX} cy={CY} r="44" fill={`url(#egrad-${uid})`} />
        <rect
          x={CX - 44} y={CY - 44}
          width="88" height="88"
          fill={`url(#egrid-${uid})`}
          clipPath={`url(#eclip-${uid})`}
        />
        <circle
          cx={CX} cy={CY} r="44"
          fill="none"
          stroke="#00d9ff"
          strokeWidth="0.9"
          strokeOpacity="0.35"
        />
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

        {/* ── Ground station marker ── */}
        <circle cx={GS_X} cy={GS_Y} r="3.5" fill="none" stroke="#00ff88" strokeWidth="0.7" opacity="0.55" />
        <circle cx={GS_X} cy={GS_Y} r="1.3" fill="#00ff88" opacity="0.75" />
        <text x={GS_X + 6} y={GS_Y - 4} fontSize="5" fill="#00ff88" fontFamily="monospace" opacity="0.45">GS-01</text>

        {/* ── Coordinate label — follows satellite imperatively ── */}
        <g ref={coordGrpRef} transform={`translate(${GS_X},${GS_Y})`}>
          <text
            ref={coordLblRef}
            x="10"
            y="-9"
            fontSize="5.5"
            fill="#00d9ff"
            fontFamily="monospace"
            opacity="0.35"
            letterSpacing="0.8"
          >
            0.0°N  0.0°E
          </text>
        </g>

        {/* ── Corner watermarks — smaller, more sober ── */}
        <text x="10" y="18"  fill="#00d9ff" fontSize="5.5" fontFamily="monospace" opacity="0.18" letterSpacing="1">CO.DE_AEROSPACE</text>
        <text x="10" y="26"  fill="#00d9ff" fontSize="4"   fontFamily="monospace" opacity="0.11">SIM_NGSO_v1.2.8</text>
        <text x="390" y="393" textAnchor="end" fill="#00d9ff" fontSize="4" fontFamily="monospace" opacity="0.11">LEO 550KM / INC 53.0°</text>
      </svg>
    </div>
  );
};

export default SatelliteOrbitVisualizer;
