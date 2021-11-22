import { ipcRenderer } from 'electron';
import { User } from '../database/models/User';
import { Render } from './render';
// import $ from 'jquery';

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

let buttonUpdate: HTMLButtonElement = document.querySelector('.update-button');
const modalBody = document.querySelector('.modal-body') as HTMLDivElement;

ipcRenderer.on('update-available', (event, message) => {
  $('#exampleModal').modal({ backdrop: 'static', keyboard: false });
  $('#exampleModal').modal('show');

  const text: HTMLParagraphElement =
    document.querySelector('.download-message');
  text.innerText = `A versão ${message.version} está disponível para download, deseja atualizar?`;

  buttonUpdate.addEventListener('click', () => {
    ipcRenderer.send('download');

    text.innerText = 'Atualizando...';
    modalBody.innerHTML = `<div class="progress">
                            <div style="width: 1%"class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                            </div><p>Aguarde o download está em andamento.</p>`;

    buttonUpdate.disabled = true;
    buttonUpdate.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Baixando ...`;
  });
});

ipcRenderer.on('update-downloaded', () => {
  buttonUpdate.innerHTML = '';
  buttonUpdate.innerText = 'Instalar';
  buttonUpdate.disabled = false;

  modalBody.innerHTML =
    '<p>O download foi concluído! clique em instalar para atulizar a aplicação!</p>';

  buttonUpdate.addEventListener('click', () => {
    $('#exampleModal').modal('hide');
    ipcRenderer.send('quit-and-install');
  });
});

ipcRenderer.on('download-progress', (err, res) => {
  const progressBar: HTMLDivElement = document.querySelector('.progress-bar');
  progressBar.setAttribute('style', `width: ${Math.ceil(res.percent)}%`);
});
