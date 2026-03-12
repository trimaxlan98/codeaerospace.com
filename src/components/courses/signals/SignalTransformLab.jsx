import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Activity, RefreshCcw, Info, Settings2, Maximize2 } from 'lucide-react';

const SignalTransformLab = () => {
  const [params, setParams] = useState({
    A: 1.0,
    a: 1.0,
    b: 0.0,
    signal: 'triangle'
  });

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const requestRef = useRef();

  // Signal definitions
  const baseSignal = (t, type) => {
    switch (type) {
      case 'triangle':
        return Math.abs(t) <= 1 ? 1 - Math.abs(t) : 0;
      case 'rect':
        return Math.abs(t) <= 1 ? 1 : 0;
      case 'sinc':
        if (Math.abs(t) < 1e-10) return 1;
        return Math.sin(Math.PI * t) / (Math.PI * t);
      case 'exp':
        return t >= 0 ? Math.exp(-t) : 0;
      default:
        return 0;
    }
  };

  const transformedSignal = (t, A, a, b, type) => {
    return A * baseSignal(a * t - b, type);
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

    const { A, a, b, signal } = params;
    const tRange = [-7, 7];
    const yRange = [-0.6, 2.5];
    const padding = { top: 40, right: 30, bottom: 40, left: 50 };
    const plot = {
      x: padding.left,
      y: padding.top,
      w: W - padding.left - padding.right,
      h: H - padding.top - padding.bottom
    };

    const tToX = (t) => plot.x + ((t - tRange[0]) / (tRange[1] - tRange[0])) * plot.w;
    const yToY = (y) => plot.y + plot.h - ((y - yRange[0]) / (yRange[1] - yRange[0])) * plot.h;

    ctx.clearRect(0, 0, W, H);

    // Grid and Background
    ctx.fillStyle = '#0a0e27';
    ctx.fillRect(0, 0, W, H);

    // Draw Grid Lines
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let t = tRange[0]; t <= tRange[1]; t += 1) {
      const x = tToX(t);
      ctx.beginPath(); ctx.moveTo(x, plot.y); ctx.lineTo(x, plot.y + plot.h); ctx.stroke();
    }
    for (let y = -0.5; y <= yRange[1]; y += 0.5) {
      const py = yToY(y);
      ctx.beginPath(); ctx.moveTo(plot.x, py); ctx.lineTo(plot.x + plot.w, py); ctx.stroke();
    }

    // Axes
    const axisX = yToY(0);
    const axisY = tToX(0);
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(plot.x, axisX); ctx.lineTo(plot.x + plot.w, axisX); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(axisY, plot.y); ctx.lineTo(axisY, plot.y + plot.h); ctx.stroke();

    // Labels
    ctx.font = '10px JetBrains Mono';
    ctx.fillStyle = 'rgba(0, 217, 255, 0.4)';
    ctx.textAlign = 'center';
    for (let t = tRange[0]; t <= tRange[1]; t += 2) {
      if (t === 0) continue;
      ctx.fillText(t, tToX(t), axisX + 15);
    }
    ctx.textAlign = 'right';
    for (let y = 0.5; y <= yRange[1]; y += 0.5) {
      ctx.fillText(y, axisY - 10, yToY(y) + 4);
    }

    // Draw Original (Dashed)
    const samples = 400;
    const dt = (tRange[1] - tRange[0]) / samples;
    
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath();
    for (let i = 0; i <= samples; i++) {
      const t = tRange[0] + i * dt;
      const y = baseSignal(t, signal);
      if (i === 0) ctx.moveTo(tToX(t), yToY(y));
      else ctx.lineTo(tToX(t), yToY(y));
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Transformed
    ctx.strokeStyle = '#00d9ff';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(0, 217, 255, 0.5)';
    ctx.beginPath();
    for (let i = 0; i <= samples; i++) {
      const t = tRange[0] + i * dt;
      const y = transformedSignal(t, A, a, b, signal);
      if (i === 0) ctx.moveTo(tToX(t), yToY(y));
      else ctx.lineTo(tToX(t), yToY(y));
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    requestRef.current = requestAnimationFrame(draw);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(requestRef.current);
  }, [params]);

  const resetParams = () => setParams({ A: 1.0, a: 1.0, b: 0.0, signal: 'triangle' });

  return (
    <div className="w-full bg-[#1a2847]/20 rounded-3xl border border-[#00d9ff]/20 overflow-hidden backdrop-blur-sm">
      <div className="p-6 border-b border-[#00d9ff]/10 flex flex-wrap items-center justify-between gap-4 bg-[#0a0e27]/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00d9ff]/10 flex items-center justify-center border border-[#00d9ff]/20">
            <Activity className="text-[#00d9ff] w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-bold leading-none mb-1">Transformaciones x(at - b)</h3>
            <p className="text-[#00d9ff]/60 text-[10px] uppercase tracking-widest font-mono">Laboratorio Interactivo 01</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={resetParams}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-[#00d9ff] hover:border-[#00d9ff]/30 transition-all"
            title="Resetear"
          >
            <RefreshCcw size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Canvas Area */}
        <div className="flex-grow p-4 min-h-[400px]" ref={containerRef}>
           <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/5 bg-[#050816]">
              <canvas ref={canvasRef} className="w-full h-full" />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/60 border border-white/10 backdrop-blur-md">
                    <div className="w-3 h-1 bg-white/30 rounded-full" />
                    <span className="text-[10px] text-white/50 font-mono">x(t) original</span>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/60 border border-[#00d9ff]/30 backdrop-blur-md">
                    <div className="w-3 h-1 bg-[#00d9ff] rounded-full shadow-[0_0_8px_#00d9ff]" />
                    <span className="text-[10px] text-[#00d9ff] font-mono font-bold">y(t) transformado</span>
                 </div>
              </div>
              <div className="absolute bottom-4 left-4">
                 <div className="px-3 py-1.5 rounded-md bg-black/60 border border-white/10 backdrop-blur-md">
                    <span className="text-[10px] text-[#00d9ff] font-mono">
                      y(t) = {params.A.toFixed(2)} · x({params.a.toFixed(2)}t {params.b >= 0 ? '-' : '+'} {Math.abs(params.b).toFixed(2)})
                    </span>
                 </div>
              </div>
           </div>
        </div>

        {/* Controls Area */}
        <div className="w-full lg:w-80 p-6 bg-[#0a0e27]/40 border-l border-[#00d9ff]/10 flex flex-col gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Señal Base</label>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['triangle', 'rect', 'sinc', 'exp'].map(sig => (
                <button
                  key={sig}
                  onClick={() => setParams(p => ({...p, signal: sig}))}
                  className={`py-2 px-3 rounded-lg text-[10px] font-bold uppercase transition-all border ${
                    params.signal === sig 
                    ? 'bg-[#00d9ff]/20 border-[#00d9ff]/50 text-[#00d9ff]' 
                    : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20'
                  }`}
                >
                  {sig === 'triangle' ? 'Triangular' : sig === 'rect' ? 'Rectangular' : sig === 'sinc' ? 'Sinc' : 'Exponencial'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {/* Amplitude A */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">A - Amplitud</span>
                <span className="text-sm font-mono text-amber-500">{params.A.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0" max="2" step="0.01" value={params.A}
                onChange={(e) => setParams(p => ({...p, A: parseFloat(e.target.value)}))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Scale a */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">a - Escala Temporal</span>
                <span className="text-sm font-mono text-emerald-500">{params.a.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="0.1" max="3" step="0.01" value={params.a}
                onChange={(e) => setParams(p => ({...p, a: parseFloat(e.target.value)}))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Shift b */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-xs font-bold text-[#00d9ff] uppercase tracking-widest">b - Desplazamiento</span>
                <span className="text-sm font-mono text-[#00d9ff]">{params.b.toFixed(2)}</span>
              </div>
              <input 
                type="range" min="-5" max="5" step="0.01" value={params.b}
                onChange={(e) => setParams(p => ({...p, b: parseFloat(e.target.value)}))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#00d9ff]"
              />
            </div>
          </div>

          <div className="mt-auto p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
            <div className="flex gap-2 mb-2">
              <Info size={14} className="text-[#00d9ff]" />
              <span className="text-[10px] font-bold text-[#00d9ff] uppercase tracking-wider">Concepto</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed italic">
              "El desplazamiento real en el tiempo es <strong>t₀ = b/a</strong>. Si b {'>'} 0, la señal se desplaza a la derecha (atraso)."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignalTransformLab;
