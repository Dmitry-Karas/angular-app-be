import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authServive: AuthService) {}

  @Post('login')
  // @UseGuards(LocalAuthGuard)
  async login(@Body() credentials: CredentialsDto) {
    const user = this.authServive.login(credentials);

    return user;
  }
}
