import { BrowserWindow, IpcMainEvent } from 'electron';
import {
  layoutMultilineText,
  PDFDocument,
  StandardFonts,
  TextAlignment,
} from 'pdf-lib';
import jsPDF from 'jspdf';
import * as path from 'path';
import * as fs from 'fs';

import { UsersService } from '../services/UsersService';
import { PrescriptionService } from '../services/PrescriptionsService';
import { imageToBase64, jsPDFWithPlugin } from '../util';
import { printAllPrescription } from '../lib/PDFCreator';

class PDFController {
  private prescriptionsService: PrescriptionService;
  private usersService: UsersService;

  private mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.prescriptionsService = new PrescriptionService();
    this.usersService = new UsersService();

    this.mainWindow = mainWindow;
  }

  async printPrescription(err: IpcMainEvent, id: string): Promise<void> {
    const prescription = await this.prescriptionsService.findOne(id);

    const loadBasePdf = fs.readFileSync(
      path.join(__dirname, '../../public/pdf/base.pdf')
    );
    const pdfDoc = await PDFDocument.load(loadBasePdf);
    const pages = pdfDoc.getPages();

    const { width, height } = pages[0].getSize();

    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    let startingPositon = 550;

    const multiText = layoutMultilineText(prescription.prescription, {
      alignment: TextAlignment.Center,
      font: timesRomanFont,
      fontSize: 12,
      bounds: {
        x: width / 2 - 170,
        y: startingPositon,
        width: 400,
        height: 16,
      },
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
      `Prescrição feita em: ${date.toLocaleDateString('pt-br', {
        dateStyle: 'long',
      } as unknown)}`,
      {
        y: startingPositon - 40,
        x: width / 2 - 200,
        size: 14,
      }
    );

    const pdfBytes = await pdfDoc.save();

    const defaultPathSavePDF = path.join(
      global.DEFAULT_SAVE_PATH,
      prescription.id.concat('.pdf')
    );

    fs.writeFileSync(defaultPathSavePDF, pdfBytes);

    this.mainWindow.loadFile(path.join(__dirname, '../../public/pdf.html'));

    setTimeout(() => {
      this.mainWindow.webContents.send('showPDF', defaultPathSavePDF);
    }, 500);
  }

  async printRequestedExams(err: IpcMainEvent, id: string): Promise<void> {
    const prescription = await this.prescriptionsService.findOne(id, ['files']);

    const doc = new jsPDF() as jsPDFWithPlugin;

    let finalY = doc.lastAutoTable.finalY || 10;

    let twoPhoto = 0;
    for (const file of prescription.files) {
      if (finalY + 100 >= 300) {
        doc.addPage('a4');
        finalY = 10;
      }

      const base64Img = imageToBase64(file.path);
      if (twoPhoto == 1) {
        doc.addImage(
          base64Img,
          `${file.type.split('/')[1]}`,
          104,
          finalY,
          100,
          100
        );
        finalY += 110;
        twoPhoto = 0;
        continue;
      }
      doc.addImage(
        base64Img,
        `${file.type.split('/')[1]}`,
        2,
        finalY,
        100,
        100
      );
      twoPhoto++;
    }

    const defaultPathSavePDF = path.join(
      global.DEFAULT_SAVE_PATH,
      prescription.id.concat('.pdf')
    );

    doc.save(defaultPathSavePDF);

    this.mainWindow.loadFile(path.join(__dirname, '../../public/pdf.html'));

    setTimeout(() => {
      this.mainWindow.webContents.send('showPDF', defaultPathSavePDF);
    }, 500);
  }

  async printMedicalRecord(err: IpcMainEvent, id: string): Promise<void> {
    const data = await this.prescriptionsService.findOne(id, ['user', 'files']);

    const defaultPathSavePDF = path.join(
      global.DEFAULT_SAVE_PATH,
      data.id.concat('.pdf')
    );

    printAllPrescription(
      { ...data.user, prescription: data, files: data.files },
      defaultPathSavePDF
    );

    this.mainWindow.loadFile(path.join(__dirname, '../../public/pdf.html'));

    setTimeout(() => {
      this.mainWindow.webContents.send('showPDF', defaultPathSavePDF);
    }, 500);
  }
}

export { PDFController };
