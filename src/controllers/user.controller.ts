import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { UserService } from '@src/services';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/api/user/signup')
    async login(@Body() body: { email: string; password: string }) {
        return this.userService.register(body.email, body.password);
    }
}
