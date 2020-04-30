import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from '@src/services';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/api/auth/login')
    async login(@Body() body: { email: string; password: string }) {
        return this.authService.login(body);
    }
}
