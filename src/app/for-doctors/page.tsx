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
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  HelpCircle
} from 'lucide-react';

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

  // Helper to render icon by name
  const renderHeroIcon = (iconName: DoctorHeroFeature['iconName']) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5 text-[#00768a]" />;
      case 'FileText':
        return <FileText className="w-5 h-5 text-[#00768a]" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-[#00768a]" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#00768a]" />;
      default:
        return <Stethoscope className="w-5 h-5 text-[#00768a]" />;
    }
  };

  const renderScienceIcon = (iconName: DoctorScienceFeature['iconName']) => {
    switch (iconName) {
      case 'FlaskConical':
        return <FlaskConical className="w-5 h-5 text-[#00768a]" />;
      case 'Network':
        return <Network className="w-5 h-5 text-[#00768a]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#00768a]" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#00768a]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#00768a]" />;
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6">
            <Link href="/home" className="hover:text-[#00768a] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#00768a] font-semibold">For Doctors</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
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
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-teal-900/15 active:scale-95 transition-all"
                >
                  <span>{content.hero.primaryCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={content.hero.secondaryCtaLink}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-teal-50 border border-teal-200 text-[#006070] text-xs font-bold uppercase tracking-wider shadow-xs active:scale-95 transition-all"
                >
                  <span>{content.hero.secondaryCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Doctor Visual */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[460px] aspect-[4/3] sm:aspect-[1.1] rounded-2xl overflow-hidden shadow-xl border-4 border-white/80 bg-white/40">
                <Image
                  src={content.hero.doctorImage || '/ryan/doctors/hero-doctor.png'}
                  alt="Ryan Healthcare Professional"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>

          {/* 4 Feature Badges Underneath Hero */}
          <div className="mt-12 pt-8 border-t border-teal-200/60">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {content.hero.features.map(feat => (
                <div
                  key={feat.id}
                  className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-white/80 backdrop-blur-xs border border-teal-100/90 shadow-2xs hover:shadow-sm hover:border-teal-300 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
                    {renderHeroIcon(feat.iconName)}
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#003d4d] leading-snug uppercase tracking-tight">
                    {feat.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. QUICK ACCESS ("HOW CAN WE SUPPORT YOU?")               */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.quickAccess.cards.map(card => (
              <div
                key={card.id}
                className="group flex flex-col justify-between bg-[#fbfdfd] hover:bg-white rounded-2xl border border-teal-100/80 hover:border-teal-300 p-5 shadow-xs hover:shadow-md transition-all duration-300"
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
      {/* 3. EXPLORE BY THERAPEUTIC AREA                            */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-16 bg-[#f8fafc] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* 8 Circles Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
            {content.therapeuticAreas.categories.map(cat => (
              <Link
                key={cat.id}
                href={cat.link}
                className="group flex flex-col items-center text-center p-3 rounded-2xl hover:bg-white hover:shadow-sm border border-transparent hover:border-teal-100 transition-all duration-300"
              >
                <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden border-2 border-teal-200/80 shadow-xs mb-3 group-hover:scale-105 group-hover:border-[#00768a] transition-all duration-300">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs font-bold text-[#003d4d] leading-snug mb-1 group-hover:text-[#00768a] transition-colors">
                  {cat.name}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#00768a] uppercase tracking-wider group-hover:underline">
                  {cat.actionText} <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SCIENTIFIC APPROACH                                    */}
      {/* ========================================================= */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#e7f3f6] via-[#f1f8fa] to-white border border-teal-100 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Left Image with subtle gradient edge blend */}
              <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-96 w-full">
                <Image
                  src={content.scientificApproach.image || '/ryan/doctors/science-microscope.png'}
                  alt="Scientific Approach"
                  fill
                  className="object-cover object-center"
                />
                <div className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[#f1f8fa]" />
              </div>

              {/* Right Content */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-4">
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
                <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {content.scientificApproach.features.map(f => (
                    <div
                      key={f.id}
                      className="flex flex-col items-start gap-2 p-3 rounded-xl bg-white/90 border border-teal-100/80 shadow-2xs"
                    >
                      <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center border border-teal-100">
                        {renderScienceIcon(f.iconName)}
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-bold text-[#003d4d] uppercase leading-tight">
                        {f.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. FEATURED PROFESSIONAL RESOURCES ("STAY UPDATED")       */}
      {/* ========================================================= */}
      <section className="py-14 sm:py-16 bg-[#f8fafc] border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.stayUpdated.articles.map(art => (
              <Link
                key={art.id}
                href={art.linkUrl}
                className="group flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 hover:border-teal-300 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300"
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
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
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
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
