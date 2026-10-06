'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import {
  THERAPEUTIC_GUIDES_DATA,
  TherapeuticGuide
} from '@/data/ryan-data';
import MinoxidilEducationalCard from '@/components/ryan/MinoxidilEducationalCard';
import {
  ChevronRight,
  BookOpen,
  FlaskConical,
  ShieldCheck,
  Eye,
  FileText,
  Pill,
  Layers,
  FileCheck2,
  Users,
  Lightbulb,
  FileDown,
  ArrowRight,
  Plus,
  Minus,
  CheckCircle2,
  Package,
  Printer,
  ChevronDown
} from 'lucide-react';

export default function TherapeuticGuideTopicPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || 'acne-and-acne-management';

  // Retrieve guide data or fallback to acne
  const guide: TherapeuticGuide = THERAPEUTIC_GUIDES_DATA[slug] || THERAPEUTIC_GUIDES_DATA['acne-and-acne-management'];

  // Navigation tabs state
  const [activeTab, setActiveTab] = useState<'overview' | 'classification' | 'presentation' | 'treatment' | 'topical' | 'systemic' | 'considerations' | 'maintenance' | 'counselling'>('topical');

  // Accordion expanded state (topical accordions)
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    'retinoids': true,
    'luliconazole': true,
    'clobetasol': true,
    'soothing': true,
    'minoxidil': true,
    'retinoid-renewal': true
  });

  const toggleAccordion = (id: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* ========================================================= */}
      {/* 1. HERO SECTION (Matching Reference Structure Mockup)      */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e6f4f7] via-[#f1f9fb] to-[#f8fafc] border-b border-teal-100/60 pt-6 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6 flex-wrap">
            <a href="#" className="hover:text-teal-700 transition">Home</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a href="/for-doctors/therapeutic-resources" className="hover:text-teal-700 transition">For Doctors</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a href="/for-doctors/therapeutic-resources" className="hover:text-teal-700 transition">Therapeutic Resources</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#00768a] font-semibold">{guide.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Header info */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold tracking-widest text-[#00768a] uppercase bg-teal-100/80 px-3 py-1 rounded-full border border-teal-200">
                {guide.category}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003d4d] tracking-tight uppercase leading-none">
                {guide.title}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                {guide.subtitle}
              </p>

              {/* 3 Clinical Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                <div className="flex items-center gap-2.5 p-2.5 bg-white/80 rounded-xl border border-teal-100 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-[#00768a] shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 leading-tight uppercase">
                    {guide.evidenceBadge}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 bg-white/80 rounded-xl border border-teal-100 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 flex items-center justify-center text-[#00768a] shrink-0">
                    <FlaskConical className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 leading-tight uppercase">
                    {guide.practicalBadge}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 bg-white/80 rounded-xl border border-teal-100 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 leading-tight uppercase">
                    {guide.outcomeBadge}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-white">
                <div className="relative h-60 sm:h-64 w-full">
                  <Image
                    src={guide.heroImage}
                    alt={guide.title}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003d4d]/70 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-semibold text-white tracking-wide">
                      Clinical Reference • Ryan Dermaceutics
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. SECTION NAVIGATION BAR (Sticky on Scroll)              */}
      {/* ========================================================= */}
      <section className="bg-white border-b border-teal-100 shadow-xs sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-start lg:justify-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar text-xs font-bold text-slate-700">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition ${
                activeTab === 'overview'
                  ? 'bg-teal-50 text-[#00768a] border-b-2 border-[#00768a]'
                  : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-[#00768a]" />
              Overview
            </button>

            <button
              onClick={() => setActiveTab('classification')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition ${
                activeTab === 'classification'
                  ? 'bg-teal-50 text-[#00768a] border-b-2 border-[#00768a]'
                  : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#00768a]" />
              Classification
            </button>

            <button
              onClick={() => setActiveTab('presentation')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition ${
                activeTab === 'presentation'
                  ? 'bg-teal-50 text-[#00768a] border-b-2 border-[#00768a]'
                  : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#00768a]" />
              Clinical Presentation
            </button>

            <button
              onClick={() => setActiveTab('treatment')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition ${
                activeTab === 'treatment'
                  ? 'bg-teal-50 text-[#00768a] border-b-2 border-[#00768a]'
                  : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              <Pill className="w-3.5 h-3.5 text-[#00768a]" />
              Treatment Approaches
            </button>

            <button
              onClick={() => setActiveTab('topical')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition ${
                activeTab === 'topical'
                  ? 'bg-teal-50 text-[#00768a] border-b-2 border-[#00768a]'
                  : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              <FlaskConical className="w-3.5 h-3.5 text-[#00768a]" />
              Topical Treatment
            </button>

            <button
              onClick={() => setActiveTab('systemic')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition ${
                activeTab === 'systemic'
                  ? 'bg-teal-50 text-[#00768a] border-b-2 border-[#00768a]'
                  : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#00768a]" />
              Systemic Treatment
            </button>

            <button
              onClick={() => setActiveTab('considerations')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition ${
                activeTab === 'considerations'
                  ? 'bg-teal-50 text-[#00768a] border-b-2 border-[#00768a]'
                  : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5 text-[#00768a]" />
              Treatment Considerations
            </button>

            <button
              onClick={() => setActiveTab('maintenance')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition ${
                activeTab === 'maintenance'
                  ? 'bg-teal-50 text-[#00768a] border-b-2 border-[#00768a]'
                  : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00768a]" />
              Maintenance Approaches
            </button>

            <button
              onClick={() => setActiveTab('counselling')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition ${
                activeTab === 'counselling'
                  ? 'bg-teal-50 text-[#00768a] border-b-2 border-[#00768a]'
                  : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-[#00768a]" />
              Patient Counselling
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. MAIN CONTENT AREA (Left Accordions + Right Sidebar)     */}
      {/* ========================================================= */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: ACTIVE SECTION CONTENT & ACCORDIONS */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* TOPICAL TREATMENT VIEW (Exact match to Reference Structure) */}
            {activeTab === 'topical' && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-[#00768a]">{guide.topicalTreatment.sectionNumber}</span>
                    <span className="text-slate-300 text-2xl font-light">|</span>
                    <h2 className="text-2xl font-extrabold text-[#003d4d] uppercase tracking-tight">
                      {guide.topicalTreatment.title}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {guide.topicalTreatment.description}
                  </p>
                </div>

                {/* ACCORDION LIST */}
                <div className="space-y-3.5">
                  {guide.topicalTreatment.accordions.map((acc) => {
                    const isOpen = !!openAccordions[acc.id];
                    return (
                      <div
                        key={acc.id}
                        id={`acc-${acc.id}`}
                        className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden transition-all"
                      >
                        {/* Accordion Bar Header */}
                        <button
                          onClick={() => toggleAccordion(acc.id)}
                          className={`w-full p-4 flex items-center justify-between text-left transition ${
                            isOpen ? 'bg-[#004f5e] text-white' : 'bg-white hover:bg-slate-50 text-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <FlaskConical className={`w-5 h-5 ${isOpen ? 'text-teal-200' : 'text-[#00768a]'}`} />
                            <span className="font-extrabold text-sm sm:text-base tracking-wide">
                              {acc.title}
                            </span>
                          </div>
                          <div className="shrink-0">
                            {isOpen ? (
                              <Minus className="w-5 h-5 text-teal-200" />
                            ) : (
                              <Plus className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                        </button>

                        {/* Accordion Body Content */}
                        {isOpen && (
                          <div className="p-5 space-y-4 bg-white text-xs sm:text-sm text-slate-700 animate-fade-in leading-relaxed">
                            {acc.id === 'minoxidil' ? (
                              <div className="pt-2">
                                <MinoxidilEducationalCard />
                              </div>
                            ) : (
                              <>
                                <p className="text-slate-600 leading-relaxed">
                                  {acc.description}
                                </p>

                                {/* Dual columns for Agents & Key Points */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                                  {/* Common Agents */}
                                  {acc.commonAgents && (
                                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                                      <h4 className="font-bold text-slate-900 text-xs mb-2">Common agents</h4>
                                      <ul className="space-y-1.5 text-xs text-slate-600">
                                        {acc.commonAgents.map((agent, i) => (
                                          <li key={i} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#00768a]" />
                                            <span>{agent}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Key Points */}
                                  {acc.keyPoints && (
                                    <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-100">
                                      <h4 className="font-bold text-[#004f5e] text-xs mb-2">Key points</h4>
                                      <ul className="space-y-2 text-xs text-slate-700">
                                        {acc.keyPoints.map((pt, i) => (
                                          <li key={i} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                            <span>{pt}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>

                                {/* Application Considerations */}
                                {acc.applicationConsiderations && (
                                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                                    <h4 className="font-bold text-slate-900 text-xs mb-2">Application considerations</h4>
                                    <ul className="space-y-1.5 text-xs text-slate-600">
                                      {acc.applicationConsiderations.map((c, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <span className="text-[#00768a] font-bold">•</span>
                                          <span>{c}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* OVERVIEW SECTION */}
            {activeTab === 'overview' && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <h2 className="text-xl font-extrabold text-[#003d4d] uppercase">{guide.overview.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{guide.overview.description}</p>
                <div className="pt-2 space-y-2">
                  <h4 className="text-xs font-bold text-[#004f5e] uppercase">Key Diagnostic Takeaways</h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {guide.overview.keyPoints.map((kp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{kp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* CLASSIFICATION SECTION */}
            {activeTab === 'classification' && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <h2 className="text-xl font-extrabold text-[#003d4d] uppercase">Classification & Clinical Grading</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{guide.classification.description}</p>
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {guide.classification.types.map((t, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="font-bold text-sm text-[#004f5e]">{t.name}</h4>
                      <p className="text-xs text-slate-600 mt-1">{t.criteria}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CLINICAL PRESENTATION */}
            {activeTab === 'presentation' && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <h2 className="text-xl font-extrabold text-[#003d4d] uppercase">Clinical Presentation & Morphology</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{guide.clinicalPresentation.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-xs text-slate-900 mb-2">Morphological Patterns</h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {guide.clinicalPresentation.morphology.map((m, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#00768a] font-bold">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h4 className="font-bold text-xs text-slate-900 mb-2">Associated Symptoms</h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {guide.clinicalPresentation.symptoms.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#00768a] font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* TREATMENT APPROACHES */}
            {activeTab === 'treatment' && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <h2 className="text-xl font-extrabold text-[#003d4d] uppercase">Core Treatment Principles</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{guide.treatmentApproaches.principles}</p>
                <div className="space-y-2 pt-2">
                  {guide.treatmentApproaches.pathways.map((p, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-teal-50/50 border border-teal-100 flex items-start gap-3">
                      <span className="font-bold text-[#00768a] text-sm">{i + 1}.</span>
                      <span className="text-xs text-slate-700 font-medium leading-relaxed">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SYSTEMIC TREATMENT */}
            {activeTab === 'systemic' && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <h2 className="text-xl font-extrabold text-[#003d4d] uppercase">Systemic Treatment Options</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{guide.systemicTreatment.description}</p>
                <div className="space-y-3 pt-2">
                  {guide.systemicTreatment.accordions.map((acc, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <h4 className="font-bold text-sm text-[#004f5e]">{acc.title}</h4>
                      <p className="text-xs text-slate-600 mt-1">{acc.description}</p>
                      {acc.keyPoints && (
                        <ul className="mt-2 space-y-1 text-xs text-slate-700">
                          {acc.keyPoints.map((kp, j) => (
                            <li key={j} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{kp}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TREATMENT CONSIDERATIONS */}
            {activeTab === 'considerations' && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <h2 className="text-xl font-extrabold text-[#003d4d] uppercase">Treatment Considerations</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{guide.treatmentConsiderations.description}</p>
                <ul className="space-y-2 pt-2 text-xs text-slate-700">
                  {guide.treatmentConsiderations.points.map((pt, i) => (
                    <li key={i} className="p-3 rounded-lg bg-amber-50/60 border border-amber-200 flex items-start gap-2">
                      <span className="font-bold text-amber-700">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* MAINTENANCE */}
            {activeTab === 'maintenance' && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <h2 className="text-xl font-extrabold text-[#003d4d] uppercase">Maintenance Approaches</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{guide.maintenanceApproaches.description}</p>
                <ul className="space-y-2 pt-2 text-xs text-slate-700">
                  {guide.maintenanceApproaches.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* PATIENT COUNSELLING */}
            {activeTab === 'counselling' && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
                <h2 className="text-xl font-extrabold text-[#003d4d] uppercase">Patient Counselling Framework</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{guide.patientCounselling.description}</p>
                <ul className="space-y-2 pt-2 text-xs text-slate-700">
                  {guide.patientCounselling.counsellingPoints.map((cp, i) => (
                    <li key={i} className="p-3 rounded-lg bg-teal-50/50 border border-teal-100 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{cp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: STICKY SIDEBAR (Matching Reference Structure Mockup) */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-36">
            
            {/* Card 1: IN THIS SECTION */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                IN THIS SECTION
              </h3>
              <ul className="space-y-2 text-xs font-medium text-slate-600">
                {guide.topicalTreatment.accordions.map((acc) => (
                  <li key={acc.id}>
                    <button
                      onClick={() => {
                        setActiveTab('topical');
                        setOpenAccordions(prev => ({ ...prev, [acc.id]: true }));
                        const el = document.getElementById(`acc-${acc.id}`);
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-left hover:text-[#00768a] transition flex items-center justify-between w-full group py-1"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{acc.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#00768a]" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: QUICK FACT */}
            <div className="bg-gradient-to-br from-teal-50/80 to-cyan-50/60 rounded-2xl p-5 border border-teal-100 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-[#00768a]">
                <Lightbulb className="w-4 h-4 text-[#00768a]" />
                <span className="font-extrabold text-xs uppercase tracking-wider">QUICK FACT</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {guide.quickFact}
              </p>
            </div>

            {/* Card 3: DOWNLOAD RESOURCE */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-slate-900">
                <FileDown className="w-4 h-4 text-[#00768a]" />
                <span className="font-extrabold text-xs uppercase tracking-wider">DOWNLOAD RESOURCE</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium">
                {guide.downloadPdfName}
              </div>
              <button
                onClick={() => window.print()}
                className="w-full py-2.5 rounded-lg bg-[#00768a] hover:bg-[#005f70] active:scale-95 text-white text-xs font-bold uppercase tracking-wider shadow-xs transition flex items-center justify-center gap-2"
              >
                <span>DOWNLOAD PDF</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 4: RELATED SECTIONS */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                RELATED SECTIONS
              </h3>
              <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
                <li>
                  <button
                    onClick={() => setActiveTab('systemic')}
                    className="flex items-center justify-between w-full hover:text-[#00768a] transition group text-left"
                  >
                    <span>Systemic Treatment Options</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#00768a] group-hover:translate-x-1 transition-all" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('considerations')}
                    className="flex items-center justify-between w-full hover:text-[#00768a] transition group text-left"
                  >
                    <span>Treatment Considerations</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#00768a] group-hover:translate-x-1 transition-all" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('maintenance')}
                    className="flex items-center justify-between w-full hover:text-[#00768a] transition group text-left"
                  >
                    <span>Maintenance Approaches</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#00768a] group-hover:translate-x-1 transition-all" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('counselling')}
                    className="flex items-center justify-between w-full hover:text-[#00768a] transition group text-left"
                  >
                    <span>Patient Counselling</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#00768a] group-hover:translate-x-1 transition-all" />
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. RELATED RYAN PORTFOLIO (Bottom Banner)                 */}
      {/* ========================================================= */}
      <section className="bg-gradient-to-r from-[#e6f4f7] via-[#eff8fa] to-[#e6f4f7] border-y border-teal-200/80 py-10 my-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-teal-100 text-[#00768a] flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#003d4d] tracking-tight uppercase">
                  {guide.relatedPortfolio.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                {guide.relatedPortfolio.description}
              </p>

              {/* Product Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {guide.relatedPortfolio.products.map((p, idx) => (
                  <a
                    key={idx}
                    href="/for-doctors/prescribing-information"
                    className="px-3.5 py-1.5 rounded-lg bg-white border border-teal-200 text-xs font-bold text-[#004f5e] hover:bg-teal-50 shadow-2xs transition"
                  >
                    {p.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <a
                href="/for-doctors/prescribing-information"
                className="px-6 py-3 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider shadow-md transition whitespace-nowrap"
              >
                {guide.relatedPortfolio.ctaText}
              </a>
            </div>
          </div>
        </div>
      </section>

      <RyanFooter />
    </div>
  );
}
