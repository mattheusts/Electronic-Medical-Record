import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

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
