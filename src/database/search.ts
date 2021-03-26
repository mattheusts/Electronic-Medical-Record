import { User } from '../database/models/User';
import Database from '../database';

export interface UserSearch {
  id?: string;
  name: string;
  birth: string;
}

export class Search {
  db = new Database();

  public async searchAll(users: User[]): Promise<UserSearch[]> {
    const userSearch: UserSearch[] = [];

    for (const user of users) {
      const prescription = await this.db.searchOnePrescriptionByUserId(user.id);
      userSearch.push({
        id: user.id,
        name: user.name,
        birth: user.birth,
      });
    }

    return userSearch;
  }
}
