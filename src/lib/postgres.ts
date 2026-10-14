import { Pool, QueryResult } from 'pg';

let pool: Pool | null = null;

export function getPgPool(): Pool {
  if (!pool) {
    const connectionString =
      process.env.DATABASE_URL ||
      'postgresql://neondb_owner:npg_nSpm7PNkvg1O@ep-flat-mouse-b3kvds5b-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    pool.on('error', (err) => {
      console.error('[PostgreSQL] Unexpected error on idle client:', err);
    });
  }
  return pool;
}

// -------------------------------------------------------------
// 1. PAGE SECTIONS (Text, Image, Video for any page/component)
// -------------------------------------------------------------
export interface DbPageSection {
  page_slug: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  body_text: string | null;
  cta_text: string | null;
  cta_url: string | null;
  image_url: string | null;
  video_url: string | null;
  video_poster: string | null;
  extra_data: any;
  updated_at: string;
}

export async function getPageSections(pageSlug: string): Promise<Record<string, DbPageSection>> {
  const p = getPgPool();
  try {
    const res = await p.query<DbPageSection>(
      `SELECT * FROM page_sections WHERE page_slug = $1`,
      [pageSlug]
    );
    const map: Record<string, DbPageSection> = {};
    for (const row of res.rows) {
      map[row.section_key] = row;
    }
    return map;
  } catch (err) {
    console.error(`[PostgreSQL] Failed to get sections for page ${pageSlug}:`, err);
    return {};
  }
}

export async function upsertPageSection(
  pageSlug: string,
  sectionKey: string,
  data: Partial<DbPageSection>
): Promise<DbPageSection | null> {
  const p = getPgPool();
  try {
    const res = await p.query<DbPageSection>(
      `INSERT INTO page_sections (
        page_slug, section_key, title, subtitle, body_text,
        cta_text, cta_url, image_url, video_url, video_poster, extra_data, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
      ON CONFLICT (page_slug, section_key) DO UPDATE SET
        title = COALESCE(EXCLUDED.title, page_sections.title),
        subtitle = COALESCE(EXCLUDED.subtitle, page_sections.subtitle),
        body_text = COALESCE(EXCLUDED.body_text, page_sections.body_text),
        cta_text = COALESCE(EXCLUDED.cta_text, page_sections.cta_text),
        cta_url = COALESCE(EXCLUDED.cta_url, page_sections.cta_url),
        image_url = COALESCE(EXCLUDED.image_url, page_sections.image_url),
        video_url = COALESCE(EXCLUDED.video_url, page_sections.video_url),
        video_poster = COALESCE(EXCLUDED.video_poster, page_sections.video_poster),
        extra_data = COALESCE(EXCLUDED.extra_data, page_sections.extra_data),
        updated_at = NOW()
      RETURNING *`,
      [
        pageSlug,
        sectionKey,
        data.title ?? null,
        data.subtitle ?? null,
        data.body_text ?? null,
        data.cta_text ?? null,
        data.cta_url ?? null,
        data.image_url ?? null,
        data.video_url ?? null,
        data.video_poster ?? null,
        data.extra_data ? JSON.stringify(data.extra_data) : '{}',
      ]
    );
    return res.rows[0] || null;
  } catch (err) {
    console.error(`[PostgreSQL] Failed to upsert section ${pageSlug}/${sectionKey}:`, err);
    throw err;
  }
}

// -------------------------------------------------------------
// 2. PRODUCTS & MONOGRAPHS
// -------------------------------------------------------------
export interface DbProductRow {
  id: string;
  slug: string;
  brand_name: string;
  generic_name: string;
  strength: string | null;
  dosage_form: string | null;
  route: string | null;
  therapeutic_area: string | null;
  tagline: string | null;
  packshot_image: string | null;
  product_video_url: string | null;
  has_full_monograph: boolean;
  is_featured: boolean;
  data: any;
  updated_at: string;
}

export async function getAllProducts(): Promise<DbProductRow[]> {
  const p = getPgPool();
  try {
    const res = await p.query<DbProductRow>(
      `SELECT * FROM products ORDER BY brand_name ASC`
    );
    return res.rows;
  } catch (err) {
    console.error('[PostgreSQL] Failed to get all products:', err);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<DbProductRow | null> {
  const p = getPgPool();
  try {
    const res = await p.query<DbProductRow>(
      `SELECT * FROM products WHERE slug = $1 LIMIT 1`,
      [slug]
    );
    return res.rows[0] || null;
  } catch (err) {
    console.error(`[PostgreSQL] Failed to get product ${slug}:`, err);
    return null;
  }
}

export async function upsertProduct(product: Partial<DbProductRow> & { id: string; slug: string; brand_name: string; generic_name: string }): Promise<DbProductRow> {
  const p = getPgPool();
  const res = await p.query<DbProductRow>(
    `INSERT INTO products (
      id, slug, brand_name, generic_name, strength, dosage_form, route,
      therapeutic_area, tagline, packshot_image, product_video_url,
      has_full_monograph, is_featured, data, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, NOW())
    ON CONFLICT (id) DO UPDATE SET
      slug = EXCLUDED.slug,
      brand_name = EXCLUDED.brand_name,
      generic_name = EXCLUDED.generic_name,
      strength = EXCLUDED.strength,
      dosage_form = EXCLUDED.dosage_form,
      route = EXCLUDED.route,
      therapeutic_area = EXCLUDED.therapeutic_area,
      tagline = EXCLUDED.tagline,
      packshot_image = EXCLUDED.packshot_image,
      product_video_url = EXCLUDED.product_video_url,
      has_full_monograph = EXCLUDED.has_full_monograph,
      is_featured = EXCLUDED.is_featured,
      data = EXCLUDED.data,
      updated_at = NOW()
    RETURNING *`,
    [
      product.id,
      product.slug,
      product.brand_name,
      product.generic_name,
      product.strength || '',
      product.dosage_form || '',
      product.route || '',
      product.therapeutic_area || '',
      product.tagline || '',
      product.packshot_image || '',
      product.product_video_url || '',
      product.has_full_monograph ?? true,
      product.is_featured ?? false,
      JSON.stringify(product.data || {})
    ]
  );
  return res.rows[0];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const p = getPgPool();
  const res = await p.query(`DELETE FROM products WHERE id = $1`, [id]);
  return (res.rowCount ?? 0) > 0;
}

// -------------------------------------------------------------
// 3. PRESCRIBING INFORMATION (PI)
// -------------------------------------------------------------
export interface DbPrescribingRow {
  id: string;
  slug: string;
  brand_name: string;
  generic_name: string;
  therapeutic_class: string | null;
  category: string | null;
  composition: string | null;
  product_image: string | null;
  data: any;
  updated_at: string;
}

export async function getAllPrescribingInfo(): Promise<DbPrescribingRow[]> {
  const p = getPgPool();
  try {
    const res = await p.query<DbPrescribingRow>(
      `SELECT * FROM prescribing_info ORDER BY brand_name ASC`
    );
    return res.rows;
  } catch (err) {
    console.error('[PostgreSQL] Failed to get prescribing info:', err);
    return [];
  }
}

export async function upsertPrescribingInfo(item: Partial<DbPrescribingRow> & { id: string; brand_name: string }): Promise<DbPrescribingRow> {
  const p = getPgPool();
  const res = await p.query<DbPrescribingRow>(
    `INSERT INTO prescribing_info (
      id, slug, brand_name, generic_name, therapeutic_class, category,
      composition, product_image, data, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
    ON CONFLICT (id) DO UPDATE SET
      slug = EXCLUDED.slug,
      brand_name = EXCLUDED.brand_name,
      generic_name = EXCLUDED.generic_name,
      therapeutic_class = EXCLUDED.therapeutic_class,
      category = EXCLUDED.category,
      composition = EXCLUDED.composition,
      product_image = EXCLUDED.product_image,
      data = EXCLUDED.data,
      updated_at = NOW()
    RETURNING *`,
    [
      item.id,
      item.slug || item.id,
      item.brand_name,
      item.generic_name || '',
      item.therapeutic_class || '',
      item.category || '',
      item.composition || '',
      item.product_image || '',
      JSON.stringify(item.data || {})
    ]
  );
  return res.rows[0];
}

// -------------------------------------------------------------
// 4. THERAPEUTIC GUIDES
// -------------------------------------------------------------
export interface DbGuideRow {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  cover_image: string | null;
  data: any;
  updated_at: string;
}

export async function getAllGuides(): Promise<DbGuideRow[]> {
  const p = getPgPool();
  try {
    const res = await p.query<DbGuideRow>(
      `SELECT * FROM therapeutic_guides ORDER BY title ASC`
    );
    return res.rows;
  } catch (err) {
    console.error('[PostgreSQL] Failed to get therapeutic guides:', err);
    return [];
  }
}

export async function getGuideBySlug(slug: string): Promise<DbGuideRow | null> {
  const p = getPgPool();
  try {
    const res = await p.query<DbGuideRow>(
      `SELECT * FROM therapeutic_guides WHERE slug = $1 LIMIT 1`,
      [slug]
    );
    return res.rows[0] || null;
  } catch (err) {
    console.error(`[PostgreSQL] Failed to get guide ${slug}:`, err);
    return null;
  }
}

export async function upsertGuide(guide: Partial<DbGuideRow> & { id: string; slug: string; title: string }): Promise<DbGuideRow> {
  const p = getPgPool();
  const res = await p.query<DbGuideRow>(
    `INSERT INTO therapeutic_guides (
      id, slug, title, subtitle, cover_image, data, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, NOW())
    ON CONFLICT (id) DO UPDATE SET
      slug = EXCLUDED.slug,
      title = EXCLUDED.title,
      subtitle = EXCLUDED.subtitle,
      cover_image = EXCLUDED.cover_image,
      data = EXCLUDED.data,
      updated_at = NOW()
    RETURNING *`,
    [
      guide.id,
      guide.slug,
      guide.title,
      guide.subtitle || '',
      guide.cover_image || '',
      JSON.stringify(guide.data || {})
    ]
  );
  return res.rows[0];
}

// -------------------------------------------------------------
// 5. CLINICAL INSIGHTS
// -------------------------------------------------------------
export interface DbInsightRow {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  featured_image: string | null;
  data: any;
  updated_at: string;
}

export async function getAllInsights(): Promise<DbInsightRow[]> {
  const p = getPgPool();
  try {
    const res = await p.query<DbInsightRow>(
      `SELECT * FROM clinical_insights ORDER BY title ASC`
    );
    return res.rows;
  } catch (err) {
    console.error('[PostgreSQL] Failed to get clinical insights:', err);
    return [];
  }
}

export async function getInsightBySlug(slug: string): Promise<DbInsightRow | null> {
  const p = getPgPool();
  try {
    const res = await p.query<DbInsightRow>(
      `SELECT * FROM clinical_insights WHERE slug = $1 LIMIT 1`,
      [slug]
    );
    return res.rows[0] || null;
  } catch (err) {
    console.error(`[PostgreSQL] Failed to get insight ${slug}:`, err);
    return null;
  }
}

export async function upsertInsight(insight: Partial<DbInsightRow> & { id: string; slug: string; title: string }): Promise<DbInsightRow> {
  const p = getPgPool();
  const res = await p.query<DbInsightRow>(
    `INSERT INTO clinical_insights (
      id, slug, title, subtitle, featured_image, data, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, NOW())
    ON CONFLICT (id) DO UPDATE SET
      slug = EXCLUDED.slug,
      title = EXCLUDED.title,
      subtitle = EXCLUDED.subtitle,
      featured_image = EXCLUDED.featured_image,
      data = EXCLUDED.data,
      updated_at = NOW()
    RETURNING *`,
    [
      insight.id,
      insight.slug,
      insight.title,
      insight.subtitle || '',
      insight.featured_image || '',
      JSON.stringify(insight.data || {})
    ]
  );
  return res.rows[0];
}

// -------------------------------------------------------------
// 6. REFERENCE LIBRARY
// -------------------------------------------------------------
export interface DbLibraryRow {
  id: string;
  item_type: 'category' | 'topic';
  slug: string;
  title: string;
  image_url: string | null;
  data: any;
  updated_at: string;
}

export async function getReferenceLibraryItems(type?: 'category' | 'topic'): Promise<DbLibraryRow[]> {
  const p = getPgPool();
  try {
    if (type) {
      const res = await p.query<DbLibraryRow>(
        `SELECT * FROM reference_library WHERE item_type = $1 ORDER BY title ASC`,
        [type]
      );
      return res.rows;
    }
    const res = await p.query<DbLibraryRow>(
      `SELECT * FROM reference_library ORDER BY title ASC`
    );
    return res.rows;
  } catch (err) {
    console.error('[PostgreSQL] Failed to get reference library items:', err);
    return [];
  }
}

export async function upsertReferenceItem(item: Partial<DbLibraryRow> & { id: string; item_type: 'category' | 'topic'; slug: string; title: string }): Promise<DbLibraryRow> {
  const p = getPgPool();
  const res = await p.query<DbLibraryRow>(
    `INSERT INTO reference_library (
      id, item_type, slug, title, image_url, data, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, NOW())
    ON CONFLICT (id) DO UPDATE SET
      item_type = EXCLUDED.item_type,
      slug = EXCLUDED.slug,
      title = EXCLUDED.title,
      image_url = EXCLUDED.image_url,
      data = EXCLUDED.data,
      updated_at = NOW()
    RETURNING *`,
    [
      item.id,
      item.item_type,
      item.slug,
      item.title,
      item.image_url || '',
      JSON.stringify(item.data || {})
    ]
  );
  return res.rows[0];
}
