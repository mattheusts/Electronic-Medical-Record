import { ipcRenderer } from 'electron';
import { IPrescriptionCreate } from '../services/PrescriptionsService';
import { IFileCreate } from '../services/FilesService';
import {
  PrescriptionAndPhotos,
  UserAndPrescriptionAndFiles,
  UserAndPrescriptions,
} from '../util';
import { PhotoUpload } from '../util/Photo';
import { inputFields } from './prescriptionsFields';

export const photosUpload = new PhotoUpload();

let user_id = '';
let prescription_id = '';

window.onload = () => {
  const query = window.location.search.split('=');

  user_id = query[1].split('&')[0];
  prescription_id = query[2];

  if (prescription_id && user_id) {
    ipcRenderer.send('InitEditPrescription', { user_id, prescription_id });
  } else {
    ipcRenderer.send('load-user-info', user_id);
  }
};

document.addEventListener('click', function (event: any) {
  if (
    event.target.id === 'save_and_print' ||
    event.target.id === 'save_prescriptions'
  ) {
    event.preventDefault();

    const inputData = inputFields();
    const prescriptionValues = {};
    Object.entries(inputData).forEach(([key, value]) => {
      prescriptionValues[key] =
        value.type === 'checkbox' ? value.checked : value.value;
    });

    const res: PrescriptionAndPhotos = {
      prescription: {
        ...(<IPrescriptionCreate>prescriptionValues),
        user_id: user_id,
      },

      files: photosUpload.getAllFiles(),
    };

    if (event.target.id === 'save_prescriptions') {
      if (prescription_id) {
        res.prescription.id = prescription_id;
        ipcRenderer.send('updatePrescription', res);
      }
      if (!prescription_id) ipcRenderer.send('savePrescription', res);
    } else if (event.target.id === 'save_and_print') {
      ipcRenderer.send('savePrescriptionAndPrint', res);
    }
  }
});

// render data prescription
const gallery = document.getElementById('march_gallery') as HTMLElement;
ipcRenderer.on(
  'LoadEditPrescription',
  (error, userAndPrescriptionAndFiles: UserAndPrescriptionAndFiles) => {
    setUserInfo({
      name: userAndPrescriptionAndFiles.name,
      birth: userAndPrescriptionAndFiles.birth,
    });

    const inputValues = inputFields();

    Object.entries(userAndPrescriptionAndFiles.prescription).forEach(
      ([key, value]) => {
        if (typeof value === 'boolean') inputValues[key].checked = value;

        if (typeof value === 'string') {
          if (inputValues[key] !== undefined) inputValues[key].value = value;
        }
      }
    );

    photosUpload.addFile(userAndPrescriptionAndFiles.files);
    gallery.appendChild(photosUpload.render());
  }
);

// Gallery
const marcha_files = document.getElementById(
  'marcha_files'
) as HTMLInputElement;

marcha_files.onchange = function () {
  gallery.innerHTML = '';

  const fileList = Array.from(marcha_files.files);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const files: IFileCreate[] = fileList.map((file: any) => {
    return {
      name: file.name,
      path: file.path,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
    };
  });

  photosUpload.addFile(files);

  gallery.appendChild(photosUpload.render());
};

export function deleteFile(name: string): void {
  const gallery = document.getElementById('march_gallery') as HTMLElement;
  gallery.innerHTML = '';

  photosUpload.removeFileByName(name);

  gallery.appendChild(photosUpload.render());
}

ipcRenderer.on(
  'newPrescriptions',
  (event, userAndPrescriptions: UserAndPrescriptions) => {
    setUserInfo({
      name: userAndPrescriptions.name,
      birth: userAndPrescriptions.birth,
    });
  }
);

function setUserInfo({ name, birth }) {
  const nameInput = document.getElementById('name') as HTMLElement;
  const birthInput = document.getElementById('birth') as HTMLElement;

  nameInput.textContent = name;
  birthInput.textContent = birth;
}

const backButton = document.getElementsByClassName('back-icon');
backButton.item(0).addEventListener('click', () => {
  ipcRenderer.send('back-to-search');
});
