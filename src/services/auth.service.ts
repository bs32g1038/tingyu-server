import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from 'lodash';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(account: string, password: string): Promise<any> {
        const user = await this.userService.findOneByAccount(account);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }

    async login(data: any) {
        const user = await this.validateUser(data.account, data.password);
        if (isEmpty(user)) {
            throw new BadRequestException('account or password error!');
        }
        const payload = { account: user.account, sub: user.id };
        return {
            token: this.jwtService.sign(payload),
        };
    }
}
