'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import {
  CLINICAL_INSIGHTS_DATA,
  ClinicalInsight
} from '@/data/ryan-data';
import {
  ChevronRight,
  Clock,
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Share2,
  Printer,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Pill,
  Download,
  Activity,
  Layers,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export default function ClinicalInsightArticlePage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'understanding-acne';

  const defaultArticle: ClinicalInsight = CLINICAL_INSIGHTS_DATA[slug] || CLINICAL_INSIGHTS_DATA['understanding-acne'];
  const [article, setArticle] = useState<ClinicalInsight>(defaultArticle);
  const [copiedToast, setCopiedToast] = useState(false);

  useEffect(() => {
    fetch(`/api/db/insights?slug=${encodeURIComponent(slug)}`)
      .then(res => res.json())
      .then(data => {
        if (data?.success && data.insight) {
          const ins = data.insight;
          setArticle({
            ...ins.data,
            id: ins.id,
            slug: ins.slug,
            title: ins.title,
            subtitle: ins.subtitle || ins.data?.subtitle || '',
            image: ins.featured_image || ins.data?.image || defaultArticle.image,
          });
        }
      })
      .catch(() => {});
  }, [slug, defaultArticle.image]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  // Related formulation suggestions based on topic
  const getRelatedProducts = (topicSlug: string) => {
    if (topicSlug.includes('acne')) {
      return [
        { name: 'Clixodin-AD', form: 'Gel (Clindamycin 1% + Adapalene 0.1%)', cat: 'Acne Therapy', slug: 'clixodin-ad' },
        { name: 'I-Tacnoid 20', form: 'Capsules (Isotretinoin 20mg)', cat: 'Systemic Retinoid', slug: 'i-tacnoid-20' },
        { name: 'Clixodin-BPO', form: 'Gel (Clindamycin + Benzoyl Peroxide)', cat: 'Antibacterial', slug: 'clixodin-bpo' }
      ];
    } else if (topicSlug.includes('fungal')) {
      return [
        { name: 'Kefin 1%', form: 'Cream & Lotion (Ketoconazole 1%)', cat: 'Antifungal', slug: 'kefin' },
        { name: 'Itramac 200', form: 'Capsules (Itraconazole 200mg)', cat: 'Oral Antifungal', slug: 'itramac-200' },
        { name: 'Lulicon-XL', form: 'Cream (Luliconazole 1%)', cat: 'Broad-Spectrum Antifungal', slug: 'lulicon-xl' }
      ];
    } else if (topicSlug.includes('corticosteroid')) {
      return [
        { name: 'Tenorium 0.05%', form: 'Ointment & Cream (Clobetasol Propionate)', cat: 'Class I Super-Potent', slug: 'tenorium' },
        { name: 'Mometaderm', form: 'Cream (Mometasone Furoate 0.1%)', cat: 'Class IV Mid-Potency', slug: 'mometaderm' },
        { name: 'Tacrol-Pro 0.1%', form: 'Ointment (Tacrolimus 0.1%)', cat: 'Steroid-Sparing Agent', slug: 'tacrol-pro' }
      ];
    }
    return [
      { name: 'Tenorium', form: 'Cream (Clobetasol Propionate 0.05%)', cat: 'Corticosteroid', slug: 'tenorium' },
      { name: 'Clixodin-AD', form: 'Gel (Clindamycin + Adapalene)', cat: 'Acne Therapy', slug: 'clixodin-ad' },
      { name: 'Tressicle-F', form: 'Solution (Minoxidil 5% + Finasteride 0.1%)', cat: 'Trichology', slug: 'tressicle-f' }
    ];
  };

  const relatedProducts = getRelatedProducts(slug);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* ========================================================= */}
      {/* 1. HERO & METADATA BANNER (Vibrant Eye-Catching Header)   */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden text-white pt-8 pb-14 sm:pb-16 border-b border-teal-500/30 bg-[linear-gradient(135deg,#04202b_0%,#0e4f63_35%,#312e81_75%,#6d28d9_100%)]">
        <div className="h-1.5 w-full absolute top-0 left-0 bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400" />
        {/* Abstract glowing accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-teal-300/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-1/3 w-64 h-64 rounded-full bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 right-10 w-72 h-72 bg-indigo-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:44px_44px]" />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[64px] relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-teal-200/80 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="w-3 h-3 text-teal-400/60" />
            <Link href="/for-doctors/therapeutic-resources" className="hover:text-white transition">Therapeutic Resources</Link>
            <ChevronRight className="w-3 h-3 text-teal-400/60" />
            <Link href="/for-doctors/therapeutic-resources#insights" className="hover:text-white transition">Clinical Insights</Link>
            <ChevronRight className="w-3 h-3 text-teal-400/60" />
            <span className="text-white font-bold truncate max-w-xs">{article.title}</span>
          </nav>

          {/* Badges & Meta */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-extrabold text-[10px] tracking-wider uppercase shadow-md shadow-emerald-950/20">
              <Sparkles className="w-3 h-3" />
              PEER-REVIEWED CLINICAL INSIGHT
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-teal-100 font-bold text-[10px] tracking-wider uppercase border border-white/15">
              <ShieldCheck className="w-3 h-3 text-teal-300" />
              WHO-GMP REFERENCE
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight leading-[1.15] max-w-4xl bg-gradient-to-r from-white via-cyan-100 to-emerald-200 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
            {article.title}
          </h1>

          <div className="mt-6 pt-5 border-t border-teal-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-teal-100/90">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-teal-300/40 flex items-center justify-center text-teal-200">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white leading-tight">{article.author}</div>
                  <div className="text-[10px] text-teal-300">Ryan Medical Affairs Dermatology Panel</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-teal-200/80">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readingTime}
                </span>
              </div>
            </div>

            {/* Quick Action Tools */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition active:scale-95 cursor-pointer"
                title="Copy Article Link"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition active:scale-95 cursor-pointer"
                title="Print Clinical Summary"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Share Toast */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#003d4d] text-white px-4 py-2.5 rounded-xl shadow-xl border border-teal-400 flex items-center gap-2 text-xs font-bold animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Article link copied to clipboard!</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. MAIN CLINICAL EDITORIAL BODY                           */}
      {/* ========================================================= */}
      <main className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[64px] py-10 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Left Column: Clinical Article Content */}
          <div className="lg:col-span-8 space-y-8">

            {/* High-Yield Executive Pearl Callout */}
            <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-teal-50 via-cyan-50/60 to-indigo-50/50 border-2 border-teal-300 shadow-[0_16px_36px_-18px_rgba(0,118,138,0.5)] hover:shadow-[0_22px_44px_-18px_rgba(79,70,229,0.55)] hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-500" />
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 via-cyan-500 to-indigo-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#006070] block">
                    CLINICAL SUMMARY & ACTIONABLE TAKEAWAYS
                  </span>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                    {article.summary}
                  </p>
                </div>
              </div>
            </div>

            {/* Section 01: Overview & Pathophysiology */}
            <section className="relative overflow-hidden bg-white rounded-2xl p-6 sm:p-7 border border-teal-200/80 shadow-[0_10px_28px_-18px_rgba(0,118,138,0.45)] hover:shadow-[0_20px_42px_-18px_rgba(0,118,138,0.5)] hover:-translate-y-1 transition-all duration-300 space-y-4">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-teal-400 to-cyan-500" />
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 text-white font-black text-xs flex items-center justify-center shadow-sm">
                  01
                </span>
                <h2 className="text-lg sm:text-xl font-black text-[#003d4d] tracking-tight uppercase">
                  Overview & Pathophysiology
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {article.overview}
              </p>
            </section>

            {/* Section 02: Clinical Presentation */}
            <section className="relative overflow-hidden bg-white rounded-2xl p-6 sm:p-7 border border-cyan-200/80 shadow-[0_10px_28px_-18px_rgba(6,182,212,0.45)] hover:shadow-[0_20px_42px_-18px_rgba(6,182,212,0.5)] hover:-translate-y-1 transition-all duration-300 space-y-4">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-cyan-400 to-sky-500" />
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-sky-500 text-white font-black text-xs flex items-center justify-center shadow-sm">
                  02
                </span>
                <h2 className="text-lg sm:text-xl font-black text-[#003d4d] tracking-tight uppercase">
                  Clinical Presentation & Morphologic Features
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {article.clinicalPresentation}
              </p>

              {/* Special photo illustrations if present */}
              {slug === 'topical-vs-systemic' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-3 text-center">
                    <div className="relative h-44 w-full rounded-lg overflow-hidden mb-2 bg-slate-100">
                      <Image
                        src="/images/clinical-insights/topical-vs-systemic/eczema-localised.jpg"
                        alt="Localised eczema plaque"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="font-bold text-xs text-slate-900">Localised Plaque Phenotype</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Suitable for targeted high-potency topical therapy.</p>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 p-3 text-center">
                    <div className="relative h-44 w-full rounded-lg overflow-hidden mb-2 bg-slate-100">
                      <Image
                        src="/images/clinical-insights/topical-vs-systemic/tinea-corporis-localised.jpg"
                        alt="Tinea corporis localised"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="font-bold text-xs text-slate-900">Annular Recalcitrant Fungal Plaque</div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Requires barrier preservation and targeted antifungal course.</p>
                  </div>
                </div>
              )}
            </section>

            {/* Section 03: Differential Diagnosis Matrix */}
            <section className="relative overflow-hidden bg-white rounded-2xl p-6 sm:p-7 border border-indigo-200/80 shadow-[0_10px_28px_-18px_rgba(99,102,241,0.45)] hover:shadow-[0_20px_42px_-18px_rgba(99,102,241,0.5)] hover:-translate-y-1 transition-all duration-300 space-y-4">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-indigo-400 to-violet-500" />
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-black text-xs flex items-center justify-center shadow-sm">
                  03
                </span>
                <h2 className="text-lg sm:text-xl font-black text-[#003d4d] tracking-tight uppercase">
                  Differential Diagnostic Matrix
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Key differential diagnoses to consider during consultation to prevent misdiagnosis and inappropriate monotherapy:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                {article.differentialDiagnosis.map((diff, i) => {
                  const accents = [
                    { card: 'from-indigo-50 to-white border-indigo-200/80 hover:shadow-[0_18px_36px_-16px_rgba(99,102,241,0.5)] hover:border-indigo-300', dot: 'bg-indigo-500' },
                    { card: 'from-rose-50 to-white border-rose-200/80 hover:shadow-[0_18px_36px_-16px_rgba(244,63,94,0.5)] hover:border-rose-300', dot: 'bg-rose-500' },
                    { card: 'from-amber-50 to-white border-amber-200/80 hover:shadow-[0_18px_36px_-16px_rgba(245,158,11,0.5)] hover:border-amber-300', dot: 'bg-amber-500' },
                    { card: 'from-emerald-50 to-white border-emerald-200/80 hover:shadow-[0_18px_36px_-16px_rgba(16,185,129,0.5)] hover:border-emerald-300', dot: 'bg-emerald-500' },
                  ];
                  const a = accents[i % accents.length];
                  return (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border bg-gradient-to-b ${a.card} transition-all duration-300 shadow-sm hover:-translate-y-1`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`w-2 h-2 rounded-full ${a.dot}`}></span>
                      <h4 className="font-black text-xs text-[#003d4d]">{diff.condition}</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {diff.differentiatingFeatures}
                    </p>
                  </div>
                  );
                })}
              </div>
            </section>

            {/* Section 04: Evidence-Based Management Principles */}
            <section className="relative overflow-hidden bg-white rounded-2xl p-6 sm:p-7 border border-emerald-200/80 shadow-[0_10px_28px_-18px_rgba(16,185,129,0.45)] hover:shadow-[0_20px_42px_-18px_rgba(16,185,129,0.5)] hover:-translate-y-1 transition-all duration-300 space-y-4">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-emerald-400 to-teal-500" />
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-black text-xs flex items-center justify-center shadow-sm">
                  04
                </span>
                <h2 className="text-lg sm:text-xl font-black text-[#003d4d] tracking-tight uppercase">
                  Evidence-Based Management Principles
                </h2>
              </div>

              <div className="space-y-3">
                {article.managementPrinciples.map((principle, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80 flex items-start gap-3 hover:bg-emerald-50 transition"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-xs text-emerald-950 block mb-0.5">
                        Principle 0{idx + 1}
                      </span>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {principle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 05: Clinical Considerations & Safety Red Flags */}
            <section className="relative overflow-hidden bg-white rounded-2xl p-6 sm:p-7 border border-amber-200/80 shadow-[0_10px_28px_-18px_rgba(245,158,11,0.45)] hover:shadow-[0_20px_42px_-18px_rgba(245,158,11,0.5)] hover:-translate-y-1 transition-all duration-300 space-y-4">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-amber-400 to-orange-500" />
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white font-black text-xs flex items-center justify-center shadow-sm">
                  05
                </span>
                <h2 className="text-lg sm:text-xl font-black text-[#003d4d] tracking-tight uppercase">
                  Safety Considerations & Treatment Pearls
                </h2>
              </div>

              <div className="space-y-3.5">
                {article.treatmentConsiderations.map((tc, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 hover:border-amber-300 transition"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                      <h4 className="font-bold text-xs text-amber-950 uppercase tracking-wide">
                        {tc.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pl-6">
                      {tc.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 06: References & Guidelines */}
            <section className="relative overflow-hidden rounded-2xl p-6 border border-fuchsia-200/80 bg-gradient-to-br from-fuchsia-50 via-white to-pink-50 shadow-[0_10px_28px_-18px_rgba(217,70,239,0.45)] space-y-3">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-fuchsia-400 to-pink-500" />
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#00768a]" />
                <h3 className="font-extrabold text-xs text-[#003d4d] uppercase tracking-wider">
                  Authoritative Clinical References
                </h3>
              </div>
              <ul className="space-y-2 text-[11px] text-slate-500 font-mono">
                {article.references.map((ref, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#00768a] font-bold">[{idx + 1}]</span>
                    <span>{ref}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Sticky Clinical Sidebar (Desktop & Mobile) */}
          <aside className="lg:col-span-4 space-y-6">

            {/* Related Ryan Formulations Card */}
            <div className="bg-white rounded-2xl p-5 border border-indigo-200/80 shadow-[0_14px_32px_-20px_rgba(99,102,241,0.5)] hover:shadow-[0_20px_42px_-20px_rgba(99,102,241,0.55)] transition-all duration-300 sticky top-28 space-y-4 overflow-hidden relative">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400" />
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Pill className="w-4 h-4 text-[#00768a]" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#004f5e]">
                  Corresponding Formulations
                </h3>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed">
                Ryan Dermaceutics verified formulations indicated for conditions described in this clinical insight:
              </p>

              <div className="space-y-3">
                {relatedProducts.map((prod, i) => {
                  const accents = [
                    { chip: 'text-rose-700 bg-rose-100 border-rose-200', title: 'group-hover:text-rose-600', arrow: 'group-hover:text-rose-500' },
                    { chip: 'text-indigo-700 bg-indigo-100 border-indigo-200', title: 'group-hover:text-indigo-600', arrow: 'group-hover:text-indigo-500' },
                    { chip: 'text-emerald-700 bg-emerald-100 border-emerald-200', title: 'group-hover:text-emerald-600', arrow: 'group-hover:text-emerald-500' },
                  ];
                  const a = accents[i % accents.length];
                  return (
                  <Link
                    key={i}
                    href={`/products/${prod.slug}`}
                    className="group block p-3 rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 hover:border-indigo-300 hover:shadow-[0_14px_30px_-16px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div>
                      <span className={`text-[9.5px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ${a.chip}`}>
                        {prod.cat}
                      </span>
                      <h4 className={`font-black text-sm text-slate-900 ${a.title} transition-colors mt-1`}>
                        {prod.name}
                      </h4>
                      <p className="text-xs text-slate-600 font-semibold mt-0.5">{prod.form}</p>
                    </div>
                    <ArrowRight className={`w-3.5 h-3.5 text-slate-400 ${a.arrow} group-hover:translate-x-1 transition-all shrink-0 mt-2`} />
                  </Link>
                  );
                })}
              </div>

              <div className="pt-2">
                <Link
                  href="/products"
                  className="btn-fx w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 hover:brightness-110 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  <span>Browse Product Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Medical Information Contact */}
              <div className="mt-4 p-3.5 rounded-xl bg-teal-50/70 border border-teal-100 text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#006070] block">
                  PHYSICIAN INQUIRIES
                </span>
                <p className="text-[11px] text-slate-600">
                  Request clinical trial dossiers, sampling or monographs:
                </p>
                <Link
                  href="/for-doctors/medical-information"
                  className="inline-block text-[11px] font-bold text-[#00768a] hover:underline pt-1"
                >
                  Contact Medical Affairs →
                </Link>
              </div>
            </div>

          </aside>
        </div>

        {/* Back and Navigation Footer */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/for-doctors/therapeutic-resources#insights"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#00768a] hover:text-[#004f5e]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to All Clinical Insights
          </Link>

          <Link
            href="/for-doctors/prescribing-information"
            className="btn-fx inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:brightness-110 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md"
          >
            <span>Open Prescribing Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      <RyanFooter />
    </div>
  );
}
