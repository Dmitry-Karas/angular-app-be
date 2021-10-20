import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthLoginDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  @Matches(/[^A-Za-z0-9]*/)
  login: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  password: string;
}
