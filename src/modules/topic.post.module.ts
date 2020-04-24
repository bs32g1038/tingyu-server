import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TopicPostResolver } from '@src/resolvers/topic.post.resolver';
import { getProviderByModelAndToken } from '@src/utils/model.util';
import { DB_MODEL_TOKEN_TOPIC_POST, DB_MODEL_TOKEN_USER } from '@src/common/constants';
import { TopicPost, User } from '@src/models';
import { TopicPostService, UserService } from '@src/services';

@Module({
    providers: [
        getProviderByModelAndToken(TopicPost, DB_MODEL_TOKEN_TOPIC_POST),
        getProviderByModelAndToken(User, DB_MODEL_TOKEN_USER),
        TopicPostService,
        UserService,
        DateScalar,
        TopicPostResolver,
    ],
})
export class TopicPostModule {}
