import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @MinLength(4)
  @MaxLength(100)
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  @IsOptional()
  lastname: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  @Matches(/[^A-Za-z0-9]*/)
  login: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  gender: string;

  @IsOptional()
  birthday: string;
}
