import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';

// Constrained random jitter — stays within a tight band around the base value
const jitter = (base, range, decimals) =>
  +(base + (Math.random() - 0.5) * 2 * range).toFixed(decimals);

const INITIAL = {
  alt:  550.23,
  vel:  7.612,
  inc:  53.04,
  lat:  12.34,
  lon: -98.76,
  sig: -87.3,
};

// ── TelemetryPanel ─────────────────────────────────────────────
const TelemetryPanel = () => {
  const { t } = useLanguage();
  const [data, setData]       = useState(INITIAL);
  const [tick, setTick]       = useState(false); // used to flash updated cells
  const epochRef              = useRef(new Date().toISOString().slice(0, 19) + 'Z');

  useEffect(() => {
    const id = setInterval(() => {
      setData({
        alt:  jitter(INITIAL.alt,  0.18, 2),
        vel:  jitter(INITIAL.vel,  0.004, 3),
        inc:  jitter(INITIAL.inc,  0.04, 2),
        lat:  jitter(INITIAL.lat,  0.22, 2),
        lon:  jitter(INITIAL.lon,  0.22, 2),
        sig:  jitter(INITIAL.sig,  0.6,  1),
      });
      setTick((p) => !p); // toggle flash
      epochRef.current = new Date().toISOString().slice(0, 19) + 'Z';
    }, 120);
    return () => clearInterval(id);
  }, []);

  const fields = [
    { label: 'ALT',    value: `${data.alt.toFixed(2)} km`,   color: 'text-[#00d9ff]' },
    { label: 'VEL',    value: `${data.vel.toFixed(3)} km/s`, color: 'text-[#00d9ff]' },
    { label: 'INC',    value: `${data.inc.toFixed(2)} °`,    color: 'text-green-400'  },
    { label: 'LAT',    value: `${data.lat.toFixed(2)} °`,    color: 'text-green-400'  },
    { label: 'LON',    value: `${data.lon.toFixed(2)} °`,    color: 'text-green-400'  },
    { label: 'RF SIG', value: `${data.sig.toFixed(1)} dBm`,  color: 'text-amber-400'  },
  ];

  // Signal bar count based on signal strength
  const sigBars = data.sig > -85 ? 5 : data.sig > -89 ? 4 : data.sig > -92 ? 3 : 2;

  return (
    <div className="bg-[#050d1a] border border-[#00d9ff]/18 rounded-xl p-4 font-mono h-full flex flex-col">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-[10px] text-green-400 uppercase tracking-[0.25em]">
            {t('research.simulator.status')}
          </span>
        </div>
        <span className="text-[9px] text-[#00d9ff]/30 uppercase tracking-widest">
          NGSO_TLM_FEED
        </span>
      </div>

      {/* ── Live data grid ── */}
      <div className="grid grid-cols-2 gap-2 flex-1">
        {fields.map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-[#0a0e27]/70 border border-white/5 rounded-lg p-2.5 flex flex-col gap-1"
          >
            <span className="text-[9px] text-white/30 uppercase tracking-[0.2em]">
              {label}
            </span>
            {/* Key includes tick so the browser briefly re-paints — cheap flash effect */}
            <span
              key={`${label}-${tick}`}
              className={`text-sm font-bold tabular-nums leading-none ${color} transition-opacity duration-75`}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center gap-2">
        <span className="text-[9px] text-white/20 uppercase tracking-tight truncate">
          EPO: {epochRef.current}
        </span>
        {/* RF signal bars */}
        <div className="flex items-end gap-0.5 shrink-0">
          {[1, 2, 3, 4, 5].map((bar) => (
            <div
              key={bar}
              style={{ height: `${bar * 3 + 5}px` }}
              className={`w-1.5 rounded-sm transition-colors duration-200 ${
                bar <= sigBars ? 'bg-[#00d9ff]/70' : 'bg-[#00d9ff]/12'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TelemetryPanel;
