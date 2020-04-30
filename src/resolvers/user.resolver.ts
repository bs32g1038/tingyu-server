import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { UserType, UserArgs, NewUserData, UpdatingUserData } from '@src/graphql-types';
import { UserService } from '@src/services';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@src/auth/gql.auth.guard';
import _ from 'lodash';
import { CurrentUser } from '@src/decorators/current.user.gql.decorate';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => [UserType])
    users() {
        return this.userService.findAll();
    }

    @Query(() => UserType, { description: '需要登录' })
    @UseGuards(GqlAuthGuard)
    async user(@CurrentUser() test: UserType, @Args() args: UserArgs) {
        let user = null;
        const { id, account, email } = args.filter;
        if (_.isNumber(id)) {
            user = await this.userService.findOneById(id);
            if (_.isEmpty(user)) {
                throw new NotFoundException(id);
            }
        } else if (_.isString(account)) {
            user = await this.userService.findOneByAccount(account);
            if (_.isEmpty(user)) {
                throw new NotFoundException(account);
            }
        } else if (_.isString(email)) {
            user = await this.userService.findOneByAccount(email);
            if (_.isEmpty(user)) {
                throw new NotFoundException(email);
            }
        }
        return user;
    }

    @Mutation(() => Boolean)
    async addUser(@Args('newUserData') newUserData: NewUserData) {
        return await this.userService.create(newUserData);
    }

    @Mutation(() => Boolean)
    async updateUser(
        @Args('id', { type: () => String }) id: number,
        @Args('updatingUserData', { type: () => UpdatingUserData }) updatingUserData
    ) {
        return this.userService.updateById({ id }, updatingUserData);
    }

    @Mutation(() => Boolean)
    async removeUser(@Args('id', { type: () => String }) id: number) {
        return this.userService.deleteById(id);
    }
}
