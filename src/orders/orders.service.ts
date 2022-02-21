import { Injectable, Request } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ErrorService} from '../services/errorService';
import {JwtVerification} from '../auth/jwt.verification';
import {HttpService} from '../services/httpService';
import {CreateOrderDto, SearchOrdersDTO} from './dto/orders.dto';
import {OrdersRepository} from './orders.repository';

@Injectable()
export class OrdersService {

    constructor(@InjectRepository(OrdersRepository) private ordersRepository: OrdersRepository) { }

    async createOrder(dto: CreateOrderDto, @Request() req): Promise<any> {
        let jwt = new JwtVerification();
        let payload = await jwt.verification(req);
        const user_id = payload.userId;
        return await this.ordersRepository.createOrder(dto, user_id);
    }


    async getOrdersBasedStatus(params: SearchOrdersDTO){
       try {
           const orders = await this.ordersRepository.getOrdersBasedStatus(params);
           return HttpService.Response(orders);
       } catch (error) {
        return ErrorService.wrapError(error, 'An internal server error occurred')
       }
    }
}
