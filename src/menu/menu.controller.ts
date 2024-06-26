import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('menu')
@ApiTags('菜单')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
}
