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
  const pinkRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const displayCards = cardsSection.cards.slice(0, cardsSection.cardCount || 3);

  useEffect(() => {
    let ctx: any;

    async function initGSAP() {
      const gsapModule = await import('gsap');
      const stModule = await import('gsap/ScrollTrigger');
      const gsap = gsapModule.default || gsapModule;
      const ScrollTrigger = stModule.ScrollTrigger || stModule.default;

      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current || !stickyRef.current) return;

      ctx = gsap.context(() => {
        // Pink bubble expanding animation as section enters
        if (pinkRef.current) {
          gsap.fromTo(
            pinkRef.current,
            { clipPath: 'ellipse(42% 32% at 50% 50%)' },
            {
              clipPath: 'ellipse(100% 100% at 50% 50%)',
              ease: 'power1.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                end: 'top top',
                scrub: 1,
              },
            }
          );
        }

        // Set initial card states
        // Card 1 starts flat under header (rotateX: 0, opacity: 1, yPercent: 0)
        // Cards 2 & 3 start below (yPercent: 110, opacity: 0)
        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          gsap.set(el, {
            yPercent: i === 0 ? 0 : 110,
            rotateX: 0,
            opacity: i === 0 ? 1 : 0,
            scale: 1,
            transformOrigin: 'center center',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
          },
        });

        // Loop through cards for smooth rising on card lift
        displayCards.forEach((_, idx) => {
          const current = cardRefs.current[idx];
          const next = cardRefs.current[idx + 1];
          if (!current) return;

          const foldTime = idx * 1.7;

          // 1. Current card flips OUTWARD towards user face into horizontal level and fades
          tl.to(
            current,
            {
              rotateX: -80,
              opacity: 0,
              scale: 1.03,
              yPercent: -28,
              ease: 'power2.inOut',
              duration: 1.0,
            },
            foldTime
          );

          // 2. Next card starts becoming visible and rising as current card lifts slightly
          if (next) {
            tl.to(
              next,
              {
                yPercent: 0,
                rotateX: 0,
                opacity: 1,
                scale: 1,
                ease: 'power2.out',
                duration: 1.0,
              },
              foldTime + 0.35
            );
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
      style={{ height: `${(displayCards.length + 1) * 100}vh` }}
      className="relative w-full bg-[#f8f7f5]"
    >
      {/* Sticky 100vh Viewport Container */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden"
      >
        {/* 1. Pink Serum Background: Expanding bubble to full width top 48vh */}
        <div
          ref={pinkRef}
          className="absolute top-0 left-0 w-full h-[48vh] z-0 overflow-hidden pointer-events-none will-change-[clip-path]"
          style={{ clipPath: 'ellipse(42% 32% at 50% 50%)' }}
        >
          <img
            src={stickyCircle.imageUrl || cardsSection.pinkSerumImage}
            alt="Pink Serum Texture"
            className="w-full h-full object-cover object-top filter saturate-110 brightness-95"
          />
        </div>

        {/* 2. Card Stage Container (Positioned below header with 3D perspective) */}
        <div
          className="absolute inset-0 w-full h-full z-10 flex items-center justify-center p-4 sm:p-8 pt-20 sm:pt-28 pointer-events-none"
          style={{ perspective: '1400px', perspectiveOrigin: '50% 35%' }}
        >
          <div
            className="relative w-full max-w-5xl h-[520px] pointer-events-auto"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {displayCards.map((card, idx) => (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                className="absolute inset-0 w-full h-full will-change-transform transform-gpu"
                style={{
                  zIndex: 10 + (displayCards.length - idx),
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                }}
              >
                <div
                  className="w-full h-full bg-white rounded-3xl border shadow-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                  style={{ borderColor: theme.borderColor }}
                >
                  {/* Number */}
                  <div className="lg:col-span-1 text-center lg:text-left">
                    <span
                      className="font-serif text-7xl sm:text-8xl font-light leading-none select-none"
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
