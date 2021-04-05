import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string;

  @Column()
  main_complaint: string;

  @Column()
  history_current: string;

  @Column()
  cardiovascular_system: string;

  @Column()
  blood_pressure: string;

  @Column()
  heart_rate: string;

  @Column()
  respiratory_system: string;

  @Column()
  vesicular_murmur: string;

  @Column()
  oxygen_saturation: string;

  @Column()
  adb: string;

  @Column()
  upper_limbs: string;

  @Column()
  previous_pathological_history: string;

  @Column()
  neurological_examination: string;

  @Column()
  family_history: string;

  @Column()
  social_history: string;

  @Column()
  physiological_history: string;

  @Column()
  ducts: string;

  @Column()
  otoscopy: string;

  @Column()
  ophthalmoscopy: string;

  @Column()
  mmii: string;

  @Column()
  romberg: string;

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

  @Column()
  prescription: string;

  @Column()
  prescription_date: string;

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
