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
        // 1. Sticky Pink Serum Circle Background Expansion
        if (circleRef.current) {
          gsap.fromTo(
            circleRef.current,
            { clipPath: `circle(${stickyCircle.startPercent || 18}% at 50% 50%)` },
            {
              clipPath: `circle(${stickyCircle.endPercent || 90}% at 50% 50%)`,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
                end: 'bottom bottom',
                scrub: cardsSection.scrubSpeed || 1.2,
              },
            }
          );
        }

        // 2. 3D Perspective Card Folds
        displayCards.forEach((_, idx) => {
          const currentCard = cardRefs.current[idx];
          const nextCard = cardRefs.current[idx + 1];

          if (!currentCard) return;

          if (nextCard) {
            // Fold as next card arrives
            gsap.to(currentCard, {
              rotateX: cardsSection.foldAngle || 78,
              scale: 0.95,
              opacity: 0,
              ease: 'power1.inOut',
              scrollTrigger: {
                trigger: nextCard,
                start: 'top 80%',
                end: 'top 100px',
                scrub: 1,
              },
            });
          } else {
            // Final Card Vanishes at the exact same exit point
            gsap.to(currentCard, {
              rotateX: cardsSection.foldAngle || 78,
              scale: 0.95,
              opacity: 0,
              ease: 'power1.inOut',
              scrollTrigger: {
                trigger: currentCard,
                start: 'top 100px',
                end: '+=380',
                scrub: 1,
              },
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
      className="relative bg-[#f8f7f5] pt-12 pb-48"
    >
      {/* 1. Sticky Background Circle Wrapper */}
      <div className="sticky top-0 left-0 w-full h-screen mb-[-100vh] z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div
          ref={circleRef}
          className="absolute inset-0 w-full h-full will-change-[clip-path]"
          style={{ clipPath: `circle(${stickyCircle.startPercent || 18}% at 50% 50%)` }}
        >
          <img
            src={stickyCircle.imageUrl}
            alt="Microscopic Serum Texture"
            className="w-full h-full object-cover filter saturate-110 brightness-95"
          />
        </div>
      </div>

      {/* 2. 3D Perspective Cards Stream */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 perspective-1400">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.accentGold }}>
            Targeted Clinical Regimens
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight" style={{ color: theme.primaryNavy }}>
            Flagship Product Formulations
          </h2>
        </div>

        {/* List of 3D Folding Cards */}
        <div className="flex flex-col space-y-36">
          {displayCards.map((card, idx) => (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              className="sticky top-24 will-change-[transform,opacity] transform-gpu origin-top"
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            >
              <div
                className="bg-white rounded-3xl border shadow-xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-300 hover:shadow-2xl"
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
    </section>
  );
}
