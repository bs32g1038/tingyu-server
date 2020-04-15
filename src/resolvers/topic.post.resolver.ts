import { Query, Resolver, Args } from '@nestjs/graphql';
import { TopicPostService } from '@src/services';
import { TopicPostType } from '@src/graphql-types';

@Resolver()
export class TopicPostResolver {
    constructor(private readonly topicService: TopicPostService) {}

    @Query(() => [TopicPostType])
    posts(@Args('topicId') topicId: number) {
        return this.topicService.findListByTopicId(topicId);
    }
}
