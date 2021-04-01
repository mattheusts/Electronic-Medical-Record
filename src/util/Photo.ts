import { v4 as uuid } from 'uuid';

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
        id: uuid(),
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
