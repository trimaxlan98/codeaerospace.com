import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 1000);
    const t2 = setTimeout(onComplete, 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#0a0e27] flex flex-col items-center justify-center transition-opacity duration-400 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
      style={{ transitionDuration: '400ms' }}
    >
      {/* Pure CSS orbital animation */}
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 rounded-full border border-[#00d9ff]/20 animate-spin-slow">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#00d9ff] rounded-full shadow-[0_0_8px_rgba(0,217,255,0.8)]" />
        </div>
        <div className="absolute inset-4 rounded-full border border-[#00d9ff]/30 animate-spin-reverse">
          <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-[#00d9ff] rounded-full shadow-[0_0_15px_rgba(0,217,255,0.5)] animate-pulse-glow" />
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-1 tracking-tight">Co.De Aerospace</h2>
      <span className="text-[10px] text-[#00d9ff] font-mono uppercase tracking-widest opacity-70">Initializing...</span>

      {/* CSS progress bar */}
      <div className="mt-6 w-40 h-0.5 bg-[#1a2847] rounded-full overflow-hidden">
        <div className="h-full bg-[#00d9ff] rounded-full animate-progress-fill" />
      </div>
    </div>
  );
};

export default LoadingScreen;
