import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';

@Controller('api/cart')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('add')
  addToCart(@Body() addToCartDto) {
    return this.cartsService.addToCart(addToCartDto.userId, addToCartDto.productId, addToCartDto.quantity);
  }

  @Get(':userId')
  getCart(@Param('userId') userId: number) {
    return this.cartsService.getCart(userId);
  }

  @Put('update')
  updateCartItem(@Body() updateCartItemDto) {
    return this.cartsService.updateCartItem(updateCartItemDto.cartItemId, updateCartItemDto.quantity);
  }

  @Delete('remove')
  removeCartItem(@Body() removeCartItemDto) {
    return this.cartsService.removeCartItem(removeCartItemDto.cartItemId);
  }
}
