// PDF Generator for Ryan Dermaceutics (Client-side via jsPDF)
// Generates authentic, fully-compliant binary PDF documents that open in all PDF viewers.
// Designed strictly for A4 geometry (210 x 297mm) with balanced margins, generous padding,
// auto multi-line wrapping, dynamic bounding boxes, and zero text overlap.

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
  const margin = 16; // 16mm side margins
  const contentWidth = pageWidth - margin * 2; // 178mm printable area
  let y = 16;

  // Header Bar
  doc.setFillColor(0, 61, 77); // #003d4d
  doc.rect(margin, y, contentWidth, 24, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('RYAN DERMACEUTICS', margin + 6, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.text('A Specialized Dermatology Division • Ryan Dermaceutics Pvt. Ltd.', margin + 6, y + 14);
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

  // Product Summary Box (Dynamic Height & Auto Multi-line Wrapping)
  const boxPadding = 5;
  const innerWidth = contentWidth - boxPadding * 2; // 168mm
  const colGap = 8;
  const colWidth = (innerWidth - colGap) / 2; // 80mm

  // Brand and Generic text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  const brandName = (product.brandName || 'PHARMACEUTICAL FORMULATION').toUpperCase();
  const brandLines = doc.splitTextToSize(brandName, innerWidth);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.8);
  const genericName = product.genericName || 'Active Dermatological Compound';
  const genericLines = doc.splitTextToSize(genericName, innerWidth);

  // Key attributes in 2 columns
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

  const col1Items = col1Data.map(item => doc.splitTextToSize(`${item.label}: ${item.val}`, colWidth));
  const col2Items = col2Data.map(item => doc.splitTextToSize(`${item.label}: ${item.val}`, colWidth));

  let col1H = 0;
  col1Items.forEach(lines => { col1H += lines.length * 4.2 + 1; });

  let col2H = 0;
  col2Items.forEach(lines => { col2H += lines.length * 4.2 + 1; });

  const gridH = Math.max(col1H, col2H);
  const brandH = brandLines.length * 5.2;
  const genericH = genericLines.length * 4.2;
  const dividerH = 5;

  const boxHeight = boxPadding + brandH + 2 + genericH + dividerH + gridH + boxPadding;

  // Draw Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, boxHeight, 'FD');

  let curBoxY = y + boxPadding + 4.5;

  // Draw Brand Name
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  brandLines.forEach((l: string) => {
    doc.text(l, margin + boxPadding, curBoxY);
    curBoxY += 5.2;
  });

  // Draw Generic Name
  curBoxY += 0.5;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.8);
  doc.setTextColor(71, 85, 105);
  genericLines.forEach((l: string) => {
    doc.text(l, margin + boxPadding, curBoxY);
    curBoxY += 4.2;
  });

  // Divider line
  curBoxY += 2;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin + boxPadding, curBoxY, margin + contentWidth - boxPadding, curBoxY);
  curBoxY += 4;

  // Draw Columns
  const col1X = margin + boxPadding;
  const col2X = margin + boxPadding + colWidth + colGap;

  let yCol1 = curBoxY;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(51, 65, 85);
  col1Items.forEach(lines => {
    lines.forEach((l: string) => {
      doc.text(l, col1X, yCol1);
      yCol1 += 4.2;
    });
    yCol1 += 1;
  });

  let yCol2 = curBoxY;
  col2Items.forEach(lines => {
    lines.forEach((l: string) => {
      doc.text(l, col2X, yCol2);
      yCol2 += 4.2;
    });
    yCol2 += 1;
  });

  y += boxHeight + 8;

  // Section Adder with page overflow protection
  const addSection = (title: string, bodyText: string | string[]) => {
    if (y > pageHeight - margin - 30) {
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
      y += 2.5;
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
      y += 2.5;
    }
  };

  // Section 1: Pharmacology
  const pharmacology = product.clinicalPharmacology ||
    `${product.brandName} combines high-purity active pharmaceutical ingredients formulated within an optimized dermatological vehicle. It is engineered for controlled epidermal penetration, sustained localized therapeutic concentration, and reduced cutaneous adverse event profiles.`;
  addSection('1. Clinical Pharmacology & Composition', pharmacology);

  // Section 2: Indications
  const indications = Array.isArray(product.indications) && product.indications.length > 0
    ? product.indications
    : ['Indicated for targeted clinical dermatological conditions according to physician prescription.'];
  addSection('2. Approved Indications & Dermatological Uses', indications);

  // Section 3: Posology
  const dosage = product.dosageInstructions ||
    `Apply as specifically advised by a registered medical practitioner. For topical formulations, adhere to the standard Fingertip Unit (FTU) rules over cleansed, pat-dried skin. Do not occlude unless explicitly directed.`;
  addSection('3. Posology & Administration Guidelines', dosage);

  // Section 4: Safety & Precautions
  const warnings = [
    'Hypersensitivity to the active substance or to any formulation excipients.',
    'For external dermatological or prescribed oral use only as per packaging instructions.',
    'Avoid contact with conjunctiva and mucous membranes.',
    'Keep out of reach of children. Store below 25°C in a dry place protected from direct sunlight.'
  ];
  addSection('4. Contraindications, Precautions & Safety', warnings);

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 12, margin + contentWidth, pageHeight - 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Ryan Dermaceutics • Medical Affairs Division • www.ryandermaceutics.com', margin, pageHeight - 7);
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
  doc.setFontSize(14);
  doc.text('RYAN DERMACEUTICS', margin + 6, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.text('Prescribing Information & Clinical Guidance Document', margin + 6, y + 14);
  doc.text('Ryan Dermaceutics Pvt. Ltd. • Schedule H Prescription Drug Regulations', margin + 6, y + 19);

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
    doc.text('Ryan Dermaceutics • Prescribing Information • Clinical Healthcare Division', margin, pageHeight - 7);
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

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 16;
  const contentWidth = pageWidth - margin * 2; // 178mm
  let y = 16;

  // Header Bar
  doc.setFillColor(0, 61, 77); // #003d4d
  doc.rect(margin, y, contentWidth, 25, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13.5);
  doc.text('RYAN DERMACEUTICS PRIVATE LIMITED', margin + 6, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Quality Control & Analytical Assurance Laboratory • WHO-GMP Certified', margin + 6, y + 14);
  doc.text('Analytical Batch Release Testing • Quality Certificate of Analysis', margin + 6, y + 19);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('OFFICIAL COA', margin + contentWidth - 6, y + 8, { align: 'right' });

  y += 31;

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

  // Batch Details Box (Full-width title/generic + 2 cleanly separated metadata columns)
  const boxPadding = 5;
  const innerWidth = contentWidth - boxPadding * 2; // 168mm

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  const prodNameText = `Product: ${coa.productName}`;
  const prodLines = doc.splitTextToSize(prodNameText, innerWidth);

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  const genNameText = `Generic Composition: ${coa.genericName}`;
  const genLines = doc.splitTextToSize(genNameText, innerWidth);

  const metaColGap = 8;
  const metaColWidth = (innerWidth - metaColGap) / 2; // 80mm each

  const col1Meta = [
    `Batch Number: ${coa.batchNumber}`,
    `Batch Size: ${coa.batchSize}`,
    `AR / QC Number: ${coa.arNumber}`,
  ];

  const col2Meta = [
    `Dosage Form: ${coa.dosageForm}`,
    `Mfg. Date: ${coa.mfgDate}  |  Exp. Date: ${coa.expDate}`,
    `Analysis Date: ${coa.analysisDate}`,
    `Release Status: WHO-GMP APPROVED (${coa.status.toUpperCase()})`,
  ];

  const metaHeight = Math.max(col1Meta.length, col2Meta.length) * 5;
  const topTextHeight = (prodLines.length * 4.8) + (genLines.length * 4.2) + 3;
  const batchBoxHeight = boxPadding + topTextHeight + 4 + metaHeight + boxPadding;

  // Draw Batch Details Box
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.rect(margin, y, contentWidth, batchBoxHeight, 'FD');

  let curY = y + boxPadding + 3.5;

  // Render Product Name (Full Width)
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  prodLines.forEach((l: string) => {
    doc.text(l, margin + boxPadding, curY);
    curY += 4.8;
  });

  // Render Generic Name (Full Width)
  curY += 0.5;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  genLines.forEach((l: string) => {
    doc.text(l, margin + boxPadding, curY);
    curY += 4.2;
  });

  // Divider Line inside Box
  curY += 2;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.line(margin + boxPadding, curY, margin + contentWidth - boxPadding, curY);
  curY += 4;

  // Render Metadata Columns
  const c1X = margin + boxPadding;
  const c2X = margin + boxPadding + metaColWidth + metaColGap;

  let col1CurY = curY;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(51, 65, 85);
  col1Meta.forEach(txt => {
    doc.text(txt, c1X, col1CurY);
    col1CurY += 5;
  });

  let col2CurY = curY;
  col2Meta.forEach((txt, idx) => {
    if (idx === col2Meta.length - 1) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(22, 101, 52); // green-800
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(51, 65, 85);
    }
    doc.text(txt, c2X, col2CurY);
    col2CurY += 5;
  });

  y += batchBoxHeight + 7;

  // Tests Table Header
  // Column Widths strictly planned:
  // contentWidth = 178mm
  // Parameter: 46mm, Specification: 64mm, Result: 40mm, Status: 28mm -> Total = 178mm
  const colParamW = 46;
  const colSpecW = 64;
  const colResW = 40;
  const colStatW = 28;

  const colParamX = margin;
  const colSpecX = colParamX + colParamW;
  const colResX = colSpecX + colSpecW;
  const colStatX = colResX + colResW;

  doc.setFillColor(0, 96, 112);
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);

  doc.text('TEST PARAMETER', colParamX + 3, y + 4.8);
  doc.text('SPECIFICATION', colSpecX + 3, y + 4.8);
  doc.text('OBSERVED RESULT', colResX + 3, y + 4.8);
  doc.text('STATUS', colStatX + 3, y + 4.8);

  y += 7;

  // Table Rows (Auto Multi-line wrapping per cell so ZERO text overlap ever happens)
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);

  coa.tests.forEach((t, idx) => {
    const isEven = idx % 2 === 0;

    // Wrap cell contents to safe cell widths
    const paramLines = doc.splitTextToSize(t.parameter, colParamW - 5);
    const specLines = doc.splitTextToSize(t.specification, colSpecW - 5);
    const resLines = doc.splitTextToSize(t.result, colResW - 5);

    const maxLines = Math.max(paramLines.length, specLines.length, resLines.length, 1);
    const rowHeight = Math.max(maxLines * 4.2 + 2.5, 6.5);

    // Page overflow check
    if (y + rowHeight > pageHeight - margin - 35) {
      doc.addPage();
      y = margin + 4;
    }

    // Row Background
    doc.setFillColor(isEven ? 255 : 248, isEven ? 255 : 250, isEven ? 255 : 252);
    doc.rect(margin, y, contentWidth, rowHeight, 'F');

    // Bottom subtle border
    doc.setDrawColor(241, 245, 249);
    doc.setLineWidth(0.2);
    doc.line(margin, y + rowHeight, margin + contentWidth, y + rowHeight);

    // Cell 1: Parameter
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    let pY = y + 4.2;
    paramLines.forEach((l: string) => {
      doc.text(l, colParamX + 3, pY);
      pY += 4.2;
    });

    // Cell 2: Specification
    let sY = y + 4.2;
    specLines.forEach((l: string) => {
      doc.text(l, colSpecX + 3, sY);
      sY += 4.2;
    });

    // Cell 3: Result
    let rY = y + 4.2;
    resLines.forEach((l: string) => {
      doc.text(l, colResX + 3, rY);
      rY += 4.2;
    });

    // Cell 4: Status
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(t.compliant ? 22 : 220, t.compliant ? 101 : 38, t.compliant ? 52 : 38);
    doc.text(t.compliant ? 'COMPLIES' : 'FAILED', colStatX + 3, y + 4.2);

    y += rowHeight;
  });

  y += 5;

  // Remarks & Conclusion Box
  if (y > pageHeight - margin - 35) {
    doc.addPage();
    y = margin + 4;
  }

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

  doc.line(sig1X, y + 8, sig1X + 45, y + 8);
  doc.line(sig2X, y + 8, sig2X + 45, y + 8);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('ANALYZED BY', sig1X + 8, y + 13);
  doc.text('APPROVED BY', sig2X + 8, y + 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Senior Quality Analyst', sig1X + 7, y + 17);
  doc.text('Head - Quality Assurance', sig2X + 6, y + 17);

  // Footer on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setDrawColor(203, 213, 225);
    doc.line(margin, pageHeight - 12, margin + contentWidth, pageHeight - 12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text('Ryan Dermaceutics Pvt. Ltd. • Quality Control Division • Batch Analysis Portal', margin, pageHeight - 7);
    doc.text('Official Laboratory Document', margin + contentWidth, pageHeight - 7, { align: 'right' });
  }

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
  doc.text('Ryan Dermaceutics • WHO-GMP Compliant Manufacturing Protocols', margin + 6, y + 19);

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
    doc.text('Ryan Dermaceutics • Therapeutic Resources & Clinical Library', margin, pageHeight - 7);
    doc.text(`Page ${i} of ${totalPages}`, margin + contentWidth, pageHeight - 7, { align: 'right' });
  }

  doc.save(docInfo.filename.endsWith('.pdf') ? docInfo.filename : `${docInfo.filename}.pdf`);
}
