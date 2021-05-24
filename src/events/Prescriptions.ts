import { ipcMain } from 'electron';
import { PrescriptionAndPhotos } from '../util';
import { PrescriptionsController } from '../controller/Prescriptions';

const prescriptionController = new PrescriptionsController(global.mainWindow);

// Prescription
ipcMain.on('newPrescriptionInit', async (err, id) => {
  prescriptionController.newPrescriptionInit(err, id);
});

// Save prescription
ipcMain.on('savePrescription', async (err, res: PrescriptionAndPhotos) => {
  prescriptionController.create(err, res);
});

// Init edit prescription
ipcMain.on('editPrescription', async (err, res) => {
  prescriptionController.editPrescription(err, res);
});

// Edit prescription load
ipcMain.on('InitEditPrescription', async (err, res) => {
  prescriptionController.InitEditPrescription(err, res);
});
