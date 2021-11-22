import { BrowserWindow } from 'electron';
import { NsisUpdater, UpdateCheckResult } from 'electron-updater';

class AppUpdater {
  private autoUpdater: NsisUpdater;
  private result: UpdateCheckResult;
  private mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;

    const options = {
      provider: 'github',
      owner: 'matthaw',
      repo: 'Electronic-Medical-Record',
    } as any;

    this.autoUpdater = new NsisUpdater(options);
    this.autoUpdater.autoDownload = false;
    this.autoUpdater.autoInstallOnAppQuit = false;
    this.autoUpdater.allowDowngrade = true; // test dev

    this.autoUpdater.logger = require('electron-log');

    // Events
    this.autoUpdater.on('update-downloaded', (info) => {
      this.mainWindow.webContents.send('update-downloaded', info);
    });

    this.autoUpdater.on('update-available', (info) => {
      this.mainWindow.webContents.send('update-available', info);
    });

    this.autoUpdater.on('download-progress', (err, res) => {
      this.mainWindow.webContents.send('download-progress', err, res);
    });
  }

  async checkForUpdatesAndNotify() {
    this.result = await this.autoUpdater.checkForUpdatesAndNotify();
  }

  getUpdater() {
    return this.autoUpdater;
  }

  async downloadUpdate() {
    await this.autoUpdater.downloadUpdate();
  }

  quitAndInstall() {
    this.autoUpdater.quitAndInstall();
  }
}

export { AppUpdater };
