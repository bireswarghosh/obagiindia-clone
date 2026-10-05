'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ChevronDown, ExternalLink, ArrowRight } from 'lucide-react';

export default function RyanHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [doctorsDropdown, setDoctorsDropdown] = useState(false);

  const isHome = pathname === '/' || pathname === '/home';
  const isAbout = pathname?.includes('about');
  const isProducts = pathname?.includes('products');
  const isTherapeutic = pathname?.includes('therapeutic-resources');
  const isMedicalInfo = pathname?.includes('medical-information');
  const isPrescribing = pathname?.includes('prescribing-information');
  const isReferenceLib = pathname?.includes('reference-library');

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-teal-100/80 shadow-xs transition-all">
      {/* Top Quick Bar for Doctor Portal navigation */}
      <div className="bg-gradient-to-r from-[#004f5e] via-[#006070] to-[#007a8a] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-bold tracking-wide">Doctor Portal:</span>
            <span className="text-teal-100 hidden sm:inline">Direct Clinical & Scientific Resources</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-3 font-medium flex-wrap">
            <Link
              href="/for-doctors/therapeutic-resources"
              className={`px-2 py-0.5 rounded transition text-[11px] sm:text-xs ${
                isTherapeutic
                  ? 'bg-white text-[#006070] font-bold shadow-xs'
                  : 'text-teal-100 hover:text-white hover:bg-white/10'
              }`}
            >
              Therapeutic Resources
            </Link>
            <span className="text-teal-300/40 hidden sm:inline">|</span>
            <Link
              href="/for-doctors/prescribing-information"
              className={`px-2 py-0.5 rounded transition text-[11px] sm:text-xs ${
                isPrescribing
                  ? 'bg-white text-[#006070] font-bold shadow-xs'
                  : 'text-teal-100 hover:text-white hover:bg-white/10'
              }`}
            >
              Prescribing Info
            </Link>
            <span className="text-teal-300/40 hidden sm:inline">|</span>
            <Link
              href="/for-doctors/reference-library"
              className={`px-2 py-0.5 rounded transition text-[11px] sm:text-xs ${
                isReferenceLib
                  ? 'bg-white text-[#006070] font-bold shadow-xs'
                  : 'text-teal-100 hover:text-white hover:bg-white/10'
              }`}
            >
              Reference Library
            </Link>
            <span className="text-teal-300/40 hidden sm:inline">|</span>
            <Link
              href="/for-doctors/medical-information"
              className={`px-2 py-0.5 rounded transition text-[11px] sm:text-xs ${
                isMedicalInfo
                  ? 'bg-white text-[#006070] font-bold shadow-xs'
                  : 'text-teal-100 hover:text-white hover:bg-white/10'
              }`}
            >
              Medical Info
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00768a] to-[#004f5e] flex items-center justify-center text-white font-serif font-black text-2xl shadow-md shadow-teal-900/10 group-hover:scale-105 transition-transform">
              R
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black tracking-widest text-[#003d4d] text-xl sm:text-2xl leading-none">
                RYAN
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-[#00768a] uppercase mt-0.5 leading-none">
                DERMACEUTICS
              </span>
              <span className="text-[7.5px] sm:text-[8px] font-semibold tracking-wider text-slate-400 uppercase mt-0.5">
                A Specialized Dermatology Division
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[13.5px] font-medium text-slate-700">
            <Link 
              href="/home" 
              className={`transition-colors py-1 ${isHome ? 'text-[#00768a] font-bold' : 'hover:text-[#00768a]'}`}
            >
              Home
            </Link>

            <Link 
              href="/about" 
              className={`transition-colors py-1 ${isAbout ? 'text-[#00768a] font-bold' : 'hover:text-[#00768a]'}`}
            >
              About Ryan
            </Link>

            <Link 
              href="/home#therapeutic-areas" 
              className="hover:text-[#00768a] transition-colors py-1"
            >
              Therapeutic Areas
            </Link>

            <Link 
              href="/products" 
              className={`transition-colors py-1 ${isProducts ? 'text-[#00768a] font-bold' : 'hover:text-[#00768a]'}`}
            >
              Products
            </Link>
            
            {/* For Doctors dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setDoctorsDropdown(true)}
              onMouseLeave={() => setDoctorsDropdown(false)}
            >
              <button 
                className={`flex items-center gap-1 font-semibold transition-colors py-2 ${
                  isTherapeutic || isMedicalInfo || isPrescribing || isReferenceLib ? 'text-[#00768a] border-b-2 border-[#00768a]' : 'hover:text-[#00768a]'
                }`}
              >
                For Doctors
                <ChevronDown className="w-3.5 h-3.5 text-[#00768a]" />
              </button>

              {doctorsDropdown && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-teal-100 py-3 z-50 animate-fade-in divide-y divide-slate-100">
                  <div className="py-1">
                    <Link
                      href="/for-doctors/therapeutic-resources"
                      className={`block px-4 py-2.5 text-xs transition ${
                        isTherapeutic ? 'bg-teal-50 text-[#00768a] font-bold' : 'text-slate-700 hover:bg-slate-50 hover:text-[#00768a]'
                      }`}
                    >
                      <div className="font-bold text-sm text-[#004f5e]">Therapeutic Resources Hub</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">Topic guides, clinical insights & portal</div>
                    </Link>
                  </div>
                  
                  <div className="py-1">
                    <Link
                      href="/products"
                      className={`block px-4 py-2.5 text-xs transition ${
                        isProducts ? 'bg-teal-50 text-[#00768a] font-bold' : 'text-slate-700 hover:bg-slate-50 hover:text-[#00768a]'
                      }`}
                    >
                      <div className="font-bold text-sm text-[#004f5e]">Product Monographs Directory</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">53 formulations with full 19-section clinical data</div>
                    </Link>

                    <Link
                      href="/for-doctors/prescribing-information"
                      className={`block px-4 py-2.5 text-xs transition ${
                        isPrescribing ? 'bg-teal-50 text-[#00768a] font-bold' : 'text-slate-700 hover:bg-slate-50 hover:text-[#00768a]'
                      }`}
                    >
                      <div className="font-bold text-sm text-[#004f5e]">Prescribing Information</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">Quick prescribing cards & regulatory specs</div>
                    </Link>

                    <Link
                      href="/for-doctors/reference-library"
                      className={`block px-4 py-2.5 text-xs transition ${
                        isReferenceLib ? 'bg-teal-50 text-[#00768a] font-bold' : 'text-slate-700 hover:bg-slate-50 hover:text-[#00768a]'
                      }`}
                    >
                      <div className="font-bold text-sm text-[#004f5e]">Dermatology Reference Library</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">10 clinical areas & 11-step diagnostic monographs</div>
                    </Link>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/for-doctors/medical-information"
                      className={`block px-4 py-2.5 text-xs transition ${
                        isMedicalInfo ? 'bg-teal-50 text-[#00768a] font-bold' : 'text-slate-700 hover:bg-slate-50 hover:text-[#00768a]'
                      }`}
                    >
                      <div className="font-bold text-sm text-[#004f5e]">Medical Information Service</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">Safety reports, queries & complaints forms</div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/home#contact" className="hover:text-[#00768a] transition-colors py-1">
              Contact
            </Link>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3.5">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#00768a] hover:bg-[#006070] active:scale-95 rounded-xl shadow-sm shadow-teal-800/20 transition-all"
            >
              Explore Products
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-[#00768a] hover:bg-slate-100 rounded-lg transition"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-teal-100 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-fade-in">
          <div className="p-3 bg-teal-50/80 rounded-xl space-y-2 border border-teal-100">
            <div className="text-xs font-bold text-[#006070] uppercase tracking-wider">For Doctors Portal</div>
            <Link
              href="/for-doctors/therapeutic-resources"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-lg bg-white text-xs font-semibold text-[#004f5e] shadow-2xs"
            >
              Therapeutic Resources Hub
            </Link>
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-lg bg-white text-xs font-semibold text-[#004f5e] shadow-2xs"
            >
              Product Monographs (53 Products)
            </Link>
            <Link
              href="/for-doctors/prescribing-information"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-lg bg-white text-xs font-semibold text-[#004f5e] shadow-2xs"
            >
              Prescribing Information
            </Link>
            <Link
              href="/for-doctors/reference-library"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-lg bg-white text-xs font-semibold text-[#004f5e] shadow-2xs"
            >
              Dermatology Reference Library
            </Link>
            <Link
              href="/for-doctors/medical-information"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-2 rounded-lg bg-white text-xs font-semibold text-[#004f5e] shadow-2xs"
            >
              Medical Information Service
            </Link>
          </div>

          <div className="space-y-1 text-sm font-medium text-slate-700 divide-y divide-slate-100">
            <Link href="/home" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-lg hover:bg-slate-50">
              Home
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-lg hover:bg-slate-50">
              About Ryan
            </Link>
            <Link href="/products" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-lg hover:bg-slate-50">
              Products
            </Link>
            <Link href="/home#therapeutic-areas" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-lg hover:bg-slate-50">
              Therapeutic Areas
            </Link>
            <Link href="/home#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-lg hover:bg-slate-50">
              Contact
            </Link>
          </div>

          <div className="pt-2">
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex justify-center items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#00768a] rounded-xl shadow-md"
            >
              Explore Products →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
