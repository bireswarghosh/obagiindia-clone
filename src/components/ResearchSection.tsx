'use client';

import React from 'react';
import { ResearchSettings, ThemeColors } from '@/types/content';
import { Microscope } from 'lucide-react';

interface ResearchProps {
  research: ResearchSettings;
  theme: ThemeColors;
}

export default function ResearchSection({ research, theme }: ResearchProps) {
  return (
    <section id="research" className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: theme.canvasBg }}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-900 border border-indigo-100">
            <Microscope className="w-3.5 h-3.5" />
            <span>Clinical Science & Discovery</span>
          </div>
          <h2
            className="font-serif text-3xl sm:text-5xl font-bold tracking-tight"
            style={{ color: theme.primaryNavy }}
          >
            {research.sectionTitle}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Pharmaceutical-grade formulation standards engineered for therapeutic efficacy and optimal cellular bioavailability.
          </p>
        </div>

        {/* 3 Research Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(research?.items || []).map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden border shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col"
              style={{ borderColor: theme.borderColor }}
            >
              {/* Image with Dynamic Hover Effect */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    item.hoverEffect === 'blur'
                      ? 'group-hover:blur-[2px] group-hover:scale-105'
                      : item.hoverEffect === 'grayscale'
                      ? 'grayscale group-hover:grayscale-0 group-hover:scale-105'
                      : 'group-hover:scale-110'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Text Body */}
              <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3
                    className="font-serif text-xl font-bold mb-2 group-hover:text-indigo-900 transition-colors"
                    style={{ color: theme.deepNavy }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t flex items-center text-xs font-semibold tracking-wider uppercase" style={{ color: theme.accentGold, borderColor: theme.borderColor }}>
                  <span>Verified Clinical Standard</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
