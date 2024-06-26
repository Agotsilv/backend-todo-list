import { UserEntity } from 'src/modules/user/entities/user.entity';

export class returnUser {
  name: string;

  constructor(user: UserEntity) {
    this.name = user.name;
  }
}
