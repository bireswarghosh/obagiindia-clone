'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import { defaultRyanAboutContent, RyanAboutContent, AboutCard, AboutBadge } from '@/data/ryan-about-content';
import {
  ShieldCheck,
  Target,
  Sparkles,
  TrendingUp,
  Users,
  FlaskConical,
  Award,
  CheckCircle2,
  ArrowRight,
  FileCheck,
  Layers,
  Microscope,
  Lightbulb,
  UserCheck,
  Settings,
  Handshake,
  Building,
  HeartHandshake,
  X,
  ChevronRight,
  Check
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Shared design tokens — keeps every card on this page consistent.    */
/* ------------------------------------------------------------------ */
const EYEBROW = 'text-[11px] font-black tracking-[0.2em] uppercase text-[#00768a]';
const GLASS_CARD =
  "relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md border border-white/70 shadow-[0_10px_30px_rgba(0,61,77,0.08)] hover:shadow-[0_18px_44px_rgba(0,118,138,0.16)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-[#00768a] before:via-teal-400 before:to-cyan-400";
const GLASS_CARD_ROSE =
  "relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md border border-rose-100 shadow-[0_10px_30px_rgba(0,61,77,0.08)] hover:shadow-[0_18px_44px_rgba(190,18,60,0.14)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-gradient-to-r before:from-rose-500 before:via-pink-400 before:to-rose-400";
const TILE =
  'w-11 h-11 rounded-2xl bg-gradient-to-br from-[#00768a] to-cyan-400 text-white flex items-center justify-center shrink-0 shadow-lg shadow-teal-900/25 group-hover:scale-105 transition-transform duration-300';
const TILE_CYAN =
  'w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-400 text-white flex items-center justify-center shrink-0 shadow-lg shadow-cyan-900/25 group-hover:scale-105 transition-transform duration-300';
const TILE_AMBER =
  'w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-400 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-900/25 group-hover:scale-105 transition-transform duration-300';
const TILE_EMERALD =
  'w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/25 group-hover:scale-105 transition-transform duration-300';

const heroIcon = (icon?: string) => {
  switch (icon) {
    case 'Layers':
      return <Layers className="w-4 h-4" />;
    case 'ShieldCheck':
      return <ShieldCheck className="w-4 h-4" />;
    case 'Users':
      return <Users className="w-4 h-4" />;
    default:
      return <Target className="w-4 h-4" />;
  }
};

export default function AboutRyanPage() {
  const [aboutContent, setAboutContent] = useState<RyanAboutContent>(defaultRyanAboutContent);
  const [activeModal, setActiveModal] = useState<{
    title: string;
    badge?: string;
    desc?: string;
    points?: string[];
  } | null>(null);

  useEffect(() => {
    const mergeAbout = (incoming: any): RyanAboutContent => ({
      ...defaultRyanAboutContent,
      ...incoming,
      hero: { ...defaultRyanAboutContent.hero, ...(incoming?.hero || {}) },
      vision: { ...defaultRyanAboutContent.vision, ...(incoming?.vision || {}) },
      approach: { ...defaultRyanAboutContent.approach, ...(incoming?.approach || {}) },
      portfolio: { ...defaultRyanAboutContent.portfolio, ...(incoming?.portfolio || {}) },
      quality: { ...defaultRyanAboutContent.quality, ...(incoming?.quality || {}) },
      ethicsMedinova: { ...defaultRyanAboutContent.ethicsMedinova, ...(incoming?.ethicsMedinova || {}) },
      qualityFramework: Array.isArray(incoming?.qualityFramework) && incoming.qualityFramework.length > 0
        ? incoming.qualityFramework
        : defaultRyanAboutContent.qualityFramework,
      coreValues: Array.isArray(incoming?.coreValues) && incoming.coreValues.length > 0
        ? incoming.coreValues
        : defaultRyanAboutContent.coreValues,
    });

    try {
      const local = localStorage.getItem('ryan_about_content');
      if (local) {
        setAboutContent(mergeAbout(JSON.parse(local)));
      }
    } catch (e) {}

    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data && data.ryanAbout) {
          setAboutContent(mergeAbout(data.ryanAbout));
          localStorage.setItem('ryan_about_content', JSON.stringify(data.ryanAbout));
        }
      })
      .catch(() => {});
  }, []);

  const openCardModal = (card: AboutCard) => {
    setActiveModal({
      title: card.popupTitle || card.title,
      badge: 'CLINICAL EXCELLENCE',
      desc: card.desc,
      points: card.popupPoints || [
        card.desc,
        'Dedicated to evidence-based dermatology standards and physician confidence.',
        'Integrated across product formulation, batch consistency, and doctor partnership.'
      ]
    });
  };

  const openBadgeModal = (badge: AboutBadge) => {
    setActiveModal({
      title: badge.popupTitle || badge.title,
      badge: 'QUALITY & COMPLIANCE',
      desc: badge.desc,
      points: badge.popupPoints || [
        badge.desc || badge.title,
        'Formulated and tested under stringent regulatory guidelines.',
        'Audited manufacturing processes ensuring therapeutic efficacy.'
      ]
    });
  };

  // Quick facts shown under the hero — counts are derived from live content.
  const stats = [
    { value: '53+', label: 'Dermatology Formulations' },
    { value: String((aboutContent.qualityFramework || []).length).padStart(2, '0'), label: 'Quality Pillars' },
    { value: String((aboutContent.coreValues || []).length).padStart(2, '0'), label: 'Core Values' },
    { value: 'WHO-GMP', label: 'Aligned Manufacturing' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            "name": "Ryan Dermaceutics",
            "parentOrganization": {
              "@type": "Organization",
              "name": "Ethics Medinova Private Limited"
            },
            "url": "https://ryandarma.com/about",
            "logo": "https://ryandarma.com/ryan/ryan-logo.png",
            "description": aboutContent.seo?.metaDescription || aboutContent.hero?.description,
            "medicalSpecialty": "Dermatology"
          })
        }}
      />

      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e6f4f7] via-[#f1f9fb] to-[#d7ecf2] border-b border-teal-100/70 pt-8 pb-14 lg:pt-10 lg:pb-20">
        {/* Decorative glows + dotted texture */}
        <div className="pointer-events-none absolute -top-24 -right-16 w-96 h-96 rounded-full bg-teal-300/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-cyan-300/25 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'radial-gradient(rgba(0,118,138,0.14) 1px, transparent 1px)',
            backgroundSize: '26px 26px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 mb-6 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-sm">
            <Link href="/" className="hover:text-[#00768a] font-semibold transition-colors">
              {aboutContent.hero.breadcrumbHome || 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#00768a] font-bold">
              {aboutContent.hero.breadcrumbCurrent || 'About Ryan'}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-[#006070] text-xs font-bold uppercase tracking-widest shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#00768a]" />
                {aboutContent.hero.subtitle || 'A SPECIALIZED FOCUS ON'}
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#003d4d] tracking-tight uppercase leading-[1.02]">
                <span className="bg-gradient-to-r from-[#00768a] via-[#0093ad] to-cyan-500 bg-clip-text text-transparent">
                  {aboutContent.hero.title || 'DERMATOLOGY'}
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
                {aboutContent.hero.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('vision');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00768a] to-[#00a0bd] hover:from-[#005f70] hover:to-[#0089a6] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-teal-900/20 active:scale-95 transition-all cursor-pointer"
                >
                  {aboutContent.hero.ctaText || 'OUR STORY'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/80 backdrop-blur-md hover:bg-teal-50 border border-teal-200 text-[#006070] text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                >
                  Explore Products
                </Link>
              </div>

              {/* Feature badges */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3.5 border-t border-teal-200/60 mt-6">
                {(aboutContent.hero?.badges || []).map((b) => (
                  <div key={b.id} className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00768a] to-cyan-400 text-white flex items-center justify-center shrink-0 shadow-md shadow-teal-900/20">
                      {heroIcon(b.icon)}
                    </div>
                    <span className="text-[10px] font-black uppercase text-slate-700 leading-tight tracking-wide">
                      {b.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Graphic Banner */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="absolute -inset-4 bg-gradient-to-tr from-teal-300/30 to-cyan-200/20 rounded-full blur-3xl pointer-events-none" />
              <div className="relative w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/70 bg-gradient-to-tr from-cyan-100/40 to-teal-50/20 group">
                <div className="relative h-72 sm:h-80 md:h-96 w-full">
                  <Image
                    src={aboutContent.hero.heroImage || '/ryan/about/about_hero_collage.png'}
                    alt="Ryan Dermaceutics - Dermatology Excellence"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003d4d]/70 via-[#003d4d]/10 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-teal-200">
                      Ryan Dermaceutics
                    </div>
                    <div className="text-base sm:text-lg font-black uppercase tracking-tight">
                      A Specialized Dermatology Division
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating quality badge */}
              <div className="absolute -bottom-3 left-2 sm:left-6 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xl">
                <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <div className="leading-tight">
                  <div className="text-[10px] font-black uppercase tracking-wide text-[#005566]">Quality Assured</div>
                  <div className="text-[10px] text-slate-500 font-medium">WHO-GMP aligned facilities</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 1b. QUICK FACTS STRIP                                     */}
      {/* ========================================================= */}
      <section className="relative bg-gradient-to-b from-white via-teal-50/60 to-white border-b border-teal-100/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {stats.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/70 shadow-[0_8px_24px_rgba(0,61,77,0.08)] hover:shadow-[0_16px_36px_rgba(0,118,138,0.18)] hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-xl sm:text-2xl font-black text-[#00768a] tracking-tight">{s.value}</span>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. OUR VISION SECTION                                     */}
      {/* ========================================================= */}
      <section id="vision" className="relative scroll-mt-28 py-14 lg:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Left Graphic: Dart hitting target */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="relative w-full max-w-[280px] h-52 sm:h-60 rounded-3xl overflow-hidden shadow-xl ring-1 ring-teal-100 group bg-gradient-to-br from-slate-50 to-teal-50/40">
                <Image
                  src={aboutContent.vision.targetImage || '/ryan/about/about_vision_target.png'}
                  alt="Precision Target"
                  fill
                  className="object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Middle: Vision Text */}
            <div className="lg:col-span-4 space-y-2.5">
              <span className={EYEBROW}>
                {aboutContent.vision.subtitle || 'OUR VISION'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase leading-snug">
                TO ADVANCE <span className="text-[#00768a]">DERMATOLOGY CARE</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {aboutContent.vision.description}
              </p>
            </div>

            {/* Right: 3 Interactive Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {(aboutContent.vision?.cards || []).map((c) => (
                <div
                  key={c.id}
                  onClick={() => openCardModal(c)}
                  className={GLASS_CARD + ' p-4'}
                >
                  <div>
                    <div className={TILE}>
                      {c.icon === 'Lightbulb' ? (
                        <Lightbulb className="w-5 h-5" />
                      ) : c.icon === 'UserCheck' ? (
                        <UserCheck className="w-5 h-5" />
                      ) : (
                        <TrendingUp className="w-5 h-5" />
                      )}
                    </div>
                    <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider group-hover:text-[#00768a] transition-colors mt-3">
                      {c.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] text-[#00768a] font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Details</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. OUR APPROACH SECTION                                   */}
      {/* ========================================================= */}
      <section className="relative py-14 lg:py-20 bg-[#f4f9fb] border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Left Graphic: Petri dish */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="relative w-full max-w-[280px] h-52 sm:h-60 rounded-3xl overflow-hidden shadow-xl ring-1 ring-teal-100 group bg-gradient-to-br from-slate-50 to-cyan-50/40">
                <Image
                  src={aboutContent.approach.petriImage || '/ryan/about/about_approach_petri.png'}
                  alt="Scientific Formulation Approach"
                  fill
                  className="object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Middle: Approach Text */}
            <div className="lg:col-span-4 space-y-2.5">
              <span className={EYEBROW}>
                {aboutContent.approach.subtitle || 'OUR APPROACH'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase leading-snug">
                {aboutContent.approach.title || 'FOCUS. QUALITY. PARTNERSHIP.'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {aboutContent.approach.description}
              </p>
            </div>

            {/* Right: 3 Interactive Cards */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {(aboutContent.approach?.cards || []).map((c) => (
                <div
                  key={c.id}
                  onClick={() => openCardModal(c)}
                  className={GLASS_CARD + ' p-4'}
                >
                  <div>
                    <div className={TILE_CYAN}>
                      {c.icon === 'Settings' ? (
                        <Settings className="w-5 h-5" />
                      ) : c.icon === 'Handshake' ? (
                        <Handshake className="w-5 h-5" />
                      ) : (
                        <Target className="w-5 h-5" />
                      )}
                    </div>
                    <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider group-hover:text-[#00768a] transition-colors mt-3">
                      {c.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] text-[#00768a] font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Details</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. OUR PORTFOLIO SECTION                                  */}
      {/* ========================================================= */}
      <section className="relative py-14 lg:py-20 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl space-y-2.5">
              <span className={EYEBROW}>
                {aboutContent.portfolio.subtitle || 'OUR PORTFOLIO'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase">
                {aboutContent.portfolio.title || 'A COMPREHENSIVE RANGE FOR DERMATOLOGY'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {aboutContent.portfolio.description}
              </p>
            </div>

            <div>
              <Link
                href={aboutContent.portfolio.ctaLink || '/products'}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#00768a] to-[#00a0bd] hover:from-[#005f70] hover:to-[#0089a6] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-teal-900/20 active:scale-95 transition-all"
              >
                {aboutContent.portfolio.ctaText || 'EXPLORE OUR PRODUCTS'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 4 Product Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(aboutContent.portfolio?.categories || []).map((cat, idx) => (
              <Link
                key={cat.id}
                href={cat.link}
                className="group relative rounded-3xl bg-white/80 backdrop-blur-md border border-white/70 overflow-hidden shadow-[0_10px_30px_rgba(0,61,77,0.08)] hover:shadow-[0_20px_48px_rgba(0,118,138,0.18)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-44 w-full bg-white overflow-hidden border-b border-slate-100">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003d4d]/55 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white/90 backdrop-blur-md text-[#00768a] text-xs font-black shadow-md">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-black uppercase text-slate-900 group-hover:text-[#00768a] transition-colors tracking-wide">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                      {cat.subtext}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#00768a] font-bold">
                    <span>View Formulations</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. QUALITY & MANUFACTURING SECTION                        */}
      {/* ========================================================= */}
      <section className="relative py-14 lg:py-20 bg-[#f4f9fb] border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Left Graphic: Scientist with Microscope */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="relative w-full max-w-[280px] h-52 sm:h-60 rounded-3xl overflow-hidden shadow-xl ring-1 ring-teal-100 group bg-gradient-to-br from-slate-50 to-teal-50/40">
                <Image
                  src={aboutContent.quality.labImage || '/ryan/about/quality_microscope.png'}
                  alt="Quality Laboratory Assurance"
                  fill
                  unoptimized
                  className="object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Middle: Quality Text */}
            <div className="lg:col-span-4 space-y-2.5">
              <span className={EYEBROW}>
                {aboutContent.quality.subtitle || 'QUALITY & MANUFACTURING'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase leading-snug">
                {aboutContent.quality.title || 'COMMITTED TO CONSISTENT QUALITY'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {aboutContent.quality.description}
              </p>
            </div>

            {/* Right: 3 Badges */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {(aboutContent.quality?.badges || []).map((b) => (
                <div
                  key={b.id}
                  onClick={() => openBadgeModal(b)}
                  className={GLASS_CARD + ' p-4'}
                >
                  <div>
                    <div className={TILE_EMERALD}>
                      {b.icon === 'Award' ? (
                        <Award className="w-5 h-5" />
                      ) : b.icon === 'FlaskConical' ? (
                        <FlaskConical className="w-5 h-5" />
                      ) : (
                        <FileCheck className="w-5 h-5" />
                      )}
                    </div>
                    <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider group-hover:text-[#00768a] transition-colors mt-3">
                      {b.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                  <div className="pt-2 text-[10px] text-[#00768a] font-bold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Standards</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. PART OF ETHICS MEDINOVA (A STRONG FOUNDATION)          */}
      {/* ========================================================= */}
      <section id="ethics" className="relative scroll-mt-28 overflow-hidden py-14 lg:py-20 bg-gradient-to-br from-[#003d4d] via-[#005a6e] to-[#00768a]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.10),transparent)] pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-80 h-80 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* Left Content */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-black tracking-[0.2em] uppercase text-teal-200 block">
                {aboutContent.ethicsMedinova.subtitle || 'PART OF ETHICS MEDINOVA'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                {aboutContent.ethicsMedinova.title || 'A STRONG FOUNDATION'}
              </h2>
              <p className="text-xs sm:text-sm text-teal-50/90 leading-relaxed">
                {aboutContent.ethicsMedinova.description}
              </p>

              <div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal({
                      title: 'Ethics Medinova Private Limited',
                      badge: 'PARENT COMPANY',
                      desc: aboutContent.ethicsMedinova.description,
                      points: [
                        'A growing pharmaceutical marketing company committed to quality, integrity, and long-term healthcare value.',
                        'Strong corporate governance and adherence to national and international compliance standards.',
                        'Parent support empowering Ryan Dermaceutics with state-of-the-art logistics, WHO-GMP manufacturing alliances, and ethical medical promotion.'
                      ]
                    });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-teal-50 text-[#004f5e] text-xs font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  {aboutContent.ethicsMedinova.ctaText || 'ABOUT ETHICS MEDINOVA'}
                  <ArrowRight className="w-4 h-4 text-[#00768a]" />
                </button>
              </div>

              {/* 3 Foundation Badges */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(aboutContent.ethicsMedinova?.badges || []).map((b) => (
                  <div
                    key={b.id}
                    className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/90 text-[#00768a] flex items-center justify-center mb-2 shadow-sm">
                      {b.icon === 'Building' ? (
                        <Building className="w-4 h-4" />
                      ) : b.icon === 'TrendingUp' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <HeartHandshake className="w-4 h-4" />
                      )}
                    </div>
                    <div className="text-[10px] font-black uppercase text-white leading-tight">
                      {b.title}
                    </div>
                    <div className="text-[10px] text-teal-100/80 mt-1 leading-snug">
                      {b.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Corporate Headquarters Building Graphic */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg h-64 sm:h-72 lg:h-80 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/25 group">
                <Image
                  src={aboutContent.ethicsMedinova.buildingImage || '/ryan/about/ethics_building.png'}
                  alt="Ethics Medinova Corporate Headquarters"
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002530]/85 via-transparent to-transparent flex items-end p-5">
                  <div className="text-white">
                    <div className="text-xs font-bold text-teal-200 uppercase tracking-widest">
                      CORPORATE HEADQUARTERS
                    </div>
                    <div className="text-base font-bold text-white">
                      Ethics Medinova Private Limited
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. QUALITY FRAMEWORK & CORE VALUES                        */}
      {/* ========================================================= */}
      <section className="relative py-16 lg:py-20 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2.5">
            <span className={EYEBROW + ' block'}>
              OPERATIONAL EXCELLENCE &amp; GUIDING PRINCIPLES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#003d4d] tracking-tight uppercase">
              Our 8-Pillar Quality Framework
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Quality is a culture, not a checkpoint. At Ryan Dermaceutics, dependable dermatological products are the result of interconnected disciplines.
            </p>
          </div>

          {/* 8 Quality Framework Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {(aboutContent.qualityFramework || []).map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveModal({
                    title: item.title,
                    badge: `PILLAR ${item.number}`,
                    desc: item.tagline,
                    points: [
                      item.description,
                      ...(item.focusPoints?.map(p => `Focus: ${p}`) || [])
                    ]
                  });
                }}
                className={GLASS_CARD + ' p-5'}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00768a] to-cyan-400 text-white flex items-center justify-center text-xs font-black shadow-md shadow-teal-900/20">
                      {item.number}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold group-hover:text-[#00768a] transition-colors">
                      Click to expand
                    </span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-black uppercase text-slate-900 group-hover:text-[#00768a] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-[11px] font-semibold text-[#006070] mt-1.5 leading-snug">
                    {item.tagline}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#00768a] font-bold">
                  <span>View Details</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Core Values */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-2.5">
              <span className={EYEBROW + ' block'}>
                VALUES &amp; COMMITMENT
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#003d4d] tracking-tight uppercase">
                Core Values: Driven by Science. Guided by Integrity.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Behind every dermatological concern is a person seeking better skin health, confidence, and quality of life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(aboutContent.coreValues || []).map((val) => (
                <div
                  key={val.id}
                  onClick={() => {
                    setActiveModal({
                      title: val.title,
                      badge: `CORE VALUE ${val.number}`,
                      desc: val.tagline,
                      points: [
                        val.description,
                        `Our Commitment: ${val.commitment}`
                      ]
                    });
                  }}
                  className={GLASS_CARD + ' p-6'}
                >
                  <div>
                    <span className="text-xs font-black text-[#00768a] uppercase tracking-wider block mb-1">
                      {val.number} • {val.title}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#00768a] transition-colors">
                      {val.tagline}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-teal-100 text-[11px] text-teal-900 bg-teal-50/70 p-2.5 rounded-lg font-medium">
                    <strong className="text-[#004f5e]">Commitment:</strong> {val.commitment}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* INTERACTIVE POP-UP MODAL                                  */}
      {/* ========================================================= */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white/95 backdrop-blur-md rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-white/70 relative max-h-[90vh] overflow-y-auto animate-scale-up before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-gradient-to-r before:from-[#00768a] before:via-teal-400 before:to-cyan-400"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer z-10"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-8">
              {activeModal.badge && (
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-[#00768a] to-cyan-400 text-white shadow-sm">
                  {activeModal.badge}
                </span>
              )}
              <h3 className="text-xl sm:text-2xl font-black text-[#003d4d] tracking-tight uppercase leading-snug">
                {activeModal.title}
              </h3>
              {activeModal.desc && (
                <p className="text-sm font-semibold text-[#00768a] leading-relaxed">
                  {activeModal.desc}
                </p>
              )}
            </div>

            {/* Modal Body / Points */}
            <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
              {activeModal.points?.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#00768a] to-cyan-400 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div>{pt}</div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-slate-500 font-medium">
                Ryan Dermaceutics • Science with Purpose
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/products"
                  onClick={() => setActiveModal(null)}
                  className="w-full sm:w-auto px-4 py-2 text-center rounded-xl bg-teal-50 hover:bg-teal-100 text-[#006070] text-xs font-bold uppercase tracking-wider transition"
                >
                  Explore Products
                </Link>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-gradient-to-r from-[#00768a] to-[#00a0bd] hover:from-[#005f70] hover:to-[#0089a6] text-white text-xs font-bold uppercase tracking-wider shadow-md transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <RyanFooter />
    </div>
  );
}
