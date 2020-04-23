import { Field, Int, ObjectType, ArgsType, InputType } from '@nestjs/graphql';
import { PaginationArgsType, PaginationType } from './pagination.type';

@InputType()
export class TopicsPostArgsFilterInputType {
    @Field({ nullable: true })
    topicId: string;
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
