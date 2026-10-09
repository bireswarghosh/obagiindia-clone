'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Save,
  RotateCcw,
  ExternalLink,
  Layers,
  Award,
  BookOpen,
  FlaskConical,
  Package,
  TrendingUp,
  Briefcase,
  Mail,
  CheckCircle2,
  AlertCircle,
  Menu,
  Video,
  Quote,
  ShieldCheck,
  ChevronDown,
  List
} from 'lucide-react';
import RichColorTextEditor from './RichColorTextEditor';
import ImageUploader from './ImageUploader';
import { ObagiHomeContent, defaultObagiHomeContent } from '@/data/obagi-home-content';

interface ObagiHomeCmsProps {
  onNotify?: (message: string, type: 'success' | 'error') => void;
}

type SectionKey =
  | 'header'
  | 'hero'
  | 'ticker'
  | 'history'
  | 'about'
  | 'pillars'
  | 'research'
  | 'products'
  | 'video'
  | 'quote'
  | 'numbers'
  | 'careers'
  | 'press'
  | 'newsletter'
  | 'footer';

export default function ObagiHomeCms({ onNotify }: ObagiHomeCmsProps) {
  const [content, setContent] = useState<ObagiHomeContent>(defaultObagiHomeContent);
  const [activeSection, setActiveSection] = useState<SectionKey>('header');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Load from API or localStorage
  useEffect(() => {
    async function loadData() {
      let localCached: any = null;
      try {
        const saved = localStorage.getItem('obagi_home_cms');
        if (saved) {
          localCached = JSON.parse(saved);
        }
      } catch (e) {}

      try {
        const res = await fetch('/api/obagi-cms', { cache: 'no-store' });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            const merged = {
              ...defaultObagiHomeContent,
              ...json.data,
              header: { ...defaultObagiHomeContent.header, ...(json.data.header || {}) },
              hero: { ...defaultObagiHomeContent.hero, ...(json.data.hero || {}) },
              ticker: { ...defaultObagiHomeContent.ticker, ...(json.data.ticker || {}) },
              history: { ...defaultObagiHomeContent.history, ...(json.data.history || {}) },
              about: { ...defaultObagiHomeContent.about, ...(json.data.about || {}) },
              trustBanner: { ...defaultObagiHomeContent.trustBanner, ...(json.data.trustBanner || {}) },
              research: { ...defaultObagiHomeContent.research, ...(json.data.research || {}) },
              products: { ...defaultObagiHomeContent.products, ...(json.data.products || {}) },
              videoBanner: { ...defaultObagiHomeContent.videoBanner, ...(json.data.videoBanner || {}) },
              quote: { ...defaultObagiHomeContent.quote, ...(json.data.quote || {}) },
              numbers: { ...defaultObagiHomeContent.numbers, ...(json.data.numbers || {}) },
              careers: { ...defaultObagiHomeContent.careers, ...(json.data.careers || {}) },
              press: { ...defaultObagiHomeContent.press, ...(json.data.press || {}) },
              newsletter: { ...defaultObagiHomeContent.newsletter, ...(json.data.newsletter || {}) },
              footer: { ...defaultObagiHomeContent.footer, ...(json.data.footer || {}) }
            };
            setContent(merged);
            localStorage.setItem('obagi_home_cms', JSON.stringify(merged));
            return;
          }
        }
      } catch (e) {
        console.warn('API load failed, checking localStorage fallback:', e);
      }

      if (localCached) {
        setContent({ ...defaultObagiHomeContent, ...localCached });
      }
    }
    loadData();
  }, []);

  const triggerToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    if (onNotify) onNotify(message, type);
    setTimeout(() => setToast(null), 4000);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // Immediately cache locally so user never loses their changes
      localStorage.setItem('obagi_home_cms', JSON.stringify(content));

      // Persist permanently to Vercel Blob cloud storage
      const res = await fetch('/api/obagi-cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          localStorage.setItem('obagi_home_cms', JSON.stringify(json.data));
        }
        triggerToast('✅ Home Page CMS permanently saved to Cloud & published live!', 'success');
      } else {
        triggerToast('⚠️ Saved in local browser cache. Server sync pending.', 'success');
      }
    } catch (err: any) {
      console.error('Save failed:', err);
      triggerToast('⚠️ Saved in local browser cache.', 'success');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all Home Page content to default?')) {
      setContent(defaultObagiHomeContent);
      localStorage.setItem('obagi_home_cms', JSON.stringify(defaultObagiHomeContent));
      triggerToast('Reset to default Obagi content', 'success');
    }
  };

  const sectionsList: { key: SectionKey; label: string; icon: any; order: number }[] = [
    { key: 'header', label: '1. Navbar & Dropdowns', icon: Menu, order: 1 },
    { key: 'hero', label: '2. Hero (4 Images & Award)', icon: Sparkles, order: 2 },
    { key: 'ticker', label: '3. Trust Marquee Ticker', icon: Layers, order: 3 },
    { key: 'history', label: '4. Our History (35+ Yrs)', icon: BookOpen, order: 4 },
    { key: 'about', label: '5. About Obagi Medical', icon: Quote, order: 5 },
    { key: 'pillars', label: '6. #1 Brand & 4 Pillars', icon: Award, order: 6 },
    { key: 'research', label: '7. Obagi R&D Science', icon: FlaskConical, order: 7 },
    { key: 'products', label: '8. Featured Collections', icon: Package, order: 8 },
    { key: 'video', label: '9. Beauty Award Video', icon: Video, order: 9 },
    { key: 'quote', label: '10. Executive Quote', icon: ShieldCheck, order: 10 },
    { key: 'numbers', label: '11. BGS in Numbers', icon: TrendingUp, order: 11 },
    { key: 'careers', label: '12. Careers / Join Team', icon: Briefcase, order: 12 },
    { key: 'press', label: '13. Press Publications', icon: List, order: 13 },
    { key: 'newsletter', label: '14. Newsletter Banner', icon: Mail, order: 14 },
    { key: 'footer', label: '15. Footer & Legal', icon: ShieldCheck, order: 15 }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl flex items-center gap-3 text-xs font-bold shadow-2xl transition-all ${
            toast.type === 'success'
              ? 'bg-emerald-600 text-white shadow-emerald-950'
              : 'bg-rose-600 text-white shadow-rose-950'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="bg-[#132247] p-6 rounded-2xl border border-teal-900/50 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-black uppercase tracking-widest">
              Top-To-Bottom Visual CMS
            </span>
            <span className="text-xs text-slate-400">Target: Home Page (/)</span>
          </div>
          <h2 className="text-xl font-black text-white mt-1">Obagi Medical Home Page Editor</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Organized in exact scroll order from Navbar down to Footer with live rich color text & image uploaders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition border border-slate-700"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Live Home</span>
          </a>

          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-teal-950 transition cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Publishing...' : 'Publish Home CMS'}</span>
          </button>
        </div>
      </div>

      {/* Top-to-Bottom Scroll Sections Navigator */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 bg-[#0d1830] p-2 rounded-2xl border border-slate-800">
        {sectionsList.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.key;
          return (
            <button
              key={sec.key}
              type="button"
              onClick={() => setActiveSection(sec.key)}
              className={`p-2.5 rounded-xl text-left transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-br from-teal-500/20 to-emerald-500/10 border border-teal-500/40 text-teal-300 shadow-md'
                  : 'bg-slate-900/60 hover:bg-slate-800/60 border border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
              <span className="text-[11px] font-bold truncate">{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: HEADER & NAVIGATION */}
      {activeSection === 'header' && (
        <div className="space-y-6 bg-[#0f1b35] p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Menu className="w-4 h-4 text-teal-400" />
              <span>Section 1: Navbar, Logo & Dropdown Menus</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize the logo (transparent / background remover supported), top slogan, menu titles, and their interactive dropdown items.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploader
              label="Brand Logo (Background Remover Supported)"
              value={content.header.logoUrl}
              onChange={(url) => setContent({ ...content, header: { ...content.header, logoUrl: url } })}
              description="Upload your official transparent PNG logo to replace the default vector logo."
            />

            <RichColorTextEditor
              label="Top Bar Tagline (Brought by SPECTRA)"
              value={content.header.broughtByText}
              onChange={(val) => setContent({ ...content, header: { ...content.header, broughtByText: val } })}
              color={content.header.broughtByColor}
              onColorChange={(col) => setContent({ ...content, header: { ...content.header, broughtByColor: col } })}
              description="Top bar indicator (Default: Brought to you in India by SPECTRA)"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <RichColorTextEditor
              label="Menu 1: Why Obagi?"
              value={content.header.whyObagiText}
              onChange={(val) => setContent({ ...content, header: { ...content.header, whyObagiText: val } })}
              color={content.header.whyObagiColor}
              onColorChange={(col) => setContent({ ...content, header: { ...content.header, whyObagiColor: col } })}
            />

            <RichColorTextEditor
              label="Menu 2: Skin Concern"
              value={content.header.skinConcernTitle}
              onChange={(val) => setContent({ ...content, header: { ...content.header, skinConcernTitle: val } })}
              color={content.header.skinConcernColor}
              onColorChange={(col) => setContent({ ...content, header: { ...content.header, skinConcernColor: col } })}
            />

            <RichColorTextEditor
              label="Menu 3: Product Range"
              value={content.header.productRangeTitle}
              onChange={(val) => setContent({ ...content, header: { ...content.header, productRangeTitle: val } })}
              color={content.header.productRangeColor}
              onColorChange={(col) => setContent({ ...content, header: { ...content.header, productRangeColor: col } })}
            />

            <RichColorTextEditor
              label="Menu 4: Find Obagi"
              value={content.header.findObagiTitle}
              onChange={(val) => setContent({ ...content, header: { ...content.header, findObagiTitle: val } })}
              color={content.header.findObagiColor}
              onColorChange={(col) => setContent({ ...content, header: { ...content.header, findObagiColor: col } })}
            />
          </div>

          {/* Dropdown Items Preview & Editor */}
          <div className="border-t border-slate-800 pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider">
                Dropdown Sub-Menus & Redirect URLs
              </h4>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400">Why Obagi Link:</span>
                <input
                  type="text"
                  placeholder="/# or https://..."
                  value={content.header.whyObagiLink || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      header: { ...content.header, whyObagiLink: e.target.value }
                    })
                  }
                  className="text-xs py-1 px-2.5 rounded bg-slate-950 border border-slate-700 text-slate-200 w-48"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Skin Concern */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-300">Skin Concern Dropdowns (10 items):</span>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs">
                  {content.header.skinConcernItems.map((item, idx) => (
                    <div key={idx} className="space-y-1 bg-slate-950/80 p-1.5 rounded border border-slate-800/80">
                      <input
                        type="text"
                        placeholder="Title"
                        value={item}
                        onChange={(e) => {
                          const updated = [...content.header.skinConcernItems];
                          updated[idx] = e.target.value;
                          setContent({ ...content, header: { ...content.header, skinConcernItems: updated } });
                        }}
                        className="w-full text-[11px] py-1 px-2 rounded bg-slate-900 border border-slate-700 text-slate-200"
                      />
                      <input
                        type="text"
                        placeholder="Redirect URL (e.g. /products?concern=aging)"
                        value={(content.header.skinConcernLinks && content.header.skinConcernLinks[idx]) || ''}
                        onChange={(e) => {
                          const links = [...(content.header.skinConcernLinks || [])];
                          links[idx] = e.target.value;
                          setContent({ ...content, header: { ...content.header, skinConcernLinks: links } });
                        }}
                        className="w-full text-[10px] py-0.5 px-2 rounded bg-slate-950 border border-slate-800 text-teal-400 placeholder:text-slate-600 font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Range */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-300">Product Range Dropdowns (10 items):</span>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs">
                  {content.header.productRangeItems.map((item, idx) => (
                    <div key={idx} className="space-y-1 bg-slate-950/80 p-1.5 rounded border border-slate-800/80">
                      <input
                        type="text"
                        placeholder="Title"
                        value={item}
                        onChange={(e) => {
                          const updated = [...content.header.productRangeItems];
                          updated[idx] = e.target.value;
                          setContent({ ...content, header: { ...content.header, productRangeItems: updated } });
                        }}
                        className="w-full text-[11px] py-1 px-2 rounded bg-slate-900 border border-slate-700 text-slate-200"
                      />
                      <input
                        type="text"
                        placeholder="Redirect URL (e.g. /products/nu-derm)"
                        value={(content.header.productRangeLinks && content.header.productRangeLinks[idx]) || ''}
                        onChange={(e) => {
                          const links = [...(content.header.productRangeLinks || [])];
                          links[idx] = e.target.value;
                          setContent({ ...content, header: { ...content.header, productRangeLinks: links } });
                        }}
                        className="w-full text-[10px] py-0.5 px-2 rounded bg-slate-950 border border-slate-800 text-teal-400 placeholder:text-slate-600 font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Find Obagi */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-slate-300">Find Obagi Dropdowns (2 items):</span>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1 text-xs">
                  {content.header.findObagiItems.map((item, idx) => (
                    <div key={idx} className="space-y-1 bg-slate-950/80 p-1.5 rounded border border-slate-800/80">
                      <input
                        type="text"
                        placeholder="Title"
                        value={item}
                        onChange={(e) => {
                          const updated = [...content.header.findObagiItems];
                          updated[idx] = e.target.value;
                          setContent({ ...content, header: { ...content.header, findObagiItems: updated } });
                        }}
                        className="w-full text-[11px] py-1 px-2 rounded bg-slate-900 border border-slate-700 text-slate-200"
                      />
                      <input
                        type="text"
                        placeholder="Redirect URL (e.g. /clinic-finder)"
                        value={(content.header.findObagiLinks && content.header.findObagiLinks[idx]) || ''}
                        onChange={(e) => {
                          const links = [...(content.header.findObagiLinks || [])];
                          links[idx] = e.target.value;
                          setContent({ ...content, header: { ...content.header, findObagiLinks: links } });
                        }}
                        className="w-full text-[10px] py-0.5 px-2 rounded bg-slate-950 border border-slate-800 text-teal-400 placeholder:text-slate-600 font-mono"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: HERO & WINNER BANNER (4 IMAGES) */}
      {activeSection === 'hero' && (
        <div className="space-y-6 bg-[#0f1b35] p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Section 2: Hero Fold & The 4 Hero Images</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage the primary hero headline, Aesthetic Awards badge, and all 4 hero images (Dropper, Trophy, Collection Packshot, Top Wide Banner).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RichColorTextEditor
              label="Hero Main Title"
              value={content.hero.title}
              onChange={(val) => setContent({ ...content, hero: { ...content.hero, title: val } })}
              color={content.hero.titleColor}
              onColorChange={(col) => setContent({ ...content, hero: { ...content.hero, titleColor: col } })}
              description="Primary headline rendered in the hero area (Default: Obagi® Medical India)"
            />

            <RichColorTextEditor
              label="Aesthetic Awards Badge"
              multiline
              rows={3}
              value={content.hero.awardBadge}
              onChange={(val) => setContent({ ...content, hero: { ...content.hero, awardBadge: val } })}
              color={content.hero.awardBadgeColor}
              onColorChange={(col) => setContent({ ...content, hero: { ...content.hero, awardBadgeColor: col } })}
              description="WINNER 2025 badge text"
            />
          </div>

          <RichColorTextEditor
            label="Hero / History Intro Narrative (35+ Years)"
            multiline
            rows={4}
            value={content.hero.historyIntroText}
            onChange={(val) => setContent({ ...content, hero: { ...content.hero, historyIntroText: val } })}
            color={content.hero.historyIntroTextColor}
            onColorChange={(col) => setContent({ ...content, hero: { ...content.hero, historyIntroTextColor: col } })}
            description="The leading narrative placed under the hero fold explaining clinically proven results."
          />

          <div className="border-t border-slate-800 pt-4 space-y-4">
            <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider">
              The 4 Hero Images
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ImageUploader
                label="Image 1: Lifestyle Product Dropper Texture"
                value={content.hero.heroImage1}
                onChange={(url) => setContent({ ...content, hero: { ...content.hero, heroImage1: url } })}
                description="Macro dropper texture shot in the hero fold."
              />

              <ImageUploader
                label="Image 2: Aesthetics Award 2025 Emblem Badge"
                value={content.hero.heroImage2}
                onChange={(url) => setContent({ ...content, hero: { ...content.hero, heroImage2: url } })}
                description="Aesthetic award trophy emblem."
              />

              <ImageUploader
                label="Image 3: Hero Packshot Collection Image"
                value={content.hero.heroImage3}
                onChange={(url) => setContent({ ...content, hero: { ...content.hero, heroImage3: url } })}
                description="Nu-Derm Fx bottles collection photograph."
              />

              <ImageUploader
                label="Image 4: Top Wide Background Banner"
                value={content.hero.heroImage4}
                onChange={(url) => setContent({ ...content, hero: { ...content.hero, heroImage4: url } })}
                description="Topmost wide background canvas image."
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: TRUST MARQUEE TICKER */}
      {activeSection === 'ticker' && (
        <div className="space-y-6 bg-[#0f1b35] p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-400" />
              <span>Section 3: Trust Marquee Ticker</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Continuously scrolling ticker bar situated between the hero and history sections.
            </p>
          </div>

          <RichColorTextEditor
            label="Marquee Ticker Text"
            multiline
            rows={3}
            value={content.ticker.text}
            onChange={(val) => setContent({ ...content, ticker: { ...content.ticker, text: val } })}
            color={content.ticker.textColor}
            onColorChange={(col) => setContent({ ...content, ticker: { ...content.ticker, textColor: col } })}
            description="Continuous banner dividing hero and history"
          />
        </div>
      )}

      {/* SECTION 4: OUR HISTORY */}
      {activeSection === 'history' && (
        <div className="space-y-6 bg-[#0f1b35] p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span>Section 4: Our History (35+ Years Heritage)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              The history narrative highlighting 35 years of physician-dispensed transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RichColorTextEditor
              label="Section Title"
              value={content.history.title}
              onChange={(val) => setContent({ ...content, history: { ...content.history, title: val } })}
              color={content.history.titleColor}
              onColorChange={(col) => setContent({ ...content, history: { ...content.history, titleColor: col } })}
            />

            <ImageUploader
              label="Our History Packshot Image"
              value={content.history.image}
              onChange={(url) => setContent({ ...content, history: { ...content.history, image: url } })}
            />
          </div>

          <RichColorTextEditor
            label="History Body Text"
            multiline
            rows={5}
            value={content.history.body}
            onChange={(val) => setContent({ ...content, history: { ...content.history, body: val } })}
            color={content.history.bodyColor}
            onColorChange={(col) => setContent({ ...content, history: { ...content.history, bodyColor: col } })}
          />
        </div>
      )}

      {/* SECTION 5: ABOUT OBAGI MEDICAL */}
      {activeSection === 'about' && (
        <div className="space-y-6 bg-[#0f1b35] p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Quote className="w-4 h-4 text-teal-400" />
              <span>Section 5: About Obagi Medical Story</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              The flagship about statement, quote, detailed skin science paragraph, and Hydration portrait.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RichColorTextEditor
              label="About Section Title"
              value={content.about.title}
              onChange={(val) => setContent({ ...content, about: { ...content.about, title: val } })}
              color={content.about.titleColor}
              onColorChange={(col) => setContent({ ...content, about: { ...content.about, titleColor: col } })}
            />

            <ImageUploader
              label="About Portrait Image (HydrateLuxe/DHD)"
              value={content.about.image}
              onChange={(url) => setContent({ ...content, about: { ...content.about, image: url } })}
            />
          </div>

          <RichColorTextEditor
            label="About Obagi Quote"
            multiline
            rows={3}
            value={content.about.quote}
            onChange={(val) => setContent({ ...content, about: { ...content.about, quote: val } })}
            color={content.about.quoteColor}
            onColorChange={(col) => setContent({ ...content, about: { ...content.about, quoteColor: col } })}
            description="“We are a complete skin care company, designing transformational products...”"
          />

          <RichColorTextEditor
            label="About Obagi Paragraph Text"
            multiline
            rows={5}
            value={content.about.paragraph}
            onChange={(val) => setContent({ ...content, about: { ...content.about, paragraph: val } })}
            color={content.about.paragraphColor}
            onColorChange={(col) => setContent({ ...content, about: { ...content.about, paragraphColor: col } })}
            description="Full clinical description explaining Fitzpatrick skin types and results."
          />
        </div>
      )}

      {/* SECTION 6: #1 BRAND & 4 PILLARS */}
      {activeSection === 'pillars' && (
        <div className="space-y-6 bg-[#0f1b35] p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-400" />
              <span>Section 6: #1 Recommended Brand & The 4 Brand Pillars</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Edit the #1 Physician Recommended Brand claim, top skin concerns, and each of the 4 brand pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RichColorTextEditor
              label="Physician Recommended Headline"
              value={content.trustBanner.recommendedHeading}
              onChange={(val) =>
                setContent({ ...content, trustBanner: { ...content.trustBanner, recommendedHeading: val } })
              }
              color={content.trustBanner.recommendedHeadingColor}
              onColorChange={(col) =>
                setContent({ ...content, trustBanner: { ...content.trustBanner, recommendedHeadingColor: col } })
              }
            />

            <RichColorTextEditor
              label="Top 3 Skin Concerns Text"
              value={content.trustBanner.concernsText}
              onChange={(val) =>
                setContent({ ...content, trustBanner: { ...content.trustBanner, concernsText: val } })
              }
              color={content.trustBanner.concernsTextColor}
              onColorChange={(col) =>
                setContent({ ...content, trustBanner: { ...content.trustBanner, concernsTextColor: col } })
              }
            />
          </div>

          <div className="border-t border-slate-800 pt-4 space-y-4">
            <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider">
              The 4 Core Brand Pillars
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.trustBanner.pillars.map((pillar, idx) => (
                <div key={pillar.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="text-[10px] font-black text-teal-400 uppercase tracking-widest">
                    Pillar #{idx + 1}
                  </div>
                  <RichColorTextEditor
                    label="Pillar Title"
                    value={pillar.title}
                    onChange={(val) => {
                      const updated = [...content.trustBanner.pillars];
                      updated[idx].title = val;
                      setContent({ ...content, trustBanner: { ...content.trustBanner, pillars: updated } });
                    }}
                    color={pillar.titleColor}
                    onColorChange={(col) => {
                      const updated = [...content.trustBanner.pillars];
                      updated[idx].titleColor = col;
                      setContent({ ...content, trustBanner: { ...content.trustBanner, pillars: updated } });
                    }}
                  />
                  <RichColorTextEditor
                    label="Pillar Description"
                    multiline
                    rows={3}
                    value={pillar.description}
                    onChange={(val) => {
                      const updated = [...content.trustBanner.pillars];
                      updated[idx].description = val;
                      setContent({ ...content, trustBanner: { ...content.trustBanner, pillars: updated } });
                    }}
                    color={pillar.textColor}
                    onColorChange={(col) => {
                      const updated = [...content.trustBanner.pillars];
                      updated[idx].textColor = col;
                      setContent({ ...content, trustBanner: { ...content.trustBanner, pillars: updated } });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: RESEARCH & DEVELOPMENT */}
      {activeSection === 'research' && (
        <div className="space-y-6 bg-[#0f1b35] p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-teal-400" />
              <span>Section 7: Obagi Research & Development</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize the R&D headline, philosophy text, and the 3 innovation pillars (Approach, Process, Standards).
            </p>
          </div>

          <RichColorTextEditor
            label="R&D Section Title"
            value={content.research.rdTitle}
            onChange={(val) => setContent({ ...content, research: { ...content.research, rdTitle: val } })}
            color={content.research.rdTitleColor}
            onColorChange={(col) => setContent({ ...content, research: { ...content.research, rdTitleColor: col } })}
          />

          <RichColorTextEditor
            label="R&D Philosophy Description"
            multiline
            rows={4}
            value={content.research.rdDescription}
            onChange={(val) => setContent({ ...content, research: { ...content.research, rdDescription: val } })}
            color={content.research.rdDescriptionColor}
            onColorChange={(col) => setContent({ ...content, research: { ...content.research, rdDescriptionColor: col } })}
          />

          <div className="border-t border-slate-800 pt-6 space-y-6">
            <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider">
              Innovation Tabs (Approach, Process, Standards)
            </h4>

            <div className="space-y-6">
              {content.research.tabs.map((tab, idx) => (
                <div key={tab.id} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                  <div className="text-[10px] font-black text-teal-400 uppercase tracking-widest">
                    Pillar Tab #{idx + 1}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <RichColorTextEditor
                      label="Tab Title"
                      value={tab.title}
                      onChange={(val) => {
                        const updated = [...content.research.tabs];
                        updated[idx].title = val;
                        setContent({ ...content, research: { ...content.research, tabs: updated } });
                      }}
                      color={tab.titleColor}
                      onColorChange={(col) => {
                        const updated = [...content.research.tabs];
                        updated[idx].titleColor = col;
                        setContent({ ...content, research: { ...content.research, tabs: updated } });
                      }}
                    />

                    <ImageUploader
                      label="Laboratory Image"
                      value={tab.imageUrl}
                      onChange={(url) => {
                        const updated = [...content.research.tabs];
                        updated[idx].imageUrl = url;
                        setContent({ ...content, research: { ...content.research, tabs: updated } });
                      }}
                    />
                  </div>

                  <RichColorTextEditor
                    label="Tab Description"
                    multiline
                    rows={3}
                    value={tab.description}
                    onChange={(val) => {
                      const updated = [...content.research.tabs];
                      updated[idx].description = val;
                      setContent({ ...content, research: { ...content.research, tabs: updated } });
                    }}
                    color={tab.textColor}
                    onColorChange={(col) => {
                      const updated = [...content.research.tabs];
                      updated[idx].textColor = col;
                      setContent({ ...content, research: { ...content.research, tabs: updated } });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8: FEATURED COLLECTIONS / SYSTEMS */}
      {activeSection === 'products' && (
        <div className="space-y-6 bg-[#0f1b35] p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Package className="w-4 h-4 text-teal-400" />
              <span>Section 8: Featured Systems (Nu-Derm, Hydro-Drops, Nu-Cil)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Edit the three flagship hero systems, their clinical benefits, target indications, and product photos.
            </p>
          </div>

          <div className="space-y-6">
            {content.products.systems.map((system, idx) => (
              <div key={system.id} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">
                    Product System #{idx + 1}
                  </span>
                  <span className="text-xs text-slate-400">{system.title}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <RichColorTextEditor
                    label="System Name"
                    value={system.title}
                    onChange={(val) => {
                      const updated = [...content.products.systems];
                      updated[idx].title = val;
                      setContent({ ...content, products: { ...content.products, systems: updated } });
                    }}
                    color={system.titleColor}
                    onColorChange={(col) => {
                      const updated = [...content.products.systems];
                      updated[idx].titleColor = col;
                      setContent({ ...content, products: { ...content.products, systems: updated } });
                    }}
                  />

                  <RichColorTextEditor
                    label="Subtitle / Benefit"
                    value={system.subtitle}
                    onChange={(val) => {
                      const updated = [...content.products.systems];
                      updated[idx].subtitle = val;
                      setContent({ ...content, products: { ...content.products, systems: updated } });
                    }}
                    color={system.subtitleColor}
                    onColorChange={(col) => {
                      const updated = [...content.products.systems];
                      updated[idx].subtitleColor = col;
                      setContent({ ...content, products: { ...content.products, systems: updated } });
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <RichColorTextEditor
                    label="Indications / Description"
                    multiline
                    rows={3}
                    value={system.description}
                    onChange={(val) => {
                      const updated = [...content.products.systems];
                      updated[idx].description = val;
                      setContent({ ...content, products: { ...content.products, systems: updated } });
                    }}
                    color={system.textColor}
                    onColorChange={(col) => {
                      const updated = [...content.products.systems];
                      updated[idx].textColor = col;
                      setContent({ ...content, products: { ...content.products, systems: updated } });
                    }}
                  />

                  <ImageUploader
                    label="Product Packshot Image"
                    value={system.imageUrl}
                    onChange={(url) => {
                      const updated = [...content.products.systems];
                      updated[idx].imageUrl = url;
                      setContent({ ...content, products: { ...content.products, systems: updated } });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 9: BEAUTY AWARD VIDEO / BANNER */}
      {activeSection === 'video' && (
        <div className="space-y-6 bg-[#0f1b35] p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Video className="w-4 h-4 text-teal-400" />
              <span>Section 9: New Beauty Award Banner / Video</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              The wide Beauty Award 2024 banner and video fold, optimized to display properly on both mobile and desktop.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploader
              label="Banner Poster Image"
              value={content.videoBanner.bannerImage}
              onChange={(url) => setContent({ ...content, videoBanner: { ...content.videoBanner, bannerImage: url } })}
              description="Banner image shown on mobile and desktop."
            />

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300">Video MP4 URL</label>
              <input
                type="text"
                value={content.videoBanner.videoUrl}
                onChange={(e) => setContent({ ...content, videoBanner: { ...content.videoBanner, videoUrl: e.target.value } })}
                className="w-full text-xs py-2.5 px-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200"
              />
              <p className="text-[11px] text-slate-400">Direct MP4 video stream URL.</p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 10: TESTIMONIAL QUOTE & EXECUTIVE */}
      {activeSection === 'quote' && (
        <div className="space-y-6 bg-[#0f1b35] p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Quote className="w-4 h-4 text-teal-400" />
              <span>Section 10: Testimonial Quote & Executive</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              The executive testimonial featuring Megan Brown, CEO and Co-Founder, and portrait photography.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RichColorTextEditor
              label="Quote Author Name"
              value={content.quote.author}
              onChange={(val) => setContent({ ...content, quote: { ...content.quote, author: val } })}
              color={content.quote.authorColor}
              onColorChange={(col) => setContent({ ...content, quote: { ...content.quote, authorColor: col } })}
            />

            <RichColorTextEditor
              label="Author Designation"
              value={content.quote.role}
              onChange={(val) => setContent({ ...content, quote: { ...content.quote, role: val } })}
              color={content.quote.roleColor}
              onColorChange={(col) => setContent({ ...content, quote: { ...content.quote, roleColor: col } })}
            />

            <ImageUploader
              label="Executive Portrait Photo"
              value={content.quote.image}
              onChange={(url) => setContent({ ...content, quote: { ...content.quote, image: url } })}
            />
          </div>
        </div>
      )}

      {/* SECTION 11: KEY NUMBERS & STATISTICS */}
      {activeSection === 'numbers' && (
        <div className="space-y-6 bg-[#0f1b35] p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-400" />
              <span>Section 11: BGS in Numbers (Key Statistics)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize the "BGS in Numbers" title, metrics, labels, and text colors.
            </p>
          </div>

          <RichColorTextEditor
            label="Section Title"
            value={content.numbers.title}
            onChange={(val) => setContent({ ...content, numbers: { ...content.numbers, title: val } })}
            color={content.numbers.titleColor}
            onColorChange={(col) => setContent({ ...content, numbers: { ...content.numbers, titleColor: col } })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {content.numbers.stats.map((stat, idx) => (
              <div key={stat.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">
                  Metric #{idx + 1}
                </span>

                <RichColorTextEditor
                  label="Value"
                  value={stat.value}
                  onChange={(val) => {
                    const updated = [...content.numbers.stats];
                    updated[idx].value = val;
                    setContent({ ...content, numbers: { ...content.numbers, stats: updated } });
                  }}
                  color={stat.valueColor}
                  onColorChange={(col) => {
                    const updated = [...content.numbers.stats];
                    updated[idx].valueColor = col;
                    setContent({ ...content, numbers: { ...content.numbers, stats: updated } });
                  }}
                />

                <RichColorTextEditor
                  label="Label"
                  value={stat.label}
                  onChange={(val) => {
                    const updated = [...content.numbers.stats];
                    updated[idx].label = val;
                    setContent({ ...content, numbers: { ...content.numbers, stats: updated } });
                  }}
                  color={stat.labelColor}
                  onColorChange={(col) => {
                    const updated = [...content.numbers.stats];
                    updated[idx].labelColor = col;
                    setContent({ ...content, numbers: { ...content.numbers, stats: updated } });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 12: CAREERS / JOIN OUR TEAM */}
      {activeSection === 'careers' && (
        <div className="space-y-6 bg-[#0f1b35] p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-teal-400" />
              <span>Section 12: Careers / Join Our Team</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize career openings, job titles, and office locations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RichColorTextEditor
              label="Careers Headline"
              value={content.careers.title}
              onChange={(val) => setContent({ ...content, careers: { ...content.careers, title: val } })}
              color={content.careers.titleColor}
              onColorChange={(col) => setContent({ ...content, careers: { ...content.careers, titleColor: col } })}
            />

            <RichColorTextEditor
              label="Careers Subtitle"
              value={content.careers.subtitle}
              onChange={(val) => setContent({ ...content, careers: { ...content.careers, subtitle: val } })}
              color={content.careers.subtitleColor}
              onColorChange={(col) => setContent({ ...content, careers: { ...content.careers, subtitleColor: col } })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {content.careers.jobs.map((job, idx) => (
              <div key={job.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">
                  Job Role #{idx + 1}
                </span>
                <RichColorTextEditor
                  label="Position"
                  value={job.title}
                  onChange={(val) => {
                    const updated = [...content.careers.jobs];
                    updated[idx].title = val;
                    setContent({ ...content, careers: { ...content.careers, jobs: updated } });
                  }}
                  color={job.titleColor}
                  onColorChange={(col) => {
                    const updated = [...content.careers.jobs];
                    updated[idx].titleColor = col;
                    setContent({ ...content, careers: { ...content.careers, jobs: updated } });
                  }}
                />
                <RichColorTextEditor
                  label="Location"
                  value={job.location}
                  onChange={(val) => {
                    const updated = [...content.careers.jobs];
                    updated[idx].location = val;
                    setContent({ ...content, careers: { ...content.careers, jobs: updated } });
                  }}
                  color={job.locationColor}
                  onColorChange={(col) => {
                    const updated = [...content.careers.jobs];
                    updated[idx].locationColor = col;
                    setContent({ ...content, careers: { ...content.careers, jobs: updated } });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 13: PRESS PUBLICATIONS */}
      {activeSection === 'press' && (
        <div className="space-y-6 bg-[#0f1b35] p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <List className="w-4 h-4 text-teal-400" />
              <span>Section 13: Press & Publications</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Featured press releases with journal titles and publication dates.
            </p>
          </div>

          <RichColorTextEditor
            label="Press Section Title"
            value={content.press.title}
            onChange={(val) => setContent({ ...content, press: { ...content.press, title: val } })}
            color={content.press.titleColor}
            onColorChange={(col) => setContent({ ...content, press: { ...content.press, titleColor: col } })}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {content.press.items.map((item, idx) => (
              <div key={item.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">
                  Press Article #{idx + 1}
                </span>
                <RichColorTextEditor
                  label="Article Headline"
                  multiline
                  rows={2}
                  value={item.headline}
                  onChange={(val) => {
                    const updated = [...content.press.items];
                    updated[idx].headline = val;
                    setContent({ ...content, press: { ...content.press, items: updated } });
                  }}
                  color={item.headlineColor}
                  onColorChange={(col) => {
                    const updated = [...content.press.items];
                    updated[idx].headlineColor = col;
                    setContent({ ...content, press: { ...content.press, items: updated } });
                  }}
                />
                <RichColorTextEditor
                  label="Journal & Date"
                  value={item.source}
                  onChange={(val) => {
                    const updated = [...content.press.items];
                    updated[idx].source = val;
                    setContent({ ...content, press: { ...content.press, items: updated } });
                  }}
                  color={item.sourceColor}
                  onColorChange={(col) => {
                    const updated = [...content.press.items];
                    updated[idx].sourceColor = col;
                    setContent({ ...content, press: { ...content.press, items: updated } });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 14: JOIN THE OBAGI NEWSLETTER */}
      {activeSection === 'newsletter' && (
        <div className="space-y-6 bg-[#0f1b35] p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-400" />
              <span>Section 14: Join The OBAGI Newsletter</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize the newsletter headline and invitation subtitle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RichColorTextEditor
              label="Newsletter Title"
              value={content.newsletter.title}
              onChange={(val) => setContent({ ...content, newsletter: { ...content.newsletter, title: val } })}
              color={content.newsletter.titleColor}
              onColorChange={(col) => setContent({ ...content, newsletter: { ...content.newsletter, titleColor: col } })}
            />

            <RichColorTextEditor
              label="Newsletter Subtitle"
              value={content.newsletter.subtitle}
              onChange={(val) => setContent({ ...content, newsletter: { ...content.newsletter, subtitle: val } })}
              color={content.newsletter.subtitleColor}
              onColorChange={(col) => setContent({ ...content, newsletter: { ...content.newsletter, subtitleColor: col } })}
            />
          </div>
        </div>
      )}

      {/* SECTION 15: FOOTER & LEGAL */}
      {activeSection === 'footer' && (
        <div className="space-y-6 bg-[#0f1b35] p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>Section 15: Footer & Legal Disclaimers</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Edit the legal copyright and physician-dispensed warning notice.
            </p>
          </div>

          <RichColorTextEditor
            label="Legal Disclaimer & Copyright Notice"
            multiline
            rows={4}
            value={content.footer.copyright}
            onChange={(val) => setContent({ ...content, footer: { ...content.footer, copyright: val } })}
            color={content.footer.copyrightColor}
            onColorChange={(col) => setContent({ ...content, footer: { ...content.footer, copyrightColor: col } })}
            description="Physician-dispensed warning and copyright line at the bottom of the page."
          />
        </div>
      )}
    </div>
  );
}
