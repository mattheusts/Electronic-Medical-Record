import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { User } from './User';
import { File } from './File';

@Entity('prescription')
export class Prescription {
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string;

  // Exame neurológico
  @Column()
  neurological_examination: string;

  // Exame Clínicos

  @Column()
  main_complaint: string;

  @Column()
  family_history: string;

  @Column()
  history_current: string;

  @Column()
  social_history: string;

  @Column()
  previous_pathological_history: string;

  @Column()
  physiological_history: string;

  @Column()
  pharmaceutical_history: string;

  // Exame físico

  @Column()
  cardiovascular_system: string;

  @Column()
  blood_pressure: string;

  @Column()
  heart_rate: string;

  @Column()
  respiratory_system: string;

  @Column()
  oxygen_saturation: string;

  @Column()
  adb: string;

  @Column()
  mmii: string;

  @Column()
  otoscopy: string;

  @Column()
  ophthalmoscopy: string;

  @Column()
  romberg: string;

  // Marcha

  @Column()
  ceifante: boolean;

  @Column()
  ataxica_talonante: boolean;

  @Column()
  escarvante: boolean;

  @Column()
  anserina: boolean;

  @Column()
  cerebelar: boolean;

  @Column()
  magnetica: boolean;

  @Column()
  parkinsoniana: boolean;

  // Diagnóstico sindrômico

  @Column()
  cognitivo: boolean;

  @Column()
  convulsive: boolean;

  @Column()
  intracranial_hypertension: boolean;

  @Column()
  meningeal: boolean;

  @Column()
  motora: boolean;

  @Column()
  sensitiva: boolean;

  @Column()
  hemiparetica: boolean;

  @Column()
  paraparetica: boolean;

  @Column()
  tetraparetica: boolean;

  @Column()
  monoparetica: boolean;

  @Column()
  nmi: string;

  // Sindromes Relacionados a Função do Sistema Nervoso Autonomo

  @Column()
  cardiovascular: boolean;

  @Column()
  respiratory: boolean;

  @Column()
  digestive: boolean;

  @Column()
  sudorese: boolean;

  @Column()
  control_of_sphincters_and_bladder: boolean;

  // Sindromes Sensitivas

  @Column()
  hypoesthesias: boolean;

  @Column()
  paresthesia: boolean;

  @Column()
  hyperalgesia: boolean;

  // Diagnóstico

  @Column()
  prescription: string;

  @Column()
  requested_exams: string;

  @Column()
  notes: string;

  @Column()
  exam_results: string;

  @Column()
  prescription_date: string;

  @ManyToOne(() => User, (user) => user.prescriptions)
  user: User;

  @OneToMany(() => File, (file) => file.prescription)
  files?: File[];

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
