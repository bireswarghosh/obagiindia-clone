'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Target, Shield, HeartHandshake, Layers, Sparkles } from 'lucide-react';
import { ThemeColors } from '@/types/content';

interface TherapeuticProps {
  theme?: ThemeColors;
}

export default function TherapeuticAreasSection({ theme }: TherapeuticProps) {
  const categories = [
    {
      title: 'ACNE & ACNE MANAGEMENT',
      desc: 'Topical retinoids, antimicrobial combinations, and oral isotretinoin for inflammatory & non-inflammatory acne.',
      area: 'Acne',
      image: '/ryan/insight-acne.jpg'
    },
    {
      title: 'ANTIFUNGAL',
      desc: 'Broad-spectrum topical and systemic antimycotics addressing dermatophytosis, candidiasis, and tinea versicolor.',
      area: 'Antifungal',
      image: '/ryan/insight-fungal.jpg'
    },
    {
      title: 'ANTIBACTERIAL & ANTI-INFECTIVE',
      desc: 'Targeted antibacterial topicals formulated to eradicate secondary cutaneal bacterial infections with low resistance.',
      area: 'Antibacterial',
      image: '/ryan/about/about_approach_petri.png'
    },
    {
      title: 'CORTICOSTEROIDS',
      desc: 'Structured potency ladder formulations from mild to superpotent steroids for eczema, psoriasis, and dermatitis.',
      area: 'Corticosteroids',
      image: '/ryan/insight-steroids.jpg'
    },
    {
      title: 'ALLERGY & PRURITUS',
      desc: 'Second-generation non-sedating H1 antihistamines providing rapid, sustained relief in chronic urticaria.',
      area: 'Allergy',
      image: '/ryan/guide-allergy.jpg'
    },
    {
      title: 'HAIR & SCALP',
      desc: 'Trichology-focused solutions including minoxidil combinations and peptide complexes for alopecia management.',
      area: 'Hair',
      image: '/ryan/insight-hair.jpg'
    },
    {
      title: 'IMMUNOMODULATORY DERMATOLOGY',
      desc: 'Advanced systemic immunosuppressive agents and calcineurin inhibitors for chronic inflammatory dermatoses.',
      area: 'Immunomodulator',
      image: '/ryan/about/quality_microscope.png'
    },
    {
      title: 'PIGMENTATION & SKIN RENEWAL',
      desc: 'Depigmenting topicals and cellular renewal formulations for melasma and post-inflammatory hyperpigmentation.',
      area: 'Pigmentation',
      image: '/ryan/guide-pigmentation.jpg'
    }
  ];

  return (
    <section id="therapeutic-areas" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/60 border-b" style={{ borderColor: theme?.borderColor || 'rgba(0, 118, 138, 0.12)' }}>
      <div className="max-w-7xl mx-auto space-y-20 sm:space-y-24">
        
        {/* 1. Explore Our Therapeutic Areas (from home_client_image_4.png) */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#00768a] bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
              OUR DERMATOLOGY FOCUS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#003d4d]">
              EXPLORE OUR <span className="text-[#00768a]">THERAPEUTIC AREAS</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Explore our portfolio through focused therapeutic categories, making it easier for healthcare professionals to discover relevant products across common and specialized dermatological requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((c, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-300 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[10px] font-bold text-teal-200 tracking-wider uppercase bg-slate-900/60 px-2 py-0.5 rounded backdrop-blur-xs">
                    0{idx + 1} • Specialization
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-extrabold text-xs sm:text-sm uppercase tracking-wide text-slate-900 group-hover:text-[#00768a] transition-colors leading-snug">
                      {c.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <Link
                      href={`/products?area=${c.area}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00768a] group-hover:text-[#003d4d] transition-colors"
                    >
                      <span>EXPLORE</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Why Ryan Dermaceutics? / A Partner in Dermatology Care (from home_client_image_5.png) */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#00768a] bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
              WHY RYAN DERMACEUTICS?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#003d4d]">
              A PARTNER IN <span className="text-[#00768a]">DERMATOLOGY CARE</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
              Our focus, portfolio, quality and commitment to long-term partnerships make Ryan Dermaceutics a trusted choice for dermatology professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-teal-100 shadow-xs hover:shadow-md transition-shadow flex flex-col items-start space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 text-[#00768a] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-sm uppercase text-[#003d4d] tracking-wide">
                DERMATOLOGY FOCUSED
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A specialized division built around the needs of dermatology and skin-health practice.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-teal-100 shadow-xs hover:shadow-md transition-shadow flex flex-col items-start space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 text-[#00768a] flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-sm uppercase text-[#003d4d] tracking-wide">
                COMPREHENSIVE PORTFOLIO
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Topical, oral, hair and scalp products across multiple dermatological therapeutic areas.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-teal-100 shadow-xs hover:shadow-md transition-shadow flex flex-col items-start space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-sm uppercase text-[#003d4d] tracking-wide">
                QUALITY-DRIVEN APPROACH
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A commitment to consistent pharmaceutical quality and responsible product development.
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-teal-100 shadow-xs hover:shadow-md transition-shadow flex flex-col items-start space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-sm uppercase text-[#003d4d] tracking-wide">
                PROFESSIONAL PARTNERSHIP
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Building long-term relationships with healthcare professionals and distribution partners.
              </p>
            </div>
          </div>
        </div>

        {/* 3. A Complete Dermatology Portfolio: Topical to Systemic (from home_client_image_6.png) */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#00768a] bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
              DERMATOLOGY, FROM TOPICAL TO SYSTEMIC
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#003d4d]">
              A COMPLETE <span className="text-[#00768a]">DERMATOLOGY PORTFOLIO</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
              From targeted topical formulations to oral and systemic therapies, Ryan Dermaceutics offers multiple dosage forms to support diverse dermatological treatment approaches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Topical Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-teal-50/80 via-white to-teal-50/40 border border-teal-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-teal-100/60 text-[#00768a] flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold uppercase text-[#003d4d]">
                  TOPICAL DERMATOLOGY
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Creams | Ointments | Gels | Lotions | Solutions | Soaps | Powders
                </p>
              </div>

              <div>
                <Link
                  href="/products?route=Topical"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>View Topical Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Oral & Systemic Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-cyan-50/80 via-white to-cyan-50/40 border border-cyan-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-100/60 text-[#00768a] flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold uppercase text-[#003d4d]">
                  ORAL & SYSTEMIC DERMATOLOGY
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Tablets | Capsules | Softgels | Syrups
                </p>
              </div>

              <div>
                <Link
                  href="/products?route=Oral"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <span>View Oral Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
