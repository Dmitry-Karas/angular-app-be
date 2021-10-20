import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

import { UsersService } from 'src/users/users.service';
import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(authLoginDto: AuthLoginDto) {
    const user = await this.usersService.findOne(authLoginDto.login);

    if (user) {
      throw new ConflictException();
    }

    await this.usersService.create(authLoginDto);

    return this.login(authLoginDto);
  }

  async login(authLoginDto: AuthLoginDto) {
    const { id, login, name, lastname, email, gender, birthday, createdAt } =
      await this.validateUser(authLoginDto);
    const payload = {
      userId: id,
    };

    return {
      access_token: this.jwtService.sign(payload),
      id,
      login,
      name,
      lastname,
      email,
      gender,
      birthday,
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { login, password } = authLoginDto;

    const user = await this.usersService.findOne(login);

    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException('Invalid login or password');
    }

    return user;
  }
}
