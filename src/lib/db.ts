import fs from 'fs';
import path from 'path';
import { FullSiteData, Subscriber, ActivityLog } from '../types/content';
import { defaultSiteData } from '../data/default-content';

// Determine safe storage path: on Vercel or read-only environments, use /tmp or memory
const IS_VERCEL = !!process.env.VERCEL;
const LOCAL_DATA_DIR = path.join(process.cwd(), 'data');
const LOCAL_DATA_FILE = path.join(LOCAL_DATA_DIR, 'site-content.json');

const VERCEL_DATA_DIR = '/tmp/data';
const VERCEL_DATA_FILE = '/tmp/data/site-content.json';

// In-memory fallback cache
let memoryCache: FullSiteData | null = null;

function getActiveDataFilePath(): string {
  if (IS_VERCEL) {
    try {
      if (!fs.existsSync(VERCEL_DATA_DIR)) {
        fs.mkdirSync(VERCEL_DATA_DIR, { recursive: true });
      }
      if (!fs.existsSync(VERCEL_DATA_FILE)) {
        // Copy initial data if available in project
        let initialData = defaultSiteData;
        if (fs.existsSync(LOCAL_DATA_FILE)) {
          try {
            initialData = JSON.parse(fs.readFileSync(LOCAL_DATA_FILE, 'utf8'));
          } catch (e) {}
        }
        fs.writeFileSync(VERCEL_DATA_FILE, JSON.stringify(initialData, null, 2), 'utf8');
      }
      return VERCEL_DATA_FILE;
    } catch (e) {
      console.warn('Failed setting up /tmp directory on Vercel, falling back to local file or memory:', e);
    }
  }

  // Local development
  try {
    if (!fs.existsSync(LOCAL_DATA_DIR)) {
      fs.mkdirSync(LOCAL_DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LOCAL_DATA_FILE)) {
      fs.writeFileSync(LOCAL_DATA_FILE, JSON.stringify(defaultSiteData, null, 2), 'utf8');
    }
    return LOCAL_DATA_FILE;
  } catch (e) {
    return LOCAL_DATA_FILE;
  }
}

export function getSiteData(): FullSiteData {
  try {
    const dataFile = getActiveDataFilePath();
    if (fs.existsSync(dataFile)) {
      const raw = fs.readFileSync(dataFile, 'utf8');
      const parsed = JSON.parse(raw);
      memoryCache = parsed;
      return parsed;
    }
  } catch (error) {
    console.error('Failed reading site data file, using memory cache or default:', error);
  }

  if (memoryCache) {
    return memoryCache;
  }

  return defaultSiteData;
}

export function updateSiteData(newData: Partial<FullSiteData>, user: string = 'Administrator'): FullSiteData {
  const current = getSiteData();

  // Create log entry
  const updatedSection = Object.keys(newData).join(', ');
  const newLog: ActivityLog = {
    id: `log-${Date.now()}`,
    timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
    user,
    action: `Updated ${updatedSection}`,
    section: updatedSection,
    details: `Updated fields in: ${updatedSection}`
  };

  const logs = [newLog, ...(current.activityLogs || [])].slice(0, 100);

  const updated: FullSiteData = {
    ...current,
    ...newData,
    theme: { ...current.theme, ...(newData.theme || {}) },
    storage: { ...current.storage, ...(newData.storage || {}) },
    seo: { ...current.seo, ...(newData.seo || {}) },
    header: { ...current.header, ...(newData.header || {}) },
    marquee: { ...current.marquee, ...(newData.marquee || { enabled: true, text: '', speedSeconds: 20 }) },
    hero: { ...current.hero, ...(newData.hero || {}) },
    trustBanner: { ...current.trustBanner, ...(newData.trustBanner || { heading: '', tagline: '' }) },
    history: { ...current.history, ...(newData.history || {}) },
    about: { ...current.about, ...(newData.about || {}) },
    research: { ...current.research, ...(newData.research || {}) },
    approach: { ...current.approach, ...(newData.approach || { tabs: [] }) },
    stickyCircle: { ...current.stickyCircle, ...(newData.stickyCircle || {}) },
    cardsSection: { ...current.cardsSection, ...(newData.cardsSection || {}) },
    quote: { ...current.quote, ...(newData.quote || { quoteText: '', quoteAuthor: '' }) },
    newsletter: { ...current.newsletter, ...(newData.newsletter || {}) },
    footer: { ...current.footer, ...(newData.footer || {}) },
    floatingWidget: { ...current.floatingWidget, ...(newData.floatingWidget || { enabled: true, mainButtonText: 'Chat with AI', unreadBadgeText: 'Need Help?', prompts: [] }) },
    security: { ...current.security, ...(newData.security || { pinCode: '1234', twoFactorEnabled: false, sessionDurationHours: 24 }) },
    ryanHome: newData.ryanHome ? { ...current.ryanHome, ...newData.ryanHome } : current.ryanHome || defaultSiteData.ryanHome,
    ryanAbout: newData.ryanAbout ? { ...current.ryanAbout, ...newData.ryanAbout } : current.ryanAbout || defaultSiteData.ryanAbout,
    ryanDoctors: newData.ryanDoctors ? { ...current.ryanDoctors, ...newData.ryanDoctors } : current.ryanDoctors,
    activityLogs: logs
  };


  // Attempt atomic write
  try {
    const dataFile = getActiveDataFilePath();
    const tempFile = `${dataFile}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(updated, null, 2), 'utf8');
    fs.renameSync(tempFile, dataFile);
  } catch (err) {
    console.warn('Filesystem write failed (likely read-only serverless environment), cached in memory:', err);
  }

  // Always update in-memory cache
  memoryCache = updated;
  return updated;
}

export function addSubscriber(email: string): { success: boolean; message: string; subscriber?: Subscriber } {
  if (!email || !email.includes('@')) {
    return { success: false, message: 'Invalid email address.' };
  }

  const data = getSiteData();
  const exists = data.newsletter.subscribers.some(
    s => s.email.toLowerCase() === email.toLowerCase().trim()
  );

  if (exists) {
    return { success: true, message: 'You are already subscribed!' };
  }

  const newSub: Subscriber = {
    id: `sub-${Date.now()}`,
    email: email.trim().toLowerCase(),
    date: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })
  };

  const updatedSubscribers = [newSub, ...data.newsletter.subscribers];
  updateSiteData({
    newsletter: {
      ...data.newsletter,
      subscribers: updatedSubscribers
    }
  }, 'Visitor');

  return { success: true, message: data.newsletter.successMessage || 'Thank you for subscribing!', subscriber: newSub };
}

export function deleteSubscriber(id: string): { success: boolean; subscribers: Subscriber[] } {
  const data = getSiteData();
  const updatedSubscribers = (data.newsletter.subscribers || []).filter(s => s.id !== id);
  updateSiteData({
    newsletter: {
      ...data.newsletter,
      subscribers: updatedSubscribers
    }
  }, 'Administrator');

  return { success: true, subscribers: updatedSubscribers };
}
