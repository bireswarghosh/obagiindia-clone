'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import {
  SAMPLE_TOPIC_PAGES,
  REFERENCE_LIBRARY_CATEGORIES,
  LibraryTopic
} from '@/data/ryan-data';
import {
  ChevronRight,
  Printer,
  ChevronDown,
  ChevronUp,
  Package,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Stethoscope,
  Pill,
  ExternalLink
} from 'lucide-react';

export default function ReferenceLibraryTopicDetailPage() {
  const params = useParams();
  const categorySlug = (params?.category as string) || 'fungal-infections';
  const topicSlug = (params?.topic as string) || 'tinea-corporis';

  const categoryData = REFERENCE_LIBRARY_CATEGORIES[categorySlug] || REFERENCE_LIBRARY_CATEGORIES['fungal-infections'];
  const matchedCondition = categoryData?.conditionReferences?.find(c => c.slug === topicSlug) ||
    categoryData?.therapeuticReferences?.find(c => c.slug === topicSlug);

  const baseTopic = SAMPLE_TOPIC_PAGES[topicSlug] || SAMPLE_TOPIC_PAGES['tinea-corporis'];
  const topic: LibraryTopic = SAMPLE_TOPIC_PAGES[topicSlug] ? SAMPLE_TOPIC_PAGES[topicSlug] : {
    ...baseTopic,
    slug: topicSlug,
    title: matchedCondition?.title || baseTopic.title,
    categoryName: categoryData?.name || baseTopic.categoryName,
    categorySlug: categorySlug,
    image: matchedCondition?.thumbnail || baseTopic.image,
    quickSummary: matchedCondition?.subtitle ? `${matchedCondition.title}: ${matchedCondition.subtitle}` : baseTopic.quickSummary,
  };

  // State for 11 accordions (01 and 02 open by default)
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    '01': true,
    '02': true,
    '03': false,
    '04': false,
    '05': false,
    '06': false,
    '07': false,
    '08': false,
    '09': false,
    '10': false,
    '11': false
  });

  const toggleSection = (sec: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sec]: !prev[sec]
    }));
  };

  const expandAll = () => {
    setOpenSections({
      '01': true, '02': true, '03': true, '04': true, '05': true,
      '06': true, '07': true, '08': true, '09': true, '10': true, '11': true
    });
  };

  const collapseAll = () => {
    setOpenSections({
      '01': false, '02': false, '03': false, '04': false, '05': false,
      '06': false, '07': false, '08': false, '09': false, '10': false, '11': false
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* Breadcrumb & Actions Bar */}
      <section className="bg-white border-b border-teal-100/60 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between flex-wrap gap-3">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 flex-wrap">
            <a href="#" className="hover:text-teal-700 transition">Home</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a href="/for-doctors/reference-library" className="hover:text-teal-700 transition">Dermatology Reference Library</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a href={`/for-doctors/reference-library/${topic.categorySlug}`} className="hover:text-teal-700 transition">{topic.categoryName}</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#00768a] font-semibold">{topic.title}</span>
          </nav>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold transition"
          >
            <Printer className="w-3.5 h-3.5 text-[#00768a]" />
            <span>Print this page</span>
          </button>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* ========================================================= */}
        {/* TOPIC HEADER (Matching Right Screen in Nav Flow)          */}
        {/* ========================================================= */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Lesion Photo */}
          <div className="relative w-36 h-28 sm:w-44 sm:h-32 rounded-xl overflow-hidden shadow-xs border border-slate-200 shrink-0 bg-slate-100">
            <Image
              src={topic.image}
              alt={topic.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Title & Metadata */}
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded uppercase tracking-wider">
                Clinical Reference
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#003d4d] tracking-tight">
              {topic.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap">
              <div>
                <span className="font-semibold text-slate-400">Category: </span>
                <span className="font-bold text-slate-800">{topic.categoryName}</span>
              </div>
              <span className="text-slate-300">•</span>
              <div>
                <span className="font-semibold text-slate-400">Type: </span>
                <span className="font-bold text-[#00768a]">{topic.type}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 pt-1 leading-relaxed max-w-3xl">
              {topic.quickSummary}
            </p>
          </div>
        </div>

        {/* Global Expand / Collapse Control */}
        <div className="flex items-center justify-between px-1 text-xs font-semibold text-slate-500">
          <span>Structured Clinical Reference (11 Sections)</span>
          <div className="flex items-center gap-3">
            <button onClick={expandAll} className="hover:text-[#00768a] transition">Expand All</button>
            <span>•</span>
            <button onClick={collapseAll} className="hover:text-[#00768a] transition">Collapse All</button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* THE 11 CLINICAL ACCORDIONS (Exact Flow & Content)         */}
        {/* ========================================================= */}
        <div className="space-y-3">
          
          {/* 01 | OVERVIEW */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('01')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-[#00768a]">01</span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">Overview</h3>
                  <p className="text-[11px] text-slate-500">Definition, clinical context and key points</p>
                </div>
              </div>
              {openSections['01'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['01'] && (
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
                <p>{topic.overview.definition}</p>
                <div className="p-3.5 rounded-lg bg-teal-50 border border-teal-200 text-[#004f5e]">
                  <span className="font-bold block text-xs uppercase tracking-wider mb-0.5">Clinical Pearl</span>
                  {topic.overview.pearl}
                </div>
              </div>
            )}
          </div>

          {/* 02 | CLINICAL PRESENTATION */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('02')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-[#00768a]">02</span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">Clinical Presentation</h3>
                  <p className="text-[11px] text-slate-500">Morphology, distribution and common patterns</p>
                </div>
              </div>
              {openSections['02'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['02'] && (
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3.5 bg-white rounded-lg border border-slate-200">
                    <h4 className="font-bold text-xs text-[#004f5e] mb-2 uppercase">Typical Morphology</h4>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {topic.clinicalPresentation.morphology.map((m, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-teal-600 font-bold">•</span>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 bg-white rounded-lg border border-slate-200">
                    <h4 className="font-bold text-xs text-[#004f5e] mb-2 uppercase">Distribution</h4>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {topic.clinicalPresentation.distribution.map((d, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-teal-600 font-bold">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 bg-white rounded-lg border border-slate-200">
                    <h4 className="font-bold text-xs text-[#004f5e] mb-2 uppercase">Symptoms</h4>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {topic.clinicalPresentation.symptoms.map((s, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-teal-600 font-bold">•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 03 | CAUSATIVE ORGANISMS */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('03')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-[#00768a]">03</span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">Common Causative Organisms</h3>
                  <p className="text-[11px] text-slate-500">Relevant dermatophytes and epidemiology</p>
                </div>
              </div>
              {openSections['03'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['03'] && (
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-xs sm:text-sm text-slate-700 space-y-2">
                <p>{topic.causativeOrganisms.description}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {topic.causativeOrganisms.organisms.map((org, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-white border border-slate-200 font-mono text-xs text-[#004f5e]">
                      {org}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 04 | RISK FACTORS */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('04')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-[#00768a]">04</span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">Risk Factors</h3>
                  <p className="text-[11px] text-slate-500">Environmental, host and lifestyle factors</p>
                </div>
              </div>
              {openSections['04'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['04'] && (
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-xs sm:text-sm text-slate-700">
                <ul className="space-y-1.5">
                  {topic.riskFactors.map((rf, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#00768a] font-bold">•</span>
                      <span>{rf}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 05 | DIAGNOSTIC CONSIDERATIONS */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('05')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-[#00768a]">05</span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">Diagnostic Considerations</h3>
                  <p className="text-[11px] text-slate-500">Clinical assessment and investigations</p>
                </div>
              </div>
              {openSections['05'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['05'] && (
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-xs sm:text-sm text-slate-700 space-y-3">
                <p>{topic.diagnosticConsiderations.clinicalAssessment}</p>
                <div className="space-y-1.5 pt-1">
                  <h4 className="font-bold text-xs uppercase text-[#004f5e]">Recommended Investigations</h4>
                  {topic.diagnosticConsiderations.investigations.map((inv, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inv}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 06 | DIFFERENTIAL DIAGNOSIS */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('06')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-[#00768a]">06</span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">Differential Diagnosis</h3>
                  <p className="text-[11px] text-slate-500">Conditions that may resemble the presentation</p>
                </div>
              </div>
              {openSections['06'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['06'] && (
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-xs sm:text-sm text-slate-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {topic.differentialDiagnosis.map((diff, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <h4 className="font-bold text-xs text-[#004f5e] mb-1">{diff.condition}</h4>
                      <p className="text-xs text-slate-600">{diff.distinguishingFeatures}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 07 | MANAGEMENT PRINCIPLES */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('07')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-[#00768a]">07</span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">Management Principles</h3>
                  <p className="text-[11px] text-slate-500">General approach and key considerations</p>
                </div>
              </div>
              {openSections['07'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['07'] && (
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-xs sm:text-sm text-slate-700">
                <ul className="space-y-2">
                  {topic.managementPrinciples.map((mp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#00768a] shrink-0 mt-0.5" />
                      <span>{mp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 08 | TOPICAL THERAPY */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('08')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-[#00768a]">08</span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">Topical Therapy</h3>
                  <p className="text-[11px] text-slate-500">When topical treatment is considered and therapeutic classes</p>
                </div>
              </div>
              {openSections['08'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['08'] && (
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-xs sm:text-sm text-slate-700 space-y-2">
                <p className="font-medium text-slate-800">{topic.topicalTherapy.indication}</p>
                <ul className="space-y-1.5 pl-2">
                  {topic.topicalTherapy.agents.map((ag, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#00768a] font-bold">•</span>
                      <span>{ag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 09 | SYSTEMIC THERAPY */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('09')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-[#00768a]">09</span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">Systemic Therapy</h3>
                  <p className="text-[11px] text-slate-500">Situations where systemic therapy may be considered</p>
                </div>
              </div>
              {openSections['09'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['09'] && (
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-xs sm:text-sm text-slate-700 space-y-2">
                <p className="font-medium text-slate-800">{topic.systemicTherapy.indication}</p>
                <ul className="space-y-1.5 pl-2">
                  {topic.systemicTherapy.agents.map((ag, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#00768a] font-bold">•</span>
                      <span>{ag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 10 | RECURRENCE & PREVENTION */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('10')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-[#00768a]">10</span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">Recurrence & Prevention</h3>
                  <p className="text-[11px] text-slate-500">Hygiene, adherence and preventive measures</p>
                </div>
              </div>
              {openSections['10'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['10'] && (
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-xs sm:text-sm text-slate-700">
                <ul className="space-y-1.5">
                  {topic.recurrenceAndPrevention.map((rp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>{rp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 11 | PROFESSIONAL REFERENCES */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
            <button
              onClick={() => toggleSection('11')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-sm text-[#00768a]">11</span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">Professional References</h3>
                  <p className="text-[11px] text-slate-500">Guidelines, consensus documents and key literature</p>
                </div>
              </div>
              {openSections['11'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['11'] && (
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-xs sm:text-sm text-slate-700">
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {topic.references.map((rf, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="font-bold">[{i + 1}]</span>
                      <span>{rf}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>

        {/* ========================================================= */}
        {/* RELATED THERAPEUTIC PORTFOLIO (Matching Panel 3 Bottom)   */}
        {/* ========================================================= */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-extrabold text-[#003d4d] uppercase tracking-tight">
              Related Therapeutic Portfolio
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore relevant Ryan Dermaceutics products mapped to {topic.title}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {topic.relatedProducts.map((prod, i) => (
              <div
                key={i}
                className="bg-slate-50/60 rounded-xl p-4 border border-slate-200 flex flex-col justify-between group hover:border-[#00768a] hover:bg-white transition"
              >
                <div>
                  <div className="relative h-28 w-full rounded-lg overflow-hidden mb-3 bg-white border border-slate-100">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-[#00768a] transition-colors">
                    {prod.name}
                  </h4>
                  <p className="text-xs text-[#006070] font-medium mt-0.5">{prod.generic}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{prod.form}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200">
                  <a
                    href="/for-doctors/prescribing-information"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00768a] hover:text-[#004f5e]"
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Back Nav */}
        <div className="pt-4 flex items-center justify-between text-xs">
          <a
            href={`/for-doctors/reference-library/${topic.categorySlug}`}
            className="inline-flex items-center gap-1.5 font-bold text-[#00768a] hover:text-[#004f5e]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to {topic.categoryName} Category
          </a>

          <a
            href="/for-doctors/reference-library"
            className="font-bold text-slate-500 hover:text-[#00768a]"
          >
            Reference Library Home
          </a>
        </div>
      </main>

      <RyanFooter />
    </div>
  );
}
