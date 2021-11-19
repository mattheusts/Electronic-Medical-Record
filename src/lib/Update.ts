import { BrowserWindow } from 'electron';
import { NsisUpdater, UpdateCheckResult } from 'electron-updater';

class AppUpdater {
  private autoUpdater: NsisUpdater;
  private sha512: string;
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
    this.autoUpdater.logger = require('electron-log');
  }

  async checkForUpdatesAndNotify() {
    this.result = await this.autoUpdater.checkForUpdatesAndNotify();
  }

  getUpdater() {
    return this.autoUpdater;
  }

  checkForUpdates() {
    return this.autoUpdater.checkForUpdatesAndNotify();
  }

  downloadProgress() {
    this.autoUpdater.on('download-progress', (progress) => {
      this.mainWindow.webContents.send('download-progress', progress);
    });
  }

  checkIsDownloaded() {
    this.autoUpdater.on('update-downloaded', (info) => {
      this.autoUpdater.quitAndInstall();
    });
  }
}

export { AppUpdater };
