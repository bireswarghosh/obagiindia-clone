'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
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

// Spec §06 — About Obagi Medical. Leaf-only PATCH (gallery/history tabs own
// the other story.* leaves and never collide with these).
export default function SectionAbout({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [local, setLocal] = useState({
    aboutTitle: loaded.story.aboutTitle,
    aboutQuote: loaded.story.aboutQuote,
    aboutParagraph: loaded.story.aboutParagraph,
    aboutImage: loaded.story.aboutImage,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocal({
      aboutTitle: loaded.story.aboutTitle,
      aboutQuote: loaded.story.aboutQuote,
      aboutParagraph: loaded.story.aboutParagraph,
      aboutImage: loaded.story.aboutImage,
    });
  }, [loaded.story]);

  const base = {
    aboutTitle: loaded.story.aboutTitle,
    aboutQuote: loaded.story.aboutQuote,
    aboutParagraph: loaded.story.aboutParagraph,
    aboutImage: loaded.story.aboutImage,
  };
  const dirty = JSON.stringify(local) !== JSON.stringify(base);

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({ story: local } as any);
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('About Obagi saved successfully!', 'success');
    } else {
      triggerToast('Failed to save About', 'error');
    }
  };

  return (
    <SectionShell
      icon={BookOpen}
      title="Part 6: About Obagi Medical"
      desc="Heading, quote, main paragraph and the side product image. Existing inline emphasis is preserved."
      saving={saving}
      onSave={save}
      dirty={dirty}
    >
      <RichColorTextEditor
        label="About Heading"
        value={local.aboutTitle}
        onChange={(v) => setLocal({ ...local, aboutTitle: v })}
        description="Default: About Obagi Medical"
      />
      <RichColorTextEditor
        label="About Quote"
        multiline
        rows={3}
        value={local.aboutQuote}
        onChange={(v) => setLocal({ ...local, aboutQuote: v })}
        description="Featured quote banner."
      />
      <RichColorTextEditor
        label="About Paragraph"
        multiline
        rows={5}
        value={local.aboutParagraph}
        onChange={(v) => setLocal({ ...local, aboutParagraph: v })}
        description="Full Fitzpatrick / results narrative."
      />
      <ImageUploader
        label="About Side Image (obagi product slot)"
        value={local.aboutImage}
        onChange={(v) => setLocal({ ...local, aboutImage: v })}
        description="Independent slot. Empty = keep original photo."
      />
    </SectionShell>
  );
}
