'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import SectionShell from './SectionShell';
import RichColorTextEditor from '../RichColorTextEditor';
import { ObagiHomeContent } from '@/data/obagi-home-content';

interface SectionProps {
  loaded: ObagiHomeContent;
  triggerToast: (msg: string, type: 'success' | 'error') => void;
  onSaved: (updated: ObagiHomeContent) => void;
  patchSection: (patch: Partial<ObagiHomeContent>) => Promise<ObagiHomeContent | null>;
}

export default function SectionNumbers({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [local, setLocal] = useState(loaded.numbers);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocal(loaded.numbers);
  }, [loaded.numbers]);

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({ numbers: local });
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('Numbers & Stats saved successfully!', 'success');
    } else {
      triggerToast('Failed to save Numbers', 'error');
    }
  };

  return (
    <SectionShell
      icon={TrendingUp}
      title="Part 6: Key Numbers & Statistics (BGS in Numbers)"
      desc="Control the title and each of the 4 key statistical figures and labels."
      saving={saving}
      onSave={save}
    >
      <RichColorTextEditor
        label="Numbers Section Title"
        value={local.title}
        onChange={(val) => setLocal({ ...local, title: val })}
        color={local.titleColor}
        onColorChange={(col) => setLocal({ ...local, titleColor: col })}
        description="Default: BGS in Numbers"
      />

      <div className="border-t border-slate-800 pt-6 space-y-4">
        <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider">
          The 4 Key Figures
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {local.stats.map((stat, idx) => (
            <div key={stat.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">
                Stat #{idx + 1}
              </span>
              <RichColorTextEditor
                label="Stat Value"
                value={stat.value}
                onChange={(val) => {
                  const updated = [...local.stats];
                  updated[idx] = { ...updated[idx], value: val };
                  setLocal({ ...local, stats: updated });
                }}
                color={stat.valueColor}
                onColorChange={(col) => {
                  const updated = [...local.stats];
                  updated[idx] = { ...updated[idx], valueColor: col };
                  setLocal({ ...local, stats: updated });
                }}
              />
              <RichColorTextEditor
                label="Stat Label"
                value={stat.label}
                onChange={(val) => {
                  const updated = [...local.stats];
                  updated[idx] = { ...updated[idx], label: val };
                  setLocal({ ...local, stats: updated });
                }}
                color={stat.labelColor}
                onColorChange={(col) => {
                  const updated = [...local.stats];
                  updated[idx] = { ...updated[idx], labelColor: col };
                  setLocal({ ...local, stats: updated });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
