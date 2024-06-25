import { Menu } from 'src/menu/entities/menu.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @Column()
  description: string; // 描述
  @CreateDateColumn()
  createTime: Date;
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
  @ManyToMany(() => Menu, (menu) => menu.roles)
  @JoinTable({ name: 'role_menu' })
  menus: Menu[];
}
