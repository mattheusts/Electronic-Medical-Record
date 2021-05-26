import { ipcMain } from 'electron';
import { PrescriptionAndPhotos } from '../util';
import { PrescriptionsController } from '../controller/Prescriptions';

const prescriptionController = new PrescriptionsController(global.mainWindow);

// Prescription
ipcMain.on('newPrescriptionInit', async (err, res) => {
  prescriptionController.newPrescriptionInit(err, res);
});

// Save prescription
ipcMain.on('savePrescription', async (err, res: PrescriptionAndPhotos) => {
  await prescriptionController.create(err, res);
});

// Init edit prescription
ipcMain.on('editPrescription', async (err, res) => {
  prescriptionController.editPrescription(err, res);
});

// Edit prescription load
ipcMain.on('InitEditPrescription', async (err, res) => {
  await prescriptionController.InitEditPrescription(err, res);
});

ipcMain.on('load-user-info', async (err, res) => {
  await prescriptionController.userInfo(err, res);
});

ipcMain.on('updatePrescription', async (err, res: PrescriptionAndPhotos) => {
  await prescriptionController.update(err, res);
});

ipcMain.on('deletePrescription', async (err, res: string) => {
  await prescriptionController.delete(err, res);
});
