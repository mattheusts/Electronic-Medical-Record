import { ipcRenderer } from 'electron';
import { UserAndPrescription } from '../util';
import { inputFields } from './prescriptionsFields';

window.onload = () => {
  ipcRenderer.on('LoadEditPrescription', (error, userAndPrescription: UserAndPrescription) => {
    const name = document.getElementById('name') as HTMLInputElement;
    const birth = document.getElementById('birth') as HTMLInputElement;

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

    name.value = userAndPrescription.name;
    birth.value = userAndPrescription.birth;

    neurological_examination.value = userAndPrescription.prescription.neurological_examination;

    main_complaint.value = userAndPrescription.prescription.main_complaint;
    family_history.value = userAndPrescription.prescription.family_history;
    history_current.value = userAndPrescription.prescription.history_current;
    social_history.value = userAndPrescription.prescription.social_history;
    previous_pathological_history.value =
      userAndPrescription.prescription.previous_pathological_history;
    physiological_history.value = userAndPrescription.prescription.physiological_history;
    pharmaceutical_history.value = userAndPrescription.prescription.pharmaceutical_history;

    // Exame Físico
    cardiovascular_system.value = userAndPrescription.prescription.cardiovascular_system;
    blood_pressure.value = userAndPrescription.prescription.blood_pressure;
    heart_rate.value = userAndPrescription.prescription.heart_rate;
    respiratory_system.value = userAndPrescription.prescription.respiratory_system;
    oxygen_saturation.value = userAndPrescription.prescription.oxygen_saturation;
    adb.value = userAndPrescription.prescription.adb;
    mmii.value = userAndPrescription.prescription.mmii;
    otoscopy.value = userAndPrescription.prescription.otoscopy;
    ophthalmoscopy.value = userAndPrescription.prescription.ophthalmoscopy;
    romberg.value = userAndPrescription.prescription.romberg;

    // Marcha
    ceifante.checked = userAndPrescription.prescription.ceifante;
    ataxica_talonante.checked = userAndPrescription.prescription.ataxica_talonante;
    escarvante.checked = userAndPrescription.prescription.escarvante;
    anserina.checked = userAndPrescription.prescription.anserina;
    cerebelar.checked = userAndPrescription.prescription.cerebelar;
    magnetica.checked = userAndPrescription.prescription.magnetica;
    parkinsoniana.checked = userAndPrescription.prescription.parkinsoniana;

    // Diagnóstico sindrômico
    cognitivo.checked = userAndPrescription.prescription.cognitivo;
    convulsive.checked = userAndPrescription.prescription.convulsive;
    intracranial_hypertension.checked = userAndPrescription.prescription.intracranial_hypertension;
    meningeal.checked = userAndPrescription.prescription.meningeal;
    motora.checked = userAndPrescription.prescription.motora;
    sensitiva.checked = userAndPrescription.prescription.sensitiva;
    hemiparetica.checked = userAndPrescription.prescription.hemiparetica;
    paraparetica.checked = userAndPrescription.prescription.paraparetica;
    tetraparetica.checked = userAndPrescription.prescription.tetraparetica;
    monoparetica.checked = userAndPrescription.prescription.monoparetica;
    nmi.value = userAndPrescription.prescription.nmi;

    // Sindromes Relacionados a Função do Sistema Nervoso Autonomo
    cardiovascular.checked = userAndPrescription.prescription.cardiovascular;
    respiratory.checked = userAndPrescription.prescription.respiratory;
    digestive.checked = userAndPrescription.prescription.digestive;
    sudorese.checked = userAndPrescription.prescription.cerebelar;
    control_of_sphincters_and_bladder.checked =
      userAndPrescription.prescription.control_of_sphincters_and_bladder;

    // Sindromes Sensitivas
    hypoesthesias.checked = userAndPrescription.prescription.hypoesthesias;
    paresthesia.checked = userAndPrescription.prescription.paresthesia;
    hyperalgesia.checked = userAndPrescription.prescription.hyperalgesia;

    // Diagnóstico
    prescription.value = userAndPrescription.prescription.prescription;
    requested_exams.value = userAndPrescription.prescription.requested_exams;
    notes.value = userAndPrescription.prescription.notes;
    exam_results.value = userAndPrescription.prescription.exam_results;
    prescription_date.value = userAndPrescription.prescription.prescription_date;
  });
};
