import { UserEntity } from 'src/modules/user/entities/user.entity';

export class returnUser {
  id: string;
  name: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
  }
}
