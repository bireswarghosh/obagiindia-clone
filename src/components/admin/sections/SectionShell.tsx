'use client';

import React from 'react';
import { Save, Loader2, LucideIcon } from 'lucide-react';

interface SectionShellProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  saving: boolean;
  onSave: () => void;
  children: React.ReactNode;
  /** Spec §2 — unsaved-changes indicator (section compares draft vs saved). */
  dirty?: boolean;
}

export default function SectionShell({
  icon: Icon,
  title,
  desc,
  saving,
  onSave,
  children,
  dirty = false
}: SectionShellProps) {
  return (
    <div className="space-y-6 bg-[#0f1b35] p-6 rounded-2xl border border-slate-800 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <Icon className="w-4 h-4 text-teal-400" />
            <span>{title}</span>
            {dirty && !saving && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase tracking-widest">
                Unsaved changes
              </span>
            )}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-teal-950 transition disabled:opacity-50 shrink-0 self-start sm:self-auto"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saving ? 'Saving...' : 'Save Section'}</span>
        </button>
      </div>

      <div className="space-y-6">{children}</div>

      <div className="border-t border-slate-800 pt-4 flex justify-end">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-teal-950 transition disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          <span>{saving ? 'Saving...' : 'Save Section'}</span>
        </button>
      </div>
    </div>
  );
}
