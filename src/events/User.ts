import { ipcMain } from 'electron';
import { IUserCreate, IUserUpdate } from '../services/UsersService';
import { UserController } from '../controller/Users';

const userController = new UserController(global.mainWindow);

// Create User
ipcMain.on('form-data', async (event, data: IUserCreate) => {
  await userController.create(event, data);
});

// User info
ipcMain.on('initUserInfo', async (err, id) => {
  await userController.initUserInfo(err, id);
});

// Send data to user info page
ipcMain.on('userInfoID', async (err, user_id: string) => {
  await userController.userInfo(err, user_id);
});

ipcMain.on('editInit', async (err, id) => {
  await userController.editUserInfo(err, id);
});

// Edit User
ipcMain.on('editUser', async (err, id) => {
  await userController.editUser(err, id);
});

ipcMain.on('updateUser', async (err, user: IUserUpdate) => {
  await userController.update(err, user);
});
