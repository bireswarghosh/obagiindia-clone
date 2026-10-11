'use client';

import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import SectionShell from './SectionShell';
import RichColorTextEditor from '../RichColorTextEditor';
import ImageUploader from '../ImageUploader';
import { ObagiHomeContent } from '@/data/obagi-home-content';

interface SectionProps {
  loaded: ObagiHomeContent;
  triggerToast: (msg: string, type: 'success' | 'error') => void;
  onSaved: (updated: ObagiHomeContent) => void;
  patchSection: (patch: Partial<ObagiHomeContent>) => Promise<ObagiHomeContent | null>;
}

// Spec §07 — Pillars. Leaf-only PATCH: tickerText/marqueeBgImage are owned by
// the Marquee tab and never sent from here (no stale-base wipe possible).
export default function SectionPillars({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [local, setLocal] = useState({
    recommendedHeading: loaded.trustBanner.recommendedHeading,
    concernsText: loaded.trustBanner.concernsText,
    sliderBgImage: loaded.trustBanner.sliderBgImage || '',
    pillars: loaded.trustBanner.pillars,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocal({
      recommendedHeading: loaded.trustBanner.recommendedHeading,
      concernsText: loaded.trustBanner.concernsText,
      sliderBgImage: loaded.trustBanner.sliderBgImage || '',
      pillars: loaded.trustBanner.pillars,
    });
  }, [loaded.trustBanner]);

  const base = {
    recommendedHeading: loaded.trustBanner.recommendedHeading,
    concernsText: loaded.trustBanner.concernsText,
    sliderBgImage: loaded.trustBanner.sliderBgImage || '',
    pillars: loaded.trustBanner.pillars,
  };
  const dirty = JSON.stringify(local) !== JSON.stringify(base);

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({ trustBanner: local } as any);
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('#1 Brand Banner & Pillars saved successfully!', 'success');
    } else {
      triggerToast('Failed to save Pillars', 'error');
    }
  };

  return (
    <SectionShell
      icon={Award}
      title="Part 7: #1 Brand Banner & The 4 Core Pillars"
      desc="Brand claim, skin-concerns copy, slider background and each pillar. Ticker text lives in the Marquee tab; carousel timing is frozen."
      saving={saving}
      onSave={save}
      dirty={dirty}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RichColorTextEditor
          label="Leading Brand Heading"
          value={local.recommendedHeading}
          onChange={(val) => setLocal({ ...local, recommendedHeading: val })}
          description="Default: #1 Leading U.S. Physician Recommended Brand*"
        />
        <RichColorTextEditor
          label="Top 3 Skin Concerns Text"
          value={local.concernsText}
          onChange={(val) => setLocal({ ...local, concernsText: val })}
          description="List of concerns displayed alongside the recommendation badge."
        />
      </div>

      <ImageUploader
        label="Pillars Slider Background Image"
        value={local.sliderBgImage}
        onChange={(url) => setLocal({ ...local, sliderBgImage: url })}
        description="URL-only swap. Empty = keep original."
      />

      <div className="border-t border-slate-800 pt-6 space-y-4">
        <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider">
          The 4 Core Brand Pillars
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {local.pillars.map((pillar, idx) => (
            <div key={pillar.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">
                Pillar #{idx + 1}
              </span>
              <RichColorTextEditor
                label="Pillar Title"
                value={pillar.title}
                onChange={(val) => {
                  const updated = [...local.pillars];
                  updated[idx] = { ...updated[idx], title: val };
                  setLocal({ ...local, pillars: updated });
                }}
              />
              <RichColorTextEditor
                label="Pillar Description"
                multiline
                rows={3}
                value={pillar.description}
                onChange={(val) => {
                  const updated = [...local.pillars];
                  updated[idx] = { ...updated[idx], description: val };
                  setLocal({ ...local, pillars: updated });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
