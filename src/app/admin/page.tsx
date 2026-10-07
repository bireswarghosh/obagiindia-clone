'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Package,
  FileText,
  BookOpen,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Save,
  Download,
  Upload,
  RefreshCw,
  Search,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  Sliders,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  Database,
  Printer,
  Copy,
  LayoutDashboard,
  Pipette,
  Check,
  Target,
  Phone,
  Stethoscope,
  Globe,
  Lock,
  Unlock,
  Key,
  LogOut,
  Award
} from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';
import MediaInput from '@/components/admin/MediaInput';
import RyanAboutCms from '@/components/admin/RyanAboutCms';
import RyanSeoCms, { defaultMultiPageSeo, MultiPageSeo } from '@/components/admin/RyanSeoCms';
import MinoxidilEducationalCard from '@/components/ryan/MinoxidilEducationalCard';
import { RYAN_PRODUCTS, RyanProduct, THERAPEUTIC_AREAS, ROUTES, DOSAGE_FORMS } from '@/data/ryan-products';
import {
  CLINICAL_INSIGHTS_DATA,
  ClinicalInsight,
  THERAPEUTIC_GUIDES_DATA,
  TherapeuticGuide,
  PRESCRIBING_INFO_PRODUCTS,
  PrescribingInfoProduct,
  REFERENCE_LIBRARY_CATEGORIES
} from '@/data/ryan-data';
import { defaultRyanHomeContent, RyanHomeContent, RyanPillar } from '@/data/ryan-home-content';
import { defaultRyanAboutContent, RyanAboutContent } from '@/data/ryan-about-content';
import {
  DEFAULT_DOCTORS_PAGE_CONTENT,
  RyanDoctorsPageContent
} from '@/data/ryan-doctors-data';

type AdminTab =
  | 'dashboard'
  | 'home-cms'
  | 'about-cms'
  | 'doctors-cms'
  | 'products'
  | 'insights'
  | 'guides'
  | 'prescribing'
  | 'library'
  | 'media'
  | 'seo'
  | 'backup';

export default function RyanAdminPortal() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Security PIN Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Home Page Dynamic CMS State
  const [homeCmsData, setHomeCmsData] = useState<RyanHomeContent>(defaultRyanHomeContent);
  const [homeCmsSubTab, setHomeCmsSubTab] = useState<'hero' | 'story' | 'pillars' | 'quality' | 'contact'>('hero');
  const [selectedPillarId, setSelectedPillarId] = useState<string>('dermatology-focus');

  // About Page Dynamic CMS State
  const [aboutCmsData, setAboutCmsData] = useState<RyanAboutContent>(defaultRyanAboutContent);

  // Global SEO & Social Graph State
  const [seoData, setSeoData] = useState<MultiPageSeo>(defaultMultiPageSeo);

  // For Doctors Page Dynamic CMS State
  const [doctorsCmsData, setDoctorsCmsData] = useState<RyanDoctorsPageContent>(DEFAULT_DOCTORS_PAGE_CONTENT);
  const [doctorsCmsSubTab, setDoctorsCmsSubTab] = useState<'hero' | 'quick-access' | 'therapeutic' | 'science' | 'resources' | 'partner'>('hero');

  // Editable Datasets (initialized from defaults or localStorage)
  const [productsList, setProductsList] = useState<RyanProduct[]>(RYAN_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<RyanProduct | null>(RYAN_PRODUCTS[0] || null);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');

  const [insightsMap, setInsightsMap] = useState<Record<string, ClinicalInsight>>(CLINICAL_INSIGHTS_DATA);
  const [selectedInsightSlug, setSelectedInsightSlug] = useState<string>('understanding-acne');

  const [guidesMap, setGuidesMap] = useState<Record<string, TherapeuticGuide>>(THERAPEUTIC_GUIDES_DATA);
  const [selectedGuideSlug, setSelectedGuideSlug] = useState<string>('hair-and-scalp-disorders');

  const [prescribingList, setPrescribingList] = useState<PrescribingInfoProduct[]>(PRESCRIBING_INFO_PRODUCTS);
  const [selectedPi, setSelectedPi] = useState<PrescribingInfoProduct | null>(PRESCRIBING_INFO_PRODUCTS[0] || null);

  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('ryan_admin_products_v2') || localStorage.getItem('ryan_admin_products');
      if (savedProducts) {
        try {
          const parsed = JSON.parse(savedProducts);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const sanitized = parsed.map((p: any) => ({
              ...p,
              brandName: p.brandName ? p.brandName.replace(/®/g, '').replace(/\s+/g, ' ').trim() : '',
              genericName: p.genericName ? p.genericName.replace(/®/g, '').replace(/\s+/g, ' ').trim() : '',
              relatedProducts: Array.isArray(p.relatedProducts) ? p.relatedProducts.map((rp: any) => ({
                ...rp,
                name: rp.name ? rp.name.replace(/®/g, '').replace(/\s+/g, ' ').trim() : ''
              })) : []
            }));
            setProductsList(sanitized);
            setSelectedProduct(sanitized[0] || null);
            localStorage.setItem('ryan_admin_products_v2', JSON.stringify(sanitized));
            localStorage.setItem('ryan_admin_products', JSON.stringify(sanitized));
          }
        } catch (e) {
          setProductsList(RYAN_PRODUCTS);
          setSelectedProduct(RYAN_PRODUCTS[0] || null);
        }
      } else {
        setProductsList(RYAN_PRODUCTS);
        setSelectedProduct(RYAN_PRODUCTS[0] || null);
      }

      const savedInsights = localStorage.getItem('ryan_admin_insights');
      if (savedInsights) setInsightsMap(JSON.parse(savedInsights));

      const savedGuides = localStorage.getItem('ryan_admin_guides');
      if (savedGuides) setGuidesMap(JSON.parse(savedGuides));

      const savedPi = localStorage.getItem('ryan_admin_prescribing');
      if (savedPi) setPrescribingList(JSON.parse(savedPi));

      const savedHome = localStorage.getItem('ryan_home_content');
      if (savedHome) {
        try {
          setHomeCmsData(JSON.parse(savedHome));
        } catch (e) {}
      }

      const savedDoctors = localStorage.getItem('ryan_admin_doctors_page');
      if (savedDoctors) {
        try {
          setDoctorsCmsData(JSON.parse(savedDoctors));
        } catch (e) {}
      }

      const savedAbout = localStorage.getItem('ryan_about_content');
      if (savedAbout) {
        try {
          setAboutCmsData(JSON.parse(savedAbout));
        } catch (e) {}
      }

      const savedSeo = localStorage.getItem('ryan_seo_settings');
      if (savedSeo) {
        try {
          setSeoData(JSON.parse(savedSeo));
        } catch (e) {}
      }

      // Check session authentication
      const isAuth = sessionStorage.getItem('ryan_admin_authenticated');
      if (isAuth === 'true') {
        setIsAuthenticated(true);
      }

      // Fetch latest site data from server
      fetch('/api/content')
        .then(res => res.json())
        .then(data => {
          if (data && data.ryanHome) {
            setHomeCmsData(data.ryanHome);
            localStorage.setItem('ryan_home_content', JSON.stringify(data.ryanHome));
          }
          if (data && data.ryanAbout) {
            setAboutCmsData(data.ryanAbout);
            localStorage.setItem('ryan_about_content', JSON.stringify(data.ryanAbout));
          }
          if (data && data.ryanDoctors) {
            setDoctorsCmsData(data.ryanDoctors);
            localStorage.setItem('ryan_admin_doctors_page', JSON.stringify(data.ryanDoctors));
          }
          if (data && data.seo) {
            setSeoData(prev => ({
              ...prev,
              ...(typeof data.seo === 'object' ? data.seo : {})
            }));
          }
        })
        .catch(() => {});
    } catch (e) {
      console.error('Error loading stored admin data:', e);
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSaveHomeCms = async () => {
    try {
      localStorage.setItem('ryan_home_content', JSON.stringify(homeCmsData));
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ryanHome: homeCmsData })
      });
      if (res.ok) {
        showToast('Home Page CMS successfully published to live site!');
      } else {
        showToast('Saved to browser storage successfully!');
      }
    } catch (e) {
      showToast('Saved to browser storage successfully!');
    }
  };

  const handleSaveAboutCms = async () => {
    try {
      localStorage.setItem('ryan_about_content', JSON.stringify(aboutCmsData));
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ryanAbout: aboutCmsData })
      });
      if (res.ok) {
        showToast('About Ryan Page CMS successfully published to live site!');
      } else {
        showToast('Saved to browser storage successfully!');
      }
    } catch (e) {
      showToast('Saved to browser storage successfully!');
    }
  };

  const handleSaveSeo = async () => {
    try {
      localStorage.setItem('ryan_seo_settings', JSON.stringify(seoData));
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seo: seoData })
      });
      if (res.ok) {
        showToast('SEO Settings successfully published to live site!');
      } else {
        showToast('Saved to browser storage successfully!');
      }
    } catch (e) {
      showToast('Saved to browser storage successfully!');
    }
  };

  const handleSaveDoctorsCms = async () => {
    try {
      localStorage.setItem('ryan_admin_doctors_page', JSON.stringify(doctorsCmsData));
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ryanDoctors: doctorsCmsData })
      });
      if (res.ok) {
        showToast('For Doctors Portal CMS successfully published to live site!');
      } else {
        showToast('Saved to browser storage successfully!');
      }
    } catch (e) {
      showToast('Saved to browser storage successfully!');
    }
  };

  const handleSaveAll = () => {
    try {
      localStorage.setItem('ryan_home_content', JSON.stringify(homeCmsData));
      localStorage.setItem('ryan_about_content', JSON.stringify(aboutCmsData));
      localStorage.setItem('ryan_admin_doctors_page', JSON.stringify(doctorsCmsData));
      localStorage.setItem('ryan_seo_settings', JSON.stringify(seoData));
      fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ryanHome: homeCmsData, 
          ryanAbout: aboutCmsData, 
          ryanDoctors: doctorsCmsData,
          seo: seoData
        })
      }).catch(() => {});
      localStorage.setItem('ryan_admin_products_v2', JSON.stringify(productsList));
      localStorage.setItem('ryan_admin_products', JSON.stringify(productsList));
      localStorage.setItem('ryan_admin_insights', JSON.stringify(insightsMap));
      localStorage.setItem('ryan_admin_guides', JSON.stringify(guidesMap));
      localStorage.setItem('ryan_admin_prescribing', JSON.stringify(prescribingList));
      showToast('All modifications saved successfully to system storage!');
    } catch (err: any) {
      showToast(err.message || 'Failed to save', 'error');
    }
  };

  const handleExportJson = () => {
    const payload = {
      exportDate: new Date().toISOString(),
      home: homeCmsData,
      doctorsPage: doctorsCmsData,
      products: productsList,
      insights: insightsMap,
      guides: guidesMap,
      prescribing: prescribingList,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ryan-dermaceutics-content-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('JSON backup exported successfully!');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.home) setHomeCmsData(parsed.home);
        if (parsed.doctorsPage) setDoctorsCmsData(parsed.doctorsPage);
        if (parsed.products) setProductsList(parsed.products);
        if (parsed.insights) setInsightsMap(parsed.insights);
        if (parsed.guides) setGuidesMap(parsed.guides);
        if (parsed.prescribing) setPrescribingList(parsed.prescribing);
        showToast('JSON backup restored successfully!');
      } catch (err: any) {
        showToast('Invalid JSON file format', 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to reset all content to system defaults? Any unsaved local edits will be replaced.')) {
      setHomeCmsData(defaultRyanHomeContent);
      setDoctorsCmsData(DEFAULT_DOCTORS_PAGE_CONTENT);
      setProductsList(RYAN_PRODUCTS);
      setInsightsMap(CLINICAL_INSIGHTS_DATA);
      setGuidesMap(THERAPEUTIC_GUIDES_DATA);
      setPrescribingList(PRESCRIBING_INFO_PRODUCTS);
      localStorage.removeItem('ryan_home_content');
      localStorage.removeItem('ryan_admin_doctors_page');
      localStorage.removeItem('ryan_admin_products');
      localStorage.removeItem('ryan_admin_products_v2');
      localStorage.removeItem('ryan_admin_insights');
      localStorage.removeItem('ryan_admin_guides');
      localStorage.removeItem('ryan_admin_prescribing');
      showToast('Reset to original system defaults.');
    }
  };

  // Product Updates
  const updateCurrentProduct = (field: keyof RyanProduct, value: any) => {
    if (!selectedProduct) return;
    const updated = { ...selectedProduct, [field]: value };
    setSelectedProduct(updated);
    setProductsList(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  // Insight Updates
  const updateCurrentInsight = (field: keyof ClinicalInsight, value: any) => {
    const current = insightsMap[selectedInsightSlug];
    if (!current) return;
    const updated = { ...current, [field]: value };
    setInsightsMap(prev => ({ ...prev, [selectedInsightSlug]: updated }));
  };

  // Filtered Products
  const filteredProducts = productsList.filter(p => {
    const matchesSearch = p.brandName.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.genericName.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.therapeuticArea.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat = productCategoryFilter === 'All' || p.therapeuticArea === productCategoryFilter;
    return matchesSearch && matchesCat;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#071326] text-white flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-[#0e1d38] rounded-3xl border border-teal-900/60 p-8 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-[#00768a]" />
          
          <div className="mx-auto w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300 shadow-lg">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <div className="text-[10px] font-black uppercase tracking-widest text-teal-300">
              Secured Clinical Control Center
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tight">
              Ryan Dermaceutics Admin
            </h1>
            <p className="text-xs text-slate-400">
              Enter your 4-digit security PIN to access the CMS &amp; portal settings.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (pinInput === '1234') {
                setIsAuthenticated(true);
                sessionStorage.setItem('ryan_admin_authenticated', 'true');
                setPinError(false);
              } else {
                setPinError(true);
              }
            }}
            className="space-y-4"
          >
            <div className="relative">
              <input
                type="password"
                maxLength={8}
                value={pinInput}
                autoFocus
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="••••"
                className={`w-full py-3.5 px-4 text-center tracking-[1em] font-mono text-2xl rounded-2xl bg-slate-900 border text-white focus:outline-none transition ${
                  pinError ? 'border-rose-500 ring-2 ring-rose-500/30' : 'border-slate-700 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20'
                }`}
              />
              {pinError && (
                <div className="text-rose-400 text-xs font-bold mt-2">
                  Incorrect PIN. Please try again.
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-[#00768a] hover:from-teal-500 hover:to-[#006070] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-teal-950 transition cursor-pointer"
            >
              Verify &amp; Enter Portal
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Default PIN: <strong className="text-teal-300 font-mono">1234</strong></span>
            <button
              type="button"
              onClick={() => {
                setPinInput('1234');
                setIsAuthenticated(true);
                sessionStorage.setItem('ryan_admin_authenticated', 'true');
              }}
              className="text-teal-300 hover:underline cursor-pointer font-semibold"
            >
              Quick Unlock
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex font-sans selection:bg-teal-500 selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-bold border transition-all animate-bounce ${
          toast.type === 'success' ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-rose-600 text-white border-rose-400'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* SIDEBAR NAVIGATION                                       */}
      {/* ========================================================= */}
      <aside className={`bg-[#003d4d] border-r border-[#005466] flex flex-col justify-between transition-all duration-300 z-40 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}>
        <div>
          {/* Logo & Header */}
          <div className="p-4 border-b border-[#005466] flex items-center justify-between">
            <div className={`flex items-center gap-2.5 overflow-hidden ${!sidebarOpen && 'justify-center w-full'}`}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-[#00768a] text-white flex items-center justify-center font-extrabold text-base shadow-md shrink-0">
                R
              </div>
              {sidebarOpen && (
                <div>
                  <div className="font-extrabold text-sm tracking-tight text-white leading-none">RYAN DERMA</div>
                  <div className="text-[10px] text-teal-300 font-bold uppercase tracking-widest mt-0.5">Admin Portal</div>
                </div>
              )}
            </div>
            {sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-teal-200 transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5">
            {[
              { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
              { id: 'home-cms', label: 'Home Page CMS', icon: Sparkles },
              { id: 'about-cms', label: 'About Ryan CMS', icon: Award },
              { id: 'doctors-cms', label: 'For Doctors CMS', icon: Stethoscope },
              { id: 'products', label: 'Products & Monographs', icon: Package, badge: productsList.length },
              { id: 'insights', label: 'Clinical Insights', icon: FileText, badge: Object.keys(insightsMap).length },
              { id: 'guides', label: 'Therapeutic Guides', icon: BookOpen, badge: Object.keys(guidesMap).length },
              { id: 'prescribing', label: 'Prescribing Info (PI)', icon: ShieldCheck, badge: prescribingList.length },
              { id: 'library', label: 'Reference Library', icon: Layers },
              { id: 'media', label: 'Media & Assets', icon: ImageIcon },
              { id: 'seo', label: 'SEO & Meta Tags', icon: Globe },
              { id: 'backup', label: 'Backup & Settings', icon: Database }
            ].map((tab) => {

              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as AdminTab);
                    if (!sidebarOpen) setSidebarOpen(true);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#00768a] text-white shadow-md shadow-teal-900/50'
                      : 'text-teal-100/70 hover:bg-white/5 hover:text-white'
                  }`}
                  title={tab.label}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-teal-300'}`} />
                  {sidebarOpen && (
                    <div className="flex-1 flex items-center justify-between text-left">
                      <span>{tab.label}</span>
                      {tab.badge !== undefined && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          isActive ? 'bg-white/20 text-white' : 'bg-[#002833] text-teal-300'
                        }`}>
                          {tab.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#005466] space-y-2">
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-full p-2 rounded-lg bg-white/5 hover:bg-white/10 text-teal-200 flex items-center justify-center transition"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}

          {sidebarOpen && (
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-[#002833] border border-teal-800/40 text-[11px] text-teal-200">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync Active
                </div>
                <div className="text-[10px] text-teal-400/80 mt-0.5">Vercel Production Connected</div>
              </div>

              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-100 text-xs font-bold transition border border-teal-500/30"
              >
                <span>View Ryan Live (/)</span>
                <ExternalLink className="w-3.5 h-3.5 text-teal-300" />
              </a>

              <a
                href="/about"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-800/30 hover:bg-teal-800/50 text-teal-200 text-[11px] font-bold transition border border-teal-500/30"
              >
                <span>View About Ryan (/about)</span>
                <ExternalLink className="w-3 h-3 text-teal-300" />
              </a>

              <button
                type="button"
                onClick={() => {
                  sessionStorage.removeItem('ryan_admin_authenticated');
                  setIsAuthenticated(false);
                  setPinInput('');
                }}
                className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 text-[11px] font-bold transition border border-slate-700 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Lock Portal</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ========================================================= */}
      {/* MAIN ADMIN WORKSPACE                                      */}
      {/* ========================================================= */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#0b1329]">
        {/* Top Control Bar */}
        <header className="h-16 bg-[#0f1b35] border-b border-slate-800 px-6 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <h1 className="text-base sm:text-lg font-extrabold text-white capitalize flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400" />
              {activeTab === 'dashboard' && 'Executive Management Dashboard'}
              {activeTab === 'home-cms' && 'Ryan Dermaceutics Home Page CMS'}
              {activeTab === 'about-cms' && 'About Ryan Dermaceutics CMS'}
              {activeTab === 'doctors-cms' && 'Ryan Dermaceutics For Doctors Portal CMS'}
              {activeTab === 'products' && 'Product Monographs Directory'}
              {activeTab === 'insights' && 'Clinical Insights Articles'}
              {activeTab === 'guides' && 'Therapeutic Guides & Protocols'}
              {activeTab === 'prescribing' && 'Official Prescribing Information (PI)'}
              {activeTab === 'library' && 'Reference Library Knowledgebase'}
              {activeTab === 'media' && 'Media & Asset Center'}
              {activeTab === 'seo' && 'Global SEO & OpenGraph Meta Tags'}
              {activeTab === 'backup' && 'System Backup & Export'}
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={
                activeTab === 'home-cms' ? handleSaveHomeCms :
                activeTab === 'about-cms' ? handleSaveAboutCms :
                activeTab === 'doctors-cms' ? handleSaveDoctorsCms :
                activeTab === 'seo' ? handleSaveSeo :
                handleSaveAll
              }
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-teal-950 transition cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>
                {activeTab === 'home-cms' ? 'Publish Home CMS' :
                 activeTab === 'about-cms' ? 'Publish About CMS' :
                 activeTab === 'doctors-cms' ? 'Publish Doctors CMS' :
                 activeTab === 'seo' ? 'Save SEO Settings' :
                 'Save Changes'}
              </span>
            </button>


            <button
              onClick={handleExportJson}
              title="Export Content Backup"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* ========================================================= */}
          {/* 1. DASHBOARD OVERVIEW TAB                                 */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#132247] p-5 rounded-2xl border border-teal-900/50 shadow-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">Total Monographs</span>
                    <span className="text-3xl font-extrabold text-white mt-1 block">{productsList.length}</span>
                    <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">Full SSG Rendered</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-300">
                    <Package className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-[#132247] p-5 rounded-2xl border border-teal-900/50 shadow-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">Clinical Insights</span>
                    <span className="text-3xl font-extrabold text-white mt-1 block">{Object.keys(insightsMap).length}</span>
                    <span className="text-[11px] text-teal-400 font-semibold mt-1 block">Authentic Photos &amp; Accordions</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                    <FileText className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-[#132247] p-5 rounded-2xl border border-teal-900/50 shadow-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">Therapeutic Guides</span>
                    <span className="text-3xl font-extrabold text-white mt-1 block">{Object.keys(guidesMap).length}</span>
                    <span className="text-[11px] text-emerald-400 font-semibold mt-1 block">With Minoxidil 6-Card</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-300">
                    <BookOpen className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-[#132247] p-5 rounded-2xl border border-teal-900/50 shadow-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">Prescribing Info (PI)</span>
                    <span className="text-3xl font-extrabold text-white mt-1 block">{prescribingList.length}</span>
                    <span className="text-[11px] text-teal-400 font-semibold mt-1 block">Schedule H / Rx Classified</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-300">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Quick Actions & Live Links */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-teal-400" />
                      Rapid Operations Center
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab('products')}
                      className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-slate-700/60 text-left transition group"
                    >
                      <div className="font-bold text-sm text-white group-hover:text-teal-300 transition-colors flex items-center justify-between">
                        <span>Edit Product Monographs</span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Update dosage, composition, pack sizes &amp; imagery for all 53 monographs.</p>
                    </button>

                    <button
                      onClick={() => setActiveTab('insights')}
                      className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-slate-700/60 text-left transition group"
                    >
                      <div className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                        <span>Clinical Insights Editor</span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Review the 9-section Acne article, Rosacea accordions, &amp; topical comparisons.</p>
                    </button>

                    <button
                      onClick={() => setActiveTab('guides')}
                      className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-slate-700/60 text-left transition group"
                    >
                      <div className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                        <span>Minoxidil Educational Card</span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Customize the 6 educational boxes, strengths, expectations &amp; local effects.</p>
                    </button>

                    <button
                      onClick={() => setActiveTab('prescribing')}
                      className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-slate-700/60 text-left transition group"
                    >
                      <div className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                        <span>Prescribing Information (PI)</span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Update regulatory Rx information with &lsquo;View PI&rsquo; action buttons.</p>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-white text-base mb-3">Live Clinical Navigation</h3>
                    <ul className="space-y-2 text-xs">
                      <li>
                        <a href="/home" target="_blank" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between text-teal-200 transition">
                          <span>Ryan Home Page</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </li>
                      <li>
                        <a href="/products" target="_blank" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between text-teal-200 transition">
                          <span>Product Monograph Directory</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </li>
                      <li>
                        <a href="/for-doctors/therapeutic-resources" target="_blank" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between text-teal-200 transition">
                          <span>Therapeutic Resources Hub</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </li>
                      <li>
                        <a href="/for-doctors/therapeutic-resources/insights/understanding-acne" target="_blank" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between text-teal-200 transition">
                          <span>Acne 9-Section Article</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </li>
                      <li>
                        <a href="/for-doctors/prescribing-information" target="_blank" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between text-teal-200 transition">
                          <span>Prescribing Info (PI) Page</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </li>
                      <li>
                        <a href="/for-doctors/reference-library" target="_blank" className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-between text-teal-200 transition">
                          <span>Dermatology Reference Library</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                    Ryan Dermaceutics Platform &bull; Production v2.0
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* HOME PAGE CMS TAB (Matching Content_Home.docx)             */}
          {/* ========================================================= */}
          {activeTab === 'home-cms' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Header card with Slogan Bar & Quick Action */}
              <div className="bg-[#132247] p-6 rounded-2xl border border-teal-900/50 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-black uppercase tracking-widest">
                      Live Dynamic CMS
                    </span>
                    <span className="text-xs text-slate-400">• Source: Content_Home.docx</span>
                  </div>
                  <h2 className="text-xl font-black text-white mt-2">
                    Ryan Dermaceutics Home Page Visual CMS
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage headlines, slogan tickers, story text, the 4 core pillars with interactive modal pop-ups, and pharmaceutical compliance standards.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <a
                    href="/"
                    target="_blank"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Preview Live Home</span>
                  </a>
                  <button
                    onClick={handleSaveHomeCms}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-teal-950 transition"
                  >
                    <Save className="w-4 h-4" />
                    <span>Publish Changes</span>
                  </button>
                </div>
              </div>

              {/* Sub-Tabs / Section Selectors */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
                {[
                  { id: 'hero', label: '1. Slogan & Hero Section', icon: Sparkles },
                  { id: 'story', label: '2. Our Story Section', icon: FileText },
                  { id: 'pillars', label: '3. Four Core Pillars & Modals', icon: Target },
                  { id: 'quality', label: '4. Quality & Compliance Framework', icon: ShieldCheck },
                  { id: 'contact', label: '5. Contact & Clinical Inquiries', icon: Phone }
                ].map((st) => {
                  const Icon = st.icon;
                  const isCurrent = homeCmsSubTab === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setHomeCmsSubTab(st.id as any)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
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

              {/* Sub-Tab 1: Hero & Slogan */}
              {homeCmsSubTab === 'hero' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 bg-[#132247] p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                      <Sparkles className="w-4 h-4 text-teal-400" />
                      Hero & Top Ticker Content
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Top Slogan Bar (Always Visible Across Site)
                        </label>
                        <input
                          type="text"
                          value={homeCmsData.slogan.bannerTop}
                          onChange={(e) => setHomeCmsData(prev => ({
                            ...prev,
                            slogan: { ...prev.slogan, bannerTop: e.target.value }
                          }))}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-teal-400 font-semibold"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Sub-slogan 1</label>
                          <input
                            type="text"
                            value={homeCmsData.slogan.subSlogan1}
                            onChange={(e) => setHomeCmsData(prev => ({
                              ...prev,
                              slogan: { ...prev.slogan, subSlogan1: e.target.value }
                            }))}
                            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Sub-slogan 2</label>
                          <input
                            type="text"
                            value={homeCmsData.slogan.subSlogan2}
                            onChange={(e) => setHomeCmsData(prev => ({
                              ...prev,
                              slogan: { ...prev.slogan, subSlogan2: e.target.value }
                            }))}
                            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Sub-slogan 3</label>
                          <input
                            type="text"
                            value={homeCmsData.slogan.subSlogan3}
                            onChange={(e) => setHomeCmsData(prev => ({
                              ...prev,
                              slogan: { ...prev.slogan, subSlogan3: e.target.value }
                            }))}
                            className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">Hero Eyebrow Badge</label>
                          <input
                            type="text"
                            value={homeCmsData.hero.badge}
                            onChange={(e) => setHomeCmsData(prev => ({
                              ...prev,
                              hero: { ...prev.hero, badge: e.target.value }
                            }))}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">Primary CTA Button</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={homeCmsData.hero.primaryCtaText}
                              onChange={(e) => setHomeCmsData(prev => ({
                                ...prev,
                                hero: { ...prev.hero, primaryCtaText: e.target.value }
                              }))}
                              placeholder="Text"
                              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                            />
                            <input
                              type="text"
                              value={homeCmsData.hero.primaryCtaLink}
                              onChange={(e) => setHomeCmsData(prev => ({
                                ...prev,
                                hero: { ...prev.hero, primaryCtaLink: e.target.value }
                              }))}
                              placeholder="URL"
                              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">Hero Title Line 1</label>
                          <input
                            type="text"
                            value={homeCmsData.hero.titleLine1}
                            onChange={(e) => setHomeCmsData(prev => ({
                              ...prev,
                              hero: { ...prev.hero, titleLine1: e.target.value }
                            }))}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">Hero Title Line 2</label>
                          <input
                            type="text"
                            value={homeCmsData.hero.titleLine2}
                            onChange={(e) => setHomeCmsData(prev => ({
                              ...prev,
                              hero: { ...prev.hero, titleLine2: e.target.value }
                            }))}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Division Introduction / Description</label>
                        <textarea
                          rows={3}
                          value={homeCmsData.hero.description}
                          onChange={(e) => setHomeCmsData(prev => ({
                            ...prev,
                            hero: { ...prev.hero, description: e.target.value }
                          }))}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Live Hero Preview Card */}
                  <div className="lg:col-span-4 bg-gradient-to-br from-[#eef7f9] to-[#cfe7ee] p-6 rounded-2xl border border-teal-200 text-slate-900 flex flex-col justify-between shadow-xl">
                    <div className="space-y-3">
                      <span className="text-[10px] font-black uppercase text-[#00768a] tracking-widest block">
                        Live Preview (Section 1)
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#006070] block">
                        {homeCmsData.hero.badge}
                      </span>
                      <h4 className="text-xl font-black text-[#003d4d] leading-tight uppercase">
                        {homeCmsData.hero.titleLine1}<br />
                        {homeCmsData.hero.titleLine2}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-4 leading-relaxed">
                        {homeCmsData.hero.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-teal-200/80 flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-lg bg-[#00768a] text-white text-[10px] font-bold uppercase">
                        {homeCmsData.hero.primaryCtaText}
                      </span>
                      <span className="px-3 py-1.5 rounded-lg bg-white border border-teal-300 text-[#006070] text-[10px] font-bold uppercase">
                        {homeCmsData.hero.secondaryCtaText}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 2: Our Story */}
              {homeCmsSubTab === 'story' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 bg-[#132247] p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                      <FileText className="w-4 h-4 text-teal-400" />
                      Our Story Content (Content_Home.docx)
                    </h3>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">Section Badge</label>
                          <input
                            type="text"
                            value={homeCmsData.ourStory.badge}
                            onChange={(e) => setHomeCmsData(prev => ({
                              ...prev,
                              ourStory: { ...prev.ourStory, badge: e.target.value }
                            }))}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">Headline</label>
                          <input
                            type="text"
                            value={homeCmsData.ourStory.title}
                            onChange={(e) => setHomeCmsData(prev => ({
                              ...prev,
                              ourStory: { ...prev.ourStory, title: e.target.value }
                            }))}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Opening Statement (Bold Lead)</label>
                        <input
                          type="text"
                          value={homeCmsData.ourStory.leadParagraph}
                          onChange={(e) => setHomeCmsData(prev => ({
                            ...prev,
                            ourStory: { ...prev.ourStory, leadParagraph: e.target.value }
                          }))}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Full Story Narrative</label>
                        <textarea
                          rows={5}
                          value={homeCmsData.ourStory.fullParagraph}
                          onChange={(e) => setHomeCmsData(prev => ({
                            ...prev,
                            ourStory: { ...prev.ourStory, fullParagraph: e.target.value }
                          }))}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs leading-relaxed"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Scientific Mission Quote</label>
                        <input
                          type="text"
                          value={homeCmsData.ourStory.quote}
                          onChange={(e) => setHomeCmsData(prev => ({
                            ...prev,
                            ourStory: { ...prev.ourStory, quote: e.target.value }
                          }))}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200 text-slate-900 shadow-xl flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[10px] font-black uppercase text-[#00768a] tracking-widest block">
                        Live Preview (Section 2)
                      </span>
                      <span className="text-[10px] font-bold uppercase text-[#006070] block">
                        {homeCmsData.ourStory.badge}
                      </span>
                      <h4 className="text-base font-black text-[#003d4d] leading-snug">
                        {homeCmsData.ourStory.title}
                      </h4>
                      <p className="text-xs font-bold text-slate-800 leading-relaxed">
                        {homeCmsData.ourStory.leadParagraph}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-6 leading-relaxed">
                        {homeCmsData.ourStory.fullParagraph}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 text-[11px] italic text-[#00768a]">
                      &ldquo;{homeCmsData.ourStory.quote}&rdquo;
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: 4 Core Pillars & Modals */}
              {homeCmsSubTab === 'pillars' && (
                <div className="space-y-6">
                  {/* Pillar Selector Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {homeCmsData.pillars.map((pillar) => (
                      <button
                        key={pillar.id}
                        onClick={() => setSelectedPillarId(pillar.id)}
                        className={`p-4 rounded-xl text-left border transition-all ${
                          selectedPillarId === pillar.id
                            ? 'bg-[#00768a] text-white border-teal-300 shadow-lg'
                            : 'bg-[#132247] text-slate-200 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-black">{pillar.number}</span>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                            selectedPillarId === pillar.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-teal-300'
                          }`}>
                            Pillar
                          </span>
                        </div>
                        <div className="font-extrabold text-sm">{pillar.title}</div>
                        <div className="text-[11px] opacity-80 mt-1 line-clamp-2">{pillar.shortDescription}</div>
                      </button>
                    ))}
                  </div>

                  {/* Selected Pillar Editor */}
                  {(() => {
                    const currentPillar = homeCmsData.pillars.find(p => p.id === selectedPillarId) || homeCmsData.pillars[0];
                    if (!currentPillar) return null;

                    const updatePillar = (updates: Partial<RyanPillar>) => {
                      setHomeCmsData(prev => ({
                        ...prev,
                        pillars: prev.pillars.map(p => p.id === currentPillar.id ? { ...p, ...updates } : p)
                      }));
                    };

                    return (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-7 bg-[#132247] p-6 rounded-2xl border border-slate-800 space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <Target className="w-4 h-4 text-teal-400" />
                              Editing Pillar {currentPillar.number}: {currentPillar.title}
                            </h3>
                            <span className="text-[11px] text-teal-300 font-semibold">
                              Direct Pop-up Modal Config
                            </span>
                          </div>

                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Card Title</label>
                                <input
                                  type="text"
                                  value={currentPillar.title}
                                  onChange={(e) => updatePillar({ title: e.target.value })}
                                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-300 mb-1">Card Tagline</label>
                                <input
                                  type="text"
                                  value={currentPillar.tagline}
                                  onChange={(e) => updatePillar({ tagline: e.target.value })}
                                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-300 mb-1">Short Card Summary (Visible on Home Grid)</label>
                              <textarea
                                rows={2}
                                value={currentPillar.shortDescription}
                                onChange={(e) => updatePillar({ shortDescription: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                              />
                            </div>

                            <div className="p-4 rounded-xl bg-slate-900/80 border border-teal-800/40 space-y-3">
                              <div className="text-xs font-black uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                Interactive Modal Pop-up Content (&lsquo;Now after clicking the box...&rsquo;)
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Modal Badge</label>
                                  <input
                                    type="text"
                                    value={currentPillar.popupBadge}
                                    onChange={(e) => updatePillar({ popupBadge: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Modal Main Headline</label>
                                  <input
                                    type="text"
                                    value={currentPillar.popupTitle}
                                    onChange={(e) => updatePillar({ popupTitle: e.target.value })}
                                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-bold"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Modal Lead Clinical Statement</label>
                                <textarea
                                  rows={2}
                                  value={currentPillar.popupLead}
                                  onChange={(e) => updatePillar({ popupLead: e.target.value })}
                                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                                  Specifications &amp; Bullet Points (Enter one point per line)
                                </label>
                                <textarea
                                  rows={4}
                                  value={currentPillar.popupPoints.join('\n')}
                                  onChange={(e) => updatePillar({
                                    popupPoints: e.target.value.split('\n').filter(p => p.trim())
                                  })}
                                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-mono text-[11.5px]"
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Clinical Practice Takeaway Note</label>
                                <textarea
                                  rows={2}
                                  value={currentPillar.popupClinicalNote}
                                  onChange={(e) => updatePillar({ popupClinicalNote: e.target.value })}
                                  className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Modal Preview Window */}
                        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 text-slate-900 shadow-2xl p-6 flex flex-col justify-between overflow-hidden">
                          <div>
                            <div className="bg-[#0e4f63] -mx-6 -mt-6 p-4 text-white rounded-t-2xl mb-4">
                              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-teal-400 text-teal-950 block w-max mb-1">
                                {currentPillar.popupBadge}
                              </span>
                              <h4 className="text-sm font-black text-white">{currentPillar.popupTitle}</h4>
                              <span className="text-[10px] text-teal-200">{currentPillar.tagline}</span>
                            </div>

                            <p className="text-xs font-bold text-slate-800 mb-3">
                              {currentPillar.popupLead}
                            </p>

                            <div className="space-y-2 mb-4">
                              <div className="text-[10px] font-black uppercase text-[#00768a]">Specifications:</div>
                              {currentPillar.popupPoints.slice(0, 3).map((pt, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{pt}</span>
                                </div>
                              ))}
                            </div>

                            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-[11px] text-slate-700">
                              <span className="font-bold text-[#006070] block text-[10px] uppercase">Takeaway:</span>
                              {currentPillar.popupClinicalNote}
                            </div>
                          </div>

                          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">Modal Simulation</span>
                            <span className="px-3 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg">Close</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Sub-Tab 4: Quality & Compliance */}
              {homeCmsSubTab === 'quality' && (
                <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Quality & Compliance Framework
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Badge</label>
                      <input
                        type="text"
                        value={homeCmsData.qualitySection.badge}
                        onChange={(e) => setHomeCmsData(prev => ({
                          ...prev,
                          qualitySection: { ...prev.qualitySection, badge: e.target.value }
                        }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Main Headline</label>
                      <input
                        type="text"
                        value={homeCmsData.qualitySection.title}
                        onChange={(e) => setHomeCmsData(prev => ({
                          ...prev,
                          qualitySection: { ...prev.qualitySection, title: e.target.value }
                        }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={homeCmsData.qualitySection.description}
                      onChange={(e) => setHomeCmsData(prev => ({
                        ...prev,
                        qualitySection: { ...prev.qualitySection, description: e.target.value }
                      }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3">
                    {homeCmsData.qualitySection.standards.map((std, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                        <label className="block text-[11px] font-bold text-teal-300">Standard {idx + 1}</label>
                        <input
                          type="text"
                          value={std.title}
                          onChange={(e) => {
                            const updated = [...homeCmsData.qualitySection.standards];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            setHomeCmsData(prev => ({
                              ...prev,
                              qualitySection: { ...prev.qualitySection, standards: updated }
                            }));
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs font-bold"
                        />
                        <textarea
                          rows={2}
                          value={std.desc}
                          onChange={(e) => {
                            const updated = [...homeCmsData.qualitySection.standards];
                            updated[idx] = { ...updated[idx], desc: e.target.value };
                            setHomeCmsData(prev => ({
                              ...prev,
                              qualitySection: { ...prev.qualitySection, standards: updated }
                            }));
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-[11px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-Tab 5: Contact Info */}
              {homeCmsSubTab === 'contact' && (
                <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Phone className="w-4 h-4 text-teal-400" />
                    Contact &amp; Healthcare Inquiries
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Contact Title</label>
                      <input
                        type="text"
                        value={homeCmsData.contactInfo.title}
                        onChange={(e) => setHomeCmsData(prev => ({
                          ...prev,
                          contactInfo: { ...prev.contactInfo, title: e.target.value }
                        }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Subtitle</label>
                      <input
                        type="text"
                        value={homeCmsData.contactInfo.subtitle}
                        onChange={(e) => setHomeCmsData(prev => ({
                          ...prev,
                          contactInfo: { ...prev.contactInfo, subtitle: e.target.value }
                        }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Email</label>
                      <input
                        type="text"
                        value={homeCmsData.contactInfo.email}
                        onChange={(e) => setHomeCmsData(prev => ({
                          ...prev,
                          contactInfo: { ...prev.contactInfo, email: e.target.value }
                        }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Phone</label>
                      <input
                        type="text"
                        value={homeCmsData.contactInfo.phone}
                        onChange={(e) => setHomeCmsData(prev => ({
                          ...prev,
                          contactInfo: { ...prev.contactInfo, phone: e.target.value }
                        }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Operating Hours</label>
                      <input
                        type="text"
                        value={homeCmsData.contactInfo.hours}
                        onChange={(e) => setHomeCmsData(prev => ({
                          ...prev,
                          contactInfo: { ...prev.contactInfo, hours: e.target.value }
                        }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Address</label>
                    <textarea
                      rows={2}
                      value={homeCmsData.contactInfo.address}
                      onChange={(e) => setHomeCmsData(prev => ({
                        ...prev,
                        contactInfo: { ...prev.contactInfo, address: e.target.value }
                      }))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* ABOUT RYAN PAGE CMS TAB                                   */}
          {/* ========================================================= */}
          {activeTab === 'about-cms' && (
            <RyanAboutCms
              data={aboutCmsData}
              onChange={setAboutCmsData}
              onSave={handleSaveAboutCms}
            />
          )}

          {/* ========================================================= */}
          {/* FOR DOCTORS PAGE CMS TAB                                 */}
          {/* ========================================================= */}
          {activeTab === 'doctors-cms' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              {/* Header card with Quick Actions */}
              <div className="bg-[#132247] p-6 rounded-2xl border border-teal-900/50 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-black uppercase tracking-widest">
                      Live Dynamic CMS
                    </span>
                    <span className="text-xs text-slate-400">• Source: Content_For Doctors.png</span>
                  </div>
                  <h2 className="text-xl font-black text-white mt-2">
                    Ryan Dermaceutics For Doctors Portal CMS
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Manage the hero banner, quick access cards, 8 clinical therapeutic categories, scientific dermatology framework, stay updated articles, and partnering banner.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <a
                    href="/for-doctors"
                    target="_blank"
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Preview /for-doctors</span>
                  </a>
                  <button
                    onClick={handleSaveDoctorsCms}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-teal-950 transition"
                  >
                    <Save className="w-4 h-4" />
                    <span>Publish Doctors CMS</span>
                  </button>
                </div>
              </div>

              {/* Sub-Tabs / Section Selectors */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800">
                {[
                  { id: 'hero', label: '1. Hero & Badges', icon: Sparkles },
                  { id: 'quick-access', label: '2. Quick Access (4 Cards)', icon: Layers },
                  { id: 'therapeutic', label: '3. Therapeutic Areas (8 Circles)', icon: Target },
                  { id: 'science', label: '4. Scientific Approach', icon: ShieldCheck },
                  { id: 'resources', label: '5. Stay Updated Resources', icon: BookOpen },
                  { id: 'partner', label: '6. Partnering Banner', icon: Phone }
                ].map((st) => {
                  const Icon = st.icon;
                  const isCurrent = doctorsCmsSubTab === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => setDoctorsCmsSubTab(st.id as any)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
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

              {/* Sub-Tab 1: Hero & Badges */}
              {doctorsCmsSubTab === 'hero' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 bg-[#132247] p-6 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
                      <Sparkles className="w-4 h-4 text-teal-400" />
                      Hero Section Content
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Eyebrow Badge
                        </label>
                        <input
                          type="text"
                          value={doctorsCmsData.hero.badge}
                          onChange={(e) => setDoctorsCmsData(prev => ({
                            ...prev,
                            hero: { ...prev.hero, badge: e.target.value }
                          }))}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-teal-400"
                        />
                      </div>

                      <RichTextEditor
                        label="Hero Heading (with color palette & rich styling)"
                        value={doctorsCmsData.hero.heading}
                        onChange={(val) => setDoctorsCmsData(prev => ({
                          ...prev,
                          hero: { ...prev.hero, heading: val }
                        }))}
                        rows={2}
                      />

                      <RichTextEditor
                        label="Hero Description (with rich styling)"
                        value={doctorsCmsData.hero.description}
                        onChange={(val) => setDoctorsCmsData(prev => ({
                          ...prev,
                          hero: { ...prev.hero, description: val }
                        }))}
                        rows={3}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">Primary CTA Button</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={doctorsCmsData.hero.primaryCtaText}
                              onChange={(e) => setDoctorsCmsData(prev => ({
                                ...prev,
                                hero: { ...prev.hero, primaryCtaText: e.target.value }
                              }))}
                              placeholder="Text"
                              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                            />
                            <input
                              type="text"
                              value={doctorsCmsData.hero.primaryCtaLink}
                              onChange={(e) => setDoctorsCmsData(prev => ({
                                ...prev,
                                hero: { ...prev.hero, primaryCtaLink: e.target.value }
                              }))}
                              placeholder="Link URL"
                              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">Secondary CTA Button</label>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={doctorsCmsData.hero.secondaryCtaText}
                              onChange={(e) => setDoctorsCmsData(prev => ({
                                ...prev,
                                hero: { ...prev.hero, secondaryCtaText: e.target.value }
                              }))}
                              placeholder="Text"
                              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                            />
                            <input
                              type="text"
                              value={doctorsCmsData.hero.secondaryCtaLink}
                              onChange={(e) => setDoctorsCmsData(prev => ({
                                ...prev,
                                hero: { ...prev.hero, secondaryCtaLink: e.target.value }
                              }))}
                              placeholder="Link URL"
                              className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800">
                        <MediaInput
                          label="Doctor Hero Image"
                          value={doctorsCmsData.hero.doctorImage}
                          onChange={(url) => setDoctorsCmsData(prev => ({
                            ...prev,
                            hero: { ...prev.hero, doctorImage: url }
                          }))}
                          mediaType="image"
                        />
                      </div>

                      <div className="pt-2 border-t border-slate-800">
                        <label className="block text-xs font-bold text-slate-300 mb-2">
                          4 Feature Badges Under Hero
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {doctorsCmsData.hero.features.map((feat, idx) => (
                            <div key={feat.id}>
                              <label className="block text-[10px] font-bold text-slate-400 mb-1">
                                Badge {idx + 1}
                              </label>
                              <input
                                type="text"
                                value={feat.title}
                                onChange={(e) => {
                                  const updated = [...doctorsCmsData.hero.features];
                                  updated[idx] = { ...updated[idx], title: e.target.value };
                                  setDoctorsCmsData(prev => ({
                                    ...prev,
                                    hero: { ...prev.hero, features: updated }
                                  }));
                                }}
                                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live Hero Preview Card */}
                  <div className="lg:col-span-4 bg-gradient-to-br from-[#eef7f9] to-[#cfe7ee] p-6 rounded-2xl border border-teal-200 text-slate-900 flex flex-col justify-between shadow-xl">
                    <div className="space-y-3">
                      <span className="text-[10px] font-black uppercase text-[#00768a] tracking-widest block">
                        Live Preview (Hero Section)
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#006070] block">
                        {doctorsCmsData.hero.badge}
                      </span>
                      <h4
                        className="text-lg font-black text-[#003d4d] leading-tight uppercase"
                        dangerouslySetInnerHTML={{ __html: doctorsCmsData.hero.heading }}
                      />
                      <div
                        className="text-xs text-slate-600 leading-relaxed font-normal"
                        dangerouslySetInnerHTML={{ __html: doctorsCmsData.hero.description }}
                      />
                      <div className="flex gap-2 pt-2">
                        <span className="px-3 py-1.5 rounded-lg bg-[#00768a] text-white text-[10px] font-bold uppercase">
                          {doctorsCmsData.hero.primaryCtaText}
                        </span>
                        <span className="px-3 py-1.5 rounded-lg bg-white border border-teal-200 text-[#006070] text-[10px] font-bold uppercase">
                          {doctorsCmsData.hero.secondaryCtaText}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-teal-200/60">
                      <div className="relative w-full h-36 rounded-xl overflow-hidden bg-white/40 border border-teal-100">
                        {doctorsCmsData.hero.doctorImage && (
                          <img
                            src={doctorsCmsData.hero.doctorImage}
                            alt="Doctor Preview"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 2: Quick Access Cards */}
              {doctorsCmsSubTab === 'quick-access' && (
                <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Layers className="w-4 h-4 text-teal-400" />
                      Quick Access Section (4 Cards)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Badge</label>
                        <input
                          type="text"
                          value={doctorsCmsData.quickAccess.badge}
                          onChange={(e) => setDoctorsCmsData(prev => ({
                            ...prev,
                            quickAccess: { ...prev.quickAccess, badge: e.target.value }
                          }))}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Section Heading</label>
                        <input
                          type="text"
                          value={doctorsCmsData.quickAccess.heading}
                          onChange={(e) => setDoctorsCmsData(prev => ({
                            ...prev,
                            quickAccess: { ...prev.quickAccess, heading: e.target.value }
                          }))}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Section Subheading</label>
                        <input
                          type="text"
                          value={doctorsCmsData.quickAccess.subheading}
                          onChange={(e) => setDoctorsCmsData(prev => ({
                            ...prev,
                            quickAccess: { ...prev.quickAccess, subheading: e.target.value }
                          }))}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {doctorsCmsData.quickAccess.cards.map((card, idx) => (
                      <div key={card.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-teal-300 uppercase">Card {idx + 1}</span>
                          <span className="text-[10px] text-slate-400">ID: {card.id}</span>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Title</label>
                          <input
                            type="text"
                            value={card.title}
                            onChange={(e) => {
                              const updated = [...doctorsCmsData.quickAccess.cards];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setDoctorsCmsData(prev => ({
                                ...prev,
                                quickAccess: { ...prev.quickAccess, cards: updated }
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-slate-955 border border-slate-700 text-white text-xs font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Description</label>
                          <textarea
                            rows={2}
                            value={card.description}
                            onChange={(e) => {
                              const updated = [...doctorsCmsData.quickAccess.cards];
                              updated[idx] = { ...updated[idx], description: e.target.value };
                              setDoctorsCmsData(prev => ({
                                ...prev,
                                quickAccess: { ...prev.quickAccess, cards: updated }
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-400 mb-1">Link Text</label>
                            <input
                              type="text"
                              value={card.linkText}
                              onChange={(e) => {
                                const updated = [...doctorsCmsData.quickAccess.cards];
                                updated[idx] = { ...updated[idx], linkText: e.target.value };
                                setDoctorsCmsData(prev => ({
                                  ...prev,
                                  quickAccess: { ...prev.quickAccess, cards: updated }
                                }));
                              }}
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-400 mb-1">Link Destination</label>
                            <input
                              type="text"
                              value={card.linkUrl}
                              onChange={(e) => {
                                const updated = [...doctorsCmsData.quickAccess.cards];
                                updated[idx] = { ...updated[idx], linkUrl: e.target.value };
                                setDoctorsCmsData(prev => ({
                                  ...prev,
                                  quickAccess: { ...prev.quickAccess, cards: updated }
                                }));
                              }}
                              className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                            />
                          </div>
                        </div>

                        <MediaInput
                          label="Preview Graphic"
                          value={card.image}
                          onChange={(url) => {
                            const updated = [...doctorsCmsData.quickAccess.cards];
                            updated[idx] = { ...updated[idx], image: url };
                            setDoctorsCmsData(prev => ({
                              ...prev,
                              quickAccess: { ...prev.quickAccess, cards: updated }
                            }));
                          }}
                          mediaType="image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-Tab 3: Therapeutic Areas (8 Circles) */}
              {doctorsCmsSubTab === 'therapeutic' && (
                <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Target className="w-4 h-4 text-teal-400" />
                      Explore by Therapeutic Area (8 Circular Categories)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Badge</label>
                        <input
                          type="text"
                          value={doctorsCmsData.therapeuticAreas.badge}
                          onChange={(e) => setDoctorsCmsData(prev => ({
                            ...prev,
                            therapeuticAreas: { ...prev.therapeuticAreas, badge: e.target.value }
                          }))}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Heading</label>
                        <input
                          type="text"
                          value={doctorsCmsData.therapeuticAreas.heading}
                          onChange={(e) => setDoctorsCmsData(prev => ({
                            ...prev,
                            therapeuticAreas: { ...prev.therapeuticAreas, heading: e.target.value }
                          }))}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">View All Button Text</label>
                        <input
                          type="text"
                          value={doctorsCmsData.therapeuticAreas.viewAllText}
                          onChange={(e) => setDoctorsCmsData(prev => ({
                            ...prev,
                            therapeuticAreas: { ...prev.therapeuticAreas, viewAllText: e.target.value }
                          }))}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">View All Button Link</label>
                        <input
                          type="text"
                          value={doctorsCmsData.therapeuticAreas.viewAllLink}
                          onChange={(e) => setDoctorsCmsData(prev => ({
                            ...prev,
                            therapeuticAreas: { ...prev.therapeuticAreas, viewAllLink: e.target.value }
                          }))}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 8 Categories Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {doctorsCmsData.therapeuticAreas.categories.map((cat, idx) => (
                      <div key={cat.id} className="p-3.5 rounded-xl bg-slate-900 border border-slate-700 space-y-2.5">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                          <span className="text-xs font-bold text-teal-300">Category {idx + 1}</span>
                          <span className="text-[10px] text-slate-400">{cat.id}</span>
                        </div>

                        <div>
                          <label className="block text-[10px] font-semibold text-slate-400 mb-1">Category Name</label>
                          <input
                            type="text"
                            value={cat.name}
                            onChange={(e) => {
                              const updated = [...doctorsCmsData.therapeuticAreas.categories];
                              updated[idx] = { ...updated[idx], name: e.target.value };
                              setDoctorsCmsData(prev => ({
                                ...prev,
                                therapeuticAreas: { ...prev.therapeuticAreas, categories: updated }
                              }));
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-semibold"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-semibold text-slate-400 mb-1">Redirection Link</label>
                          <input
                            type="text"
                            value={cat.link}
                            onChange={(e) => {
                              const updated = [...doctorsCmsData.therapeuticAreas.categories];
                              updated[idx] = { ...updated[idx], link: e.target.value };
                              setDoctorsCmsData(prev => ({
                                ...prev,
                                therapeuticAreas: { ...prev.therapeuticAreas, categories: updated }
                              }));
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-semibold text-slate-400 mb-1">Action Text</label>
                          <input
                            type="text"
                            value={cat.actionText}
                            onChange={(e) => {
                              const updated = [...doctorsCmsData.therapeuticAreas.categories];
                              updated[idx] = { ...updated[idx], actionText: e.target.value };
                              setDoctorsCmsData(prev => ({
                                ...prev,
                                therapeuticAreas: { ...prev.therapeuticAreas, categories: updated }
                              }));
                            }}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                          />
                        </div>

                        <MediaInput
                          label="Circle Photo"
                          value={cat.image}
                          onChange={(url) => {
                            const updated = [...doctorsCmsData.therapeuticAreas.categories];
                            updated[idx] = { ...updated[idx], image: url };
                            setDoctorsCmsData(prev => ({
                              ...prev,
                              therapeuticAreas: { ...prev.therapeuticAreas, categories: updated }
                            }));
                          }}
                          mediaType="image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-Tab 4: Scientific Approach */}
              {doctorsCmsSubTab === 'science' && (
                <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-teal-400" />
                      Scientific Approach Section
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Badge</label>
                      <input
                        type="text"
                        value={doctorsCmsData.scientificApproach.badge}
                        onChange={(e) => setDoctorsCmsData(prev => ({
                          ...prev,
                          scientificApproach: { ...prev.scientificApproach, badge: e.target.value }
                        }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold"
                      />
                    </div>

                    <RichTextEditor
                      label="Section Heading (with color styling & HTML)"
                      value={doctorsCmsData.scientificApproach.heading}
                      onChange={(val) => setDoctorsCmsData(prev => ({
                        ...prev,
                        scientificApproach: { ...prev.scientificApproach, heading: val }
                      }))}
                      rows={2}
                    />

                    <RichTextEditor
                      label="Section Description (with rich text)"
                      value={doctorsCmsData.scientificApproach.description}
                      onChange={(val) => setDoctorsCmsData(prev => ({
                        ...prev,
                        scientificApproach: { ...prev.scientificApproach, description: val }
                      }))}
                      rows={3}
                    />

                    <MediaInput
                      label="Scientist & Microscope Image"
                      value={doctorsCmsData.scientificApproach.image}
                      onChange={(url) => setDoctorsCmsData(prev => ({
                        ...prev,
                        scientificApproach: { ...prev.scientificApproach, image: url }
                      }))}
                      mediaType="image"
                    />

                    <div className="pt-2 border-t border-slate-800">
                      <label className="block text-xs font-bold text-slate-300 mb-2">
                        4 Quality & Evidence Framework Badges
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        {doctorsCmsData.scientificApproach.features.map((feat, idx) => (
                          <div key={feat.id}>
                            <label className="block text-[10px] font-bold text-slate-400 mb-1">Badge {idx + 1}</label>
                            <input
                              type="text"
                              value={feat.title}
                              onChange={(e) => {
                                const updated = [...doctorsCmsData.scientificApproach.features];
                                updated[idx] = { ...updated[idx], title: e.target.value };
                                setDoctorsCmsData(prev => ({
                                  ...prev,
                                  scientificApproach: { ...prev.scientificApproach, features: updated }
                                }));
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab 5: Stay Updated Resources */}
              {doctorsCmsSubTab === 'resources' && (
                <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-teal-400" />
                      Stay Updated Resources (4 Cards)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Badge</label>
                        <input
                          type="text"
                          value={doctorsCmsData.stayUpdated.badge}
                          onChange={(e) => setDoctorsCmsData(prev => ({
                            ...prev,
                            stayUpdated: { ...prev.stayUpdated, badge: e.target.value }
                          }))}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">Heading</label>
                        <input
                          type="text"
                          value={doctorsCmsData.stayUpdated.heading}
                          onChange={(e) => setDoctorsCmsData(prev => ({
                            ...prev,
                            stayUpdated: { ...prev.stayUpdated, heading: e.target.value }
                          }))}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">View All Button Text</label>
                        <input
                          type="text"
                          value={doctorsCmsData.stayUpdated.viewAllText}
                          onChange={(e) => setDoctorsCmsData(prev => ({
                            ...prev,
                            stayUpdated: { ...prev.stayUpdated, viewAllText: e.target.value }
                          }))}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">View All Button Link</label>
                        <input
                          type="text"
                          value={doctorsCmsData.stayUpdated.viewAllLink}
                          onChange={(e) => setDoctorsCmsData(prev => ({
                            ...prev,
                            stayUpdated: { ...prev.stayUpdated, viewAllLink: e.target.value }
                          }))}
                          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {doctorsCmsData.stayUpdated.articles.map((art, idx) => (
                      <div key={art.id} className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-teal-300">Article {idx + 1}</span>
                          <span className="text-[10px] text-slate-400">{art.id}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-400 mb-1">Category Tag</label>
                            <input
                              type="text"
                              value={art.tag}
                              onChange={(e) => {
                                const updated = [...doctorsCmsData.stayUpdated.articles];
                                updated[idx] = { ...updated[idx], tag: e.target.value };
                                setDoctorsCmsData(prev => ({
                                  ...prev,
                                  stayUpdated: { ...prev.stayUpdated, articles: updated }
                                }));
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-semibold text-slate-400 mb-1">Link Text</label>
                            <input
                              type="text"
                              value={art.linkText}
                              onChange={(e) => {
                                const updated = [...doctorsCmsData.stayUpdated.articles];
                                updated[idx] = { ...updated[idx], linkText: e.target.value };
                                setDoctorsCmsData(prev => ({
                                  ...prev,
                                  stayUpdated: { ...prev.stayUpdated, articles: updated }
                                }));
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Article Title</label>
                          <input
                            type="text"
                            value={art.title}
                            onChange={(e) => {
                              const updated = [...doctorsCmsData.stayUpdated.articles];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setDoctorsCmsData(prev => ({
                                ...prev,
                                stayUpdated: { ...prev.stayUpdated, articles: updated }
                              }));
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-slate-400 mb-1">Destination URL</label>
                          <input
                            type="text"
                            value={art.linkUrl}
                            onChange={(e) => {
                              const updated = [...doctorsCmsData.stayUpdated.articles];
                              updated[idx] = { ...updated[idx], linkUrl: e.target.value };
                              setDoctorsCmsData(prev => ({
                                ...prev,
                                stayUpdated: { ...prev.stayUpdated, articles: updated }
                              }));
                            }}
                            className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs"
                          />
                        </div>

                        <MediaInput
                          label="Article Thumbnail"
                          value={art.image}
                          onChange={(url) => {
                            const updated = [...doctorsCmsData.stayUpdated.articles];
                            updated[idx] = { ...updated[idx], image: url };
                            setDoctorsCmsData(prev => ({
                              ...prev,
                              stayUpdated: { ...prev.stayUpdated, articles: updated }
                            }));
                          }}
                          mediaType="image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-Tab 6: Partnering Banner */}
              {doctorsCmsSubTab === 'partner' && (
                <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 space-y-6">
                  <div className="border-b border-slate-800 pb-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Phone className="w-4 h-4 text-teal-400" />
                      Partnering For Better Skin Health (Bottom Banner)
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">Eyebrow Badge</label>
                      <input
                        type="text"
                        value={doctorsCmsData.partnerBanner.badge}
                        onChange={(e) => setDoctorsCmsData(prev => ({
                          ...prev,
                          partnerBanner: { ...prev.partnerBanner, badge: e.target.value }
                        }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-semibold"
                      />
                    </div>

                    <RichTextEditor
                      label="Banner Heading (with color styling & HTML)"
                      value={doctorsCmsData.partnerBanner.heading}
                      onChange={(val) => setDoctorsCmsData(prev => ({
                        ...prev,
                        partnerBanner: { ...prev.partnerBanner, heading: val }
                      }))}
                      rows={2}
                    />

                    <RichTextEditor
                      label="Banner Description (with rich text)"
                      value={doctorsCmsData.partnerBanner.description}
                      onChange={(val) => setDoctorsCmsData(prev => ({
                        ...prev,
                        partnerBanner: { ...prev.partnerBanner, description: val }
                      }))}
                      rows={3}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Primary Button</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={doctorsCmsData.partnerBanner.primaryCtaText}
                            onChange={(e) => setDoctorsCmsData(prev => ({
                              ...prev,
                              partnerBanner: { ...prev.partnerBanner, primaryCtaText: e.target.value }
                            }))}
                            placeholder="Text"
                            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                          <input
                            type="text"
                            value={doctorsCmsData.partnerBanner.primaryCtaLink}
                            onChange={(e) => setDoctorsCmsData(prev => ({
                              ...prev,
                              partnerBanner: { ...prev.partnerBanner, primaryCtaLink: e.target.value }
                            }))}
                            placeholder="Link URL"
                            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">Secondary Button</label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={doctorsCmsData.partnerBanner.secondaryCtaText}
                            onChange={(e) => setDoctorsCmsData(prev => ({
                              ...prev,
                              partnerBanner: { ...prev.partnerBanner, secondaryCtaText: e.target.value }
                            }))}
                            placeholder="Text"
                            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                          <input
                            type="text"
                            value={doctorsCmsData.partnerBanner.secondaryCtaLink}
                            onChange={(e) => setDoctorsCmsData(prev => ({
                              ...prev,
                              partnerBanner: { ...prev.partnerBanner, secondaryCtaLink: e.target.value }
                            }))}
                            placeholder="Link URL"
                            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <MediaInput
                        label="Doctor with Tablet Image"
                        value={doctorsCmsData.partnerBanner.image}
                        onChange={(url) => setDoctorsCmsData(prev => ({
                          ...prev,
                          partnerBanner: { ...prev.partnerBanner, image: url }
                        }))}
                        mediaType="image"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. PRODUCTS & MONOGRAPHS TAB                              */}
          {/* ========================================================= */}
          {activeTab === 'products' && (

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto h-[calc(100vh-8.5rem)]">
              {/* Product Selector Sidebar */}
              <div className="lg:col-span-4 bg-[#132247] rounded-2xl border border-slate-800 flex flex-col overflow-hidden shadow-xl">
                <div className="p-4 border-b border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Monographs ({filteredProducts.length})
                    </span>
                    <button
                      onClick={() => {
                        const newId = `ryan-prod-${Date.now()}`;
                        const newProd: RyanProduct = {
                          ...RYAN_PRODUCTS[0],
                          id: newId,
                          brandName: 'NEW FORMULATION',
                          slug: `new-formulation-${Date.now()}`,
                          genericName: 'Active Ingredient & Formulation',
                          packSize: '30g Tube',
                        };
                        setProductsList([newProd, ...productsList]);
                        setSelectedProduct(newProd);
                        showToast('New product monograph created!');
                      }}
                      className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[11px] font-bold flex items-center gap-1 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>New Product</span>
                    </button>
                  </div>

                  {/* Search */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search 53 monographs..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Category Filter */}
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="All">All Therapeutic Areas</option>
                    {THERAPEUTIC_AREAS.map((ta) => (
                      <option key={ta} value={ta}>{ta}</option>
                    ))}
                  </select>
                </div>

                {/* Product List */}
                <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 p-2 space-y-1">
                  {filteredProducts.map((p) => {
                    const isSelected = selectedProduct?.id === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedProduct(p)}
                        className={`w-full text-left p-3 rounded-xl transition flex items-start gap-3 ${
                          isSelected ? 'bg-[#00768a] text-white shadow-md' : 'hover:bg-white/5 text-slate-300'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 font-bold text-xs text-teal-200">
                          {p.brandName.replace(/[^a-zA-Z0-9]/g, '').charAt(0) || p.brandName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-xs truncate text-white">{p.brandName.replace(/®/g, '')}</div>
                          <div className={`text-[11px] truncate ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>
                            {p.genericName}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-black/20 text-teal-200">
                              {p.dosageForm}
                            </span>
                            <span className="text-[10px] text-teal-300">{p.packSize}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Product Edit Panel */}
              <div className="lg:col-span-8 bg-[#132247] rounded-2xl border border-slate-800 p-6 flex flex-col overflow-y-auto shadow-xl space-y-6">
                {selectedProduct ? (
                  <>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                      <div>
                        <div className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">
                          EDITING PRODUCT MONOGRAPH &bull; ID: {selectedProduct.id}
                        </div>
                        <h2 className="text-xl font-extrabold text-white mt-0.5">{selectedProduct.brandName.replace(/®/g, '')}</h2>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={`/products/${selectedProduct.slug || selectedProduct.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View on Site</span>
                        </a>
                        <button
                          onClick={() => {
                            if (confirm(`Delete monograph for "${selectedProduct.brandName}"?`)) {
                              setProductsList(prev => prev.filter(p => p.id !== selectedProduct.id));
                              setSelectedProduct(productsList[0] || null);
                              showToast('Product monograph deleted');
                            }
                          }}
                          className="p-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 transition"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Basic Meta Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                          Brand Name
                        </label>
                        <input
                          type="text"
                          value={selectedProduct.brandName}
                          onChange={(e) => updateCurrentProduct('brandName', e.target.value.replace(/®/g, ''))}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                          Generic Formulation
                        </label>
                        <input
                          type="text"
                          value={selectedProduct.genericName}
                          onChange={(e) => updateCurrentProduct('genericName', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                          Pack Size
                        </label>
                        <input
                          type="text"
                          value={selectedProduct.packSize}
                          onChange={(e) => updateCurrentProduct('packSize', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                          Therapeutic Area
                        </label>
                        <select
                          value={selectedProduct.therapeuticArea}
                          onChange={(e) => updateCurrentProduct('therapeuticArea', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                        >
                          {THERAPEUTIC_AREAS.map((ta) => (
                            <option key={ta} value={ta}>{ta}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                          Dosage Form
                        </label>
                        <select
                          value={selectedProduct.dosageForm}
                          onChange={(e) => updateCurrentProduct('dosageForm', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                        >
                          {DOSAGE_FORMS.map((df) => (
                            <option key={df} value={df}>{df}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                          Route
                        </label>
                        <select
                          value={selectedProduct.route}
                          onChange={(e) => updateCurrentProduct('route', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                        >
                          {ROUTES.map((r) => (
                            <option key={r.name} value={r.name}>{r.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Image Multi-Source Input */}
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                      <MediaInput
                        label="Product Packshot Image (Upload / URL / Asset)"
                        value={(selectedProduct as any).image || '/ryan/library/prod-luliprix.jpg'}
                        onChange={(url) => updateCurrentProduct('image' as any, url)}
                        mediaType="image"
                        helperText="Provide image URL, pick from /ryan/ assets, or upload from your computer."
                      />
                    </div>

                    {/* Rich Text Editor for Description */}
                    <div>
                      <RichTextEditor
                        label="Clinical Product Description"
                        value={selectedProduct.clinicalSummary || ''}
                        onChange={(val) => updateCurrentProduct('clinicalSummary', val)}
                        rows={4}
                      />
                    </div>

                    {/* Rich Text Editor for Composition */}
                    <div>
                      <RichTextEditor
                        label="Active Composition &amp; Strength"
                        value={Array.isArray(selectedProduct.composition) ? selectedProduct.composition.join('\n') : ((selectedProduct as any).composition || '')}
                        onChange={(val) => updateCurrentProduct('composition', typeof val === 'string' ? val.split('\n') : val)}
                        rows={2}
                      />
                    </div>

                    {/* Rich Text Editor for Dosage */}
                    <div>
                      <RichTextEditor
                        label="Recommended Dosage &amp; Administration"
                        value={typeof selectedProduct.dosageAdministration === 'object' ? selectedProduct.dosageAdministration.recommended : ((selectedProduct as any).dosageAdministration || '')}
                        onChange={(val) => updateCurrentProduct('dosageAdministration', { recommended: val, specialPopulations: '', duration: '' })}
                        rows={2}
                      />
                    </div>

                    {/* Save Action */}
                    <div className="pt-4 border-t border-slate-800 flex justify-end">
                      <button
                        onClick={handleSaveAll}
                        className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-950 transition"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Monograph Updates</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                    Select a product from the list to begin editing.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. CLINICAL INSIGHTS TAB                                  */}
          {/* ========================================================= */}
          {activeTab === 'insights' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
              {/* Insight Selector */}
              <div className="lg:col-span-4 bg-[#132247] p-4 rounded-2xl border border-slate-800 shadow-xl space-y-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider block">
                  Select Clinical Insight ({Object.keys(insightsMap).length})
                </span>
                <div className="space-y-1.5">
                  {Object.values(insightsMap).map((art) => {
                    const isSelected = selectedInsightSlug === art.slug;
                    return (
                      <button
                        key={art.slug}
                        onClick={() => setSelectedInsightSlug(art.slug)}
                        className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between ${
                          isSelected ? 'bg-[#00768a] text-white shadow-md' : 'hover:bg-white/5 text-slate-300'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="font-bold text-xs truncate">{art.title}</div>
                          <div className="text-[10px] text-teal-200 mt-0.5">{art.readingTime} &bull; {art.date}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 shrink-0 text-slate-400" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Insight Edit Fields */}
              <div className="lg:col-span-8 bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
                {insightsMap[selectedInsightSlug] && (
                  <>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                      <div>
                        <div className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">
                          CLINICAL ARTICLE EDITOR
                        </div>
                        <h2 className="text-lg font-extrabold text-white mt-0.5">
                          {insightsMap[selectedInsightSlug].title}
                        </h2>
                      </div>
                      <a
                        href={`/for-doctors/therapeutic-resources/insights/${selectedInsightSlug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Article</span>
                      </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                          Article Title
                        </label>
                        <input
                          type="text"
                          value={insightsMap[selectedInsightSlug].title}
                          onChange={(e) => updateCurrentInsight('title', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                          Reading Time
                        </label>
                        <input
                          type="text"
                          value={insightsMap[selectedInsightSlug].readingTime}
                          onChange={(e) => updateCurrentInsight('readingTime', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    {/* Multi-Source Image Input */}
                    <MediaInput
                      label="Hero Feature Image"
                      value={insightsMap[selectedInsightSlug].image || '/ryan/insight-acne.jpg'}
                      onChange={(url) => updateCurrentInsight('image', url)}
                      mediaType="image"
                      helperText="Specify thumbnail for this clinical insight."
                    />

                    {/* Rich Text Editor for Summary */}
                    <RichTextEditor
                      label="Clinical Executive Summary"
                      value={insightsMap[selectedInsightSlug].summary || ''}
                      onChange={(val) => updateCurrentInsight('summary', val)}
                      rows={3}
                    />

                    {/* Rich Text Editor for Overview */}
                    <RichTextEditor
                      label="Clinical Overview & Pathophysiology"
                      value={insightsMap[selectedInsightSlug].overview || ''}
                      onChange={(val) => updateCurrentInsight('overview', val)}
                      rows={4}
                    />

                    {/* Rich Text Editor for Clinical Presentation */}
                    <RichTextEditor
                      label="Clinical Presentation & Diagnostic Clues"
                      value={insightsMap[selectedInsightSlug].clinicalPresentation || ''}
                      onChange={(val) => updateCurrentInsight('clinicalPresentation', val)}
                      rows={3}
                    />

                    {/* Save Button */}
                    <div className="pt-4 border-t border-slate-800 flex justify-end">
                      <button
                        onClick={handleSaveAll}
                        className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-950 transition"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Article Updates</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 4. THERAPEUTIC GUIDES & MINOXIDIL TAB                     */}
          {/* ========================================================= */}
          {activeTab === 'guides' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest block">
                      SPECIAL CLINICAL MODULE
                    </span>
                    <h2 className="text-xl font-extrabold text-white mt-0.5">
                      Minoxidil Educational Information Protocol
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Integrated into Hair &amp; Scalp Disorders guide matching reference graphic with 6 key clinical boxes.
                    </p>
                  </div>
                  <a
                    href="/for-doctors/therapeutic-resources/guides/hair-and-scalp-disorders"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Live Guide</span>
                  </a>
                </div>

                {/* Live Preview of Minoxidil Component */}
                <div className="pt-4 border-t border-slate-800">
                  <div className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-3">
                    Interactive Live Component Preview:
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-slate-700">
                    <MinoxidilEducationalCard />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. PRESCRIBING INFORMATION (PI) TAB                       */}
          {/* ========================================================= */}
          {activeTab === 'prescribing' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
              {/* PI List */}
              <div className="lg:col-span-4 bg-[#132247] p-4 rounded-2xl border border-slate-800 shadow-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    PI Records ({prescribingList.length})
                  </span>
                  <a
                    href="/for-doctors/prescribing-information"
                    target="_blank"
                    className="text-[11px] text-teal-300 hover:underline font-semibold"
                  >
                    View Page
                  </a>
                </div>
                <div className="space-y-1.5 max-h-[600px] overflow-y-auto">
                  {prescribingList.map((pi) => {
                    const isSelected = selectedPi?.id === pi.id;
                    return (
                      <button
                        key={pi.id}
                        onClick={() => setSelectedPi(pi)}
                        className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between ${
                          isSelected ? 'bg-[#00768a] text-white shadow-md' : 'hover:bg-white/5 text-slate-300'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="font-bold text-xs truncate">{pi.brandName}</div>
                          <div className="text-[10px] text-teal-200 mt-0.5">{pi.therapeuticClass} &bull; {pi.packSize}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 shrink-0 text-slate-400" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* PI Editor */}
              <div className="lg:col-span-8 bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
                {selectedPi && (
                  <>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                      <div>
                        <div className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">
                          OFFICIAL PRESCRIBING INFORMATION (PI)
                        </div>
                        <h2 className="text-xl font-extrabold text-white mt-0.5">{selectedPi.brandName}</h2>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-400 uppercase bg-emerald-950/60 border border-emerald-700/60 px-2.5 py-1 rounded-lg">
                        SCHEDULE H / Rx
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                          Brand Name
                        </label>
                        <input
                          type="text"
                          value={selectedPi.brandName}
                          onChange={(e) => {
                            const updated = { ...selectedPi, brandName: e.target.value };
                            setSelectedPi(updated);
                            setPrescribingList(prev => prev.map(p => p.id === updated.id ? updated : p));
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                          Generic Name
                        </label>
                        <input
                          type="text"
                          value={selectedPi.genericName}
                          onChange={(e) => {
                            const updated = { ...selectedPi, genericName: e.target.value };
                            setSelectedPi(updated);
                            setPrescribingList(prev => prev.map(p => p.id === updated.id ? updated : p));
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-teal-500"
                        />
                      </div>
                    </div>

                    <RichTextEditor
                      label="Official Composition"
                      value={selectedPi.composition || ''}
                      onChange={(val) => {
                        const updated = { ...selectedPi, composition: val };
                        setSelectedPi(updated);
                        setPrescribingList(prev => prev.map(p => p.id === updated.id ? updated : p));
                      }}
                      rows={2}
                    />

                    <RichTextEditor
                      label="Dosage &amp; Administration Instructions"
                      value={Array.isArray(selectedPi.dosageAndAdministration) ? selectedPi.dosageAndAdministration.join('\n') : (selectedPi.dosageAndAdministration || '')}
                      onChange={(val) => {
                        const updated = { ...selectedPi, dosageAndAdministration: val.split('\n').filter(Boolean) };
                        setSelectedPi(updated);
                        setPrescribingList(prev => prev.map(p => p.id === updated.id ? updated : p));
                      }}
                      rows={3}
                    />

                    <RichTextEditor
                      label="Storage &amp; Handling Instructions"
                      value={selectedPi.storageAndHandling || ''}
                      onChange={(val) => {
                        const updated = { ...selectedPi, storageAndHandling: val };
                        setSelectedPi(updated);
                        setPrescribingList(prev => prev.map(p => p.id === updated.id ? updated : p));
                      }}
                      rows={2}
                    />

                    <div className="pt-4 border-t border-slate-800 flex justify-end">
                      <button
                        onClick={handleSaveAll}
                        className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-teal-950 transition"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save PI Updates</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 6. REFERENCE LIBRARY TAB                                  */}
          {/* ========================================================= */}
          {activeTab === 'library' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-white">Dermatology Reference Library Directory</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Explore and link condition references across 8 therapeutic dermatology categories.
                    </p>
                  </div>
                  <a
                    href="/for-doctors/reference-library"
                    target="_blank"
                    className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <span>View Live Library</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-3">
                  {Object.entries(REFERENCE_LIBRARY_CATEGORIES).map(([slug, cat]) => (
                    <div key={slug} className="p-4 rounded-xl bg-white/5 border border-slate-700/60 space-y-2">
                      <div className="font-extrabold text-sm text-teal-300">{cat.name}</div>
                      <p className="text-xs text-slate-400 line-clamp-2">{cat.description}</p>
                      <div className="pt-2 text-[11px] text-slate-300 font-semibold flex items-center justify-between">
                        <span>{cat.conditionReferences.length} Conditions</span>
                        <a
                          href={`/for-doctors/reference-library/${slug}`}
                          target="_blank"
                          className="text-teal-400 hover:underline flex items-center gap-1"
                        >
                          Explore <ChevronRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 7. MEDIA & ASSET MANAGER TAB                              */}
          {/* ========================================================= */}
          {activeTab === 'media' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-extrabold text-white">Multi-Source Media &amp; Asset Center</h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Upload new product packshots, clinical lesion photos, or copy existing asset paths.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <MediaInput
                    label="Upload or Link Media File"
                    value=""
                    onChange={(url) => {
                      showToast(`Media file uploaded: ${url}`);
                    }}
                    mediaType="image"
                    helperText="Files will be processed and available across the entire site."
                  />
                </div>

                {/* Popular Asset Quick Links */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block">
                    Core Asset Repository
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { name: 'Minoxidil Educational Graphic', path: '/ryan/minoxidil-educational.png' },
                      { name: 'Acne Clinical Hero', path: '/images/clinical-insights/understanding-acne/acne-hero.jpg' },
                      { name: 'Rosacea Erythema Lesion', path: '/images/clinical-insights/understanding-acne/rosacea-erythema.jpg' },
                      { name: 'Open Comedone Micro', path: '/images/clinical-insights/understanding-acne/lesions/open-comedone.jpg' },
                      { name: 'Ice-Pick Scar Close-Up', path: '/images/clinical-insights/understanding-acne/scar-ice-pick.jpg' },
                      { name: 'Fingertip Unit Application', path: '/images/clinical-insights/topical-vs-systemic/fingertip-unit.jpg' },
                      { name: 'Eczema Localised Plaque', path: '/images/clinical-insights/topical-vs-systemic/eczema-localised.jpg' },
                      { name: 'Tinea Corporis Plaque', path: '/images/clinical-insights/topical-vs-systemic/tinea-corporis-localised.jpg' },
                      { name: 'Eczema Post-Therapy Result', path: '/images/clinical-insights/topical-vs-systemic/eczema-after.jpg' },
                    ].map((asset, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 border border-slate-700/70 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-white truncate">{asset.name}</div>
                          <div className="text-[10px] text-teal-300/80 truncate font-mono">{asset.path}</div>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(asset.path);
                            showToast(`Copied ${asset.path}`);
                          }}
                          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-teal-200 transition shrink-0"
                          title="Copy Path"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SEO & SOCIAL GRAPH CMS TAB                                */}
          {/* ========================================================= */}
          {activeTab === 'seo' && (
            <RyanSeoCms
              seoData={seoData}
              onChange={setSeoData}
              onSave={handleSaveSeo}
            />
          )}

          {/* ========================================================= */}
          {/* 8. BACKUP & SYSTEM SETTINGS TAB                           */}
          {/* ========================================================= */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
                <div>
                  <h2 className="text-xl font-extrabold text-white">System Data Persistence &amp; Backups</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Export your changes, restore previous JSON snapshots, or reset to original pharmaceutical defaults.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-white/5 border border-slate-700 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-300 flex items-center justify-center">
                      <Download className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-white">Export Full Content Snapshot</h3>
                    <p className="text-xs text-slate-400">Download a full JSON file containing all products, monographs, and articles.</p>
                    <button
                      onClick={handleExportJson}
                      className="w-full py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition"
                    >
                      Export JSON Backup
                    </button>
                  </div>

                  <div className="p-5 rounded-xl bg-white/5 border border-slate-700 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-300 flex items-center justify-center">
                      <Upload className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-white">Restore from JSON File</h3>
                    <p className="text-xs text-slate-400">Upload a previously saved JSON snapshot to restore all modifications.</p>
                    <label className="w-full py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs text-center block cursor-pointer transition">
                      <span>Import JSON Backup</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportJson}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-rose-300">Reset to Defaults</div>
                    <div className="text-[11px] text-slate-500">Restore factory monograph datasets.</div>
                  </div>
                  <button
                    onClick={handleResetDefaults}
                    className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs transition"
                  >
                    Reset Factory Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
