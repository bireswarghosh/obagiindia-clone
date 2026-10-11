'use client';

import React, { useState, useEffect } from 'react';
import { Images } from 'lucide-react';
import SectionShell from './SectionShell';
import ImageUploader from '../ImageUploader';
import { ObagiHomeContent } from '@/data/obagi-home-content';

interface SectionProps {
  loaded: ObagiHomeContent;
  triggerToast: (msg: string, type: 'success' | 'error') => void;
  onSaved: (updated: ObagiHomeContent) => void;
  patchSection: (patch: Partial<ObagiHomeContent>) => Promise<ObagiHomeContent | null>;
}

// Spec §05 — History/Story image gallery band [4]. DOM truth (audit9/10):
// each file renders in exactly ONE <img>. Slots 2–4 share their file with the
// hero drop / Hydration / hero award-badge slots (same file, one render) —
// noted below so two editors never surprise each other.
export default function SectionGallery({ loaded, triggerToast, onSaved, patchSection }: SectionProps) {
  const [img1, setImg1] = useState(loaded.story.historyImage);
  const [img2, setImg2] = useState(loaded.story.historyImage2 || '');
  const [img3, setImg3] = useState(loaded.story.historyImage3 || '');
  const [img4, setImg4] = useState(loaded.story.historyImage4 || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setImg1(loaded.story.historyImage);
    setImg2(loaded.story.historyImage2 || '');
    setImg3(loaded.story.historyImage3 || '');
    setImg4(loaded.story.historyImage4 || '');
  }, [loaded.story]);

  const dirty =
    img1 !== loaded.story.historyImage ||
    img2 !== (loaded.story.historyImage2 || '') ||
    img3 !== (loaded.story.historyImage3 || '') ||
    img4 !== (loaded.story.historyImage4 || '');

  const save = async () => {
    setSaving(true);
    const updated = await patchSection({
      story: { historyImage: img1, historyImage2: img2, historyImage3: img3, historyImage4: img4 },
    } as any);
    setSaving(false);
    if (updated) {
      onSaved(updated);
      triggerToast('Image Gallery saved successfully!', 'success');
    } else {
      triggerToast('Failed to save Gallery', 'error');
    }
  };

  return (
    <SectionShell
      icon={Images}
      title="Part 5: Image Gallery Band"
      desc="The 4 gallery files (Nu-Derm, dropper, Hydration, award). Each file renders once — shared-file slots are marked."
      saving={saving}
      onSave={save}
      dirty={dirty}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ImageUploader
          label="Gallery Image 1 (Nu-Derm)"
          value={img1}
          onChange={setImg1}
          description="Also the gallery-band background file. Independent slot."
        />
        <ImageUploader
          label="Gallery Image 2 (Dropper)"
          value={img2}
          onChange={setImg2}
          description="Shared file with the Hero drop image — same render, last save wins."
        />
        <ImageUploader
          label="Gallery Image 3 (Hydration)"
          value={img3}
          onChange={setImg3}
          description="Shared file with the About side image — same render, last save wins."
        />
        <ImageUploader
          label="Gallery Image 4 (Award)"
          value={img4}
          onChange={setImg4}
          description="Shared file with the Hero award-badge image — same render, last save wins."
        />
      </div>
    </SectionShell>
  );
}
