import { EntityRepository, Repository } from 'typeorm';
import { File } from '../database/models/File';

@EntityRepository(File)
class FilesRepository extends Repository<File> {}

export { FilesRepository };
