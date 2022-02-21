import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {CreateProductDto} from './dto/create-product.dto';
import {Products} from './products.entity';
import {ProductsService} from './products.service';

@Controller('')
// @UseGuards(AuthGuard())
export class ProductsController {

    constructor( private productsService: ProductsService )
    {}

  @Post('/products')
  @UsePipes(new ValidationPipe())
  createProduct(@Body() dto: CreateProductDto): Promise<Products> {
      return this.productsService.createProduct(dto);
  }

  @Get('/products/:status')
  getProductsBasedStatus(@Param('status', ParseIntPipe) status: number): Promise<Products[]>{
     return this.productsService.getProductsBasedStatus(status);
  }


}
