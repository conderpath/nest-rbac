import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}
  async createJwt(user: User) {
    const payload = {
      sub: user.id,
      username: user.name,
    };
    const token = this.jwt.sign(payload);
    return token;
  }
}
