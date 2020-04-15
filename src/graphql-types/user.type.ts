import { Field, ID, ObjectType, ArgsType, InputType } from '@nestjs/graphql';

@InputType()
export class UserArgsFilterInputType {
    @Field({ nullable: true })
    id: number;

    @Field({ nullable: true })
    account: string;

    @Field({ nullable: true })
    email: string;
}

@ArgsType()
export class UserArgs {
    @Field({ nullable: true })
    filter: UserArgsFilterInputType;
}

@ObjectType()
export class UserType {
    @Field(() => ID)
    id: string;

    @Field()
    account: string;

    @Field()
    username: string;

    @Field()
    avatar: string;

    @Field()
    location: string;
}

@InputType()
export class NewUserData {
    @Field({ nullable: true })
    account: string;

    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class UpdatingUserData {
    @Field({ nullable: true })
    username: string;

    @Field({ nullable: true })
    avatar: string;

    @Field({ nullable: true })
    location: string;
}
