import { BrowserWindow, IpcMainEvent } from 'electron';
import { UsersService } from '../services/UsersService';

class SearchController {
  private userService: UsersService;
  private mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.userService = new UsersService();
    this.mainWindow = mainWindow;
  }
  async init(): Promise<void> {
    const users = await this.userService.findAll();
    this.mainWindow.webContents.send('searchAll', users);
  }

  async searchByName(err: IpcMainEvent, res: string): Promise<void> {
    const users = await this.userService.findByName(res);
    this.mainWindow.webContents.send('searchAll', users);
  }
}

export { SearchController };
