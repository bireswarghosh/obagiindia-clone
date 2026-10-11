'use client';

import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
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

// Spec §10 — 3 product cards. No other tab touches `products`, so the whole
// object PATCH is isolation-safe. NOTE: `sectionTitle` has NO element in the
// served section [10] (audit11) and `collectionsBg` targets the gallery band
// (owned by the Gallery tab) — neither is editable here by design.
export default function SectionProducts({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [local, setLocal] = useState(loaded.products);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocal(loaded.products);
  }, [loaded.products]);

  const dirty = JSON.stringify(local) !== JSON.stringify(loaded.products);

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({ products: local });
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('Product Systems saved successfully!', 'success');
    } else {
      triggerToast('Failed to save Products', 'error');
    }
  };

  return (
    <SectionShell
      icon={Package}
      title="Part 10: Featured Product Systems"
      desc="The 3 product cards — image, title, subtitle and description each (Nu-Derm, Hydro-Drops, Nu-Cil). Card links stay frozen."
      saving={saving}
      onSave={save}
      dirty={dirty}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {local.systems.map((system, idx) => (
          <div key={system.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">
              Card #{idx + 1}
            </span>
            <RichColorTextEditor
              label="System Title"
              value={system.title}
              onChange={(val) => {
                const updated = [...local.systems];
                updated[idx] = { ...updated[idx], title: val };
                setLocal({ ...local, systems: updated });
              }}
            />
            <RichColorTextEditor
              label="Subtitle"
              value={system.subtitle}
              onChange={(val) => {
                const updated = [...local.systems];
                updated[idx] = { ...updated[idx], subtitle: val };
                setLocal({ ...local, systems: updated });
              }}
            />
            <RichColorTextEditor
              label="Description"
              multiline
              rows={3}
              value={system.description}
              onChange={(val) => {
                const updated = [...local.systems];
                updated[idx] = { ...updated[idx], description: val };
                setLocal({ ...local, systems: updated });
              }}
            />
            <ImageUploader
              label="Card Image"
              value={system.imageUrl}
              onChange={(url) => {
                const updated = [...local.systems];
                updated[idx] = { ...updated[idx], imageUrl: url };
                setLocal({ ...local, systems: updated });
              }}
            />
            {/* DESIGN LOCK: card destinations are frozen — no link editing. */}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
