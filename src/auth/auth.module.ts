import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../common/auth.guard';
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.jwt.secret, // 设置JWT的密钥
      signOptions: { expiresIn: '60s' }, // 设置JWT的过期时间
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService], // 导出AuthService，以便在其他模块中使用
})
export class AuthModule {}
