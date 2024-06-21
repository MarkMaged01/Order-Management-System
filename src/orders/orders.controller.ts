import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { OrderService } from './orders.service';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @Post()
  createOrder(@Body() createOrderDto) {
    return this.ordersService.createOrder(createOrderDto.userId);
  }

  @Get(':orderId')
  getOrderById(@Param('orderId') orderId: number) {
    return this.ordersService.getOrderById(orderId);
  }

  @Put(':orderId/status')
  updateOrderStatus(@Param('orderId') orderId: number, @Body() updateOrderStatusDto) {
    return this.ordersService.updateOrderStatus(orderId, updateOrderStatusDto.status);
  }

  @Get('user/:userId')
  getUserOrders(@Param('userId') userId: number) {
    return this.ordersService.getUserOrders(userId);
  }

  @Post('apply-coupon')
  applyCoupon(@Body() applyCouponDto) {
    return this.ordersService.applyCoupon(applyCouponDto.orderId, applyCouponDto.discount);
  }
}
