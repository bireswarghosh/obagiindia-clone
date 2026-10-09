export interface ObagiPillar {
  id: string;
  title: string;
  titleColor?: string;
  description: string;
  textColor?: string;
}

export interface ObagiRdTab {
  id: string;
  title: string;
  titleColor?: string;
  description: string;
  textColor?: string;
  imageUrl: string;
}

export interface ObagiProductSystem {
  id: string;
  title: string;
  titleColor?: string;
  subtitle: string;
  subtitleColor?: string;
  description: string;
  textColor?: string;
  imageUrl: string;
  linkUrl?: string;
}

export interface ObagiStatItem {
  id: string;
  value: string;
  valueColor?: string;
  label: string;
  labelColor?: string;
}

export interface ObagiJobItem {
  id: string;
  title: string;
  titleColor?: string;
  location: string;
  locationColor?: string;
  linkUrl?: string;
}

export interface ObagiPressItem {
  id: string;
  headline: string;
  headlineColor?: string;
  source: string;
  sourceColor?: string;
  linkUrl?: string;
}

export interface ObagiHomeContent {
  // Part 1: Hero Section
  hero: {
    title: string;
    titleColor?: string;
    awardBadge: string;
    awardBadgeColor?: string;
    heroImage: string;
    awardBadgeImage: string;
    historyIntroText: string;
    historyIntroTextColor?: string;
  };

  // Part 2: Trust Banner & Brand Pillars
  trustBanner: {
    recommendedHeading: string;
    recommendedHeadingColor?: string;
    concernsText: string;
    concernsTextColor?: string;
    pillars: ObagiPillar[];
  };

  // Part 3: History & About Obagi Story
  story: {
    historyTitle: string;
    historyTitleColor?: string;
    historyBody: string;
    historyBodyColor?: string;
    historyImage: string;
    aboutTitle: string;
    aboutTitleColor?: string;
    aboutQuote: string;
    aboutQuoteColor?: string;
    aboutParagraph: string;
    aboutParagraphColor?: string;
    aboutImage: string;
  };

  // Part 4: Research, Development & Science
  research: {
    rdTitle: string;
    rdTitleColor?: string;
    rdDescription: string;
    rdDescriptionColor?: string;
    tabs: ObagiRdTab[];
  };

  // Part 5: Featured Collections / Systems
  products: {
    sectionTitle: string;
    sectionTitleColor?: string;
    systems: ObagiProductSystem[];
  };

  // Part 6: Key Numbers & Statistics
  numbers: {
    title: string;
    titleColor?: string;
    stats: ObagiStatItem[];
  };

  // Part 7: Careers & Press Releases
  careers: {
    title: string;
    titleColor?: string;
    subtitle: string;
    subtitleColor?: string;
    jobs: ObagiJobItem[];
  };
  press: {
    title: string;
    titleColor?: string;
    items: ObagiPressItem[];
  };

  // Part 8: Quote, Newsletter & Legal
  quote: {
    author: string;
    role: string;
    authorColor?: string;
    roleColor?: string;
    image: string;
  };
  newsletter: {
    title: string;
    titleColor?: string;
    subtitle: string;
    subtitleColor?: string;
  };
  footer: {
    copyright: string;
    copyrightColor?: string;
  };
}

export const defaultObagiHomeContent: ObagiHomeContent = {
  // Part 1: Hero Section
  hero: {
    title: 'Obagi® Medical India',
    titleColor: '#000000',
    awardBadge: 'WINNER 2025\nSkin Product / Range of the Year\n-Aesthetic Awards',
    awardBadgeColor: '#000000',
    heroImage: 'https://static.wixstatic.com/media/4833d7_43702b8008e5402c8c805580c51dbcd8~mv2.jpg',
    awardBadgeImage: 'https://static.wixstatic.com/media/4833d7_3a4748500da24047881d90f975d42006~mv2.jpg',
    historyIntroText: 'With over 35 years of clinically proven results, Obagi Medical Products are the Number 1 physician dispensed skin care range in the world. Obagi Medical products have grown from humble beginnings to having hundreds of thousands of devotees, our vision however hasn’t changed – to transform the skin industry and create a more confident and fearless future. We never take our eyes off tomorrow. That’s the secret to creating a skin care future that is intelligent, accessible and healthier than ever.',
    historyIntroTextColor: '#000000'
  },

  // Part 2: Trust Banner & Brand Pillars
  trustBanner: {
    recommendedHeading: '#1 Leading U.S. Physician Recommended Brand*',
    recommendedHeadingColor: '#000000',
    concernsText: 'FOR TOP 3 SKIN CONCERNS:     Pigmentation  |  Fine Lines & Wrinkles  |  Sagging Skin & Loss of Elasticity',
    concernsTextColor: '#000000',
    pillars: [
      {
        id: 'pillar-1',
        title: 'OBAGI® MEDICAL IS THE ORIGINAL',
        titleColor: '#000000',
        description: 'As pioneers of medical-grade skincare, we transformed the industry with a commitment to science and unmatched standards. For over 35 years, our products have delivered trusted, transformative results across all skin types.',
        textColor: '#000000'
      },
      {
        id: 'pillar-2',
        title: 'TRUST OVER TRENDS',
        titleColor: '#000000',
        description: 'We transform skin through clinically proven, science backed solutions. We are obsessed with achieving skincare perfection and transforming lives by seeing skin differently. Trusted by professionals worldwide, serving over 80 countries across the globe.',
        textColor: '#000000'
      },
      {
        id: 'pillar-3',
        title: 'PHARMA GRADE INGREDIENTS AND PRESCRIPTION STRENGTH TREATMENTS',
        titleColor: '#000000',
        description: 'Our cutting-edge formulations are created with pure, potent ingredients at efficacious concentrations that produce the most optimal outcomes.',
        textColor: '#000000'
      },
      {
        id: 'pillar-4',
        title: 'TIRELESSLY TESTED',
        titleColor: '#000000',
        description: 'The deepest range of clinical testing (in-vitro and in-vivo) to assess the truly transformative and skin tolerated results on all skin types and tones.',
        textColor: '#000000'
      }
    ]
  },

  // Part 3: History & About Obagi Story
  story: {
    historyTitle: 'Our History',
    historyTitleColor: '#000000',
    historyBody: 'With over 35 years of clinically proven results, Obagi Medical Products are the Number 1 physician dispensed skin care range in the world. Obagi Medical products have grown from humble beginnings to having hundreds of thousands of devotees, our vision however hasn’t changed – to transform the skin industry and create a more confident and fearless future. We never take our eyes off tomorrow. That’s the secret to creating a skin care future that is intelligent, accessible and healthier than ever.',
    historyBodyColor: '#000000',
    historyImage: 'https://static.wixstatic.com/media/4833d7_b81f1121c3eb4ed6807efe18902fb0a1~mv2.jpg',
    aboutTitle: 'About Obagi Medical',
    aboutTitleColor: '#000000',
    aboutQuote: '“We are a complete skin care company, designing transformational products that promote skin health — not just today but for many more tomorrows, too”',
    aboutQuoteColor: '#000000',
    aboutParagraph: 'Obagi Medical® Products have been specifically formulated to transform the skin from within to result in younger, healthier-looking skin. The Obagi Medical® Product range helps reduce the visible signs of ageing such as fine-lines, wrinkles, melasma (dark sports), hyper-pigmentation, laxity and uneven texture with additional targeted treatments for acne. With over 35 years under our belts, we continue to design transformational products that promote skin health and build on our legacy of science and innovation. Obagi is a complete skin care company designed and tested for every skin type – there really is a solution for everyone.',
    aboutParagraphColor: '#000000',
    aboutImage: 'https://static.wixstatic.com/media/4833d7_d3685f4b98c2433cb940f7111041fb92~mv2.jpg'
  },

  // Part 4: Research, Development & Science
  research: {
    rdTitle: 'Obagi Research & Development',
    rdTitleColor: '#000000',
    rdDescription: 'At Obagi, we believe skin care is about more than “correcting” or even “preventing;” it’s about unleashing your skin’s full potential. We are dedicated to developing scientifically backed, clinical-quality formulations to promote healthy, future-facing skin so you can greet the future with confidence. Innovation is everywhere, the key is to look in the right places. Our philosophy is to meticulously develop transformational products and rigorously test them to ensure every face is cared for, everywhere.',
    rdDescriptionColor: '#000000',
    tabs: [
      {
        id: 'tab-approach',
        title: 'Our Approach to Innovation',
        titleColor: '#000000',
        description: 'At Obagi, breakthrough innovation begins with a deep understanding of skin biology. Knowing how the skin works at the cellular level enables us to systematically approach each skin condition and develop truly tailored, targeted solutions that deliver real results.',
        textColor: '#000000',
        imageUrl: 'https://static.wixstatic.com/media/4833d7_638d2b9c993f41aeb733907173f188bc~mv2.webp'
      },
      {
        id: 'tab-process',
        title: 'Our Process',
        titleColor: '#000000',
        description: 'Our rigorous product development process leaves no stone left unturned. No detail is too small when it comes to delivering on our promise of optimal skin health. We formulate with the gold-standard ingredients, develop custom, proprietary delivery systems, test obsessively with leading dermatologists, and constantly innovate to deliver better-than-ever formulas.',
        textColor: '#000000',
        imageUrl: 'https://static.wixstatic.com/media/4833d7_8df05a975c034ffe9ab6011eff353dc0~mv2.webp'
      },
      {
        id: 'tab-standards',
        title: 'Our Standards',
        titleColor: '#000000',
        description: 'Genuine Obagi - Obagi is committed to set and uphold the highest product testing standards at every stage of product development. Every Obagi Medical product undergoes comprehensive safety testing for skin sensitization, allergenicity, non-comedogenicity and photo-toxicity to prove its transformative effectiveness on all Fitzpatrick skin types.',
        textColor: '#000000',
        imageUrl: 'https://static.wixstatic.com/media/4833d7_89f2940aeb7f44dd80b03fba406941b4~mv2.webp'
      }
    ]
  },

  // Part 5: Featured Collections / Systems
  products: {
    sectionTitle: 'Featured Systems & Ranges',
    sectionTitleColor: '#000000',
    systems: [
      {
        id: 'system-nu-derm',
        title: 'Obagi Nu-Derm Fx™ Systems',
        titleColor: '#000000',
        subtitle: 'Reveal Younger, Healthier-Looking Skin',
        subtitleColor: '#000000',
        description: 'Ideal for: Age Spots, Hyperpigmentation, Rough Skin, Sallowness, Redness',
        textColor: '#000000',
        imageUrl: 'https://static.wixstatic.com/media/4833d7_b81f1121c3eb4ed6807efe18902fb0a1~mv2.jpg',
        linkUrl: 'https://www.obagiindia.com/nu-derm-fx-systems'
      },
      {
        id: 'system-hydro-drops',
        title: 'Obagi Daily Hydro-Drops',
        titleColor: '#000000',
        subtitle: 'Radiance in every drop',
        subtitleColor: '#000000',
        description: 'Daily Hydro-Drops™ are hypoallergenic, non-comedogenic, so won’t block pores, dermatologist and ophthalmologist tested, ensuring they are safe for use around the eyes.',
        textColor: '#000000',
        imageUrl: 'https://static.wixstatic.com/media/4833d7_0e709d6bf09f449a95982e60334a21d0~mv2.jpg',
        linkUrl: 'https://www.obagiindia.com/obagi-hydrate'
      },
      {
        id: 'system-nu-cil',
        title: 'Obagi Nu-Cil®',
        titleColor: '#000000',
        subtitle: 'Clinically proven hair growth system to address hair thinning on scalp, brows, and lashes.',
        subtitleColor: '#000000',
        description: 'Obagi’s Nu‑Cil product range is designed to enhance the appearance of lashes, brows, and scalp health with clinically-proven technology.',
        textColor: '#000000',
        imageUrl: 'https://static.wixstatic.com/media/4833d7_e37f8725511940928a31982f09cceeeb~mv2.jpg',
        linkUrl: 'https://www.obagiindia.com/obagi-nu-cil'
      }
    ]
  },

  // Part 6: Key Numbers & Statistics
  numbers: {
    title: 'BGS in Numbers',
    titleColor: '#000000',
    stats: [
      { id: 'stat-1', value: '75', valueColor: '#000000', label: 'Employees', labelColor: '#000000' },
      { id: 'stat-2', value: '$100', valueColor: '#000000', label: 'In Investments', labelColor: '#000000' },
      { id: 'stat-3', value: '224', valueColor: '#000000', label: 'Partners Worldwide', labelColor: '#000000' },
      { id: 'stat-4', value: '15', valueColor: '#000000', label: 'Publications', labelColor: '#000000' }
    ]
  },

  // Part 7: Careers & Press Releases
  careers: {
    title: 'Join Our Team',
    titleColor: '#000000',
    subtitle: 'We’re looking for highly-motivated and talented people to join our innovative team. Submit your application today to join the BGS journey!',
    subtitleColor: '#000000',
    jobs: [
      { id: 'job-1', title: 'Senior Project Manager', titleColor: '#000000', location: 'San Francisco, CA', locationColor: '#000000' },
      { id: 'job-2', title: 'Associate Director, Drug Delivery', titleColor: '#000000', location: 'San Francisco, CA', locationColor: '#000000' },
      { id: 'job-3', title: 'Data Scientist, IT', titleColor: '#000000', location: 'San Francisco, CA', locationColor: '#000000' }
    ]
  },
  press: {
    title: 'Press',
    titleColor: '#000000',
    items: [
      {
        id: 'press-1',
        headline: 'BGS appoints Andrew Kim as Board Director',
        headlineColor: '#000000',
        source: 'AGIAI Science Journal - November 2035',
        sourceColor: '#000000'
      },
      {
        id: 'press-2',
        headline: 'Therapeutics Giant Announces Collaboration With San Francisco’s BGS',
        headlineColor: '#000000',
        source: 'Biotech Frontier Review - May 2035',
        sourceColor: '#000000'
      },
      {
        id: 'press-3',
        headline: 'There’s a New Kid in Town, Changing the Face of Genetic Engineering.',
        headlineColor: '#000000',
        source: 'IBRM Magazine - March 2035',
        sourceColor: '#000000'
      }
    ]
  },

  // Part 8: Quote, Newsletter & Legal
  quote: {
    author: 'Megan Brown',
    role: 'CEO and Co-Founder of BGS',
    authorColor: '#000000',
    roleColor: '#000000',
    image: './Obagi India _ obagi products_files/CEO.jpg'
  },
  newsletter: {
    title: 'Join The OBAGI Newsletter',
    titleColor: '#000000',
    subtitle: 'Be the first to receive the latest news and updates.',
    subtitleColor: '#000000'
  },
  footer: {
    copyright: '©2026 Obagi. All rights reserved. Obagi® Systems and Products are physician dispensed and should be used under the guidance of a skin care professional.',
    copyrightColor: '#000000'
  }
};
