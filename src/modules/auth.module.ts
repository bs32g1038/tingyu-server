import { Module } from '@nestjs/common';
import { AuthService, UserService } from '@src/services';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../auth/local.strategy';
import { getProviderByModelAndToken } from '@src/utils/model.util';
import { DB_MODEL_TOKEN_USER } from '@src/common/constants';
import { User } from '@src/models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from '@src/common/constants';
import { AuthController } from '@src/controllers/auth.controller';
import { JwtStrategy } from '@src/auth/jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: JWT.secret,
            signOptions: { expiresIn: '24h' },
        }),
    ],
    controllers: [AuthController],
    providers: [
        getProviderByModelAndToken(User, DB_MODEL_TOKEN_USER),
        UserService,
        AuthService,
        LocalStrategy,
        JwtStrategy,
    ],
})
export class AuthModule {}
