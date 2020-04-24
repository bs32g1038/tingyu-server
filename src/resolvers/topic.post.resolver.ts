import { Query, Resolver, Args, ResolveField, Parent } from '@nestjs/graphql';
import { TopicPostService, UserService } from '@src/services';
import { TopicPostArgsType, PagedTopicPostType, UserType, TopicPostType } from '@src/graphql-types';

@Resolver(() => TopicPostType)
export class TopicPostResolver {
    constructor(private readonly topicPostService: TopicPostService, private readonly userService: UserService) {}

    @Query(() => PagedTopicPostType)
    pagedTopicPosts(@Args() args: TopicPostArgsType) {
        return this.topicPostService.findAndCountAll(args);
    }

    @ResolveField(() => [UserType])
    async user(@Parent() topicPost: TopicPostType) {
        const { userId } = topicPost;
        return await this.userService.findOneById(userId);
    }
}
