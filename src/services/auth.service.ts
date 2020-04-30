import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { isEmpty } from 'lodash';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(email);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }

    async login(data: any) {
        const user = await this.validateUser(data.email, data.password);
        if (isEmpty(user)) {
            throw new BadRequestException('email or password error!');
        }
        const payload = { email: user.email, sub: user.id };
        return {
            token: this.jwtService.sign(payload),
        };
    }
}
