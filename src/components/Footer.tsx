'use client';

import React from 'react';
import Link from 'next/link';
import { FooterSettings, ThemeColors } from '@/types/content';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  footer: FooterSettings;
  theme: ThemeColors;
}

export default function Footer({ footer, theme }: FooterProps) {
  return (
    <footer className="bg-white border-t pt-16 pb-12 px-4 sm:px-6 lg:px-8" style={{ borderColor: theme.borderColor }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b" style={{ borderColor: theme.borderColor }}>
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif text-2xl font-bold tracking-[0.16em]" style={{ color: theme.primaryNavy }}>
              {footer.logoText}
            </span>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              {footer.companyName}
            </p>
            <div className="space-y-2 text-xs text-slate-600 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{footer.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{footer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{footer.phone}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-600">
              {(footer?.quickLinks || []).map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="hover:text-slate-900 transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Connect With Us
            </h4>
            <div className="flex flex-wrap gap-3">
              {(footer?.socialLinks || []).map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                  style={{ borderColor: theme.borderColor }}
                >
                  {social.platform}
                </a>
              ))}
            </div>
            <div className="pt-4">
              <Link
                href="/admin"
                className="text-xs text-indigo-600 hover:text-indigo-900 font-semibold"
              >
                Go to Administrator Portal →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center text-xs text-slate-400">
          <p>{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
