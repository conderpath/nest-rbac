import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, getConnection, getRepository } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Menu } from 'src/menu/entities/menu.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Role) private readonly role: Repository<Role>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const u = new User();
    u.name = createUserDto.name;
    u.email = createUserDto.email;
    u.password = createUserDto.password;
    return this.user.save(u);
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
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
