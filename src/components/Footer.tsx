'use client';

import React from 'react';
import Link from 'next/link';
import { FooterSettings, ThemeColors } from '@/types/content';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  footer?: any;
  theme: ThemeColors;
}

export default function Footer({ footer, theme }: FooterProps) {
  const brandName = footer?.brandName || footer?.logoText || 'RYAN DERMACEUTICS';
  const tagline = footer?.tagline || 'A Specialized Division of Ethics Medinova Private Limited';
  const copyright = footer?.copyrightText || footer?.copyright || '© 2026 Ryan Dermaceutics (Ethics Medinova Pvt. Ltd.). All Rights Reserved.';

  const quickLinks = (footer?.quickLinks && footer.quickLinks.length > 0) ? footer.quickLinks : [
    { title: 'Home', href: '/' },
    { title: 'Company (About Ryan)', href: '/about' },
    { title: 'Product Catalog (54+)', href: '/products' },
    { title: 'Therapeutic Resources', href: '/for-doctors/therapeutic-resources' },
    { title: 'Prescribing Information (PI)', href: '/for-doctors/prescribing-information' },
    { title: 'Dermatology Reference Library', href: '/for-doctors/reference-library' },
    { title: 'Clinical Contact Desk', href: '#contact' }
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-black tracking-[0.14em] text-white">
                {brandName}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-teal-400 font-bold mt-0.5">
                {tagline}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Delivering evidence-based dermatology and trichology formulations manufactured in WHO-GMP compliant facilities to serve healthcare practitioners across India.
            </p>
            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Ahmedabad, Gujarat / Kolkata, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="mailto:medinfo@ryandermaceutics.com" className="hover:text-white transition-colors">
                  medinfo@ryandermaceutics.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href="tel:+913324000000" className="hover:text-white transition-colors">
                  +91 33 2400 0000 / +91 22 6828 0000
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation & Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {quickLinks.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-teal-300 transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance & Healthcare Notice */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Medical Compliance</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Formulations manufactured under WHO-GMP protocols with validated batch stability. Prescribing information and product monographs are intended exclusively for registered medical practitioners and healthcare professionals.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-teal-950/80 text-teal-300 border border-teal-800">
                WHO-GMP Certified
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>{copyright}</p>
          <p className="text-[11px] text-slate-600">
            A Specialized Division of Ethics Medinova Private Limited
          </p>
        </div>
      </div>
    </footer>
  );
}
