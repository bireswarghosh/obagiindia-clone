'use client';

import React, { useState, useEffect } from 'react';
import { History } from 'lucide-react';
import SectionShell from './SectionShell';
import RichColorTextEditor from '../RichColorTextEditor';
import { ObagiHomeContent } from '@/data/obagi-home-content';

interface SectionProps {
  loaded: ObagiHomeContent;
  triggerToast: (msg: string, type: 'success' | 'error') => void;
  onSaved: (updated: ObagiHomeContent) => void;
  patchSection: (patch: Partial<ObagiHomeContent>) => Promise<ObagiHomeContent | null>;
}

// Spec §04 — History Intro. Owns story.historyTitle + hero.historyIntroText
// (disjoint leaves; the Hero tab never sends historyIntroText).
export default function SectionHistoryIntro({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [title, setTitle] = useState(loaded.story.historyTitle);
  const [intro, setIntro] = useState(loaded.hero.historyIntroText);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(loaded.story.historyTitle);
    setIntro(loaded.hero.historyIntroText);
  }, [loaded.story, loaded.hero]);

  const dirty = title !== loaded.story.historyTitle || intro !== loaded.hero.historyIntroText;

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({ story: { historyTitle: title }, hero: { historyIntroText: intro } } as any);
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('History Intro saved successfully!', 'success');
    } else {
      triggerToast('Failed to save History Intro', 'error');
    }
  };

  return (
    <SectionShell
      icon={History}
      title="Part 4: History Intro"
      desc="The “Our History” heading and the 35+ years intro paragraph. Text only."
      saving={saving}
      onSave={save}
      dirty={dirty}
    >
      <RichColorTextEditor
        label="History Section Title"
        value={title}
        onChange={setTitle}
        description="Default: Our History"
      />
      <RichColorTextEditor
        label="History Intro Paragraph"
        multiline
        rows={5}
        value={intro}
        onChange={setIntro}
        description="The Ryan Dermaceutics / 35+ years narrative under the hero fold."
      />
    </SectionShell>
  );
}
