import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { UserRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserRepository) private usersRepository: UserRepository) { }

    async createUser(dto: CreateUserDto): Promise<any> {
        return  await this.usersRepository.createUser(dto);
    }
    async getOneUser(id: number): Promise<Users> {
         return await this.usersRepository.findOne(id);
    }

}
