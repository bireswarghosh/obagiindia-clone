'use client';

import React, { useEffect, useRef } from 'react';
import { CardsSectionSettings, StickyCircleSettings, ThemeColors } from '@/types/content';
import { ArrowUpRight } from 'lucide-react';

interface CardStackProps {
  cardsSection: CardsSectionSettings;
  stickyCircle: StickyCircleSettings;
  theme: ThemeColors;
}

export default function CardStackSection({ cardsSection, stickyCircle, theme }: CardStackProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Filter cards to count (3 or 5)
  const displayCards = cardsSection.cards.slice(0, cardsSection.cardCount || 3);

  useEffect(() => {
    let ctx: any;

    async function initGSAP() {
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default || gsapModule;
      const ScrollTrigger = stModule.ScrollTrigger || stModule.default;

      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      ctx = gsap.context(() => {
        // Set Initial States
        if (circleRef.current) {
          gsap.set(circleRef.current, { clipPath: `circle(${stickyCircle.startPercent || 18}% at 50% 80%)` });
        }
        cardRefs.current.forEach((el) => {
          if (el) gsap.set(el, { yPercent: 120, opacity: 1 });
        });

        // Main Scrubbed Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        });

        // 1. Morphing Bubble Serum (0% - 25%)
        if (circleRef.current) {
          tl.to(circleRef.current, {
            clipPath: `circle(${stickyCircle.endPercent || 120}% at 50% 50%)`,
            ease: 'power1.inOut',
            duration: 1,
          });
        }

        // 2. Overlapping Cards Stack (25% - 100%)
        displayCards.forEach((_, idx) => {
          const currentCard = cardRefs.current[idx];
          if (currentCard) {
            tl.to(currentCard, {
              yPercent: 0,
              ease: 'power2.out',
              duration: 1,
            });
          }
        });
      }, sectionRef);
    }

    initGSAP();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [cardsSection, stickyCircle, displayCards.length]);

  return (
    <section
      id="cards"
      ref={sectionRef}
      className="relative h-[350vh] bg-transparent"
    >
      {/* 1. Sticky 100vh Viewport Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* 2. Background Pink Serum Bubble Layer */}
        <div
          ref={circleRef}
          className="absolute inset-0 w-full h-full will-change-[clip-path] z-0 pointer-events-none"
          style={{ clipPath: `circle(${stickyCircle.startPercent || 18}% at 50% 80%)` }}
        >
          <img
            src={stickyCircle.imageUrl}
            alt="Microscopic Serum Texture"
            className="w-full h-full object-cover filter saturate-110 brightness-95"
          />
        </div>

        {/* 3. Cards Layer */}
        <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-center p-6 sm:p-10 pointer-events-none">
          <div className="relative w-full max-w-5xl h-[500px]">
            {displayCards.map((card, idx) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="absolute inset-0 w-full h-full will-change-transform transform-gpu pointer-events-auto"
                style={{ zIndex: 11 + idx }}
              >
                <div
                  className="w-full h-full bg-white rounded-3xl border shadow-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-shadow duration-300"
                  style={{ borderColor: theme.borderColor }}
                >
                {/* Number */}
                <div className="lg:col-span-1 text-center lg:text-left">
                  <span
                    className="font-serif text-7xl sm:text-8xl font-light text-slate-300 leading-none select-none"
                    style={{ color: theme.textMuted }}
                  >
                    {card.number}
                  </span>
                </div>

                {/* Card Details */}
                <div className="lg:col-span-7 space-y-4">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm"
                    style={{ backgroundColor: card.badgeColor || theme.primaryNavy }}
                  >
                    Medical System
                  </span>

                  <h3
                    className="font-serif text-2xl sm:text-4xl font-bold leading-tight"
                    style={{ color: theme.deepNavy }}
                  >
                    {card.title}
                  </h3>

                  <p className="text-sm sm:text-base font-semibold" style={{ color: theme.accentGold }}>
                    {card.subtitle}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {card.description}
                  </p>

                  <div className="pt-2">
                    <a
                      href={card.linkUrl || '#'}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors hover:underline"
                      style={{ color: theme.primaryNavy }}
                    >
                      <span>Explore Formulation Science</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Product Visual */}
                <div className="lg:col-span-4 h-64 sm:h-72 bg-slate-50 rounded-2xl overflow-hidden p-6 flex items-center justify-center border border-slate-100">
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
