import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { TopicPostResolver } from '@src/resolvers/topic.post.resolver';
import { getProviderByModelAndToken } from '@src/utils/model.util';
import { DB_MODEL_TOKEN_TOPIC_POST } from '@src/common/constants';
import { TopicPost } from '@src/models';
import { TopicPostService } from '@src/services';

@Module({
    providers: [
        getProviderByModelAndToken(TopicPost, DB_MODEL_TOKEN_TOPIC_POST),
        TopicPostService,
        DateScalar,
        TopicPostResolver,
    ],
})
export class TopicPostModule {}
