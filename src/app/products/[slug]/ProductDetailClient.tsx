'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RyanProduct } from '@/data/ryan-products';
import { ProductPackshot } from '@/components/ryan/ProductPackshot';
import {
  Download,
  ArrowRight,
  ArrowUp,
  ChevronDown,
  Pill,
  AlertTriangle,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Lightbulb,
  Lock,
  Users,
  FileText,
  Layers,
  Printer,
  Info,
  Activity,
  HeartPulse,
  Share2,
  Check,
  Stethoscope,
  ShieldCheck,
  Plus,
  Minus,
  HelpCircle,
  List,
  FlaskConical,
  LayoutGrid,
  Syringe,
  Tag,
  Package,
  Gauge
} from 'lucide-react';

interface ProductDetailClientProps {
  product: RyanProduct;
}

interface MonoSec {
  key: string;
  label: string;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  // ── Section registry (order = numbering = rail order) ─────────────
  const secs: MonoSec[] = [
    { key: 'identity', label: 'Product Identity' },
    { key: 'summary', label: 'Quick Clinical Summary' },
    { key: 'composition', label: 'Composition' },
    { key: 'category', label: 'Therapeutic Category' },
    { key: 'pharmclass', label: 'Pharmacological Class' },
    { key: 'moa', label: 'Mechanism of Action' },
    { key: 'indications', label: 'Indications' },
    ...(product.differentialConsiderations && product.differentialConsiderations.length > 0
      ? [{ key: 'differential', label: 'Differential Considerations' }]
      : []),
    ...(product.treatmentConsiderations && product.treatmentConsiderations.length > 0
      ? [{ key: 'treatment', label: 'Treatment Considerations' }]
      : []),
    ...(product.specialClinicalSituations && product.specialClinicalSituations.length > 0
      ? [{ key: 'specialsit', label: 'Special Clinical Situations' }]
      : []),
    { key: 'dosage', label: 'Dosage & Administration' },
    { key: 'specialpop', label: 'Special Population Considerations' },
    { key: 'contra', label: 'Contraindications' },
    { key: 'warnings', label: 'Warnings & Precautions' },
    { key: 'adverse', label: 'Adverse Effects' },
    { key: 'interactions', label: 'Drug Interactions' },
    { key: 'storage', label: 'Storage & Handling' },
    { key: 'counselling', label: 'Patient Counselling Points' },
    { key: 'pearl', label: 'Clinical Pearl' },
    { key: 'glance', label: 'Product at a Glance' },
    ...(product.relatedProducts.length > 0 ? [{ key: 'related', label: 'Related Products' }] : []),
    { key: 'references', label: 'References' },
  ];
  const numbered = secs.map((s, i) => ({ ...s, num: String(i + 1).padStart(2, '0'), anchor: `mono-${s.key}` }));
  const rowSecs = numbered.filter((s) => s.key !== 'identity');
  const collapsibleKeys = rowSecs.filter((s) => s.key !== 'summary').map((s) => s.key);

  // ── Collapse-all state ────────────────────────────────────────────
  const [openSecs, setOpenSecs] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(collapsibleKeys.map((k) => [k, true]))
  );
  const toggleSec = (key: string) => setOpenSecs((prev) => ({ ...prev, [key]: !prev[key] }));
  const allOpen = collapsibleKeys.every((k) => openSecs[k]);
  const expandAll = () => setOpenSecs(Object.fromEntries(collapsibleKeys.map((k) => [k, true])));
  const collapseAll = () => setOpenSecs(Object.fromEntries(collapsibleKeys.map((k) => [k, false])));
  const isOpen = (key: string) => openSecs[key] !== false;

  // ── Inner accordions (unchanged behavior) ─────────────────────────
  const [openDiffIndex, setOpenDiffIndex] = useState<number | null>(0);
  const [openTreatIndex, setOpenTreatIndex] = useState<number | null>(0);
  const [openSpecIndex, setOpenSpecIndex] = useState<number | null>(0);
  const [fabMenuOpen, setFabMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSec, setActiveSec] = useState('mono-identity');

  // Close the section picker on outside click / Esc
  useEffect(() => {
    if (!fabMenuOpen) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.closest && t.closest('#mono-fab-wrap')) return;
      setFabMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFabMenuOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [fabMenuOpen]);

  const pickSection = (key: string, anchor: string) => {
    setOpenSecs((prev) => ({ ...prev, [key]: true }));
    setFabMenuOpen(false);
    setTimeout(() => {
      document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 30);
  };

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSec(e.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    numbered.forEach((s) => {
      const el = document.getElementById(s.anchor);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);

  const railGo = (e: React.MouseEvent, anchor: string) => {
    e.preventDefault();
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePrint = () => window.print();
  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const secNum = (key: string) => numbered.find((s) => s.key === key)?.num || '';

  const shellTone = (key: string): 'teal' | 'rose' | 'amber' | 'indigo' =>
    key === 'contra' ? 'rose' : key === 'warnings' ? 'amber' : key === 'pearl' ? 'indigo' : 'teal';

  const shellIcon = (key: string): React.ReactNode => {
    const cls = 'w-4 h-4';
    switch (key) {
      case 'composition':
      case 'glance':
      case 'references':
        return <FileText className={cls} />;
      case 'category':
      case 'interactions':
      case 'related':
        return <Layers className={cls} />;
      case 'pharmclass':
      case 'adverse':
        return <Activity className={cls} />;
      case 'moa':
        return <HeartPulse className={cls} />;
      case 'indications':
        return <CheckCircle2 className={cls} />;
      case 'differential':
        return <Stethoscope className={cls} />;
      case 'treatment':
      case 'dosage':
        return <Pill className={cls} />;
      case 'specialsit':
        return <ShieldCheck className={cls} />;
      case 'specialpop':
      case 'counselling':
        return <Users className={cls} />;
      case 'contra':
        return <ShieldAlert className={cls} />;
      case 'warnings':
        return <AlertTriangle className={cls} />;
      case 'storage':
        return <Lock className={cls} />;
      case 'pearl':
        return <Lightbulb className={cls} />;
      default:
        return <FileText className={cls} />;
    }
  };

  const shellLabel = (key: string): string => {
    switch (key) {
      case 'indications':
        return 'Indications & Clinical Applications';
      case 'treatment':
        return 'Treatment Considerations & Clinical Application';
      case 'contra':
        return 'Contraindications & Important Exclusions';
      case 'pearl':
        return 'Clinical Pearl for Healthcare Professionals';
      case 'related':
        return 'Related Ryan Products';
      case 'references':
        return 'References & Clinical Sources';
      default:
        return numbered.find((s) => s.key === key)?.label || key;
    }
  };

  // ── Section bodies ────────────────────────────────────────────────
  const renderBody = (key: string): React.ReactNode => {
    switch (key) {
      case 'summary': {
        const stats: Array<{ label: string; value: string; icon: React.ReactNode; tint: string; ring: string }> = [
          { label: 'Active Ingredient', value: product.genericName.split('+')[0] || product.brandName, icon: <FlaskConical className="w-4 h-4" />, tint: 'bg-teal-50 text-[#00768a]', ring: 'hover:border-teal-300' },
          { label: 'Strength', value: product.strength, icon: <Gauge className="w-4 h-4" />, tint: 'bg-cyan-50 text-cyan-700', ring: 'hover:border-cyan-300' },
          { label: 'Dosage Form', value: product.dosageForm, icon: <LayoutGrid className="w-4 h-4" />, tint: 'bg-violet-50 text-violet-700', ring: 'hover:border-violet-300' },
          { label: 'Route', value: product.route, icon: <Syringe className="w-4 h-4" />, tint: 'bg-emerald-50 text-emerald-700', ring: 'hover:border-emerald-300' },
          { label: 'Therapeutic Category', value: product.therapeuticArea, icon: <Tag className="w-4 h-4" />, tint: 'bg-amber-50 text-amber-700', ring: 'hover:border-amber-300' },
          { label: 'Pack Size', value: product.packSize, icon: <Package className="w-4 h-4" />, tint: 'bg-rose-50 text-rose-700', ring: 'hover:border-rose-300' },
        ];
        return (
          <>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00768a] to-[#004f5e] text-white flex items-center justify-center shadow-md shadow-teal-900/20 shrink-0">
                <Sparkles className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-black text-[#003d4d] tracking-tight leading-tight">
                  Quick Clinical Summary
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                  At-a-glance snapshot of this formulation
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
              {stats.map((s) => (
                <div key={s.label} className={`p-3.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/70 shadow-[0_8px_24px_rgba(0,61,77,0.08)] hover:shadow-[0_12px_32px_rgba(0,118,138,0.18)] hover:bg-white/85 hover:-translate-y-0.5 transition-all group/stat ${s.ring}`}>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center mb-2.5 shadow-sm ${s.tint}`}>
                    {s.icon}
                  </span>
                  <span className="text-[9.5px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                    {s.label}
                  </span>
                  <span className="text-xs font-bold text-[#003d4d] leading-snug line-clamp-2 block">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#003d4d] via-[#005566] to-[#00768a] text-white shadow-md">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start gap-3 relative">
                <span className="w-8 h-8 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4 text-teal-200" />
                </span>
                <p className="text-xs sm:text-[13px] leading-relaxed text-teal-50">
                  <strong className="font-black text-white tracking-wide">Clinical Use: </strong>
                  {product.clinicalSummary}
                </p>
              </div>
            </div>
          </>
        );
      }
      case 'composition':
        return (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
            <span className="text-xs font-bold text-slate-700 block">
              {product.dosageForm === 'Tablet' || product.dosageForm === 'Capsule' ? 'Each unit contains:' : 'Each gram/unit contains:'}
            </span>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {product.composition.map((comp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="ryan-blink-dot" />
                  <span>{comp}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'category':
        return (
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-100">
              <span className="text-[10px] font-bold text-teal-800 uppercase block mb-1">Category</span>
              <h2 className="text-xl font-black text-[#004f5e] leading-tight">{product.therapeuticArea}</h2>
            </div>
            <div className="p-3 rounded-xl bg-cyan-50 border border-cyan-100">
              <span className="text-[10px] font-bold text-cyan-800 uppercase block mb-1">Route & Subtype</span>
              <h2 className="text-xl font-black text-[#006070] leading-tight">{product.routeSubcategory || product.route}</h2>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Administration</span>
              <h2 className="text-xl font-black text-slate-700 leading-tight">{product.route}</h2>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block mb-1">Status</span>
              <h2 className="text-xl font-black text-emerald-700 leading-tight">{product.prescriptionStatus}</h2>
            </div>
          </div>
        );
      case 'pharmclass':
        return (
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
            {product.pharmacologicalClass}
          </p>
        );
      case 'moa':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {product.mechanismOfAction.map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-gradient-to-b from-teal-50/40 to-white border border-teal-100 relative flex flex-col justify-between group hover:border-[#00768a] transition-all">
                <div>
                  <span className="text-[11px] font-black text-[#00768a] bg-teal-100/70 px-2 py-0.5 rounded-full inline-block mb-2">
                    Step {step.step}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-2 leading-snug">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                </div>
                {idx < product.mechanismOfAction.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-teal-200 flex items-center justify-center text-[#00768a] z-10 shadow-xs text-xs font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      case 'indications':
        return (
          <>
            <p className="text-xs text-slate-500 mb-4">
              Indicated for the clinical management of the following dermatological conditions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {product.indications.map((ind, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-[#00768a] shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800 leading-snug">{ind}</span>
                </div>
              ))}
            </div>
          </>
        );
      case 'differential':
        return (
          <>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              Not every presentation is typical. Consider alternative diagnoses when the clinical course is atypical or refractory.
            </p>
            <div className="space-y-4">
              {(product.differentialConsiderations || []).map((diff, idx) => {
                const inner = openDiffIndex === idx;
                return (
                  <div key={diff.id || idx} className={`ryan-inner-acc rounded-2xl border transition-all duration-200 overflow-hidden ${inner ? 'border-[#00768a]/60 shadow-md bg-white ring-2 ring-teal-500/10' : 'border-slate-200/80 bg-slate-50/40 hover:border-slate-300'}`}>
                    <button onClick={() => setOpenDiffIndex(inner ? null : idx)} className="w-full p-4 sm:p-5 flex items-center justify-between text-left transition hover:bg-slate-50/80">
                      <div className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition ${inner ? 'bg-[#00768a] text-white shadow-xs' : 'bg-slate-200 text-slate-700'}`}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900">{diff.condition}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">{inner ? 'Collapse Details' : 'View Differential Clues'}</span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${inner ? 'rotate-180 text-[#00768a]' : 'text-slate-400'}`} />
                      </div>
                    </button>
                    {inner && (
                      <div className="p-4 sm:p-6 border-t border-slate-100 bg-white space-y-5">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                          {diff.clinicalClues && diff.clinicalClues.length > 0 && (
                            <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/40 border border-rose-100">
                              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-rose-800 uppercase mb-3">
                                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                                Clinical Features & Presentation
                              </div>
                              <ul className="space-y-1.5 text-xs text-rose-950">
                                {diff.clinicalClues.map((clue, cIdx) => (
                                  <li key={cIdx} className="flex items-start gap-2">
                                    <span className="ryan-blink-dot" style={{ background: '#f43f5e' }} />
                                    <span className="leading-relaxed">{clue}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {diff.typicalAppearance && (
                            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-700 uppercase mb-3">
                                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                                  Typical Clinical Appearance
                                </div>
                                <p className="text-xs text-slate-700 leading-relaxed">{diff.typicalAppearance}</p>
                              </div>
                              <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                                <span>Dermatological Inspection</span>
                                <span className="text-[#00768a] font-semibold">Morphology Assessment</span>
                              </div>
                            </div>
                          )}
                          {diff.diagnosticApproach && diff.diagnosticApproach.length > 0 && (
                            <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/50 border border-teal-100">
                              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-[#006070] uppercase mb-3">
                                <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                                Key Distinguishing Points & Diagnosis
                              </div>
                              <ul className="space-y-1.5 text-xs text-teal-950">
                                {diff.diagnosticApproach.map((diag, dIdx) => (
                                  <li key={dIdx} className="flex items-start gap-2">
                                    <span className="ryan-blink-dot" />
                                    <span className="leading-relaxed">{diag}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {diff.managementApproach && diff.managementApproach.length > 0 && (
                            <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/50 border border-sky-100">
                              <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-sky-800 uppercase mb-3">
                                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                                Management Considerations
                              </div>
                              <ul className="space-y-1.5 text-xs text-sky-950">
                                {diff.managementApproach.map((mgt, mIdx) => (
                                  <li key={mIdx} className="flex items-start gap-2">
                                    <span className="ryan-blink-dot" style={{ background: '#0284c7' }} />
                                    <span className="leading-relaxed">{mgt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        {diff.clinicalPearl && (
                          <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50/70 via-indigo-50/50 to-teal-50/40 border border-indigo-200/80 flex items-start gap-3 text-xs">
                            <Lightbulb className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-indigo-900 block mb-0.5">Diagnostic Clinical Pearl:</span>
                              <p className="text-indigo-950 leading-relaxed font-medium">{diff.clinicalPearl}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        );
      case 'treatment':
        return (
          <>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              Practical administration guidance, stewardship protocols, and treatment optimization.
            </p>
            <div className="space-y-3">
              {(product.treatmentConsiderations || []).map((treat, idx) => {
                const inner = openTreatIndex === idx;
                return (
                  <div key={idx} className={`ryan-inner-acc rounded-2xl border transition-all duration-200 overflow-hidden ${inner ? 'border-teal-300 bg-white shadow-xs' : 'border-slate-200/80 bg-slate-50/40 hover:border-slate-300'}`}>
                    <button onClick={() => setOpenTreatIndex(inner ? null : idx)} className="w-full p-4 flex items-center justify-between text-left transition hover:bg-slate-50/80">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-black text-[#00768a] bg-teal-100/80 px-2 py-0.5 rounded-md">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{treat.title}</h4>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${inner ? 'rotate-180 text-[#00768a]' : 'text-slate-400'}`} />
                    </button>
                    {inner && (
                      <div className="p-4 sm:p-5 border-t border-slate-100 bg-white space-y-3 text-xs">
                        {treat.keyPoints && treat.keyPoints.length > 0 && (
                          <div>
                            <strong className="text-slate-900 block mb-1">Key Clinical Points:</strong>
                            <ul className="space-y-1 text-slate-700">
                              {treat.keyPoints.map((kp, kIdx) => (
                                <li key={kIdx} className="flex items-start gap-2">
                                  <span className="ryan-blink-dot" />
                                  <span>{kp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {treat.practicalExample && (
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                            <strong className="text-[#004f5e] block mb-0.5">Practical Guidance:</strong>
                            <p>{treat.practicalExample}</p>
                          </div>
                        )}
                        {treat.clinicalPearl && (
                          <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-purple-950 font-medium">
                            <strong>Clinical Pearl: </strong>
                            {treat.clinicalPearl}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        );
      case 'specialsit':
        return (
          <>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              Managing complex cases, vulnerable populations, treatment resistance, and anatomical variants.
            </p>
            <div className="space-y-3">
              {(product.specialClinicalSituations || []).map((spec, idx) => {
                const inner = openSpecIndex === idx;
                return (
                  <div key={idx} className={`ryan-inner-acc rounded-2xl border transition-all duration-200 overflow-hidden ${inner ? 'border-teal-300 bg-white shadow-xs' : 'border-slate-200/80 bg-slate-50/40 hover:border-slate-300'}`}>
                    <button onClick={() => setOpenSpecIndex(inner ? null : idx)} className="w-full p-4 flex items-center justify-between text-left transition hover:bg-slate-50/80">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-black text-slate-700 bg-slate-200 px-2 py-0.5 rounded-md">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">{spec.title}</h4>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${inner ? 'rotate-180 text-[#00768a]' : 'text-slate-400'}`} />
                    </button>
                    {inner && (
                      <div className="p-4 sm:p-5 border-t border-slate-100 bg-white space-y-3 text-xs">
                        {spec.keyPoints && spec.keyPoints.length > 0 && (
                          <div>
                            <strong className="text-slate-900 block mb-1">Key Considerations:</strong>
                            <ul className="space-y-1 text-slate-700">
                              {spec.keyPoints.map((kp, kIdx) => (
                                <li key={kIdx} className="flex items-start gap-2">
                                  <span className="ryan-blink-dot" />
                                  <span>{kp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {spec.managementApproach && (
                          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                            <strong className="text-[#004f5e] block mb-0.5">Management Approach:</strong>
                            <p>{spec.managementApproach}</p>
                          </div>
                        )}
                        {spec.clinicalPearl && (
                          <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-purple-950 font-medium">
                            <strong>Clinical Pearl: </strong>
                            {spec.clinicalPearl}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        );
      case 'dosage':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
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
        );
      case 'specialpop': {
        const pops: Array<[string, string]> = [
          ['01 | Pregnancy:', product.specialPopulations.pregnancy],
          ['02 | Lactation:', product.specialPopulations.lactation],
          ['03 | Paediatric Use:', product.specialPopulations.paediatric],
          ['04 | Geriatric Use:', product.specialPopulations.geriatric],
        ];
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {pops.map(([h, p]) => (
              <div key={h} className="p-4 rounded-xl bg-white border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-1">{h}</span>
                <p className="text-slate-600 leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        );
      }
      case 'contra':
        return (
          <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
            <ul className="space-y-2 text-xs text-rose-950 font-medium">
              {product.contraindications.map((contra, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 shrink-0 mt-1.5" />
                  <span>{contra}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'warnings':
        return (
          <div className="space-y-3 text-xs">
            {product.warningsPrecautions.map((warn, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-0.5">{warn.title}</span>
                <p className="text-slate-600 leading-relaxed">{warn.detail}</p>
              </div>
            ))}
          </div>
        );
      case 'adverse': {
        const groups: Array<[string, string[], string]> = [
          ['Common (≥1%):', product.adverseEffects.common, 'text-amber-700'],
          ['Less Common (<1%):', product.adverseEffects.lessCommon, 'text-slate-700'],
          ['Rare (<0.1%):', product.adverseEffects.rare, 'text-rose-700'],
        ];
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {groups.map(([h, list, cls]) => (
              <div key={h} className="p-4 rounded-xl bg-white border border-slate-200/80">
                <span className={`font-bold block mb-2 ${cls}`}>{h}</span>
                <ul className="space-y-1 text-slate-600">
                  {list.map((eff, idx) => (
                    <li key={idx}>• {eff}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      }
      case 'interactions':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80">
              <span className="font-bold text-slate-900 block mb-1">Topical / Local Interactions:</span>
              <p className="text-slate-600 leading-relaxed">{product.drugInteractions.topical}</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80">
              <span className="font-bold text-slate-900 block mb-1">Systemic Interactions:</span>
              <p className="text-slate-600 leading-relaxed">{product.drugInteractions.systemic}</p>
            </div>
          </div>
        );
      case 'storage':
        return (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
              {product.storageHandling.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="ryan-blink-dot" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      case 'counselling':
        return (
          <div className="space-y-3 text-xs">
            {product.patientCounselling.map((qa, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200/80">
                <span className="font-bold text-slate-900 block mb-1 flex items-center gap-2">
                  <span className="text-[#00768a] font-black">{String(idx + 1).padStart(2, '0')}.</span>
                  {qa.question}
                </span>
                <p className="text-slate-600 leading-relaxed pl-6">{qa.answer}</p>
              </div>
            ))}
          </div>
        );
      case 'pearl':
        return (
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-teal-50 border border-indigo-200">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Lightbulb className="w-5 h-5" />
            </div>
            <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">“{product.clinicalPearl}”</p>
          </div>
        );
      case 'glance':
        return (
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
        );
      case 'related':
        return (
          <>
            <div className="flex items-center justify-end mb-4">
              <Link href="/products" className="text-xs font-bold text-[#00768a] hover:text-[#005f70] flex items-center gap-1">
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
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{rel.generic}</p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center text-xs font-bold text-[#00768a]">
                    <span>Explore Monograph</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </>
        );
      case 'references':
        return (
          <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/90 text-xs">
            <ol className="list-decimal list-inside space-y-1 text-slate-600">
              {product.references.map((ref, idx) => (
                <li key={idx} className="leading-relaxed">{ref}</li>
              ))}
            </ol>
          </div>
        );
      default:
        return null;
    }
  };

  const toneOf = (key: string): 'teal' | 'rose' | 'amber' | 'indigo' =>
    key === 'contra' ? 'rose' : key === 'warnings' ? 'amber' : key === 'pearl' ? 'indigo' : 'teal';
  const toneText = (tone: string) =>
    tone === 'rose' ? 'text-rose-800' : tone === 'amber' ? 'text-amber-700' : tone === 'indigo' ? 'text-indigo-700' : 'text-[#00768a]';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Mobile chip nav */}
      <nav className="lg:hidden sticky top-20 z-30 -mx-4 px-4 py-2 bg-[#f8fafc]/95 backdrop-blur border-b border-slate-200/70 mb-6" aria-label="Section navigation">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {numbered.map((s) => (
            <a
              key={s.key}
              href={`#${s.anchor}`}
              onClick={(e) => railGo(e, s.anchor)}
              className={`flex-none inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition ${
                activeSec === s.anchor
                  ? 'bg-[#003d4d] border-[#003d4d] text-white'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <span className={activeSec === s.anchor ? 'text-teal-300' : 'text-[#00768a]'}>{s.num}</span>
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {/* 01 · Product Identity (full width) */}
      <section id="mono-identity" className="scroll-mt-28 bg-gradient-to-br from-[#003d4d] via-[#005566] to-[#00768a] rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[11px] font-bold uppercase tracking-widest text-teal-200">
              <span className={`w-2 h-2 rounded-full ${product.hasFullMonograph ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              {product.hasFullMonograph ? 'OFFICIAL CLINICAL MONOGRAPH • PART 1 RELEASE' : 'PRESCRIBING SUMMARY • PART 2 EDITORIAL REVIEW'}
            </div>
            <p className="text-[11px] font-black tracking-widest text-teal-200/80 uppercase">Product Monograph</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase">
              {product.brandName}
            </h1>
            <p className="text-lg sm:text-xl font-medium text-teal-100">{product.genericName}</p>
            <p className="text-xs sm:text-sm text-teal-100/80 max-w-2xl leading-relaxed">{product.tagline}</p>
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 font-semibold text-white">{product.therapeuticArea}</span>
              <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 font-semibold text-white">{product.route}</span>
              <span className="px-3 py-1 rounded-full bg-white/15 border border-white/20 font-semibold text-white">{product.dosageForm}</span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 font-semibold text-emerald-200">{product.prescriptionStatus}</span>
              {product.hasFullMonograph && (
                <span className="px-3 py-1 rounded-full bg-teal-400/25 border border-teal-300/40 font-semibold text-teal-100 flex items-center gap-1.5 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-emerald-300" />
                  Full Monograph Verified
                </span>
              )}
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-4">
            <div className="w-full max-w-xs rounded-2xl bg-white border border-white/40 p-6 flex flex-col items-center justify-center text-center shadow-lg">
              <ProductPackshot product={product} />
              <span className="text-sm font-black text-[#004f5e] uppercase tracking-wider line-clamp-1 mt-3">
                {product.brandName}
              </span>
              <span className="text-xs text-slate-500 font-medium mt-0.5">
                {product.strength} • {product.packSize}
              </span>
            </div>
            <div id="monograph-pdf" className="w-full max-w-xs flex flex-col gap-2.5 scroll-mt-28">
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

      {!product.hasFullMonograph && (
        <section className="mt-6 bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 text-amber-900 flex items-start gap-3.5 text-xs">
          <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-amber-950">
              Standard Prescribing Summary Active • Full Clinical Monograph Coming in Part 2 Release
            </h4>
            <p className="text-amber-800 leading-relaxed">
              This summary is compiled from registered prescribing data. The comprehensive multi-section monograph containing differential diagnostic accordions, stewardship algorithms, and extended pearls will be activated upon receipt of Part 2 clinical documentation.
            </p>
          </div>
        </section>
      )}

      {/* Rows: rail pill beside its card number */}
      <div className="mono-sync mt-6">
        {rowSecs.map((s) => {
          const collapsible = s.key !== 'summary';
          const open = collapsible ? isOpen(s.key) : true;
          const tone = toneOf(s.key);
          return (
            <div key={s.key} className="mono-row">
              <div className="mono-rail">
                <a
                  href={`#mono-${s.key}`}
                  onClick={(e) => railGo(e, `mono-${s.key}`)}
                  className={`mono-nav-item${activeSec === `mono-${s.key}` ? ' active' : ''}`}
                  aria-label={`Go to ${s.label}`}
                >
                  <span className="mono-nav-dot">
                    {activeSec === `mono-${s.key}` && (
                      <span className="absolute inset-0 rounded-full animate-ping bg-[#00768a]/40" aria-hidden="true" />
                    )}
                    <span className="relative">{s.num}</span>
                  </span>
                  <span className="mono-nav-label">{s.label}</span>
                </a>
              </div>
              <div className="mono-cell">
                {collapsible ? (
                  <section id={s.anchor} className="mono-section scroll-mt-28 bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
                    <button
                      onClick={() => toggleSec(s.key)}
                      aria-expanded={open}
                      className="w-full p-5 sm:p-6 flex items-center gap-3 text-left hover:bg-slate-50/60 transition"
                    >
                      <span className="w-8 h-8 rounded-full bg-[#003d4d] text-white flex items-center justify-center text-[11px] font-black shrink-0">
                        {s.num}
                      </span>
                      <span className={`flex items-center gap-2 text-xs sm:text-sm font-black tracking-widest uppercase ${toneText(tone)}`}>
                        {shellIcon(s.key)}
                        {shellLabel(s.key)}
                      </span>
                      <span className="ml-auto w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180 text-[#00768a]' : ''}`} />
                      </span>
                    </button>
                    {open && <div className="px-5 sm:px-6 pb-5 sm:pb-6">{renderBody(s.key)}</div>}
                  </section>
                ) : (
                  <section id={s.anchor} className="mono-section scroll-mt-28 bg-gradient-to-b from-teal-50/60 via-white to-white rounded-2xl border border-teal-100/70 p-5 sm:p-7 shadow-xs">
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="w-6 h-6 rounded-full bg-[#003d4d] text-white flex items-center justify-center text-[10px] font-black shrink-0">
                        {s.num}
                      </span>
                      <span className="text-[10px] font-black tracking-widest text-[#00768a] uppercase">
                        Clinical snapshot
                      </span>
                    </div>
                    {renderBody(s.key)}
                  </section>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Help band (full width) */}
      <section className="mt-6 bg-gradient-to-r from-teal-50 via-cyan-50/50 to-white rounded-2xl border border-teal-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00768a] text-white flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">Need prescribing support for {product.brandName}?</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Connect with our medical information team for monographs, safety queries and clinical guidance.
            </p>
          </div>
        </div>
        <Link
          href="/for-doctors/medical-information"
          className="py-2.5 px-4 rounded-xl bg-white hover:bg-teal-50 border border-teal-300 text-[#006070] text-xs font-bold whitespace-nowrap transition flex items-center justify-center gap-2 shadow-2xs hover:shadow-xs"
        >
          Contact Medical Information
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>

      {/* Floating actions: section picker + back to top (left side) */}
      <div id="mono-fab-wrap" className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
        {fabMenuOpen && (
          <div className="absolute bottom-14 left-0 w-[19rem] max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
            <p className="px-4 pt-3 pb-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
              Expand section
            </p>
            <div className="max-h-[46vh] overflow-y-auto px-2 pb-2">
              {numbered
                .filter((s) => s.key !== 'identity' && s.key !== 'summary')
                .map((s) => {
                  const opened = openSecs[s.key] !== false;
                  return (
                    <button
                      key={s.key}
                      onClick={() => pickSection(s.key, s.anchor)}
                      className="w-full flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-teal-50/70 transition text-left"
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                          opened ? 'bg-[#00768a] text-white' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {s.num}
                      </span>
                      <span className="flex-1 text-xs font-semibold text-slate-700 truncate">{s.label}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          opened ? 'bg-teal-100 text-[#006070]' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {opened ? 'Open' : 'Shut'}
                      </span>
                    </button>
                  );
                })}
            </div>
            <div className="flex items-center gap-2 p-2 border-t border-slate-100">
              <button
                onClick={() => {
                  expandAll();
                  setFabMenuOpen(false);
                }}
                className="flex-1 py-2 rounded-xl bg-[#003d4d] hover:bg-[#005566] text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Expand all
              </button>
              <button
                onClick={() => {
                  collapseAll();
                  setFabMenuOpen(false);
                }}
                className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Minus className="w-3.5 h-3.5" />
                Collapse all
              </button>
            </div>
          </div>
        )}
        <button
          onClick={() => setFabMenuOpen((v) => !v)}
          aria-expanded={fabMenuOpen}
          aria-label="Choose sections to expand"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#003d4d] hover:bg-[#005566] text-white text-xs font-bold shadow-xl transition active:scale-95"
        >
          <List className="w-3.5 h-3.5" />
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
        {showTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="w-10 h-10 rounded-full bg-white border border-slate-200 text-[#00768a] shadow-xl flex items-center justify-center hover:bg-teal-50 transition active:scale-95"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
