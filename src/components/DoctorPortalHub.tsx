'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeColors } from '@/types/content';
import { BookOpen, FileText, ClipboardList, Database, ArrowRight } from 'lucide-react';

interface DoctorPortalHubProps {
  theme?: ThemeColors;
}

export default function DoctorPortalHub({ theme }: DoctorPortalHubProps) {
  const cards = [
    {
      id: 'guides',
      title: 'Therapeutic Guides',
      description: 'Comprehensive disease-state management protocols, diagnostic insights, and evidence-based treatment algorithms.',
      icon: BookOpen,
      href: '/for-doctors/therapeutic-resources',
      buttonText: 'Explore Guides',
      isPrimary: false
    },
    {
      id: 'monographs',
      title: 'Product Monographs',
      description: 'Full pharmaceutical profiles, active ingredients, vehicles, and clinical indications for all 54+ Ryan formulations.',
      icon: FileText,
      href: '/products',
      buttonText: 'View Monographs',
      isPrimary: false
    },
    {
      id: 'prescribing',
      title: 'Prescribing Information',
      description: 'Authorized dosage guidelines, administration schedules, contraindications, and clinical precautions for physicians.',
      icon: ClipboardList,
      href: '/for-doctors/prescribing-information',
      buttonText: 'Access PI Sheets',
      isPrimary: false
    },
    {
      id: 'library',
      title: 'Clinical Reference Library',
      description: 'Access peer-reviewed dermatology research papers, formulation monographs, and clinical reference resources.',
      icon: Database,
      href: '/for-doctors/reference-library',
      buttonText: 'Enter Reference Hub',
      isPrimary: true
    }
  ];

  return (
    <section
      id="clinical-resources"
      className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-b"
      style={{
        backgroundColor: '#f1f8fa',
        borderColor: theme?.borderColor || 'rgba(0, 118, 138, 0.12)'
      }}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header matching Screen 7 */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#00768a] bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
            FOR HEALTHCARE PROFESSIONALS
          </span>
          <h2
            className="font-serif text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight"
            style={{ color: theme?.primaryNavy || '#003d4d' }}
          >
            DERMATOLOGY PRACTICE & CLINICAL RESOURCES
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Dedicated resources for dermatologists, cosmetologists, and clinical practitioners.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            if (card.isPrimary) {
              return (
                <div
                  key={card.id}
                  className="p-6 sm:p-7 rounded-3xl bg-[#003d4d] text-white flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-800/80 border border-teal-600/50 flex items-center justify-center text-teal-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-teal-300 block mb-1">
                        HCP PORTAL ACCESS
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-6">
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-300 group-hover:text-white transition-colors"
                    >
                      <span>{card.buttonText}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={card.id}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00768a]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3
                    className="font-serif text-lg sm:text-xl font-bold tracking-tight"
                    style={{ color: theme?.deepNavy || '#002530' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6">
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00768a] group-hover:text-[#005f70] transition-colors"
                  >
                    <span>{card.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
