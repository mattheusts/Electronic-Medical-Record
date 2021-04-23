import { v4 as uuid } from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

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

export async function saveLocalFileList(basePath: string, photoList: PhotoInfo[]): Promise<void> {
  const defaultPath = path.join(basePath, 'images');
  try {
    const exists = fs.existsSync(defaultPath);
    if (!exists) {
      fs.mkdirSync(defaultPath);
    }
    photoList.map((file) => {
      const splitName = file.name.split('.');
      fs.copyFileSync(
        file.path,
        path.join(defaultPath, `${file.id}.${splitName[splitName.length - 1]}`)
      );
    });
  } catch (err) {
    console.log(`Error :: saveLocalFileList :: ${err}`);
  }
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
