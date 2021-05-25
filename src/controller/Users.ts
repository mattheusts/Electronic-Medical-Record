import { BrowserWindow, IpcMainEvent } from 'electron';
import * as path from 'path';
import { deleteFile } from '../util/Photo';
import { IUserCreate, IUserUpdate, UsersService } from '../services/UsersService';

class UserController {
  private userService: UsersService;
  private mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.userService = new UsersService();
    this.mainWindow = mainWindow;
  }

  async create(event: IpcMainEvent, res: IUserCreate): Promise<void> {
    await this.userService.create(res);
    this.mainWindow.loadFile(path.join(__dirname, '../../public/search.html'));
  }

  async update(event: IpcMainEvent, user: IUserUpdate): Promise<void> {
    await this.userService.update(user);

    this.mainWindow.loadFile(path.join(__dirname, '../../public/search.html'));
  }

  async delete(event: IpcMainEvent, id: string): Promise<void> {
    const all = await this.userService.findOneAllCascade(id);
    await this.userService.deleteAllCascade(id);

    const allFiles = [];
    all.prescriptions.forEach((prescription) => allFiles.push(...prescription.files));

    allFiles.forEach(async (file) => await deleteFile(file.path));

    this.mainWindow.loadFile(path.join(__dirname, '../../public/search.html'));
  }

  async initUserInfo(event: IpcMainEvent, id: string): Promise<void> {
    this.mainWindow.loadFile(path.join(__dirname, '../../public/user.html'), {
      query: { id },
    });
  }

  async editUser(event: IpcMainEvent, id: string): Promise<void> {
    this.mainWindow.loadFile(path.join(__dirname, '../../public/edit.html'), {
      query: { id },
    });
  }

  async editUserInfo(event: IpcMainEvent, user_id: string): Promise<void> {
    console.log('dit');

    const user = await this.userService.findOne(user_id);
    this.mainWindow.webContents.send('editUserInfo', user);
  }

  async userInfo(event: IpcMainEvent, user_id: string): Promise<void> {
    const user = await this.userService.findOne(user_id);

    this.mainWindow.webContents.send('userInfo', user);
  }
}

export { UserController };
