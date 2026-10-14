'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import { ProductPackshot } from '@/components/ryan/ProductPackshot';
import { 
  RYAN_PRODUCTS, 
  THERAPEUTIC_AREAS, 
  DOSAGE_FORMS, 
  ROUTES
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
  List as ListIcon
} from 'lucide-react';

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

  React.useEffect(() => {
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
            hasFullMonograph: p.has_full_monograph ?? p.data?.hasFullMonograph ?? true,
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
    route: true
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const qParam = params.get('q');
      if (qParam) {
        setSearchQuery(qParam);
      }
      const areaParam = params.get('area') || params.get('category');
      if (areaParam) {
        const matched = THERAPEUTIC_AREAS.find(
          a => a.toLowerCase() === areaParam.toLowerCase() ||
               a.toLowerCase().includes(areaParam.toLowerCase()) ||
               areaParam.toLowerCase().includes(a.toLowerCase())
        );
        if (matched) {
          setSelectedTherapeuticAreas([matched]);
        }
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
  };

  const toggleDosageForm = (form: string) => {
    setSelectedDosageForms(prev => 
      prev.includes(form) ? prev.filter(f => f !== form) : [...prev, form]
    );
  };

  const toggleRoute = (route: string) => {
    setSelectedRoutes(prev => 
      prev.includes(route) ? prev.filter(r => r !== route) : [...prev, route]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedTherapeuticAreas([]);
    setSelectedDosageForms([]);
    setSelectedRoutes([]);
    setMonographFilter('all');
    setSortBy('featured');
    setCurrentPage(1);
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedTherapeuticAreas.length > 0 || 
    selectedDosageForms.length > 0 || 
    selectedRoutes.length > 0;

  const [monographFilter, setMonographFilter] = useState<'all' | 'full' | 'summary'>('all');

  // Reset to first page whenever the result set criteria change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTherapeuticAreas, selectedDosageForms, selectedRoutes, sortBy, monographFilter]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = productsList.filter(product => {
      // Monograph status filter
      if (monographFilter === 'full' && !product.hasFullMonograph) return false;
      if (monographFilter === 'summary' && product.hasFullMonograph) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.brandName.toLowerCase().includes(q);
        const matchesGeneric = product.genericName.toLowerCase().includes(q);
        const matchesIndication = product.indications.some(i => i.toLowerCase().includes(q));
        const matchesTagline = product.tagline.toLowerCase().includes(q);
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
  }, [productsList, searchQuery, selectedTherapeuticAreas, selectedDosageForms, selectedRoutes, sortBy, monographFilter]);

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

  // Pagination (16 per page, like the reference catalog)
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pagedProducts = filteredProducts.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const rangeStart = filteredProducts.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, filteredProducts.length);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <style>{`
        .ryan-filter-title{font-size:18px;font-weight:800;color:#003d4d;margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid #e2e8f0}
        .ryan-filter-head{width:100%;display:flex;align-items:center;justify-content:space-between;font-size:14px;font-weight:700;color:#003d4d;margin-bottom:12px;cursor:pointer;padding:0;text-align:left;background:none;border:0}
        .ryan-filter-head .chev{color:#64748b;font-size:12px;transition:transform .2s ease;display:inline-flex}
        .ryan-filter-head[aria-expanded="true"] .chev{transform:rotate(180deg)}
        .ryan-check{display:flex;align-items:center;gap:12px;font-size:13px;font-weight:600;color:#334155;cursor:pointer;-webkit-user-select:none;user-select:none;position:relative;padding:8px 8px 8px 40px;margin:0;min-height:28px;line-height:1.45;border-radius:8px}
        .ryan-check input{position:absolute;left:0;top:50%;transform:translateY(-50%);width:20px;height:20px;margin:0;opacity:0;cursor:pointer;z-index:1}
        .ryan-check .ryan-box{display:inline-flex;width:20px;height:20px;border-radius:6px;border:1.5px solid #B9CFE8;background:#fff;position:absolute;left:0;top:50%;transform:translateY(-50%);transition:all .15s ease;align-items:center;justify-content:center;flex:none}
        .ryan-check .ryan-box::after{content:"";width:9px;height:5px;border-left:2.5px solid #fff;border-bottom:2.5px solid #fff;transform:rotate(-45deg) translateY(-.5px);opacity:0;transition:opacity .12s}
        .ryan-check:hover{background:#f0f9fa}
        .ryan-check:hover .ryan-box{border-color:#00768a;box-shadow:0 0 0 3px rgba(0,118,138,.08)}
        .ryan-check input:checked + .ryan-box{background:linear-gradient(135deg,#00768a,#00a8cc);border-color:#00768a;box-shadow:0 2px 8px rgba(0,118,138,.4)}
        .ryan-check input:checked + .ryan-box::after{opacity:1}
        .ryan-check input:focus-visible + .ryan-box{box-shadow:0 0 0 3px rgba(0,118,138,.25)}
        .ryan-check input:checked ~ .ryan-label{color:#003d4d;font-weight:800}
        .ryan-check .ryan-count{margin-left:auto;font-size:11px;color:#94a3b8;font-weight:500}
        .ryan-clear-btn{width:100%;padding:10px;border:1px solid #bfe3ea;border-radius:10px;font-size:13px;font-weight:700;color:#00768a;background:#f0f9fa;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer}
        .ryan-clear-btn:hover{background:#00768a;color:#fff;border-color:#00768a}
        .ryan-search-box{position:relative;margin-bottom:4px;display:block}
        .ryan-search-box input{width:100%;padding:10px 36px 10px 12px;border:1px solid #e2e8f0;border-radius:8px;font-size:13px;font-family:inherit;outline:none;transition:all .2s;color:#0f172a;background:#fff}
        .ryan-search-box input:focus{border-color:#00768a;box-shadow:0 0 0 3px rgba(0,118,138,.1)}
        .ryan-card{position:relative;overflow:hidden}
        .ryan-card::before{content:"";position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,#00768a,#00a8cc,#00768a);background-size:200% 100%;opacity:.9;z-index:1}
        .ryan-card-img{height:150px;background:linear-gradient(160deg,#F0F7FF 0%,#E4F0FE 55%,#D9E9FD 100%);border:1px solid #E3EEFB;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;padding:10px;overflow:hidden}
        @media(max-width:640px){.ryan-card-img{height:110px;padding:6px;margin-bottom:10px}}
        .ryan-grid-card{animation:ryanCardIn .45s ease both}
        @media(prefers-reduced-motion:reduce){.ryan-grid-card{animation:none}.packshot{transition:none}}
        @keyframes ryanCardIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
      `}</style>
      <RyanHeader />

      {/* ========================================================= */}
      {/* 1. HERO HEADER (Matching First page.png)                  */}
      {/* ========================================================= */}
      <section className="relative bg-gradient-to-r from-[#eef7f9] via-[#e4f2f6] to-[#d6edf2] border-b border-teal-100/90 overflow-hidden py-10 lg:py-14">
        {/* Abstract subtle background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-200/30 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] sm:text-xs">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#00768a] text-white font-bold tracking-wider uppercase text-[10px]">
                  Healthcare Professional Area
                </span>
                <nav className="flex items-center gap-1.5 text-slate-500 font-medium" aria-label="Breadcrumb">
                  <Link href="/" className="hover:text-[#00768a] transition">Home</Link>
                  <span>/</span>
                  <Link href="/for-doctors/therapeutic-resources" className="hover:text-[#00768a] transition">Therapeutic Resources</Link>
                  <span>/</span>
                  <span className="text-[#00768a] font-semibold">Product Monographs</span>
                </nav>
              </div>
              <span className="text-[11px] sm:text-xs font-black tracking-widest text-[#00768a] uppercase block">
                Therapeutic Resources
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#003d4d] tracking-tight uppercase">
                Product Monographs
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                Detailed product information for healthcare professionals. Clinically relevant. Easy to access. Always up to date.
              </p>

              {/* 4 Feature Pills */}
              <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/80 border border-teal-200/80 shadow-2xs">
                  <FileText className="w-4 h-4 text-[#00768a] shrink-0" />
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                    Comprehensive product information
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/80 border border-teal-200/80 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                    Evidence-based and reliable
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/80 border border-teal-200/80 shadow-2xs">
                  <Search className="w-4 h-4 text-[#00768a] shrink-0" />
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                    Quick search and filters
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/80 border border-teal-200/80 shadow-2xs">
                  <Download className="w-4 h-4 text-[#00768a] shrink-0" />
                  <span className="text-[11px] font-semibold text-slate-700 leading-tight">
                    Downloadable PDF monographs
                  </span>
                </div>
              </div>
            </div>

            {/* Right Graphic Banner */}
            <div className="hidden lg:block relative w-80 h-44 rounded-2xl overflow-hidden shadow-xl border-2 border-white/80 bg-white group shrink-0">
              <Image 
                src="/ryan/portfolio-packshots.jpg" 
                alt="Ryan Dermaceutics Product Monographs" 
                fill 
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003d4d]/80 via-transparent to-transparent flex items-end p-4">
                <div className="text-white">
                  <div className="text-xs font-bold text-teal-200 uppercase tracking-wider">53 Formulations</div>
                  <div className="text-sm font-semibold text-white">Full Dermatology Portfolio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. MAIN CATALOG LAYOUT (Sidebar + Products Grid)          */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[330px_minmax(0,1fr)] xl:grid-cols-[380px_minmax(0,1fr)] gap-8">
          
          {/* Mobile Filters toggle */}
          <div className="lg:hidden mb-4">            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-xs"
              aria-expanded={filtersOpen}
            >
              {filtersOpen ? <X className="w-4 h-4" /> : <Filter className="w-4 h-4 text-[#00768a]" />}
              {filtersOpen ? 'Hide Filters' : 'Show Filters'}
              {hasActiveFilters && (
                <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#00768a] text-white text-[10px] font-black">
                  On
                </span>
              )}
            </button>
          </div>

          {/* ======================================================= */}
          {/* LEFT SIDEBAR: FILTERS (Matching First page.png)         */}
          {/* ======================================================= */}
          <aside className={`space-y-6 min-w-0 ${filtersOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs lg:sticky lg:top-24">
              <div className="flex items-center justify-between">
                <h2 className="ryan-filter-title !mb-0 !pb-0 !border-0">Filter by</h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-900 underline transition"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="border-b border-slate-200 mt-3 mb-5" />

              {/* Search Bar in Sidebar */}
              <div className="pb-5">
                <label className="ryan-search-box">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by brand, generic..."
                    aria-label="Search products"
                  />
                  <Search className="w-[15px] h-[15px] text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </label>
              </div>

              {/* Monograph Readiness Status Filter */}
              <div className="pt-4 border-t border-slate-100 mt-4 space-y-1.5">
                <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Monograph Status</span>
                <div className="grid grid-cols-1 gap-1.5 text-xs font-medium">
                  <button
                    onClick={() => setMonographFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-left flex items-center justify-between transition ${
                      monographFilter === 'all' ? 'bg-[#00768a] text-white font-bold' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>All Products</span>
                    <span className="text-[10px] opacity-80">(53)</span>
                  </button>
                  <button
                    onClick={() => setMonographFilter('full')}
                    className={`px-3 py-1.5 rounded-lg text-left flex items-center justify-between transition ${
                      monographFilter === 'full' ? 'bg-emerald-700 text-white font-bold' : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-emerald-500" />
                      Full Monographs (Part 1)
                    </span>
                    <span className="text-[10px] opacity-80 font-bold">(32)</span>
                  </button>
                  <button
                    onClick={() => setMonographFilter('summary')}
                    className={`px-3 py-1.5 rounded-lg text-left flex items-center justify-between transition ${
                      monographFilter === 'summary' ? 'bg-amber-700 text-white font-bold' : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                    }`}
                  >
                    <span>Part 2 In Review</span>
                    <span className="text-[10px] opacity-80 font-bold">(21)</span>
                  </button>
                </div>
              </div>

              {/* Filter 1: Therapeutic Category */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => toggleSection('therapeutic')}
                  className="ryan-filter-head"
                  aria-expanded={openSections.therapeutic}
                >
                  <span>Therapeutic Category</span>
                  <span className="chev" aria-hidden="true">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </span>
                </button>

                {openSections.therapeutic && (
                  <div className="flex flex-col gap-1 max-h-64 overflow-y-auto pr-1">
                    {THERAPEUTIC_AREAS.map(area => {
                      const count = counts.therapeuticCounts[area] || 0;
                      return (
                        <label key={area} className="ryan-check">
                          <input
                            type="checkbox"
                            checked={selectedTherapeuticAreas.includes(area)}
                            onChange={() => toggleTherapeutic(area)}
                          />
                          <span className="ryan-box" aria-hidden="true" />
                          <span className="ryan-label">{area}</span>
                          <span className="ryan-count">({count})</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Filter 2: Dosage Form */}
              <div className="pt-5 mt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleSection('dosage')}
                  className="ryan-filter-head"
                  aria-expanded={openSections.dosage}
                >
                  <span>Dosage Form</span>
                  <span className="chev" aria-hidden="true">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </span>
                </button>

                {openSections.dosage && (
                  <div className="flex flex-col gap-1 max-h-64 overflow-y-auto pr-1">
                    {DOSAGE_FORMS.map(form => {
                      const count = counts.dosageCounts[form] || 0;
                      if (count === 0) return null;
                      return (
                        <label key={form} className="ryan-check">
                          <input
                            type="checkbox"
                            checked={selectedDosageForms.includes(form)}
                            onChange={() => toggleDosageForm(form)}
                          />
                          <span className="ryan-box" aria-hidden="true" />
                          <span className="ryan-label">{form}</span>
                          <span className="ryan-count">({count})</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Filter 3: Route */}
              <div className="pt-5 mt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleSection('route')}
                  className="ryan-filter-head"
                  aria-expanded={openSections.route}
                >
                  <span>Route</span>
                  <span className="chev" aria-hidden="true">
                    <ChevronDown className="w-3.5 h-3.5" />
                  </span>
                </button>

                {openSections.route && (
                  <div className="flex flex-col gap-1">
                    {ROUTES.map(routeObj => {
                      const count = counts.routeCounts[routeObj.name] || 0;
                      return (
                        <label key={routeObj.name} className="ryan-check">
                          <input
                            type="checkbox"
                            checked={selectedRoutes.includes(routeObj.name)}
                            onChange={() => toggleRoute(routeObj.name)}
                          />
                          <span className="ryan-box" aria-hidden="true" />
                          <span className="ryan-label">{routeObj.name}</span>
                          <span className="ryan-count">({count})</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Clear All Filters Button */}
              {hasActiveFilters && (
                <div className="pt-5 mt-5 border-t border-slate-100">
                  <button onClick={clearAllFilters} className="ryan-clear-btn">
                    <X className="w-3.5 h-3.5" />
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </aside>

          {/* ======================================================= */}
          {/* MAIN COLUMN: PRODUCT CATALOG GRID                      */}
          {/* ======================================================= */}
          <main className="space-y-6 min-w-0">
            
            {/* Top Toolbar */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">
                  {filteredProducts.length} Products
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Showing {rangeStart}–{rangeEnd} of {filteredProducts.length}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort dropdown */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#00768a] cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="name-asc">Brand Name (A - Z)</option>
                    <option value="name-desc">Brand Name (Z - A)</option>
                  </select>
                </div>

                {/* Grid / List view toggles */}
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 transition ${viewMode === 'grid' ? 'bg-[#00768a] text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                    title="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 transition ${viewMode === 'list' ? 'bg-[#00768a] text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}
                    title="List view"
                  >
                    <ListIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-teal-50 text-[#00768a] flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">No products match your criteria</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try clearing some filters or searching with a different generic composition, brand name, or therapeutic class.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2 rounded-lg bg-[#00768a] text-white text-xs font-bold hover:bg-[#005f70] transition"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Products Grid (reference catalog style) */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {pagedProducts.map(product => (
                  <div
                    key={product.id}
                    className="ryan-card ryan-grid-card bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-[0_16px_38px_rgba(0,118,138,0.18)] hover:border-teal-300 hover:-translate-y-1 transition-all duration-300 flex flex-col p-3 sm:p-5 group"
                  >
                    <div className="ryan-card-img">
                      <ProductPackshot product={product} />
                    </div>
                    <h3 className="text-[13px] sm:text-[15px] font-black text-slate-900 group-hover:text-[#00768a] transition-colors tracking-tight leading-snug">
                      {product.brandName}
                      <span className="align-super text-[9px] font-bold">®</span>
                    </h3>
                    <p className="text-[11px] sm:text-xs text-slate-500 font-medium line-clamp-2 mt-1 leading-snug min-h-[2rem]">
                      {product.genericName}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 mt-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-[#00768a] border border-teal-100/80">
                        {product.therapeuticArea}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {product.route === 'Oral / Systematic' ? 'Oral' : product.route}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 font-medium mt-2.5">
                      {product.dosageForm} <span className="text-slate-300 mx-1">|</span> {product.packSize}
                    </p>

                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex-1 py-2 px-3 rounded-lg bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        View Monograph
                      </Link>
                      <Link
                        href={`/products/${product.slug}#monograph-pdf`}
                        className="p-2 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-[#00768a] transition shrink-0"
                        title="Download PDF"
                        aria-label={`Download ${product.brandName} monograph PDF`}
                      >
                        <Download className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-3">
                {pagedProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00768a] font-black text-lg shrink-0">
                        {product.brandName.replace(/[^a-zA-Z0-9]/g, '').charAt(0) || product.brandName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-black text-slate-900 group-hover:text-[#00768a] transition-colors">
                            {product.brandName}
                          </h3>
                          {product.hasFullMonograph && (
                            <span className="text-[9px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                              Full Monograph
                            </span>
                          )}
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-50 text-[#00768a]">
                            {product.therapeuticArea}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {product.route}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                          {product.genericName}
                        </p>
                        <div className="text-[11px] text-slate-400 mt-1">
                          {product.dosageForm} • {product.packSize}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/products/${product.slug}`}
                        className="py-1.5 px-3 rounded-lg bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold transition flex items-center gap-1.5"
                      >
                        View Monograph
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/products/${product.slug}#monograph-pdf`}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                        title="Download PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-col items-center gap-2 pt-2">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => { setCurrentPage(safePage - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    disabled={safePage === 1}
                    className="w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-bold transition disabled:opacity-40 disabled:cursor-not-allowed hover:border-teal-300 hover:text-[#00768a]"
                    aria-label="Previous page"
                  >
                    ‹
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className={`w-9 h-9 rounded-lg border text-xs font-bold transition ${
                        page === safePage
                          ? 'bg-[#00768a] border-[#00768a] text-white'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-teal-300 hover:text-[#00768a]'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => { setCurrentPage(safePage + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    disabled={safePage === totalPages}
                    className="w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-600 text-sm font-bold transition disabled:opacity-40 disabled:cursor-not-allowed hover:border-teal-300 hover:text-[#00768a]"
                    aria-label="Next page"
                  >
                    ›
                  </button>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Showing {rangeStart}–{rangeEnd} of {filteredProducts.length} products
                </p>
              </div>
            )}

            {/* Bottom Support Callout (Matching First page.png bottom bar) */}
            <div className="mt-12 bg-gradient-to-r from-teal-50 via-cyan-50/50 to-white rounded-2xl border border-teal-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00768a] text-white flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Need help finding a product?</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Search by brand name, generic name or therapeutic category, or connect directly with our medical team.
                  </p>
                </div>
              </div>

              <Link
                href="/for-doctors/medical-information"
                className="py-2.5 px-4 rounded-xl bg-white hover:bg-teal-50 border border-teal-300 text-[#006070] text-xs font-bold whitespace-nowrap transition flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs"
              >
                Contact Medical Information
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </main>
        </div>
      </div>

      <RyanFooter />
    </div>
  );
}
