import { ipcRenderer } from 'electron';
import { PrescriptionAndPhotos } from '../util';
import { PhotoUpload, PhotoInfo } from '../util/Photo';
import { inputFields } from './prescriptionsFields';

export const photosUpload = new PhotoUpload();

let id = '';
const name = document.getElementById('name') as HTMLElement;
const birth = document.getElementById('birth') as HTMLElement;
const buttons = document.querySelectorAll('button[name="save_and_print"]');

window.onload = () => {
  id = window.location.search.split('=')[1];
  ipcRenderer.send('sendPrescriptions', id);
};

document.addEventListener('click', function (event: Event) {
  if (event.target.id === 'save_and_print' || event.target.id === 'save_prescriptions') {
    event.preventDefault();
    const {
      neurological_examination,
      main_complaint,
      family_history,
      history_current,
      social_history,
      previous_pathological_history,
      physiological_history,
      pharmaceutical_history,

      // Exame físico
      cardiovascular_system,
      blood_pressure,
      heart_rate,
      respiratory_system,
      oxygen_saturation,
      adb,
      mmii,
      otoscopy,
      ophthalmoscopy,
      romberg,

      // Marcha
      ceifante,
      ataxica_talonante,
      escarvante,
      anserina,
      cerebelar,
      magnetica,
      parkinsoniana,

      // Diagnóstico sindrômico
      cognitivo,
      convulsive,
      intracranial_hypertension,
      meningeal,
      motora,
      sensitiva,
      hemiparetica,
      paraparetica,
      tetraparetica,
      monoparetica,
      nmi,

      // Sindromes Relacionados a Função do Sistema Nervoso Autonomo
      cardiovascular,
      respiratory,
      digestive,
      sudorese,
      control_of_sphincters_and_bladder,

      // Sindromes Sensitivas
      hypoesthesias,
      paresthesia,
      hyperalgesia,

      // Diagnóstico
      prescription,
      requested_exams,
      notes,
      exam_results,
      prescription_date,
    } = inputFields();

    const res: PrescriptionAndPhotos = {
      prescription: {
        neurological_examination: neurological_examination.value,
        main_complaint: main_complaint.value,
        family_history: family_history.value,
        history_current: history_current.value,
        social_history: social_history.value,
        previous_pathological_history: previous_pathological_history.value,
        physiological_history: physiological_history.value,
        pharmaceutical_history: pharmaceutical_history.value,

        // Exame físico
        cardiovascular_system: cardiovascular_system.value,
        blood_pressure: blood_pressure.value,
        heart_rate: heart_rate.value,
        respiratory_system: respiratory_system.value,
        oxygen_saturation: oxygen_saturation.value,
        adb: adb.value,
        mmii: mmii.value,
        otoscopy: otoscopy.value,
        ophthalmoscopy: ophthalmoscopy.value,
        romberg: romberg.value,

        // Marcha
        ceifante: ceifante.checked,
        ataxica_talonante: ataxica_talonante.checked,
        escarvante: escarvante.checked,
        anserina: anserina.checked,
        cerebelar: cerebelar.checked,
        magnetica: magnetica.checked,
        parkinsoniana: parkinsoniana.checked,

        // Diagnóstico sindrômico
        cognitivo: cognitivo.checked,
        convulsive: convulsive.checked,
        intracranial_hypertension: intracranial_hypertension.checked,
        meningeal: meningeal.checked,
        motora: motora.checked,
        sensitiva: sensitiva.checked,
        hemiparetica: hemiparetica.checked,
        paraparetica: paraparetica.checked,
        tetraparetica: tetraparetica.checked,
        monoparetica: monoparetica.checked,
        nmi: nmi.value,

        // Sindromes Relacionados a Função do Sistema Nervoso Autonomo
        cardiovascular: cardiovascular.checked,
        respiratory: respiratory.checked,
        digestive: digestive.checked,
        sudorese: sudorese.checked,
        control_of_sphincters_and_bladder: control_of_sphincters_and_bladder.checked,

        // Sindromes Sensitivas
        hypoesthesias: hypoesthesias.checked,
        paresthesia: paresthesia.checked,
        hyperalgesia: hyperalgesia.checked,

        // Diagnóstico
        prescription: prescription.value,
        requested_exams: requested_exams.value,
        notes: notes.value,
        exam_results: exam_results.value,
        prescription_date: prescription_date.value,

        user_id: id,
      },

      files: photosUpload.getAllFiles(),
    };

    if (event.target.id === 'save_prescriptions') {
      ipcRenderer.send('savePrescription', res);
    } else if (event.target.id === 'save_and_print') {
      ipcRenderer.send('savePrescriptionAndPrint', res);
    }
  }
});

// ipcRenderer.on('newPrescriptions', (event, userAndPrescriptions: UserAndPrescriptions) => {
//   console.log('ke');
// });

// Gallery
const marcha_files = document.getElementById('marcha_files') as HTMLInputElement;

marcha_files.onchange = function () {
  const gallery = document.getElementById('march_gallery') as HTMLElement;
  gallery.innerHTML = '';

  const fileList = Array.from(marcha_files.files);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const files: PhotoInfo[] = fileList.map((file: any) => {
    return {
      name: file.name,
      path: file.path,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
    };
  });

  photosUpload.addFile(files);

  gallery.appendChild(photosUpload.render());
};

export function deleteFile(name: string): void {
  const gallery = document.getElementById('march_gallery') as HTMLElement;
  gallery.innerHTML = '';

  photosUpload.removeFileByName(name);

  gallery.appendChild(photosUpload.render());
}
