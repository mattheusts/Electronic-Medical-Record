import { EntityRepository, Repository } from 'typeorm';
import { User } from '../database/models/User';

@EntityRepository(User)
class UsersRepository extends Repository<User> {}

export { UsersRepository };
