import { RYAN_PRODUCTS } from '../data/ryan-products';
import {
  THERAPEUTIC_GUIDES_DATA,
  CLINICAL_INSIGHTS_DATA,
  REFERENCE_LIBRARY_CATEGORIES,
} from '../data/ryan-data';

export interface SiteSearchEntry {
  /** result group: product | guide | insight | library | page */
  t: string;
  title: string;
  sub: string;
  url: string;
  /** lowercase haystack for matching (trimmed) */
  keys: string;
}

function trim(s: string, n = 300): string {
  const one = (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  return one.length > n ? one.slice(0, n) : one;
}

/**
 * Compact client-side search index: products + therapeutic guides +
 * clinical insights + reference library + key pages. Built server-side
 * per request in route.ts; embedded as JSON for obagi-cms-sync.js.
 */
export function buildSiteSearchIndex(): SiteSearchEntry[] {
  const out: SiteSearchEntry[] = [];

  for (const p of RYAN_PRODUCTS) {
    out.push({
      t: 'product',
      title: p.brandName,
      sub: p.genericName,
      url: `/products/${p.slug}`,
      keys: trim(
        `${p.brandName} ${p.genericName} ${p.tagline} ${p.therapeuticArea} ${p.route} ${p.dosageForm} ${(p.composition || []).join(' ')} ${(p.indications || []).join(' ')} ${p.pharmacologicalClass}`
      ),
    });
  }

  for (const g of Object.values(THERAPEUTIC_GUIDES_DATA)) {
    out.push({
      t: 'guide',
      title: g.title,
      sub: g.category || 'Therapeutic Guide',
      url: `/for-doctors/therapeutic-resources/guides/${g.slug}`,
      keys: trim(`${g.title} ${g.subtitle} ${g.category} ${(g.overview?.keyPoints || []).join(' ')}`),
    });
  }

  for (const a of Object.values(CLINICAL_INSIGHTS_DATA)) {
    out.push({
      t: 'insight',
      title: a.title,
      sub: a.category || 'Clinical Insight',
      url: `/for-doctors/therapeutic-resources/insights/${a.slug}`,
      keys: trim(`${a.title} ${a.summary} ${a.category} ${a.author}`),
    });
  }

  for (const cat of Object.values(REFERENCE_LIBRARY_CATEGORIES)) {
    out.push({
      t: 'library',
      title: cat.name,
      sub: 'Reference Library',
      url: `/for-doctors/reference-library/${cat.slug}`,
      keys: trim(`${cat.name} ${cat.description}`),
    });
    for (const ref of [...(cat.conditionReferences || []), ...(cat.therapeuticReferences || [])]) {
      out.push({
        t: 'library',
        title: ref.title,
        sub: ref.subtitle || cat.name,
        url: `/for-doctors/reference-library/${cat.slug}/${ref.slug}`,
        keys: trim(`${ref.title} ${ref.subtitle} ${cat.name}`),
      });
    }
  }

  const pages: Array<[string, string, string]> = [
    ['About Ryan Dermaceutics', 'Company, vision & quality', '/about'],
    ['Product Catalog', 'All formulations & monographs', '/products'],
    ['For Doctors Portal', 'Clinical tools & resources', '/for-doctors'],
    ['Therapeutic Resources', 'Guides & clinical insights', '/for-doctors/therapeutic-resources'],
    ['Prescribing Information', 'Dosage & safety cards', '/for-doctors/prescribing-information'],
    ['Reference Library', 'Dermatology knowledge base', '/for-doctors/reference-library'],
    ['Medical Information', 'Safety queries & support', '/for-doctors/medical-information'],
  ];
  for (const [title, sub, url] of pages) {
    out.push({ t: 'page', title, sub, url, keys: trim(`${title} ${sub}`) });
  }

  return out;
}
