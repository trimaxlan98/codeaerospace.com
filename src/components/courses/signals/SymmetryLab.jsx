import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Pencil, Eraser, Info, BarChart3, RotateCcw, MousePointer2 } from 'lucide-react';

const SymmetryLab = () => {
  const N = 512;
  const T_MIN = -5;
  const T_MAX = 5;
  const dt = (T_MAX - T_MIN) / (N - 1);

  const [signal, setSignal] = useState(new Float64Array(N));
  const [hasSignal, setHasSignal] = useState(false);
  const [zoom, setZoom] = useState({ t: 1.0, y: 1.0 });
  const [verdict, setVerdict] = useState({ type: 'Sin señal', desc: 'Dibuja o carga una señal para analizar su simetría.', color: 'text-slate-500' });
  const [energies, setEnergies] = useState({ even: 0, odd: 0, total: 0 });

  const canvasesRef = useRef([null, null, null]);
  const containerRefs = useRef([null, null, null]);
  const isDrawing = useRef(false);
  const lastDrawIdx = useRef(-1);

  const indexToT = (i) => T_MIN + i * dt;
  const tToIndex = (t) => Math.round((t - T_MIN) / dt);

  const decompose = (sig) => {
    const reflected = new Float64Array(N);
    const even = new Float64Array(N);
    const odd = new Float64Array(N);
    for (let i = 0; i < N; i++) {
      const mirrorIdx = N - 1 - i;
      reflected[i] = sig[mirrorIdx];
      even[i] = 0.5 * (sig[i] + sig[mirrorIdx]);
      odd[i] = 0.5 * (sig[i] - sig[mirrorIdx]);
    }
    return { reflected, even, odd };
  };

  const computeEnergy = (arr) => {
    let e = 0;
    for (let i = 0; i < N; i++) e += arr[i] * arr[i] * Math.abs(dt);
    return e;
  };

  const updateAnalysis = (sig) => {
    const { even, odd } = decompose(sig);
    const eEven = computeEnergy(even);
    const eOdd = computeEnergy(odd);
    const eTotal = eEven + eOdd;

    setEnergies({ even: eEven, odd: eOdd, total: eTotal });

    if (!hasSignal || eTotal < 0.001) {
      setVerdict({ type: 'Sin señal', desc: 'Dibuja o carga una señal para analizar su simetría.', color: 'text-slate-500' });
      return;
    }

    const parRatio = eEven / eTotal;
    const impRatio = eOdd / eTotal;

    if (parRatio > 0.98) {
      setVerdict({ type: 'Puramente Par', desc: 'Simetría especular perfecta respecto al eje vertical.', color: 'text-amber-500' });
    } else if (impRatio > 0.98) {
      setVerdict({ type: 'Puramente Impar', desc: 'Antisimétrica respecto al origen.', color: 'text-[#00d9ff]' });
    } else if (parRatio > 0.7) {
      setVerdict({ type: 'Predominantemente Par', desc: `La componente par domina con ${(parRatio * 100).toFixed(1)}% de la energía.`, color: 'text-amber-500/80' });
    } else if (impRatio > 0.7) {
      setVerdict({ type: 'Predominantemente Impar', desc: `La componente impar domina con ${(impRatio * 100).toFixed(1)}% de la energía.`, color: 'text-[#00d9ff]/80' });
    } else {
      setVerdict({ type: 'Asimétrica', desc: 'La señal no posee una simetría dominante.', color: 'text-emerald-400' });
    }
  };

  const drawGrid = (ctx, w, h, zoomT, zoomY) => {
    const dpr = window.devicePixelRatio || 1;
    const pad = { l: 50, r: 20, t: 20, b: 30 };
    const pw = w - pad.l - pad.r;
    const ph = h - pad.t - pad.b;

    const tHalf = 5 / zoomT;
    const viewTMin = -tHalf;
    const viewTMax = tHalf;
    const yRange = 4 / zoomY;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0a0e27';
    ctx.fillRect(pad.l, pad.t, pw, ph);

    // Grid lines
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.05)';
    ctx.lineWidth = 1;
    
    const tStep = 1;
    for (let t = Math.ceil(viewTMin); t <= viewTMax; t += tStep) {
      const x = pad.l + ((t - viewTMin) / (viewTMax - viewTMin)) * pw;
      ctx.beginPath(); ctx.moveTo(x, pad.t); ctx.lineTo(x, pad.t + ph); ctx.stroke();
    }

    const yStep = 1;
    for (let v = -Math.floor(yRange); v <= yRange; v += yStep) {
      const y = pad.t + (1 - (v + yRange) / (2 * yRange)) * ph;
      ctx.beginPath(); ctx.moveTo(pad.l, y); ctx.lineTo(pad.l + pw, y); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.2)';
    ctx.lineWidth = 2;
    const y0 = pad.t + (1 - (0 + yRange) / (2 * yRange)) * ph;
    if (y0 >= pad.t && y0 <= pad.t + ph) {
      ctx.beginPath(); ctx.moveTo(pad.l, y0); ctx.lineTo(pad.l + pw, y0); ctx.stroke();
    }
    const x0 = pad.l + ((0 - viewTMin) / (viewTMax - viewTMin)) * pw;
    if (x0 >= pad.l && x0 <= pad.l + pw) {
      ctx.beginPath(); ctx.moveTo(x0, pad.t); ctx.lineTo(x0, pad.t + ph); ctx.stroke();
    }

    return { pad, pw, ph, yRange, viewTMin, viewTMax };
  };

  const plotSignal = (ctx, data, color, lineWidth, layout, dashed = false) => {
    const { pad, pw, ph, yRange, viewTMin, viewTMax } = layout;
    ctx.save();
    ctx.beginPath();
    ctx.rect(pad.l, pad.t, pw, ph);
    ctx.clip();

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    if (dashed) ctx.setLineDash([5, 5]);

    let started = false;
    for (let i = 0; i < N; i++) {
      const t = indexToT(i);
      if (t < viewTMin - 0.1 || t > viewTMax + 0.1) continue;
      const x = pad.l + ((t - viewTMin) / (viewTMax - viewTMin)) * pw;
      const y = pad.t + (1 - (data[i] + yRange) / (2 * yRange)) * ph;
      if (!started) { ctx.beginPath(); ctx.moveTo(x, y); started = true; }
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.restore();
  };

  const render = () => {
    const { reflected, even, odd } = decompose(signal);
    
    canvasesRef.current.forEach((canvas, idx) => {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const container = containerRefs.current[idx];
      const dpr = window.devicePixelRatio || 1;
      const W = container.clientWidth;
      const H = container.clientHeight;

      if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        ctx.scale(dpr, dpr);
      }

      const layout = drawGrid(ctx, W, H, zoom.t, zoom.y);
      
      if (hasSignal) {
        if (idx === 0) {
          plotSignal(ctx, reflected, 'rgba(255, 255, 255, 0.2)', 1.5, layout, true);
          plotSignal(ctx, signal, '#a78bfa', 2.5, layout);
        } else if (idx === 1) {
          plotSignal(ctx, even, '#f59e0b', 2.5, layout);
        } else if (idx === 2) {
          plotSignal(ctx, odd, '#00d9ff', 2.5, layout);
        }
      }
    });
  };

  useEffect(() => {
    render();
    updateAnalysis(signal);
  }, [signal, hasSignal, zoom]);

  const handlePointer = (e) => {
    if (!isDrawing.current || !canvasesRef.current[0]) return;
    const canvas = canvasesRef.current[0];
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dpr = 1; // logical units
    const pad = { l: 50, r: 20, t: 20, b: 30 };
    const pw = canvas.clientWidth - pad.l - pad.r;
    const ph = canvas.clientHeight - pad.t - pad.b;
    const tHalf = 5 / zoom.t;
    const viewTMin = -tHalf;
    const viewTMax = tHalf;
    const yRange = 4 / zoom.y;

    const t = viewTMin + ((x - pad.l) / pw) * (viewTMax - viewTMin);
    const val = (1 - (y - pad.t) / ph) * 2 * yRange - yRange;

    const idx = tToIndex(t);
    if (idx >= 0 && idx < N) {
      const newSignal = new Float64Array(signal);
      if (lastDrawIdx.current !== -1) {
        const start = Math.min(lastDrawIdx.current, idx);
        const end = Math.max(lastDrawIdx.current, idx);
        const startVal = newSignal[lastDrawIdx.current];
        const endVal = val;
        for (let i = start; i <= end; i++) {
          const factor = (i - start) / (end - start || 1);
          newSignal[i] = startVal + (endVal - startVal) * (lastDrawIdx.current < idx ? factor : (1 - factor));
        }
      }
      newSignal[idx] = val;
      setSignal(newSignal);
      setHasSignal(true);
      lastDrawIdx.current = idx;
    }
  };

  const loadPreset = (type) => {
    const newSignal = new Float64Array(N);
    for (let i = 0; i < N; i++) {
      const t = indexToT(i);
      if (type === 'step') newSignal[i] = t >= 0 ? 1 : 0;
      else if (type === 'ramp') newSignal[i] = t >= 0 ? t : 0;
      else if (type === 'exp') newSignal[i] = t >= 0 ? Math.exp(-t) : 0;
      else if (type === 'saw') newSignal[i] = t - Math.floor(t + 0.5);
    }
    setSignal(newSignal);
    setHasSignal(true);
  };

  const clear = () => {
    setSignal(new Float64Array(N));
    setHasSignal(false);
    lastDrawIdx.current = -1;
  };

  return (
    <div className="w-full bg-[#1a2847]/20 rounded-3xl border border-[#00d9ff]/20 overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="p-6 border-b border-[#00d9ff]/10 flex flex-wrap items-center justify-between gap-4 bg-[#0a0e27]/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
            <Activity className="text-amber-500 w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold leading-none mb-1">El Espejo Matemático</h3>
            <p className="text-amber-500/60 text-[10px] uppercase tracking-widest font-mono">Simetría Par e Impar</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="hidden md:flex items-center gap-2 bg-black/40 p-1 rounded-lg border border-white/5">
              {['step', 'ramp', 'exp', 'saw'].map(p => (
                <button key={p} onClick={() => loadPreset(p)} className="px-3 py-1.5 rounded-md text-[10px] font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all uppercase">
                  {p === 'step' ? 'u(t)' : p === 'ramp' ? 'Rampa' : p === 'exp' ? 'e⁻ᵗ' : 'Sierra'}
                </button>
              ))}
           </div>
           <button onClick={clear} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all"><Eraser size={18} /></button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Main Workspace */}
        <div className="flex-grow p-6 space-y-4">
          {/* Signal 0 */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-2">
              <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
                <Pencil size={12} /> x(t) Original (Dibuja aquí)
              </span>
              <span className="text-[10px] font-mono text-slate-500 italic">Línea punteada: x(-t)</span>
            </div>
            <div className="h-48 bg-[#050816] rounded-xl border border-white/5 relative overflow-hidden cursor-crosshair" 
                 ref={el => containerRefs.current[0] = el}
                 onPointerDown={(e) => { isDrawing.current = true; lastDrawIdx.current = -1; handlePointer(e); }}
                 onPointerMove={handlePointer}
                 onPointerUp={() => isDrawing.current = false}
                 onPointerLeave={() => isDrawing.current = false}
            >
              {!hasSignal && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <div className="text-center">
                    <MousePointer2 className="w-8 h-8 text-[#00d9ff] mx-auto mb-2 animate-bounce" />
                    <p className="text-xs font-mono text-[#00d9ff]">Haz click y arrastra para dibujar</p>
                  </div>
                </div>
              )}
              <canvas ref={el => canvasesRef.current[0] = el} className="w-full h-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Even Part */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest px-2 block">xₑ(t) Componente Par</span>
              <div className="h-40 bg-[#050816] rounded-xl border border-white/5 overflow-hidden" ref={el => containerRefs.current[1] = el}>
                <canvas ref={el => canvasesRef.current[1] = el} className="w-full h-full" />
              </div>
            </div>
            {/* Odd Part */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#00d9ff] uppercase tracking-widest px-2 block">xₒ(t) Componente Impar</span>
              <div className="h-40 bg-[#050816] rounded-xl border border-white/5 overflow-hidden" ref={el => containerRefs.current[2] = el}>
                <canvas ref={el => canvasesRef.current[2] = el} className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="w-full lg:w-72 p-6 bg-[#0a0e27]/40 border-l border-[#00d9ff]/10 flex flex-col gap-6">
          <div className="space-y-4">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Análisis de Simetría</label>
             <div className={`p-4 rounded-xl bg-black/40 border border-white/5 transition-all ${hasSignal ? 'opacity-100' : 'opacity-40'}`}>
                <h4 className={`text-sm font-bold mb-2 uppercase tracking-tighter ${verdict.color}`}>{verdict.type}</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed font-light">{verdict.desc}</p>
             </div>
          </div>

          <div className="space-y-4">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Energía Relativa</label>
             <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-amber-500">Par (Eₑ)</span>
                    <span className="text-white">{energies.even.toFixed(2)}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-amber-500" 
                      initial={{ width: 0 }}
                      animate={{ width: `${(energies.even / (energies.total || 1)) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-[#00d9ff]">Impar (Eₒ)</span>
                    <span className="text-white">{energies.odd.toFixed(2)}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#00d9ff]" 
                      initial={{ width: 0 }}
                      animate={{ width: `${(energies.odd / (energies.total || 1)) * 100}%` }}
                    />
                  </div>
                </div>
             </div>
          </div>

          <div className="mt-auto p-4 rounded-xl bg-amber-500/5 border border-amber-500/10">
            <div className="flex gap-2 mb-2">
              <Info size={14} className="text-amber-500" />
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">Teoría</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed italic">
              "Toda señal física se descompone en una suma única de componentes par e impar."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymmetryLab;
