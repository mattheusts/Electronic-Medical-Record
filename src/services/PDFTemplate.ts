import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as fs from 'fs';

import { UserAndPrescriptionAndFiles } from '../util';

enum Size {
  MAX_SIZE_PAGE = 300,
}

function imageToBase64(path: string) {
  const img = fs.readFileSync(path);
  return new Buffer(img).toString('base64');
}

function handleParseSchool(schooling: string): string {
  if (schooling === 'EFI') return 'Ensino fundamental incompleto';
  if (schooling === 'EF') return 'Ensino fundamental';
  if (schooling === 'EMI') return 'Ensino médio incompleto';
  if (schooling === 'EM') return 'Ensino médio';
  if (schooling === 'ESI') return 'Ensino superior incompleto';
  if (schooling === 'ES') return 'Ensino superior';
}

function checked(check: boolean): string {
  if (!check) {
    return '(   )';
  } else {
    return '( x )';
  }
}

export async function createPDF(
  userAndPrescriptionAndFiles: UserAndPrescriptionAndFiles,
  defaultPath: string
): Promise<void> {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text('PRONTUÁRIO', 105, 10, null, null, 'center');

  doc.autoTable({
    theme: 'plain',
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 28 },
      2: { fontStyle: 'bold', cellWidth: 45 },
    },
    head: [['', '', '', '']],
    body: [
      ['Nome:', `${userAndPrescriptionAndFiles.name}`, 'NATURALIDADE:', 'RJ'],
      [
        'MÂE:',
        `${userAndPrescriptionAndFiles.mother}`,
        'PAI:',
        `${userAndPrescriptionAndFiles.dad}`,
      ],
      [
        'SEXO:',
        `${userAndPrescriptionAndFiles.sex}`,
        'DATA DE NASCIMENTO:',
        `${userAndPrescriptionAndFiles.birth}`,
      ],
      [
        'RELIGIÃO:',
        `${userAndPrescriptionAndFiles.religion}`,
        'ESCOLARIDADE:',
        `${handleParseSchool(userAndPrescriptionAndFiles.schooling)}`,
      ],
      ['PROFISSÃO:', `${userAndPrescriptionAndFiles.profession}`],
    ],
  });

  let finalY = doc.lastAutoTable.finalY || 10;
  doc.setFontSize(14);
  doc.text('Exame Clínicos', 105, finalY + 10, null, null, 'center');

  doc.autoTable({
    theme: 'plain',
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 38 },
      1: { cellWidth: 80 },
      2: { fontStyle: 'bold', cellWidth: 32 },
    },
    head: [['', '', '', '']],
    body: [
      [
        'Q.P:',
        `${userAndPrescriptionAndFiles.prescription.main_complaint}`,
        'H.FAMILIAR:',
        `${userAndPrescriptionAndFiles.prescription.family_history}`,
      ],
      [
        'H.D.A:',
        `${userAndPrescriptionAndFiles.prescription.history_current}`,
        'H.SOCIAL:',
        `${userAndPrescriptionAndFiles.prescription.social_history}`,
      ],
      [
        'H.P.P:',
        `${userAndPrescriptionAndFiles.prescription.previous_pathological_history}`,
        'H.FISIOLÓGICA:',
        `${userAndPrescriptionAndFiles.prescription.physiological_history}`,
      ],
      ['H.FARMACEUTICO:', `${userAndPrescriptionAndFiles.prescription.pharmaceutical_history}`],
    ],
  });

  finalY = doc.lastAutoTable.finalY || 10;
  doc.setFontSize(14);
  doc.text('Exame físicos', 105, finalY + 10, null, null, 'center');

  doc.autoTable({
    theme: 'plain',
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 35 },
      1: { cellWidth: 100 },
      2: { fontStyle: 'bold' },
    },
    head: [['', '', '', '', '', '']],
    body: [
      [
        'A.C.V:',
        `${userAndPrescriptionAndFiles.prescription.cardiovascular_system}`,
        'P.A:',
        `${userAndPrescriptionAndFiles.prescription.blood_pressure}`,
        'F.C:',
        `${userAndPrescriptionAndFiles.prescription.heart_rate}`,
      ],
      [
        'A.R:',
        `${userAndPrescriptionAndFiles.prescription.respiratory_system}`,
        'SAT:',
        `${userAndPrescriptionAndFiles.prescription.oxygen_saturation}`,
      ],
      ['A.B.D:', `${userAndPrescriptionAndFiles.prescription.adb}`],
      ['MMII:', `${userAndPrescriptionAndFiles.prescription.mmii}`],
      ['OTOSCOPIA:', `${userAndPrescriptionAndFiles.prescription.otoscopy}`],
      ['OFTALMOSCOPIA:', `${userAndPrescriptionAndFiles.prescription.ophthalmoscopy}`],
      ['ROMBERG:', `${userAndPrescriptionAndFiles.prescription.romberg}`],
    ],
  });

  finalY = doc.lastAutoTable.finalY || 10;
  doc.setFontSize(14);
  doc.text('Marcha', 105, finalY + 10, null, null, 'center');

  doc.autoTable({
    theme: 'plain',
    columnStyles: { 0: { fontStyle: 'bold' }, 1: { fontStyle: 'bold' }, 2: { fontStyle: 'bold' } },
    head: [['', '', '']],
    body: [
      [
        `CEIFANTE: ${checked(userAndPrescriptionAndFiles.prescription.ceifante)}`,
        `ATAXICA TALONANTE: ${checked(userAndPrescriptionAndFiles.prescription.ataxica_talonante)}`,
        `ESCARVANTE: ${checked(userAndPrescriptionAndFiles.prescription.escarvante)}`,
      ],
      [
        `ANSERINA: ${checked(userAndPrescriptionAndFiles.prescription.anserina)}`,
        `CEREBELAR: ${checked(userAndPrescriptionAndFiles.prescription.cerebelar)}`,
        `MAGNÉTICA: ${checked(userAndPrescriptionAndFiles.prescription.magnetica)}`,
      ],
      [`PARKINSONIANA: ${checked(userAndPrescriptionAndFiles.prescription.parkinsoniana)}`],
    ],
  });

  finalY = doc.lastAutoTable.finalY || 10;
  doc.setFontSize(14);
  doc.text('Diagnóstico sindrômico', 105, finalY + 10, null, null, 'center');

  doc.autoTable({
    theme: 'plain',
    columnStyles: { 0: { fontStyle: 'bold' }, 1: { fontStyle: 'bold' }, 2: { fontStyle: 'bold' } },
    head: [['', '']],
    body: [
      [
        `S.D COGNITIVO: ${checked(userAndPrescriptionAndFiles.prescription.cognitivo)}`,
        `S.D CONVULSIVA: ${checked(true)}`,
      ],
      [
        `S.D MOTORA: ${checked(userAndPrescriptionAndFiles.prescription.motora)}`,
        `S.D MENÍNGEA: ${checked(userAndPrescriptionAndFiles.prescription.meningeal)}`,
      ],
      [
        `S.D HEMIPARÉTICA: ${checked(userAndPrescriptionAndFiles.prescription.hemiparetica)}`,
        `S.D SENSITIVA: ${checked(true)}`,
      ],
      [
        `TETRAPARÉTICA: ${checked(userAndPrescriptionAndFiles.prescription.tetraparetica)}`,
        `S.D PARAPARÉTICA: ${checked(userAndPrescriptionAndFiles.prescription.paraparetica)}`,
      ],
      [
        `S.D HIPERTENSÃO INTRACRANIANA: ${checked(
          userAndPrescriptionAndFiles.prescription.intracranial_hypertension
        )}`,
        `MONOPARÉTICA: ${checked(userAndPrescriptionAndFiles.prescription.monoparetica)}`,
      ],
      [`SINDROME DO NMI: ${userAndPrescriptionAndFiles.prescription.nmi}`],
    ],
  });

  finalY = doc.lastAutoTable.finalY || 10;
  doc.setFontSize(14);
  doc.text(
    'Sindromes Relacionados a Função do Sistema Nervoso Autonomo',
    105,
    finalY + 10,
    null,
    null,
    'center'
  );

  doc.autoTable({
    theme: 'plain',
    columnStyles: { 0: { fontStyle: 'bold' }, 1: { fontStyle: 'bold' }, 2: { fontStyle: 'bold' } },
    head: [['', '']],
    body: [
      [
        `CARDIOVASCULAR: ${checked(userAndPrescriptionAndFiles.prescription.cardiovascular)}`,
        `RESPIRATÓRIAS: ${checked(userAndPrescriptionAndFiles.prescription.respiratory)}`,
      ],
      [
        `DIGESTIVAS: ${checked(userAndPrescriptionAndFiles.prescription.digestive)}`,
        `SUDORESE: ${checked(userAndPrescriptionAndFiles.prescription.sudorese)}`,
      ],
      [
        `CONTROLE DOS ESFÍNCTERES E VESICAL: ${checked(
          userAndPrescriptionAndFiles.prescription.control_of_sphincters_and_bladder
        )}`,
      ],
    ],
  });

  finalY = doc.lastAutoTable.finalY || 10;
  doc.setFontSize(14);
  doc.text('Sindromes Sensitivas', 105, finalY + 10, null, null, 'center');

  doc.autoTable({
    theme: 'plain',
    columnStyles: { 0: { fontStyle: 'bold' }, 1: { fontStyle: 'bold' }, 2: { fontStyle: 'bold' } },
    head: [['', '']],
    body: [
      [
        `HIPOESTESIAS: ${checked(userAndPrescriptionAndFiles.prescription.hypoesthesias)}`,
        `PARESTESIA: ${checked(userAndPrescriptionAndFiles.prescription.paresthesia)}`,
      ],
      [`HIPERALGESIA: ${checked(userAndPrescriptionAndFiles.prescription.hypoesthesias)}`],
    ],
  });

  finalY = doc.lastAutoTable.finalY || 10;
  doc.setFontSize(14);
  doc.text('Diagnóstico', 105, finalY + 10, null, null, 'center');

  doc.autoTable({
    theme: 'plain',
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 50 }, 2: { fontStyle: 'bold' } },
    head: [['', '']],
    body: [
      ['PRESCRIÇÃO:', `${userAndPrescriptionAndFiles.prescription.prescription}`],
      ['EXAMES SOLICITADOS:', `${userAndPrescriptionAndFiles.prescription.requested_exams}`],
      ['ANOTAÇÕES:', `${userAndPrescriptionAndFiles.prescription.notes}`],
      ['RESULTADOS DE EXAMES:', `${userAndPrescriptionAndFiles.prescription.exam_results}`],
      ['DATA DA PRESCRIÇÃO:', `${userAndPrescriptionAndFiles.prescription.prescription_date}`],
    ],
  });

  finalY = doc.lastAutoTable.finalY || 10;
  doc.setFontSize(14);
  doc.text('Imagens', 105, finalY + 10, null, null, 'center');
  finalY += 20;

  let twoPhoto = 0;
  for (const file of userAndPrescriptionAndFiles.files) {
    if (twoPhoto == 0) {
      if (finalY + 100 >= 300) {
        doc.addPage('a4');
        finalY = 10;
      }

      const base64Img = imageToBase64(file.path);
      doc.addImage(base64Img, `${file.type.split('/')[1]}`, 2, finalY, 100, 100);
      twoPhoto++;
      continue;
    }

    if (twoPhoto == 1) {
      if (finalY + 100 >= 300) {
        doc.addPage('a4');
        finalY = 10;
      }

      const base64Img = imageToBase64(file.path);
      doc.addImage(base64Img, `${file.type.split('/')[1]}`, 104, finalY, 100, 100);
      finalY += 110;
    }
    twoPhoto = 0;
  }

  doc.save(defaultPath);
}
