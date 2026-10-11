'use client';

import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import SectionShell from './SectionShell';
import ImageUploader from '../ImageUploader';
import RichColorTextEditor from '../RichColorTextEditor';
import { ObagiHomeContent } from '@/data/obagi-home-content';

interface SectionProps {
  loaded: ObagiHomeContent;
  triggerToast: (msg: string, type: 'success' | 'error') => void;
  onSaved: (updated: ObagiHomeContent) => void;
  patchSection: (patch: Partial<ObagiHomeContent>) => Promise<ObagiHomeContent | null>;
}

export default function SectionHeader({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [local, setLocal] = useState(loaded.header ?? { logoUrl: '', navMenu: [] });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocal(loaded.header ?? { logoUrl: '', navMenu: [] });
  }, [loaded.header]);

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({ header: local });
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('Header Nav & Logo saved successfully!', 'success');
    } else {
      triggerToast('Failed to save Header', 'error');
    }
  };

  // DESIGN LOCK: nav labels are editable text; destinations, item count and
  // dropdown structure are frozen (add/remove/link editing removed).
  const baseHeader = loaded.header ?? { logoUrl: '', navMenu: [] };
  const dirty = JSON.stringify(local) !== JSON.stringify(baseHeader);

  return (
    <SectionShell
      icon={Layers}
      title="Part 1: Header & Navigation"
      desc="Logo, nav labels and header utility labels (skip link, SPECTRA strip, search/menu). Text only — destinations frozen."
      saving={saving}
      onSave={save}
      dirty={dirty}
    >
      <div className="space-y-4">
        <ImageUploader
          label="Header Brand Logo (PNG / SVG)"
          value={local.logoUrl || ''}
          onChange={(url) => setLocal({ ...local, logoUrl: url })}
          description="Uploaded logo image replaces the default vector logo in the navbar."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
        <RichColorTextEditor
          label="Skip-to-Content Label"
          value={local.skipToContentLabel || ''}
          onChange={(val) => setLocal({ ...local, skipToContentLabel: val })}
          description="Default: Skip to Main Content. Empty = keep original."
        />
        <RichColorTextEditor
          label="SPECTRA Strip Label"
          value={local.broughtToIndiaByText || ''}
          onChange={(val) => setLocal({ ...local, broughtToIndiaByText: val })}
          description="Default: Brought to you in India by SPECTRA. Link destination frozen."
        />
        <RichColorTextEditor
          label="Search Button Label"
          value={local.searchLabel || ''}
          onChange={(val) => setLocal({ ...local, searchLabel: val })}
          description="Accessibility label of the search button. Empty = keep original."
        />
        <RichColorTextEditor
          label="Menu Button Label"
          value={local.menuLabel || ''}
          onChange={(val) => setLocal({ ...local, menuLabel: val })}
          description="Shared by desktop + mobile menu buttons (kept in sync). Empty = keep original."
        />
      </div>

      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div>
          <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider">
            Navbar Labels (text only)
          </h4>
          <p className="text-[11px] text-slate-400">
            Menu labels and dropdown labels are editable. Destinations, order and
            menu structure are locked to preserve the approved design.
          </p>
        </div>

        <div className="space-y-4">
          {(local.navMenu || []).map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-teal-400 font-bold w-6 text-center">#{idx + 1}</span>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">Label</label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => {
                      const updated = [...(local.navMenu || [])];
                      updated[idx] = { ...updated[idx], label: e.target.value };
                      setLocal({ ...local, navMenu: updated });
                    }}
                    placeholder="e.g. Products"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Sub-menu Dropdown Children — labels only, destinations locked */}
              {item.children && item.children.length > 0 && (
                <div className="pl-9 pr-2 pt-2 border-t border-slate-800/80 space-y-2">
                  <div className="text-[11px] font-bold text-teal-400/90">
                    <span>Dropdown Labels ({item.children?.length || 0}) — destinations locked</span>
                  </div>
                  <div className="space-y-2">
                    {item.children.map((child, cIdx) => (
                      <div key={cIdx} className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                        <span className="text-[9px] text-slate-500 font-mono w-4 text-center">{cIdx + 1}</span>
                        <input
                          type="text"
                          value={child.label}
                          onChange={(e) => {
                            const updated = [...(local.navMenu || [])];
                            const pItem = { ...updated[idx] };
                            const chList = [...(pItem.children || [])];
                            chList[cIdx] = { ...chList[cIdx], label: e.target.value };
                            pItem.children = chList;
                            updated[idx] = pItem;
                            setLocal({ ...local, navMenu: updated });
                          }}
                          placeholder="Sub link text (e.g. Skin Concerns)"
                          className="flex-1 bg-slate-800/90 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-teal-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
