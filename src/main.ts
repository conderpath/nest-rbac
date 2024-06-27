import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/httpException.filter';
import { GlobalResponse } from './common/response.interceptor';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: '/' });
  // 全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局响应拦截器
  app.useGlobalInterceptors(new GlobalResponse());
  // 注册全局守卫,由于不能注入依赖，所以不能在这里进行注册
  // app.useGlobalGuards(new AuthGuard());
  // 注册全局管道
  app.useGlobalPipes(new ValidationPipe());
  initSwagger(app);
  await app.listen(process.env.PORT);
}

function initSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('API文档')
    .setDescription('API接口文档')
    .setVersion('1.0')
    .addTag('API')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document, {
    customCssUrl: '/theme.css',
  });
}
bootstrap();
