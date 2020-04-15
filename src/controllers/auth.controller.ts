import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from '@src/auth/local.auth.guard';
import { AuthService } from '@src/services';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // @UseGuards(LocalAuthGuard)
    @Post('/api/auth/login')
    async login(@Body() body: { account: string; password: string }) {
        return this.authService.login(body);
    }
}
