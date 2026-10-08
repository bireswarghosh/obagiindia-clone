'use client';

import React from 'react';
import { TrustBannerSettings, ThemeColors } from '@/types/content';
import { CheckCircle2 } from 'lucide-react';

interface TrustBannerProps {
  trust: TrustBannerSettings;
  theme: ThemeColors;
}

export default function TrustBanner({ trust, theme }: TrustBannerProps) {
  const heading = trust?.heading || '#1 LEADING DERMATOLOGY-RECOMMENDED FORMULATIONS';
  const concern1 = trust?.concern1 || 'Topical Potency & Formulations';
  const concern2 = trust?.concern2 || 'Oral & Systemic Therapies';
  const concern3 = trust?.concern3 || 'Trichology & Scalp Care';
  const experienceText = trust?.experienceText || 'Developed by dermatology professionals for clinical efficacy and patient care.';
  const disclaimer = trust?.disclaimer || '*Manufactured under WHO-GMP certified protocols with validated stability testing.';

  return (
    <section
      id="trust-banner"
      className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b text-center relative"
      style={{ borderColor: theme?.borderColor || 'rgba(0, 118, 138, 0.12)' }}
    >
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* Main Heading matching Screen 4 of original Obagi layout */}
        <h2
          className="font-serif text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight"
          style={{ color: theme?.primaryNavy || '#003d4d' }}
        >
          {heading}
        </h2>

        {/* 3 Horizontal Concern / Specialty Checkmarks */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2">
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-[#00768a] shrink-0" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800">
              {concern1}
            </span>
          </div>

          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-[#00768a] shrink-0" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800">
              {concern2}
            </span>
          </div>

          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-[#00768a] shrink-0" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800">
              {concern3}
            </span>
          </div>
        </div>

        {/* Subtext Statement */}
        <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal pt-1">
          {experienceText}
        </p>

        {/* Compliance Footnote */}
        {disclaimer && (
          <p className="text-[11px] sm:text-xs text-slate-400 italic">
            {disclaimer}
          </p>
        )}
      </div>
    </section>
  );
}
