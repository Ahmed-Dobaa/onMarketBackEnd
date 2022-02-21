//import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsEmpty, IsEmail, Min, Max, Validate, MinLength, MaxLength } from "class-validator";

export class CreateUserDto {

    readonly id: string;

    @IsNotEmpty()
    @IsString()
    userName: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    userEmail: string;

    @IsNotEmpty()
    @MinLength(5)
    userPassword: string;
    createdBy : number;
    updatedBy : number;
}
