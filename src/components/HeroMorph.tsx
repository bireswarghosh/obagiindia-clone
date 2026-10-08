'use client';

import React, { useEffect, useRef } from 'react';
import { HeroSettings, ThemeColors } from '@/types/content';
import { Sparkles, ShieldCheck, Award } from 'lucide-react';

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
              scrub: hero?.morphSpeed || 1.2,
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
  }, [hero?.morphSpeed]);

  const headingText = hero?.heading || 'SCIENCE THAT UNDERSTAND SKIN';
  const heroImage = hero?.mediaUrl || '/ryan/home/home_client_image_7.png';

  return (
    <section ref={containerRef} className="relative h-[180vh] sm:h-[200vh] bg-slate-950">
      {/* Sticky 100vh Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Animated Circle Mask with Clinical Imagery */}
        <div
          ref={maskRef}
          className="absolute inset-0 w-full h-full will-change-[clip-path]"
          style={{ clipPath: 'circle(75% at 50% 50%)' }}
        >
          {hero?.mediaType === 'video' && hero.mediaUrl ? (
            <video
              src={hero.mediaUrl}
              poster={hero.posterUrl || heroImage}
              autoPlay={hero.autoPlay}
              loop={hero.loop}
              muted
              playsInline
              className="w-full h-full object-cover filter brightness-[0.70]"
            />
          ) : (
            <img
              src={heroImage}
              alt="Ryan Dermaceutics Clinical Science"
              className="w-full h-full object-cover filter brightness-[0.70]"
            />
          )}
          {/* Subtle clinical gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/40 to-slate-950/60" />
        </div>

        {/* Foreground Content: SCIENCE THAT UNDERSTAND SKIN & 3 Pillars */}
        <div
          ref={textRef}
          className="relative z-10 text-white text-center px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center pt-12 sm:pt-0"
        >
          {/* Division Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
            <span>Ryan Dermaceutics • Specialized Division</span>
          </div>

          {/* Main Title: SCIENCE THAT UNDERSTAND SKIN */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase leading-tight sm:leading-none mb-6 max-w-4xl drop-shadow-md">
            {headingText}
          </h1>

          {/* 3 Core Pillars Pill Banner */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold tracking-wider max-w-3xl">
            <span className="px-3 sm:px-4 py-1.5 rounded-full bg-teal-950/60 backdrop-blur-md border border-teal-400/40 text-teal-200 shadow-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
              Science | Efficacy
            </span>
            <span className="px-3 sm:px-4 py-1.5 rounded-full bg-teal-950/60 backdrop-blur-md border border-teal-400/40 text-teal-200 shadow-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
              Skin Health | Quality
            </span>
            <span className="px-3 sm:px-4 py-1.5 rounded-full bg-teal-950/60 backdrop-blur-md border border-teal-400/40 text-teal-200 shadow-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
              Clinical Confidence
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 font-normal max-w-2xl mt-6 leading-relaxed hidden sm:block">
            Formulating evidence-based topical, oral, and trichological therapies engineered to meet the evolving demands of dermatology clinical practice.
          </p>
        </div>
      </div>
    </section>
  );
}
