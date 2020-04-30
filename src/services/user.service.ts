import Sequelize from 'sequelize';
import { Injectable, Inject } from '@nestjs/common';
import { User } from '../models/user.model';
import { DB_MODEL_TOKEN_USER } from '@src/common/constants';

@Injectable()
export class UserService {
    constructor(@Inject(DB_MODEL_TOKEN_USER) private readonly USER_REPOSITORY: typeof User) {}

    async findAll(): Promise<User[]> {
        return await this.USER_REPOSITORY.findAll<User>({
            attributes: { exclude: ['password', 'email'] },
            order: [['updatedAt', 'DESC']],
            limit: 10,
        });
    }

    async findOneById(id: number): Promise<User> {
        return await this.USER_REPOSITORY.findOne<User>({
            where: {
                id: {
                    [Sequelize.Op.eq]: id,
                },
            },
        });
    }

    async findOneByAccount(account: string): Promise<User> {
        return await this.USER_REPOSITORY.findOne<User>({
            where: {
                account: {
                    [Sequelize.Op.eq]: account,
                },
            },
        });
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.USER_REPOSITORY.findOne<User>({
            where: {
                email: {
                    [Sequelize.Op.eq]: email,
                },
            },
        });
    }

    async create(data) {
        return await this.USER_REPOSITORY.create(data);
    }

    async updateById(id, data) {
        return this.USER_REPOSITORY.update(data, { where: { id } });
    }

    async deleteById(id: number) {
        return await this.USER_REPOSITORY.destroy({
            where: {
                id,
            },
        });
    }

    async register(email: string, password: string) {
        const user = {
            avatar: '',
            username: email.split('@')[0],
            account: email,
            email,
            password,
        };
        return this.create(user);
    }

    // async getActiveUserList(followUserId = null) {
    //     const { app, ctx } = this;
    //     const users = await app.model.User.findAll({
    //         attributes: { exclude: ['password', 'email'] },
    //         order: [['updatedAt', 'DESC']],
    //         limit: 10,
    //     });
    //     if (followUserId) {
    //         const ids = users.map(item => item.id);
    //         const follows = await app.model.Follow.findAll({
    //             where: {
    //                 followUserId,
    //                 userId: {
    //                     [app.Sequelize.Op.or]: ids,
    //                 },
    //             },
    //         });
    //         for (const follow of follows) {
    //             for (let i = 0; i < users.length; i++) {
    //                 if (follow.userId === users[i].id) {
    //                     users[i].setDataValue('isFollow', true);
    //                     break;
    //                 }
    //             }
    //         }
    //         return users;
    //     }
    //     return users;
    // }

    // async getUserByUsername(username, followUserId) {
    //     const { app } = this;
    //     const user = await app.model.User.findOne({
    //         where: {
    //             username: {
    //                 [app.Sequelize.Op.eq]: username,
    //             },
    //         },
    //     });
    //     if (user) {
    //         const follow = await app.model.Follow.findOne({
    //             where: {
    //                 userId: {
    //                     [app.Sequelize.Op.eq]: user.id,
    //                 },
    //                 followUserId: {
    //                     [app.Sequelize.Op.eq]: followUserId,
    //                 },
    //             },
    //         });
    //         if (follow) {
    //             user.setDataValue('isFollow', true);
    //         }
    //     }
    //     return user;
    // }

    // async fetchUserList(page = 1, limit = 20, where = {}) {
    //     const { app, ctx } = this;
    //     const offset = (page - 1) * 20;
    //     return app.model.User.findAndCountAll({
    //         // attributes: { exclude: ['userId'] },
    //         where,
    //         attributes: { exclude: ['password'] },
    //         order: [['updatedAt', 'DESC']],
    //         limit,
    //         offset,
    //     });
    // }

    // signToken(obj) {
    //     const { config } = this;
    //     return jwt.sign(obj, config.tokenKey, { expiresIn: '72h' });
    // }

    // verifyToken(token) {
    //     const { config } = this;
    //     try {
    //         return jwt.verify(token, config.tokenKey);
    //     } catch (err) {
    //         return null;
    //     }
    // }

    // getUserInfoFromToken() {
    //     const { ctx } = this;
    //     const token = ctx.request.headers['authorization'];
    //     return this.verifyToken(token);
    // }
}
