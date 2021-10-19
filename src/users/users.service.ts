import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(credentials: CreateUserDto) {
    const newUser = new User(credentials);
    const errors = await validate(newUser);

    if (errors.length > 0) {
      throw new Error('Validation failed!');
    }

    await this.usersRepository.save(newUser);
    return newUser;
  }

  async findOne(login: string): Promise<User> | undefined {
    return await this.usersRepository.findOne({ login });
  }
}
