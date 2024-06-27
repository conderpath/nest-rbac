import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      //指定存储环境变量的位置，靠前的文件拥有较高的优先级
      envFilePath: [`.${process.env.NODE_ENV}.env`, '.env'],
      // 指定是全局模块
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      host: 'localhost',
      port: 3306,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件
      // 是否自动将实体类自动同步到数据库
      synchronize: true,
      // 重连数据库时间间隔
      retryDelay: 500,
      // 重连次数
      retryAttempts: 10,
      // logging: true, // 打印sql日志
      // autoLoadEntities: true, //如果为true,将自动加载实体 forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
    }),
    UserModule,
    MenuModule,
    RoleModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
