import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserRepository} from 'src/users/users.repository';
import {UsersService} from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: 'defaultsecrete',
    signOptions: {
      expiresIn: 86400
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, UsersService, jwtStrategy],
  exports: [jwtStrategy, PassportModule]
})
export class AuthModule {}
