import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/services/users.service';
import { User } from '../users';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(username);

    if (user) {
      return user;
    }

    return await this.usersService.createOne({ username, password })
  }

  login(user: User, type) {
    return this.loginBasic(user)
  }

  loginBasic(user: User) {
    function encodeUserToken(user) {
      const { username, password } = user;
      const buf = Buffer.from([username, password].join(':'), 'utf8');

      return buf.toString('base64');
    }

    return {
      token_type: 'Basic',
      access_token: encodeUserToken(user),
    };
  }



}
