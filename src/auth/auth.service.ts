import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from 'src/users/users.service';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(login);

    if (user && bcrypt.compareSync(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async login(user: CredentialsDto) {
    const payload = { login: user.login /*, sub: user.id*/ };
    const existedUser = await this.usersService.findOne(user.login);

    if (existedUser) {
      return;
    }

    await this.usersService.create(user);

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
