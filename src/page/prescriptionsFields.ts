interface Fields {
  // Exame neurológico
  neurological_examination: HTMLInputElement;

  // Exame Clínicos
  main_complaint: HTMLInputElement;
  family_history: HTMLInputElement;
  history_current: HTMLInputElement;
  social_history: HTMLInputElement;
  previous_pathological_history: HTMLInputElement;
  physiological_history: HTMLInputElement;
  pharmaceutical_history: HTMLInputElement;

  // Exame físico
  cardiovascular_system: HTMLInputElement;
  blood_pressure: HTMLInputElement;
  heart_rate: HTMLInputElement;
  respiratory_system: HTMLInputElement;
  oxygen_saturation: HTMLInputElement;
  adb: HTMLInputElement;
  mmii: HTMLInputElement;
  otoscopy: HTMLInputElement;
  ophthalmoscopy: HTMLInputElement;
  romberg: HTMLInputElement;

  // Marcha
  ceifante: HTMLInputElement;
  ataxica_talonante: HTMLInputElement;
  escarvante: HTMLInputElement;
  anserina: HTMLInputElement;
  cerebelar: HTMLInputElement;
  magnetica: HTMLInputElement;
  parkinsoniana: HTMLInputElement;

  // Diagnóstico sindrômico
  cognitivo: HTMLInputElement;
  convulsive: HTMLInputElement;
  intracranial_hypertension: HTMLInputElement;
  meningeal: HTMLInputElement;
  motora: HTMLInputElement;
  sensitiva: HTMLInputElement;
  hemiparetica: HTMLInputElement;
  paraparetica: HTMLInputElement;
  tetraparetica: HTMLInputElement;
  monoparetica: HTMLInputElement;
  nmi: HTMLInputElement;

  // Sindromes Relacionados a Função do Sistema Nervoso Autonomo
  cardiovascular: HTMLInputElement;
  respiratory: HTMLInputElement;
  digestive: HTMLInputElement;
  sudorese: HTMLInputElement;
  control_of_sphincters_and_bladder: HTMLInputElement;

  // Sindromes Sensitivas
  hypoesthesias: HTMLInputElement;
  paresthesia: HTMLInputElement;
  hyperalgesia: HTMLInputElement;

  // Diagnóstico
  prescription: HTMLInputElement;
  requested_exams: HTMLInputElement;
  notes: HTMLInputElement;
  exam_results: HTMLInputElement;
  prescription_date: HTMLInputElement;
}

function inputFields(): Fields {
  const neurological_examination = document.getElementById(
    'neurological_examination'
  ) as HTMLInputElement;

  const main_complaint = document.getElementById(
    'main_complaint'
  ) as HTMLInputElement;

  const family_history = document.getElementById(
    'family_history'
  ) as HTMLInputElement;

  const history_current = document.getElementById(
    'history_current'
  ) as HTMLInputElement;

  const social_history = document.getElementById(
    'social_history'
  ) as HTMLInputElement;

  const previous_pathological_history = document.getElementById(
    'previous_pathological_history'
  ) as HTMLInputElement;

  const physiological_history = document.getElementById(
    'physiological_history'
  ) as HTMLInputElement;

  const pharmaceutical_history = document.getElementById(
    'pharmaceutical_history'
  ) as HTMLInputElement;

  // Exame físico

  const cardiovascular_system = document.getElementById(
    'cardiovascular_system'
  ) as HTMLInputElement;

  const blood_pressure = document.getElementById(
    'blood_pressure'
  ) as HTMLInputElement;

  const heart_rate = document.getElementById('heart_rate') as HTMLInputElement;

  const respiratory_system = document.getElementById(
    'respiratory_system'
  ) as HTMLInputElement;

  const oxygen_saturation = document.getElementById(
    'oxygen_saturation'
  ) as HTMLInputElement;

  const adb = document.getElementById('adb') as HTMLInputElement;

  const mmii = document.getElementById('mmii') as HTMLInputElement;

  const otoscopy = document.getElementById('otoscopy') as HTMLInputElement;

  const ophthalmoscopy = document.getElementById(
    'ophthalmoscopy'
  ) as HTMLInputElement;

  const romberg = document.getElementById('romberg') as HTMLInputElement;

  // Marcha

  const ceifante = document.getElementById('ceifante') as HTMLInputElement;

  const ataxica_talonante = document.getElementById(
    'ataxica_talonante'
  ) as HTMLInputElement;

  const escarvante = document.getElementById('escarvante') as HTMLInputElement;

  const anserina = document.getElementById('anserina') as HTMLInputElement;

  const cerebelar = document.getElementById('cerebelar') as HTMLInputElement;

  const magnetica = document.getElementById('magnetica') as HTMLInputElement;

  const parkinsoniana = document.getElementById(
    'parkinsoniana'
  ) as HTMLInputElement;

  // Diagnóstico sindrômico

  const cognitivo = document.getElementById('cognitivo') as HTMLInputElement;

  const convulsive = document.getElementById('convulsive') as HTMLInputElement;

  const intracranial_hypertension = document.getElementById(
    'intracranial_hypertension'
  ) as HTMLInputElement;

  const meningeal = document.getElementById('meningeal') as HTMLInputElement;

  const motora = document.getElementById('motora') as HTMLInputElement;

  const sensitiva = document.getElementById('sensitiva') as HTMLInputElement;

  const hemiparetica = document.getElementById(
    'hemiparetica'
  ) as HTMLInputElement;

  const paraparetica = document.getElementById(
    'paraparetica'
  ) as HTMLInputElement;

  const tetraparetica = document.getElementById(
    'tetraparetica'
  ) as HTMLInputElement;

  const monoparetica = document.getElementById(
    'monoparetica'
  ) as HTMLInputElement;

  const nmi = document.getElementById('nmi') as HTMLInputElement;

  // Sindromes Relacionados a Função do Sistema Nervoso Autonomo

  const cardiovascular = document.getElementById(
    'cardiovascular'
  ) as HTMLInputElement;

  const respiratory = document.getElementById(
    'respiratory'
  ) as HTMLInputElement;

  const digestive = document.getElementById('digestive') as HTMLInputElement;

  const sudorese = document.getElementById('sudorese') as HTMLInputElement;

  const control_of_sphincters_and_bladder = document.getElementById(
    'control_of_sphincters_and_bladder'
  ) as HTMLInputElement;

  // Sindromes Sensitivas

  const hypoesthesias = document.getElementById(
    'hypoesthesias'
  ) as HTMLInputElement;

  const paresthesia = document.getElementById(
    'paresthesia'
  ) as HTMLInputElement;

  const hyperalgesia = document.getElementById(
    'hyperalgesia'
  ) as HTMLInputElement;

  // Diagnóstico

  const prescription = document.getElementById(
    'prescription'
  ) as HTMLInputElement;

  const requested_exams = document.getElementById(
    'requested_exams'
  ) as HTMLInputElement;

  const notes = document.getElementById('notes') as HTMLInputElement;

  const exam_results = document.getElementById(
    'exam_results'
  ) as HTMLInputElement;

  const prescription_date = document.getElementById(
    'prescription_date'
  ) as HTMLInputElement;

  return {
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
  };
}

export { inputFields };
