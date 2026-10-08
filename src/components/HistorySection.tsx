'use client';

import React from 'react';
import { HistorySettings, ThemeColors } from '@/types/content';
import { Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface HistoryProps {
  history: HistorySettings;
  theme: ThemeColors;
}

export default function HistorySection({ history, theme }: HistoryProps) {
  const title = history?.title || 'Our Story';
  const storyText = history?.paragraph1 || history?.description ||
    'Ryan Dermaceutics is a specialized dermatology division bringing together topical, oral and supportive products across multiple therapeutic areas. Our portfolio is designed around the evolving needs of dermatology practice and professional healthcare.';
  const storyText2 = history?.paragraph2 ||
    'Built on three guiding pillars—Focus, Quality, and Partnership—we work closely with dermatologists and healthcare institutions across India to deliver consistent, dependable clinical formulations.';

  const galleryImages = (history?.galleryImages && history.galleryImages.length > 0)
    ? history.galleryImages
    : [
        '/ryan/home/home_client_image_1.png',
        '/ryan/about/ethics_building.png',
      ];

  return (
    <section
      id="our-story"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/50 border-b"
      style={{ borderColor: theme?.borderColor || 'rgba(0, 118, 138, 0.12)' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Badge, Title, Award Trophy Box & Story */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="inline-block text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#00768a] bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200 mb-3">
                OUR STORY
              </span>
              <h2
                className="font-serif text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight"
                style={{ color: theme?.primaryNavy || '#003d4d' }}
              >
                {title}
              </h2>
            </div>

            {/* Golden Trophy Award Box matching Screen 2 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-4 shadow-2xs">
              <div className="w-12 h-12 rounded-xl bg-amber-100/90 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-950">
                  {history?.badgeAward || 'WHO-GMP Certified Formulations'}
                </h4>
                <p className="text-[11px] sm:text-xs text-amber-900/80 mt-0.5">
                  100% Quality Assurance & Stringent Analytical Testing
                </p>
              </div>
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-4 text-xs sm:text-sm md:text-base text-slate-700 leading-relaxed">
              <p>{storyText}</p>
              {storyText2 && <p className="text-slate-600">{storyText2}</p>}
            </div>

            {/* Link to Full Profile */}
            <div className="pt-2 flex items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00768a] hover:text-[#005f70] transition-colors group"
              >
                <span>Read Full Company Profile</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: 2 Visual Cards matching Screen 2 */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {galleryImages.slice(0, 2).map((imgUrl, idx) => (
              <div
                key={idx}
                className="group relative bg-white p-3 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={imgUrl}
                    alt={`Ryan Dermaceutics Story ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
