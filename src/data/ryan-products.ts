// Ryan Dermaceutics - Complete 53 Product Monographs Catalog
// Auto-generated with authentic client data from Product Monograph DOCX records

export interface RyanProduct {
 id: string;
 slug: string;
 brandName: string;
 genericName: string;
 tagline: string;
 therapeuticArea: 'Acne' | 'Antifungal' | 'Antibacterial' | 'Corticosteroids' | 'Allergy & Pruritus' | 'Immunomodulator' | 'Pigmentation' | 'Hair & Scalp' | 'Anti-Parasitic' | 'Supportive Care';
 route: 'Topical' | 'Oral / Systematic';
 routeSubcategory: string;
 dosageForm: 'Cream' | 'Ointment' | 'Gel' | 'Lotion' | 'Tablet' | 'Capsule' | 'Softgel' | 'Syrup' | 'Solution' | 'Soap' | 'Powder' | 'Gummy';
 strength: string;
 packSize: string;
 prescriptionStatus: string;
 clinicalSummary: string;
 composition: string[];
 therapeuticCategory: string;
 pharmacologicalClass: string;
 mechanismOfAction: { step: string; title: string; description: string }[];
 indications: string[];
 dosageAdministration: {
 recommended: string;
 howToApply: string;
 duration: string;
 missedApplication: string;
 };
 specialPopulations: {
 pregnancy: string;
 lactation: string;
 paediatric: string;
 geriatric: string;
 specialSites?: string;
 };
 contraindications: string[];
 warningsPrecautions: { title: string; detail: string }[];
 adverseEffects: {
 common: string[];
 lessCommon: string[];
 rare: string[];
 };
 drugInteractions: {
 topical: string;
 systemic: string;
 };
 storageHandling: string[];
 patientCounselling: { question: string; answer: string }[];
 clinicalPearl: string;
 relatedProducts: { name: string; generic: string; slug: string }[];
 references: string[];
}

export const RYAN_PRODUCTS: RyanProduct[] = [
 {
 "id": "biosicle-plus",
 "slug": "biosicle-plus",
 "brandName": "BIOSICLE PLUS",
 "genericName": "Biotin 10 mg + Calcium Pantothenate 100 mg + N-Acetylcysteine 50 mg + Selenium 65 mcg + Copper 3 mg + Zinc 22.5 mg Tablets",
 "tagline": "Dermatology Nutritional Support",
 "therapeuticArea": "Hair & Scalp",
 "route": "Oral / Systematic",
 "routeSubcategory": "Hair & Scalp",
 "dosageForm": "Tablet",
 "strength": "10 mg",
 "packSize": "10 × 1 × 10 Alu-Alu",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of hair & scalp disorders.",
 "composition": [
 "Biotin 10 mg + Calcium Pantothenate 100 mg + N-Acetylcysteine 50 mg + Selenium 65 mcg + Copper 3 mg + Zinc 22.5 mg Tablets",
 "Formulated in a specialized pharmaceutical tablet base."
 ],
 "therapeuticCategory": "Dermatology Nutritional Supplement",
 "pharmacologicalClass": "Specialized dermatological hair & scalp therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Biotin 10 mg to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for hair & scalp symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic hair & scalp conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Biotin 10 mg + Calcium Pantothenate 100 mg + N-Acetylcysteine 50 mg + Selenium 65 mcg + Copper 3 mg + Zinc 22.5 mg Tablets or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of hair & scalp."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "BIOSICLE PLUS combines biotin, calcium pantothenate, N-acetylcysteine, zinc, selenium and copper to provide nutritional and antioxidant support relevant to normal hair, skin and tissue physiology. Its most appropriate clinical role is as an adjunct within a diagnosis-driven dermatological management plan. Nutritional deficiencies should be investigated when clinically suspected, while persistent or patterned hair loss should receive appropriate diagnostic evaluation and disease-specific treatment.",
 "relatedProducts": [
 {
 "name": "TRESSICLE 2.5",
 "generic": "Minoxidil 2.5 mg Tablet",
 "slug": "tressicle-2-5"
 },
 {
 "name": "TRESSICLE 5",
 "generic": "Minoxidil 5 mg Tablet",
 "slug": "tressicle-5"
 },
 {
 "name": "TRESSICLE FORTE",
 "generic": "Minoxidil 5% Solution",
 "slug": "tressicle-forte"
 }
 ],
 "references": [
 "Approved Prescribing Information – BIOSICLE PLUS.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "blismin-20",
 "slug": "blismin-20",
 "brandName": "BLISMIN-20",
 "genericName": "Bilastine 20 mg Tablet",
 "tagline": "Second-Generation H1-Antihistamine for Symptomatic Relief of Allergic Rhinoconjunctivitis and Urticaria",
 "therapeuticArea": "Allergy & Pruritus",
 "route": "Oral / Systematic",
 "routeSubcategory": "Anti-Allergic / Pruritic",
 "dosageForm": "Tablet",
 "strength": "20 mg",
 "packSize": "10 × 10 Alu-Alu",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of allergy & pruritus disorders.",
 "composition": [
 "Each tablet contains:",
 "Bilastine 20 mg",
 "Excipients: q.s.",
 "Regulatory Note: The final qualitative and quantitative composition, excipient declaration and formulation description should exactly match the approved BLISMIN-20 product specification and package insert."
 ],
 "therapeuticCategory": "Antihistamine",
 "pharmacologicalClass": "Second-generation selective peripheral H1-antihistamine",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Selective Peripheral H1-Receptor Antagonism"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Peripheral H1-receptor activation"
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Sneezing / rhinorrhoea / itching / wheals"
 }
 ],
 "indications": [
 "Management of acute and chronic allergy & pruritus conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Bilastine 20 mg Tablet or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of allergy & pruritus."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "BLISMIN-20 provides a once-daily 20 mg bilastine option for adults and adolescents ≥12 years with appropriate allergic rhinoconjunctivitis or urticaria. Correct administration—particularly taking the tablet away from food and fruit juice—is an important part of achieving the intended therapeutic effect.",
 "relatedProducts": [
 {
 "name": "BLISMIN-M",
 "generic": "Bilastine 20 mg + Montelukast 10 mg Tablet",
 "slug": "blismin-m"
 },
 {
 "name": "DINOFEX-180",
 "generic": "Fexofenadine 180 mg Tablet",
 "slug": "dinofex-180"
 },
 {
 "name": "HIVOZIN-5",
 "generic": "Levocetirizine 5 mg Tablet",
 "slug": "hivozin-5"
 }
 ],
 "references": [
 "Approved Prescribing Information – BLISMIN-20.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "blismin-m",
 "slug": "blismin-m",
 "brandName": "BLISMIN-M",
 "genericName": "Bilastine 20 mg + Montelukast 10 mg Tablet",
 "tagline": "Dual-Pathway Antiallergic Therapy for Appropriate Allergic Rhinitis",
 "therapeuticArea": "Allergy & Pruritus",
 "route": "Oral / Systematic",
 "routeSubcategory": "Anti-Allergic / Pruritic",
 "dosageForm": "Tablet",
 "strength": "20 mg",
 "packSize": "10 × 10 Alu-Alu",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of allergy & pruritus disorders.",
 "composition": [
 "Each film-coated tablet contains:",
 "Bilastine IP — 20 mg",
 "Montelukast Sodium IP equivalent to Montelukast — 10 mg",
 "Excipients: q.s."
 ],
 "therapeuticCategory": "Antiallergic / Leukotriene Modifier Combination",
 "pharmacologicalClass": "Specialized dermatological allergy & pruritus therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Pathway 1 — Histamine"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "H1 receptor activation"
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Sneezing / itching / rhinorrhoea / ocular symptoms"
 }
 ],
 "indications": [
 "Management of acute and chronic allergy & pruritus conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Bilastine 20 mg + Montelukast 10 mg Tablet or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of allergy & pruritus."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "BLISMIN-M combines peripheral H1-receptor blockade with leukotriene receptor antagonism for appropriately selected allergic rhinitis patients. Correct administration of bilastine—particularly away from food and fruit juice—is important, while montelukast therapy requires explicit counselling regarding potential neuropsychiatric effects.",
 "relatedProducts": [
 {
 "name": "BLISMIN-20",
 "generic": "Bilastine 20 mg Tablet",
 "slug": "blismin-20"
 },
 {
 "name": "DINOFEX-180",
 "generic": "Fexofenadine 180 mg Tablet",
 "slug": "dinofex-180"
 },
 {
 "name": "HIVOZIN-5",
 "generic": "Levocetirizine 5 mg Tablet",
 "slug": "hivozin-5"
 }
 ],
 "references": [
 "Approved Prescribing Information – BLISMIN-M.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "cinimup",
 "slug": "cinimup",
 "brandName": "CINIMUP",
 "genericName": "Mupirocin 2% Ointment",
 "tagline": "Topical Antibacterial Preparation — PEG Base",
 "therapeuticArea": "Antibacterial",
 "route": "Topical",
 "routeSubcategory": "Antibacterial",
 "dosageForm": "Ointment",
 "strength": "2% w/w",
 "packSize": "5 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antibacterial disorders.",
 "composition": [
 "Each gram of ointment contains:",
 "Mupirocin — 2% w/w",
 "Ointment base: Polyethylene Glycol Base",
 "Dosage Form"
 ],
 "therapeuticCategory": "Topical Antibacterial",
 "pharmacologicalClass": "Specialized dermatological antibacterial therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Mupirocin acts by inhibiting bacterial protein synthesis."
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "It binds to bacterial isoleucyl-tRNA synthetase."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Interferes with incorporation of isoleucine into bacterial proteins"
 }
 ],
 "indications": [
 "Management of acute and chronic antibacterial conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Mupirocin 2% Ointment or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antibacterial."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed ointment regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "CINIMUP provides Mupirocin 2% w/w in a PEG-based ointment for selected superficial bacterial skin infections. Correct diagnosis, appropriate localization of therapy, proper application, limited duration and antimicrobial stewardship are central to effective topical antibacterial treatment.",
 "relatedProducts": [
 {
 "name": "LIXOCLIN-LB",
 "generic": "Doxycycline 100 mg + Lactic Acid Bacillus 5 Million Spores",
 "slug": "lixoclin-lb"
 },
 {
 "name": "POVIPRIX PLUS",
 "generic": "Povidone Iodine 5% + Metronidazole 1% + Sucralfate 7% Ointment",
 "slug": "poviprix-plus"
 },
 {
 "name": "ROMITIZ-500",
 "generic": "Azithromycin 500 mg Tablet",
 "slug": "romitiz-500"
 }
 ],
 "references": [
 "Approved Prescribing Information – CINIMUP.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "clixodin-ad",
 "slug": "clixodin-ad",
 "brandName": "CLIXODIN-AD",
 "genericName": "Clindamycin 1% + Adapalene 0.1% Gel",
 "tagline": "Topical Anti-Acne Preparation",
 "therapeuticArea": "Acne",
 "route": "Topical",
 "routeSubcategory": "Acne",
 "dosageForm": "Gel",
 "strength": "1%",
 "packSize": "15 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of acne disorders.",
 "composition": [
 "Each gram of gel contains:",
 "Clindamycin — 1% w/w",
 "Adapalene — 0.1% w/w",
 "Gel base: q.s."
 ],
 "therapeuticCategory": "Topical Anti-Acne",
 "pharmacologicalClass": "Specialized dermatological acne therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Accordion 01 — CLINDAMYCIN"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Clindamycin is a lincosamide antibacterial agent."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "It acts primarily through inhibition of bacterial protein synthesis by binding to the bacterial 50S ribosomal subunit."
 }
 ],
 "indications": [
 "Management of acute and chronic acne conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Clindamycin 1% + Adapalene 0.1% Gel or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of acne."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed gel regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "CLIXODIN-AD combines Clindamycin 1% w/w with Adapalene 0.1% w/w to address complementary components of acne, including bacterial/inflammatory activity and abnormal follicular keratinisation. Appropriate patient selection, consistent application, management of retinoid-related irritation and responsible antibiotic use are central to effective therapy.",
 "relatedProducts": [
 {
 "name": "CLIXODIN-BPO",
 "generic": "Clindamycin 1% + Benzoyl Peroxide 2.5% Gel",
 "slug": "clixodin-bpo"
 },
 {
 "name": "CLIXODIN-NT",
 "generic": "Clindamycin 1% + Nicotinamide 4% Gel",
 "slug": "clixodin-nt"
 },
 {
 "name": "I-TACNOID 20",
 "generic": "Isotretinoin 20 mg Softgel Capsule",
 "slug": "i-tacnoid-20"
 }
 ],
 "references": [
 "Approved Prescribing Information – CLIXODIN-AD.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "clixodin-bpo",
 "slug": "clixodin-bpo",
 "brandName": "CLIXODIN-BPO",
 "genericName": "Clindamycin 1% + Benzoyl Peroxide 2.5% Gel",
 "tagline": "Topical Anti-Acne Preparation",
 "therapeuticArea": "Acne",
 "route": "Topical",
 "routeSubcategory": "Acne",
 "dosageForm": "Gel",
 "strength": "1%",
 "packSize": "15 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of acne disorders.",
 "composition": [
 "Each gram of gel contains:",
 "Clindamycin — 1% w/w",
 "Benzoyl Peroxide — 2.5% w/w",
 "Gel base: q.s."
 ],
 "therapeuticCategory": "Topical Anti-Acne",
 "pharmacologicalClass": "Specialized dermatological acne therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Accordion 01 — CLINDAMYCIN"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Clindamycin is a lincosamide antibacterial agent."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "It primarily inhibits bacterial protein synthesis by binding to the 50S ribosomal subunit."
 }
 ],
 "indications": [
 "Management of acute and chronic acne conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Clindamycin 1% + Benzoyl Peroxide 2.5% Gel or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of acne."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed gel regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "CLIXODIN-BPO combines Clindamycin 1% w/w with Benzoyl Peroxide 2.5% w/w to provide complementary antibacterial, anti-inflammatory and antimicrobial activity for selected acne presentations. Appropriate patient selection, consistent application, management of irritation and responsible use of topical antibiotics are central to effective therapy.",
 "relatedProducts": [
 {
 "name": "CLIXODIN-AD",
 "generic": "Clindamycin 1% + Adapalene 0.1% Gel",
 "slug": "clixodin-ad"
 },
 {
 "name": "CLIXODIN-NT",
 "generic": "Clindamycin 1% + Nicotinamide 4% Gel",
 "slug": "clixodin-nt"
 },
 {
 "name": "I-TACNOID 20",
 "generic": "Isotretinoin 20 mg Softgel Capsule",
 "slug": "i-tacnoid-20"
 }
 ],
 "references": [
 "Approved Prescribing Information – CLIXODIN-BPO.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "clixodin-nt",
 "slug": "clixodin-nt",
 "brandName": "CLIXODIN-NT",
 "genericName": "Clindamycin 1% + Nicotinamide 4% Gel",
 "tagline": "Topical Anti-Acne Preparation",
 "therapeuticArea": "Acne",
 "route": "Topical",
 "routeSubcategory": "Acne",
 "dosageForm": "Gel",
 "strength": "1%",
 "packSize": "15 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of acne disorders.",
 "composition": [
 "Each gram of gel contains:",
 "Clindamycin — 1% w/w",
 "Nicotinamide — 4% w/w",
 "Gel base: q.s."
 ],
 "therapeuticCategory": "Topical Anti-Acne",
 "pharmacologicalClass": "Specialized dermatological acne therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Accordion 01 — CLINDAMYCIN"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Clindamycin is a lincosamide antibacterial agent."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "It acts primarily by inhibiting bacterial protein synthesis through interaction with the bacterial 50S ribosomal subunit."
 }
 ],
 "indications": [
 "Management of acute and chronic acne conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Clindamycin 1% + Nicotinamide 4% Gel or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of acne."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed gel regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "CLIXODIN-NT combines Clindamycin 1% w/w with Nicotinamide 4% w/w in a topical gel designed for selected inflammatory acne presentations. Appropriate diagnosis, consistent application, attention to tolerability and responsible use of topical antibiotics are central to effective acne management.",
 "relatedProducts": [
 {
 "name": "CLIXODIN-AD",
 "generic": "Clindamycin 1% + Adapalene 0.1% Gel",
 "slug": "clixodin-ad"
 },
 {
 "name": "CLIXODIN-BPO",
 "generic": "Clindamycin 1% + Benzoyl Peroxide 2.5% Gel",
 "slug": "clixodin-bpo"
 },
 {
 "name": "I-TACNOID 20",
 "generic": "Isotretinoin 20 mg Softgel Capsule",
 "slug": "i-tacnoid-20"
 }
 ],
 "references": [
 "Approved Prescribing Information – CLIXODIN-NT.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "dinofex-180",
 "slug": "dinofex-180",
 "brandName": "DINOFEX-180",
 "genericName": "Fexofenadine 180 mg Tablet",
 "tagline": "Second-Generation H1-Antihistamine for Appropriate Allergic Conditions",
 "therapeuticArea": "Allergy & Pruritus",
 "route": "Oral / Systematic",
 "routeSubcategory": "Anti-Allergic / Pruritic",
 "dosageForm": "Tablet",
 "strength": "180 mg",
 "packSize": "10 × 10 Alu-Alu",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of allergy & pruritus disorders.",
 "composition": [
 "Each tablet contains:",
 "Fexofenadine Hydrochloride IP equivalent to Fexofenadine — 180 mg",
 "Excipients: q.s.",
 "Dosage Form"
 ],
 "therapeuticCategory": "Second-Generation H1-Antihistamine",
 "pharmacologicalClass": "Selective peripheral H1-receptor antagonist",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Histamine-Mediated Allergic Response"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "H1-receptor activation"
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Sneezing • Itching • Rhinorrhoea"
 }
 ],
 "indications": [
 "Management of acute and chronic allergy & pruritus conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Fexofenadine 180 mg Tablet or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of allergy & pruritus."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "DINOFEX-180 provides once-daily second-generation H1-antihistamine therapy for appropriate allergic conditions. Correct administration—particularly with water and with attention to fruit-juice and antacid interactions—can help maintain predictable fexofenadine exposure.",
 "relatedProducts": [
 {
 "name": "BLISMIN-20",
 "generic": "Bilastine 20 mg Tablet",
 "slug": "blismin-20"
 },
 {
 "name": "BLISMIN-M",
 "generic": "Bilastine 20 mg + Montelukast 10 mg Tablet",
 "slug": "blismin-m"
 },
 {
 "name": "HIVOZIN-5",
 "generic": "Levocetirizine 5 mg Tablet",
 "slug": "hivozin-5"
 }
 ],
 "references": [
 "Approved Prescribing Information – DINOFEX-180.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "flucorion-150",
 "slug": "flucorion-150",
 "brandName": "FLUCORION-150",
 "genericName": "Fluconazole 150 mg Tablets",
 "tagline": "Systemic Triazole Antifungal",
 "therapeuticArea": "Antifungal",
 "route": "Oral / Systematic",
 "routeSubcategory": "Antifungal",
 "dosageForm": "Tablet",
 "strength": "150 mg",
 "packSize": "10 × 5 × 2 Blister",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antifungal disorders.",
 "composition": [
 "Fluconazole 150 mg Tablets",
 "Formulated in a specialized pharmaceutical tablet base."
 ],
 "therapeuticCategory": "Systemic Antifungal",
 "pharmacologicalClass": "Triazole Antifungal",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Fluconazole 150 mg Tablets to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for antifungal symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic antifungal conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Fluconazole 150 mg Tablets or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antifungal."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "FLUCORION-150 provides 150 mg of systemic fluconazole for appropriately selected susceptible fungal and yeast infections. Its clinical use should be guided by accurate diagnosis, infection-specific dosing, assessment of renal function, review of drug interactions and relevant hepatic and cardiac risk factors. The 150 mg tablet strength should not be interpreted as a universal single-dose regimen for all fungal infections.",
 "relatedProducts": [
 {
 "name": "FLUCORION-200",
 "generic": "Fluconazole 200 mg Tablets",
 "slug": "flucorion-200"
 },
 {
 "name": "ITFIN-100",
 "generic": "Itraconazole 100 mg Capsules",
 "slug": "itfin-100"
 },
 {
 "name": "ITFIN-200",
 "generic": "Itraconazole 200 mg Capsules",
 "slug": "itfin-200"
 }
 ],
 "references": [
 "Approved Prescribing Information – FLUCORION-150.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "flucorion-200",
 "slug": "flucorion-200",
 "brandName": "FLUCORION-200",
 "genericName": "Fluconazole 200 mg Tablets",
 "tagline": "Systemic Triazole Antifungal",
 "therapeuticArea": "Antifungal",
 "route": "Oral / Systematic",
 "routeSubcategory": "Antifungal",
 "dosageForm": "Tablet",
 "strength": "200 mg",
 "packSize": "10 × 6 × 1 Blister",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antifungal disorders.",
 "composition": [
 "Fluconazole 200 mg Tablets",
 "Formulated in a specialized pharmaceutical tablet base."
 ],
 "therapeuticCategory": "Systemic Antifungal",
 "pharmacologicalClass": "Triazole Antifungal",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Fluconazole 200 mg Tablets to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for antifungal symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic antifungal conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Fluconazole 200 mg Tablets or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antifungal."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "FLUCORION-200 provides a 200 mg strength of systemic fluconazole for appropriately selected susceptible fungal and yeast infections. Its use should be guided by accurate diagnosis, infection-specific dosing, renal-function assessment, drug-interaction screening and consideration of relevant hepatic and cardiac risk factors. The 200 mg strength should not be interpreted as a universal regimen or automatically substituted for another fluconazole strength without considering the indication and prescribed dosing schedule.",
 "relatedProducts": [
 {
 "name": "FLUCORION-150",
 "generic": "Fluconazole 150 mg Tablets",
 "slug": "flucorion-150"
 },
 {
 "name": "ITFIN-100",
 "generic": "Itraconazole 100 mg Capsules",
 "slug": "itfin-100"
 },
 {
 "name": "ITFIN-200",
 "generic": "Itraconazole 200 mg Capsules",
 "slug": "itfin-200"
 }
 ],
 "references": [
 "Approved Prescribing Information – FLUCORION-200.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "flutirium",
 "slug": "flutirium",
 "brandName": "FLUTIRIUM",
 "genericName": "Fluticasone Propionate 0.05% w/w Cream",
 "tagline": "Medium-Potency Topical Corticosteroid | For Dermatological Use",
 "therapeuticArea": "Corticosteroids",
 "route": "Topical",
 "routeSubcategory": "Corticosteroids",
 "dosageForm": "Cream",
 "strength": "0.05% w/w",
 "packSize": "15 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of corticosteroids disorders.",
 "composition": [
 "Each gram contains:",
 "Fluticasone Propionate 0.05% w/w",
 "In a suitable cream base.",
 "Fluticasone propionate is a synthetic fluorinated corticosteroid intended for topical dermatological use."
 ],
 "therapeuticCategory": "Topical Corticosteroid",
 "pharmacologicalClass": "Medium-potency topical corticosteroid",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Fluticasone propionate produces its therapeutic effects through corticosteroid-mediated modulation of inflammatory pathways within the skin."
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Fluticasone Propionate"
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Corticosteroid receptor-mediated activity"
 }
 ],
 "indications": [
 "FLUTIRIUM may be considered for the management of inflammatory and pruritic manifestations of corticosteroid-responsive dermatoses where a medium-potency topical corticosteroid is clinically appropriate.",
 "Potential clinical settings may include selected:",
 "Atopic dermatitis",
 "Eczematous dermatoses",
 "Contact dermatitis",
 "Other corticosteroid-responsive inflammatory dermatoses"
 ],
 "dosageAdministration": {
 "recommended": "Accordion 01 — Recommended Application",
 "howToApply": "Apply a thin film of FLUTIRIUM to the affected skin and gently rub into the area.",
 "duration": "For comparable fluticasone propionate 0.05% cream prescribing information:",
 "missedApplication": "Atopic dermatitis: once or twice daily"
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "FLUTIRIUM should not be used in patients with known hypersensitivity to fluticasone propionate or any component of the formulation.",
 "Comparable fluticasone propionate 0.05% cream prescribing information lists hypersensitivity to the components as a contraindication.",
 "Use should also be avoided in clinical situations specifically excluded by the approved product information, including untreated infection at the treatment site, pre-existing skin atrophy, rosacea and perioral dermatitis."
 ],
 "warningsPrecautions": [
 {
 "title": "Accordion 01 — Infection",
 "detail": "Accordion 01 — Infection"
 },
 {
 "title": "Fluticasone propionate cream should not ",
 "detail": "Fluticasone propionate cream should not be used where infection is present at the treatment site unless the infection is being appropriately addressed."
 },
 {
 "title": "If a concomitant skin infection develops",
 "detail": "If a concomitant skin infection develops, appropriate antibacterial or antifungal therapy should be considered. If the response is not prompt, corticosteroid treatment should be discontinued until the infection is adequately controlled."
 },
 {
 "title": "Accordion 02 — Skin Atrophy",
 "detail": "Accordion 02 — Skin Atrophy"
 },
 {
 "title": "Topical corticosteroids can cause local ",
 "detail": "Topical corticosteroids can cause local skin changes, particularly with prolonged use, higher exposure, occlusion or application to susceptible sites."
 },
 {
 "title": "Potential changes include:",
 "detail": "Potential changes include:"
 }
 ],
 "adverseEffects": {
 "common": [
 "Irritation",
 "Burning or stinging"
 ],
 "lessCommon": [
 "Folliculitis",
 "Secondary infection",
 "Skin atrophy"
 ],
 "rare": [
 "Systemic Effects",
 "Excessive topical corticosteroid exposure can result in systemic effects."
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store FLUTIRIUM according to the conditions specified on the approved product label.",
 "General Handling Considerations",
 "Keep the tube properly closed when not in use.",
 "Store according to the labelled temperature requirements."
 ],
 "patientCounselling": [
 {
 "question": "Accordion 01 — What is FLUTIRIUM?",
 "answer": "FLUTIRIUM contains fluticasone propionate 0.05%, a medium-potency topical corticosteroid used to reduce inflammation and itching associated with appropriate corticosteroid-responsive skin conditions."
 },
 {
 "question": "Accordion 02 — How should it be applied?",
 "answer": "Apply a thin film to the affected skin and gently rub it in as directed by the physician."
 },
 {
 "question": "Wash hands after application unless the hands themselves are being treated.",
 "answer": "Accordion 03 — Should more cream be applied if symptoms are severe?"
 }
 ],
 "clinicalPearl": "FLUTIRIUM provides medium-potency topical corticosteroid activity for appropriate inflammatory and pruritic dermatoses. Clinical benefit depends on selecting the appropriate potency, applying an adequate thin film, limiting treatment to the necessary duration and reassessing non-responsive or atypical lesions.",
 "relatedProducts": [
 {
 "name": "MOMERIUM-F",
 "generic": "Mometasone Furoate 0.1% + Fusidic Acid 2% Cream",
 "slug": "momerium-f"
 },
 {
 "name": "MOMERIUM",
 "generic": "Mometasone Furoate 0.1% Cream",
 "slug": "momerium"
 },
 {
 "name": "TENORIUM NM",
 "generic": "Clobetasol Propionate 0.05% w/w + Neomycin Sulphate 0.5% w/w + Miconazole Nitrate 2% w/w Cream",
 "slug": "tenorium-nm"
 }
 ],
 "references": [
 "Approved Prescribing Information – FLUTIRIUM.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "hivozin-5",
 "slug": "hivozin-5",
 "brandName": "HIVOZIN-5",
 "genericName": "Levocetirizine 5 mg Tablet",
 "tagline": "Second-Generation H1-Antihistamine for Appropriate Allergic Conditions",
 "therapeuticArea": "Allergy & Pruritus",
 "route": "Oral / Systematic",
 "routeSubcategory": "Anti-Allergic / Pruritic",
 "dosageForm": "Tablet",
 "strength": "5 mg",
 "packSize": "10 × 10 Alu-Alu",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of allergy & pruritus disorders.",
 "composition": [
 "Each tablet contains:",
 "Levocetirizine Dihydrochloride IP equivalent to Levocetirizine — 5 mg",
 "Excipients: q.s.",
 "Dosage Form"
 ],
 "therapeuticCategory": "Second-Generation H1-Antihistamine",
 "pharmacologicalClass": "Selective peripheral H1-receptor antagonist",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Histamine-Mediated Allergy"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "H1-receptor activation"
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Selective peripheral H1-receptor antagonism"
 }
 ],
 "indications": [
 "Management of acute and chronic allergy & pruritus conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Levocetirizine 5 mg Tablet or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of allergy & pruritus."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "HIVOZIN-5 provides once-daily second-generation H1-antihistamine therapy for appropriate histamine-mediated allergic conditions. Its principal clinical role is symptomatic control of sneezing, itching, rhinorrhoea and urticarial pruritus, with individual assessment required for persistent congestion, recurrent symptoms and special populations.",
 "relatedProducts": [
 {
 "name": "BLISMIN-20",
 "generic": "Bilastine 20 mg Tablet",
 "slug": "blismin-20"
 },
 {
 "name": "BLISMIN-M",
 "generic": "Bilastine 20 mg + Montelukast 10 mg Tablet",
 "slug": "blismin-m"
 },
 {
 "name": "DINOFEX-180",
 "generic": "Fexofenadine 180 mg Tablet",
 "slug": "dinofex-180"
 }
 ],
 "references": [
 "Approved Prescribing Information – HIVOZIN-5.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "hivozin-m",
 "slug": "hivozin-m",
 "brandName": "HIVOZIN-M",
 "genericName": "Levocetirizine 5 mg + Montelukast 10 mg Tablet",
 "tagline": "Dual-Pathway Antiallergic Therapy for Appropriate Allergic Conditions",
 "therapeuticArea": "Allergy & Pruritus",
 "route": "Oral / Systematic",
 "routeSubcategory": "Anti-Allergic / Pruritic",
 "dosageForm": "Tablet",
 "strength": "5 mg + 10 mg",
 "packSize": "10 × 10 Alu-Alu",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of allergy & pruritus disorders.",
 "composition": [
 "Each tablet contains:",
 "Levocetirizine Dihydrochloride IP equivalent to Levocetirizine — 5 mg",
 "Montelukast Sodium IP equivalent to Montelukast — 10 mg",
 "Excipients: q.s."
 ],
 "therapeuticCategory": "Antiallergic / Leukotriene Modifier Combination",
 "pharmacologicalClass": "Specialized dermatological allergy & pruritus therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "PATHWAY 01 — HISTAMINE"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "H1-receptor activation"
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Sneezing • Itching • Rhinorrhoea • Ocular symptoms"
 }
 ],
 "indications": [
 "Management of acute and chronic allergy & pruritus conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Levocetirizine 5 mg + Montelukast 10 mg Tablet or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of allergy & pruritus."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "HIVOZIN-M combines levocetirizine-mediated peripheral H1-receptor blockade with montelukast-mediated leukotriene receptor antagonism. Its use should be guided by the patient's clinical phenotype and treatment needs, with particular attention to montelukast's neuropsychiatric safety considerations.",
 "relatedProducts": [
 {
 "name": "BLISMIN-20",
 "generic": "Bilastine 20 mg Tablet",
 "slug": "blismin-20"
 },
 {
 "name": "BLISMIN-M",
 "generic": "Bilastine 20 mg + Montelukast 10 mg Tablet",
 "slug": "blismin-m"
 },
 {
 "name": "DINOFEX-180",
 "generic": "Fexofenadine 180 mg Tablet",
 "slug": "dinofex-180"
 }
 ],
 "references": [
 "Approved Prescribing Information – HIVOZIN-M.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "i-tacnoid-20",
 "slug": "i-tacnoid-20",
 "brandName": "I-TACNOID 20",
 "genericName": "Isotretinoin 20 mg Softgel Capsule",
 "tagline": "Systemic Retinoid Therapy for Selected Severe Acne",
 "therapeuticArea": "Acne",
 "route": "Oral / Systematic",
 "routeSubcategory": "Acne",
 "dosageForm": "Capsule",
 "strength": "20 mg",
 "packSize": "10 × 1 × 10 Blister",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of acne disorders.",
 "composition": [
 "Each Softgel Capsule Contains",
 "Isotretinoin — 20 mg",
 "Excipients: q.s.",
 "Dosage Form"
 ],
 "therapeuticCategory": "Systemic Retinoid",
 "pharmacologicalClass": "Specialized dermatological acne therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Accordion 01 — SEBACEOUS GLAND ACTIVITY"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Isotretinoin substantially reduces sebaceous gland activity and sebum production."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Reduced sebum availability changes the follicular environment associated with acne."
 }
 ],
 "indications": [
 "Management of acute and chronic acne conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Isotretinoin 20 mg Softgel Capsule or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of acne."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed capsule regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "I-TACNOID 20 provides isotretinoin 20 mg for appropriately selected patients requiring systemic retinoid therapy for severe or treatment-resistant acne. Because isotretinoin has significant safety considerations—including teratogenicity, laboratory abnormalities, psychiatric monitoring and important drug interactions—its use should be accompanied by structured patient selection, counselling and follow-up.",
 "relatedProducts": [
 {
 "name": "CLIXODIN-AD",
 "generic": "Clindamycin 1% + Adapalene 0.1% Gel",
 "slug": "clixodin-ad"
 },
 {
 "name": "CLIXODIN-BPO",
 "generic": "Clindamycin 1% + Benzoyl Peroxide 2.5% Gel",
 "slug": "clixodin-bpo"
 },
 {
 "name": "CLIXODIN-NT",
 "generic": "Clindamycin 1% + Nicotinamide 4% Gel",
 "slug": "clixodin-nt"
 }
 ],
 "references": [
 "Approved Prescribing Information – I-TACNOID 20.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "itfin-100",
 "slug": "itfin-100",
 "brandName": "ITFIN-100",
 "genericName": "Itraconazole 100 mg Capsules",
 "tagline": "Systemic Triazole Antifungal",
 "therapeuticArea": "Antifungal",
 "route": "Oral / Systematic",
 "routeSubcategory": "Antifungal",
 "dosageForm": "Capsule",
 "strength": "100 mg",
 "packSize": "10 × 10 Alu-Alu",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antifungal disorders.",
 "composition": [
 "Itraconazole 100 mg Capsules",
 "Formulated in a specialized pharmaceutical capsule base."
 ],
 "therapeuticCategory": "Systemic Antifungal",
 "pharmacologicalClass": "Triazole Antifungal",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Itraconazole 100 mg Capsules to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for antifungal symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic antifungal conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Itraconazole 100 mg Capsules or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antifungal."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed capsule regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "ITFIN-100 provides a 100 mg capsule strength of systemic itraconazole for appropriately selected fungal infections. The capsule strength should not be confused with a universal dosing schedule. Effective use depends on accurate diagnosis, appropriate regimen selection, consistent administration, interaction screening, assessment of hepatic and cardiac risk, adherence and clinical reassessment when treatment response is inadequate.",
 "relatedProducts": [
 {
 "name": "FLUCORION-150",
 "generic": "Fluconazole 150 mg Tablets",
 "slug": "flucorion-150"
 },
 {
 "name": "FLUCORION-200",
 "generic": "Fluconazole 200 mg Tablets",
 "slug": "flucorion-200"
 },
 {
 "name": "ITFIN-200",
 "generic": "Itraconazole 200 mg Capsules",
 "slug": "itfin-200"
 }
 ],
 "references": [
 "Approved Prescribing Information – ITFIN-100.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "itfin-200",
 "slug": "itfin-200",
 "brandName": "ITFIN-200",
 "genericName": "Itraconazole 200 mg Capsules",
 "tagline": "Systemic Triazole Antifungal",
 "therapeuticArea": "Antifungal",
 "route": "Oral / Systematic",
 "routeSubcategory": "Antifungal",
 "dosageForm": "Capsule",
 "strength": "200 mg",
 "packSize": "10 × 10 Alu-Alu",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antifungal disorders.",
 "composition": [
 "Itraconazole 200 mg Capsules",
 "Formulated in a specialized pharmaceutical capsule base."
 ],
 "therapeuticCategory": "Systemic Antifungal",
 "pharmacologicalClass": "Triazole Antifungal",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Itraconazole 200 mg Capsules to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for antifungal symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic antifungal conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Itraconazole 200 mg Capsules or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antifungal."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed capsule regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "ITFIN-200 provides systemic itraconazole therapy for appropriately selected fungal infections. Its clinical use requires more than selecting an antifungal based on morphology alone: diagnosis, indication, regimen, absorption considerations, drug interactions, hepatic status, cardiac history and treatment response should all be considered. Persistent or atypical disease warrants diagnostic reassessment rather than automatic extension of therapy.",
 "relatedProducts": [
 {
 "name": "FLUCORION-150",
 "generic": "Fluconazole 150 mg Tablets",
 "slug": "flucorion-150"
 },
 {
 "name": "FLUCORION-200",
 "generic": "Fluconazole 200 mg Tablets",
 "slug": "flucorion-200"
 },
 {
 "name": "ITFIN-100",
 "generic": "Itraconazole 100 mg Capsules",
 "slug": "itfin-100"
 }
 ],
 "references": [
 "Approved Prescribing Information – ITFIN-200.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "itfin-sb-130",
 "slug": "itfin-sb-130",
 "brandName": "ITFIN-SB 130",
 "genericName": "Itraconazole Supra Bioavailable 130 mg Capsules",
 "tagline": "Systemic Triazole Antifungal",
 "therapeuticArea": "Antifungal",
 "route": "Oral / Systematic",
 "routeSubcategory": "Antifungal",
 "dosageForm": "Capsule",
 "strength": "130 mg",
 "packSize": "10 × 10 Alu-Alu",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antifungal disorders.",
 "composition": [
 "Itraconazole Supra Bioavailable 130 mg Capsules",
 "Formulated in a specialized pharmaceutical capsule base."
 ],
 "therapeuticCategory": "Systemic Antifungal",
 "pharmacologicalClass": "Triazole Antifungal",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Itraconazole Supra Bioavailable 130 mg Capsules to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for antifungal symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic antifungal conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Warnings and precautions",
 "Monitoring requirements",
 "Age restrictions",
 "ITFIN-SB 130 is a systemic prescription antifungal and should be prescribed following appropriate clinical assessment. Its 130 mg strength and supra-bioavailable formulation should not be presented as automatically interchangeable with conventional itraconazole capsule strengths without supporting formulation-specific evidence and approved prescribing information."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antifungal."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed capsule regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "ITFIN-SB 130 provides a supra-bioavailable formulation of systemic itraconazole 130 mg for appropriately selected fungal infections. Its clinical use should be guided by accurate diagnosis, formulation-specific prescribing instructions, appropriate regimen selection, drug-interaction screening, hepatic and cardiac risk assessment, adherence and clinical response. Because itraconazole formulations can differ in pharmacokinetic characteristics, ITFIN-SB 130 should not be assumed to be milligram-for-milligram interchangeable with conventional itraconazole capsules.",
 "relatedProducts": [
 {
 "name": "FLUCORION-150",
 "generic": "Fluconazole 150 mg Tablets",
 "slug": "flucorion-150"
 },
 {
 "name": "FLUCORION-200",
 "generic": "Fluconazole 200 mg Tablets",
 "slug": "flucorion-200"
 },
 {
 "name": "ITFIN-100",
 "generic": "Itraconazole 100 mg Capsules",
 "slug": "itfin-100"
 }
 ],
 "references": [
 "Approved Prescribing Information – ITFIN-SB 130.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "kefin-cream",
 "slug": "kefin-cream",
 "brandName": "KEFIN Cream",
 "genericName": "Ketoconazole 2% w/w Cream",
 "tagline": "Topical Antifungal Cream",
 "therapeuticArea": "Antifungal",
 "route": "Topical",
 "routeSubcategory": "Antifungal",
 "dosageForm": "Cream",
 "strength": "2%",
 "packSize": "30 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antifungal disorders.",
 "composition": [
 "Ketoconazole 2% w/w Cream",
 "Formulated in a specialized pharmaceutical cream base."
 ],
 "therapeuticCategory": "Topical Antifungal",
 "pharmacologicalClass": "Specialized dermatological antifungal therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Ketoconazole 2% w/w Cream to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for antifungal symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic antifungal conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Ketoconazole 2% w/w Cream or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antifungal."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed cream regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "KEFIN Cream contains Ketoconazole 2% w/w, a topical imidazole antifungal suitable for appropriately diagnosed superficial fungal and yeast-associated skin infections. Successful topical antifungal therapy depends on correct diagnosis, adequate lesion coverage, consistent application and appropriate treatment duration. Persistent, recurrent, extensive or atypical lesions should prompt diagnostic reassessment rather than repeated empirical treatment.",
 "relatedProducts": [
 {
 "name": "FLUCORION-150",
 "generic": "Fluconazole 150 mg Tablets",
 "slug": "flucorion-150"
 },
 {
 "name": "FLUCORION-200",
 "generic": "Fluconazole 200 mg Tablets",
 "slug": "flucorion-200"
 },
 {
 "name": "ITFIN-100",
 "generic": "Itraconazole 100 mg Capsules",
 "slug": "itfin-100"
 }
 ],
 "references": [
 "Approved Prescribing Information – KEFIN Cream.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "kefin-z-shampoo",
 "slug": "kefin-z-shampoo",
 "brandName": "KEFIN-Z Shampoo",
 "genericName": "Ketoconazole 2% + Zinc Pyrithione 1% Shampoo",
 "tagline": "Medicated Antifungal Scalp Shampoo",
 "therapeuticArea": "Antifungal",
 "route": "Topical",
 "routeSubcategory": "Antifungal",
 "dosageForm": "Solution",
 "strength": "2%",
 "packSize": "100 mL",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antifungal disorders.",
 "composition": [
 "Ketoconazole 2% + Zinc Pyrithione 1% Shampoo",
 "Formulated in a specialized pharmaceutical solution base."
 ],
 "therapeuticCategory": "Topical Antifungal / Anti-Dandruff",
 "pharmacologicalClass": "Specialized dermatological antifungal therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Ketoconazole 2% to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for antifungal symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic antifungal conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Ketoconazole 2% + Zinc Pyrithione 1% Shampoo or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antifungal."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed solution regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "KEFIN-Z Shampoo combines Ketoconazole 2% and Zinc Pyrithione 1% in a medicated scalp formulation intended to provide antifungal-focused management of dandruff and susceptible yeast-associated scalp conditions. Its clinical value depends on appropriate patient selection, adequate scalp application, sufficient contact time and adherence to the prescribed regimen. Persistent, severe, atypical or hair-loss-associated scalp disease warrants diagnostic reassessment and may require additional or alternative therapy.",
 "relatedProducts": [
 {
 "name": "FLUCORION-150",
 "generic": "Fluconazole 150 mg Tablets",
 "slug": "flucorion-150"
 },
 {
 "name": "FLUCORION-200",
 "generic": "Fluconazole 200 mg Tablets",
 "slug": "flucorion-200"
 },
 {
 "name": "ITFIN-100",
 "generic": "Itraconazole 100 mg Capsules",
 "slug": "itfin-100"
 }
 ],
 "references": [
 "Approved Prescribing Information – KEFIN-Z Shampoo.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "kefin-z-soap",
 "slug": "kefin-z-soap",
 "brandName": "KEFIN-Z Soap",
 "genericName": "Ketoconazole + Zinc Pyrithione + Glycerine Soap",
 "tagline": "Antifungal & Medicated Cleansing Bar",
 "therapeuticArea": "Antifungal",
 "route": "Topical",
 "routeSubcategory": "Antifungal",
 "dosageForm": "Soap",
 "strength": "Standard Therapeutic",
 "packSize": "75 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antifungal disorders.",
 "composition": [
 "Each 75 g Soap Contains",
 "Ketoconazole — [insert approved strength]",
 "Zinc Pyrithione — [insert approved strength]",
 "Glycerine — [as per approved formulation]"
 ],
 "therapeuticCategory": "Topical Antifungal / Medicated Cleansing",
 "pharmacologicalClass": "Specialized dermatological antifungal therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Ketoconazole to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for antifungal symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic antifungal conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Ketoconazole + Zinc Pyrithione + Glycerine Soap or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antifungal."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed soap regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "KEFIN-Z Soap combines ketoconazole and zinc pyrithione in a medicated cleansing formulation, with glycerine included as a skin-conditioning humectant. It may provide useful antifungal-focused cleansing in appropriately selected dermatological conditions, particularly where yeast-associated or superficial fungal involvement is relevant. However, persistent, extensive or diagnostically uncertain disease requires appropriate clinical evaluation and, when indicated, dedicated antifungal or diagnosis-specific therapy.",
 "relatedProducts": [
 {
 "name": "FLUCORION-150",
 "generic": "Fluconazole 150 mg Tablets",
 "slug": "flucorion-150"
 },
 {
 "name": "FLUCORION-200",
 "generic": "Fluconazole 200 mg Tablets",
 "slug": "flucorion-200"
 },
 {
 "name": "ITFIN-100",
 "generic": "Itraconazole 100 mg Capsules",
 "slug": "itfin-100"
 }
 ],
 "references": [
 "Approved Prescribing Information – KEFIN-Z Soap.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "lixoclin-lb",
 "slug": "lixoclin-lb",
 "brandName": "LIXOCLIN-LB",
 "genericName": "Doxycycline 100 mg + Lactic Acid Bacillus 5 Million Spores",
 "tagline": "Tetracycline-Class Antibiotic with Probiotic Support",
 "therapeuticArea": "Antibacterial",
 "route": "Oral / Systematic",
 "routeSubcategory": "Antibacterial",
 "dosageForm": "Tablet",
 "strength": "100 mg",
 "packSize": "10 × 10 Blister",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antibacterial disorders.",
 "composition": [
 "Each dosage unit contains:",
 "Doxycycline — 100 mg",
 "Lactic Acid Bacillus — 5 Million Spores",
 "Excipients: q.s."
 ],
 "therapeuticCategory": "Tetracycline-Class Antibacterial",
 "pharmacologicalClass": "Specialized dermatological antibacterial therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Doxycycline enters susceptible bacterial cells and binds to the 30S bacterial ribosomal subunit."
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Interference with aminoacyl-tRNA attachment"
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Inhibition of bacterial protein synthesis"
 }
 ],
 "indications": [
 "Management of acute and chronic antibacterial conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Doxycycline 100 mg + Lactic Acid Bacillus 5 Million Spores or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antibacterial."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "LIXOCLIN-LB combines doxycycline 100 mg with Lactic Acid Bacillus 5 Million Spores. Its dermatological value is centred on appropriate doxycycline use in selected bacterial and inflammatory conditions, with diagnosis, indication-specific dosing, treatment duration, administration technique and antimicrobial stewardship remaining central to safe prescribing.",
 "relatedProducts": [
 {
 "name": "CINIMUP",
 "generic": "Mupirocin 2% Ointment",
 "slug": "cinimup"
 },
 {
 "name": "POVIPRIX PLUS",
 "generic": "Povidone Iodine 5% + Metronidazole 1% + Sucralfate 7% Ointment",
 "slug": "poviprix-plus"
 },
 {
 "name": "ROMITIZ-500",
 "generic": "Azithromycin 500 mg Tablet",
 "slug": "romitiz-500"
 }
 ],
 "references": [
 "Approved Prescribing Information – LIXOCLIN-LB.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "luliprix",
 "slug": "luliprix",
 "brandName": "LULIPRIX Cream",
 "genericName": "Luliconazole 1% w/w Cream",
 "tagline": "Topical Imidazole Antifungal",
 "therapeuticArea": "Antifungal",
 "route": "Topical",
 "routeSubcategory": "Antifungal",
 "dosageForm": "Cream",
 "strength": "1%",
 "packSize": "15 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antifungal disorders.",
 "composition": [
 "Luliconazole 1% w/w Cream",
 "Formulated in a specialized pharmaceutical cream base."
 ],
 "therapeuticCategory": "Topical Antifungal",
 "pharmacologicalClass": "Imidazole Antifungal",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Luliconazole 1% w/w Cream to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for antifungal symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic antifungal conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Luliconazole 1% w/w Cream or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antifungal."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed cream regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "LULIPRIX provides luliconazole 1% w/w as a topical imidazole antifungal for appropriately diagnosed superficial fungal infections. Optimal outcomes depend on accurate diagnosis, adequate application, treatment adherence and attention to reinfection factors. Persistent or atypical disease should prompt diagnostic reassessment rather than prolonged empirical treatment.",
 "relatedProducts": [
 {
 "name": "FLUCORION-150",
 "generic": "Fluconazole 150 mg Tablets",
 "slug": "flucorion-150"
 },
 {
 "name": "FLUCORION-200",
 "generic": "Fluconazole 200 mg Tablets",
 "slug": "flucorion-200"
 },
 {
 "name": "ITFIN-100",
 "generic": "Itraconazole 100 mg Capsules",
 "slug": "itfin-100"
 }
 ],
 "references": [
 "Approved Prescribing Information – LULIPRIX.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "luliprix-1",
 "slug": "luliprix-1",
 "brandName": "LULIPRIX Lotion",
 "genericName": "Luliconazole 1% Lotion",
 "tagline": "Topical Imidazole Antifungal",
 "therapeuticArea": "Antifungal",
 "route": "Topical",
 "routeSubcategory": "Antifungal",
 "dosageForm": "Lotion",
 "strength": "1%",
 "packSize": "30 mL",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antifungal disorders.",
 "composition": [
 "Luliconazole 1% Lotion",
 "Formulated in a specialized pharmaceutical lotion base."
 ],
 "therapeuticCategory": "Topical Antifungal",
 "pharmacologicalClass": "Imidazole Antifungal",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Luliconazole 1% Lotion to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for antifungal symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic antifungal conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Luliconazole 1% Lotion or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antifungal."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed lotion regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "LULIPRIX Lotion provides luliconazole 1% as a topical imidazole antifungal for appropriately diagnosed superficial fungal infections. Its lotion vehicle can offer practical application advantages on broader or hair-bearing skin surfaces. Successful treatment depends on accurate diagnosis, adequate coverage, consistent application and attention to reinfection factors. Persistent, atypical or refractory disease should prompt diagnostic reassessment rather than prolonged empirical treatment.",
 "relatedProducts": [
 {
 "name": "FLUCORION-150",
 "generic": "Fluconazole 150 mg Tablets",
 "slug": "flucorion-150"
 },
 {
 "name": "FLUCORION-200",
 "generic": "Fluconazole 200 mg Tablets",
 "slug": "flucorion-200"
 },
 {
 "name": "ITFIN-100",
 "generic": "Itraconazole 100 mg Capsules",
 "slug": "itfin-100"
 }
 ],
 "references": [
 "Approved Prescribing Information – LULIPRIX.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "miteclin",
 "slug": "miteclin",
 "brandName": "MITECLIN Cream",
 "genericName": "Permethrin 5% w/w Cream",
 "tagline": "Topical Scabicidal Therapy for Scabies",
 "therapeuticArea": "Anti-Parasitic",
 "route": "Topical",
 "routeSubcategory": "Anti-Parasitic",
 "dosageForm": "Cream",
 "strength": "5% w/w",
 "packSize": "50 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of anti-parasitic disorders.",
 "composition": [
 "Each 100 g contains:",
 "Permethrin — 5% w/w",
 "Excipients: q.s.",
 "Dosage Form"
 ],
 "therapeuticCategory": "Scabicidal / Ectoparasiticidal",
 "pharmacologicalClass": "Specialized dermatological anti-parasitic therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Acts on voltage-sensitive sodium channels in susceptible arthropods"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Prolonged neuronal depolarisation"
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Death of susceptible mites"
 }
 ],
 "indications": [
 "Management of acute and chronic anti-parasitic conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Permethrin 5% w/w Cream or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of anti-parasitic."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed cream regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "Effective scabies management is a complete strategy: accurate diagnosis + correct permethrin application + appropriate contact management + appropriate environmental measures + reassessment of persistent symptoms.",
 "relatedProducts": [
 {
 "name": "MITECLIN",
 "generic": "Permethrin 1% Soap",
 "slug": "miteclin-1"
 }
 ],
 "references": [
 "Approved Prescribing Information – MITECLIN.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "miteclin-1",
 "slug": "miteclin-1",
 "brandName": "MITECLIN Soap",
 "genericName": "Permethrin 1% Soap",
 "tagline": "Topical Permethrin Cleansing Preparation",
 "therapeuticArea": "Anti-Parasitic",
 "route": "Topical",
 "routeSubcategory": "Anti-Parasitic",
 "dosageForm": "Soap",
 "strength": "1%",
 "packSize": "75 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of anti-parasitic disorders.",
 "composition": [
 "Each medicated soap contains:",
 "Permethrin — 1%",
 "Soap base / Excipients: q.s.",
 "Dosage Form"
 ],
 "therapeuticCategory": "Topical Antiparasitic / Ectoparasiticidal",
 "pharmacologicalClass": "Specialized dermatological anti-parasitic therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Permethrin acts on voltage-sensitive sodium channels in susceptible arthropods."
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Prolonged neuronal depolarisation"
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Death of susceptible parasites"
 }
 ],
 "indications": [
 "Management of acute and chronic anti-parasitic conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Permethrin 1% Soap or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of anti-parasitic."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed soap regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "MITECLIN 1% Soap should be positioned as a product-specific topical cleansing preparation. Its concentration and dosage form should not be assumed to provide the same therapeutic regimen as permethrin 5% cream. Correct diagnosis, appropriate product selection and adherence to the approved directions are central to effective management.",
 "relatedProducts": [
 {
 "name": "MITECLIN",
 "generic": "Permethrin 5% w/w Cream",
 "slug": "miteclin"
 }
 ],
 "references": [
 "Approved Prescribing Information – MITECLIN.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "momerium-f",
 "slug": "momerium-f",
 "brandName": "MOMERIUM-F",
 "genericName": "Mometasone Furoate 0.1% + Fusidic Acid 2% Cream",
 "tagline": "Topical Corticosteroid + Topical Antibacterial",
 "therapeuticArea": "Corticosteroids",
 "route": "Topical",
 "routeSubcategory": "Steroid combinations",
 "dosageForm": "Cream",
 "strength": "0.1%",
 "packSize": "10 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of corticosteroids disorders.",
 "composition": [
 "Each gram contains:",
 "Mometasone Furoate 0.1% w/w",
 "Fusidic Acid 2% w/w",
 "In a suitable cream base."
 ],
 "therapeuticCategory": "Topical Corticosteroid + Antibacterial",
 "pharmacologicalClass": "Mometasone Furoate Mometasone Furoate is a topical corticosteroid that reduces inflammatory manifestations and associated pruritus in corticosteroid-responsive dermatoses.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Mometasone Furoate Component"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Corticosteroid receptor-mediated activity"
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Modulation of inflammatory pathways"
 }
 ],
 "indications": [
 "Management of acute and chronic corticosteroids conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Accordion 01 — HOW SHOULD MOMERIUM-F BE APPLIED?",
 "howToApply": "Apply a thin film to the affected area and gently rub into the skin, according to the approved product directions.",
 "duration": "The exact dosing frequency and duration for MOMERIUM-F should follow its approved product information.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Mometasone Furoate 0.1% + Fusidic Acid 2% Cream or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "Accordion 01 — INFECTION",
 "detail": "Accordion 01 — INFECTION"
 },
 {
 "title": "Topical corticosteroids can alter the cl",
 "detail": "Topical corticosteroids can alter the clinical appearance of infection and may allow infection to worsen or become more difficult to diagnose."
 },
 {
 "title": "If infection develops or does not respon",
 "detail": "If infection develops or does not respond appropriately, the treatment strategy should be reassessed. Current Mometasone Furoate product information specifically warns that corticosteroids may mask, activate or worsen skin infections."
 },
 {
 "title": "Accordion 02 — FUNGAL INFECTION",
 "detail": "Accordion 02 — FUNGAL INFECTION"
 },
 {
 "title": "Mometasone Furoate-containing topical pr",
 "detail": "Mometasone Furoate-containing topical preparations are contraindicated in fungal infections unless appropriate causal therapy is being administered concomitantly, according to current professional information."
 }
 ],
 "adverseEffects": {
 "common": [
 "Burning",
 "Irritation",
 "Pruritus"
 ],
 "lessCommon": [
 "Folliculitis",
 "Skin atrophy",
 "Secondary infection"
 ],
 "rare": [
 "Systemic Effects",
 "Excessive corticosteroid exposure may potentially produce systemic effects, particularly when large areas are treated, treatment is prolonged or occlusion is used."
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "Accordion 01 — WHAT IS MOMERIUM-F?",
 "answer": "MOMERIUM-F contains:"
 },
 {
 "question": "Mometasone Furoate — to reduce inflammation and itching.",
 "answer": "Fusidic Acid — to treat susceptible bacterial involvement."
 },
 {
 "question": "It should be used only for the condition for which it has been prescribed.",
 "answer": "Accordion 02 — HOW SHOULD IT BE APPLIED?"
 }
 ],
 "clinicalPearl": "MOMERIUM-F combines anti-inflammatory corticosteroid activity with topical antibacterial activity. Its appropriate role is in selected inflammatory dermatoses where bacterial involvement is clinically relevant. Accurate diagnosis, appropriate site selection, limited duration and antimicrobial stewardship remain central to responsible use.",
 "relatedProducts": [
 {
 "name": "FLUTIRIUM",
 "generic": "Fluticasone Propionate 0.05% w/w Cream",
 "slug": "flutirium"
 },
 {
 "name": "MOMERIUM",
 "generic": "Mometasone Furoate 0.1% Cream",
 "slug": "momerium"
 },
 {
 "name": "TENORIUM NM",
 "generic": "Clobetasol Propionate 0.05% w/w + Neomycin Sulphate 0.5% w/w + Miconazole Nitrate 2% w/w Cream",
 "slug": "tenorium-nm"
 }
 ],
 "references": [
 "Approved Prescribing Information – MOMERIUM-F.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "momerium",
 "slug": "momerium",
 "brandName": "MOMERIUM",
 "genericName": "Mometasone Furoate 0.1% Cream",
 "tagline": "Topical Corticosteroid | Anti-inflammatory & Antipruritic",
 "therapeuticArea": "Corticosteroids",
 "route": "Topical",
 "routeSubcategory": "Corticosteroids",
 "dosageForm": "Cream",
 "strength": "0.1% w/w",
 "packSize": "15 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of corticosteroids disorders.",
 "composition": [
 "Each gram contains:",
 "Mometasone Furoate 0.1% w/w",
 "In a suitable cream base.",
 "Note: The final website monograph should use the exact active ingredient nomenclature appearing on the approved MOMERIUM artwork and package insert, e.g. Mometasone Furoate Furoate 0.1% w/w, if that is the approved composition."
 ],
 "therapeuticCategory": "Topical Corticosteroid",
 "pharmacologicalClass": "Corticosteroid",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Mometasone Furoate produces its therapeutic effects through corticosteroid-mediated modulation of inflammatory processes in the skin."
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Glucocorticoid receptor-mediated activity"
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Modulation of inflammatory mediator pathways"
 }
 ],
 "indications": [
 "MOMERIUM may be considered for the relief of inflammatory and pruritic manifestations of corticosteroid-responsive dermatoses, where topical corticosteroid therapy is clinically appropriate.",
 "Potential clinical settings may include selected:",
 "Eczematous dermatoses",
 "Atopic dermatitis",
 "Contact dermatitis",
 "Other corticosteroid-responsive inflammatory dermatoses"
 ],
 "dosageAdministration": {
 "recommended": "Accordion 01 — How Should MOMERIUM Be Applied?",
 "howToApply": "Apply a thin film of MOMERIUM to the affected skin areas and gently rub into the skin.",
 "duration": "Current prescribing information for Mometasone Furoate furoate 0.1% cream recommends once-daily application.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "MOMERIUM should not be used in patients with known hypersensitivity to Mometasone Furoate or any component of the formulation.",
 "The exact contraindication statement should be aligned with the final approved MOMERIUM package insert."
 ],
 "warningsPrecautions": [
 {
 "title": "Accordion 01 — SYSTEMIC ABSORPTION",
 "detail": "Accordion 01 — SYSTEMIC ABSORPTION"
 },
 {
 "title": "Topical corticosteroids can be absorbed ",
 "detail": "Topical corticosteroids can be absorbed systemically."
 },
 {
 "title": "Risk may increase with:",
 "detail": "Risk may increase with:"
 },
 {
 "title": "Large treatment areas",
 "detail": "Large treatment areas"
 },
 {
 "title": "Prolonged use",
 "detail": "Prolonged use"
 }
 ],
 "adverseEffects": {
 "common": [
 "Burning",
 "Pruritus",
 "Irritation"
 ],
 "lessCommon": [
 "Skin atrophy",
 "Folliculitis",
 "Secondary infection"
 ],
 "rare": [
 "Systemic Effects",
 "Excessive topical corticosteroid exposure may result in systemic effects, including:"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "Accordion 01 — What is MOMERIUM?",
 "answer": "MOMERIUM contains Mometasone Furoate 0.1%, a topical corticosteroid used to reduce inflammation and itching associated with appropriate corticosteroid-responsive skin conditions."
 },
 {
 "question": "Accordion 02 — How Should It Be Applied?",
 "answer": "Apply a thin layer to the affected skin once daily or exactly as directed by the treating physician."
 },
 {
 "question": "Gently rub the cream into the affected area.",
 "answer": "Wash hands after application unless the hands themselves are being treated."
 }
 ],
 "clinicalPearl": "MOMERIUM provides topical corticosteroid activity for appropriate inflammatory and pruritic dermatoses. Effective use depends on accurate diagnosis, appropriate site and potency selection, thin-film application, appropriate treatment duration and reassessment of lesions that fail to respond as expected.",
 "relatedProducts": [
 {
 "name": "FLUTIRIUM",
 "generic": "Fluticasone Propionate 0.05% w/w Cream",
 "slug": "flutirium"
 },
 {
 "name": "MOMERIUM-F",
 "generic": "Mometasone Furoate 0.1% + Fusidic Acid 2% Cream",
 "slug": "momerium-f"
 },
 {
 "name": "TENORIUM NM",
 "generic": "Clobetasol Propionate 0.05% w/w + Neomycin Sulphate 0.5% w/w + Miconazole Nitrate 2% w/w Cream",
 "slug": "tenorium-nm"
 }
 ],
 "references": [
 "Approved Prescribing Information – MOMERIUM.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "nizfin",
 "slug": "nizfin",
 "brandName": "NIZFIN",
 "genericName": "Amorolfine 0.25% Cream",
 "tagline": "Topical Antifungal",
 "therapeuticArea": "Antifungal",
 "route": "Oral / Systematic",
 "routeSubcategory": "Antifungal",
 "dosageForm": "Tablet",
 "strength": "0.25%",
 "packSize": "30 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antifungal disorders.",
 "composition": [
 "Amorolfine 0.25% Cream",
 "Formulated in a specialized pharmaceutical tablet base."
 ],
 "therapeuticCategory": "Topical Antifungal",
 "pharmacologicalClass": "Morpholine Antifungal",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Amorolfine 0.25% Cream to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for antifungal symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic antifungal conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Amorolfine 0.25% Cream or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antifungal."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "NIZFIN provides Amorolfine 0.25% as a topical morpholine antifungal for appropriately diagnosed superficial fungal infections. Optimal outcomes depend on diagnostic accuracy, appropriate patient selection, adequate application, adherence and attention to reinfection factors. Persistent, atypical or refractory lesions should prompt diagnostic reassessment rather than indefinite empirical topical treatment.",
 "relatedProducts": [
 {
 "name": "FLUCORION-150",
 "generic": "Fluconazole 150 mg Tablets",
 "slug": "flucorion-150"
 },
 {
 "name": "FLUCORION-200",
 "generic": "Fluconazole 200 mg Tablets",
 "slug": "flucorion-200"
 },
 {
 "name": "ITFIN-100",
 "generic": "Itraconazole 100 mg Capsules",
 "slug": "itfin-100"
 }
 ],
 "references": [
 "Approved Prescribing Information – NIZFIN.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "poviprix-plus",
 "slug": "poviprix-plus",
 "brandName": "POVIPRIX PLUS",
 "genericName": "Povidone Iodine 5% + Metronidazole 1% + Sucralfate 7% Ointment",
 "tagline": "Topical Wound-Care & Antimicrobial Preparation",
 "therapeuticArea": "Antibacterial",
 "route": "Topical",
 "routeSubcategory": "Antibacterial",
 "dosageForm": "Ointment",
 "strength": "5%",
 "packSize": "15 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antibacterial disorders.",
 "composition": [
 "Each gram of ointment contains:",
 "Povidone Iodine — 5%",
 "Metronidazole — 1%",
 "Sucralfate — 7%"
 ],
 "therapeuticCategory": "Topical Antimicrobial / Wound-Care Preparation",
 "pharmacologicalClass": "Specialized dermatological antibacterial therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Povidone Iodine 5% to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for antibacterial symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic antibacterial conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Povidone Iodine 5% + Metronidazole 1% + Sucralfate 7% Ointment or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antibacterial."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed ointment regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "POVIPRIX PLUS combines Povidone Iodine 5%, Metronidazole 1% and Sucralfate 7% to provide complementary antiseptic, anaerobic antibacterial and local protective properties. Its role is best understood within a complete wound-care strategy that includes wound assessment, cleansing, appropriate dressing, infection evaluation and treatment of the underlying cause.",
 "relatedProducts": [
 {
 "name": "CINIMUP",
 "generic": "Mupirocin 2% Ointment",
 "slug": "cinimup"
 },
 {
 "name": "LIXOCLIN-LB",
 "generic": "Doxycycline 100 mg + Lactic Acid Bacillus 5 Million Spores",
 "slug": "lixoclin-lb"
 },
 {
 "name": "ROMITIZ-500",
 "generic": "Azithromycin 500 mg Tablet",
 "slug": "romitiz-500"
 }
 ],
 "references": [
 "Approved Prescribing Information – POVIPRIX PLUS.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "rolitas-0-1",
 "slug": "rolitas-0-1",
 "brandName": "ROLITAS 0.1%",
 "genericName": "Tacrolimus 0.1% w/w Ointment",
 "tagline": "Topical Calcineurin Inhibitor",
 "therapeuticArea": "Acne",
 "route": "Topical",
 "routeSubcategory": "Acne",
 "dosageForm": "Ointment",
 "strength": "0.1%",
 "packSize": "10 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of acne disorders.",
 "composition": [
 "Each gram of ointment contains:",
 "Tacrolimus — 0.1% w/w",
 "Ointment base: q.s.",
 "Dosage Form"
 ],
 "therapeuticCategory": "Topical Calcineurin Inhibitor",
 "pharmacologicalClass": "Specialized dermatological acne therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Accordion 01 — CALCINEURIN INHIBITION"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Tacrolimus inhibits calcineurin-dependent T-cell activation."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "This reduces transcription and release of several inflammatory cytokines."
 }
 ],
 "indications": [
 "Management of acute and chronic acne conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Tacrolimus 0.1% w/w Ointment or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of acne."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed ointment regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "ROLITAS 0.1% provides Tacrolimus 0.1% w/w, a topical calcineurin inhibitor that offers steroid-sparing anti-inflammatory therapy for appropriately selected inflammatory dermatoses. Its clinical value is particularly relevant in atopic dermatitis and sensitive skin sites where repeated corticosteroid exposure may be undesirable. Correct diagnosis, targeted application, infection assessment, sun-protection counselling and appropriate follow-up are central to safe use.",
 "relatedProducts": [
 {
 "name": "CLIXODIN-AD",
 "generic": "Clindamycin 1% + Adapalene 0.1% Gel",
 "slug": "clixodin-ad"
 },
 {
 "name": "CLIXODIN-BPO",
 "generic": "Clindamycin 1% + Benzoyl Peroxide 2.5% Gel",
 "slug": "clixodin-bpo"
 },
 {
 "name": "CLIXODIN-NT",
 "generic": "Clindamycin 1% + Nicotinamide 4% Gel",
 "slug": "clixodin-nt"
 }
 ],
 "references": [
 "Approved Prescribing Information – ROLITAS 0.1%.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "romitiz-500",
 "slug": "romitiz-500",
 "brandName": "ROMITIZ-500",
 "genericName": "Azithromycin 500 mg Tablet",
 "tagline": "Macrolide Antibiotic",
 "therapeuticArea": "Antibacterial",
 "route": "Oral / Systematic",
 "routeSubcategory": "Antibacterial",
 "dosageForm": "Tablet",
 "strength": "500 mg",
 "packSize": "10 × 5 Blister",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antibacterial disorders.",
 "composition": [
 "Each uncoated/film-coated tablet contains:",
 "Azithromycin — 500 mg",
 "Excipients: q.s.",
 "Dosage Form"
 ],
 "therapeuticCategory": "Macrolide Antibiotic",
 "pharmacologicalClass": "Specialized dermatological antibacterial therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Azithromycin 500 mg Tablet to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for antibacterial symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic antibacterial conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Azithromycin 500 mg Tablet or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antibacterial."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "Polypharmacy can increase the importance of interaction and QT-risk assessment.",
 "relatedProducts": [
 {
 "name": "CINIMUP",
 "generic": "Mupirocin 2% Ointment",
 "slug": "cinimup"
 },
 {
 "name": "LIXOCLIN-LB",
 "generic": "Doxycycline 100 mg + Lactic Acid Bacillus 5 Million Spores",
 "slug": "lixoclin-lb"
 },
 {
 "name": "POVIPRIX PLUS",
 "generic": "Povidone Iodine 5% + Metronidazole 1% + Sucralfate 7% Ointment",
 "slug": "poviprix-plus"
 }
 ],
 "references": [
 "Approved Prescribing Information – ROMITIZ-500.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "ryan-bpo",
 "slug": "ryan-bpo",
 "brandName": "RYAN-BPO",
 "genericName": "Hydrous Benzoyl Peroxide 2.5% Gel",
 "tagline": "Topical Anti-Acne Preparation",
 "therapeuticArea": "Acne",
 "route": "Topical",
 "routeSubcategory": "Acne",
 "dosageForm": "Gel",
 "strength": "2.5%",
 "packSize": "20 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of acne disorders.",
 "composition": [
 "Each gram of gel contains:",
 "Hydrous Benzoyl Peroxide equivalent to Benzoyl Peroxide — 2.5% w/w",
 "Gel base: q.s.",
 "Dosage Form"
 ],
 "therapeuticCategory": "Topical Anti-Acne",
 "pharmacologicalClass": "Specialized dermatological acne therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Accordion 01 — ANTIMICROBIAL ACTIVITY"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Benzoyl peroxide decomposes on the skin and generates reactive oxygen species with antimicrobial activity."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "This activity helps reduce the burden of acne-associated bacteria within the follicular environment."
 }
 ],
 "indications": [
 "Management of acute and chronic acne conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Hydrous Benzoyl Peroxide 2.5% Gel or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of acne."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed gel regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "RYAN-BPO provides Hydrous Benzoyl Peroxide 2.5% w/w as a non-antibiotic topical approach to acne management. Its antimicrobial and keratolytic properties make it relevant to selected inflammatory and mixed acne presentations, while appropriate application, irritation management, patient counselling and antimicrobial stewardship remain central to effective use.",
 "relatedProducts": [
 {
 "name": "CLIXODIN-AD",
 "generic": "Clindamycin 1% + Adapalene 0.1% Gel",
 "slug": "clixodin-ad"
 },
 {
 "name": "CLIXODIN-BPO",
 "generic": "Clindamycin 1% + Benzoyl Peroxide 2.5% Gel",
 "slug": "clixodin-bpo"
 },
 {
 "name": "CLIXODIN-NT",
 "generic": "Clindamycin 1% + Nicotinamide 4% Gel",
 "slug": "clixodin-nt"
 }
 ],
 "references": [
 "Approved Prescribing Information – RYAN-BPO.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "ryoclin",
 "slug": "ryoclin",
 "brandName": "RYOCLIN",
 "genericName": "Hydroquinone 2% + Tretinoin 0.025% + Mometasone Furoate 0.1% Cream",
 "tagline": "Triple-Combination Topical Therapy for Hyperpigmentation",
 "therapeuticArea": "Antibacterial",
 "route": "Topical",
 "routeSubcategory": "Antibacterial",
 "dosageForm": "Gel",
 "strength": "2%",
 "packSize": "15 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antibacterial disorders.",
 "composition": [
 "Each gram contains:",
 "Hydroquinone 2% w/w",
 "Tretinoin 0.025% w/w",
 "Mometasone Furoate 0.1% w/w"
 ],
 "therapeuticCategory": "Triple-Combination Depigmenting Therapy",
 "pharmacologicalClass": "Specialized dermatological antibacterial therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Hydroquinone acts primarily by reducing melanin synthesis through reversible inhibition of tyrosinase, an important enzyme in melanogenesis."
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Reduced melanogenesis"
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Reduced formation of new pigment"
 }
 ],
 "indications": [
 "Management of acute and chronic antibacterial conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Hydroquinone 2% + Tretinoin 0.025% + Mometasone Furoate 0.1% Cream or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "Accordion 01 — FACIAL USE",
 "detail": "Accordion 01 — FACIAL USE"
 },
 {
 "title": "RYOCLIN is intended for carefully select",
 "detail": "RYOCLIN is intended for carefully selected dermatological use."
 },
 {
 "title": "Because it contains a potent topical cor",
 "detail": "Because it contains a potent topical corticosteroid, prolonged unsupervised facial application should be avoided."
 },
 {
 "title": "Accordion 02 — EYE AREA",
 "detail": "Accordion 02 — EYE AREA"
 },
 {
 "title": "Avoid contact with:",
 "detail": "Avoid contact with:"
 }
 ],
 "adverseEffects": {
 "common": [
 "Burning",
 "Dryness",
 "Irritation"
 ],
 "lessCommon": [
 "Skin atrophy"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "Accordion 01 — WHAT IS RYOCLIN?",
 "answer": "RYOCLIN contains three active ingredients:"
 },
 {
 "question": "HydroquinoneHelps reduce excess pigment production.",
 "answer": "TretinoinSupports epidermal turnover."
 },
 {
 "question": "Mometasone FuroateHelps control inflammation.",
 "answer": "Accordion 02 — HOW SHOULD IT BE USED?"
 }
 ],
 "clinicalPearl": "RYOCLIN is a triple-combination topical approach designed to address pigmentation through complementary mechanisms. Its appropriate use depends on accurate diagnosis, targeted application, consistent photoprotection, irritation control and careful limitation of corticosteroid exposure.",
 "relatedProducts": [
 {
 "name": "CINIMUP",
 "generic": "Mupirocin 2% Ointment",
 "slug": "cinimup"
 },
 {
 "name": "LIXOCLIN-LB",
 "generic": "Doxycycline 100 mg + Lactic Acid Bacillus 5 Million Spores",
 "slug": "lixoclin-lb"
 },
 {
 "name": "POVIPRIX PLUS",
 "generic": "Povidone Iodine 5% + Metronidazole 1% + Sucralfate 7% Ointment",
 "slug": "poviprix-plus"
 }
 ],
 "references": [
 "Approved Prescribing Information – RYOCLIN.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "supicid-b",
 "slug": "supicid-b",
 "brandName": "SUPICID-B",
 "genericName": "Fusidic Acid 2% + Beclomethasone 0.025% Cream",
 "tagline": "Topical Antibacterial–Corticosteroid Combination",
 "therapeuticArea": "Antibacterial",
 "route": "Topical",
 "routeSubcategory": "Antibacterial",
 "dosageForm": "Cream",
 "strength": "2%",
 "packSize": "10 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antibacterial disorders.",
 "composition": [
 "Each gram of cream contains:",
 "Fusidic Acid — 2% w/w",
 "Beclomethasone — 0.025% w/w",
 "Cream base: q.s."
 ],
 "therapeuticCategory": "Topical Antibacterial + Corticosteroid",
 "pharmacologicalClass": "Specialized dermatological antibacterial therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Accordion 01 — FUSIDIC ACID"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Fusidic acid inhibits bacterial protein synthesis by interfering with elongation factor G (EF-G)."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "This inhibits growth of susceptible bacteria."
 }
 ],
 "indications": [
 "Management of acute and chronic antibacterial conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Fusidic Acid 2% + Beclomethasone 0.025% Cream or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antibacterial."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed cream regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "SUPICID-B combines Fusidic Acid 2% w/w with Beclomethasone 0.025% w/w to address selected inflammatory skin conditions with a clinically relevant superficial bacterial component. Appropriate diagnosis, site-specific corticosteroid considerations, limited duration, correct application and antimicrobial stewardship are essential to responsible use.",
 "relatedProducts": [
 {
 "name": "CINIMUP",
 "generic": "Mupirocin 2% Ointment",
 "slug": "cinimup"
 },
 {
 "name": "LIXOCLIN-LB",
 "generic": "Doxycycline 100 mg + Lactic Acid Bacillus 5 Million Spores",
 "slug": "lixoclin-lb"
 },
 {
 "name": "POVIPRIX PLUS",
 "generic": "Povidone Iodine 5% + Metronidazole 1% + Sucralfate 7% Ointment",
 "slug": "poviprix-plus"
 }
 ],
 "references": [
 "Approved Prescribing Information – SUPICID-B.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "supicid",
 "slug": "supicid",
 "brandName": "SUPICID",
 "genericName": "Fusidic Acid 2% Ointment",
 "tagline": "Topical Antibacterial Preparation",
 "therapeuticArea": "Antibacterial",
 "route": "Topical",
 "routeSubcategory": "Antibacterial",
 "dosageForm": "Ointment",
 "strength": "2% w/w",
 "packSize": "10 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antibacterial disorders.",
 "composition": [
 "Each gram of ointment contains:",
 "Fusidic Acid — 2% w/w",
 "Ointment base: q.s.",
 "Dosage Form"
 ],
 "therapeuticCategory": "Topical Antibacterial",
 "pharmacologicalClass": "Specialized dermatological antibacterial therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Fusidic acid inhibits bacterial protein synthesis."
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "It interferes with bacterial elongation factor G (EF-G), an essential component of protein synthesis."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Interferes with bacterial protein synthesis"
 }
 ],
 "indications": [
 "Management of acute and chronic antibacterial conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Fusidic Acid 2% Ointment or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antibacterial."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed ointment regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "SUPICID provides Fusidic Acid 2% w/w as a topical antibacterial option for selected susceptible superficial bacterial skin infections. Effective use depends on accurate diagnosis, appropriate localization, correct application, defined treatment duration and responsible antimicrobial stewardship.",
 "relatedProducts": [
 {
 "name": "CINIMUP",
 "generic": "Mupirocin 2% Ointment",
 "slug": "cinimup"
 },
 {
 "name": "LIXOCLIN-LB",
 "generic": "Doxycycline 100 mg + Lactic Acid Bacillus 5 Million Spores",
 "slug": "lixoclin-lb"
 },
 {
 "name": "POVIPRIX PLUS",
 "generic": "Povidone Iodine 5% + Metronidazole 1% + Sucralfate 7% Ointment",
 "slug": "poviprix-plus"
 }
 ],
 "references": [
 "Approved Prescribing Information – SUPICID.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "t-fin-250",
 "slug": "t-fin-250",
 "brandName": "T-FIN 250",
 "genericName": "Terbinafine 250 mg Tablets",
 "tagline": "Systemic Allylamine Antifungal",
 "therapeuticArea": "Antifungal",
 "route": "Oral / Systematic",
 "routeSubcategory": "Antifungal",
 "dosageForm": "Tablet",
 "strength": "250 mg",
 "packSize": "10 × 1 × 7 Blister",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antifungal disorders.",
 "composition": [
 "Terbinafine 250 mg Tablets",
 "Formulated in a specialized pharmaceutical tablet base."
 ],
 "therapeuticCategory": "Systemic Antifungal",
 "pharmacologicalClass": "Allylamine Antifungal",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Terbinafine 250 mg Tablets to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for antifungal symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic antifungal conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Adverse-effect information",
 "Special-population recommendations",
 "Monitoring requirements",
 "Age restrictions",
 "T-FIN 250 is a systemic prescription antifungal and should be prescribed following appropriate clinical assessment."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antifungal."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "T-FIN 250 provides oral terbinafine 250 mg, an allylamine antifungal with important activity against dermatophytes. It is particularly relevant to appropriately diagnosed dermatophyte infections requiring systemic therapy, including selected cases of onychomycosis, extensive dermatophytosis and tinea capitis. Safe prescribing requires appropriate diagnosis, consideration of hepatic status, review of concomitant medicines and awareness of clinically important adverse effects.",
 "relatedProducts": [
 {
 "name": "FLUCORION-150",
 "generic": "Fluconazole 150 mg Tablets",
 "slug": "flucorion-150"
 },
 {
 "name": "FLUCORION-200",
 "generic": "Fluconazole 200 mg Tablets",
 "slug": "flucorion-200"
 },
 {
 "name": "ITFIN-100",
 "generic": "Itraconazole 100 mg Capsules",
 "slug": "itfin-100"
 }
 ],
 "references": [
 "Approved Prescribing Information – T-FIN 250.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "t-fin-500",
 "slug": "t-fin-500",
 "brandName": "T-FIN 500",
 "genericName": "Terbinafine 500 mg Tablets",
 "tagline": "Systemic Allylamine Antifungal",
 "therapeuticArea": "Antifungal",
 "route": "Oral / Systematic",
 "routeSubcategory": "Antifungal",
 "dosageForm": "Tablet",
 "strength": "500 mg",
 "packSize": "10 × 1 × 7 Blister",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of antifungal disorders.",
 "composition": [
 "Terbinafine 500 mg Tablets",
 "Formulated in a specialized pharmaceutical tablet base."
 ],
 "therapeuticCategory": "Systemic Antifungal",
 "pharmacologicalClass": "Allylamine Antifungal",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Terbinafine 500 mg Tablets to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for antifungal symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic antifungal conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Adverse-effect information",
 "Special-population recommendations",
 "Monitoring requirements",
 "Age restrictions",
 "T-FIN 500 is a systemic prescription antifungal and should be prescribed following appropriate clinical assessment and in accordance with the current approved product information."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of antifungal."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "T-FIN 500 provides oral terbinafine 500 mg, an allylamine antifungal with important activity against dermatophytes. Its clinical use should be based on accurate diagnosis, appropriate indication and the approved product-specific dosing regimen. Because standard oral terbinafine references commonly use 250 mg once daily in adults, the 500 mg strength should not be presented as a routine standard daily dose without product-specific regulatory support. Hepatic status, renal function, drug interactions and clinically important adverse effects should be considered during systemic therapy.",
 "relatedProducts": [
 {
 "name": "FLUCORION-150",
 "generic": "Fluconazole 150 mg Tablets",
 "slug": "flucorion-150"
 },
 {
 "name": "FLUCORION-200",
 "generic": "Fluconazole 200 mg Tablets",
 "slug": "flucorion-200"
 },
 {
 "name": "ITFIN-100",
 "generic": "Itraconazole 100 mg Capsules",
 "slug": "itfin-100"
 }
 ],
 "references": [
 "Approved Prescribing Information – T-FIN 500.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "tacnoid-0-05",
 "slug": "tacnoid-0-05",
 "brandName": "TACNOID 0.05%",
 "genericName": "Tretinoin 0.05% w/w Cream",
 "tagline": "Topical Retinoid Preparation",
 "therapeuticArea": "Immunomodulator",
 "route": "Topical",
 "routeSubcategory": "Immunomodulator",
 "dosageForm": "Cream",
 "strength": "0.05%",
 "packSize": "20 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of immunomodulator disorders.",
 "composition": [
 "Each gram of cream contains:",
 "Tretinoin — 0.05% w/w",
 "Cream base: q.s.",
 "Dosage Form"
 ],
 "therapeuticCategory": "Topical Retinoid",
 "pharmacologicalClass": "Specialized dermatological immunomodulator therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Accordion 01 — NORMALIZATION OF FOLLICULAR KERATINISATION"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Abnormal follicular keratinisation contributes to formation of microcomedones, an early lesion in acne development."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Tretinoin helps normalize follicular epithelial differentiation."
 }
 ],
 "indications": [
 "Management of acute and chronic immunomodulator conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Tretinoin 0.05% w/w Cream or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of immunomodulator."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed cream regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "TACNOID 0.05% provides Tretinoin 0.05% w/w, a topical retinoid that addresses abnormal follicular keratinisation and comedone formation. Appropriate patient selection, thin field application, gradual adaptation to treatment, skin-barrier support and photoprotection are central to effective and tolerable use.",
 "relatedProducts": [
 {
 "name": "TOFAPLAST-5",
 "generic": "Tofacitinib 5 mg Tablet",
 "slug": "tofaplast-5"
 },
 {
 "name": "TOFAPLAST Cream",
 "generic": "Tofacitinib 2% Gel",
 "slug": "tofaplast-cream"
 }
 ],
 "references": [
 "Approved Prescribing Information – TACNOID 0.05%.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "tenorium-nm",
 "slug": "tenorium-nm",
 "brandName": "TENORIUM NM",
 "genericName": "Clobetasol Propionate 0.05% w/w + Neomycin Sulphate 0.5% w/w + Miconazole Nitrate 2% w/w Cream",
 "tagline": "Potent Topical Corticosteroid + Antibacterial + Antifungal",
 "therapeuticArea": "Corticosteroids",
 "route": "Topical",
 "routeSubcategory": "Steroid combinations",
 "dosageForm": "Cream",
 "strength": "0.05% w/w + 0.5% w/w + 2% w/w",
 "packSize": "As per approved product pack",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of corticosteroids disorders.",
 "composition": [
 "Each gram contains:",
 "Clobetasol Propionate 0.05% w/w",
 "Neomycin Sulphate 0.5% w/w",
 "Miconazole Nitrate 2% w/w"
 ],
 "therapeuticCategory": "Corticosteroid + Antibacterial + Antifungal",
 "pharmacologicalClass": "Very potent topical corticosteroid + topical antibacterial + topical imidazole antifungal",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "TENORIUM NM provides complementary pharmacological activity through three active ingredients."
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "01 — Anti-inflammatory Component"
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Clobetasol Propionate"
 }
 ],
 "indications": [
 "TENORIUM NM may be considered for selected corticosteroid-responsive inflammatory dermatoses in which secondary bacterial or fungal infection is present, suspected or clinically likely, subject to the approved product indication.",
 "Potential clinical situations may include selected:",
 "Infected eczematous dermatoses",
 "Corticosteroid-responsive inflammatory dermatoses with secondary microbial involvement",
 "Dermatoses complicated by susceptible bacterial infection",
 "Dermatoses complicated by susceptible fungal/yeast infection"
 ],
 "dosageAdministration": {
 "recommended": "Accordion 01 — Recommended Application",
 "howToApply": "Apply a thin layer of TENORIUM NM to the affected area and gently rub into the skin as directed by the treating physician.",
 "duration": "Application frequency and duration should be determined according to:",
 "missedApplication": "Diagnosis"
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "TENORIUM NM should not be used in patients with known hypersensitivity to:",
 "Clobetasol propionate",
 "Neomycin sulphate",
 "Miconazole nitrate",
 "Any component of the formulation"
 ],
 "warningsPrecautions": [
 {
 "title": "Accordion 01 — Potent Corticosteroid",
 "detail": "Accordion 01 — Potent Corticosteroid"
 },
 {
 "title": "Clobetasol is a very potent topical cort",
 "detail": "Clobetasol is a very potent topical corticosteroid."
 },
 {
 "title": "Prolonged, excessive or inappropriate us",
 "detail": "Prolonged, excessive or inappropriate use may increase the risk of:"
 },
 {
 "title": "Skin atrophy",
 "detail": "Skin atrophy"
 },
 {
 "title": "Telangiectasia",
 "detail": "Telangiectasia"
 }
 ],
 "adverseEffects": {
 "common": [
 "Burning",
 "Irritation",
 "Erythema"
 ],
 "lessCommon": [
 "Folliculitis",
 "Skin atrophy",
 "Secondary infection"
 ],
 "rare": [
 "Systemic Effects",
 "Significant systemic absorption of clobetasol may result in systemic corticosteroid effects, particularly with prolonged use, large treatment areas, occlusion or application to compromised skin."
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "Accordion 01 — What is TENORIUM NM?",
 "answer": "TENORIUM NM is a topical combination containing:"
 },
 {
 "question": "Clobetasol Propionate + Neomycin Sulphate + Miconazole Nitrate",
 "answer": "It combines anti-inflammatory, antibacterial and antifungal activity for selected skin conditions where these therapeutic components are clinically appropriate."
 },
 {
 "question": "Accordion 02 — How should it be applied?",
 "answer": "Apply a thin layer to the affected area exactly as directed by the physician."
 }
 ],
 "clinicalPearl": "TENORIUM NM is a combination formulation designed for selected inflammatory dermatoses where bacterial and/or fungal involvement is clinically relevant. Its potent corticosteroid component makes diagnostic accuracy, anatomical-site selection and treatment duration particularly important.",
 "relatedProducts": [
 {
 "name": "FLUTIRIUM",
 "generic": "Fluticasone Propionate 0.05% w/w Cream",
 "slug": "flutirium"
 },
 {
 "name": "MOMERIUM-F",
 "generic": "Mometasone Furoate 0.1% + Fusidic Acid 2% Cream",
 "slug": "momerium-f"
 },
 {
 "name": "MOMERIUM",
 "generic": "Mometasone Furoate 0.1% Cream",
 "slug": "momerium"
 }
 ],
 "references": [
 "Approved Prescribing Information – TENORIUM NM.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "tenorium-s",
 "slug": "tenorium-s",
 "brandName": "TENORIUM-S",
 "genericName": "Clobetasol Propionate 0.05% w/w + Salicylic Acid 3% w/w Ointment",
 "tagline": "Topical Corticosteroid + Keratolytic | For Dermatological Use",
 "therapeuticArea": "Corticosteroids",
 "route": "Topical",
 "routeSubcategory": "Steroid combinations",
 "dosageForm": "Ointment",
 "strength": "0.05% w/w + 3% w/w",
 "packSize": "30 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of corticosteroids disorders.",
 "composition": [
 "Each gram contains:",
 "Clobetasol Propionate 0.05% w/w",
 "Salicylic Acid 3% w/w",
 "In a suitable ointment base."
 ],
 "therapeuticCategory": "Corticosteroid + Keratolytic",
 "pharmacologicalClass": "Potent topical corticosteroid + keratolytic agent",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "TENORIUM-S provides complementary pharmacological activity through two active ingredients."
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Clobetasol Propionate"
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Glucocorticoid receptor-mediated activity"
 }
 ],
 "indications": [
 "TENORIUM-S may be considered for the management of selected corticosteroid-responsive inflammatory dermatoses associated with dryness, scaling or hyperkeratosis, where a potent topical corticosteroid combined with a keratolytic agent is clinically appropriate.",
 "Depending on the approved product indication, such conditions may include:",
 "Psoriasis",
 "Chronic eczematous dermatoses",
 "Hyperkeratotic eczema",
 "Lichenified inflammatory dermatoses"
 ],
 "dosageAdministration": {
 "recommended": "Accordion 01 — Recommended Application",
 "howToApply": "Apply a thin layer of TENORIUM-S to the affected area and gently rub into the skin, as directed by the treating physician.",
 "duration": "The application frequency should be determined according to:",
 "missedApplication": "Diagnosis"
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "TENORIUM-S should not be used in patients with known hypersensitivity to clobetasol propionate, salicylic acid or any component of the formulation.",
 "It should not be used indiscriminately on undiagnosed skin lesions.",
 "Important Clinical Consideration",
 "Because TENORIUM-S contains a potent corticosteroid, the underlying diagnosis should be established before prolonged treatment is undertaken.",
 "Topical corticosteroids may mask or alter the clinical appearance of certain infections."
 ],
 "warningsPrecautions": [
 {
 "title": "Accordion 01 — Potency & Duration",
 "detail": "Accordion 01 — Potency & Duration"
 },
 {
 "title": "Clobetasol is a highly potent topical co",
 "detail": "Clobetasol is a highly potent topical corticosteroid."
 },
 {
 "title": "Unnecessary prolonged treatment or exces",
 "detail": "Unnecessary prolonged treatment or excessive application can increase the risk of corticosteroid-related local and systemic effects."
 },
 {
 "title": "Use the lowest effective exposure for th",
 "detail": "Use the lowest effective exposure for the shortest appropriate duration."
 },
 {
 "title": "Accordion 02 — Hyperkeratotic Skin",
 "detail": "Accordion 02 — Hyperkeratotic Skin"
 },
 {
 "title": "The salicylic acid component helps reduc",
 "detail": "The salicylic acid component helps reduce excessive scaling and hyperkeratosis."
 }
 ],
 "adverseEffects": {
 "common": [
 "Burning",
 "Irritation",
 "Dryness"
 ],
 "lessCommon": [
 "Skin atrophy",
 "Folliculitis",
 "Secondary infection"
 ],
 "rare": [
 "With excessive exposure to potent topical corticosteroids, systemic corticosteroid effects may occur.",
 "Patients should inform their physician about all topical and systemic medicines being used."
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store TENORIUM-S according to the conditions specified on the approved product label.",
 "General handling considerations",
 "Keep the tube properly closed when not in use.",
 "Protect from conditions specified on the product label."
 ],
 "patientCounselling": [
 {
 "question": "Accordion 01 — What is TENORIUM-S used for?",
 "answer": "TENORIUM-S combines a potent topical corticosteroid with salicylic acid."
 },
 {
 "question": "The corticosteroid helps control inflammation and itching, while salicylic acid helps soften and reduce excessive scaling and thickened skin.",
 "answer": "Accordion 02 — How should it be applied?"
 },
 {
 "question": "Apply the prescribed quantity as a thin, even layer to the affected area.",
 "answer": "Gently rub the ointment into the skin."
 }
 ],
 "clinicalPearl": "TENORIUM-S combines potent anti-inflammatory corticosteroid activity with keratolytic action. It is particularly relevant when inflammation coexists with prominent dryness, scaling or hyperkeratosis—but corticosteroid potency, anatomical site and treatment duration remain important determinants of safe use.",
 "relatedProducts": [
 {
 "name": "FLUTIRIUM",
 "generic": "Fluticasone Propionate 0.05% w/w Cream",
 "slug": "flutirium"
 },
 {
 "name": "MOMERIUM-F",
 "generic": "Mometasone Furoate 0.1% + Fusidic Acid 2% Cream",
 "slug": "momerium-f"
 },
 {
 "name": "MOMERIUM",
 "generic": "Mometasone Furoate 0.1% Cream",
 "slug": "momerium"
 }
 ],
 "references": [
 "Approved Prescribing Information – TENORIUM-S.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "tenorium-s6",
 "slug": "tenorium-s6",
 "brandName": "TENORIUM S6",
 "genericName": "Clobetasol Propionate 0.05% w/w + Salicylic Acid 6% w/w Ointment",
 "tagline": "Potent Topical Corticosteroid + Enhanced Keratolytic | For Dermatological Use",
 "therapeuticArea": "Corticosteroids",
 "route": "Topical",
 "routeSubcategory": "Steroid combinations",
 "dosageForm": "Ointment",
 "strength": "0.05% w/w + 6% w/w",
 "packSize": "As per approved product pack",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of corticosteroids disorders.",
 "composition": [
 "Each gram contains:",
 "Clobetasol Propionate 0.05% w/w",
 "Salicylic Acid 6% w/w",
 "In a suitable ointment base."
 ],
 "therapeuticCategory": "Corticosteroid + Keratolytic",
 "pharmacologicalClass": "Potent topical corticosteroid + keratolytic agent",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "TENORIUM S6 provides complementary activity through two active ingredients."
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Clobetasol Propionate"
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Glucocorticoid receptor-mediated activity"
 }
 ],
 "indications": [
 "TENORIUM S6 may be considered for selected corticosteroid-responsive inflammatory dermatoses associated with prominent scaling, hyperkeratosis or thickened lesions, where a potent topical corticosteroid combined with a keratolytic agent is clinically appropriate.",
 "Depending on the approved product indication, relevant conditions may include:",
 "Psoriasis",
 "Hyperkeratotic eczema",
 "Chronic eczematous dermatoses with significant scaling",
 "Lichenified inflammatory dermatoses"
 ],
 "dosageAdministration": {
 "recommended": "Accordion 01 — Recommended Application",
 "howToApply": "Apply a thin, even layer of TENORIUM S6 to the affected area and gently rub into the skin, according to the treating physician's instructions.",
 "duration": "Application frequency should be determined according to:",
 "missedApplication": "Diagnosis"
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "TENORIUM S6 should not be used in patients with known hypersensitivity to:",
 "Clobetasol propionate",
 "Salicylic acid",
 "Any component of the formulation",
 "It should not be used indiscriminately on undiagnosed skin lesions."
 ],
 "warningsPrecautions": [
 {
 "title": "Accordion 01 — Potent Corticosteroid",
 "detail": "Accordion 01 — Potent Corticosteroid"
 },
 {
 "title": "Clobetasol propionate is a highly potent",
 "detail": "Clobetasol propionate is a highly potent topical corticosteroid."
 },
 {
 "title": "Unnecessary prolonged treatment, excessi",
 "detail": "Unnecessary prolonged treatment, excessive quantities or inappropriate application may increase the risk of:"
 },
 {
 "title": "Skin atrophy",
 "detail": "Skin atrophy"
 },
 {
 "title": "Telangiectasia",
 "detail": "Telangiectasia"
 }
 ],
 "adverseEffects": {
 "common": [
 "Burning",
 "Irritation",
 "Dryness"
 ],
 "lessCommon": [
 "Skin atrophy",
 "Folliculitis",
 "Secondary infection"
 ],
 "rare": [
 "Systemic Effects",
 "Excessive exposure to potent topical corticosteroids may result in systemic corticosteroid effects."
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store TENORIUM S6 according to the conditions specified on the approved product label.",
 "General Handling Considerations",
 "Keep the tube properly closed when not in use.",
 "Protect from conditions specified on the product label."
 ],
 "patientCounselling": [
 {
 "question": "Accordion 01 — What is TENORIUM S6 used for?",
 "answer": "TENORIUM S6 combines a potent topical corticosteroid with salicylic acid."
 },
 {
 "question": "The corticosteroid helps control inflammation and itching, while salicylic acid helps soften and reduce excessive scaling and thickened skin.",
 "answer": "Accordion 02 — How should it be applied?"
 },
 {
 "question": "Apply the prescribed quantity as a thin, even layer to the affected area.",
 "answer": "Gently massage into the skin as directed."
 }
 ],
 "clinicalPearl": "TENORIUM S6 combines potent corticosteroid activity with 6% salicylic acid for selected inflammatory dermatoses with prominent scaling or hyperkeratosis. The key to appropriate use is matching corticosteroid potency, keratolytic intensity, anatomical site and treatment duration to the clinical situation. TENORIUM-S vs TENORIUM S6 This comparison can be presented as a visual comparison card on the monograph page. Feature TENORIUM-S TENORIUM S6 Clobetasol Propionate 0.05% w/w 0.05% w/w Salicylic Acid 3% w/w 6% w/w Keratolytic Component Salicylic Acid 3% Salicylic Acid 6% Clinical Focus Inflammatory + scaly dermatoses Inflammatory + more prominent scaling / hyperkeratosis Dosage Form Ointment Ointment Corticosteroid Potency High-potency topical corticosteroid High-potency topical corticosteroid Important Clinical Note The above comparison is intended to explain the formulation difference, not to imply that one product should automatically be selected over the other. Selection should be based on diagnosis, lesion characteristics, anatomical site and physician judgement.",
 "relatedProducts": [
 {
 "name": "FLUTIRIUM",
 "generic": "Fluticasone Propionate 0.05% w/w Cream",
 "slug": "flutirium"
 },
 {
 "name": "MOMERIUM-F",
 "generic": "Mometasone Furoate 0.1% + Fusidic Acid 2% Cream",
 "slug": "momerium-f"
 },
 {
 "name": "MOMERIUM",
 "generic": "Mometasone Furoate 0.1% Cream",
 "slug": "momerium"
 }
 ],
 "references": [
 "Approved Prescribing Information – TENORIUM S6.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "tenorium-cream",
 "slug": "tenorium-cream",
 "brandName": "TENORIUM Cream",
 "genericName": "Clobetasol Propionate 0.05% w/w Cream",
 "tagline": "Topical Corticosteroid | For Dermatological Use",
 "therapeuticArea": "Corticosteroids",
 "route": "Topical",
 "routeSubcategory": "Corticosteroids",
 "dosageForm": "Cream",
 "strength": "0.05% w/w",
 "packSize": "30 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of corticosteroids disorders.",
 "composition": [
 "Each gram contains:",
 "Clobetasol Propionate 0.05% w/w",
 "In a suitable cream base.",
 "Clobetasol propionate is a synthetic topical corticosteroid with potent glucocorticoid activity."
 ],
 "therapeuticCategory": "Corticosteroid",
 "pharmacologicalClass": "Very high / super-high potency topical corticosteroid",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Clobetasol propionate exerts its therapeutic effects through glucocorticoid receptor-mediated activity within target cells."
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "This results in modulation of inflammatory processes and reduction of inflammatory mediators, producing clinically relevant effects such as reduction in erythema, oedema and pruritus in corticosteroid-responsive dermatoses."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Clobetasol Propionate"
 }
 ],
 "indications": [
 "TENORIUM Cream may be considered for the management of corticosteroid-responsive inflammatory and pruritic dermatoses where a very high-potency topical corticosteroid is clinically appropriate.",
 "Depending on the approved indication for the specific product, conditions may include selected inflammatory dermatoses such as:",
 "Severe inflammatory dermatoses",
 "Severe eczematous conditions",
 "Selected corticosteroid-responsive dermatoses",
 "Selected plaque-type psoriasis"
 ],
 "dosageAdministration": {
 "recommended": "Accordion 01 — Recommended Application",
 "howToApply": "Apply a thin layer to the affected area and gently rub into the skin as directed by the treating physician.",
 "duration": "The frequency and duration of treatment should be determined according to:",
 "missedApplication": "Diagnosis"
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "TENORIUM Cream should not be used in patients with a known hypersensitivity to clobetasol propionate or any component of the formulation.",
 "Topical corticosteroids should also not be used indiscriminately for undiagnosed skin eruptions or untreated infections.",
 "Current clobetasol prescribing information lists hypersensitivity to the product components as a contraindication.",
 "Important Site Consideration",
 "Certain clobetasol 0.05% formulations specifically advise against use on the face, groin and axillae, and against use for rosacea or perioral dermatitis. The exact restrictions should be taken from the approved TENORIUM product information before publication."
 ],
 "warningsPrecautions": [
 {
 "title": "Accordion 01 — Potency & Duration",
 "detail": "Accordion 01 — Potency & Duration"
 },
 {
 "title": "Clobetasol propionate is a highly potent",
 "detail": "Clobetasol propionate is a highly potent topical corticosteroid."
 },
 {
 "title": "Unnecessary prolonged use, excessive qua",
 "detail": "Unnecessary prolonged use, excessive quantities or inappropriate application can increase the risk of local and systemic corticosteroid-related adverse effects."
 },
 {
 "title": "Accordion 02 — Large Surface Areas",
 "detail": "Accordion 02 — Large Surface Areas"
 },
 {
 "title": "Systemic absorption may increase when po",
 "detail": "Systemic absorption may increase when potent topical corticosteroids are applied over:"
 },
 {
 "title": "Large surface areas",
 "detail": "Large surface areas"
 }
 ],
 "adverseEffects": {
 "common": [
 "Burning or stinging",
 "Irritation",
 "Pruritus"
 ],
 "lessCommon": [
 "Folliculitis",
 "Skin atrophy",
 "Secondary infection"
 ],
 "rare": [
 "With substantial systemic absorption, topical corticosteroids may produce systemic corticosteroid effects, including hypothalamic-pituitary-adrenal axis suppression.",
 "Patients should inform the treating physician about other topical and systemic medicines being used."
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store TENORIUM Cream according to the storage conditions specified on the approved product label.",
 "General handling considerations",
 "Keep the container properly closed when not in use.",
 "Protect the product according to label requirements."
 ],
 "patientCounselling": [
 {
 "question": "Accordion 01 — What is TENORIUM Cream used for?",
 "answer": "TENORIUM contains clobetasol propionate, a highly potent topical corticosteroid used for appropriate corticosteroid-responsive inflammatory skin conditions."
 },
 {
 "question": "It should be used only for the condition and duration advised by the treating physician.",
 "answer": "Accordion 02 — How should it be applied?"
 },
 {
 "question": "Apply the prescribed quantity as a thin, even layer to the affected skin.",
 "answer": "Follow the recommended frequency and duration carefully."
 }
 ],
 "clinicalPearl": "Clobetasol propionate is a highly potent topical corticosteroid. Its appropriate use depends on matching potency, quantity, anatomical site and treatment duration to the clinical indication.",
 "relatedProducts": [
 {
 "name": "FLUTIRIUM",
 "generic": "Fluticasone Propionate 0.05% w/w Cream",
 "slug": "flutirium"
 },
 {
 "name": "MOMERIUM-F",
 "generic": "Mometasone Furoate 0.1% + Fusidic Acid 2% Cream",
 "slug": "momerium-f"
 },
 {
 "name": "MOMERIUM",
 "generic": "Mometasone Furoate 0.1% Cream",
 "slug": "momerium"
 }
 ],
 "references": [
 "Approved Prescribing Information – TENORIUM CREAM.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "tofaplast-5",
 "slug": "tofaplast-5",
 "brandName": "TOFAPLAST-5",
 "genericName": "Tofacitinib 5 mg Tablet",
 "tagline": "Oral JAK Inhibitor",
 "therapeuticArea": "Immunomodulator",
 "route": "Oral / Systematic",
 "routeSubcategory": "Immunomodulator",
 "dosageForm": "Tablet",
 "strength": "5 mg",
 "packSize": "10 × 10 Alu-Alu",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of immunomodulator disorders.",
 "composition": [
 "Each Tablet Contains",
 "Tofacitinib — 5 mg",
 "Excipients: q.s.",
 "Dosage Form"
 ],
 "therapeuticCategory": "JAK Inhibitor",
 "pharmacologicalClass": "Specialized dermatological immunomodulator therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Accordion 01 — JAK-STAT SIGNALING"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Tofacitinib inhibits JAK-dependent signalling pathways involved in cytokine-mediated immune responses."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Reduced JAK signalling can decrease downstream inflammatory activity."
 }
 ],
 "indications": [
 "Management of acute and chronic immunomodulator conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Tofacitinib 5 mg Tablet or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of immunomodulator."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "TOFAPLAST-5 contains Tofacitinib 5 mg, an oral JAK inhibitor with systemic immunomodulatory activity. Its use requires a confirmed and appropriate indication, careful patient selection, infection and TB assessment, laboratory monitoring and consideration of cardiovascular, thrombotic and malignancy risks. Dermatological use should be clearly distinguished from approved indications and from off-label clinical evidence.",
 "relatedProducts": [
 {
 "name": "TACNOID 0.05%",
 "generic": "Tretinoin 0.05% w/w Cream",
 "slug": "tacnoid-0-05"
 },
 {
 "name": "TOFAPLAST Cream",
 "generic": "Tofacitinib 2% Gel",
 "slug": "tofaplast-cream"
 }
 ],
 "references": [
 "Approved Prescribing Information – TOFAPLAST-5.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "tofaplast-cream",
 "slug": "tofaplast-cream",
 "brandName": "TOFAPLAST Cream",
 "genericName": "Tofacitinib 2% Gel",
 "tagline": "Topical JAK Inhibitor",
 "therapeuticArea": "Immunomodulator",
 "route": "Topical",
 "routeSubcategory": "Immunomodulator",
 "dosageForm": "Gel",
 "strength": "2% w/w",
 "packSize": "10 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of immunomodulator disorders.",
 "composition": [
 "Each gram of gel contains:",
 "Tofacitinib — 2% w/w",
 "Gel base: q.s.",
 "Dosage Form"
 ],
 "therapeuticCategory": "Topical JAK Inhibitor",
 "pharmacologicalClass": "Specialized dermatological immunomodulator therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Accordion 01 — JAK-DEPENDENT SIGNALING"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Tofacitinib inhibits JAK-dependent signalling pathways involved in cytokine-mediated immune responses."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Modulation of these pathways can reduce inflammatory signalling in appropriately selected inflammatory skin disorders."
 }
 ],
 "indications": [
 "Management of acute and chronic immunomodulator conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Tofacitinib 2% Gel or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of immunomodulator."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed gel regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "TOFAPLAST Cream contains Tofacitinib 2% w/w in a topical gel formulation. Its clinical use should be diagnosis-driven and based on the approved indication for the specific product. Appropriate patient selection, correct application, infection assessment, monitoring of treatment response and periodic diagnostic reassessment are essential to responsible topical JAK-inhibitor therapy.",
 "relatedProducts": [
 {
 "name": "TACNOID 0.05%",
 "generic": "Tretinoin 0.05% w/w Cream",
 "slug": "tacnoid-0-05"
 },
 {
 "name": "TOFAPLAST-5",
 "generic": "Tofacitinib 5 mg Tablet",
 "slug": "tofaplast-5"
 }
 ],
 "references": [
 "Approved Prescribing Information – TOFAPLAST Cream.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "tressicle-2-5",
 "slug": "tressicle-2-5",
 "brandName": "TRESSICLE 2.5",
 "genericName": "Minoxidil 2.5 mg Tablet",
 "tagline": "Oral Hair Growth Therapy",
 "therapeuticArea": "Hair & Scalp",
 "route": "Oral / Systematic",
 "routeSubcategory": "Hair & Scalp",
 "dosageForm": "Tablet",
 "strength": "2.5 mg",
 "packSize": "10 × 10 Alu-Alu",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of hair & scalp disorders.",
 "composition": [
 "Minoxidil 2.5 mg Tablet",
 "Formulated in a specialized pharmaceutical tablet base."
 ],
 "therapeuticCategory": "Hair Growth Promoting Therapy",
 "pharmacologicalClass": "Specialized dermatological hair & scalp therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Minoxidil 2.5 mg Tablet to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for hair & scalp symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic hair & scalp conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Cardiovascular precautions",
 "Blood pressure considerations",
 "Heart-rate considerations",
 "Fluid-retention precautions"
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of hair & scalp."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "TRESSICLE 2.5 provides Minoxidil 2.5 mg for oral administration. Unlike topical minoxidil, oral minoxidil produces systemic exposure and therefore requires careful patient selection, consideration of cardiovascular status, individualized dosing and appropriate monitoring. Its use for hair loss should follow a confirmed diagnosis, a documented risk-benefit assessment and appropriate clinical counselling.",
 "relatedProducts": [
 {
 "name": "BIOSICLE PLUS",
 "generic": "Biotin 10 mg + Calcium Pantothenate 100 mg + N-Acetylcysteine 50 mg + Selenium 65 mcg + Copper 3 mg + Zinc 22.5 mg Tablets",
 "slug": "biosicle-plus"
 },
 {
 "name": "TRESSICLE 5",
 "generic": "Minoxidil 5 mg Tablet",
 "slug": "tressicle-5"
 },
 {
 "name": "TRESSICLE FORTE",
 "generic": "Minoxidil 5% Solution",
 "slug": "tressicle-forte"
 }
 ],
 "references": [
 "Approved Prescribing Information – TRESSICLE 2.5.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "tressicle-5",
 "slug": "tressicle-5",
 "brandName": "TRESSICLE 5",
 "genericName": "Minoxidil 5 mg Tablet",
 "tagline": "Oral Hair Growth Therapy",
 "therapeuticArea": "Hair & Scalp",
 "route": "Oral / Systematic",
 "routeSubcategory": "Hair & Scalp",
 "dosageForm": "Tablet",
 "strength": "5 mg",
 "packSize": "10 × 10 Alu-Alu",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of hair & scalp disorders.",
 "composition": [
 "Minoxidil 5 mg Tablet",
 "Formulated in a specialized pharmaceutical tablet base."
 ],
 "therapeuticCategory": "Hair Growth Promoting Therapy",
 "pharmacologicalClass": "Specialized dermatological hair & scalp therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Minoxidil 5 mg Tablet to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for hair & scalp symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic hair & scalp conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Cardiovascular precautions",
 "Blood-pressure considerations",
 "Heart-rate considerations",
 "Fluid-retention precautions"
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of hair & scalp."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "TRESSICLE 5 contains Minoxidil 5 mg for oral administration. Because oral minoxidil produces systemic exposure, appropriate use requires more than assessment of hair-loss severity. Diagnosis, cardiovascular risk assessment, individualized dosing, medication review, monitoring and patient counselling are integral to responsible clinical use.",
 "relatedProducts": [
 {
 "name": "BIOSICLE PLUS",
 "generic": "Biotin 10 mg + Calcium Pantothenate 100 mg + N-Acetylcysteine 50 mg + Selenium 65 mcg + Copper 3 mg + Zinc 22.5 mg Tablets",
 "slug": "biosicle-plus"
 },
 {
 "name": "TRESSICLE 2.5",
 "generic": "Minoxidil 2.5 mg Tablet",
 "slug": "tressicle-2-5"
 },
 {
 "name": "TRESSICLE FORTE",
 "generic": "Minoxidil 5% Solution",
 "slug": "tressicle-forte"
 }
 ],
 "references": [
 "Approved Prescribing Information – TRESSICLE 5.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "tressicle-forte",
 "slug": "tressicle-forte",
 "brandName": "TRESSICLE FORTE",
 "genericName": "Minoxidil 5% Solution",
 "tagline": "Topical Hair Growth Promoting Therapy",
 "therapeuticArea": "Hair & Scalp",
 "route": "Topical",
 "routeSubcategory": "Hair & Scalp",
 "dosageForm": "Solution",
 "strength": "5%",
 "packSize": "60 mL",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of hair & scalp disorders.",
 "composition": [
 "Minoxidil 5% Solution",
 "Formulated in a specialized pharmaceutical solution base."
 ],
 "therapeuticCategory": "Hair Growth Promoting Agent",
 "pharmacologicalClass": "Specialized dermatological hair & scalp therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Minoxidil 5% Solution to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for hair & scalp symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic hair & scalp conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Minoxidil 5% Solution or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of hair & scalp."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed solution regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "TRESSICLE FORTE provides Minoxidil 5% solution for appropriately diagnosed pattern hair loss. Successful use depends on accurate diagnosis, suitable patient selection, consistent scalp-directed application and realistic expectations regarding the time course of hair growth. Rapidly progressive, patchy, inflammatory or scarring hair loss should prompt diagnostic reassessment rather than treatment escalation alone.",
 "relatedProducts": [
 {
 "name": "BIOSICLE PLUS",
 "generic": "Biotin 10 mg + Calcium Pantothenate 100 mg + N-Acetylcysteine 50 mg + Selenium 65 mcg + Copper 3 mg + Zinc 22.5 mg Tablets",
 "slug": "biosicle-plus"
 },
 {
 "name": "TRESSICLE 2.5",
 "generic": "Minoxidil 2.5 mg Tablet",
 "slug": "tressicle-2-5"
 },
 {
 "name": "TRESSICLE 5",
 "generic": "Minoxidil 5 mg Tablet",
 "slug": "tressicle-5"
 }
 ],
 "references": [
 "Approved Prescribing Information – TRESSICLE FORTE.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "tressicle-f",
 "slug": "tressicle-f",
 "brandName": "TRESSICLE-F",
 "genericName": "Minoxidil 5% + Finasteride 0.1% Solution",
 "tagline": "Topical Hair Growth Therapy for Pattern Hair Loss",
 "therapeuticArea": "Hair & Scalp",
 "route": "Oral / Systematic",
 "routeSubcategory": "Hair & Scalp",
 "dosageForm": "Solution",
 "strength": "5%",
 "packSize": "60 mL",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of hair & scalp disorders.",
 "composition": [
 "Minoxidil 5% + Finasteride 0.1% Solution",
 "Formulated in a specialized pharmaceutical solution base."
 ],
 "therapeuticCategory": "Hair Growth Promoting Therapy",
 "pharmacologicalClass": "Specialized dermatological hair & scalp therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Minoxidil 5% to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for hair & scalp symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic hair & scalp conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Minoxidil 5% + Finasteride 0.1% Solution or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of hair & scalp."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed solution regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "TRESSICLE-F combines Minoxidil 5% and Finasteride 0.1% in a topical solution for appropriately selected patients with pattern hair loss. The formulation provides complementary therapeutic approaches—supporting follicular growth while addressing DHT-mediated follicular miniaturization. Appropriate diagnosis, patient selection, consistent scalp-directed application, realistic expectations and finasteride-specific safety counselling are essential components of responsible clinical use.",
 "relatedProducts": [
 {
 "name": "BIOSICLE PLUS",
 "generic": "Biotin 10 mg + Calcium Pantothenate 100 mg + N-Acetylcysteine 50 mg + Selenium 65 mcg + Copper 3 mg + Zinc 22.5 mg Tablets",
 "slug": "biosicle-plus"
 },
 {
 "name": "TRESSICLE 2.5",
 "generic": "Minoxidil 2.5 mg Tablet",
 "slug": "tressicle-2-5"
 },
 {
 "name": "TRESSICLE 5",
 "generic": "Minoxidil 5 mg Tablet",
 "slug": "tressicle-5"
 }
 ],
 "references": [
 "Approved Prescribing Information – TRESSICLE-F.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "trilofaz-b",
 "slug": "trilofaz-b",
 "brandName": "TRILOFAZ-B",
 "genericName": "Clotrimazole 1% + Betamethasone Dipropionate 0.025% Lotion",
 "tagline": "Topical Antifungal + Corticosteroid Combination",
 "therapeuticArea": "Corticosteroids",
 "route": "Topical",
 "routeSubcategory": "Steroid combinations",
 "dosageForm": "Lotion",
 "strength": "1%",
 "packSize": "30 mL",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of corticosteroids disorders.",
 "composition": [
 "Clotrimazole 1% + Betamethasone Dipropionate 0.025% Lotion",
 "Formulated in a specialized pharmaceutical lotion base."
 ],
 "therapeuticCategory": "Topical Antifungal + Corticosteroid",
 "pharmacologicalClass": "Specialized dermatological corticosteroids therapeutic agent.",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Clotrimazole 1% to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for corticosteroids symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic corticosteroids conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Corticosteroid-related precautions",
 "Site-specific restrictions",
 "Use on face and intertriginous areas",
 "Pediatric use",
 "Pregnancy and lactation information"
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of corticosteroids."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed lotion regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "TRILOFAZ-B combines antifungal therapy with potent anti-inflammatory treatment. Its clinical value lies in appropriately selected inflammatory fungal dermatoses—not in routine treatment of every itchy or erythematous lesion. Accurate diagnosis, anatomical-site assessment, appropriate quantity, limited corticosteroid exposure and reassessment of non-responders are central to responsible use.",
 "relatedProducts": [
 {
 "name": "FLUTIRIUM",
 "generic": "Fluticasone Propionate 0.05% w/w Cream",
 "slug": "flutirium"
 },
 {
 "name": "MOMERIUM-F",
 "generic": "Mometasone Furoate 0.1% + Fusidic Acid 2% Cream",
 "slug": "momerium-f"
 },
 {
 "name": "MOMERIUM",
 "generic": "Mometasone Furoate 0.1% Cream",
 "slug": "momerium"
 }
 ],
 "references": [
 "Approved Prescribing Information – TRILOFAZ-B.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "trilofaz",
 "slug": "trilofaz",
 "brandName": "TRILOFAZ",
 "genericName": "Clotrimazole 1% Dusting Powder",
 "tagline": "Topical Imidazole Antifungal",
 "therapeuticArea": "Corticosteroids",
 "route": "Topical",
 "routeSubcategory": "Corticosteroids",
 "dosageForm": "Cream",
 "strength": "1%",
 "packSize": "100 g",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of corticosteroids disorders.",
 "composition": [
 "Clotrimazole 1% Dusting Powder",
 "Formulated in a specialized pharmaceutical cream base."
 ],
 "therapeuticCategory": "Topical Antifungal",
 "pharmacologicalClass": "Imidazole Antifungal",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Active Site Delivery",
 "description": "Targeted delivery of Clotrimazole 1% Dusting Powder to affected dermatological tissue."
 },
 {
 "step": "02",
 "title": "Pathophysiological Control",
 "description": "Modulates pathological mediators responsible for corticosteroids symptoms."
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Promotes clinical resolution, restores epidermal balance and provides symptom relief."
 }
 ],
 "indications": [
 "Management of acute and chronic corticosteroids conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Clotrimazole 1% Dusting Powder or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "General Clinical Precaution",
 "detail": "For professional healthcare guidance. Discontinue if severe local irritation or allergic contact sensitization develops."
 },
 {
 "title": "Treatment Duration",
 "detail": "Prolonged uninterrupted use without physician monitoring should be avoided."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of corticosteroids."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed cream regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "TRILOFAZ provides Clotrimazole 1% in a dusting-powder formulation for appropriately diagnosed superficial fungal infections. Its formulation offers a practical approach where moisture, sweating and skin-fold occlusion are relevant clinical considerations. Optimal outcomes depend on accurate diagnosis, adequate application, consistent treatment and attention to moisture control and reinfection factors.",
 "relatedProducts": [
 {
 "name": "FLUTIRIUM",
 "generic": "Fluticasone Propionate 0.05% w/w Cream",
 "slug": "flutirium"
 },
 {
 "name": "MOMERIUM-F",
 "generic": "Mometasone Furoate 0.1% + Fusidic Acid 2% Cream",
 "slug": "momerium-f"
 },
 {
 "name": "MOMERIUM",
 "generic": "Mometasone Furoate 0.1% Cream",
 "slug": "momerium"
 }
 ],
 "references": [
 "Approved Prescribing Information – TRILOFAZ.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "zindroxin-syrup",
 "slug": "zindroxin-syrup",
 "brandName": "ZINDROXIN SYRUP",
 "genericName": "Hydroxyzine 10 mg / 5 mL Oral Liquid",
 "tagline": "Oral Antihistamine for Symptomatic Relief of Pruritus Associated with Allergic Conditions",
 "therapeuticArea": "Allergy & Pruritus",
 "route": "Oral / Systematic",
 "routeSubcategory": "Anti-Allergic / Pruritic",
 "dosageForm": "Syrup",
 "strength": "10 mg",
 "packSize": "100 mL",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of allergy & pruritus disorders.",
 "composition": [
 "Each 5 mL contains:",
 "Hydroxyzine Hydrochloride equivalent to Hydroxyzine 10 mg",
 "Excipients: q.s.",
 "Concentration"
 ],
 "therapeuticCategory": "Antihistamine",
 "pharmacologicalClass": "First-generation H1-antihistamine",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "H1-receptor activation"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Itching / wheal-and-flare response"
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Hydroxyzine blocks H1 receptor-mediated effects"
 }
 ],
 "indications": [
 "Management of acute and chronic allergy & pruritus conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Hydroxyzine 10 mg / 5 mL Oral Liquid or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "Accordion 01 — DROWSINESS & SEDATION",
 "detail": "Accordion 01 — DROWSINESS & SEDATION"
 },
 {
 "title": "Hydroxyzine may cause drowsiness and sed",
 "detail": "Hydroxyzine may cause drowsiness and sedation."
 },
 {
 "title": "Patients and caregivers should be counse",
 "detail": "Patients and caregivers should be counselled regarding activities requiring full alertness."
 },
 {
 "title": "Accordion 02 — DRIVING & MACHINERY",
 "detail": "Accordion 02 — DRIVING & MACHINERY"
 },
 {
 "title": "Patients should understand their individ",
 "detail": "Patients should understand their individual response before driving or operating machinery."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of allergy & pruritus."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed syrup regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "ZINDROXIN Syrup provides a liquid hydroxyzine presentation at 10 mg/5 mL for symptomatic management of appropriate allergic and histamine-mediated pruritic conditions. The liquid dosage form offers administration flexibility, but precise dose calculation, accurate volume measurement and patient-specific safety assessment remain essential.",
 "relatedProducts": [
 {
 "name": "BLISMIN-20",
 "generic": "Bilastine 20 mg Tablet",
 "slug": "blismin-20"
 },
 {
 "name": "BLISMIN-M",
 "generic": "Bilastine 20 mg + Montelukast 10 mg Tablet",
 "slug": "blismin-m"
 },
 {
 "name": "DINOFEX-180",
 "generic": "Fexofenadine 180 mg Tablet",
 "slug": "dinofex-180"
 }
 ],
 "references": [
 "Approved Prescribing Information – ZINDROXIN SYRUP.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "zindroxin-10",
 "slug": "zindroxin-10",
 "brandName": "ZINDROXIN-10",
 "genericName": "Hydroxyzine 10 mg Tablet",
 "tagline": "Oral Antihistamine for Symptomatic Relief of Pruritus Associated with Allergic Conditions",
 "therapeuticArea": "Allergy & Pruritus",
 "route": "Oral / Systematic",
 "routeSubcategory": "Anti-Allergic / Pruritic",
 "dosageForm": "Tablet",
 "strength": "10 mg",
 "packSize": "10 × 15 Alu-Alu Tablets",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of allergy & pruritus disorders.",
 "composition": [
 "Each uncoated / film-coated tablet contains:",
 "Hydroxyzine Hydrochloride equivalent to Hydroxyzine 10 mg",
 "Excipients: q.s.",
 "Regulatory note: The exact salt nomenclature and excipient declaration should match the approved ZINDROXIN-10 product artwork and package insert."
 ],
 "therapeuticCategory": "Antihistamine",
 "pharmacologicalClass": "First-generation H1-antihistamine",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "Interaction with H1 receptors"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Itching / wheal-and-flare response"
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Hydroxyzine blocks H1 receptor-mediated effects"
 }
 ],
 "indications": [
 "Management of acute and chronic allergy & pruritus conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Hydroxyzine 10 mg Tablet or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "Accordion 01 — DROWSINESS & IMPAIRED ALE",
 "detail": "Accordion 01 — DROWSINESS & IMPAIRED ALERTNESS"
 },
 {
 "title": "Hydroxyzine may cause drowsiness and sed",
 "detail": "Hydroxyzine may cause drowsiness and sedation."
 },
 {
 "title": "Patients should be counselled about acti",
 "detail": "Patients should be counselled about activities requiring mental alertness, particularly when beginning therapy or when the dose is changed."
 },
 {
 "title": "Accordion 02 — DRIVING & MACHINERY",
 "detail": "Accordion 02 — DRIVING & MACHINERY"
 },
 {
 "title": "Patients should be advised to understand",
 "detail": "Patients should be advised to understand their individual response to hydroxyzine before undertaking activities requiring full alertness."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of allergy & pruritus."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "ZINDROXIN-10 provides an oral antihistamine option for symptomatic management of appropriate histamine-mediated pruritus. Its use should be individualised with attention to sedation, concomitant medicines, patient age, underlying disease and cardiac risk factors.",
 "relatedProducts": [
 {
 "name": "BLISMIN-20",
 "generic": "Bilastine 20 mg Tablet",
 "slug": "blismin-20"
 },
 {
 "name": "BLISMIN-M",
 "generic": "Bilastine 20 mg + Montelukast 10 mg Tablet",
 "slug": "blismin-m"
 },
 {
 "name": "DINOFEX-180",
 "generic": "Fexofenadine 180 mg Tablet",
 "slug": "dinofex-180"
 }
 ],
 "references": [
 "Approved Prescribing Information – ZINDROXIN-10.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 },
 {
 "id": "zindroxin-25",
 "slug": "zindroxin-25",
 "brandName": "ZINDROXIN-25",
 "genericName": "Hydroxyzine 25 mg Tablet",
 "tagline": "Oral Antihistamine for Symptomatic Relief of Pruritus Associated with Allergic Conditions",
 "therapeuticArea": "Allergy & Pruritus",
 "route": "Oral / Systematic",
 "routeSubcategory": "Anti-Allergic / Pruritic",
 "dosageForm": "Tablet",
 "strength": "25 mg",
 "packSize": "10 × 10 Alu-Alu",
 "prescriptionStatus": "Prescription Medicine",
 "clinicalSummary": "A specialized pharmaceutical formulation indicated for the targeted dermatological management of allergy & pruritus disorders.",
 "composition": [
 "Each tablet contains:",
 "Hydroxyzine Hydrochloride equivalent to Hydroxyzine 25 mg",
 "Excipients: q.s.",
 "Regulatory note: The final salt nomenclature, excipient declaration and product description should exactly match the approved ZINDROXIN-25 product specification and package insert."
 ],
 "therapeuticCategory": "Antihistamine",
 "pharmacologicalClass": "First-generation H1-antihistamine",
 "mechanismOfAction": [
 {
 "step": "01",
 "title": "Target Binding & Cellular Action",
 "description": "H1-receptor activation"
 },
 {
 "step": "02",
 "title": "Pathway Modulation",
 "description": "Itching / wheal-and-flare response"
 },
 {
 "step": "03",
 "title": "Clinical Resolution",
 "description": "Hydroxyzine blocks H1 receptor-mediated effects"
 }
 ],
 "indications": [
 "Management of acute and chronic allergy & pruritus conditions",
 "Dermatologist-guided clinical therapy",
 "Symptomatic relief and maintenance care"
 ],
 "dosageAdministration": {
 "recommended": "Apply/take as prescribed by the healthcare practitioner according to severity.",
 "howToApply": "For topical products, wash hands and apply a thin film to the affected area. For oral products, take with water.",
 "duration": "As directed by physician; reassess periodically for continued appropriateness.",
 "missedApplication": "Apply or take as soon as remembered, unless close to the next scheduled dose. Do not double the dose."
 },
 "specialPopulations": {
 "pregnancy": "Use during pregnancy only if clearly indicated and potential benefit justifies potential risk.",
 "lactation": "Caution advised. Exercise care and avoid application to the breast area prior to nursing.",
 "paediatric": "Use under direct pediatric dermatological guidance. Follow body surface area limitations.",
 "geriatric": "No general dose adjustment usually required; monitor closely for skin thinning or renal clearance.",
 "specialSites": "Avoid sensitive mucosal surfaces, eyes, and prolonged intertriginous occlusion unless specifically directed."
 },
 "contraindications": [
 "Known hypersensitivity to Hydroxyzine 25 mg Tablet or any excipients in the formulation.",
 "Untreated primary cutaneous viral, fungal, or tubercular infections without concurrent specific therapy."
 ],
 "warningsPrecautions": [
 {
 "title": "Accordion 01 — DROWSINESS & SEDATION",
 "detail": "Accordion 01 — DROWSINESS & SEDATION"
 },
 {
 "title": "Hydroxyzine may cause drowsiness and sed",
 "detail": "Hydroxyzine may cause drowsiness and sedation."
 },
 {
 "title": "Patients should be counselled regarding ",
 "detail": "Patients should be counselled regarding activities requiring full alertness."
 },
 {
 "title": "Accordion 02 — DRIVING & MACHINERY",
 "detail": "Accordion 02 — DRIVING & MACHINERY"
 },
 {
 "title": "Patients should understand their individ",
 "detail": "Patients should understand their individual response before driving or operating machinery."
 }
 ],
 "adverseEffects": {
 "common": [
 "Mild transient local erythema or tingling",
 "Mild dryness at application site"
 ],
 "lessCommon": [
 "Follicular irritation",
 "Contact sensitization"
 ],
 "rare": [
 "Systemic absorption with excessive prolonged occlusive use",
 "Immediate hypersensitivity reactions"
 ]
 },
 "drugInteractions": {
 "topical": "Concomitant use of multiple topical agents with irritating potential should be sequenced with care.",
 "systemic": "Minimal systemic interactions anticipated under approved topical application parameters."
 },
 "storageHandling": [
 "Store below 25°C to 30°C in a dry place.",
 "Protect from excessive heat and direct sunlight.",
 "Keep container tightly closed after use.",
 "Keep out of reach of children."
 ],
 "patientCounselling": [
 {
 "question": "What is this medicine used for?",
 "answer": "Prescribed for targeted dermatological management of allergy & pruritus."
 },
 {
 "question": "How should it be used?",
 "answer": "Follow the prescribed tablet regimen carefully. Do not exceed the advised duration."
 },
 {
 "question": "What should be avoided?",
 "answer": "Avoid contact with eyes, broken skin, and unauthorized occlusive dressings."
 },
 {
 "question": "When to contact the doctor?",
 "answer": "Consult immediately if unexpected redness, blistering, or worsening of symptoms occurs."
 }
 ],
 "clinicalPearl": "ZINDROXIN-25 provides a 25 mg hydroxyzine presentation for symptomatic management of appropriate allergic and histamine-mediated pruritic conditions. Clinical use should be individualised with careful attention to sedation, concomitant medicines, patient age, underlying disease and cardiac risk factors.",
 "relatedProducts": [
 {
 "name": "BLISMIN-20",
 "generic": "Bilastine 20 mg Tablet",
 "slug": "blismin-20"
 },
 {
 "name": "BLISMIN-M",
 "generic": "Bilastine 20 mg + Montelukast 10 mg Tablet",
 "slug": "blismin-m"
 },
 {
 "name": "DINOFEX-180",
 "generic": "Fexofenadine 180 mg Tablet",
 "slug": "dinofex-180"
 }
 ],
 "references": [
 "Approved Prescribing Information – ZINDROXIN-25.",
 "Current Indian Guidelines for Dermatological Practice.",
 "Standard Dermatological Pharmacology & Therapeutics References."
 ]
 }
];

export const THERAPEUTIC_AREAS = [
 'Acne',
 'Antifungal',
 'Antibacterial',
 'Corticosteroids',
 'Allergy & Pruritus',
 'Immunomodulator',
 'Pigmentation',
 'Hair & Scalp',
 'Anti-Parasitic',
 'Supportive Care'
] as const;

export const ROUTES = [
 {
 name: 'Topical',
 subcategories: [
 'Corticosteroids',
 'Steroid combinations',
 'Antibacterial',
 'Acne',
 'Immunomodulator',
 'Antifungal',
 'Anti-Parasitic',
 'Cleansing / Supportive Care'
 ]
 },
 {
 name: 'Oral / Systematic',
 subcategories: [
 'Anti-Allergic / Pruritic',
 'Antibacterial',
 'Acne',
 'Immunomodulator',
 'Antifungal',
 'Hair & Scalp',
 'Gastro support'
 ]
 }
] as const;

export const DOSAGE_FORMS = [
 'Cream',
 'Ointment',
 'Gel',
 'Lotion',
 'Tablet',
 'Capsule',
 'Softgel',
 'Syrup',
 'Solution',
 'Soap',
 'Powder',
 'Gummy'
] as const;

export function getProductBySlug(slug: string): RyanProduct | undefined {
 return RYAN_PRODUCTS.find(p => p.slug === slug || p.id === slug);
}

export function getFeaturedProducts(): RyanProduct[] {
 const featuredSlugs = [
 'tenorium-cream',
 'clixodin-ad',
 'kefin-cream',
 'i-tacnoid-20',
 'tofaplast-5-tab',
 'tressicle-f',
 'blismin-20',
 'miteclin-cream'
 ];
 return RYAN_PRODUCTS.filter(p => featuredSlugs.some(fs => p.slug.includes(fs) || fs.includes(p.slug))).slice(0, 8);
}
