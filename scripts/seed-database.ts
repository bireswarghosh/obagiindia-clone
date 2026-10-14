// @ts-nocheck
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import { RYAN_PRODUCTS } from '../src/data/ryan-products';
import {
  PRESCRIBING_INFO_PRODUCTS,
  THERAPEUTIC_GUIDES_DATA,
  CLINICAL_INSIGHTS_DATA,
  REFERENCE_LIBRARY_CATEGORIES,
  SAMPLE_TOPIC_PAGES
} from '../src/data/ryan-data';
import { defaultObagiHomeContent } from '../src/data/obagi-home-content';
import { defaultRyanAboutContent } from '../src/data/ryan-about-content';
import { DEFAULT_DOCTORS_PAGE_CONTENT } from '../src/data/ryan-doctors-data';

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

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Seeding products table...');
    // Seed 53 Products
    for (const p of RYAN_PRODUCTS) {
      await client.query(`
        INSERT INTO products (
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
      `, [
        p.id,
        p.slug,
        p.brandName,
        p.genericName,
        p.strength,
        p.dosageForm,
        p.route,
        p.therapeuticArea,
        p.tagline,
        p.images?.primaryPackshot || '',
        '',
        p.hasFullMonograph ?? true,
        p.isFeatured ?? false,
        JSON.stringify(p)
      ]);
    }
    console.log(`Seeded ${RYAN_PRODUCTS.length} products.`);

    console.log('Seeding prescribing_info table...');
    for (const pi of PRESCRIBING_INFO_PRODUCTS) {
      const piSlug = (pi as any).slug || pi.id;
      await client.query(`
        INSERT INTO prescribing_info (
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
      `, [
        pi.id,
        piSlug,
        pi.brandName,
        pi.genericName,
        pi.therapeuticClass,
        pi.category,
        pi.composition,
        (pi as any).image || '',
        JSON.stringify(pi)
      ]);
    }
    console.log(`Seeded ${PRESCRIBING_INFO_PRODUCTS.length} prescribing info products.`);

    console.log('Seeding therapeutic_guides table...');
    for (const [slug, guide] of Object.entries(THERAPEUTIC_GUIDES_DATA)) {
      const guideId = (guide as any).id || slug;
      await client.query(`
        INSERT INTO therapeutic_guides (
          id, slug, title, subtitle, cover_image, data, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, NOW())
        ON CONFLICT (id) DO UPDATE SET
          slug = EXCLUDED.slug,
          title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          cover_image = EXCLUDED.cover_image,
          data = EXCLUDED.data,
          updated_at = NOW()
      `, [
        guideId,
        slug,
        guide.title,
        guide.subtitle,
        guide.image || '',
        JSON.stringify(guide)
      ]);
    }
    console.log(`Seeded ${Object.keys(THERAPEUTIC_GUIDES_DATA).length} therapeutic guides.`);

    console.log('Seeding clinical_insights table...');
    for (const [slug, insight] of Object.entries(CLINICAL_INSIGHTS_DATA)) {
      const insightId = (insight as any).id || slug;
      await client.query(`
        INSERT INTO clinical_insights (
          id, slug, title, subtitle, featured_image, data, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, NOW())
        ON CONFLICT (id) DO UPDATE SET
          slug = EXCLUDED.slug,
          title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          featured_image = EXCLUDED.featured_image,
          data = EXCLUDED.data,
          updated_at = NOW()
      `, [
        insightId,
        slug,
        insight.title,
        insight.subtitle,
        insight.image || '',
        JSON.stringify(insight)
      ]);
    }
    console.log(`Seeded ${Object.keys(CLINICAL_INSIGHTS_DATA).length} clinical insights.`);

    console.log('Seeding reference_library categories and topics...');
    for (const [slug, cat] of Object.entries(REFERENCE_LIBRARY_CATEGORIES)) {
      await client.query(`
        INSERT INTO reference_library (
          id, item_type, slug, title, image_url, data, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, NOW())
        ON CONFLICT (id) DO UPDATE SET
          item_type = EXCLUDED.item_type,
          slug = EXCLUDED.slug,
          title = EXCLUDED.title,
          image_url = EXCLUDED.image_url,
          data = EXCLUDED.data,
          updated_at = NOW()
      `, [
        `cat_${slug}`,
        'category',
        slug,
        cat.name,
        '',
        JSON.stringify(cat)
      ]);
    }

    for (const [slug, topic] of Object.entries(SAMPLE_TOPIC_PAGES)) {
      await client.query(`
        INSERT INTO reference_library (
          id, item_type, slug, title, image_url, data, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, NOW())
        ON CONFLICT (id) DO UPDATE SET
          item_type = EXCLUDED.item_type,
          slug = EXCLUDED.slug,
          title = EXCLUDED.title,
          image_url = EXCLUDED.image_url,
          data = EXCLUDED.data,
          updated_at = NOW()
      `, [
        `topic_${slug}`,
        'topic',
        slug,
        topic.title,
        topic.image || '',
        JSON.stringify(topic)
      ]);
    }
    console.log('Seeded reference library categories and topics.');

    console.log('Seeding page_sections table for all user pages (Text, Image, Video)...');

    // 1. Obagi Home Sections
    let homeJson = defaultObagiHomeContent;
    const localHomeFile = path.join(process.cwd(), 'data', 'obagi-home-content.json');
    if (fs.existsSync(localHomeFile)) {
      try {
        homeJson = JSON.parse(fs.readFileSync(localHomeFile, 'utf8'));
      } catch (e) {}
    }

    const homeSections = [
      {
        section_key: 'header',
        title: homeJson.header?.broughtToIndiaByText || 'BROUGHT TO INDIA BY SPECTRA',
        subtitle: homeJson.header?.searchLabel || 'Search',
        body_text: homeJson.header?.skipToContentLabel || 'Skip to main content',
        image_url: homeJson.header?.logoUrl || '',
        extra_data: { navMenu: homeJson.header?.navMenu }
      },
      {
        section_key: 'hero',
        title: homeJson.hero?.title || 'TRANSFORM YOUR SKIN',
        subtitle: homeJson.hero?.subtitle || 'Scientifically backed skincare designed to transform your skin from within.',
        body_text: homeJson.hero?.titleHighlight || 'TRANSFORM',
        cta_text: homeJson.hero?.buttonText || 'Discover Products',
        cta_url: homeJson.hero?.buttonLink || '#products',
        image_url: homeJson.hero?.heroImage || '',
        video_url: homeJson.hero?.videoUrl || '',
        video_poster: homeJson.hero?.videoPoster || ''
      },
      {
        section_key: 'marquee',
        title: homeJson.marquee?.text || 'Science-backed skincare trusted by dermatologists worldwide',
        extra_data: { enabled: homeJson.marquee?.enabled, speed: homeJson.marquee?.speedSeconds }
      },
      {
        section_key: 'history_intro',
        title: homeJson.historyIntro?.historyIntroBadge || 'ABOUT OBAGI',
        subtitle: homeJson.historyIntro?.historyIntroHeading || 'TRANSFORMING SKIN CARE FOR OVER 35 YEARS',
        body_text: homeJson.historyIntro?.historyIntroText || '',
        image_url: homeJson.historyIntro?.historyIntroImage || ''
      },
      {
        section_key: 'about',
        title: homeJson.about?.heading || 'Clinically Proven, Science-Backed',
        subtitle: homeJson.about?.subheading || 'Transforming Skin Care',
        body_text: homeJson.about?.description || '',
        image_url: homeJson.about?.imageUrl || '',
        extra_data: { stats: homeJson.about?.stats }
      },
      {
        section_key: 'pillars',
        title: homeJson.pillars?.heading || 'OUR GUIDING PILLARS',
        extra_data: { pillars: homeJson.pillars?.pillars }
      },
      {
        section_key: 'rd_intro',
        title: homeJson.rdIntro?.rdHeading || 'RESEARCH & DEVELOPMENT',
        subtitle: homeJson.rdIntro?.rdSubheading || 'Formulation Science',
        body_text: homeJson.rdIntro?.rdDescription || '',
        image_url: homeJson.rdIntro?.rdBannerImage || ''
      },
      {
        section_key: 'rd_cards',
        extra_data: { tabs: homeJson.rdCards?.tabs }
      },
      {
        section_key: 'products',
        title: 'Featured Product Systems',
        extra_data: { systems: homeJson.products?.featuredSystems }
      },
      {
        section_key: 'video',
        title: homeJson.video?.headline || 'Science of Skin Health',
        body_text: homeJson.video?.caption || '',
        video_url: homeJson.video?.videoUrl || '',
        video_poster: homeJson.video?.posterUrl || ''
      },
      {
        section_key: 'partner_enquiry',
        title: homeJson.partner?.title || 'Partner With Us',
        subtitle: homeJson.partner?.subtitle || 'Join our clinical distribution network in India',
        cta_text: homeJson.partner?.buttonText || 'Enquire Now',
        image_url: homeJson.partner?.bgImage || '',
        extra_data: { features: homeJson.partner?.features, actionCards: homeJson.partner?.actionCards }
      },
      {
        section_key: 'footer',
        body_text: homeJson.footer?.copyrightText || '© Obagi India. All rights reserved.',
        image_url: homeJson.footer?.logoUrl || '',
        extra_data: { footerLinks: homeJson.footer?.quickLinks }
      }
    ];

    for (const sec of homeSections) {
      await client.query(`
        INSERT INTO page_sections (
          page_slug, section_key, title, subtitle, body_text, cta_text, cta_url,
          image_url, video_url, video_poster, extra_data, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
        ON CONFLICT (page_slug, section_key) DO UPDATE SET
          title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          body_text = EXCLUDED.body_text,
          cta_text = EXCLUDED.cta_text,
          cta_url = EXCLUDED.cta_url,
          image_url = EXCLUDED.image_url,
          video_url = EXCLUDED.video_url,
          video_poster = EXCLUDED.video_poster,
          extra_data = EXCLUDED.extra_data,
          updated_at = NOW()
      `, [
        'home',
        sec.section_key,
        sec.title || '',
        sec.subtitle || '',
        sec.body_text || '',
        sec.cta_text || '',
        sec.cta_url || '',
        sec.image_url || '',
        sec.video_url || '',
        sec.video_poster || '',
        JSON.stringify(sec.extra_data || {})
      ]);
    }

    // 2. About Ryan Page Sections
    const aboutSections = [
      {
        section_key: 'hero',
        title: defaultRyanAboutContent.hero.title,
        subtitle: defaultRyanAboutContent.hero.subtitle,
        body_text: defaultRyanAboutContent.hero.paragraph,
        extra_data: { badges: defaultRyanAboutContent.hero.badges }
      },
      {
        section_key: 'vision',
        title: defaultRyanAboutContent.vision.heading,
        subtitle: defaultRyanAboutContent.vision.subheading,
        body_text: defaultRyanAboutContent.vision.quote,
        extra_data: { cards: defaultRyanAboutContent.vision.cards }
      },
      {
        section_key: 'approach',
        title: defaultRyanAboutContent.approach.heading,
        body_text: defaultRyanAboutContent.approach.subheading,
        extra_data: { cards: defaultRyanAboutContent.approach.cards }
      },
      {
        section_key: 'portfolio',
        title: defaultRyanAboutContent.portfolio.heading,
        body_text: defaultRyanAboutContent.portfolio.subheading,
        extra_data: { categories: defaultRyanAboutContent.portfolio.categories }
      },
      {
        section_key: 'quality',
        title: defaultRyanAboutContent.quality.heading,
        body_text: defaultRyanAboutContent.quality.subheading,
        extra_data: { cards: defaultRyanAboutContent.quality.cards, framework: defaultRyanAboutContent.qualityFramework }
      },
      {
        section_key: 'ethics_medinova',
        title: defaultRyanAboutContent.ethicsMedinova.heading,
        subtitle: defaultRyanAboutContent.ethicsMedinova.subheading,
        body_text: defaultRyanAboutContent.ethicsMedinova.paragraph1,
        extra_data: { paragraph2: defaultRyanAboutContent.ethicsMedinova.paragraph2, coreValues: defaultRyanAboutContent.coreValues }
      }
    ];

    for (const sec of aboutSections) {
      await client.query(`
        INSERT INTO page_sections (
          page_slug, section_key, title, subtitle, body_text, cta_text, cta_url,
          image_url, video_url, video_poster, extra_data, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
        ON CONFLICT (page_slug, section_key) DO UPDATE SET
          title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          body_text = EXCLUDED.body_text,
          extra_data = EXCLUDED.extra_data,
          updated_at = NOW()
      `, [
        'about',
        sec.section_key,
        sec.title || '',
        sec.subtitle || '',
        sec.body_text || '',
        '',
        '',
        '',
        '',
        '',
        JSON.stringify(sec.extra_data || {})
      ]);
    }

    // 3. For Doctors Landing Sections
    const docSections = [
      {
        section_key: 'hero',
        title: DEFAULT_DOCTORS_PAGE_CONTENT.hero.title,
        subtitle: DEFAULT_DOCTORS_PAGE_CONTENT.hero.subtitle,
        cta_text: DEFAULT_DOCTORS_PAGE_CONTENT.hero.primaryButtonText,
        cta_url: DEFAULT_DOCTORS_PAGE_CONTENT.hero.primaryButtonLink,
        extra_data: { features: DEFAULT_DOCTORS_PAGE_CONTENT.hero.features }
      },
      {
        section_key: 'quick_access',
        title: DEFAULT_DOCTORS_PAGE_CONTENT.quickAccess.heading,
        subtitle: DEFAULT_DOCTORS_PAGE_CONTENT.quickAccess.subheading,
        extra_data: { cards: DEFAULT_DOCTORS_PAGE_CONTENT.quickAccess.cards }
      },
      {
        section_key: 'therapeutic_areas',
        title: DEFAULT_DOCTORS_PAGE_CONTENT.therapeuticAreas.heading,
        subtitle: DEFAULT_DOCTORS_PAGE_CONTENT.therapeuticAreas.subheading,
        extra_data: { categories: DEFAULT_DOCTORS_PAGE_CONTENT.therapeuticAreas.categories }
      },
      {
        section_key: 'scientific_approach',
        title: DEFAULT_DOCTORS_PAGE_CONTENT.scientificApproach.heading,
        body_text: DEFAULT_DOCTORS_PAGE_CONTENT.scientificApproach.subheading,
        extra_data: { features: DEFAULT_DOCTORS_PAGE_CONTENT.scientificApproach.features }
      },
      {
        section_key: 'partner_banner',
        title: DEFAULT_DOCTORS_PAGE_CONTENT.partnerBanner.heading,
        body_text: DEFAULT_DOCTORS_PAGE_CONTENT.partnerBanner.subheading,
        cta_text: DEFAULT_DOCTORS_PAGE_CONTENT.partnerBanner.buttonText,
        cta_url: DEFAULT_DOCTORS_PAGE_CONTENT.partnerBanner.buttonLink
      }
    ];

    for (const sec of docSections) {
      await client.query(`
        INSERT INTO page_sections (
          page_slug, section_key, title, subtitle, body_text, cta_text, cta_url,
          image_url, video_url, video_poster, extra_data, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
        ON CONFLICT (page_slug, section_key) DO UPDATE SET
          title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          body_text = EXCLUDED.body_text,
          cta_text = EXCLUDED.cta_text,
          cta_url = EXCLUDED.cta_url,
          extra_data = EXCLUDED.extra_data,
          updated_at = NOW()
      `, [
        'for-doctors',
        sec.section_key,
        sec.title || '',
        sec.subtitle || '',
        sec.body_text || '',
        sec.cta_text || '',
        sec.cta_url || '',
        '',
        '',
        '',
        JSON.stringify(sec.extra_data || {})
      ]);
    }

    // 4. Contact Us, Medical Information, and Legal Pages
    const otherSections = [
      {
        page_slug: 'contact',
        section_key: 'hero',
        title: 'Contact Us',
        subtitle: 'Ryan Dermaceutics · A Specialized Division of Ethics Medinova Pvt. Ltd.',
        body_text: 'Get in touch for medical information, product queries and partnerships.'
      },
      {
        page_slug: 'contact',
        section_key: 'cards',
        title: 'Contact Channels',
        extra_data: {
          cards: [
            {
              h: 'Medical Information',
              p: 'Product queries, safety reports and clinical support for healthcare professionals.',
              href: 'mailto:medinfo@ryandermaceutics.com',
              cta: 'medinfo@ryandermaceutics.com'
            },
            {
              h: 'Phone',
              p: 'Reach our desk during business hours (Mon–Sat).',
              href: 'tel:+913324000000',
              cta: '+91 33 2400 0000'
            },
            {
              h: 'Offices',
              p: 'Kolkata & Mumbai, India.',
              href: '/about',
              cta: 'More about us'
            }
          ]
        }
      },
      {
        page_slug: 'privacy-policy',
        section_key: 'content',
        title: 'Privacy Policy',
        subtitle: 'How Ryan Dermaceutics collects, uses and protects your information.',
        extra_data: {
          sections: [
            {
              h: 'Information we collect',
              p: 'We collect information you share directly — such as your name, email address, phone number and professional details when you submit an enquiry, subscribe to updates or contact medical information services. We also collect limited technical data (device, browser, pages visited) to operate and improve this website.'
            },
            {
              h: 'How we use it',
              p: 'Your information is used to respond to enquiries, share requested product and clinical information, improve our services and comply with legal obligations. We do not sell your personal information to third parties.'
            },
            {
              h: 'Medical and professional queries',
              p: 'Queries submitted through medical-information channels may be retained for pharmacovigilance and quality purposes as required by applicable regulation.'
            },
            {
              h: 'Data security & retention',
              p: 'We apply reasonable administrative and technical safeguards to protect your information and retain it only for as long as necessary for the purposes stated above.'
            },
            {
              h: 'Your rights',
              p: 'You may request access, correction or deletion of your personal information by writing to us (see Contact page). We will respond within a reasonable timeframe.'
            }
          ]
        }
      },
      {
        page_slug: 'terms-and-conditions',
        section_key: 'content',
        title: 'Terms & Conditions',
        subtitle: 'Terms and conditions for using the Ryan Dermaceutics website.',
        extra_data: {
          sections: [
            {
              h: 'Use of this website',
              p: 'This website provides general information about Ryan Dermaceutics, a specialized dermatology division of Ethics Medinova Pvt. Ltd., and its product portfolio. Content here is intended for healthcare professionals and general visitors in India and does not replace professional medical advice, diagnosis or treatment.'
            },
            {
              h: 'Product information',
              p: 'Product descriptions, prescribing information and monographs are published for educational purposes. Availability, pack sizes and prescribing status may change. Always refer to the current package insert and consult a qualified dermatologist before use.'
            },
            {
              h: 'Intellectual property',
              p: 'All text, graphics, logos, images and data compilations on this site are the property of Ryan Dermaceutics / Ethics Medinova Pvt. Ltd. or its licensors. Reproduction without prior written permission is prohibited.'
            },
            {
              h: 'External links',
              p: 'Links to third-party websites are provided for convenience. We do not control or endorse their content and accept no responsibility for them.'
            },
            {
              h: 'Limitation of liability',
              p: 'To the fullest extent permitted by law, Ryan Dermaceutics shall not be liable for any direct or indirect loss arising from the use of, or reliance on, this website.'
            },
            {
              h: 'Governing law',
              p: 'These terms are governed by the laws of India. Disputes are subject to the jurisdiction of the courts at Kolkata, West Bengal.'
            }
          ]
        }
      },
      {
        page_slug: 'accessibility-statement',
        section_key: 'content',
        title: 'Accessibility Statement',
        subtitle: 'Our commitment to an accessible website for all visitors.',
        body_text: 'Ryan Dermaceutics is committed to making this website usable by everyone, including visitors using assistive technologies.',
        extra_data: {
          points: [
            'Readable type scales and strong colour contrast across pages.',
            'Keyboard-navigable menus, dialogs and forms with visible focus states.',
            'Descriptive alt text on meaningful imagery and labelled form fields.',
            'Responsive layouts that work from mobile to desktop viewports.',
            'Ongoing reviews of new content and features against common accessibility practices (WCAG 2.1 AA as a guide).'
          ]
        }
      },
      {
        page_slug: 'global',
        section_key: 'header',
        title: 'SCIENCE THAT UNDERSTANDS SKIN',
        subtitle: 'Science | Efficacy • Skin Health | Quality • Clinical Confidence',
        image_url: '/ryan/ryan-logo.png'
      },
      {
        page_slug: 'global',
        section_key: 'footer',
        title: 'Ryan Dermaceutics',
        body_text: 'Committed to advancing dermatological therapeutics through scientific rigor, high-quality formulations, and trusted clinician partnership.',
        image_url: '/ryan/ryan-logo.png'
      }
    ];

    for (const sec of otherSections) {
      await client.query(`
        INSERT INTO page_sections (
          page_slug, section_key, title, subtitle, body_text, cta_text, cta_url,
          image_url, video_url, video_poster, extra_data, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
        ON CONFLICT (page_slug, section_key) DO UPDATE SET
          title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          body_text = EXCLUDED.body_text,
          extra_data = EXCLUDED.extra_data,
          updated_at = NOW()
      `, [
        sec.page_slug,
        sec.section_key,
        sec.title || '',
        sec.subtitle || '',
        sec.body_text || '',
        '',
        '',
        sec.image_url || '',
        '',
        '',
        JSON.stringify(sec.extra_data || {})
      ]);
    }

    console.log('Seeded all page_sections successfully!');
    console.log('DATABASE SEED COMPLETE! All content is now in Neon PostgreSQL.');
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((err) => {
  console.error('Seed script error:', err);
  process.exit(1);
});
