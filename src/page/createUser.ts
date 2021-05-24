import { ipcRenderer } from 'electron';
import { IUserCreate } from '../services/UsersService';

window.addEventListener('load', () => {
  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name') as HTMLInputElement;
    const naturalness = document.getElementById('naturalness') as HTMLInputElement;
    const mother = document.getElementById('mother') as HTMLInputElement;
    const dad = document.getElementById('dad') as HTMLInputElement;
    const sex = document.querySelector('input[name="sex"]:checked') as HTMLInputElement;
    const birth = document.getElementById('birth') as HTMLInputElement;
    const profession = document.getElementById('profession') as HTMLInputElement;
    const schooling = document.getElementById('schooling') as HTMLInputElement;
    const religion = document.getElementById('religion') as HTMLInputElement;

    const data: IUserCreate = {
      name: name.value,
      naturalness: naturalness.value,
      mother: mother.value,
      dad: dad.value,
      sex: sex.value,
      birth: birth.value,
      profession: profession.value,
      schooling: schooling.value,
      religion: religion.value,
    };

    ipcRenderer.send('form-data', data);
  });
});
