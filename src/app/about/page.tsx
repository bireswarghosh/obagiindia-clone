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
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Heart, 
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
  ExternalLink, 
  ChevronRight,
  BookOpen,
  Check
} from 'lucide-react';

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
            "url": "https://obagiindia.vercel.app/about",
            "logo": "https://obagiindia.vercel.app/ryan/ryan-logo.png",
            "description": aboutContent.seo?.metaDescription || aboutContent.hero?.description,
            "medicalSpecialty": "Dermatology"
          })
        }}
      />

      {/* ========================================================= */}
      {/* 1. HERO SECTION (Exact Blueprint: About Ryan.png)         */}
      {/* ========================================================= */}
      <section className="relative bg-gradient-to-r from-[#eaf4f7] via-[#def0f5] to-[#cbe9f0] border-b border-teal-100/90 overflow-hidden py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <Link href="/" className="hover:text-[#00768a] font-medium transition-colors">
                  {aboutContent.hero.breadcrumbHome || 'Home'}
                </Link>
                <span>&gt;</span>
                <span className="text-[#00768a] font-bold">
                  {aboutContent.hero.breadcrumbCurrent || 'About Ryan'}
                </span>
              </div>

              <span className="text-[11px] sm:text-xs font-black tracking-widest text-[#00768a] uppercase block">
                {aboutContent.hero.subtitle || 'A SPECIALIZED FOCUS ON'}
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#003d4d] tracking-tight uppercase leading-none">
                {aboutContent.hero.title || 'DERMATOLOGY'}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal pt-1">
                {aboutContent.hero.description}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('vision');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-teal-900/10 active:scale-95 transition-all cursor-pointer"
                >
                  {aboutContent.hero.ctaText || 'OUR STORY'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-teal-50 border border-teal-200 text-[#006070] text-xs font-bold uppercase tracking-wider shadow-2xs transition-all"
                >
                  Explore Products
                </Link>
              </div>

              {/* 4 Feature Badges Underneath */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-teal-200/60 mt-6">
                {(aboutContent.hero?.badges || []).map((b) => (
                  <div key={b.id} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-teal-100/90 text-[#00768a] flex items-center justify-center shrink-0 shadow-2xs">
                      {b.icon === 'Layers' ? (
                        <Layers className="w-4 h-4" />
                      ) : b.icon === 'ShieldCheck' ? (
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      ) : b.icon === 'Users' ? (
                        <Users className="w-4 h-4 text-[#00768a]" />
                      ) : (
                        <Target className="w-4 h-4 text-[#00768a]" />
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase text-slate-800 block leading-tight">
                        {b.title.split(' ')[0]}
                      </span>
                      <span className="text-[9px] text-slate-500 uppercase font-medium">
                        {b.title.split(' ').slice(1).join(' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Graphic Banner (Authentic High-Res Collage with soft feathering) */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-gradient-to-tr from-cyan-100/40 to-teal-50/20 group">
                <div className="relative h-72 sm:h-84 md:h-96 w-full">
                  <Image
                    src={aboutContent.hero.heroImage || '/ryan/about/about_hero_collage.png'}
                    alt="Ryan Dermaceutics - Dermatology Excellence"
                    fill
                    className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
                    priority
                  />
                  {/* Subtle organic fade overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-950/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. OUR VISION SECTION (Target graphic + 3 Vision Cards)   */}
      {/* ========================================================= */}
      <section id="vision" className="py-14 lg:py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Graphic: Dart hitting target */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="relative w-full max-w-[280px] h-52 sm:h-60 rounded-2xl overflow-hidden shadow-md border border-teal-100/80 group bg-slate-50">
                <Image
                  src={aboutContent.vision.targetImage || '/ryan/about/about_vision_target.png'}
                  alt="Precision Target"
                  fill
                  className="object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Middle: Vision Text */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
                {aboutContent.vision.subtitle || 'OUR VISION'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase leading-snug">
                TO ADVANCE <span className="text-[#00768a]">DERMATOLOGY CARE</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {aboutContent.vision.description}
              </p>
            </div>

            {/* Right: 3 Interactive Cards (Innovation, Trust, Growth) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(aboutContent.vision?.cards || []).map((c) => (
                <div
                  key={c.id}
                  onClick={() => openCardModal(c)}
                  className="p-4 rounded-xl bg-gradient-to-b from-white to-[#f7fbfd] border border-teal-100/90 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-teal-50 text-[#00768a] flex items-center justify-center mb-3 group-hover:bg-[#00768a] group-hover:text-white transition-colors shadow-2xs">
                      {c.icon === 'Lightbulb' ? (
                        <Lightbulb className="w-5 h-5" />
                      ) : c.icon === 'UserCheck' ? (
                        <UserCheck className="w-5 h-5" />
                      ) : (
                        <TrendingUp className="w-5 h-5" />
                      )}
                    </div>
                    <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider group-hover:text-[#00768a] transition-colors">
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
      {/* 3. OUR APPROACH SECTION (Petri dish + 3 Approach Cards)   */}
      {/* ========================================================= */}
      <section className="py-14 lg:py-16 bg-[#f4f9fb] border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Graphic: Petri dish */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="relative w-full max-w-[280px] h-52 sm:h-60 rounded-2xl overflow-hidden shadow-md border border-teal-100/80 group bg-slate-50">
                <Image
                  src={aboutContent.approach.petriImage || '/ryan/about/about_approach_petri.png'}
                  alt="Scientific Formulation Approach"
                  fill
                  className="object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Middle: Approach Text */}
            <div className="lg:col-span-4 space-y-2">
              <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
                {aboutContent.approach.subtitle || 'OUR APPROACH'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase leading-snug">
                {aboutContent.approach.title || 'FOCUS. QUALITY. PARTNERSHIP.'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {aboutContent.approach.description}
              </p>
            </div>

            {/* Right: 3 Interactive Cards (Dermatology Focus, Quality, Partnership) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(aboutContent.approach?.cards || []).map((c) => (
                <div
                  key={c.id}
                  onClick={() => openCardModal(c)}
                  className="p-4 rounded-xl bg-white border border-teal-100/90 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-cyan-50 text-[#006070] flex items-center justify-center mb-3 group-hover:bg-[#00768a] group-hover:text-white transition-colors shadow-2xs">
                      {c.icon === 'Settings' ? (
                        <Settings className="w-5 h-5" />
                      ) : c.icon === 'Handshake' ? (
                        <Handshake className="w-5 h-5" />
                      ) : (
                        <Target className="w-5 h-5" />
                      )}
                    </div>
                    <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider group-hover:text-[#00768a] transition-colors">
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
      {/* 4. OUR PORTFOLIO SECTION (4 Product Categories)           */}
      {/* ========================================================= */}
      <section className="py-14 lg:py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl space-y-2">
              <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all"
              >
                {aboutContent.portfolio.ctaText || 'EXPLORE OUR PRODUCTS'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 4 Product Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(aboutContent.portfolio?.categories || []).map((cat) => (
              <Link
                key={cat.id}
                href={cat.link}
                className="group rounded-2xl bg-[#f8fafc] border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-xl hover:border-teal-300 transition-all flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-44 w-full bg-white overflow-hidden border-b border-slate-100">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs sm:text-sm font-black uppercase text-slate-900 group-hover:text-[#00768a] transition-colors tracking-wide">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                      {cat.subtext}
                    </p>
                  </div>
                  <div className="pt-4 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-[#00768a] font-bold">
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
      <section className="py-14 lg:py-16 bg-[#f4f9fb] border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Graphic: Scientist with Microscope */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="relative w-full max-w-[280px] h-52 sm:h-60 rounded-2xl overflow-hidden shadow-md border border-teal-100/80 group bg-slate-50">
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
            <div className="lg:col-span-4 space-y-2">
              <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
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
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(aboutContent.quality?.badges || []).map((b) => (
                <div
                  key={b.id}
                  onClick={() => openBadgeModal(b)}
                  className="p-4 rounded-xl bg-white border border-teal-100/90 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-teal-50 text-[#00768a] flex items-center justify-center mb-3 group-hover:bg-[#00768a] group-hover:text-white transition-colors shadow-2xs">
                      {b.icon === 'Award' ? (
                        <Award className="w-5 h-5" />
                      ) : b.icon === 'FlaskConical' ? (
                        <FlaskConical className="w-5 h-5" />
                      ) : (
                        <FileCheck className="w-5 h-5" />
                      )}
                    </div>
                    <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider group-hover:text-[#00768a] transition-colors">
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
      <section id="ethics" className="py-14 lg:py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
                {aboutContent.ethicsMedinova.subtitle || 'PART OF ETHICS MEDINOVA'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase">
                {aboutContent.ethicsMedinova.title || 'A STRONG FOUNDATION'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-teal-200 text-[#006070] text-xs font-bold uppercase tracking-wider shadow-2xs transition-all cursor-pointer"
                >
                  {aboutContent.ethicsMedinova.ctaText || 'ABOUT ETHICS MEDINOVA'}
                  <ArrowRight className="w-4 h-4 text-[#00768a]" />
                </button>
              </div>

              {/* 3 Foundation Badges */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-100">
                {(aboutContent.ethicsMedinova?.badges || []).map((b) => (
                  <div key={b.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 text-[#00768a] flex items-center justify-center mb-2">
                      {b.icon === 'Building' ? (
                        <Building className="w-4 h-4" />
                      ) : b.icon === 'TrendingUp' ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <HeartHandshake className="w-4 h-4" />
                      )}
                    </div>
                    <div className="text-[10px] font-black uppercase text-slate-800 leading-tight">
                      {b.title}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                      {b.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Corporate Headquarters Building Graphic */}
            <div className="lg:col-span-7 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden shadow-xl border-2 border-slate-100 group">
                <Image
                  src={aboutContent.ethicsMedinova.buildingImage || '/ryan/about/ethics_building.png'}
                  alt="Ethics Medinova Corporate Headquarters"
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent flex items-end p-5">
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
      {/* 7. QUALITY FRAMEWORK & CORE VALUES ACCORDION/CARDS (DOCX) */}
      {/* ========================================================= */}
      <section className="py-16 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
              OPERATIONAL EXCELLENCE & GUIDING PRINCIPLES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase">
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
                className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-teal-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-[#00768a] bg-teal-50 px-2.5 py-1 rounded-md">
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

          {/* Core Values 6 Cards */}
          <div className="mt-16 pt-12 border-t border-slate-200">
            <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
              <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
                VALUES & COMMITMENT
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase">
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
                  className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-teal-300 transition-all cursor-pointer group flex flex-col justify-between"
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
                  <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] text-teal-900 bg-teal-50/70 p-2.5 rounded-lg font-medium">
                    <strong className="text-[#004f5e]">Commitment:</strong> {val.commitment}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* INTERACTIVE POP-UP MODAL (As required in Content_Company) */}
      {/* ========================================================= */}
      {activeModal && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-teal-100 relative max-h-[90vh] overflow-y-auto animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-8">
              {activeModal.badge && (
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-100 text-[#006070]">
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
            <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
              {activeModal.points?.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <div className="w-5 h-5 rounded-full bg-teal-100 text-[#00768a] flex items-center justify-center shrink-0 mt-0.5">
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
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider shadow-xs transition cursor-pointer"
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
