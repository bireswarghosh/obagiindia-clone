import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

// Load .env.local if present
const envPath = path.join(process.cwd(), '.env.local');
let databaseUrl = process.env.DATABASE_URL;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('DATABASE_URL=')) {
      databaseUrl = trimmed.substring('DATABASE_URL='.length).replace(/^["']|["']$/g, '');
    }
  }
}

if (!databaseUrl) {
  console.error('DATABASE_URL not found!');
  process.exit(1);
}

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  console.log('Connecting to Neon PostgreSQL...');
  const client = await pool.connect();
  try {
    console.log('Creating tables...');

    // 1. Page Sections table (Text, Image, Video for all page components)
    await client.query(`
      CREATE TABLE IF NOT EXISTS page_sections (
        page_slug VARCHAR(100) NOT NULL,
        section_key VARCHAR(100) NOT NULL,
        title TEXT,
        subtitle TEXT,
        body_text TEXT,
        cta_text VARCHAR(255),
        cta_url VARCHAR(500),
        image_url TEXT,
        video_url TEXT,
        video_poster TEXT,
        extra_data JSONB DEFAULT '{}'::jsonb,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        PRIMARY KEY (page_slug, section_key)
      );
    `);

    // 2. Products table (53 Ryan products)
    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(100) PRIMARY KEY,
        slug VARCHAR(150) UNIQUE NOT NULL,
        brand_name VARCHAR(255) NOT NULL,
        generic_name TEXT NOT NULL,
        strength VARCHAR(100),
        dosage_form VARCHAR(100),
        route VARCHAR(100),
        therapeutic_area VARCHAR(100),
        tagline TEXT,
        packshot_image TEXT,
        product_video_url TEXT,
        has_full_monograph BOOLEAN DEFAULT TRUE,
        is_featured BOOLEAN DEFAULT FALSE,
        data JSONB DEFAULT '{}'::jsonb,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // 3. Prescribing Information table (28+ items)
    await client.query(`
      CREATE TABLE IF NOT EXISTS prescribing_info (
        id VARCHAR(100) PRIMARY KEY,
        slug VARCHAR(150) UNIQUE NOT NULL,
        brand_name VARCHAR(255) NOT NULL,
        generic_name TEXT NOT NULL,
        therapeutic_class VARCHAR(150),
        category VARCHAR(100),
        composition TEXT,
        product_image TEXT,
        data JSONB DEFAULT '{}'::jsonb,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // 4. Therapeutic Guides table
    await client.query(`
      CREATE TABLE IF NOT EXISTS therapeutic_guides (
        id VARCHAR(100) PRIMARY KEY,
        slug VARCHAR(150) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        subtitle TEXT,
        cover_image TEXT,
        data JSONB DEFAULT '{}'::jsonb,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // 5. Clinical Insights table
    await client.query(`
      CREATE TABLE IF NOT EXISTS clinical_insights (
        id VARCHAR(100) PRIMARY KEY,
        slug VARCHAR(150) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        subtitle TEXT,
        featured_image TEXT,
        data JSONB DEFAULT '{}'::jsonb,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // 6. Reference Library table (categories and topics)
    await client.query(`
      CREATE TABLE IF NOT EXISTS reference_library (
        id VARCHAR(100) PRIMARY KEY,
        item_type VARCHAR(50) NOT NULL, -- 'category' or 'topic'
        slug VARCHAR(150) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        image_url TEXT,
        data JSONB DEFAULT '{}'::jsonb,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    console.log('All PostgreSQL tables created successfully!');
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch((e) => {
  console.error('Migration failed:', e);
  process.exit(1);
});
