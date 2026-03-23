import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Post,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get('test')
  test() {
    return this.UserService.test();
  }

  @Get()
  findAll() {
    return this.UserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('fields') field: string) {
    return this.UserService.findOne(id, field);
  }

  @Post()
  @HttpCode(201)
  create(@Body() dto: CreateUserDto) {
    return this.UserService.create(dto);
  }
}
