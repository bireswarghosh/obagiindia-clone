'use client';

import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
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

// Spec §09 — one editor per DOM-backed card (4). Card 4 was cloned from
// card 3 as item-rdcard4 per TASK (unblocks 10.4).
export default function SectionRdCards({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [tabs, setTabs] = useState(loaded.research.tabs);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTabs(loaded.research.tabs);
  }, [loaded.research]);

  const dirty = JSON.stringify(tabs) !== JSON.stringify(loaded.research.tabs);

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({ research: { tabs } } as any);
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('R&D Cards saved successfully!', 'success');
    } else {
      triggerToast('Failed to save R&D Cards', 'error');
    }
  };

  return (
    <SectionShell
      icon={Layers}
      title="Part 9: R&D Cards"
      desc="Innovation / Process / Standards / Pipeline — image, title and description per card. 4 cards backed by DOM (item-rdcard4)."
      saving={saving}
      onSave={save}
      dirty={dirty}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {tabs.slice(0, 4).map((tab, idx) => (
          <div key={tab.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">
              Card #{idx + 1}
            </span>
            <RichColorTextEditor
              label="Card Title"
              value={tab.title}
              onChange={(val) => {
                const updated = [...tabs];
                updated[idx] = { ...updated[idx], title: val };
                setTabs(updated);
              }}
            />
            <RichColorTextEditor
              label="Card Description"
              multiline
              rows={3}
              value={tab.description}
              onChange={(val) => {
                const updated = [...tabs];
                updated[idx] = { ...updated[idx], description: val };
                setTabs(updated);
              }}
            />
            <ImageUploader
              label="Card Image"
              value={tab.imageUrl}
              onChange={(url) => {
                const updated = [...tabs];
                updated[idx] = { ...updated[idx], imageUrl: url };
                setTabs(updated);
              }}
            />
          </div>
        ))}
      </div>
      {tabs.length > 4 && (
        <p className="text-[11px] text-amber-300/90">
          Note: tabs beyond #4 have no DOM target — retained in data, never rendered.
        </p>
      )}
    </SectionShell>
  );
}
