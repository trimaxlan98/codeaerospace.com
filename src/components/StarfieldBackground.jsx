import React, { useMemo } from 'react';

const StarfieldBackground = () => {
  const stars = useMemo(() => {
    const result = [];
    // Deep layer (smaller, slower)
    for (let i = 0; i < 100; i++) {
      result.push({
        id: `deep-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 1 + 0.2,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 10,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }
    // Middle layer (standard)
    for (let i = 0; i < 50; i++) {
      result.push({
        id: `mid-${i}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 5 + 4,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.6 + 0.3,
      });
    }
    return result;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050714]" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            opacity: star.opacity,
            willChange: 'opacity',
          }}
        />
      ))}
      {/* Nebulas */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#00d9ff]/[0.03] rounded-full blur-[120px] animate-nebula-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/[0.02] rounded-full blur-[100px] animate-nebula-pulse" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default StarfieldBackground;
