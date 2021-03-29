import { createConnection, Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { app } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { Prescription } from './models/Prescription';
import { User } from './models/User';
import { usersAndPrescription } from '../util';

export default class Database {
  private connection: Connection;

  constructor() {
    this.init();
  }

  public async init(): Promise<void> {
    this.connection = await createConnection({
      type: 'sqlite',
      database: path.join(
        path.join(app.getPath('userData'), 'electronic-medical-record'),
        'Electronic-Medical-Record.sqlite'
      ),
      entities: [User, Prescription],
    });

    if (this.connection.isConnected) {
      this.connection.synchronize();
    }
  }

  public async insertUser(user: User
  ): Promise<User> {
    const userRepository = this.connection.getRepository(User);
    const newUser: User = {
      id: uuid(),
      name: user.name,
      naturalness: user.naturalness,
      mother: user.mother,
      dad: user.dad,
      sex: user.sex,
      birth: user.birth,
      religion: user.religion,
      schooling: user.schooling,
      profession: user.profession,
      created_at: user.created_at || new Date(),
      updated_at: user.updated_at || new Date(),
    };

    return userRepository.save(newUser);
  }

  public async insertPrescription(
    userID: string,
    prescriptionDescription: string,
    prescriptionDate: string,
    created_at?: Date,
    updated_at?: Date
  ): Promise<Prescription> {
    const prescriptionRepository = this.connection.getRepository(Prescription);
    const prescription: Prescription = {
      id: uuid(),
      prescription: prescriptionDescription,
      prescription_date: prescriptionDate,
      user_id: userID,
      created_at: created_at || new Date(),
      updated_at: updated_at || new Date(),
    };

    return prescriptionRepository.save(prescription);
  }

  public async getAllUsers(): Promise<User[]> {
    const userRepository = this.connection.getRepository(User);
    return userRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  public async getUser(user_id: string): Promise<User> {
    const userRepository = this.connection.getRepository(User);
    return userRepository.findOne({ id: user_id });
  }

  public seachAllPrescription(): Promise<Prescription[]> {
    const prescriptionRepository = this.connection.getRepository(Prescription);
    return prescriptionRepository.find();
  }

  public async searchByName(name: string): Promise<User[]> {
    const users = await this.connection.manager
      .getRepository(User)
      .createQueryBuilder()
      .select()
      .where('name LIKE :name', { name: `%${name}%` })
      .getMany();

    return users;
  }

  public async getAllPrescriptionByUserId(id: string): Promise<Prescription[]> {
    return await this.connection
      .getRepository(Prescription)
      .createQueryBuilder('prescription')
      .where(`prescription."user_id" = '${id}'`)
      .orderBy(`DATE(prescription.created_at)`, 'DESC')
      .getMany();
  }

  public async getFristPrescriptionByUserId(id: string): Promise<Prescription> {
    return await this.connection
      .getRepository(Prescription)
      .createQueryBuilder('prescription')
      .where(`prescription."user_id" = '${id}'`)
      .orderBy(`DATE(prescription.created_at)`, 'DESC')
      .getOne();
  }

  public async updateUser(newUser: User): Promise<User> {
    const userRepository = this.connection.getRepository(User);
    const oldUser = await userRepository.findOne({ id: newUser.id });
    return await userRepository.save({ ...oldUser, ...newUser });
  }

  public async searchOnePrescriptionByUserId(
    id: string
  ): Promise<Prescription> {
    const prescriptionRepository = this.connection.getRepository(Prescription);
    return prescriptionRepository.findOne({ user_id: id });
  }

  public async searchAllPrescriptionByUserId(
    id: string
  ): Promise<Prescription[]> {
    const prescriptionRepository = this.connection.getRepository(Prescription);
    return prescriptionRepository.find({ user_id: id });
  }

  public async searchAllAndPrescription(
    limit = 10
  ): Promise<usersAndPrescription[]> {
    const userRepository = this.connection.getRepository(User);
    const users = await userRepository.find({
      take: limit,
      order: {
        name: 'ASC',
      },
    });

    const usersAndPrescription: usersAndPrescription[] = [];

    for (const user of users) {
      const prescription = await this.searchOnePrescriptionByUserId(user.id);

      usersAndPrescription.push({
        id: user.id,
        name: user.name,
        prescription: prescription.prescription,
      });
    }
    return usersAndPrescription;
  }

  public async deleteUserAndPrescription(id: string): Promise<void> {
    const userRepository = this.connection.getRepository(User);
    await userRepository.delete({ id: id });

    const prescriptionRepository = this.connection.getRepository(Prescription);
    await prescriptionRepository.delete({ user_id: id });
  }
}
