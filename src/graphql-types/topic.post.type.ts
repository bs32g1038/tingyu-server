import { Field, Int, ObjectType, ArgsType, InputType } from '@nestjs/graphql';
import { PaginationArgsType, PaginationType } from './pagination.type';
import { UserType } from './user.type';

@InputType()
export class TopicsPostArgsFilterInputType {
    @Field(() => Int, { nullable: true })
    topicId: number;
}

@ArgsType()
export class TopicPostArgsType extends PaginationArgsType {
    @Field({ nullable: true })
    filter: TopicsPostArgsFilterInputType;
}

@ObjectType()
export class TopicPostType {
    @Field(() => Int)
    id: number;

    @Field()
    content: string;

    @Field(() => Int)
    likeCount: number;

    @Field(() => Int)
    commentCount: number;

    @Field()
    topicId: number;

    @Field()
    userId: number;

    @Field()
    user: UserType;

    @Field()
    createdAt: Date;
}

@ObjectType()
export class PagedTopicPostType {
    @Field(() => [TopicPostType])
    results: TopicPostType[];

    @Field(() => PaginationType)
    paging: PaginationType;
}
