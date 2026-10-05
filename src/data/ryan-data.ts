export interface AccordionDetail {
  id: string;
  title: string;
  description: string;
  commonAgents?: string[];
  keyPoints?: string[];
  applicationConsiderations?: string[];
  detailsText?: string;
}

export interface TherapeuticGuide {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  heroImage: string;
  evidenceBadge: string;
  practicalBadge: string;
  outcomeBadge: string;
  quickFact: string;
  downloadPdfName: string;
  overview: {
    title: string;
    description: string;
    keyPoints: string[];
  };
  classification: {
    description: string;
    types: { name: string; criteria: string }[];
  };
  clinicalPresentation: {
    description: string;
    morphology: string[];
    symptoms: string[];
  };
  treatmentApproaches: {
    principles: string;
    pathways: string[];
  };
  topicalTreatment: {
    sectionNumber: string;
    title: string;
    description: string;
    accordions: AccordionDetail[];
  };
  systemicTreatment: {
    description: string;
    accordions: AccordionDetail[];
  };
  treatmentConsiderations: {
    description: string;
    points: string[];
  };
  maintenanceApproaches: {
    description: string;
    recommendations: string[];
  };
  patientCounselling: {
    description: string;
    counsellingPoints: string[];
  };
  relatedPortfolio: {
    title: string;
    description: string;
    ctaText: string;
    products: {
      name: string;
      generic: string;
      category: string;
    }[];
  };
}

export interface ClinicalInsight {
  slug: string;
  title: string;
  date: string;
  category: string;
  readingTime: string;
  author: string;
  image: string;
  summary: string;
  overview: string;
  clinicalPresentation: string;
  differentialDiagnosis: { condition: string; differentiatingFeatures: string }[];
  managementPrinciples: string[];
  treatmentConsiderations: AccordionDetail[];
  specialSituations?: AccordionDetail[];
  whenToReconsider?: string[];
  references: string[];
}

export interface PrescribingInfoProduct {
  id: string;
  brandName: string;
  genericName: string;
  dosageForm: string;
  therapeuticClass: string;
  packSize: string;
  composition: string;
  indications: string[];
  dosageAndAdministration: string[];
  contraindications: string[];
  warningsAndPrecautions: string[];
  adverseReactions: string[];
  storageAndHandling: string;
  category: 'Acne Therapy' | 'Antifungals' | 'Corticosteroids & Anti-inflammatory' | 'Antihistamines & Allergy' | 'Trichology & Hair' | 'Immunomodulators' | 'Antibacterials & Scabicides';
}

export interface LibraryTopic {
  slug: string;
  title: string;
  categoryName: string;
  categorySlug: string;
  type: string;
  image: string;
  quickSummary: string;
  overview: {
    definition: string;
    pearl: string;
  };
  clinicalPresentation: {
    morphology: string[];
    distribution: string[];
    symptoms: string[];
  };
  causativeOrganisms: {
    description: string;
    organisms: string[];
  };
  riskFactors: string[];
  diagnosticConsiderations: {
    clinicalAssessment: string;
    investigations: string[];
  };
  differentialDiagnosis: {
    condition: string;
    distinguishingFeatures: string;
  }[];
  managementPrinciples: string[];
  topicalTherapy: {
    indication: string;
    agents: string[];
  };
  systemicTherapy: {
    indication: string;
    agents: string[];
  };
  recurrenceAndPrevention: string[];
  references: string[];
  relatedProducts: {
    name: string;
    generic: string;
    form: string;
    image: string;
  }[];
}

export interface LibraryCategory {
  slug: string;
  name: string;
  count: number;
  bannerImage: string;
  description: string;
  conditionReferences: {
    title: string;
    slug: string;
    subtitle: string;
    thumbnail: string;
  }[];
  therapeuticReferences: {
    title: string;
    slug: string;
    subtitle: string;
    thumbnail: string;
  }[];
}

// ==========================================================
// 1. THERAPEUTIC GUIDES DATA (Matching Topic Page Structure)
// ==========================================================

export const THERAPEUTIC_GUIDES_DATA: Record<string, TherapeuticGuide> = {
  'acne-and-acne-management': {
    slug: 'acne-and-acne-management',
    title: 'Acne & Acne Management',
    subtitle: 'A professional guide to classification, clinical presentation and comprehensive management of acne vulgaris.',
    category: 'DERMATOLOGY THERAPEUTIC GUIDE',
    image: '/ryan/guide-acne.jpg',
    heroImage: '/ryan/guide-acne-hero.jpg',
    evidenceBadge: 'EVIDENCE-BASED INFORMATION',
    practicalBadge: 'PRACTICAL CLINICAL GUIDANCE',
    outcomeBadge: 'SUPPORTING BETTER PATIENT OUTCOMES',
    quickFact: 'Topical therapy is often used in combination to target multiple pathophysiological factors in acne simultaneously.',
    downloadPdfName: 'Acne Management Quick Reference Guide (PDF)',
    overview: {
      title: 'Clinical Overview & Pathogenesis',
      description: 'Acne vulgaris is a multifactorial chronic inflammatory disease of the pilosebaceous unit. The primary pathophysiologic drivers comprise follicular hyperkeratinization, excess sebum production mediated by androgenic stimulation, Cutibacterium acnes proliferation, and host immunoinflammatory cascades.',
      keyPoints: [
        'Non-inflammatory lesions (comedones) precede inflammatory papules, pustules, and nodulocystic disease.',
        'Early effective intervention is critical to prevent permanent cicatricial scarring and post-inflammatory hyperpigmentation (PIH).',
        'Topical multi-modal therapy forms the baseline anchor for mild-to-moderate presentations.'
      ]
    },
    classification: {
      description: 'Acne vulgaris is clinically graded based on lesion morphology, inflammatory count, anatomical distribution, and risk of scarring.',
      types: [
        { name: 'Comedonal Acne (Grade I)', criteria: 'Closed (whiteheads) and open (blackheads) comedones without marked erythema or pustules.' },
        { name: 'Mild-to-Moderate Papulopustular Acne (Grade II-III)', criteria: 'Erythematous papules and pustules interspersed with comedones; localized to face, shoulders, and chest.' },
        { name: 'Severe Nodulocystic Acne (Grade IV)', criteria: 'Extensive inflammatory papulopustules with deep painful nodules, cysts, sinus tracts, and high scarring propensity.' }
      ]
    },
    clinicalPresentation: {
      description: 'Typical distribution encompasses sebum-dense anatomical zones: forehead, cheeks, mandibular line, anterior chest, and upper back.',
      morphology: [
        'Open comedones with oxidized dark central keratin plugs.',
        'Closed comedones manifesting as 1-2 mm skin-colored or slightly whitish follicular papules.',
        'Inflammatory erythematous papules (2-5 mm) and tender follicular pustules.',
        'Deep fluctuating cysts and indurated nodular lesions that may drain purulent exudate.'
      ],
      symptoms: [
        'Tenderness or spontaneous throbbing pain in cystic lesions.',
        'Cutaneous oiliness and dyspigmentation.',
        'Significant psychosocial morbidity and distress.'
      ]
    },
    treatmentApproaches: {
      principles: 'Therapeutic selection is governed by disease severity, predominant lesion morphology, tolerance, prior therapies, and patient lifestyle.',
      pathways: [
        'Target follicular hyperkeratosis: Topical Retinoids (Adapalene, Tretinoin).',
        'Eliminate C. acnes and suppress inflammation: Benzoyl Peroxide (BPO), Topical Clindamycin, Oral Doxycycline.',
        'Suppress sebum and systemic androgens: Oral Isotretinoin, Combined Oral Contraceptives, Spironolactone.'
      ]
    },
    topicalTreatment: {
      sectionNumber: '04',
      title: 'TOPICAL TREATMENT OPTIONS',
      description: 'Topical treatment remains an important component of acne management, particularly for mild-to-moderate disease and as part of combination regimens for more extensive disease.',
      accordions: [
        {
          id: 'retinoids',
          title: 'Topical Retinoids',
          description: 'Topical retinoids help normalize follicular keratinization, reduce comedone formation and provide anti-inflammatory effects. They are frequently used as foundational therapy in acne management.',
          commonAgents: ['Adapalene 0.1%', 'Tretinoin 0.025% / 0.05%', 'Tazarotene 0.05% / 0.1%', 'Trifarotene'],
          keyPoints: [
            'Effective for both comedonal and inflammatory lesions',
            'Help prevent the emergence of new microcomedones',
            'May take 6 to 8 weeks to exhibit visible clinical improvement',
            'Local irritation (dryness, erythema, peeling) may occur initially and can be minimized by gradual acclimatization'
          ],
          applicationConsiderations: [
            'Apply to clean, thoroughly dry skin, preferably at night',
            'Initiate with lower frequency (e.g. alternate nights) and increase as tolerated',
            'Use a pea-sized amount for the entire facial canvas',
            'Pair with a non-comedogenic ceramide moisturizer if dryness or irritation occurs',
            'Avoid use during pregnancy or lactation'
          ]
        },
        {
          id: 'bpo',
          title: 'Topical Benzoyl Peroxide (BPO)',
          description: 'Benzoyl peroxide exerts rapid, broad-spectrum bactericidal activity against Cutibacterium acnes via generation of reactive oxygen species. Unlike antibiotics, it does not induce bacterial resistance.',
          commonAgents: ['Benzoyl Peroxide 2.5%', 'Benzoyl Peroxide 5% Gel'],
          keyPoints: [
            'Potent bactericidal action without risk of antimicrobial resistance',
            'Exerts mild keratolytic and comedolytic activity',
            'Essential partner in combination with topical antibiotics to prevent resistance emergence'
          ],
          applicationConsiderations: [
            'Apply once or twice daily after cleansing',
            'Can bleach fabric, hair, and clothing; counsel patients accordingly',
            'Lower concentrations (2.5%) demonstrate comparable clinical efficacy with reduced cutaneous irritation compared to 10%'
          ]
        },
        {
          id: 'antibiotics',
          title: 'Topical Antibiotics (Clindamycin)',
          description: 'Topical clindamycin reduces follicular colonization of C. acnes and mitigates cutaneous free fatty acid production.',
          commonAgents: ['Clindamycin 1% Gel / Solution', 'Fixed combinations: Clindamycin + Adapalene, Clindamycin + BPO'],
          keyPoints: [
            'Suppresses bacterial lipase production and neutrophil chemotaxis',
            'Should NOT be used as monotherapy due to swift selection of resistant bacterial strains',
            'Always combine with Benzoyl Peroxide or Topical Retinoids'
          ],
          applicationConsiderations: [
            'Apply once or twice daily as prescribed',
            'Discontinue when inflammatory lesion clearance is achieved and transition to maintenance retinoid'
          ]
        },
        {
          id: 'azelaic',
          title: 'Azelaic Acid',
          description: 'Dicarboxylic acid providing dual anti-comedogenic and anti-inflammatory properties with inhibition of tyrosinase, making it uniquely beneficial for post-inflammatory hyperpigmentation (PIH).',
          commonAgents: ['Azelaic Acid 10%', 'Azelaic Acid 20% Cream / Gel'],
          keyPoints: [
            'Addresses inflammatory papules and reduces PIH simultaneously',
            'Safe profile for use in pregnancy (Category B)',
            'Well tolerated by sensitive and rosacea-prone skin types'
          ]
        },
        {
          id: 'salicylic',
          title: 'Salicylic Acid',
          description: 'Beta-hydroxy acid (BHA) with lipid solubility that penetrates sebaceous follicles to desquamate hyperkeratotic plugs.',
          commonAgents: ['Salicylic Acid 1% - 2% Gel / Wash'],
          keyPoints: [
            'Excellent keratolytic for comedone-predominant and oily skin',
            'Frequently employed as an adjunctive cleansing wash'
          ]
        },
        {
          id: 'clascoterone',
          title: 'Clascoterone',
          description: 'Novel topical androgen receptor inhibitor that directly blocks dihydrotestosterone (DHT) binding within sebocytes and hair follicles.',
          commonAgents: ['Clascoterone 1% Cream'],
          keyPoints: [
            'First targeted topical anti-androgen approved for acne',
            'Acts locally with negligible systemic endocrine absorption'
          ]
        }
      ]
    },
    systemicTreatment: {
      description: 'Systemic intervention is indicated for moderate-to-severe acne, acne refractory to topical combinations, or disease with extensive trunk involvement.',
      accordions: [
        {
          id: 'oral-abx',
          title: 'Oral Antibiotics',
          description: 'Doxycycline (100 mg daily) or Minocycline (50-100 mg daily) for acute reduction of inflammatory papules and pustules. Limit course to 3-4 months.',
          keyPoints: ['Always pair with a topical regimen containing BPO', 'Avoid in pregnant patients or children under 8 years']
        },
        {
          id: 'isotretinoin',
          title: 'Oral Isotretinoin',
          description: 'Systemic retinoid that targets all four pathogenic mechanisms of acne. Indicated for severe nodulocystic disease, treatment-resistant acne, or scarring acne.',
          keyPoints: [
            'Dosing: 0.5 to 1.0 mg/kg/day to achieve cumulative dose of 120-150 mg/kg',
            'Strict teratogenicity contraception protocols mandatory',
            'Regular monitoring of liver enzymes and lipid panel'
          ]
        }
      ]
    },
    treatmentConsiderations: {
      description: 'Essential clinical checkpoints to optimize adherence and prevent complications:',
      points: [
        'Assess skin barrier function before prescribing aggressive exfoliants.',
        'Manage "retinoid dermatitis" proactively with barrier creams rather than discontinuing therapy.',
        'Anticipate mild initial purging during the first 2-4 weeks of retinoid introduction.',
        'Instruct patients to avoid vigorous mechanical scrubbing which exacerbates follicular rupture.'
      ]
    },
    maintenanceApproaches: {
      description: 'Acne is a chronic condition; maintenance therapy sustains clinical remission and prevents microcomedone recurrence.',
      recommendations: [
        'Continue nightly topical retinoid (Adapalene) indefinitely as tolerated.',
        'Maintain daily broad-spectrum, non-comedogenic sunscreen.',
        'Use gentle syndet cleansers that preserve the epidermal acid mantle.'
      ]
    },
    patientCounselling: {
      description: 'Key communication points for practitioner-patient discussions:',
      counsellingPoints: [
        'Set realistic timelines: visible reduction in acne lesions takes 6 to 8 weeks.',
        'Warn against picking or squeezing lesions, which directly causes dermal damage and scarring.',
        'Emphasize daily sun protection to prevent persistent PIH hyperpigmentation.'
      ]
    },
    relatedPortfolio: {
      title: 'RELATED RYAN PORTFOLIO',
      description: 'Explore Ryan Dermaceutics products relevant to acne management.',
      ctaText: 'VIEW ACNE PORTFOLIO →',
      products: [
        { name: 'CLIXODIN-AD', generic: 'Adapalene 0.1% + Clindamycin 1% Gel', category: 'Topical Retinoid + Antibacterial' },
        { name: 'CLIXODIN-BPO', generic: 'Clindamycin 1% + Benzoyl Peroxide 2.5% Gel', category: 'Synergistic Antibacterial' },
        { name: 'CLIXODIN-NT', generic: 'Clindamycin 1% + Nicotinamide 4% Gel', category: 'Anti-inflammatory Gel' },
        { name: 'RYAN BPO', generic: 'Benzoyl Peroxide 2.5% / 5% Gel', category: 'Bactericidal Gel' },
        { name: 'TACNOID', generic: 'Tacrolimus 0.05% / 0.1% Ointment', category: 'Steroid-sparing' },
        { name: 'I-TACNOID 20', generic: 'Isotretinoin 20 mg Capsules', category: 'Systemic Retinoid' }
      ]
    }
  },

  'fungal-skin-conditions': {
    slug: 'fungal-skin-conditions',
    title: 'Fungal Skin Conditions',
    subtitle: 'Evidence-based framework for superficial dermatophytosis, candidiasis and onychomycosis.',
    category: 'DERMATOLOGY THERAPEUTIC GUIDE',
    image: '/ryan/guide-fungal.jpg',
    heroImage: '/ryan/library/fungal-hero.jpg',
    evidenceBadge: 'MYCOLOGICAL INTEGRITY',
    practicalBadge: 'RESISTANCE STEWARDSHIP',
    outcomeBadge: 'RECURRENCE CONTROL',
    quickFact: 'Topical steroid misuse in fungal infections alters morphology (Tinea Incognito) and promotes deeper dermal invasion.',
    downloadPdfName: 'Superficial Fungal Infection Guidelines (PDF)',
    overview: {
      title: 'Clinical Overview & Current Epidemiology',
      description: 'Superficial fungal dermatophytoses involve keratinized layers of the epidermis, hair, and nails. In recent years, recalcitrant Trichophyton indotineae strains and widespread OTC corticosteroid abuse have dramatically complicated clinical management.',
      keyPoints: [
        'Strictly distinguish true dermatophytosis from mimicking eczema or psoriasis prior to steroid administration.',
        'Candidal intertrigo requires moisture control alongside polyene or azole therapy.',
        'Treat a minimum of 1-2 weeks beyond complete clinical resolution to eradicate subclinical mycelia.'
      ]
    },
    classification: {
      description: 'Categorized by anatomical site and causative organism classification:',
      types: [
        { name: 'Tinea Corporis & Cruris', criteria: 'Glabrous skin and groin/perineal dermatophytosis.' },
        { name: 'Tinea Pedis & Manuum', criteria: 'Interdigital or moccasin-type fungal infection of feet and hands.' },
        { name: 'Cutaneous Candidiasis', criteria: 'Satellite pustules and beefy erythema in macerated flexural folds.' },
        { name: 'Onychomycosis', criteria: 'Subungual hyperkeratosis and onycholysis of nail units.' }
      ]
    },
    clinicalPresentation: {
      description: 'Annular, arcuate, or polycyclic erythematous plaques with centrifugal expansion and active vesiculopapular scaly margins.',
      morphology: [
        'Central clearing with elevated scaly border in classic tinea.',
        'Erythematous maceration with peripheral collarette scaling in candidiasis.',
        'Yellowish-brown dystrophic nail plates with subungual crumble in onychomycosis.'
      ],
      symptoms: ['Severe burning or pruritus, exacerbated by sweating and friction.']
    },
    treatmentApproaches: {
      principles: 'Topical therapy suffices for limited body surface area (BSA < 10%); oral therapy is mandatory for extensive, multi-site, or recalcitrant disease.',
      pathways: [
        'Allylamines: Fungicidal (Terbinafine).',
        'Imidazoles: Fungistatic (Luliconazole, Ketoconazole, Sertaconazole).',
        'Oral Triazoles: Itraconazole (conventional or submicronized SB).'
      ]
    },
    topicalTreatment: {
      sectionNumber: '04',
      title: 'TOPICAL ANTIFUNGAL OPTIONS',
      description: 'Select appropriate vehicle and molecule based on lesion exudation and anatomical location.',
      accordions: [
        {
          id: 'luliconazole',
          title: 'Luliconazole 1% Cream / Lotion',
          description: 'Potent modern imidazole with extremely low minimum inhibitory concentrations (MICs) against dermatophytes.',
          commonAgents: ['Luliconazole 1% w/w'],
          keyPoints: ['Once-daily application for 1-2 weeks', 'Superior retention in stratum corneum']
        },
        {
          id: 'ketoconazole',
          title: 'Ketoconazole 2% Cream & Shampoo',
          description: 'Broad-spectrum imidazole with potent activity against Malassezia and dermatophytes.',
          commonAgents: ['Ketoconazole 2% Cream', 'Ketoconazole + Zinc Pyrithione (ZPTO)'],
          keyPoints: ['Ideal for Seborrhoeic Dermatitis, Tinea Versicolor, and scalp fungal carriage']
        }
      ]
    },
    systemicTreatment: {
      description: 'Systemic antifungal therapy for extensive, recurrent, or follicular-invasive dermatophytosis.',
      accordions: [
        {
          id: 'itraconazole',
          title: 'Itraconazole (Standard & SB Formulation)',
          description: 'Lipophilic triazole with extensive tissue affinity. Submicronized Itraconazole SB-130 provides enhanced bioavailability independent of gastric acidity.',
          keyPoints: ['Standard: 100-200 mg BID with fatty meals for 2-4 weeks', 'SB-130: 130 mg daily with superior absorption consistency']
        },
        {
          id: 'terbinafine',
          title: 'Oral Terbinafine',
          description: 'Inhibits squalene epoxidase, accumulating within sebum and stratum corneum.',
          keyPoints: ['250 mg daily for 2 to 4 weeks (up to 12 weeks for toenail onychomycosis)']
        }
      ]
    },
    treatmentConsiderations: {
      description: 'Crucial stewardship principles:',
      points: [
        'Do NOT use fixed-dose combination creams containing potent corticosteroids.',
        'Confirm KOH mount or fungal culture in atypical or recurrent cases.',
        'Address concomitant tinea pedis or onychomycosis as reservoir sources.'
      ]
    },
    maintenanceApproaches: {
      description: 'Preventing household and individual reinfection:',
      recommendations: [
        'Use prophylactic antifungal dusting powders (Clotrimazole 1%) in skin folds.',
        'Launder garments and bed linen at high temperatures and iron inside out.'
      ]
    },
    patientCounselling: {
      description: 'Patient education points:',
      counsellingPoints: [
        'Complete the full course even after visible skin lesions clear.',
        'Avoid sharing personal towels, soaps, bedsheets, and footwear.',
        'Keep body flexures dry and wear loose breathable cotton clothing.'
      ]
    },
    relatedPortfolio: {
      title: 'RELATED RYAN ANTIFUNGAL PORTFOLIO',
      description: 'Comprehensive antifungal arsenal from Ryan Dermaceutics.',
      ctaText: 'VIEW ANTIFUNGAL PORTFOLIO →',
      products: [
        { name: 'KEFIN CREAM', generic: 'Ketoconazole 2% Cream', category: 'Broad-spectrum Antifungal' },
        { name: 'LULIPRIX CREAM & LOTION', generic: 'Luliconazole 1% Cream / Lotion', category: 'Advanced Imidazole' },
        { name: 'ITFIN SB-130', generic: 'Submicronized Itraconazole 130mg', category: 'High-Bioavailability Triazole' },
        { name: 'ITFIN 100 / 200', generic: 'Itraconazole 100mg / 200mg Capsules', category: 'Oral Antifungal' },
        { name: 'TRILOFAZ POWDER', generic: 'Clotrimazole 1% Dusting Powder', category: 'Moisture Control & Prevention' }
      ]
    }
  },

  'inflammatory-dermatoses': {
    slug: 'inflammatory-dermatoses',
    title: 'Inflammatory Dermatoses',
    subtitle: 'Clinical protocols for eczema, atopic dermatitis, contact dermatitis and psoriasis.',
    category: 'DERMATOLOGY THERAPEUTIC GUIDE',
    image: '/ryan/guide-inflammatory.jpg',
    heroImage: '/ryan/guide-inflammatory.jpg',
    evidenceBadge: 'BARRIER INTEGRITY',
    practicalBadge: 'STEROID-SPARING STRATEGY',
    outcomeBadge: 'LONG-TERM REMISSION',
    quickFact: 'The Fingertip Unit (FTU) method standardizes topical steroid dosing: 1 FTU (~0.5g) covers two adult hand palms.',
    downloadPdfName: 'Inflammatory Dermatoses & TCS Ladder (PDF)',
    overview: {
      title: 'Clinical Spectrum & Immunology',
      description: 'Inflammatory dermatoses encompass immunologically driven disorders characterized by epidermal barrier disruption, cytokine-driven inflammation, and chronic relapsing-remitting pruritus.',
      keyPoints: [
        'Atopic dermatitis manifests with skin barrier protein (filaggrin) deficiencies and Th2-skewed immune responses.',
        'Plaque psoriasis is driven by the IL-23/IL-17 immune axis, causing keratinocyte hyperproliferation.',
        'Topical corticosteroid potency selection must be matched strictly to anatomical skin thickness.'
      ]
    },
    classification: {
      description: 'Stratification based on disease pathology:',
      types: [
        { name: 'Atopic Dermatitis', criteria: 'Chronic pruritic eczema with predilection for flexural creases and xerosis.' },
        { name: 'Contact Dermatitis', criteria: 'Allergic (type IV hypersensitivity) or irritant chemical barrier breakdown.' },
        { name: 'Plaque Psoriasis', criteria: 'Well-demarcated erythematous plaques with micaceous silvery scales on extensor surfaces.' }
      ]
    },
    clinicalPresentation: {
      description: 'Pruritic papules, erythematous plaques, lichenification, fissuring, and scale accumulation.',
      morphology: [
        'Ill-defined erythematous patches with microvesiculation and excoriations in acute eczema.',
        'Lichenified plaques with accentuated skin markings in chronic disease.',
        'Auspitz sign (pinpoint bleeding on scale removal) in psoriasis.'
      ],
      symptoms: ['Intense, sleep-disturbing pruritus, burning, and pain from fissures.']
    },
    treatmentApproaches: {
      principles: 'Two-pillar management: proactive barrier restoration through emollients + targeted anti-inflammatory control.',
      pathways: [
        'Acute Flare: Topical corticosteroids tailored by potency.',
        'Maintenance & Sensitive Areas: Topical Calcineurin Inhibitors (Tacrolimus).',
        'Severe/Refractory: Targeted oral JAK inhibitors (Tofacitinib), Methotrexate, Cyclosporine.'
      ]
    },
    topicalTreatment: {
      sectionNumber: '04',
      title: 'TOPICAL ANTI-INFLAMMATORY THERAPY',
      description: 'Matching potency to disease severity and anatomical vulnerability.',
      accordions: [
        {
          id: 'clobetasol',
          title: 'Clobetasol Propionate 0.05% (Superpotent - Class I)',
          description: 'High-efficacy topical corticosteroid reserved for thick plaques, palms, soles, and resistant scalp lesions.',
          commonAgents: ['Tenorium Cream / Ointment', 'Tenorium-S (with Salicylic Acid 3%/6%)'],
          keyPoints: ['Limit continuous use to 2-3 weeks', 'Do NOT use on face, intertriginous folds, or under occlusion without direct supervision']
        },
        {
          id: 'mometasone',
          title: 'Mometasone Furoate 0.1% (Mid-to-High Potency - Class III/IV)',
          description: 'Once-daily synthetic corticosteroid offering superior anti-inflammatory index with favorable local tolerability.',
          commonAgents: ['Momerium Cream', 'Momerium-F (with Fusidic Acid)'],
          keyPoints: ['Once-daily application improves patient adherence', 'Ideal for trunk and extremities']
        },
        {
          id: 'tacrolimus',
          title: 'Topical Tacrolimus (Calcineurin Inhibitor)',
          description: 'Non-steroidal immunomodulator that inhibits calcineurin and T-cell activation without causing collagen atrophy.',
          commonAgents: ['Tacnoid 0.05% / 0.1% Ointment'],
          keyPoints: ['Safe for prolonged use on facial, eyelid, and intertriginous skin', 'Ideal for weekend proactive maintenance']
        }
      ]
    },
    systemicTreatment: {
      description: 'Oral targeted therapies for moderate-to-severe dermatoses:',
      accordions: [
        {
          id: 'tofacitinib',
          title: 'Tofacitinib 5mg Tablets',
          description: 'Targeted oral JAK-1/3 inhibitor interrupting multiple downstream cytokine pathways in recalcitrant inflammatory conditions.',
          keyPoints: ['Indicated for severe refractory cases under routine hematologic and biochemical monitoring']
        }
      ]
    },
    treatmentConsiderations: {
      description: 'Preventing steroid-induced adverse effects:',
      points: [
        'Educate patients on the FTU method to avoid under- or over-application.',
        'Never use potent steroids on facial skin to prevent perioral dermatitis and telangiectasia.',
        'Taper potent steroids gradually or switch to topical tacrolimus to prevent rebound flare.'
      ]
    },
    maintenanceApproaches: {
      description: 'Sustaining barrier defense:',
      recommendations: [
        'Apply ceramide-rich emollients within 3 minutes after bathing ("Soak & Seal").',
        'Consider proactive twice-weekly application of topical tacrolimus to previously affected flare sites.'
      ]
    },
    patientCounselling: {
      description: 'Patient empowerment:',
      counsellingPoints: [
        'Moisturizers are daily medicines, not cosmetic accessories.',
        'Avoid hot showers, fragranced detergents, and wool fabrics.',
        'Trim fingernails short to reduce mechanical excoriation during sleep.'
      ]
    },
    relatedPortfolio: {
      title: 'RELATED RYAN INFLAMMATORY PORTFOLIO',
      description: 'Comprehensive topical and systemic anti-inflammatory portfolio.',
      ctaText: 'VIEW INFLAMMATORY PORTFOLIO →',
      products: [
        { name: 'TENORIUM', generic: 'Clobetasol Propionate 0.05% Cream', category: 'Superpotent Steroid' },
        { name: 'TENORIUM-S / S6', generic: 'Clobetasol + Salicylic Acid 3%/6%', category: 'Keratolytic Anti-inflammatory' },
        { name: 'MOMERIUM', generic: 'Mometasone Furoate 0.1% Cream', category: 'Once-daily Steroid' },
        { name: 'TACNOID', generic: 'Tacrolimus 0.05% / 0.1% Ointment', category: 'Steroid-sparing TCI' },
        { name: 'TOFAPLAST', generic: 'Tofacitinib 5mg Tablets / Cream', category: 'Targeted JAK Inhibitor' }
      ]
    }
  },

  'allergy-and-pruritus': {
    slug: 'allergy-and-pruritus',
    title: 'Allergy & Pruritus',
    subtitle: 'Systematic approach to acute & chronic urticaria, contact dermatitis and chronic itch.',
    category: 'DERMATOLOGY THERAPEUTIC GUIDE',
    image: '/ryan/guide-allergy.jpg',
    heroImage: '/ryan/guide-allergy.jpg',
    evidenceBadge: 'H1 RECEPTOR TARGETING',
    practicalBadge: 'STEP-UP ALGORITHM',
    outcomeBadge: 'ITCH CLEARANCE',
    quickFact: 'Guidelines recommend up-titrating modern non-sedating second-generation H1 antihistamines up to 4 times the standard dose before adding second-line agents.',
    downloadPdfName: 'Allergy & Pruritus Management Algorithm (PDF)',
    overview: {
      title: 'Pathophysiology of Urticaria & Itch',
      description: 'Urticaria is a mast-cell-driven dermatosis characterized by sudden-onset wheals, angioedema, or both. Mast cell degranulation releases histamine, platelet-activating factor (PAF), and leukotrienes, triggering vasodilation and pruriceptive sensory nerve stimulation.',
      keyPoints: [
        'Acute Urticaria: Duration < 6 weeks; frequently viral or food-associated.',
        'Chronic Spontaneous Urticaria (CSU): Duration > 6 weeks with unprovoked daily or near-daily wheals.',
        'Pruritus without primary rash requires screening for systemic, cholestatic, or renal etiologies.'
      ]
    },
    classification: {
      description: 'Urticaria classification per international EAACI/GA2LEN/EDF guidelines:',
      types: [
        { name: 'Acute Urticaria', criteria: 'Transient wheals lasting < 6 weeks, resolving spontaneously.' },
        { name: 'Chronic Spontaneous Urticaria', criteria: 'Spontaneous wheals and/or angioedema for ≥ 6 weeks without external trigger.' },
        { name: 'Chronic Inducible Urticaria', criteria: 'Triggered by specific physical stimuli: dermographism, cold, pressure, heat, vibration.' }
      ]
    },
    clinicalPresentation: {
      description: 'Evanescent wheals characterized by central swelling surrounded by reflex erythema.',
      morphology: [
        'Individual wheals vanish within 2 to 24 hours without residual hyperpigmentation.',
        'Concomitant subcutaneous and submucosal swelling (angioedema) in up to 40% of cases.'
      ],
      symptoms: ['Intense pruritus, burning, and skin stinging sensation.']
    },
    treatmentApproaches: {
      principles: 'Standardized step-up ladder focusing on mast cell receptor blockade and stabilization.',
      pathways: [
        'Step 1: Standard-dose second-generation H1 antihistamine.',
        'Step 2: Up-titration of second-generation H1 antihistamine up to 4-fold.',
        'Step 3: Add Leukotriene Receptor Antagonist (Montelukast) or Omalizumab.'
      ]
    },
    topicalTreatment: {
      sectionNumber: '04',
      title: 'TOPICAL SOOTHING AGENTS',
      description: 'Topical antipruritic agents for symptom relief while systemic therapies take effect.',
      accordions: [
        {
          id: 'soothing',
          title: 'Topical Antipruritics & Barrier Emollients',
          description: 'Calamine lotion, pramoxine formulations, and physiological lipid moisturizers help soothe nerve ending irritability.',
          keyPoints: ['Avoid topical antihistamines (e.g. diphenhydramine) due to potential contact sensitisation']
        }
      ]
    },
    systemicTreatment: {
      description: 'Modern second-generation H1 antihistamines with minimal sedative and anticholinergic side effects:',
      accordions: [
        {
          id: 'bilastine',
          title: 'Bilastine 20mg Tablets (BLISMIN 20 / BLISMIN-M)',
          description: 'Highly selective, non-sedating peripheral H1 antagonist with rapid onset within 1 hour and no hepatic CYP450 metabolism.',
          keyPoints: ['Take 1 hour before or 2 hours after food/fruit juices', 'Blismin-M combines Bilastine with Montelukast 10mg for synergistic mast cell control']
        },
        {
          id: 'fexofenadine',
          title: 'Fexofenadine HCl 180mg (DINOFEX 180)',
          description: 'Active metabolite of terfenadine with zero blood-brain barrier penetration and high cardiac safety profile.',
          keyPoints: ['Once-daily dosing for potent anti-wheal efficacy']
        },
        {
          id: 'levocetirizine',
          title: 'Levocetirizine 5mg (HIVOZIN 5 / HIVOZIN-M)',
          description: 'Active R-enantiomer of cetirizine providing high H1 receptor occupancy.',
          keyPoints: ['Rapidly clears acute allergic flare symptoms']
        }
      ]
    },
    treatmentConsiderations: {
      description: 'Clinical pearls:',
      points: [
        'Continuous daily dosing is significantly more effective than "as-needed" dosing for stabilizing chronic urticaria.',
        'Screen for and discontinue non-essential NSAIDs, which can provoke urticarial flares.',
        'Avoid routine systemic corticosteroids in chronic urticaria due to dependence and rebound.'
      ]
    },
    maintenanceApproaches: {
      description: 'Tapering strategy:',
      recommendations: [
        'Once complete disease control is sustained for 3 consecutive months, step-down dose gradually.',
        'Utilize the Urticaria Activity Score (UAS7) to monitor symptom trajectories.'
      ]
    },
    patientCounselling: {
      description: 'Counseling checklist:',
      counsellingPoints: [
        'Reassure that wheals do not cause permanent skin staining or scarring.',
        'Advise avoiding friction from tight garments, overheating, and alcohol during flares.'
      ]
    },
    relatedPortfolio: {
      title: 'RELATED RYAN ALLERGY & PRURITUS PORTFOLIO',
      description: 'Targeted second-generation antihistamine solutions.',
      ctaText: 'VIEW ALLERGY PORTFOLIO →',
      products: [
        { name: 'BLISMIN 20', generic: 'Bilastine 20mg Tablets', category: 'Advanced Non-Sedating H1 Antihistamine' },
        { name: 'BLISMIN-M', generic: 'Bilastine 20mg + Montelukast 10mg', category: 'Synergistic Antiallergic' },
        { name: 'DINOFEX 180', generic: 'Fexofenadine HCl 180mg Tablets', category: 'Potent Peripheral Antihistamine' },
        { name: 'HIVOZIN 5', generic: 'Levocetirizine 5mg Tablets', category: 'Rapid-acting Antiallergic' },
        { name: 'HIVOZIN-M', generic: 'Levocetirizine 5mg + Montelukast 10mg', category: 'Dual Action Combination' }
      ]
    }
  },

  'hair-and-scalp-disorders': {
    slug: 'hair-and-scalp-disorders',
    title: 'Hair & Scalp Disorders',
    subtitle: 'Comprehensive diagnostic and therapeutic protocols for androgenetic alopecia and telogen effluvium.',
    category: 'DERMATOLOGY THERAPEUTIC GUIDE',
    image: '/ryan/guide-hair.jpg',
    heroImage: '/ryan/guide-hair.jpg',
    evidenceBadge: 'TRICHOSCOPIC DIAGNOSIS',
    practicalBadge: 'FOLLICULAR STIMULATION',
    outcomeBadge: 'DENSITY RESTORATION',
    quickFact: 'Topical minoxidil induces a temporary shedding phase (week 3-6) as miniaturized hairs prematurely enter anagen; treatment continuation is crucial.',
    downloadPdfName: 'Trichology Management Reference Guide (PDF)',
    overview: {
      title: 'Follicular Miniaturization & Trichology',
      description: 'Hair disorders range from non-cicatricial patterned miniaturization (Androgenetic Alopecia - AGA) to reactive diffuse shedding (Telogen Effluvium) and autoimmune follicular targeting (Alopecia Areata).',
      keyPoints: [
        'Trichoscopy readily identifies hair diameter diversity (>20% diversity diagnostic of AGA).',
        'Early pharmacological stabilization maintains existing terminal hair follicles before irreversible fibrosis.',
        'Scalp microenvironment inflammation and seborrhoeic dermatitis must be treated concomitantly.'
      ]
    },
    classification: {
      description: 'Patterning systems in common clinical use:',
      types: [
        { name: 'Male Pattern AGA', criteria: 'Hamilton-Norwood grading: bitemporal recession and vertex thinning.' },
        { name: 'Female Pattern Hair Loss (FPHL)', criteria: 'Ludwig/Sinclair grading: diffuse central vertex thinning with frontal hairline preservation.' },
        { name: 'Acute Telogen Effluvium', criteria: 'Abrupt diffuse shedding 2-3 months after systemic stressor, fever, or nutritional crisis.' }
      ]
    },
    clinicalPresentation: {
      description: 'Reduction in hair caliber and density over androgen-sensitive scalp zones.',
      morphology: [
        'Vellus transformation of terminal hairs.',
        'Yellow dots (sebum accumulation) and peripilar signs on dermoscopy.',
        'Positive hair pull test in active telogen effluvium.'
      ],
      symptoms: ['Thinning, scalp visibility, hair shedding on pillows and during washing.']
    },
    treatmentApproaches: {
      principles: 'Combined follicular stimulation + inhibition of 5-alpha reductase-mediated DHT production + scalp barrier care.',
      pathways: [
        'Vasodilation & Anagen Prolongation: Topical Minoxidil (2%, 5%).',
        '5-Alpha Reductase Inhibition: Topical/Oral Finasteride.',
        'Nutritional & Peptide Support: Amino acids, Biotin, Zinc, Micronutrients.'
      ]
    },
    topicalTreatment: {
      sectionNumber: '04',
      title: 'TOPICAL TRICHOLOGICAL SOLUTIONS',
      description: 'Anchoring follicular density with topical solutions and medicated washes.',
      accordions: [
        {
          id: 'minoxidil',
          title: 'Topical Minoxidil 5% (TRESSICLE FORTE / TRESSICLE-F)',
          description: 'Opens ATP-sensitive potassium channels, upregulates VEGF, and shortens the telogen phase to accelerate anagen re-entry.',
          commonAgents: ['Minoxidil 5%', 'Minoxidil 5% + Finasteride 0.1% Solution'],
          keyPoints: [
            '1 ml applied twice daily to dry scalp',
            'Continuous use required; cessation leads to progressive reversal of gains',
            'Tressicle-F incorporates lipid formulation to enhance follicular penetration and minimize scalp erythema'
          ]
        },
        {
          id: 'shampoos',
          title: 'Ketoconazole 2% + ZPTO Shampoo (KEFIN-Z)',
          description: 'Anti-Malassezia and anti-androgenic shampoo that decreases scalp microinflammation and DHT binding.',
          keyPoints: ['Use 2-3 times weekly for 5 minutes contact time prior to rinsing']
        }
      ]
    },
    systemicTreatment: {
      description: 'Oral formulations for progressive patterned hair loss:',
      accordions: [
        {
          id: 'tressicle-tab',
          title: 'TRESSICLE 2.5 / 5 Tablets',
          description: 'Low-dose oral minoxidil delivering systemic follicular vasodilatory stimulation for patients intolerant of topical application.',
          keyPoints: ['Monitored by dermatologists for efficacy and cardiovascular safety']
        },
        {
          id: 'biosicle',
          title: 'BIOSICLE PLUS Tablets',
          description: 'Comprehensive trichonutrient formulation featuring essential amino acids, biotin, iron, and antioxidant co-factors.',
          keyPoints: ['Supports keratin synthesis in reactive telogen effluvium and hair-shaft fragility']
        }
      ]
    },
    treatmentConsiderations: {
      description: 'Clinical advice:',
      points: [
        'Warn patients about early shedding to prevent premature discontinuation.',
        'Ensure topical solution contacts the scalp skin rather than hair shafts.',
        'Evaluate ferritin, vitamin D, and thyroid panels in diffuse female shedding.'
      ]
    },
    maintenanceApproaches: {
      description: 'Lifelong hair retention strategy:',
      recommendations: [
        'Once satisfactory regrowth is achieved at 6-9 months, maintain therapy consistently.',
        'Gentle hair drying and avoidance of tight traction hairstyles.'
      ]
    },
    patientCounselling: {
      description: 'Patient expectations:',
      counsellingPoints: [
        'Noticeable stabilization occurs at 3-4 months; visible regrowth requires 6-9 months.',
        'Stopping treatment resets follicles back to their genetic loss trajectory.'
      ]
    },
    relatedPortfolio: {
      title: 'RELATED RYAN TRICHOLOGY PORTFOLIO',
      description: 'Advanced hair and scalp therapy solutions.',
      ctaText: 'VIEW HAIR PORTFOLIO →',
      products: [
        { name: 'TRESSICLE FORTE', generic: 'Minoxidil 5% + Finasteride 0.1% Solution', category: 'Targeted Hair Regrowth' },
        { name: 'TRESSICLE-F', generic: 'Minoxidil 5% + Finasteride 0.1% Lipid Lotion', category: 'Low-irritation Trichology' },
        { name: 'TRESSICLE 2.5 / 5', generic: 'Minoxidil 2.5mg / 5mg Tablets', category: 'Oral Trichological Therapy' },
        { name: 'BIOSICLE PLUS', generic: 'Hair Nutrients & Amino Acids Tablets', category: 'Follicular Nutrition' },
        { name: 'KEFIN-Z SHAMPOO', generic: 'Ketoconazole 2% + ZPTO 1% Shampoo', category: 'Scalp Anti-inflammatory Wash' }
      ]
    }
  },

  'pigmentation-and-skin-renewal': {
    slug: 'pigmentation-and-skin-renewal',
    title: 'Pigmentation & Skin Renewal',
    subtitle: 'Clinical protocols for melasma, post-inflammatory hyperpigmentation and photoprotection.',
    category: 'DERMATOLOGY THERAPEUTIC GUIDE',
    image: '/ryan/guide-pigmentation.jpg',
    heroImage: '/ryan/guide-pigmentation.jpg',
    evidenceBadge: 'MULTIMODAL DEPIGMENTATION',
    practicalBadge: 'CELLULAR TURNOVER',
    outcomeBadge: 'RECURRENCE CONTROL',
    quickFact: 'Broad-spectrum photoprotection against both Ultraviolet (UVA/UVB) and High-Energy Visible (HEV/Blue Light) radiation is mandatory in melasma management.',
    downloadPdfName: 'Pigmentary Disorders Clinical Guide (PDF)',
    overview: {
      title: 'Melanogenesis & Dyschromia',
      description: 'Hyperpigmentation results from hyperactive melanocytes and increased melanin transfer to basal keratinocytes, frequently triggered by UV exposure, hormonal surges (melasma), and cutaneous inflammation (PIH).',
      keyPoints: [
        'Wood lamp and dermoscopy differentiate epidermal from dermal melanin depth.',
        'Combination approaches addressing synthesis, transfer, and desquamation outperform single agents.',
        'Strict sun and visible light protection is the non-negotiable anchor for preventing recalcitrant recurrence.'
      ]
    },
    classification: {
      description: 'Common clinical patterns:',
      types: [
        { name: 'Melasma', criteria: 'Symmetrical, irregular hyperpigmented macules on centrofacial, malar, or mandibular areas.' },
        { name: 'Post-Inflammatory Hyperpigmentation (PIH)', criteria: 'Circumscribed macules following acne, eczema, or trauma, particularly in Fitzpatrick IV-VI skin.' },
        { name: 'Solar Lentigines & Photoaging', criteria: 'Discrete circumscribed macules on chronic sun-damaged skin with textural coarseness.' }
      ]
    },
    clinicalPresentation: {
      description: 'Light to dark-brown or slate-grey macules across photo-exposed anatomical regions.',
      morphology: [
        'Reticular pigment network with pseudonetwork formation on dermoscopy.',
        'Epidermal pigment enhances under Wood lamp; dermal pigment does not accentuate.'
      ],
      symptoms: ['Asymptomatic but carries significant distress and cosmetic concern.']
    },
    treatmentApproaches: {
      principles: 'Three-tiered approach: tyrosinase inhibition + accelerated epidermal renewal + broad-spectrum photoprotection.',
      pathways: [
        'Cellular turnover: Topical Retinoids (Adapalene, Tretinoin).',
        'Steroid-sparing anti-inflammatory: Tacrolimus (Tacnoid).',
        'Photoprotection: Physical filters with Iron Oxide tint to block blue light.'
      ]
    },
    topicalTreatment: {
      sectionNumber: '04',
      title: 'TOPICAL DEPIGMENTING & RENEWAL AGENTS',
      description: 'Multi-targeted formulations for pigment clearance and barrier stability.',
      accordions: [
        {
          id: 'retinoid-renewal',
          title: 'Topical Retinoids for Cellular Renewal',
          description: 'Accelerate epidermal turnover to disperse melanin granules and facilitate penetration of synergistic actives.',
          commonAgents: ['Adapalene 0.1%', 'Tretinoin 0.05%'],
          keyPoints: ['Promotes keratinocyte desquamation', 'Reduces cohesive follicular hyperkeratosis']
        },
        {
          id: 'tacrolimus-pigment',
          title: 'Topical Tacrolimus 0.05% / 0.1% (TACNOID)',
          description: 'Suppresses UV-induced inflammatory cytokines and downregulates stem cell factor (SCF) in chronic vascular melasma.',
          keyPoints: ['Safe long-term maintenance agent without skin thinning risks']
        }
      ]
    },
    systemicTreatment: {
      description: 'Adjuvant systemic interventions for refractory melasma:',
      accordions: [
        {
          id: 'tranexamic',
          title: 'Oral Tranexamic Acid (TXA)',
          description: 'Inhibits plasminogen activation, reducing arachidonic acid and melanocyte-stimulating hormone production.',
          keyPoints: ['Dosed at 250 mg twice daily for 3-6 months; screen for personal or family thromboembolic risks']
        }
      ]
    },
    treatmentConsiderations: {
      description: 'Preventing irritation-induced worsening:',
      points: [
        'Avoid aggressive chemical peels that trigger secondary PIH in dark skin phototypes.',
        'Introduce retinoids gradually to prevent cutaneous inflammation.'
      ]
    },
    maintenanceApproaches: {
      description: 'Preventing seasonal relapses:',
      recommendations: [
        'Year-round diligent photoprotection with 2-3 hourly reapplication.',
        'Continuous maintenance with gentle depigmenting cosmeceuticals.'
      ]
    },
    patientCounselling: {
      description: 'Counseling focus:',
      counsellingPoints: [
        'Even minor unprotected UV or heat exposure can provoke rapid pigment relapse.',
        'Wear wide-brimmed hats and seek shade during peak midday UV hours.'
      ]
    },
    relatedPortfolio: {
      title: 'RELATED RYAN PIGMENTATION & RENEWAL PORTFOLIO',
      description: 'Formulations engineered for pigment balance and epidermal renewal.',
      ctaText: 'VIEW PIGMENTATION PORTFOLIO →',
      products: [
        { name: 'TACNOID', generic: 'Tacrolimus 0.05% / 0.1% Ointment', category: 'Steroid-sparing Calcineurin Inhibitor' },
        { name: 'CLIXODIN-AD', generic: 'Adapalene 0.1% + Clindamycin 1% Gel', category: 'Cellular Turnover Accelerator' },
        { name: 'RYOCLIN', generic: 'Topical Clindamycin Solution / Gel', category: 'Anti-inflammatory Cleanser' },
        { name: 'HYDRELIS ALOE', generic: 'Syndet Soap with Vitamin E', category: 'Non-irritating Barrier Cleanser' }
      ]
    }
  }
};

// ==========================================================
// 2. CLINICAL INSIGHTS DATA (All 6 Articles)
// ==========================================================

export const CLINICAL_INSIGHTS_DATA: Record<string, ClinicalInsight> = {
  'understanding-acne': {
    slug: 'understanding-acne',
    title: 'Understanding Acne: From Presentation to Management',
    date: '12 Aug 2026',
    category: 'Clinical Insights',
    readingTime: '5 min read',
    author: 'Ryan Medical Affairs Dermatology Panel',
    image: '/ryan/insight-acne.jpg',
    summary: 'A structured clinical review on classifying comedonal vs inflammatory acne lesions, tailored treatment algorithms, and maintaining long-term skin barrier health.',
    overview: 'Acne vulgaris is a chronic inflammatory disorder of the pilosebaceous unit that affects up to 85% of adolescents and a rising proportion of adult females. Optimal management requires distinguishing non-inflammatory comedones from inflammatory papulopustules and deep nodulocystic disease.',
    clinicalPresentation: 'Clinical presentations range from open/closed microcomedones to extensive inflamed follicular papules, pustules, and painful nodulocystic lesions across the face, chest, and back.',
    differentialDiagnosis: [
      { condition: 'Rosacea (Papulopustular)', differentiatingFeatures: 'Centrofacial erythema and telangiectasia; absence of comedones.' },
      { condition: 'Folliculitis (Malassezia)', differentiatingFeatures: 'Monomorphic itchy follicular papules and pustules on upper trunk; no comedones.' },
      { condition: 'Perioral Dermatitis', differentiatingFeatures: 'Micropapules clustered around perioral and perinasal skin with clear vermilion border.' }
    ],
    managementPrinciples: [
      'Foundational topical retinoid therapy for all comedonal and inflammatory phenotypes.',
      'Always combine topical antibiotics with Benzoyl Peroxide (BPO) to block resistance.',
      'Early escalation to oral isotretinoin for nodulocystic or scarring phenotypes.'
    ],
    treatmentConsiderations: [
      {
        id: 'acclimatization',
        title: 'Retinoid Acclimatization & Barrier Preservation',
        description: 'Initiate retinoids on alternate nights and apply moisturizers first to mitigate transepidermal water loss and peeling.'
      },
      {
        id: 'antibiotic-limits',
        title: 'Antimicrobial Duration Limits',
        description: 'Limit systemic oral antibiotics (Doxycycline) to maximum 12 weeks to prevent systemic microbiome dysbiosis and resistance emergence.'
      }
    ],
    references: [
      'Zaenglein AL, et al. Guidelines of care for the management of acne vulgaris. J Am Acad Dermatol. 2016;74(5):945-973.',
      'Thiboutot D, et al. Practical management of acne for clinicians. J Clin Aesthet Dermatol. 2018;11(2):21-29.'
    ]
  },

  'superficial-fungal': {
    slug: 'superficial-fungal',
    title: 'Approach to Superficial Fungal Infections',
    date: '05 Aug 2026',
    category: 'Therapeutic Update',
    readingTime: '6 min read',
    author: 'Ryan Clinical Research Division',
    image: '/ryan/insight-fungal.jpg',
    summary: 'Clinical diagnosis, differentiating dermatophytosis from mimicking dermatoses, and evidence-based therapeutic regimens in an era of recalcitrant fungal strains.',
    overview: 'The global rise in resistant Trichophyton species has revolutionized fungal management. Over-the-counter misuse of topical steroid-antifungal-antibacterial combination creams produces atypical lesions (Tinea Incognito) and widespread treatment failures.',
    clinicalPresentation: 'Classic presentation comprises expanding annular polycyclic plaques with active, raised, scaly margins and central clearing. Tinea Incognito may present as poorly demarcated diffuse erythema without classic margins.',
    differentialDiagnosis: [
      { condition: 'Nummular Eczema', differentiatingFeatures: 'Coin-shaped lesions with uniform microvesicles and exudation across the entire plaque; no central clearing.' },
      { condition: 'Plaque Psoriasis', differentiatingFeatures: 'Silvery micaceous scales on extensor surfaces with Auspitz sign.' },
      { condition: 'Annular Erythema', differentiatingFeatures: 'Trailing collarette of scale without active mycological fungal hyphae.' }
    ],
    managementPrinciples: [
      'Strictly avoid topical corticosteroids in confirmed or suspected dermatophytosis.',
      'Prescribe once-daily high-affinity imidazoles (Luliconazole) or allylamines (Terbinafine).',
      'Use oral Itraconazole (conventional or SB-130) for widespread, multi-site, or recalcitrant infections.'
    ],
    treatmentConsiderations: [
      {
        id: 'treatment-duration',
        title: 'Duration of Therapy Beyond Clinical Clearance',
        description: 'Continue topical therapy 1 to 2 weeks past visible skin resolution to eradicate dormant fungal spores.'
      },
      {
        id: 'household-reservoirs',
        title: 'Treating Concomitant Reservoirs',
        description: 'Examine and simultaneously treat tinea pedis, onychomycosis, and close household contacts to halt ping-pong transmission.'
      }
    ],
    references: [
      'Verma SB, et al. The emergence of recalcitrant dermatophytosis: an international perspective. Int J Dermatol. 2021;60(4):450-459.',
      'Gupta AK, et al. Antifungal agents: an updated review. Br J Dermatol. 2022;186(2):230-244.'
    ]
  },

  'corticosteroid-potency': {
    slug: 'corticosteroid-potency',
    title: 'Topical Corticosteroids: Potency and Safe Use',
    date: '28 Jul 2026',
    category: 'Clinical Practice',
    readingTime: '4 min read',
    author: 'Ryan Pharmacovigilance & Therapeutics Board',
    image: '/ryan/insight-steroids.jpg',
    summary: 'Understanding the 7-class potency ranking of topical corticosteroids, the fingertip unit (FTU) method, minimizing cutaneous atrophy, and implementing steroid-free step-downs.',
    overview: 'Topical corticosteroids (TCS) represent the gold standard for acute management of non-infectious inflammatory dermatoses. Balancing clinical efficacy with the risk of cutaneous atrophy requires strict adherence to potency classification and anatomical suitability.',
    clinicalPresentation: 'Indicated for atopic dermatitis, contact eczema, lichen planus, psoriasis, and acute pruritic dermatoses.',
    differentialDiagnosis: [
      { condition: 'Infectious Dermatoses', differentiatingFeatures: 'Always exclude tinea, scabies, and impetigo before prescribing TCS.' }
    ],
    managementPrinciples: [
      'Class I Superpotent (Clobetasol): Acral, palms, soles, severe lichenified plaques; max 2-3 weeks.',
      'Class III-IV Mid-Potent (Mometasone, Fluticasone): Trunk and limbs.',
      'Class VI-VII Mild Potent (Hydrocortisone): Face, intertriginous skin, pediatric patients.',
      'Transition to steroid-sparing TCIs (Tacrolimus) for maintenance.'
    ],
    treatmentConsiderations: [
      {
        id: 'ftu-standard',
        title: 'The Fingertip Unit (FTU) Standard',
        description: '1 FTU (~0.5g squeezed from a 5mm nozzle onto an adult index fingertip) covers both adult hands.'
      },
      {
        id: 'tapering',
        title: 'Tapering to Prevent Rebound Flares',
        description: 'Step down from daily application to alternate days or weekend proactive maintenance to avoid acute post-steroid rebound.'
      }
    ],
    references: [
      'Ference JD, Last AR. Choosing topical corticosteroids. Am Fam Physician. 2009;79(2):135-140.',
      'Eichenfield LF, et al. Consensus guidelines for the safe use of topical corticosteroids. J Am Acad Dermatol. 2014;71(1):116-132.'
    ]
  },

  'hair-loss-patterns': {
    slug: 'hair-loss-patterns',
    title: 'Common Patterns of Hair Loss and Management Approaches',
    date: '20 Jul 2026',
    category: 'Hair & Scalp',
    readingTime: '6 min read',
    author: 'Ryan Trichology & Scalp Medicine Division',
    image: '/ryan/insight-hair.jpg',
    summary: 'Trichoscopic evaluation of androgenetic alopecia vs telogen effluvium, optimizing topical minoxidil compliance, and managing concomitant seborrhoeic scalp inflammation.',
    overview: 'Hair loss represents a significant psychological and clinical concern. Systematic clinical assessment separates patterned progressive miniaturization from reactive telogen effluvium and autoimmune patchy alopecia.',
    clinicalPresentation: 'Hamilton-Norwood bitemporal/vertex thinning in men; Ludwig central midline part widening in women; diffuse shedding in telogen effluvium.',
    differentialDiagnosis: [
      { condition: 'Androgenetic Alopecia (AGA)', differentiatingFeatures: 'Hair diameter diversity > 20% on dermoscopy; patterned distribution.' },
      { condition: 'Telogen Effluvium (TE)', differentiatingFeatures: 'Diffuse shedding without significant caliber diversity; positive hair pull test (>6 hairs).' },
      { condition: 'Alopecia Areata', differentiatingFeatures: 'Circumscribed smooth round bald patches with exclamation mark hairs at the periphery.' }
    ],
    managementPrinciples: [
      'Topical Minoxidil (5%) as frontline vasodilator and anagen prolonger.',
      'Inhibition of 5-alpha reductase via Finasteride.',
      'Synergistic nutritional replenishment (Biotin, amino acids, iron co-factors).'
    ],
    treatmentConsiderations: [
      {
        id: 'initial-shedding',
        title: 'Managing Early Minoxidil Shedding',
        description: 'Reassure patients that telogen hair shedding during week 3 to 6 is a physiological indicator of follicles transitioning into anagen.'
      }
    ],
    references: [
      'Blume-Peytavi U, et al. S3 guideline for the treatment of androgenetic alopecia. J Dtsch Dermatol Ges. 2018;16(6):798-812.',
      'Kanti V, et al. Evidence-based (S3) guideline for the management of hair disorders. J Eur Acad Dermatol Venereol. 2020;34(11):2466-2488.'
    ]
  },

  'chronic-pruritus': {
    slug: 'chronic-pruritus',
    title: 'Approach to Chronic Pruritus',
    date: '10 Jul 2026',
    category: 'Clinical Insights',
    readingTime: '5 min read',
    author: 'Ryan Dermatological Advisory Board',
    image: '/ryan/guide-allergy.jpg',
    summary: 'Diagnostic pathway for chronic itch lasting > 6 weeks: distinguishing primary dermatological, systemic, neuropathic, and psychogenic etiologies.',
    overview: 'Chronic pruritus is defined as itch persisting for 6 weeks or longer. When primary skin lesions are absent (pruritus sine materia), comprehensive systemic evaluation is mandatory to detect underlying hematologic, renal, endocrine, or hepatobiliary disease.',
    clinicalPresentation: 'Severe, intractable generalized or localized itch leading to secondary excoriations, prurigo nodules, and lichen simplex chronicus.',
    differentialDiagnosis: [
      { condition: 'Renal Pruritus', differentiatingFeatures: 'Severe uremic itch in chronic kidney disease; xerosis.' },
      { condition: 'Cholestatic Pruritus', differentiatingFeatures: 'Palms and soles predominantly; exacerbated by heat.' },
      { condition: 'Scabies', differentiatingFeatures: 'Nocturnal worsening; burrows in web spaces and wrist flexures.' }
    ],
    managementPrinciples: [
      'Intensive barrier restoration with ceramide and pramoxine emollients.',
      'Non-sedating second-generation H1 antihistamines (Bilastine, Levocetirizine, Fexofenadine).',
      'Targeted neuromodulators (Gabapentinoids) for neuropathic itch.'
    ],
    treatmentConsiderations: [
      {
        id: 'systemic-workup',
        title: 'Laboratory Workup Checklist',
        description: 'Complete blood count, renal function, liver function with bile acids, thyroid panel, ferritin, and chest radiography.'
      }
    ],
    references: [
      'Ständer S, et al. Clinical classification of itch: a position paper of the International Forum for the Study of Itch (IFSI). Acta Derm Venereol. 2007;87(4):291-294.'
    ]
  },

  'topical-vs-systemic': {
    slug: 'topical-vs-systemic',
    title: 'Topical vs Systemic Dermatological Therapy',
    date: '01 Jul 2026',
    category: 'Therapeutic Update',
    readingTime: '6 min read',
    author: 'Ryan Clinical Pharmacology Group',
    image: '/ryan/guide-acne.jpg',
    summary: 'Clinical decision-making framework: when to maintain topical control versus when to escalate to oral and biologic interventions.',
    overview: 'The choice between localized topical therapy and systemic pharmacological escalation is guided by disease extent (% BSA), anatomical risk, lesion severity, impact on quality of life, and organ toxicities.',
    clinicalPresentation: 'Applies across acne, psoriasis, atopic dermatitis, and superficial fungal infections.',
    differentialDiagnosis: [
      { condition: 'Localized vs Extensive Disease', differentiatingFeatures: 'BSA threshold (<10% vs >10%) and involvement of high-impact areas (face, hands, genitalia).' }
    ],
    managementPrinciples: [
      'Maximize topical compliance and barrier optimization before systemic escalation.',
      'Combine topical agents with systemic therapies to reduce required oral dosages and shorten treatment durations.',
      'Formulate structured exit and step-down strategies prior to initiating systemic immunosuppression.'
    ],
    treatmentConsiderations: [
      {
        id: 'monitoring-protocols',
        title: 'Safety Monitoring Protocols',
        description: 'Baseline blood counts, lipid panels, and hepatic/renal functions prior to initiating systemic retinoids or immunosuppressants.'
      }
    ],
    references: [
      'Nast A, et al. European S3-Guideline on the systemic treatment of psoriasis vulgaris. J Eur Acad Dermatol Venereol. 2015;29(12):2277-2294.'
    ]
  }
};

// ==========================================================
// 3. PRESCRIBING INFORMATION PRODUCT CATALOG (30+ Medicines)
// ==========================================================

export const PRESCRIBING_INFO_PRODUCTS: PrescribingInfoProduct[] = [
  {
    id: 'clixodin-ad',
    brandName: 'CLIXODIN-AD Gel',
    genericName: 'Clindamycin 1% w/w + Adapalene 0.1% w/w',
    dosageForm: 'Topical Gel (15g Tube)',
    therapeuticClass: 'Topical Lincosamide Antibacterial + Retinoid',
    packSize: '15 g Tube',
    composition: 'Each gram contains: Clindamycin Phosphate equivalent to Clindamycin 10 mg (1.0% w/w), Adapalene 1 mg (0.1% w/w) in an aqueous gel base.',
    indications: ['Acne vulgaris characterized by comedones, papules, and pustules', 'Mild-to-moderate inflammatory facial acne'],
    dosageAndAdministration: ['Apply a thin film once daily in the evening over clean, dry skin', 'Cover the entire acne-prone area, not merely individual lesions', 'Avoid eyes, lips, and mucous membranes'],
    contraindications: ['Hypersensitivity to clindamycin, lincomycin, adapalene or vehicle components', 'History of regional enteritis, ulcerative colitis, or antibiotic-associated colitis', 'Pregnancy and lactation'],
    warningsAndPrecautions: ['Minimize exposure to sunlight and UV lamps; use SPF daily', 'Transient erythema, scaling, and dryness may occur during initial 2-4 weeks', 'Discontinue if severe diarrhea occurs'],
    adverseReactions: ['Erythema (local)', 'Dryness & peeling', 'Burning sensation', 'Pruritus'],
    storageAndHandling: 'Store below 25°C. Do not freeze. Keep tube tightly closed.',
    category: 'Acne Therapy'
  },
  {
    id: 'clixodin-bpo',
    brandName: 'CLIXODIN-BPO Gel',
    genericName: 'Clindamycin 1% w/w + Benzoyl Peroxide 2.5% w/w',
    dosageForm: 'Topical Gel (20g Tube)',
    therapeuticClass: 'Antibacterial + Bactericidal Fixed Dose Combination',
    packSize: '20 g Tube',
    composition: 'Each gram contains: Clindamycin Phosphate equivalent to Clindamycin 1% w/w and Benzoyl Peroxide 2.5% w/w.',
    indications: ['Inflammatory acne vulgaris with high risk of bacterial resistance', 'Moderate papulopustular acne'],
    dosageAndAdministration: ['Apply a thin layer once or twice daily after gentle cleansing', 'Wash hands after application'],
    contraindications: ['Known hypersensitivity to benzoyl peroxide or clindamycin'],
    warningsAndPrecautions: ['May bleach hair and dyed fabrics', 'Avoid concomitant peeling agents'],
    adverseReactions: ['Mild stinging, peeling, facial erythema'],
    storageAndHandling: 'Store below 25°C in a cool, dry place.',
    category: 'Acne Therapy'
  },
  {
    id: 'clixodin-nt',
    brandName: 'CLIXODIN-NT Gel',
    genericName: 'Clindamycin 1% w/w + Nicotinamide 4% w/w',
    dosageForm: 'Topical Gel (15g Tube)',
    therapeuticClass: 'Topical Antibacterial + Anti-inflammatory',
    packSize: '15 g Tube',
    composition: 'Clindamycin 1% w/w, Nicotinamide 4% w/w in a non-greasy gel base.',
    indications: ['Inflammatory acne with prominent erythema', 'Post-inflammatory erythema (PIE) in acne-prone skin'],
    dosageAndAdministration: ['Apply once or twice daily to affected areas'],
    contraindications: ['Hypersensitivity to clindamycin or nicotinamide'],
    warningsAndPrecautions: ['For external dermatological use only'],
    adverseReactions: ['Occasional mild tingling, localized dryness'],
    storageAndHandling: 'Store at controlled room temperature below 25°C.',
    category: 'Acne Therapy'
  },
  {
    id: 'ryan-bpo',
    brandName: 'RYAN BPO 2.5% / 5% Gel',
    genericName: 'Benzoyl Peroxide 2.5% / 5.0% w/w',
    dosageForm: 'Aqueous Gel (30g Tube)',
    therapeuticClass: 'Topical Bactericidal Agent',
    packSize: '30 g Tube',
    composition: 'Benzoyl Peroxide 2.5% or 5.0% in an aqueous vehicle.',
    indications: ['Comedonal and inflammatory acne vulgaris', 'Adjunct to prevent antibiotic resistance'],
    dosageAndAdministration: ['Apply thinly once daily at night, advancing to twice daily as tolerated'],
    contraindications: ['Hypersensitivity to benzoyl peroxide'],
    warningsAndPrecautions: ['Bleaches coloured fabrics and hair'],
    adverseReactions: ['Contact dermatitis, erythema, scaling'],
    storageAndHandling: 'Store below 25°C.',
    category: 'Acne Therapy'
  },
  {
    id: 'i-tacnoid-20',
    brandName: 'I-TACNOID 20 Capsules',
    genericName: 'Isotretinoin 20 mg',
    dosageForm: 'Soft Gelatin Capsules',
    therapeuticClass: 'Systemic Retinoid',
    packSize: '10 x 10 Capsules Blister Pack',
    composition: 'Each soft gelatin capsule contains: Isotretinoin USP 20 mg.',
    indications: ['Severe nodulocystic acne', 'Acne conglobata', 'Refractory acne producing physical or psychological scarring'],
    dosageAndAdministration: ['0.5 to 1.0 mg/kg/day taken with high-fat meals for 16-24 weeks to reach 120-150 mg/kg cumulative dose'],
    contraindications: ['PREGNANCY (Teratogenic Category X)', 'Hepatic insufficiency', 'Hypervitaminosis A', 'Severe hyperlipidemia'],
    warningsAndPrecautions: ['Mandatory pregnancy test and dual contraception', 'Monitor LFT and lipid profile at baseline, 1 month, and 3 months'],
    adverseReactions: ['Cheilitis (universal)', 'Xerosis', 'Epistaxis', 'Elevated serum triglycerides', 'Myalgia'],
    storageAndHandling: 'Protect from light and moisture. Store below 25°C.',
    category: 'Acne Therapy'
  },
  {
    id: 'luliprix-cream',
    brandName: 'LULIPRIX 1% Cream & Lotion',
    genericName: 'Luliconazole 1% w/w',
    dosageForm: 'Topical Cream (30g) / Lotion (30ml)',
    therapeuticClass: 'Advanced Imidazole Antifungal',
    packSize: '30 g Tube / 30 ml Bottle',
    composition: 'Luliconazole 1.0% w/w in a dermatological vanishing base.',
    indications: ['Tinea corporis, Tinea cruris, Tinea pedis', 'Recalcitrant superficial dermatophytosis'],
    dosageAndAdministration: ['Apply a thin layer once daily to affected skin and 1 inch beyond for 1-2 weeks'],
    contraindications: ['Hypersensitivity to luliconazole or vehicle'],
    warningsAndPrecautions: ['For external use only; not for ophthalmic or intravaginal use'],
    adverseReactions: ['Mild localized application site reaction (erythema, contact dermatitis < 1%)'],
    storageAndHandling: 'Store below 25°C. Keep away from heat.',
    category: 'Antifungals'
  },
  {
    id: 'kefin-cream',
    brandName: 'KEFIN 2% Cream',
    genericName: 'Ketoconazole 2% w/w',
    dosageForm: 'Topical Cream (30g)',
    therapeuticClass: 'Broad-Spectrum Imidazole Antifungal',
    packSize: '30 g Tube',
    composition: 'Ketoconazole 20 mg per gram (2.0% w/w).',
    indications: ['Tinea corporis, cruris, pedis', 'Pityriasis versicolor', 'Cutaneous candidiasis', 'Seborrhoeic dermatitis'],
    dosageAndAdministration: ['Apply once or twice daily depending on condition severity for 2 to 4 weeks'],
    contraindications: ['Hypersensitivity to ketoconazole'],
    warningsAndPrecautions: ['Discontinue if severe irritation develops'],
    adverseReactions: ['Localized burning, irritation, pruritus'],
    storageAndHandling: 'Store below 25°C.',
    category: 'Antifungals'
  },
  {
    id: 'kefin-z-shampoo',
    brandName: 'KEFIN-Z Shampoo',
    genericName: 'Ketoconazole 2% + Zinc Pyrithione (ZPTO) 1%',
    dosageForm: 'Medicated Scalp Shampoo (100ml)',
    therapeuticClass: 'Antifungal & Antiseborrhoeic Scalp Wash',
    packSize: '100 ml Bottle',
    composition: 'Ketoconazole 2.0% w/v, Zinc Pyrithione 1.0% w/v in a foaming shampoo base.',
    indications: ['Dandruff (Pityriasis capitis)', 'Seborrhoeic dermatitis of the scalp', 'Adjunct in androgenetic alopecia'],
    dosageAndAdministration: ['Massage into wet scalp, leave for 3 to 5 minutes before thorough rinsing. Use twice weekly.'],
    contraindications: ['Hypersensitivity to azole antifungals or pyrithione'],
    warningsAndPrecautions: ['Avoid contact with eyes; rinse immediately if exposed'],
    adverseReactions: ['Mild scalp dryness, transient hair texture change'],
    storageAndHandling: 'Store in a cool place protected from light.',
    category: 'Antifungals'
  },
  {
    id: 'itfin-sb-130',
    brandName: 'ITFIN SB-130 Capsules',
    genericName: 'Submicronized Itraconazole 130 mg',
    dosageForm: 'Hard Gelatin Capsules',
    therapeuticClass: 'Systemic Triazole Antifungal',
    packSize: '10 x 10 Capsules Strip',
    composition: 'Submicronized Itraconazole 130 mg providing bioequivalence to conventional 200mg formulations with pH-independent absorption.',
    indications: ['Recalcitrant and extensive dermatophytosis', 'Tinea incognito', 'Onychomycosis', 'Systemic mycoses'],
    dosageAndAdministration: ['One capsule once daily taken with or without food for 2 to 4 weeks'],
    contraindications: ['Ventricular dysfunction (congestive heart failure)', 'Co-administration with CYP3A4 substrates that prolong QT interval', 'Pregnancy'],
    warningsAndPrecautions: ['Transient hepatic enzyme elevations; monitor in prolonged therapy > 1 month'],
    adverseReactions: ['Nausea, dyspepsia, headache, abdominal pain'],
    storageAndHandling: 'Store below 25°C in a dry place.',
    category: 'Antifungals'
  },
  {
    id: 'trilofaz-powder',
    brandName: 'TRILOFAZ Dusting Powder',
    genericName: 'Clotrimazole 1% w/w',
    dosageForm: 'Topical Dusting Powder (100g)',
    therapeuticClass: 'Topical Antifungal & Moisture Absorber',
    packSize: '100 g Dispenser Bottle',
    composition: 'Clotrimazole 1.0% w/w in a sterile, starch-based absorbent dusting base.',
    indications: ['Prevention of recurrent tinea cruris and intertrigo', 'Prickly heat and fungal infection of body folds'],
    dosageAndAdministration: ['Dust liberally over affected body folds, groin, and feet twice daily'],
    contraindications: ['Hypersensitivity to clotrimazole'],
    warningsAndPrecautions: ['For external use only'],
    adverseReactions: ['Rare localized irritation'],
    storageAndHandling: 'Keep tightly closed in a dry place.',
    category: 'Antifungals'
  },
  {
    id: 'trilofaz-b-lotion',
    brandName: 'TRILOFAZ-B Lotion',
    genericName: 'Clotrimazole 1% + Betamethasone Dipropionate 0.05%',
    dosageForm: 'Topical Lotion (30ml)',
    therapeuticClass: 'Antifungal + Corticosteroid Combination',
    packSize: '30 ml Bottle',
    composition: 'Clotrimazole 1.0% w/v, Betamethasone Dipropionate equivalent to Betamethasone 0.05% w/v.',
    indications: ['Short-term symptomatic relief of acutely inflamed fungal dermatoses with severe erythema and pruritus'],
    dosageAndAdministration: ['Apply thinly twice daily for a MAXIMUM of 1 to 2 weeks only; transition immediately to pure antifungal'],
    contraindications: ['Viral skin infections, rosacea, perioral dermatitis, prolonged maintenance use'],
    warningsAndPrecautions: ['Do NOT use under occlusive dressings or beyond 14 days to prevent Tinea Incognito and skin atrophy'],
    adverseReactions: ['Skin atrophy, striae, telangiectasia if misused'],
    storageAndHandling: 'Store below 25°C.',
    category: 'Antifungals'
  },
  {
    id: 'tenorium-cream',
    brandName: 'TENORIUM Cream',
    genericName: 'Clobetasol Propionate 0.05% w/w',
    dosageForm: 'Topical Cream (30g)',
    therapeuticClass: 'Superpotent Topical Corticosteroid (Class I)',
    packSize: '30 g Tube',
    composition: 'Clobetasol Propionate 0.05% w/w in an emollient cream base.',
    indications: ['Severe, recalcitrant inflammatory dermatoses', 'Plaque psoriasis on thick acral skin', 'Lichen planus', 'Lichen simplex chronicus'],
    dosageAndAdministration: ['Apply a thin layer once or twice daily to affected areas; maximum duration 2 to 3 weeks; maximum dose 50 g/week'],
    contraindications: ['Rosacea, acne vulgaris, perioral dermatitis, untreated bacterial or fungal infections', 'Children under 12 years'],
    warningsAndPrecautions: ['Risk of hypothalamic-pituitary-adrenal (HPA) axis suppression with extensive application', 'Do NOT use on face, axillae, or groin'],
    adverseReactions: ['Cutaneous atrophy, telangiectasia, striae distensae, hypopigmentation'],
    storageAndHandling: 'Store below 25°C.',
    category: 'Corticosteroids & Anti-inflammatory'
  },
  {
    id: 'tenorium-s',
    brandName: 'TENORIUM-S / S6 Ointment',
    genericName: 'Clobetasol Propionate 0.05% + Salicylic Acid 3% / 6%',
    dosageForm: 'Topical Ointment (30g)',
    therapeuticClass: 'Superpotent Steroid + Keratolytic',
    packSize: '30 g Tube',
    composition: 'Clobetasol Propionate 0.05% w/w, Salicylic Acid 3.0% or 6.0% w/w.',
    indications: ['Hyperkeratotic and scaly dermatoses', 'Palmar and plantar psoriasis', 'Chronic lichenified eczema'],
    dosageAndAdministration: ['Apply thinly once or twice daily. Salicylic acid enhances clobetasol penetration by dissolving keratin scales.'],
    contraindications: ['Known salicylate allergy, large open ulcerations'],
    warningsAndPrecautions: ['Avoid prolonged use over extensive body surface areas to prevent salicylism'],
    adverseReactions: ['Burning sensation, skin peeling, localized atrophy'],
    storageAndHandling: 'Store in a cool, dry place below 25°C.',
    category: 'Corticosteroids & Anti-inflammatory'
  },
  {
    id: 'momerium-cream',
    brandName: 'MOMERIUM 0.1% Cream',
    genericName: 'Mometasone Furoate 0.1% w/w',
    dosageForm: 'Topical Cream (15g / 30g)',
    therapeuticClass: 'Mid-to-High Potency Topical Corticosteroid (Class III/IV)',
    packSize: '15 g / 30 g Tube',
    composition: 'Mometasone Furoate 1 mg per gram (0.1% w/w).',
    indications: ['Atopic dermatitis, allergic contact dermatitis, seborrhoeic dermatitis', 'Psoriasis of trunk and extremities'],
    dosageAndAdministration: ['Apply a thin film ONCE DAILY to affected areas'],
    contraindications: ['Hypersensitivity to mometasone, active viral/fungal skin lesions'],
    warningsAndPrecautions: ['Once-daily application provides equivalent efficacy to twice-daily alternatives with lower atrophy risk'],
    adverseReactions: ['Mild burning, pruritus, folliculitis (< 1%)'],
    storageAndHandling: 'Store below 25°C.',
    category: 'Corticosteroids & Anti-inflammatory'
  },
  {
    id: 'flutirium-cream',
    brandName: 'FLUTIRIUM 0.05% Cream',
    genericName: 'Fluticasone Propionate 0.05% w/w',
    dosageForm: 'Topical Cream (20g)',
    therapeuticClass: 'Mid-Potency Fluorinated Corticosteroid',
    packSize: '20 g Tube',
    composition: 'Fluticasone Propionate 0.05% w/w.',
    indications: ['Eczematous dermatoses, childhood atopic dermatitis (>3 months)', 'Maintenance after superpotent steroid pulse'],
    dosageAndAdministration: ['Apply once or twice daily for up to 4 weeks'],
    contraindications: ['Perioral dermatitis, rosacea'],
    warningsAndPrecautions: ['Avoid occlusive dressings in pediatric patients'],
    adverseReactions: ['Local irritation, hypertrichosis'],
    storageAndHandling: 'Store below 25°C.',
    category: 'Corticosteroids & Anti-inflammatory'
  },
  {
    id: 'tacnoid-ointment',
    brandName: 'TACNOID 0.05% / 0.1% Ointment',
    genericName: 'Tacrolimus 0.05% / 0.1% w/w',
    dosageForm: 'Topical Ointment (10g / 20g Tube)',
    therapeuticClass: 'Topical Calcineurin Inhibitor (Steroid-Sparing TCI)',
    packSize: '10 g / 20 g Tube',
    composition: 'Tacrolimus 0.5 mg/g (0.05%) or 1.0 mg/g (0.1%) in an anhydrous ointment vehicle.',
    indications: ['Moderate to severe atopic dermatitis on face, neck, and flexures', 'Steroid-induced rosacea / perioral dermatitis step-down', 'Vitiligo and facial melasma'],
    dosageAndAdministration: ['Apply a thin layer twice daily to affected skin until clearance, then transition to weekend proactive dosing'],
    contraindications: ['Hypersensitivity to tacrolimus or macrolides', 'Genetic epidermal barrier defects (e.g. Netherton syndrome)'],
    warningsAndPrecautions: ['Transient application-site burning and stinging is common during first 3-5 days and subsides with continued use', 'Use sunscreen on treated sites'],
    adverseReactions: ['Transient skin burning and warmth (common, self-limiting)', 'Folliculitis'],
    storageAndHandling: 'Store below 25°C. Do not freeze.',
    category: 'Immunomodulators'
  },
  {
    id: 'tofaplast-5',
    brandName: 'TOFAPLAST 5 Tablets',
    genericName: 'Tofacitinib Citrate equivalent to Tofacitinib 5 mg',
    dosageForm: 'Film-Coated Tablets',
    therapeuticClass: 'Targeted Oral Janus Kinase (JAK-1/3) Inhibitor',
    packSize: '10 x 10 Tablets Blister Pack',
    composition: 'Tofacitinib Citrate equivalent to Tofacitinib 5 mg.',
    indications: ['Severe refractory atopic dermatitis, alopecia areata, plaque psoriasis under specialist care'],
    dosageAndAdministration: ['5 mg orally once or twice daily with or without food as determined by the dermatologist'],
    contraindications: ['Active tuberculosis, severe hepatic impairment, active serious infections, pregnancy'],
    warningsAndPrecautions: ['Baseline and periodic CBC, LFT, and lipid monitoring required', 'Screen for latent TB and viral hepatitis before initiating'],
    adverseReactions: ['Upper respiratory tract infections, headache, elevated serum transaminases'],
    storageAndHandling: 'Store below 30°C protected from moisture.',
    category: 'Immunomodulators'
  },
  {
    id: 'blismin-20',
    brandName: 'BLISMIN 20 Tablets',
    genericName: 'Bilastine 20 mg',
    dosageForm: 'Uncoated Tablets',
    therapeuticClass: 'Second-Generation Non-Sedating H1 Antihistamine',
    packSize: '10 x 10 Tablets Strip',
    composition: 'Each tablet contains: Bilastine 20 mg.',
    indications: ['Chronic spontaneous urticaria (CSU)', 'Allergic rhinoconjunctivitis', 'Pruritus in inflammatory dermatoses'],
    dosageAndAdministration: ['One tablet (20 mg) ONCE DAILY taken 1 hour before or 2 hours after meals or fruit juices'],
    contraindications: ['Hypersensitivity to bilastine', 'Severe renal impairment co-administered with P-glycoprotein inhibitors'],
    warningsAndPrecautions: ['Food and fruit juices reduce bioavailability by ~30%; strictly advise taking on an empty stomach'],
    adverseReactions: ['Headache (rare < 3%), somnolence (comparable to placebo)'],
    storageAndHandling: 'Store below 25°C.',
    category: 'Antihistamines & Allergy'
  },
  {
    id: 'blismin-m',
    brandName: 'BLISMIN-M Tablets',
    genericName: 'Bilastine 20 mg + Montelukast Sodium 10 mg',
    dosageForm: 'Film-Coated Tablets',
    therapeuticClass: 'H1 Antagonist + Leukotriene Receptor Antagonist',
    packSize: '10 x 10 Tablets Strip',
    composition: 'Bilastine 20 mg, Montelukast Sodium equivalent to Montelukast 10 mg.',
    indications: ['Recalcitrant chronic urticaria', 'Dermatographism and allergic cutaneous reactions requiring dual mediator blockade'],
    dosageAndAdministration: ['One tablet once daily in the evening on an empty stomach'],
    contraindications: ['Hypersensitivity to bilastine or montelukast'],
    warningsAndPrecautions: ['Monitor for neuropsychiatric changes with montelukast therapy'],
    adverseReactions: ['Mild fatigue, abdominal discomfort'],
    storageAndHandling: 'Store in a cool, dry place away from light.',
    category: 'Antihistamines & Allergy'
  },
  {
    id: 'dinofex-180',
    brandName: 'DINOFEX 180 Tablets',
    genericName: 'Fexofenadine Hydrochloride 180 mg',
    dosageForm: 'Film-Coated Tablets',
    therapeuticClass: 'Peripheral H1 Antihistamine',
    packSize: '10 x 10 Tablets Strip',
    composition: 'Fexofenadine HCl 180 mg.',
    indications: ['Chronic idiopathic urticaria', 'Severe allergic pruritus'],
    dosageAndAdministration: ['One tablet 180 mg once daily with water'],
    contraindications: ['Hypersensitivity to fexofenadine'],
    warningsAndPrecautions: ['Do not administer with fruit juices (grapefruit, apple, orange) which inhibit OATP1A2 uptake'],
    adverseReactions: ['Headache, nausea, dizziness'],
    storageAndHandling: 'Store below 25°C.',
    category: 'Antihistamines & Allergy'
  },
  {
    id: 'tressicle-forte',
    brandName: 'TRESSICLE FORTE Solution',
    genericName: 'Minoxidil 5% w/v + Finasteride 0.1% w/v',
    dosageForm: 'Topical Scalp Solution with Dropper & Spray (60ml)',
    therapeuticClass: 'Topical Vasodilator + 5-Alpha Reductase Inhibitor',
    packSize: '60 ml Bottle with Applicator',
    composition: 'Minoxidil 5.0% w/v, Finasteride 0.1% w/v in an alcohol-glycol base.',
    indications: ['Androgenetic alopecia in adult males', 'Vertex and fronto-temporal thinning'],
    dosageAndAdministration: ['Apply 1 ml twice daily directly to the dry scalp in the thinning area; rub gently with fingertips'],
    contraindications: ['WOMEN OF CHILDBEARING POTENTIAL (teratogenic risk to male fetus)', 'Scalp abrasion or severe inflammation'],
    warningsAndPrecautions: ['For scalp application only; wash hands immediately after use', 'Continuous application required to sustain hair density'],
    adverseReactions: ['Scalp erythema, pruritus, transient shedding at weeks 3-6'],
    storageAndHandling: 'Flammable liquid. Store below 25°C. Keep away from flame.',
    category: 'Trichology & Hair'
  },
  {
    id: 'tressicle-f',
    brandName: 'TRESSICLE-F Lipid Lotion',
    genericName: 'Minoxidil 5% w/v + Finasteride 0.1% w/v (Lipid-Enhanced Vehicle)',
    dosageForm: 'Topical Scalp Lotion (60ml)',
    therapeuticClass: 'Advanced Lipid-Penetrating Trichology Formulation',
    packSize: '60 ml Bottle',
    composition: 'Minoxidil 5% w/v, Finasteride 0.1% w/v in a low-alcohol lipid-carrier vehicle.',
    indications: ['Male pattern hair loss for patients experiencing scalp irritation or erythema with standard alcohol formulations'],
    dosageAndAdministration: ['Apply 1 ml twice daily to scalp'],
    contraindications: ['Women and children'],
    warningsAndPrecautions: ['Low-irritant vehicle preserves scalp skin barrier'],
    adverseReactions: ['Infrequent mild localized peeling'],
    storageAndHandling: 'Store below 25°C.',
    category: 'Trichology & Hair'
  },
  {
    id: 'biosicle-plus',
    brandName: 'BIOSICLE PLUS Tablets',
    genericName: 'L-Cysteine, Biotin, Zinc, Grape Seed Extract, Multivitamins & Minerals',
    dosageForm: 'Film-Coated Tablets',
    therapeuticClass: 'Trichonutritional Follicular Supplement',
    packSize: '3 x 10 Tablets Pack',
    composition: 'L-Cysteine, L-Methionine, Biotin 10 mg, Zinc Monomethionine 25 mg, Grape Seed Extract, B-Complex Vitamins, Iron.',
    indications: ['Telogen effluvium, diffuse hair shedding, brittle dystrophic nails', 'Nutritional support during androgenetic alopecia therapy'],
    dosageAndAdministration: ['One tablet daily after breakfast for 3 to 6 months'],
    contraindications: ['Hypersensitivity to any component'],
    warningsAndPrecautions: ['Nutritional supplement; not for standalone use as a substitute for minoxidil in AGA'],
    adverseReactions: ['Occasional mild gastrointestinal fullness'],
    storageAndHandling: 'Store in a cool, dry place away from direct sunlight.',
    category: 'Trichology & Hair'
  },
  {
    id: 'miteclin-cream',
    brandName: 'MITECLIN 5% Cream',
    genericName: 'Permethrin 5% w/w',
    dosageForm: 'Topical Cream (30g)',
    therapeuticClass: 'Synthetic Pyrethroid Scabicide',
    packSize: '30 g Tube',
    composition: 'Permethrin 50 mg per gram (5.0% w/w).',
    indications: ['Scabies (Sarcoptes scabiei infestation) in adults and children over 2 months'],
    dosageAndAdministration: ['Apply thoroughly from neck to soles of feet; leave on for 8 to 14 hours before washing off. Repeat after 7-14 days if needed.'],
    contraindications: ['Hypersensitivity to pyrethroids or pyrethrins'],
    warningsAndPrecautions: ['Treat ALL household contacts simultaneously to prevent reinfestation', 'Post-scabetic pruritus may persist for 2-4 weeks after mite death'],
    adverseReactions: ['Transient stinging, pruritus, erythema'],
    storageAndHandling: 'Store below 25°C. Do not freeze.',
    category: 'Antibacterials & Scabicides'
  },
  {
    id: 'supicid-cream',
    brandName: 'SUPICID 2% Cream',
    genericName: 'Fusidic Acid 2% w/w',
    dosageForm: 'Topical Cream (15g)',
    therapeuticClass: 'Topical Antibacterial',
    packSize: '15 g Tube',
    composition: 'Fusidic Acid 20 mg/g (2.0% w/w).',
    indications: ['Primary and secondary superficial skin infections (impetigo, folliculitis, infected eczema) caused by Staphylococcus aureus'],
    dosageAndAdministration: ['Apply to affected skin 2 to 3 times daily for 7 to 10 days'],
    contraindications: ['Hypersensitivity to fusidic acid'],
    warningsAndPrecautions: ['Do not use for prolonged periods to avoid emergence of bacterial resistance'],
    adverseReactions: ['Mild localized erythema, hypersensitivity reaction'],
    storageAndHandling: 'Store below 25°C.',
    category: 'Antibacterials & Scabicides'
  }
];

// ==========================================================
// 4. REFERENCE LIBRARY DATA (10 Categories + Condition Details)
// ==========================================================

export const REFERENCE_LIBRARY_CATEGORIES: Record<string, LibraryCategory> = {
  'fungal-infections': {
    slug: 'fungal-infections',
    name: 'Fungal Infections',
    count: 14,
    bannerImage: '/ryan/library/fungal-hero.jpg',
    description: 'Clinical references on dermatophytosis, candidiasis, pityriasis versicolor and other common superficial fungal infections.',
    conditionReferences: [
      { title: 'Tinea Corporis', slug: 'tinea-corporis', subtitle: 'Superficial dermatophytosis involving glabrous skin of trunk and extremities.', thumbnail: '/ryan/library/thumb-corporis.jpg' },
      { title: 'Tinea Cruris', slug: 'tinea-cruris', subtitle: 'Groin dermatophytosis with active margin.', thumbnail: '/ryan/library/thumb-cruris.jpg' },
      { title: 'Tinea Pedis', slug: 'tinea-pedis', subtitle: 'Foot fungal infection with interdigital maceration.', thumbnail: '/ryan/library/thumb-pedis.jpg' },
      { title: 'Tinea Faciei', slug: 'tinea-faciei', subtitle: 'Facial dermatophytosis mimicking eczema or lupus.', thumbnail: '/ryan/library/thumb-faciei.jpg' },
      { title: 'Tinea Capitis', slug: 'tinea-capitis', subtitle: 'Scalp dermatophytosis and hair shaft invasion.', thumbnail: '/ryan/library/thumb-capitis.jpg' },
      { title: 'Onychomycosis', slug: 'onychomycosis', subtitle: 'Fungal nail infection and subungual hyperkeratosis.', thumbnail: '/ryan/library/thumb-onycho.jpg' },
      { title: 'Cutaneous Candidiasis', slug: 'cutaneous-candidiasis', subtitle: 'Candida intertrigo with satellite pustules.', thumbnail: '/ryan/library/thumb-candida.jpg' },
      { title: 'Pityriasis Versicolor', slug: 'pityriasis-versicolor', subtitle: 'Malassezia-associated hypopigmented or hyperpigmented macules.', thumbnail: '/ryan/library/thumb-versicolor.jpg' },
      { title: 'Recurrent Dermatophytosis', slug: 'recurrent-dermatophytosis', subtitle: 'Recurrent or persistent infections requiring reassessment.', thumbnail: '/ryan/library/thumb-recurrent.jpg' }
    ],
    therapeuticReferences: [
      { title: 'Topical Antifungals', slug: 'topical-antifungals', subtitle: 'Classes, clinical positioning and practical considerations.', thumbnail: '/ryan/library/thumb-topical-anti.jpg' },
      { title: 'Systemic Antifungals', slug: 'systemic-antifungals', subtitle: 'Oral triazoles, allylamines, dosage regimens and monitoring.', thumbnail: '/ryan/library/thumb-systemic-anti.jpg' }
    ]
  },

  'acne': {
    slug: 'acne',
    name: 'Acne',
    count: 12,
    bannerImage: '/ryan/guide-acne-hero.jpg',
    description: 'Clinical references covering acne classification, pathophysiology, topical regimens, oral therapies and post-acne sequelae.',
    conditionReferences: [
      { title: 'Acne Vulgaris', slug: 'acne-vulgaris', subtitle: 'Overview of comedonal and papulopustular acne.', thumbnail: '/ryan/library/thumb-corporis.jpg' },
      { title: 'Comedonal Acne', slug: 'comedonal-acne', subtitle: 'Microcomedones, open and closed comedones management.', thumbnail: '/ryan/library/thumb-faciei.jpg' },
      { title: 'Inflammatory Acne', slug: 'inflammatory-acne', subtitle: 'Papulopustular acne and neutrophil infiltration.', thumbnail: '/ryan/library/thumb-cruris.jpg' },
      { title: 'Nodulocystic Acne', slug: 'nodulocystic-acne', subtitle: 'Severe deep nodular lesions with scarring risk.', thumbnail: '/ryan/library/thumb-recurrent.jpg' },
      { title: 'Adult Acne', slug: 'adult-acne', subtitle: 'Hormonally responsive mandibular and chin acne in adults.', thumbnail: '/ryan/library/thumb-candida.jpg' },
      { title: 'Acne Scarring', slug: 'acne-scarring', subtitle: 'Atrophic icepick, boxcar and rolling scar assessment.', thumbnail: '/ryan/library/thumb-pedis.jpg' }
    ],
    therapeuticReferences: [
      { title: 'Topical Retinoids', slug: 'topical-retinoids', subtitle: 'Adapalene, Tretinoin, Tazarotene pharmacology.', thumbnail: '/ryan/library/thumb-topical-anti.jpg' },
      { title: 'Benzoyl Peroxide', slug: 'benzoyl-peroxide', subtitle: 'Bactericidal mechanisms without resistance.', thumbnail: '/ryan/library/thumb-topical-anti.jpg' },
      { title: 'Isotretinoin', slug: 'isotretinoin', subtitle: 'Systemic retinoid dosing and monitoring protocol.', thumbnail: '/ryan/library/thumb-systemic-anti.jpg' }
    ]
  },

  'inflammatory-dermatoses': {
    slug: 'inflammatory-dermatoses',
    name: 'Inflammatory Dermatoses',
    count: 11,
    bannerImage: '/ryan/guide-inflammatory.jpg',
    description: 'Clinical references covering atopic dermatitis, contact eczema, seborrhoeic dermatitis and psoriasis vulgaris.',
    conditionReferences: [
      { title: 'Atopic Dermatitis', slug: 'atopic-dermatitis', subtitle: 'Chronic pruritic eczema with filaggrin barrier dysfunction.', thumbnail: '/ryan/library/thumb-corporis.jpg' },
      { title: 'Contact Dermatitis', slug: 'contact-dermatitis', subtitle: 'Allergic and irritant chemical dermatitis.', thumbnail: '/ryan/library/thumb-cruris.jpg' },
      { title: 'Psoriasis Vulgaris', slug: 'psoriasis-vulgaris', subtitle: 'Silvery scaly plaques on extensor surfaces.', thumbnail: '/ryan/library/thumb-recurrent.jpg' },
      { title: 'Seborrhoeic Dermatitis', slug: 'seborrhoeic-dermatitis', subtitle: 'Greasy scaling in sebum-rich areas.', thumbnail: '/ryan/library/thumb-capitis.jpg' }
    ],
    therapeuticReferences: [
      { title: 'Topical Corticosteroids', slug: 'topical-corticosteroids', subtitle: 'Potency ranking, FTU dosing and safe step-down.', thumbnail: '/ryan/library/thumb-topical-anti.jpg' },
      { title: 'Calcineurin Inhibitors', slug: 'calcineurin-inhibitors', subtitle: 'Topical Tacrolimus steroid-sparing therapy.', thumbnail: '/ryan/library/thumb-topical-anti.jpg' }
    ]
  },

  'allergy-and-pruritus': {
    slug: 'allergy-and-pruritus',
    name: 'Allergy & Pruritus',
    count: 10,
    bannerImage: '/ryan/guide-allergy.jpg',
    description: 'Clinical references on acute & chronic urticaria, pruritus sine materia and mast-cell mediated dermatoses.',
    conditionReferences: [
      { title: 'Urticaria Overview', slug: 'urticaria-overview', subtitle: 'Transient erythematous wheals and angioedema.', thumbnail: '/ryan/library/thumb-corporis.jpg' },
      { title: 'Chronic Urticaria', slug: 'chronic-urticaria', subtitle: 'Unprovoked wheals persisting > 6 weeks.', thumbnail: '/ryan/library/thumb-cruris.jpg' },
      { title: 'Generalised Pruritus', slug: 'generalised-pruritus', subtitle: 'Diagnostic workup for itch without primary skin lesions.', thumbnail: '/ryan/library/thumb-candida.jpg' }
    ],
    therapeuticReferences: [
      { title: 'Antihistamines', slug: 'antihistamines', subtitle: 'Second-generation non-sedating H1 receptor antagonists.', thumbnail: '/ryan/library/thumb-systemic-anti.jpg' }
    ]
  },

  'hair-and-scalp': {
    slug: 'hair-and-scalp',
    name: 'Hair & Scalp',
    count: 11,
    bannerImage: '/ryan/guide-hair.jpg',
    description: 'References covering androgenetic alopecia, telogen effluvium, alopecia areata and scalp health.',
    conditionReferences: [
      { title: 'Androgenetic Alopecia', slug: 'androgenetic-alopecia', subtitle: 'Patterned follicular miniaturization.', thumbnail: '/ryan/library/thumb-capitis.jpg' },
      { title: 'Telogen Effluvium', slug: 'telogen-effluvium', subtitle: 'Diffuse reactive shedding post-stressor.', thumbnail: '/ryan/library/thumb-faciei.jpg' },
      { title: 'Alopecia Areata', slug: 'alopecia-areata', subtitle: 'Autoimmune circumscribed patchy hair loss.', thumbnail: '/ryan/library/thumb-pedis.jpg' }
    ],
    therapeuticReferences: [
      { title: 'Minoxidil Reference', slug: 'minoxidil-reference', subtitle: 'Topical and oral minoxidil pharmacology.', thumbnail: '/ryan/library/thumb-topical-anti.jpg' },
      { title: 'Finasteride Reference', slug: 'finasteride-reference', subtitle: '5-alpha reductase inhibition for AGA.', thumbnail: '/ryan/library/thumb-systemic-anti.jpg' }
    ]
  },

  'pigmentation': {
    slug: 'pigmentation',
    name: 'Pigmentation',
    count: 10,
    bannerImage: '/ryan/guide-pigmentation.jpg',
    description: 'References covering melasma, post-inflammatory hyperpigmentation, facial hypermelanosis and vitiligo.',
    conditionReferences: [
      { title: 'Melasma', slug: 'melasma', subtitle: 'Symmetrical centrofacial and malar hyperpigmentation.', thumbnail: '/ryan/library/thumb-faciei.jpg' },
      { title: 'Post-Inflammatory Hyperpigmentation', slug: 'pih', subtitle: 'Reactive epidermal and dermal melanin deposition.', thumbnail: '/ryan/library/thumb-corporis.jpg' }
    ],
    therapeuticReferences: [
      { title: 'Photoprotection & Depigmentation', slug: 'photoprotection-depigmentation', subtitle: 'Broad-spectrum UV/HEV filters and tyrosinase inhibitors.', thumbnail: '/ryan/library/thumb-topical-anti.jpg' }
    ]
  },

  'bacterial-infections': {
    slug: 'bacterial-infections',
    name: 'Bacterial Infections',
    count: 10,
    bannerImage: '/ryan/hero-therapeutic-doc.jpg',
    description: 'Clinical references on impetigo, folliculitis, furunculosis and antimicrobial stewardship.',
    conditionReferences: [
      { title: 'Impetigo', slug: 'impetigo', subtitle: 'Staphylococcal honey-colored crusted lesions.', thumbnail: '/ryan/library/thumb-corporis.jpg' },
      { title: 'Folliculitis', slug: 'folliculitis', subtitle: 'Perifollicular pustules and erythema.', thumbnail: '/ryan/library/thumb-cruris.jpg' }
    ],
    therapeuticReferences: [
      { title: 'Topical Antibiotics', slug: 'topical-antibiotics', subtitle: 'Fusidic Acid and stewardship protocols.', thumbnail: '/ryan/library/thumb-topical-anti.jpg' }
    ]
  },

  'immunomodulatory-dermatology': {
    slug: 'immunomodulatory-dermatology',
    name: 'Immunomodulatory Dermatology',
    count: 8,
    bannerImage: '/ryan/guide-inflammatory.jpg',
    description: 'References covering calcineurin inhibitors, JAK inhibitors and monitoring parameters.',
    conditionReferences: [
      { title: 'Chronic Inflammatory Dermatoses', slug: 'chronic-inflammatory-dermatoses', subtitle: 'Immune pathways in refractory dermatoses.', thumbnail: '/ryan/library/thumb-recurrent.jpg' }
    ],
    therapeuticReferences: [
      { title: 'JAK Inhibitors', slug: 'jak-inhibitors', subtitle: 'Tofacitinib and cytokine cascade interruption.', thumbnail: '/ryan/library/thumb-systemic-anti.jpg' }
    ]
  },

  'parasitic-conditions': {
    slug: 'parasitic-conditions',
    name: 'Parasitic Conditions',
    count: 7,
    bannerImage: '/ryan/safety-shield.jpg',
    description: 'References on scabies, pediculosis, contact management and reinfection prevention.',
    conditionReferences: [
      { title: 'Classical Scabies', slug: 'classical-scabies', subtitle: 'Sarcoptes scabiei infestation and interdigital burrows.', thumbnail: '/ryan/library/thumb-pedis.jpg' },
      { title: 'Crusted Scabies', slug: 'crusted-scabies', subtitle: 'Hyperkeratotic Norwegian scabies in immunocompromised patients.', thumbnail: '/ryan/library/thumb-recurrent.jpg' }
    ],
    therapeuticReferences: [
      { title: 'Permethrin Reference', slug: 'permethrin-reference', subtitle: 'Permethrin 5% application and contact decontamination.', thumbnail: '/ryan/library/thumb-topical-anti.jpg' }
    ]
  },

  'skin-care': {
    slug: 'skin-care',
    name: 'Skin Care',
    count: 12,
    bannerImage: '/ryan/hero-therapeutic-doc.jpg',
    description: 'Practical references covering skin barrier function, xerosis, moisturizers, cleansers and photoprotection.',
    conditionReferences: [
      { title: 'Skin Barrier Function', slug: 'skin-barrier-function', subtitle: 'Stratum corneum lipids, ceramides and TEWL.', thumbnail: '/ryan/library/thumb-candida.jpg' },
      { title: 'Xerosis & Sensitive Skin', slug: 'xerosis-sensitive-skin', subtitle: 'Barrier repair algorithms and syndet cleansers.', thumbnail: '/ryan/library/thumb-versicolor.jpg' }
    ],
    therapeuticReferences: [
      { title: 'Emollient Therapy', slug: 'emollient-therapy', subtitle: 'Humectants, occlusives and lipid replenishment.', thumbnail: '/ryan/library/thumb-topical-anti.jpg' }
    ]
  }
};

// ==========================================================
// 5. SAMPLE DETAILED TOPIC PAGE (Level 3 - 11 Accordions)
// ==========================================================

export const SAMPLE_TOPIC_PAGES: Record<string, LibraryTopic> = {
  'tinea-corporis': {
    slug: 'tinea-corporis',
    title: 'Tinea Corporis',
    categoryName: 'Fungal Infections',
    categorySlug: 'fungal-infections',
    type: 'Superficial Dermatophytosis',
    image: '/ryan/library/tinea-corporis-lesion.jpg',
    quickSummary: 'Tinea corporis is a superficial dermatophyte infection of glabrous skin, commonly presenting as an expanding annular or polycyclic plaque with an active scaly border. Pruritus is frequent, although clinical appearance can vary according to host immunity and previous topical steroid exposure.',
    overview: {
      definition: 'Tinea corporis refers to dermatophyte infection involving glabrous skin of the trunk and extremities, excluding sites classified separately such as scalp, groin, feet and nails. The infection is caused by keratinophilic fungi that utilize keratinized tissues.',
      pearl: 'An expanding lesion with a more active, scaly peripheral margin is an important clinical clue toward dermatophytosis over eczema.'
    },
    clinicalPresentation: {
      morphology: [
        'Annular plaques with raised, active erythematous border',
        'Polycyclic or arcuate confluent configuration',
        'Peripheral scaling with variable central clearing',
        'Atypical morphology following prior topical corticosteroid exposure (Tinea Incognito)'
      ],
      distribution: ['Trunk (anterior/posterior)', 'Upper and lower extremities', 'Glabrous body folds'],
      symptoms: ['Mild to intense pruritus', 'Localized burning or irritation', 'Progressive centrifugal lesion enlargement']
    },
    causativeOrganisms: {
      description: 'Caused predominantly by anthropophilic and zoophilic dermatophyte fungi:',
      organisms: [
        'Trichophyton rubrum (most common worldwide)',
        'Trichophyton mentagrophytes / Trichophyton indotineae (often associated with marked inflammation and recalcitrance)',
        'Microsporum canis (zoophilic source, commonly transmitted from domestic cats or dogs)'
      ]
    },
    riskFactors: [
      'Warm, humid environmental climates and heavy perspiration',
      'Contact sports involving direct body friction (Tinea Corporis Glabrosa)',
      'Sharing contaminated towels, clothes, or bedding with infected individuals',
      'Co-existing untreated tinea pedis or onychomycosis acting as a fungal reservoir',
      'Diabetes mellitus, immunosuppressive therapy, or barrier disruption'
    ],
    diagnosticConsiderations: {
      clinicalAssessment: 'Diagnosis is primarily clinical based on characteristic morphology, but laboratory confirmation is prudent when clinical presentation is atypical or refractory.',
      investigations: [
        'Direct Potassium Hydroxide (KOH 10-20%) mount of skin scrapings demonstrating branching, septate hyphae',
        'Fungal Culture on Sabouraud Dextrose Agar (SDA) for definitive species identification',
        'Dermoscopy revealing peripheral scales, follicular micropustules, and comma-like vessels'
      ]
    },
    differentialDiagnosis: [
      { condition: 'Nummular Eczema', distinguishingFeatures: 'Coin-shaped plaques with oozing, microvesicles, and crusting throughout; no central clearing; negative KOH.' },
      { condition: 'Plaque Psoriasis', distinguishingFeatures: 'Well-demarcated silvery micaceous scales on extensor surfaces; Auspitz sign positive.' },
      { condition: 'Pityriasis Rosea', distinguishingFeatures: 'Herald patch followed by Christmas tree pattern of oval plaques with collarette scaling.' },
      { condition: 'Granuloma Annulare', distinguishingFeatures: 'Smooth dermal papules in ring-shaped configuration; no epidermal scaling; negative KOH.' }
    ],
    managementPrinciples: [
      'Confirm mycological involvement where feasible prior to systemic therapy.',
      'Localized lesions: treat with topical allylamines or modern imidazoles for 2-4 weeks.',
      'Extensive (>10% BSA), multi-site, or recalcitrant infections: initiate systemic oral antifungal therapy.',
      'Strictly avoid steroid-containing creams to prevent steroid-modified tinea incognito.'
    ],
    topicalTherapy: {
      indication: 'First-line for localized tinea corporis involving limited body surface area.',
      agents: [
        'Luliconazole 1% Cream / Lotion: once daily for 1 to 2 weeks',
        'Terbinafine 1% Cream: once or twice daily for 2 weeks',
        'Ketoconazole 2% Cream: once or twice daily for 2 to 4 weeks',
        'Apply 1-2 cm beyond the active advancing margin to eradicate subclinical mycelia'
      ]
    },
    systemicTherapy: {
      indication: 'Indicated for extensive lesions, failed topical regimens, immunosuppressed hosts, or hair follicle invasion.',
      agents: [
        'Itraconazole: 100-200 mg daily with food for 2-4 weeks (or Submicronized ITFIN SB-130 once daily)',
        'Terbinafine: 250 mg once daily for 2 to 4 weeks',
        'Monitor hepatic function if oral course extends beyond 4 weeks'
      ]
    },
    recurrenceAndPrevention: [
      'Treat minimum 1-2 weeks beyond complete clinical resolution of skin lesions',
      'Launder clothes in warm water with thorough hot iron drying',
      'Use prophylactic antifungal dusting powder (Trilofaz 1%) in skin folds during hot weather',
      'Identify and treat infected family members and pets simultaneously'
    ],
    references: [
      'Gupta AK, et al. Treatments for tinea corporis and tinea cruris: a systematic review. J Cutan Med Surg. 2021;25(4):428-442.',
      'Verma SB, et al. Emergence of recalcitrant dermatophytosis: an international perspective. Int J Dermatol. 2021;60(4):450-459.',
      'Ameen M. Epidemiology of superficial fungal infections. Clin Dermatol. 2010;28(2):197-201.'
    ],
    relatedProducts: [
      { name: 'LULIPRIX', generic: 'Luliconazole 1% Cream', form: '30 g Tube', image: '/ryan/library/prod-luliprix.jpg' },
      { name: 'TRILOFAZ', generic: 'Clotrimazole 1% Dusting Powder', form: '100 g Dispenser', image: '/ryan/library/prod-trilofaz.jpg' },
      { name: 'TRILOFAZ-B', generic: 'Clotrimazole 1% + Betamethasone Lotion', form: '30 ml Bottle', image: '/ryan/library/prod-trilofaz-b.jpg' }
    ]
  },

  'tinea-faciei': {
    slug: 'tinea-faciei',
    title: 'Tinea Faciei',
    categoryName: 'Fungal Infections',
    categorySlug: 'fungal-infections',
    type: 'Superficial Dermatophytosis of the Face',
    image: '/ryan/library/thumb-faciei.jpg',
    quickSummary: 'Tinea faciei is a dermatophyte infection of non-bearded facial skin. It frequently mimics lupus, contact eczema, seborrhoeic dermatitis or rosacea and is heavily prone to steroid-induced modification.',
    overview: {
      definition: 'Dermatophyte infection of facial skin in men (non-bearded), women, and children. Frequently misdiagnosed because facial features often lack the pronounced ring configuration seen on glabrous trunk skin.',
      pearl: 'An asymmetrical facial plaque with subtle peripheral scaling that fails topical steroid treatment warrants urgent KOH examination for dermatophytes.'
    },
    clinicalPresentation: {
      morphology: [
        'Round or oval erythematous plaques with variable central clearing',
        'Peripheral fine scaling; often lacks a pronounced elevated border',
        'Marked photosensitivity and burning sensation on sun exposure'
      ],
      distribution: ['Cheeks, periorbital zone, nose, forehead'],
      symptoms: ['Mild pruritus, photosensitivity, localized burning']
    },
    causativeOrganisms: {
      description: 'Common organisms:',
      organisms: ['Trichophyton rubrum', 'Trichophyton mentagrophytes', 'Microsporum canis']
    },
    riskFactors: [
      'Contact with pets (kittens/puppies with ringworm)',
      'Autoinoculation from tinea unguium or tinea pedis',
      'Inappropriate use of topical corticosteroids on the face'
    ],
    diagnosticConsiderations: {
      clinicalAssessment: 'High index of suspicion required for any unilateral or treatment-unresponsive facial rash.',
      investigations: ['KOH examination of skin scrapings from peripheral scaly areas', 'Fungal culture']
    },
    differentialDiagnosis: [
      { condition: 'Discoid Lupus Erythematosus', distinguishingFeatures: 'Follicular plugging, scarring, atrophy, and telangiectasia; negative KOH.' },
      { condition: 'Seborrhoeic Dermatitis', distinguishingFeatures: 'Bilateral symmetrical greasy scaling on nasolabial folds and eyebrows.' },
      { condition: 'Rosacea', distinguishingFeatures: 'Symmetrical flushing, telangiectasia, papulopustules without scaling.' }
    ],
    managementPrinciples: [
      'Discontinue all topical corticosteroids immediately.',
      'Topical non-irritating antifungal agents (Luliconazole, Sertaconazole).',
      'Systemic oral therapy if follicular invasion is evident.'
    ],
    topicalTherapy: {
      indication: 'Mild localized tinea faciei.',
      agents: ['Luliconazole 1% Cream once daily for 2 weeks', 'Terbinafine 1% Cream twice daily for 2 weeks']
    },
    systemicTherapy: {
      indication: 'Extensive facial involvement or Tinea Incognito with follicular infiltration.',
      agents: ['Itraconazole 100-200 mg daily for 2 weeks', 'Terbinafine 250 mg daily for 2 weeks']
    },
    recurrenceAndPrevention: ['Avoid facial steroid applications', 'Evaluate household animals', 'Maintain barrier hygiene'],
    references: [
      'Goranov V, et al. Tinea faciei: clinical features and diagnostic pitfalls. Acta Dermatovenerol Alp Pannonica Adriat. 2018;27(2):83-86.'
    ],
    relatedProducts: [
      { name: 'LULIPRIX', generic: 'Luliconazole 1% Cream', form: '30 g Tube', image: '/ryan/library/prod-luliprix.jpg' },
      { name: 'KEFIN', generic: 'Ketoconazole 2% Cream', form: '30 g Tube', image: '/ryan/library/thumb-corporis.jpg' }
    ]
  }
};
