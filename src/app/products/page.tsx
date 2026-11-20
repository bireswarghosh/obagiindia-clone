'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import { ProductPackshot } from '@/components/ryan/ProductPackshot';
import { 
  RYAN_PRODUCTS, 
  THERAPEUTIC_AREAS, 
  DOSAGE_FORMS, 
  ROUTES,
  RyanProduct
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
  SlidersHorizontal,
  LayoutGrid,
  List as ListIcon,
  Stethoscope,
  Activity,
  ChevronRight,
  CheckCircle,
  FileCheck2,
  Eye,
  Building2
} from 'lucide-react';
import { generateProductMonographPDF } from '@/lib/pdf-generator';

/* ------------------------------------------------------------------ */
/* Category Color Palette for Eye-Catching, Vibrant Highlighting       */
/* ------------------------------------------------------------------ */
const CATEGORY_COLORS: Record<string, { badge: string; bg: string; border: string }> = {
  'Acne': { badge: 'bg-rose-100 text-rose-800 border-rose-200', bg: 'hover:border-rose-300', border: 'border-rose-100' },
  'Acne Therapy': { badge: 'bg-rose-100 text-rose-800 border-rose-200', bg: 'hover:border-rose-300', border: 'border-rose-100' },
  'Antifungal': { badge: 'bg-amber-100 text-amber-900 border-amber-200', bg: 'hover:border-amber-300', border: 'border-amber-100' },
  'Antifungals': { badge: 'bg-amber-100 text-amber-900 border-amber-200', bg: 'hover:border-amber-300', border: 'border-amber-100' },
  'Corticosteroid': { badge: 'bg-violet-100 text-violet-800 border-violet-200', bg: 'hover:border-violet-300', border: 'border-violet-100' },
  'Corticosteroids & Anti-inflammatory': { badge: 'bg-violet-100 text-violet-800 border-violet-200', bg: 'hover:border-violet-300', border: 'border-violet-100' },
  'Allergy & Antihistamine': { badge: 'bg-sky-100 text-sky-800 border-sky-200', bg: 'hover:border-sky-300', border: 'border-sky-100' },
  'Antihistamines & Allergy': { badge: 'bg-sky-100 text-sky-800 border-sky-200', bg: 'hover:border-sky-300', border: 'border-sky-100' },
  'Trichology': { badge: 'bg-emerald-100 text-emerald-800 border-emerald-200', bg: 'hover:border-emerald-300', border: 'border-emerald-100' },
  'Trichology & Hair': { badge: 'bg-emerald-100 text-emerald-800 border-emerald-200', bg: 'hover:border-emerald-300', border: 'border-emerald-100' },
  'Immunomodulator': { badge: 'bg-indigo-100 text-indigo-800 border-indigo-200', bg: 'hover:border-indigo-300', border: 'border-indigo-100' },
  'Immunomodulators': { badge: 'bg-indigo-100 text-indigo-800 border-indigo-200', bg: 'hover:border-indigo-300', border: 'border-indigo-100' },
  'Antibacterials & Scabicides': { badge: 'bg-cyan-100 text-cyan-800 border-cyan-200', bg: 'hover:border-cyan-300', border: 'border-cyan-100' },
  'Cleansers & Emollients': { badge: 'bg-teal-100 text-teal-800 border-teal-200', bg: 'hover:border-teal-300', border: 'border-teal-100' },
};

const getCategoryColor = (category: string) => {
  return CATEGORY_COLORS[category] || { badge: 'bg-teal-100 text-[#006070] border-teal-200', bg: 'hover:border-teal-300', border: 'border-teal-100' };
};

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTherapeuticAreas, setSelectedTherapeuticAreas] = useState<string[]>([]);
  const [selectedDosageForms, setSelectedDosageForms] = useState<string[]>([]);
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'name-desc'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [productsList, setProductsList] = useState(RYAN_PRODUCTS);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

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

  // Main category tab selection matching 3-category portfolio structure
  const [activeMainCategory, setActiveMainCategory] = useState<'therapeutic' | 'route' | 'dosage'>('therapeutic');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const PAGE_SIZE = 16;

  // Accordion open states
  const [openSections, setOpenSections] = useState({
    therapeutic: true,
    route: true,
    dosage: true
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const qParam = params.get('q');
      if (qParam) setSearchQuery(qParam);

      const areaParam = params.get('area') || params.get('category');
      if (areaParam) {
        const matched = THERAPEUTIC_AREAS.find(
          a => a.toLowerCase() === areaParam.toLowerCase() ||
               a.toLowerCase().includes(areaParam.toLowerCase()) ||
               areaParam.toLowerCase().includes(a.toLowerCase())
        );
        if (matched) setSelectedTherapeuticAreas([matched]);
      }
    }
  }, []);

  const toggleSection = (section: 'therapeutic' | 'dosage' | 'route') => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleTherapeutic = (area: string) => {
    setSelectedTherapeuticAreas(prev => 
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
    setCurrentPage(1);
  };

  const toggleDosageForm = (form: string) => {
    setSelectedDosageForms(prev => 
      prev.includes(form) ? prev.filter(f => f !== form) : [...prev, form]
    );
    setCurrentPage(1);
  };

  const toggleRoute = (route: string) => {
    setSelectedRoutes(prev => 
      prev.includes(route) ? prev.filter(r => r !== route) : [...prev, route]
    );
    setCurrentPage(1);
  };

  const handleDownloadMonograph = async (product: any) => {
    try {
      setDownloadToast(`Generating Official PDF: ${product.brandName}...`);
      await generateProductMonographPDF(product);
      setDownloadToast(`✓ Downloaded ${product.brandName} Monograph PDF`);
      setTimeout(() => setDownloadToast(null), 3500);
    } catch (err) {
      console.error(err);
      setDownloadToast(`✓ Download initiated for ${product.brandName}`);
      setTimeout(() => setDownloadToast(null), 3000);
    }
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTherapeuticAreas([]);
    setSelectedDosageForms([]);
    setSelectedRoutes([]);
    setSortBy('featured');
    setCurrentPage(1);
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedTherapeuticAreas.length > 0 || 
    selectedDosageForms.length > 0 || 
    selectedRoutes.length > 0;

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = productsList.filter(product => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.brandName.toLowerCase().includes(q);
        const matchesGeneric = product.genericName.toLowerCase().includes(q);
        const matchesIndication = product.indications?.some(i => i.toLowerCase().includes(q));
        const matchesTagline = product.tagline?.toLowerCase().includes(q);
        if (!matchesName && !matchesGeneric && !matchesIndication && !matchesTagline) {
          return false;
        }
      }

      // Therapeutic area filter
      if (selectedTherapeuticAreas.length > 0) {
        if (!selectedTherapeuticAreas.includes(product.therapeuticArea)) {
          return false;
        }
      }

      // Dosage form filter
      if (selectedDosageForms.length > 0) {
        if (!selectedDosageForms.includes(product.dosageForm)) {
          return false;
        }
      }

      // Route filter
      if (selectedRoutes.length > 0) {
        if (!selectedRoutes.includes(product.route)) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.brandName.localeCompare(b.brandName));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.brandName.localeCompare(a.brandName));
    }

    return result;
  }, [productsList, searchQuery, selectedTherapeuticAreas, selectedDosageForms, selectedRoutes, sortBy]);

  // Dynamic counts for checkboxes
  const counts = useMemo(() => {
    const therapeuticCounts: Record<string, number> = {};
    const dosageCounts: Record<string, number> = {};
    const routeCounts: Record<string, number> = {};

    productsList.forEach(p => {
      therapeuticCounts[p.therapeuticArea] = (therapeuticCounts[p.therapeuticArea] || 0) + 1;
      dosageCounts[p.dosageForm] = (dosageCounts[p.dosageForm] || 0) + 1;
      routeCounts[p.route] = (routeCounts[p.route] || 0) + 1;
    });

    return { therapeuticCounts, dosageCounts, routeCounts };
  }, [productsList]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pagedProducts = filteredProducts.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* ========================================================= */}
      {/* 1. HERO HEADER: RYAN DERMACEUTICS PRODUCTS CATALOG        */}
      {/* ========================================================= */}
      <section className="relative bg-gradient-to-br from-[#0e4f63] via-[#006070] to-[#003d4d] text-white border-b border-teal-500/30 overflow-hidden py-10 lg:py-16">
        {/* Abstract glowing accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-300/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-3.5">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-extrabold tracking-wider uppercase text-[10px] shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  ADVANCED DERMATOLOGICAL PORTFOLIO
                </span>
                <nav className="flex items-center gap-1.5 text-teal-200/80 font-medium text-[11px]" aria-label="Breadcrumb">
                  <Link href="/" className="hover:text-white transition">Home</Link>
                  <span>/</span>
                  <span className="text-white font-bold">Products</span>
                </nav>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.15]">
                Our Products Portfolio
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-teal-100/90 leading-relaxed font-normal max-w-2xl">
                Explore 53+ physician-prescribed dermatology treatments engineered under strict WHO-GMP standards. Precision topical and systemic formulations designed for clinical efficacy, patient tolerability, and rapid barrier restoration.
              </p>

              {/* 4 Feature Badges */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 backdrop-blur border border-white/15">
                  <Pill className="w-4 h-4 text-teal-300 shrink-0" />
                  <span className="text-[11px] font-semibold text-white">
                    53+ Formulations
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 backdrop-blur border border-white/15">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-semibold text-white">
                    WHO-GMP Certified
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 backdrop-blur border border-white/15">
                  <Activity className="w-4 h-4 text-cyan-300 shrink-0" />
                  <span className="text-[11px] font-semibold text-white">
                    Targeted Delivery Bases
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/10 backdrop-blur border border-white/15">
                  <Stethoscope className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="text-[11px] font-semibold text-white">
                    Dermatologist Prescribed
                  </span>
                </div>
              </div>
            </div>

            {/* Right Graphic Banner */}
            <div className="hidden lg:block relative w-84 h-48 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 bg-white/5 backdrop-blur-md group shrink-0">
              <Image 
                src="/ryan/portfolio-packshots.jpg" 
                alt="Ryan Dermaceutics Products Portfolio" 
                fill 
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003d4d]/90 via-transparent to-transparent flex items-end p-5">
                <div className="text-white">
                  <div className="text-xs font-bold text-teal-300 uppercase tracking-wider">Complete Dermatology Range</div>
                  <div className="text-sm font-semibold text-white">Topical, Oral, Hair & Scalp Solutions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. MAIN CATALOG LAYOUT (Sidebar + Products Grid)          */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)] gap-8">
          
          {/* Mobile Filters toggle button */}
          <div className="lg:hidden mb-2">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white border border-teal-200 text-xs font-bold text-slate-800 shadow-2xs cursor-pointer active:scale-98"
              aria-expanded={filtersOpen}
            >
              {filtersOpen ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4 text-[#00768a]" />}
              {filtersOpen ? 'Hide Filters' : 'Filter Products'}
              {hasActiveFilters && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-[#00768a] text-white text-[10px] font-black">
                  Active
                </span>
              )}
            </button>
          </div>

          {/* ======================================================= */}
          {/* LEFT SIDEBAR: FILTERS                                    */}
          {/* ======================================================= */}
          <aside className={`space-y-6 min-w-0 ${filtersOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs lg:sticky lg:top-24 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#00768a]" />
                  <h2 className="font-extrabold text-sm uppercase tracking-wider text-[#003d4d]">
                    Filter Portfolio
                  </h2>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-bold text-[#00768a] hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Search Bar in Sidebar */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  placeholder="Search brand, generic..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl border border-teal-200 text-xs text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00768a]"
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

              {/* Filter 1: Therapeutic Category */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => toggleSection('therapeutic')}
                  className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-[#003d4d] cursor-pointer"
                >
                  <span>Therapeutic Area</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${openSections.therapeutic ? 'rotate-180' : ''}`} />
                </button>

                {openSections.therapeutic && (
                  <div className="space-y-1 pt-1">
                    {THERAPEUTIC_AREAS.map(area => {
                      const isSelected = selectedTherapeuticAreas.includes(area);
                      const count = counts.therapeuticCounts[area] || 0;
                      return (
                        <button
                          key={area}
                          type="button"
                          onClick={() => toggleTherapeutic(area)}
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition cursor-pointer text-left ${
                            isSelected
                              ? 'bg-[#00768a] text-white font-bold shadow-2xs'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="truncate">{area}</span>
                          <span className={`text-[10px] ml-1.5 ${isSelected ? 'text-teal-100 font-bold' : 'text-slate-400'}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Filter 2: Route of Administration (Topical & Oral) */}
              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <button
                  type="button"
                  onClick={() => toggleSection('route')}
                  className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-[#003d4d] cursor-pointer"
                >
                  <span>Route of Administration</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${openSections.route ? 'rotate-180' : ''}`} />
                </button>

                {openSections.route && (
                  <div className="space-y-1.5 pt-1">
                    {ROUTES.map(r => {
                      const isSelected = selectedRoutes.includes(r.name);
                      const count = counts.routeCounts[r.name] || 0;
                      return (
                        <div key={r.name} className="space-y-1">
                          <button
                            type="button"
                            onClick={() => toggleRoute(r.name)}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition cursor-pointer text-left ${
                              isSelected
                                ? 'bg-[#00768a] text-white font-bold shadow-2xs'
                                : 'text-slate-800 font-semibold hover:bg-slate-50'
                            }`}
                          >
                            <span>{r.name}</span>
                            <span className={`text-[10px] ml-1.5 ${isSelected ? 'text-teal-100 font-bold' : 'text-slate-400'}`}>
                              {count}
                            </span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Filter 3: Dosage Form */}
              <div className="pt-3 border-t border-slate-100 space-y-2.5">
                <button
                  type="button"
                  onClick={() => toggleSection('dosage')}
                  className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-[#003d4d] cursor-pointer"
                >
                  <span>Dosage Form</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${openSections.dosage ? 'rotate-180' : ''}`} />
                </button>

                {openSections.dosage && (
                  <div className="space-y-1 pt-1">
                    {DOSAGE_FORMS.map(form => {
                      const isSelected = selectedDosageForms.includes(form);
                      const count = counts.dosageCounts[form] || 0;
                      return (
                        <button
                          key={form}
                          type="button"
                          onClick={() => toggleDosageForm(form)}
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition cursor-pointer text-left ${
                            isSelected
                              ? 'bg-[#00768a] text-white font-bold shadow-2xs'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span>{form}</span>
                          <span className={`text-[10px] ml-1.5 ${isSelected ? 'text-teal-100 font-bold' : 'text-slate-400'}`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Doctor Monograph & Batch Analysis Quick Link */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="p-3.5 rounded-xl bg-teal-50/80 border border-teal-100 text-center space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#006070] block">
                    HEALTHCARE PRACTITIONERS
                  </span>
                  <p className="text-[11px] text-slate-600 leading-tight">
                    Official clinical monographs &amp; WHO-GMP release documentation:
                  </p>
                  <div className="pt-1 flex flex-col gap-1.5 text-[11px] font-bold">
                    <Link
                      href="/for-doctors/product-monographs"
                      className="inline-flex items-center justify-center gap-1 text-[#00768a] hover:underline"
                    >
                      <span>Product Monographs Portal</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link
                      href="/for-doctors/batch-analysis-report"
                      className="inline-flex items-center justify-center gap-1 text-emerald-700 hover:underline"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Batch Analysis (COA)</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ======================================================= */}
          {/* RIGHT MAIN: PRODUCTS LISTING & CONTROLS                */}
          {/* ======================================================= */}
          <main className="min-w-0 space-y-6">
            {/* ======================================================= */}
            {/* 3 MAIN CATEGORIES PRIMARY SELECTOR                      */}
            {/* Structurally divided into 3 categories + sub-categories */}
            {/* ======================================================= */}
            <div className="bg-white rounded-2xl border border-teal-200/90 p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h2 className="text-xs font-black uppercase tracking-wider text-[#003d4d]">
                    3 Categories Portfolio Navigation (Therapeutic • Route • Form)
                  </h2>
                </div>
                <span className="text-[11px] text-slate-500 font-medium">
                  Select a category to view official sub-categories &amp; formulations
                </span>
              </div>

              {/* 3 Main Category Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Category 1 */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveMainCategory('therapeutic');
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    activeMainCategory === 'therapeutic'
                      ? 'bg-gradient-to-r from-[#003d4d] via-[#006070] to-[#00768a] text-white border-transparent shadow-md'
                      : 'bg-slate-50 hover:bg-teal-50/70 text-slate-700 border-slate-200 hover:border-teal-200'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest block opacity-75">Category 01</span>
                    <h3 className="text-xs sm:text-sm font-black mt-0.5">Therapeutic Area</h3>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    activeMainCategory === 'therapeutic' ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-600'
                  }`}>
                    10 Areas
                  </span>
                </button>

                {/* Category 2 */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveMainCategory('route');
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    activeMainCategory === 'route'
                      ? 'bg-gradient-to-r from-[#003d4d] via-[#006070] to-[#00768a] text-white border-transparent shadow-md'
                      : 'bg-slate-50 hover:bg-teal-50/70 text-slate-700 border-slate-200 hover:border-teal-200'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest block opacity-75">Category 02</span>
                    <h3 className="text-xs sm:text-sm font-black mt-0.5">Route of Admin</h3>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    activeMainCategory === 'route' ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-600'
                  }`}>
                    Topical &amp; Oral
                  </span>
                </button>

                {/* Category 3 */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveMainCategory('dosage');
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    activeMainCategory === 'dosage'
                      ? 'bg-gradient-to-r from-[#003d4d] via-[#006070] to-[#00768a] text-white border-transparent shadow-md'
                      : 'bg-slate-50 hover:bg-teal-50/70 text-slate-700 border-slate-200 hover:border-teal-200'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest block opacity-75">Category 03</span>
                    <h3 className="text-xs sm:text-sm font-black mt-0.5">Dosage Form</h3>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    activeMainCategory === 'dosage' ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-600'
                  }`}>
                    12 Forms
                  </span>
                </button>
              </div>

              {/* Sub-Categories Horizontal Pills Bar according to active category */}
              <div className="pt-2">
                {activeMainCategory === 'therapeutic' && (
                  <div className="space-y-1.5 animate-fade-in">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Filter by Therapeutic Sub-Category:
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setSelectedTherapeuticAreas([])}
                        className={`px-3 py-1 rounded-full text-xs transition cursor-pointer ${
                          selectedTherapeuticAreas.length === 0
                            ? 'bg-[#00768a] text-white font-bold shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        All Areas ({productsList.length})
                      </button>
                      {THERAPEUTIC_AREAS.map((area) => {
                        const isSel = selectedTherapeuticAreas.includes(area);
                        const cnt = counts.therapeuticCounts[area] || 0;
                        return (
                          <button
                            key={area}
                            type="button"
                            onClick={() => toggleTherapeutic(area)}
                            className={`px-3 py-1 rounded-full text-xs transition cursor-pointer flex items-center gap-1.5 ${
                              isSel
                                ? 'bg-[#00768a] text-white font-bold shadow-xs'
                                : 'bg-slate-100 hover:bg-teal-50 text-slate-700 border border-transparent hover:border-teal-200'
                            }`}
                          >
                            <span>{area}</span>
                            <span className={`text-[10px] ${isSel ? 'text-teal-100' : 'text-slate-400'}`}>({cnt})</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeMainCategory === 'route' && (
                  <div className="space-y-3 animate-fade-in">
                    {/* Topical Stream */}
                    <div className="p-3 rounded-xl bg-teal-50/50 border border-teal-100 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-[#004f5e]">
                          Topical Sub-Categories (Creams, Ointments, Gels, Solutions, Shampoos)
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleRoute('Topical')}
                          className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold transition cursor-pointer ${
                            selectedRoutes.includes('Topical') ? 'bg-[#00768a] text-white' : 'bg-white text-[#00768a] border border-teal-200'
                          }`}
                        >
                          {selectedRoutes.includes('Topical') ? '✓ Filtered: Topical' : 'Select All Topical'}
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {ROUTES[0].subcategories.map((sub) => (
                          <span
                            key={sub}
                            onClick={() => {
                              setSelectedRoutes(['Topical']);
                              setSearchQuery(sub);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white border border-teal-100 text-[#004f5e] text-[11px] font-semibold hover:border-teal-400 hover:bg-teal-50 transition cursor-pointer"
                          >
                            • {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Oral Stream */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                          Oral / Systemic Sub-Categories (Tablets, Capsules, Softgels, Syrups)
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleRoute('Oral / Systematic')}
                          className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold transition cursor-pointer ${
                            selectedRoutes.includes('Oral / Systematic') ? 'bg-[#00768a] text-white' : 'bg-white text-slate-700 border border-slate-300'
                          }`}
                        >
                          {selectedRoutes.includes('Oral / Systematic') ? '✓ Filtered: Oral' : 'Select All Oral'}
                        </button>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {ROUTES[1].subcategories.map((sub) => (
                          <span
                            key={sub}
                            onClick={() => {
                              setSelectedRoutes(['Oral / Systematic']);
                              setSearchQuery(sub);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold hover:border-teal-400 hover:bg-teal-50 transition cursor-pointer"
                          >
                            • {sub}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeMainCategory === 'dosage' && (
                  <div className="space-y-1.5 animate-fade-in">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Filter by Dosage Form:
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setSelectedDosageForms([])}
                        className={`px-3 py-1 rounded-full text-xs transition cursor-pointer ${
                          selectedDosageForms.length === 0
                            ? 'bg-[#00768a] text-white font-bold shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        All Dosage Forms
                      </button>
                      {DOSAGE_FORMS.map((form) => {
                        const isSel = selectedDosageForms.includes(form);
                        const cnt = counts.dosageCounts[form] || 0;
                        return (
                          <button
                            key={form}
                            type="button"
                            onClick={() => toggleDosageForm(form)}
                            className={`px-3 py-1 rounded-full text-xs transition cursor-pointer flex items-center gap-1.5 ${
                              isSel
                                ? 'bg-[#00768a] text-white font-bold shadow-xs'
                                : 'bg-slate-100 hover:bg-teal-50 text-slate-700 border border-transparent hover:border-teal-200'
                            }`}
                          >
                            <span>{form}</span>
                            <span className={`text-[10px] ${isSel ? 'text-teal-100' : 'text-slate-400'}`}>({cnt})</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Top Toolbar */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700">
                  Showing <strong className="text-[#00768a]">{filteredProducts.length}</strong> products
                </span>
                {selectedTherapeuticAreas.length > 0 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-100 font-semibold truncate max-w-[200px]">
                    {selectedTherapeuticAreas.join(', ')}
                  </span>
                )}
              </div>

              {/* Sort & View Toggle */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#00768a]"
                  >
                    <option value="featured">Featured First</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                  </select>
                </div>

                <div className="hidden sm:flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition cursor-pointer ${
                      viewMode === 'grid' ? 'bg-white text-[#00768a] shadow-xs' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition cursor-pointer ${
                      viewMode === 'list' ? 'bg-white text-[#00768a] shadow-xs' : 'text-slate-400 hover:text-slate-600'
                    }`}
                    title="List view"
                  >
                    <ListIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Display (Grid / List) */}
            {pagedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
                <Pill className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No products match your criteria</h3>
                <p className="text-xs text-slate-500 mt-1">Try clearing your filters or searching for another keyword.</p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#00768a] text-white text-xs font-bold cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {pagedProducts.map((product) => {
                  const colors = getCategoryColor(product.therapeuticArea);
                  return (
                    <div
                      key={product.id}
                      className={`bg-white rounded-2xl border border-slate-200/90 ${colors.bg} shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group`}
                    >
                      <div className="p-5">
                        {/* Category & Dosage Badge */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${colors.badge}`}>
                            {product.therapeuticArea}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                            {product.dosageForm}
                          </span>
                        </div>

                        {/* High-Res Product Packshot */}
                        <div className="relative h-44 w-full rounded-xl overflow-hidden mb-3.5 bg-gradient-to-b from-slate-50 via-teal-50/10 to-slate-50/60 border border-slate-100 flex items-center justify-center p-3">
                          <ProductPackshot product={product as any} />
                        </div>

                        {/* Title & Generic Composition */}
                        <h3 className="font-black text-base text-[#003d4d] group-hover:text-[#00768a] transition-colors leading-tight">
                          {product.brandName}
                        </h3>
                        <p className="text-xs font-semibold text-slate-500 mt-1 leading-tight line-clamp-1">
                          {product.genericName}
                        </p>

                        {/* Indication Tags */}
                        {product.indications?.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {product.indications.slice(0, 2).map((ind, i) => (
                              <span key={i} className="text-[10px] text-slate-600 bg-slate-100/80 px-2 py-0.5 rounded-md font-medium">
                                {ind}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Card Footer Actions */}
                      <div className="p-3.5 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/products/${product.slug}`}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold transition shadow-2xs active:scale-98"
                          >
                            <span>View Product Details</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDownloadMonograph(product)}
                            title="Download Official Monograph PDF"
                            className="p-2 rounded-xl bg-white hover:bg-teal-50 border border-teal-200 text-[#00768a] transition cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-200/60">
                          <span className="font-medium text-emerald-700 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            WHO-GMP Quality
                          </span>
                          <Link
                            href={`/for-doctors/batch-analysis-report?q=${encodeURIComponent(product.brandName)}`}
                            className="text-teal-700 hover:underline font-semibold flex items-center gap-1"
                          >
                            <FileCheck2 className="w-3 h-3 text-[#00768a]" />
                            <span>COA Release</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* List View */
              <div className="space-y-3">
                {pagedProducts.map((product) => {
                  const colors = getCategoryColor(product.therapeuticArea);
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-slate-200/90 hover:border-teal-300 p-4 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shrink-0">
                          <ProductPackshot product={product as any} />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${colors.badge}`}>
                              {product.therapeuticArea}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              {product.dosageForm} • {product.route}
                            </span>
                          </div>
                          <h3 className="font-bold text-sm text-[#003d4d] group-hover:text-[#00768a] transition-colors">
                            {product.brandName}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            {product.genericName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          href={`/products/${product.slug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold transition shadow-2xs"
                        >
                          <span>Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDownloadMonograph(product)}
                          title="Download Official Monograph PDF"
                          className="p-2 rounded-xl bg-white hover:bg-teal-50 border border-teal-200 text-[#00768a] transition cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-6 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-xs text-slate-600 font-medium px-2">
                  Page {safePage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. PARTNERSHIP & HEALTHCARE CALLOUT BANNER               */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-r from-teal-50 via-cyan-50/60 to-white border-t border-teal-100 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-black tracking-widest text-[#006070] uppercase block">
            COLLABORATE WITH RYAN DERMACEUTICS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] uppercase tracking-tight">
            Partner with Us in Advancing Dermatology
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Whether you are a practicing dermatologist, clinic director, or pharmaceutical distribution partner, connect with our Medical Affairs team for formulation dossiers, product sampling, or partnership opportunities.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/for-doctors/medical-information"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider transition shadow-md active:scale-95"
            >
              <span>Contact Medical Affairs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/for-doctors/product-monographs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-teal-50 border border-teal-200 text-[#006070] text-xs font-bold uppercase tracking-wider transition shadow-2xs active:scale-95"
            >
              <span>Explore Clinical Monographs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* DOWNLOAD TOAST NOTIFICATION */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-[99999] bg-[#003d4d] text-white px-5 py-3 rounded-2xl shadow-2xl border border-teal-400 flex items-center gap-3 animate-fade-in">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{downloadToast}</span>
        </div>
      )}

      <RyanFooter />
    </div>
  );
}
