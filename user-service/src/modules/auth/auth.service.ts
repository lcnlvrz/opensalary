import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JWT_PUBLIC } from 'src/config/constants';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  login(user: UserEntity): string {
    const payload = {
      sub: user.id,
      email: user.email,
      public: this.configService.get<string>(JWT_PUBLIC),
    };
    return this.jwtService.sign(payload);
  }
}
