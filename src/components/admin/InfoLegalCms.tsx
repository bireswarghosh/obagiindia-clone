'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, AlertCircle, Phone, Mail, FileText, Globe, Shield, Sparkles } from 'lucide-react';

interface InfoLegalCmsProps {
  onNotify?: (message: string, type: 'success' | 'error') => void;
}

export default function InfoLegalCms({ onNotify }: InfoLegalCmsProps) {
  const [subTab, setSubTab] = useState<'contact' | 'medical-info' | 'privacy' | 'terms' | 'accessibility' | 'global'>('contact');
  const [saving, setSaving] = useState(false);

  // Contact Us state
  const [contactData, setContactData] = useState({
    eyebrow: 'Get in touch',
    title: 'Contact Us',
    subtitle: 'Ryan Dermaceutics · A Specialized Division of Ethics Medinova Pvt. Ltd.',
    medinfoEmail: 'medinfo@ryandermaceutics.com',
    phone: '+91 33 2400 0000',
    offices: 'Kolkata & Mumbai, India.',
  });

  // Medical Info state
  const [medicalInfoData, setMedicalInfoData] = useState({
    eyebrow: 'Dedicated Scientific Desk',
    title: 'Medical Information Service',
    subtitle: 'Healthcare professional inquiry, pharmacovigilance safety reporting & quality assurance desk.',
    hours: 'Monday – Saturday: 9:00 AM – 6:00 PM IST',
    phone: '+91 33 2400 0000',
    email: 'medinfo@ryandermaceutics.com',
  });

  // Privacy Policy state
  const [privacyTitle, setPrivacyTitle] = useState('Privacy Policy');
  const [privacyText, setPrivacyText] = useState(
    'We collect information you share directly — such as your name, email address, phone number and professional details when you submit an enquiry, subscribe to updates or contact medical information services. Your information is used to respond to enquiries, share requested clinical information, improve our services and comply with legal obligations.'
  );

  // Terms & Conditions state
  const [termsTitle, setTermsTitle] = useState('Terms & Conditions');
  const [termsText, setTermsText] = useState(
    'This website provides general information about Ryan Dermaceutics, a specialized dermatology division of Ethics Medinova Pvt. Ltd., and its product portfolio. Content here is intended for healthcare professionals and general visitors in India and does not replace professional medical advice, diagnosis or treatment.'
  );

  // Accessibility state
  const [accessTitle, setAccessTitle] = useState('Accessibility Statement');
  const [accessCommitment, setAccessCommitment] = useState(
    'Ryan Dermaceutics is committed to making this website usable by everyone, including visitors using assistive technologies.'
  );

  // Global Header/Footer
  const [globalHeaderTitle, setGlobalHeaderTitle] = useState('SCIENCE THAT UNDERSTANDS SKIN');
  const [globalHeaderSubtitle, setGlobalHeaderSubtitle] = useState('Science | Efficacy • Skin Health | Quality • Clinical Confidence');
  const [globalFooterBio, setGlobalFooterBio] = useState(
    'Committed to advancing dermatological therapeutics through scientific rigor, high-quality formulations, and trusted clinician partnership.'
  );
  const [globalLogoUrl, setGlobalLogoUrl] = useState('/ryan/ryan-logo.png');

  // Load from DB API on mount
  useEffect(() => {
    fetch('/api/db/sections?page=contact')
      .then(res => res.json())
      .then(data => {
        if (data?.sections?.hero) {
          setContactData(prev => ({
            ...prev,
            title: data.sections.hero.title || prev.title,
            subtitle: data.sections.hero.subtitle || prev.subtitle,
            eyebrow: data.sections.hero.body_text || prev.eyebrow,
          }));
        }
      })
      .catch(() => {});

    fetch('/api/db/sections?page=privacy-policy')
      .then(res => res.json())
      .then(data => {
        if (data?.sections?.content) {
          setPrivacyTitle(data.sections.content.title || 'Privacy Policy');
        }
      })
      .catch(() => {});

    fetch('/api/db/sections?page=terms-and-conditions')
      .then(res => res.json())
      .then(data => {
        if (data?.sections?.content) {
          setTermsTitle(data.sections.content.title || 'Terms & Conditions');
        }
      })
      .catch(() => {});

    fetch('/api/db/sections?page=accessibility-statement')
      .then(res => res.json())
      .then(data => {
        if (data?.sections?.content) {
          setAccessTitle(data.sections.content.title || 'Accessibility Statement');
          setAccessCommitment(data.sections.content.body_text || accessCommitment);
        }
      })
      .catch(() => {});

    fetch('/api/db/sections?page=global')
      .then(res => res.json())
      .then(data => {
        if (data?.sections?.header) {
          setGlobalHeaderTitle(data.sections.header.title || globalHeaderTitle);
          setGlobalHeaderSubtitle(data.sections.header.subtitle || globalHeaderSubtitle);
          setGlobalLogoUrl(data.sections.header.image_url || globalLogoUrl);
        }
        if (data?.sections?.footer) {
          setGlobalFooterBio(data.sections.footer.body_text || globalFooterBio);
        }
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const adminPin = sessionStorage.getItem('cms_admin_pin') || '1234';
    const headers = { 'Content-Type': 'application/json', 'x-cms-pin': adminPin };

    try {
      if (subTab === 'contact') {
        await fetch('/api/db/sections', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            pageSlug: 'contact',
            sectionKey: 'hero',
            title: contactData.title,
            subtitle: contactData.subtitle,
            body_text: contactData.eyebrow,
          }),
        });
        await fetch('/api/db/sections', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            pageSlug: 'contact',
            sectionKey: 'cards',
            extra_data: {
              cards: [
                { h: 'Medical Information', p: 'Product queries, safety reports.', href: `mailto:${contactData.medinfoEmail}`, cta: contactData.medinfoEmail },
                { h: 'Phone', p: 'Business hours support.', href: `tel:${contactData.phone.replace(/\s+/g, '')}`, cta: contactData.phone },
                { h: 'Offices', p: contactData.offices, href: '/about', cta: 'More about us' }
              ]
            }
          }),
        });
      } else if (subTab === 'privacy') {
        await fetch('/api/db/sections', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            pageSlug: 'privacy-policy',
            sectionKey: 'content',
            title: privacyTitle,
            body_text: privacyText,
          }),
        });
      } else if (subTab === 'terms') {
        await fetch('/api/db/sections', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            pageSlug: 'terms-and-conditions',
            sectionKey: 'content',
            title: termsTitle,
            body_text: termsText,
          }),
        });
      } else if (subTab === 'accessibility') {
        await fetch('/api/db/sections', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            pageSlug: 'accessibility-statement',
            sectionKey: 'content',
            title: accessTitle,
            body_text: accessCommitment,
          }),
        });
      } else if (subTab === 'global') {
        await fetch('/api/db/sections', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            pageSlug: 'global',
            sectionKey: 'header',
            title: globalHeaderTitle,
            subtitle: globalHeaderSubtitle,
            image_url: globalLogoUrl,
          }),
        });
        await fetch('/api/db/sections', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            pageSlug: 'global',
            sectionKey: 'footer',
            body_text: globalFooterBio,
            image_url: globalLogoUrl,
          }),
        });
      }

      onNotify?.('Successfully updated and saved to PostgreSQL Database!', 'success');
    } catch (e: any) {
      onNotify?.(e.message || 'Failed to save to database', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Sub-tab navigation */}
      <div className="flex items-center gap-2 p-1.5 bg-[#132247] rounded-2xl border border-slate-800 overflow-x-auto">
        {[
          { id: 'contact', label: 'Contact Us Page', icon: Phone },
          { id: 'privacy', label: 'Privacy Policy', icon: Shield },
          { id: 'terms', label: 'Terms & Conditions', icon: FileText },
          { id: 'accessibility', label: 'Accessibility Statement', icon: Globe },
          { id: 'global', label: 'Global Header & Footer', icon: Sparkles },
        ].map(t => {
          const Icon = t.icon;
          const active = subTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                active ? 'bg-teal-600 text-white shadow-md' : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Workspace Card */}
      <div className="bg-[#132247] p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white capitalize">
              {subTab === 'contact' && 'Contact Us Page CMS'}
              {subTab === 'privacy' && 'Privacy Policy Content CMS'}
              {subTab === 'terms' && 'Terms & Conditions Content CMS'}
              {subTab === 'accessibility' && 'Accessibility Statement CMS'}
              {subTab === 'global' && 'Global Header & Footer Text/Images'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Edit text and imagery. Changes are saved directly to Neon PostgreSQL.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : 'Save to Database'}</span>
          </button>
        </div>

        {/* 1. Contact Us Tab */}
        {subTab === 'contact' && (
          <div className="space-y-4 max-w-3xl">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Eyebrow Tag (Text)</label>
              <input
                type="text"
                value={contactData.eyebrow}
                onChange={e => setContactData({ ...contactData, eyebrow: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Page Title (Text)</label>
              <input
                type="text"
                value={contactData.title}
                onChange={e => setContactData({ ...contactData, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Subtitle / Bio (Text)</label>
              <input
                type="text"
                value={contactData.subtitle}
                onChange={e => setContactData({ ...contactData, subtitle: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Medical Info Email (Text)</label>
                <input
                  type="text"
                  value={contactData.medinfoEmail}
                  onChange={e => setContactData({ ...contactData, medinfoEmail: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Phone Number (Text)</label>
                <input
                  type="text"
                  value={contactData.phone}
                  onChange={e => setContactData({ ...contactData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Offices Locations (Text)</label>
              <input
                type="text"
                value={contactData.offices}
                onChange={e => setContactData({ ...contactData, offices: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>
          </div>
        )}

        {/* 2. Privacy Policy Tab */}
        {subTab === 'privacy' && (
          <div className="space-y-4 max-w-3xl">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Policy Title (Text)</label>
              <input
                type="text"
                value={privacyTitle}
                onChange={e => setPrivacyTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Primary Policy Narrative (Text)</label>
              <textarea
                rows={6}
                value={privacyText}
                onChange={e => setPrivacyText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* 3. Terms & Conditions Tab */}
        {subTab === 'terms' && (
          <div className="space-y-4 max-w-3xl">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Terms Title (Text)</label>
              <input
                type="text"
                value={termsTitle}
                onChange={e => setTermsTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Terms Overview & Scope (Text)</label>
              <textarea
                rows={6}
                value={termsText}
                onChange={e => setTermsText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* 4. Accessibility Statement Tab */}
        {subTab === 'accessibility' && (
          <div className="space-y-4 max-w-3xl">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Statement Title (Text)</label>
              <input
                type="text"
                value={accessTitle}
                onChange={e => setAccessTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Commitment Statement (Text)</label>
              <textarea
                rows={5}
                value={accessCommitment}
                onChange={e => setAccessCommitment(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* 5. Global Header & Footer Tab */}
        {subTab === 'global' && (
          <div className="space-y-4 max-w-3xl">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Global Header Top Ticker Title (Text)</label>
              <input
                type="text"
                value={globalHeaderTitle}
                onChange={e => setGlobalHeaderTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Global Header Slogan (Text)</label>
              <input
                type="text"
                value={globalHeaderSubtitle}
                onChange={e => setGlobalHeaderSubtitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Global Brand Logo Path / URL (Image)</label>
              <input
                type="text"
                value={globalLogoUrl}
                onChange={e => setGlobalLogoUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Global Footer Bio Description (Text)</label>
              <textarea
                rows={4}
                value={globalFooterBio}
                onChange={e => setGlobalFooterBio(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs leading-relaxed"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
