import { ipcRenderer } from 'electron';
import { Prescription } from '../database/models/Prescription';
import { UserAndPrescriptions } from '../util';
import { PhotoUpload, PhotoInfo } from '../util/Photo';

export const photosUpload = new PhotoUpload();

let id = '';
const name = document.getElementById('name') as HTMLElement;
const birth = document.getElementById('birth') as HTMLElement;
const oldPrescriptions = document.getElementById(
  'old_prescriptions'
) as HTMLElement;
const savePrescriptions = document.getElementById(
  'save_prescriptions'
) as HTMLElement;

window.onload = () => {
  id = window.location.search.split('=')[1];
  ipcRenderer.send('sendPrescriptions', id);
};

savePrescriptions.addEventListener('click', function (event: Event) {
  event.preventDefault();
  const main_complaint = document.getElementById(
    'main_complaint'
  ) as HTMLInputElement;
  const history_current = document.getElementById(
    'history_current'
  ) as HTMLInputElement;
  const cardiovascular_system = document.getElementById(
    'cardiovascular_system'
  ) as HTMLInputElement;
  const blood_pressure = document.getElementById(
    'blood_pressure'
  ) as HTMLInputElement;
  const heart_rate = document.getElementById('heart_rate') as HTMLInputElement;
  const respiratory_system = document.getElementById(
    'respiratory_system'
  ) as HTMLInputElement;
  const adb = document.getElementById('adb') as HTMLInputElement;
  const previous_pathological_history = document.getElementById(
    'previous_pathological_history'
  ) as HTMLInputElement;
  const neurological_examination = document.getElementById(
    'neurological_examination'
  ) as HTMLInputElement;
  const family_history = document.getElementById(
    'family_history'
  ) as HTMLInputElement;
  const social_history = document.getElementById(
    'social_history'
  ) as HTMLInputElement;
  const physiological_history = document.getElementById(
    'physiological_history'
  ) as HTMLInputElement;

  const prescriptionDate = document.getElementById(
    'prescription_date'
  ) as HTMLInputElement;
  const prescription = document.getElementById(
    'prescription'
  ) as HTMLInputElement;

  const res: Prescription = {
    main_complaint: main_complaint.value,
    history_current: history_current.value,
    cardiovascular_system: cardiovascular_system.value,
    blood_pressure: blood_pressure.value,
    heart_rate: heart_rate.value,
    respiratory_system: respiratory_system.value,
    adb: adb.value,
    previous_pathological_history: previous_pathological_history.value,
    neurological_examination: neurological_examination.value,
    family_history: family_history.value,
    social_history: social_history.value,
    physiological_history: physiological_history.value,
    prescription_date: prescriptionDate.value,
    prescription: prescription.value,
    user_id: id,
  };

  ipcRenderer.send('savePrescription', res);
});

ipcRenderer.on(
  'newPrescriptions',
  (event, userAndPrescription: UserAndPrescriptions) => {
    name.innerText = userAndPrescription.name;
    birth.innerText = userAndPrescription.birth;

    if (userAndPrescription.prescriptions == []) {
      const render = document.createElement('h6');
      render.className = 'f-w-400';
      render.innerText = 'Nenhuma prescrição feita';
      oldPrescriptions.appendChild(render);
    } else {
      const root = document.getElementById('old_prescriptions');

      for (const prescription of userAndPrescription.prescriptions) {
        const render = document.createElement('div');

        const prescriptionElement = document.createElement('p');
        prescriptionElement.className = 'm-b-10 f-w-600';
        prescriptionElement.innerText = prescription.prescription;

        const spanDateElement = document.createElement('span');
        spanDateElement.className = 'text-muted f-w-400';
        spanDateElement.innerText = prescription.prescription_date;

        const h6Element = document.createElement('h6');
        h6Element.className = 'f-w-400';
        h6Element.innerText = 'Prescrição feita em ';
        h6Element.appendChild(spanDateElement);

        const endLineH6Element = document.createElement('h6');
        endLineH6Element.className = 'm-b-20 m-t-40 p-b-5 b-b-default f-w-600';

        render.appendChild(prescriptionElement);
        render.appendChild(h6Element);
        render.appendChild(endLineH6Element);

        root.appendChild(render);
      }
    }
  }
);

// Gallery
document.getElementById('files').onchange = function () {
  const gallery = document.getElementById('gallery') as HTMLElement;
  gallery.innerHTML = '';

  const fileList = Array.from(this.files);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const files: PhotoInfo[] = fileList.map((file: any) => {
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
  const gallery = document.getElementById('gallery') as HTMLElement;
  gallery.innerHTML = '';

  photosUpload.removeFileByName(name);

  gallery.appendChild(photosUpload.render());
}
