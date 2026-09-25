'use client';

import React from 'react';
import { HistorySettings, ThemeColors } from '@/types/content';
import { Trophy } from 'lucide-react';

interface HistoryProps {
  history: HistorySettings;
  theme: ThemeColors;
}

export default function HistorySection({ history, theme }: HistoryProps) {
  return (
    <section id="history" className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: theme.canvasBg }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <div
              className="inline-block px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest text-white shadow-sm"
              style={{ backgroundColor: theme.deepNavy }}
            >
              Our History
            </div>

            <h2
              className="font-serif text-3xl sm:text-5xl font-bold tracking-tight"
              style={{ color: theme.primaryNavy }}
            >
              {history.title}
            </h2>

            <p className="text-base text-slate-700 leading-relaxed font-normal">
              {history.paragraph1}
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              {history.paragraph2}
            </p>

            {/* Awards Callout */}
            <div
              className="p-6 rounded-2xl border flex items-center gap-4 bg-white shadow-sm"
              style={{ borderColor: theme.borderColor }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-md"
                style={{ backgroundColor: theme.accentGold }}
              >
                <Trophy className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-base text-slate-900">{history.badgeAward}</h4>
                <p className="text-xs text-slate-500 font-medium">{history.badgeYear} • Gold Standard Clinical Formulation</p>
              </div>
            </div>
          </div>

          {/* Right Product Gallery Images */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {history.galleryImages.map((imgUrl, idx) => (
              <div
                key={idx}
                className="rounded-3xl overflow-hidden bg-white shadow-md border p-6 flex items-center justify-center transition-transform hover:-translate-y-1.5 duration-300"
                style={{ borderColor: theme.borderColor }}
              >
                <img
                  src={imgUrl}
                  alt={`Obagi Product ${idx + 1}`}
                  className="w-full h-64 object-contain transition-transform hover:scale-105 duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
