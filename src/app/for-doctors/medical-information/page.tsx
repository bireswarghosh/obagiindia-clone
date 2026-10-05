'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import RyanHeader from '@/components/ryan/RyanHeader';
import RyanFooter from '@/components/ryan/RyanFooter';
import {
  FileText,
  FlaskConical,
  ShieldAlert,
  AlertOctagon,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Send,
  Upload,
  Mail,
  HelpCircle,
  Stethoscope,
  Building,
  User,
  Phone,
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

export default function MedicalInformationPage() {
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
      {/* 1. HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#e6f4f7] via-[#f1f9fb] to-[#f8fafc] border-b border-teal-100/60 pt-6 pb-12 lg:pt-8 lg:pb-16">
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
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/80 border border-teal-200 text-[#006070] text-xs font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#00768a]" />
                FOR DOCTORS
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#003d4d] tracking-tight leading-tight">
                MEDICAL <br className="hidden sm:inline" />
                <span className="text-[#00768a]">INFORMATION</span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                Connect with our Medical Information team for product-related scientific information, prescribing queries, safety information, quality concerns and other professional enquiries.
              </p>

              <div className="pt-2 flex flex-wrap gap-3 text-xs">
                <a
                  href="#product-enquiry"
                  className="px-4 py-2 rounded-lg bg-[#00768a] text-white font-bold hover:bg-[#005f70] transition shadow-xs"
                >
                  Product Information Enquiry
                </a>
                <a
                  href="#safety-reporting"
                  className="px-4 py-2 rounded-lg bg-white border border-rose-200 text-rose-700 font-bold hover:bg-rose-50 transition shadow-xs"
                >
                  Pharmacovigilance Reporting
                </a>
              </div>
            </div>

            {/* Right Graphic Banner (Doctor with tablet + hexagonal icons) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-2 border-white/80 bg-white group">
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <Image
                    src="/ryan/hero-medical-doc.jpg"
                    alt="Your Questions Our Support - Ryan Medical Information"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  {/* Cursive overlay text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003d4d]/85 via-transparent to-transparent flex items-end p-5">
                    <div className="text-white">
                      <div className="font-serif italic text-xl sm:text-2xl text-teal-100 font-medium">
                        "Your Questions, Our Support"
                      </div>
                      <div className="text-[11px] text-teal-200/80 font-medium tracking-wide mt-0.5">
                        Direct scientific channel for healthcare practitioners
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
      {/* 2. FOUR TRUST PILLAR BADGES (Matching Mockup)             */}
      {/* ========================================================= */}
      <section className="bg-white border-b border-teal-100/80 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center md:text-left">
            {/* Badge 1 */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00768a] shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">ACCURATE INFORMATION</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Product-related scientific support</p>
              </div>
            </div>

            {/* Badge 2 */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#00768a] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">SCIENTIFIC RESPONSE</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Timely and evidence-based</p>
              </div>
            </div>

            {/* Badge 3 */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">PATIENT SAFETY</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Commitment to pharmacovigilance</p>
              </div>
            </div>

            {/* Badge 4 */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">PROFESSIONAL SUPPORT</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">For healthcare professionals</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. FOUR CLINICAL DOCTOR INQUIRY FORMS (2x2 Grid)          */}
      {/* ========================================================= */}
      <section className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* ===================================================== */}
          {/* FORM A: PRODUCT INFORMATION ENQUIRY                   */}
          {/* ===================================================== */}
          <div id="product-enquiry" className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-[#00768a] shrink-0">
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
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                  >
                    {RYAN_PRODUCTS.map((prod, i) => (
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
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
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
                  className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                />
              </div>

              {/* Doctor Details Grid */}
              <div className="pt-2 border-t border-slate-100">
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
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
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
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
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
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
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
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
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
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
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
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#00768a] hover:bg-[#005f70] active:scale-95 text-white font-bold uppercase tracking-wider text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-4"
              >
                SUBMIT ENQUIRY
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* ===================================================== */}
          {/* FORM B: SCIENTIFIC INFORMATION REQUEST                */}
          {/* ===================================================== */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-cyan-50 border border-cyan-100 flex items-center justify-center text-[#00768a] shrink-0">
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
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
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
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
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
                  className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Supporting Information (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Reference journal citation, specific study, or trial registry number"
                  value={formB.supportingInfo}
                  onChange={(e) => setFormB({ ...formB, supportingInfo: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Doctor Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={formB.name}
                    onChange={(e) => setFormB({ ...formB, name: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
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
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
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
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#00768a] hover:bg-[#005f70] active:scale-95 text-white font-bold uppercase tracking-wider text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-4"
              >
                SUBMIT REQUEST
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* ===================================================== */}
          {/* FORM C: REPORT A PRODUCT SAFETY EVENT (Pharmacovigilance)*/}
          {/* ===================================================== */}
          <div id="safety-reporting" className="bg-white rounded-2xl p-6 sm:p-7 border border-rose-200/90 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-wide flex items-center gap-2">
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
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  >
                    {RYAN_PRODUCTS.map((prod, i) => (
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
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500"
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
                  className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Date of Event</label>
                  <input
                    type="date"
                    value={formC.eventDate}
                    onChange={(e) => setFormC({ ...formC, eventDate: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-0.5">Patient Age & Sex</label>
                  <input
                    type="text"
                    placeholder="e.g. 34 yrs / Female"
                    value={formC.patientAgeSex}
                    onChange={(e) => setFormC({ ...formC, patientAgeSex: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="relative p-3 rounded-xl bg-rose-50/60 border border-rose-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-rose-200">
                    <Image
                      src="/ryan/safety-shield.jpg"
                      alt="Pharmacovigilance Shield"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-[11px] text-slate-600 leading-tight">
                    <span className="font-bold text-rose-900 block">Confidential & Compliant</span>
                    All reported events are processed under strict Pharmacovigilance and CDSCO regulatory guidelines.
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#00768a] hover:bg-[#005f70] active:scale-95 text-white font-bold uppercase tracking-wider text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-4"
              >
                REPORT SAFETY EVENT
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* ===================================================== */}
          {/* FORM D: REPORT A PRODUCT QUALITY ISSUE                */}
          {/* ===================================================== */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
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
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                  >
                    {RYAN_PRODUCTS.map((prod, i) => (
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
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Type of Issue *</label>
                <select
                  required
                  value={formD.issueType}
                  onChange={(e) => setFormD({ ...formD, issueType: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
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
                  className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#00768a]"
                />
              </div>

              {/* Upload Illustration & Action */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200">
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

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#00768a] hover:bg-[#005f70] active:scale-95 text-white font-bold uppercase tracking-wider text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-4"
              >
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
      <section className="bg-gradient-to-r from-[#e6f4f7] via-[#eff8fa] to-[#e6f4f7] border-y border-teal-200/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-[11px] font-bold text-[#00768a] uppercase tracking-widest">
                DIRECT PHARMACEUTICAL CHANNEL
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#003d4d] tracking-tight uppercase">
                Connect With Our Medical Information Team
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                For professional enquiries, you can also reach our medical information team directly through email. We aim to respond to all genuine enquiries promptly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-teal-200 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-[#00768a]">
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
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all whitespace-nowrap"
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
