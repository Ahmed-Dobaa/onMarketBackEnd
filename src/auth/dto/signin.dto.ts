//import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsEmpty, IsEmail, Min, Max, Validate, MinLength, MaxLength } from "class-validator";

export class SigninDto {


    @IsNotEmpty()
    @IsString()
    @IsEmail()
    userEmail: string;

    @IsNotEmpty()
    @MinLength(5)
    userPassword: string;
}
