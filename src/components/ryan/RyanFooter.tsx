'use client';

import React from 'react';
import { Linkedin, Youtube, Instagram, Mail, ArrowUpRight } from 'lucide-react';

export default function RyanFooter() {
  return (
    <footer className="bg-[#0b1e28] text-slate-300 text-xs border-t border-teal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Logo & Division Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif font-black tracking-widest text-white text-2xl sm:text-3xl leading-none">
                RYAN
              </span>
              <span className="text-xs font-bold tracking-[0.28em] text-teal-400 uppercase mt-1 leading-none">
                DERMACEUTICS
              </span>
              <span className="text-[8px] font-medium tracking-wider text-slate-400 uppercase mt-1">
                A Specialized Dermatology Division
              </span>
            </div>
            <p className="text-slate-400 text-[12px] leading-relaxed pt-2">
              Committed to advancing dermatological therapeutics through scientific rigor, high-quality formulations, and trusted clinician partnership.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-[12.5px] text-slate-400">
              <li><a href="#" className="hover:text-teal-300 transition">Home</a></li>
              <li><a href="#" className="hover:text-teal-300 transition">About Ryan</a></li>
              <li><a href="#" className="hover:text-teal-300 transition">Therapeutic Areas</a></li>
              <li><a href="#" className="hover:text-teal-300 transition">Products</a></li>
            </ul>
          </div>

          {/* For Doctors */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">For Doctors</h4>
            <ul className="space-y-2 text-[12.5px] text-slate-400">
              <li>
                <a href="/for-doctors/therapeutic-resources" className="hover:text-teal-300 transition text-teal-200 font-medium">
                  Therapeutic Resources
                </a>
              </li>
              <li><a href="/for-doctors/therapeutic-resources#monographs" className="hover:text-teal-300 transition">Product Monographs</a></li>
              <li><a href="/for-doctors/therapeutic-resources#prescribing" className="hover:text-teal-300 transition">Prescribing Information</a></li>
              <li>
                <a href="/for-doctors/medical-information" className="hover:text-teal-300 transition text-teal-200 font-medium">
                  Medical Information
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-[12.5px] text-slate-400">
              <li><a href="/for-doctors/therapeutic-resources#insights" className="hover:text-teal-300 transition">Clinical Insights</a></li>
              <li><a href="/for-doctors/therapeutic-resources#reference-library" className="hover:text-teal-300 transition">Dermatology Reference Library</a></li>
              <li><a href="/for-doctors/therapeutic-resources#download" className="hover:text-teal-300 transition">Download Centre</a></li>
              <li><a href="#" className="hover:text-teal-300 transition">FAQs</a></li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Connect With Us</h4>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-teal-700 transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-teal-700 transition"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white hover:bg-teal-700 transition"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <div className="pt-2 text-[11.5px] text-slate-400">
              <div>Medical Affairs Enquiry:</div>
              <a href="mailto:medinfo@ryandermaceutics.com" className="text-teal-300 hover:underline inline-flex items-center gap-1 font-mono mt-0.5">
                medinfo@ryandermaceutics.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © 2026 Ryan Dermaceutics. All rights reserved.
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <a href="#" className="hover:text-slate-200 transition">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-200 transition">Terms & Conditions</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-200 transition">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
