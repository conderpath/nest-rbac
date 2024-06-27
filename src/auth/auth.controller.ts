import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Skip } from 'src/common/skip.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Body, Req } from '@nestjs/common/decorators';
import { LocalGuard } from 'src/common/local.guard';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/user/dto/login-user.dto';
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
  login(@Req() req, @Body() user: LoginDto) {
    return this.authService.createJwt(req.user);
  }
}
