'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import { ProductPackshot } from '@/components/ryan/ProductPackshot';
import { generateProductMonographPDF } from '@/lib/pdf-generator';
import { 
  RYAN_PRODUCTS, 
  THERAPEUTIC_AREAS, 
  DOSAGE_FORMS 
} from '@/data/ryan-products';
import { 
  Search, 
  X, 
  Filter, 
  ChevronDown, 
  Download, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Pill, 
  Layers, 
  Stethoscope,
  BookOpen,
  Printer,
  ChevronRight
} from 'lucide-react';

type AreaStyle = {
  card: string; border: string; bar: string; pill: string; chip: string;
  dot: string; active: string; shadow: string; title: string; icon: string;
};

const AREA_STYLES: Record<string, AreaStyle> = {
  Acne: { card: 'from-rose-50 via-white to-pink-50', border: 'border-rose-200/80', bar: 'from-rose-400 to-pink-500', pill: 'bg-rose-100 text-rose-700 border-rose-200', chip: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500', active: 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200', shadow: 'hover:shadow-[0_24px_50px_-18px_rgba(244,63,94,0.55)]', title: 'group-hover:text-rose-600', icon: 'text-rose-600' },
  Antifungal: { card: 'from-amber-50 via-white to-orange-50', border: 'border-amber-200/80', bar: 'from-amber-400 to-orange-500', pill: 'bg-amber-100 text-amber-700 border-amber-200', chip: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500', active: 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-200', shadow: 'hover:shadow-[0_24px_50px_-18px_rgba(245,158,11,0.55)]', title: 'group-hover:text-amber-600', icon: 'text-amber-600' },
  Antibacterial: { card: 'from-red-50 via-white to-orange-50', border: 'border-red-200/80', bar: 'from-red-400 to-orange-500', pill: 'bg-red-100 text-red-700 border-red-200', chip: 'bg-red-50 text-red-700 border-red-200', dot: 'bg-red-500', active: 'bg-red-600 text-white border-red-600 shadow-md shadow-red-200', shadow: 'hover:shadow-[0_24px_50px_-18px_rgba(239,68,68,0.55)]', title: 'group-hover:text-red-600', icon: 'text-red-600' },
  Corticosteroids: { card: 'from-violet-50 via-white to-purple-50', border: 'border-violet-200/80', bar: 'from-violet-400 to-purple-500', pill: 'bg-violet-100 text-violet-700 border-violet-200', chip: 'bg-violet-50 text-violet-700 border-violet-200', dot: 'bg-violet-500', active: 'bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200', shadow: 'hover:shadow-[0_24px_50px_-18px_rgba(139,92,246,0.55)]', title: 'group-hover:text-violet-600', icon: 'text-violet-600' },
  'Allergy & Pruritus': { card: 'from-sky-50 via-white to-blue-50', border: 'border-sky-200/80', bar: 'from-sky-400 to-blue-500', pill: 'bg-sky-100 text-sky-700 border-sky-200', chip: 'bg-sky-50 text-sky-700 border-sky-200', dot: 'bg-sky-500', active: 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-200', shadow: 'hover:shadow-[0_24px_50px_-18px_rgba(14,165,233,0.55)]', title: 'group-hover:text-sky-600', icon: 'text-sky-600' },
  Immunomodulator: { card: 'from-indigo-50 via-white to-blue-50', border: 'border-indigo-200/80', bar: 'from-indigo-400 to-blue-500', pill: 'bg-indigo-100 text-indigo-700 border-indigo-200', chip: 'bg-indigo-50 text-indigo-700 border-indigo-200', dot: 'bg-indigo-500', active: 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200', shadow: 'hover:shadow-[0_24px_50px_-18px_rgba(99,102,241,0.55)]', title: 'group-hover:text-indigo-600', icon: 'text-indigo-600' },
  Pigmentation: { card: 'from-fuchsia-50 via-white to-pink-50', border: 'border-fuchsia-200/80', bar: 'from-fuchsia-400 to-pink-500', pill: 'bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200', chip: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200', dot: 'bg-fuchsia-500', active: 'bg-fuchsia-600 text-white border-fuchsia-600 shadow-md shadow-fuchsia-200', shadow: 'hover:shadow-[0_24px_50px_-18px_rgba(217,70,239,0.55)]', title: 'group-hover:text-fuchsia-600', icon: 'text-fuchsia-600' },
  'Hair & Scalp': { card: 'from-emerald-50 via-white to-teal-50', border: 'border-emerald-200/80', bar: 'from-emerald-400 to-teal-500', pill: 'bg-emerald-100 text-emerald-700 border-emerald-200', chip: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500', active: 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200', shadow: 'hover:shadow-[0_24px_50px_-18px_rgba(16,185,129,0.55)]', title: 'group-hover:text-emerald-600', icon: 'text-emerald-600' },
  'Anti-Parasitic': { card: 'from-orange-50 via-white to-amber-50', border: 'border-orange-200/80', bar: 'from-orange-400 to-amber-500', pill: 'bg-orange-100 text-orange-700 border-orange-200', chip: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-500', active: 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-200', shadow: 'hover:shadow-[0_24px_50px_-18px_rgba(249,115,22,0.55)]', title: 'group-hover:text-orange-600', icon: 'text-orange-600' },
  'Supportive Care': { card: 'from-cyan-50 via-white to-teal-50', border: 'border-cyan-200/80', bar: 'from-cyan-400 to-teal-500', pill: 'bg-cyan-100 text-cyan-700 border-cyan-200', chip: 'bg-cyan-50 text-cyan-700 border-cyan-200', dot: 'bg-cyan-500', active: 'bg-cyan-700 text-white border-cyan-700 shadow-md shadow-cyan-200', shadow: 'hover:shadow-[0_24px_50px_-18px_rgba(6,182,212,0.55)]', title: 'group-hover:text-cyan-600', icon: 'text-cyan-600' },
};
const FALLBACK_AREA: AreaStyle = { card: 'from-teal-50 via-white to-cyan-50', border: 'border-teal-200/80', bar: 'from-teal-400 to-cyan-500', pill: 'bg-teal-100 text-teal-700 border-teal-200', chip: 'bg-teal-50 text-teal-700 border-teal-200', dot: 'bg-teal-500', active: 'bg-teal-700 text-white border-teal-700 shadow-md shadow-teal-200', shadow: 'hover:shadow-[0_24px_50px_-18px_rgba(0,118,138,0.55)]', title: 'group-hover:text-teal-600', icon: 'text-teal-600' };
const areaStyle = (area: string) => AREA_STYLES[area] || FALLBACK_AREA;

export default function ProductMonographsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTherapeuticAreas, setSelectedTherapeuticAreas] = useState<string[]>([]);
  const [selectedDosageForms, setSelectedDosageForms] = useState<string[]>([]);
  const [productsList, setProductsList] = useState(RYAN_PRODUCTS);
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/db/products')
      .then(res => res.json())
      .then(data => {
        if (data?.success && Array.isArray(data.products) && data.products.length > 0) {
          const mapped = data.products.map((p: any) => ({
            ...p.data,
            id: p.id,
            slug: p.slug,
            brandName: p.brand_name,
            genericName: p.generic_name,
            strength: p.strength || p.data?.strength || '',
            dosageForm: p.dosage_form || p.data?.dosageForm || 'Cream',
            route: p.route || p.data?.route || 'Topical',
            therapeuticArea: p.therapeutic_area || p.data?.therapeuticArea || 'Acne',
            tagline: p.tagline || p.data?.tagline || '',
            hasFullMonograph: true,
            isFeatured: p.is_featured ?? p.data?.isFeatured ?? false,
            images: {
              ...(p.data?.images || {}),
              primaryPackshot: p.packshot_image || p.data?.images?.primaryPackshot || ''
            }
          }));
          setProductsList(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const PAGE_SIZE = 16;

  const toggleTherapeutic = (area: string) => {
    setSelectedTherapeuticAreas(prev => 
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTherapeuticAreas([]);
    setSelectedDosageForms([]);
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    return productsList.filter(product => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.brandName.toLowerCase().includes(q);
        const matchesGeneric = product.genericName.toLowerCase().includes(q);
        const matchesIndication = product.indications.some(i => i.toLowerCase().includes(q));
        if (!matchesName && !matchesGeneric && !matchesIndication) {
          return false;
        }
      }
      if (selectedTherapeuticAreas.length > 0) {
        if (!selectedTherapeuticAreas.includes(product.therapeuticArea)) {
          return false;
        }
      }
      if (selectedDosageForms.length > 0) {
        if (!selectedDosageForms.includes(product.dosageForm)) {
          return false;
        }
      }
      return true;
    });
  }, [productsList, searchQuery, selectedTherapeuticAreas, selectedDosageForms]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pagedProducts = filteredProducts.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleDownloadMonograph = async (product: any) => {
    try {
      setDownloadToast(`Generating Official Monograph PDF: ${product.brandName}...`);
      await generateProductMonographPDF(product);
      setDownloadToast(`✓ Downloaded ${product.brandName} Monograph PDF`);
      setTimeout(() => setDownloadToast(null), 3500);
    } catch (err) {
      console.error('Failed to generate monograph PDF:', err);
      setDownloadToast(`Error generating PDF for ${product.brandName}`);
      setTimeout(() => setDownloadToast(null), 3500);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* ========================================================= */}
      {/* 1. HERO BANNER: PRODUCT MONOGRAPHS FOR HEALTHCARE PROS    */}
      {/* ========================================================= */}
      <section className="relative text-white overflow-hidden py-10 lg:py-14 border-b border-teal-500/30 bg-[linear-gradient(135deg,#04202b_0%,#0b3d55_30%,#0e4f63_55%,#1e3a8a_100%)]">
        <div className="h-1.5 w-full absolute top-0 left-0 bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-300/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-10 right-1/3 w-64 h-64 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-72 h-72 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:44px_44px]" />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[164px] relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-3.5">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-extrabold tracking-wider uppercase text-[10px] shadow-md">
                  <Stethoscope className="w-3 h-3 mr-1" />
                  Healthcare Professional Portal
                </span>
                <nav className="flex items-center gap-1.5 text-teal-200/80 font-medium text-[11px]" aria-label="Breadcrumb">
                  <Link href="/" className="hover:text-white transition">Home</Link>
                  <span>/</span>
                  <Link href="/for-doctors" className="hover:text-white transition">For Doctors</Link>
                  <span>/</span>
                  <span className="text-white font-bold">Product Monographs</span>
                </nav>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase bg-gradient-to-r from-white via-cyan-100 to-emerald-200 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
                Product Monographs Directory
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-teal-50/90 leading-relaxed font-normal max-w-2xl">
                Comprehensive, evidence-based dermatological monographs for all 53 Ryan Dermaceutics formulations. Detailed pharmacological profiles, dosage algorithms, and clinical trial evidence.
              </p>

              {/* 4 Feature Badges */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-br from-rose-500/25 to-white/5 backdrop-blur border border-rose-300/30 shadow-sm hover:-translate-y-0.5 transition-all">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shrink-0 shadow-sm">
                    <FileText className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span className="text-[11px] font-bold text-white leading-tight">
                    53 Complete Monographs
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/25 to-white/5 backdrop-blur border border-emerald-300/30 shadow-sm hover:-translate-y-0.5 transition-all">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span className="text-[11px] font-bold text-white leading-tight">
                    WHO-GMP Formulations
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-br from-sky-500/25 to-white/5 backdrop-blur border border-sky-300/30 shadow-sm hover:-translate-y-0.5 transition-all">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-sm">
                    <Download className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span className="text-[11px] font-bold text-white leading-tight">
                    Instant PDF Downloads
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-br from-amber-500/25 to-white/5 backdrop-blur border border-amber-300/30 shadow-sm hover:-translate-y-0.5 transition-all">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shrink-0 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span className="text-[11px] font-bold text-white leading-tight">
                    Evidence-Based Dosing
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="hidden lg:flex flex-col gap-3 p-5 rounded-2xl bg-gradient-to-br from-indigo-500/25 via-violet-500/15 to-white/5 backdrop-blur-md border border-white/25 text-white max-w-xs shrink-0 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.6)]">
              <span className="text-[11px] font-black uppercase tracking-widest text-fuchsia-200">
                PHYSICIAN REFERENCE
              </span>
              <p className="text-xs text-teal-50/90 leading-relaxed">
                Looking for quick regulatory prescribing indications? Visit the Prescribing Information portal.
              </p>
              <Link
                href="/for-doctors/prescribing-information"
                className="btn-fx inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
              >
                <span>Prescribing Information</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. FILTER & SEARCH CONTROLS                               */}
      {/* ========================================================= */}
      <section className="bg-white border-b border-teal-100/80 sticky top-20 z-30 shadow-2xs">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[164px] py-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search monographs by brand name, active molecule or indication..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-8 py-2 rounded-xl border border-teal-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00768a]"
              />
              <Search className="w-4 h-4 text-teal-600 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Results count & reset */}
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="font-semibold">
                Showing <strong className="text-[#00768a]">{filteredProducts.length}</strong> monographs
              </span>
              {(searchQuery || selectedTherapeuticAreas.length > 0) && (
                <button
                  onClick={clearAllFilters}
                  className="text-teal-700 hover:underline font-bold text-xs"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Therapeutic Area Category Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-3 pb-1">
            <span className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-slate-400 pr-1">
              <Filter className="w-3.5 h-3.5" />
              Areas
            </span>
            <button
              onClick={() => { setSelectedTherapeuticAreas([]); setCurrentPage(1); }}
              className={`btn-fx px-4 py-2 rounded-full border text-xs font-black transition-all whitespace-nowrap cursor-pointer ${
                selectedTherapeuticAreas.length === 0
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:shadow-sm'
              }`}
            >
              All Areas ({productsList.length})
            </button>
            {THERAPEUTIC_AREAS.map(area => {
              const s = areaStyle(area);
              const isActive = selectedTherapeuticAreas.includes(area);
              const count = productsList.filter(p => p.therapeuticArea === area).length;
              return (
                <button
                  key={area}
                  onClick={() => toggleTherapeutic(area)}
                  className={`btn-fx inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? s.active
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : s.dot}`} />
                  {area}
                  <span className={`px-1.5 rounded-full text-[10px] font-black ${isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. MONOGRAPHS GRID                                        */}
      {/* ========================================================= */}
      <main className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[164px] py-8 sm:py-12">
        {pagedProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No monographs match your query</h3>
            <p className="text-xs text-slate-500 mt-1">Try resetting your search terms or filters.</p>
            <button
              onClick={clearAllFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-[#00768a] text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {pagedProducts.map((product) => {
              const s = areaStyle(product.therapeuticArea);
              return (
              <div
                key={product.id}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${s.card} border ${s.border} shadow-[0_10px_28px_-16px_rgba(0,61,77,0.45)] ${s.shadow} hover:-translate-y-1.5 transition-all duration-300`}
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${s.bar}`} />
                <div className="p-5">
                  {/* Category Pill & Form */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${s.pill}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {product.therapeuticArea}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 bg-white/80 backdrop-blur px-2 py-1 rounded-full border border-white/70 shadow-sm">
                      {product.dosageForm}
                    </span>
                  </div>

                  {/* Packshot Image */}
                  <div className="relative h-40 w-full rounded-xl overflow-hidden mb-3 bg-gradient-to-b from-white via-white/70 to-transparent border border-white/80 flex items-center justify-center p-3 shadow-inner">
                    <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full ${s.pill.split(' ')[0]} opacity-40 blur-2xl pointer-events-none`} />
                    <ProductPackshot product={product as any} />
                  </div>

                  <h3 className={`font-black text-base text-[#003d4d] ${s.title} transition-colors leading-tight`}>
                    {product.brandName}
                  </h3>
                  <div className="text-xs font-bold text-slate-600 mt-0.5 leading-tight">
                    {product.genericName}
                  </div>

                  {product.indications?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {product.indications.slice(0, 2).map((ind, i) => (
                        <span key={i} className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${s.chip}`}>
                          {ind}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 bg-white/70 backdrop-blur border-t border-white/80 flex items-center justify-between gap-2">
                  <Link
                    href={`/products/${product.slug}`}
                    className={`btn-fx group/btn inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white ${s.icon} border ${s.border} text-xs font-black shadow-sm hover:shadow-md transition-all duration-300`}
                  >
                    <span>View Monograph</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDownloadMonograph(product)}
                    className={`btn-fx group/dl inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg ${s.active.split(' shadow')[0]} text-white text-[11px] font-black shadow-md hover:shadow-lg transition-all duration-300 mono-btn-glow cursor-pointer`}
                    title={`Download ${product.brandName} PDF Monograph`}
                  >
                    <Download className="w-3.5 h-3.5 group-hover/dl:-translate-y-0.5 transition-transform duration-300" />
                    Download PDF
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Previous
            </button>
            <span className="text-xs text-slate-600 font-medium">
              Page {safePage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Download Toast */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-[99999] bg-[#003d4d] text-white px-5 py-3 rounded-2xl shadow-2xl border border-teal-400 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{downloadToast}</span>
        </div>
      )}

      <RyanFooter />
    </div>
  );
}
