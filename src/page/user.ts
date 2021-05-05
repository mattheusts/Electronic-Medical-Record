import { ipcRenderer } from 'electron';
import { UserAndPrescriptions } from '../util';
import { Render } from './render';

window.onload = function () {
  const id = window.location.search.split('=')[1];
  ipcRenderer.send('userInfoID', id);
  const divButtons = document.getElementById('buttons') as HTMLElement;

  const btn1 = document.createElement('button');
  btn1.innerText = 'Editar Usuário';
  btn1.className = 'btn btn-primary';
  btn1.setAttribute('onclick', `editUser('${id}')`);

  const btn2 = document.createElement('button');
  btn2.innerText = 'Nova prescrição';
  btn2.className = 'btn btn-success';
  btn2.setAttribute('onclick', `newPrescription('${id}')`);

  const btn4 = document.createElement('button');
  btn4.innerText = 'Deletar';
  btn4.className = 'btn btn-danger';
  btn4.setAttribute('onclick', `deleteUser('${id}')`);

  divButtons.appendChild(btn1);
  divButtons.appendChild(btn2);
  divButtons.appendChild(btn4);
};

ipcRenderer.on('userInfo', (event, res: UserAndPrescriptions) => {
  const name = document.getElementById('name') as HTMLInputElement;
  const birth = document.getElementById('birth') as HTMLInputElement;
  const prescription = document.getElementById('prescription') as HTMLInputElement;
  const prescriptionDate = document.getElementById('prescriptionDate') as HTMLInputElement;

  name.innerText = res.name;
  birth.innerText = res.birth;

  if (res.prescriptions.length <= 0) {
    prescription.innerText = 'Não há prescrições';
  } else {
    prescription.innerText = res.prescriptions[0].prescription;
    prescriptionDate.innerText = res.prescriptions[0].prescription_date;
  }

  const oldPrescriptions = document.getElementById('old_prescriptions') as HTMLElement;
  const render = Render.renderOldPrescriptions(res);
  oldPrescriptions.appendChild(render);
});

export function setId(id: string): void {
  const printPrescription = document.getElementById('print_prescription');
  printPrescription.setAttribute('onclick', `printPrescription(${id})`);

  const printRequestedExams = document.getElementById('print_requested_exams');
  printRequestedExams.setAttribute('onclick', `printRequestedExams(${id})`);

  const printMedicalRecord = document.getElementById('print_medical_record');
  printMedicalRecord.setAttribute('onclick', `printMedicalRecord(${id})`);
}
