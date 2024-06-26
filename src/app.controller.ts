import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Skip } from './common/skip.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Skip(true)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
