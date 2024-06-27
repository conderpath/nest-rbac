import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { LoginDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Role) private readonly role: Repository<Role>,
    // 解决user和auth之间循环依赖
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.user.findOne({
      where: { name: username },
      select: ['id', 'name', 'password'],
    });
    if (!user) {
      throw new HttpException('用户不存在', 400);
    }
    if (user.password !== password) {
      throw new HttpException('密码错误', 400);
    }
    const token = await this.authService.createJwt(user);
    return token;
  }
  async bindRole(userId: number, roleIds: number[]) {
    const u = await this.user.findOne({
      where: { id: userId },
      // relations: ['roles'],
    });
    const roles = roleIds.map((id) => {
      return {
        id,
        name: '',
        description: '',
        createTime: null,
        users: [],
        menus: [],
      };
    });
    u.roles = roles;
    return this.user.save(u);
  }
  async getRole(userId: number) {
    const user = await this.user.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    return user;
  }
  async getMenus(userId: number) {
    const user = await this.user.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    let role: Role = null;
    if (user.roles.length) {
      role = user.roles[0];
    } else {
      return [];
    }
    const r = await this.role.findOne({
      where: { id: role.id },
      relations: ['menus'],
    });

    return r.menus;
  }
  async getMenuTree(userId) {
    const menus = await this.getMenus(userId);
    // 转换成树形结构
    return this.transArrTree(menus || []);
  }
  async register(user: CreateUserDto) {
    const u = await this.user.findOne({
      where: { name: user.name },
    });
    if (u) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }
    const res = await this.user.save(user);
    return null;
  }
  transArrTree(arr: Menu[], pid = 0) {
    const list = [];
    const map = {};
    if (!arr.length) return list;
    for (const item of arr) {
      map[item.id] = { ...item };
    }
    for (const item of arr) {
      const { id, parentId } = item;
      // 保存根节点
      if (parentId === pid) {
        list.push(map[id]);
      } else {
        // 保存子节点
        let parent = map[parentId];
        if (parent.children) {
          parent.children.push(map[id]);
        } else {
          parent.children = [map[id]];
        }
      }
    }
    return list;
  }
  // 获取按钮权限
  getPermission(arr) {
    return arr.reduce((prev, next) => {
      if (next.menuType === 3) {
        prev.push(next.permission);
      }
      return prev;
    }, []);
  }
  async validateUser(username, password) {
    const user = await this.user.findOne({
      where: {
        name: username,
      },
      relations: ['roles'],
      select: ['id', 'name', 'password', 'roles'],
    });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    if (user.password != password) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    return user;
    return user;
  }
}
