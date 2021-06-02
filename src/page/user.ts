import { ipcRenderer } from 'electron';
import { IUserCreate } from '../services/UsersService';
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

ipcRenderer.on('userInfo', (event, res: IUserCreate) => {
  const name = document.getElementById('name') as HTMLInputElement;
  const birth = document.getElementById('birth') as HTMLInputElement;
  const prescription = document.getElementById('prescription') as HTMLInputElement;
  const prescriptionDate = document.getElementById('prescriptionDate') as HTMLInputElement;

  name.innerText = res.name;
  birth.innerText = res.birth;

  const prescriptionsSize = res.prescriptions.length;

  res.prescriptions = res.prescriptions.sort((p1, p2) => {
    const d1 = new Date(p1.created_at);
    const d2 = new Date(p2.created_at);

    return d1 - d2;
  });

  res.prescriptions.reverse();

  res.prescriptions.forEach((p) => {
    if (p.prescription.length >= 300) {
      p.prescription = p.prescription.slice(0, 300);
      p.prescription += ' ...';
    }
  });

  if (prescriptionsSize <= 0) {
    prescription.innerText = 'Não há prescrições';
  } else {
    if (res.prescriptions[0].prescription.length >= 160) {
      let text = res.prescriptions[0].prescription.slice(0, 160);
      text += ' ...';
      prescription.innerText = text;
    } else prescription.innerText = res.prescriptions[0].prescription;
  }

  const oldPrescriptions = document.getElementById('old_prescriptions') as HTMLElement;
  const render = Render.renderOldPrescriptions(res);
  oldPrescriptions.appendChild(render);
});

export function setId(id: string): void {
  const printPrescription = document.getElementById('print_prescription');
  printPrescription.setAttribute('onclick', `printPrescription('${id}')`);

  const printRequestedExams = document.getElementById('print_requested_exams');
  printRequestedExams.setAttribute('onclick', `printRequestedExams('${id}')`);

  const printMedicalRecord = document.getElementById('print_medical_record');
  printMedicalRecord.setAttribute('onclick', `printMedicalRecord('${id}')`);
}
