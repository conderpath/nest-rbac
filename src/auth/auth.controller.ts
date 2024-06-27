import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Skip } from 'src/common/skip.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Req } from '@nestjs/common/decorators';
import { LocalGuard } from 'src/common/local.guard';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
@Controller('auth')
@ApiTags('权限')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Skip()
  @UseGuards(LocalGuard)
  @Post('login')
  @ApiOperation({
    summary: '登录',
  })
  login(@Req() req) {
    return this.authService.createJwt(req.user);
  }
}
