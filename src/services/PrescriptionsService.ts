import { User } from '../database/models/User';
import { getCustomRepository, Repository } from 'typeorm';
import { Prescription } from '../database/models/Prescription';
import { PrescriptionRepository } from '../repositories/PrescriptionsRepository';

interface IPrescriptionCreate {
  id?: string;
  neurological_examination: string;
  main_complaint: string;
  family_history: string;
  history_current: string;
  social_history: string;
  previous_pathological_history: string;
  physiological_history: string;
  pharmaceutical_history: string;
  cardiovascular_system: string;
  blood_pressure: string;
  heart_rate: string;
  respiratory_system: string;
  oxygen_saturation: string;
  adb: string;
  mmii: string;
  otoscopy: string;
  ophthalmoscopy: string;
  romberg: string;
  ceifante: boolean;
  ataxica_talonante: boolean;
  escarvante: boolean;
  anserina: boolean;
  cerebelar: boolean;
  magnetica: boolean;
  parkinsoniana: boolean;
  cognitivo: boolean;
  convulsive: boolean;
  intracranial_hypertension: boolean;
  meningeal: boolean;
  motora: boolean;
  sensitiva: boolean;
  hemiparetica: boolean;
  paraparetica: boolean;
  tetraparetica: boolean;
  monoparetica: boolean;
  nmi: string;
  cardiovascular: boolean;
  respiratory: boolean;
  digestive: boolean;
  sudorese: boolean;
  control_of_sphincters_and_bladder: boolean;
  hypoesthesias: boolean;
  paresthesia: boolean;
  hyperalgesia: boolean;
  prescription: string;
  requested_exams: string;
  notes: string;
  exam_results: string;
  prescription_date: string;
  user: User;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
}

class PrescriptionService {
  private prescriptionRepository: Repository<Prescription>;

  constructor() {
    this.prescriptionRepository = getCustomRepository(PrescriptionRepository);
  }

  async create(prescription: IPrescriptionCreate): Promise<Prescription> {
    const newPrescription = await this.prescriptionRepository.create(prescription);
    await this.prescriptionRepository.save(newPrescription);
    return newPrescription;
  }

  async findOne(id: string, relations?: string[]): Promise<Prescription> {
    return await this.prescriptionRepository.findOne({
      where: { id },
      relations,
    });
  }

  async update(prescription: IPrescriptionCreate): Promise<Prescription> {
    const oldPrescription = this.prescriptionRepository.findOne({ where: { id: prescription.id } });
    return await this.prescriptionRepository.save({
      ...oldPrescription,
      ...prescription,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prescriptionRepository.delete({ id });
  }
}

export { PrescriptionService, IPrescriptionCreate };
