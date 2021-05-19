import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../database/models/User';
import { Prescription } from '../database/models/Prescription';
import { UsersRepository } from '../repositories/UsersRepository';

interface IUserCreate {
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
  prescriptions?: Prescription[];
  created_at?: Date;
  updated_at?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IUserUpdate extends Omit<IUserCreate, 'prescriptions'> {}

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create(user: IUserCreate): Promise<User> {
    const newUser = await this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async update(user: IUserUpdate): Promise<User> {
    const oldUser = await this.usersRepository.findOne({ id: user.id });
    return this.usersRepository.save({ ...oldUser, ...user });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      order: { updated_at: 'ASC' },
      relations: ['prescriptions'],
    });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find({ order: { name: 'ASC' } });
    return users;
  }

  async findOneAllCascade(id: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id },
      relations: ['prescriptions'],
    });
  }

  async findByName(name: string): Promise<User[]> {
    const users = await this.usersRepository
      .createQueryBuilder()
      .select()
      .orderBy({ name: 'ASC' })
      .where('name LIKE :name', { name: `%${name}%` })
      .getMany();

    return users;
  }

  async listByUser(user_id: string): Promise<User[]> {
    const list = await this.usersRepository.find({
      where: { user_id },
      relations: ['prescription'],
    });

    return list;
  }
}

export { UsersService, IUserCreate, IUserUpdate };
