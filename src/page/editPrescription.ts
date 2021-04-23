import { ipcRenderer } from 'electron';
import { PhotoInfo, PhotoUpload } from '../util/Photo';
import { PrescriptionAndPhotos, UserAndPrescriptionAndFiles } from '../util';
import { inputFields } from './prescriptionsFields';

export const photosUpload = new PhotoUpload();
const gallery = document.getElementById('march_gallery') as HTMLElement;

window.onload = () => {
  const query = window.location.search.split('=');
  const user_id = query[1].split('&')[0];
  const prescription_id = query[2];

  ipcRenderer.send('InitEditPrescription', { user_id, prescription_id });
};

let user_id;
let prescription_id;

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

ipcRenderer.on(
  'LoadEditPrescription',
  (error, userAndPrescriptionAndFiles: UserAndPrescriptionAndFiles) => {
    const name = document.getElementById('name') as HTMLInputElement;
    const birth = document.getElementById('birth') as HTMLInputElement;

    prescription_id = userAndPrescriptionAndFiles.prescription.id;
    user_id = userAndPrescriptionAndFiles.id;

    name.innerText = userAndPrescriptionAndFiles.name;
    birth.innerText = userAndPrescriptionAndFiles.birth;

    neurological_examination.value =
      userAndPrescriptionAndFiles.prescription.neurological_examination;

    main_complaint.value = userAndPrescriptionAndFiles.prescription.main_complaint;
    family_history.value = userAndPrescriptionAndFiles.prescription.family_history;
    history_current.value = userAndPrescriptionAndFiles.prescription.history_current;
    social_history.value = userAndPrescriptionAndFiles.prescription.social_history;
    previous_pathological_history.value =
      userAndPrescriptionAndFiles.prescription.previous_pathological_history;
    physiological_history.value = userAndPrescriptionAndFiles.prescription.physiological_history;
    pharmaceutical_history.value = userAndPrescriptionAndFiles.prescription.pharmaceutical_history;

    // Exame Físico
    cardiovascular_system.value = userAndPrescriptionAndFiles.prescription.cardiovascular_system;
    blood_pressure.value = userAndPrescriptionAndFiles.prescription.blood_pressure;
    heart_rate.value = userAndPrescriptionAndFiles.prescription.heart_rate;
    respiratory_system.value = userAndPrescriptionAndFiles.prescription.respiratory_system;
    oxygen_saturation.value = userAndPrescriptionAndFiles.prescription.oxygen_saturation;
    adb.value = userAndPrescriptionAndFiles.prescription.adb;
    mmii.value = userAndPrescriptionAndFiles.prescription.mmii;
    otoscopy.value = userAndPrescriptionAndFiles.prescription.otoscopy;
    ophthalmoscopy.value = userAndPrescriptionAndFiles.prescription.ophthalmoscopy;
    romberg.value = userAndPrescriptionAndFiles.prescription.romberg;

    // Marcha
    ceifante.checked = userAndPrescriptionAndFiles.prescription.ceifante;
    ataxica_talonante.checked = userAndPrescriptionAndFiles.prescription.ataxica_talonante;
    escarvante.checked = userAndPrescriptionAndFiles.prescription.escarvante;
    anserina.checked = userAndPrescriptionAndFiles.prescription.anserina;
    cerebelar.checked = userAndPrescriptionAndFiles.prescription.cerebelar;
    magnetica.checked = userAndPrescriptionAndFiles.prescription.magnetica;
    parkinsoniana.checked = userAndPrescriptionAndFiles.prescription.parkinsoniana;

    // Diagnóstico sindrômico
    cognitivo.checked = userAndPrescriptionAndFiles.prescription.cognitivo;
    convulsive.checked = userAndPrescriptionAndFiles.prescription.convulsive;
    intracranial_hypertension.checked =
      userAndPrescriptionAndFiles.prescription.intracranial_hypertension;
    meningeal.checked = userAndPrescriptionAndFiles.prescription.meningeal;
    motora.checked = userAndPrescriptionAndFiles.prescription.motora;
    sensitiva.checked = userAndPrescriptionAndFiles.prescription.sensitiva;
    hemiparetica.checked = userAndPrescriptionAndFiles.prescription.hemiparetica;
    paraparetica.checked = userAndPrescriptionAndFiles.prescription.paraparetica;
    tetraparetica.checked = userAndPrescriptionAndFiles.prescription.tetraparetica;
    monoparetica.checked = userAndPrescriptionAndFiles.prescription.monoparetica;
    nmi.value = userAndPrescriptionAndFiles.prescription.nmi;

    // Sindromes Relacionados a Função do Sistema Nervoso Autonomo
    cardiovascular.checked = userAndPrescriptionAndFiles.prescription.cardiovascular;
    respiratory.checked = userAndPrescriptionAndFiles.prescription.respiratory;
    digestive.checked = userAndPrescriptionAndFiles.prescription.digestive;
    sudorese.checked = userAndPrescriptionAndFiles.prescription.cerebelar;
    control_of_sphincters_and_bladder.checked =
      userAndPrescriptionAndFiles.prescription.control_of_sphincters_and_bladder;

    // Sindromes Sensitivas
    hypoesthesias.checked = userAndPrescriptionAndFiles.prescription.hypoesthesias;
    paresthesia.checked = userAndPrescriptionAndFiles.prescription.paresthesia;
    hyperalgesia.checked = userAndPrescriptionAndFiles.prescription.hyperalgesia;

    // Diagnóstico
    prescription.value = userAndPrescriptionAndFiles.prescription.prescription;
    requested_exams.value = userAndPrescriptionAndFiles.prescription.requested_exams;
    notes.value = userAndPrescriptionAndFiles.prescription.notes;
    exam_results.value = userAndPrescriptionAndFiles.prescription.exam_results;
    prescription_date.value = userAndPrescriptionAndFiles.prescription.prescription_date;

    photosUpload.addFile(userAndPrescriptionAndFiles.files);
    gallery.appendChild(photosUpload.render());
  }
);

const savePrescriptions = document.getElementById('save_prescriptions');
document.addEventListener('click', (event: Event) => {
  if (event.target.id === 'save_and_print' || event.target.id === 'save_prescriptions') {
    event.preventDefault();

    const res: PrescriptionAndPhotos = {
      prescription: {
        id: prescription_id,

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

        user_id: user_id,
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

// Gallery
const marcha_files = document.getElementById('marcha_files') as HTMLInputElement;

marcha_files.onchange = function () {
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
