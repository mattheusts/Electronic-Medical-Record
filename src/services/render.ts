import * as path from 'path';
import { UserAndPrescriptionAndFiles } from '../util';

export class RenderPDF {
  constructor(private userAndPrescriptionAndFiles: UserAndPrescriptionAndFiles) {}

  handleFiles(): string {
    let render = '';
    for (const file of this.userAndPrescriptionAndFiles.files) {
      render += `
        <tr>
          <td>
            <img
            src="file:///${path.resolve(file.path)}"
            />
          </td>
        </tr>
      `;
    }
    return render;
  }

  handleParseSchool(schooling: string): string {
    if (schooling === 'EFI') return 'Ensino fundamental incompleto';
    if (schooling === 'EF') return 'Ensino fundamental';
    if (schooling === 'EMI') return 'Ensino médio incompleto';
    if (schooling === 'EM') return 'Ensino médio';
    if (schooling === 'ESI') return 'Ensino superior incompleto';
    if (schooling === 'ES') return 'Ensino superior';
  }

  handleBoolenaLogic(option: boolean): string {
    if (option) {
      return 'X';
    }

    return '‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎';
  }

  render(): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${this.userAndPrescriptionAndFiles.name}</title>
    
        <style>
          @import url('../../public/fonts/Roboto/Roboto-Black.ttf');
          @import url('../../public/fonts/Roboto/Medium.ttf');
          @import url('../../public/fonts/Roboto/Roboto-Bold.ttf');
          @import url('../../public/fonts/Roboto/Roboto-Regular.ttf');
          @import url('../../public/fonts/Roboto/Roboto-Light.tff');
          @import url('../../public/fonts/Roboto/Roboto-Medium.ttf');

    
          * {
            margin: 0;
            padding: 0;
            font-family: 'Roboto', Ariel;
          }
    
          .container {
            margin: auto 10%;
          }
    
          .center {
            text-align: center;
          }
    
          .center h4 {
            font-weight: bold;
            color: #0576a6;
            margin: 16px;
          }
    
          .info {
            margin: 10px 0;
            width: 100%;
          }
    
          .info tr td {
            margin: 100px 0;
          }
    
          .info div p span {
            color: #333;
            font-weight: bold;
            text-transform: uppercase;
          }
    
          .info tr td p span {
            color: #333;
            font-weight: bold;
            text-transform: uppercase;
          }
    
          .prescription {
            margin-top: 3rem;
          }
    
          .prescription div {
            display: block;
          }
    
          .prescription div span {
            display: block;
            margin-bottom: 10px;
          }
    
          .prescription div p span {
            color: #333;
            font-weight: bold;
            display: block;
            display: 16px 0;
          }
    
          table tr td img {
            width: 500px;
          }
          table tr td {
            padding: 4px 0;
          }
    
          .gallery {
            margin: 0 auto;
          }
        </style>
      </head>
      <body>
        <section class="container">
          <div class="center">
            <h1>PRONTUÁRIO</h1>
          </div>
    
          <table class="info">
            <tr>
              <td>
                <div class="name">
                  <p><span>Nome: </span>${this.userAndPrescriptionAndFiles.name}</p>
                </div>
              </td>
              <td>
                <div class="naturalness">
                  <p><span>Naturalidade: </span>${this.userAndPrescriptionAndFiles.naturalness}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="mother">
                  <p><span>MÂE: </span>${this.userAndPrescriptionAndFiles.mother}</p>
                </div>
              </td>
              <td>
                <div class="dad">
                  <p><span>PAI: </span>${this.userAndPrescriptionAndFiles.dad}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="sex">
                  <p><span>SEXO: </span>${this.userAndPrescriptionAndFiles.sex}</p>
                </div>
              </td>
              <td>
                <div class="birth">
                  <p><span>data de nascimento: </span>${this.userAndPrescriptionAndFiles.birth}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="religion">
                  <p><span>religião: </span>${this.userAndPrescriptionAndFiles.religion}</p>
                </div>
              </td>
              <td>
                <div class="schooling">
                  <p><span>Escolaridade: </span>${this.handleParseSchool(
                    this.userAndPrescriptionAndFiles.schooling
                  )}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="profession">
                  <p><span>Profissão: </span>${this.userAndPrescriptionAndFiles.profession}</p>
                </div>
              </td>
              <td>
            </tr>
          </table>
    
          <div class="prescription">
            <div class="">
              <p class="neurological_examination">
                <span>Exame neurológico: </span>${
                  this.userAndPrescriptionAndFiles.prescription.neurological_examination
                }
              </p>
            </div>
          </div>
    
          <!-- Exame Clínicos -->
          <div class="center">
            <h4>Exame Clínicos</h4>
          </div>
          <table class="info">
            <tr>
              <td>
                <p class="main_complaint">
                  <span>Q.P: </span>${this.userAndPrescriptionAndFiles.prescription.main_complaint}
                </p>
              </td>
              <td>
                <p class="family_history">
                  <span>H.Familiar: </span>${
                    this.userAndPrescriptionAndFiles.prescription.family_history
                  }
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p class="history_current">
                  <span>H.D.A: </span>${
                    this.userAndPrescriptionAndFiles.prescription.history_current
                  }
                </p>
              </td>
              <td>
                <p class="social_history">
                  <span>H.Social: </span>${
                    this.userAndPrescriptionAndFiles.prescription.social_history
                  }
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p class="previous_pathological_history">
                  <span>H.P.P: </span>${
                    this.userAndPrescriptionAndFiles.prescription.previous_pathological_history
                  }
                </p>
              </td>
              <td>
                <p class="physiological_history">
                  <span>H.Fisiológica: </span>${
                    this.userAndPrescriptionAndFiles.prescription.physiological_history
                  }
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p class="pharmaceutical_history">
                  <span>H.Farmaceutico: </span>${
                    this.userAndPrescriptionAndFiles.prescription.pharmaceutical_history
                  }
                </p>
              </td>
            </tr>
          </table>
    
          <!-- Exame físico -->
          <div class="center">
            <h4>Exame físicos</h4>
          </div>
          <table class="info">
            <tr>
              <td>
                <p class="cardiovascular_system">
                  <span>A.C.V: </span>${
                    this.userAndPrescriptionAndFiles.prescription.cardiovascular_system
                  }
                </p>
              </td>
              <td>
                <p class="blood_pressure"><span>P.A: </span>${
                  this.userAndPrescriptionAndFiles.prescription.blood_pressure
                }</p>
              </td>
              <td>
                <p class="heart_rate"><span>F.C: </span>${
                  this.userAndPrescriptionAndFiles.prescription.heart_rate
                }</p>
              </td>
            </tr>
    
            <tr>
              <td>
                <p class="respiratory_system">
                  <span>A.R: </span>${
                    this.userAndPrescriptionAndFiles.prescription.respiratory_system
                  }
                </p>
              </td>
              <td>
                <p class="oxygen_saturation"><span>SAT: </span>${
                  this.userAndPrescriptionAndFiles.prescription.oxygen_saturation
                }</p>
              </td>
            </tr>
            <tr>
              <td>
                <p class="adb">
                  <span>A.B.D: </span>${this.userAndPrescriptionAndFiles.prescription.adb}
                </p>
              </td>
            </tr>
    
            <tr>
              <td>
                <p class="mmii">
                  <span>MMII: </span>${this.userAndPrescriptionAndFiles.prescription.mmii}
                </p>
              </td>
            </tr>
    
            <tr>
              <td>
                <p class="otoscopy">
                  <span>Otoscopia: </span>${this.userAndPrescriptionAndFiles.prescription.otoscopy}
                </p>
              </td>
            </tr>
    
            <tr>
              <td>
                <p class="ophthalmoscopy">
                  <span>Oftalmoscopia: </span>${
                    this.userAndPrescriptionAndFiles.prescription.ophthalmoscopy
                  }
                </p>
              </td>
            </tr>
    
            <tr>
              <td>
                <p class="romberg">
                  <span>Romberg: </span>${this.userAndPrescriptionAndFiles.prescription.romberg}
                </p>
              </td>
            </tr>
          </table>
    
          <!-- Marcha -->
          <div class="center">
            <h4>Marcha</h4>
          </div>
          <table class="info">
            <tr>
              <td>
                <p><span>Ceifante: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.ceifante
                )} )</span></p>
              </td>
              <td>
                <p><span>Ataxica Talonante: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.ataxica_talonante
                )} )</span></p>
              </td>
              <td>
                <p><span>Escarvante: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.escarvante
                )} )</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p><span>Anserina: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.anserina
                )} )</span></p>
              </td>
              <td>
                <p><span>Cerebelar: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.cerebelar
                )} )</span></p>
              </td>
              <td>
                <p><span>Magnética: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.magnetica
                )} )</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p><span>Parkinsoniana: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.parkinsoniana
                )} )</span></p>
              </td>
            </tr>
          </table>
    
          <div class="center">
            <h4>Imagens</h4>
          </div>
          <table id="gallery" class="center">
            ${this.handleFiles()}
          </table>
    
          <!-- Diagnóstico sindrômico -->
          <div class="center">
            <h4>Diagnóstico sindrômico</h4>
          </div>
          <table class="info">
            <tr>
              <td>
                <p><span>S.D Cognitivo: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.cognitivo
                )} )</span></p>
              </td>
              <td>
                <p><span>S.D Convulsiva: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.convulsive
                )} )</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p><span>S.D Hipertensão Intracraniana: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.intracranial_hypertension
                )} )</span></p>
              </td>
              <td>
                <p><span>S.D Meníngea: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.meningeal
                )} )</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p><span>S.D Motora: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.motora
                )} )</span></p>
              </td>
              <td>
                <p><span>S.D Sensitiva: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.sensitiva
                )} )</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p><span>S.D Hemiparética: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.hemiparetica
                )} )</span></p>
              </td>
              <td>
                <p><span>S.D Paraparética: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.paraparetica
                )} )</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p><span>Tetraparética: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.tetraparetica
                )} )</span></p>
              </td>
              <td>
                <p><span>Monoparética: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.monoparetica
                )} )</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p><span>Sindrome do NMI: </span>${
                  this.userAndPrescriptionAndFiles.prescription.nmi
                }</p>
              </td>
            </tr>
          </table>
    
          <!-- Sindromes Relacionados a Função do Sistema Nervoso Autonomo -->
          <div class="center">
            <h4>Sindromes Relacionados a Função do Sistema Nervoso Autonomo</h4>
          </div>
          <table class="info">
            <tr>
              <td>
                <p><span>Cardiovascular: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.cardiovascular
                )} )</span></p>
              </td>
              <td>
                <p><span>Respiratórias: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.respiratory
                )} )</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p><span>Digestivas: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.digestive
                )} )</span></p>
              </td>
              <td>
                <p><span>Sudorese: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.sudorese
                )} )</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p><span>Controle dos Esfíncteres e Vesical: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.control_of_sphincters_and_bladder
                )} )</span></p>
              </td>
            </tr>
          </table>
    
          <!-- Sindromes Sensitivas -->
          <div class="center">
            <h4>Sindromes Sensitivas</h4>
          </div>
          <table class="info">
            <tr>
              <td>
                <p><span>Hipoestesias: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.hypoesthesias
                )} )</span></p>
              </td>
              <td>
                <p><span>Parestesia: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.paresthesia
                )} )</span></p>
              </td>
            </tr>
            <tr>
              <td>
                <p><span>Hiperalgesia: </span><span>( ${this.handleBoolenaLogic(
                  this.userAndPrescriptionAndFiles.prescription.hyperalgesia
                )} )</span></p>
              </td>
            </tr>
          </table>
    
          <!-- Diagnóstico -->
          <div class="center">
            <h4>Diagnóstico</h4>
          </div>
          <table class="info">
            <tr>
              <td>
                <p>
                  <span>Prescrição: </span>${
                    this.userAndPrescriptionAndFiles.prescription.prescription
                  }
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  <span>Exames Solicitados: </span>${
                    this.userAndPrescriptionAndFiles.prescription.requested_exams
                  }
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  <span>Anotações: </span>${this.userAndPrescriptionAndFiles.prescription.notes}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>
                  <span>Resultados de Exames: </span>${
                    this.userAndPrescriptionAndFiles.prescription.exam_results
                  }
                </p>
              </td>
            </tr>
    
            <tr>
              <td>
                <p><span>Data da Prescrição: </span>${
                  this.userAndPrescriptionAndFiles.prescription.prescription_date
                }</p>
              </td>
            </tr>
          </table>
        </section>
      </body>
    </html>    
      `;
  }
}
