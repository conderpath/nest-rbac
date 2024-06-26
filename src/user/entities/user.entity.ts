import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column()
  email: string;
  @Column({ comment: '手机号', length: 11, nullable: true })
  phone?: string;
  // 密码不返回
  @Column({ select: false })
  password: string;
  // 1 表示启用，0 表示禁用
  @Column({ type: 'enum', enum: [1, 0], default: 1 })
  status: number;
  @CreateDateColumn()
  createTime: Date;
  /* @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role_relation',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[]; */
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    // 自动会生成一张表
    name: 'user_role',
  })
  roles?: Role[];
}
