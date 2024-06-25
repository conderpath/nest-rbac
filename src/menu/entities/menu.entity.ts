import { Role } from 'src/role/entities/role.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
// @ObjectType()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: 0 })
  parentId: number;
  @Column()
  name: string;
  @Column({
    type: 'enum',
    enum: [1, 2, 3],
    default: 1,
    comment: '1:目录2:菜单,3:按钮',
  })
  menuType: number;
  @Column({ type: 'enum', enum: [1, 0], default: 1, comment: '1:显示,0:隐藏' })
  status: number;
  @Column({ nullable: true })
  path: string;
  @Column({ nullable: true })
  component: string;
  @Column({ nullable: true })
  icon: string;
  @Column({ nullable: true })
  permission: string;
  @Column({ default: 0, comment: '排序' })
  order: number;
  @ManyToMany(() => Role, (role) => role.menus)
  roles: Role[];
}
