import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Body } from '@nestjs/common';

@ApiTags('Users')
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: 'User details',
    type: 'object',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  async createUser(@Body('data') data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }

  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserById(userId: number) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
}