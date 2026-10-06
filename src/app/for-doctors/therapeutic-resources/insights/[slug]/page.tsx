'use client';

import React from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
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
  AlertCircle,
  FileText,
  Share2,
  Printer
} from 'lucide-react';

import MedicalReferenceView from '@/components/ryan/medical-reference/MedicalReferenceView';
import { MEDICAL_REF_CSS, MEDICAL_REF_HTML } from '@/components/ryan/medical-reference/content';

export default function ClinicalInsightArticlePage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || 'understanding-acne';

  if (slug === 'understanding-acne') {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
        <RyanHeader />
        <main className="py-4">
          <MedicalReferenceView html={MEDICAL_REF_HTML} css={MEDICAL_REF_CSS} />
        </main>
        <RyanFooter />
      </div>
    );
  }

  const article: ClinicalInsight = CLINICAL_INSIGHTS_DATA[slug] || CLINICAL_INSIGHTS_DATA['understanding-acne'];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#e6f4f7] to-[#f8fafc] border-b border-teal-100/60 pt-6 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6 flex-wrap">
            <a href="#" className="hover:text-teal-700 transition">Home</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a href="/for-doctors/therapeutic-resources" className="hover:text-teal-700 transition">For Doctors</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a href="/for-doctors/therapeutic-resources#insights" className="hover:text-teal-700 transition">Clinical Insights</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#00768a] font-semibold line-clamp-1">{article.title}</span>
          </nav>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="px-3 py-1 rounded-full bg-teal-100 text-[#006070] uppercase tracking-wider text-[11px]">
                {article.category}
              </span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1 text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#003d4d] tracking-tight leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center justify-between gap-4 pt-2 border-t border-teal-100/80 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-[#00768a]" />
                <span className="font-semibold text-slate-700">{article.author}</span>
              </div>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
              >
                <Printer className="w-3.5 h-3.5 text-[#00768a]" />
                <span>Print Article</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Article Body */}
      <article className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Executive Summary */}
        <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <span className="font-bold text-[#004f5e] uppercase tracking-wider block mb-1 text-xs">
            Clinical Executive Summary:
          </span>
          {article.summary}
        </div>

        {/* Section 1: Overview */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#003d4d] uppercase tracking-tight flex items-center gap-2">
            <span className="w-2 h-6 bg-[#00768a] rounded-sm" />
            01 | Clinical Overview & Pathophysiology
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {article.overview}
          </p>
        </div>

        {/* Section 2: Clinical Presentation */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#003d4d] uppercase tracking-tight flex items-center gap-2">
            <span className="w-2 h-6 bg-[#00768a] rounded-sm" />
            02 | Clinical Presentation & Diagnostic Clues
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {article.clinicalPresentation}
          </p>

          {slug === 'topical-vs-systemic' && (
            <div className="mt-4 p-4 rounded-2xl bg-white border border-teal-100 shadow-2xs space-y-3">
              <h4 className="text-xs font-bold text-[#004f5e] uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                Typical Clinical Presentations & Route Indications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 text-center p-2.5">
                  <div className="relative h-40 w-full rounded-lg overflow-hidden mb-2">
                    <Image
                      src="/images/clinical-insights/topical-vs-systemic/eczema-localised.jpg"
                      alt="Localised eczema plaque"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="font-bold text-xs text-slate-900">Eczema (Localised Plaque)</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Well-defined localised lesion suitable for targeted topical therapy.</p>
                </div>

                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50 text-center p-2.5">
                  <div className="relative h-40 w-full rounded-lg overflow-hidden mb-2">
                    <Image
                      src="/images/clinical-insights/topical-vs-systemic/tinea-corporis-localised.jpg"
                      alt="Tinea corporis localised"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="font-bold text-xs text-slate-900">Tinea Corporis (Localised)</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Annular scaling lesion manageable with topical antifungals.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Differential Diagnosis */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#003d4d] uppercase tracking-tight flex items-center gap-2">
            <span className="w-2 h-6 bg-[#00768a] rounded-sm" />
            03 | Differential Considerations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {article.differentialDiagnosis.map((diff, i) => (
              <div key={i} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <h4 className="font-bold text-xs text-[#004f5e] mb-1">{diff.condition}</h4>
                <p className="text-[11.5px] text-slate-500 leading-relaxed">{diff.differentiatingFeatures}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Management Principles */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#003d4d] uppercase tracking-tight flex items-center gap-2">
            <span className="w-2 h-6 bg-[#00768a] rounded-sm" />
            04 | Management Principles
          </h2>
          <div className="space-y-2">
            {article.managementPrinciples.map((mp, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700">{mp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Treatment Considerations Accordion */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-[#003d4d] uppercase tracking-tight flex items-center gap-2">
            <span className="w-2 h-6 bg-[#00768a] rounded-sm" />
            05 | Special Clinical Considerations & Red Flags
          </h2>
          <div className="space-y-3">
            {article.treatmentConsiderations.map((tc, i) => (
              <div key={i} className="p-4 rounded-xl bg-amber-50/50 border border-amber-200">
                <h4 className="font-bold text-xs text-amber-900 mb-1">{tc.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{tc.description}</p>
              </div>
            ))}
          </div>

          {slug === 'topical-vs-systemic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="font-bold text-xs text-[#004f5e] mb-2 uppercase tracking-wider">
                  How To Apply & Quantity (Fingertip Unit)
                </div>
                <div className="relative h-32 w-full rounded-lg overflow-hidden mb-2">
                  <Image
                    src="/images/clinical-insights/topical-vs-systemic/fingertip-unit.jpg"
                    alt="Fingertip unit application quantity"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  One Fingertip Unit (FTU ~0.5g) covers approximately two adult handprints. Educate patients on exact dosage to prevent under-treatment or steroid skin atrophy.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <div className="font-bold text-xs text-[#004f5e] mb-2 uppercase tracking-wider">
                  Practical Response: Eczema Resolution
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="relative h-28 rounded-lg overflow-hidden border border-slate-200">
                    <Image
                      src="/images/clinical-insights/topical-vs-systemic/eczema-before.jpg"
                      alt="Localized eczema before therapy"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative h-28 rounded-lg overflow-hidden border border-slate-200">
                    <Image
                      src="/images/clinical-insights/topical-vs-systemic/eczema-after.jpg"
                      alt="Localized eczema after 2-4 weeks therapy"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 font-bold px-1">
                  <span>Baseline Plaque</span>
                  <span>Week 4 Post-Therapy</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 6: References */}
        <div className="p-5 rounded-xl bg-slate-100 border border-slate-200 text-xs space-y-2">
          <h4 className="font-bold text-slate-900 uppercase">Professional Guidelines & References</h4>
          <ul className="space-y-1.5 text-[11px] text-slate-500">
            {article.references.map((ref, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="font-bold">[{i + 1}]</span>
                <span>{ref}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Back Link */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
          <a
            href="/for-doctors/therapeutic-resources#insights"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#00768a] hover:text-[#004f5e]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to All Insights
          </a>

          <a
            href="/for-doctors/prescribing-information"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00768a] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#005f70] transition"
          >
            Explore Prescribing Directory
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </article>

      <RyanFooter />
    </div>
  );
}
