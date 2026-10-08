'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, FileText, GraduationCap, Stethoscope, Briefcase, TrendingUp, Award, Users } from 'lucide-react';
import { ThemeColors } from '@/types/content';

interface PartnerProps {
  theme?: ThemeColors;
}

export default function PartnerSection({ theme }: PartnerProps) {
  return (
    <section id="partner" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-b" style={{ borderColor: theme?.borderColor || 'rgba(0, 118, 138, 0.12)' }}>
      <div className="max-w-7xl mx-auto space-y-20 sm:space-y-24">
        
        {/* 1. Supporting Dermatology Practice, Every Day (from home_client_image_8.png) */}
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#00768a] bg-teal-50 px-3.5 py-1 rounded-full border border-teal-200">
                BUILT FOR PROFESSIONAL DERMATOLOGY
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#003d4d]">
                SUPPORTING DERMATOLOGY <span className="text-[#00768a]">PRACTICE, EVERY DAY</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Access our product portfolio, detailed product information and professional resources through a platform designed to make relevant dermatology information easier to discover.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#00768a] hover:bg-[#005f70] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
              >
                <span>Explore Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border border-[#00768a] text-[#00768a] hover:bg-teal-50 text-xs font-bold uppercase tracking-wider transition-all"
              >
                <span>Contact Our Team</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Product Information */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 text-[#00768a] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-sm uppercase text-slate-900 group-hover:text-[#00768a] transition-colors">
                  PRODUCT INFORMATION
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Explore our complete portfolio with detailed composition and dosage information.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200/60">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00768a] group-hover:translate-x-1 transition-transform"
                >
                  <span>EXPLORE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2: Product Monographs */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 text-[#00768a] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-sm uppercase text-slate-900 group-hover:text-[#00768a] transition-colors">
                  PRODUCT MONOGRAPHS
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Download detailed product monographs for healthcare professionals.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200/60">
                <Link
                  href="/for-doctors/therapeutic-resources"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00768a] group-hover:translate-x-1 transition-transform"
                >
                  <span>VIEW RESOURCES</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3: Therapeutic Resources */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-sm uppercase text-slate-900 group-hover:text-emerald-700 transition-colors">
                  THERAPEUTIC RESOURCES
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Access dermatology insights, clinical updates and educational materials.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200/60">
                <Link
                  href="/for-doctors/reference-library"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform"
                >
                  <span>EXPLORE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 4: Medical Information */}
            <div className="p-6 sm:p-7 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-teal-300 hover:shadow-lg transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-sm uppercase text-slate-900 group-hover:text-indigo-700 transition-colors">
                  MEDICAL INFORMATION
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Connect with our team for product-related medical information and queries.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-200/60">
                <Link
                  href="/for-doctors/medical-information"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 group-hover:translate-x-1 transition-transform"
                >
                  <span>CONTACT US</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Partner with Ryan Dermaceutics / Build the Future Together (from home_client_image_10.png) */}
        <div className="space-y-12 bg-gradient-to-br from-[#002530] via-[#003d4d] to-[#005263] text-white p-8 sm:p-12 rounded-3xl shadow-xl border border-teal-800">
          <div className="max-w-3xl space-y-3">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-teal-300 bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
              PARTNER WITH RYAN DERMACEUTICS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              BUILD THE FUTURE OF <span className="text-teal-300">DERMATOLOGY TOGETHER</span>
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
              Ryan Dermaceutics works with healthcare professionals, distribution partners and business associates to expand access to a focused and growing dermatology portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 4 Feature Pillars */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1.5">
                <div className="flex items-center gap-2 text-teal-300 font-bold text-xs uppercase">
                  <TrendingUp className="w-4 h-4" />
                  <span>Attractive Opportunity</span>
                </div>
                <p className="text-[11px] text-teal-100/80 leading-relaxed">
                  Be part of a growing dermatology division with a comprehensive portfolio.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1.5">
                <div className="flex items-center gap-2 text-teal-300 font-bold text-xs uppercase">
                  <Award className="w-4 h-4" />
                  <span>Quality Products</span>
                </div>
                <p className="text-[11px] text-teal-100/80 leading-relaxed">
                  A focused range of topical, oral and hair care products manufactured to WHO-GMP standards.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1.5">
                <div className="flex items-center gap-2 text-teal-300 font-bold text-xs uppercase">
                  <Briefcase className="w-4 h-4" />
                  <span>Marketing Support</span>
                </div>
                <p className="text-[11px] text-teal-100/80 leading-relaxed">
                  Promotional support, visual aids and clinical practice development initiatives.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-1.5">
                <div className="flex items-center gap-2 text-teal-300 font-bold text-xs uppercase">
                  <Users className="w-4 h-4" />
                  <span>Long-Term Partnership</span>
                </div>
                <p className="text-[11px] text-teal-100/80 leading-relaxed">
                  Working together for sustainable clinical growth and mutual professional success.
                </p>
              </div>
            </div>

            {/* 4 Interactive Action Cards */}
            <div className="lg:col-span-5 space-y-2.5 text-xs font-bold">
              <Link
                href="#contact"
                className="p-3.5 rounded-xl bg-white hover:bg-teal-50 text-slate-900 transition-all flex items-center justify-between group shadow-sm"
              >
                <div>
                  <span className="block font-black text-xs text-[#003d4d]">DISTRIBUTOR PARTNERSHIP</span>
                  <span className="text-[11px] text-slate-500 font-normal">Expand your business with our dermatology portfolio.</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#00768a] group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>

              <Link
                href="#contact"
                className="p-3.5 rounded-xl bg-white hover:bg-teal-50 text-slate-900 transition-all flex items-center justify-between group shadow-sm"
              >
                <div>
                  <span className="block font-black text-xs text-[#003d4d]">BUSINESS ENQUIRY</span>
                  <span className="text-[11px] text-slate-500 font-normal">Explore institutional and business collaboration opportunities.</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#00768a] group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>

              <Link
                href="#contact"
                className="p-3.5 rounded-xl bg-white hover:bg-teal-50 text-slate-900 transition-all flex items-center justify-between group shadow-sm"
              >
                <div>
                  <span className="block font-black text-xs text-[#003d4d]">PRODUCT ENQUIRY</span>
                  <span className="text-[11px] text-slate-500 font-normal">Get product formulation details, availability and supply support.</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#00768a] group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>

              <Link
                href="/for-doctors/medical-information"
                className="p-3.5 rounded-xl bg-white hover:bg-teal-50 text-slate-900 transition-all flex items-center justify-between group shadow-sm"
              >
                <div>
                  <span className="block font-black text-xs text-[#003d4d]">MEDICAL INFORMATION</span>
                  <span className="text-[11px] text-slate-500 font-normal">Connect directly with our medical desk for queries.</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#00768a] group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
