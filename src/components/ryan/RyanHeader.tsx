'use client';

import React, { useState } from 'react';
import Link from 'next/navigation';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ChevronDown, ExternalLink } from 'lucide-react';

export default function RyanHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [doctorsDropdown, setDoctorsDropdown] = useState(false);

  const isTherapeutic = pathname?.includes('therapeutic-resources');
  const isMedicalInfo = pathname?.includes('medical-information');

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-teal-100/80 shadow-sm transition-all">
      {/* Top Quick Bar for prototype navigation */}
      <div className="bg-gradient-to-r from-[#006070] to-[#007a8a] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium tracking-wide">Doctor Portal:</span>
            <span className="text-teal-100">Direct Clinical & Scientific Resources</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 font-medium flex-wrap">
            <a
              href="/for-doctors/therapeutic-resources"
              className={`px-2 py-0.5 rounded transition text-[11px] sm:text-xs ${
                isTherapeutic
                  ? 'bg-white text-[#006070] font-bold shadow-xs'
                  : 'text-teal-100 hover:text-white hover:bg-white/10'
              }`}
            >
              Therapeutic Resources
            </a>
            <span className="text-teal-300/40 hidden sm:inline">|</span>
            <a
              href="/for-doctors/prescribing-information"
              className={`px-2 py-0.5 rounded transition text-[11px] sm:text-xs ${
                pathname?.includes('prescribing-information')
                  ? 'bg-white text-[#006070] font-bold shadow-xs'
                  : 'text-teal-100 hover:text-white hover:bg-white/10'
              }`}
            >
              Prescribing Info
            </a>
            <span className="text-teal-300/40 hidden sm:inline">|</span>
            <a
              href="/for-doctors/reference-library"
              className={`px-2 py-0.5 rounded transition text-[11px] sm:text-xs ${
                pathname?.includes('reference-library')
                  ? 'bg-white text-[#006070] font-bold shadow-xs'
                  : 'text-teal-100 hover:text-white hover:bg-white/10'
              }`}
            >
              Reference Library
            </a>
            <span className="text-teal-300/40 hidden sm:inline">|</span>
            <a
              href="/for-doctors/medical-information"
              className={`px-2 py-0.5 rounded transition text-[11px] sm:text-xs ${
                isMedicalInfo
                  ? 'bg-white text-[#006070] font-bold shadow-xs'
                  : 'text-teal-100 hover:text-white hover:bg-white/10'
              }`}
            >
              Medical Info
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/for-doctors/therapeutic-resources" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00768a] to-[#004f5e] flex items-center justify-center text-white font-serif font-black text-2xl shadow-md shadow-teal-900/10 group-hover:scale-105 transition-transform">
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
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-[13.5px] font-medium text-slate-700">
            <a href="/for-doctors/therapeutic-resources" className="hover:text-[#00768a] transition-colors">Home</a>
            <a href="/for-doctors/therapeutic-resources" className="hover:text-[#00768a] transition-colors">About Ryan</a>
            <a href="/for-doctors/therapeutic-resources" className="hover:text-[#00768a] transition-colors">Therapeutic Areas</a>
            <a href="/for-doctors/prescribing-information" className="hover:text-[#00768a] transition-colors">Products</a>
            
            {/* For Doctors dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setDoctorsDropdown(true)}
              onMouseLeave={() => setDoctorsDropdown(false)}
            >
              <button 
                className={`flex items-center gap-1 font-semibold transition-colors py-2 ${
                  isTherapeutic || isMedicalInfo || pathname?.includes('prescribing') || pathname?.includes('library') ? 'text-[#00768a] border-b-2 border-[#00768a]' : 'hover:text-[#00768a]'
                }`}
              >
                For Doctors
                <ChevronDown className="w-3.5 h-3.5 text-[#00768a]" />
              </button>

              {doctorsDropdown && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-teal-100 py-2.5 z-50 animate-fade-in divide-y divide-slate-100">
                  <div className="py-1">
                    <a
                      href="/for-doctors/therapeutic-resources"
                      className={`block px-4 py-2 text-xs transition ${
                        isTherapeutic ? 'bg-teal-50 text-[#00768a] font-bold' : 'text-slate-700 hover:bg-slate-50 hover:text-[#00768a]'
                      }`}
                    >
                      <div className="font-semibold text-sm text-[#004f5e]">Therapeutic Resources Hub</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">Topic guides, clinical insights & portal</div>
                    </a>
                  </div>
                  <div className="py-1">
                    <a
                      href="/for-doctors/prescribing-information"
                      className={`block px-4 py-2 text-xs transition ${
                        pathname?.includes('prescribing-information') ? 'bg-teal-50 text-[#00768a] font-bold' : 'text-slate-700 hover:bg-slate-50 hover:text-[#00768a]'
                      }`}
                    >
                      <div className="font-semibold text-sm text-[#004f5e]">Prescribing Information</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">Product monographs & regulatory guidance</div>
                    </a>
                    <a
                      href="/for-doctors/reference-library"
                      className={`block px-4 py-2 text-xs transition ${
                        pathname?.includes('reference-library') ? 'bg-teal-50 text-[#00768a] font-bold' : 'text-slate-700 hover:bg-slate-50 hover:text-[#00768a]'
                      }`}
                    >
                      <div className="font-semibold text-sm text-[#004f5e]">Dermatology Reference Library</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">10 domains & 11-step diagnostic monographs</div>
                    </a>
                  </div>
                  <div className="py-1">
                    <a
                      href="/for-doctors/medical-information"
                      className={`block px-4 py-2 text-xs transition ${
                        isMedicalInfo ? 'bg-teal-50 text-[#00768a] font-bold' : 'text-slate-700 hover:bg-slate-50 hover:text-[#00768a]'
                      }`}
                    >
                      <div className="font-semibold text-sm text-[#004f5e]">Medical Information Service</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">Safety reports, queries & complaints</div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a href="/for-doctors/therapeutic-resources#download" className="hover:text-[#00768a] transition-colors">Resources</a>
            <a href="/for-doctors/medical-information" className="hover:text-[#00768a] transition-colors">Contact</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3.5">
            <button 
              aria-label="Search"
              className="p-2 text-slate-500 hover:text-[#00768a] hover:bg-teal-50 rounded-full transition"
            >
              <Search className="w-4 h-4" />
            </button>
            <a
              href="/for-doctors/prescribing-information"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#00768a] hover:bg-[#006070] active:scale-95 rounded-lg shadow-sm shadow-teal-800/20 transition-all"
            >
              Explore Products
              <span className="text-teal-200">→</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-[#00768a] hover:bg-slate-100 rounded-lg transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-teal-100 px-4 pt-2 pb-6 space-y-3">
          <div className="p-3 bg-teal-50/70 rounded-xl space-y-2">
            <div className="text-xs font-bold text-[#006070] uppercase tracking-wider">For Doctors Portal</div>
            <a
              href="/for-doctors/therapeutic-resources"
              className="block p-2 rounded bg-white text-xs font-semibold text-[#004f5e] shadow-xs"
            >
              Therapeutic Resources Hub
            </a>
            <a
              href="/for-doctors/prescribing-information"
              className="block p-2 rounded bg-white text-xs font-semibold text-[#004f5e] shadow-xs"
            >
              Prescribing Information (Monographs)
            </a>
            <a
              href="/for-doctors/reference-library"
              className="block p-2 rounded bg-white text-xs font-semibold text-[#004f5e] shadow-xs"
            >
              Dermatology Reference Library
            </a>
            <a
              href="/for-doctors/medical-information"
              className="block p-2 rounded bg-white text-xs font-semibold text-[#004f5e] shadow-xs"
            >
              Medical Information Service
            </a>
          </div>
          <div className="space-y-1 text-sm font-medium text-slate-700">
            <a href="#" className="block py-2 px-3 rounded hover:bg-slate-50">Home</a>
            <a href="#" className="block py-2 px-3 rounded hover:bg-slate-50">About Ryan</a>
            <a href="#" className="block py-2 px-3 rounded hover:bg-slate-50">Therapeutic Areas</a>
            <a href="#" className="block py-2 px-3 rounded hover:bg-slate-50">Products</a>
            <a href="#" className="block py-2 px-3 rounded hover:bg-slate-50">Resources</a>
            <a href="#" className="block py-2 px-3 rounded hover:bg-slate-50">Partner With Us</a>
            <a href="#" className="block py-2 px-3 rounded hover:bg-slate-50">Contact</a>
          </div>
          <div className="pt-2">
            <a
              href="#"
              className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#00768a] rounded-lg"
            >
              Explore Products →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
