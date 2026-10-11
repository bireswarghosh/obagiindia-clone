'use client';

import React, { useState, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import SectionShell from './SectionShell';
import ImageUploader from '../ImageUploader';
import { ObagiHomeContent } from '@/data/obagi-home-content';

interface SectionProps {
  loaded: ObagiHomeContent;
  triggerToast: (msg: string, type: 'success' | 'error') => void;
  onSaved: (updated: ObagiHomeContent) => void;
  patchSection: (patch: Partial<ObagiHomeContent>) => Promise<ObagiHomeContent | null>;
}

// Spec §14 — footer background asset (independent field).
export default function SectionFooterBg({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [bg, setBg] = useState(loaded.footer.backgroundImage || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setBg(loaded.footer.backgroundImage || '');
  }, [loaded.footer]);

  const dirty = bg !== (loaded.footer.backgroundImage || '');

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({ footer: { backgroundImage: bg } } as any);
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('Footer Background saved successfully!', 'success');
    } else {
      triggerToast('Failed to save Footer Background', 'error');
    }
  };

  return (
    <SectionShell
      icon={ImageIcon}
      title="Part 14: Footer Background"
      desc="Footer backdrop (URL swap only — the CSS that renders it is never touched). Empty = keep original."
      saving={saving}
      onSave={save}
      dirty={dirty}
    >
      <ImageUploader
        label="Footer Background Image"
        value={bg}
        onChange={setBg}
      />
    </SectionShell>
  );
}
