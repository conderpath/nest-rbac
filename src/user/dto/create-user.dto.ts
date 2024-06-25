export class CreateUserDto {
  name: string;
  email: string;
  password: string; // 密码加密
  status: number; // 用户状态 0:禁用, 1:启用
  role: number[]; // 用户角色
}
export class BindRoleDto {
  userId: number;
  roleIds: number[];
}
