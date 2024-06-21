import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: number) {
    const cartItems = await this.prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });

    const order = await this.prisma.order.create({
      data: {
        userId,
        status: 'Pending',
        orderItems: {
          create: cartItems.map((item) => ({
            price: 0, // You need to specify the price
            productId: item.product.id,
            quantity: item.quantity,
          })),
        },
      },
    });

    await this.prisma.cart.deleteMany({
      where: { userId },
    });

    return order;
  }

  async getOrderById(orderId: number) {
    return this.prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: { include: { product: true } } },
    });
  }

  async updateOrderStatus(orderId: number, status: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
  }

  async getOrderHistory(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { orderItems: { include: { product: true } } },
    });
  }
}