import { UserSearch } from '../database/search';

export class Render {
  public static renderSeachAll(userSearch: UserSearch[]): HTMLElement {
    if (userSearch.length == 0) {
      const render = document.createElement('div') as HTMLElement;
      const notFound = document.createElement('h6') as HTMLElement;
      notFound.className = 'text-muted f-w-400';
      notFound.innerText = 'Ainda não há pacientes.';
      render.className = 'center';
      render.appendChild(notFound);

      return render;
    }

    const render: HTMLElement = document.createElement('div');
    for (const u of userSearch) {
      const card = document.createElement('div') as HTMLElement;
      const cardBody = document.createElement('div') as HTMLElement;
      const name = document.createElement('h5') as HTMLElement;
      const text = document.createElement('p') as HTMLElement;
      const button = document.createElement('button') as HTMLElement;

      card.className = 'card user-card-full';
      cardBody.className = 'card-body';
      name.className = 'm-b-10 f-w-600';
      name.innerText = u.name;
      text.className = 'card-text text-muted f-w-400';
      text.innerText = `Data de Nascimento: ${u.birth}`;
      button.className = 'btn btn-primary';
      button.setAttribute('onclick', `edit('${u.id}')`);
      button.innerText = 'Visualizar';

      cardBody.appendChild(name);
      cardBody.appendChild(text);
      cardBody.appendChild(button);
      card.appendChild(cardBody);

      render.appendChild(card);

      //   render += `
      //   <div class="card user-card-full">
      //       <div class="card-body">
      //         <h5 class="m-b-10 f-w-600">${u.name}</h5>
      //         <p class="card-text text-muted f-w-400">
      //           Data de Nascimento: ${u.birth}
      //           <br>
      //         </p>
      //         <button type="button" class="btn btn-primary" onclick="edit('${u.id}')">Visualizar</button>
      //       </div>
      //     </div>
      //   `;
      // }

      return render;
    }
  }
}
