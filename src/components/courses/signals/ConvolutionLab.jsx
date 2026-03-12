import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Info, Settings2, BarChart2, Activity, Zap } from 'lucide-react';

const ConvolutionLab = () => {
  const [state, setState] = useState({
    signalPair: 0,
    currentT: -4,
    isPlaying: false,
    isDiscrete: false,
    animSpeed: 1
  });

  const canvasTopRef = useRef(null);
  const canvasBotRef = useRef(null);
  const requestRef = useRef();
  const lastTimeRef = useRef();

  const COLORS = {
    cyan: '#00d4ff',
    magenta: '#e040fb',
    orange: '#ff6b2b',
    orangeFill: 'rgba(255,107,43,0.30)',
    green: '#00e676',
    greenDim: 'rgba(0,230,118,0.15)',
    grid: 'rgba(255,255,255,0.04)',
    axis: 'rgba(255,255,255,0.12)',
    bg: '#050816'
  };

  const signalPairDefs = (idx) => {
    switch(idx) {
      case 0: return {
        name: 'Pulso ∗ Pulso → Triángulo',
        x: (tau) => (tau >= -1 && tau < 1) ? 1 : 0,
        h: (tau) => (tau >= -1 && tau < 1) ? 1 : 0,
        tMin: -4, tMax: 6, tauRange: [-3, 5],
        yMax: 2.2
      };
      case 1: return {
        name: 'Pulso ∗ Exp Decay → Carga RC',
        x: (tau) => (tau >= 0 && tau < 2) ? 1 : 0,
        h: (tau) => (tau >= 0) ? Math.exp(-tau * 1.5) : 0,
        tMin: -3, tMax: 7, tauRange: [-2, 6],
        yMax: 1.2
      };
      case 2: return {
        name: 'Seno ∗ Pulso Estrecho → Promedio Móvil',
        x: (tau) => (tau >= -3 && tau <= 3) ? Math.sin(2 * Math.PI * 0.5 * tau) : 0,
        h: (tau) => (tau >= -0.5 && tau < 0.5) ? 1 : 0,
        tMin: -5, tMax: 6, tauRange: [-4, 5],
        yMax: 1.5
      };
      default: return signalPairDefs(0);
    }
  };

  const sig = signalPairDefs(state.signalPair);

  const computeConvolution = (tVal) => {
    const dt = 0.01;
    let sum = 0;
    for (let tau = sig.tauRange[0]; tau <= sig.tauRange[1]; tau += dt) {
      sum += sig.x(tau) * sig.h(tVal - tau) * dt;
    }
    return sum;
  };

  const draw = () => {
    const canvases = [canvasTopRef.current, canvasBotRef.current];
    if (!canvases[0] || !canvases[1]) return;
    const dpr = window.devicePixelRatio || 1;

    canvases.forEach((canvas, idx) => {
      const ctx = canvas.getContext('2d');
      const W = canvas.clientWidth;
      const H = canvas.clientHeight;
      
      if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
        canvas.width = W * dpr; canvas.height = H * dpr;
        ctx.scale(dpr, dpr);
      }

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, W, H);

      const pad = { l: 50, r: 30, t: 30, b: 30 };
      const xRange = idx === 0 ? sig.tauRange : [sig.tMin, sig.tMax];
      const yRange = idx === 0 ? [-1.5, 1.5] : [-sig.yMax * 0.3, sig.yMax];
      const plot = { x: pad.l, y: pad.t, w: W - pad.l - pad.r, h: H - pad.t - pad.b };

      const toX = (val) => plot.x + ((val - xRange[0]) / (xRange[1] - xRange[0])) * plot.w;
      const toY = (val) => plot.y + plot.h - ((val - yRange[0]) / (yRange[1] - yRange[0])) * plot.h;

      // Grid
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 1;
      for (let x = Math.ceil(xRange[0]); x <= xRange[1]; x++) {
        ctx.beginPath(); ctx.moveTo(toX(x), pad.t); ctx.lineTo(toX(x), H - pad.b); ctx.stroke();
      }

      // Axis
      ctx.strokeStyle = COLORS.axis;
      ctx.beginPath(); ctx.moveTo(pad.l, toY(0)); ctx.lineTo(W - pad.r, toY(0)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(toX(0), pad.t); ctx.lineTo(toX(0), H - pad.b); ctx.stroke();

      if (idx === 0) {
        // TOP CANVAS: x(tau) and h(t-tau)
        const t = state.currentT;
        const prodFn = (tau) => sig.x(tau) * sig.h(t - tau);

        // Intersection Area
        ctx.fillStyle = COLORS.orangeFill;
        ctx.beginPath();
        ctx.moveTo(toX(sig.tauRange[0]), toY(0));
        for (let tau = sig.tauRange[0]; tau <= sig.tauRange[1]; tau += 0.05) {
          ctx.lineTo(toX(tau), toY(prodFn(tau)));
        }
        ctx.lineTo(toX(sig.tauRange[1]), toY(0));
        ctx.fill();

        // Signal X
        ctx.strokeStyle = COLORS.cyan;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let tau = sig.tauRange[0]; tau <= sig.tauRange[1]; tau += 0.05) {
          idx === 0 ? ctx.moveTo(toX(tau), toY(sig.x(tau))) : ctx.lineTo(toX(tau), toY(sig.x(tau)));
          if (tau === sig.tauRange[0]) ctx.moveTo(toX(tau), toY(sig.x(tau)));
          else ctx.lineTo(toX(tau), toY(sig.x(tau)));
        }
        ctx.stroke();

        // Signal H (shifted and flipped)
        ctx.strokeStyle = COLORS.magenta;
        ctx.beginPath();
        for (let tau = sig.tauRange[0]; tau <= sig.tauRange[1]; tau += 0.05) {
          const val = sig.h(t - tau);
          if (tau === sig.tauRange[0]) ctx.moveTo(toX(tau), toY(val));
          else ctx.lineTo(toX(tau), toY(val));
        }
        ctx.stroke();
      } else {
        // BOTTOM CANVAS: Result y(t)
        ctx.strokeStyle = COLORS.green;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let t = sig.tMin; t <= state.currentT; t += 0.05) {
          const y = computeConvolution(t);
          if (t === sig.tMin) ctx.moveTo(toX(t), toY(y));
          else ctx.lineTo(toX(t), toY(y));
        }
        ctx.stroke();

        // Current point marker
        const yAtT = computeConvolution(state.currentT);
        ctx.fillStyle = COLORS.orange;
        ctx.beginPath(); ctx.arc(toX(state.currentT), toY(yAtT), 5, 0, Math.PI * 2); ctx.fill();
        ctx.shadowBlur = 10; ctx.shadowColor = COLORS.orange; ctx.stroke(); ctx.shadowBlur = 0;
      }
    });
  };

  const animate = (time) => {
    if (state.isPlaying) {
      if (lastTimeRef.current !== undefined) {
        const deltaTime = (time - lastTimeRef.current) / 1000;
        setState(s => {
          let nextT = s.currentT + deltaTime * 0.8 * s.animSpeed;
          if (nextT > sig.tMax) nextT = sig.tMin;
          return { ...s, currentT: nextT };
        });
      }
      lastTimeRef.current = time;
    }
    draw();
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [state.isPlaying, state.currentT, state.signalPair, state.animSpeed]);

  return (
    <div className="w-full bg-[#1a2847]/20 rounded-3xl border border-[#00d9ff]/20 overflow-hidden backdrop-blur-sm">
      {/* Control Header */}
      <div className="p-6 border-b border-[#00d9ff]/10 flex flex-wrap items-center justify-between gap-6 bg-[#0a0e27]/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
            <BarChart2 className="text-orange-500 w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold leading-none mb-1">Convolución Gráfica</h3>
            <p className="text-orange-500/60 text-[10px] uppercase tracking-widest font-mono font-bold">UPIITA - IPN</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <select 
              value={state.signalPair} 
              onChange={(e) => setState(s => ({...s, signalPair: parseInt(e.target.value), currentT: signalPairDefs(parseInt(e.target.value)).tMin}))}
              className="bg-black/40 border border-white/10 text-slate-300 text-[10px] font-bold rounded-lg px-3 py-2 outline-none focus:border-[#00d9ff]/50"
           >
              <option value={0}>Pulso * Pulso</option>
              <option value={1}>Pulso * Exponencial</option>
              <option value={2}>Seno * Pulso</option>
           </select>
           
           <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
              <button 
                onClick={() => setState(s => ({...s, isPlaying: !s.isPlaying}))}
                className="p-2 rounded-md hover:bg-white/5 text-[#00d9ff] transition-all"
              >
                {state.isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button 
                onClick={() => setState(s => ({...s, currentT: sig.tMin, isPlaying: false}))}
                className="p-2 rounded-md hover:bg-white/5 text-slate-400 transition-all"
              >
                <RotateCcw size={16} />
              </button>
           </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Canvases */}
        <div className="flex-grow p-6 space-y-4">
           <div className="h-56 bg-[#050816] rounded-2xl border border-white/5 relative overflow-hidden">
              <span className="absolute top-3 left-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest z-10">Proceso: x(τ) · h(t-τ)</span>
              <canvas ref={canvasTopRef} className="w-full h-full" />
              <div className="absolute bottom-3 right-4 flex gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-[#00d4ff]" />
                    <span className="text-[9px] text-slate-500 font-mono">x(τ)</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-[#e040fb]" />
                    <span className="text-[9px] text-slate-500 font-mono">h(t-τ)</span>
                 </div>
              </div>
           </div>

           <div className="h-40 bg-[#050816] rounded-2xl border border-white/5 relative overflow-hidden">
              <span className="absolute top-3 left-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest z-10">Resultado: y(t)</span>
              <canvas ref={canvasBotRef} className="w-full h-full" />
              <div className="absolute bottom-3 right-4">
                 <div className="px-3 py-1 rounded-md bg-black/60 border border-orange-500/20 backdrop-blur-md">
                    <span className="text-[10px] text-orange-500 font-mono font-bold">
                      y({state.currentT.toFixed(1)}) = {computeConvolution(state.currentT).toFixed(3)}
                    </span>
                 </div>
              </div>
           </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-72 p-6 bg-[#0a0e27]/40 border-l border-[#00d9ff]/10 flex flex-col gap-8">
           <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">t - Tiempo</span>
                  <span className="text-sm font-mono text-orange-500">{state.currentT.toFixed(2)}</span>
                </div>
                <input 
                  type="range" min={sig.tMin} max={sig.tMax} step="0.01" value={state.currentT}
                  onChange={(e) => setState(s => ({...s, currentT: parseFloat(e.target.value), isPlaying: false}))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Velocidad</span>
                <div className="flex gap-2">
                   {[0.5, 1, 2].map(v => (
                     <button 
                        key={v}
                        onClick={() => setState(s => ({...s, animSpeed: v}))}
                        className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all border ${state.animSpeed === v ? 'bg-[#00d9ff]/20 border-[#00d9ff]/50 text-[#00d9ff]' : 'bg-white/5 border-white/10 text-slate-500'}`}
                     >{v}x</button>
                   ))}
                </div>
              </div>
           </div>

           <div className="p-4 rounded-xl bg-black/40 border border-white/5">
              <div className="flex gap-2 mb-2">
                 <Settings2 size={14} className="text-[#00d9ff]" />
                 <span className="text-[10px] font-bold text-[#00d9ff] uppercase tracking-wider">Modo</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-normal">
                {state.isDiscrete ? "Suma de Convolución: y[n] = Σ x[k]h[n-k]" : "Integral de Convolución: y(t) = ∫ x(τ)h(t-τ)dτ"}
              </p>
           </div>

           <div className="mt-auto p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
              <div className="flex gap-2 mb-2">
                <Info size={14} className="text-orange-500" />
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">Concepto</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed italic">
                "La convolución representa el área bajo el producto de una señal y la versión invertida/desplazada de otra."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ConvolutionLab;
