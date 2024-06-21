import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Body } from '@nestjs/common';

@ApiTags('Carts')
@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  @ApiOperation({ summary: 'Add to cart' })
  @ApiBody({
    description: 'Cart item details',
    type: 'object',
    required: true,
  })
  @ApiResponse({ status: 201, description: 'Cart item created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  async addToCart(@Body() body: { userId: number, productId: number, quantity: number }) {
    const cart = await this.prisma.cart.findUnique({ where: { userId: body.userId } });

    if (!cart) {
      return this.prisma.cart.create({
        data: {
          userId: body.userId,
          cartItems: {
            create: { productId: body.productId, quantity: body.quantity },
          },
        },
      });
    } else {
      const cartItem = await this.prisma.cartItem.findFirst({
        where: { cartId: cart.id, productId: body.productId },
      });

      if (cartItem) {
        return this.prisma.cartItem.update({
          where: { id: cartItem.id },
          data: { quantity: { increment: body.quantity } },
        });
      } else {
        return this.prisma.cartItem.create({
          data: { cartId: cart.id, productId: body.productId, quantity: body.quantity },
        });
      }
    }
  }

  @ApiOperation({ summary: 'Get cart' })
  @ApiResponse({ status: 200, description: 'Cart retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  async getCart(@Body() body: { userId: number }) {
    return this.prisma.cart.findUnique({
      where: { userId: body.userId },
      include: { cartItems: { include: { product: true } } },
    });
  }

  @ApiOperation({ summary: 'Update cart item' })
  @ApiBody({
    description: 'Cart item details',
    type: 'object',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Cart item updated successfully' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  async updateCartItem(@Body() body: { cartItemId: number, quantity: number }) {
    return this.prisma.cartItem.update({
      where: { id: body.cartItemId },
      data: { quantity: body.quantity },
    });
  }

  @ApiOperation({ summary: 'Remove cart item' })
  @ApiBody({
    description: 'Cart item ID',
    type: 'object',
    required: true,
  })
  @ApiResponse({ status: 200, description: 'Cart item removed successfully' })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  async removeCartItem(@Body() body: { cartItemId: number }) {
    return this.prisma.cartItem.delete({ where: { id: body.cartItemId } });
  }
}