'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HeaderSettings, ThemeColors } from '@/types/content';
import { Search, ChevronDown, ShieldCheck, Settings, X } from 'lucide-react';

interface HeaderProps {
  header: HeaderSettings;
  theme: ThemeColors;
}

export default function Header({ header, theme }: HeaderProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md border-b"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.94)',
          borderColor: theme.borderColor
        }}
      >
        {/* Top Mini Bar: Brought to you in India by Specra */}
        <div
          className="w-full py-1 px-4 text-center text-xs tracking-wider flex items-center justify-center gap-2 border-b"
          style={{
            backgroundColor: theme.deepNavy,
            color: '#ffffff',
            borderColor: 'rgba(255,255,255,0.1)'
          }}
        >
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>{header.broughtByText}</span>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {header.logoImageUrl ? (
              <img src={header.logoImageUrl} alt={header.logoText} className="h-8 object-contain" />
            ) : (
              <span
                className="font-serif text-2xl font-bold tracking-[0.18em]"
                style={{ color: theme.primaryNavy }}
              >
                {header.logoText}
              </span>
            )}
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {header.navItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="text-sm uppercase tracking-wider font-medium flex items-center gap-1.5 py-2 transition-colors hover:opacity-80"
                  style={{ color: theme.textDark }}
                >
                  {item.title}
                  {item.dropdown && item.dropdown.length > 0 && (
                    <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && item.dropdown.length > 0 && activeDropdown === item.id && (
                  <div
                    className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-xl p-2 border animate-fade-in"
                    style={{ borderColor: theme.borderColor }}
                  >
                    {item.dropdown.map((sub, idx) => (
                      <Link
                        key={idx}
                        href={sub.href}
                        className="block px-4 py-2.5 text-xs font-medium rounded-lg transition-colors hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions: Search + Admin Portal Link */}
          <div className="flex items-center gap-4">
            {header.searchEnabled && (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-700"
                aria-label="Search Ryan Dermaceutics"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all hover:scale-105"
              style={{
                backgroundColor: theme.primaryNavy,
                color: '#ffffff'
              }}
            >
              <Settings className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Admin CMS</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-28 px-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-6 border animate-fade-in relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-serif font-bold mb-3" style={{ color: theme.primaryNavy }}>
              Search Ryan Dermaceutics
            </h3>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search formulations, Tressicle, Tenorium, Blismin, Flutirium..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                autoFocus
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="text-slate-400">Popular:</span>
              <button onClick={() => setSearchQuery('Tressicle')} className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md">Tressicle</button>
              <button onClick={() => setSearchQuery('Tenorium')} className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md">Tenorium</button>
              <button onClick={() => setSearchQuery('Blismin')} className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md">Blismin 20</button>
              <button onClick={() => setSearchQuery('Minoxidil')} className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded-md">Minoxidil 5%</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
