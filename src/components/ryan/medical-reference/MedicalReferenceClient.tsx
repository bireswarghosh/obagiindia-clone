'use client';

import React from 'react';
import MedicalReferenceView from './MedicalReferenceView';
import { MEDICAL_REF_CSS, MEDICAL_REF_HTML } from './content';

export default function MedicalReferenceClient() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <MedicalReferenceView html={MEDICAL_REF_HTML} css={MEDICAL_REF_CSS} />
    </div>
  );
}
