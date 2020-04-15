import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import {
    TopicType,
    PagedTopicsType,
    TagType,
    TopicsArgs,
    UserType,
    NewTopicData,
    UpdatingTopicData,
} from '@src/graphql-types';
import { TopicService, NodeService, UserService } from '@src/services';

@Resolver(() => TopicType)
export class TopicResolver {
    constructor(
        private readonly topicService: TopicService,
        private readonly nodeService: NodeService,
        private readonly userService: UserService
    ) {}

    @Query(() => TopicType)
    async topic(@Args('id') id: number) {
        const topic = await this.topicService.findOneById(id);
        if (!topic) {
            throw new NotFoundException(id);
        }
        return topic;
    }

    @Query(() => [TopicType])
    topics(@Args() topicsArgs: TopicsArgs) {
        return this.topicService.findAll(topicsArgs);
    }

    @Query(() => PagedTopicsType)
    pagedTopics(@Args() topicsArgs: TopicsArgs) {
        return this.topicService.findAndCountAll(topicsArgs);
    }

    @ResolveField(() => [TagType])
    async tag(@Parent() topic: TopicType) {
        const { tagId } = topic;
        return await this.nodeService.findById(tagId);
    }

    @ResolveField(() => [UserType])
    async user(@Parent() topic: TopicType) {
        const { userId } = topic;
        return await this.userService.findOneById(userId);
    }

    @Mutation(() => Boolean)
    async addTopic(@Args('newTopicData') newTopicData: NewTopicData) {
        return await this.topicService.create(newTopicData);
    }

    @Mutation(() => Boolean)
    async updateTopic(
        @Args('id', { type: () => String }) id: number,
        @Args('updatingTopicData', { type: () => UpdatingTopicData }) updatingTopicData
    ) {
        return this.topicService.updateById({ id }, updatingTopicData);
    }

    @Mutation(() => Boolean)
    async removeTopic(@Args('id', { type: () => String }) id: number) {
        return this.topicService.deleteById(id);
    }
}