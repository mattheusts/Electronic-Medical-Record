import { ipcRenderer } from 'electron';
import { User } from '../database/models/User';

window.onload = function () {
  ipcRenderer.send('editInit', window.location.search.split('=')[1]);
};

let id = '';
const name = document.getElementById('name') as HTMLInputElement;
const naturalness = document.getElementById('naturalness') as HTMLInputElement;
const mother = document.getElementById('mother') as HTMLInputElement;
const dad = document.getElementById('dad') as HTMLInputElement;
const birth = document.getElementById('birth') as HTMLInputElement;
const updateUserButton = document.getElementById(
  'updateUser'
) as HTMLInputElement;

ipcRenderer.on('editUserInfo', (event, user: User) => {
  id = user.id;
  name.value = user.name;
  naturalness.value = user.naturalness;
  mother.value = user.mother;
  dad.value = user.dad;
  birth.value = user.birth;

  if (user.sex.toLowerCase() === 'masculino') {
    const male = document.getElementById('male') as HTMLInputElement;
    male.checked = true;
  } else if (user.sex.toLowerCase() === 'feminino') {
    const female = document.getElementById('female') as HTMLInputElement;
    female.checked = true;
  }
});

updateUserButton.addEventListener('click', () => {
  const sex = document.querySelector(
    'input[name="sex"]:checked'
  ) as HTMLInputElement;
  const user: User = {
    id: id,
    name: name.value,
    naturalness: naturalness.value,
    mother: mother.value,
    dad: dad.value,
    sex: sex.value,
    birth: birth.value,
    updated_at: new Date(),
  };

  ipcRenderer.send('updateUser', user);
});
