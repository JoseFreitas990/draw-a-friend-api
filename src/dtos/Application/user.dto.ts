import { User } from '@prisma/client';

export class UserDto {
  id: string;
  username: string;
  email: string;
  // password: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    // this.password = user.password;
  }
}
