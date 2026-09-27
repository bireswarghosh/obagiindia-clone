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
  const stickyRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
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
        const totalCards = cardRefs.current.filter(Boolean).length;
        // Each card gets equal scroll real-estate
        const segmentSize = 1 / totalCards;

        // ── Initial state: all cards start below viewport ──
        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          // First card is already at center, rest start below
          gsap.set(el, {
            y: i === 0 ? '0%' : '110%',
            x: '0%',
            opacity: i === 0 ? 1 : 0,
            scale: 1,
          });
        });

        // ── Pink serum bubble expands as section enters ──
        if (circleRef.current) {
          gsap.fromTo(
            circleRef.current,
            { clipPath: `circle(${stickyCircle.startPercent ?? 18}% at 50% 80%)` },
            {
              clipPath: `circle(${stickyCircle.endPercent ?? 90}% at 50% 50%)`,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.5,
              },
            }
          );
        }

        // ── Card sequence animation ──
        // For each card: at the right scroll position →
        //   1. Current card: rises up Y → slides to x:0 center → fades out
        //   2. Next card: enters from yPercent:110 → slides in
        displayCards.forEach((_, idx) => {
          const current = cardRefs.current[idx];
          const next = cardRefs.current[idx + 1];
          if (!current) return;

          // Progress window for this card's EXIT
          // Card idx exits between (idx/total) and ((idx+1)/total) of total scroll
          const exitStart = idx / totalCards;       // 0, 0.33, 0.66
          const exitEnd = (idx + 1) / totalCards;   // 0.33, 0.66, 1.0

          // Timeline for: current card exits + next card enters simultaneously
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `${exitStart * 100}% top`,
              end: `${exitEnd * 100}% top`,
              scrub: 1,
            },
          });

          // Phase 1 (0% → 50% of this window): current card rises UP along Y
          tl.to(
            current,
            {
              y: '-35%',
              x: '0%',
              opacity: 1,
              scale: 1,
              ease: 'power2.inOut',
              duration: 0.5,
            },
            0
          );

          // Phase 2 (50% → 100%): current card holds Y position & vanishes (scale + opacity)
          tl.to(
            current,
            {
              y: '-35%',
              opacity: 0,
              scale: 0.88,
              ease: 'power2.in',
              duration: 0.5,
            },
            0.5
          );

          // Simultaneously from 40%: next card rises in from below
          if (next) {
            // Next card fades in starting from middle of window
            tl.fromTo(
              next,
              { y: '110%', opacity: 0, scale: 1 },
              {
                y: '0%',
                opacity: 1,
                scale: 1,
                ease: 'power2.out',
                duration: 0.6,
              },
              0.4 // starts slightly before current card fully disappears → seamless overlap
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
    /*
      Outer section: tall scroll container — height = 100vh (sticky) + (n cards × 100vh exit travel)
      This gives each card its own "scroll page" to exit through.
    */
    <section
      id="cards"
      ref={sectionRef}
      style={{ height: `${(displayCards.length + 1) * 100}vh` }}
      className="relative"
    >
      {/* Sticky viewport that pins for the full scroll duration */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden"
      >
        {/* Pink serum bubble — sits behind cards */}
        <div
          ref={circleRef}
          className="absolute inset-0 w-full h-full will-change-[clip-path] z-0 pointer-events-none"
          style={{ clipPath: `circle(${stickyCircle.startPercent ?? 18}% at 50% 80%)` }}
        >
          <img
            src={stickyCircle.imageUrl}
            alt="Microscopic Serum Texture"
            className="w-full h-full object-cover filter saturate-110 brightness-95"
          />
        </div>

        {/* Card stage — centered in sticky viewport */}
        <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-center p-6 sm:p-10">
          {/* Fixed-size stage — all cards are absolute inside here */}
          <div className="relative w-full max-w-5xl" style={{ height: 'min(520px, 80vh)' }}>
            {displayCards.map((card, idx) => (
              <div
                key={card.id}
                ref={(el) => { cardRefs.current[idx] = el; }}
                className="absolute inset-0 w-full h-full will-change-transform transform-gpu"
                style={{ zIndex: 10 + idx }}
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
