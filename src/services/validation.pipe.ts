
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { validate, isInstance } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any,  metadata : ArgumentMetadata) {

    if(value instanceof Object && this.isEmpty(value)){
     throw new HttpException('No body submitted', HttpStatus.BAD_REQUEST);
    }
      const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(`${this.formatErrors(errors)}`, HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: any[]) {
     return errors.map(err =>{
         for(let properity in err.constraints){
             return err.constraints[properity];
         }
     })
     .join(', ');
  }

  private isEmpty(value: any) {
      if(Object.keys(value).length > 0){
          return false;
      }
      return true;
  }
}