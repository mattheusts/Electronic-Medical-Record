import * as pdf from 'html-pdf';
import { UserAndPrescriptionAndFiles } from '../util';
import { RenderPDF } from './render';

export async function createPDF(
  userAndPrescriptionAndFiles: UserAndPrescriptionAndFiles,
  path: string
): Promise<void> {
  const html = new RenderPDF(userAndPrescriptionAndFiles);
  pdf
    .create(html.render(), { format: 'A4', type: 'pdf', border: { top: '1in', bottom: '1in' } })
    .toFile(path, (err, pdf) => {
      console.log(`PDFTemplate :: ${pdf}`);
    });
}
