'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import {
  DEFAULT_DOCTORS_PAGE_CONTENT,
  RyanDoctorsPageContent,
  DoctorHeroFeature,
  DoctorQuickAccessCard,
  DoctorTherapeuticCategory,
  DoctorScienceFeature,
  DoctorResourceCard
} from '@/data/ryan-doctors-data';
import {
  Stethoscope,
  FileText,
  BookOpen,
  Users,
  FlaskConical,
  Network,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  HelpCircle
} from 'lucide-react';

const AREA_ACCENTS = [
  { bar: 'from-rose-400 via-pink-400 to-rose-500', border: 'border-rose-200/80', ring: 'hover:border-rose-300', glow: 'hover:shadow-[0_24px_50px_-12px_rgba(244,63,94,0.45)]', text: 'group-hover:text-rose-600' },
  { bar: 'from-amber-400 via-orange-400 to-amber-500', border: 'border-amber-200/80', ring: 'hover:border-amber-300', glow: 'hover:shadow-[0_24px_50px_-12px_rgba(245,158,11,0.45)]', text: 'group-hover:text-amber-600' },
  { bar: 'from-violet-400 via-purple-400 to-violet-500', border: 'border-violet-200/80', ring: 'hover:border-violet-300', glow: 'hover:shadow-[0_24px_50px_-12px_rgba(139,92,246,0.45)]', text: 'group-hover:text-violet-600' },
  { bar: 'from-sky-400 via-cyan-400 to-sky-500', border: 'border-sky-200/80', ring: 'hover:border-sky-300', glow: 'hover:shadow-[0_24px_50px_-12px_rgba(14,165,233,0.45)]', text: 'group-hover:text-sky-600' },
  { bar: 'from-emerald-400 via-teal-400 to-emerald-500', border: 'border-emerald-200/80', ring: 'hover:border-emerald-300', glow: 'hover:shadow-[0_24px_50px_-12px_rgba(16,185,129,0.45)]', text: 'group-hover:text-emerald-600' },
  { bar: 'from-indigo-400 via-blue-400 to-indigo-500', border: 'border-indigo-200/80', ring: 'hover:border-indigo-300', glow: 'hover:shadow-[0_24px_50px_-12px_rgba(99,102,241,0.45)]', text: 'group-hover:text-indigo-600' },
  { bar: 'from-cyan-400 via-sky-400 to-cyan-500', border: 'border-cyan-200/80', ring: 'hover:border-cyan-300', glow: 'hover:shadow-[0_24px_50px_-12px_rgba(6,182,212,0.45)]', text: 'group-hover:text-cyan-600' },
  { bar: 'from-teal-400 via-cyan-400 to-teal-500', border: 'border-teal-200/80', ring: 'hover:border-teal-300', glow: 'hover:shadow-[0_24px_50px_-12px_rgba(0,118,138,0.45)]', text: 'group-hover:text-teal-700' },
];

const HERO_FEATURE_ACCENTS = [
  { card: 'bg-gradient-to-br from-rose-50 via-white/80 to-white border-rose-200/80 hover:shadow-[0_14px_30px_-10px_rgba(244,63,94,0.4)]', icon: 'bg-gradient-to-br from-rose-500 to-pink-500 text-white', title: 'text-rose-900' },
  { card: 'bg-gradient-to-br from-violet-50 via-white/80 to-white border-violet-200/80 hover:shadow-[0_14px_30px_-10px_rgba(139,92,246,0.4)]', icon: 'bg-gradient-to-br from-violet-500 to-purple-500 text-white', title: 'text-violet-900' },
  { card: 'bg-gradient-to-br from-emerald-50 via-white/80 to-white border-emerald-200/80 hover:shadow-[0_14px_30px_-10px_rgba(16,185,129,0.4)]', icon: 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white', title: 'text-emerald-900' },
  { card: 'bg-gradient-to-br from-amber-50 via-white/80 to-white border-amber-200/80 hover:shadow-[0_14px_30px_-10px_rgba(245,158,11,0.4)]', icon: 'bg-gradient-to-br from-amber-500 to-orange-500 text-white', title: 'text-amber-900' },
];

const SCIENCE_ACCENTS = [
  { card: 'bg-gradient-to-br from-rose-50 via-rose-50/60 to-white border-rose-200/80 hover:shadow-[0_16px_34px_-10px_rgba(244,63,94,0.45)]', icon: 'bg-gradient-to-br from-rose-500 to-pink-500 text-white border-rose-300', title: 'text-rose-900' },
  { card: 'bg-gradient-to-br from-violet-50 via-violet-50/60 to-white border-violet-200/80 hover:shadow-[0_16px_34px_-10px_rgba(139,92,246,0.45)]', icon: 'bg-gradient-to-br from-violet-500 to-purple-500 text-white border-violet-300', title: 'text-violet-900' },
  { card: 'bg-gradient-to-br from-emerald-50 via-emerald-50/60 to-white border-emerald-200/80 hover:shadow-[0_16px_34px_-10px_rgba(16,185,129,0.45)]', icon: 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white border-emerald-300', title: 'text-emerald-900' },
  { card: 'bg-gradient-to-br from-sky-50 via-sky-50/60 to-white border-sky-200/80 hover:shadow-[0_16px_34px_-10px_rgba(14,165,233,0.45)]', icon: 'bg-gradient-to-br from-sky-500 to-blue-500 text-white border-sky-300', title: 'text-sky-900' },
];

export default function ForDoctorsLandingPage() {
  const [content, setContent] = useState<RyanDoctorsPageContent>(DEFAULT_DOCTORS_PAGE_CONTENT);

  // Sync with Admin CMS edits if saved in localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ryan_admin_doctors_page');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.hero) {
          setContent(prev => ({
            ...prev,
            ...parsed,
            hero: { ...prev.hero, ...(parsed.hero || {}) },
            quickAccess: { ...prev.quickAccess, ...(parsed.quickAccess || {}) },
            therapeuticAreas: { ...prev.therapeuticAreas, ...(parsed.therapeuticAreas || {}) },
            scientificApproach: { ...prev.scientificApproach, ...(parsed.scientificApproach || {}) },
            stayUpdated: { ...prev.stayUpdated, ...(parsed.stayUpdated || {}) },
            partnerBanner: { ...prev.partnerBanner, ...(parsed.partnerBanner || {}) }
          }));
        }
      }

      fetch('/api/content')
        .then(res => res.json())
        .then(data => {
          if (data && data.ryanDoctors && data.ryanDoctors.hero) {

            setContent(prev => ({
              ...prev,
              ...data.ryanDoctors,
              hero: { ...prev.hero, ...(data.ryanDoctors.hero || {}) },
              quickAccess: { ...prev.quickAccess, ...(data.ryanDoctors.quickAccess || {}) },
              therapeuticAreas: { ...prev.therapeuticAreas, ...(data.ryanDoctors.therapeuticAreas || {}) },
              scientificApproach: { ...prev.scientificApproach, ...(data.ryanDoctors.scientificApproach || {}) },
              stayUpdated: { ...prev.stayUpdated, ...(data.ryanDoctors.stayUpdated || {}) },
              partnerBanner: { ...prev.partnerBanner, ...(data.ryanDoctors.partnerBanner || {}) }
            }));
          }
        })
        .catch(() => {});
    } catch (e) {
      console.warn('Failed to load local admin overrides for doctors page:', e);
    }
  }, []);

  // Hero image slider
  const heroSlides = [
    {
      src: content.hero.doctorImage || '/ryan/doctors/hero-doctor.png',
      label: 'CLINICAL EXPERTISE',
      caption: 'Supporting Dermatologists with Scientific Rigor',
    },
    {
      src: '/ryan/doctors/science-microscope.png',
      label: 'SCIENTIFIC RIGOUR',
      caption: 'Evidence-Led Dermatology Formulations',
    },
    {
      src: '/ryan/doctors/partner-doctor.png',
      label: 'PROFESSIONAL PARTNERSHIP',
      caption: 'Partnering with Dermatologists Across India',
    },
  ];
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Helper to render icon by name
  const renderHeroIcon = (iconName: DoctorHeroFeature['iconName']) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5" />;
      case 'FileText':
        return <FileText className="w-5 h-5" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5" />;
      case 'Users':
        return <Users className="w-5 h-5" />;
      default:
        return <Stethoscope className="w-5 h-5" />;
    }
  };

  const renderScienceIcon = (iconName: DoctorScienceFeature['iconName']) => {
    switch (iconName) {
      case 'FlaskConical':
        return <FlaskConical className="w-4 h-4" />;
      case 'Network':
        return <Network className="w-4 h-4" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4" />;
      case 'Users':
        return <Users className="w-4 h-4" />;
      default:
        return <ShieldCheck className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Header */}
      <RyanHeader />

      {/* ========================================================= */}
      {/* 1. HERO SECTION (Matching Content_For Doctors.png)        */}
      {/* ========================================================= */}
      <section className="relative bg-gradient-to-r from-[#eaf4f7] via-[#def0f5] to-[#cfe7ee] border-b border-teal-100/90 overflow-hidden pt-8 pb-12 lg:pt-12 lg:pb-16">
        {/* Subtle decorative glow elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-sky-200/40 rounded-full blur-2xl pointer-events-none -z-0" />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[164px] relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link href="/" className="hover:text-[#00768a] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#00768a] font-semibold">For Doctors</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-black tracking-widest text-[#00768a] uppercase block">
                {content.hero.badge}
              </span>

              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#003d4d] tracking-tight uppercase leading-[1.15]"
                dangerouslySetInnerHTML={{ __html: content.hero.heading }}
              />

              <div
                className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal pt-1"
                dangerouslySetInnerHTML={{ __html: content.hero.description }}
              />

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={content.hero.primaryCtaLink}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00768a] via-[#008ca3] to-[#00a3b5] hover:from-[#006070] hover:via-[#00768a] hover:to-[#008ca3] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-teal-700/30 hover:shadow-teal-700/45 active:scale-95 transition-all"
                >
                  <span>{content.hero.primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  href={content.hero.secondaryCtaLink}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-50 via-white to-amber-50 hover:from-rose-100 hover:to-amber-100 border border-rose-200/70 text-[#b23a62] text-xs font-bold uppercase tracking-wider shadow-md shadow-rose-200/40 active:scale-95 transition-all"
                >
                  <span>{content.hero.secondaryCtaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Doctor Visual — 50/50 image slider with side-only 3D shadow */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative w-full aspect-[4/3] sm:aspect-[1.05] rounded-3xl overflow-hidden ring-1 ring-teal-100/90 [box-shadow:22px_0_55px_-18px_rgba(0,61,77,0.55),-14px_0_40px_-22px_rgba(0,61,77,0.4)]">
                {heroSlides.map((slide, i) => (
                  <Image
                    key={slide.src}
                    src={slide.src}
                    alt={slide.caption}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={`object-cover object-center transition-all duration-700 ease-out ${
                      heroSlide === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                  />
                ))}

                {/* Edge blends (left only, no top/bottom shadow) */}
                <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#eaf4f7] via-[#eaf4f7]/30 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#003d4d]/90 via-[#003d4d]/25 to-transparent pointer-events-none" />

                {/* Caption */}
                <div className="absolute bottom-14 left-5 right-5 text-white">
                  <span className="text-[10px] font-bold tracking-widest text-teal-300 uppercase block">
                    {heroSlides[heroSlide].label}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-white/95">
                    {heroSlides[heroSlide].caption}
                  </p>
                </div>

                {/* Left / Right arrows */}
                <button
                  type="button"
                  onClick={() => setHeroSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)}
                  aria-label="Previous slide"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#eaf4f7]/95 hover:bg-[#def0f5] text-[#006070] border border-teal-200/80 backdrop-blur flex items-center justify-center shadow-[0_6px_18px_-6px_rgba(0,61,77,0.35)] active:scale-90 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setHeroSlide(prev => (prev + 1) % heroSlides.length)}
                  aria-label="Next slide"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#eaf4f7]/95 hover:bg-[#def0f5] text-[#006070] border border-teal-200/80 backdrop-blur flex items-center justify-center shadow-[0_6px_18px_-6px_rgba(0,61,77,0.35)] active:scale-90 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Dots */}
                <div className="absolute bottom-5 right-5 z-10 flex items-center gap-1.5">
                  {heroSlides.map((slide, i) => (
                    <button
                      key={slide.src}
                      type="button"
                      onClick={() => setHeroSlide(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        heroSlide === i ? 'w-6 bg-teal-300' : 'w-1.5 bg-white/60 hover:bg-white'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4 Feature Badges Underneath Hero */}
          <div className="mt-12 pt-8 border-t border-teal-200/60">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-6">
              {(content.hero?.features || []).map((feat, idx) => {
                const accent = HERO_FEATURE_ACCENTS[idx % HERO_FEATURE_ACCENTS.length];
                return (
                <div
                  key={feat.id}
                  className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl border shadow-[0_8px_24px_rgba(0,61,77,0.10)] hover:-translate-y-1 transition-all duration-300 ${accent.card}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${accent.icon}`}>
                    {renderHeroIcon(feat.iconName)}
                  </div>
                  <span className={`text-[11px] sm:text-xs font-black leading-snug uppercase tracking-tight ${accent.title}`}>
                    {feat.title}
                  </span>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. QUICK ACCESS ("HOW CAN WE SUPPORT YOU?")               */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-16 bg-gradient-to-b from-teal-50/80 via-[#f8fafc] to-white border-b border-slate-100">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[164px]">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black tracking-widest text-[#00768a] uppercase block mb-1.5">
              {content.quickAccess.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#003d4d] tracking-tight uppercase">
              {content.quickAccess.heading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-normal">
              {content.quickAccess.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {(content.quickAccess?.cards || []).map(card => (
              <div
                key={card.id}
                className="group flex flex-col justify-between bg-white/70 backdrop-blur-md rounded-2xl border border-white/70 p-5 shadow-[0_8px_24px_rgba(0,61,77,0.08)] hover:bg-white/90 hover:shadow-[0_16px_38px_rgba(0,118,138,0.18)] hover:border-teal-200 hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="w-full h-24 rounded-xl overflow-hidden relative bg-teal-50/60 mb-4 border border-teal-100/50">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-sm font-black text-[#003d4d] uppercase tracking-wide mb-1.5">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100">
                  <Link
                    href={card.linkUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00768a] hover:text-[#005566] transition-colors"
                  >
                    <span>{card.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2b. BATCH ANALYSIS & CERTIFICATE OF ANALYSIS (COA) PORTAL */}
      {/* ========================================================= */}
      <section className="py-8 bg-gradient-to-r from-[#003d4d] via-[#005a6e] to-[#00768a] text-white">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[164px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-400 text-slate-900 flex items-center justify-center shrink-0 shadow-lg">
                <FileText className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>WHO-GMP Quality Compliance Assurance</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-white">
                  Batch Analysis Report & COA Portal
                </h3>
                <p className="text-xs text-teal-100 max-w-2xl leading-relaxed">
                  Search, review laboratory assay results, and download authentic vector PDF Certificates of Analysis (COA) for all manufactured pharmaceutical batches.
                </p>
              </div>
            </div>
            <Link
              href="/batch-analysis-report"
              className="btn-fx inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-[#004f5e] text-xs font-black uppercase tracking-wider shadow-lg active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              <span>Access Batch COA Portal</span>
              <ArrowRight className="w-4 h-4 text-[#00768a]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. EXPLORE BY THERAPEUTIC AREA                            */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-16 bg-[#f8fafc] border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[164px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-black tracking-widest text-[#00768a] uppercase block mb-1">
                {content.therapeuticAreas.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase">
                {content.therapeuticAreas.heading}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
                {content.therapeuticAreas.subheading}
              </p>
            </div>

            <Link
              href={content.therapeuticAreas.viewAllLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-teal-300 bg-white hover:bg-teal-50 text-xs font-bold text-[#00768a] uppercase tracking-wider shadow-2xs hover:shadow-xs transition-all self-start md:self-auto shrink-0"
            >
              <span>{content.therapeuticAreas.viewAllText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 8 Circles Grid — 4 large cards per row (2 rows) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-8">
            {(content.therapeuticAreas?.categories || []).map((cat, idx) => {
              const accent = AREA_ACCENTS[idx % AREA_ACCENTS.length];
              return (
              <Link
                key={cat.id}
                href={cat.link}
                className={`group relative flex flex-col overflow-hidden rounded-2xl bg-white border ${accent.border} shadow-[0_10px_30px_-8px_rgba(0,61,77,0.22)] ${accent.glow} ${accent.ring} hover:-translate-y-1.5 transition-all duration-300`}
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${accent.bar}`} />
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-teal-50/60">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003d4d]/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
                <div className="relative flex flex-col items-center text-center px-4 sm:px-5 py-4 sm:py-5 bg-white">
                  <span className={`text-base sm:text-lg font-black text-[#003d4d] ${accent.text} leading-snug mb-1.5 min-h-[2.75rem] flex items-center justify-center transition-colors`}>
                    {cat.name}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#00768a] uppercase tracking-wider group-hover:underline">
                    {cat.actionText} <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SCIENTIFIC APPROACH                                    */}
      {/* ========================================================= */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[164px]">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#e7f3f6] via-[#f1f8fa] to-white border border-teal-100 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Left Image with subtle gradient edge blend */}
              <div className="lg:col-span-6 relative h-64 sm:h-80 lg:h-96 w-full">
                <Image
                  src={content.scientificApproach.image || '/ryan/doctors/science-microscope.png'}
                  alt="Scientific Approach"
                  fill
                  className="object-cover object-center"
                />
                <div className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[#f1f8fa]" />
              </div>

              {/* Right Content */}
              <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 space-y-4">
                <span className="text-xs font-black tracking-widest text-[#00768a] uppercase block">
                  {content.scientificApproach.badge}
                </span>

                <h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#003d4d] tracking-tight uppercase leading-tight"
                  dangerouslySetInnerHTML={{ __html: content.scientificApproach.heading }}
                />

                <p
                  className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-xl"
                  dangerouslySetInnerHTML={{ __html: content.scientificApproach.description }}
                />

                {/* 4 Badges in a row */}
                <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {(content.scientificApproach?.features || []).map((f, idx) => {
                    const accent = SCIENCE_ACCENTS[idx % SCIENCE_ACCENTS.length];
                    return (
                    <div
                      key={f.id}
                      className={`group/card flex flex-col items-start gap-2.5 p-3.5 rounded-2xl border ${accent.card} shadow-[0_8px_20px_rgba(0,61,77,0.08)] hover:-translate-y-1 transition-all duration-300`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-sm ${accent.icon}`}>
                        {renderScienceIcon(f.iconName)}
                      </div>
                      <span className={`text-[10px] sm:text-[11px] font-black uppercase leading-tight ${accent.title}`}>
                        {f.title}
                      </span>
                    </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FEATURED PROFESSIONAL RESOURCES ("STAY UPDATED")       */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-16 bg-gradient-to-b from-white via-teal-50/50 to-[#f8fafc] border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[164px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-black tracking-widest text-[#00768a] uppercase block mb-1">
                {content.stayUpdated.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase">
                {content.stayUpdated.heading}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-normal">
                {content.stayUpdated.subheading}
              </p>
            </div>

            <Link
              href={content.stayUpdated.viewAllLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-teal-300 bg-white hover:bg-teal-50 text-xs font-bold text-[#00768a] uppercase tracking-wider shadow-2xs hover:shadow-xs transition-all self-start md:self-auto shrink-0"
            >
              <span>{content.stayUpdated.viewAllText}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {(content.stayUpdated?.articles || []).map(art => (
              <Link
                key={art.id}
                href={art.linkUrl}
                className="group flex flex-col justify-between bg-white/70 backdrop-blur-md rounded-2xl border border-white/70 overflow-hidden shadow-[0_8px_24px_rgba(0,61,77,0.08)] hover:bg-white/90 hover:border-teal-200 hover:shadow-[0_16px_38px_rgba(0,118,138,0.18)] hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="relative w-full h-36 bg-slate-100 overflow-hidden">
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4 sm:p-5">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 border ${
                        art.tagColor || 'bg-teal-50 text-[#00768a] border-teal-200'
                      }`}
                    >
                      {art.tag}
                    </span>

                    <h3 className="text-xs sm:text-sm font-bold text-[#003d4d] leading-snug group-hover:text-[#00768a] transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                  </div>
                </div>

                <div className="px-4 sm:px-5 pb-4 pt-1 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00768a]">
                    <span>{art.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. LET'S STAY CONNECTED (PARTNERING FOR BETTER SKIN HEALTH) */}
      {/* ========================================================= */}
      <section className="relative bg-gradient-to-r from-[#003d4d] via-[#005a6e] to-[#00768a] text-white overflow-hidden py-14 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent)] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-[164px] relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-black tracking-widest text-teal-200 uppercase block">
                {content.partnerBanner.badge}
              </span>

              <h2
                className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase leading-tight"
                dangerouslySetInnerHTML={{ __html: content.partnerBanner.heading }}
              />

              <p
                className="text-xs sm:text-sm text-teal-50 leading-relaxed font-normal max-w-xl"
                dangerouslySetInnerHTML={{ __html: content.partnerBanner.description }}
              />

              <div className="pt-3 flex flex-wrap items-center gap-3.5">
                <Link
                  href={content.partnerBanner.primaryCtaLink}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-teal-50 text-[#004f5e] text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all"
                >
                  <span>{content.partnerBanner.primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={content.partnerBanner.secondaryCtaLink}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-transparent hover:bg-white/10 border border-white/40 text-white text-xs font-bold uppercase tracking-wider active:scale-95 transition-all"
                >
                  <span>{content.partnerBanner.secondaryCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Doctor with Tablet Visual */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 bg-teal-900/40">
                <Image
                  src={content.partnerBanner.image || '/ryan/doctors/partner-doctor.png'}
                  alt="Partnering for Better Skin Health"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <RyanFooter />
    </div>
  );
}
