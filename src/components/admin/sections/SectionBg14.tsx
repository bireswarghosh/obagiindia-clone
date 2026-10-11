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

// Spec §13 — annotation-14 background (newsletter section layer).
export default function SectionBg14({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [bg, setBg] = useState(loaded.newsletter.backgroundImage || loaded.mediaSlots?.slot14BackgroundImage || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setBg(loaded.newsletter.backgroundImage || loaded.mediaSlots?.slot14BackgroundImage || '');
  }, [loaded.newsletter, loaded.mediaSlots]);

  const base = loaded.newsletter.backgroundImage || loaded.mediaSlots?.slot14BackgroundImage || '';
  const dirty = bg !== base;

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({ newsletter: { backgroundImage: bg } } as any);
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('Section-14 Background saved successfully!', 'success');
    } else {
      triggerToast('Failed to save Background', 'error');
    }
  };

  return (
    <SectionShell
      icon={ImageIcon}
      title="Part 13: Section-14 Background"
      desc="Background layer behind the newsletter band (URL swap only — size/position/crop untouched). Empty = keep original."
      saving={saving}
      onSave={save}
      dirty={dirty}
    >
      <ImageUploader
        label="Newsletter Band Background Image"
        value={bg}
        onChange={setBg}
      />
    </SectionShell>
  );
}
