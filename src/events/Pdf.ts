import { ipcMain } from 'electron';
import { PDFController } from '../controller/Pdf';

const pdfController = new PDFController(global.mainWindow);

ipcMain.on('printPrescription', async (err, res) => {
  await pdfController.printPrescription(err, res);
});
