'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import {
  REFERENCE_LIBRARY_CATEGORIES,
  LibraryCategory
} from '@/data/ryan-data';
import {
  ChevronRight,
  Search,
  ArrowRight,
  Sparkles,
  BookOpen,
  Pill,
  ArrowLeft,
  X
} from 'lucide-react';

export default function ReferenceLibraryCategoryPage() {
  const params = useParams();
  const categorySlug = (params?.category as string) || 'fungal-infections';

  const defaultCategory: LibraryCategory = REFERENCE_LIBRARY_CATEGORIES[categorySlug] || REFERENCE_LIBRARY_CATEGORIES['fungal-infections'];
  const [category, setCategory] = useState<LibraryCategory>(defaultCategory);

  React.useEffect(() => {
    fetch('/api/db/library?type=category')
      .then(res => res.json())
      .then(data => {
        if (data?.success && Array.isArray(data.items)) {
          const found = data.items.find((it: any) => it.slug === categorySlug);
          if (found) {
            setCategory({
              ...found.data,
              name: found.title,
              description: found.data?.description || '',
            });
          }
        }
      })
      .catch(() => {});
  }, [categorySlug]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredConditions = (category.conditionReferences || []).filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ACCENTS = [
    { bar: 'from-rose-400 to-pink-500', card: 'from-rose-50 via-white to-pink-50', border: 'border-rose-200/80', chip: 'bg-rose-100 text-rose-700 border-rose-200', title: 'group-hover:text-rose-600', link: 'text-rose-500', glow: 'hover:shadow-[0_20px_42px_-18px_rgba(244,63,94,0.55)]' },
    { bar: 'from-amber-400 to-orange-500', card: 'from-amber-50 via-white to-orange-50', border: 'border-amber-200/80', chip: 'bg-amber-100 text-amber-700 border-amber-200', title: 'group-hover:text-amber-600', link: 'text-amber-500', glow: 'hover:shadow-[0_20px_42px_-18px_rgba(245,158,11,0.55)]' },
    { bar: 'from-violet-400 to-purple-500', card: 'from-violet-50 via-white to-purple-50', border: 'border-violet-200/80', chip: 'bg-violet-100 text-violet-700 border-violet-200', title: 'group-hover:text-violet-600', link: 'text-violet-500', glow: 'hover:shadow-[0_20px_42px_-18px_rgba(139,92,246,0.55)]' },
    { bar: 'from-sky-400 to-blue-500', card: 'from-sky-50 via-white to-blue-50', border: 'border-sky-200/80', chip: 'bg-sky-100 text-sky-700 border-sky-200', title: 'group-hover:text-sky-600', link: 'text-sky-500', glow: 'hover:shadow-[0_20px_42px_-18px_rgba(14,165,233,0.55)]' },
    { bar: 'from-emerald-400 to-teal-500', card: 'from-emerald-50 via-white to-teal-50', border: 'border-emerald-200/80', chip: 'bg-emerald-100 text-emerald-700 border-emerald-200', title: 'group-hover:text-emerald-600', link: 'text-emerald-500', glow: 'hover:shadow-[0_20px_42px_-18px_rgba(16,185,129,0.55)]' },
    { bar: 'from-fuchsia-400 to-pink-500', card: 'from-fuchsia-50 via-white to-pink-50', border: 'border-fuchsia-200/80', chip: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200', title: 'group-hover:text-fuchsia-600', link: 'text-fuchsia-500', glow: 'hover:shadow-[0_20px_42px_-18px_rgba(217,70,239,0.55)]' },
    { bar: 'from-indigo-400 to-blue-500', card: 'from-indigo-50 via-white to-blue-50', border: 'border-indigo-200/80', chip: 'bg-indigo-100 text-indigo-700 border-indigo-200', title: 'group-hover:text-indigo-600', link: 'text-indigo-500', glow: 'hover:shadow-[0_20px_42px_-18px_rgba(99,102,241,0.55)]' },
    { bar: 'from-cyan-400 to-sky-500', card: 'from-cyan-50 via-white to-sky-50', border: 'border-cyan-200/80', chip: 'bg-cyan-100 text-cyan-700 border-cyan-200', title: 'group-hover:text-cyan-600', link: 'text-cyan-500', glow: 'hover:shadow-[0_20px_42px_-18px_rgba(6,182,212,0.55)]' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* ========================================================= */}
      {/* 1. HERO SECTION (Matching Level 2 of Navigation Flow)     */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e6f4f7] via-[#f1f9fb] to-[#f8fafc] border-b border-teal-100/60 pt-6 pb-12">
        <div className="pointer-events-none absolute -top-24 -right-16 w-96 h-96 rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-10 w-80 h-80 rounded-full bg-rose-300/20 blur-3xl" />
        <div className="pointer-events-none absolute top-10 left-1/3 w-64 h-64 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[64px] relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6 flex-wrap">
            <a href="#" className="hover:text-teal-700 transition">Home</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a href="/for-doctors/therapeutic-resources" className="hover:text-teal-700 transition">For Doctors</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a href="/for-doctors/reference-library" className="hover:text-teal-700 transition">Dermatology Reference Library</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#00768a] font-semibold">{category.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Header */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-black tracking-widest text-indigo-700 uppercase bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-indigo-200 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                CLINICAL REFERENCE DOMAIN
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#003d4d] tracking-tight uppercase leading-none">
                {category.name}
              </h1>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
                {category.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-teal-200 text-[11px] font-bold text-teal-700 shadow-sm">
                  <BookOpen className="w-3.5 h-3.5" /> {category.count} References
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-indigo-200 text-[11px] font-bold text-indigo-700 shadow-sm">
                  <Pill className="w-3.5 h-3.5" /> Therapeutic Classes
                </span>
              </div>

              {/* Search within Category */}
              <div className="pt-2 relative max-w-xl">
                <input
                  type="text"
                  placeholder={`Search within ${category.name}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-indigo-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md transition"
                />
                <Search className="w-4 h-4 text-indigo-600 absolute left-4 top-1/2 -translate-y-1/2" />
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
              <div className="relative mx-auto w-full rounded-2xl overflow-hidden shadow-xl card-glow-anim border-2 border-white bg-white">
                <div className="relative h-60 sm:h-64 w-full">
                  <Image
                    src={category.bannerImage}
                    alt={category.name}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003d4d]/75 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-semibold text-white tracking-wide">
                      {category.count} Clinical Monograph References
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. CONDITION REFERENCES (Matching Level 2 Grid)           */}
      {/* ========================================================= */}
      <section className="py-12 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[64px] space-y-12">
        {/* Section 1: Condition References */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-[#003d4d] tracking-tight uppercase">
              Condition References
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a clinical presentation to access the 11-point diagnostic and therapeutic reference.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConditions.map((cond, idx) => {
              const a = ACCENTS[idx % ACCENTS.length];
              return (
              <a
                key={cond.slug}
                href={`/for-doctors/reference-library/${category.slug}/${cond.slug}`}
                className={`group relative overflow-hidden flex items-center gap-4 rounded-2xl bg-gradient-to-br ${a.card} border ${a.border} p-4 shadow-[0_10px_26px_-16px_rgba(0,61,77,0.45)] ${a.glow} hover:-translate-y-1.5 transition-all duration-300`}
              >
                <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${a.bar}`} />
                {/* Condition Thumbnail */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/60 shrink-0 border border-white/80 shadow-sm">
                  <Image
                    src={cond.thumbnail}
                    alt={cond.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border mb-1 ${a.chip}`}>
                    Condition
                  </span>
                  <h3 className={`font-black text-sm text-slate-900 ${a.title} transition-colors truncate`}>
                    {cond.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                    {cond.subtitle}
                  </p>
                </div>

                <div className={`shrink-0 ${a.link} group-hover:translate-x-1 transition-all`}>
                  <ChevronRight className="w-5 h-5" />
                </div>
              </a>
              );
            })}
          </div>
        </div>

        {/* Section 2: Therapeutic References */}
        {category.therapeuticReferences && category.therapeuticReferences.length > 0 && (
          <div className="pt-6 border-t border-slate-200/80">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-[#003d4d] tracking-tight uppercase">
                Therapeutic References
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Pharmacological mechanisms, drug positioning, and therapeutic class considerations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.therapeuticReferences.map((ther, idx) => {
                const a = ACCENTS[(idx + 2) % ACCENTS.length];
                return (
                <a
                  key={ther.slug}
                  href={`/for-doctors/reference-library/${category.slug}/${ther.slug}`}
                  className={`group relative overflow-hidden flex items-center gap-4 rounded-2xl bg-gradient-to-br ${a.card} border ${a.border} p-4 shadow-[0_10px_26px_-16px_rgba(0,61,77,0.45)] ${a.glow} hover:-translate-y-1.5 transition-all duration-300`}
                >
                  <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${a.bar}`} />
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/60 shrink-0 border border-white/80 shadow-sm">
                    <Image
                      src={ther.thumbnail}
                      alt={ther.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border mb-1 ${a.chip}`}>
                      Therapeutic
                    </span>
                    <h3 className={`font-black text-sm text-slate-900 ${a.title} transition-colors truncate`}>
                      {ther.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                      {ther.subtitle}
                    </p>
                  </div>

                  <div className={`shrink-0 ${a.link} group-hover:translate-x-1 transition-all`}>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-xs">
          <a
            href="/for-doctors/reference-library"
            className="inline-flex items-center gap-1.5 font-bold text-[#00768a] hover:text-[#004f5e]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Reference Library Landing Page
          </a>

          <a
            href="/for-doctors/prescribing-information"
            className="inline-flex items-center gap-1.5 font-bold text-slate-600 hover:text-[#00768a]"
          >
            <span>View Related Prescribing Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      <RyanFooter />
    </div>
  );
}
