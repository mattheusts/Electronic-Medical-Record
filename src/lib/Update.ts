import { NsisUpdater } from 'electron-updater';
// Or MacUpdater, AppImageUpdater

class AppUpdater {
  private autoUpdater: NsisUpdater;

  constructor() {
    const options = {
      provider: 'github',
      owner: 'matthaw',
      repo: 'Electronic-Medical-Record',
    } as any;

    this.autoUpdater = new NsisUpdater(options);
  }

  getUpdater() {
    return this.autoUpdater;
  }

  checkForUpdates() {
    return this.autoUpdater.checkForUpdatesAndNotify();
  }

  downloadProgress(callback: (sender: string, progress: any) => void) {
    this.autoUpdater.on('download-progress', (progress) => {
      callback('download-progress', progress);
    });
  }

  async downloadAndInstall() {
    (await this.autoUpdater.checkForUpdatesAndNotify()).downloadPromise
      .then(() => {
        this.autoUpdater.quitAndInstall();
      })
      .catch((err) => {
        console.error('Não foi possível relizar o download! ' + err.message);
      });
  }
}

export { AppUpdater };
