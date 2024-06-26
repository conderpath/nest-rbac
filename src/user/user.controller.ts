import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { BindRoleDto, CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { Skip } from 'src/common/skip.decorator';
import { LocalGuard } from 'src/common/local.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('bindRole')
  bindRole(@Body() bindRole: BindRoleDto) {
    return this.userService.bindRole(bindRole.userId, bindRole.roleIds);
  }
  @Get('role')
  getRole(@Query('userId') userId: number) {
    return this.userService.getRole(userId);
  }
  @Get('menus')
  getMenus(@Query('userId') userId: number) {
    return this.userService.getMenus(userId);
  }
  // 不需要守卫
  @Skip(true)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
}
