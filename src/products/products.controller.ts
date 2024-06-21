import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  createProduct(@Body() createProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get(':productId')
  getProductById(@Param('productId') productId: number) {
    return this.productsService.getProductById(productId);
  }
}
