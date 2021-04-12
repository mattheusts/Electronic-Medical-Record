import { app, BrowserWindow, ipcMain, screen } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import 'reflect-metadata'; // Required by TypoORM.
import Database from './database';
import { Search } from './database/search';
import {
  PrescriptionAndPhotos,
  UserAndPrescription,
  UserAndPrescriptionAndFiles,
  UserAndPrescriptions,
} from './util';
import { User } from './database/models/User';
import createPDF from './services/PDFTemplate';
import { deleteFile, saveLocalFileList } from './util/Photo';

let DEFAULT_PATH = '';

if (!fs.existsSync(path.join(app.getPath('userData'), 'electronic-medical-record'))) {
  fs.mkdirSync(path.join(app.getPath('userData'), 'electronic-medical-record'));
  DEFAULT_PATH = path.join(app.getPath('userData'), 'electronic-medical-record');
} else {
  DEFAULT_PATH = path.join(app.getPath('userData'), 'electronic-medical-record');
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('electron-reload')(['index.html', 'search.html']);
let mainWindow: BrowserWindow = null;
function createWindow() {
  // Create the browser window.
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
    width: width,
  });

  // global.database = new Database();

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../public/search.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const database: Database = new Database();

ipcMain.on('form-data', async (err, result: User) => {
  await database.insertUser(result);
  mainWindow.loadFile(path.join(__dirname, '../public/search.html'));
});

// Search page events

const search = new Search();

ipcMain.on('init', async () => {
  const users = await database.getAllUsers();
  const userSearch = await search.searchAll(users);
  mainWindow.webContents.send('searchAll', userSearch);
});

ipcMain.on('searchByName', async (err, res) => {
  const users = await database.searchByName(res);
  const userSearch = await search.searchAll(users);

  mainWindow.webContents.send('searchAll', userSearch);
});

// User info

ipcMain.on('initUserInfo', async (err, res) => {
  // send id to edit page
  mainWindow.loadFile(path.join(__dirname, '../public/user.html'), {
    query: { id: res },
  });
});

ipcMain.on('userInfoID', async (err, res) => {
  const user = await database.getUser(res);
  const prescription = await database.getFristPrescriptionByUserId(user.id);
  const userAndPrescriptions: UserAndPrescription = {
    ...user,
    prescription: prescription,
  };

  mainWindow.webContents.send('userInfo', userAndPrescriptions);
});

// Edit User

ipcMain.on('editUser', async (err, res) => {
  // send id to edit page
  mainWindow.loadFile(path.join(__dirname, '../public/edit.html'), {
    query: { id: res },
  });
});

ipcMain.on('editInit', async (err, res) => {
  const user = await database.getUser(res);

  mainWindow.webContents.send('editUserInfo', user);
});

ipcMain.on('updateUser', async (err, res: User) => {
  await database.updateUser(res);
  mainWindow.loadFile(path.join(__dirname, '../public/search.html'));
});

// Prescription

ipcMain.on('newPrescriptionInit', async (err, res) => {
  mainWindow.loadFile(path.join(__dirname, '../public/prescription.html'), {
    query: { id: res },
  });
});

ipcMain.on('sendPrescriptions', async (err, res) => {
  const user = await database.getUser(res);
  const prescriptions = await database.getAllPrescriptionByUserId(user.id);

  const userAndPrescriptions: UserAndPrescriptions = {
    ...user,
    prescriptions: prescriptions,
  };

  mainWindow.webContents.send('newPrescriptions', userAndPrescriptions);
});

ipcMain.on('savePrescription', async (err, res: PrescriptionAndPhotos) => {
  const prescription = await database.insertPrescription(res.prescription);

  const files = res.files.map((file) => {
    return {
      ...file,
      prescription_id: prescription.id,
    };
  });

  await saveLocalFileList(DEFAULT_PATH, files);

  files.map(async (file) => {
    const splitName = file.name.split('.');
    await database.insertFile({
      ...file,
      path: path.join(
        path.join(DEFAULT_PATH, 'images'),
        `${file.id}.${splitName[splitName.length - 1]}`
      ),
    });
  });

  mainWindow.loadFile(path.join(__dirname, '../public/user.html'), {
    query: { id: res.prescription.user_id },
  });
});

ipcMain.on('editPrescription', async (err, res: any) => {
  mainWindow.loadFile(path.join(__dirname, '../public/editPrescription.html'), {
    query: {
      user_id: res.user_id,
      prescription_id: res.prescription_id,
    },
  });
});

ipcMain.on('InitEditPrescription', async (err, res) => {
  const user = await database.getUser(res.user_id);
  const prescription = await database.getPrescription(res.prescription_id);
  const files = await database.getAllFilesByPrescriptionId(prescription.id);

  const userAndPrescription: UserAndPrescriptionAndFiles = {
    ...user,
    prescription: prescription,
    files: files,
  };

  mainWindow.webContents.send('LoadEditPrescription', userAndPrescription);
});

ipcMain.on('updatePrescription', async (error, res: UserAndPrescriptionAndFiles) => {
  await database.updatePrescription(res.prescription);
  await database.deleteAllFilesByPrescriptionId(res.prescription.id);
  res.files.map(async (file) => {
    file.prescription_id = res.prescription.id;
    await database.updateFile(file);
  });

  mainWindow.loadFile(path.join(__dirname, '../public/user.html'), {
    query: { id: res.prescription.user_id },
  });
});

//  print pdf

ipcMain.on('printPDF', async (err, res: string) => {
  mainWindow.loadFile(path.join(__dirname, '../public/pdf.html'));

  const user = await database.getUser(res);
  const prescriptions = await database.getAllPrescriptionByUserId(user.id);

  const items = [];
  let count = 0;
  for (const p of prescriptions) {
    items.push({
      date: p.prescription_date,
      prescription: p.prescription,
    });
    count++;
  }

  for (; count <= 15; count++) {
    items.push({
      date: '',
      prescriptions: '',
    });
  }

  const data = {
    person: {
      name: user.name,
      birth: user.birth,
      sex: user.sex,
      natureless: user.naturalness,
      mother: user.mother,
      dad: user.dad,
    },

    items: items,
  };

  const defaultSavePDF = path.join(
    DEFAULT_PATH,
    data.person.name.split(' ').join('-').concat('.pdf')
  );

  createPDF(data, defaultSavePDF);

  setTimeout(() => {
    mainWindow.webContents.send('showPDF', defaultSavePDF);
  }, 500);
});

ipcMain.on('deleteUser', async (err, res: string) => {
  const fristPrescript = await database.getFristPrescriptionByUserId(res);
  await database.deleteUserAndPrescription(res);

  const allFiles = await database.getAllFilesByPrescriptionId(fristPrescript.id);
  allFiles.map(async (file) => {
    await database.deleteFile(file.id);
    await deleteFile(file.path);
  });
  mainWindow.loadFile(path.join(__dirname, '../public/search.html'));
});

// Delete Prescription

ipcMain.on('deletePrescription', async (err, res: string) => {
  const prescription = await database.getPrescription(res);
  await database.deletePrescription(prescription.id);

  const allFiles = await database.getAllFilesByPrescriptionId(res);
  allFiles.map(async (file) => {
    await database.deleteFile(file.id);
    await deleteFile(file.path);
  });

  mainWindow.loadFile(path.join(__dirname, '../public/prescription.html'), {
    query: { id: prescription.user_id },
  });
});
