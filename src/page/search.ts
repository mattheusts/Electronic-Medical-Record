import { ipcRenderer } from 'electron';
import { User } from '../database/models/User';
import { Render } from './render';

window.onload = function () {
  ipcRenderer.send('init');

  ipcRenderer.on('searchAll', (event, users: User[]) => {
    let render: HTMLElement = null;
    if (users.length > 0) {
      render = Render.renderSeachAll(users);
    } else {
      const notFound = document.createElement('h2') as HTMLElement;
      notFound.className = 'justify-content-center text-secondary';
      notFound.innerText = 'Paciente não encontrado!';
      render = notFound;
    }

    const cards = document.getElementById('cards') as HTMLElement;
    cards.innerHTML = '';
    cards.appendChild(render);
  });
};

document.getElementById('search').addEventListener('keyup', () => {
  const search = document.getElementById('search') as HTMLInputElement;
  ipcRenderer.send('searchByName', search.value);
});

export function edit(id: string): void {
  ipcRenderer.send('initUserInfo', id);
}
