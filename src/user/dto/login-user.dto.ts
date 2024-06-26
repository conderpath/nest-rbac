import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须为字符串' })
  @Matches(/^[a-zA-Z_-]{4,10}$/, {
    message: '用户名必须由字母下划线组成',
  })
  username: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}
