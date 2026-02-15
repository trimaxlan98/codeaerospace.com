import React, { useMemo } from 'react';

const StarfieldBackground = () => {
  const stars = useMemo(() => {
    const result = [];
    for (let i = 0; i < 18; i++) {
      result.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 1.5 + 0.5,
        duration: Math.random() * 5 + 4,
        delay: Math.random() * 6,
      });
    }
    return result;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
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
            willChange: 'opacity',
          }}
        />
      ))}
      {/* Single subtle nebula — GPU composited via transform */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-[#00d9ff]/[0.015] rounded-full blur-[80px] animate-nebula-pulse" />
    </div>
  );
};

export default StarfieldBackground;
