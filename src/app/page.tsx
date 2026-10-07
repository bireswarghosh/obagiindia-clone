'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import { getFeaturedProducts, THERAPEUTIC_AREAS } from '@/data/ryan-products';
import { defaultRyanHomeContent, RyanHomeContent, RyanPillar } from '@/data/ryan-home-content';
import { 
  ArrowRight, 
  Target, 
  ShieldCheck, 
  Users, 
  Layers, 
  Sparkles, 
  Pill, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Download, 
  Award, 
  TrendingUp,
  FlaskConical,
  Send,
  Building,
  HelpCircle,
  ChevronRight,
  X,
  ExternalLink
} from 'lucide-react';

export default function RyanHomePage() {
  const [homeContent, setHomeContent] = useState<RyanHomeContent>(defaultRyanHomeContent);
  const [activePillarModal, setActivePillarModal] = useState<RyanPillar | null>(null);

  useEffect(() => {
    try {
      const local = localStorage.getItem('ryan_home_content');
      if (local) {
        setHomeContent(JSON.parse(local));
      }
    } catch (e) {}

    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (data && data.ryanHome) {
          setHomeContent(data.ryanHome);
          localStorage.setItem('ryan_home_content', JSON.stringify(data.ryanHome));
        }
      })
      .catch(() => {});
  }, []);

  const featuredProducts = getFeaturedProducts();

  // Contact / Enquiry form state
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    organization: '',
    city: '',
    state: '',
    enquiryType: 'Product Enquiry',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* ========================================================= */}
      {/* SECTION 1: HERO SECTION (Matching Home 1.png)             */}
      {/* ========================================================= */}
      <section className="relative bg-gradient-to-r from-[#eef7f9] via-[#e2f1f5] to-[#cfe7ee] border-b border-teal-100/90 overflow-hidden py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] sm:text-xs font-black tracking-widest text-[#00768a] uppercase block">
                {homeContent.hero.badge}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#003d4d] tracking-tight uppercase leading-tight">
                {homeContent.hero.titleLine1}<br />
                {homeContent.hero.titleLine2}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal pt-1">
                {homeContent.hero.description}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link
                  href={homeContent.hero.primaryCtaLink}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-teal-900/10 active:scale-95 transition-all"
                >
                  {homeContent.hero.primaryCtaText}
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={homeContent.hero.secondaryCtaLink}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-teal-50 border border-teal-200 text-[#006070] text-xs font-bold uppercase tracking-wider shadow-xs transition-all"
                >
                  {homeContent.hero.secondaryCtaText}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* 4 Feature Badges */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-teal-200/60 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-100/80 text-[#00768a] flex items-center justify-center shrink-0">
                    <Target className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-800 block leading-tight">DERMATOLOGY</span>
                    <span className="text-[9px] text-slate-500 uppercase font-medium">FOCUSED</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-100/80 text-[#00768a] flex items-center justify-center shrink-0">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-800 block leading-tight">COMPREHENSIVE</span>
                    <span className="text-[9px] text-slate-500 uppercase font-medium">PORTFOLIO</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-100/80 text-[#00768a] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-800 block leading-tight">QUALITY</span>
                    <span className="text-[9px] text-slate-500 uppercase font-medium">DRIVEN</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-100/80 text-[#00768a] flex items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5 text-[#00768a]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase text-slate-800 block leading-tight">PROFESSIONAL</span>
                    <span className="text-[9px] text-slate-500 uppercase font-medium">PARTNERSHIP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Graphic Banner (Seamless Organic Gradient Blending) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              {/* Ambient Backlight Glow */}
              <div className="absolute -inset-6 bg-gradient-to-tr from-teal-300/35 via-cyan-200/30 to-teal-400/20 rounded-full blur-3xl -z-10 pointer-events-none" />

              <div className="relative w-full max-w-lg">
                {/* Seamless Blended Image Container */}
                <div className="relative h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/ryan/hero-therapeutic-doc.jpg"
                    alt="Focused on Dermatology. Driven by Quality."
                    fill
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  {/* Left edge soft gradient fade to blend into text */}
                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#eef7f9] via-[#eef7f9]/50 to-transparent pointer-events-none" />
                  {/* Bottom edge soft gradient fade to blend into base */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#003d4d]/90 via-[#003d4d]/40 to-transparent pointer-events-none" />

                  {/* Bottom Caption Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-1">
                    <span className="text-[10px] font-bold tracking-widest text-teal-300 uppercase block">
                      RYAN DERMACEUTICS
                    </span>
                    <div className="text-base sm:text-lg font-bold text-white leading-tight">
                      Science That Understands Skin
                    </div>
                  </div>
                </div>

                {/* Floating Glassmorphic Pill 1: Top Right */}
                <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg text-slate-800 animate-pulse">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#003d4d]">
                    WHO-GMP Standards
                  </span>
                </div>

                {/* Floating Glassmorphic Pill 2: Bottom Left */}
                <div className="absolute -bottom-3 -left-3 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg text-slate-800">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#003d4d]">
                    Ethics Medinova Division
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: OUR STORY (Matching Content_Home.docx)          */}
      {/* ========================================================= */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-2">
              <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
                {homeContent.ourStory.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase leading-snug">
                {homeContent.ourStory.title}
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
                {homeContent.ourStory.leadParagraph}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {homeContent.ourStory.fullParagraph}
              </p>

              
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition"
                >
                  About Ryan Dermaceutics
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-6 text-xs">
                  <div>
                    <span className="font-bold text-[#003d4d] block uppercase text-[11px]">FOCUS</span>
                    <span className="text-slate-500 text-[11px]">Dermatology led</span>
                  </div>
                  <div className="h-6 w-px bg-slate-200" />
                  <div>
                    <span className="font-bold text-[#003d4d] block uppercase text-[11px]">QUALITY</span>
                    <span className="text-slate-500 text-[11px]">Consistent standards</span>
                  </div>
                  <div className="h-6 w-px bg-slate-200" />
                  <div>
                    <span className="font-bold text-[#003d4d] block uppercase text-[11px]">PARTNERSHIP</span>
                    <span className="text-slate-500 text-[11px]">Long-term trust</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: THERAPEUTIC AREAS (Matching Home 1.png)        */}
      {/* ========================================================= */}
      <section id="therapeutic-areas" className="py-16 bg-[#f2f8fa] border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-10">
            <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
              OUR DERMATOLOGY FOCUS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase mt-1">
              Explore Our Therapeutic Areas
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Explore our portfolio through focused therapeutic categories, making it easier for healthcare professionals to discover relevant products across common and specialized dermatological requirements.
            </p>
          </div>

          {/* 8 Areas Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              { name: 'Acne & Acne Management', area: 'Acne', desc: 'Comedonal, inflammatory, and nodulocystic acne therapy.' },
              { name: 'Antifungal', area: 'Antifungal', desc: 'Superficial fungal infections, dermatophytosis, and candidiasis.' },
              { name: 'Antibacterial & Anti-Infective', area: 'Antibacterial', desc: 'Pyodermas, folliculitis, and cutaneous bacterial infections.' },
              { name: 'Corticosteroids', area: 'Corticosteroids', desc: 'Targeted potency topical corticosteroids and combinations.' },
              { name: 'Allergy & Pruritus', area: 'Allergy & Pruritus', desc: 'Advanced H1-antihistamines and acute/chronic pruritus relief.' },
              { name: 'Hair & Scalp', area: 'Hair & Scalp', desc: 'Alopecia, trichology solutions, and scalp barrier health.' },
              { name: 'Immunomodulatory Dermatology', area: 'Immunomodulator', desc: 'Topical calcineurin inhibitors and systemic JAK therapies.' },
              { name: 'Pigmentation & Skin Renewal', area: 'Pigmentation', desc: 'Melasma, PIH, depigmentation, and photoprotection.' }
            ].map((item, idx) => (
              <Link
                key={idx}
                href={`/products?area=${encodeURIComponent(item.area)}`}
                className="p-5 rounded-2xl bg-white border border-teal-100 shadow-2xs hover:shadow-lg hover:border-[#00768a] hover:-translate-y-0.5 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00768a] mb-3 group-hover:bg-[#00768a] group-hover:text-white transition-colors">
                    <Pill className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-[#00768a] transition-colors uppercase tracking-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#00768a]">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: TOPICAL + ORAL PORTFOLIO (Home 1.png)          */}
      {/* ========================================================= */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
              DERMATOLOGY, FROM TOPICAL TO SYSTEMIC
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase mt-1">
              A Complete Dermatology Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              From targeted topical formulations to oral and systemic therapies, Ryan Dermaceutics offers multiple dosage forms to support diverse dermatological treatment approaches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Topical Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#f1f9fb] to-[#e4f3f7] border border-teal-200 shadow-sm flex flex-col justify-between group">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-800 bg-white/80 px-2.5 py-1 rounded-full border border-teal-200 inline-block mb-3">
                  EXTERNAL CARE
                </span>
                <h3 className="text-xl font-black uppercase text-[#003d4d] tracking-tight">
                  Topical Dermatology
                </h3>
                <p className="text-xs text-slate-600 mt-2 font-medium">
                  Creams | Ointments | Gels | Lotions | Solutions | Soaps | Powders
                </p>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  Precision skin surface delivery designed for high epidermal bioavailability, vehicle cosmetic elegance, and targeted local efficacy with minimized systemic exposure.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-teal-200/60">
                <Link
                  href="/products?route=Topical"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
                >
                  View Topical Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Oral & Systemic Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#f4f7fc] to-[#e9eff9] border border-cyan-200 shadow-sm flex flex-col justify-between group">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-800 bg-white/80 px-2.5 py-1 rounded-full border border-cyan-200 inline-block mb-3">
                  INTERNAL CARE
                </span>
                <h3 className="text-xl font-black uppercase text-[#003d4d] tracking-tight">
                  Oral & Systemic Dermatology
                </h3>
                <p className="text-xs text-slate-600 mt-2 font-medium">
                  Tablets | Capsules | Softgels | Syrups
                </p>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  Dependable systemic therapeutics for comprehensive management of severe, generalized, or recalcitrant cutaneous disorders requiring internal pharmacokinetic control.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-cyan-200/60">
                <Link
                  href="/products?route=Oral"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#004f5e] hover:bg-[#003d4d] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
                >
                  View Oral Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5: FEATURED PRODUCTS (Matching Home 2.png)         */}
      {/* ========================================================= */}
      <section className="py-16 bg-[#eef7f9]/60 border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
                SELECTED FROM OUR PORTFOLIO
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase mt-1">
                Trusted Brands for Dermatology Practice
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Discover selected Ryan Dermaceutics brands across key dermatological categories. Explore individual product pages for composition, dosage form and professional information.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider shadow-md shrink-0 transition"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 8 Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-teal-100/90 shadow-2xs hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div className="p-5 pb-2">
                  {/* Category Pill Tag */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9.5px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                      {p.therapeuticArea}
                    </span>
                    <span className="text-[9.5px] text-slate-400 font-medium">
                      {p.route}
                    </span>
                  </div>

                  {/* Visual Render */}
                  <div className="h-36 rounded-xl bg-gradient-to-b from-slate-50 to-teal-50/20 border border-slate-100 flex flex-col items-center justify-center p-3 mb-4 group-hover:bg-teal-50/40 transition-colors">
                    <div className="w-14 h-14 rounded-xl bg-[#00768a] text-white flex items-center justify-center text-xl font-black shadow-md mb-2 group-hover:scale-105 transition-transform">
                      {p.brandName.replace(/[^a-zA-Z0-9]/g, '').charAt(0) || p.brandName.charAt(0)}
                    </div>
                    <span className="text-[11px] font-black uppercase text-[#004f5e] tracking-tight line-clamp-1">
                      {p.brandName}
                    </span>
                    <span className="text-[9.5px] text-slate-400 mt-0.5">
                      {p.dosageForm} • {p.packSize}
                    </span>
                  </div>

                  {/* Brand & Composition */}
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-[#00768a] transition-colors">
                    {p.brandName}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-snug">
                    {p.genericName}
                  </p>
                </div>

                <div className="p-4 pt-3 bg-slate-50/60 border-t border-slate-100">
                  <Link
                    href={`/products/${p.slug}`}
                    className="w-full py-2 px-3 rounded-lg bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    View Product
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 6: HAIR & SCALP HEALTH (Matching Home 2.png)       */}
      {/* ========================================================= */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
                COMPLETE CARE FOR
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#003d4d] tracking-tight uppercase leading-tight">
                Hair & Scalp Health
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ryan Dermaceutics extends its dermatology portfolio into hair and scalp care with nutritional support, oral formulations and topical solutions designed for professional dermatological practice.
              </p>

              <div className="pt-2">
                <Link
                  href="/products?area=Hair"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider shadow-md transition"
                >
                  Explore Hair & Scalp Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Hair Product Showcase */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-5 gap-3">
              {[
                { name: 'TRESSICLE 2.5', desc: 'Minoxidil 2.5% Solution', slug: 'tressicle-2-5-tablet' },
                { name: 'TRESSICLE 5', desc: 'Minoxidil 5% Solution', slug: 'tressicle-5-tablet' },
                { name: 'TRESSICLE FORTE', desc: 'Minoxidil + Finasteride', slug: 'tressicle-forte' },
                { name: 'BIOSICLE PLUS', desc: 'Hair Nutrition Tablets', slug: 'biosicle-plus' },
                { name: 'TRESSICLE F', desc: 'Finasteride 1 mg Tablets', slug: 'tressicle-f' }
              ].map((prod, idx) => (
                <Link
                  key={idx}
                  href={`/products/${prod.slug}`}
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all text-center flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-teal-100 text-[#00768a] flex items-center justify-center font-black text-xs mx-auto mb-2 group-hover:scale-105 transition-transform">
                      {idx + 1}
                    </div>
                    <span className="text-[11px] font-black text-slate-900 group-hover:text-[#00768a] uppercase block leading-tight">
                      {prod.name}
                    </span>
                    <span className="text-[9.5px] text-slate-500 mt-1 block">
                      {prod.desc}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#00768a] mt-3 block group-hover:underline">
                    View →
                  </span>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7: 4 CORE PILLARS (Matching Home 2.png & Content_Home.docx) */}
      {/* ========================================================= */}
      <section className="py-16 bg-[#f2f8fa] border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
              FOUR CORE PILLARS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase mt-1">
              A Partner in Dermatology Care
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Our clinical focus, formulation engineering, pharmaceutical quality and long-term professional partnerships make Ryan Dermaceutics a trusted choice for dermatology practitioners.
            </p>
            <span className="inline-block mt-3 px-3 py-1 bg-teal-100/70 text-[#006070] text-[11px] font-semibold rounded-full">
              💡 Click any card below to view detailed clinical rationale & specifications
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {homeContent.pillars.map((pillar) => {
              const IconComponent = 
                pillar.iconName === 'Target' ? Target :
                pillar.iconName === 'Layers' ? Layers :
                pillar.iconName === 'ShieldCheck' ? ShieldCheck : Users;

              return (
                <div
                  key={pillar.id}
                  onClick={() => setActivePillarModal(pillar)}
                  className="p-6 rounded-2xl bg-white border border-teal-100 shadow-2xs hover:shadow-xl hover:border-teal-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="absolute top-4 right-4 text-xs font-black text-teal-200 group-hover:text-teal-400 transition-colors">
                    {pillar.number}
                  </div>

                  <div>
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-[#00768a] group-hover:bg-[#00768a] group-hover:text-white flex items-center justify-center mb-4 transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block">
                      {pillar.tagline}
                    </span>
                    <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight mt-1 group-hover:text-[#00768a] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                      {pillar.shortDescription}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#00768a] group-hover:text-[#005f70]">
                    <span className="text-[11px] uppercase tracking-wider">Clinical Details</span>
                    <span className="w-6 h-6 rounded-full bg-teal-50 group-hover:bg-teal-100 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ========================================================= */}
      {/* SECTION 8: PORTFOLIO HIGHLIGHTS (Home 3.png)              */}
      {/* ========================================================= */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
              OUR DERMATOLOGY PORTFOLIO AT A GLANCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase mt-1">
              Comprehensive. Specialized. Growing.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              A diverse range of topical, oral, hair and scalp products across multiple therapeutic categories.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-[#eef7f9] border border-teal-100 text-center">
              <span className="text-3xl sm:text-4xl font-black text-[#004f5e] block">53+</span>
              <span className="text-xs font-bold uppercase text-slate-800 tracking-wider block mt-1">PRODUCTS</span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">A growing portfolio for evolving needs</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#eef7f9] border border-teal-100 text-center">
              <span className="text-3xl sm:text-4xl font-black text-[#004f5e] block">10+</span>
              <span className="text-xs font-bold uppercase text-slate-800 tracking-wider block mt-1">THERAPEUTIC CATEGORIES</span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Across dermatology and skin-health</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#eef7f9] border border-teal-100 text-center">
              <span className="text-3xl sm:text-4xl font-black text-[#004f5e] block">TOPICAL + ORAL</span>
              <span className="text-xs font-bold uppercase text-slate-800 tracking-wider block mt-1">MULTIPLE DOSAGE APPROACHES</span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Creams, ointments, gels, tablets, syrups</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#eef7f9] border border-teal-100 text-center">
              <span className="text-3xl sm:text-4xl font-black text-[#004f5e] block">DERMATOLOGY</span>
              <span className="text-xs font-bold uppercase text-slate-800 tracking-wider block mt-1">SPECIALIZED FOCUS</span>
              <span className="text-[11px] text-slate-500 mt-0.5 block">Dedicated to skin, hair and scalp health</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 9: FOR DOCTORS (Matching Home 3.png)               */}
      {/* ========================================================= */}
      <section className="py-16 bg-[#f4fafb] border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
            <div className="lg:col-span-8 space-y-2">
              <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
                BUILT FOR PROFESSIONAL DERMATOLOGY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase">
                Supporting Dermatology Practice, Every Day
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                Access our product portfolio, detailed product information and professional resources through a platform designed to make relevant dermatology information easier to discover.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
              <Link
                href="/products"
                className="px-5 py-2.5 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition"
              >
                Explore Product Portfolio →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link
              href="/products"
              className="p-5 rounded-2xl bg-white border border-teal-100 shadow-2xs hover:shadow-md hover:border-[#00768a] transition flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00768a] flex items-center justify-center mb-3">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-black uppercase text-slate-900 group-hover:text-[#00768a] transition-colors">
                  Product Information
                </h3>
                <p className="text-[11.5px] text-slate-500 mt-2 leading-relaxed">
                  Explore our complete portfolio with detailed composition and dosage information.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 text-xs font-bold text-[#00768a]">
                Explore →
              </div>
            </Link>

            <Link
              href="/for-doctors/prescribing-information"
              className="p-5 rounded-2xl bg-white border border-teal-100 shadow-2xs hover:shadow-md hover:border-[#00768a] transition flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#006070] flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-black uppercase text-slate-900 group-hover:text-[#00768a] transition-colors">
                  Product Monographs
                </h3>
                <p className="text-[11.5px] text-slate-500 mt-2 leading-relaxed">
                  Download detailed product monographs and prescribing literature for healthcare professionals.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 text-xs font-bold text-[#00768a]">
                View Resources →
              </div>
            </Link>

            <Link
              href="/for-doctors/therapeutic-resources"
              className="p-5 rounded-2xl bg-white border border-teal-100 shadow-2xs hover:shadow-md hover:border-[#00768a] transition flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-black uppercase text-slate-900 group-hover:text-[#00768a] transition-colors">
                  Therapeutic Resources
                </h3>
                <p className="text-[11.5px] text-slate-500 mt-2 leading-relaxed">
                  Access dermatology insights, clinical practice updates and educational materials.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 text-xs font-bold text-[#00768a]">
                Explore →
              </div>
            </Link>

            <Link
              href="/for-doctors/medical-information"
              className="p-5 rounded-2xl bg-white border border-teal-100 shadow-2xs hover:shadow-md hover:border-[#00768a] transition flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00768a] flex items-center justify-center mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-black uppercase text-slate-900 group-hover:text-[#00768a] transition-colors">
                  Medical Information
                </h3>
                <p className="text-[11.5px] text-slate-500 mt-2 leading-relaxed">
                  Connect with our team for product-related medical information and queries.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 text-xs font-bold text-[#00768a]">
                Contact Us →
              </div>
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 10: FINAL CTA (Matching Home 3.png)               */}
      {/* ========================================================= */}
      <section className="py-16 bg-gradient-to-r from-[#003d4d] via-[#005566] to-[#00768a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-[11px] font-black tracking-widest text-teal-200 uppercase block">
              LET'S ADVANCE DERMATOLOGY TOGETHER
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase leading-tight">
              Explore the Ryan Dermaceutics Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
              Discover our growing range of topical, oral, hair and scalp products designed to support the diverse requirements of dermatology practice.
            </p>

            <div className="pt-3 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-6 py-3 rounded-xl bg-white text-[#004f5e] hover:bg-teal-50 text-xs font-bold uppercase tracking-wider transition shadow-md"
              >
                View All Products →
              </Link>
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-bold uppercase tracking-wider transition"
              >
                Contact Ryan
              </a>
            </div>

            <div className="pt-6 font-serif italic text-lg text-teal-200/90">
              "Healthy Skin, Happier Lives"
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 11: PARTNER WITH US (Matching Home 4.png)         */}
      {/* ========================================================= */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
                PARTNER WITH RYAN DERMACEUTICS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase">
                Build the Future of Dermatology Together
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ryan Dermaceutics works with healthcare professionals, distribution partners and business associates to expand access to a focused and growing dermatology portfolio.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition"
              >
                Become a Distributor →
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider transition"
              >
                Business Enquiry
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#004f5e] uppercase text-xs block mb-1">ATTRACTIVE BUSINESS OPPORTUNITY</span>
              <p className="text-xs text-slate-600 leading-relaxed">Be part of a growing dermatology division with a comprehensive portfolio.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#004f5e] uppercase text-xs block mb-1">QUALITY PRODUCTS</span>
              <p className="text-xs text-slate-600 leading-relaxed">A focused range of topical, oral and hair care products.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#004f5e] uppercase text-xs block mb-1">MARKETING SUPPORT</span>
              <p className="text-xs text-slate-600 leading-relaxed">Promotional support, visual aids and market development initiatives.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-bold text-[#004f5e] uppercase text-xs block mb-1">LONG-TERM PARTNERSHIP</span>
              <p className="text-xs text-slate-600 leading-relaxed">Working together for sustainable growth and mutual success.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 12: CONTACT & ENQUIRY FORM (Home 4.png)           */}
      {/* ========================================================= */}
      <section id="contact" className="py-16 bg-[#eef7f9] border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-[11px] font-black tracking-widest text-[#00768a] uppercase block">
                  GET IN TOUCH
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#003d4d] tracking-tight uppercase mt-1">
                  Connect with Ryan Dermaceutics
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  We are here to support healthcare professionals, distribution partners and business associates. Get in touch for product information, business enquiries or medical support.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-white border border-teal-100 flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#00768a] shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone</span>
                    <a href="tel:+911234567890" className="font-bold text-slate-800 hover:text-[#00768a]">+91 12345 67890</a>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-teal-100 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#00768a] shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Email</span>
                    <a href="mailto:info@ryandermaceutics.com" className="font-bold text-slate-800 hover:text-[#00768a]">info@ryandermaceutics.com</a>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-teal-100 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#00768a] shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Address</span>
                    <span className="font-bold text-slate-800">Ryan Dermaceutics (A Division of Ethics Medinova Pvt. Ltd.) Ahmedabad, Gujarat, India</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-teal-100 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#00768a] shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Working Hours</span>
                    <span className="font-bold text-slate-800">Mon – Sat: 9:00 AM – 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-teal-100 shadow-sm">
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wide mb-4">
                  Send Us an Enquiry
                </h3>

                {formSubmitted ? (
                  <div className="p-8 rounded-2xl bg-teal-50 border border-teal-200 text-center space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
                    <h4 className="text-base font-bold text-slate-900">Thank you for your enquiry</h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Our medical affairs and partner relations desk has received your request and will respond within 24 business hours.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-4 py-2 rounded-lg bg-[#00768a] text-white text-xs font-bold"
                    >
                      Submit Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitEnquiry} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Name *</label>
                        <input
                          type="text"
                          required
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                          className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Designation</label>
                        <input
                          type="text"
                          name="designation"
                          value={formData.designation}
                          onChange={handleInputChange}
                          placeholder="e.g. Doctor / Distributor"
                          className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Organization *</label>
                        <input
                          type="text"
                          required
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          placeholder="Hospital / Clinic / Company"
                          className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">City *</label>
                        <input
                          type="text"
                          required
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Your City"
                          className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">State *</label>
                        <input
                          type="text"
                          required
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="State"
                          className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Enquiry Type *</label>
                        <select
                          name="enquiryType"
                          value={formData.enquiryType}
                          onChange={handleInputChange}
                          className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#00768a] cursor-pointer"
                        >
                          <option value="Product Enquiry">Product Enquiry</option>
                          <option value="Distributor Partnership">Distributor Partnership</option>
                          <option value="Business Enquiry">Business Enquiry</option>
                          <option value="Medical Information">Medical Information</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Message *</label>
                      <textarea
                        required
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please write your query or requirements..."
                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-6 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm"
                    >
                      Submit Enquiry
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      <RyanFooter />

      {/* ========================================================= */}
      {/* INTERACTIVE CLINICAL PILLAR MODAL POPUP (Content_Home.docx) */}
      {/* ========================================================= */}
      {activePillarModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActivePillarModal(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-teal-100 overflow-hidden relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0e4f63] via-[#006070] to-[#0e4f63] p-6 text-white relative">
              <button 
                onClick={() => setActivePillarModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-teal-400 text-teal-950 font-sans">
                  {activePillarModal.popupBadge}
                </span>
                <span className="text-teal-200 text-xs font-semibold">
                  • {activePillarModal.tagline}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {activePillarModal.popupTitle}
              </h3>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              <p className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
                {activePillarModal.popupLead}
              </p>

              {/* Key Scientific Points */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#00768a]">
                  Clinical & Scientific Specifications
                </h4>
                <div className="space-y-2.5">
                  {activePillarModal.popupPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-[13px] text-slate-700 leading-snug">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clinical Practice Takeaway */}
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/60">
                <div className="flex items-center gap-2 text-xs font-black uppercase text-[#006070] mb-1">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  Clinical Practice Takeaway
                </div>
                <p className="text-xs sm:text-[12.5px] text-slate-700 leading-relaxed">
                  {activePillarModal.popupClinicalNote}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
              <Link
                href="/for-doctors/therapeutic-resources"
                className="text-xs font-bold text-[#00768a] hover:underline flex items-center gap-1"
                onClick={() => setActivePillarModal(null)}
              >
                Explore Doctor Resources
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setActivePillarModal(null)}
                className="px-5 py-2.5 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

