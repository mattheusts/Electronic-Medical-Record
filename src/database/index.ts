import { app } from 'electron';
import { createConnection } from 'typeorm';
import * as path from 'path';
import { Prescription } from './models/Prescription';
import { User } from './models/User';
import { File } from './models/File';

async function initDB(): Promise<void> {
  await createConnection({
    type: 'sqlite',
    database: path.join(
      path.join(app.getPath('userData'), 'electronic-medical-record'),
      'Electronic-Medical-Record.sqlite'
    ),
    entities: [User, Prescription, File],
    synchronize: true,
  });
}

export { initDB };
