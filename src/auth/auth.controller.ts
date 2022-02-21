import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import {CreateUserDto} from 'src/users/dto/create-user.dto';
import {Users} from 'src/users/users.entity';
import {UsersService} from 'src/users/users.service';
import { ValidationPipe } from '../services/validation.pipe';
import {AuthService} from './auth.service';
import {SigninDto} from './dto/signin.dto';

@Controller('auth')
export class AuthController {

    constructor( private usersService: UsersService, private authService: AuthService )
      {}

    @Post('/signup')
    @UsePipes(new ValidationPipe())
    createUser(@Body() dto: CreateUserDto): Promise<Users> {
        return this.usersService.createUser(dto);
    }


    @Post('/signin')
    @UsePipes(new ValidationPipe())
    signin(@Body() signinDto: SigninDto): Promise<any> {
        return this.authService.signin(signinDto)
    }
}
