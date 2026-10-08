'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeaderSettings, ThemeColors } from '@/types/content';
import { Search, ChevronDown, ShieldCheck, X, Menu, Phone, Mail, ExternalLink } from 'lucide-react';

interface HeaderProps {
  header: HeaderSettings;
  theme: ThemeColors;
}

export default function Header({ header, theme }: HeaderProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Default clean navigation matching Content_Home.docx
  const defaultNavItems = [
    { id: 'home', title: 'Home', href: '/', dropdown: [] },
    {
      id: 'company',
      title: 'Company',
      href: '/about',
      dropdown: [
        { title: 'About Ryan Dermaceutics', href: '/about' },
        { title: 'Our Heritage & Division', href: '/about#vision' },
        { title: 'Quality & Standards', href: '/about#quality' },
        { title: 'Ethics Medinova', href: '/about#parent' }
      ]
    },
    {
      id: 'products',
      title: 'Products',
      href: '/products',
      dropdown: [
        { title: 'All Formulations (54+)', href: '/products' },
        { title: 'Topical Dermatology', href: '/products?route=Topical' },
        { title: 'Oral & Systemic', href: '/products?route=Oral' },
        { title: 'Trichology & Scalp Care', href: '/products?area=Hair' },
        { title: 'Therapeutic Categories', href: '/#therapeutic-areas' }
      ]
    },
    {
      id: 'for-doctors',
      title: 'For Doctors',
      href: '/for-doctors',
      dropdown: [
        { title: 'Therapeutic Resources', href: '/for-doctors/therapeutic-resources' },
        { title: 'Prescribing Information (PI)', href: '/for-doctors/prescribing-information' },
        { title: 'Dermatology Reference Library', href: '/for-doctors/reference-library' },
        { title: 'Medical Information', href: '/for-doctors/medical-information' }
      ]
    },
    { id: 'contact', title: 'Contact', href: '#contact', dropdown: [] }
  ];

  const navItems = (header?.navItems && header.navItems.length > 0)
    ? header.navItems.map(item => {
        // If an item still has Obagi references, map to Ryan standards
        if (item.title === 'About Ryan' || item.id === 'about') {
          return { ...item, title: 'Company', href: '/about' };
        }
        return item;
      })
    : defaultNavItems;

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md border-b"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          borderColor: theme?.borderColor || 'rgba(0, 118, 138, 0.12)'
        }}
      >
        {/* Top Mini Bar: Official Ryan / Ethics Medinova Subtitle */}
        <div
          className="w-full py-1.5 px-4 text-center text-xs tracking-wider flex items-center justify-between sm:justify-center gap-3 border-b text-slate-100"
          style={{
            backgroundColor: theme?.deepNavy || '#002530',
            borderColor: 'rgba(255,255,255,0.1)'
          }}
        >
          <div className="flex items-center gap-2 mx-auto text-[11px] sm:text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-300 shrink-0" />
            <span className="font-medium">
              {header?.broughtByText || 'A Specialized Division of Ethics Medinova Pvt. Ltd.'}
            </span>
            <span className="hidden md:inline opacity-40">|</span>
            <a
              href="https://www.ryandermaceutics.com"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline text-teal-300 hover:text-white transition-colors"
            >
              www.ryandermaceutics.com
            </a>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            {header?.logoImageUrl ? (
              <img
                src={header.logoImageUrl}
                alt={header.logoText || 'Ryan Dermaceutics'}
                className="h-10 sm:h-12 w-auto object-contain"
              />
            ) : (
              <div className="flex flex-col">
                <span
                  className="font-serif text-xl sm:text-2xl font-black tracking-[0.14em]"
                  style={{ color: theme?.primaryNavy || '#003d4d' }}
                >
                  RYAN DERMACEUTICS
                </span>
                <span className="text-[9px] uppercase tracking-widest text-[#00768a] font-bold">
                  Dermatology & Trichology Division
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="text-xs uppercase tracking-wider font-bold flex items-center gap-1 py-2 text-slate-800 hover:text-[#00768a] transition-colors"
                >
                  {item.title}
                  {item.dropdown && item.dropdown.length > 0 && (
                    <ChevronDown className="w-3 h-3 opacity-60" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && item.dropdown.length > 0 && activeDropdown === item.id && (
                  <div
                    className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-2xl p-2 border border-slate-100 animate-fade-in"
                  >
                    {item.dropdown.map((sub, idx) => (
                      <Link
                        key={idx}
                        href={sub.href}
                        className="block px-3.5 py-2.5 text-xs font-semibold rounded-xl transition-colors hover:bg-teal-50 text-slate-700 hover:text-[#00768a]"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions: Search + Contact CTA + Mobile Menu Button */}
          <div className="flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 sm:p-2.5 rounded-full hover:bg-slate-100 transition-colors text-slate-700"
              aria-label="Search Ryan Dermaceutics"
              title="Search formulations and monographs"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Desktop Contact CTA (No Admin CMS button in public UI!) */}
            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:shadow-md hover:scale-105"
              style={{
                backgroundColor: theme?.accentGold || '#00768a',
                color: '#ffffff'
              }}
            >
              <span>Clinical Inquiry</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 shadow-xl px-5 py-6 animate-fade-in max-h-[85vh] overflow-y-auto">
            <div className="space-y-4">
              <div className="space-y-1 pb-4 border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Navigation</span>
                {navItems.map((item) => (
                  <div key={item.id} className="py-1">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-bold text-slate-800 hover:text-[#00768a] flex items-center justify-between py-1.5"
                    >
                      <span>{item.title}</span>
                    </Link>
                    {item.dropdown && item.dropdown.length > 0 && (
                      <div className="pl-3 py-1 space-y-1 border-l-2 border-teal-100 ml-1">
                        {item.dropdown.map((sub, idx) => (
                          <Link
                            key={idx}
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-xs text-slate-600 hover:text-[#00768a] py-1"
                          >
                            {sub.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Quick Contact & Links */}
              <div className="space-y-2.5 pt-2 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Contact Desk</span>
                <a
                  href="tel:+913324000000"
                  className="flex items-center gap-2 text-slate-700 hover:text-[#00768a]"
                >
                  <Phone className="w-4 h-4 text-[#00768a]" />
                  <span>+91 33 2400 0000</span>
                </a>
                <a
                  href="mailto:medinfo@ryandermaceutics.com"
                  className="flex items-center gap-2 text-slate-700 hover:text-[#00768a]"
                >
                  <Mail className="w-4 h-4 text-[#00768a]" />
                  <span>medinfo@ryandermaceutics.com</span>
                </a>
              </div>

              <div className="pt-3">
                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider text-white shadow-sm"
                  style={{ backgroundColor: theme?.accentGold || '#00768a' }}
                >
                  Submit Clinical Enquiry
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-6 border border-slate-100 animate-fade-in relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-base sm:text-lg font-serif font-bold mb-3 text-[#003d4d]">
              Search Ryan Dermaceutics
            </h3>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulations, Tressicle, Tenorium, Blismin, Kefin..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#00768a]"
                autoFocus
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="text-slate-400">Popular:</span>
              <Link
                href="/products?q=Tressicle"
                onClick={() => setSearchOpen(false)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
              >
                Tressicle F
              </Link>
              <Link
                href="/products?q=Tenorium"
                onClick={() => setSearchOpen(false)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
              >
                Tenorium
              </Link>
              <Link
                href="/products?q=Blismin"
                onClick={() => setSearchOpen(false)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
              >
                Blismin 20
              </Link>
              <Link
                href="/products?q=Kefin"
                onClick={() => setSearchOpen(false)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
              >
                Kefin
              </Link>
              <Link
                href="/products?q=Tofaplast"
                onClick={() => setSearchOpen(false)}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-slate-700"
              >
                Tofaplast
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
