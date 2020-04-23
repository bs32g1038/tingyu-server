import { Query, Resolver, Args } from '@nestjs/graphql';
import { TopicPostService } from '@src/services';
import { TopicPostArgsType, PagedTopicPostType } from '@src/graphql-types';

@Resolver()
export class TopicPostResolver {
    constructor(private readonly topicPostService: TopicPostService) {}

    @Query(() => PagedTopicPostType)
    pagedTopicPosts(@Args() args: TopicPostArgsType) {
        return this.topicPostService.findAndCountAll(args);
    }
}
