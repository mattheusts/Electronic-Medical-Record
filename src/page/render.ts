import { UserAndPrescriptions } from '../util';
import { UserSearch } from '../database/search';
import { User } from '../database/models/User';

export class Render {
  public static renderSeachAll(userSearch: UserSearch[]): string {
    let render = '';

    for (const u of userSearch) {
      render += `
      <div class="card user-card-full">
          <div class="card-body">
            <h5 class="m-b-10 f-w-600">${u.name}</h5>
            <p class="card-text text-muted f-w-400">
              Data de Nascimento: ${u.birth}
              <br>
            </p>
            <button type="button" class="btn btn-primary" onclick="edit('${u.id}')">Visualizar</button>
          </div>
        </div>
      `;
    }

    return render;
  }

  public static renderEditMain(user: User): string {
    let sex = '';
    if (user.sex.toLocaleLowerCase() === 'masculino') {
      sex = `<input
      type="radio"
      class="form-check-input"
      name="sex"
      value="Masculino"
      checked
    />Masculino
    <br />
    <input
      type="radio"
      class="form-check-input"
      name="sex"
      value="Feminino"
    />Feminino`;
    } else if (user.sex.toLocaleLowerCase() === 'feminino') {
      sex = `<input
      type="radio"
      class="form-check-input"
      name="sex"
      value="Masculino"
    />Masculino
    <br />
    <input
      type="radio"
      class="form-check-input"
      name="sex"
      value="Feminino"
      checked
    />Feminino`;
    } else {
      sex = `<input
      type="radio"
      class="form-check-input"
      name="sex"
      value="Masculino"
    />Masculino
    <br />
    <input
      type="radio"
      class="form-check-input"
      name="sex"
      value="Feminino"
    />Feminino`;
    }

    const index = `
    <form action="">
    <!-- Nome e naturalidade -->
    <div class="form-grup row">
      <div class="col-md-6">
        <label for="exampleFormControlInput1" class=" m-b-20 p-b-5 f-w-600"
          >Nome</label
        >
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Nome Completo"
          value="${user.name}"
        />
      </div>
      <div class="col-md-4">
        <label for="exampleFormControlInput1" class="m-b-20 f-w-600"
          >Naturalidade</label
        >
        <input
          type="text"
          class="form-control"
          id="naturalness"
          placeholder="Naturalidade"
          width="200px"
          value="${user.naturalness}"
        />
      </div>
    </div>

    <!-- Force next columns to break to new line -->
    <div class="w-100"></div>

    <!-- Mãe e pai -->
    <div class="form-grup row">
      <div class="col-md-6">
        <label for="exampleFormControlInput1" class="m-b-20 f-w-600">Mãe</label>
        <input
          type="text"
          class="form-control"
          id="mother"
          placeholder="Nome da Mãe"
          value="${user.mother}"
        />
      </div>

      <div class="col-md-6">
        <label for="exampleFormControlInput1" class="m-b-20 f-w-600">Pai</label>
        <input
          type="text"
          class="form-control"
          id="dad"
          placeholder="Nome da Pai"
          value="${user.dad}"
        />
      </div>
    </div>

    <!-- Force next columns to break to new line -->
    <div class="w-100"></div>

    <div class="form-grup row">
      <div class="col-md-6">
        <label for="exampleFormControlInput1" class="m-b-20 p-b-5 f-w-600"
          >Sexo: 
        </label>
        <br />
          ${sex}
      </div>

      <div class="col-md-2">
        <label for="exampleFormControlInput1" class="m-b-20 p-b-5 f-w-600"
          >Data de Nascimento
        </label>
        <input
          id="birth"
          class="form-control"
          width="276"
          placeholder="DD/MM/YYYY"
          value="${user.birth}"
        />
      </div>
    </div>

    <!-- Force next columns to break to new line -->
    <div class="w-200"></div>

    <!-- Force next columns to break to new line -->
    <div class="w-300"></div>

    <div class="form-grup row mt-2">
      <div class="col-md-6">
        <button type="button" id="updateUser" onclick="updateUser('${user.id}')"class="btn btn-success">
             Salvar   
        </button>
      </div>
    </div>

    <!-- Force next columns to break to new line -->
    <div class="w-300"></div>

    
  </form>
    `;

    return index;
  }
}
