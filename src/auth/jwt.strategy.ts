import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { config } from '../config';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // 在构造函数中配置JWT的验证方式
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwt.secret,
    });
  }
  async validate(payload): Promise<any> {
    return { id: payload.sub, username: payload.username };
  }
}
