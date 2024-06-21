import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: number) {
    return this.usersService.getUserById(userId);
  }
}
