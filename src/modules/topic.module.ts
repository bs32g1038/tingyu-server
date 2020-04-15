import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { Topic } from '../models/topic.model';
import { Tag, User } from '@src/models';
import { TopicResolver } from '../resolvers/topic.resolver';
import { TopicService, NodeService, UserService } from '@src/services';
import { getProviderByModelAndToken } from '@src/utils/model.util';
import {
    DB_MODEL_TOKEN_TOPIC,
    DB_MODEL_TOKEN_TAG,
    DB_MODEL_TOKEN_TOPIC_POST,
    DB_MODEL_TOKEN_USER,
} from '@src/common/constants';
import { TopicPost } from '@src/models';

@Module({
    providers: [
        getProviderByModelAndToken(Tag, DB_MODEL_TOKEN_TAG),
        getProviderByModelAndToken(Topic, DB_MODEL_TOKEN_TOPIC),
        getProviderByModelAndToken(TopicPost, DB_MODEL_TOKEN_TOPIC_POST),
        getProviderByModelAndToken(User, DB_MODEL_TOKEN_USER),
        TopicResolver,
        TopicService,
        UserService,
        NodeService,
        DateScalar,
    ],
})
export class TopicModule {}
