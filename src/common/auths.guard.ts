import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { config } from '../config';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { SKIP_KEY } from './skip.decorator';

@Injectable()
export class AuthsGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector, // 用于获取装饰器中的元数据
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skip = this.reflector.getAllAndOverride<boolean>(SKIP_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (skip) return true;
    console.log(99999999);
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: config.jwt.secret,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
