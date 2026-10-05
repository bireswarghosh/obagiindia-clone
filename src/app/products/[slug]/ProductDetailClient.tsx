'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RyanProduct } from '@/data/ryan-products';
import { 
  Download, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  Pill, 
  AlertTriangle, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  Lightbulb, 
  Thermometer, 
  Sun, 
  Lock, 
  Users, 
  Clock, 
  FileText, 
  Layers, 
  Printer, 
  ArrowUpRight,
  Info,
  Activity,
  HeartPulse,
  Share2,
  Check
} from 'lucide-react';

interface ProductDetailClientProps {
  product: RyanProduct;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  // Accordion state
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    dosage: true,
    specialPop: true,
    warnings: true,
    adverse: true,
    interactions: true,
    counselling: true,
  });

  const [copied, setCopied] = useState(false);

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">

      {/* ========================================================= */}
      {/* 01. PRODUCT IDENTITY (Hero Section)                       */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-br from-[#003d4d] via-[#005566] to-[#00768a] rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-bold uppercase tracking-widest text-teal-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              PRODUCT MONOGRAPH • 01
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase">
              {product.brandName}
            </h1>

            <p className="text-lg sm:text-xl font-medium text-teal-100">
              {product.genericName}
            </p>

            <p className="text-xs sm:text-sm text-teal-100/80 max-w-2xl leading-relaxed">
              {product.tagline}
            </p>

            {/* Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 font-semibold text-white">
                {product.therapeuticArea}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 font-semibold text-white">
                {product.route}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 font-semibold text-white">
                {product.dosageForm}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 font-semibold text-emerald-200">
                {product.prescriptionStatus}
              </span>
            </div>
          </div>

          {/* Right Product Graphic & CTA */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-4">
            <div className="w-full max-w-xs h-48 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-6 flex flex-col items-center justify-center text-center shadow-lg">
              <div className="w-20 h-20 rounded-2xl bg-white text-[#004f5e] flex items-center justify-center text-3xl font-black shadow-md mb-3">
                {product.brandName.charAt(0)}
              </div>
              <span className="text-sm font-black text-white uppercase tracking-wider line-clamp-1">
                {product.brandName}
              </span>
              <span className="text-xs text-teal-200 font-medium mt-0.5">
                {product.strength} • {product.packSize}
              </span>
            </div>

            <div className="w-full max-w-xs flex flex-col gap-2.5">
              <button
                onClick={handlePrint}
                className="w-full py-2.5 px-4 rounded-xl bg-white text-[#004f5e] hover:bg-teal-50 text-xs font-bold transition flex items-center justify-center gap-2 shadow-md active:scale-95"
              >
                <Download className="w-4 h-4" />
                Download Monograph PDF
              </button>

              <Link
                href="/for-doctors/prescribing-information"
                className="w-full py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-bold transition flex items-center justify-center gap-2 active:scale-95 text-center"
              >
                Prescribing Information
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center justify-between text-[11px] text-teal-200/80 px-1 pt-1">
                <button onClick={handleShare} className="hover:text-white flex items-center gap-1">
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3" />}
                  {copied ? 'Link Copied!' : 'Share'}
                </button>
                <button onClick={handlePrint} className="hover:text-white flex items-center gap-1">
                  <Printer className="w-3 h-3" />
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 02. QUICK CLINICAL SUMMARY                                */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#00768a] uppercase mb-4">
          <Info className="w-4 h-4" />
          02 • QUICK CLINICAL SUMMARY
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-5">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Active Ingredient</span>
            <span className="text-xs font-bold text-slate-800 leading-snug line-clamp-2">
              {product.genericName.split('+')[0].trim()}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Strength</span>
            <span className="text-xs font-bold text-slate-800 leading-snug">
              {product.strength}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Dosage Form</span>
            <span className="text-xs font-bold text-slate-800 leading-snug">
              {product.dosageForm}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Route</span>
            <span className="text-xs font-bold text-slate-800 leading-snug">
              {product.route}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Therapeutic Area</span>
            <span className="text-xs font-bold text-[#00768a] leading-snug">
              {product.therapeuticArea}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Pack Size</span>
            <span className="text-xs font-bold text-slate-800 leading-snug">
              {product.packSize}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100 text-xs text-slate-700 leading-relaxed">
          <strong className="text-[#004f5e] font-bold">Clinical Use: </strong>
          {product.clinicalSummary}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 03. COMPOSITION & 04. THERAPEUTIC CATEGORY                */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 03. Composition */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#00768a] uppercase mb-3">
              <FileText className="w-4 h-4" />
              03 • COMPOSITION
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-700 block">
                {product.dosageForm === 'Tablet' || product.dosageForm === 'Capsule' ? 'Each unit contains:' : 'Each gram contains:'}
              </span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {product.composition.map((comp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#00768a] font-bold">•</span>
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 04. Therapeutic Category */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#00768a] uppercase mb-3">
              <Layers className="w-4 h-4" />
              04 • THERAPEUTIC CATEGORY
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-100">
                <span className="text-[10px] font-bold text-teal-800 uppercase block mb-1">Category</span>
                <span className="text-xs font-bold text-[#004f5e]">{product.therapeuticArea}</span>
              </div>
              <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-100">
                <span className="text-[10px] font-bold text-cyan-800 uppercase block mb-1">Route & Subtype</span>
                <span className="text-xs font-bold text-[#006070]">{product.routeSubcategory}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Administration</span>
                <span className="text-xs font-bold text-slate-700">{product.route}</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block mb-1">Status</span>
                <span className="text-xs font-bold text-emerald-700">{product.prescriptionStatus}</span>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* ========================================================= */}
      {/* 05. PHARMACOLOGICAL CLASS                                 */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#00768a] uppercase mb-3">
          <Activity className="w-4 h-4" />
          05 • PHARMACOLOGICAL CLASS
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
          {product.pharmacologicalClass}
        </p>
      </section>

      {/* ========================================================= */}
      {/* 06. MECHANISM OF ACTION (Visual Step Flow)                */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#00768a] uppercase mb-4">
          <HeartPulse className="w-4 h-4" />
          06 • MECHANISM OF ACTION
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {product.mechanismOfAction.map((step, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-gradient-to-b from-teal-50/40 to-white border border-teal-100 relative flex flex-col justify-between group hover:border-[#00768a] transition-all"
            >
              <div>
                <span className="text-[11px] font-black text-[#00768a] bg-teal-100/70 px-2 py-0.5 rounded-full inline-block mb-2">
                  Step {step.step}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-2 leading-snug">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {idx < 2 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-teal-200 flex items-center justify-center text-[#00768a] z-10 shadow-xs">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 07. INDICATIONS                                           */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#00768a] uppercase mb-3">
          <CheckCircle2 className="w-4 h-4" />
          07 • INDICATIONS
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Indicated for the clinical management of the following dermatological conditions:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {product.indications.map((ind, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#00768a] shrink-0 mt-0.5" />
              <span className="text-xs font-semibold text-slate-800 leading-snug">
                {ind}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 08. DOSAGE & ADMINISTRATION (Accordion)                   */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
        <button
          onClick={() => toggleAccordion('dosage')}
          className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50/50 transition border-b border-slate-100"
        >
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#00768a] uppercase">
            <Pill className="w-4 h-4" />
            08 • DOSAGE & ADMINISTRATION
          </div>
          {openAccordions.dosage ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {openAccordions.dosage && (
          <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-700 bg-slate-50/30">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80">
              <span className="font-bold text-[#004f5e] block mb-1">01 | Recommended Application / Dose:</span>
              <p className="text-slate-600 leading-relaxed">{product.dosageAdministration.recommended}</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80">
              <span className="font-bold text-[#004f5e] block mb-1">02 | Method of Administration:</span>
              <p className="text-slate-600 leading-relaxed">{product.dosageAdministration.howToApply}</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80">
              <span className="font-bold text-[#004f5e] block mb-1">03 | Treatment Duration:</span>
              <p className="text-slate-600 leading-relaxed">{product.dosageAdministration.duration}</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80">
              <span className="font-bold text-[#004f5e] block mb-1">04 | Missed Application:</span>
              <p className="text-slate-600 leading-relaxed">{product.dosageAdministration.missedApplication}</p>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 09. SPECIAL POPULATION CONSIDERATIONS (Accordion)         */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
        <button
          onClick={() => toggleAccordion('specialPop')}
          className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50/50 transition border-b border-slate-100"
        >
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#00768a] uppercase">
            <Users className="w-4 h-4" />
            09 • SPECIAL POPULATION CONSIDERATIONS
          </div>
          {openAccordions.specialPop ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {openAccordions.specialPop && (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50/30">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80">
              <span className="font-bold text-slate-900 block mb-1">01 | Pregnancy:</span>
              <p className="text-slate-600 leading-relaxed">{product.specialPopulations.pregnancy}</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80">
              <span className="font-bold text-slate-900 block mb-1">02 | Lactation:</span>
              <p className="text-slate-600 leading-relaxed">{product.specialPopulations.lactation}</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80">
              <span className="font-bold text-slate-900 block mb-1">03 | Paediatric Use:</span>
              <p className="text-slate-600 leading-relaxed">{product.specialPopulations.paediatric}</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80">
              <span className="font-bold text-slate-900 block mb-1">04 | Geriatric Use:</span>
              <p className="text-slate-600 leading-relaxed">{product.specialPopulations.geriatric}</p>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 10. CONTRAINDICATIONS                                     */}
      {/* ========================================================= */}
      <section className="bg-rose-50/70 border border-rose-200 rounded-2xl p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-black tracking-widest text-rose-800 uppercase mb-3">
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          10 • CONTRAINDICATIONS
        </div>
        <ul className="space-y-2 text-xs text-rose-950 font-medium">
          {product.contraindications.map((contra, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-1.5" />
              <span>{contra}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ========================================================= */}
      {/* 11. WARNINGS & PRECAUTIONS (Accordion)                    */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
        <button
          onClick={() => toggleAccordion('warnings')}
          className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50/50 transition border-b border-slate-100"
        >
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-amber-700 uppercase">
            <AlertTriangle className="w-4 h-4" />
            11 • WARNINGS & PRECAUTIONS
          </div>
          {openAccordions.warnings ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {openAccordions.warnings && (
          <div className="p-6 space-y-3 text-xs bg-slate-50/30">
            {product.warningsPrecautions.map((warn, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-0.5">{warn.title}</span>
                <p className="text-slate-600 leading-relaxed">{warn.detail}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 12. ADVERSE EFFECTS (Accordion)                           */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
        <button
          onClick={() => toggleAccordion('adverse')}
          className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50/50 transition border-b border-slate-100"
        >
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#00768a] uppercase">
            <Activity className="w-4 h-4" />
            12 • ADVERSE EFFECTS
          </div>
          {openAccordions.adverse ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {openAccordions.adverse && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs bg-slate-50/30">
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-900 block mb-2 uppercase text-[10px] tracking-wider text-slate-500">
                01 | Common
              </span>
              <ul className="space-y-1.5 text-slate-600">
                {product.adverseEffects.common.map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-teal-600">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-900 block mb-2 uppercase text-[10px] tracking-wider text-slate-500">
                02 | Less Common
              </span>
              <ul className="space-y-1.5 text-slate-600">
                {product.adverseEffects.lessCommon.map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-600">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-900 block mb-2 uppercase text-[10px] tracking-wider text-slate-500">
                03 | Rare / Significant
              </span>
              <ul className="space-y-1.5 text-slate-600">
                {product.adverseEffects.rare.map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-600">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 13. DRUG INTERACTIONS (Accordion)                         */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
        <button
          onClick={() => toggleAccordion('interactions')}
          className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50/50 transition border-b border-slate-100"
        >
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#00768a] uppercase">
            <Pill className="w-4 h-4" />
            13 • DRUG INTERACTIONS
          </div>
          {openAccordions.interactions ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {openAccordions.interactions && (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50/30">
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">01 | Topical Medications:</span>
              <p className="text-slate-600 leading-relaxed">{product.drugInteractions.topical}</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1">02 | Systemic Medications:</span>
              <p className="text-slate-600 leading-relaxed">{product.drugInteractions.systemic}</p>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 14. STORAGE & HANDLING                                    */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#00768a] uppercase mb-4">
          <Thermometer className="w-4 h-4" />
          14 • STORAGE & HANDLING
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
            <Thermometer className="w-4 h-4 text-[#00768a] shrink-0" />
            <span className="font-medium text-slate-700">Store below 30°C</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
            <Sun className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-medium text-slate-700">Protect from direct light</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-[#00768a] shrink-0" />
            <span className="font-medium text-slate-700">Keep container closed</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
            <Users className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="font-medium text-slate-700">Keep out of reach of kids</span>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 15. PATIENT COUNSELLING POINTS (Accordion)                */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
        <button
          onClick={() => toggleAccordion('counselling')}
          className="w-full p-6 flex items-center justify-between text-left hover:bg-slate-50/50 transition border-b border-slate-100"
        >
          <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#00768a] uppercase">
            <Users className="w-4 h-4" />
            15 • PATIENT COUNSELLING POINTS
          </div>
          {openAccordions.counselling ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </button>

        {openAccordions.counselling && (
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50/30">
            {product.patientCounselling.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1">
                <span className="font-bold text-[#004f5e] block">{item.question}</span>
                <p className="text-slate-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========================================================= */}
      {/* 16. CLINICAL PEARL (Purple / Indigo Highlight Box)        */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-r from-purple-50 via-indigo-50 to-teal-50 border-2 border-indigo-200 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-black tracking-widest text-indigo-700 uppercase block mb-1">
              16 • CLINICAL PEARL FOR DERMATOLOGISTS
            </span>
            <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
              "{product.clinicalPearl}"
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 17. PRODUCT AT A GLANCE (Summary Table)                   */}
      {/* ========================================================= */}
      <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#00768a] uppercase mb-4">
          <FileText className="w-4 h-4" />
          17 • PRODUCT AT A GLANCE
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100/80 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 border-b border-slate-200">Brand</th>
                <th className="p-3 border-b border-slate-200">Generic</th>
                <th className="p-3 border-b border-slate-200">Strength</th>
                <th className="p-3 border-b border-slate-200">Dosage Form</th>
                <th className="p-3 border-b border-slate-200">Route</th>
                <th className="p-3 border-b border-slate-200">Pack Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              <tr>
                <td className="p-3 font-bold text-[#00768a]">{product.brandName}</td>
                <td className="p-3">{product.genericName}</td>
                <td className="p-3">{product.strength}</td>
                <td className="p-3">{product.dosageForm}</td>
                <td className="p-3">{product.route}</td>
                <td className="p-3">{product.packSize}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 18. RELATED RYAN PRODUCTS                                 */}
      {/* ========================================================= */}
      {product.relatedProducts.length > 0 && (
        <section className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-black tracking-widest text-[#00768a] uppercase">
              <Layers className="w-4 h-4" />
              18 • RELATED RYAN PRODUCTS
            </div>
            <Link
              href="/products"
              className="text-xs font-bold text-[#00768a] hover:text-[#005f70] flex items-center gap-1"
            >
              View Full Range
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {product.relatedProducts.map((rel, idx) => (
              <Link
                key={idx}
                href={`/products/${rel.slug}`}
                className="p-4 rounded-xl border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#00768a] transition-colors">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {rel.generic}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center text-xs font-bold text-[#00768a]">
                  <span>Explore Monograph</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ========================================================= */}
      {/* 19. REFERENCES                                            */}
      {/* ========================================================= */}
      <section className="bg-slate-50/80 rounded-2xl border border-slate-200/90 p-6 shadow-xs text-xs">
        <div className="flex items-center gap-2 text-xs font-black tracking-widest text-slate-500 uppercase mb-3">
          <FileText className="w-4 h-4" />
          19 • REFERENCES & CLINICAL SOURCES
        </div>
        <ol className="list-decimal list-inside space-y-1 text-slate-600">
          {product.references.map((ref, idx) => (
            <li key={idx} className="leading-relaxed">{ref}</li>
          ))}
        </ol>
      </section>

    </div>
  );
}
