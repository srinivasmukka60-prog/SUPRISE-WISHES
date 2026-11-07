import React, { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'heart' | 'star' | 'circle' | 'sparkle';
  color: string;
}

export const FloatingParticles: React.FC = () => {
  const particles: Particle[] = useMemo(() => {
    const list: Particle[] = [];
    const colors = [
      'rgba(255, 105, 180, 0.45)', // pink
      'rgba(200, 162, 255, 0.45)', // lavender
      'rgba(255, 215, 0, 0.35)',   // gold
      'rgba(255, 182, 193, 0.4)',  // light pink
      'rgba(255, 255, 255, 0.4)'   // white
    ];

    for (let i = 0; i < 35; i++) {
      const types: Particle['type'][] = ['heart', 'star', 'circle', 'sparkle'];
      list.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 16 + 8,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 5,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    return list;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-pink-500/15 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/5 w-[30rem] h-[30rem] bg-purple-600/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-2/3 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '3s' }} />

      {particles.map((p) => {
        return (
          <div
            key={p.id}
            className="absolute transition-all"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}px`,
              color: p.color,
              animation: `float-slow ${p.duration}s infinite ease-in-out`,
              animationDelay: `${p.delay}s`,
              opacity: 0.65
            }}
          >
            {p.type === 'heart' && '💖'}
            {p.type === 'star' && '✨'}
            {p.type === 'circle' && (
              <span
                className="inline-block rounded-full animate-twinkle"
                style={{
                  width: `${p.size / 2}px`,
                  height: `${p.size / 2}px`,
                  backgroundColor: p.color,
                  boxShadow: `0 0 10px ${p.color}`
                }}
              />
            )}
            {p.type === 'sparkle' && '🌸'}
          </div>
        );
      })}
    </div>
  );
};
