'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import SectionShell from './SectionShell';
import RichColorTextEditor from '../RichColorTextEditor';
import ImageUploader from '../ImageUploader';
import MediaInput from '../MediaInput';
import { ObagiHomeContent } from '@/data/obagi-home-content';

interface SectionProps {
  loaded: ObagiHomeContent;
  triggerToast: (msg: string, type: 'success' | 'error') => void;
  onSaved: (updated: ObagiHomeContent) => void;
  patchSection: (patch: Partial<ObagiHomeContent>) => Promise<ObagiHomeContent | null>;
}

// Spec §02 — Hero text + hero video. Gallery images live in the Gallery tab
// and history intro in the History tab (disjoint leaves — this tab never
// sends those keys, so saving here can never reset them).
export default function SectionHero({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [local, setLocal] = useState({
    title: loaded.hero.title,
    awardBadge: loaded.hero.awardBadge,
    heroVideoUrl: loaded.hero.heroVideoUrl || '',
    heroVideoPoster: loaded.hero.heroVideoPoster || '',
    backgroundImage: loaded.hero.backgroundImage || '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocal({
      title: loaded.hero.title,
      awardBadge: loaded.hero.awardBadge,
      heroVideoUrl: loaded.hero.heroVideoUrl || '',
      heroVideoPoster: loaded.hero.heroVideoPoster || '',
      backgroundImage: loaded.hero.backgroundImage || '',
    });
  }, [loaded.hero]);

  const base = {
    title: loaded.hero.title,
    awardBadge: loaded.hero.awardBadge,
    heroVideoUrl: loaded.hero.heroVideoUrl || '',
    heroVideoPoster: loaded.hero.heroVideoPoster || '',
    backgroundImage: loaded.hero.backgroundImage || '',
  };
  const dirty = JSON.stringify(local) !== JSON.stringify(base);

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({ hero: local } as any);
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('Hero Section saved successfully!', 'success');
    } else {
      triggerToast('Failed to save Hero Section', 'error');
    }
  };

  return (
    <SectionShell
      icon={Sparkles}
      title="Part 2: Hero Text & Video"
      desc="Main title, awards badge text and the hero background video. Gallery images are edited in the Gallery tab."
      saving={saving}
      onSave={save}
      dirty={dirty}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RichColorTextEditor
          label="Hero Main Title"
          value={local.title}
          onChange={(val) => setLocal({ ...local, title: val })}
          description="Primary headline (Default: Obagi® Medical India)"
        />
        <RichColorTextEditor
          label="Aesthetic Awards Badge"
          multiline
          rows={3}
          value={local.awardBadge}
          onChange={(val) => setLocal({ ...local, awardBadge: val })}
          description="WINNER 2025 badge text"
        />
      </div>

      <div className="border-t border-slate-800 pt-6 space-y-4">
        <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider">
          Hero Background Video (existing slot only)
        </h4>
        <MediaInput
          label="Hero Video File (MP4/WebM)"
          value={local.heroVideoUrl}
          onChange={(url) => setLocal({ ...local, heroVideoUrl: url })}
          mediaType="video"
          placeholder="Upload MP4/WebM or paste https://..."
          helperText="Replaces ONLY the existing hero video source. Empty = keep original. Playback settings untouched."
        />
        <ImageUploader
          label="Hero Video Poster (optional)"
          value={local.heroVideoPoster}
          onChange={(url) => setLocal({ ...local, heroVideoPoster: url })}
          description="Poster shown before hero video loads. Empty = keep original."
        />
        <ImageUploader
          label="Hero Background Photo (optional)"
          value={local.backgroundImage}
          onChange={(url) => setLocal({ ...local, backgroundImage: url })}
          description="Background photo behind the hero band. Empty = keep original."
        />
      </div>
    </SectionShell>
  );
}
