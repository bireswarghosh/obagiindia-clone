'use client';

import React, { useEffect, useState } from 'react';

type Flake = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
};

export default function Snowfall({ count = 45 }: { count?: number }) {
  const [flakes, setFlakes] = useState<Flake[]>([]);

  // Generate on the client only to avoid SSR/client hydration mismatches
  useEffect(() => {
    const generated: Flake[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 2 + Math.random() * 5,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 8,
      drift: (Math.random() - 0.5) * 120,
      opacity: 0.35 + Math.random() * 0.55,
    }));
    setFlakes(generated);
  }, [count]);

  if (flakes.length === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden snow-layer"
    >
      {flakes.map(f => (
        <span
          key={f.id}
          className="snowflake"
          style={{
            left: `${f.left}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            opacity: f.opacity,
            // @ts-expect-error custom property
            '--snow-drift': `${f.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
