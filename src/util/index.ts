import { Prescription } from '../database/models/Prescription';
import { PhotoInfo } from './Photo';

export interface usersAndPrescription {
  id: string;
  name: string;
  prescription: string;
}

export interface UserAndPrescriptions {
  id?: string;
  name: string;
  naturalness: string;
  mother: string;
  dad: string;
  sex: string;
  birth: string;
  religion: string;
  schooling: string;
  profession: string;
  prescriptions: Prescription[];
  created_at?: Date;
  updated_at?: Date;
}

export interface UserAndPrescription {
  id?: string;
  name: string;
  naturalness: string;
  mother: string;
  dad: string;
  sex: string;
  birth: string;
  religion: string;
  schooling: string;
  profession: string;
  prescription: Prescription;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserAndPrescriptionAndFiles {
  id?: string;
  name: string;
  naturalness: string;
  mother: string;
  dad: string;
  sex: string;
  birth: string;
  religion: string;
  schooling: string;
  profession: string;
  prescription: Prescription;
  files: PhotoInfo[];
  created_at?: Date;
  updated_at?: Date;
}

export interface PDFPrescription {
  date: string;
  prescription: string;
}

export interface Person {
  name: string;
  naturalness: string;
  mother: string;
  dad: string;
  sex: string;
  birth: string;
}

export interface PDFUserPrescription {
  person: Person;
  prescriptions: PDFPrescription[];
}

export interface PrescriptionAndPhotos {
  prescription: Prescription;
  files: PhotoInfo[];
}
