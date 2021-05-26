import { v4 as uuid } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';
import { Prescription } from '../database/models/Prescription';
import { IFileCreate } from '../services/FilesService';

export interface PhotoInfo {
  id?: string;
  name: string;
  path: string;
  size: number;
  type: string;
  prescription_id?: string;
  lastModified: number;
  lastModifiedDate: string;
  created_at?: Date;
  updated_at?: Date;
}

export async function deleteFile(path: string): Promise<void> {
  fs.unlinkSync(path);
}

export async function preparingFiles(
  basePath: string,
  fileList: IFileCreate[],
  prescription: Prescription
): Promise<IFileCreate[]> {
  const defaultPath = path.join(basePath, 'images');

  // Create defaultPath case not is exists
  try {
    if (!fs.existsSync(defaultPath)) {
      fs.mkdirSync(defaultPath);
    }
  } catch (err) {
    console.log(`Error :: saveLocalFileList :: ${err}`);
  }

  fileList.forEach((file) => {
    const splitName = file.name.split('.');
    const newPath = path.join(defaultPath, `${file.id}.${splitName[splitName.length - 1]}`);

    if (newPath != file.path) fs.copyFileSync(file.path, newPath);

    file.prescription_id = prescription.id;
    file.prescription = prescription;
    file.path = newPath;
  });

  return fileList;
}

export async function fileUpdate(
  oldFiles: IFileCreate[],
  newFiles: IFileCreate[]
): Promise<IFileCreate[]> {
  const files = [];

  oldFiles.forEach(async (oFile) => {
    const findOldFile = newFiles.find((nFile) => nFile.id === oFile.id);
    if (!findOldFile) {
      deleteFile(oFile.path);
    }
  });

  newFiles.forEach(async (file) => {
    if (path.dirname(file.path) !== global.DEFAULT_SAVE_IMAGES) {
      const splitName = file.name.split('.');
      const newPath = path.join(
        global.DEFAULT_SAVE_IMAGES,
        `${file.id}.${splitName[splitName.length - 1]}`
      );
      fs.copyFileSync(file.path, newPath);
      file.path = newPath;
    }
  });

  files.push(...newFiles);

  return files;
}

export class PhotoUpload {
  fileList: Array<PhotoInfo> = [];

  public removeFileByName(name: string): void {
    this.fileList = this.fileList.filter((file) => {
      return file.name !== name;
    });
  }

  public addFile(photoList: PhotoInfo[]): void {
    for (const file of photoList) {
      this.fileList.push({
        id: file.id || uuid(),
        name: file.name,
        path: file.path,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        lastModifiedDate: file.lastModifiedDate,
      });
    }
  }

  public getAllFiles(): PhotoInfo[] {
    return this.fileList;
  }

  public render(): HTMLElement {
    const divFather = document.createElement('div') as HTMLElement;
    divFather.className = 'row text-center text-lg-left';

    for (const file of this.fileList) {
      const div1 = document.createElement('div') as HTMLElement;
      div1.className = 'col-lg-3 col-md-4 col-6';

      const div2 = document.createElement('div') as HTMLElement;
      div2.className = 'hovereffect';

      const img = document.createElement('img') as HTMLElement;
      img.className = 'img-fluid img-thumbnail';
      img.setAttribute('src', file.path);

      const div3 = document.createElement('div') as HTMLElement;
      div3.className = 'overlay';

      const h2 = document.createElement('h2') as HTMLElement;
      h2.innerHTML = 'Deseja deletar essa foto?';

      const linkDelete = document.createElement('a') as HTMLElement;
      linkDelete.className = 'info';
      linkDelete.innerText = 'Deletar';
      linkDelete.setAttribute('onClick', `deleteFile('${file.name}')`);

      div3.appendChild(h2);
      div3.appendChild(linkDelete);

      div2.appendChild(img);
      div2.appendChild(div3);

      div1.appendChild(div2);

      divFather.appendChild(div1);
    }

    return divFather;
  }
}
