import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {ErrorService} from 'src/services/errorService';
import {HttpService} from 'src/services/httpService';
import { UserRepository } from 'src/users/users.repository';
import {UsersService} from 'src/users/users.service';
import { jwtPayload } from './auth.modelf';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserRepository) private userRepo: UserRepository, private userService: UsersService,
                private jwtservice: JwtService) { }

async signin(signinDto: SigninDto): Promise<any> {
      try {
            const _user = await this.userRepo.validateUserPassword(signinDto)

            if (_user === false) {
                return HttpService.UserNotFound();
            }

            const payload: jwtPayload = {
                userName: _user.userName, userId: _user.id
            }
            const accessToken = await this.jwtservice.sign(payload);

            return HttpService.Response({accessToken, _user })

        } catch (error) {
            return ErrorService.wrapError(error, 'An internal server error occurred')
        }
    }

}
