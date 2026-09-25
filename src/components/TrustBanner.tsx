'use client';

import React from 'react';
import { TrustBannerSettings, ThemeColors } from '@/types/content';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface TrustBannerProps {
  trust: TrustBannerSettings;
  theme: ThemeColors;
}

export default function TrustBanner({ trust, theme }: TrustBannerProps) {
  return (
    <section id="trust" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b" style={{ borderColor: theme.borderColor }}>
      <div className="max-w-5xl mx-auto text-center">
        {/* Main Brand Claim */}
        <h2
          className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-6"
          style={{ color: theme.primaryNavy }}
        >
          {trust.heading}
        </h2>

        {/* Tagline */}
        <p className="text-base sm:text-lg font-semibold tracking-wide uppercase mb-10 text-slate-700">
          {trust.tagline}
        </p>

        {/* 3 Key Skin Concerns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
          {[trust.concern1, trust.concern2, trust.concern3].map((concern, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border bg-slate-50/60 flex items-center justify-center gap-3 transition-transform hover:-translate-y-1"
              style={{ borderColor: theme.borderColor }}
            >
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: theme.accentGold }} />
              <span className="font-semibold text-sm" style={{ color: theme.deepNavy }}>
                {concern}
              </span>
            </div>
          ))}
        </div>

        {/* Experience statement & Disclaimer */}
        <p className="text-slate-600 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
          {trust.experienceText}
        </p>
        {trust.disclaimer && (
          <p className="text-xs text-slate-400 mt-4 italic">
            {trust.disclaimer}
          </p>
        )}
      </div>
    </section>
  );
}
