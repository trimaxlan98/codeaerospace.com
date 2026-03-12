import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, ShieldAlert, ShieldCheck, Info, Monitor, Zap, Radio, Settings2 } from 'lucide-react';

const NyquistLab = () => {
  const [params, setParams] = useState({
    f: 1.0,
    fs: 10.0,
    mode: 'general'
  });

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const requestRef = useRef();

  const isAliasing = params.fs <= 2 * params.f;
  const ratio = (params.fs / params.f).toFixed(1);
  const nyquistFreq = (2 * params.f).toFixed(1);

  const notes = {
    general: "El Teorema de Nyquist establece que fs ≥ 2f para evitar aliasing. Observa cómo la señal reconstruida (roja) diverge de la original (verde) al bajar la frecuencia de muestreo.",
    bionica: "En señales ECG, el complejo QRS tiene componentes de hasta 125 Hz. Se requiere fs ≥ 250 Hz. Un sub-muestreo causaría la pérdida del pico R, invalidando el diagnóstico de arritmias.",
    telematica: "El aliasing en comunicaciones genera frecuencias espejo (ISI). En VoIP (G.711), se usa fs = 8 kHz para un ancho de banda de voz de 3.4 kHz, cumpliendo con el margen de guarda.",
    mecatronica: "Un encoder con muestreo insuficiente reporta velocidades fantasma. Si un eje gira a 50 Hz y muestreas a 80 Hz, el lazo PID detectará oscilaciones de 30 Hz inexistentes."
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    
    const dpr = window.devicePixelRatio || 1;
    const W = container.clientWidth;
    const H = container.clientHeight;
    
    if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }

    const { f, fs } = params;
    const margin = { top: 40, bottom: 40, left: 60, right: 40 };
    const pw = W - margin.left - margin.right;
    const ph = H - margin.top - margin.bottom;
    const cy = margin.top + ph / 2;
    const tTotal = 3 / (f || 1); 
    const amp = ph / 2 - 20;

    const toX = (t) => margin.left + (t / tTotal) * pw;
    
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#050816';
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
      const x = margin.left + (i / 10) * pw;
      ctx.beginPath(); ctx.moveTo(x, margin.top); ctx.lineTo(x, H - margin.bottom); ctx.stroke();
      const y = margin.top + (i / 10) * ph;
      ctx.beginPath(); ctx.moveTo(margin.left, y); ctx.lineTo(W - margin.right, y); ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.2)';
    ctx.beginPath(); ctx.moveTo(margin.left, cy); ctx.lineTo(W - margin.right, cy); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(margin.left, margin.top); ctx.lineTo(margin.left, H - margin.bottom); ctx.stroke();

    // 1. Analog Signal x(t)
    ctx.beginPath();
    ctx.strokeStyle = isAliasing ? 'rgba(0, 255, 65, 0.2)' : 'rgba(0, 255, 65, 0.5)';
    ctx.lineWidth = 2;
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * tTotal;
      const y = cy - amp * Math.sin(2 * Math.PI * f * t);
      if (i === 0) ctx.moveTo(toX(t), y);
      else ctx.lineTo(toX(t), y);
    }
    ctx.stroke();

    // 2. Reconstructed Signal
    let fPerceived = f;
    if (isAliasing) {
      let fmod = f % fs;
      if (fmod > fs / 2) fmod = fs - fmod;
      fPerceived = fmod;
    }

    ctx.beginPath();
    ctx.strokeStyle = isAliasing ? '#ff2d55' : 'rgba(255, 45, 85, 0.3)';
    ctx.lineWidth = isAliasing ? 3 : 1.5;
    if (!isAliasing) ctx.setLineDash([5, 5]);
    for (let i = 0; i <= 200; i++) {
      const t = (i / 200) * tTotal;
      const y = cy - amp * Math.sin(2 * Math.PI * fPerceived * t);
      if (i === 0) ctx.moveTo(toX(t), y);
      else ctx.lineTo(toX(t), y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Samples x[n]
    const Ts = 1 / fs;
    const numSamples = Math.floor(tTotal / Ts) + 1;
    for (let n = 0; n < numSamples; n++) {
      const t = n * Ts;
      if (t > tTotal) break;
      const xPos = toX(t);
      const val = Math.sin(2 * Math.PI * f * t);
      const yPos = cy - amp * val;

      // Stem
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(xPos, cy); ctx.lineTo(xPos, yPos); ctx.stroke();

      // Dot
      ctx.fillStyle = '#00e5ff';
      ctx.beginPath(); ctx.arc(xPos, yPos, 4, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 10; ctx.shadowColor = '#00e5ff';
      ctx.stroke(); ctx.shadowBlur = 0;
    }

    requestRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(requestRef.current);
  }, [params]);

  return (
    <div className="w-full bg-[#1a2847]/20 rounded-3xl border border-[#00d9ff]/20 overflow-hidden backdrop-blur-sm">
      {/* Header Info */}
      <div className="p-6 border-b border-[#00d9ff]/10 flex flex-wrap items-center justify-between gap-6 bg-[#0a0e27]/40">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             <div className={`w-3 h-3 rounded-full ${isAliasing ? 'bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'}`} />
             <span className={`text-xs font-bold uppercase tracking-widest ${isAliasing ? 'text-red-500' : 'text-emerald-500'}`}>
               {isAliasing ? 'Aliasing Detectado' : 'Muestreo Seguro'}
             </span>
          </div>
          <div className="hidden sm:block h-8 w-px bg-white/10" />
          <div className="text-[10px] font-mono text-slate-400">
             NYQUIST: <span className="text-[#00d9ff]">{nyquistFreq} Hz</span> | RATIO: <span className="text-[#00d9ff]">{ratio}</span>
          </div>
        </div>

        <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
           {['general', 'bionica', 'telematica', 'mecatronica'].map(m => (
             <button 
                key={m}
                onClick={() => setParams(p => ({...p, mode: m}))}
                className={`px-3 py-1.5 rounded-md text-[9px] font-bold transition-all uppercase ${params.mode === m ? 'bg-[#00d9ff] text-[#0a0e27]' : 'text-slate-500 hover:text-white'}`}
             >
               {m === 'bionica' ? 'Bió' : m === 'telematica' ? 'Tel' : m === 'mecatronica' ? 'Mec' : 'Gen'}
             </button>
           ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Canvas Area */}
        <div className="flex-grow p-6">
           <div className="h-72 bg-[#050816] rounded-2xl border border-white/5 relative overflow-hidden" ref={containerRef}>
              <canvas ref={canvasRef} className="w-full h-full" />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                 <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/60 border border-emerald-500/20 backdrop-blur-md">
                    <div className="w-3 h-0.5 bg-emerald-500" />
                    <span className="text-[9px] text-emerald-500/80 font-mono">x(t) Original</span>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/60 border border-[#00d9ff]/20 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-[#00d9ff]" />
                    <span className="text-[9px] text-[#00d9ff]/80 font-mono">x[n] Muestras</span>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-black/60 border border-red-500/20 backdrop-blur-md">
                    <div className="w-3 h-0.5 bg-red-500" />
                    <span className="text-[9px] text-red-500/80 font-mono">Reconstrucción</span>
                 </div>
              </div>
           </div>

           {/* Engineering Note Area */}
           <motion.div 
              key={params.mode}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-4 p-4 rounded-xl bg-amber-500/5 border-l-4 border-amber-500/40"
           >
              <div className="flex gap-2 mb-1">
                 <Settings2 size={14} className="text-amber-500" />
                 <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Nota de Ingeniería: {params.mode}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed italic">
                 "{notes[params.mode]}"
              </p>
           </motion.div>
        </div>

        {/* Sidebar Controls */}
        <div className="w-full lg:w-72 p-6 bg-[#0a0e27]/40 border-l border-[#00d9ff]/10 flex flex-col gap-8">
           <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Frecuencia Señal (f)</span>
                  <span className="text-sm font-mono text-emerald-500">{params.f.toFixed(1)} Hz</span>
                </div>
                <input 
                  type="range" min="1" max="10" step="0.1" value={params.f}
                  onChange={(e) => setParams(p => ({...p, f: parseFloat(e.target.value)}))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Frecuencia Muestreo (fs)</span>
                  <span className="text-sm font-mono text-[#00d9ff]">{params.fs.toFixed(1)} Hz</span>
                </div>
                <input 
                  type="range" min="1" max="30" step="0.5" value={params.fs}
                  onChange={(e) => setParams(p => ({...p, fs: parseFloat(e.target.value)}))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00d9ff]"
                />
              </div>
           </div>

           <div className="space-y-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Estado DSP</span>
                    {isAliasing ? <ShieldAlert size={16} className="text-red-500" /> : <ShieldCheck size={16} className="text-emerald-500" />}
                 </div>
                 <p className="text-[10px] text-slate-400 leading-normal">
                    {isAliasing 
                      ? "Sub-muestreo crítico. La señal roja no coincide con la original verde." 
                      : "Muestreo nominal. La reconstrucción es fiel a la fuente analógica."
                    }
                  </p>
              </div>
           </div>

           <div className="mt-auto flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                 <Radio size={12} /> Ts = {(1/params.fs).toFixed(4)} s
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                 <Monitor size={12} /> Nyquist: {nyquistFreq} Hz
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NyquistLab;
