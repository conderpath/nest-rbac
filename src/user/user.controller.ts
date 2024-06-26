import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { BindRoleDto, CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { Skip } from 'src/common/skip.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('bindRole')
  @ApiOperation({
    summary: '绑定角色',
    description: '绑定角色',
  })
  bindRole(@Body() bindRole: BindRoleDto) {
    return this.userService.bindRole(bindRole.userId, bindRole.roleIds);
  }
  @Get('role')
  @ApiOperation({
    summary: '获取角色',
    description: '获取角色',
  })
  getRole(@Query('userId') userId: number) {
    return this.userService.getRole(userId);
  }
  @Get('menus')
  @ApiOperation({
    summary: '获取菜单',
    description: '获取菜单',
  })
  getMenus(@Query('userId') userId: number) {
    return this.userService.getMenus(userId);
  }
  @ApiOperation({ summary: '获取用户', description: '获取用户' })
  @Get('detail')
  getUser() {}
  // 不需要守卫
  @Skip(true)
  @Post('login')
  @ApiOperation({
    summary: '登录',
    description: '登录',
  })
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }
  @Skip()
  @Post('register')
  @ApiOperation({
    summary: '注册',
    description: '注册',
  })
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }
}
