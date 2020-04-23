import { Field, ID, Int, ObjectType, ArgsType, InputType } from '@nestjs/graphql';
import { TagType } from './tag.type';
import { UserType } from './user.type';
import { PaginationType, PaginationArgsType } from './pagination.type';

@InputType()
export class TopicsArgsFilterInputType {
    @Field({ nullable: true })
    tab: string;

    @Field({ nullable: true })
    tagId: string;

    @Field({ nullable: true })
    userId: string;
}

@ArgsType()
export class TopicsArgs extends PaginationArgsType {
    @Field({ nullable: true })
    filter: TopicsArgsFilterInputType;
}

@ObjectType()
export class TopicType {
    @Field(() => ID)
    id: number;

    @Field()
    title: string;

    @Field({ nullable: true })
    summary?: string;

    @Field()
    top: boolean;

    @Field()
    good: boolean;

    @Field()
    locked: boolean;

    @Field(() => Int)
    visitCount: number;

    @Field(() => Int)
    replyCount: number;

    @Field(() => Int)
    collectCount: number;

    @Field(() => Int)
    type: number;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field()
    tagId: number;

    @Field()
    tag: TagType;

    @Field()
    userId: number;

    @Field()
    user: UserType;

    @Field({ nullable: true })
    lastRepliedAt: Date;

    @Field({ nullable: true })
    lastReplyUserId?: number;

    @Field({ nullable: true })
    lastReplyUser?: UserType;
}

@ObjectType()
export class PagedTopicsType {
    @Field(() => [TopicType])
    results: TopicType[];

    @Field(() => PaginationType)
    paging: PaginationType;
}

@InputType()
export class NewTopicData {
    @Field()
    title: string;

    @Field({ nullable: true })
    summary?: string;

    @Field()
    tagId: number;

    @Field()
    userId: number;

    @Field()
    lastReplyUserId?: number;

    @Field()
    lastReplyAt?: string;
}

@InputType()
export class UpdatingTopicData {
    @Field({ nullable: true })
    title: string;

    @Field({ nullable: true })
    summary?: string;

    @Field({ nullable: true })
    tagId: number;

    @Field({ nullable: true })
    userId: number;

    @Field({ nullable: true })
    lastReplyUserId?: number;

    @Field({ nullable: true })
    lastReplyAt?: string;
}
