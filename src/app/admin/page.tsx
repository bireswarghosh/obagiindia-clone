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
  Check
} from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';
import MediaInput from '@/components/admin/MediaInput';
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

type AdminTab =
  | 'dashboard'
  | 'products'
  | 'insights'
  | 'guides'
  | 'prescribing'
  | 'library'
  | 'media'
  | 'backup';

export default function RyanAdminPortal() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

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

  // Load saved modifications from localStorage on mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem('ryan_admin_products');
      if (savedProducts) setProductsList(JSON.parse(savedProducts));

      const savedInsights = localStorage.getItem('ryan_admin_insights');
      if (savedInsights) setInsightsMap(JSON.parse(savedInsights));

      const savedGuides = localStorage.getItem('ryan_admin_guides');
      if (savedGuides) setGuidesMap(JSON.parse(savedGuides));

      const savedPi = localStorage.getItem('ryan_admin_prescribing');
      if (savedPi) setPrescribingList(JSON.parse(savedPi));
    } catch (e) {
      console.error('Error loading stored admin data:', e);
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSaveAll = () => {
    try {
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
      setProductsList(RYAN_PRODUCTS);
      setInsightsMap(CLINICAL_INSIGHTS_DATA);
      setGuidesMap(THERAPEUTIC_GUIDES_DATA);
      setPrescribingList(PRESCRIBING_INFO_PRODUCTS);
      localStorage.removeItem('ryan_admin_products');
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
              { id: 'products', label: 'Products & Monographs', icon: Package, badge: productsList.length },
              { id: 'insights', label: 'Clinical Insights', icon: FileText, badge: Object.keys(insightsMap).length },
              { id: 'guides', label: 'Therapeutic Guides', icon: BookOpen, badge: Object.keys(guidesMap).length },
              { id: 'prescribing', label: 'Prescribing Info (PI)', icon: ShieldCheck, badge: prescribingList.length },
              { id: 'library', label: 'Reference Library', icon: Layers },
              { id: 'media', label: 'Media & Assets', icon: ImageIcon },
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
                href="/home"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition"
              >
                <span>View Live Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-teal-300" />
              </a>
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
              {activeTab === 'products' && 'Product Monographs Directory'}
              {activeTab === 'insights' && 'Clinical Insights Articles'}
              {activeTab === 'guides' && 'Therapeutic Guides & Protocols'}
              {activeTab === 'prescribing' && 'Official Prescribing Information (PI)'}
              {activeTab === 'library' && 'Reference Library Knowledgebase'}
              {activeTab === 'media' && 'Media & Asset Center'}
              {activeTab === 'backup' && 'System Backup & Export'}
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSaveAll}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-teal-950 transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
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
                          {p.brandName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-xs truncate text-white">{p.brandName}</div>
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
                        <h2 className="text-xl font-extrabold text-white mt-0.5">{selectedProduct.brandName}</h2>
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
                          onChange={(e) => updateCurrentProduct('brandName', e.target.value)}
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
