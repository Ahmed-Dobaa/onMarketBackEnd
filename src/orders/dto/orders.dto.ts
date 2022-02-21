//import { ApiModelProperty } from '@nestjs/swagger';
import {ApiProperty} from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsObject } from "class-validator";

export class CreateOrderDto {

    readonly id: string;
    product_id: number;
    quantity: number;
}

export class SearchOrdersDTO {

    @ApiProperty({description: 'the orders status', required: false})
    @IsOptional()
    @IsNumber()
    order_status : number;


    @ApiProperty({description: 'page number of request', required: false})
    @IsOptional()
    @IsNumber()
    page?: number;


    @ApiProperty({description: 'number of recordes in a request', required: false})
    @IsOptional()
    @IsNumber()
    limit?: number;


}
