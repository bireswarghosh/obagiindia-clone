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
  const [categories, setCategories] = useState<LibraryCategory[]>(Object.values(REFERENCE_LIBRARY_CATEGORIES));
  const [heroSlide, setHeroSlide] = useState(0);

  const heroSlides = [
    { src: '/ryan/library/library-hero.jpg', label: 'CLINICAL REPOSITORY', caption: 'Clinical Reference System • Ryan Dermaceutics' },
    { src: '/ryan/library/area-acne.jpg', label: 'DIAGNOSTIC PATHWAYS', caption: 'Structured Dermatology References' },
    { src: '/ryan/library/area-inflammatory.jpg', label: 'EVIDENCE-BASED CARE', caption: 'Management Principles Across Skin & Hair' },
  ];

  React.useEffect(() => {
    const timer = setInterval(() => setHeroSlide(prev => (prev + 1) % 3), 5000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    fetch('/api/db/library?type=category')
      .then(res => res.json())
      .then(data => {
        if (data?.success && Array.isArray(data.items) && data.items.length > 0) {
          const mapped = data.items.map((it: any) => ({
            ...it.data,
            name: it.title,
            description: it.data?.description || '',
            conditionReferences: it.data?.conditionReferences || [],
          }));
          setCategories(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cat.conditionReferences || []).some(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const AREA_ACCENTS = [
    { bar: 'from-rose-400 to-pink-500', card: 'from-rose-50 via-white to-pink-50', border: 'border-rose-200/80', chip: 'bg-rose-100 text-rose-700 border-rose-200', title: 'group-hover:text-rose-600', link: 'text-rose-600', glow: 'hover:shadow-[0_22px_46px_-18px_rgba(244,63,94,0.55)]' },
    { bar: 'from-amber-400 to-orange-500', card: 'from-amber-50 via-white to-orange-50', border: 'border-amber-200/80', chip: 'bg-amber-100 text-amber-700 border-amber-200', title: 'group-hover:text-amber-600', link: 'text-amber-600', glow: 'hover:shadow-[0_22px_46px_-18px_rgba(245,158,11,0.55)]' },
    { bar: 'from-violet-400 to-purple-500', card: 'from-violet-50 via-white to-purple-50', border: 'border-violet-200/80', chip: 'bg-violet-100 text-violet-700 border-violet-200', title: 'group-hover:text-violet-600', link: 'text-violet-600', glow: 'hover:shadow-[0_22px_46px_-18px_rgba(139,92,246,0.55)]' },
    { bar: 'from-sky-400 to-blue-500', card: 'from-sky-50 via-white to-blue-50', border: 'border-sky-200/80', chip: 'bg-sky-100 text-sky-700 border-sky-200', title: 'group-hover:text-sky-600', link: 'text-sky-600', glow: 'hover:shadow-[0_22px_46px_-18px_rgba(14,165,233,0.55)]' },
    { bar: 'from-emerald-400 to-teal-500', card: 'from-emerald-50 via-white to-teal-50', border: 'border-emerald-200/80', chip: 'bg-emerald-100 text-emerald-700 border-emerald-200', title: 'group-hover:text-emerald-600', link: 'text-emerald-600', glow: 'hover:shadow-[0_22px_46px_-18px_rgba(16,185,129,0.55)]' },
    { bar: 'from-indigo-400 to-blue-500', card: 'from-indigo-50 via-white to-blue-50', border: 'border-indigo-200/80', chip: 'bg-indigo-100 text-indigo-700 border-indigo-200', title: 'group-hover:text-indigo-600', link: 'text-indigo-600', glow: 'hover:shadow-[0_22px_46px_-18px_rgba(99,102,241,0.55)]' },
    { bar: 'from-fuchsia-400 to-pink-500', card: 'from-fuchsia-50 via-white to-pink-50', border: 'border-fuchsia-200/80', chip: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200', title: 'group-hover:text-fuchsia-600', link: 'text-fuchsia-600', glow: 'hover:shadow-[0_22px_46px_-18px_rgba(217,70,239,0.55)]' },
    { bar: 'from-cyan-400 to-sky-500', card: 'from-cyan-50 via-white to-sky-50', border: 'border-cyan-200/80', chip: 'bg-cyan-100 text-cyan-700 border-cyan-200', title: 'group-hover:text-cyan-600', link: 'text-cyan-600', glow: 'hover:shadow-[0_22px_46px_-18px_rgba(6,182,212,0.55)]' },
    { bar: 'from-orange-400 to-red-500', card: 'from-orange-50 via-white to-red-50', border: 'border-orange-200/80', chip: 'bg-orange-100 text-orange-700 border-orange-200', title: 'group-hover:text-orange-600', link: 'text-orange-600', glow: 'hover:shadow-[0_22px_46px_-18px_rgba(249,115,22,0.55)]' },
    { bar: 'from-teal-400 to-cyan-500', card: 'from-teal-50 via-white to-cyan-50', border: 'border-teal-200/80', chip: 'bg-teal-100 text-teal-700 border-teal-200', title: 'group-hover:text-teal-600', link: 'text-teal-600', glow: 'hover:shadow-[0_22px_46px_-18px_rgba(0,118,138,0.55)]' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* ========================================================= */}
      {/* 1. HERO SECTION (Matching Level 1 of Navigation Flow)     */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e6f4f7] via-[#f1f9fb] to-[#f8fafc] border-b border-teal-100/60 pt-6 pb-12">
        <div className="pointer-events-none absolute -top-24 -right-16 w-96 h-96 rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-10 w-80 h-80 rounded-full bg-rose-300/20 blur-3xl" />
        <div className="pointer-events-none absolute top-10 left-1/3 w-64 h-64 rounded-full bg-amber-200/30 blur-3xl" />
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[64px] relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
            <a href="#" className="hover:text-teal-700 transition">Home</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a href="/for-doctors/therapeutic-resources" className="hover:text-teal-700 transition">For Doctors</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#00768a] font-semibold">Dermatology Reference Library</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-3 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md text-[#006070] text-xs font-black uppercase tracking-widest border border-white/80 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                PRACTICAL CLINICAL KNOWLEDGEBASE
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#003d4d] tracking-tight uppercase leading-none">
                Dermatology <br />
                <span className="relative inline-block text-indigo-700">
                  Reference Library
                  <span className="absolute -bottom-1.5 left-0 h-1.5 w-full rounded-full bg-gradient-to-r from-teal-500 via-indigo-500 to-fuchsia-500" />
                </span>
              </h1>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
                A structured clinical reference for common dermatological conditions, diagnostic considerations and evidence-based management principles across skin, hair and scalp health.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-teal-200 text-[11px] font-bold text-teal-700 shadow-sm">
                  <BookOpen className="w-3.5 h-3.5" /> {categories.length} Clinical Areas
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-indigo-200 text-[11px] font-bold text-indigo-700 shadow-sm">
                  <FileText className="w-3.5 h-3.5" /> Structured References
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-emerald-200 text-[11px] font-bold text-emerald-700 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" /> Evidence-Based
                </span>
              </div>

              {/* Search Bar */}
              <div className="pt-2 relative max-w-xl">
                <input
                  type="text"
                  placeholder="Search conditions, treatments, ingredients or body areas..."
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

            {/* Right Graphic Banner — 50% image slider */}
            <div className="lg:col-span-2 relative flex justify-center lg:justify-end">
              <div className="relative w-full aspect-[4/3] sm:aspect-[1.15] rounded-3xl overflow-hidden card-glow-anim ring-1 ring-white/70">
                {heroSlides.map((slide, i) => (
                  <Image
                    key={slide.src}
                    src={slide.src}
                    alt={slide.caption}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`object-cover object-center transition-all duration-700 ease-out ${heroSlide === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                  />
                ))}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#e6f4f7] via-[#e6f4f7]/30 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#003d4d]/90 via-[#003d4d]/30 to-transparent pointer-events-none" />

                <div className="absolute bottom-12 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold tracking-widest text-teal-300 uppercase block">
                    {heroSlides[heroSlide].label}
                  </span>
                  <span className="text-xs font-semibold text-white/95">
                    {heroSlides[heroSlide].caption}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setHeroSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
                  aria-label="Previous slide"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#e6f4f7]/95 hover:bg-[#d6edf2] text-[#006070] border border-teal-200/80 backdrop-blur flex items-center justify-center shadow-[0_6px_18px_-6px_rgba(0,61,77,0.35)] active:scale-90 transition-all"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => setHeroSlide(prev => (prev + 1) % heroSlides.length)}
                  aria-label="Next slide"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#e6f4f7]/95 hover:bg-[#d6edf2] text-[#006070] border border-teal-200/80 backdrop-blur flex items-center justify-center shadow-[0_6px_18px_-6px_rgba(0,61,77,0.35)] active:scale-90 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5">
                  {heroSlides.map((slide, i) => (
                    <button
                      key={slide.src}
                      type="button"
                      onClick={() => setHeroSlide(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${heroSlide === i ? 'w-6 bg-teal-300' : 'w-1.5 bg-white/60 hover:bg-white'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. EXPLORE BY AREA (Matching Level 1 10-Area Grid)        */}
      {/* ========================================================= */}
      <section className="py-12 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[64px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full mb-2">
              <BookOpen className="w-3 h-3" />
              Clinical Domains
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#003d4d] tracking-tight uppercase">
              Explore by Area
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a clinical domain to review diagnostic pathways and condition references.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[11px] font-bold text-slate-600 shadow-sm">
            {filteredCategories.length} areas
          </span>
        </div>

        {/* 10 Area Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredCategories.map((cat, idx) => {
            const a = AREA_ACCENTS[idx % AREA_ACCENTS.length];
            return (
            <a
              key={cat.slug}
              href={`/for-doctors/reference-library/${cat.slug}`}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${a.card} border ${a.border} p-4 shadow-[0_10px_26px_-16px_rgba(0,61,77,0.45)] ${a.glow} hover:-translate-y-1.5 transition-all duration-300`}
            >
              <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${a.bar}`} />
              <div>
                {/* Area Thumbnail */}
                <div className="relative h-24 w-full rounded-xl overflow-hidden mb-3 bg-white/60 border border-white/80">
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

                <div className={`text-[10px] font-black px-2 py-0.5 rounded-md inline-block mb-1.5 border ${a.chip}`}>
                  {cat.count} References
                </div>

                <h3 className={`font-black text-sm text-slate-900 ${a.title} transition-colors leading-snug`}>
                  {cat.name}
                </h3>
              </div>

              <div className="mt-4 pt-3 border-t border-white/80 flex items-center justify-between text-xs font-black">
                <span className={a.link}>Explore</span>
                <ArrowRight className={`w-3.5 h-3.5 ${a.link} group-hover:translate-x-1 transition-transform`} />
              </div>
            </a>
            );
          })}
        </div>
      </section>

      <RyanFooter />
    </div>
  );
}
