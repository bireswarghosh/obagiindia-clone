'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import Snowfall from '@/components/ryan/Snowfall';
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
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function ReferenceLibraryTopicDetailPage() {
  const params = useParams();
  const categorySlug = (params?.category as string) || 'fungal-infections';
  const topicSlug = (params?.topic as string) || 'tinea-corporis';

  const categoryData = REFERENCE_LIBRARY_CATEGORIES[categorySlug] || REFERENCE_LIBRARY_CATEGORIES['fungal-infections'];
  const matchedCondition = categoryData?.conditionReferences?.find(c => c.slug === topicSlug) ||
    categoryData?.therapeuticReferences?.find(c => c.slug === topicSlug);

  const baseTopic = SAMPLE_TOPIC_PAGES['tinea-corporis'] || Object.values(SAMPLE_TOPIC_PAGES)[0];
  const initialTopic: LibraryTopic = SAMPLE_TOPIC_PAGES[topicSlug] ? SAMPLE_TOPIC_PAGES[topicSlug] : {
    ...baseTopic,
    slug: topicSlug,
    title: matchedCondition?.title || baseTopic.title,
    categoryName: categoryData?.name || baseTopic.categoryName,
    categorySlug: categorySlug,
    image: matchedCondition?.thumbnail || baseTopic.image,
    quickSummary: matchedCondition?.subtitle ? `${matchedCondition.title}: ${matchedCondition.subtitle}` : baseTopic.quickSummary,
  };

  const [topic, setTopic] = useState<LibraryTopic>(initialTopic);

  React.useEffect(() => {
    fetch('/api/db/library?type=topic')
      .then(res => res.json())
      .then(data => {
        if (data?.success && Array.isArray(data.items)) {
          const found = data.items.find((it: any) => it.slug === topicSlug);
          if (found) {
            setTopic({
              ...found.data,
              slug: found.slug,
              title: found.title,
              image: found.image_url || found.data?.image || '',
            });
          }
        }
      })
      .catch(() => {});
  }, [topicSlug]);

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

  const SECTIONS = [
    { num: '01', label: 'Overview' },
    { num: '02', label: 'Clinical Presentation' },
    { num: '03', label: 'Common Causative Organisms' },
    { num: '04', label: 'Risk Factors' },
    { num: '05', label: 'Diagnostic Considerations' },
    { num: '06', label: 'Differential Diagnosis' },
    { num: '07', label: 'Management Principles' },
    { num: '08', label: 'Topical Therapy' },
    { num: '09', label: 'Systemic Therapy' },
    { num: '10', label: 'Recurrence & Prevention' },
    { num: '11', label: 'Professional References' },
  ];

  const [activeSec, setActiveSec] = useState('01');

  React.useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSec(e.target.id.replace('ref-sec-', ''));
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    SECTIONS.forEach(s => {
      const el = document.getElementById(`ref-sec-${s.num}`);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic.slug]);

  const goToSection = (num: string) => {
    setOpenSections(prev => ({ ...prev, [num]: true }));
    setTimeout(() => {
      document.getElementById(`ref-sec-${num}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 30);
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
      <Snowfall count={45} />

      {/* Breadcrumb & Actions Bar */}
      <section className="bg-white border-b border-teal-100/60 py-3">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between flex-wrap gap-3">
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
            className="btn-fx flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white border border-transparent text-xs font-bold shadow-md transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print this page</span>
          </button>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="py-10 max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        
        {/* ========================================================= */}
        {/* TOPIC HEADER (Matching Right Screen in Nav Flow)          */}
        {/* ========================================================= */}
        <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 text-white bg-[linear-gradient(135deg,#04202b_0%,#0e4f63_35%,#312e81_75%,#6d28d9_100%)] shadow-[0_30px_70px_-28px_rgba(0,37,48,0.7)] flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="h-1.5 w-full absolute top-0 left-0 bg-gradient-to-r from-rose-400 via-amber-300 to-emerald-400" />
          <div className="absolute -top-10 right-1/4 w-64 h-64 rounded-full bg-rose-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 left-1/3 w-72 h-72 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-56 h-56 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

          {/* Lesion Photo */}
          <div className="relative w-40 h-32 sm:w-48 sm:h-36 rounded-2xl overflow-hidden ring-2 ring-white/30 card-glow-anim shrink-0 bg-white/10">
            <Image
              src={topic.image}
              alt={topic.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Title & Metadata */}
          <div className="space-y-2.5 flex-1 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-fuchsia-100 bg-white/15 border border-white/25 px-2.5 py-1 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                Clinical Reference
              </span>
              <span className="text-[10px] font-bold text-teal-100 bg-teal-500/25 border border-teal-300/40 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {topic.categoryName}
              </span>
              <span className="text-[10px] font-bold text-amber-100 bg-amber-500/25 border border-amber-300/40 px-2.5 py-1 rounded-full uppercase tracking-wider">
                {topic.type}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight uppercase bg-gradient-to-r from-white via-cyan-100 to-emerald-200 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
              {topic.title}
            </h1>

            <p className="text-xs sm:text-sm text-teal-50/90 pt-1 leading-relaxed max-w-3xl">
              {topic.quickSummary}
            </p>
          </div>
        </div>

        {/* Global Expand / Collapse Control */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-1 text-xs font-bold text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            Structured Clinical Reference (11 Sections)
          </span>
          <div className="flex items-center gap-2">
            <button onClick={expandAll} className="btn-fx px-3 py-1.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-sm transition-all">Expand All</button>
            <button onClick={collapseAll} className="btn-fx px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 font-bold shadow-sm transition-all">Collapse All</button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* THE 11 CLINICAL ACCORDIONS (Exact Flow & Content)         */}
        {/* ========================================================= */}
        <div className="flex flex-col lg:flex-row lg:gap-6 lg:items-start">
          {/* Animated section rail */}
          <aside className="hidden lg:block lg:w-[220px] lg:flex-shrink-0 sticky top-24 self-start">
            <div className="bg-white/95 backdrop-blur rounded-2xl border border-slate-200 shadow-[0_18px_40px_-22px_rgba(0,61,77,0.55)] p-3">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 pt-1 pb-2.5 mb-1 border-b border-slate-100">
                Sections
              </div>
              <div className="ref-timeline space-y-1.5 max-h-[calc(100vh-13rem)] overflow-y-auto pr-1 pt-2">
              {SECTIONS.map(s => (
                <a
                  key={s.num}
                  href={`#ref-sec-${s.num}`}
                  onClick={(e) => { e.preventDefault(); goToSection(s.num); }}
                  className={`mono-nav-item${activeSec === s.num ? ' active' : ''}`}
                  aria-label={`Go to ${s.label}`}
                >
                  <span className="mono-nav-dot">
                    {activeSec === s.num && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-[#00768a]/40" aria-hidden="true" />
                    )}
                    <span className="relative">{s.num}</span>
                  </span>
                  <span className="mono-nav-label">{s.label}</span>
                </a>
              ))}
              </div>
            </div>
          </aside>

          <div className="space-y-3 min-w-0 w-full lg:flex-1">
          
          {/* 01 | OVERVIEW */}
          <div id="ref-sec-01" className="ref-card scroll-mt-28 bg-white rounded-2xl border overflow-hidden">
            <button
              onClick={() => toggleSection('01')}
              className="ref-head w-full p-4 sm:p-5 flex items-center justify-between text-left transition"
            >
              <div className="flex items-center gap-3">
                <span className="ref-num inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-[11px] font-black shadow-sm">01</span>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900">Overview</h3>
                  <p className="text-[11px] text-slate-500">Definition, clinical context and key points</p>
                </div>
              </div>
              {openSections['01'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['01'] && (
              <div className="p-5 border-t border-slate-100 ref-body bg-slate-50/50 text-sm sm:text-base text-slate-700 space-y-3 leading-relaxed">
                <p>{topic.overview.definition}</p>
                <div className="p-3.5 rounded-lg bg-teal-50 border border-teal-200 text-[#004f5e]">
                  <span className="font-bold block text-xs uppercase tracking-wider mb-0.5">Clinical Pearl</span>
                  {topic.overview.pearl}
                </div>
              </div>
            )}
          </div>

          {/* 02 | CLINICAL PRESENTATION */}
          <div id="ref-sec-02" className="ref-card scroll-mt-28 bg-white rounded-2xl border overflow-hidden">
            <button
              onClick={() => toggleSection('02')}
              className="ref-head w-full p-4 sm:p-5 flex items-center justify-between text-left transition"
            >
              <div className="flex items-center gap-3">
                <span className="ref-num inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-[11px] font-black shadow-sm">02</span>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900">Clinical Presentation</h3>
                  <p className="text-[11px] text-slate-500">Morphology, distribution and common patterns</p>
                </div>
              </div>
              {openSections['02'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['02'] && (
              <div className="p-5 border-t border-slate-100 ref-body bg-slate-50/50 text-sm sm:text-base text-slate-700 space-y-4 leading-relaxed">
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
          <div id="ref-sec-03" className="ref-card scroll-mt-28 bg-white rounded-2xl border overflow-hidden">
            <button
              onClick={() => toggleSection('03')}
              className="ref-head w-full p-4 sm:p-5 flex items-center justify-between text-left transition"
            >
              <div className="flex items-center gap-3">
                <span className="ref-num inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-[11px] font-black shadow-sm">03</span>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900">Common Causative Organisms</h3>
                  <p className="text-[11px] text-slate-500">Relevant dermatophytes and epidemiology</p>
                </div>
              </div>
              {openSections['03'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['03'] && (
              <div className="p-5 border-t border-slate-100 ref-body bg-slate-50/50 text-sm sm:text-base text-slate-700 space-y-2">
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
          <div id="ref-sec-04" className="ref-card scroll-mt-28 bg-white rounded-2xl border overflow-hidden">
            <button
              onClick={() => toggleSection('04')}
              className="ref-head w-full p-4 sm:p-5 flex items-center justify-between text-left transition"
            >
              <div className="flex items-center gap-3">
                <span className="ref-num inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-[11px] font-black shadow-sm">04</span>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900">Risk Factors</h3>
                  <p className="text-[11px] text-slate-500">Environmental, host and lifestyle factors</p>
                </div>
              </div>
              {openSections['04'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['04'] && (
              <div className="p-5 border-t border-slate-100 ref-body bg-slate-50/50 text-sm sm:text-base text-slate-700">
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
          <div id="ref-sec-05" className="ref-card scroll-mt-28 bg-white rounded-2xl border overflow-hidden">
            <button
              onClick={() => toggleSection('05')}
              className="ref-head w-full p-4 sm:p-5 flex items-center justify-between text-left transition"
            >
              <div className="flex items-center gap-3">
                <span className="ref-num inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-[11px] font-black shadow-sm">05</span>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900">Diagnostic Considerations</h3>
                  <p className="text-[11px] text-slate-500">Clinical assessment and investigations</p>
                </div>
              </div>
              {openSections['05'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['05'] && (
              <div className="p-5 border-t border-slate-100 ref-body bg-slate-50/50 text-sm sm:text-base text-slate-700 space-y-3">
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
          <div id="ref-sec-06" className="ref-card scroll-mt-28 bg-white rounded-2xl border overflow-hidden">
            <button
              onClick={() => toggleSection('06')}
              className="ref-head w-full p-4 sm:p-5 flex items-center justify-between text-left transition"
            >
              <div className="flex items-center gap-3">
                <span className="ref-num inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-[11px] font-black shadow-sm">06</span>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900">Differential Diagnosis</h3>
                  <p className="text-[11px] text-slate-500">Conditions that may resemble the presentation</p>
                </div>
              </div>
              {openSections['06'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['06'] && (
              <div className="p-5 border-t border-slate-100 ref-body bg-slate-50/50 text-sm sm:text-base text-slate-700">
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
          <div id="ref-sec-07" className="ref-card scroll-mt-28 bg-white rounded-2xl border overflow-hidden">
            <button
              onClick={() => toggleSection('07')}
              className="ref-head w-full p-4 sm:p-5 flex items-center justify-between text-left transition"
            >
              <div className="flex items-center gap-3">
                <span className="ref-num inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-[11px] font-black shadow-sm">07</span>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900">Management Principles</h3>
                  <p className="text-[11px] text-slate-500">General approach and key considerations</p>
                </div>
              </div>
              {openSections['07'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['07'] && (
              <div className="p-5 border-t border-slate-100 ref-body bg-slate-50/50 text-sm sm:text-base text-slate-700">
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
          <div id="ref-sec-08" className="ref-card scroll-mt-28 bg-white rounded-2xl border overflow-hidden">
            <button
              onClick={() => toggleSection('08')}
              className="ref-head w-full p-4 sm:p-5 flex items-center justify-between text-left transition"
            >
              <div className="flex items-center gap-3">
                <span className="ref-num inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-[11px] font-black shadow-sm">08</span>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900">Topical Therapy</h3>
                  <p className="text-[11px] text-slate-500">When topical treatment is considered and therapeutic classes</p>
                </div>
              </div>
              {openSections['08'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['08'] && (
              <div className="p-5 border-t border-slate-100 ref-body bg-slate-50/50 text-sm sm:text-base text-slate-700 space-y-2">
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
          <div id="ref-sec-09" className="ref-card scroll-mt-28 bg-white rounded-2xl border overflow-hidden">
            <button
              onClick={() => toggleSection('09')}
              className="ref-head w-full p-4 sm:p-5 flex items-center justify-between text-left transition"
            >
              <div className="flex items-center gap-3">
                <span className="ref-num inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-[11px] font-black shadow-sm">09</span>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900">Systemic Therapy</h3>
                  <p className="text-[11px] text-slate-500">Situations where systemic therapy may be considered</p>
                </div>
              </div>
              {openSections['09'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['09'] && (
              <div className="p-5 border-t border-slate-100 ref-body bg-slate-50/50 text-sm sm:text-base text-slate-700 space-y-2">
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
          <div id="ref-sec-10" className="ref-card scroll-mt-28 bg-white rounded-2xl border overflow-hidden">
            <button
              onClick={() => toggleSection('10')}
              className="ref-head w-full p-4 sm:p-5 flex items-center justify-between text-left transition"
            >
              <div className="flex items-center gap-3">
                <span className="ref-num inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-[11px] font-black shadow-sm">10</span>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900">Recurrence & Prevention</h3>
                  <p className="text-[11px] text-slate-500">Hygiene, adherence and preventive measures</p>
                </div>
              </div>
              {openSections['10'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['10'] && (
              <div className="p-5 border-t border-slate-100 ref-body bg-slate-50/50 text-sm sm:text-base text-slate-700">
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
          <div id="ref-sec-11" className="ref-card scroll-mt-28 bg-white rounded-2xl border overflow-hidden">
            <button
              onClick={() => toggleSection('11')}
              className="ref-head w-full p-4 sm:p-5 flex items-center justify-between text-left transition"
            >
              <div className="flex items-center gap-3">
                <span className="ref-num inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-[11px] font-black shadow-sm">11</span>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900">Professional References</h3>
                  <p className="text-[11px] text-slate-500">Guidelines, consensus documents and key literature</p>
                </div>
              </div>
              {openSections['11'] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {openSections['11'] && (
              <div className="p-5 border-t border-slate-100 bg-gradient-to-br from-fuchsia-50/60 via-white to-pink-50/50">
                <ul className="grid grid-cols-1 gap-2.5">
                  {topic.references.map((rf, i) => (
                    <li
                      key={i}
                      className="group flex items-start gap-3 rounded-xl bg-white border border-pink-100 p-3 sm:p-3.5 shadow-[0_8px_20px_-14px_rgba(219,39,119,0.45)] hover:shadow-[0_16px_30px_-16px_rgba(219,39,119,0.55)] hover:border-pink-300 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <span className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-fuchsia-500 to-pink-500 text-white text-[11px] font-black shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm text-slate-700 leading-relaxed font-medium">
                        {rf}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>
        </div>

        {/* ========================================================= */}
        {/* RELATED THERAPEUTIC PORTFOLIO (Matching Panel 3 Bottom)   */}
        {/* ========================================================= */}
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-teal-50/40 to-indigo-50/40 rounded-2xl p-6 sm:p-8 border border-teal-100/80 shadow-[0_18px_42px_-24px_rgba(0,61,77,0.5)] space-y-5">
          <div className="absolute -top-10 right-10 w-48 h-48 rounded-full bg-rose-300/15 blur-3xl pointer-events-none" />
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full mb-2">
              <Pill className="w-3 h-3" />
              Therapeutic Portfolio
            </span>
            <h3 className="text-lg sm:text-xl font-black text-[#003d4d] uppercase tracking-tight">
              Related Therapeutic Portfolio
            </h3>
            <p className="text-sm text-slate-600 mt-0.5 font-medium">
              Explore relevant Ryan Dermaceutics products mapped to {topic.title}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {topic.relatedProducts.map((prod, i) => {
              const accents = [
                { bar: 'from-rose-400 to-pink-500', card: 'from-rose-50 via-white to-pink-50', border: 'border-rose-200/80', chip: 'text-rose-700 bg-rose-100 border-rose-200', title: 'group-hover:text-rose-600', link: 'bg-rose-600 hover:bg-rose-700', glow: 'hover:shadow-[0_20px_42px_-18px_rgba(244,63,94,0.55)]' },
                { bar: 'from-indigo-400 to-violet-500', card: 'from-indigo-50 via-white to-violet-50', border: 'border-indigo-200/80', chip: 'text-indigo-700 bg-indigo-100 border-indigo-200', title: 'group-hover:text-indigo-600', link: 'bg-indigo-600 hover:bg-indigo-700', glow: 'hover:shadow-[0_20px_42px_-18px_rgba(99,102,241,0.55)]' },
                { bar: 'from-emerald-400 to-teal-500', card: 'from-emerald-50 via-white to-teal-50', border: 'border-emerald-200/80', chip: 'text-emerald-700 bg-emerald-100 border-emerald-200', title: 'group-hover:text-emerald-600', link: 'bg-emerald-600 hover:bg-emerald-700', glow: 'hover:shadow-[0_20px_42px_-18px_rgba(16,185,129,0.55)]' },
              ];
              const a = accents[i % accents.length];
              return (
              <div
                key={i}
                className={`group relative overflow-hidden flex flex-col justify-between rounded-2xl bg-gradient-to-br ${a.card} border ${a.border} p-4 shadow-[0_10px_26px_-16px_rgba(0,61,77,0.45)] ${a.glow} hover:-translate-y-1.5 transition-all duration-300`}
              >
                <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${a.bar}`} />
                <div>
                  <div className="relative h-32 w-full rounded-xl overflow-hidden mb-3 bg-white/70 border border-white/80">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <span className={`inline-block text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border mb-1.5 ${a.chip}`}>
                    {prod.form}
                  </span>
                  <h4 className={`font-black text-base leading-snug text-slate-900 ${a.title} transition-colors`}>
                    {prod.name}
                  </h4>
                  <p className="text-sm text-slate-600 font-semibold mt-1 leading-snug">{prod.generic}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/80">
                  <a
                    href="/for-doctors/prescribing-information"
                    className={`btn-fx inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${a.link} text-white text-xs font-black shadow-sm transition-all`}
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
              );
            })}
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
