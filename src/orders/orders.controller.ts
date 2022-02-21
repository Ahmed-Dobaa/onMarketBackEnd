import { Body, Controller, Param, Post, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateOrderDto, SearchOrdersDTO } from './dto/orders.dto';
import { Orders } from './orders.entity';
import { OrdersService } from './orders.service';

@Controller('')
export class OrdersController {


    constructor( private ordersService: OrdersService )
    {}

  @Post('/orders')
  @UsePipes(new ValidationPipe())
  createOrders(@Body() dto: CreateOrderDto, @Request() req): Promise<Orders> {
      return this.ordersService.createOrder(dto, req);
  }

  @Post('/orders/search')
  @UsePipes(new ValidationPipe())
  getOrdersBasedStatus(@Param() params: SearchOrdersDTO): Promise<any> {
      return this.ordersService.getOrdersBasedStatus(params);
  }
}
