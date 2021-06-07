import { BrowserWindow, IpcMainEvent } from 'electron';
import * as path from 'path';
import { PrescriptionAndPhotos, UserAndPrescriptionAndFiles, UserAndPrescriptions } from '../util';
import { IPrescriptionCreate, PrescriptionService } from '../services/PrescriptionsService';
import { UsersService } from '../services/UsersService';
import { deleteFile, fileUpdate, preparingFiles } from '../util/Photo';
import { FilesService } from '../services/FilesService';

class PrescriptionsController {
  private prescriptionsService: PrescriptionService;
  private usersService: UsersService;
  private filesService: FilesService;
  private mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
    this.prescriptionsService = new PrescriptionService();
    this.usersService = new UsersService();
    this.filesService = new FilesService();
  }

  async create(err: IpcMainEvent, res: PrescriptionAndPhotos): Promise<void> {
    res.prescription.user = await this.usersService.findOne(res.prescription.user_id);

    const prescription = new PrescriptionService();
    const newPrescription = await prescription.create(res.prescription);

    const files = await preparingFiles(global.DEFAULT_SAVE_PATH, res.files, newPrescription);

    const fileService: FilesService = new FilesService();
    files.forEach((file) => {
      fileService.create({ ...file });
    });

    this.mainWindow.loadFile(path.join(__dirname, '../../public/user.html'), {
      query: { id: res.prescription.user_id },
    });
  }

  async update(err: IpcMainEvent, res: PrescriptionAndPhotos): Promise<void> {
    const user = await this.usersService.findOne(res.prescription.user_id);
    res.prescription.user = user;
    await this.prescriptionsService.update(res.prescription);

    const oldFiles = await this.filesService.findAllByPrescriptionId(res.prescription.id);
    await this.filesService.deleteAllFilesByPrescription(res.prescription.id);

    const newFiles = await fileUpdate(oldFiles, res.files);

    delete res.prescription.user;
    newFiles.forEach(async (file) => {
      file.prescription_id = res.prescription.id;
      file.prescription = res.prescription;
      await this.filesService.create(file);
    });

    this.mainWindow.loadFile(path.join(__dirname, '../../public/user.html'), {
      query: { id: res.prescription.user_id },
    });
  }

  async delete(err: IpcMainEvent, id: string): Promise<void> {
    const prescription = await this.prescriptionsService.findOne(id);
    const allFiles = await this.filesService.findAllByPrescriptionId(id);

    await this.prescriptionsService.delete(prescription.id);

    allFiles.map(async (file) => {
      await deleteFile(file.path);
    });

    this.mainWindow.loadFile(path.join(__dirname, '../../public/user.html'), {
      query: { id: prescription.user_id },
    });
  }

  async userInfo(err: IpcMainEvent, id: string): Promise<void> {
    const user = await this.usersService.findOne(id);

    const userAndPrescriptions: UserAndPrescriptions = {
      ...user,
      prescriptions: user.prescriptions,
    };

    this.mainWindow.webContents.send('newPrescriptions', userAndPrescriptions);
  }

  newPrescriptionInit(err: IpcMainEvent, id: string): void {
    this.mainWindow.loadFile(path.join(__dirname, '../../public/prescription.html'), {
      query: { id },
    });
  }

  editPrescription(err: IpcMainEvent, res: any): void {
    this.mainWindow.loadFile(path.join(__dirname, '../../public/prescription.html'), {
      query: {
        user_id: res.user_id,
        prescription_id: res.prescription_id,
      },
    });
  }

  async InitEditPrescription(err: IpcMainEvent, res): Promise<void> {
    const user = await this.usersService.findOne(res.user_id);
    const prescription = await this.prescriptionsService.findOne(res.prescription_id, [
      'user',
      'files',
    ]);

    const userAndPrescription: UserAndPrescriptionAndFiles = {
      ...user,
      prescription: <IPrescriptionCreate>prescription,
      files: prescription.files,
    };

    this.mainWindow.webContents.send('LoadEditPrescription', userAndPrescription);
  }
}

export { PrescriptionsController };
