import { BrowserWindow, IpcMainEvent } from 'electron';
import { layoutMultilineText, PDFDocument, StandardFonts, TextAlignment } from 'pdf-lib';
import * as path from 'path';
import * as fs from 'fs';
import { FilesService } from '../services/FilesService';
import { UsersService } from '../services/UsersService';
import { PrescriptionService } from '../services/PrescriptionsService';

class PDFController {
  private filesService: FilesService;
  private prescriptionsService: PrescriptionService;
  private usersService: UsersService;

  private mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.filesService = new FilesService();
    this.prescriptionsService = new PrescriptionService();
    this.usersService = new UsersService();

    this.mainWindow = mainWindow;
  }

  async printPrescription(err: IpcMainEvent, id: string): Promise<void> {
    const prescription = await this.prescriptionsService.findOne(id);

    const loadBasePdf = fs.readFileSync(path.join(__dirname, '../../public/pdf/base.pdf'));
    const pdfDoc = await PDFDocument.load(loadBasePdf);
    const pages = pdfDoc.getPages();

    const { width, height } = pages[0].getSize();

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    let startingPositon = 550;

    const multiText = layoutMultilineText(prescription.prescription, {
      alignment: TextAlignment.Center,
      font: timesRomanFont,
      fontSize: 12,
      bounds: { x: width / 2 - 170, y: startingPositon, width: 400, height: 16 },
    });

    for (let i = 0; i < multiText.lines.length; i++) {
      pages[0].drawText(`${multiText.lines[i].text}`, {
        y: startingPositon,
        x: width / 2 - 200,
        size: 12,
        font: timesRomanFont,
      });

      startingPositon -= 20;
    }

    const date = new Date(prescription.created_at);

    pages[0].drawText(
      `Prescrição feita em: ${date.toLocaleDateString('pt-br', { dateStyle: 'long' })}`,
      {
        y: startingPositon - 40,
        x: width / 2 - 200,
        size: 14,
      }
    );

    const pdfBytes = await pdfDoc.save();

    const defaultPathSavePDF = path.join(global.DEFAULT_SAVE_PATH, prescription.id.concat('.pdf'));

    fs.writeFileSync(defaultPathSavePDF, pdfBytes);

    this.mainWindow.loadFile(path.join(__dirname, '../../public/pdf.html'));

    setTimeout(() => {
      this.mainWindow.webContents.send('showPDF', defaultPathSavePDF);
    }, 500);
  }
}

export { PDFController };
