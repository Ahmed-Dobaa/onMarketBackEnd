import { jwtPayload } from './auth.modelf';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport';
import {UserRepository} from 'src/users/users.repository';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {


    constructor(private _userRepo: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'defaultsecrete'
        })
    }
    async validate(payload: jwtPayload): Promise<any> {
        const { userName } = payload
        const _user = await this._userRepo.findOne({ userName })

        if (!_user) {
            throw new UnauthorizedException()
        }
      return _user
    }
}
