import { jsPDF } from 'jspdf';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import * as path from 'path';
import * as fs from 'fs';
import { imageToBase64, jsPDFWithPlugin, UserAndPrescriptionAndFiles } from '../util';
import 'jspdf-autotable';

function handleParseSchool(schooling: string): string {
  if (schooling === 'EFI') return 'Ensino fundamental incompleto';
  if (schooling === 'EF') return 'Ensino fundamental';
  if (schooling === 'EMI') return 'Ensino médio incompleto';
  if (schooling === 'EM') return 'Ensino médio';
  if (schooling === 'ESI') return 'Ensino superior incompleto';
  if (schooling === 'ES') return 'Ensino superior';
}

function checked(check: boolean): string {
  if (!check) {
    return '(   )';
  } else {
    return '( x )';
  }
}

async function mergePDFs(pdfsToMerges: ArrayBuffer[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();
  const actions = pdfsToMerges.map(async (pdfBuffer) => {
    const pdf = await PDFDocument.load(pdfBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => {
      mergedPdf.addPage(page);
    });
  });
  await Promise.all(actions);
  const mergedPdfFile = await mergedPdf.save();
  return mergedPdfFile;
}

async function headerPDF(title: string): Promise<Uint8Array> {
  const loadBasePdf = fs.readFileSync(path.join(__dirname, '../../public/pdf/base.pdf'));
  const pdfDoc = await PDFDocument.load(loadBasePdf);
  const pages = pdfDoc.getPages();

  const { width, height } = pages[0].getSize();

  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const startingPositon = 550;

  pages[0].drawText(`${title}`, {
    y: startingPositon - 100,
    x: width / 2 - 100,
    size: 32,
    font: timesRomanFont,
  });

  return await pdfDoc.save();
}

export async function printAllPrescription(
  data: UserAndPrescriptionAndFiles,
  defaultPathSavePDF: string
): Promise<void> {
  const doc = new jsPDF() as unknown as jsPDFWithPlugin;
  const base64Img = imageToBase64(path.join(__dirname, '../../public/img/human-brain-grey.png'));

  // Inserindo imagem como background no documento
  // doc.addImage(base64Img, 'PNG', 55, 100, 100, 100);
  // doc.internal.events.subscribe('addPage', function () {
  //   doc.addImage(base64Img, 'PNG', 55, 100, 100, 100);
  // });

  doc.setFontSize(16);
  doc.text('INFORMÇÕES DO PACIENTE', 105, 10, { align: 'center' });

  doc.autoTable({
    theme: 'plain',
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 28 },
      2: { fontStyle: 'bold', cellWidth: 45 },
    },
    head: [['', '', '', '']],
    body: [
      ['Nome:', `${data.name}`, 'NATURALIDADE:', 'RJ'],
      ['MÂE:', `${data.mother}`, 'PAI:', `${data.dad}`],
      ['SEXO:', `${data.sex}`, 'DATA DE NASCIMENTO:', `${data.birth}`],
      ['RELIGIÃO:', `${data.religion}`, 'ESCOLARIDADE:', `${handleParseSchool(data.schooling)}`],
      ['PROFISSÃO:', `${data.profession}`],
    ],
  });

  let finalY = doc.lastAutoTable.finalY || 10;
  doc.setFontSize(14);
  doc.text('Exame Clínicos', 105, finalY + 10, { align: 'center' });

  doc.autoTable({
    theme: 'plain',
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 38 },
      1: { cellWidth: 80 },
      2: { fontStyle: 'bold', cellWidth: 32 },
    },
    head: [['', '', '', '']],
    body: [
      [
        'Q.P:',
        `${data.prescription.main_complaint}`,
        'H.FAMILIAR:',
        `${data.prescription.family_history}`,
      ],
      [
        'H.D.A:',
        `${data.prescription.history_current}`,
        'H.SOCIAL:',
        `${data.prescription.social_history}`,
      ],
      [
        'H.P.P:',
        `${data.prescription.previous_pathological_history}`,
        'H.FISIOLÓGICA:',
        `${data.prescription.physiological_history}`,
      ],
      ['H.FARMACEUTICO:', `${data.prescription.pharmaceutical_history}`],
    ],
  });

  finalY = doc.lastAutoTable.finalY || 10;
  doc.setFontSize(14);
  doc.text('Exame físicos', 105, finalY + 10, { align: 'center' });

  doc.autoTable({
    theme: 'plain',
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 35 },
      1: { cellWidth: 100 },
      2: { fontStyle: 'bold' },
    },
    head: [['', '', '', '', '', '']],
    body: [
      [
        'A.C.V:',
        `${data.prescription.cardiovascular_system}`,
        'P.A:',
        `${data.prescription.blood_pressure}`,
        'F.C:',
        `${data.prescription.heart_rate}`,
      ],
      [
        'A.R:',
        `${data.prescription.respiratory_system}`,
        'SAT:',
        `${data.prescription.oxygen_saturation}`,
      ],
      ['A.B.D:', `${data.prescription.adb}`],
      ['MMII:', `${data.prescription.mmii}`],
      ['OTOSCOPIA:', `${data.prescription.otoscopy}`],
      ['OFTALMOSCOPIA:', `${data.prescription.ophthalmoscopy}`],
      ['ROMBERG:', `${data.prescription.romberg}`],
    ],
  });

  finalY = doc.lastAutoTable.finalY || 10;
  doc.setFontSize(14);
  doc.text('Marcha', 105, finalY + 10, { align: 'center' });

  doc.autoTable({
    theme: 'plain',
    columnStyles: {
      0: { fontStyle: 'bold' },
      1: { fontStyle: 'bold' },
      2: { fontStyle: 'bold' },
    },
    head: [['', '', '']],
    body: [
      [
        `CEIFANTE: ${checked(data.prescription.ceifante)}`,
        `ATAXICA TALONANTE: ${checked(data.prescription.ataxica_talonante)}`,
        `ESCARVANTE: ${checked(data.prescription.escarvante)}`,
      ],
      [
        `ANSERINA: ${checked(data.prescription.anserina)}`,
        `CEREBELAR: ${checked(data.prescription.cerebelar)}`,
        `MAGNÉTICA: ${checked(data.prescription.magnetica)}`,
      ],
      [`PARKINSONIANA: ${checked(data.prescription.parkinsoniana)}`],
    ],
  });

  finalY = doc.lastAutoTable.finalY || 10;
  doc.setFontSize(14);
  doc.text('Diagnóstico sindrômico', 105, finalY + 10, { align: 'center' });

  doc.autoTable({
    theme: 'plain',
    columnStyles: {
      0: { fontStyle: 'bold' },
      1: { fontStyle: 'bold' },
      2: { fontStyle: 'bold' },
    },
    head: [['', '']],
    body: [
      [
        `S.D COGNITIVO: ${checked(data.prescription.cognitivo)}`,
        `S.D CONVULSIVA: ${checked(true)}`,
      ],
      [
        `S.D MOTORA: ${checked(data.prescription.motora)}`,
        `S.D MENÍNGEA: ${checked(data.prescription.meningeal)}`,
      ],
      [
        `S.D HEMIPARÉTICA: ${checked(data.prescription.hemiparetica)}`,
        `S.D SENSITIVA: ${checked(true)}`,
      ],
      [
        `TETRAPARÉTICA: ${checked(data.prescription.tetraparetica)}`,
        `S.D PARAPARÉTICA: ${checked(data.prescription.paraparetica)}`,
      ],
      [
        `S.D HIPERTENSÃO INTRACRANIANA: ${checked(data.prescription.intracranial_hypertension)}`,
        `MONOPARÉTICA: ${checked(data.prescription.monoparetica)}`,
      ],
      [`SINDROME DO NMI: ${data.prescription.nmi}`],
    ],
  });

  finalY = doc.lastAutoTable.finalY || 10;
  doc.setFontSize(14);
  doc.text('Sindromes Relacionados a Função do Sistema Nervoso Autonomo', 105, finalY + 10, {
    align: 'center',
  });

  doc.autoTable({
    theme: 'plain',
    columnStyles: {
      0: { fontStyle: 'bold' },
      1: { fontStyle: 'bold' },
      2: { fontStyle: 'bold' },
    },
    head: [['', '']],
    body: [
      [
        `CARDIOVASCULAR: ${checked(data.prescription.cardiovascular)}`,
        `RESPIRATÓRIAS: ${checked(data.prescription.respiratory)}`,
      ],
      [
        `DIGESTIVAS: ${checked(data.prescription.digestive)}`,
        `SUDORESE: ${checked(data.prescription.sudorese)}`,
      ],
      [
        `CONTROLE DOS ESFÍNCTERES E VESICAL: ${checked(
          data.prescription.control_of_sphincters_and_bladder
        )}`,
      ],
    ],
  });

  finalY = doc.lastAutoTable.finalY || 10;
  doc.setFontSize(14);
  doc.text('Sindromes Sensitivas', 105, finalY + 10, { align: 'center' });

  doc.autoTable({
    theme: 'plain',
    columnStyles: {
      0: { fontStyle: 'bold' },
      1: { fontStyle: 'bold' },
      2: { fontStyle: 'bold' },
    },
    head: [['', '']],
    body: [
      [
        `HIPOESTESIAS: ${checked(data.prescription.hypoesthesias)}`,
        `PARESTESIA: ${checked(data.prescription.paresthesia)}`,
      ],
      [`HIPERALGESIA: ${checked(data.prescription.hypoesthesias)}`],
    ],
  });

  finalY = doc.lastAutoTable.finalY || 10;
  doc.setFontSize(14);
  doc.text('Diagnóstico', 105, finalY + 10, { align: 'center' });

  doc.autoTable({
    theme: 'plain',
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50 },
      2: { fontStyle: 'bold' },
    },
    head: [['', '']],
    body: [
      ['PRESCRIÇÃO:', `${data.prescription.prescription}`],
      ['EXAMES SOLICITADOS:', `${data.prescription.requested_exams}`],
      ['ANOTAÇÕES:', `${data.prescription.notes}`],
      ['RESULTADOS DE EXAMES:', `${data.prescription.exam_results}`],
      ['DATA DA PRESCRIÇÃO:', `${data.prescription.prescription_date}`],
    ],
  });

  finalY = doc.lastAutoTable.finalY || 10;
  doc.setFontSize(14);
  doc.text('Exames', 105, finalY + 10, { align: 'center' });
  finalY += 20;

  let twoPhoto = 0;
  for (const file of data.files) {
    if (finalY + 100 >= 300) {
      doc.addPage('a4');
      finalY = 10;
    }

    const base64Img = imageToBase64(file.path);
    if (twoPhoto == 1) {
      doc.addImage(base64Img, `${file.type.split('/')[1]}`, 104, finalY, 100, 100);
      finalY += 110;
      twoPhoto = 0;
      continue;
    }
    doc.addImage(base64Img, `${file.type.split('/')[1]}`, 2, finalY, 100, 100);
    twoPhoto++;
  }

  const header = await headerPDF('PRONTUÁRIO');

  const prescriptionDoc = new Uint8Array(doc.output('arraybuffer'));
  const pdfBytes = await mergePDFs([header, prescriptionDoc]);

  fs.writeFileSync(defaultPathSavePDF, pdfBytes);
}
