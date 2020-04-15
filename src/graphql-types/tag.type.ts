import { Field, ID, Int, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
export class TagType {
    @Field(() => ID)
    id: number;

    @Field()
    name: string;

    @Field({ nullable: true })
    icon: string;

    @Field({ nullable: true })
    description: string;

    @Field(() => Int)
    topicCount: number;

    @Field(() => Int)
    displayOrder: number;

    @Field()
    isShowIcon: boolean;
}

@InputType()
export class NewTagData {
    @Field()
    name: string;

    @Field({ nullable: true })
    icon: string;

    @Field()
    description: string;

    @Field()
    displayOrder: number;

    @Field()
    isShowIcon: boolean;
}

@InputType()
export class UpdatingTagData {
    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    icon: string;

    @Field({ nullable: true })
    description: string;

    @Field({ nullable: true })
    displayOrder: number;

    @Field({ nullable: true })
    isShowIcon: boolean;
}
