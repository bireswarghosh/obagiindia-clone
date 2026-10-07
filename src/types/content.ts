export interface ThemeColors {
  primaryNavy: string;
  deepNavy: string;
  accentGold: string;
  canvasBg: string;
  textDark: string;
  textMuted: string;
  borderColor: string;
}

export type StorageProvider = 'local' | 'cloudflare-r2' | 'aws-s3' | 'cloudinary' | 'google-drive' | 'public-url';

export interface StorageSettings {
  provider: StorageProvider;
  bucketName: string;
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicUrl: string;
  // Multi-source provider credentials
  accountId?: string; // Cloudflare R2
  cloudName?: string; // Cloudinary
  apiKey?: string; // Cloudinary / Google Drive
  apiSecret?: string; // Cloudinary
  uploadPreset?: string; // Cloudinary
  driveFolderId?: string; // Google Drive
  region?: string; // AWS S3
  activeSource?: StorageProvider;
}

export interface NavDropdownItem {
  title: string;
  href: string;
}

export interface NavItem {
  id: string;
  title: string;
  href: string;
  dropdown?: NavDropdownItem[];
}

export interface HeaderSettings {
  logoText: string;
  logoImageUrl: string;
  logoColor?: string;
  logoPosition?: 'left' | 'center';
  broughtByText: string;
  broughtByLogoUrl: string;
  broughtByLinkUrl?: string;
  searchEnabled: boolean;
  searchPlaceholder?: string;
  navItems: NavItem[];
}

// TRUST MARQUEE TICKER (Between Hero and History)
export interface MarqueeSettings {
  enabled: boolean;
  text: string;
  speedSeconds: number;
  textColor?: string;
  backgroundColor?: string;
}

// SCREEN 1: HERO VIDEO
export interface HeroSettings {
  heading: string;
  headingColor?: string;
  subtitle: string;
  subtitleColor?: string;
  awardBadge?: string;
  awardText?: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  posterUrl: string;
  backgroundColor?: string;
  autoPlay: boolean;
  loop: boolean;
  morphEnabled?: boolean;
  morphSpeed: number;
}

// SCREEN 2: FIMAGE / IMAGE FEATURE (Our History & Heritage)
export interface HistorySettings {
  title: string;
  titleColor?: string;
  description?: string;
  paragraph1?: string;
  paragraph2?: string;
  textColor?: string;
  backgroundColor?: string;
  layoutType?: 'grid' | 'standard';
  primaryImage?: string;
  badgeAward?: string;
  badgeYear?: string;
  badgeImage?: string;
  dropperImage?: string;
  portraitImage?: string;
  galleryImages: string[];
}

// SCREEN 3: ABOUT RYAN DERMACEUTICS
export interface AboutSettings {
  title: string;
  titleColor?: string;
  quote: string;
  quoteColor?: string;
  paragraph?: string;
  body?: string;
  physicianQuote?: string;
  paragraphColor?: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl?: string;
  backgroundColor?: string;
}

// SCREEN 4: #1 PHYSICIAN RECOMMENDED BRAND (Trust Banner / Repeater)
export interface TrustBannerItem {
  id: string;
  title: string;
  description: string;
}

export interface TrustBannerSettings {
  heading: string;
  headingColor?: string;
  tagline: string;
  taglineColor?: string;
  concern1?: string;
  concern2?: string;
  concern3?: string;
  experienceText?: string;
  disclaimer?: string;
  backgroundColor?: string;
  items?: TrustBannerItem[];
}

// SCREEN 5: RESEARCH & DEVELOPMENT
export interface ResearchItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  hoverEffect?: 'blur' | 'zoom' | 'grayscale';
}

export interface ResearchSettings {
  title?: string;
  sectionTitle?: string;
  titleColor?: string;
  description?: string;
  textColor?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  items: ResearchItem[];
}

// OUR APPROACH / PROGRESS / STANDARD
export interface ApproachTab {
  key: string;
  title: string;
  desc: string;
  image: string;
  visible?: boolean;
}

export interface ApproachSettings {
  sectionTitle?: string;
  tabs: ApproachTab[];
}

// SCREEN 6: CARD SYSTEM (3D Sticky Pin & Vanish + Video)
export interface CardItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  linkUrl?: string;
  bgColor?: string;
  textColor?: string;
  badgeColor?: string;
  order?: number;
  visible?: boolean;
}

export interface StickyCircleSettings {
  imageUrl: string;
  startPercent?: number;
  endPercent?: number;
}

export interface CardsSectionSettings {
  pinkSerumImage?: string;
  morphSpeed?: number;
  cardCount?: number;
  foldAngle?: number;
  scrubSpeed?: number;
  cards: CardItem[];
  // Video underneath 3D cards
  awardVideoUrl?: string;
  awardVideoPoster?: string;
  awardVideoLabel?: string;
  awardVideoAutoPlay?: boolean;
}

// SCREEN 7: QUOTE + NEWSLETTER + FOOTER
export interface QuoteSettings {
  quoteText: string;
  quoteAuthor: string;
  quoteRole?: string;
  quoteImage?: string;
  textColor?: string;
  backgroundColor?: string;
}

export interface Subscriber {
  id: string;
  email: string;
  date: string;
}

export interface NewsletterSettings {
  newsletterTitle?: string;
  newsletterDesc?: string;
  newsletterImage?: string;
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  subscribers: Subscriber[];
}

export interface FooterLink {
  title: string;
  href: string;
}

export interface FooterSettings {
  logoText: string;
  companyName: string;
  address: string;
  email: string;
  phone: string;
  copyright: string;
  askAiEnabled: boolean;
  quickLinks: FooterLink[];
  socialLinks: { platform: string; url: string }[];
}

// FLOATING WIDGET (Chat with AI & Quick Questions)
export interface FloatingWidgetSettings {
  enabled: boolean;
  mainButtonText: string;
  unreadBadgeText: string;
  prompts: string[];
  accentColor?: string;
}

// AUDIT / ACTIVITY LOG
export interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  section: string;
  details?: string;
}

// SECURITY & 2FA
export interface AdminSecuritySettings {
  pinCode: string;
  twoFactorEnabled: boolean;
  twoFactorCode?: string;
  sessionDurationHours: number;
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
}

import type { RyanHomeContent } from '../data/ryan-home-content';
import type { RyanAboutContent } from '../data/ryan-about-content';
import type { RyanDoctorsPageContent } from '../data/ryan-doctors-data';

export interface FullSiteData {
  theme: ThemeColors;
  storage: StorageSettings;
  seo: SEOSettings;
  header: HeaderSettings;
  marquee?: MarqueeSettings;
  hero: HeroSettings; // Screen 1
  history: HistorySettings; // Screen 2
  about: AboutSettings; // Screen 3
  trustBanner?: TrustBannerSettings; // Screen 4
  research: ResearchSettings; // Screen 5A
  approach?: ApproachSettings; // Screen 5B
  cardsSection: CardsSectionSettings; // Screen 6
  quote?: QuoteSettings; // Screen 7A
  newsletter: NewsletterSettings; // Screen 7B
  footer: FooterSettings; // Screen 7C
  floatingWidget?: FloatingWidgetSettings;
  security?: AdminSecuritySettings;
  activityLogs?: ActivityLog[];
  stickyCircle?: any;
  ryanHome?: RyanHomeContent;
  ryanAbout?: RyanAboutContent;
  ryanDoctors?: RyanDoctorsPageContent;
}

