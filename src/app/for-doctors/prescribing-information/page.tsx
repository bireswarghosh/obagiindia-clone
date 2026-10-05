'use client';

import React, { useState } from 'react';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import {
  PRESCRIBING_INFO_PRODUCTS,
  PrescribingInfoProduct
} from '@/data/ryan-data';
import {
  Search,
  Pill,
  FileText,
  FileDown,
  ShieldCheck,
  ChevronRight,
  Filter,
  X,
  Printer,
  Sparkles,
  Building2,
  Stethoscope,
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function PrescribingInformationPortal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProductModal, setActiveProductModal] = useState<PrescribingInfoProduct | null>(null);

  const categories = [
    'All',
    'Acne Therapy',
    'Antifungals',
    'Corticosteroids & Anti-inflammatory',
    'Antihistamines & Allergy',
    'Trichology & Hair',
    'Immunomodulators',
    'Antibacterials & Scabicides'
  ];

  // Filtering products
  const filteredProducts = PRESCRIBING_INFO_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.composition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.therapeuticClass.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* ========================================================= */}
      {/* 1. HERO HEADER                                            */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-b from-[#e6f4f7] via-[#f1f9fb] to-[#f8fafc] border-b border-teal-100/60 pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6 flex-wrap">
            <a href="#" className="hover:text-teal-700 transition">Home</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a href="/for-doctors/therapeutic-resources" className="hover:text-teal-700 transition">For Doctors</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#00768a] font-semibold">Prescribing Information Directory</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-[#006070] text-xs font-bold uppercase tracking-widest border border-teal-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00768a]" />
              OFFICIAL PRESCRIBING REPOSITORY
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003d4d] tracking-tight uppercase">
              PRESCRIBING <br className="hidden sm:inline" />
              <span className="text-[#00768a]">INFORMATION</span>
            </h1>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
              Comprehensive regulatory monographs, compositional specifications, indications, dosage parameters, contraindications, and clinical safety profiles for all Ryan Dermaceutics products.
            </p>

            <div className="pt-2 text-[11px] text-slate-500 font-medium flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-200/80 text-slate-700 font-mono font-bold">Rx ONLY</span>
              <span>Intended exclusively for Registered Medical Practitioners & Healthcare Institutions.</span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-8 pt-6 border-t border-teal-100/80 space-y-4">
            {/* Search Input */}
            <div className="relative max-w-2xl">
              <input
                type="text"
                placeholder="Search by Brand Name, Active Ingredient (e.g. Clindamycin, Itraconazole, Clobetasol, Minoxidil)..."
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

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar text-xs font-semibold">
              <span className="text-slate-400 text-[11px] uppercase tracking-wider font-bold shrink-0">Filter:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-[#00768a] text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-teal-50 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. PRODUCT CARDS GRID                                     */}
      {/* ========================================================= */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Showing {filteredProducts.length} Prescribing Monographs
          </span>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs text-[#00768a] hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-teal-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: Class & Dosage form */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {prod.category}
                  </span>
                  <span className="text-[10.5px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {prod.packSize}
                  </span>
                </div>

                {/* Brand Name */}
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#00768a] transition-colors leading-snug">
                  {prod.brandName}
                </h3>

                {/* Generic Active Composition */}
                <p className="text-xs font-semibold text-[#006070] mt-1 leading-snug">
                  {prod.genericName}
                </p>

                {/* Therapeutic class */}
                <div className="text-[11px] text-slate-400 font-medium mt-1">
                  {prod.therapeuticClass}
                </div>

                {/* Key Indications list */}
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                  <span className="text-[10.5px] font-bold text-slate-600 uppercase tracking-wider block">
                    Key Clinical Indications:
                  </span>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {prod.indications.slice(0, 2).map((ind, i) => (
                      <li key={i} className="flex items-start gap-1.5 leading-snug">
                        <span className="text-teal-600 font-bold">•</span>
                        <span className="line-clamp-1">{ind}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveProductModal(prod)}
                  className="flex-1 py-2 rounded-lg bg-teal-50 hover:bg-[#00768a] text-[#006070] hover:text-white font-bold text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <span>View Monograph</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setActiveProductModal(prod);
                    setTimeout(() => window.print(), 300);
                  }}
                  title="Print / Save PDF"
                  className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 transition"
                >
                  <FileDown className="w-4 h-4 text-[#00768a]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. INTERACTIVE PRESCRIBING MONOGRAPH MODAL                */}
      {/* ========================================================= */}
      {activeProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-fade-in border border-teal-100">
            {/* Modal Top Header */}
            <div className="p-6 bg-gradient-to-r from-[#003d4d] to-[#006070] text-white flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-widest text-teal-200 uppercase bg-white/10 px-2.5 py-0.5 rounded">
                    OFFICIAL PRESCRIBING MONOGRAPH
                  </span>
                  <span className="text-[10px] font-bold text-emerald-300">SCHEDULE H / Rx</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-extrabold">{activeProductModal.brandName}</h2>
                <p className="text-xs sm:text-sm text-teal-100">{activeProductModal.genericName}</p>
                <p className="text-[11px] text-teal-200/80">{activeProductModal.therapeuticClass} • Pack: {activeProductModal.packSize}</p>
              </div>
              <button
                onClick={() => setActiveProductModal(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Monograph Body (Official 8 Sections) */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {/* Section 1: Composition */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-extrabold text-[#004f5e] uppercase text-xs tracking-wider mb-1.5 flex items-center gap-2">
                  <Pill className="w-4 h-4 text-[#00768a]" />
                  1. COMPOSITION & ACTIVE FORMULATION
                </h4>
                <p className="text-slate-700">{activeProductModal.composition}</p>
              </div>

              {/* Section 2: Indications */}
              <div>
                <h4 className="font-extrabold text-[#004f5e] uppercase text-xs tracking-wider mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  2. THERAPEUTIC INDICATIONS
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 pl-2">
                  {activeProductModal.indications.map((ind, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 3: Dosage & Administration */}
              <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100">
                <h4 className="font-extrabold text-[#004f5e] uppercase text-xs tracking-wider mb-2 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-[#00768a]" />
                  3. DOSAGE & METHOD OF ADMINISTRATION
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 pl-2">
                  {activeProductModal.dosageAndAdministration.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#00768a] font-bold">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 4 & 5: Contraindications & Warnings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200">
                  <h4 className="font-extrabold text-rose-900 uppercase text-xs tracking-wider mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    4. CONTRAINDICATIONS
                  </h4>
                  <ul className="space-y-1.5 text-xs text-rose-950 pl-2">
                    {activeProductModal.contraindications.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200">
                  <h4 className="font-extrabold text-amber-900 uppercase text-xs tracking-wider mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    5. SPECIAL WARNINGS & PRECAUTIONS
                  </h4>
                  <ul className="space-y-1.5 text-xs text-amber-950 pl-2">
                    {activeProductModal.warningsAndPrecautions.map((w, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-bold">•</span>
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Section 6: Adverse Reactions */}
              <div>
                <h4 className="font-extrabold text-[#004f5e] uppercase text-xs tracking-wider mb-2">
                  6. ADVERSE DRUG REACTIONS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProductModal.adverseReactions.map((ar, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs border border-slate-200">
                      {ar}
                    </span>
                  ))}
                </div>
              </div>

              {/* Section 7: Storage & Handling */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="font-extrabold text-slate-900 uppercase text-xs tracking-wider mb-1">
                  7. STORAGE & PACKAGING SPECIFICATIONS
                </h4>
                <p className="text-xs text-slate-600">{activeProductModal.storageAndHandling}</p>
              </div>

              {/* Regulatory Sign-off */}
              <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Ryan Dermaceutics • Medical Regulatory Affairs</span>
                <span>Document Code: PI-{activeProductModal.id.toUpperCase()}-2026</span>
              </div>
            </div>

            {/* Modal Bottom Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold transition"
              >
                <Printer className="w-4 h-4 text-[#00768a]" />
                <span>Print Official Monograph</span>
              </button>

              <button
                onClick={() => setActiveProductModal(null)}
                className="px-5 py-2 rounded-lg bg-[#00768a] text-white font-bold hover:bg-[#005f70] transition"
              >
                Close Monograph
              </button>
            </div>
          </div>
        </div>
      )}

      <RyanFooter />
    </div>
  );
}
