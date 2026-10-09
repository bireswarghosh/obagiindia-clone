import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';
import { ObagiHomeContent, defaultObagiHomeContent } from '@/data/obagi-home-content';

const IS_VERCEL = !!process.env.VERCEL;
const BLOB_URL = 'https://atlkh9ztzm3kfmnr.public.blob.vercel-storage.com/obagi-cms-data.json';
const BLOB_FILENAME = 'obagi-cms-data.json';
const DEFAULT_TOKEN = 'vercel_blob_rw_Atlkh9ZtzM3kfMnr_exDGXwl4vKdyHoPM82UEA8RW7gfjJa';

const LOCAL_DATA_DIR = path.join(process.cwd(), 'data');
const LOCAL_DATA_FILE = path.join(LOCAL_DATA_DIR, 'obagi-home-content.json');

const VERCEL_DATA_DIR = '/tmp/data';
const VERCEL_DATA_FILE = '/tmp/data/obagi-home-content.json';

let memoryCache: ObagiHomeContent | null = null;
let lastBlobFetchTime = 0;

function getActiveFilePath(): string {
  if (IS_VERCEL) {
    try {
      if (!fs.existsSync(VERCEL_DATA_DIR)) {
        fs.mkdirSync(VERCEL_DATA_DIR, { recursive: true });
      }
      if (!fs.existsSync(VERCEL_DATA_FILE)) {
        let initialData = defaultObagiHomeContent;
        if (fs.existsSync(LOCAL_DATA_FILE)) {
          try {
            initialData = JSON.parse(fs.readFileSync(LOCAL_DATA_FILE, 'utf8'));
          } catch (e) {}
        }
        fs.writeFileSync(VERCEL_DATA_FILE, JSON.stringify(initialData, null, 2), 'utf8');
      }
      return VERCEL_DATA_FILE;
    } catch (e) {
      console.warn('Failed setting up /tmp on Vercel:', e);
    }
  }

  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LOCAL_DATA_FILE)) {
      fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(defaultObagiHomeContent, null, 2), 'utf8');
    }
    return LOCAL_DATA_FILE;
  } catch (e) {
    return LOCAL_DATA_FILE;
  }
}

export function mergeWithDefaults(saved: any): ObagiHomeContent {
  if (!saved || typeof saved !== 'object') return { ...defaultObagiHomeContent };
  return {
    ...defaultObagiHomeContent,
    ...saved,
    header: { ...defaultObagiHomeContent.header, ...(saved.header || {}) },
    hero: { ...defaultObagiHomeContent.hero, ...(saved.hero || {}) },
    ticker: { ...defaultObagiHomeContent.ticker, ...(saved.ticker || {}) },
    history: { ...defaultObagiHomeContent.history, ...(saved.history || {}) },
    about: { ...defaultObagiHomeContent.about, ...(saved.about || {}) },
    trustBanner: {
      ...defaultObagiHomeContent.trustBanner,
      ...(saved.trustBanner || {}),
      pillars: saved.trustBanner?.pillars || defaultObagiHomeContent.trustBanner.pillars
    },
    research: {
      ...defaultObagiHomeContent.research,
      ...(saved.research || {}),
      tabs: saved.research?.tabs || defaultObagiHomeContent.research.tabs
    },
    products: {
      ...defaultObagiHomeContent.products,
      ...(saved.products || {}),
      systems: saved.products?.systems || defaultObagiHomeContent.products.systems
    },
    videoBanner: { ...defaultObagiHomeContent.videoBanner, ...(saved.videoBanner || {}) },
    quote: { ...defaultObagiHomeContent.quote, ...(saved.quote || {}) },
    numbers: {
      ...defaultObagiHomeContent.numbers,
      ...(saved.numbers || {}),
      stats: saved.numbers?.stats || defaultObagiHomeContent.numbers.stats
    },
    careers: {
      ...defaultObagiHomeContent.careers,
      ...(saved.careers || {}),
      jobs: saved.careers?.jobs || defaultObagiHomeContent.careers.jobs
    },
    press: {
      ...defaultObagiHomeContent.press,
      ...(saved.press || {}),
      items: saved.press?.items || defaultObagiHomeContent.press.items
    },
    newsletter: { ...defaultObagiHomeContent.newsletter, ...(saved.newsletter || {}) },
    footer: { ...defaultObagiHomeContent.footer, ...(saved.footer || {}) },
  };
}

export async function fetchFromBlob(): Promise<ObagiHomeContent | null> {
  try {
    const res = await fetch(BLOB_URL, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (data && (data.hero || data.header)) {
        const merged = mergeWithDefaults(data);
        memoryCache = merged;
        lastBlobFetchTime = Date.now();
        return merged;
      }
    }
  } catch (err) {
    // Blob not yet seeded or network error
  }
  return null;
}

export function getObagiHomeContentSync(): ObagiHomeContent {
  if (memoryCache) return memoryCache;

  try {
    const file = getActiveFilePath();
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed) {
        const merged = mergeWithDefaults(parsed);
        memoryCache = merged;
        return merged;
      }
    }
  } catch (err) {
    console.error('Failed reading obagi-home-content.json:', err);
  }

  return defaultObagiHomeContent;
}

export async function getObagiHomeContent(): Promise<ObagiHomeContent> {
  const now = Date.now();
  // Fetch from blob every 10 seconds or if no memory cache
  if (!memoryCache || now - lastBlobFetchTime > 10000) {
    const blobData = await fetchFromBlob();
    if (blobData) return blobData;
  }

  return getObagiHomeContentSync();
}

export async function saveObagiHomeContent(newContent: ObagiHomeContent): Promise<ObagiHomeContent> {
  const merged = mergeWithDefaults(newContent);
  memoryCache = merged;
  lastBlobFetchTime = Date.now();

  // 1. Write to local/server filesystem
  try {
    const file = getActiveFilePath();
    const tempFile = `${file}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(merged, null, 2), 'utf8');
    fs.renameSync(tempFile, file);
  } catch (err) {
    console.warn('Filesystem write failed, saved to memory cache:', err);
  }

  // 2. Write to Vercel Blob permanent cloud storage
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN || DEFAULT_TOKEN;
    await put(BLOB_FILENAME, JSON.stringify(merged, null, 2), {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
    });
  } catch (blobErr) {
    console.warn('Vercel Blob write error, retained in local/memory cache:', blobErr);
  }

  return merged;
}
