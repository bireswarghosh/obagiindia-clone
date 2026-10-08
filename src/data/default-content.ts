import { FullSiteData } from '../types/content';
import { defaultRyanHomeContent } from './ryan-home-content';
import { defaultRyanAboutContent } from './ryan-about-content';

export const defaultSiteData: FullSiteData = {
  theme: {
    primaryNavy: '#003d4d',
    deepNavy: '#002530',
    accentGold: '#00768a',
    canvasBg: '#f8fafc',
    textDark: '#0f172a',
    textMuted: '#64748b',
    borderColor: 'rgba(0, 118, 138, 0.12)'
  },
  storage: {
    provider: 'local',
    activeSource: 'local',
    bucketName: 'ryan-media-bucket',
    endpoint: 'https://r2.cloudflare.com',
    accessKeyId: '',
    secretAccessKey: '',
    publicUrl: '/uploads',
    accountId: '',
    cloudName: '',
    apiKey: '',
    apiSecret: '',
    uploadPreset: '',
    driveFolderId: '',
    region: 'ap-south-1'
  },
  seo: {
    metaTitle: 'Ryan Dermaceutics | Specialized Dermatology Division',
    metaDescription: 'Ryan Dermaceutics, a specialized division of Ethics Medinova Private Limited, delivers advanced dermatological and trichological formulations backed by science.',
    keywords: 'Ryan Dermaceutics, Ethics Medinova, Dermatology India, Tressicle, Tenorium, Blismin, Flutirium, topical dermatology, oral dermatology',
    ogImage: '/ryan/ryan-logo-full.jpg',
    canonicalUrl: 'https://obagiindia.vercel.app/'
  },
  header: {
    logoText: 'RYAN DERMACEUTICS',
    logoImageUrl: '/ryan/ryan-logo.png',
    logoColor: '#ffffff',
    logoPosition: 'left',
    broughtByText: 'A Specialized Division of Ethics Medinova Pvt. Ltd.',
    broughtByLogoUrl: '',
    broughtByLinkUrl: 'https://ethicsmedinova.com/',
    searchEnabled: true,
    searchPlaceholder: 'Search formulations, monographs, guides...',
    navItems: [
      {
        id: 'home',
        title: 'Home',
        href: '/',
        dropdown: []
      },
      {
        id: 'about-ryan',
        title: 'About Ryan',
        href: '/about',
        dropdown: [
          { title: 'Our Vision', href: '/about#vision' },
          { title: 'Our Approach', href: '/about#approach' },
          { title: 'Quality Framework', href: '/about#quality' },
          { title: 'Parent Company', href: '/about#parent' }
        ]
      },
      {
        id: 'products',
        title: 'Products',
        href: '/products',
        dropdown: [
          { title: 'Topical Formulations', href: '/products?route=Topical' },
          { title: 'Oral & Systemic', href: '/products?route=Oral' },
          { title: 'Trichology & Hair', href: '/products?area=Hair' },
          { title: 'Allergy & Pruritus', href: '/products?area=Allergy' }
        ]
      },
      {
        id: 'for-doctors',
        title: 'For Doctors',
        href: '/for-doctors',
        dropdown: [
          { title: 'Therapeutic Resources', href: '/for-doctors/therapeutic-resources' },
          { title: 'Prescribing Information', href: '/for-doctors/prescribing-information' },
          { title: 'Reference Library', href: '/for-doctors/reference-library' },
          { title: 'Medical Information', href: '/for-doctors/medical-information' }
        ]
      }
    ]
  },
  marquee: {
    enabled: true,
    text: 'EVIDENCE-BASED DERMATOLOGY          |          SPECIALIZED FORMULATIONS          |          WHO-GMP CERTIFIED MANUFACTURING          |          COLLABORATIVE MEDICAL PARTNERSHIP',
    speedSeconds: 20,
    textColor: '#ffffff',
    backgroundColor: '#003d4d'
  },
  hero: {
    heading: 'SCIENCE THAT UNDERSTAND SKIN',
    headingColor: '#003d4d',
    subtitle: 'Science | Efficacy   •   Skin Health | Quality   •   Clinical Confidence',
    subtitleColor: '#00768a',
    awardBadge: 'RYAN DERMACEUTICS',
    awardText: 'Specialized Dermatology Division',
    mediaType: 'image',
    mediaUrl: '/ryan/home/home_client_image_7.png',
    posterUrl: '/ryan/home/home_client_image_7.png',
    backgroundColor: '',
    autoPlay: true,
    loop: true,
    morphEnabled: true,
    morphSpeed: 1
  },
  history: {
    title: 'Our Story',
    titleColor: '#003d4d',
    description: 'Ryan Dermaceutics is a specialized dermatology division bringing together topical, oral and supportive products across multiple therapeutic areas. Our portfolio is designed around the evolving needs of dermatology practice and professional healthcare.',
    paragraph1: 'Ryan Dermaceutics is a specialized dermatology division bringing together topical, oral and supportive products across multiple therapeutic areas. Our portfolio is designed around the evolving needs of dermatology practice and professional healthcare.',
    paragraph2: 'Built on three guiding pillars—Focus, Quality, and Partnership—we work closely with dermatologists and healthcare institutions across India to deliver consistent, dependable clinical formulations.',
    textColor: '#003d4d',
    backgroundColor: '',
    layoutType: 'grid',
    primaryImage: '/ryan/home/home_client_image_1.png',
    badgeAward: 'WHO-GMP Compliant',
    badgeYear: '2026',
    badgeImage: '/ryan/about/quality_microscope.png',
    dropperImage: '/ryan/about/portfolio_topical.png',
    portraitImage: '/ryan/about/portfolio_oral.png',
    galleryImages: [
      '/ryan/home/home_client_image_1.png',
      '/ryan/home/home_client_image_2.png'
    ]
  },
  about: {
    title: 'About Ryan Dermaceutics',
    titleColor: '#003d4d',
    quote: '“To advance dermatology care by providing evidence-based formulations and supporting healthcare professionals with relevant clinical resources.”',
    quoteColor: '#003d4d',
    paragraph: 'Ryan Dermaceutics is built on three guiding principles: Dermatology Focus, High Standards of Quality, and Collaborative Medical Partnership. Our formulations undergo stringent quality control in WHO-GMP certified facilities to ensure optimal patient outcomes and consistent efficacy.',
    paragraphColor: '#003d4d',
    buttonText: 'Explore About Ryan',
    buttonLink: '/about',
    backgroundColor: ''
  },
  trustBanner: {
    heading: 'Committed to Consistent Quality and Clinical Trust',
    headingColor: '#003d4d',
    tagline: 'FOR COMPREHENSIVE DERMATOLOGICAL CARE: Acne | Fungal Infections | Corticosteroids | Hair & Scalp',
    taglineColor: '#00768a',
    concern1: 'Topical Potency & Formulations',
    concern2: 'Oral & Systemic Therapies',
    concern3: 'Trichology & Scalp Care',
    experienceText: 'Formulated with rigorous scientific testing and quality assurance.',
    disclaimer: '*Manufactured under WHO-GMP certified protocols with validated stability testing.',
    backgroundColor: '',
    items: [
      {
        id: 'tb-1',
        title: 'DERMATOLOGY-FIRST SPECIALIZATION',
        description: 'Our portfolio is purposefully designed to address real-world dermatological presentations encountered in routine outpatient practice.'
      },
      {
        id: 'tb-2',
        title: 'WHO-GMP MANUFACTURING STANDARDS',
        description: 'Products are manufactured in certified facilities adhering strictly to Good Manufacturing Practices with systematic batch testing.'
      },
      {
        id: 'tb-3',
        title: 'PHARMA-GRADE BIOAVAILABILITY',
        description: 'Selected APIs and vehicle technologies ensure optimal penetration, skin tolerability, and clinical predictability.'
      },
      {
        id: 'tb-4',
        title: 'EVIDENCE-BASED CLINICAL SUPPORT',
        description: 'Comprehensive product monographs, prescribing information, and therapeutic guides empower physicians in daily clinical practice.'
      }
    ]
  },
  research: {
    title: 'Research & Quality Framework',
    titleColor: '#FFFFFF',
    description: 'At Ryan Dermaceutics, formulation integrity is paramount. We adhere to an 8-pillar quality framework covering active ingredient purity, vehicle optimization, stability, and patient compliance.',
    textColor: '#FFFFFF',
    backgroundImage: '/ryan/about/quality_microscope.png',
    backgroundColor: '#003d4d',
    items: [
      {
        id: 'res-1',
        icon: 'Microscope',
        title: 'Formulation Optimization',
        description: 'Vehicle selection tailored for target tissue penetration and patient compliance.',
        imageUrl: '/ryan/about/about_approach_petri.png',
        hoverEffect: 'zoom'
      },
      {
        id: 'res-2',
        icon: 'Shield',
        title: 'Quality Assurance',
        description: 'Systematic batch testing, assay verification, and microbiological compliance.',
        imageUrl: '/ryan/about/quality_microscope.png',
        hoverEffect: 'blur'
      },
      {
        id: 'res-3',
        icon: 'Award',
        title: 'Clinician Collaboration',
        description: 'Formulations developed in close consultation with leading dermatology practitioners.',
        imageUrl: '/ryan/about/ethics_building.png',
        hoverEffect: 'zoom'
      }
    ]
  },
  approach: {
    sectionTitle: 'Our Scientific Philosophy',
    tabs: [
      {
        key: 'approach',
        title: 'Dermatology Focus',
        desc: 'Dedicated exclusively to dermatological therapeutics, allowing deep therapeutic domain expertise and targeted product design.',
        image: '/ryan/about/about_approach_petri.png',
        visible: true
      },
      {
        key: 'progress',
        title: 'High Standards of Quality',
        desc: 'Rigorous manufacturing controls, stability evaluation, and raw material qualification ensure consistent batch-to-batch excellence.',
        image: '/ryan/about/quality_microscope.png',
        visible: true
      },
      {
        key: 'standard',
        title: 'Medical Partnership',
        desc: 'Empowering healthcare practitioners through transparent prescribing information, structured reference libraries, and medical affairs enquiry support.',
        image: '/ryan/about/ethics_building.png',
        visible: true
      }
    ]
  },
  stickyCircle: {
    imageUrl: '/ryan/about/about_hero_collage.png',
    startPercent: 18,
    endPercent: 90
  },
  cardsSection: {
    pinkSerumImage: '/ryan/about/portfolio_topical.png',
    morphSpeed: 1.2,
    awardVideoUrl: '',
    awardVideoPoster: '/ryan/about/quality_microscope.png',
    awardVideoLabel: 'WHO-GMP Certified Excellence',
    awardVideoAutoPlay: false,
    cards: [
      {
        id: 'card-1',
        number: '1',
        title: 'TRESSICLE 5 & FORTE',
        subtitle: 'Advanced Trichological Solutions',
        description: 'Topical and oral formulations including Minoxidil 5% and Minoxidil + Finasteride combinations for androgenetic alopecia management.',
        imageUrl: '/ryan/about/portfolio_hair.png',
        bgColor: '#FFFFFF',
        textColor: '#003d4d',
        order: 1,
        visible: true
      },
      {
        id: 'card-2',
        number: '2',
        title: 'TENORIUM & POTENCY LADDER',
        subtitle: 'Targeted Corticosteroid Therapeutics',
        description: 'A structured corticosteroid ladder spanning superpotent Clobetasol Propionate (TENORIUM) through Mometasone and Fluticasone options.',
        imageUrl: '/ryan/about/portfolio_topical.png',
        bgColor: '#FFFFFF',
        textColor: '#003d4d',
        order: 2,
        visible: true
      },
      {
        id: 'card-3',
        number: '3',
        title: 'BLISMIN 20 & HIVOZIN 5',
        subtitle: 'Modern H1 Antihistamines',
        description: 'Second-generation non-sedating H1 antihistamines providing rapid, sustained relief in acute and chronic urticaria and allergic pruritus.',
        imageUrl: '/ryan/about/portfolio_oral.png',
        bgColor: '#FFFFFF',
        textColor: '#003d4d',
        order: 3,
        visible: true
      }
    ]
  },
  quote: {
    quoteText: '“Ryan Dermaceutics delivers the formulation consistency, bioavailability, and scientific transparency that clinicians need to practice with confidence.”',
    quoteAuthor: 'Clinical Advisory Panel',
    quoteRole: 'Ethics Medinova Private Limited',
    quoteImage: '/ryan/about/ethics_building.png',
    textColor: '#003d4d',
    backgroundColor: '#FFFFFF'
  },
  newsletter: {
    newsletterTitle: 'Join The Ryan Clinical Network',
    newsletterDesc: 'Subscribe to receive the latest therapeutic monographs, clinical practice guides, and dermatological symposium updates.',
    newsletterImage: '/ryan/about/about_approach_petri.png',
    buttonText: 'Subscribe',
    subscribers: [
      {
        id: 'sub-1',
        email: 'derma.clinic@example.com',
        date: '9/24/2026, 10:30:00 AM'
      }
    ]
  },
  footer: {
    logoText: 'RYAN DERMACEUTICS',
    companyName: 'Ethics Medinova Private Limited',
    address: 'Kolkata & Mumbai, India',
    email: 'medinfo@ryandermaceutics.com',
    phone: '+91 33 2400 0000',
    copyright: '© 2026 Ryan Dermaceutics. A Specialized Division of Ethics Medinova Pvt. Ltd. All rights reserved.',
    askAiEnabled: true,
    quickLinks: [
      { title: 'Home', href: '/' },
      { title: 'About Ryan', href: '/about' },
      { title: 'Products Catalog', href: '/products' },
      { title: 'Therapeutic Resources', href: '/for-doctors/therapeutic-resources' }
    ],
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com' },
      { platform: 'Instagram', url: 'https://instagram.com' }
    ]
  },
  floatingWidget: {
    enabled: true,
    mainButtonText: 'Chat with AI',
    unreadBadgeText: 'Need Help?',
    prompts: [
      'Tell me about TRESSICLE 5 Minoxidil formulations',
      'What is the corticosteroid potency ladder?',
      'Explore BLISMIN 20 in chronic urticaria'
    ],
    accentColor: '#00768a'
  },
  security: {
    pinCode: '1234',
    twoFactorEnabled: false,
    sessionDurationHours: 24
  },
  activityLogs: [
    {
      id: 'log-init',
      timestamp: '9/25/2026, 2:00:00 PM',
      user: 'Administrator',
      action: 'System Initialized',
      section: 'System',
      details: 'Ryan Dermaceutics Enterprise CMS initialized'
    }
  ],
  ryanHome: defaultRyanHomeContent,
  ryanAbout: defaultRyanAboutContent
};
