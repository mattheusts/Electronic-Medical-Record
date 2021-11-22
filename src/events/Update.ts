import { ipcMain } from 'electron';
import { AppUpdater } from '../controller/Update';

const appUpdater = new AppUpdater(global.mainWindow);
appUpdater.checkForUpdatesAndNotify();

ipcMain.on('download', async () => {
  await appUpdater.downloadUpdate();
});

ipcMain.on('quit-and-install', () => {
  appUpdater.quitAndInstall();
});
