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

export default function SectionStory({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [local, setLocal] = useState(loaded.story);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLocal(loaded.story);
  }, [loaded.story]);

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({ story: local });
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('Story & History saved successfully!', 'success');
    } else {
      triggerToast('Failed to save Story', 'error');
    }
  };

  return (
    <SectionShell
      icon={BookOpen}
      title="Part 3: Our History & About Obagi Medical"
      desc="Control the history narrative, quote, about paragraphs, and all 4 heritage showcase images."
      saving={saving}
      onSave={save}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RichColorTextEditor
            label="Our History Section Title"
            value={local.historyTitle}
            onChange={(val) => setLocal({ ...local, historyTitle: val })}
            color={local.historyTitleColor}
            onColorChange={(col) => setLocal({ ...local, historyTitleColor: col })}
            description="Default: Our History"
          />

          <RichColorTextEditor
            label="About Obagi Medical Title"
            value={local.aboutTitle}
            onChange={(val) => setLocal({ ...local, aboutTitle: val })}
            color={local.aboutTitleColor}
            onColorChange={(col) => setLocal({ ...local, aboutTitleColor: col })}
            description="Default: About Obagi Medical"
          />
        </div>

        <div className="border-t border-slate-800 pt-6 space-y-4">
          <h4 className="text-xs font-black uppercase text-teal-400 tracking-wider">
            All 4 History Showcase Images (Annotation 6)
          </h4>
          <p className="text-xs text-slate-400">Upload or replace each of the 4 featured heritage images.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ImageUploader
              label="History Image 1 (Nu-Derm)"
              value={local.historyImage}
              onChange={(url) => setLocal({ ...local, historyImage: url })}
            />
            <ImageUploader
              label="History Image 2 (Dropper)"
              value={local.historyImage2 || ''}
              onChange={(url) => setLocal({ ...local, historyImage2: url })}
            />
            <ImageUploader
              label="History Image 3 (HydrateLuxe)"
              value={local.historyImage3 || ''}
              onChange={(url) => setLocal({ ...local, historyImage3: url })}
            />
            <ImageUploader
              label="History Image 4 (Awards)"
              value={local.historyImage4 || ''}
              onChange={(url) => setLocal({ ...local, historyImage4: url })}
            />
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 space-y-6">
          <RichColorTextEditor
            label="About Obagi Quote Banner"
            multiline
            rows={3}
            value={local.aboutQuote}
            onChange={(val) => setLocal({ ...local, aboutQuote: val })}
            color={local.aboutQuoteColor}
            onColorChange={(col) => setLocal({ ...local, aboutQuoteColor: col })}
            description="Featured quote: “We are a complete skin care company...”"
          />

          <RichColorTextEditor
            label="About Obagi Detailed Paragraph"
            multiline
            rows={5}
            value={local.aboutParagraph}
            onChange={(val) => setLocal({ ...local, aboutParagraph: val })}
            color={local.aboutParagraphColor}
            onColorChange={(col) => setLocal({ ...local, aboutParagraphColor: col })}
            description="Full narrative explaining Fitzpatrick skin types and results."
          />

          <ImageUploader
            label="About Obagi Section Banner / Side Image"
            value={local.aboutImage}
            onChange={(url) => setLocal({ ...local, aboutImage: url })}
            description="Banner image rendered alongside the About Obagi story block."
          />
        </div>
      </div>
    </SectionShell>
  );
}
