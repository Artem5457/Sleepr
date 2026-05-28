import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUser } from '@app/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDocument } from '../../../libs/common/src/models/user.schema';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.authService.login(user, response);
    response.send(user);
  }

  @MessagePattern('authenticate')
  authenticate(@Payload() data: { Authentication: string }) {
    return this.authService.authenticate(data.Authentication);
  }
}
