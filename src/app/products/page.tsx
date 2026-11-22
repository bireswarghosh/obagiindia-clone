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
  Check,
  Pill,
  Layers, 
  SlidersHorizontal,
  LayoutGrid,
  GitBranch as GitBranchIcon,
  List as ListIcon,
  Stethoscope,
  Activity,
  ChevronRight
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Category Color Palette for Eye-Catching, Vibrant Highlighting       */
/* ------------------------------------------------------------------ */
const CATEGORY_COLORS: Record<string, { badge: string; bg: string; border: string; cover: string; text: string; btn: string }> = {
  'Acne': { badge: 'bg-rose-100 text-rose-800 border-rose-200', bg: 'hover:border-rose-300', border: 'border-rose-100', cover: 'from-rose-100 via-rose-50 to-white', text: 'group-hover:text-rose-700', btn: 'bg-rose-600 hover:bg-rose-700' },
  'Acne Therapy': { badge: 'bg-rose-100 text-rose-800 border-rose-200', bg: 'hover:border-rose-300', border: 'border-rose-100', cover: 'from-rose-100 via-rose-50 to-white', text: 'group-hover:text-rose-700', btn: 'bg-rose-600 hover:bg-rose-700' },
  'Antifungal': { badge: 'bg-amber-100 text-amber-900 border-amber-200', bg: 'hover:border-amber-300', border: 'border-amber-100', cover: 'from-amber-100 via-amber-50 to-white', text: 'group-hover:text-amber-700', btn: 'bg-amber-600 hover:bg-amber-700' },
  'Antifungals': { badge: 'bg-amber-100 text-amber-900 border-amber-200', bg: 'hover:border-amber-300', border: 'border-amber-100', cover: 'from-amber-100 via-amber-50 to-white', text: 'group-hover:text-amber-700', btn: 'bg-amber-600 hover:bg-amber-700' },
  'Corticosteroid': { badge: 'bg-violet-100 text-violet-800 border-violet-200', bg: 'hover:border-violet-300', border: 'border-violet-100', cover: 'from-violet-100 via-violet-50 to-white', text: 'group-hover:text-violet-700', btn: 'bg-violet-600 hover:bg-violet-700' },
  'Corticosteroids & Anti-inflammatory': { badge: 'bg-violet-100 text-violet-800 border-violet-200', bg: 'hover:border-violet-300', border: 'border-violet-100', cover: 'from-violet-100 via-violet-50 to-white', text: 'group-hover:text-violet-700', btn: 'bg-violet-600 hover:bg-violet-700' },
  'Allergy & Antihistamine': { badge: 'bg-sky-100 text-sky-800 border-sky-200', bg: 'hover:border-sky-300', border: 'border-sky-100', cover: 'from-sky-100 via-sky-50 to-white', text: 'group-hover:text-sky-700', btn: 'bg-sky-600 hover:bg-sky-700' },
  'Antihistamines & Allergy': { badge: 'bg-sky-100 text-sky-800 border-sky-200', bg: 'hover:border-sky-300', border: 'border-sky-100', cover: 'from-sky-100 via-sky-50 to-white', text: 'group-hover:text-sky-700', btn: 'bg-sky-600 hover:bg-sky-700' },
  'Trichology': { badge: 'bg-emerald-100 text-emerald-800 border-emerald-200', bg: 'hover:border-emerald-300', border: 'border-emerald-100', cover: 'from-emerald-100 via-emerald-50 to-white', text: 'group-hover:text-emerald-700', btn: 'bg-emerald-600 hover:bg-emerald-700' },
  'Trichology & Hair': { badge: 'bg-emerald-100 text-emerald-800 border-emerald-200', bg: 'hover:border-emerald-300', border: 'border-emerald-100', cover: 'from-emerald-100 via-emerald-50 to-white', text: 'group-hover:text-emerald-700', btn: 'bg-emerald-600 hover:bg-emerald-700' },
  'Immunomodulator': { badge: 'bg-indigo-100 text-indigo-800 border-indigo-200', bg: 'hover:border-indigo-300', border: 'border-indigo-100', cover: 'from-indigo-100 via-indigo-50 to-white', text: 'group-hover:text-indigo-700', btn: 'bg-indigo-600 hover:bg-indigo-700' },
  'Immunomodulators': { badge: 'bg-indigo-100 text-indigo-800 border-indigo-200', bg: 'hover:border-indigo-300', border: 'border-indigo-100', cover: 'from-indigo-100 via-indigo-50 to-white', text: 'group-hover:text-indigo-700', btn: 'bg-indigo-600 hover:bg-indigo-700' },
  'Antibacterials & Scabicides': { badge: 'bg-cyan-100 text-cyan-800 border-cyan-200', bg: 'hover:border-cyan-300', border: 'border-cyan-100', cover: 'from-cyan-100 via-cyan-50 to-white', text: 'group-hover:text-cyan-700', btn: 'bg-cyan-700 hover:bg-cyan-800' },
  'Cleansers & Emollients': { badge: 'bg-teal-100 text-teal-800 border-teal-200', bg: 'hover:border-teal-300', border: 'border-teal-100', cover: 'from-teal-100 via-teal-50 to-white', text: 'group-hover:text-teal-700', btn: 'bg-teal-700 hover:bg-teal-800' },
};

const getCategoryColor = (category: string) => {
  return CATEGORY_COLORS[category] || { badge: 'bg-teal-100 text-[#006070] border-teal-200', bg: 'hover:border-teal-300', border: 'border-teal-100', cover: 'from-teal-100 via-teal-50 to-white', text: 'group-hover:text-teal-700', btn: 'bg-teal-700 hover:bg-teal-800' };
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
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(max-width: 639.5px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  const [heroSlide, setHeroSlide] = useState(0);
  const heroSlides = [
    { src: '/ryan/portfolio-packshots.jpg', label: 'COMPLETE DERMATOLOGY RANGE', caption: 'Topical, Oral, Hair & Scalp Solutions' },
    { src: '/ryan/library/area-skincare.jpg', label: 'PRESCRIPTION FORMULATIONS', caption: 'Creams, Gels, Lotions & Cleansers' },
    { src: '/ryan/library/area-hair.jpg', label: 'HAIR & SCALP THERAPY', caption: 'Evidence-Based Trichology Solutions' },
  ];
  useEffect(() => {
    const timer = setInterval(() => setHeroSlide(prev => (prev + 1) % 3), 5000);
    return () => clearInterval(timer);
  }, []);

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

  // Accordion open states
  const [openSections, setOpenSections] = useState({
    therapeutic: true,
    dosage: true,
    route: false
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

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:items-center gap-8">
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

            {/* Right Graphic Banner — image slider */}
            <div className="relative w-full h-60 lg:h-80 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/30 bg-white/5 backdrop-blur-md">
              {heroSlides.map((slide, i) => (
                <Image
                  key={slide.src}
                  src={slide.src}
                  alt={slide.caption}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 336px"
                  className={`object-cover object-center transition-all duration-700 ${heroSlide === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#003d4d]/90 via-transparent to-transparent flex items-end p-5 pointer-events-none">
                <div className="text-white">
                  <div className="text-[10px] font-black text-teal-300 uppercase tracking-wider">{heroSlides[heroSlide].label}</div>
                  <div className="text-sm font-bold text-white">{heroSlides[heroSlide].caption}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setHeroSlide(p => (p - 1 + 3) % 3)}
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 text-[#00768a] flex items-center justify-center shadow-md active:scale-90 transition"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => setHeroSlide(p => (p + 1) % 3)}
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 text-[#00768a] flex items-center justify-center shadow-md active:scale-90 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 right-4 flex gap-1.5">
                {heroSlides.map((s, i) => (
                  <button
                    key={s.src}
                    type="button"
                    onClick={() => setHeroSlide(i)}
                    aria-label={`Go to image ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${heroSlide === i ? 'w-5 bg-teal-300' : 'w-1.5 bg-white/60'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. MAIN CATALOG LAYOUT (Sidebar + Products Grid)          */}
      {/* ========================================================= */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-8 lg:py-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-7">
          
          {/* Mobile filter toggle (mobile DOM only) */}
          {mounted && isMobile && (
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500 text-white text-sm font-black shadow-md active:scale-95 transition-all"
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="px-2 py-0.5 rounded-full bg-white/25 text-[10px] font-black">
                  {selectedTherapeuticAreas.length + selectedDosageForms.length + selectedRoutes.length}
                </span>
              )}
            </button>
          )}

          {/* ======================================================= */}
          {/* FILTERS — in-flow sidebar (left column on md+)            */}
          {/* ======================================================= */}
          <aside
            className={`min-w-0 ${filtersOpen ? 'block' : 'hidden'} sm:block sm:w-60 xl:w-[260px] sm:shrink-0 sm:sticky sm:top-24 sm:self-start max-sm:fixed max-sm:inset-0 max-sm:z-[100] max-sm:bg-[#002530]/60 max-sm:p-4 max-sm:pt-24 max-sm:overflow-y-auto max-sm:backdrop-blur-[2px]`}
            aria-label="Product filters"
          >
            {/* Mobile popup header (mobile DOM only) */}
            {mounted && isMobile && (
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-[#003d4d]">
                  <SlidersHorizontal className="w-4 h-4 text-[#00768a]" />
                  Filters
                </span>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="p-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-[#00768a] active:scale-90 transition"
                  aria-label="Close filters"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_18px_40px_-22px_rgba(0,61,77,0.55)] overflow-hidden max-sm:mx-auto max-sm:w-full max-sm:max-w-md">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#00768a]" />
                  <h2 className="font-extrabold text-sm uppercase tracking-wider text-[#003d4d]">
                    Filter Portfolio
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  disabled={!hasActiveFilters}
                  className={`text-[11px] font-bold transition ${
                    hasActiveFilters ? 'text-[#00768a] hover:underline cursor-pointer' : 'text-slate-300 cursor-default'
                  }`}
                >
                  Reset
                </button>
              </div>

              {/* Search */}
              <div className="px-5 py-4 border-b border-slate-100">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    placeholder="Search brand, generic..."
                    className="w-full pl-9 pr-8 py-2.5 rounded-full border border-slate-200 text-xs text-slate-800 placeholder-slate-400 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00768a]/25 focus:border-[#00768a] transition"
                  />
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Product Category */}
              <div className="border-b border-teal-100/70">
                <button
                  type="button"
                  onClick={() => toggleSection('therapeutic')}
                  className="w-full flex items-center justify-between gap-2 px-5 py-3.5 bg-gradient-to-r from-teal-50 via-white to-white hover:from-teal-100/70 transition-colors"
                  aria-expanded={openSections.therapeutic}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 text-white flex items-center justify-center shadow-sm">
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-[0.14em] text-teal-800">
                      Product Category
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                      {THERAPEUTIC_AREAS.length}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-teal-600 transition-transform ${openSections.therapeutic ? 'rotate-180' : ''}`} />
                  </span>
                </button>
                {openSections.therapeutic && (
                <div className="px-5 pb-4 pt-2">
                <div className="filter-chain space-y-1">
                  {THERAPEUTIC_AREAS.map(area => {
                    const isSelected = selectedTherapeuticAreas.includes(area);
                    const count = counts.therapeuticCounts[area] || 0;
                    const accent = getCategoryColor(area);
                    return (
                      <button
                        key={area}
                        type="button"
                        onClick={() => toggleTherapeutic(area)}
                        className={`group flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-xs border transition ${
                          isSelected
                            ? `${accent.badge} font-bold shadow-sm`
                            : 'border-transparent hover:bg-slate-50'
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                            isSelected
                              ? 'border-transparent bg-current'
                              : 'border-slate-300 bg-white group-hover:border-[#00768a]'
                          }`}
                        >
                          {isSelected && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
                        </span>
                        <span className={`flex-1 truncate ${isSelected ? 'font-bold' : 'text-slate-700'}`}>
                          {area}
                        </span>
                        <span className={`text-[10px] ${isSelected ? 'font-bold' : 'text-slate-400'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
                </div>
                )}
              </div>

              {/* Dosage Form */}
              <div className="border-b border-violet-100/70">
                <button
                  type="button"
                  onClick={() => toggleSection('dosage')}
                  className="w-full flex items-center justify-between gap-2 px-5 py-3.5 bg-gradient-to-r from-violet-50 via-white to-white hover:from-violet-100/70 transition-colors"
                  aria-expanded={openSections.dosage}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 text-white flex items-center justify-center shadow-sm">
                      <Layers className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-[0.14em] text-violet-800">
                      Filter by Dosage Form
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full">
                      {DOSAGE_FORMS.length}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-violet-600 transition-transform ${openSections.dosage ? 'rotate-180' : ''}`} />
                  </span>
                </button>
                {openSections.dosage && (
                <div className="px-5 pb-4 pt-2">
                <div className="filter-chain space-y-1">
                  {DOSAGE_FORMS.map(form => {
                    const isSelected = selectedDosageForms.includes(form);
                    const count = counts.dosageCounts[form] || 0;
                    return (
                      <button
                        key={form}
                        type="button"
                        onClick={() => toggleDosageForm(form)}
                        className={`group flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-xs transition ${
                          isSelected ? 'bg-teal-50/80' : 'hover:bg-slate-50'
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                            isSelected
                              ? 'border-[#00768a] bg-[#00768a] text-white'
                              : 'border-slate-300 bg-white group-hover:border-[#00768a]'
                          }`}
                        >
                          {isSelected && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                        </span>
                        <span className={`flex-1 truncate ${isSelected ? 'font-bold text-[#006070]' : 'text-slate-700'}`}>
                          {form}
                        </span>
                        <span className={`text-[10px] ${isSelected ? 'font-bold text-[#00768a]' : 'text-slate-400'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
                </div>
                )}
              </div>

              {/* Route */}
              <div className="border-b border-sky-100/70">
                <button
                  type="button"
                  onClick={() => toggleSection('route')}
                  className="w-full flex items-center justify-between gap-2 px-5 py-3.5 bg-gradient-to-r from-sky-50 via-white to-white hover:from-sky-100/70 transition-colors"
                  aria-expanded={openSections.route}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-sky-500 to-blue-500 text-white flex items-center justify-center shadow-sm">
                      <GitBranchIcon className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[11px] font-black uppercase tracking-[0.14em] text-sky-800">
                      Filter by Route
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                      {ROUTES.length}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-sky-600 transition-transform ${openSections.route ? 'rotate-180' : ''}`} />
                  </span>
                </button>
                {openSections.route && (
                <div className="px-5 pb-4 pt-2">
                <div className="filter-chain space-y-1">
                  {ROUTES.map(r => {
                    const route = r.name;
                    const isSelected = selectedRoutes.includes(route);
                    const count = counts.routeCounts[route] || 0;
                    return (
                      <button
                        key={route}
                        type="button"
                        onClick={() => toggleRoute(route)}
                        className={`group flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-xs transition ${
                          isSelected ? 'bg-teal-50/80' : 'hover:bg-slate-50'
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                            isSelected
                              ? 'border-[#00768a] bg-[#00768a] text-white'
                              : 'border-slate-300 bg-white group-hover:border-[#00768a]'
                          }`}
                        >
                          {isSelected && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                        </span>
                        <span className={`flex-1 truncate ${isSelected ? 'font-bold text-[#006070]' : 'text-slate-700'}`}>
                          {route}
                        </span>
                        <span className={`text-[10px] ${isSelected ? 'font-bold text-[#00768a]' : 'text-slate-400'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
                </div>
                )}
              </div>

              {/* Doctor Monograph Quick Link */}
              <div className="px-5 py-4">
                <div className="p-3.5 rounded-xl bg-teal-50/80 border border-teal-100 text-center space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#006070] block">
                    HEALTHCARE PRACTITIONERS
                  </span>
                  <p className="text-[11px] text-slate-600 leading-tight">
                    Access complete 19-section clinical product monographs:
                  </p>
                  <Link
                    href="/for-doctors/product-monographs"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00768a] hover:underline pt-1"
                  >
                    <span>View Product Monographs</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Apply */}
              <div className="bg-white border-t border-slate-100 p-4">
                <button
                  type="button"
                  onClick={() => { setCurrentPage(1); setFiltersOpen(false); }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00768a] to-[#004f5e] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-teal-900/20 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  Apply Filters
                  {hasActiveFilters && (
                    <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-black">
                      {selectedTherapeuticAreas.length + selectedDosageForms.length + selectedRoutes.length}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </aside>

          {/* ======================================================= */}
          {/* RIGHT MAIN: PRODUCTS LISTING & CONTROLS                */}
          {/* ======================================================= */}
          <main className="min-w-0 w-full md:flex-1 space-y-6">
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
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4">
                {pagedProducts.map((product) => {
                  const colors = getCategoryColor(product.therapeuticArea);
                  return (
                    <div
                      key={product.id}
                      className={`group relative bg-white rounded-2xl border ${colors.border} shadow-[0_10px_30px_-10px_rgba(0,61,77,0.22)] hover:shadow-[0_24px_50px_-12px_rgba(0,118,138,0.38)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden`}
                    >
                      {/* Full-bleed packshot cover — runs from card edge down to the title */}
                      <div className={`relative w-full h-40 sm:h-44 overflow-hidden bg-gradient-to-br ${colors.cover} flex items-center justify-center p-5`}>
                        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/40 blur-2xl pointer-events-none" />
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none" />
                        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${colors.badge} shadow-sm`}>
                            {product.therapeuticArea}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-600 bg-white/85 backdrop-blur px-2 py-0.5 rounded-md border border-white/70 shadow-sm">
                            {product.dosageForm}
                          </span>
                        </div>
                        <div className="relative z-10 scale-110 group-hover:scale-125 transition-transform duration-500">
                          <ProductPackshot product={product as any} />
                        </div>
                      </div>

                      <div className="p-4 sm:p-5">
                        {/* Title & Generic Composition */}
                        <h3 className={`font-black text-sm sm:text-[15px] text-[#003d4d] ${colors.text} transition-colors leading-tight`}>
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
                      <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                        <Link
                          href={`/products/${product.slug}`}
                          className={`w-full inline-flex items-center justify-center gap-1 py-2 px-2 rounded-xl ${colors.btn} text-white text-[11px] sm:text-xs font-bold transition shadow-2xs active:scale-98`}
                        >
                          <span>View Product Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
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
                          className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl ${colors.btn} text-white text-xs font-bold transition shadow-2xs`}
                        >
                          <span>Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
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
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 text-center space-y-4">
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

      <RyanFooter />
    </div>
  );
}
