'use client';

import React, { useState, useEffect } from 'react';
import { Megaphone } from 'lucide-react';
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

// Spec §03 — Trust Marquee. Leaf-only PATCH: pillars/concerns/slider keys are
// owned by the Pillars tab and are never sent from here (no stale-base wipe).
export default function SectionMarquee({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [ticker, setTicker] = useState(loaded.trustBanner.tickerText || '');
  const [bg, setBg] = useState(loaded.trustBanner.marqueeBgImage || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTicker(loaded.trustBanner.tickerText || '');
    setBg(loaded.trustBanner.marqueeBgImage || '');
  }, [loaded.trustBanner]);

  const dirty =
    ticker !== (loaded.trustBanner.tickerText || '') ||
    bg !== (loaded.trustBanner.marqueeBgImage || '');

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({ trustBanner: { tickerText: ticker, marqueeBgImage: bg } as any });
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('Trust Marquee saved successfully!', 'success');
    } else {
      triggerToast('Failed to save Marquee', 'error');
    }
  };

  return (
    <SectionShell
      icon={Megaphone}
      title="Part 3: Trust Marquee / Clinical Claims"
      desc="Edit the scrolling ticker text and its strip background. Marquee animation, speed and timing are frozen by design lock."
      saving={saving}
      onSave={save}
      dirty={dirty}
    >
      <RichColorTextEditor
        label="Ticker Text (all segments, | separated)"
        multiline
        rows={3}
        value={ticker}
        onChange={setTicker}
        description="One shared text node feeds all 4 loop copies. Per-segment editing is impossible without changing DOM structure (design lock). Empty = keep original."
      />
      <ImageUploader
        label="Marquee Strip Background Image"
        value={bg}
        onChange={setBg}
        description="URL-only swap on #bgLayers_comp-mlqkez2p. Empty = keep original."
      />
    </SectionShell>
  );
}
