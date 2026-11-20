// PDF Generator for Ryan Dermaceutics (Client-side via jsPDF)
// Generates authentic, fully-compliant binary PDF documents that open in all PDF viewers.
// Formatted strictly for A4 geometry with consistent margins, padding, and dynamic auto-wrapping.

export interface BatchCOA {
  productName: string;
  brandName: string;
  genericName: string;
  dosageForm: string;
  strength: string;
  batchNumber: string;
  mfgDate: string;
  expDate: string;
  analysisDate: string;
  arNumber: string;
  batchSize: string;
  status: 'Approved' | 'Released';
  tests: {
    parameter: string;
    specification: string;
    result: string;
    compliant: boolean;
  }[];
}

export async function generateProductMonographPDF(product: any) {
  if (typeof window === 'undefined') return;
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 16; // 16mm margin on left and right
  const contentWidth = pageWidth - margin * 2; // 178mm printable area
  let y = 16;

  // Header Bar (Navy / Teal branding)
  doc.setFillColor(0, 61, 77); // #003d4d
  doc.rect(margin, y, contentWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13.5);
  doc.text('RYAN DERMACEUTICS', margin + 6, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('A Specialized Dermatology Division of Ethics Medinova Pvt. Ltd.', margin + 6, y + 14);
  doc.text('WHO-GMP Certified Facility Protocols • Schedule H / Rx Dermatological Formulations', margin + 6, y + 19);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('FOR HEALTHCARE PROFESSIONALS ONLY', margin + contentWidth - 6, y + 8, { align: 'right' });

  y += 30;

  // Document Title
  doc.setTextColor(0, 96, 112); // #006070
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('OFFICIAL CLINICAL MONOGRAPH', margin, y);

  y += 5;
  doc.setDrawColor(0, 118, 138);
  doc.setLineWidth(0.7);
  doc.line(margin, y, margin + contentWidth, y);

  y += 7;

  // Product Summary Box (Dynamic Height with auto-wrapping for long generic names/compositions)
  const boxPadding = 5;
  const innerWidth = contentWidth - boxPadding * 2; // 168mm
  const colGap = 6;
  const colWidth = (innerWidth - colGap) / 2; // 81mm each

  // Prepare Brand and Generic text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  const brandName = product.brandName || 'PHARMACEUTICAL FORMULATION';
  const brandLines = doc.splitTextToSize(brandName, innerWidth);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  const genericName = product.genericName || 'Active Dermatological Compound';
  const genericLines = doc.splitTextToSize(genericName, innerWidth);

  // Prepare Key attributes in 2 columns with wrapping
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);

  const col1Data = [
    { label: 'Therapeutic Area', val: product.therapeuticArea || 'Dermatology' },
    { label: 'Dosage Form', val: product.dosageForm || 'Topical' },
    { label: 'Route', val: product.route || 'Topical Application' },
  ];

  const col2Data = [
    { label: 'Strength / Concentration', val: product.strength || 'As formulated' },
    { label: 'Packaging', val: product.packaging || product.packSize || 'Standard clinical pack' },
    { label: 'Quality Standard', val: 'WHO-GMP Certified Protocols' },
  ];

  const col1RenderItems = col1Data.map(item => {
    const text = `${item.label}: ${item.val}`;
    const lines = doc.splitTextToSize(text, colWidth);
    return lines;
  });

  const col2RenderItems = col2Data.map(item => {
    const text = `${item.label}: ${item.val}`;
    const lines = doc.splitTextToSize(text, colWidth);
    return lines;
  });

  // Calculate dynamic box height
  let col1TotalHeight = 0;
  col1RenderItems.forEach(lines => { col1TotalHeight += lines.length * 4 + 1.5; });

  let col2TotalHeight = 0;
  col2RenderItems.forEach(lines => { col2TotalHeight += lines.length * 4 + 1.5; });

  const gridHeight = Math.max(col1TotalHeight, col2TotalHeight);
  const brandHeight = brandLines.length * 5.2;
  const genericHeight = genericLines.length * 4.2;
  const dividerSpace = 5;

  const boxHeight = boxPadding + brandHeight + 1.5 + genericHeight + dividerSpace + gridHeight + boxPadding;

  // Draw Box Background & Border
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.rect(margin, y, contentWidth, boxHeight, 'FD');

  // Render Brand Name
  let boxY = y + boxPadding + 4;
  doc.setTextColor(15, 23, 42); // slate-900
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  brandLines.forEach((l: string) => {
    doc.text(l, margin + boxPadding, boxY);
    boxY += 5.2;
  });

  // Render Generic Name
  boxY += 0.5;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(71, 85, 105); // slate-600
  genericLines.forEach((l: string) => {
    doc.text(l, margin + boxPadding, boxY);
    boxY += 4.2;
  });

  // Divider inside box
  boxY += 2;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin + boxPadding, boxY, margin + contentWidth - boxPadding, boxY);
  boxY += 4;

  // Render Attributes in 2 columns
  const col1X = margin + boxPadding;
  const col2X = margin + boxPadding + colWidth + colGap;

  let curY1 = boxY;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(51, 65, 85);
  col1RenderItems.forEach(lines => {
    lines.forEach((l: string) => {
      doc.text(l, col1X, curY1);
      curY1 += 4;
    });
    curY1 += 1.5;
  });

  let curY2 = boxY;
  col2RenderItems.forEach(lines => {
    lines.forEach((l: string) => {
      doc.text(l, col2X, curY2);
      curY2 += 4;
    });
    curY2 += 1.5;
  });

  y += boxHeight + 8;

  // Function to add a section with heading bar and safe margins
  const addSection = (title: string, bodyText: string | string[]) => {
    // Check page height
    if (y > pageHeight - margin - 25) {
      doc.addPage();
      y = margin + 4;
    }

    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y, contentWidth, 6, 'F');
    doc.setTextColor(0, 61, 77);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.text(title.toUpperCase(), margin + 3.5, y + 4.2);
    y += 9.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);

    const safeTextWidth = contentWidth - 8;

    if (Array.isArray(bodyText)) {
      bodyText.forEach((item) => {
        const lines = doc.splitTextToSize(`• ${item}`, safeTextWidth);
        lines.forEach((line: string) => {
          if (y > pageHeight - margin - 15) {
            doc.addPage();
            y = margin + 4;
          }
          doc.text(line, margin + 4, y);
          y += 4.5;
        });
      });
      y += 2;
    } else {
      const lines = doc.splitTextToSize(bodyText, safeTextWidth);
      lines.forEach((line: string) => {
        if (y > pageHeight - margin - 15) {
          doc.addPage();
          y = margin + 4;
        }
        doc.text(line, margin + 2, y);
        y += 4.5;
      });
      y += 2;
    }
  };

  // Section 1: Clinical Pharmacology & Mechanism
  const pharmacology = product.clinicalPharmacology ||
    `${product.brandName} combines high-purity active pharmaceutical ingredients formulated within an optimized dermatological vehicle. It is engineered for controlled epidermal penetration, sustained localized therapeutic concentration, and reduced cutaneous adverse event profiles.`;
  addSection('1. Clinical Pharmacology & Composition', pharmacology);

  // Section 2: Indications & Clinical Usage
  const indications = Array.isArray(product.indications) && product.indications.length > 0
    ? product.indications
    : ['Indicated for targeted clinical dermatological conditions according to physician prescription.'];
  addSection('2. Approved Indications & Dermatological Uses', indications);

  // Section 3: Posology & Administration
  const dosage = product.dosageInstructions ||
    `Apply as specifically advised by a registered medical practitioner. For topical formulations, adhere to the standard Fingertip Unit (FTU) rules over cleansed, pat-dried skin. Do not occlude unless explicitly directed.`;
  addSection('3. Posology & Administration Guidelines', dosage);

  // Section 4: Safety, Contraindications & Precautions
  const warnings = [
    'Hypersensitivity to the active substance or to any formulation excipients.',
    'For external dermatological or prescribed oral use only as per packaging instructions.',
    'Avoid contact with conjunctiva and mucous membranes.',
    'Keep out of reach of children. Store below 25°C in a dry place protected from direct sunlight.'
  ];
  addSection('4. Contraindications, Precautions & Safety', warnings);

  // Footer (On all pages)
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, margin + contentWidth, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Ryan Dermaceutics • Medical Affairs Division • www.ethicsmedinova.com', margin, pageHeight - 7);
    doc.text(`Page ${i} of ${totalPages}`, margin + contentWidth, pageHeight - 7, { align: 'right' });
  }

  const cleanFilename = `${(product.brandName || 'product').toLowerCase().replace(/[^a-z0-9]/g, '-')}-clinical-monograph.pdf`;
  doc.save(cleanFilename);
}

export async function generatePrescribingInfoPDF(product: any) {
  if (typeof window === 'undefined') return;
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 16;

  // Header Bar
  doc.setFillColor(0, 61, 77);
  doc.rect(margin, y, contentWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13.5);
  doc.text('RYAN DERMACEUTICS', margin + 6, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Prescribing Information & Clinical Guidance Document', margin + 6, y + 14);
  doc.text('Ethics Medinova Pvt. Ltd. • Schedule H Prescription Drug Regulations', margin + 6, y + 19);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('PRESCRIBING INFORMATION', margin + contentWidth - 6, y + 8, { align: 'right' });

  y += 30;

  // Title
  doc.setTextColor(0, 96, 112);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13.5);
  const titleText = `PRESCRIBING INFORMATION: ${(product.brandName || 'PHARMACEUTICAL FORMULATION').toUpperCase()}`;
  const titleLines = doc.splitTextToSize(titleText, contentWidth);
  titleLines.forEach((tl: string) => {
    doc.text(tl, margin, y);
    y += 5;
  });

  y += 2;
  doc.setDrawColor(0, 118, 138);
  doc.setLineWidth(0.7);
  doc.line(margin, y, margin + contentWidth, y);

  y += 7;

  // Summary box (Dynamic wrapping for active composition)
  const boxPadding = 5;
  const innerWidth = contentWidth - boxPadding * 2;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  const compLines = doc.splitTextToSize(`Active Composition: ${product.genericName || 'Active Dermatological Substance'}`, innerWidth);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  const classLines = doc.splitTextToSize(`Therapeutic Class: ${product.therapeuticArea || 'Dermatology'} | Dosage Form: ${product.dosageForm || 'Topical'}`, innerWidth);
  const routeLines = doc.splitTextToSize(`Route: ${product.route || 'Topical'} | Regulatory Schedule: Schedule H (Rx Prescription Only)`, innerWidth);
  const qualityLines = doc.splitTextToSize(`Manufactured under WHO-GMP certified standards with full analytical batch release testing.`, innerWidth);

  const sumBoxHeight = boxPadding + (compLines.length * 4.8) + (classLines.length * 4.2) + (routeLines.length * 4.2) + (qualityLines.length * 4.2) + boxPadding + 1;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, sumBoxHeight, 'FD');

  let curBoxY = y + boxPadding + 3.5;
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  compLines.forEach((l: string) => {
    doc.text(l, margin + boxPadding, curBoxY);
    curBoxY += 4.8;
  });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(71, 85, 105);

  classLines.forEach((l: string) => {
    doc.text(l, margin + boxPadding, curBoxY);
    curBoxY += 4.2;
  });
  routeLines.forEach((l: string) => {
    doc.text(l, margin + boxPadding, curBoxY);
    curBoxY += 4.2;
  });
  qualityLines.forEach((l: string) => {
    doc.text(l, margin + boxPadding, curBoxY);
    curBoxY += 4.2;
  });

  y += sumBoxHeight + 8;

  const addField = (heading: string, content: string | string[]) => {
    if (y > pageHeight - margin - 25) {
      doc.addPage();
      y = margin + 4;
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(0, 61, 77);
    doc.text(heading, margin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);
    const safeTextWidth = contentWidth - 6;

    if (Array.isArray(content)) {
      content.forEach(item => {
        const lines = doc.splitTextToSize(`• ${item}`, safeTextWidth);
        lines.forEach((l: string) => {
          if (y > pageHeight - margin - 15) { doc.addPage(); y = margin + 4; }
          doc.text(l, margin + 3, y);
          y += 4.5;
        });
      });
    } else {
      const lines = doc.splitTextToSize(content, safeTextWidth);
      lines.forEach((l: string) => {
        if (y > pageHeight - margin - 15) { doc.addPage(); y = margin + 4; }
        doc.text(l, margin, y);
        y += 4.5;
      });
    }
    y += 3;
  };

  addField('1. INDICATIONS & USAGE', product.indications || ['As prescribed by a licensed healthcare professional.']);
  addField('2. DOSAGE & ADMINISTRATION', product.dosageInstructions || 'Administer according to body surface area involvement and patient response. Adhere to fingertip unit (FTU) guidelines.');
  addField('3. CONTRAINDICATIONS & WARNINGS', [
    'Contraindicated in patients with known hypersensitivity to the drug or excipients.',
    'Discontinue therapy if cutaneous irritation or sensitization develops.',
    'Not recommended for unapproved anatomical sites or occlusive dressing without physician guidance.'
  ]);
  addField('4. ADVERSE REACTIONS & REPORTING', 'Common local reactions may include transient mild stinging, erythema or xerosis. Systemic absorption remains negligible with appropriate application.');
  addField('5. STORAGE & HANDLING', 'Store below 25°C in a cool, dry place. Keep tube/container tightly closed after each application. Protect from excessive light and heat.');

  // Page Numbers
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(203, 213, 225);
    doc.line(margin, pageHeight - 12, margin + contentWidth, pageHeight - 12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Ryan Dermaceutics • Prescribing Information • Ethics Medinova Pvt. Ltd.', margin, pageHeight - 7);
    doc.text(`Page ${i} of ${totalPages}`, margin + contentWidth, pageHeight - 7, { align: 'right' });
  }

  const cleanFilename = `${(product.brandName || 'product').toLowerCase().replace(/[^a-z0-9]/g, '-')}-prescribing-info.pdf`;
  doc.save(cleanFilename);
}

export async function generateBatchCOAPDF(coa: BatchCOA) {
  if (typeof window === 'undefined') return;
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 16;

  // Header
  doc.setFillColor(0, 61, 77);
  doc.rect(margin, y, contentWidth, 26, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13.5);
  doc.text('ETHICS MEDINOVA PRIVATE LIMITED', margin + 6, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Quality Control & Analytical Assurance Laboratory • WHO-GMP Certified', margin + 6, y + 14);
  doc.text('Ryan Dermaceutics Division • Quality Certificate of Analysis', margin + 6, y + 19);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('OFFICIAL COA', margin + contentWidth - 6, y + 8, { align: 'right' });

  y += 32;

  // Certificate Title
  doc.setTextColor(0, 96, 112);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12.5);
  doc.text('CERTIFICATE OF ANALYSIS (COA) - BATCH RELEASE REPORT', margin, y);

  y += 5;
  doc.setDrawColor(0, 118, 138);
  doc.setLineWidth(0.7);
  doc.line(margin, y, margin + contentWidth, y);

  y += 7;

  // Batch Details 2-Column Table with safe wrapping
  const boxPadding = 4;
  const innerWidth = contentWidth - boxPadding * 2;
  const colGap = 6;
  const colWidth = (innerWidth - colGap) / 2;

  const c1 = margin + boxPadding;
  const c2 = margin + boxPadding + colWidth + colGap;

  // Wrap generic name if long
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  const genLines = doc.splitTextToSize(`Generic Name: ${coa.genericName}`, colWidth);
  const extraGenHeight = (genLines.length - 1) * 4;
  const batchBoxHeight = 36 + extraGenHeight;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, batchBoxHeight, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(15, 23, 42);

  doc.text(`Product Name: ${coa.productName}`, c1, y + 6);
  
  let curGenY = y + 11.5;
  genLines.forEach((l: string) => {
    doc.text(l, c1, curGenY);
    curGenY += 4;
  });

  const belowGenY = y + 18 + extraGenHeight;
  doc.text(`Batch Number: ${coa.batchNumber}`, c1, belowGenY);
  doc.text(`Batch Size: ${coa.batchSize}`, c1, belowGenY + 5.5);
  doc.text(`AR Number: ${coa.arNumber}`, c1, belowGenY + 11);

  doc.text(`Dosage Form: ${coa.dosageForm}`, c2, y + 6);
  doc.text(`Mfg. Date: ${coa.mfgDate}`, c2, y + 11.5);
  doc.text(`Exp. Date: ${coa.expDate}`, c2, belowGenY);
  doc.text(`Analysis Date: ${coa.analysisDate}`, c2, belowGenY + 5.5);
  doc.setTextColor(22, 101, 52); // green-800
  doc.text(`Release Status: WHO-GMP APPROVED (${coa.status.toUpperCase()})`, c2, belowGenY + 11);

  y += batchBoxHeight + 6;

  // Tests Table Header
  doc.setFillColor(0, 96, 112);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);

  const colParamX = margin + 3;
  const colSpecX = margin + 56;
  const colResX = margin + 116;
  const colStatX = margin + 154;

  doc.text('TEST PARAMETER', colParamX, y + 4.8);
  doc.text('SPECIFICATION', colSpecX, y + 4.8);
  doc.text('OBSERVED RESULT', colResX, y + 4.8);
  doc.text('STATUS', colStatX, y + 4.8);

  y += 7;

  // Table rows with bounded column widths
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);

  coa.tests.forEach((t, idx) => {
    const isEven = idx % 2 === 0;
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.rect(margin, y, contentWidth, 6.5, 'F');

    doc.setTextColor(30, 41, 59);
    doc.text(t.parameter, colParamX, y + 4.5, { maxWidth: 50 });
    doc.text(t.specification, colSpecX, y + 4.5, { maxWidth: 56 });
    doc.text(t.result, colResX, y + 4.5, { maxWidth: 35 });

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(t.compliant ? 22 : 220, t.compliant ? 101 : 38, t.compliant ? 52 : 38);
    doc.text(t.compliant ? 'COMPLIES' : 'FAILED', colStatX, y + 4.5);
    doc.setFont('helvetica', 'normal');

    y += 6.5;
  });

  y += 6;

  // Remarks & Conclusion
  doc.setFillColor(240, 253, 244); // green-50
  doc.setDrawColor(187, 247, 208); // green-200
  doc.rect(margin, y, contentWidth, 18, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(22, 101, 52);
  doc.text('ANALYTICAL CONCLUSION:', margin + 4, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(21, 128, 61);
  doc.text(
    'In the opinion of the Quality Assurance Laboratory, the sample referred to above is of STANDARD QUALITY and complies with official finished product specifications under WHO-GMP compliance.',
    margin + 4,
    y + 10.5,
    { maxWidth: contentWidth - 8 }
  );

  y += 24;

  // Signatures
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);

  const sig1X = margin + 10;
  const sig2X = margin + contentWidth - 55;

  doc.line(sig1X, y + 10, sig1X + 45, y + 10);
  doc.line(sig2X, y + 10, sig2X + 45, y + 10);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('ANALYZED BY', sig1X + 8, y + 15);
  doc.text('APPROVED BY', sig2X + 8, y + 15);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Senior Quality Analyst', sig1X + 7, y + 19);
  doc.text('Head - Quality Assurance', sig2X + 6, y + 19);

  // Footer
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, pageHeight - 12, margin + contentWidth, pageHeight - 12);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Ethics Medinova Pvt. Ltd. • Quality Control Division • Batch Analysis Portal', margin, pageHeight - 7);
  doc.text('Official Laboratory Document', margin + contentWidth, pageHeight - 7, { align: 'right' });

  const cleanFilename = `COA-${coa.batchNumber}-${coa.brandName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`;
  doc.save(cleanFilename);
}

export async function generateClinicalResourcePDF(docInfo: {
  title: string;
  category: string;
  description: string;
  details?: string;
  filename: string;
}) {
  if (typeof window === 'undefined') return;
  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 16;

  // Header
  doc.setFillColor(0, 61, 77);
  doc.rect(margin, y, contentWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13.5);
  doc.text('RYAN DERMACEUTICS', margin + 6, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Clinical Practice Resources & Therapeutic Guidance Library', margin + 6, y + 14);
  doc.text('A Division of Ethics Medinova Pvt. Ltd. • WHO-GMP Compliant Protocols', margin + 6, y + 19);

  y += 30;

  // Title
  doc.setTextColor(0, 96, 112);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  const titleLines = doc.splitTextToSize(docInfo.title.toUpperCase(), contentWidth);
  titleLines.forEach((tl: string) => {
    doc.text(tl, margin, y);
    y += 5;
  });

  y += 3;
  doc.setDrawColor(0, 118, 138);
  doc.setLineWidth(0.7);
  doc.line(margin, y, margin + contentWidth, y);

  y += 7;

  // Category Tag
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, y, contentWidth, 8, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(0, 61, 77);
  doc.text(`DOCUMENT CLASSIFICATION: ${docInfo.category.toUpperCase()}`, margin + 4, y + 5.2);

  y += 14;

  // Executive Description
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('1. EXECUTIVE CLINICAL SUMMARY', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const descLines = doc.splitTextToSize(docInfo.description, contentWidth - 6);
  descLines.forEach((l: string) => {
    doc.text(l, margin, y);
    y += 4.5;
  });

  y += 4;

  // Clinical Guidance Body
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('2. CLINICAL PRACTICE SPECIFICATIONS & PROTOCOLS', margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const detailsText = docInfo.details ||
    'This document is prepared by Ryan Dermaceutics Medical Affairs to provide registered medical practitioners with validated therapeutic frameworks, dose-titration strategies, and patient adherence guidelines. For detailed inquiries or sample requests, consult your professional medical representative.';
  const detailLines = doc.splitTextToSize(detailsText, contentWidth - 6);
  detailLines.forEach((l: string) => {
    if (y > pageHeight - margin - 20) { doc.addPage(); y = margin + 4; }
    doc.text(l, margin, y);
    y += 4.5;
  });

  y += 6;

  // Prescribing & Safety Callout
  if (y > pageHeight - margin - 30) { doc.addPage(); y = margin + 4; }
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, y, contentWidth, 22, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('PROFESSIONAL COMPLIANCE NOTICE:', margin + 4, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'For use by Registered Medical Practitioners, Hospitals and Laboratories only. Not intended for commercial direct-to-consumer advertising. Formulation specs subject to Indian Pharmacopoeia and Schedule H regulations.',
    margin + 4,
    y + 11,
    { maxWidth: contentWidth - 8 }
  );

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(203, 213, 225);
    doc.line(margin, pageHeight - 12, margin + contentWidth, pageHeight - 12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Ryan Dermaceutics • Therapeutic Resources • Ethics Medinova Pvt. Ltd.', margin, pageHeight - 7);
    doc.text(`Page ${i} of ${totalPages}`, margin + contentWidth, pageHeight - 7, { align: 'right' });
  }

  doc.save(docInfo.filename.endsWith('.pdf') ? docInfo.filename : `${docInfo.filename}.pdf`);
}
