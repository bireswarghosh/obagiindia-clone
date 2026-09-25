'use client';

import React from 'react';
import { AboutSettings, ThemeColors } from '@/types/content';
import { Quote } from 'lucide-react';

interface AboutProps {
  about: AboutSettings;
  theme: ThemeColors;
}

export default function AboutSection({ about, theme }: AboutProps) {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-y" style={{ borderColor: theme.borderColor }}>
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2
          className="font-serif text-3xl sm:text-5xl font-bold tracking-tight"
          style={{ color: theme.primaryNavy }}
        >
          {about.title}
        </h2>

        {/* Featured Quote */}
        <div className="relative py-4 px-6 sm:px-12">
          <Quote className="w-12 h-12 mx-auto mb-4 opacity-15" style={{ color: theme.primaryNavy }} />
          <blockquote className="font-serif text-xl sm:text-2xl italic leading-relaxed text-slate-800">
            {about.quote}
          </blockquote>
        </div>

        <p className="text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {about.body}
        </p>

        <div className="inline-block px-5 py-2 rounded-full border bg-slate-50 text-xs font-semibold tracking-wider uppercase text-slate-700" style={{ borderColor: theme.borderColor }}>
          {about.physicianQuote}
        </div>
      </div>
    </section>
  );
}
