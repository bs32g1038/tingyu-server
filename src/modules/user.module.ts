import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { UserResolver } from '@src/resolvers/user.resolver';
import { UserService } from '@src/services';
import { getProviderByModelAndToken } from '@src/utils/model.util';
import { DB_MODEL_TOKEN_USER } from '@src/common/constants';
import { User } from '@src/models/user.model';
import { UserController } from '@src/controllers/user.controller';

@Module({
    controllers: [UserController],
    providers: [getProviderByModelAndToken(User, DB_MODEL_TOKEN_USER), UserResolver, UserService, DateScalar],
})
export class UserModule {}
