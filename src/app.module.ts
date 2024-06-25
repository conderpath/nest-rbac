import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: 'root',
      host: 'localhost',
      port: 3306,
      database: 'nest_rbac',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件
      // 是否自动将实体类自动同步到数据库
      synchronize: true,
      // 重连数据库时间间隔
      retryDelay: 500,
      // 重连次数
      retryAttempts: 10,
      // autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
    UserModule,
    MenuModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
