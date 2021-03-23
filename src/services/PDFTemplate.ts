import * as fs from 'fs';
import * as PDFDocument from 'pdfkit';

function createPDF(data: any, path: string) {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 50,
  });

  generateHeader(doc, data);
  generatedataTable(doc, data);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc: PDFKit.PDFDocument, data: any) {
  doc
    .fillColor('#444444')
    .fontSize(20)
    .text('PRONTUÁRIO', { align: 'center' })
    .fontSize(10)
    .text(`Nome: ${data.person.name}`, 50, 100, { align: 'left' })
    .text(`DATA DE NASC: ${data.person.birth}`, 50, 120, { align: 'left' })
    .text(`SEXO: ${data.person.sex}`, 220, 120, { align: 'left' })
    .text(`Naturalidade: ${data.person.natureless}`, 320, 120, {
      align: 'left',
    })
    .text(`MÃE: ${data.person.mother}`, 50, 140, { align: 'left' })
    .text(`PAI:   ${data.person.dad}`, 50, 160, { align: 'left' })
    .moveDown();
}

function generatedataTable(doc: PDFKit.PDFDocument, data: any) {
  let i;
  const dataTableTop = 200;

  doc.font('Helvetica-Bold');
  generateTableRow(doc, dataTableTop);
  generateHr(doc, dataTableTop + 20);
  doc.font('Helvetica');

  for (i = 0; i < data.items.length; i++) {
    const item = data.items[i];
    const position = dataTableTop + (i + 1) * 30;
    generateTableRow(doc, position, item.date, item.prescription);

    generateHr(doc, position + 20);
  }
}

function generateTableRow(
  doc: PDFKit.PDFDocument,
  y: number,
  date?: string,
  prescription?: string
) {
  doc.fontSize(10).text(date, 50, y).text(prescription, 150, y);
}

function generateHr(doc: PDFKit.PDFDocument, y: number) {
  doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

export default createPDF;
