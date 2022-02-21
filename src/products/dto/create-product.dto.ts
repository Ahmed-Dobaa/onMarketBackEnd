//import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsEmpty, IsEmail, Min, Max, Validate, MinLength, MaxLength } from "class-validator";

export class CreateProductDto {

    readonly id: string;

    @IsNotEmpty()
    @IsString()
    product_name: string;
}
