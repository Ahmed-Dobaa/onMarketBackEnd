import {HttpCode, HttpException, HttpStatus, Injectable} from '@nestjs/common';

@Injectable()
export class ErrorService{
    static wrapError(error, defaultMessage){
      if(error.code){
          throw new HttpException( {
                                     status: { isError: 'T', statusCode: HttpStatus.BAD_REQUEST},
                                     errorMessage: error.detail
                                   }, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException( defaultMessage, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
