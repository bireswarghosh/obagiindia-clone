import { FullSiteData } from '../types/content';

export const defaultSiteData: FullSiteData = {
  theme: {
    primaryNavy: '#21275c',
    deepNavy: '#0e2238',
    accentGold: '#b1843b',
    canvasBg: '#f8f7f5',
    textDark: '#1a1c20',
    textMuted: '#86868f',
    borderColor: 'rgba(0, 0, 0, 0.08)'
  },
  storage: {
    provider: 'local',
    activeSource: 'local',
    bucketName: 'obagi-media-bucket',
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
    metaTitle: 'Obagi® Medical India | Transformational Skincare & Clinical Solutions',
    metaDescription: 'Discover Obagi Medical India - #1 Leading U.S. Physician Recommended Brand for Pigmentation, Fine Lines, and Skin Rejuvenation.',
    keywords: 'Obagi Medical, Nu-Derm, Hydro-Drops, Skincare India, Dermatologist Recommended, Anti-Aging',
    ogImage: 'https://static.wixstatic.com/media/4833d7_49dc6fa64d1d4175a6c782c81c6b7a60f000.jpg',
    canonicalUrl: 'https://www.obagiindia.com'
  },
  header: {
    logoText: 'OBAGI MEDICAL',
    logoImageUrl: '',
    logoColor: '#ffffff',
    logoPosition: 'left',
    broughtByText: 'Brought to you in India by SPECTRA',
    broughtByLogoUrl: '',
    broughtByLinkUrl: 'https://www.spectramedicals.com/',
    searchEnabled: true,
    searchPlaceholder: 'Search products, clinical systems...',
    navItems: [
      {
        id: 'why-obagi',
        title: 'Why Obagi ?',
        href: '#comp-lwrl1yo4',
        dropdown: [
          { title: 'Our Science', href: '#comp-mlqlr0fm' },
          { title: 'Clinical Results', href: '#comp-lwqg8022' },
          { title: 'Physician Heritage', href: '#comp-mlqmnjor' }
        ]
      },
      {
        id: 'skin-concern',
        title: 'Skin Concern',
        href: '#comp-mlqmnjor',
        dropdown: [
          { title: 'Uneven Skin Tone & Discolouration', href: '#comp-lwrl9iel' },
          { title: 'Sun Damage', href: '#comp-lwrl9iel' },
          { title: 'Signs of Aging', href: '#comp-lwrl9iel' },
          { title: 'Acne Blemishes', href: '#comp-lwrl9iel' },
          { title: 'Oily Skin or Greasy Skin', href: '#comp-lwrl9iel' },
          { title: 'Eye Area', href: '#comp-lwrl9iel' },
          { title: 'Dry Skin', href: '#comp-lwrl9iel' },
          { title: 'Sensitive Skin', href: '#comp-lwrl9iel' },
          { title: 'Young Skin', href: '#comp-lwrl9iel' },
          { title: 'Post-Treatment', href: '#comp-lwrl9iel' }
        ]
      },
      {
        id: 'product-range',
        title: 'Product Range',
        href: '#comp-lwrl9iel',
        dropdown: [
          { title: 'Obagi Nu-Derm Fx™ Systems', href: '#comp-lwrl9iel' },
          { title: 'Obagi-C® Fx Systems', href: '#comp-lwrl9iel' },
          { title: 'Professional-C Portfolio', href: '#comp-lwrl9iel' },
          { title: 'ELASTIderm®', href: '#comp-lwrl9iel' },
          { title: 'Obagi Nu-Cil®', href: '#comp-lwrl9iel' },
          { title: 'Hydrators', href: '#comp-lwrl9iel' },
          { title: 'CLENZIderm M.D.™', href: '#comp-lwrl9iel' },
          { title: 'Sun Protectors', href: '#comp-lwrl9iel' },
          { title: 'Obagi Blue Peel RADIANCE®', href: '#comp-lwrl9iel' },
          { title: 'Obagi Retinol®', href: '#comp-lwrl9iel' }
        ]
      },
      {
        id: 'find-obagi',
        title: 'Find Obagi',
        href: '#comp-lx8nvywg',
        dropdown: [
          { title: 'Clinic Finder', href: '#comp-lx8nvywg' },
          { title: 'Contact us', href: '#comp-ml6nay6u' }
        ]
      }
    ]
  },
  marquee: {
    enabled: true,
    text: 'CLINICALLY-TESTED          |          TRANSFORMATIONAL SKINCARE          |          35 YEARS OF EXPERTISE          |          TRUSTED BY PHYSICIANS          |          PROVEN RESULTS',
    speedSeconds: 20,
    textColor: '#ffffff',
    backgroundColor: '#2B328C'
  },
  hero: {
    heading: 'Obagi® Medical India',
    headingColor: '#2B328C',
    subtitle: 'WINNER 2025\nSkin Product / Range of the Year\n-Aesthetic Awards',
    subtitleColor: '#2B328C',
    awardBadge: 'WINNER 2025',
    awardText: 'Skin Product / Range of the Year\n-Aesthetic Awards',
    mediaType: 'video',
    mediaUrl: 'https://video.wixstatic.com/video/4833d7_49dc6fa64d1d4175a6c782c81c6b7a60/720p/mp4/file.mp4',
    posterUrl: 'https://static.wixstatic.com/media/4833d7_49dc6fa64d1d4175a6c782c81c6b7a60f000.jpg/v1/fill/w_1265,h_585,al_c,q_85,usm_0.33_1.00_0.00,enc_avif,quality_auto/4833d7_49dc6fa64d1d4175a6c782c81c6b7a60f000.jpg',
    backgroundColor: '',
    autoPlay: true,
    loop: true,
    morphEnabled: true,
    morphSpeed: 1
  },
  history: {
    title: 'Our History',
    titleColor: '#2B328C',
    description: 'With over 35 years of clinically proven results, Obagi Medical Products are the Number 1 physician dispensed skin care brand. Obagi Medical products have grown from humble beginnings to having hundreds of thousands of devotees, our vision however hasn’t changed – to transform the skin industry and create a more confident and fearless future. We never take our eyes off tomorrow. That’s the secret behind creating a skin care future that is intelligent, accessible and healthier than ever.',
    textColor: '#2B328C',
    backgroundColor: '',
    layoutType: 'grid',
    primaryImage: 'https://static.wixstatic.com/media/4833d7_b81f1121c3eb4ed6807efe18902fb0a1~mv2.jpg/v1/fill/w_915,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/obagi-nu-derm-fx-collection-1600x1600.jpg',
    badgeAward: 'Aesthetics Award Winner 2025',
    badgeYear: '2025',
    badgeImage: 'https://static.wixstatic.com/media/4833d7_3a4748500da24047881d90f975d42006~mv2.jpg/v1/fill/w_401,h_222,al_c,lg_1,q_80,enc_avif,quality_auto/aaw2025.jpg',
    dropperImage: 'https://static.wixstatic.com/media/4833d7_43702b8008e5402c8c805580c51dbcd8~mv2.jpg/v1/fill/w_458,h_653,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/OBAGI_Lifestyle_Model_Product_Texture_Dropper_HiRes.jpg',
    portraitImage: 'https://static.wixstatic.com/media/4833d7_d3685f4b98c2433cb940f7111041fb92~mv2.jpg/v1/fill/w_458,h_297,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/20221111_Fitzpatrick1-PortraitWithProduct-Hydration-HydrateLuxe-DHD_3989_HIRES.jpg',
    galleryImages: [
      'https://static.wixstatic.com/media/4833d7_b81f1121c3eb4ed6807efe18902fb0a1~mv2.jpg/v1/fill/w_915,h_653,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/obagi-nu-derm-fx-collection-1600x1600.jpg',
      'https://static.wixstatic.com/media/4833d7_3a4748500da24047881d90f975d42006~mv2.jpg/v1/fill/w_401,h_222,al_c,lg_1,q_80,enc_avif,quality_auto/aaw2025.jpg'
    ]
  },
  about: {
    title: 'About Obagi Medical',
    titleColor: '#2B328C',
    quote: '“We are a complete skin care company, designing transformational products that promote skin health — and build on our legacy of science and innovation.”',
    quoteColor: '#2B328C',
    paragraph: 'Obagi Medical® Products have been specifically formulated to transform the skin from within to result in younger, healthier-looking skin. The Obagi Medical® Product range helps reduce the visible signs of ageing such as fine-lines, wrinkles, melasma (dark sports), hyper-pigmentation, laxity and uneven texture with additional targeted treatments for acne.',
    paragraphColor: '#2B328C',
    buttonText: 'Explore Obagi',
    buttonLink: '#comp-lwrl9iel',
    backgroundColor: ''
  },
  trustBanner: {
    heading: '#1 Leading U.S. Physician Recommended Brand*',
    headingColor: '#2B328C',
    tagline: 'FOR TOP 3 SKIN CONCERNS: Pigmentation | Fine Lines & Wrinkles | Sagging Skin & Loss of Elasticity',
    taglineColor: '#2B328C',
    concern1: 'Pigmentation & Melasma',
    concern2: 'Fine Lines & Wrinkles',
    concern3: 'Loss of Elasticity',
    experienceText: 'Over 35 years of clinically proven transformational skincare.',
    disclaimer: '*Kline 2024 Physician-Dispensed Skincare Market Report.',
    backgroundColor: '',
    items: [
      {
        id: 'tb-1',
        title: 'OBAGI® MEDICAL IS THE ORIGINAL',
        description: 'As pioneers of medical-grade skincare, we transformed the industry with a commitment to science and unmatched standards. For over 35 years, our products have delivered trusted, transformative results across all skin types.'
      },
      {
        id: 'tb-2',
        title: 'TRUST OVER TRENDS',
        description: 'We transform skin through clinically proven, science backed solutions. We are obsessed with achieving skincare perfection and transforming lives by seeing skin differently. Trusted by professionals worldwide, serving over 80 countries across the globe.'
      },
      {
        id: 'tb-3',
        title: 'PHARMA GRADE INGREDIENTS AND PRESCRIPTION STRENGTH TREATMENTS',
        description: 'Our cutting-edge formulations are created with pure, potent ingredients at efficacious concentrations that produce the most optimal outcomes.'
      },
      {
        id: 'tb-4',
        title: 'TIRELESSLY TESTED',
        description: 'The deepest range of clinical testing (in-vitro and in-vivo) to assess the truly transformative and skin tolerated results on all skin types and tones.'
      }
    ]
  },
  research: {
    title: 'Obagi Research & Development',
    titleColor: '#FFFFFF',
    description: 'At Obagi, we believe skin care is about more than “correcting” or even “preventing;” it’s about unleashing your skin’s full potential. That’s why we create inclusive products backed by scientifically proven formulations.',
    textColor: '#FFFFFF',
    backgroundImage: 'https://static.wixstatic.com/media/4833d7_638d2b9c993f41aeb733907173f188bc~mv2.webp/v1/fill/w_1898,h_309,fp_0.48_0.74,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/4833d7_638d2b9c993f41aeb733907173f188bc~mv2.webp',
    backgroundColor: '#161D6F',
    items: [
      {
        id: 'res-1',
        icon: 'Microscope',
        title: 'Cellular Penetration',
        description: 'Optimized molecular transport delivers active ingredients deep into dermal layers.',
        imageUrl: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80',
        hoverEffect: 'zoom'
      },
      {
        id: 'res-2',
        icon: 'Shield',
        title: 'Clinical Efficacy',
        description: 'Double-blind clinical trials validate significant reduction in visible hyperpigmentation.',
        imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
        hoverEffect: 'blur'
      },
      {
        id: 'res-3',
        icon: 'Award',
        title: 'Physician Tested',
        description: 'Tested across all Fitzpatrick skin types (I - VI) for complete safety and biocompatibility.',
        imageUrl: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&w=800&q=80',
        hoverEffect: 'zoom'
      }
    ]
  },
  approach: {
    sectionTitle: 'Our Scientific Philosophy',
    tabs: [
      {
        key: 'approach',
        title: 'Our Approach to Innovation',
        desc: 'At Obagi, breakthrough innovation begins with a deep understanding of skin biology and patient needs. We combine dermatologist insights with state-of-the-art biochemistry to formulate solutions that create visible, lasting cellular improvements.',
        image: 'https://static.wixstatic.com/media/4833d7_8df05a975c034ffe9ab6011eff353dc0~mv2.webp/v1/fill/w_564,h_728,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/scientist-pouring-red-liquid_2560x.webp',
        visible: true
      },
      {
        key: 'progress',
        title: 'Our Process',
        desc: 'Our rigorous product development process leaves no stone left unturned. No detail is too small when formulating transformational products that deliver clinically meaningful results.',
        image: 'https://static.wixstatic.com/media/4833d7_89f2940aeb7f44dd80b03fba406941b4~mv2.webp/v1/fill/w_496,h_640,al_c,q_80,enc_avif,quality_auto/woman-scientist-doing-experiment_960x.webp',
        visible: true
      },
      {
        key: 'standard',
        title: 'Our Standards',
        desc: 'Genuine Obagi - Obagi is committed to set and uphold the highest product testing standards. We conduct clinical testing across all Fitzpatrick skin phototypes to ensure universal safety and efficacy.',
        image: 'https://static.wixstatic.com/media/4833d7_58d317fb587b4fe99de2c8ee9ed76531~mv2.webp/v1/fill/w_496,h_640,al_c,q_80,enc_avif,quality_auto/science-research-lab-microscope_960x.webp',
        visible: true
      }
    ]
  },
  stickyCircle: {
    imageUrl: 'https://static.wixstatic.com/media/c837a6_297eb5ebbb894e709a4ae04906201fa2~mv2.jpg/v1/fill/w_1898,h_1000,al_c,q_85/pexels-luu-thanh-truc-335871-9085814.jpg',
    startPercent: 18,
    endPercent: 90
  },
  cardsSection: {
    pinkSerumImage: 'https://static.wixstatic.com/media/c837a6_297eb5ebbb894e709a4ae04906201fa2~mv2.jpg/v1/fill/w_1898,h_353,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/pexels-luu-thanh-truc-335871-9085814.jpg',
    morphSpeed: 1.2,
    awardVideoUrl: 'https://video.wixstatic.com/video/4833d7_958d8b59c22f449990b3c2a75c660389/720p/mp4/file.mp4',
    awardVideoPoster: 'https://static.wixstatic.com/media/4833d7_958d8b59c22f449990b3c2a75c660389f001.jpg/v1/fill/w_1265,h_200,al_c,q_80,usm_0.33_1.00_0.00,enc_avif,quality_auto/4833d7_958d8b59c22f449990b3c2a75c660389f001.jpg',
    awardVideoLabel: 'New beauty award 2024',
    awardVideoAutoPlay: true,
    cards: [
      {
        id: 'card-1',
        number: '1',
        title: 'Obagi Nu-Derm Fx™ Systems',
        subtitle: 'Reveal Younger, Healthier-Looking Skin',
        description: 'Ideal for: Age Spots, Hyperpigmentation, Rough Skin, Sallowness, Redness. Specially formulated with 7% Arbutin to clear skin discoloration and promote cellular renewal.',
        imageUrl: 'https://static.wixstatic.com/media/4833d7_b81f1121c3eb4ed6807efe18902fb0a1~mv2.jpg/v1/fill/w_446,h_446,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/obagi-nu-derm-fx-collection-1600x1600.jpg',
        bgColor: '#FFFFFF',
        textColor: '#2B328C',
        order: 1,
        visible: true
      },
      {
        id: 'card-2',
        number: '2',
        title: 'Obagi Daily Hydro-Drops',
        subtitle: 'Radiance in every drop',
        description: 'Daily Hydro-Drops™ are hypoallergenic, non-comedogenic, so won’t block pores, dermatologist and ophthalmologist tested. Infused with Vitamin B3, Abyssinian Oil, and Hibiscus Oil.',
        imageUrl: 'https://static.wixstatic.com/media/4833d7_0e709d6bf09f449a95982e60334a21d0~mv2.jpg/v1/fill/w_446,h_446,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/2022Q4WEBSHOOT_Hydrate_DHD_r2_PDPmacro_4400x4400_72dpi.jpg',
        bgColor: '#FFFFFF',
        textColor: '#2B328C',
        order: 2,
        visible: true
      },
      {
        id: 'card-3',
        number: '3',
        title: 'Nu-Cil® Hair & Lash',
        subtitle: 'Powered by NouriPlex™ Technology',
        description: 'Nourishes and visibly thickens thinning eyelashes and eyebrows. Tested and proven to enhance follicle volume and lash density.',
        imageUrl: 'https://static.wixstatic.com/media/4833d7_e37f8725511940928a31982f09cceeeb~mv2.jpg/v1/fill/w_446,h_446,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/cohley_elastiderm-facial-serum_greta-berzonskiene_727612_RETOUCHED.jpg',
        bgColor: '#FFFFFF',
        textColor: '#2B328C',
        order: 3,
        visible: true
      }
    ]
  },
  quote: {
    quoteText: '“Obagi transformed our approach to medical skincare. The clinical efficacy and cellular transformation speak for themselves.”',
    quoteAuthor: 'Dr. Megan Brown, MD',
    quoteRole: 'Dermatological Aesthetics & Clinical Advisor',
    quoteImage: './Obagi India _ obagi products_files/CEO.jpg',
    textColor: '#2B328C',
    backgroundColor: '#FFFFFF'
  },
  newsletter: {
    newsletterTitle: 'Join The OBAGI Newsletter',
    newsletterDesc: 'Be the first to receive the latest scientific innovations, product launches, and exclusive clinical skincare updates.',
    newsletterImage: 'https://static.wixstatic.com/media/4833d7_0e709d6bf09f449a95982e60334a21d0~mv2.jpg',
    buttonText: 'Subscribe',
    subscribers: [
      {
        id: 'sub-1',
        email: 'dr.sharma.clinic@example.com',
        date: '9/24/2026, 10:30:00 AM'
      },
      {
        id: 'sub-2',
        email: 'aesthetics.mumbai@example.com',
        date: '9/25/2026, 8:15:00 AM'
      }
    ]
  },
  footer: {
    logoText: 'OBAGI MEDICAL',
    companyName: 'Specra Healthcare India',
    address: 'Mumbai & New Delhi, India',
    email: 'support@obagiindia.com',
    phone: '+91 22 6828 0000',
    copyright: '© 2026 Obagi Cosmeceuticals LLC. Brought to you in India by Specra Healthcare. All rights reserved.',
    askAiEnabled: true,
    quickLinks: [
      { title: 'Why Obagi?', href: '#comp-lwrl1yo4' },
      { title: 'Our Science', href: '#comp-mlqlr0fm' },
      { title: 'Product Range', href: '#comp-lwrl9iel' },
      { title: 'Newsletter', href: '#comp-lx8nvywg' }
    ],
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/obagimedical' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/obagi' }
    ]
  },
  floatingWidget: {
    enabled: true,
    mainButtonText: 'Chat with AI',
    unreadBadgeText: 'Need Help?',
    prompts: [
      'Want to know about Obagi Nu-Derm Fx™ Systems?',
      'Explore Obagi',
      'Address the Signs of Aging Skin'
    ],
    accentColor: '#161D6F'
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
      details: 'Obagi India Enterprise CMS initialized'
    }
  ]
};
