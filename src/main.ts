import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/httpException.filter';
import { GlobalResponse } from './common/response.interceptor';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局响应拦截器
  app.useGlobalInterceptors(new GlobalResponse());
  // 注册全局守卫,这里不能注入依赖
  // app.useGlobalGuards(new AuthGuard());
  // 注册全局管道
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
