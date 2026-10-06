'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Pipette,
  CheckCircle2,
  Calendar,
  TrendingUp,
  RotateCw,
  AlertTriangle,
  Clock,
  Sparkles,
  ShieldAlert,
  FileText,
  Lightbulb,
  ChevronUp,
  ChevronDown,
  Info,
  Maximize2
} from 'lucide-react';

export default function MinoxidilEducationalCard() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showFullDiagram, setShowFullDiagram] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-teal-200/80 shadow-md overflow-hidden transition-all duration-300">
      {/* 1. CARD TOP BANNER */}
      <div className="bg-[#004f5e] p-5 sm:p-6 text-white flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-teal-200">
            <Pipette className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-300 bg-white/10 px-2.5 py-0.5 rounded">
                PATIENT COUNSELLING & CLINICAL PROTOCOL
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1 text-white">
              Minoxidil – Educational Information
            </h3>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1.5 leading-relaxed max-w-3xl">
              Minoxidil is a well-established topical treatment used for pattern hair loss. It may help reduce hair loss and stimulate regrowth in appropriately selected patients, although the degree of response varies.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowFullDiagram(!showFullDiagram)}
            title="Toggle High-Res Reference Diagram"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Maximize2 className="w-4 h-4" />
            <span className="hidden sm:inline">{showFullDiagram ? 'Interactive View' : 'Original Diagram'}</span>
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label="Toggle section"
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
          >
            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-5 sm:p-7 space-y-6 bg-[#f8fafc]">
          {showFullDiagram ? (
            /* High-Res Original Client Diagram View */
            <div className="rounded-xl overflow-hidden border border-teal-200 bg-white p-2 shadow-inner">
              <div className="relative w-full aspect-[3/2] max-h-[850px]">
                <Image
                  src="/ryan/minoxidil-educational.png"
                  alt="Minoxidil Educational Information High Resolution Diagram"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="p-3 text-center text-xs text-slate-500 bg-slate-50 border-t border-slate-100">
                Official Clinical Structure &bull; Ryan Dermaceutics Dermatology Therapeutic Guides
              </div>
            </div>
          ) : (
            /* Interactive Component Layout Matching The 6 Numbered Boxes */
            <>
              {/* TOP GRID: Boxes 01, 02, 03, 04 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 01. COMMON FORMS AND STRENGTHS */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-teal-100 text-[#006070] font-extrabold text-xs flex items-center justify-center">
                        01
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900 tracking-wider uppercase">
                        Common Forms & Strengths
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                      Minoxidil is available in different formulations and concentrations depending on local approvals.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="p-2.5 rounded-lg bg-teal-50/50 border border-teal-100/70 text-center">
                      <div className="font-bold text-xs text-[#004f5e]">Solution</div>
                      <div className="text-[11px] text-slate-500 font-medium">(e.g. 2%, 5%)</div>
                      <div className="text-[10px] text-teal-700 mt-1 font-semibold">TRESSICLE FORTE</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-teal-50/50 border border-teal-100/70 text-center">
                      <div className="font-bold text-xs text-[#004f5e]">Foam</div>
                      <div className="text-[11px] text-slate-500 font-medium">(e.g. 5%)</div>
                      <div className="text-[10px] text-teal-700 mt-1 font-semibold">TRESSICLE-F LOTION</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                      <div className="font-bold text-xs text-slate-800">Other Formulations</div>
                      <div className="text-[11px] text-slate-500 font-medium">(depending on market)</div>
                      <div className="text-[10px] text-slate-600 mt-1 font-semibold">TRESSICLE 2.5 / 5 TAB</div>
                    </div>
                  </div>
                </div>

                {/* 02. KEY POINTS */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center">
                        02
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900 tracking-wider uppercase">
                        Key Points
                      </h4>
                    </div>

                    <ul className="space-y-2.5 text-xs text-slate-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Helps reduce hair loss and stimulate regrowth.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Most effective in androgenetic alopecia (pattern hair loss).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Works by prolonging the anagen (growth) phase of hair follicles.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Requires consistent, long-term use.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Treatment response varies between individuals.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Not every patient will experience the same degree of regrowth.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 03. WHAT PATIENTS SHOULD EXPECT */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-extrabold text-xs flex items-center justify-center">
                        03
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900 tracking-wider uppercase">
                        What Patients Should Expect
                      </h4>
                    </div>

                    <ul className="space-y-3 text-xs text-slate-700">
                      <li className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Calendar className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <strong className="block text-slate-900">Timeline</strong>
                          <span>Visible improvement usually takes several months (often 3–6 months).</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                          <TrendingUp className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <strong className="block text-slate-900">Partial Response</strong>
                          <span>Improvement may be partial rather than complete.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Sparkles className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <strong className="block text-slate-900">Early Intervention</strong>
                          <span>More effective in early or mild-to-moderate hair loss.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                          <RotateCw className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <strong className="block text-slate-900">Maintenance</strong>
                          <span>Continued use is generally required to maintain benefit.</span>
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <strong className="block text-red-800">Cessation Risk</strong>
                          <span>Stopping treatment may result in gradual loss of treatment benefit.</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 04. APPLICATION CONSIDERATIONS */}
                <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-extrabold text-xs flex items-center justify-center">
                        04
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900 tracking-wider uppercase">
                        Application Considerations
                      </h4>
                    </div>

                    <ul className="space-y-3 text-xs text-slate-700">
                      <li className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Pipette className="w-3.5 h-3.5" />
                        </div>
                        <span>Apply directly to scalp (not just the hair shaft) per directions.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                          <Clock className="w-3.5 h-3.5" />
                        </div>
                        <span>Use recommended frequency (e.g. once or twice daily by formulation).</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                          <ShieldAlert className="w-3.5 h-3.5" />
                        </div>
                        <span>Wash hands after application; avoid eye and sensitive area contact.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span>Use only on intact scalp skin. Avoid applying to broken skin.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <span>Follow drying time &amp; hair washing guidelines before bed.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* BOTTOM ROW: Boxes 05 & 06 */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* 05. POSSIBLE LOCAL EFFECTS */}
                <div className="lg:col-span-6 bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 font-extrabold text-xs flex items-center justify-center">
                      05
                    </span>
                    <h4 className="font-extrabold text-xs text-slate-900 tracking-wider uppercase">
                      Possible Local Effects
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 mb-4">
                    Minoxidil is generally well tolerated, but some patients may experience mild cutaneous responses:
                  </p>

                  <div className="grid grid-cols-5 gap-2 text-center pt-2">
                    <div className="p-2 rounded-lg bg-rose-50/60 border border-rose-100">
                      <div className="w-8 h-8 mx-auto rounded-full bg-white text-rose-600 flex items-center justify-center shadow-2xs mb-1.5 text-xs font-bold">
                        ~
                      </div>
                      <span className="text-[11px] font-bold text-slate-800 block leading-tight">Scalp irritation</span>
                    </div>

                    <div className="p-2 rounded-lg bg-rose-50/60 border border-rose-100">
                      <div className="w-8 h-8 mx-auto rounded-full bg-white text-amber-600 flex items-center justify-center shadow-2xs mb-1.5 text-xs font-bold">
                        &bull;&bull;&bull;
                      </div>
                      <span className="text-[11px] font-bold text-slate-800 block leading-tight">Dryness</span>
                    </div>

                    <div className="p-2 rounded-lg bg-rose-50/60 border border-rose-100">
                      <div className="w-8 h-8 mx-auto rounded-full bg-white text-red-600 flex items-center justify-center shadow-2xs mb-1.5 text-xs font-bold">
                        *
                      </div>
                      <span className="text-[11px] font-bold text-slate-800 block leading-tight">Redness</span>
                    </div>

                    <div className="p-2 rounded-lg bg-rose-50/60 border border-rose-100">
                      <div className="w-8 h-8 mx-auto rounded-full bg-white text-orange-600 flex items-center justify-center shadow-2xs mb-1.5 text-xs font-bold">
                        //
                      </div>
                      <span className="text-[11px] font-bold text-slate-800 block leading-tight">Scaling</span>
                    </div>

                    <div className="p-2 rounded-lg bg-rose-50/60 border border-rose-100">
                      <div className="w-8 h-8 mx-auto rounded-full bg-white text-rose-700 flex items-center justify-center shadow-2xs mb-1.5 text-xs font-bold">
                        !
                      </div>
                      <span className="text-[11px] font-bold text-slate-800 block leading-tight">Itching</span>
                    </div>
                  </div>
                </div>

                {/* 06. IMPORTANT CONSIDERATIONS */}
                <div className="lg:col-span-6 bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 font-extrabold text-xs flex items-center justify-center">
                      06
                    </span>
                    <h4 className="font-extrabold text-xs text-slate-900 tracking-wider uppercase">
                      Important Considerations
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 pt-1">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>Discuss pregnancy, breastfeeding or medical conditions with a physician before use.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>Use with caution in patients with underlying cardiovascular conditions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>Response should be assessed at appropriate interval (e.g. 3–6 months).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>Manage expectations regarding the degree of improvement.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>Minoxidil is a long-term management option, not a quick fix.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* BOTTOM BAR: KEY CLINICAL TAKEAWAY */}
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 border border-teal-200/80 flex items-start sm:items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#006070] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Lightbulb className="w-5 h-5 text-teal-200" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold tracking-widest text-[#006070] uppercase block">
                    KEY CLINICAL TAKEAWAY
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5 leading-snug">
                    Minoxidil can help reduce hair loss and stimulate regrowth in appropriate patients with pattern hair loss, but it requires consistent use, realistic expectations and ongoing treatment to maintain benefit.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
