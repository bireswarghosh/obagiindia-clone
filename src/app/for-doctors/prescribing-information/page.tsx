'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import {
  PRESCRIBING_INFO_PRODUCTS,
  PrescribingInfoProduct
} from '@/data/ryan-data';
import {
  Search,
  Pill,
  FileDown,
  ShieldCheck,
  ChevronRight,
  X,
  Printer,
  Sparkles,
  Stethoscope,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Activity,
  Wind,
  Flower2,
  Dna,
  Syringe,
  Bug,
  type LucideIcon
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Colour system — every therapeutic class gets its own palette so the */
/* directory reads as a colourful, scannable grid.                     */
/* ------------------------------------------------------------------ */
type CategoryStyle = {
  icon: LucideIcon;
  dot: string;
  pill: string;
  chip: string;
  bar: string;
  tile: string;
  soft: string;
  ring: string;
  glow: string;
};

const CATEGORY_META: Record<string, CategoryStyle> = {
  'All': {
    icon: Sparkles,
    dot: 'bg-[#00768a]',
    pill: 'bg-gradient-to-r from-[#00768a] to-cyan-500 text-white border-transparent shadow-md shadow-teal-300/50',
    chip: 'bg-teal-50 text-teal-700 border-teal-200',
    bar: 'from-[#00768a] via-teal-400 to-cyan-400',
    tile: 'from-[#00768a] to-cyan-400',
    soft: 'hover:bg-teal-50',
    ring: 'hover:border-teal-300',
    glow: 'hover:shadow-teal-200/60',
  },
  'Acne Therapy': {
    icon: Sparkles,
    dot: 'bg-rose-500',
    pill: 'bg-gradient-to-r from-rose-500 to-pink-500 text-white border-transparent shadow-md shadow-rose-300/50',
    chip: 'bg-rose-50 text-rose-700 border-rose-200',
    bar: 'from-rose-500 via-pink-400 to-rose-300',
    tile: 'from-rose-500 to-pink-400',
    soft: 'hover:bg-rose-50',
    ring: 'hover:border-rose-300',
    glow: 'hover:shadow-rose-200/60',
  },
  'Antifungals': {
    icon: Bug,
    dot: 'bg-amber-500',
    pill: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-transparent shadow-md shadow-amber-300/50',
    chip: 'bg-amber-50 text-amber-700 border-amber-200',
    bar: 'from-amber-500 via-orange-400 to-amber-300',
    tile: 'from-amber-500 to-orange-400',
    soft: 'hover:bg-amber-50',
    ring: 'hover:border-amber-300',
    glow: 'hover:shadow-amber-200/60',
  },
  'Corticosteroids & Anti-inflammatory': {
    icon: Activity,
    dot: 'bg-violet-500',
    pill: 'bg-gradient-to-r from-violet-500 to-purple-500 text-white border-transparent shadow-md shadow-violet-300/50',
    chip: 'bg-violet-50 text-violet-700 border-violet-200',
    bar: 'from-violet-500 via-purple-400 to-violet-300',
    tile: 'from-violet-500 to-purple-400',
    soft: 'hover:bg-violet-50',
    ring: 'hover:border-violet-300',
    glow: 'hover:shadow-violet-200/60',
  },
  'Antihistamines & Allergy': {
    icon: Wind,
    dot: 'bg-sky-500',
    pill: 'bg-gradient-to-r from-sky-500 to-blue-500 text-white border-transparent shadow-md shadow-sky-300/50',
    chip: 'bg-sky-50 text-sky-700 border-sky-200',
    bar: 'from-sky-500 via-blue-400 to-sky-300',
    tile: 'from-sky-500 to-blue-400',
    soft: 'hover:bg-sky-50',
    ring: 'hover:border-sky-300',
    glow: 'hover:shadow-sky-200/60',
  },
  'Trichology & Hair': {
    icon: Flower2,
    dot: 'bg-emerald-500',
    pill: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent shadow-md shadow-emerald-300/50',
    chip: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    bar: 'from-emerald-500 via-teal-400 to-emerald-300',
    tile: 'from-emerald-500 to-teal-400',
    soft: 'hover:bg-emerald-50',
    ring: 'hover:border-emerald-300',
    glow: 'hover:shadow-emerald-200/60',
  },
  'Immunomodulators': {
    icon: Dna,
    dot: 'bg-indigo-500',
    pill: 'bg-gradient-to-r from-indigo-500 to-blue-600 text-white border-transparent shadow-md shadow-indigo-300/50',
    chip: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    bar: 'from-indigo-500 via-blue-400 to-indigo-300',
    tile: 'from-indigo-500 to-blue-400',
    soft: 'hover:bg-indigo-50',
    ring: 'hover:border-indigo-300',
    glow: 'hover:shadow-indigo-200/60',
  },
  'Antibacterials & Scabicides': {
    icon: Syringe,
    dot: 'bg-cyan-500',
    pill: 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white border-transparent shadow-md shadow-cyan-300/50',
    chip: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    bar: 'from-cyan-500 via-teal-400 to-cyan-300',
    tile: 'from-cyan-500 to-teal-400',
    soft: 'hover:bg-cyan-50',
    ring: 'hover:border-cyan-300',
    glow: 'hover:shadow-cyan-200/60',
  },
};

const getMeta = (category: string): CategoryStyle => CATEGORY_META[category] || CATEGORY_META['All'];

const CHIP_PALETTE = [
  'bg-teal-50 text-teal-700 border-teal-200',
  'bg-rose-50 text-rose-700 border-rose-200',
  'bg-amber-50 text-amber-700 border-amber-200',
  'bg-violet-50 text-violet-700 border-violet-200',
  'bg-sky-50 text-sky-700 border-sky-200',
  'bg-emerald-50 text-emerald-700 border-emerald-200',
];

export default function PrescribingInformationPortal() {
  const [prescribingList, setPrescribingList] = useState<PrescribingInfoProduct[]>(PRESCRIBING_INFO_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProductModal, setActiveProductModal] = useState<PrescribingInfoProduct | null>(null);

  React.useEffect(() => {
    fetch('/api/db/prescribing')
      .then(res => res.json())
      .then(data => {
        if (data?.success && Array.isArray(data.prescribing) && data.prescribing.length > 0) {
          const mapped = data.prescribing.map((pi: any) => ({
            ...pi.data,
            id: pi.id,
            brandName: pi.brand_name,
            genericName: pi.generic_name,
            therapeuticClass: pi.therapeutic_class || pi.data?.therapeuticClass || '',
            category: pi.category || pi.data?.category || 'Acne Therapy',
            composition: pi.composition || pi.data?.composition || '',
            image: pi.product_image || pi.data?.image || '',
          }));
          setPrescribingList(mapped);
        }
      })
      .catch(() => {});
  }, []);

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

  // Count records per category for the colourful filter pills.
  const categoryCounts = prescribingList.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  // Filtering products
  const filteredProducts = prescribingList.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.composition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.therapeuticClass.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const modalMeta = activeProductModal ? getMeta(activeProductModal.category) : CATEGORY_META['All'];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* ========================================================= */}
      {/* 1. HERO HEADER                                            */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e6f4f7] via-[#f1f9fb] to-[#dceff4] border-b border-teal-100/60 pt-6 pb-12">
        {/* Colourful glows + dotted texture */}
        <div className="pointer-events-none absolute -top-24 -left-16 w-96 h-96 rounded-full bg-teal-300/30 blur-3xl" />
        <div className="pointer-events-none absolute -top-16 right-0 w-80 h-80 rounded-full bg-violet-300/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-amber-200/30 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'radial-gradient(rgba(0,118,138,0.14) 1px, transparent 1px)',
            backgroundSize: '26px 26px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 mb-6 flex-wrap px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-sm">
            <Link href="/" className="hover:text-teal-700 transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/for-doctors" className="hover:text-teal-700 transition">For Doctors</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#00768a] font-semibold">Prescribing Information Directory</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-[#006070] text-xs font-bold uppercase tracking-widest shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00768a]" />
                OFFICIAL PRESCRIBING REPOSITORY
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003d4d] tracking-tight uppercase leading-[1.05]">
                PRESCRIBING <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#00768a] via-[#0093ad] to-cyan-500 bg-clip-text text-transparent">
                  INFORMATION
                </span>
              </h1>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Comprehensive regulatory monographs, compositional specifications, indications, dosage parameters, contraindications, and clinical safety profiles for all Ryan Dermaceutics products.
              </p>

              <div className="pt-1 text-[11px] text-slate-500 font-medium flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold tracking-wide">
                  Rx ONLY
                </span>
                <span>Intended exclusively for Registered Medical Practitioners &amp; Healthcare Institutions.</span>
              </div>
            </div>

            {/* Colourful hero stat cards */}
            <div className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-3 w-full">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/75 backdrop-blur-md border border-white/80 shadow-[0_8px_24px_rgba(0,61,77,0.08)]">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00768a] to-cyan-400 text-white flex items-center justify-center shadow-md shrink-0">
                  <Pill className="w-5 h-5" />
                </span>
                <div className="leading-tight">
                  <div className="text-lg font-black text-[#00768a]">{PRESCRIBING_INFO_PRODUCTS.length}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">PI Records</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/75 backdrop-blur-md border border-white/80 shadow-[0_8px_24px_rgba(0,61,77,0.08)]">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-400 text-white flex items-center justify-center shadow-md shrink-0">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div className="leading-tight">
                  <div className="text-lg font-black text-violet-600">{categories.length - 1}</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Therapeutic Classes</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/75 backdrop-blur-md border border-white/80 shadow-[0_8px_24px_rgba(0,61,77,0.08)]">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-md shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <div className="leading-tight">
                  <div className="text-lg font-black text-emerald-600">WHO-GMP</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Manufacturing</div>
                </div>
              </div>
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
                className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00768a] focus:ring-2 focus:ring-teal-100 shadow-[0_10px_30px_rgba(0,61,77,0.08)] transition"
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
              {categories.map((cat) => {
                const meta = getMeta(cat);
                const active = selectedCategory === cat;
                const count = cat === 'All' ? PRESCRIBING_INFO_PRODUCTS.length : (categoryCounts[cat] || 0);
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full whitespace-nowrap border transition ${
                      active
                        ? meta.pill
                        : `bg-white/80 backdrop-blur-md text-slate-600 border-slate-200 ${meta.soft} hover:shadow-sm`
                    }`}
                  >
                    {!active && <span className={`w-2 h-2 rounded-full ${meta.dot}`} />}
                    {cat}
                    <span className={`px-1.5 rounded-full text-[10px] font-black ${active ? 'bg-white/25' : 'bg-slate-100 text-slate-500'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. PRODUCT CARDS GRID                                     */}
      {/* ========================================================= */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#00768a] to-cyan-500" />
            Showing {filteredProducts.length} Prescribing Information Records
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
          {filteredProducts.map((prod) => {
            const meta = getMeta(prod.category);
            const Icon = meta.icon;
            return (
              <div
                key={prod.id}
                className={`relative overflow-hidden rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200/80 shadow-[0_10px_30px_rgba(0,61,77,0.07)] hover:-translate-y-1 hover:shadow-xl ${meta.ring} ${meta.glow} transition-all duration-300 flex flex-col justify-between group`}
              >
                {/* Colour-coded top accent */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${meta.bar}`} />

                <div className="p-5">
                  {/* Header: Class & Dosage form */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`w-9 h-9 rounded-xl bg-gradient-to-br ${meta.tile} text-white flex items-center justify-center shadow-md shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-md uppercase tracking-wider ${meta.chip}`}>
                        {prod.category}
                      </span>
                    </div>
                    <span className="text-[10.5px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded whitespace-nowrap">
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
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-[10.5px] text-slate-500 font-medium bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                      {prod.dosageForm}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {prod.therapeuticClass}
                    </span>
                  </div>

                  {/* Key Indications list */}
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
                    <span className="text-[10.5px] font-bold text-slate-600 uppercase tracking-wider block">
                      Key Clinical Indications:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {prod.indications.slice(0, 2).map((ind, i) => (
                        <li key={i} className="flex items-start gap-1.5 leading-snug">
                          <span className={`w-1.5 h-1.5 rounded-full ${meta.dot} mt-1.5 shrink-0`} />
                          <span className="line-clamp-1">{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveProductModal(prod)}
                    className={`flex-1 py-2 rounded-lg bg-gradient-to-r ${meta.bar} text-white font-bold text-xs uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5 shadow-md hover:brightness-105 active:scale-95`}
                  >
                    <span>View PI</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    href={`/products/${prod.id}`}
                    title="Full Clinical Monograph & Differential Diagnoses"
                    className="py-2 px-3 rounded-lg bg-slate-100 hover:bg-[#00768a] text-slate-700 hover:text-white font-bold text-xs transition flex items-center gap-1"
                  >
                    <span>Monograph</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

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
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-teal-50 flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-slate-400" />
            </div>
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">No Prescribing Information Found</h3>
            <p className="text-xs text-slate-500 mt-1">Try a different brand name, active ingredient, or reset the category filter.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00768a] to-cyan-500 text-white text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 transition"
            >
              Reset Search
            </button>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 3. INTERACTIVE PRESCRIBING INFORMATION MODAL              */}
      {/* ========================================================= */}
      {activeProductModal && (
        <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-fade-in border border-white/70">
            {/* Colour-coded accent */}
            <div className={`h-1.5 w-full bg-gradient-to-r ${modalMeta.bar}`} />

            {/* Modal Top Header */}
            <div className="p-6 bg-gradient-to-r from-[#003d4d] to-[#006070] text-white flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-white uppercase bg-white/10 px-2.5 py-0.5 rounded">
                    <modalMeta.icon className="w-3 h-3" />
                    OFFICIAL PRESCRIBING INFORMATION (PI)
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${modalMeta.bar} text-white`}>
                    {activeProductModal.category}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-300">SCHEDULE H / Rx</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-extrabold">{activeProductModal.brandName}</h2>
                <p className="text-xs sm:text-sm text-teal-100">{activeProductModal.genericName}</p>
                <p className="text-[11px] text-teal-200/80">
                  {activeProductModal.therapeuticClass} • {activeProductModal.dosageForm} • Pack: {activeProductModal.packSize}
                </p>
              </div>
              <button
                onClick={() => setActiveProductModal(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Monograph Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {/* Section 1: Composition */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-50/70 to-cyan-50/40 border border-teal-100">
                <h4 className="font-extrabold text-[#004f5e] uppercase text-xs tracking-wider mb-1.5 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00768a] to-cyan-400 text-white flex items-center justify-center shrink-0">
                    <Pill className="w-4 h-4" />
                  </span>
                  1. COMPOSITION &amp; ACTIVE FORMULATION
                </h4>
                <p className="text-slate-700 pl-9">{activeProductModal.composition}</p>
              </div>

              {/* Section 2: Indications */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-extrabold text-emerald-900 uppercase text-xs tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </span>
                  2. THERAPEUTIC INDICATIONS
                </h4>
                <ul className="space-y-1.5 text-xs text-emerald-950 pl-9">
                  {activeProductModal.indications.map((ind, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 3: Dosage & Administration */}
              <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100">
                <h4 className="font-extrabold text-sky-900 uppercase text-xs tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500 to-blue-400 text-white flex items-center justify-center shrink-0">
                    <Stethoscope className="w-4 h-4" />
                  </span>
                  3. DOSAGE &amp; METHOD OF ADMINISTRATION
                </h4>
                <ul className="space-y-1.5 text-xs text-sky-950 pl-9">
                  {activeProductModal.dosageAndAdministration.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 4 & 5: Contraindications & Warnings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200">
                  <h4 className="font-extrabold text-rose-900 uppercase text-xs tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-500 to-pink-400 text-white flex items-center justify-center shrink-0">
                      <AlertTriangle className="w-4 h-4" />
                    </span>
                    4. CONTRAINDICATIONS
                  </h4>
                  <ul className="space-y-1.5 text-xs text-rose-950 pl-9">
                    {activeProductModal.contraindications.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                  <h4 className="font-extrabold text-amber-900 uppercase text-xs tracking-wider mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-400 text-white flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                    5. SPECIAL WARNINGS &amp; PRECAUTIONS
                  </h4>
                  <ul className="space-y-1.5 text-xs text-amber-950 pl-9">
                    {activeProductModal.warningsAndPrecautions.map((w, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Section 6: Adverse Reactions */}
              <div className="p-4 rounded-2xl bg-violet-50/50 border border-violet-100">
                <h4 className="font-extrabold text-violet-900 uppercase text-xs tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-400 text-white flex items-center justify-center shrink-0">
                    <Activity className="w-4 h-4" />
                  </span>
                  6. ADVERSE DRUG REACTIONS
                </h4>
                <div className="flex flex-wrap gap-2 pl-9">
                  {activeProductModal.adverseReactions.map((ar, i) => (
                    <span key={i} className={`px-3 py-1 rounded-full text-xs border font-medium ${CHIP_PALETTE[i % CHIP_PALETTE.length]}`}>
                      {ar}
                    </span>
                  ))}
                </div>
              </div>

              {/* Section 7: Storage & Handling */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="font-extrabold text-slate-900 uppercase text-xs tracking-wider mb-1 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-slate-600 to-slate-400 text-white flex items-center justify-center shrink-0">
                    <Pill className="w-4 h-4" />
                  </span>
                  7. STORAGE &amp; PACKAGING SPECIFICATIONS
                </h4>
                <p className="text-xs text-slate-600 pl-9">{activeProductModal.storageAndHandling}</p>
              </div>

              {/* Regulatory Sign-off */}
              <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-400 flex items-center justify-between flex-wrap gap-2">
                <span>Ryan Dermaceutics • Medical Regulatory Affairs</span>
                <span>Document Code: PI-{activeProductModal.id.toUpperCase()}-2026</span>
              </div>
            </div>

            {/* Modal Bottom Footer */}
            <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold transition"
              >
                <Printer className="w-4 h-4 text-[#00768a]" />
                <span>Print Official PI</span>
              </button>

              <div className="flex items-center gap-2.5">
                <Link
                  href={`/products/${activeProductModal.id}`}
                  className="px-4 py-2 rounded-lg bg-teal-50 hover:bg-teal-100 text-[#006070] border border-teal-200 font-bold transition flex items-center gap-1.5"
                >
                  <span>Explore Full Monograph</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => setActiveProductModal(null)}
                  className={`px-5 py-2 rounded-lg bg-gradient-to-r ${modalMeta.bar} text-white font-bold shadow-md hover:brightness-105 transition`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <RyanFooter />
    </div>
  );
}
