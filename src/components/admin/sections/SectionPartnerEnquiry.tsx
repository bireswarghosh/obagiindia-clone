'use client';

import React, { useState, useEffect } from 'react';
import { Handshake, Plus, Trash2, Mail, Phone, MapPin, Clock } from 'lucide-react';
import SectionShell from './SectionShell';
import ImageUploader from '../ImageUploader';
import {
  ObagiHomeContent,
  ObagiPartnerSection,
  ObagiEnquirySection,
  defaultObagiHomeContent,
} from '@/data/obagi-home-content';

interface SectionProps {
  loaded: ObagiHomeContent;
  triggerToast: (msg: string, type: 'success' | 'error') => void;
  onSaved: (updated: ObagiHomeContent) => void;
  patchSection: (patch: Partial<ObagiHomeContent>) => Promise<ObagiHomeContent | null>;
}

export default function SectionPartnerEnquiry({
  loaded,
  triggerToast,
  onSaved,
  patchSection,
}: SectionProps) {
  const [partner, setPartner] = useState<ObagiPartnerSection>(
    loaded.partner || defaultObagiHomeContent.partner!
  );
  const [enquiry, setEnquiry] = useState<ObagiEnquirySection>(
    loaded.enquiry || defaultObagiHomeContent.enquiry!
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (loaded.partner) setPartner(loaded.partner);
    if (loaded.enquiry) setEnquiry(loaded.enquiry);
  }, [loaded.partner, loaded.enquiry]);

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({ partner, enquiry });
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('Partner & Enquiry section saved successfully!', 'success');
    } else {
      triggerToast('Failed to save Partner & Enquiry section', 'error');
    }
  };

  const addEnquiryType = () => {
    const list = enquiry.enquiryTypes ? [...enquiry.enquiryTypes] : [];
    list.push('New Enquiry Option');
    setEnquiry({ ...enquiry, enquiryTypes: list });
  };

  const removeEnquiryType = (idx: number) => {
    const list = enquiry.enquiryTypes ? [...enquiry.enquiryTypes] : [];
    list.splice(idx, 1);
    setEnquiry({ ...enquiry, enquiryTypes: list });
  };

  return (
    <SectionShell
      icon={Handshake}
      title="Partner with Ryan & Enquiry Form (Screenshots 002225 & 002514)"
      desc="Customize the Partner with Ryan Dermaceutics section, action cards, and the Connect / Send Us An Enquiry form."
      saving={saving}
      onSave={save}
    >
      {/* ── PART 1: PARTNER SECTION (Screenshot 002225.jpg) ── */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-black uppercase text-teal-400 tracking-wider">
              1. Partner With Ryan Dermaceutics
            </h4>
            <p className="text-[11px] text-slate-400">
              Matches Screenshot 2026-10-10 002225.jpg (&quot;BUILD THE FUTURE OF DERMATOLOGY TOGETHER&quot;).
            </p>
          </div>
          <span className="text-[10px] bg-teal-500/10 text-teal-300 px-2.5 py-1 rounded-full border border-teal-500/20 font-bold uppercase">
            Live on Homepage
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Badge Tag
            </label>
            <input
              type="text"
              value={partner.tag || ''}
              onChange={(e) => setPartner({ ...partner, tag: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Title Prefix
            </label>
            <input
              type="text"
              value={partner.title || ''}
              onChange={(e) => setPartner({ ...partner, title: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Title Highlight (Teal)
            </label>
            <input
              type="text"
              value={partner.titleHighlight || ''}
              onChange={(e) => setPartner({ ...partner, titleHighlight: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Subtitle Description
          </label>
          <textarea
            rows={2}
            value={partner.subtitle || ''}
            onChange={(e) => setPartner({ ...partner, subtitle: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Primary Button Text (Opens Distributor Popup)
            </label>
            <input
              type="text"
              value={partner.buttonText || ''}
              onChange={(e) => setPartner({ ...partner, buttonText: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Secondary Button Text (empty = hidden)
            </label>
            <input
              type="text"
              value={partner.secondaryButtonText || ''}
              onChange={(e) => setPartner({ ...partner, secondaryButtonText: e.target.value })}
              placeholder="Leave empty — single CTA is BECOME A DISTRIBUTOR"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        <ImageUploader
          label="Right Doctor Handshake Hero Image"
          value={partner.bgImage || ''}
          onChange={(url) => setPartner({ ...partner, bgImage: url })}
          description="Background image behind the 4 action cards on the right."
        />

        {/* 4 Feature Pillars */}
        <div className="space-y-3 pt-2">
          <h5 className="text-xs font-black uppercase text-teal-400 tracking-wider">
            4 Feature Pillars
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(partner.features || []).map((feat, fIdx) => (
              <div key={feat.id || fIdx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <input
                  type="text"
                  value={feat.title}
                  onChange={(e) => {
                    const updated = [...(partner.features || [])];
                    updated[fIdx] = { ...updated[fIdx], title: e.target.value };
                    setPartner({ ...partner, features: updated });
                  }}
                  placeholder="Feature Title"
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-teal-500"
                />
                <textarea
                  rows={2}
                  value={feat.description}
                  onChange={(e) => {
                    const updated = [...(partner.features || [])];
                    updated[fIdx] = { ...updated[fIdx], description: e.target.value };
                    setPartner({ ...partner, features: updated });
                  }}
                  placeholder="Feature description"
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-[11px] text-slate-300 focus:outline-none focus:border-teal-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 4 Action Cards */}
        <div className="space-y-3 pt-2">
          <h5 className="text-xs font-black uppercase text-teal-400 tracking-wider">
            4 Right Action Cards (Click opens enquiry with type pre-selected)
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(partner.actionCards || []).map((card, cIdx) => (
              <div key={card.id || cIdx} className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => {
                      const updated = [...(partner.actionCards || [])];
                      updated[cIdx] = { ...updated[cIdx], title: e.target.value };
                      setPartner({ ...partner, actionCards: updated });
                    }}
                    placeholder="Card Title"
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-white font-bold focus:outline-none focus:border-teal-500"
                  />
                  <input
                    type="text"
                    value={card.enquiryType}
                    onChange={(e) => {
                      const updated = [...(partner.actionCards || [])];
                      updated[cIdx] = { ...updated[cIdx], enquiryType: e.target.value };
                      setPartner({ ...partner, actionCards: updated });
                    }}
                    placeholder="Enquiry Type"
                    className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-xs text-teal-300 focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>
                <input
                  type="text"
                  value={card.description}
                  onChange={(e) => {
                    const updated = [...(partner.actionCards || [])];
                    updated[cIdx] = { ...updated[cIdx], description: e.target.value };
                    setPartner({ ...partner, actionCards: updated });
                  }}
                  placeholder="Card Subtitle"
                  className="w-full bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-[11px] text-slate-300 focus:outline-none focus:border-teal-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PART 2: ENQUIRY & CONNECT SECTION (Screenshot 002514.jpg) ── */}
      <div className="space-y-6 pt-8 border-t border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-black uppercase text-teal-400 tracking-wider">
              2. Connect & Send Us An Enquiry Form
            </h4>
            <p className="text-[11px] text-slate-400">
              Matches Screenshot 2026-10-10 002514.jpg (Contact info + interactive enquiry submission).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Tag Badge
            </label>
            <input
              type="text"
              value={enquiry.tag || ''}
              onChange={(e) => setEnquiry({ ...enquiry, tag: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Heading Title
            </label>
            <input
              type="text"
              value={enquiry.title || ''}
              onChange={(e) => setEnquiry({ ...enquiry, title: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
            Subtitle Description
          </label>
          <textarea
            rows={2}
            value={enquiry.subtitle || ''}
            onChange={(e) => setEnquiry({ ...enquiry, subtitle: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* 4 Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>Phone</span>
            </label>
            <input
              type="text"
              value={enquiry.phone || ''}
              onChange={(e) => setEnquiry({ ...enquiry, phone: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-teal-400" />
              <span>Email</span>
            </label>
            <input
              type="text"
              value={enquiry.email || ''}
              onChange={(e) => setEnquiry({ ...enquiry, email: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>Address</span>
            </label>
            <input
              type="text"
              value={enquiry.address || ''}
              onChange={(e) => setEnquiry({ ...enquiry, address: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>Working Hours</span>
            </label>
            <input
              type="text"
              value={enquiry.workingHours || ''}
              onChange={(e) => setEnquiry({ ...enquiry, workingHours: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        {/* Enquiry Types List */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-black uppercase text-teal-400 tracking-wider">
              Enquiry Types (Dropdown options)
            </h5>
            <button
              type="button"
              onClick={addEnquiryType}
              className="text-[10px] font-bold text-teal-300 hover:text-teal-200 bg-teal-500/10 hover:bg-teal-500/20 px-2.5 py-1 rounded border border-teal-500/20 flex items-center gap-1 transition"
            >
              <Plus className="w-3 h-3" />
              <span>Add Option</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(enquiry.enquiryTypes || []).map((type, tIdx) => (
              <div key={tIdx} className="flex items-center gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800">
                <input
                  type="text"
                  value={type}
                  onChange={(e) => {
                    const updated = [...(enquiry.enquiryTypes || [])];
                    updated[tIdx] = e.target.value;
                    setEnquiry({ ...enquiry, enquiryTypes: updated });
                  }}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={() => removeEnquiryType(tIdx)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 transition"
                  title="Remove option"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
