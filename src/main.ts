import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/httpException.filter';
import { GlobalResponse } from './common/response.interceptor';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局响应拦截器
  app.useGlobalInterceptors(new GlobalResponse());
  // 注册全局守卫,由于不能注入依赖，所以不能在这里进行注册
  // app.useGlobalGuards(new AuthGuard());
  // 注册全局管道
  app.useGlobalPipes(new ValidationPipe());
  initSwagger(app);
  await app.listen(3000);
}

function initSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('API文档')
    .setDescription('API接口文档')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
}
bootstrap();
