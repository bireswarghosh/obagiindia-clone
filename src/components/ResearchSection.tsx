'use client';

import React from 'react';
import { ResearchSettings, ThemeColors } from '@/types/content';
import { Microscope } from 'lucide-react';

interface ResearchProps {
  research?: ResearchSettings;
  theme: ThemeColors;
}

export default function ResearchSection({ research, theme }: ResearchProps) {
  const title = research?.sectionTitle || research?.title || 'Formulation Science & Clinical Excellence';
  const description = research?.description || 'Pharmaceutical-grade formulation standards engineered for therapeutic efficacy and optimal cellular bioavailability.';

  const defaultItems = [
    {
      id: 'res-1',
      title: 'Formulation Optimization',
      description: 'Vehicle selection tailored for target tissue penetration and patient compliance.',
      imageUrl: '/ryan/about/about_approach_petri.png',
      hoverEffect: 'zoom'
    },
    {
      id: 'res-2',
      title: 'Quality Assurance & Bioavailability',
      description: 'Systematic batch testing, assay verification, and microbiological compliance.',
      imageUrl: '/ryan/about/quality_microscope.png',
      hoverEffect: 'blur'
    },
    {
      id: 'res-3',
      title: 'Clinician Collaboration & Feedback',
      description: 'Formulations developed in close consultation with leading dermatology practitioners.',
      imageUrl: '/ryan/about/ethics_building.png',
      hoverEffect: 'zoom'
    }
  ];

  const items = (research?.items && research.items.length > 0) ? research.items : defaultItems;

  return (
    <section
      id="research"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b"
      style={{
        backgroundColor: theme?.canvasBg || '#f8fafc',
        borderColor: theme?.borderColor || 'rgba(0, 118, 138, 0.12)'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-teal-50 text-[#00768a] border border-teal-200">
            <Microscope className="w-3.5 h-3.5" />
            <span>Clinical Science & Discovery</span>
          </div>
          <h2
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight"
            style={{ color: theme?.primaryNavy || '#003d4d' }}
          >
            {title}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* 3 Research Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              {/* Image with Dynamic Hover Effect */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl || '/ryan/about/quality_microscope.png'}
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
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3
                    className="font-serif text-lg sm:text-xl font-bold mb-2 group-hover:text-[#00768a] transition-colors"
                    style={{ color: theme?.deepNavy || '#002530' }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div
                  className="pt-4 border-t border-slate-100 flex items-center text-[10px] sm:text-xs font-bold tracking-wider uppercase"
                  style={{ color: theme?.accentGold || '#00768a' }}
                >
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
