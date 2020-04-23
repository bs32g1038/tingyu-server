import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TagType, NewTagData, UpdatingTagData } from '@src/graphql-types';
import { NodeService } from '@src/services';

@Resolver()
export class NodeResolver {
    constructor(private readonly nodeService: NodeService) {}

    @Query(() => [TagType])
    tags() {
        return this.nodeService.findAll();
    }

    @Query(() => TagType)
    async tag(@Args('id', { type: () => String }) id: number) {
        const tag = await this.nodeService.findById(id);
        if (!tag) {
            throw new NotFoundException(id);
        }
        return tag;
    }

    @Mutation(() => Boolean)
    async addTag(@Args('newTagData') newTagData: NewTagData) {
        await await this.nodeService.create(newTagData);
        return true;
    }

    @Mutation(() => Boolean)
    async updateTag(
        @Args('id', { type: () => String }) id: number,
        @Args('updatingTagData', { type: () => UpdatingTagData }) updatingTagData
    ) {
        await this.nodeService.updateById(id, updatingTagData);
        return true;
    }

    @Mutation(() => Boolean)
    async removeTopic(@Args('id', { type: () => String }) id: number) {
        return this.nodeService.deleteById(id);
    }
}
