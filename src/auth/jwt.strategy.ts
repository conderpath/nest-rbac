import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { config } from '../config';
import { ConfigService } from '@nestjs/config';
import { permission } from 'process';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // 在构造函数中配置JWT的验证方式
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }
  async validate(payload): Promise<any> {
    return {
      id: payload.sub,
      username: payload.username,
    };
  }
}
