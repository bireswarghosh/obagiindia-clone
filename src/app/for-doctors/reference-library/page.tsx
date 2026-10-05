'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import {
  REFERENCE_LIBRARY_CATEGORIES,
  LibraryCategory
} from '@/data/ryan-data';
import {
  Search,
  BookOpen,
  ChevronRight,
  Sparkles,
  ArrowRight,
  FileText,
  Pill,
  GitFork,
  User,
  ShieldCheck,
  CheckCircle2,
  X
} from 'lucide-react';

export default function ReferenceLibraryLandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrowseMode, setSelectedBrowseMode] = useState<'condition' | 'therapeutic' | 'ingredient' | 'anatomy'>('condition');

  const categories = Object.values(REFERENCE_LIBRARY_CATEGORIES);

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.conditionReferences.some(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* ========================================================= */}
      {/* 1. HERO SECTION (Matching Level 1 of Navigation Flow)     */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e6f4f7] via-[#f1f9fb] to-[#f8fafc] border-b border-teal-100/60 pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
            <a href="#" className="hover:text-teal-700 transition">Home</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a href="/for-doctors/therapeutic-resources" className="hover:text-teal-700 transition">For Doctors</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#00768a] font-semibold">Dermatology Reference Library</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-[#006070] text-xs font-bold uppercase tracking-widest border border-teal-200">
                <Sparkles className="w-3.5 h-3.5 text-[#00768a]" />
                PRACTICAL CLINICAL KNOWLEDGEBASE
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003d4d] tracking-tight uppercase leading-none">
                Dermatology <br />
                <span className="text-[#00768a]">Reference Library</span>
              </h1>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
                A structured clinical reference for common dermatological conditions, diagnostic considerations and evidence-based management principles across skin, hair and scalp health.
              </p>

              {/* Search Bar */}
              <div className="pt-2 relative max-w-xl">
                <input
                  type="text"
                  placeholder="Search conditions, treatments, ingredients or body areas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-teal-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00768a] shadow-sm transition"
                />
                <Search className="w-4 h-4 text-teal-600 absolute left-4 top-1/2 -translate-y-1/2" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Graphic Banner */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-white">
                <div className="relative h-60 sm:h-64 w-full">
                  <Image
                    src="/ryan/library/library-hero.jpg"
                    alt="Dermatology Reference Library"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003d4d]/75 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-semibold text-white tracking-wide">
                      Clinical Reference System • Ryan Dermaceutics
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. EXPLORE BY AREA (Matching Level 1 10-Area Grid)        */}
      {/* ========================================================= */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#003d4d] tracking-tight uppercase">
              Explore by Area
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a clinical domain to review diagnostic pathways and condition references.
            </p>
          </div>
        </div>

        {/* 10 Area Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredCategories.map((cat) => (
            <a
              key={cat.slug}
              href={`/for-doctors/reference-library/${cat.slug}`}
              className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-[#00768a] hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Area Thumbnail */}
                <div className="relative h-24 w-full rounded-xl overflow-hidden mb-3 bg-slate-100">
                  <Image
                    src={`/ryan/library/area-${cat.slug === 'immunomodulatory-dermatology' ? 'immuno' : cat.slug.replace('-infections', '').replace('-disorders', '').replace('-conditions', '').replace('-care', 'care')}.jpg`}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e: any) => {
                      // Fallback to library hero if thumbnail misses
                      e.target.src = '/ryan/library/library-hero.jpg';
                    }}
                  />
                </div>

                <div className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md inline-block mb-1.5">
                  {cat.count} References
                </div>

                <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#00768a] transition-colors leading-snug">
                  {cat.name}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#00768a]">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. BROWSE BY (4 Cards with Icons)                         */}
      {/* ========================================================= */}
      <section className="py-12 bg-white border-t border-teal-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#003d4d] tracking-tight uppercase">
              Browse by
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Alternate clinical entry points for targeted dermatology research.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => setSelectedBrowseMode('condition')}
              className={`p-5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-2.5 ${
                selectedBrowseMode === 'condition'
                  ? 'bg-teal-50 border-[#00768a] shadow-xs'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-teal-100/70 text-[#00768a] flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <span className="font-bold text-xs uppercase tracking-wider text-slate-800">Condition</span>
            </button>

            <button
              onClick={() => setSelectedBrowseMode('therapeutic')}
              className={`p-5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-2.5 ${
                selectedBrowseMode === 'therapeutic'
                  ? 'bg-teal-50 border-[#00768a] shadow-xs'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-100/70 text-[#00768a] flex items-center justify-center">
                <Pill className="w-6 h-6" />
              </div>
              <span className="font-bold text-xs uppercase tracking-wider text-slate-800">Therapeutic Class</span>
            </button>

            <button
              onClick={() => setSelectedBrowseMode('ingredient')}
              className={`p-5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-2.5 ${
                selectedBrowseMode === 'ingredient'
                  ? 'bg-teal-50 border-[#00768a] shadow-xs'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center">
                <GitFork className="w-6 h-6" />
              </div>
              <span className="font-bold text-xs uppercase tracking-wider text-slate-800">Active Ingredient</span>
            </button>

            <button
              onClick={() => setSelectedBrowseMode('anatomy')}
              className={`p-5 rounded-2xl border text-center transition flex flex-col items-center justify-center gap-2.5 ${
                selectedBrowseMode === 'anatomy'
                  ? 'bg-teal-50 border-[#00768a] shadow-xs'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100/70 text-purple-700 flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <span className="font-bold text-xs uppercase tracking-wider text-slate-800">Anatomical Area</span>
            </button>
          </div>

          {/* Quick Cross-Reference Matrix */}
          <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="font-bold text-[#004f5e] uppercase tracking-wider block mb-1">Common Conditions</span>
                <p className="text-slate-500 leading-relaxed text-[11.5px]">Acne, Tinea, Psoriasis, Eczema, Melasma, Alopecia, Scabies, Urticaria</p>
              </div>
              <div>
                <span className="font-bold text-[#004f5e] uppercase tracking-wider block mb-1">Therapeutic Classes</span>
                <p className="text-slate-500 leading-relaxed text-[11.5px]">Antifungals, Retinoids, Corticosteroids, Calcineurin Inhibitors, Antihistamines</p>
              </div>
              <div>
                <span className="font-bold text-[#004f5e] uppercase tracking-wider block mb-1">Active Molecules</span>
                <p className="text-slate-500 leading-relaxed text-[11.5px]">Luliconazole, Clobetasol, Adapalene, Tacrolimus, Minoxidil, Itraconazole</p>
              </div>
              <div>
                <span className="font-bold text-[#004f5e] uppercase tracking-wider block mb-1">Anatomical Zones</span>
                <p className="text-slate-500 leading-relaxed text-[11.5px]">Facial, Scalp, Trunk, Acral/Nail, Intertriginous Folds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RyanFooter />
    </div>
  );
}
