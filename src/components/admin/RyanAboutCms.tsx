'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { RyanAboutContent, AboutCard, AboutBadge, PortfolioCategory, QualityFrameworkItem, CoreValueItem } from '@/data/ryan-about-content';
import { 
  Sparkles, 
  Target, 
  FlaskConical, 
  Layers, 
  ShieldCheck, 
  Building, 
  Check, 
  Plus, 
  Trash2, 
  Save, 
  ExternalLink, 
  Eye, 
  Image as ImageIcon,
  FileText,
  Award,
  ChevronRight,
  Heart
} from 'lucide-react';
import MediaInput from './MediaInput';
import ImageUploader from './ImageUploader';

interface RyanAboutCmsProps {
  data: RyanAboutContent;
  onChange: (newData: RyanAboutContent) => void;
  onSave: () => void;
}

export default function RyanAboutCms({ data, onChange, onSave }: RyanAboutCmsProps) {
  const [activeSubTab, setActiveSubTab] = useState<
    'hero' | 'vision' | 'approach' | 'portfolio' | 'quality' | 'ethics' | 'framework' | 'values'
  >('hero');

  const updateHero = (field: keyof RyanAboutContent['hero'], val: any) => {
    onChange({
      ...data,
      hero: { ...data.hero, [field]: val }
    });
  };

  const updateVision = (field: keyof RyanAboutContent['vision'], val: any) => {
    onChange({
      ...data,
      vision: { ...data.vision, [field]: val }
    });
  };

  const updateVisionCard = (idx: number, field: keyof AboutCard, val: any) => {
    const updatedCards = [...data.vision.cards];
    updatedCards[idx] = { ...updatedCards[idx], [field]: val };
    onChange({
      ...data,
      vision: { ...data.vision, cards: updatedCards }
    });
  };

  const updateApproach = (field: keyof RyanAboutContent['approach'], val: any) => {
    onChange({
      ...data,
      approach: { ...data.approach, [field]: val }
    });
  };

  const updateApproachCard = (idx: number, field: keyof AboutCard, val: any) => {
    const updatedCards = [...data.approach.cards];
    updatedCards[idx] = { ...updatedCards[idx], [field]: val };
    onChange({
      ...data,
      approach: { ...data.approach, cards: updatedCards }
    });
  };

  const updatePortfolio = (field: keyof RyanAboutContent['portfolio'], val: any) => {
    onChange({
      ...data,
      portfolio: { ...data.portfolio, [field]: val }
    });
  };

  const updatePortfolioCat = (idx: number, field: keyof PortfolioCategory, val: any) => {
    const updatedCats = [...data.portfolio.categories];
    updatedCats[idx] = { ...updatedCats[idx], [field]: val };
    onChange({
      ...data,
      portfolio: { ...data.portfolio, categories: updatedCats }
    });
  };

  const updateQuality = (field: keyof RyanAboutContent['quality'], val: any) => {
    onChange({
      ...data,
      quality: { ...data.quality, [field]: val }
    });
  };

  const updateQualityBadge = (idx: number, field: keyof AboutBadge, val: any) => {
    const updatedBadges = [...data.quality.badges];
    updatedBadges[idx] = { ...updatedBadges[idx], [field]: val };
    onChange({
      ...data,
      quality: { ...data.quality, badges: updatedBadges }
    });
  };

  const updateEthics = (field: keyof RyanAboutContent['ethicsMedinova'], val: any) => {
    onChange({
      ...data,
      ethicsMedinova: { ...data.ethicsMedinova, [field]: val }
    });
  };

  const updateFrameworkItem = (idx: number, field: keyof QualityFrameworkItem, val: any) => {
    const updated = [...data.qualityFramework];
    updated[idx] = { ...updated[idx], [field]: val };
    onChange({ ...data, qualityFramework: updated });
  };

  const updateValueItem = (idx: number, field: keyof CoreValueItem, val: any) => {
    const updated = [...data.coreValues];
    updated[idx] = { ...updated[idx], [field]: val };
    onChange({ ...data, coreValues: updated });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="bg-[#132247] p-6 rounded-2xl border border-teal-900/50 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-black uppercase tracking-widest">
              Live About CMS
            </span>
            <span className="text-xs text-slate-400">• Source: Content_Company.docx & About Ryan.png</span>
          </div>
          <h2 className="text-xl font-black text-white mt-2">
            About Ryan Dermaceutics Visual CMS
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage all 6 sections (Hero Collage, Vision, Approach, 4-Card Portfolio, Quality & Compliance, Ethics Medinova), plus 8 Quality Framework pillars and 6 Core Values with interactive pop-ups.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="/about"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Preview /about</span>
          </a>
          <button
            onClick={onSave}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-teal-950 transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Publish About CMS</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
        {[
          { id: 'hero', label: '1. Hero & Collage Banner', icon: Sparkles },
          { id: 'vision', label: '2. Our Vision & 3 Cards', icon: Target },
          { id: 'approach', label: '3. Our Approach & Culture', icon: FlaskConical },
          { id: 'portfolio', label: '4. Comprehensive Portfolio', icon: Layers },
          { id: 'quality', label: '5. Quality & Manufacturing', icon: ShieldCheck },
          { id: 'ethics', label: '6. Ethics Medinova Foundation', icon: Building },
          { id: 'framework', label: '7. 8-Pillar Quality Framework', icon: Award },
          { id: 'values', label: '8. 6 Core Values & Promises', icon: Heart }
        ].map((st) => {
          const Icon = st.icon;
          const isCurrent = activeSubTab === st.id;
          return (
            <button
              key={st.id}
              onClick={() => setActiveSubTab(st.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                isCurrent
                  ? 'bg-[#00768a] text-white shadow-md'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{st.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 1. HERO SECTION CMS                                       */}
      {/* ========================================================= */}
      {activeSubTab === 'hero' && (
        <div className="space-y-6">
          <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Hero Typography & Breadcrumbs</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Breadcrumb Current</label>
                <input
                  type="text"
                  value={data.hero.breadcrumbCurrent}
                  onChange={(e) => updateHero('breadcrumbCurrent', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Top Subtitle Tag</label>
                <input
                  type="text"
                  value={data.hero.subtitle}
                  onChange={(e) => updateHero('subtitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-bold block mb-1">Main Heading</label>
              <input
                type="text"
                value={data.hero.title}
                onChange={(e) => updateHero('title', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-base font-bold focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 font-bold block mb-1">Hero Description Paragraph</label>
              <textarea
                rows={3}
                value={data.hero.description}
                onChange={(e) => updateHero('description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs leading-relaxed focus:border-teal-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Primary CTA Button Text</label>
                <input
                  type="text"
                  value={data.hero.ctaText}
                  onChange={(e) => updateHero('ctaText', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">CTA Link Target</label>
                <input
                  type="text"
                  value={data.hero.ctaLink}
                  onChange={(e) => updateHero('ctaLink', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Hero Image Collage */}
            <div className="pt-4 border-t border-slate-800">
              <ImageUploader
                label="Hero Right-Side Visual Collage (Hexagons + Model)"
                value={data.hero.heroImage}
                onChange={(val) => updateHero('heroImage', val)}
                description="Upload image from computer or enter direct URL. Default: /ryan/about/about_hero_collage.png"
              />
            </div>

            {/* 4 Feature Badges Underneath */}
            <div className="pt-4 border-t border-slate-800">
              <label className="text-xs text-teal-300 font-bold block mb-3">4 Feature Badges</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {data.hero.badges.map((b, idx) => (
                  <div key={b.id} className="p-3 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
                    <span className="text-[10px] text-teal-400 font-black uppercase">Badge #{idx + 1}</span>
                    <input
                      type="text"
                      value={b.title}
                      onChange={(e) => {
                        const updated = [...data.hero.badges];
                        updated[idx].title = e.target.value;
                        updateHero('badges', updated);
                      }}
                      className="w-full px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs font-bold focus:border-teal-400 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. VISION SECTION CMS                                     */}
      {/* ========================================================= */}
      {activeSubTab === 'vision' && (
        <div className="space-y-6">
          <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>Vision Section & Graphics</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Subtitle</label>
                <input
                  type="text"
                  value={data.vision.subtitle}
                  onChange={(e) => updateVision('subtitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Vision Title</label>
                <input
                  type="text"
                  value={data.vision.title}
                  onChange={(e) => updateVision('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-bold block mb-1">Vision Description</label>
              <textarea
                rows={3}
                value={data.vision.description}
                onChange={(e) => updateVision('description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs leading-relaxed focus:border-teal-500 focus:outline-none"
              />
            </div>

            {/* Target Image Graphic */}
            <div className="pt-3 border-t border-slate-800">
              <ImageUploader
                label="Dart Target Graphic Image"
                value={data.vision.targetImage}
                onChange={(val) => updateVision('targetImage', val)}
                description="Upload image or enter direct URL. Default: /ryan/about/about_vision_target.png"
              />
            </div>

            {/* 3 Vision Cards with Popups */}
            <div className="pt-4 border-t border-slate-800">
              <label className="text-xs text-teal-300 font-bold block mb-3">3 Vision Cards & Interactive Modal Contents</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.vision.cards.map((c, idx) => (
                  <div key={c.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                    <span className="text-[10px] text-teal-400 font-black uppercase">Card #{idx + 1}</span>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Title</label>
                      <input
                        type="text"
                        value={c.title}
                        onChange={(e) => updateVisionCard(idx, 'title', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs font-bold focus:border-teal-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Short Description</label>
                      <textarea
                        rows={2}
                        value={c.desc}
                        onChange={(e) => updateVisionCard(idx, 'desc', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs focus:border-teal-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-teal-300 font-bold block mb-1">Modal Title</label>
                      <input
                        type="text"
                        value={c.popupTitle || ''}
                        onChange={(e) => updateVisionCard(idx, 'popupTitle', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs focus:border-teal-400 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. APPROACH SECTION CMS                                   */}
      {/* ========================================================= */}
      {activeSubTab === 'approach' && (
        <div className="space-y-6">
          <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              <span>Our Approach & Culture</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Subtitle</label>
                <input
                  type="text"
                  value={data.approach.subtitle}
                  onChange={(e) => updateApproach('subtitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Headline</label>
                <input
                  type="text"
                  value={data.approach.title}
                  onChange={(e) => updateApproach('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-bold block mb-1">Approach Description</label>
              <textarea
                rows={3}
                value={data.approach.description}
                onChange={(e) => updateApproach('description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs leading-relaxed focus:border-teal-500 focus:outline-none"
              />
            </div>

            {/* Petri Dish Graphic */}
            <div className="pt-3 border-t border-slate-800">
              <ImageUploader
                label="Petri Dish Graphic Image"
                value={data.approach.petriImage}
                onChange={(val) => updateApproach('petriImage', val)}
                description="Upload image or enter direct URL. Default: /ryan/about/about_approach_petri.png"
              />
            </div>

            {/* 3 Approach Cards */}
            <div className="pt-4 border-t border-slate-800">
              <label className="text-xs text-teal-300 font-bold block mb-3">3 Approach Cards & Modals</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.approach.cards.map((c, idx) => (
                  <div key={c.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                    <span className="text-[10px] text-teal-400 font-black uppercase">Card #{idx + 1}</span>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Title</label>
                      <input
                        type="text"
                        value={c.title}
                        onChange={(e) => updateApproachCard(idx, 'title', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs font-bold focus:border-teal-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={c.desc}
                        onChange={(e) => updateApproachCard(idx, 'desc', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs focus:border-teal-400 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 4. PORTFOLIO SECTION CMS                                  */}
      {/* ========================================================= */}
      {activeSubTab === 'portfolio' && (
        <div className="space-y-6">
          <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Comprehensive Portfolio (4 Categories)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Portfolio Title</label>
                <input
                  type="text"
                  value={data.portfolio.title}
                  onChange={(e) => updatePortfolio('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">CTA Text</label>
                <input
                  type="text"
                  value={data.portfolio.ctaText}
                  onChange={(e) => updatePortfolio('ctaText', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-bold block mb-1">Description</label>
              <textarea
                rows={2}
                value={data.portfolio.description}
                onChange={(e) => updatePortfolio('description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-teal-500 focus:outline-none"
              />
            </div>

            {/* 4 Category Cards */}
            <div className="pt-4 border-t border-slate-800">
              <label className="text-xs text-teal-300 font-bold block mb-3">4 Product Category Cards</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.portfolio.categories.map((cat, idx) => (
                  <div key={cat.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                    <span className="text-[10px] text-teal-400 font-black uppercase">Category #{idx + 1}</span>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Title</label>
                      <input
                        type="text"
                        value={cat.title}
                        onChange={(e) => updatePortfolioCat(idx, 'title', e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs font-bold focus:border-teal-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Dosage Subtext</label>
                      <input
                        type="text"
                        value={cat.subtext}
                        onChange={(e) => updatePortfolioCat(idx, 'subtext', e.target.value)}
                        className="w-full px-2 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-[11px] focus:border-teal-400 focus:outline-none"
                      />
                    </div>
                    <div className="pt-1">
                      <ImageUploader
                        label="Category Thumbnail Image"
                        value={cat.image}
                        onChange={(val) => updatePortfolioCat(idx, 'image', val)}
                        description="Upload or enter URL"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. QUALITY SECTION CMS                                    */}
      {/* ========================================================= */}
      {activeSubTab === 'quality' && (
        <div className="space-y-6">
          <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Quality & Manufacturing</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Subtitle</label>
                <input
                  type="text"
                  value={data.quality.subtitle}
                  onChange={(e) => updateQuality('subtitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Quality Title</label>
                <input
                  type="text"
                  value={data.quality.title}
                  onChange={(e) => updateQuality('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-bold block mb-1">Description</label>
              <textarea
                rows={3}
                value={data.quality.description}
                onChange={(e) => updateQuality('description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs leading-relaxed focus:border-teal-500 focus:outline-none"
              />
            </div>

            {/* Microscope Lab Graphic */}
            <div className="pt-3 border-t border-slate-800">
              <ImageUploader
                label="Scientist Microscope Lab Image"
                value={data.quality.labImage}
                onChange={(val) => updateQuality('labImage', val)}
                description="Upload image or enter direct URL. Default: /ryan/about/quality_microscope.png"
              />
            </div>

            {/* 3 Quality Badges */}
            <div className="pt-4 border-t border-slate-800">
              <label className="text-xs text-teal-300 font-bold block mb-3">3 Quality Badges</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.quality.badges.map((b, idx) => (
                  <div key={b.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                    <span className="text-[10px] text-teal-400 font-black uppercase">Badge #{idx + 1}</span>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Badge Title</label>
                      <input
                        type="text"
                        value={b.title}
                        onChange={(e) => updateQualityBadge(idx, 'title', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs font-bold focus:border-teal-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-1">Subtext</label>
                      <input
                        type="text"
                        value={b.desc || ''}
                        onChange={(e) => updateQualityBadge(idx, 'desc', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs focus:border-teal-400 focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. ETHICS MEDINOVA FOUNDATION CMS                         */}
      {/* ========================================================= */}
      {activeSubTab === 'ethics' && (
        <div className="space-y-6">
          <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-5">
            <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span>Ethics Medinova Private Limited (Parent Foundation)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Subtitle</label>
                <input
                  type="text"
                  value={data.ethicsMedinova.subtitle}
                  onChange={(e) => updateEthics('subtitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-teal-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">Headline</label>
                <input
                  type="text"
                  value={data.ethicsMedinova.title}
                  onChange={(e) => updateEthics('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:border-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-bold block mb-1">Foundation Paragraph</label>
              <textarea
                rows={3}
                value={data.ethicsMedinova.description}
                onChange={(e) => updateEthics('description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs leading-relaxed focus:border-teal-500 focus:outline-none"
              />
            </div>

            {/* Corporate Building Graphic */}
            <div className="pt-3 border-t border-slate-800">
              <ImageUploader
                label="Corporate Headquarters Building Image"
                value={data.ethicsMedinova.buildingImage}
                onChange={(val) => updateEthics('buildingImage', val)}
                description="Upload image or enter direct URL. Default: /ryan/about/ethics_building.png"
              />
            </div>

            {/* 3 Badges */}
            <div className="pt-4 border-t border-slate-800">
              <label className="text-xs text-teal-300 font-bold block mb-3">3 Foundation Badges</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.ethicsMedinova.badges.map((b, idx) => (
                  <div key={b.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-2">
                    <span className="text-[10px] text-teal-400 font-black uppercase">Badge #{idx + 1}</span>
                    <input
                      type="text"
                      value={b.title}
                      onChange={(e) => {
                        const updated = [...data.ethicsMedinova.badges];
                        updated[idx].title = e.target.value;
                        updateEthics('badges', updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs font-bold focus:border-teal-400 focus:outline-none"
                    />
                    <input
                      type="text"
                      value={b.desc || ''}
                      onChange={(e) => {
                        const updated = [...data.ethicsMedinova.badges];
                        updated[idx].desc = e.target.value;
                        updateEthics('badges', updated);
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs focus:border-teal-400 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. QUALITY FRAMEWORK (8 PILLARS)                          */}
      {/* ========================================================= */}
      {activeSubTab === 'framework' && (
        <div className="space-y-6">
          <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>8-Pillar Quality Framework (From Content_Company.docx)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Each pillar includes a number, title, tagline, detailed description, and clinical focus points shown in popups.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.qualityFramework.map((item, idx) => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-teal-300 bg-teal-900/40 px-2 py-0.5 rounded">
                      Pillar {item.number}
                    </span>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateFrameworkItem(idx, 'title', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs font-bold focus:border-teal-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Tagline</label>
                    <input
                      type="text"
                      value={item.tagline}
                      onChange={(e) => updateFrameworkItem(idx, 'tagline', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs focus:border-teal-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={item.description}
                      onChange={(e) => updateFrameworkItem(idx, 'description', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs leading-relaxed focus:border-teal-400 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. CORE VALUES (6 VALUES)                                 */}
      {/* ========================================================= */}
      {activeSubTab === 'values' && (
        <div className="space-y-6">
          <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
            <div>
              <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>6 Core Values & Commitments (From Content_Company.docx)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Driven by Science. Guided by Integrity. Focused on Better Skin Health.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.coreValues.map((val, idx) => (
                <div key={val.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                  <span className="text-xs font-black text-teal-300 bg-teal-900/40 px-2 py-0.5 rounded">
                    Value {val.number}
                  </span>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Title</label>
                    <input
                      type="text"
                      value={val.title}
                      onChange={(e) => updateValueItem(idx, 'title', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs font-bold focus:border-teal-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Tagline</label>
                    <input
                      type="text"
                      value={val.tagline}
                      onChange={(e) => updateValueItem(idx, 'tagline', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs focus:border-teal-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={val.description}
                      onChange={(e) => updateValueItem(idx, 'description', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs leading-relaxed focus:border-teal-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-emerald-400 font-bold block mb-1">Commitment Statement</label>
                    <textarea
                      rows={2}
                      value={val.commitment}
                      onChange={(e) => updateValueItem(idx, 'commitment', e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-600 text-white text-xs focus:border-teal-400 focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
