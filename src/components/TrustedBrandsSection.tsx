'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { ThemeColors } from '@/types/content';

interface TrustedBrandsProps {
  theme?: ThemeColors;
}

export default function TrustedBrandsSection({ theme }: TrustedBrandsProps) {
  const brands = [
    {
      category: 'CORTICOSTEROID',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      name: 'TENORIUM',
      generic: 'Clobetasol Propionate 0.05% Cream',
      dosage: 'Topical Cream',
      slug: 'tenorium-cream',
      image: '/ryan/about/portfolio_topical.png'
    },
    {
      category: 'ACNE MANAGEMENT',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      name: 'CLIXODIN-AD',
      generic: 'Clindamycin + Adapalene Gel',
      dosage: 'Topical Gel',
      slug: 'clixodin-ad',
      image: '/ryan/about/portfolio_topical.png'
    },
    {
      category: 'ANTIFUNGAL',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      name: 'KEFIN',
      generic: 'Ketoconazole 2% Cream',
      dosage: 'Topical Cream',
      slug: 'kefin-cream',
      image: '/ryan/about/portfolio_topical.png'
    },
    {
      category: 'SYSTEMIC ACNE',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      name: 'I-TACNOID 20',
      generic: 'Isotretinoin 20 mg Capsules',
      dosage: 'Oral Softgel Capsules',
      slug: 'i-tacnoid-20',
      image: '/ryan/about/portfolio_oral.png'
    },
    {
      category: 'IMMUNOMODULATORY',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      name: 'TOFAPLAST',
      generic: 'Tofacitinib 5 mg Tablets',
      dosage: 'Oral Tablets',
      slug: 'tofaplast-5mg',
      image: '/ryan/about/portfolio_oral.png'
    },
    {
      category: 'HAIR & SCALP',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
      name: 'TRESSICLE F',
      generic: 'Minoxidil & Finasteride Topical Solution',
      dosage: 'Topical Solution',
      slug: 'tressicle-f',
      image: '/ryan/about/portfolio_hair.png'
    },
    {
      category: 'ANTI-ALLERGIC',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      name: 'BLISMIN 20',
      generic: 'Bilastine 20 mg Tablets',
      dosage: 'Oral Tablets',
      slug: 'blismin-20',
      image: '/ryan/about/portfolio_oral.png'
    },
    {
      category: 'ANTI-PARASITIC',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      name: 'MITECLIN F',
      generic: 'Permethrin 5% Cream',
      dosage: 'Topical Cream',
      slug: 'miteclin-f',
      image: '/ryan/about/portfolio_topical.png'
    }
  ];

  return (
    <section id="trusted-brands" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b" style={{ borderColor: theme?.borderColor || 'rgba(0, 118, 138, 0.12)' }}>
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20">
        
        {/* Section Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#00768a] bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
              SELECTED FROM OUR PORTFOLIO
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#003d4d]">
              TRUSTED BRANDS FOR <span className="text-[#00768a]">DERMATOLOGY PRACTICE</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Discover selected Ryan Dermaceutics brands across key dermatological categories. Explore individual product pages for composition, dosage form and professional information.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#00768a] text-[#00768a] hover:bg-[#00768a] hover:text-white transition-all text-xs font-bold uppercase tracking-wider shrink-0"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 8 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((b, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-300 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Top Badge */}
              <div className="p-4 pb-0 flex items-center justify-between">
                <span className={`text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md border ${b.badgeColor}`}>
                  {b.category}
                </span>
                <span className="text-[10px] text-slate-400 font-semibold">{b.dosage}</span>
              </div>

              {/* Product Visual Container */}
              <div className="p-6 flex items-center justify-center h-48 bg-gradient-to-b from-slate-50/50 to-white">
                <img
                  src={b.image}
                  alt={b.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
                />
              </div>

              {/* Product Info & View Link */}
              <div className="p-5 pt-3 border-t border-slate-100 bg-white space-y-2">
                <h3 className="font-extrabold text-base text-slate-900 group-hover:text-[#00768a] transition-colors">
                  {b.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-1">
                  {b.generic}
                </p>

                <div className="pt-2">
                  <Link
                    href={`/products?q=${encodeURIComponent(b.name)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00768a] hover:text-[#003d4d] group-hover:translate-x-0.5 transition-all"
                  >
                    <span>View Product</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Complete Care for Hair & Scalp Health Banner (from home_client_image_7.png) */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#003d4d] via-[#005263] to-[#00768a] text-white shadow-lg border border-teal-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center p-6 sm:p-10 lg:p-12 gap-8">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-teal-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                COMPLETE CARE FOR
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight uppercase">
                HAIR & SCALP HEALTH
              </h3>
              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed max-w-lg">
                Ryan Dermaceutics extends its dermatology portfolio into hair and scalp care with nutritional support, oral formulations and topical solutions designed for professional dermatological practice.
              </p>
              
              <div className="pt-2">
                <Link
                  href="/products?area=Hair"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
                >
                  <span>Explore Hair & Scalp Products</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Formulations Highlight */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div className="font-extrabold text-white text-xs">TRESSICLE 2.5</div>
                  <div className="text-[10px] text-teal-200 mt-1">Minoxidil Topical Solution 2.5%</div>
                </div>
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div className="font-extrabold text-white text-xs">TRESSICLE 5</div>
                  <div className="text-[10px] text-teal-200 mt-1">Minoxidil Topical Solution 5%</div>
                </div>
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div className="font-extrabold text-white text-xs">TRESSICLE FORTE</div>
                  <div className="text-[10px] text-teal-200 mt-1">Minoxidil & Finasteride Solution</div>
                </div>
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15">
                  <div className="font-extrabold text-white text-xs">BIOSSICLE PLUS</div>
                  <div className="text-[10px] text-teal-200 mt-1">Hair Nutrition Capsules</div>
                </div>
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 sm:col-span-2">
                  <div className="font-extrabold text-white text-xs">TRESSICLE F</div>
                  <div className="text-[10px] text-teal-200 mt-1">Minoxidil 5% + Finasteride 0.1%</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
