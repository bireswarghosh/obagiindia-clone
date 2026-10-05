'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
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
  FileCheck2, 
  Layers, 
  Microscope,
  Stethoscope,
  Globe2,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function AboutRyanPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'values' | 'quality' | 'ethics'>('overview');

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* ========================================================= */}
      {/* 1. HERO SECTION (Matching About Ryan.png)                 */}
      {/* ========================================================= */}
      <section className="relative bg-gradient-to-r from-[#eaf4f7] via-[#def0f5] to-[#cbe9f0] border-b border-teal-100/90 overflow-hidden py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <Link href="/home" className="hover:text-[#00768a]">Home</Link>
                <span>/</span>
                <span className="text-[#00768a] font-semibold">About Ryan</span>
              </div>

              <span className="text-[11px] sm:text-xs font-black tracking-widest text-[#00768a] uppercase block">
                A SPECIALIZED FOCUS ON
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#003d4d] tracking-tight uppercase leading-none">
                Dermatology
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal pt-1">
                Ryan Dermaceutics is a specialized dermatology division dedicated to building a comprehensive portfolio of topical, oral and supportive products for diverse skin, hair, scalp and related conditions.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <a
                  href="#story"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-teal-900/10 active:scale-95 transition-all"
                >
                  Our Story
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-teal-50 border border-teal-200 text-[#006070] text-xs font-bold uppercase tracking-wider shadow-xs transition-all"
                >
                  Explore Products
                </Link>
              </div>

              {/* 4 Feature Badges */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-teal-200/60 mt-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-100/80 text-[#00768a] flex items-center justify-center shrink-0">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-800 block leading-tight">DERMATOLOGY</span>
                    <span className="text-[9px] text-slate-500 uppercase font-medium">FOCUSED</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-100/80 text-[#00768a] flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-800 block leading-tight">COMPREHENSIVE</span>
                    <span className="text-[9px] text-slate-500 uppercase font-medium">PORTFOLIO</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-100/80 text-[#00768a] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-800 block leading-tight">QUALITY</span>
                    <span className="text-[9px] text-slate-500 uppercase font-medium">DRIVEN</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-100/80 text-[#00768a] flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-[#00768a]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-800 block leading-tight">PROFESSIONAL</span>
                    <span className="text-[9px] text-slate-500 uppercase font-medium">PARTNERSHIP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Graphic Banner (Authentic Hexagonal Motif) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-white group">
                <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                  <Image
                    src="/ryan/hero-therapeutic-doc.jpg"
                    alt="Ryan Dermaceutics - Specialized Dermatology Division"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003d4d]/85 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white space-y-1">
                      <div className="text-xs font-bold text-teal-200 uppercase tracking-widest">
                        SCIENCE THAT UNDERSTANDS SKIN
                      </div>
                      <div className="text-lg font-bold text-white">
                        Science • Efficacy • Clinical Confidence
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. OUR STORY SECTION (From Content_Home & Content_Company) */}
      {/* ========================================================= */}
      <section id="story" className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase">
              ABOUT RYAN DERMACEUTICS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase">
              Our Story & Purpose
            </h2>
            <div className="w-16 h-1 bg-[#00768a] mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-2">
              At <strong>Ryan Dermaceutics</strong>, our purpose extends beyond treating the visible signs of a skin disorder. We strive to understand the clinical challenges behind dermatological conditions and provide therapeutic solutions that address them with precision, consistency and purpose.
            </p>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Our portfolio is built around scientifically informed formulations, quality-focused manufacturing and the evolving needs of dermatology practice. We work to support physicians with dependable therapeutic choices across inflammatory, infectious, allergic, pigmentary and hair-and-scalp disorders.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. OUR VISION SECTION (Matching About Ryan.png)           */}
      {/* ========================================================= */}
      <section className="py-16 bg-[#f1f8fa] border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Graphic: Dartboard / Bullseye */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-gradient-to-br from-[#003d4d] to-[#006070] p-8 text-white flex flex-col items-center justify-center text-center h-80">
                <div className="w-20 h-20 rounded-full bg-teal-400/20 border-2 border-teal-300 flex items-center justify-center text-white mb-4 shadow-inner">
                  <Target className="w-10 h-10 text-teal-200" />
                </div>
                <h3 className="text-xl font-black tracking-wider uppercase text-white">Targeted Precision</h3>
                <p className="text-xs text-teal-100/90 mt-2 max-w-xs leading-relaxed">
                  Driven by clinical focus, scientific rigor and a long-term commitment to dermatological well-being.
                </p>
              </div>
            </div>

            {/* Right: Vision & 3 Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
                  OUR VISION
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase mt-1">
                  To Advance Dermatology Care
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                  To establish Ryan Dermaceutics as a trusted dermatology-focused pharmaceutical brand, recognized for portfolio depth, product quality and professional engagement, contributing to better skin, hair and scalp health.
                </p>
              </div>

              {/* 3 Vision Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-teal-100 shadow-2xs hover:shadow-md transition">
                  <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#00768a] flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">INNOVATION</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Expanding access to relevant dermatology solutions and better delivery.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-teal-100 shadow-2xs hover:shadow-md transition">
                  <div className="w-10 h-10 rounded-lg bg-cyan-50 text-[#006070] flex items-center justify-center mb-3">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">TRUST</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Building confidence with healthcare professionals through ethical science.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-teal-100 shadow-2xs hover:shadow-md transition">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-black uppercase text-slate-900 tracking-wider">GROWTH</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    A growing portfolio for evolving skin-health needs across diverse markets.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. OUR CORE VALUES (6 Cards from Content_Company.docx)    */}
      {/* ========================================================= */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase">
              OUR GUIDING PRINCIPLES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase mt-1">
              Core Values
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              <strong>Driven by Science. Guided by Integrity. Focused on Better Skin Health.</strong><br />
              At Ryan Dermaceutics, our values shape every decision we make—from formulation selection to professional partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 01 Integrity */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-xs font-black text-[#00768a] uppercase tracking-wider block mb-2">01 • INTEGRITY</span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#00768a] transition-colors">
                  Trust is the Foundation
                </h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  We conduct our work with honesty, transparency, and accountability. From product development to professional relationships, credibility is earned through consistent actions and adherence to high ethical standards.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
                <strong>Commitment:</strong> To do what is right and build relationships that stand the test of time.
              </div>
            </div>

            {/* 02 Innovation */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-xs font-black text-[#00768a] uppercase tracking-wider block mb-2">02 • INNOVATION</span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#00768a] transition-colors">
                  Rethinking Possibilities
                </h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  Skin health is constantly evolving, and so are the needs of patients and healthcare professionals. We encourage curiosity, scientific exploration, and fresh thinking to develop solutions that are purposeful and forward-looking.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
                <strong>Commitment:</strong> To continuously explore better approaches to formulations, delivery, and efficacy.
              </div>
            </div>

            {/* 03 Collaboration */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-xs font-black text-[#00768a] uppercase tracking-wider block mb-2">03 • COLLABORATION</span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#00768a] transition-colors">
                  Better Outcomes Together
                </h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  Dermatology is a multidisciplinary field, and meaningful progress requires collective expertise. We work closely with healthcare professionals, formulation partners, scientific teams, and business associates.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
                <strong>Commitment:</strong> To create partnerships built on knowledge-sharing and mutual respect.
              </div>
            </div>

            {/* 04 Quality & Excellence */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-xs font-black text-[#00768a] uppercase tracking-wider block mb-2">04 • QUALITY & EXCELLENCE</span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#00768a] transition-colors">
                  No Compromise in Quality
                </h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  Quality is not a final checkpoint at Ryan Dermaceutics—it is embedded throughout our approach. We emphasize careful product selection, formulation quality, manufacturing standards, and continuous evaluation.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
                <strong>Commitment:</strong> To pursue higher standards at every stage and continuously improve.
              </div>
            </div>

            {/* 05 Responsible Growth */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-xs font-black text-[#00768a] uppercase tracking-wider block mb-2">05 • RESPONSIBLE GROWTH</span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#00768a] transition-colors">
                  Sustainable Progress
                </h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  We believe responsible business means looking beyond immediate results. We seek to make thoughtful choices across operations, packaging, partnerships, and resource utilization.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
                <strong>Commitment:</strong> To grow responsibly while remaining conscious of our environmental impact.
              </div>
            </div>

            {/* 06 People & Patient Focus */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between group">
              <div>
                <span className="text-xs font-black text-[#00768a] uppercase tracking-wider block mb-2">06 • PEOPLE & PATIENT FOCUS</span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#00768a] transition-colors">
                  Serving a Human Need
                </h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  Behind every dermatological concern is a person seeking better skin health, confidence, comfort, or quality of life. This understanding keeps people at the centre of our thinking.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
                <strong>Commitment:</strong> To keep real-world patient needs at the centre of our products.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. OUR APPROACH (Matching About Ryan.png)                 */}
      {/* ========================================================= */}
      <section className="py-16 bg-[#f4fafb] border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-white h-72 sm:h-80 group">
                <Image
                  src="/ryan/quality-inspect.jpg"
                  alt="Focus. Quality. Partnership."
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003d4d]/80 via-transparent to-transparent flex items-end p-6">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Scientific Discipline In Practice
                  </span>
                </div>
              </div>
            </div>

            {/* Right Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
                  OUR APPROACH
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase mt-1">
                  Focus. Quality. Partnership.
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Our approach is centered on a clear dermatology focus, a commitment to quality and a long-term partnership mindset with healthcare professionals and distribution partners.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white border border-teal-100 shadow-2xs">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 text-[#00768a] flex items-center justify-center mb-2.5">
                    <Target className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Dermatology Focus</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    A specialized division built around the needs of dermatology practice.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-teal-100 shadow-2xs">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 text-[#00768a] flex items-center justify-center mb-2.5">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Quality</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Emphasis on consistent pharmaceutical quality and responsible practices.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-teal-100 shadow-2xs">
                  <div className="w-9 h-9 rounded-lg bg-teal-50 text-[#00768a] flex items-center justify-center mb-2.5">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase">Partnership</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Building long-term relationships with healthcare professionals and associates.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. OUR PORTFOLIO (4 Category Cards Matching Mockup)       */}
      {/* ========================================================= */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
                OUR PORTFOLIO
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase mt-1">
                A Comprehensive Range for Dermatology
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                Ryan Dermaceutics offers a diverse portfolio of topical, oral and supportive products across multiple therapeutic areas, designed to meet the evolving needs of dermatology practice.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider shadow-md shrink-0 transition"
            >
              Explore Our Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Card 1: Topical */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-teal-400 transition-all flex flex-col justify-between group">
              <div>
                <div className="h-32 w-full rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-800 font-bold text-xs p-4 mb-4 group-hover:bg-teal-100/60 transition-colors">
                  <div className="text-center">
                    <Layers className="w-8 h-8 text-[#00768a] mx-auto mb-1" />
                    <span>Topical Formulations</span>
                  </div>
                </div>
                <h3 className="text-sm font-black uppercase text-slate-900 group-hover:text-[#00768a] transition-colors">
                  Topical Dermatology
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Creams | Ointments | Gels | Lotions | Solutions | Soaps | Powders
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link href="/products?route=Topical" className="text-xs font-bold text-[#00768a] flex items-center gap-1 group-hover:underline">
                  View Products <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: Oral & Systemic */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-teal-400 transition-all flex flex-col justify-between group">
              <div>
                <div className="h-32 w-full rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-800 font-bold text-xs p-4 mb-4 group-hover:bg-cyan-100/60 transition-colors">
                  <div className="text-center">
                    <FlaskConical className="w-8 h-8 text-[#006070] mx-auto mb-1" />
                    <span>Systemic Therapies</span>
                  </div>
                </div>
                <h3 className="text-sm font-black uppercase text-slate-900 group-hover:text-[#00768a] transition-colors">
                  Oral & Systemic Dermatology
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Tablets | Capsules | Softgels | Syrups
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link href="/products?route=Oral" className="text-xs font-bold text-[#00768a] flex items-center gap-1 group-hover:underline">
                  View Products <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3: Hair & Scalp Care */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-teal-400 transition-all flex flex-col justify-between group">
              <div>
                <div className="h-32 w-full rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-xs p-4 mb-4 group-hover:bg-emerald-100/60 transition-colors">
                  <div className="text-center">
                    <Sparkles className="w-8 h-8 text-emerald-700 mx-auto mb-1" />
                    <span>Trichology Care</span>
                  </div>
                </div>
                <h3 className="text-sm font-black uppercase text-slate-900 group-hover:text-[#00768a] transition-colors">
                  Hair & Scalp Care
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Oral formulations | Topical solutions | Nutritional support
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link href="/products?area=Hair" className="text-xs font-bold text-[#00768a] flex items-center gap-1 group-hover:underline">
                  View Products <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 4: Supportive & Cleansing */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 shadow-2xs hover:shadow-md hover:border-teal-400 transition-all flex flex-col justify-between group">
              <div>
                <div className="h-32 w-full rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-800 font-bold text-xs p-4 mb-4 group-hover:bg-amber-100/60 transition-colors">
                  <div className="text-center">
                    <ShieldCheck className="w-8 h-8 text-amber-700 mx-auto mb-1" />
                    <span>Barrier & Cleansing</span>
                  </div>
                </div>
                <h3 className="text-sm font-black uppercase text-slate-900 group-hover:text-[#00768a] transition-colors">
                  Supportive & Cleansing Care
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  Cleansers | Soaps | Powders | Specialty Care
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link href="/products" className="text-xs font-bold text-[#00768a] flex items-center gap-1 group-hover:underline">
                  View Products <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. QUALITY & MANUFACTURING (WHO-GMP, QA, QC, GLP)         */}
      {/* ========================================================= */}
      <section className="py-16 bg-[#eef7f9] border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
            
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-white h-72 sm:h-80 group">
                <Image
                  src="/ryan/hero-medical-doc.jpg"
                  alt="Quality & Manufacturing at Ryan Dermaceutics"
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003d4d]/85 via-transparent to-transparent flex items-end p-6">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    WHO-GMP & Regulatory Excellence
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
                QUALITY & MANUFACTURING
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase leading-snug">
                Committed to Consistent Quality
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Our products are manufactured in WHO-GMP compliant facilities, adhering to stringent quality standards and regulatory guidelines to ensure reliability and consistent product performance. Quality is not treated as a final inspection—it is integrated throughout the product lifecycle.
              </p>

              {/* 3 Quality Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white border border-teal-100 text-center">
                  <Award className="w-6 h-6 text-[#00768a] mx-auto mb-1" />
                  <span className="text-[11px] font-black uppercase text-slate-900 block">WHO-GMP MANUFACTURING</span>
                  <span className="text-[10px] text-slate-500">Approved facilities</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-teal-100 text-center">
                  <FlaskConical className="w-6 h-6 text-[#00768a] mx-auto mb-1" />
                  <span className="text-[11px] font-black uppercase text-slate-900 block">QUALITY ASSURANCE</span>
                  <span className="text-[10px] text-slate-500">Control at every stage</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-teal-100 text-center">
                  <FileCheck2 className="w-6 h-6 text-[#00768a] mx-auto mb-1" />
                  <span className="text-[11px] font-black uppercase text-slate-900 block">REGULATORY COMPLIANCE</span>
                  <span className="text-[10px] text-slate-500">Applicable standards</span>
                </div>
              </div>
            </div>

          </div>

          {/* 8 Quality Framework Cards from Content_Company.docx */}
          <div className="pt-6 border-t border-teal-200/60">
            <h3 className="text-base font-black text-[#003d4d] uppercase tracking-wider text-center mb-6">
              Our 8-Point Quality Framework
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              
              <div className="p-4 rounded-xl bg-white border border-teal-100/90 shadow-2xs">
                <span className="font-bold text-[#00768a] block uppercase text-[10px] mb-1">01 • WHO-GMP MANUFACTURING</span>
                <p className="text-slate-600 leading-relaxed text-[11.5px]">
                  Controlled manufacturing processes, documented procedures, trained personnel, and systematic monitoring.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-teal-100/90 shadow-2xs">
                <span className="font-bold text-[#00768a] block uppercase text-[10px] mb-1">02 • QUALITY ASSURANCE (QA)</span>
                <p className="text-slate-600 leading-relaxed text-[11.5px]">
                  Standard Operating Procedures (SOPs), change-control, deviation management, and compliance oversight.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-teal-100/90 shadow-2xs">
                <span className="font-bold text-[#00768a] block uppercase text-[10px] mb-1">03 • QUALITY CONTROL (QC)</span>
                <p className="text-slate-600 leading-relaxed text-[11.5px]">
                  Scientific testing of identity, strength, purity, and consistency of raw materials, in-process, and finished packs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-teal-100/90 shadow-2xs">
                <span className="font-bold text-[#00768a] block uppercase text-[10px] mb-1">04 • GLP-ORIENTED PRACTICES</span>
                <p className="text-slate-600 leading-relaxed text-[11.5px]">
                  Controlled procedures, data integrity, equipment calibration, and traceable laboratory records.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-teal-100/90 shadow-2xs">
                <span className="font-bold text-[#00768a] block uppercase text-[10px] mb-1">05 • REGULATORY EXCELLENCE</span>
                <p className="text-slate-600 leading-relaxed text-[11.5px]">
                  Staying aligned with evolving pharmaceutical standards and documentation requirements.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-teal-100/90 shadow-2xs">
                <span className="font-bold text-[#00768a] block uppercase text-[10px] mb-1">06 • PHARMACOVIGILANCE</span>
                <p className="text-slate-600 leading-relaxed text-[11.5px]">
                  Continuous post-market monitoring, evaluation, and documentation of safety information.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-teal-100/90 shadow-2xs">
                <span className="font-bold text-[#00768a] block uppercase text-[10px] mb-1">07 • TRACEABILITY & CONTROL</span>
                <p className="text-slate-600 leading-relaxed text-[11.5px]">
                  Transparent quality trail from batch records and testing through controlled distribution.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-teal-100/90 shadow-2xs">
                <span className="font-bold text-[#00768a] block uppercase text-[10px] mb-1">08 • CONTINUOUS IMPROVEMENT</span>
                <p className="text-slate-600 leading-relaxed text-[11.5px]">
                  Ongoing reviews, corrective actions, and system enhancements to continuously elevate standards.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. PART OF ETHICS MEDINOVA (Corporate Parentage)          */}
      {/* ========================================================= */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#003d4d] via-[#004f5e] to-[#00768a] text-white shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              <div className="lg:col-span-8 space-y-4">
                <span className="text-[11px] font-black tracking-widest text-teal-200 uppercase block">
                  PART OF ETHICS MEDINOVA PRIVATE LIMITED
                </span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase leading-tight">
                  A Strong Foundation in Healthcare
                </h2>
                <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed max-w-2xl">
                  Ryan Dermaceutics is a specialized dermatology division of <strong>Ethics Medinova Private Limited</strong>, a growing pharmaceutical marketing company committed to quality, integrity and long-term value creation in healthcare.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/20">
                    <Building2 className="w-5 h-5 text-teal-200 mb-1" />
                    <span className="text-xs font-bold text-white block uppercase">Established Pharma</span>
                    <span className="text-[11px] text-teal-100/80">Strong foundation & expertise</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/20">
                    <TrendingUp className="w-5 h-5 text-teal-200 mb-1" />
                    <span className="text-xs font-bold text-white block uppercase">Growing Portfolio</span>
                    <span className="text-[11px] text-teal-100/80">Expanding product range</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/10 border border-white/20">
                    <ShieldCheck className="w-5 h-5 text-teal-200 mb-1" />
                    <span className="text-xs font-bold text-white block uppercase">Shared Values</span>
                    <span className="text-[11px] text-teal-100/80">Quality & customer focus</span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#004f5e] hover:bg-teal-50 text-xs font-bold uppercase tracking-wider transition shadow-md"
                  >
                    View Product Range
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/for-doctors/medical-information"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-bold uppercase tracking-wider transition"
                  >
                    Medical Enquiries
                  </Link>
                </div>
              </div>

              {/* Right Corporate Building Graphic */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="w-full max-w-xs p-6 rounded-2xl bg-white/10 border border-white/20 text-center backdrop-blur-md">
                  <div className="w-16 h-16 rounded-2xl bg-white text-[#004f5e] flex items-center justify-center font-black text-2xl mx-auto mb-3 shadow-md">
                    EM
                  </div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">
                    ETHICS MEDINOVA
                  </h4>
                  <span className="text-[10px] text-teal-200 uppercase tracking-widest block mt-0.5">
                    PRIVATE LIMITED
                  </span>
                  <p className="text-[11px] text-teal-100/80 mt-2 leading-relaxed">
                    Corporate Headquarters: Ahmedabad, Gujarat, India.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <RyanFooter />
    </div>
  );
}
