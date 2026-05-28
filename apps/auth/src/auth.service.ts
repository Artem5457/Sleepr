import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '@app/common';
import { Response } from 'express';
import { TokenPayload } from './interfaces/token-payload.interface';
import { UsersService } from './users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  login(user: UserDocument, response: Response): void {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        this.configService.getOrThrow<number>('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }

  async authenticate(token: string): Promise<UserDocument> {
    try {
      const payload = this.jwtService.verify<TokenPayload>(token);
      return this.usersService.getUser({ _id: payload.userId });
    } catch {
      throw new UnauthorizedException();
    }
  }
}
