'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ExternalLink,
  Layers,
  Award,
  BookOpen,
  FlaskConical,
  Package,
  Images,
  Megaphone,
  History,
  Video,
  ClipboardCheck,
  Settings2,
  LayoutGrid,
  Image as ImageIcon,
  Mail,
  Handshake,
  Inbox,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Lock
} from 'lucide-react';
import { cmsHeaders, getCmsPin, setCmsPin } from '@/lib/cms-client';
import { ObagiHomeContent, defaultObagiHomeContent } from '@/data/obagi-home-content';
import { deepMerge } from '@/lib/deep-merge';
import SectionHeader from './sections/SectionHeader';
import SectionHero from './sections/SectionHero';
import SectionMarquee from './sections/SectionMarquee';
import SectionHistoryIntro from './sections/SectionHistoryIntro';
import SectionGallery from './sections/SectionGallery';
import SectionAbout from './sections/SectionAbout';
import SectionPillars from './sections/SectionPillars';
import SectionRdIntro from './sections/SectionRdIntro';
import SectionRdCards from './sections/SectionRdCards';
import SectionProducts from './sections/SectionProducts';
import SectionOrphanAudit from './sections/SectionOrphanAudit';
import SectionVideo from './sections/SectionVideo';
import SectionBg14 from './sections/SectionBg14';
import SectionFooterBg from './sections/SectionFooterBg';
import SectionPartnerEnquiry from './sections/SectionPartnerEnquiry';
import SectionEnquiryInbox from './sections/SectionEnquiryInbox';
import SectionSeo from './sections/SectionSeo';
import SectionFooter from './sections/SectionFooter';
// NOTE: SectionStory / SectionResearch / SectionCareersPress / SectionNumbers
// are legacy-unmounted (their Wix sections were BGS placeholders with no
// public target — see report). Files retained for history, never imported.

interface ObagiHomeCmsProps {
  onNotify?: (message: string, type: 'success' | 'error') => void;
}

export type PartKey =
  | 'header'
  | 'hero'
  | 'marquee'
  | 'history-intro'
  | 'gallery'
  | 'about'
  | 'pillars'
  | 'rd-intro'
  | 'rd-cards'
  | 'products'
  | 'orphan-audit'
  | 'video'
  | 'bg14'
  | 'footer-bg'
  | 'footer'
  | 'seo'
  | 'partner-enquiry'
  | 'enquiry-inbox';

export default function ObagiHomeCms({ onNotify }: ObagiHomeCmsProps) {
  const [loaded, setLoaded] = useState<ObagiHomeContent>(defaultObagiHomeContent);
  const [activePart, setActivePart] = useState<PartKey>('header');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [loadingInitial, setLoadingInitial] = useState(false);
  // Admin PIN gate — mutations/uploads always send this as `x-cms-pin`.
  const [authed, setAuthed] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  // Canonical load — server database only. localStorage is NEVER a source
  // of truth (it caused stale-default overwrites); no fallback reads.
  async function loadData() {
    setLoadingInitial(true);
    try {
      const res = await fetch('/api/obagi-cms', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setLoaded(deepMerge(defaultObagiHomeContent, json.data));
          setLoadingInitial(false);
          return;
        }
      }
      throw new Error('CMS load failed');
    } catch (e) {
      console.error('Failed to load CMS from API:', e);
      triggerToast('Could not load saved CMS content from the database.', 'error');
    }
    setLoadingInitial(false);
  }

  // Re-verify a remembered PIN on mount (session-only, never persisted).
  useEffect(() => {
    async function resume() {
      const remembered = getCmsPin();
      if (!remembered) return;
      try {
        const res = await fetch('/api/cms-auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pin: remembered }),
        });
        if (res.ok) {
          setAuthed(true);
          loadData();
        } else {
          setCmsPin('');
        }
      } catch {
        setCmsPin('');
      }
    }
    resume();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitPin = async () => {
    setPinError(null);
    setVerifying(true);
    try {
      const res = await fetch('/api/cms-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput }),
      });
      if (res.ok) {
        setCmsPin(pinInput.trim());
        setPinInput('');
        setAuthed(true);
        loadData();
      } else {
        setPinError('Incorrect PIN. Mutations stay locked.');
      }
    } catch {
      setPinError('Auth service unreachable.');
    } finally {
      setVerifying(false);
    }
  };

  const triggerToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    if (onNotify) onNotify(message, type);
    setTimeout(() => setToast(null), 4000);
  };

  // Section PATCH helper: sends ONLY the edited section; every other section
  // is preserved server-side. Success is reported ONLY after the server
  // confirms the database write and returns the canonical merged state.
  // On failure the draft stays on screen and null is returned — never a
  // false "Saved", never a localStorage-masked overwrite.
  const patchSection = async (patch: Partial<ObagiHomeContent>): Promise<ObagiHomeContent | null> => {
    try {
      const res = await fetch('/api/obagi-cms', {
        method: 'PATCH',
        headers: cmsHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(patch),
      });
      const json = await res.json().catch(() => ({} as any));
      if (res.ok && json.success && json.data) {
        return deepMerge(defaultObagiHomeContent, json.data);
      }
      if (res.status === 401) {
        setAuthed(false);
        setCmsPin('');
        triggerToast('Session expired — enter the admin PIN again.', 'error');
      } else {
        console.error('PATCH failed:', json?.error || res.status);
      }
    } catch (e) {
      console.error('PATCH failed:', e);
    }
    return null;
  };

  const onSaved = (updated: ObagiHomeContent) => {
    setLoaded(updated);
  };

  const sectionProps = {
    loaded,
    triggerToast,
    onSaved,
    patchSection
  };

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
              INDEPENDENT SECTION CMS
            </span>
            <span className="text-xs text-slate-400">Target: Home Page (/)</span>
          </div>
          <h2 className="text-xl font-black text-white mt-1">Obagi Medical Home Page Editor</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Every section saves independently with its own Save button. Changes update the database and display immediately without flash.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition border border-slate-700"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Live Home</span>
          </a>
        </div>
      </div>

      {/* PIN gate — editors stay locked until the server verifies the PIN */}
      {!authed && (
        <div className="bg-[#0d1830] p-8 rounded-2xl border border-slate-800 max-w-md mx-auto text-center space-y-4">
          <Lock className="w-6 h-6 mx-auto text-teal-400" />
          <h3 className="text-sm font-black text-white">Home CMS is locked</h3>
          <p className="text-[11px] text-slate-400">
            Enter the admin PIN to edit Home Page content. Writes and uploads require it.
          </p>
          <input
            type="password"
            inputMode="numeric"
            value={pinInput}
            onChange={(e) => setPinInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') submitPin(); }}
            placeholder="Admin PIN"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white text-center tracking-widest focus:outline-none focus:border-teal-400"
          />
          {pinError && <p className="text-[11px] text-rose-300">{pinError}</p>}
          <button
            type="button"
            onClick={submitPin}
            disabled={verifying || !pinInput}
            className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {verifying && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{verifying ? 'Verifying...' : 'Unlock CMS'}</span>
          </button>
        </div>
      )}

      {authed && (
      <>
      {/* Parts Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-2 bg-[#0d1830] p-2 rounded-2xl border border-slate-800">
        {[
          { key: 'header', label: 'Part 1: Header', icon: Layers },
          { key: 'hero', label: 'Part 2: Hero', icon: Sparkles },
          { key: 'marquee', label: 'Part 3: Marquee', icon: Megaphone },
          { key: 'history-intro', label: 'Part 4: History', icon: History },
          { key: 'gallery', label: 'Part 5: Gallery', icon: Images },
          { key: 'about', label: 'Part 6: About', icon: BookOpen },
          { key: 'pillars', label: 'Part 7: Pillars', icon: Award },
          { key: 'rd-intro', label: 'Part 8: R&D Intro', icon: FlaskConical },
          { key: 'rd-cards', label: 'Part 9: R&D Cards', icon: LayoutGrid },
          { key: 'products', label: 'Part 10: Products', icon: Package },
          { key: 'orphan-audit', label: 'Part 11: Audit', icon: ClipboardCheck },
          { key: 'video', label: 'Part 12: Video', icon: Video },
          { key: 'bg14', label: 'Part 13: BG-14', icon: ImageIcon },
          { key: 'footer-bg', label: 'Part 14: Footer BG', icon: ImageIcon },
          { key: 'footer', label: 'Part 15: Footer', icon: Mail },
          { key: 'seo', label: 'Settings: SEO', icon: Settings2 },
          { key: 'partner-enquiry', label: 'Partner & Enquiry', icon: Handshake },
          { key: 'enquiry-inbox', label: 'Enquiry Inbox', icon: Inbox }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activePart === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActivePart(tab.key as PartKey)}
              className={`p-3 rounded-xl text-left transition-all flex flex-col gap-1.5 ${
                isActive
                  ? 'bg-gradient-to-br from-teal-500/20 to-emerald-500/10 border border-teal-500/40 text-teal-300 shadow-md'
                  : 'bg-slate-900/60 hover:bg-slate-800/60 border border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
              <span className="text-[11px] font-bold truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Section Editor */}
      {loadingInitial ? (
        <div className="p-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
          <span>Loading CMS content from database...</span>
        </div>
      ) : (
        <>
          {activePart === 'header' && <SectionHeader {...sectionProps} />}
          {activePart === 'hero' && <SectionHero {...sectionProps} />}
          {activePart === 'marquee' && <SectionMarquee {...sectionProps} />}
          {activePart === 'history-intro' && <SectionHistoryIntro {...sectionProps} />}
          {activePart === 'gallery' && <SectionGallery {...sectionProps} />}
          {activePart === 'about' && <SectionAbout {...sectionProps} />}
          {activePart === 'pillars' && <SectionPillars {...sectionProps} />}
          {activePart === 'rd-intro' && <SectionRdIntro {...sectionProps} />}
          {activePart === 'rd-cards' && <SectionRdCards {...sectionProps} />}
          {activePart === 'products' && <SectionProducts {...sectionProps} />}
          {activePart === 'orphan-audit' && <SectionOrphanAudit triggerToast={triggerToast} />}
          {activePart === 'video' && <SectionVideo {...sectionProps} />}
          {activePart === 'bg14' && <SectionBg14 {...sectionProps} />}
          {activePart === 'footer-bg' && <SectionFooterBg {...sectionProps} />}
          {activePart === 'footer' && <SectionFooter {...sectionProps} />}
          {activePart === 'seo' && <SectionSeo {...sectionProps} />}
          {activePart === 'partner-enquiry' && <SectionPartnerEnquiry {...sectionProps} />}
          {activePart === 'enquiry-inbox' && <SectionEnquiryInbox triggerToast={triggerToast} />}
        </>
      )}
      </>
      )}
    </div>
  );
}
