import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateProductDto} from './dto/create-product.dto';
import {Products} from './products.entity';
import {ProductsRepository} from './products.repository';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository(ProductsRepository) private productsRepo: ProductsRepository) { }

    async createProduct(dto: CreateProductDto): Promise<any> {
        return await this.productsRepo.createProduct(dto);
    }

    async getProductsBasedStatus(status: number): Promise<Products[]>{
        return await this.productsRepo.getProductsBasedStatus(status);
    }
}
