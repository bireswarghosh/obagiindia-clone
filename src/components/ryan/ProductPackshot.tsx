import React from 'react';
import { RyanProduct } from '@/data/ryan-products';

// Therapeutic-area accent colors for packshot illustrations
export const AREA_COLORS: Record<string, { text: string; pillA: string; pillB: string }> = {
  'Acne': { text: '#9F1239', pillA: '#9F1239', pillB: '#e35d7c' },
  'Antifungal': { text: '#9A3412', pillA: '#9A3412', pillB: '#e08a4e' },
  'Antibacterial': { text: '#991B1B', pillA: '#991B1B', pillB: '#e05c5c' },
  'Corticosteroids': { text: '#6B21A8', pillA: '#6B21A8', pillB: '#a06ee0' },
  'Allergy & Pruritus': { text: '#166534', pillA: '#166534', pillB: '#4caf7d' },
  'Immunomodulator': { text: '#3730A3', pillA: '#3730A3', pillB: '#7070e0' },
  'Pigmentation': { text: '#9D174D', pillA: '#9D174D', pillB: '#e0709c' },
  'Hair & Scalp': { text: '#075BE5', pillA: '#075BE5', pillB: '#4aa3f0' },
  'Anti-Parasitic': { text: '#92400E', pillA: '#92400E', pillB: '#d99a4e' },
  'Supportive Care': { text: '#334155', pillA: '#334155', pillB: '#7d93ad' },
};

/**
 * CSS packshot illustration matched to dosage form (tube / bottle /
 * pill-strip / box). Styling comes from .packshot/.pk-* classes.
 */
export function ProductPackshot({ product }: { product: RyanProduct }) {
  const c = AREA_COLORS[product.therapeuticArea] || AREA_COLORS['Supportive Care'];
  const short = product.brandName.length > 12 ? product.brandName.slice(0, 12) : product.brandName;
  const isTube = ['Cream', 'Ointment', 'Gel', 'Lotion'].includes(product.dosageForm);
  const isBottle = ['Solution', 'Syrup'].includes(product.dosageForm);
  const isPill = ['Tablet', 'Capsule', 'Softgel'].includes(product.dosageForm);
  return (
    <div className="packshot" aria-hidden="true">
      {isTube ? (
        <>
          <div className="pk-box mini"><span style={{ color: c.text }}>{short}</span></div>
          <div className="pk-tube">
            <span className="pk-cap" />
            <span className="pk-body"><b style={{ color: c.text }}>{short}</b><i /></span>
          </div>
        </>
      ) : isBottle ? (
        <>
          <div className="pk-box tall"><b style={{ color: c.text }}>{short}</b><i /><em>{product.dosageForm}</em></div>
          <div className="pk-bottle"><span className="pk-bcap" /><span className="pk-blabel"><b style={{ color: c.text }}>{short}</b></span></div>
        </>
      ) : isPill ? (
        <>
          <div className="pk-box tall"><b style={{ color: c.text }}>{short}</b><i /><em>{product.packSize}</em></div>
          <div className="pk-pill"><span className="half a" style={{ background: c.pillA }} /><span className="half b" style={{ background: c.pillB }} /></div>
        </>
      ) : (
        <>
          <div className="pk-box mini"><span style={{ color: c.text }}>{short}</span></div>
          <div className="pk-strip"><span /><span /><span /><span /><span /><span /></div>
        </>
      )}
    </div>
  );
}
