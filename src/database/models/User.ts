import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity()
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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
