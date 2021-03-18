import Database from '../database';

declare global {
  namespace NodeJS {
    interface Global {
      database: Database;
    }
  }
}
