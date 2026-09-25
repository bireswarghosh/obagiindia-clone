'use client';

import React, { useEffect, useRef } from 'react';
import { HeroSettings, ThemeColors } from '@/types/content';
import { Award } from 'lucide-react';

interface HeroProps {
  hero: HeroSettings;
  theme: ThemeColors;
}

export default function HeroMorph({ hero, theme }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;

    async function initGSAP() {
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default || gsapModule;
      const ScrollTrigger = stModule.ScrollTrigger || stModule.default;

      gsap.registerPlugin(ScrollTrigger);

      if (!containerRef.current || !maskRef.current || !textRef.current) return;

      ctx = gsap.context(() => {
        // Hero Shrink Morph Animation
        gsap.fromTo(
          maskRef.current,
          { clipPath: 'circle(75% at 50% 50%)' },
          {
            clipPath: 'circle(0% at 50% 12%)',
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: hero.morphSpeed || 1.2,
            },
          }
        );

        // Text Fade Out
        gsap.to(textRef.current, {
          opacity: 0,
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '60% top',
            scrub: 1,
          },
        });
      }, containerRef);
    }

    initGSAP();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [hero.morphSpeed]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-black">
      {/* Sticky 100vh Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Animated Circle Mask */}
        <div
          ref={maskRef}
          className="absolute inset-0 w-full h-full will-change-[clip-path]"
          style={{ clipPath: 'circle(75% at 50% 50%)' }}
        >
          {hero.mediaType === 'video' && hero.mediaUrl ? (
            <video
              src={hero.mediaUrl}
              poster={hero.posterUrl}
              autoPlay={hero.autoPlay}
              loop={hero.loop}
              muted
              playsInline
              className="w-full h-full object-cover filter brightness-[0.85]"
            />
          ) : (
            <img
              src={hero.mediaUrl || hero.posterUrl}
              alt={hero.heading}
              className="w-full h-full object-cover filter brightness-[0.85]"
            />
          )}
        </div>

        {/* Foreground Content */}
        <div
          ref={textRef}
          className="relative z-10 text-white text-center px-4 max-w-4xl mx-auto flex flex-col items-center"
        >
          {hero.awardBadge && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold uppercase tracking-wider mb-6">
              <Award className="w-4 h-4 text-amber-300" />
              <span>{hero.awardBadge} • {hero.awardText}</span>
            </div>
          )}

          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight leading-none mb-6">
            {hero.heading}
          </h1>

          <p className="text-lg sm:text-2xl font-light text-white/90 max-w-2xl tracking-wide">
            {hero.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
