import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Menu } from 'src/menu/entities/menu.entity';
import { LoginDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Role) private readonly role: Repository<Role>,
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
    // 转换成树形结构
    const menus = this.transArrTree(r.menus || []);
    return menus;
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
}
