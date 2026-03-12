import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, TrendingUp, Move, Info, ArrowUp, ArrowDown } from 'lucide-react';

const SingularityLab = () => {
  const [state, setState] = useState({
    fn: 'impulse',    // impulse | step | ramp
    isDT: false,      // false = CT, true = DT
    t0: 0,
    amp: 1
  });

  const canvasRefs = useRef([null, null, null]);
  const containerRefs = useRef([null, null, null]);
  const requestRef = useRef();

  // Signal Evaluation Logic
  const evalSignals = () => {
    const { fn, isDT, t0, amp } = state;
    const sigma = 0.08; // for CT Dirac approximation

    const fns = {
      ct: {
        impulse: (t) => amp * Math.exp(-((t - t0) ** 2) / (2 * sigma ** 2)) / (sigma * Math.sqrt(2 * Math.PI)),
        step: (t) => t >= t0 ? amp : 0,
        ramp: (t) => t >= t0 ? amp * (t - t0) : 0,
        deriv_impulse: (t) => -amp * (t - t0) / (sigma ** 2) * Math.exp(-((t - t0) ** 2) / (2 * sigma ** 2)) / (sigma * Math.sqrt(2 * Math.PI)),
        deriv_step: (t) => amp * Math.exp(-((t - t0) ** 2) / (2 * sigma ** 2)) / (sigma * Math.sqrt(2 * Math.PI)),
        deriv_ramp: (t) => t >= t0 ? amp : 0,
        integ_impulse: (t) => t >= t0 ? amp : 0,
        integ_step: (t) => t >= t0 ? amp * (t - t0) : 0,
        integ_ramp: (t) => t >= t0 ? 0.5 * amp * (t - t0) ** 2 : 0
      },
      dt: {
        impulse: (n) => Math.round(n) === Math.round(t0) ? amp : 0,
        step: (n) => n >= Math.round(t0) ? amp : 0,
        ramp: (n) => n >= Math.round(t0) ? amp * (n - Math.round(t0)) : 0,
        deriv_impulse: (n) => (Math.round(n) === Math.round(t0) ? amp : 0) - (Math.round(n-1) === Math.round(t0) ? amp : 0),
        deriv_step: (n) => Math.round(n) === Math.round(t0) ? amp : 0,
        deriv_ramp: (n) => n >= Math.round(t0) ? amp : 0,
        integ_impulse: (n) => n >= Math.round(t0) ? amp : 0,
        integ_step: (n) => n >= Math.round(t0) ? amp * (n - Math.round(t0)) : 0,
        integ_ramp: (n) => {
          const n0 = Math.round(t0);
          if (n < n0) return 0;
          let sum = 0;
          for(let k = n0; k <= n; k++) sum += amp * (k - n0);
          return sum;
        }
      }
    };

    const domain = isDT ? fns.dt : fns.ct;
    return [
      domain[`deriv_${fn}`],
      domain[fn],
      domain[`integ_${fn}`]
    ];
  };

  const draw = () => {
    const xRange = [-6, 6];
    const { fn, isDT, amp } = state;
    const signalFns = evalSignals();
    
    // Automatic Y-Scaling
    const getYRange = (idx) => {
      if (fn === 'impulse') {
        if (idx === 0) return [-6 * amp, 6 * amp]; // deriv
        if (idx === 1) return [-1, 6 * amp];      // func
        return [-0.5, 1.5 * amp];                  // integ
      }
      if (fn === 'step') {
        if (idx === 0) return [-1, 6 * amp];      // deriv
        if (idx === 1) return [-0.5, 1.5 * amp];  // func
        return [-1, 6 * amp];                     // integ
      }
      if (idx === 0) return [-0.5, 1.5 * amp];    // deriv
      if (idx === 1) return [-1, 6 * amp];        // func
      return [-2, 20 * amp];                      // integ
    };

    canvasRefs.current.forEach((canvas, idx) => {
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const container = containerRefs.current[idx];
      const dpr = window.devicePixelRatio || 1;
      const W = container.clientWidth;
      const H = container.clientHeight;

      if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
        canvas.width = W * dpr; canvas.height = H * dpr;
        ctx.scale(dpr, dpr);
      }

      const yRange = getYRange(idx);
      const pad = { t: 30, b: 30, l: 40, r: 40 };
      const plot = { x: pad.l, y: pad.t, w: W - pad.l - pad.r, h: H - pad.t - pad.b };

      const toX = (t) => plot.x + ((t - xRange[0]) / (xRange[1] - xRange[0])) * plot.w;
      const toY = (y) => plot.y + plot.h - ((y - yRange[0]) / (yRange[1] - yRange[0])) * plot.h;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#050816';
      ctx.fillRect(0, 0, W, H);

      // Grid
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = xRange[0]; x <= xRange[1]; x++) {
         ctx.beginPath(); ctx.moveTo(toX(x), pad.t); ctx.lineTo(toX(x), H - pad.b); ctx.stroke();
      }

      // Axis
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.2)';
      ctx.beginPath(); ctx.moveTo(pad.l, toY(0)); ctx.lineTo(W - pad.r, toY(0)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(toX(0), pad.t); ctx.lineTo(toX(0), H - pad.b); ctx.stroke();

      // Plot
      const colors = ['#ff6b6b', '#00d9ff', '#69db7c'];
      ctx.strokeStyle = colors[idx];
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 8;
      ctx.shadowColor = colors[idx];

      if (isDT) {
        for (let n = xRange[0]; n <= xRange[1]; n++) {
          const val = signalFns[idx](n);
          const px = toX(n);
          const py = toY(val);
          ctx.beginPath(); ctx.moveTo(px, toY(0)); ctx.lineTo(px, py); ctx.stroke();
          ctx.fillStyle = colors[idx];
          ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2); ctx.fill();
        }
      } else {
        ctx.beginPath();
        for (let i = 0; i <= 200; i++) {
          const t = xRange[0] + (i / 200) * (xRange[1] - xRange[0]);
          const val = signalFns[idx](t);
          if (i === 0) ctx.moveTo(toX(t), toY(val));
          else ctx.lineTo(toX(t), toY(val));
        }
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
    });
    requestRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(requestRef.current);
  }, [state]);

  const labels = {
    impulse: { deriv: "δ'(t)", func: "δ(t)", integ: "u(t)" },
    step: { deriv: "δ(t)", func: "u(t)", integ: "r(t)" },
    ramp: { deriv: "u(t)", func: "r(t)", integ: "∫r(t)" }
  };

  return (
    <div className="w-full bg-[#1a2847]/20 rounded-3xl border border-[#00d9ff]/20 overflow-hidden backdrop-blur-sm">
      <div className="p-6 border-b border-[#00d9ff]/10 flex flex-wrap items-center justify-between gap-6 bg-[#0a0e27]/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <Zap className="text-emerald-500 w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold leading-none mb-1">Átomos de Señal</h3>
            <p className="text-emerald-500/60 text-[10px] uppercase tracking-widest font-mono">Genealogía Funcional</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
             <button 
                onClick={() => setState(s => ({...s, isDT: false}))}
                className={`px-4 py-1.5 rounded-md text-[10px] font-bold transition-all ${!state.isDT ? 'bg-[#00d9ff] text-[#0a0e27]' : 'text-slate-500'}`}
             >CT</button>
             <button 
                onClick={() => setState(s => ({...s, isDT: true}))}
                className={`px-4 py-1.5 rounded-md text-[10px] font-bold transition-all ${state.isDT ? 'bg-emerald-500 text-[#0a0e27]' : 'text-slate-500'}`}
             >DT</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Graph Stack */}
        <div className="flex-grow p-6 space-y-2">
           {/* Deriv */}
           <div className="relative">
              <span className="absolute top-2 left-4 text-[9px] font-bold text-[#ff6b6b] uppercase tracking-widest z-10">Derivada / Diferencia: {labels[state.fn].deriv}</span>
              <div className="h-32 bg-[#050816] rounded-xl border border-white/5 overflow-hidden" ref={el => containerRefs.current[0] = el}>
                <canvas ref={el => canvasRefs.current[0] = el} className="w-full h-full" />
              </div>
           </div>
           
           <div className="flex justify-center py-1">
              <ArrowDown size={14} className="text-white/20" />
           </div>

           {/* Func */}
           <div className="relative">
              <span className="absolute top-2 left-4 text-[9px] font-bold text-[#00d9ff] uppercase tracking-widest z-10">Función Maestra: {labels[state.fn].func}</span>
              <div className="h-32 bg-[#050816] rounded-xl border border-[#00d9ff]/20 overflow-hidden" ref={el => containerRefs.current[1] = el}>
                <canvas ref={el => canvasRefs.current[1] = el} className="w-full h-full" />
              </div>
           </div>

           <div className="flex justify-center py-1">
              <ArrowDown size={14} className="text-white/20" />
           </div>

           {/* Integ */}
           <div className="relative">
              <span className="absolute top-2 left-4 text-[9px] font-bold text-[#69db7c] uppercase tracking-widest z-10">Integral / Suma: {labels[state.fn].integ}</span>
              <div className="h-32 bg-[#050816] rounded-xl border border-white/5 overflow-hidden" ref={el => containerRefs.current[2] = el}>
                <canvas ref={el => canvasRefs.current[2] = el} className="w-full h-full" />
              </div>
           </div>
        </div>

        {/* Sidebar Controls */}
        <div className="w-full lg:w-72 p-6 bg-[#0a0e27]/40 border-l border-[#00d9ff]/10 flex flex-col gap-6">
           <div className="space-y-4">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Función de Base</label>
              <div className="grid grid-cols-1 gap-2">
                {['impulse', 'step', 'ramp'].map(f => (
                  <button
                    key={f}
                    onClick={() => setState(s => ({...s, fn: f}))}
                    className={`py-3 px-4 rounded-xl text-[10px] font-bold uppercase transition-all border flex items-center justify-between ${
                      state.fn === f 
                      ? 'bg-[#00d9ff]/20 border-[#00d9ff]/50 text-[#00d9ff]' 
                      : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
                    }`}
                  >
                    <span>{f === 'impulse' ? 'Impulso δ' : f === 'step' ? 'Escalón u' : 'Rampa r'}</span>
                    {state.fn === f && <TrendingUp size={14} />}
                  </button>
                ))}
              </div>
           </div>

           <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">t₀ Desplazamiento</span>
                  <span className="text-sm font-mono text-[#00d9ff]">{state.t0.toFixed(1)}</span>
                </div>
                <input 
                  type="range" min="-4" max="4" step={state.isDT ? "1" : "0.1"} value={state.t0}
                  onChange={(e) => setState(s => ({...s, t0: parseFloat(e.target.value)}))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00d9ff]"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">A Amplitud</span>
                  <span className="text-sm font-mono text-[#00d9ff]">{state.amp.toFixed(1)}</span>
                </div>
                <input 
                  type="range" min="0.5" max="3" step="0.1" value={state.amp}
                  onChange={(e) => setState(s => ({...s, amp: parseFloat(e.target.value)}))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00d9ff]"
                />
              </div>
           </div>

           <div className="mt-auto p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
              <div className="flex gap-2 mb-2">
                <Info size={14} className="text-emerald-500" />
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Relación Atómica</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed italic">
                {state.isDT 
                  ? "En DT, la 'derivada' es la Primera Diferencia y la 'integral' es la Suma Acumulada."
                  : "Las funciones singulares están vinculadas por el operador de derivación e integración."
                }
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SingularityLab;
