import { BrowserWindow } from 'electron';
import Database from '../database';

declare global {
  namespace NodeJS {
    interface Global {
      database: Database;
      mainWindow: BrowserWindow;
      DEFAULT_SAVE_PATH: string;
    }
  }
}
