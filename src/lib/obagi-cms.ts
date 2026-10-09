import fs from 'fs';
import path from 'path';
import { ObagiHomeContent, defaultObagiHomeContent } from '@/data/obagi-home-content';

const IS_VERCEL = !!process.env.VERCEL;
const LOCAL_DATA_DIR = path.join(process.cwd(), 'data');
const LOCAL_DATA_FILE = path.join(LOCAL_DATA_DIR, 'obagi-home-content.json');

const VERCEL_DATA_DIR = '/tmp/data';
const VERCEL_DATA_FILE = '/tmp/data/obagi-home-content.json';

let memoryCache: ObagiHomeContent | null = null;

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

export function getObagiHomeContent(): ObagiHomeContent {
  try {
    const file = getActiveFilePath();
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, 'utf8');
      const parsed = JSON.parse(raw);
      if (parsed && parsed.hero) {
        memoryCache = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed reading obagi-home-content.json:', err);
  }

  if (memoryCache) return memoryCache;
  return defaultObagiHomeContent;
}

export function saveObagiHomeContent(newContent: ObagiHomeContent): ObagiHomeContent {
  try {
    const file = getActiveFilePath();
    const tempFile = `${file}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(newContent, null, 2), 'utf8');
    fs.renameSync(tempFile, file);
  } catch (err) {
    console.warn('Filesystem write failed, saved to memory cache:', err);
  }

  memoryCache = newContent;
  return newContent;
}
