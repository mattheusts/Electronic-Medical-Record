import { ipcRenderer } from 'electron';
import { Prescription } from '../database/models/Prescription';
import { UserAndPrescriptions } from '../util';

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
  const prescriptionDate = document.getElementById(
    'prescription_date'
  ) as HTMLInputElement;
  const prescription = document.getElementById(
    'prescription'
  ) as HTMLInputElement;

  const res: Prescription = {
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
