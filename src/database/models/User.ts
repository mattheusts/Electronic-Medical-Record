import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Prescription } from './Prescription';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string;

  @Column()
  name: string;

  @Column()
  naturalness: string;

  @Column()
  mother: string;

  @Column()
  dad: string;

  @Column()
  sex: string;

  @Column()
  birth: string;

  @Column()
  religion: string;

  @Column()
  schooling: string;

  @Column()
  profession: string;

  @OneToMany(() => Prescription, (prescription) => prescription.user)
  prescriptions?: Prescription[];

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
