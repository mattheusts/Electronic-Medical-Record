import { app, BrowserWindow, ipcMain, screen } from 'electron';
import * as path from 'path';
import 'reflect-metadata';
import { initDB } from './database';
import { setDefaultPath } from './util';

setDefaultPath();

// Object.defineProperty(app, 'isPackaged', {
//   get() {
//     return true;
//   },
// });

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('electron-reload')(['index.html', 'search.html']);
let mainWindow: BrowserWindow = null;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    height: height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
    width: width,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../public/search.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

app.on('ready', () => {
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

(async () => {
  initDB().then(async () => {
    global.mainWindow = mainWindow;

    require('./events/Search');
    require('./events/User');
    require('./events/Prescriptions');
    require('./events/Pdf');
    require('./events/Update');
  });
})();

// Global events

ipcMain.on('back-to-search', (err) => {
  mainWindow.webContents.goBack();
});
