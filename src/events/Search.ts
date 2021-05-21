import { ipcMain } from 'electron';
import { SearchController } from '../controller/Searchs';

const searchController = new SearchController(global.mainWindow);

// Search All users
ipcMain.on('init', async () => {
  searchController.init();
});

// Search users by name
ipcMain.on('searchByName', async (err, res) => {
  searchController.searchByName(err, res);
});
