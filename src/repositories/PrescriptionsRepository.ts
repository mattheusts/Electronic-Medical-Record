import { EntityRepository, Repository } from 'typeorm';
import { Prescription } from '../database/models/Prescription';

@EntityRepository(Prescription)
class PrescriptionRepository extends Repository<Prescription> {}

export { PrescriptionRepository };
