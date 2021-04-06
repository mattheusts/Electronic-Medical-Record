import { app, BrowserWindow, ipcMain, screen } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import 'reflect-metadata'; // Required by TypoORM.
import Database from './database';
import { Search } from './database/search';
import { UserAndPrescription, UserAndPrescriptions } from './util';
import { Render } from './page/render';
import { User } from './database/models/User';
import { Prescription } from './database/models/Prescription';
import createPDF from './services/PDFTemplate';

let DEFAULT_PATH = '';

if (
  !fs.existsSync(
    path.join(app.getPath('userData'), 'electronic-medical-record')
  )
) {
  fs.mkdirSync(path.join(app.getPath('userData'), 'electronic-medical-record'));
  DEFAULT_PATH = path.join(
    app.getPath('userData'),
    'electronic-medical-record'
  );
} else {
  DEFAULT_PATH = path.join(
    app.getPath('userData'),
    'electronic-medical-record'
  );
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

ipcMain.on('init', async (err, res) => {
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
  const newUser = await database.updateUser(res);
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

ipcMain.on('savePrescription', async (err, res: Prescription) => {
  // const prescription = await database
  //   .insertPrescription(..res);

  mainWindow.loadFile(path.join(__dirname, '../public/user.html'), {
    query: { id: res.user_id },
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
  await database.deleteUserAndPrescription(res);
  mainWindow.loadFile(path.join(__dirname, '../public/search.html'));
});
