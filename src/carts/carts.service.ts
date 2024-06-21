import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async addToCart(userId: number, productId: number, quantity: number) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });

    if (!cart) {
      return this.prisma.cart.create({
        data: {
          userId,
          cartItems: {
            create: { productId, quantity },
          },
        },
      });
    } else {
      const cartItem = await this.prisma.cartItem.findFirst({
        where: { cartId: cart.id, productId },
      });

      if (cartItem) {
        return this.prisma.cartItem.update({
          where: { id: cartItem.id },
          data: { quantity: { increment: quantity } },
        });
      } else {
        return this.prisma.cartItem.create({
          data: { cartId: cart.id, productId, quantity },
        });
      }
    }
  }

  async getCart(userId: number) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: { cartItems: { include: { product: true } } },
    });
  }

  async updateCartItem(cartItemId: number, quantity: number) {
    return this.prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });
  }

  async removeCartItem(cartItemId: number) {
    return this.prisma.cartItem.delete({ where: { id: cartItemId } });
  }
}
