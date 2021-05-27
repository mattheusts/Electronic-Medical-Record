import { User } from '../database/models/User';
import { IUserCreate } from '../services/UsersService';

export class Render {
  public static renderSeachAll(userSearch: User[]): HTMLElement {
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
    }
    return render;
  }

  public static renderOldPrescriptions(user: IUserCreate): HTMLElement {
    const root: HTMLElement = document.createElement('div');

    if (user.prescriptions == []) {
      const render = document.createElement('h6');
      render.className = 'f-w-400';
      render.innerText = 'Nenhuma prescrição feita';
      return render;
    } else {
      for (const prescription of user.prescriptions) {
        root.className = 'row d-inline';
        const render = document.createElement('div');
        render.className = 'row d-inline';

        const divButtons = document.createElement('div');
        divButtons.className = 'aling-right-buttons';

        const editButton = document.createElement('button');
        editButton.innerText = 'Editar';
        editButton.className = 'btn btn-primary btn-sm';
        editButton.setAttribute('onclick', `editPrescription('${prescription.id}', '${user.id}')`);

        const printButton = document.createElement('button');
        printButton.innerText = 'Imprimir';
        printButton.className = 'btn btn-success btn-sm';
        printButton.setAttribute('data-bs-toggle', 'modal');
        printButton.setAttribute('data-bs-target', '#modal');
        printButton.setAttribute('onclick', `setId('${prescription.id}')`);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Deletar';
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.setAttribute('onclick', `deletePrescription('${prescription.id}')`);

        divButtons.appendChild(editButton);
        divButtons.appendChild(printButton);
        divButtons.appendChild(deleteButton);

        const prescriptionElement = document.createElement('p');
        prescriptionElement.className = 'm-b-10 f-w-600 d-inline';
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

        render.appendChild(divButtons);
        render.appendChild(prescriptionElement);
        render.appendChild(h6Element);
        render.appendChild(endLineH6Element);

        root.appendChild(render);
      }
    }
    return root;
  }
}
