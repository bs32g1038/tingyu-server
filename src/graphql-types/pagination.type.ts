import { Field, Int, ObjectType, ArgsType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class PaginationArgsType {
    @Field(() => Int)
    @Min(1)
    page = 1;

    @Field(() => Int)
    @Min(1)
    @Max(50)
    limit = 10;
}

@ObjectType()
export class PaginationType {
    @Field(() => Int)
    currentPage: number;

    @Field(() => Int)
    itemsPerPage: number;

    @Field(() => Int)
    totalPages: number;

    @Field(() => Int)
    totalItems: number;
}
