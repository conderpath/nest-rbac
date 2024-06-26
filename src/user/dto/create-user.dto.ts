import { ApiProperty } from '@nestjs/swagger';
import { Column, Unique } from 'typeorm';

export class CreateUserDto {
  @ApiProperty({ description: '用户名', example: 'admin', required: true })
  @Column({ unique: true })
  name: string;
  @ApiProperty({ description: '邮箱', example: 'admin@163.com' })
  @Column({ comment: '邮箱' })
  email: string;
  @ApiProperty({ description: '手机号码', example: '18888888888' })
  @Column({ comment: '手机号' })
  phone: string;
  @ApiProperty({ description: '密码', example: '123456' })
  @Column({})
  password: string; // 密码加密
  @Column({ type: 'enum', enum: [0, 1], comment: '用户状态0:禁用1:启用' })
  status?: number; // 用户状态 0:禁用, 1:启用
  role?: number[]; // 用户角色
}
export class BindRoleDto {
  userId: number;
  roleIds: number[];
}
