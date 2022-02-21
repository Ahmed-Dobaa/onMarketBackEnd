import { EntityRepository, Repository, getManager } from "typeorm";
import { Users } from "./users.entity";
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dto/create-user.dto';
import { ErrorService } from '../services/errorService';
import { HttpService } from '../services/httpService';
import {SigninDto} from 'src/auth/dto/signin.dto';
import {NotFoundException} from '@nestjs/common';


@EntityRepository(Users)
export class UserRepository extends Repository<Users>{

   async createUser(dto: CreateUserDto): Promise<any> {
      const {
         userName,
         userEmail,
         userPassword } = dto;

      const user = new Users();

      user.salt = await bcrypt.genSalt()
      user.userPassword = await this.hashPassword(userPassword, user.salt)
      user.userName = userName;
      user.userEmail = userEmail;

      try {
         await user.save();
         return HttpService.Response(user);
      }
      catch (err) {
           return ErrorService.wrapError(err, 'An internal server error occurred')
      }
   }

async findOneUser(id: number): Promise<Users>{
   const user =  await Users.findOne(id);
   if (!user) {
      throw new NotFoundException(`This user number ${id} is not found`);
    }
   return user;
 }

   async validateUserPassword(signinDto: SigninDto): Promise<any> {
      const { userEmail, userPassword } = signinDto
      const _user = await this.findOne({ userEmail })

      if (!_user) {
         return false;
      }
      const valid = await _user.compareUserPassword(userPassword)

      if (valid) {
         return _user
      } else {
         return false;
      }
   }


    async hashPassword(password: string, salt: string): Promise<string> {
      return bcrypt.hash(password, salt);
   }


}
