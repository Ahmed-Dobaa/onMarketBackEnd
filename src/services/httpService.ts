import { HttpStatus, Injectable} from '@nestjs/common';

@Injectable()
export class HttpService{
    static Response(data){
      return {status: { isError: 'F' , statusCode: HttpStatus.CREATED},
              data: data}
    }

    static UserNotFound(){
      return {status: { isError: 'T' , statusCode: HttpStatus.OK},
      message_ar: 'الرقم السرى أو البريد الإلكترونى غير صحيح', message_en: 'Invalid Email or password !'}
    }

}
