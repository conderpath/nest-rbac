import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY, SKIP_KEY } from './skip.decorator';
import { UserService } from 'src/user/user.service';
import { getPermissions } from 'src/utils';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // 用于获取装饰器中的元数据
    private userService: UserService, // 用于获取用户信息
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skip = this.getDecoratorVal(SKIP_KEY, context);
    if (skip) return true;
    const permission = this.getDecoratorVal(PERMISSION_KEY, context);
    if (!permission) return true;
    const request = context.switchToHttp().getRequest();
    const menus = await this.userService.getMenus(request.user.id);
    const permissions = getPermissions(menus);
    // const permissions = request?.user?.permissions ?? [];
    if (!permissions.includes(permission)) {
      throw new ForbiddenException('没有接口权限');
    }
    return true;
  }
  private getDecoratorVal(key, context) {
    return this.reflector.getAllAndOverride<boolean>(key, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}
