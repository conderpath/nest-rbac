import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须为字符串' })
  @Matches(/^[a-zA-Z_-\d]{4,10}$/, {
    message: '用户名必须由字母下划线组成',
  })
  @ApiProperty({ description: '用户名', example: 'admin' })
  username: string;
  @IsNotEmpty({ message: '密码不能为空' })
  @ApiProperty({ description: '密码', example: '123456' })
  // 密码必须由字母下划线组成
  password: string;
}
