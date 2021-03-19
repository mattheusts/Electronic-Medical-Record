import { Prescription } from './models/Prescription';
import Database from '.';

export interface PrescriptionInsert {
  userID: string;
  prescriptionDescription: string;
  prescriptionDate: string;
}

export class PrescriptionRegister {
  db = new Database();

  public async insert(
    prescriptionInsert: PrescriptionInsert
  ): Promise<Prescription> {
    const prescription = await this.db.insertPrescription(
      prescriptionInsert.userID,
      prescriptionInsert.prescriptionDescription,
      prescriptionInsert.prescriptionDate
    );

    return prescription;
  }
}
