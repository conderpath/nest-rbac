import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../config';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtGuard } from 'src/common/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: config.jwt.secret, // 设置JWT的密钥
      signOptions: { expiresIn: config.jwt.expires }, // 设置JWT的过期时间
    }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
  exports: [AuthService], // 导出AuthService，以便在其他模块中使用
})
export class AuthModule {}
