import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Prescription } from './Prescription';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid')
  readonly id?: string;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  size: number;

  @Column()
  type: string;

  @Column()
  lastModified: number;

  @Column()
  lastModifiedDate: string;

  @Column()
  prescription_id?: string;

  @ManyToOne(() => Prescription, (prescription) => prescription.files, { onDelete: 'CASCADE' })
  prescription: Prescription;

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
