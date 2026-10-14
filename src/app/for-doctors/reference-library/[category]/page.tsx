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

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* ========================================================= */}
      {/* 1. HERO SECTION (Matching Level 2 of Navigation Flow)     */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e6f4f7] via-[#f1f9fb] to-[#f8fafc] border-b border-teal-100/60 pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <span className="text-xs font-bold tracking-widest text-[#00768a] uppercase bg-teal-100 px-3 py-1 rounded-full border border-teal-200">
                CLINICAL REFERENCE DOMAIN
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003d4d] tracking-tight uppercase leading-none">
                {category.name}
              </h1>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
                {category.description}
              </p>

              {/* Search within Category */}
              <div className="pt-2 relative max-w-xl">
                <input
                  type="text"
                  placeholder={`Search within ${category.name}...`}
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
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section 1: Condition References */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#003d4d] tracking-tight uppercase">
              Condition References
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a clinical presentation to access the 11-point diagnostic and therapeutic reference.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConditions.map((cond) => (
              <a
                key={cond.slug}
                href={`/for-doctors/reference-library/${category.slug}/${cond.slug}`}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-lg hover:border-[#00768a] hover:-translate-y-0.5 transition-all flex items-center gap-4 group"
              >
                {/* Condition Thumbnail */}
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <Image
                    src={cond.thumbnail}
                    alt={cond.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#00768a] transition-colors truncate">
                    {cond.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                    {cond.subtitle}
                  </p>
                </div>

                <div className="shrink-0 text-slate-300 group-hover:text-[#00768a] group-hover:translate-x-1 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Section 2: Therapeutic References */}
        {category.therapeuticReferences && category.therapeuticReferences.length > 0 && (
          <div className="pt-6 border-t border-slate-200/80">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#003d4d] tracking-tight uppercase">
                Therapeutic References
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Pharmacological mechanisms, drug positioning, and therapeutic class considerations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.therapeuticReferences.map((ther) => (
                <a
                  key={ther.slug}
                  href={`/for-doctors/reference-library/${category.slug}/${ther.slug}`}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-lg hover:border-[#00768a] hover:-translate-y-0.5 transition-all flex items-center gap-4 group"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <Image
                      src={ther.thumbnail}
                      alt={ther.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-[#00768a] transition-colors truncate">
                      {ther.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                      {ther.subtitle}
                    </p>
                  </div>

                  <div className="shrink-0 text-slate-300 group-hover:text-[#00768a] group-hover:translate-x-1 transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </a>
              ))}
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
