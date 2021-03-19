import { User } from './models/User';
import Database from '.';

export interface user {
  name: string;
  naturalness: string;
  mother: string;
  dad: string;
  birth: string;
  sex: string;
}

export class UserRegister {
  db = new Database();

  public async createUser(user: user): Promise<User> {
    const u = this.db.insertUser(
      user.name,
      user.naturalness,
      user.mother,
      user.dad,
      user.sex,
      user.birth
    );

    return u;
  }
}
