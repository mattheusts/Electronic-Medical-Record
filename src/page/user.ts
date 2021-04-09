import { ipcRenderer } from 'electron';
import { UserAndPrescription } from '../util';

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

  const btn3 = document.createElement('button');
  btn3.innerText = 'Imprimir';
  btn3.className = 'btn btn-success';
  btn3.setAttribute('onclick', `printPDF('${id}')`);

  const btn4 = document.createElement('button');
  btn4.innerText = 'Deletar';
  btn4.className = 'btn btn-danger';
  btn4.setAttribute('onclick', `deleteUser('${id}')`);

  divButtons.appendChild(btn1);
  divButtons.appendChild(btn2);
  // divButtons.appendChild(btn3);
  divButtons.appendChild(btn4);
};

ipcRenderer.on('userInfo', (event, res: UserAndPrescription) => {
  const name = document.getElementById('name') as HTMLInputElement;
  const birth = document.getElementById('birth') as HTMLInputElement;
  const prescription = document.getElementById(
    'prescription'
  ) as HTMLInputElement;
  const prescriptionDate = document.getElementById(
    'prescriptionDate'
  ) as HTMLInputElement;

  name.innerText = res.name;
  birth.innerText = res.birth;

  if (!res.prescription) {
    prescription.innerText = 'Não há prescrições';
  } else {
    prescription.innerText = res.prescription.prescription;
    prescriptionDate.innerText = res.prescription.prescription_date;
  }
});
