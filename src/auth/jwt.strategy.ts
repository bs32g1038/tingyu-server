import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JWT } from '@src/common/constants';

// Authorization: bearer JSON_WEB_TOKEN_STRING.....

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT.secret,
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, account: payload.account };
    }
}
