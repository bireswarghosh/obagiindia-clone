'use client';

import React, { useState, useEffect } from 'react';
import { FlaskConical } from 'lucide-react';
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

export default function SectionResearch({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [local, setLocal] = useState(loaded.research);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocal(loaded.research);
  }, [loaded.research]);

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({ research: local });
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('R&D Science & Tabs saved successfully!', 'success');
    } else {
      triggerToast('Failed to save R&D', 'error');
    }
  };

  return (
    <SectionShell
      icon={FlaskConical}
      title="Part 4: Obagi Research & Development Science"
      desc="Update the R&D headline, description, blur background image, and all 4 innovation cards/tabs."
      saving={saving}
      onSave={save}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RichColorTextEditor
            label="R&D Section Title"
            value={local.rdTitle}
            onChange={(val) => setLocal({ ...local, rdTitle: val })}
            color={local.rdTitleColor}
            onColorChange={(col) => setLocal({ ...local, rdTitleColor: col })}
            description="Default: Obagi Research & Development"
          />

          <ImageUploader
            label="R&D Section Background Image (with blur)"
            value={local.rdBackgroundImage || ''}
            onChange={(url) => setLocal({ ...local, rdBackgroundImage: url })}
            description="High-resolution laboratory background image placed behind R&D section."
          />
        </div>

        <RichColorTextEditor
          label="R&D Detailed Description"
          multiline
          rows={4}
          value={local.rdDescription}
          onChange={(val) => setLocal({ ...local, rdDescription: val })}
          color={local.rdDescriptionColor}
          onColorChange={(col) => setLocal({ ...local, rdDescriptionColor: col })}
          description="Default: At Obagi, we believe skin care is about more than “correcting”..."
        />

        <div className="border-t border-slate-800 pt-6 space-y-4">
          <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider">
            All 4 R&D Science Cards / Tabs (Annotation 10)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {local.tabs.map((tab, idx) => (
              <div key={tab.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">
                  Tab #{idx + 1}
                </span>
                <RichColorTextEditor
                  label="Tab Title"
                  value={tab.title}
                  onChange={(val) => {
                    const updated = [...local.tabs];
                    updated[idx] = { ...updated[idx], title: val };
                    setLocal({ ...local, tabs: updated });
                  }}
                  color={tab.titleColor}
                  onColorChange={(col) => {
                    const updated = [...local.tabs];
                    updated[idx] = { ...updated[idx], titleColor: col };
                    setLocal({ ...local, tabs: updated });
                  }}
                />
                <RichColorTextEditor
                  label="Tab Description"
                  multiline
                  rows={3}
                  value={tab.description}
                  onChange={(val) => {
                    const updated = [...local.tabs];
                    updated[idx] = { ...updated[idx], description: val };
                    setLocal({ ...local, tabs: updated });
                  }}
                  color={tab.textColor}
                  onColorChange={(col) => {
                    const updated = [...local.tabs];
                    updated[idx] = { ...updated[idx], textColor: col };
                    setLocal({ ...local, tabs: updated });
                  }}
                />
                <ImageUploader
                  label="Tab Image"
                  value={tab.imageUrl}
                  onChange={(url) => {
                    const updated = [...local.tabs];
                    updated[idx] = { ...updated[idx], imageUrl: url };
                    setLocal({ ...local, tabs: updated });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
