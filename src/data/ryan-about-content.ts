export interface AboutBadge {
  id: string;
  title: string;
  desc?: string;
  icon: string;
  popupTitle?: string;
  popupPoints?: string[];
}

export interface AboutCard {
  id: string;
  title: string;
  desc: string;
  icon: string;
  popupTitle?: string;
  popupPoints?: string[];
}

export interface PortfolioCategory {
  id: string;
  title: string;
  subtext: string;
  image: string;
  link: string;
}

export interface QualityFrameworkItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  focusPoints?: string[];
}

export interface CoreValueItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  commitment: string;
}

export interface RyanAboutContent {
  hero: {
    breadcrumbHome: string;
    breadcrumbCurrent: string;
    subtitle: string;
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    heroImage: string;
    badges: AboutBadge[];
  };
  vision: {
    subtitle: string;
    title: string;
    description: string;
    targetImage: string;
    cards: AboutCard[];
  };
  approach: {
    subtitle: string;
    title: string;
    description: string;
    petriImage: string;
    cards: AboutCard[];
  };
  portfolio: {
    subtitle: string;
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    categories: PortfolioCategory[];
  };
  quality: {
    subtitle: string;
    title: string;
    description: string;
    labImage: string;
    badges: AboutBadge[];
  };
  ethicsMedinova: {
    subtitle: string;
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    buildingImage: string;
    badges: AboutBadge[];
  };
  qualityFramework: QualityFrameworkItem[];
  coreValues: CoreValueItem[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    ogImage: string;
    canonicalUrl: string;
  };
}

export const defaultRyanAboutContent: RyanAboutContent = {
  hero: {
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'About Ryan',
    subtitle: 'A SPECIALIZED FOCUS ON',
    title: 'DERMATOLOGY',
    description: 'Ryan Dermaceutics is a specialized dermatology division dedicated to building a comprehensive portfolio of topical, oral and supportive products for diverse skin, hair, scalp and related conditions.',
    ctaText: 'OUR STORY',
    ctaLink: '#vision',
    heroImage: '/ryan/about/about_hero_collage.png',
    badges: [
      { id: 'derm', title: 'DERMATOLOGY FOCUSED', icon: 'Target' },
      { id: 'portfolio', title: 'COMPREHENSIVE PORTFOLIO', icon: 'Layers' },
      { id: 'quality', title: 'QUALITY DRIVEN', icon: 'ShieldCheck' },
      { id: 'partner', title: 'PROFESSIONAL PARTNERSHIP', icon: 'Users' }
    ]
  },
  vision: {
    subtitle: 'OUR VISION',
    title: 'TO ADVANCE DERMATOLOGY CARE',
    description: 'To establish Ryan Dermaceutics as a trusted dermatology-focused pharmaceutical brand, recognized for portfolio depth, product quality and professional engagement, contributing to better skin, hair and scalp health.',
    targetImage: '/ryan/about/about_vision_target.png',
    cards: [
      {
        id: 'innovation',
        title: 'INNOVATION',
        desc: 'Expanding access to relevant dermatology solutions',
        icon: 'Lightbulb',
        popupTitle: 'Innovation: Rethinking Possibilities in Dermatological Care',
        popupPoints: [
          'Skin health is constantly evolving, and so are the needs of patients and healthcare professionals.',
          'We encourage curiosity, scientific exploration, and fresh thinking to develop solutions that are relevant, purposeful, and forward-looking.',
          'Our commitment: To continuously explore better approaches to formulations, delivery, efficacy, and patient experience.'
        ]
      },
      {
        id: 'trust',
        title: 'TRUST',
        desc: 'Building confidence with healthcare professionals',
        icon: 'UserCheck',
        popupTitle: 'Trust & Integrity: The Foundation of Everything We Build',
        popupPoints: [
          'We conduct our work with honesty, transparency, and accountability.',
          'From product development to professional relationships, credibility is earned through consistent actions and responsible communication.',
          'Adherence to the highest ethical and clinical standards across all engagements.'
        ]
      },
      {
        id: 'growth',
        title: 'GROWTH',
        desc: 'A growing portfolio for evolving skin-health needs',
        icon: 'TrendingUp',
        popupTitle: 'Responsible Growth: Sustainable Dermatological Evolution',
        popupPoints: [
          'Responsible business means looking beyond immediate commercial results.',
          'Thoughtful choices across operations, formulation development, sustainable packaging, and medical partnerships.',
          'Continuously expanding portfolio across topical, oral, and specialized supportive care.'
        ]
      }
    ]
  },
  approach: {
    subtitle: 'OUR APPROACH',
    title: 'FOCUS. QUALITY. PARTNERSHIP.',
    description: 'Our approach is centered on a clear dermatology focus, a commitment to quality and a long-term partnership mindset with healthcare professionals and distribution partners.',
    petriImage: '/ryan/about/about_approach_petri.png',
    cards: [
      {
        id: 'derm-focus',
        title: 'DERMATOLOGY FOCUS',
        desc: 'A specialized division built around the needs of dermatology practice.',
        icon: 'Target',
        popupTitle: 'Dedicated Dermatology Focus',
        popupPoints: [
          'Entire portfolio and pipeline tailored specifically to dermatological practice.',
          'Deep understanding of cutaneous physiology, barrier repair, and patient adherence.',
          'Formulations selected to address distinct clinical stages and disease severity.'
        ]
      },
      {
        id: 'quality-focus',
        title: 'QUALITY',
        desc: 'Emphasis on consistent pharmaceutical quality and responsible practices.',
        icon: 'Settings',
        popupTitle: 'Pharmaceutical Quality & Discipline',
        popupPoints: [
          'Emphasis on consistent pharmaceutical formulation excellence.',
          'Preventive quality practices that identify and mitigate potential formulation risks.',
          'Adherence to validated stability and bio-compatibility standards.'
        ]
      },
      {
        id: 'partnership-focus',
        title: 'PARTNERSHIP',
        desc: 'Building long-term relationships with healthcare professionals and our business associates.',
        icon: 'Handshake',
        popupTitle: 'Professional Collaboration & Partnership',
        popupPoints: [
          'Working closely with dermatologists, pharmacologists, and clinical specialists.',
          'Mutual respect, knowledge-sharing, and ethical exchange of scientific literature.',
          'Committed to reliable supply chains and physician-partner support.'
        ]
      }
    ]
  },
  portfolio: {
    subtitle: 'OUR PORTFOLIO',
    title: 'A COMPREHENSIVE RANGE FOR DERMATOLOGY',
    description: 'Ryan Dermaceutics offers a diverse portfolio of topical, oral and supportive products across multiple therapeutic areas, designed to meet the evolving needs of dermatology practice.',
    ctaText: 'EXPLORE OUR PRODUCTS',
    ctaLink: '/products',
    categories: [
      {
        id: 'topical',
        title: 'TOPICAL DERMATOLOGY',
        subtext: 'Creams | Ointments | Gels | Lotions | Solutions | Soaps | Powders',
        image: '/ryan/about/portfolio_topical.png',
        link: '/products?route=Topical'
      },
      {
        id: 'oral',
        title: 'ORAL & SYSTEMIC DERMATOLOGY',
        subtext: 'Tablets | Capsules | Softgels | Syrups',
        image: '/ryan/about/portfolio_oral.png',
        link: '/products?route=Oral'
      },
      {
        id: 'hair',
        title: 'HAIR & SCALP CARE',
        subtext: 'Oral formulations | Topical solutions | Nutritional support',
        image: '/ryan/about/portfolio_hair.png',
        link: '/products?area=Hair%20%26%20Scalp'
      },
      {
        id: 'supportive',
        title: 'SUPPORTIVE & CLEANSING CARE',
        subtext: 'Cleansers | Soaps | Powders | Specialty Care',
        image: '/ryan/about/portfolio_supportive.png',
        link: '/products?area=Supportive%20Care'
      }
    ]
  },
  quality: {
    subtitle: 'QUALITY & MANUFACTURING',
    title: 'COMMITTED TO CONSISTENT QUALITY',
    description: 'Our products are manufactured in WHO-GMP compliant facilities, adhering to stringent quality standards and regulatory guidelines to ensure reliability and consistent product performance.',
    labImage: '/ryan/about/quality_microscope.png',
    badges: [
      {
        id: 'who-gmp',
        title: 'WHO-GMP MANUFACTURING',
        desc: 'Products from approved manufacturing facilities',
        icon: 'Award',
        popupTitle: 'WHO-GMP Aligned Manufacturing',
        popupPoints: [
          'Manufacturing with discipline and Quality by Design (QbD).',
          'Controlled manufacturing cleanrooms with validated environmental air handling.',
          'Documented standard operating procedures and systematic batch process monitoring.'
        ]
      },
      {
        id: 'qa',
        title: 'QUALITY ASSURANCE',
        desc: 'Stringent quality control at every stage',
        icon: 'FlaskConical',
        popupTitle: 'Comprehensive Quality Assurance (QA)',
        popupPoints: [
          'Standard Operating Procedures (SOPs) and Change-control management.',
          'Deviation and CAPA (Corrective and Preventive Action) governance.',
          'Full documentation traceability from raw active ingredient to finished packaged batch.'
        ]
      },
      {
        id: 'reg-comp',
        title: 'REGULATORY COMPLIANCE',
        desc: 'In line with applicable pharmaceutical regulations',
        icon: 'FileCheck',
        popupTitle: 'Regulatory & Compliance Excellence',
        popupPoints: [
          'Adherence to current pharmacopoeial monographs (IP/BP/USP).',
          'Systematic Good Laboratory Practice (GLP) oriented analytical records.',
          'Rigorous pharmacovigilance and post-market safety surveillance.'
        ]
      }
    ]
  },
  ethicsMedinova: {
    subtitle: 'PART OF ETHICS MEDINOVA',
    title: 'A STRONG FOUNDATION',
    description: 'Ryan Dermaceutics is a specialized dermatology division of Ethics Medinova Private Limited, a growing pharmaceutical marketing company committed to quality, integrity and long-term value creation in healthcare.',
    ctaText: 'ABOUT ETHICS MEDINOVA',
    ctaLink: '#ethics-details',
    buildingImage: '/ryan/about/ethics_building.png',
    badges: [
      {
        id: 'pharma-co',
        title: 'ESTABLISHED PHARMA COMPANY',
        desc: 'Strong foundation and expertise',
        icon: 'Building'
      },
      {
        id: 'growing-port',
        title: 'GROWING PORTFOLIO',
        desc: 'Expanding product range and markets',
        icon: 'TrendingUp'
      },
      {
        id: 'shared-val',
        title: 'SHARED VALUES',
        desc: 'Quality, integrity and customer focus',
        icon: 'HeartHandshake'
      }
    ]
  },
  qualityFramework: [
    {
      id: 'qf-1',
      number: '01',
      title: 'WHO-GMP ALIGNED MANUFACTURING',
      tagline: 'Manufacturing with discipline. Quality by design.',
      description: 'Our manufacturing partners operate within established WHO-GMP-aligned quality systems, incorporating controlled manufacturing processes, documented procedures, trained personnel, appropriate environmental controls, and systematic process monitoring.',
      focusPoints: ['Controlled Cleanroom Operations', 'Continuous Process Monitoring', 'Qualified Technical Personnel', 'Adherence to Validated Parameters']
    },
    {
      id: 'qf-2',
      number: '02',
      title: 'QUALITY ASSURANCE',
      tagline: 'Building quality into every process.',
      description: 'Our Quality Assurance approach focuses on establishing and maintaining a systematic framework of standard operating procedures, documentation, process controls, qualification, validation, and compliance oversight.',
      focusPoints: ['Standard Operating Procedures (SOPs)', 'Change-control Management', 'Deviation and CAPA Management', 'Documentation and Traceability', 'Supplier & Manufacturing Oversight']
    },
    {
      id: 'qf-3',
      number: '03',
      title: 'QUALITY CONTROL',
      tagline: 'Testing that supports confidence.',
      description: 'Quality Control provides the scientific foundation for evaluating the identity, strength, purity, consistency, and other applicable quality characteristics of our products across raw materials and finished lots.',
      focusPoints: ['Raw Material Assay & Identification', 'Packaging Integrity Testing', 'In-process Quality Verification', 'Finished Product Release Standards']
    },
    {
      id: 'qf-4',
      number: '04',
      title: 'GLP-ORIENTED SCIENTIFIC PRACTICES',
      tagline: 'Reliable data. Responsible science.',
      description: 'Where applicable to testing and development activities, we support Good Laboratory Practice (GLP)-oriented systems that emphasize controlled procedures, qualified personnel, data integrity, and traceable scientific records.',
      focusPoints: ['Calibrated Analytical Instrumentation', 'Audit-ready Scientific Records', 'Data Integrity Protocols', 'Validated Analytical Methodology']
    },
    {
      id: 'qf-5',
      number: '05',
      title: 'REGULATORY & COMPLIANCE EXCELLENCE',
      tagline: 'Staying prepared for an evolving regulatory landscape.',
      description: 'Our quality philosophy extends beyond baseline requirements to maintaining continuous awareness of evolving regulatory expectations, quality standards, and compliance practices.',
      focusPoints: ['Pharmacopoeial Monograph Compliance', 'Forward-looking Regulatory Review', 'Labeling & Packaging Compliance', 'Systematic Technical Documentation']
    },
    {
      id: 'qf-6',
      number: '06',
      title: 'PHARMACOVIGILANCE & PRODUCT SAFETY',
      tagline: 'Quality continues after the product reaches the market.',
      description: 'Post-marketing product safety is an essential component of our quality framework. We support proactive pharmacovigilance and surveillance to monitor product safety throughout distribution.',
      focusPoints: ['Post-market Adverse Event Monitoring', 'Physician & Patient Feedback Intake', 'Safety Documentation Escalation', 'Continuous Product Risk Reassessment']
    },
    {
      id: 'qf-7',
      number: '07',
      title: 'PRODUCT TRACEABILITY & CONTROL',
      tagline: 'Every batch matters.',
      description: 'Maintaining appropriate documentation and traceability enables precision control throughout the product lifecycle, from manufacturing through distribution.',
      focusPoints: ['Batch Manufacturing Records (BMR)', 'Temperature-controlled Storage Audits', 'Serial Track-and-Trace Capability', 'Systematic Distribution Logs']
    },
    {
      id: 'qf-8',
      number: '08',
      title: 'CONTINUOUS IMPROVEMENT',
      tagline: 'Because quality should never stand still.',
      description: 'Quality excellence is an ongoing journey. We continuously identify opportunities to strengthen processes, reduce potential risks, improve consistency, and enhance operational controls.',
      focusPoints: ['Periodic Quality Reviews (PQR)', 'Root Cause Analysis', 'Risk Management Integration', 'Operational Efficiency Refinement']
    }
  ],
  coreValues: [
    {
      id: 'cv-1',
      number: '01',
      title: 'INTEGRITY',
      tagline: 'Trust is the foundation of everything we build.',
      description: 'We conduct our work with honesty, transparency, and accountability. From product development to professional relationships, credibility is earned through consistent actions and high ethical standards.',
      commitment: 'To do what is right, communicate responsibly, and build relationships that stand the test of time.'
    },
    {
      id: 'cv-2',
      number: '02',
      title: 'INNOVATION',
      tagline: 'Rethinking possibilities in dermatological care.',
      description: 'Skin health is constantly evolving, and so are the needs of patients and healthcare professionals. We encourage curiosity and fresh thinking to develop solutions that are relevant and purposeful.',
      commitment: 'To continuously explore better approaches to formulations, delivery, efficacy, and patient experience.'
    },
    {
      id: 'cv-3',
      number: '03',
      title: 'COLLABORATION',
      tagline: 'Better outcomes begin with better partnerships.',
      description: 'Dermatology is a multidisciplinary field, and meaningful progress requires collective expertise across healthcare professionals, formulation specialists, and scientific teams.',
      commitment: 'To create partnerships built on knowledge-sharing, mutual respect, and a shared pursuit of better clinical outcomes.'
    },
    {
      id: 'cv-4',
      number: '04',
      title: 'QUALITY & EXCELLENCE',
      tagline: 'No compromise when it comes to what goes into every product.',
      description: 'Quality is not a final checkpoint at Ryan Dermaceutics—it is embedded throughout our approach. We emphasize careful formulation selection, manufacturing standards, and continuous evaluation.',
      commitment: 'To pursue higher standards at every stage and continuously improve the products and processes we offer.'
    },
    {
      id: 'cv-5',
      number: '05',
      title: 'RESPONSIBLE GROWTH',
      tagline: 'Progress that considers the world around us.',
      description: 'We believe responsible business means looking beyond immediate results to make thoughtful choices across operations, packaging, and resource utilization for a sustainable future.',
      commitment: 'To grow responsibly while remaining conscious of our environmental, social, and operational impact.'
    },
    {
      id: 'cv-6',
      number: '06',
      title: 'PEOPLE & PATIENT FOCUS',
      tagline: 'Because every formulation ultimately serves a human need.',
      description: 'Behind every dermatological concern is a person seeking better skin health, comfort, and quality of life. This understanding keeps people at the centre of our thinking.',
      commitment: 'To keep real-world clinical needs at the centre of our products, communication, and partnerships.'
    }
  ],
  seo: {
    metaTitle: 'About Ryan Dermaceutics | A Specialized Dermatology Division',
    metaDescription: 'Ryan Dermaceutics is dedicated to building a comprehensive portfolio of topical, oral and supportive dermatological solutions backed by WHO-GMP manufacturing.',
    keywords: 'Ryan Dermaceutics, dermatology division, Ethics Medinova, topical dermatology, oral dermatology, WHO-GMP, skin health, scalp care',
    ogImage: '/ryan/about/about_hero_collage.png',
    canonicalUrl: 'https://obagiindia.vercel.app/about'
  }
};
