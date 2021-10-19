import { IsDefined, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  @MinLength(4)
  @MaxLength(100)
  @Matches(/[^A-Za-z0-9]*/)
  login: string;

  @IsDefined()
  password: string;
}
