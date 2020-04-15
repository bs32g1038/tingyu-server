import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TagType, NewTagData, UpdatingTagData } from '@src/graphql-types';
import { LinkService } from '@src/services';

@Resolver()
export class LinkResolver {
    constructor(private readonly linkService: LinkService) {}

    @Query(() => [TagType])
    links() {
        return this.linkService.findAll();
    }

    @Query(() => TagType)
    async link(@Args('id', { type: () => String }) id: number) {
        const tag = await this.linkService.findById(id);
        if (!tag) {
            throw new NotFoundException(id);
        }
        return tag;
    }

    @Mutation(() => Boolean)
    async addLink(@Args('newTagData') newTagData: NewTagData) {
        return await this.linkService.create(newTagData);
    }

    @Mutation(() => Boolean)
    async updateLink(
        @Args('id', { type: () => String }) id: number,
        @Args('updatingTagData', { type: () => UpdatingTagData }) updatingTagData
    ) {
        return this.linkService.updateById({ id }, updatingTagData);
    }
}
