import { getCustomRepository, Repository } from 'typeorm';
import { Prescription } from '../database/models/Prescription';
import { File } from '../database/models/File';
import { FilesRepository } from '../repositories/FilesRepository';

interface IFileCreate {
  id?: string;
  name: string;
  path: string;
  size: number;
  type: string;
  lastModified: number;
  lastModifiedDate: string;
  prescription_id?: string;
  prescription?: Prescription;
  created_at?: Date;
  updated_at?: Date;
}

class FilesService {
  private filesRepository: Repository<File>;

  constructor() {
    this.filesRepository = getCustomRepository(FilesRepository);
  }

  async create(file: IFileCreate): Promise<File> {
    const newFile = this.filesRepository.create(file);
    await this.filesRepository.save(newFile);
    return newFile;
  }

  async findAllByPrescriptionId(prescription_id: string): Promise<File[]> {
    return this.filesRepository.find({ prescription_id });
  }

  async delete(id: string): Promise<void> {
    await this.filesRepository.delete({ id });
  }

  async deleteAllFilesByPrescription(prescription_id: string): Promise<void> {
    await this.filesRepository.delete({ prescription_id: prescription_id });
  }
}

export { FilesService, IFileCreate };
