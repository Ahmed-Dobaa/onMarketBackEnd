import { EntityRepository, Repository, getManager } from "typeorm";
import { Products } from "./products.entity";
import { ErrorService } from '../services/errorService';
import { HttpService } from '../services/httpService';
import {CreateProductDto} from './dto/create-product.dto';
import {LookupEnum} from '../services/lookup.enm';
import {NotFoundException} from '@nestjs/common';


@EntityRepository(Products)
export class ProductsRepository extends Repository<Products>{

   async createProduct(dto: CreateProductDto): Promise<any> {
      const { product_name } = dto;

      const product = new Products();

      product.product_name = product_name;
      product.status = LookupEnum.P_ACTIVE;

      try {
         await product.save();
         return HttpService.Response(product);
      }
      catch (err) {
           return ErrorService.wrapError(err, 'An internal server error occurred')
      }
   }

   async getProductsBasedStatus(status: number): Promise<any>{
      const products = await Products.find({where: {status : status}});
      if (products.length > 0) {
         return HttpService.Response(products);
       }
       throw new NotFoundException({status: { isError: 'T', errorMessage: 'No Products'}});
   }
}
