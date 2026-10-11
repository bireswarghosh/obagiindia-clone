'use client';

import React, { useState, useEffect } from 'react';
import { FlaskConical } from 'lucide-react';
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

// Spec §08 — R&D intro. DOM truth: the genome file renders in ONE <img>, so
// foreground/background are one slot (spec: separate only IF separate).
export default function SectionRdIntro({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [title, setTitle] = useState(loaded.research.rdTitle);
  const [desc, setDesc] = useState(loaded.research.rdDescription);
  const [img, setImg] = useState(loaded.research.rdBackgroundImage || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(loaded.research.rdTitle);
    setDesc(loaded.research.rdDescription);
    setImg(loaded.research.rdBackgroundImage || '');
  }, [loaded.research]);

  const dirty =
    title !== loaded.research.rdTitle ||
    desc !== loaded.research.rdDescription ||
    img !== (loaded.research.rdBackgroundImage || '');

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({
      research: { rdTitle: title, rdDescription: desc, rdBackgroundImage: img },
    } as any);
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('R&D Intro saved successfully!', 'success');
    } else {
      triggerToast('Failed to save R&D Intro', 'error');
    }
  };

  return (
    <SectionShell
      icon={FlaskConical}
      title="Part 8: R&D Introduction"
      desc="R&D heading, intro paragraph and the lab image (single foreground/background slot). Blur/crop behavior untouched."
      saving={saving}
      onSave={save}
      dirty={dirty}
    >
      <RichColorTextEditor
        label="R&D Heading"
        value={title}
        onChange={setTitle}
        description="Default: Obagi Research & Development"
      />
      <RichColorTextEditor
        label="R&D Intro Paragraph"
        multiline
        rows={4}
        value={desc}
        onChange={setDesc}
      />
      <ImageUploader
        label="R&D Lab Image"
        value={img}
        onChange={setImg}
        description="Replaces the single genome lab image (foreground + blurred bg are one file). Empty = keep original."
      />
    </SectionShell>
  );
}
