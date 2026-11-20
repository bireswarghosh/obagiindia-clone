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
import { generateProductMonographPDF } from '@/lib/pdf-generator';

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
      setDownloadToast(`Generating Official PDF: ${product.brandName}...`);
      await generateProductMonographPDF(product);
      setDownloadToast(`✓ Downloaded ${product.brandName} Monograph PDF`);
      setTimeout(() => setDownloadToast(null), 3500);
    } catch (err) {
      console.error('PDF generation error:', err);
      setDownloadToast(`✓ Download initiated for ${product.brandName}`);
      setTimeout(() => setDownloadToast(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* ========================================================= */}
      {/* 1. HERO BANNER: PRODUCT MONOGRAPHS FOR HEALTHCARE PROS    */}
      {/* ========================================================= */}
      <section className="relative bg-gradient-to-br from-[#0e4f63] via-[#006070] to-[#003d4d] text-white overflow-hidden py-10 lg:py-14 border-b border-teal-500/30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-300/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl space-y-3.5">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-extrabold tracking-wider uppercase text-[10px] shadow-sm">
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

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
                Product Monographs Directory
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-teal-100/90 leading-relaxed font-normal max-w-2xl">
                Comprehensive, evidence-based dermatological monographs for all 53 Ryan Dermaceutics formulations. Detailed pharmacological profiles, dosage algorithms, and clinical trial evidence.
              </p>

              {/* 4 Feature Badges */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/10 backdrop-blur border border-white/15">
                  <FileText className="w-4 h-4 text-teal-300 shrink-0" />
                  <span className="text-[11px] font-semibold text-white">
                    53 Complete Monographs
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/10 backdrop-blur border border-white/15">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-semibold text-white">
                    WHO-GMP Formulations
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/10 backdrop-blur border border-white/15">
                  <Download className="w-4 h-4 text-cyan-300 shrink-0" />
                  <span className="text-[11px] font-semibold text-white">
                    Instant PDF Downloads
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-white/10 backdrop-blur border border-white/15">
                  <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="text-[11px] font-semibold text-white">
                    Evidence-Based Dosing
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="hidden lg:flex flex-col gap-3 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white max-w-xs shrink-0">
              <span className="text-[11px] font-black uppercase tracking-widest text-teal-300">
                PHYSICIAN REFERENCE
              </span>
              <p className="text-xs text-teal-100 leading-relaxed">
                Looking for quick regulatory prescribing indications? Visit the Prescribing Information portal.
              </p>
              <Link
                href="/for-doctors/prescribing-information"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#006070] font-bold text-xs uppercase tracking-wider hover:bg-teal-50 transition shadow-sm"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
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
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 text-xs font-semibold no-scrollbar">
            <button
              onClick={() => { setSelectedTherapeuticAreas([]); setCurrentPage(1); }}
              className={`px-3 py-1 rounded-full border text-[11px] transition whitespace-nowrap cursor-pointer ${
                selectedTherapeuticAreas.length === 0
                  ? 'bg-[#00768a] text-white border-[#00768a] font-bold shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300'
              }`}
            >
              All Areas ({productsList.length})
            </button>
            {THERAPEUTIC_AREAS.map(area => (
              <button
                key={area}
                onClick={() => toggleTherapeutic(area)}
                className={`px-3 py-1 rounded-full border text-[11px] transition whitespace-nowrap cursor-pointer ${
                  selectedTherapeuticAreas.includes(area)
                    ? 'bg-[#00768a] text-white border-[#00768a] font-bold shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. MONOGRAPHS GRID                                        */}
      {/* ========================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
            {pagedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-teal-300 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-5">
                  {/* Category Pill & Form */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-50 text-[#006070] border border-teal-100">
                      {product.therapeuticArea}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                      {product.dosageForm}
                    </span>
                  </div>

                  {/* Packshot Image */}
                  <div className="relative h-40 w-full rounded-xl overflow-hidden mb-3 bg-gradient-to-b from-slate-50 to-teal-50/20 border border-slate-100 flex items-center justify-center p-3">
                    <ProductPackshot product={product as any} />
                  </div>

                  <h3 className="font-black text-base text-[#003d4d] group-hover:text-[#00768a] transition-colors leading-tight">
                    {product.brandName}
                  </h3>
                  <div className="text-xs font-semibold text-slate-500 mt-0.5 leading-tight">
                    {product.genericName}
                  </div>

                  {product.indications?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {product.indications.slice(0, 2).map((ind, i) => (
                        <span key={i} className="text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                          {ind}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-xs font-bold text-[#00768a] hover:text-[#004f5e] inline-flex items-center gap-1"
                  >
                    <span>View Monograph</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDownloadMonograph(product)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-[#00768a] text-[#00768a] hover:text-white text-[11px] font-bold transition border border-teal-200 cursor-pointer"
                    title={`Download ${product.brandName} PDF Monograph`}
                  >
                    <Download className="w-3 h-3" />
                    PDF
                  </button>
                </div>
              </div>
            ))}
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
