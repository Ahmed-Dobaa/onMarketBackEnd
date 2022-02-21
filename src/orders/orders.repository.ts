import { EntityRepository, Repository, getManager } from "typeorm";
import { ErrorService } from '../services/errorService';
import { HttpService } from '../services/httpService';
import {LookupEnum} from '../services/lookup.enm';
import {SearchOrdersDTO} from './dto/orders.dto';
import {Orders} from './orders.entity';


@EntityRepository(Orders)
export class OrdersRepository extends Repository<Orders>{

   async createOrder(dto: any, user_id: number): Promise<any> {
      let order = null;
      try {
       for(let i = 0; i < dto.length; i++){
               order = new Orders();
                  order.product_id = dto[i].product_id;
                  order.quantity = dto[i].quantity;
                  order.status = LookupEnum.O_NEW;
                  order.user_id = user_id;
               await order.save();
          }
            return HttpService.Response(order);
      }
      catch (err) {
           return ErrorService.wrapError(err, 'An internal server error occurred')
      }
   }

   async getOrdersBasedStatus(params: SearchOrdersDTO): Promise<any>{
      try {
         let { page, limit, order_status} = params;

         const take = limit || 10;
                page = page || 1;
         const skip = ( page - 1 ) * take ;
            ////// order status (NEW = 1, COMPLETED = 2, CANCELED = 3) "You can find them in lookup.enum file"
         const result = await Orders.findAndCount({where: {status: order_status},
            take: take,
            skip: skip})

            return HttpService.Response(result);

         } catch (error) {
         return ErrorService.wrapError(error, 'An internal server error occurred')
      }
   }


}

