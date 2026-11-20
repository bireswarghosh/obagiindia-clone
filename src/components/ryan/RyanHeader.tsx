'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  FileText,
  FileDown,
  BookOpen,
  FlaskConical,
  Stethoscope,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  Layers,
} from 'lucide-react';

export default function RyanHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [doctorsDropdown, setDoctorsDropdown] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileMenuOpen]);

  const isHome = pathname === '/' || pathname === '/home';
  const isAbout = pathname?.includes('about');
  const isProducts = pathname?.includes('products');
  const isDoctors = pathname?.includes('for-doctors') || pathname?.includes('batch-analysis-report');
  const isBatchCOA = pathname?.includes('batch-analysis-report');
  const isContact = pathname?.includes('contact');

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-teal-100/90 shadow-xs transition-all">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Official Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group py-1 shrink-0" style={{ height: '48px', display: 'inline-flex', alignItems: 'center' }}>
            <img
              src="/ryan/ryan-logo.png"
              alt="Ryan Dermaceutics"
              width="176"
              height="48"
              className="h-10 sm:h-12 w-auto object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]"
              style={{ height: '48px', width: 'auto', maxHeight: '48px', maxWidth: '200px', display: 'block', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13.5px] font-medium text-slate-700">
            <Link 
              href="/" 
              className={`transition-colors py-2 ${isHome ? 'text-[#00768a] font-bold border-b-2 border-[#00768a]' : 'hover:text-[#00768a]'}`}
            >
              Home
            </Link>

            <Link 
              href="/about" 
              className={`transition-colors py-2 ${isAbout ? 'text-[#00768a] font-bold border-b-2 border-[#00768a]' : 'hover:text-[#00768a]'}`}
            >
              About Ryan
            </Link>

            {/* Products with Hover Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsDropdown(true)}
              onMouseLeave={() => setProductsDropdown(false)}
            >
              <Link 
                href="/products" 
                className={`flex items-center gap-1 font-semibold transition-colors py-2 ${
                  isProducts ? 'text-[#00768a] border-b-2 border-[#00768a]' : 'hover:text-[#00768a]'
                }`}
              >
                Products
                <ChevronDown className={`w-3.5 h-3.5 text-[#00768a] transition-transform duration-200 ${productsDropdown ? 'rotate-180' : ''}`} />
              </Link>

              {productsDropdown && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-teal-100 py-2.5 z-50 animate-fade-in divide-y divide-slate-100">
                  <div className="py-1">
                    <Link
                      href="/products"
                      className="block px-4 py-2.5 text-xs text-slate-700 hover:bg-teal-50 hover:text-[#00768a] transition rounded-lg mx-1"
                    >
                      <div className="font-bold text-sm text-[#004f5e]">All Formulations (54+)</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">Explore full dermatological portfolio</div>
                    </Link>
                  </div>
                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/products"
                      className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-[#00768a] transition rounded-lg mx-1"
                    >
                      <span className="font-semibold text-slate-800">3 Categories Architecture</span>
                      <div className="text-[10.5px] text-slate-400">Therapeutic Area • Route • Dosage Form</div>
                    </Link>
                    <Link
                      href="/products?route=Topical"
                      className="block px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-[#00768a] transition rounded-lg mx-1"
                    >
                      • Topical Dermatology Range
                    </Link>
                    <Link
                      href="/products?route=Oral"
                      className="block px-4 py-1.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-[#00768a] transition rounded-lg mx-1"
                    >
                      • Oral &amp; Systemic Range
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* For Doctors Mega Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setDoctorsDropdown(true)}
              onMouseLeave={() => setDoctorsDropdown(false)}
            >
              <Link 
                href="/for-doctors"
                className={`flex items-center gap-1 font-semibold transition-colors py-2 ${
                  isDoctors ? 'text-[#00768a] border-b-2 border-[#00768a]' : 'hover:text-[#00768a]'
                }`}
              >
                For Doctors
                <ChevronDown className={`w-3.5 h-3.5 text-[#00768a] transition-transform duration-200 ${doctorsDropdown ? 'rotate-180' : ''}`} />
              </Link>

              {doctorsDropdown && (
                <div className="absolute top-full left-0 w-96 bg-white rounded-2xl shadow-2xl border border-teal-100 p-3 z-50 animate-fade-in space-y-1.5">
                  <div className="p-2.5 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#004f5e] uppercase tracking-wider">Clinical Portals</div>
                      <div className="text-[11px] text-slate-500">Verified medical documentation &amp; batch QA</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#00768a] text-white text-[10px] font-bold">WHO-GMP</span>
                  </div>

                  {/* Batch Analysis Report Link (Prominent) */}
                  <Link
                    href="/batch-analysis-report"
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-emerald-50/80 border border-transparent hover:border-emerald-200 transition group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#003d4d] group-hover:text-emerald-800 flex items-center gap-1.5">
                        Batch Analysis &amp; COA Portal
                        <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase">Official COA</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal">Analytical test releases &amp; signed certificates</div>
                    </div>
                  </Link>

                  {/* Product Monographs (PDF) */}
                  <Link
                    href="/for-doctors/product-monographs"
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-teal-50/80 border border-transparent hover:border-teal-200 transition group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-[#00768a] flex items-center justify-center shrink-0 mt-0.5">
                      <FileDown className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#003d4d] group-hover:text-[#00768a] flex items-center gap-1.5">
                        Product Monographs
                        <span className="px-1.5 py-0.2 rounded bg-teal-100 text-[#00768a] text-[9px] font-black uppercase">Vector PDF</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal">Official clinical dossiers with auto-wrap A4 downloads</div>
                    </div>
                  </Link>

                  {/* Prescribing Information */}
                  <Link
                    href="/for-doctors/prescribing-information"
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-teal-50/80 border border-transparent hover:border-teal-200 transition group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-[#003d4d] group-hover:text-[#00768a]">
                        Prescribing Information (PI)
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal">Schedule H posology, dosage cards &amp; precautions</div>
                    </div>
                  </Link>

                  {/* Download Centre & Therapeutic Resources */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-slate-100">
                    <Link
                      href="/for-doctors/therapeutic-resources#download-centre"
                      className="p-2 rounded-lg hover:bg-slate-50 text-[11px] font-semibold text-slate-700 hover:text-[#00768a] transition"
                    >
                      <div className="text-[#004f5e] font-bold">Download Centre</div>
                      <div className="text-[10px] text-slate-400 font-normal">COAs &amp; Resources</div>
                    </Link>
                    <Link
                      href="/for-doctors/therapeutic-resources"
                      className="p-2 rounded-lg hover:bg-slate-50 text-[11px] font-semibold text-slate-700 hover:text-[#00768a] transition"
                    >
                      <div className="text-[#004f5e] font-bold">Therapeutic Hub</div>
                      <div className="text-[10px] text-slate-400 font-normal">10 Clinical Areas</div>
                    </Link>
                    <Link
                      href="/for-doctors/reference-library"
                      className="p-2 rounded-lg hover:bg-slate-50 text-[11px] font-semibold text-slate-700 hover:text-[#00768a] transition"
                    >
                      <div className="text-[#004f5e] font-bold">Reference Library</div>
                      <div className="text-[10px] text-slate-400 font-normal">Diagnostic Guides</div>
                    </Link>
                    <Link
                      href="/for-doctors/medical-information"
                      className="p-2 rounded-lg hover:bg-slate-50 text-[11px] font-semibold text-slate-700 hover:text-[#00768a] transition"
                    >
                      <div className="text-[#004f5e] font-bold">Medical Info Desk</div>
                      <div className="text-[10px] text-slate-400 font-normal">Safety &amp; Queries</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Batch COA Pill */}
            <Link
              href="/batch-analysis-report"
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                isBatchCOA
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Batch COA</span>
            </Link>

            <Link 
              href="/contact-us" 
              className={`transition-colors py-2 ${isContact ? 'text-[#00768a] font-bold border-b-2 border-[#00768a]' : 'hover:text-[#00768a]'}`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#00768a] hover:bg-[#006070] active:scale-95 rounded-xl shadow-xs transition-all"
            >
              Explore Products
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button (Hamburger / 3 lines) */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-slate-700 hover:text-[#00768a] hover:bg-teal-50/80 rounded-xl transition border border-slate-200"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#00768a]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Clean, Modern, Fully Responsive) */}
      {mounted && createPortal(
        <div
          className={`lg:hidden fixed inset-0 z-[99999] ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          aria-hidden={!mobileMenuOpen}
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className={`fixed inset-0 bg-[#002530]/60 backdrop-blur-xs transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {/* Drawer Panel */}
          <div
            className={`fixed left-0 top-0 bottom-0 w-[86vw] max-w-[340px] h-full max-h-screen bg-white shadow-2xl flex flex-col z-[100000] transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-[110%]'
            }`}
            role="dialog"
            aria-label="Site navigation"
          >
            {/* Drawer Top Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-teal-100 shrink-0 bg-white">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-black tracking-widest text-[#004f5e] uppercase">
                  Ryan Dermaceutics
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 pt-3 pb-8 space-y-4">
              
              {/* Primary Pages */}
              <div className="space-y-1 text-sm font-semibold text-slate-800">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2.5 px-3.5 rounded-xl transition ${isHome ? 'bg-teal-50 text-[#00768a] font-bold' : 'hover:bg-slate-50'}`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2.5 px-3.5 rounded-xl transition ${isAbout ? 'bg-teal-50 text-[#00768a] font-bold' : 'hover:bg-slate-50'}`}
                >
                  About Ryan
                </Link>
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2.5 px-3.5 rounded-xl transition ${isProducts ? 'bg-teal-50 text-[#00768a] font-bold' : 'hover:bg-slate-50'}`}
                >
                  Products Catalog (3 Categories)
                </Link>
                <Link
                  href="/batch-analysis-report"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-emerald-50/90 text-emerald-900 border border-emerald-200 font-bold"
                >
                  <span className="flex items-center gap-2 text-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Batch Analysis &amp; COA
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-900 text-[9px] font-black uppercase">WHO-GMP</span>
                </Link>
              </div>

              {/* For Doctors Clinical Section (Dedicated Card) */}
              <div className="p-3.5 bg-gradient-to-b from-teal-50/90 to-cyan-50/50 rounded-2xl border border-teal-100 space-y-2">
                <div className="flex items-center justify-between pb-1">
                  <div className="text-[11px] font-black text-[#006070] uppercase tracking-wider flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-[#00768a]" />
                    For Doctors Portal
                  </div>
                  <span className="text-[10px] text-teal-700 font-bold">8 Sections</span>
                </div>

                <Link
                  href="/for-doctors"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 rounded-xl bg-white text-xs font-bold text-[#00768a] shadow-2xs border border-teal-100"
                >
                  Doctor Portal Overview
                </Link>
                <Link
                  href="/batch-analysis-report"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 rounded-xl bg-white text-xs font-semibold text-emerald-800 shadow-2xs flex items-center justify-between"
                >
                  <span>Batch Analysis &amp; COA</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">Official</span>
                </Link>
                <Link
                  href="/for-doctors/product-monographs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 rounded-xl bg-white text-xs font-semibold text-[#004f5e] shadow-2xs flex items-center justify-between"
                >
                  <span>Product Monographs</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-teal-100 text-[#00768a] font-bold">PDF</span>
                </Link>
                <Link
                  href="/for-doctors/prescribing-information"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 rounded-xl bg-white text-xs font-semibold text-[#004f5e] shadow-2xs"
                >
                  Prescribing Information
                </Link>
                <Link
                  href="/for-doctors/therapeutic-resources#download-centre"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 rounded-xl bg-white text-xs font-semibold text-[#004f5e] shadow-2xs"
                >
                  Download Centre (Batch COAs)
                </Link>
                <Link
                  href="/for-doctors/therapeutic-resources"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 rounded-xl bg-white text-xs font-semibold text-[#004f5e] shadow-2xs"
                >
                  Therapeutic Resources Hub
                </Link>
                <Link
                  href="/for-doctors/reference-library"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 rounded-xl bg-white text-xs font-semibold text-[#004f5e] shadow-2xs"
                >
                  Dermatology Reference Library
                </Link>
                <Link
                  href="/for-doctors/medical-information"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block p-2 rounded-xl bg-white text-xs font-semibold text-[#004f5e] shadow-2xs"
                >
                  Medical Information Desk
                </Link>
              </div>

              {/* Contact Link */}
              <div className="pt-1">
                <Link
                  href="/contact-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2.5 px-3.5 rounded-xl font-semibold text-sm transition ${isContact ? 'bg-teal-50 text-[#00768a]' : 'text-slate-800 hover:bg-slate-50'}`}
                >
                  Contact Us
                </Link>
              </div>

              {/* CTA Explore Button */}
              <div className="pt-2">
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#00768a] hover:bg-[#006070] rounded-xl shadow-md transition"
                >
                  Explore All Products (54+)
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
