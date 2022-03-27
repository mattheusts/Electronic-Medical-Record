import { app } from 'electron';
import jsPDF from 'jspdf';
import { Table, UserOptions } from 'jspdf-autotable';
import * as fs from 'fs';
import * as path from 'path';
import { IPrescriptionCreate } from '../services/PrescriptionsService';
import { Prescription } from '../database/models/Prescription';
import { IFileCreate } from '../services/FilesService';

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

export interface UserAndPrescription extends Omit<UserAndPrescriptions, 'prescriptions'>{
  prescription: Prescription;
}

export interface UserAndPrescriptionAndFiles extends Omit<UserAndPrescriptions, 'prescriptions'> {
  prescription: IPrescriptionCreate;
  files: IFileCreate[];
}

export interface Person {
  name: string;
  naturalness: string;
  mother: string;
  dad: string;
  sex: string;
  birth: string;
}

export interface PrescriptionAndPhotos {
  prescription: IPrescriptionCreate;
  files: IFileCreate[];
}

export function setDefaultPath(): void {
  const globalPath = path.join(app.getPath('userData'), 'electronic-medical-record');

  if (!fs.existsSync(globalPath)) {
    fs.mkdirSync(globalPath);
    global.DEFAULT_SAVE_PATH = globalPath;
  } else {
    global.DEFAULT_SAVE_PATH = globalPath;
  }

  const globalSaveImages = path.join(globalPath, 'images');

  if (!fs.existsSync(globalSaveImages)) {
    fs.mkdirSync(globalSaveImages);
    global.DEFAULT_SAVE_IMAGES = globalSaveImages;
  } else {
    global.DEFAULT_SAVE_IMAGES = globalSaveImages;
  }
}

// convert image
export function imageToBase64(path: string): string {
  const img = fs.readFileSync(path);
  return img.toString('base64');
}

// jsPDF type with plugin jspdf-autotable
export interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
  lastAutoTable: Table;
}
