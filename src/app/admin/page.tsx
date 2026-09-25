'use client';

import React, { useState, useEffect } from 'react';
import {
  FullSiteData,
  CardItem,
  ResearchItem,
  ApproachTab,
  StorageProvider,
  NavItem,
  TrustBannerItem
} from '@/types/content';
import {
  Video,
  Image as ImageIcon,
  BookOpen,
  Microscope,
  Compass,
  Layers,
  Mail,
  Save,
  CheckCircle2,
  ExternalLink,
  Plus,
  Trash2,
  Eye,
  Sliders,
  Type,
  Palette,
  Menu,
  ChevronLeft,
  ChevronRight,
  Shield,
  Key,
  Lock,
  Download,
  Database,
  Activity,
  Sparkles,
  Users,
  Settings,
  HelpCircle,
  FileSpreadsheet,
  Globe,
  Cloud
} from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';
import MediaInput from '@/components/admin/MediaInput';

type AdminTab =
  | 'screen0'
  | 'screen1'
  | 'ticker'
  | 'screen2'
  | 'screen3'
  | 'screen4'
  | 'screen5'
  | 'screen6'
  | 'screen7'
  | 'widget'
  | 'subscribers'
  | 'settings'
  | 'security'
  | 'logs';

export default function AdminDashboard() {
  const [data, setData] = useState<FullSiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('screen0');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        if (d.security?.twoFactorEnabled) {
          setIsLocked(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load content:', err);
        setLoading(false);
      });
  }, []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setData(result.data);
        showToast('Changes published successfully to Live Site!', 'success');
      } else {
        showToast(result.error || 'Failed to publish changes', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error communicating with server', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleUnlock = () => {
    const expectedPin = data?.security?.pinCode || '1234';
    if (pinInput === expectedPin) {
      setIsLocked(false);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm('Are you sure you want to remove this subscriber?')) return;
    try {
      const res = await fetch('/api/newsletter', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const result = await res.json();
      if (result.success && data) {
        setData({
          ...data,
          newsletter: {
            ...data.newsletter,
            subscribers: result.subscribers,
          },
        });
        showToast('Subscriber removed.', 'success');
      }
    } catch (err) {
      showToast('Failed to delete subscriber', 'error');
    }
  };

  const handleExportSubscribers = (format: 'csv' | 'json') => {
    if (!data?.newsletter?.subscribers) return;
    if (format === 'csv') {
      window.open('/api/newsletter?format=csv', '_blank');
    } else {
      const jsonStr = JSON.stringify(data.newsletter.subscribers, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `obagi-subscribers-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold tracking-wide">Loading Obagi Enterprise CMS...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-sm text-red-400">Failed to initialize content engine.</p>
      </div>
    );
  }

  // PIN / 2FA Gate
  if (isLocked) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-center animate-in zoom-in-95">
          <div className="w-16 h-16 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Obagi Admin Security</h2>
            <p className="text-xs text-slate-400 mt-1">Enter your 4-digit PIN code to unlock the CMS management studio.</p>
          </div>
          <div className="space-y-3">
            <input
              type="password"
              maxLength={6}
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setPinError(false);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
              placeholder="Enter PIN (Default: 1234)"
              className="w-full text-center tracking-widest text-lg px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
              autoFocus
            />
            {pinError && <p className="text-xs text-rose-400 font-medium">Incorrect security PIN code.</p>}
            <button
              onClick={handleUnlock}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all"
            >
              Unlock Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const activeProvider = data.storage?.activeSource || data.storage?.provider || 'local';

  const menuSections = [
    {
      group: 'Home Page Sections',
      items: [
        { id: 'screen0', label: 'Navbar & Header', icon: Globe, desc: 'Logo, Navigation & SPECTRA' },
        { id: 'screen1', label: 'Screen 1: Hero Video', icon: Video, desc: 'H1 Headline & Video Box' },
        { id: 'ticker', label: 'Trust Marquee Ticker', icon: Activity, desc: '35-Yr Experience Marquee' },
        { id: 'screen2', label: 'Screen 2: Our History', icon: ImageIcon, desc: '35-Yr Story & 4 Images' },
        { id: 'screen3', label: 'Screen 3: About Obagi', icon: BookOpen, desc: 'Company Quote & Paragraph' },
        { id: 'screen4', label: 'Screen 4: Physician Heritage', icon: Shield, desc: '#1 Brand & 4 Standard Cards' },
        { id: 'screen5', label: 'Screen 5: Research & Approach', icon: Microscope, desc: 'R&D Banner & 3 Cards' },
        { id: 'screen6', label: 'Screen 6: 3D Cards & Video', icon: Layers, desc: 'Card Stack & Under-card Video' },
        { id: 'screen7', label: 'Screen 7: Quote & Footer', icon: Mail, desc: 'Doctor Quote, Newsletter, Links' },
      ],
    },
    {
      group: 'Features & Operations',
      items: [
        { id: 'widget', label: 'Floating AI Widget', icon: Sparkles, desc: 'Chat with AI & Quick Pills' },
        { id: 'subscribers', label: 'Subscribers List', icon: Users, desc: `${data.newsletter?.subscribers?.length || 0} Emails + CSV Export` },
        { id: 'settings', label: 'Multi-Source Media', icon: Cloud, desc: 'Local / R2 / S3 / Cloudinary' },
        { id: 'security', label: 'Admin Security & 2FA', icon: Key, desc: 'PIN Lock & 2FA Protection' },
        { id: 'logs', label: 'Activity Audit Log', icon: Database, desc: 'Real-time System Audit' },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      {/* Top Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-600/30">
            O
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold tracking-wide text-white">OBAGI MEDICAL INDIA</h1>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/60">
                100% Dynamic Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Enterprise Wix Clone CMS & Multi-Source Cloud Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Active storage badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/80 text-[10px] text-slate-300 font-mono">
            <span className="text-slate-400">Media Source:</span>
            <span className="font-bold text-indigo-400 uppercase">{activeProvider}</span>
          </div>

          <button
            onClick={() => setIsLocked(true)}
            title="Lock CMS Session"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
          </button>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-all border border-slate-700 shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </a>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Publishing...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>SAVE & PUBLISH LIVE</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl border text-xs font-semibold backdrop-blur-lg animate-in slide-in-from-bottom-5 ${
            toast.type === 'success'
              ? 'bg-emerald-950/90 text-emerald-200 border-emerald-800'
              : 'bg-rose-950/90 text-rose-200 border-rose-800'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toast.message}</span>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`${
            sidebarCollapsed ? 'w-20' : 'w-72'
          } border-r border-slate-800 bg-slate-900/50 p-3 flex flex-col gap-1 overflow-y-auto transition-all duration-300`}
        >
          {/* Collapse Toggle */}
          <div className="flex items-center justify-between px-2 py-1 mb-2">
            {!sidebarCollapsed && (
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Navigation
              </span>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white ml-auto"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {menuSections.map((sec, sIdx) => (
            <div key={sec.group} className="space-y-1 mb-4">
              {!sidebarCollapsed && (
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 px-2 block">
                  {sec.group}
                </span>
              )}
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as AdminTab)}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20' : 'bg-slate-800'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {!sidebarCollapsed && (
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-bold block truncate">{item.label}</span>
                        <p className={`text-[10px] truncate ${isActive ? 'text-indigo-100' : 'text-slate-500'}`}>
                          {item.desc}
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-950/70">
          <div className="max-w-5xl mx-auto space-y-6">

            {/* =========================================================================
                SCREEN 0: NAVBAR & HEADER BRANDING
               ========================================================================= */}
            {activeTab === 'screen0' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      Navbar & Header
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">Navbar, Logo & SPECTRA Partnership</h2>
                    <p className="text-xs text-slate-400">Controls `#comp-lw3c3n7z`, top logo, navigation items, search, and Brought to you badge.</p>
                  </div>
                  <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30">
                    Save Changes
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Logo & Position */}
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Logo Settings</h3>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Logo Text Brand</label>
                      <input
                        type="text"
                        value={data.header.logoText}
                        onChange={(e) => setData({ ...data, header: { ...data.header, logoText: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <MediaInput
                      label="Custom Logo Image URL (Overrides SVG if provided)"
                      value={data.header.logoImageUrl}
                      onChange={(url) => setData({ ...data, header: { ...data.header, logoImageUrl: url } })}
                      mediaType="image"
                      activeProvider={activeProvider}
                      placeholder="https://... or /uploads/logo.png"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">Logo Color</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={data.header.logoColor || '#ffffff'}
                            onChange={(e) => setData({ ...data, header: { ...data.header, logoColor: e.target.value } })}
                            className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                          />
                          <input
                            type="text"
                            value={data.header.logoColor || '#ffffff'}
                            onChange={(e) => setData({ ...data, header: { ...data.header, logoColor: e.target.value } })}
                            className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-300 block mb-1">Logo Alignment</label>
                        <select
                          value={data.header.logoPosition || 'left'}
                          onChange={(e) => setData({ ...data, header: { ...data.header, logoPosition: e.target.value as any } })}
                          className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        >
                          <option value="left">Left Aligned (Default)</option>
                          <option value="center">Centered</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Brought to you by SPECTRA */}
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Brought by SPECTRA Badge</h3>

                    <RichTextEditor
                      label="Badge Label Text"
                      value={data.header.broughtByText}
                      onChange={(val) => setData({ ...data, header: { ...data.header, broughtByText: val } })}
                      rows={2}
                    />

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Badge Target Link URL</label>
                      <input
                        type="text"
                        value={data.header.broughtByLinkUrl || 'https://www.spectramedicals.com/'}
                        onChange={(e) => setData({ ...data, header: { ...data.header, broughtByLinkUrl: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold text-slate-200 block">Search Functionality</span>
                        <span className="text-[10px] text-slate-500">Show/hide search button in header</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={data.header.searchEnabled}
                        onChange={(e) => setData({ ...data, header: { ...data.header, searchEnabled: e.target.checked } })}
                        className="w-4 h-4 rounded text-indigo-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Nav Items List */}
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Navigation Menu Items</h3>
                      <p className="text-[11px] text-slate-400">Primary navbar items with sub-menu dropdown collections.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.header.navItems.map((item, idx) => (
                      <div key={item.id || idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-white">Item 0{idx + 1}: {item.title}</span>
                          <span className="text-[10px] text-slate-500 font-mono">{item.dropdown?.length || 0} sub-items</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-0.5">Title</label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => {
                                const newItems = [...data.header.navItems];
                                newItems[idx].title = e.target.value;
                                setData({ ...data, header: { ...data.header, navItems: newItems } });
                              }}
                              className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-400 block mb-0.5">Target Anchor/Link</label>
                            <input
                              type="text"
                              value={item.href}
                              onChange={(e) => {
                                const newItems = [...data.header.navItems];
                                newItems[idx].href = e.target.value;
                                setData({ ...data, header: { ...data.header, navItems: newItems } });
                              }}
                              className="w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                SCREEN 1: HERO VIDEO
               ========================================================================= */}
            {activeTab === 'screen1' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      Screen 1 / 7
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">Hero Video & Dynamic Headline</h2>
                    <p className="text-xs text-slate-400">Controls `#comp-kbgaghri`, `#comp-lxriadds`, `#comp-lxriaddt`, and GSAP Circle Morph.</p>
                  </div>
                  <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30">
                    Save Changes
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column: Form */}
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Headline & Subtitle</h3>

                    <RichTextEditor
                      label="Headline Text (H1)"
                      value={data.hero.heading}
                      onChange={(val) => setData({ ...data, hero: { ...data.hero, heading: val } })}
                      rows={2}
                    />

                    <div className="flex items-center gap-3">
                      <label className="text-xs font-semibold text-slate-300">Headline Color:</label>
                      <input
                        type="color"
                        value={data.hero.headingColor || '#2B328C'}
                        onChange={(e) => setData({ ...data, hero: { ...data.hero, headingColor: e.target.value } })}
                        className="w-6 h-6 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={data.hero.headingColor || '#2B328C'}
                        onChange={(e) => setData({ ...data, hero: { ...data.hero, headingColor: e.target.value } })}
                        className="w-28 px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                      />
                    </div>

                    <RichTextEditor
                      label="Subtitle & Awards (H2)"
                      value={data.hero.subtitle}
                      onChange={(val) => setData({ ...data, hero: { ...data.hero, subtitle: val } })}
                      rows={3}
                    />

                    <div className="flex items-center gap-3">
                      <label className="text-xs font-semibold text-slate-300">Subtitle Color:</label>
                      <input
                        type="color"
                        value={data.hero.subtitleColor || '#2B328C'}
                        onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitleColor: e.target.value } })}
                        className="w-6 h-6 rounded border border-slate-700 bg-transparent cursor-pointer"
                      />
                      <input
                        type="text"
                        value={data.hero.subtitleColor || '#2B328C'}
                        onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitleColor: e.target.value } })}
                        className="w-28 px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  {/* Right Column: Media */}
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Hero Media & Video</h3>

                    <MediaInput
                      label="Hero Video Stream URL (MP4 / WebM)"
                      value={data.hero.mediaUrl}
                      onChange={(url) => setData({ ...data, hero: { ...data.hero, mediaUrl: url } })}
                      mediaType="video"
                      activeProvider={activeProvider}
                      placeholder="https://video.wixstatic.com/.../file.mp4"
                    />

                    <MediaInput
                      label="Hero Video Poster Image URL"
                      value={data.hero.posterUrl}
                      onChange={(url) => setData({ ...data, hero: { ...data.hero, posterUrl: url } })}
                      mediaType="image"
                      activeProvider={activeProvider}
                      placeholder="https://static.wixstatic.com/.../hero.jpg"
                    />

                    <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                      <div>
                        <span className="text-xs font-semibold text-slate-200 block">GSAP Circle Morph</span>
                        <span className="text-[10px] text-slate-500">Expands hero circle into full width on scroll</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={data.hero.morphEnabled ?? true}
                        onChange={(e) => setData({ ...data, hero: { ...data.hero, morphEnabled: e.target.checked } })}
                        className="w-4 h-4 rounded text-indigo-600 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                TRUST MARQUEE TICKER (Between Hero and History)
               ========================================================================= */}
            {activeTab === 'ticker' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      Trust Marquee
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">35-Year Heritage Scroll Marquee</h2>
                    <p className="text-xs text-slate-400">Controls `#comp-mlqkez2p`, `#comp-mlqkgv7u` marquee scroll ticker between Hero and History.</p>
                  </div>
                  <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30">
                    Save Changes
                  </button>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <RichTextEditor
                    label="Marquee Repeating Ticker Text"
                    value={data.marquee?.text || 'CLINICALLY-TESTED          |          TRANSFORMATIONAL SKINCARE          |          35 YEARS OF EXPERTISE          |          TRUSTED BY PHYSICIANS          |          PROVEN RESULTS'}
                    onChange={(val) => setData({ ...data, marquee: { ...(data.marquee || { enabled: true, text: '', speedSeconds: 20 }), text: val } })}
                    rows={3}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Scroll Duration (Seconds)</label>
                      <input
                        type="number"
                        min={5}
                        max={60}
                        value={data.marquee?.speedSeconds || 20}
                        onChange={(e) => setData({ ...data, marquee: { ...(data.marquee || { enabled: true, text: '', speedSeconds: 20 }), speedSeconds: Number(e.target.value) } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Text Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={data.marquee?.textColor || '#ffffff'}
                          onChange={(e) => setData({ ...data, marquee: { ...(data.marquee || { enabled: true, text: '', speedSeconds: 20 }), textColor: e.target.value } })}
                          className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                        />
                        <input
                          type="text"
                          value={data.marquee?.textColor || '#ffffff'}
                          onChange={(e) => setData({ ...data, marquee: { ...(data.marquee || { enabled: true, text: '', speedSeconds: 20 }), textColor: e.target.value } })}
                          className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Background Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={data.marquee?.backgroundColor || '#2B328C'}
                          onChange={(e) => setData({ ...data, marquee: { ...(data.marquee || { enabled: true, text: '', speedSeconds: 20 }), backgroundColor: e.target.value } })}
                          className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                        />
                        <input
                          type="text"
                          value={data.marquee?.backgroundColor || '#2B328C'}
                          onChange={(e) => setData({ ...data, marquee: { ...(data.marquee || { enabled: true, text: '', speedSeconds: 20 }), backgroundColor: e.target.value } })}
                          className="w-full px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Marquee Preview */}
                  <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Live Scrolling Simulation</span>
                    <div
                      className="py-3 px-4 rounded-lg overflow-hidden whitespace-nowrap text-xs font-bold tracking-widest uppercase flex items-center shadow-inner"
                      style={{
                        backgroundColor: data.marquee?.backgroundColor || '#2B328C',
                        color: data.marquee?.textColor || '#ffffff',
                      }}
                    >
                      <div className="animate-marquee inline-block">
                        {data.marquee?.text || 'CLINICALLY-TESTED | TRANSFORMATIONAL SKINCARE | 35 YEARS OF EXPERTISE | TRUSTED BY PHYSICIANS | PROVEN RESULTS'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                SCREEN 2: OUR HISTORY
               ========================================================================= */}
            {activeTab === 'screen2' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      Screen 2 / 7
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">Our History & Clinical Heritage</h2>
                    <p className="text-xs text-slate-400">Controls `#comp-lwqg8022`, `#comp-lwz20kzt` with 4 clinical images.</p>
                  </div>
                  <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30">
                    Save Changes
                  </button>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <RichTextEditor
                    label="Section Title"
                    value={data.history.title}
                    onChange={(val) => setData({ ...data, history: { ...data.history, title: val } })}
                    rows={2}
                  />

                  <RichTextEditor
                    label="35-Year Heritage Description Body"
                    value={data.history.description || ''}
                    onChange={(val) => setData({ ...data, history: { ...data.history, description: val } })}
                    rows={4}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                    <MediaInput
                      label="Image 1: Primary Nu-Derm FX System"
                      value={data.history.primaryImage || ''}
                      onChange={(url) => setData({ ...data, history: { ...data.history, primaryImage: url } })}
                      mediaType="image"
                      activeProvider={activeProvider}
                    />

                    <MediaInput
                      label="Image 2: Aesthetics Award Badge"
                      value={data.history.badgeImage || ''}
                      onChange={(url) => setData({ ...data, history: { ...data.history, badgeImage: url } })}
                      mediaType="image"
                      activeProvider={activeProvider}
                    />

                    <MediaInput
                      label="Image 3: Clinical Dropper Texture"
                      value={data.history.dropperImage || ''}
                      onChange={(url) => setData({ ...data, history: { ...data.history, dropperImage: url } })}
                      mediaType="image"
                      activeProvider={activeProvider}
                    />

                    <MediaInput
                      label="Image 4: Patient Portrait (Hydration)"
                      value={data.history.portraitImage || ''}
                      onChange={(url) => setData({ ...data, history: { ...data.history, portraitImage: url } })}
                      mediaType="image"
                      activeProvider={activeProvider}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                SCREEN 3: ABOUT OBAGI
               ========================================================================= */}
            {activeTab === 'screen3' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      Screen 3 / 7
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">About Obagi Medical</h2>
                    <p className="text-xs text-slate-400">Controls `#comp-lwrl1yo4` (Title/Quote) and `#comp-ml6khg9g` (Body text).</p>
                  </div>
                  <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30">
                    Save Changes
                  </button>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <RichTextEditor
                    label="Section Title"
                    value={data.about.title}
                    onChange={(val) => setData({ ...data, about: { ...data.about, title: val } })}
                    rows={2}
                  />

                  <RichTextEditor
                    label="Brand Mission Quote"
                    value={data.about.quote}
                    onChange={(val) => setData({ ...data, about: { ...data.about, quote: val } })}
                    rows={3}
                  />

                  <RichTextEditor
                    label="Medical-Grade Skincare Paragraph"
                    value={data.about.paragraph || ''}
                    onChange={(val) => setData({ ...data, about: { ...data.about, paragraph: val } })}
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* =========================================================================
                SCREEN 4: PHYSICIAN HERITAGE (#1 LEADING BRAND)
               ========================================================================= */}
            {activeTab === 'screen4' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      Screen 4 / 7
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">#1 Physician Recommended Heritage</h2>
                    <p className="text-xs text-slate-400">Controls `#comp-mlqmnjor`, heading, tagline, and the 4 clinical standard cards.</p>
                  </div>
                  <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30">
                    Save Changes
                  </button>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <RichTextEditor
                    label="Main Heading"
                    value={data.trustBanner?.heading || '#1 Leading U.S. Physician Recommended Brand*'}
                    onChange={(val) => setData({ ...data, trustBanner: { ...(data.trustBanner || { heading: '', tagline: '' }), heading: val } })}
                    rows={2}
                  />

                  <RichTextEditor
                    label="Concerns Tagline"
                    value={data.trustBanner?.tagline || 'FOR TOP 3 SKIN CONCERNS: Pigmentation | Fine Lines & Wrinkles | Sagging Skin & Loss of Elasticity'}
                    onChange={(val) => setData({ ...data, trustBanner: { ...(data.trustBanner || { heading: '', tagline: '' }), tagline: val } })}
                    rows={2}
                  />

                  <div className="pt-4 border-t border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">4 Clinical Standard Repeater Cards</h3>
                    {(data.trustBanner?.items || []).map((card, idx) => (
                      <div key={card.id || idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase">Card 0{idx + 1}</span>
                        <RichTextEditor
                          label="Card Title"
                          value={card.title}
                          onChange={(val) => {
                            const newItems = [...(data.trustBanner?.items || [])];
                            newItems[idx] = { ...newItems[idx], title: val };
                            setData({ ...data, trustBanner: { ...(data.trustBanner || { heading: '', tagline: '' }), items: newItems } });
                          }}
                          rows={2}
                        />
                        <RichTextEditor
                          label="Card Description"
                          value={card.description}
                          onChange={(val) => {
                            const newItems = [...(data.trustBanner?.items || [])];
                            newItems[idx] = { ...newItems[idx], description: val };
                            setData({ ...data, trustBanner: { ...(data.trustBanner || { heading: '', tagline: '' }), items: newItems } });
                          }}
                          rows={3}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                SCREEN 5: RESEARCH & APPROACH
               ========================================================================= */}
            {activeTab === 'screen5' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      Screen 5 / 7
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">R&D Banner & Scientific Approach</h2>
                    <p className="text-xs text-slate-400">Controls `#comp-mlqlr0fm` and `#comp-mlqlfcyi` (Innovation, Process, Standards).</p>
                  </div>
                  <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30">
                    Save Changes
                  </button>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">R&D Lab Banner</h3>
                  <RichTextEditor
                    label="R&D Title"
                    value={data.research.title || 'Obagi Research & Development'}
                    onChange={(val) => setData({ ...data, research: { ...data.research, title: val } })}
                    rows={2}
                  />

                  <RichTextEditor
                    label="R&D Mission Statement"
                    value={data.research.description || ''}
                    onChange={(val) => setData({ ...data, research: { ...data.research, description: val } })}
                    rows={3}
                  />

                  <MediaInput
                    label="Research Lab Banner Background (WebP / JPG)"
                    value={data.research.backgroundImage || ''}
                    onChange={(url) => setData({ ...data, research: { ...data.research, backgroundImage: url } })}
                    mediaType="image"
                    activeProvider={activeProvider}
                  />
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Our 3 Innovation Cards (Approach, Process, Standards)</h3>
                  <div className="space-y-4">
                    {(data.approach?.tabs || []).map((tab, idx) => (
                      <div key={tab.key || idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase">Card 0{idx + 1}: {tab.key}</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <RichTextEditor
                            label="Card Title"
                            value={tab.title}
                            onChange={(val) => {
                              const newTabs = [...(data.approach?.tabs || [])];
                              newTabs[idx] = { ...newTabs[idx], title: val };
                              setData({ ...data, approach: { ...(data.approach || { tabs: [] }), tabs: newTabs } });
                            }}
                            rows={2}
                          />
                          <MediaInput
                            label="Card Image"
                            value={tab.image}
                            onChange={(url) => {
                              const newTabs = [...(data.approach?.tabs || [])];
                              newTabs[idx] = { ...newTabs[idx], image: url };
                              setData({ ...data, approach: { ...(data.approach || { tabs: [] }), tabs: newTabs } });
                            }}
                            mediaType="image"
                            activeProvider={activeProvider}
                          />
                        </div>
                        <RichTextEditor
                          label="Card Description"
                          value={tab.desc}
                          onChange={(val) => {
                            const newTabs = [...(data.approach?.tabs || [])];
                            newTabs[idx] = { ...newTabs[idx], desc: val };
                            setData({ ...data, approach: { ...(data.approach || { tabs: [] }), tabs: newTabs } });
                          }}
                          rows={3}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                SCREEN 6: 3D CARDS SYSTEM & UNDER-CARD VIDEO
               ========================================================================= */}
            {activeTab === 'screen6' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      Screen 6 / 7
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">3D Cards Stack & Under-Card Video</h2>
                    <p className="text-xs text-slate-400">Controls `#comp-lwrl9iel`, 3D card deck, expanding pink serum circle, and `#comp-mlau06ju` video.</p>
                  </div>
                  <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30">
                    Save Changes
                  </button>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Sticky Pink Serum Circle</h3>
                  <MediaInput
                    label="Expanding Pink Serum Background"
                    value={data.cardsSection.pinkSerumImage || ''}
                    onChange={(url) => setData({ ...data, cardsSection: { ...data.cardsSection, pinkSerumImage: url } })}
                    mediaType="image"
                    activeProvider={activeProvider}
                  />
                </div>

                {/* Video Underneath 3D Cards */}
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-indigo-400" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                      Video Underneath 3D Cards (`#comp-mlau06ju`)
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    The looping award showcase video embedded directly below the 3D card stack.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MediaInput
                      label="Award Video Stream (MP4)"
                      value={data.cardsSection.awardVideoUrl || ''}
                      onChange={(url) => setData({ ...data, cardsSection: { ...data.cardsSection, awardVideoUrl: url } })}
                      mediaType="video"
                      activeProvider={activeProvider}
                      placeholder="https://video.wixstatic.com/.../file.mp4"
                    />

                    <MediaInput
                      label="Award Video Poster"
                      value={data.cardsSection.awardVideoPoster || ''}
                      onChange={(url) => setData({ ...data, cardsSection: { ...data.cardsSection, awardVideoPoster: url } })}
                      mediaType="image"
                      activeProvider={activeProvider}
                      placeholder="https://static.wixstatic.com/.../poster.jpg"
                    />
                  </div>
                </div>

                {/* 3D Cards List */}
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                      3D Card Stack Items ({data.cardsSection.cards.length})
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        const newCard: CardItem = {
                          id: `card-${Date.now()}`,
                          number: `${data.cardsSection.cards.length + 1}`,
                          title: 'New Clinical System',
                          subtitle: 'Transformative Cellular Solution',
                          description: 'Complete medical-grade skincare formulation designed for clinical results.',
                          imageUrl: 'https://static.wixstatic.com/media/4833d7_b81f1121c3eb4ed6807efe18902fb0a1~mv2.jpg/v1/fill/w_446,h_446,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/obagi-nu-derm-fx-collection-1600x1600.jpg',
                          order: data.cardsSection.cards.length + 1,
                          visible: true,
                        };
                        setData({
                          ...data,
                          cardsSection: {
                            ...data.cardsSection,
                            cards: [...data.cardsSection.cards, newCard],
                          },
                        });
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Card</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {data.cardsSection.cards.map((card, idx) => (
                      <div key={card.id || idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-indigo-400 uppercase">Card #{card.number || idx + 1}</span>
                          {data.cardsSection.cards.length > 3 && (
                            <button
                              type="button"
                              onClick={() => {
                                const newCards = data.cardsSection.cards.filter((_, i) => i !== idx);
                                setData({ ...data, cardsSection: { ...data.cardsSection, cards: newCards } });
                              }}
                              className="text-rose-400 hover:text-rose-300 p-1"
                              title="Delete Card"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <RichTextEditor
                            label="Card Title"
                            value={card.title}
                            onChange={(val) => {
                              const newCards = [...data.cardsSection.cards];
                              newCards[idx].title = val;
                              setData({ ...data, cardsSection: { ...data.cardsSection, cards: newCards } });
                            }}
                            rows={2}
                          />
                          <RichTextEditor
                            label="Card Subtitle"
                            value={card.subtitle}
                            onChange={(val) => {
                              const newCards = [...data.cardsSection.cards];
                              newCards[idx].subtitle = val;
                              setData({ ...data, cardsSection: { ...data.cardsSection, cards: newCards } });
                            }}
                            rows={2}
                          />
                        </div>

                        <RichTextEditor
                          label="Card Clinical Description"
                          value={card.description}
                          onChange={(val) => {
                            const newCards = [...data.cardsSection.cards];
                            newCards[idx].description = val;
                            setData({ ...data, cardsSection: { ...data.cardsSection, cards: newCards } });
                          }}
                          rows={3}
                        />

                        <MediaInput
                          label="Card Product Image"
                          value={card.imageUrl}
                          onChange={(url) => {
                            const newCards = [...data.cardsSection.cards];
                            newCards[idx].imageUrl = url;
                            setData({ ...data, cardsSection: { ...data.cardsSection, cards: newCards } });
                          }}
                          mediaType="image"
                          activeProvider={activeProvider}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                SCREEN 7: QUOTE, NEWSLETTER & FOOTER
               ========================================================================= */}
            {activeTab === 'screen7' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      Screen 7 / 7
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">Quote, Newsletter & Footer</h2>
                    <p className="text-xs text-slate-400">Controls `#comp-lwryj83c` (Quote), `#comp-lx8nvywg` (Newsletter), and `#comp-ml6nay6u` (Footer).</p>
                  </div>
                  <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30">
                    Save Changes
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Quote Form */}
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Doctor / CEO Testimonial Quote</h3>

                    <RichTextEditor
                      label="Quote Text"
                      value={data.quote?.quoteText || ''}
                      onChange={(val) => setData({ ...data, quote: { ...(data.quote || { quoteText: '', quoteAuthor: '' }), quoteText: val } })}
                      rows={3}
                    />

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Author Name</label>
                      <input
                        type="text"
                        value={data.quote?.quoteAuthor || ''}
                        onChange={(e) => setData({ ...data, quote: { ...(data.quote || { quoteText: '', quoteAuthor: '' }), quoteAuthor: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Author Title / Role</label>
                      <input
                        type="text"
                        value={data.quote?.quoteRole || ''}
                        onChange={(e) => setData({ ...data, quote: { ...(data.quote || { quoteText: '', quoteAuthor: '' }), quoteRole: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Newsletter Form */}
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Newsletter Subscription Form</h3>

                    <RichTextEditor
                      label="Newsletter Headline"
                      value={data.newsletter.newsletterTitle || ''}
                      onChange={(val) => setData({ ...data, newsletter: { ...data.newsletter, newsletterTitle: val } })}
                      rows={2}
                    />

                    <RichTextEditor
                      label="Newsletter Description"
                      value={data.newsletter.newsletterDesc || ''}
                      onChange={(val) => setData({ ...data, newsletter: { ...data.newsletter, newsletterDesc: val } })}
                      rows={3}
                    />
                  </div>
                </div>

                {/* Footer Settings */}
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Footer Legal & Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Company / Entity</label>
                      <input
                        type="text"
                        value={data.footer.companyName}
                        onChange={(e) => setData({ ...data, footer: { ...data.footer, companyName: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Support Email</label>
                      <input
                        type="email"
                        value={data.footer.email}
                        onChange={(e) => setData({ ...data, footer: { ...data.footer, email: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <RichTextEditor
                    label="Footer Copyright Line"
                    value={data.footer.copyright}
                    onChange={(val) => setData({ ...data, footer: { ...data.footer, copyright: val } })}
                    rows={2}
                  />
                </div>
              </div>
            )}

            {/* =========================================================================
                FLOATING AI WIDGET
               ========================================================================= */}
            {activeTab === 'widget' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      Floating Widget
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">Need Help? & Chat with AI Widget</h2>
                    <p className="text-xs text-slate-400">Controls the bottom-right interactive chatbot pills and assistance launcher.</p>
                  </div>
                  <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30">
                    Save Changes
                  </button>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">Widget Status</span>
                      <span className="text-[10px] text-slate-400">Enable or hide the floating assistance bar completely</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={data.floatingWidget?.enabled ?? true}
                      onChange={(e) => setData({ ...data, floatingWidget: { ...(data.floatingWidget || { enabled: true, mainButtonText: 'Chat with AI', unreadBadgeText: 'Need Help?', prompts: [] }), enabled: e.target.checked } })}
                      className="w-4 h-4 rounded text-indigo-600 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Launcher Button Text</label>
                      <input
                        type="text"
                        value={data.floatingWidget?.mainButtonText || 'Chat with AI'}
                        onChange={(e) => setData({ ...data, floatingWidget: { ...(data.floatingWidget || { enabled: true, mainButtonText: 'Chat with AI', unreadBadgeText: 'Need Help?', prompts: [] }), mainButtonText: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Notification Bubble Text</label>
                      <input
                        type="text"
                        value={data.floatingWidget?.unreadBadgeText || 'Need Help?'}
                        onChange={(e) => setData({ ...data, floatingWidget: { ...(data.floatingWidget || { enabled: true, mainButtonText: 'Chat with AI', unreadBadgeText: 'Need Help?', prompts: [] }), unreadBadgeText: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">3 Quick Question Pills</span>
                    {(data.floatingWidget?.prompts || ['Want to know about Obagi Nu-Derm Fx™ Systems?', 'Explore Obagi', 'Address the Signs of Aging Skin']).map((prompt, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500 w-6">0{idx + 1}</span>
                        <input
                          type="text"
                          value={prompt}
                          onChange={(e) => {
                            const newPrompts = [...(data.floatingWidget?.prompts || [])];
                            newPrompts[idx] = e.target.value;
                            setData({ ...data, floatingWidget: { ...(data.floatingWidget || { enabled: true, mainButtonText: 'Chat with AI', unreadBadgeText: 'Need Help?', prompts: [] }), prompts: newPrompts } });
                          }}
                          className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                NEWSLETTER SUBSCRIBERS
               ========================================================================= */}
            {activeTab === 'subscribers' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      CRM & Leads
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">Newsletter Subscribers ({data.newsletter.subscribers.length})</h2>
                    <p className="text-xs text-slate-400">Captured emails from the live newsletter subscription form.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleExportSubscribers('csv')}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition-all shadow-md shadow-emerald-600/20"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export CSV</span>
                    </button>
                    <button
                      onClick={() => handleExportSubscribers('json')}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-all"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>Export JSON</span>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        <tr>
                          <th className="py-3 px-4">#</th>
                          <th className="py-3 px-4">Subscriber Email</th>
                          <th className="py-3 px-4">Subscribed Date</th>
                          <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {(data.newsletter.subscribers || []).map((sub, idx) => (
                          <tr key={sub.id || idx} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-3 px-4 text-slate-500">{idx + 1}</td>
                            <td className="py-3 px-4 text-white font-semibold">{sub.email}</td>
                            <td className="py-3 px-4 text-slate-400">{sub.date}</td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => handleDeleteSubscriber(sub.id)}
                                className="p-1 rounded hover:bg-rose-500/20 text-rose-400 transition-colors"
                                title="Remove Email"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                MULTI-SOURCE MEDIA & STORAGE PROVIDERS
               ========================================================================= */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      Cloud & Storage
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">Multi-Source Media Providers</h2>
                    <p className="text-xs text-slate-400">Configure Local, Cloudflare R2, AWS S3, Cloudinary, or Google Drive sources.</p>
                  </div>
                  <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30">
                    Save Changes
                  </button>
                </div>

                {/* Active Provider Selector */}
                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Active Media Source Selector</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'local', name: 'Local Server', icon: Database, desc: '/public/uploads' },
                      { id: 'cloudflare-r2', name: 'Cloudflare R2', icon: Cloud, desc: 'Zero egress cost S3' },
                      { id: 'aws-s3', name: 'Amazon S3', icon: Cloud, desc: 'AWS S3 Bucket' },
                      { id: 'cloudinary', name: 'Cloudinary', icon: Sparkles, desc: 'Auto CDN & WebP' },
                      { id: 'google-drive', name: 'Google Drive', icon: Globe, desc: 'Drive Direct Links' },
                      { id: 'public-url', name: 'Public CDN URL', icon: ExternalLink, desc: 'Direct URL Passthrough' },
                    ].map((prov) => {
                      const isSelected = activeProvider === prov.id;
                      const Icon = prov.icon;
                      return (
                        <button
                          key={prov.id}
                          type="button"
                          onClick={() => setData({ ...data, storage: { ...data.storage, activeSource: prov.id as StorageProvider, provider: prov.id as StorageProvider } })}
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-500/10'
                              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                            <div className={`w-2.5 h-2.5 rounded-full ${isSelected ? 'bg-indigo-500' : 'bg-slate-700'}`} />
                          </div>
                          <span className="text-xs font-bold block text-white">{prov.name}</span>
                          <span className="text-[10px] text-slate-500">{prov.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Provider Credentials Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Cloudflare R2 */}
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <span className="text-xs font-bold uppercase text-orange-400 block">Cloudflare R2 Configuration</span>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-0.5">Account ID</label>
                      <input
                        type="text"
                        value={data.storage.accountId || ''}
                        onChange={(e) => setData({ ...data, storage: { ...data.storage, accountId: e.target.value } })}
                        placeholder="Cloudflare account ID"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-0.5">Bucket Name</label>
                      <input
                        type="text"
                        value={data.storage.bucketName || ''}
                        onChange={(e) => setData({ ...data, storage: { ...data.storage, bucketName: e.target.value } })}
                        placeholder="obagi-media-bucket"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-0.5">Custom Public Domain / URL</label>
                      <input
                        type="text"
                        value={data.storage.publicUrl || ''}
                        onChange={(e) => setData({ ...data, storage: { ...data.storage, publicUrl: e.target.value } })}
                        placeholder="https://media.obagiindia.com"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  {/* Cloudinary */}
                  <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <span className="text-xs font-bold uppercase text-sky-400 block">Cloudinary Configuration</span>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-0.5">Cloud Name</label>
                      <input
                        type="text"
                        value={data.storage.cloudName || ''}
                        onChange={(e) => setData({ ...data, storage: { ...data.storage, cloudName: e.target.value } })}
                        placeholder="Cloudinary cloud name"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-0.5">Upload Preset</label>
                      <input
                        type="text"
                        value={data.storage.uploadPreset || ''}
                        onChange={(e) => setData({ ...data, storage: { ...data.storage, uploadPreset: e.target.value } })}
                        placeholder="obagi_unsigned_preset"
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-400 block mb-0.5">API Key (Optional)</label>
                      <input
                        type="password"
                        value={data.storage.apiKey || ''}
                        onChange={(e) => setData({ ...data, storage: { ...data.storage, apiKey: e.target.value } })}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                ADMIN SECURITY & 2-FACTOR AUTH
               ========================================================================= */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      Security & Access
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">Admin Security & 2FA Gate</h2>
                    <p className="text-xs text-slate-400">Configure dashboard PIN protection and 2-Factor authentication.</p>
                  </div>
                  <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-600/30">
                    Save Changes
                  </button>
                </div>

                <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-bold text-white block">2-Factor Authentication (2FA)</span>
                      <span className="text-[10px] text-slate-400">Require PIN verification before opening the admin studio</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={data.security?.twoFactorEnabled ?? false}
                      onChange={(e) => setData({ ...data, security: { ...(data.security || { pinCode: '1234', twoFactorEnabled: false, sessionDurationHours: 24 }), twoFactorEnabled: e.target.checked } })}
                      className="w-4 h-4 rounded text-indigo-600 cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Admin Security PIN</label>
                      <input
                        type="password"
                        maxLength={6}
                        value={data.security?.pinCode || '1234'}
                        onChange={(e) => setData({ ...data, security: { ...(data.security || { pinCode: '1234', twoFactorEnabled: false, sessionDurationHours: 24 }), pinCode: e.target.value } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white font-mono tracking-widest"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">Session Duration (Hours)</label>
                      <input
                        type="number"
                        value={data.security?.sessionDurationHours || 24}
                        onChange={(e) => setData({ ...data, security: { ...(data.security || { pinCode: '1234', twoFactorEnabled: false, sessionDurationHours: 24 }), sessionDurationHours: Number(e.target.value) } })}
                        className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                ACTIVITY AUDIT LOGS
               ========================================================================= */}
            {activeTab === 'logs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      Audit Trail
                    </span>
                    <h2 className="text-xl font-bold text-white mt-1">Activity Audit Trail</h2>
                    <p className="text-xs text-slate-400">Complete record of who modified what section and when.</p>
                  </div>
                </div>

                <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-950 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        <tr>
                          <th className="py-3 px-4">Timestamp</th>
                          <th className="py-3 px-4">User</th>
                          <th className="py-3 px-4">Action</th>
                          <th className="py-3 px-4">Section</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                        {(data.activityLogs || []).map((log) => (
                          <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                            <td className="py-3 px-4 text-slate-400">{log.timestamp}</td>
                            <td className="py-3 px-4 text-indigo-300 font-semibold">{log.user}</td>
                            <td className="py-3 px-4 text-white">{log.action}</td>
                            <td className="py-3 px-4 text-slate-400">{log.section}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
