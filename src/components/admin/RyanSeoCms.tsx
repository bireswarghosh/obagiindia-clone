'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Globe, 
  Search, 
  Save, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Stethoscope, 
  Package, 
  Share2,
  Code
} from 'lucide-react';
import { SEOSettings } from '@/types/content';

export interface MultiPageSeo {
  home: SEOSettings;
  about: SEOSettings;
  doctors: SEOSettings;
  products: SEOSettings;
}

export const defaultMultiPageSeo: MultiPageSeo = {
  home: {
    metaTitle: 'Ryan Dermaceutics | Science That Understands Skin | Dermatology Division',
    metaDescription: 'Ryan Dermaceutics is a specialized dermatology division of Ethics Medinova dedicated to advanced topical, oral, and supportive formulations backed by WHO-GMP standards.',
    keywords: 'Ryan Dermaceutics, Dermatology India, Ethics Medinova, topical dermatology, oral dermatology, acne, psoriasis, minoxidil',
    ogImage: '/ryan/ryan-logo-card.jpg',
    canonicalUrl: 'https://obagiindia.vercel.app/'
  },
  about: {
    metaTitle: 'About Ryan Dermaceutics | A Specialized Dermatology Division',
    metaDescription: 'Ryan Dermaceutics is dedicated to building a comprehensive portfolio of topical, oral, and supportive dermatological solutions backed by WHO-GMP manufacturing.',
    keywords: 'Ryan Dermaceutics, dermatology division, Ethics Medinova, topical dermatology, oral dermatology, WHO-GMP, skin health, scalp care',
    ogImage: '/ryan/about/about_hero_collage.png',
    canonicalUrl: 'https://obagiindia.vercel.app/about'
  },
  doctors: {
    metaTitle: 'For Doctors Portal | Therapeutic Resources & Monographs | Ryan Dermaceutics',
    metaDescription: 'Comprehensive professional clinical portal for dermatologists featuring 53 product monographs, prescribing information, and therapeutic guides.',
    keywords: 'Ryan Dermaceutics doctors, prescribing information, product monograph, dermatology guide, acne treatment, corticosteroids',
    ogImage: '/ryan/hero-therapeutic-doc.jpg',
    canonicalUrl: 'https://obagiindia.vercel.app/for-doctors'
  },
  products: {
    metaTitle: 'Ryan Dermaceutics Product Catalog | 53 Specialized Formulations',
    metaDescription: 'Explore our comprehensive portfolio across 10 therapeutic areas: acne, antifungal, antibacterial, corticosteroids, and hair care in diverse dosage forms.',
    keywords: 'Ryan Dermaceutics products, dermatology formulations, topical cream, oral capsules, minoxidil, antifungal',
    ogImage: '/ryan/ryan-logo-card.jpg',
    canonicalUrl: 'https://obagiindia.vercel.app/products'
  }
};

interface RyanSeoCmsProps {
  seoData: MultiPageSeo;
  onChange: (newData: MultiPageSeo) => void;
  onSave: () => void;
}

export default function RyanSeoCms({ seoData, onChange, onSave }: RyanSeoCmsProps) {
  const [selectedPage, setSelectedPage] = useState<'home' | 'about' | 'doctors' | 'products'>('home');

  const currentPageSeo = seoData[selectedPage] || defaultMultiPageSeo[selectedPage];

  const updateCurrentSeo = (field: keyof SEOSettings, val: string) => {
    onChange({
      ...seoData,
      [selectedPage]: {
        ...currentPageSeo,
        [field]: val
      }
    });
  };

  const pages = [
    { id: 'home', label: 'Home Page (/)', icon: Sparkles, url: '/' },
    { id: 'about', label: 'About Ryan (/about)', icon: FileText, url: '/about' },
    { id: 'doctors', label: 'For Doctors (/for-doctors)', icon: Stethoscope, url: '/for-doctors' },
    { id: 'products', label: 'Products (/products)', icon: Package, url: '/products' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="bg-[#132247] p-6 rounded-2xl border border-teal-900/50 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-black uppercase tracking-widest">
              Global SEO & Meta Engine
            </span>
            <span className="text-xs text-slate-400">• OpenGraph, SERP Preview & Schema.org</span>
          </div>
          <h2 className="text-xl font-black text-white mt-2">
            SEO & Social Graph Management
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Optimize search engine ranking, title tags, meta descriptions, and social media sharing cards for all core pages.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onSave}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-teal-950 transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save SEO Settings</span>
          </button>
        </div>
      </div>

      {/* Page Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {pages.map((p) => {
          const Icon = p.icon;
          const isSelected = selectedPage === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPage(p.id as any)}
              className={`p-3.5 rounded-xl border text-left transition flex items-center gap-3 cursor-pointer ${
                isSelected
                  ? 'bg-[#00768a] border-teal-400 text-white shadow-md'
                  : 'bg-[#132247] border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                isSelected ? 'bg-white/20 text-white' : 'bg-teal-500/10 text-teal-300'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold truncate">{p.label}</div>
                <div className="text-[10px] opacity-80 truncate">{p.url}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Editor & SERP Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Editor Form */}
        <div className="lg:col-span-7 bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
          <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>Meta Tags for {pages.find(p => p.id === selectedPage)?.label}</span>
          </h3>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-slate-300 font-bold">Meta Title Tag</label>
              <span className={`text-[10px] font-mono ${
                currentPageSeo.metaTitle.length > 60 ? 'text-amber-400' : 'text-slate-400'
              }`}>
                {currentPageSeo.metaTitle.length}/60 chars
              </span>
            </div>
            <input
              type="text"
              value={currentPageSeo.metaTitle}
              onChange={(e) => updateCurrentSeo('metaTitle', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs text-slate-300 font-bold">Meta Description</label>
              <span className={`text-[10px] font-mono ${
                currentPageSeo.metaDescription.length > 160 ? 'text-amber-400' : 'text-slate-400'
              }`}>
                {currentPageSeo.metaDescription.length}/160 chars
              </span>
            </div>
            <textarea
              rows={3}
              value={currentPageSeo.metaDescription}
              onChange={(e) => updateCurrentSeo('metaDescription', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs leading-relaxed focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-bold block mb-1">Focus Keywords (Comma-separated)</label>
            <input
              type="text"
              value={currentPageSeo.keywords}
              onChange={(e) => updateCurrentSeo('keywords', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-bold block mb-1">Canonical URL</label>
            <input
              type="text"
              value={currentPageSeo.canonicalUrl}
              onChange={(e) => updateCurrentSeo('canonicalUrl', e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-bold block mb-1">Open Graph / Social Sharing Image URL</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  value={currentPageSeo.ogImage}
                  onChange={(e) => updateCurrentSeo('ogImage', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div className="relative h-16 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center">
                {currentPageSeo.ogImage ? (
                  <Image src={currentPageSeo.ogImage} alt="OG" fill className="object-cover" />
                ) : (
                  <span className="text-xs text-slate-500">No Image</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Live SERP & Social Preview */}
        <div className="lg:col-span-5 space-y-6">
          {/* Google Search Engine Preview */}
          <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-teal-400" />
              <span>Google SERP Preview</span>
            </h4>

            <div className="p-4 rounded-xl bg-white text-slate-900 space-y-1 font-sans shadow-sm">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                <span className="w-3.5 h-3.5 rounded-full bg-[#00768a] text-white flex items-center justify-center text-[9px] font-bold">R</span>
                <span>https://obagiindia.vercel.app{pages.find(p => p.id === selectedPage)?.url}</span>
              </div>
              <h5 className="text-base font-semibold text-[#1a0dab] hover:underline cursor-pointer line-clamp-1 leading-snug">
                {currentPageSeo.metaTitle || 'Page Title'}
              </h5>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {currentPageSeo.metaDescription || 'Add a meta description to see how this page appears on Google search results.'}
              </p>
            </div>
          </div>

          {/* Social Media Share Card Preview */}
          <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Share2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Social Media Card (OpenGraph / Twitter)</span>
            </h4>

            <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900 text-white">
              <div className="relative h-36 w-full bg-slate-950 flex items-center justify-center">
                {currentPageSeo.ogImage ? (
                  <Image src={currentPageSeo.ogImage} alt="OG Card" fill className="object-cover" />
                ) : (
                  <span className="text-xs text-slate-500">Image Preview</span>
                )}
              </div>
              <div className="p-3 bg-slate-900 space-y-1">
                <div className="text-[10px] text-teal-400 uppercase font-mono">obagiindia.vercel.app</div>
                <div className="text-xs font-bold text-white line-clamp-1">{currentPageSeo.metaTitle}</div>
                <div className="text-[11px] text-slate-400 line-clamp-2">{currentPageSeo.metaDescription}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
