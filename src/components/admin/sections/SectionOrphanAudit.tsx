'use client';

import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import SectionShell from './SectionShell';
import { OBAGI_FIELD_MANIFEST } from '@/data/obagi-field-manifest';

interface SectionProps {
  triggerToast: (msg: string, type: 'success' | 'error') => void;
}

// Spec §11 — Remaining Image Gallery / Background Media Group. DOM audit
// (scripts/dom-audit*.mjs) result: 19 <img> + 2 <video> + 21 bgLayers swept;
// every servable slot is owned by another tab (see manifest). This panel is
// read-only: nothing to save, so no Save writes anything.
export default function SectionOrphanAudit({ triggerToast }: SectionProps) {
  const rows = OBAGI_FIELD_MANIFEST;
  const bySection = rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.section] = (acc[r.section] || 0) + 1;
    return acc;
  }, {});

  return (
    <SectionShell
      icon={ClipboardCheck}
      title="Part 11: Remaining Gallery — Slot Audit"
      desc="Read-only. Every discovered image/video/background slot and the tab that owns it. Nothing here needs saving."
      saving={false}
      onSave={() => triggerToast('Nothing to save — all slots are owned by their own tabs.', 'success')}
    >
      <p className="text-xs text-slate-300 leading-relaxed">
        Full-document sweep: <strong>19</strong> <code>&lt;img&gt;</code> + <strong>2</strong>{' '}
        <code>&lt;video&gt;</code> + <strong>21</strong> <code>bgLayers_*</code> inventoried against{' '}
        <code>public/obagi.html</code>. Orphan (unowned) servable slots:{' '}
        <strong className="text-emerald-300">0</strong> — empty bg layers carry no image and stay
        out of scope with reason recorded in <code>OBAGI_CMS_FIELD_INVENTORY.md</code>.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {Object.entries(bySection).map(([sec, n]) => (
          <div key={sec} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="text-lg font-black text-teal-300">{n}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{sec}</div>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-slate-500">
        Removed template sections (BGS testimonial/numbers/jobs/press) have no public target and no
        editors — see implementation report. The 4th R&amp;D card stays BLOCKED (no DOM element).
      </p>
    </SectionShell>
  );
}
