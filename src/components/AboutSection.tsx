'use client';

import React from 'react';
import { AboutSettings, ThemeColors } from '@/types/content';
import { Quote } from 'lucide-react';

interface AboutProps {
  about?: AboutSettings;
  theme: ThemeColors;
}

export default function AboutSection({ about, theme }: AboutProps) {
  const title = about?.title || 'ABOUT RYAN DERMACEUTICS';
  const quote = about?.quote || '“To advance dermatology care by providing evidence-based formulations and supporting healthcare professionals with relevant clinical resources.”';
  const bodyText = about?.body || about?.paragraph || 'Ryan Dermaceutics is built on three guiding principles: Dermatology Focus, High Standards of Quality, and Collaborative Medical Partnership. Our formulations undergo stringent quality control in WHO-GMP certified facilities to ensure optimal patient outcomes and consistent efficacy.';
  const physicianQuote = about?.physicianQuote || 'PRESCRIBED BY DERMATOLOGISTS ACROSS INDIA';

  return (
    <section
      id="about"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b"
      style={{ borderColor: theme?.borderColor || 'rgba(0, 118, 138, 0.12)' }}
    >
      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
        <h2
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight"
          style={{ color: theme?.primaryNavy || '#003d4d' }}
        >
          {title}
        </h2>

        {/* Featured Quote */}
        <div className="relative py-2 sm:py-4 px-4 sm:px-12">
          <Quote className="w-10 sm:w-12 h-10 sm:h-12 mx-auto mb-4 text-[#00768a] opacity-30" />
          <blockquote className="font-serif text-lg sm:text-2xl md:text-3xl italic leading-relaxed text-slate-800 font-medium">
            {quote}
          </blockquote>
        </div>

        <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {bodyText}
        </p>

        <div className="inline-block px-5 py-2.5 rounded-full border bg-teal-50/50 border-teal-200 text-[11px] sm:text-xs font-bold tracking-widest uppercase text-[#00768a]">
          {physicianQuote}
        </div>
      </div>
    </section>
  );
}
