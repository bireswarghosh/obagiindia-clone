'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import {
  FileText,
  FlaskConical,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Upload,
  Mail,
  Stethoscope,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';

// Ryan Product catalog for dropdowns
const RYAN_PRODUCTS = [
  'Select Product',
  'CLIXODIN-AD (Adapalene + Clindamycin)',
  'CLIXODIN-BPO (Benzoyl Peroxide + Clindamycin)',
  'CLIXODIN-NT (Nicotinamide + Clindamycin)',
  'RYAN BPO 2.5% / 5% Gel',
  'TACNOID 0.05% / 0.1% (Tacrolimus)',
  'I-TACNOID 20 (Isotretinoin 20mg)',
  'KEFIN Cream / Lotion (Ketoconazole)',
  'KEFIN-Z Shampoo & Soap',
  'LULIPRIX Cream & Lotion (Luliconazole)',
  'NIZFIN Cream',
  'ITFIN-100 / 200 (Itraconazole)',
  'ITFIN SB-130 (Submicronized Itraconazole)',
  'FLUCORION 150 / 200 (Fluconazole)',
  'T-FIN 250 / 500 (Terbinafine)',
  'TENORIUM Cream (Clobetasol Propionate)',
  'TENORIUM-S / S6 (Clobetasol + Salicylic Acid)',
  'TENORIUM-NM (Clobetasol + Neomycin + Miconazole)',
  'MOMERIUM / MOMERIUM-F (Mometasone Furoate)',
  'FLUTIRIUM Cream (Fluticasone Propionate)',
  'TRILOFAZ / TRILOFAZ-B Lotion',
  'TOFAPLAST 5mg / Cream (Tofacitinib)',
  'BLISMIN 20 / BLISMIN-M (Bilastine + Montelukast)',
  'HIVOZIN 5 / HIVOZIN-M (Levocetirizine)',
  'DINOFEX 180 (Fexofenadine HCl)',
  'TRESSICLE 2.5 / 5 / Forte / F (Minoxidil + Finasteride)',
  'BIOSICLE PLUS (Hair Nutrients & Amino Acids)',
  'MITECLIN Cream / Soap (Permethrin 5%)',
  'SUPICID / SUPICID-B (Fusidic Acid / Beclomethasone)',
  'Other Ryan Product'
];

const INFORMATION_TYPES = [
  'Select Information Type',
  'Composition & Formulation Details',
  'Indication & Clinical Usage',
  'Dosage & Administration Guidelines',
  'Contraindications & Warnings',
  'Drug Interactions & Concomitant Use',
  'Adverse Effects & Safety Profile',
  'Special Population (Pediatric / Geriatric / Pregnancy)',
  'Storage, Stability & Packaging',
  'Product Availability & Supply Status',
  'Other Scientific / Clinical Enquiry'
];

const QUALITY_ISSUE_TYPES = [
  'Select Issue Type',
  'Damaged Packaging / Tampered Seal',
  'Leakage or Seepage',
  'Broken Container / Tube',
  'Missing Tablets / Blister Anomaly',
  'Discolouration or Separation of Phase',
  'Label or Batch Printing Issue',
  'Unusual Texture / Consistency',
  'Suspected Quality / Efficacy Deviation'
];

/* ---------- shared class tokens (kept here so the whole page stays consistent) ---------- */
const FIELD =
  'w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00768a] focus:ring-2 focus:ring-teal-100 focus:bg-white transition-all';
const FIELD_ROSE =
  'w-full px-3.5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 focus:bg-white transition-all';
const FIELD_SM =
  'w-full px-3 py-2 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-[#00768a] focus:ring-2 focus:ring-teal-100 focus:bg-white transition-all';
const FIELD_SM_ROSE =
  'w-full px-3 py-2 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-700 placeholder-slate-400 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 focus:bg-white transition-all';
const AREA =
  'w-full p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00768a] focus:ring-2 focus:ring-teal-100 focus:bg-white transition-all';
const AREA_ROSE =
  'w-full p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 focus:bg-white transition-all';
const CARD =
  "relative overflow-hidden bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/70 shadow-[0_12px_34px_rgba(0,61,77,0.09)] hover:shadow-[0_20px_48px_rgba(0,118,138,0.16)] transition-all duration-300 scroll-mt-28 before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-gradient-to-r before:from-[#00768a] before:via-teal-400 before:to-cyan-400";
const CARD_ROSE =
  "relative overflow-hidden bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-[0_12px_34px_rgba(0,61,77,0.09)] hover:shadow-[0_20px_48px_rgba(190,18,60,0.16)] transition-all duration-300 scroll-mt-28 before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1.5 before:bg-gradient-to-r before:from-rose-500 before:via-pink-400 before:to-rose-400";
const TILE_TEAL =
  'w-11 h-11 rounded-2xl bg-gradient-to-br from-[#00768a] to-cyan-400 text-white flex items-center justify-center shrink-0 shadow-lg shadow-teal-900/25';
const TILE_CYAN =
  'w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-400 text-white flex items-center justify-center shrink-0 shadow-lg shadow-cyan-900/25';
const TILE_ROSE =
  'w-11 h-11 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-400 text-white flex items-center justify-center shrink-0 shadow-lg shadow-rose-900/25';
const TILE_AMBER =
  'w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-400 text-white flex items-center justify-center shrink-0 shadow-lg shadow-amber-900/25';
const TILE_EMERALD =
  'w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-900/25';
const SUBMIT =
  'w-full py-3 rounded-xl bg-gradient-to-r from-[#00768a] to-[#00a0bd] hover:from-[#005f70] hover:to-[#0089a6] active:scale-[0.98] text-white font-bold uppercase tracking-wider text-xs shadow-lg shadow-teal-900/20 transition-all flex items-center justify-center gap-2 mt-4';

export default function MedicalInformationPage() {
  const [products, setProducts] = useState<string[]>(RYAN_PRODUCTS);

  React.useEffect(() => {
    fetch('/api/db/products')
      .then(res => res.json())
      .then(data => {
        if (data?.success && Array.isArray(data.products) && data.products.length > 0) {
          const names = ['Select Product', ...data.products.map((p: any) => p.brand_name), 'Other Ryan Product'];
          setProducts(names);
        }
      })
      .catch(() => {});
  }, []);

  // Form submission status states
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Form A: Product Info Enquiry
  const [formA, setFormA] = useState({
    product: '',
    infoType: '',
    question: '',
    name: '',
    qualification: '',
    hospital: '',
    city: '',
    email: '',
    mobile: ''
  });

  // Form B: Scientific Request
  const [formB, setFormB] = useState({
    productIngredient: '',
    topic: '',
    specificQuestion: '',
    supportingInfo: '',
    name: '',
    email: '',
    mobile: ''
  });

  // Form C: Safety Event (Pharmacovigilance)
  const [formC, setFormC] = useState({
    product: '',
    batchNo: '',
    eventDate: '',
    eventDescription: '',
    patientAgeSex: '',
    concomitantMeds: '',
    reporterContact: ''
  });

  // Form D: Quality Complaint
  const [formD, setFormD] = useState({
    product: '',
    batchNo: '',
    issueType: '',
    description: '',
    purchaseSource: '',
    reporterContact: ''
  });

  const handleSubmit = (formName: string, e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess(formName);
    setTimeout(() => {
      setFormSuccess(null);
    }, 6000);
  };

  const trustPillars = [
    { icon: FileText, title: 'ACCURATE INFORMATION', sub: 'Product-related scientific support', tile: TILE_TEAL },
    { icon: Clock, title: 'SCIENTIFIC RESPONSE', sub: 'Timely and evidence-based', tile: TILE_CYAN },
    { icon: ShieldCheck, title: 'PATIENT SAFETY', sub: 'Commitment to pharmacovigilance', tile: TILE_ROSE },
    { icon: Stethoscope, title: 'PROFESSIONAL SUPPORT', sub: 'For healthcare professionals', tile: TILE_EMERALD }
  ];

  const heroChips = [
    { icon: Clock, label: 'Prompt scientific response' },
    { icon: ShieldCheck, label: 'CDSCO-aligned pharmacovigilance' },
    { icon: Stethoscope, label: 'Dedicated HCP channel' }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-teal-100 selection:text-teal-900">
      <RyanHeader />

      {/* Global Success Banner */}
      {formSuccess && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 bg-emerald-600 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in border border-emerald-400">
          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold block">Submission Successful!</span>
            <span>Your {formSuccess} inquiry has been logged. Ryan Medical Affairs will review and respond promptly.</span>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1. HERO SECTION                                           */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#e6f4f7] via-[#f1f9fb] to-[#dceff4] border-b border-teal-100/60 pt-6 pb-14 lg:pt-8 lg:pb-20">
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
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-6">
            <a href="#" className="hover:text-teal-700 transition">Home</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <a href="#" className="hover:text-teal-700 transition">For Doctors</a>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[#00768a] font-semibold">Medical Information</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Header */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-[#006070] text-xs font-bold uppercase tracking-widest shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#00768a]" />
                FOR DOCTORS
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003d4d] tracking-tight leading-[1.08]">
                MEDICAL <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#00768a] to-cyan-500 bg-clip-text text-transparent">
                  INFORMATION
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                Connect with our Medical Information team for product-related scientific information, prescribing queries, safety information, quality concerns and other professional enquiries.
              </p>

              {/* Mini trust chips */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {heroChips.map((chip, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/80 text-[11px] font-semibold text-[#006070] shadow-sm"
                  >
                    <chip.icon className="w-3.5 h-3.5 text-[#00768a]" />
                    {chip.label}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap gap-3 text-xs">
                <a
                  href="#product-enquiry"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00768a] text-white font-bold hover:bg-[#005f70] transition shadow-lg shadow-teal-900/20 active:scale-95"
                >
                  Product Information Enquiry
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="#safety-reporting"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/80 backdrop-blur-md border border-rose-200 text-rose-700 font-bold hover:bg-rose-50 transition shadow-sm active:scale-95"
                >
                  <ShieldAlert className="w-4 h-4" />
                  Pharmacovigilance Reporting
                </a>
              </div>
            </div>

            {/* Right Graphic Banner */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="absolute -inset-4 bg-gradient-to-tr from-teal-300/30 to-cyan-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
              <div className="relative mx-auto max-w-md lg:max-w-none w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/60">
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <Image
                    src="/ryan/hero-medical-doc.jpg"
                    alt="Your Questions Our Support - Ryan Medical Information"
                    fill
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#e6f4f7] via-[#e6f4f7]/40 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#003d4d]/90 via-[#003d4d]/40 to-transparent pointer-events-none" />
                  {/* Cursive overlay text */}
                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <div className="font-serif italic text-xl sm:text-2xl text-teal-100 font-medium">
                      &ldquo;Your Questions, Our Support&rdquo;
                    </div>
                    <div className="text-[11px] text-teal-200/80 font-medium tracking-wide mt-0.5">
                      Direct scientific channel for healthcare practitioners
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating response badge */}
              <div className="absolute -bottom-3 right-2 sm:right-6 inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-white/80 shadow-xl">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-bold text-[#005566] uppercase tracking-wide">Med Info Team Online</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. FOUR TRUST PILLAR BADGES                               */}
      {/* ========================================================= */}
      <section className="relative bg-gradient-to-b from-white via-teal-50/60 to-white border-b border-teal-100/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
            {trustPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group flex flex-col md:flex-row items-center md:items-start gap-3 p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-white/70 shadow-[0_8px_24px_rgba(0,61,77,0.08)] hover:shadow-[0_16px_36px_rgba(0,118,138,0.18)] hover:-translate-y-1 hover:bg-white/95 transition-all duration-300 text-center md:text-left"
              >
                <div className={pillar.tile}>
                  <pillar.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">{pillar.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{pillar.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. FOUR CLINICAL DOCTOR INQUIRY FORMS (2x2 Grid)          */}
      {/* ========================================================= */}
      <section className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black tracking-widest text-[#00768a] uppercase block mb-1.5">
            MEDICAL INFORMATION REQUESTS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#003d4d] tracking-tight uppercase">
            Submit An Enquiry
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-normal">
            Choose the relevant channel below. Every submission is routed directly to our Medical Affairs team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

          {/* ===================================================== */}
          {/* FORM A: PRODUCT INFORMATION ENQUIRY                   */}
          {/* ===================================================== */}
          <div id="product-enquiry" className={CARD}>
            <div className="flex items-start gap-3 mb-5">
              <div className={TILE_TEAL}>
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-wide">
                  Product Information Enquiry
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Submit your inquiry to receive product-related information from our medical team.
                </p>
              </div>
            </div>

            <form onSubmit={(e) => handleSubmit('Product Information', e)} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Product Name *</label>
                  <select
                    required
                    value={formA.product}
                    onChange={(e) => setFormA({ ...formA, product: e.target.value })}
                    className={FIELD}
                  >
                    {products.map((prod, i) => (
                      <option key={i} value={i === 0 ? '' : prod}>{prod}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Information Required *</label>
                  <select
                    required
                    value={formA.infoType}
                    onChange={(e) => setFormA({ ...formA, infoType: e.target.value })}
                    className={FIELD}
                  >
                    {INFORMATION_TYPES.map((type, i) => (
                      <option key={i} value={i === 0 ? '' : type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Question *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Please enter your detailed question regarding composition, dosing, clinical trials, or precautions..."
                  value={formA.question}
                  onChange={(e) => setFormA({ ...formA, question: e.target.value })}
                  className={AREA}
                />
              </div>

              {/* Doctor Details Grid */}
              <div className="pt-3 mt-1 border-t border-slate-100">
                <span className="block font-bold text-[11px] uppercase tracking-wider text-[#006070] mb-2.5">
                  Healthcare Professional Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Doctor Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. Full Name"
                      value={formA.name}
                      onChange={(e) => setFormA({ ...formA, name: e.target.value })}
                      className={FIELD_SM}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Qualification *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. MBBS / MD / DNB (Dermatology)"
                      value={formA.qualification}
                      onChange={(e) => setFormA({ ...formA, qualification: e.target.value })}
                      className={FIELD_SM}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Hospital / Clinic *</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Hospital or Clinic Name"
                      value={formA.hospital}
                      onChange={(e) => setFormA({ ...formA, hospital: e.target.value })}
                      className={FIELD_SM}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-0.5">City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai, Delhi, Bangalore"
                      value={formA.city}
                      onChange={(e) => setFormA({ ...formA, city: e.target.value })}
                      className={FIELD_SM}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="doctor@institution.org"
                      value={formA.email}
                      onChange={(e) => setFormA({ ...formA, email: e.target.value })}
                      className={FIELD_SM}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Mobile No. *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formA.mobile}
                      onChange={(e) => setFormA({ ...formA, mobile: e.target.value })}
                      className={FIELD_SM}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className={SUBMIT}>
                SUBMIT ENQUIRY
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* ===================================================== */}
          {/* FORM B: SCIENTIFIC INFORMATION REQUEST                */}
          {/* ===================================================== */}
          <div className={CARD}>
            <div className="flex items-start gap-3 mb-5">
              <div className={TILE_CYAN}>
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-wide">
                  Scientific Information Request
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Request scientific information related to our products or active ingredients.
                </p>
              </div>
            </div>

            <form onSubmit={(e) => handleSubmit('Scientific Information', e)} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Product / Active Ingredient *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter Product Name or API (e.g. Tacrolimus, Itraconazole SB)"
                  value={formB.productIngredient}
                  onChange={(e) => setFormB({ ...formB, productIngredient: e.target.value })}
                  className={FIELD}
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Topic *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Clinical data, Mechanism of Action, Comparative studies, Bioavailability"
                  value={formB.topic}
                  onChange={(e) => setFormB({ ...formB, topic: e.target.value })}
                  className={FIELD}
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Specific Question *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Please state your specific clinical or pharmacological question in detail..."
                  value={formB.specificQuestion}
                  onChange={(e) => setFormB({ ...formB, specificQuestion: e.target.value })}
                  className={AREA}
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Supporting Information (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Reference journal citation, specific study, or trial registry number"
                  value={formB.supportingInfo}
                  onChange={(e) => setFormB({ ...formB, supportingInfo: e.target.value })}
                  className={FIELD}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 mt-1">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Doctor Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formB.name}
                    onChange={(e) => setFormB({ ...formB, name: e.target.value })}
                    className={FIELD_SM}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={formB.email}
                    onChange={(e) => setFormB({ ...formB, email: e.target.value })}
                    className={FIELD_SM}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Mobile No. *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Mobile"
                    value={formB.mobile}
                    onChange={(e) => setFormB({ ...formB, mobile: e.target.value })}
                    className={FIELD_SM}
                  />
                </div>
              </div>

              <button type="submit" className={SUBMIT}>
                SUBMIT REQUEST
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* ===================================================== */}
          {/* FORM C: REPORT A PRODUCT SAFETY EVENT (Pharmacovigilance)*/}
          {/* ===================================================== */}
          <div id="safety-reporting" className={CARD_ROSE}>
            <div className="flex items-start gap-3 mb-5">
              <div className={TILE_ROSE}>
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-wide flex items-center gap-2 flex-wrap">
                  <span>Report A Product Safety Event</span>
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full uppercase">
                    Pharmacovigilance
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Report suspected adverse events or product safety observations to help ensure ongoing patient safety.
                </p>
              </div>
            </div>

            <form onSubmit={(e) => handleSubmit('Product Safety / Adverse Event', e)} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Product Name *</label>
                  <select
                    required
                    value={formC.product}
                    onChange={(e) => setFormC({ ...formC, product: e.target.value })}
                    className={FIELD_ROSE}
                  >
                    {products.map((prod, i) => (
                      <option key={i} value={i === 0 ? '' : prod}>{prod}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Batch No. (if available)</label>
                  <input
                    type="text"
                    placeholder="Enter Batch No."
                    value={formC.batchNo}
                    onChange={(e) => setFormC({ ...formC, batchNo: e.target.value })}
                    className={FIELD_ROSE}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Brief Description of Event *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Please describe the suspected adverse event, onset latency, severity, and clinical resolution..."
                  value={formC.eventDescription}
                  onChange={(e) => setFormC({ ...formC, eventDescription: e.target.value })}
                  className={AREA_ROSE}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Date of Event</label>
                  <input
                    type="date"
                    value={formC.eventDate}
                    onChange={(e) => setFormC({ ...formC, eventDate: e.target.value })}
                    className={FIELD_SM_ROSE}
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Patient Age &amp; Sex</label>
                  <input
                    type="text"
                    placeholder="e.g. 34 yrs / Female"
                    value={formC.patientAgeSex}
                    onChange={(e) => setFormC({ ...formC, patientAgeSex: e.target.value })}
                    className={FIELD_SM_ROSE}
                  />
                </div>
              </div>

              <div className="relative p-3.5 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-rose-200 shadow-sm">
                  <Image
                    src="/ryan/safety-shield.jpg"
                    alt="Pharmacovigilance Shield"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-[11px] text-slate-600 leading-tight">
                  <span className="font-bold text-rose-900 block">Confidential &amp; Compliant</span>
                  All reported events are processed under strict Pharmacovigilance and CDSCO regulatory guidelines.
                </div>
              </div>

              <button type="submit" className={SUBMIT}>
                REPORT SAFETY EVENT
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* ===================================================== */}
          {/* FORM D: REPORT A PRODUCT QUALITY ISSUE                */}
          {/* ===================================================== */}
          <div className={CARD}>
            <div className="flex items-start gap-3 mb-5">
              <div className={TILE_AMBER}>
                <PackageCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-wide">
                  Report A Product Quality Issue
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Report any suspected product quality concerns such as damaged pack, leakage, discolouration or other defects.
                </p>
              </div>
            </div>

            <form onSubmit={(e) => handleSubmit('Product Quality Complaint', e)} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Product Name *</label>
                  <select
                    required
                    value={formD.product}
                    onChange={(e) => setFormD({ ...formD, product: e.target.value })}
                    className={FIELD}
                  >
                    {products.map((prod, i) => (
                      <option key={i} value={i === 0 ? '' : prod}>{prod}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Batch No. *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Batch No."
                    value={formD.batchNo}
                    onChange={(e) => setFormD({ ...formD, batchNo: e.target.value })}
                    className={FIELD}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Type of Issue *</label>
                <select
                  required
                  value={formD.issueType}
                  onChange={(e) => setFormD({ ...formD, issueType: e.target.value })}
                  className={FIELD}
                >
                  {QUALITY_ISSUE_TYPES.map((issue, i) => (
                    <option key={i} value={i === 0 ? '' : issue}>{issue}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description of Issue *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Please describe the defect, packing anomaly, discoloration, or seal condition..."
                  value={formD.description}
                  onChange={(e) => setFormD({ ...formD, description: e.target.value })}
                  className={AREA}
                />
              </div>

              {/* Upload Illustration & Action */}
              <div className="flex items-center gap-3 p-3.5 bg-slate-50/80 border border-dashed border-slate-300 rounded-2xl hover:border-[#00768a] transition-colors">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-sm">
                  <Image
                    src="/ryan/quality-inspect.jpg"
                    alt="Quality Inspection"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-slate-800 block text-[11px]">Upload Photograph of Defect (Optional)</span>
                  <label className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#00768a] hover:underline cursor-pointer mt-0.5">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose Image (Max 5MB)</span>
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>

              <button type="submit" className={SUBMIT}>
                SUBMIT QUALITY COMPLAINT
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. DIRECT TEAM CONTACT BANNER                             */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#003d4d] via-[#005a6e] to-[#00768a] py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,255,255,0.10),transparent)] pointer-events-none" />
        <div className="absolute -bottom-16 right-0 w-72 h-72 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-1.5 text-center md:text-left">
              <span className="text-[11px] font-bold text-teal-200 uppercase tracking-widest">
                DIRECT PHARMACEUTICAL CHANNEL
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase">
                Connect With Our Medical Information Team
              </h3>
              <p className="text-xs sm:text-sm text-teal-50/90 max-w-2xl leading-relaxed">
                For professional enquiries, you can also reach our medical information team directly through email. We aim to respond to all genuine enquiries promptly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/95 border border-white/60 shadow-lg">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00768a] to-cyan-400 flex items-center justify-center text-white shadow-md">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-slate-500 uppercase">Email Medical Information</div>
                  <a href="mailto:medinfo@ryandermaceutics.com" className="font-mono text-xs font-bold text-[#006070] hover:underline">
                    medinfo@ryandermaceutics.com
                  </a>
                </div>
              </div>

              <a
                href="mailto:medinfo@ryandermaceutics.com"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-teal-50 text-[#004f5e] text-xs font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-all whitespace-nowrap"
              >
                Contact Our Team
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <RyanFooter />
    </div>
  );
}
