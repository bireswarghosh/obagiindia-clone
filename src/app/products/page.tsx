'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
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
  ChevronUp, 
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

  // Accordion open states
  const [openSections, setOpenSections] = useState({
    therapeutic: true,
    dosage: true,
    route: true
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
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
  };

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedTherapeuticAreas.length > 0 || 
    selectedDosageForms.length > 0 || 
    selectedRoutes.length > 0;

  const [monographFilter, setMonographFilter] = useState<'all' | 'full' | 'summary'>('all');

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = RYAN_PRODUCTS.filter(product => {
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
  }, [searchQuery, selectedTherapeuticAreas, selectedDosageForms, selectedRoutes, sortBy, monographFilter]);

  // Dynamic counts for checkboxes
  const counts = useMemo(() => {
    const therapeuticCounts: Record<string, number> = {};
    const dosageCounts: Record<string, number> = {};
    const routeCounts: Record<string, number> = {};

    RYAN_PRODUCTS.forEach(p => {
      therapeuticCounts[p.therapeuticArea] = (therapeuticCounts[p.therapeuticArea] || 0) + 1;
      dosageCounts[p.dosageForm] = (dosageCounts[p.dosageForm] || 0) + 1;
      routeCounts[p.route] = (routeCounts[p.route] || 0) + 1;
    });

    return { therapeuticCounts, dosageCounts, routeCounts };
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
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
              <span className="text-[11px] sm:text-xs font-black tracking-widest text-[#00768a] uppercase">
                THERAPEUTIC RESOURCES
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
      {/* 2. BREADCRUMBS & TOP BAR                                  */}
      {/* ========================================================= */}
      <div className="bg-white border-b border-slate-200/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/home" className="hover:text-[#00768a] transition">Home</Link>
            <span>/</span>
            <Link href="/for-doctors/therapeutic-resources" className="hover:text-[#00768a] transition">Therapeutic Resources</Link>
            <span>/</span>
            <span className="text-[#00768a] font-semibold">Product Monographs</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-slate-600">
            <span>Showing <strong className="text-slate-900">{filteredProducts.length}</strong> of {RYAN_PRODUCTS.length} Products</span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. MAIN CATALOG LAYOUT (Sidebar + Products Grid)          */}
      {/* ========================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* ======================================================= */}
          {/* LEFT SIDEBAR: FILTERS (Matching First page.png)         */}
          {/* ======================================================= */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs sticky top-24">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#00768a]" />
                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">Filter by</h2>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs font-semibold text-teal-700 hover:text-teal-900 underline transition"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Search Bar in Sidebar */}
              <div className="pt-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by brand, generic..."
                    className="w-full pl-9 pr-8 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00768a] focus:bg-white transition"
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
              <div className="pt-5 border-t border-slate-100 mt-5">
                <button
                  onClick={() => toggleSection('therapeutic')}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-900 uppercase tracking-wider mb-3"
                >
                  <span>Therapeutic Category</span>
                  {openSections.therapeutic ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {openSections.therapeutic && (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs">
                    {THERAPEUTIC_AREAS.map(area => {
                      const count = counts.therapeuticCounts[area] || 0;
                      const isChecked = selectedTherapeuticAreas.includes(area);
                      return (
                        <label
                          key={area}
                          className="flex items-center justify-between text-slate-600 hover:text-slate-900 cursor-pointer select-none group py-0.5"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleTherapeutic(area)}
                              className="rounded border-slate-300 text-[#00768a] focus:ring-[#00768a] w-3.5 h-3.5 cursor-pointer"
                            />
                            <span className={`text-xs ${isChecked ? 'font-bold text-[#00768a]' : ''}`}>
                              {area}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium">({count})</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Filter 2: Dosage Form */}
              <div className="pt-5 border-t border-slate-100 mt-5">
                <button
                  onClick={() => toggleSection('dosage')}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-900 uppercase tracking-wider mb-3"
                >
                  <span>Dosage Form</span>
                  {openSections.dosage ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {openSections.dosage && (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs">
                    {DOSAGE_FORMS.map(form => {
                      const count = counts.dosageCounts[form] || 0;
                      if (count === 0) return null;
                      const isChecked = selectedDosageForms.includes(form);
                      return (
                        <label
                          key={form}
                          className="flex items-center justify-between text-slate-600 hover:text-slate-900 cursor-pointer select-none group py-0.5"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleDosageForm(form)}
                              className="rounded border-slate-300 text-[#00768a] focus:ring-[#00768a] w-3.5 h-3.5 cursor-pointer"
                            />
                            <span className={`text-xs ${isChecked ? 'font-bold text-[#00768a]' : ''}`}>
                              {form}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium">({count})</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Filter 3: Route */}
              <div className="pt-5 border-t border-slate-100 mt-5">
                <button
                  onClick={() => toggleSection('route')}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-900 uppercase tracking-wider mb-3"
                >
                  <span>Route</span>
                  {openSections.route ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {openSections.route && (
                  <div className="space-y-2 text-xs">
                    {ROUTES.map(routeObj => {
                      const count = counts.routeCounts[routeObj.name] || 0;
                      const isChecked = selectedRoutes.includes(routeObj.name);
                      return (
                        <label
                          key={routeObj.name}
                          className="flex items-center justify-between text-slate-600 hover:text-slate-900 cursor-pointer select-none py-0.5"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleRoute(routeObj.name)}
                              className="rounded border-slate-300 text-[#00768a] focus:ring-[#00768a] w-3.5 h-3.5 cursor-pointer"
                            />
                            <span className={`text-xs ${isChecked ? 'font-bold text-[#00768a]' : ''}`}>
                              {routeObj.name}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium">({count})</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Clear All Filters Button */}
              {hasActiveFilters && (
                <div className="pt-5 border-t border-slate-100 mt-5">
                  <button
                    onClick={clearAllFilters}
                    className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
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
          <main className="lg:col-span-3 space-y-6">
            
            {/* Top Toolbar */}
            <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-slate-900">
                  {filteredProducts.length}
                </span>
                <span className="text-xs text-slate-500 font-medium">Products found</span>
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

            {/* Products Grid (Matching First page.png) */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                  >
                    {/* Visual Card Header */}
                    <div className="p-5 pb-2">
                      {/* Product Visual Box */}
                      <div className="relative h-44 w-full rounded-xl bg-gradient-to-b from-slate-50 to-teal-50/30 border border-slate-100 flex items-center justify-center p-4 group-hover:bg-teal-50/50 transition-colors">
                        {/* Packaging Rendering */}
                        <div className="w-full h-full flex flex-col items-center justify-center text-center p-2">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00768a] to-[#004f5e] flex items-center justify-center text-white text-2xl font-black shadow-md shadow-teal-900/10 mb-2 group-hover:scale-110 transition-transform">
                            {product.brandName.replace(/[^a-zA-Z0-9]/g, '').charAt(0) || product.brandName.charAt(0)}
                          </div>
                          <span className="text-[11px] font-black uppercase text-[#004f5e] tracking-wider line-clamp-1">
                            {product.brandName}
                          </span>
                          <span className="text-[9.5px] text-slate-500 line-clamp-1 mt-0.5">
                            {product.dosageForm} • {product.packSize}
                          </span>
                        </div>

                        {/* Top Badges */}
                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                          {product.hasFullMonograph && (
                            <span className="text-[9px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/95 border border-emerald-300 px-2 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                              Full Monograph
                            </span>
                          )}
                          <span className="text-[9.5px] font-bold tracking-wider text-[#006070] bg-white/90 border border-teal-100 px-2 py-0.5 rounded-full shadow-2xs">
                            {product.route}
                          </span>
                        </div>
                      </div>

                      {/* Brand & Composition */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-base font-black text-slate-900 group-hover:text-[#00768a] transition-colors tracking-tight">
                            {product.brandName}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1 leading-snug">
                          {product.genericName}
                        </p>

                        {/* Category Badges */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-3">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-teal-50 text-[#00768a] border border-teal-100/80">
                            {product.therapeuticArea}
                          </span>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            {product.dosageForm}
                          </span>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                            {product.packSize}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="p-4 pt-3 bg-slate-50/60 border-t border-slate-100 flex items-center gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex-1 py-2 px-3 rounded-lg bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        View Monograph
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/products/${product.slug}#monograph-pdf`}
                        className="p-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition"
                        title="Download Monograph PDF"
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
                {filteredProducts.map(product => (
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
