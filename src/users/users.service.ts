import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { PaginatedProductsResultDto } from './dto/pagination-users-result';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = new User(createUserDto);
    const errors = await validate(newUser);

    if (errors.length > 0) {
      throw new ForbiddenException('Validation error');
    }

    await this.usersRepository.save(newUser);

    return newUser;
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedProductsResultDto> {
    const skippedUsers = (paginationDto.page - 1) * paginationDto.limit;
    const totalCount = await this.usersRepository.count();
    const users = await this.usersRepository
      .createQueryBuilder()
      .orderBy('createdAt', 'ASC')
      .offset(skippedUsers)
      .limit(paginationDto.limit)
      .getMany();

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: users,
    };
  }

  // async findAll(): Promise<User[]> {
  //   return this.usersRepository.find();
  // }

  async findOne(login: string): Promise<User> | undefined {
    return await this.usersRepository.findOne({ where: { login: login } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = new User({ ...user, ...updateUserDto });
    const errors = await validate(updatedUser);

    if (errors.length > 0) {
      throw new ForbiddenException('Validation error!');
    }

    if (updateUserDto.password) {
      await updatedUser.hashPassword();
    }

    await this.usersRepository.update(id, updatedUser);

    return updatedUser;
  }
}
