import { Injectable, Inject } from '@nestjs/common';
import { DB_MODEL_TOKEN_TOPIC, DB_MODEL_TOKEN_TOPIC_POST } from '@src/common/constants';
import { Topic, TopicPost } from '@src/models';
import { TopicsArgs } from '@src/graphql-types';
import Sequelize from 'sequelize';
import { paging } from '@src/utils/model.extend.method.util';

const TYPE = {
    share: 1,
    issue: 2,
    recruit: 3,
};

@Injectable()
export class TopicService {
    constructor(
        @Inject(DB_MODEL_TOKEN_TOPIC) private readonly TOPIC_REPOSITORY: typeof Topic,
        @Inject(DB_MODEL_TOKEN_TOPIC_POST) private readonly TOPIC_POST_REPOSITORY: typeof TopicPost
    ) {}

    async findAll(topicsArgs: TopicsArgs): Promise<Topic[]> {
        const offset = (topicsArgs.page - 1) * 20;
        return await this.TOPIC_REPOSITORY.findAll<Topic>({
            order: [
                ['top', 'DESC'],
                ['created_at', 'DESC'],
            ],
            limit: topicsArgs.limit,
            offset,
        });
    }

    async findAndCountAll(topicsArgs: TopicsArgs) {
        const offset = (topicsArgs.page - 1) * 20;
        let where = {};
        if (topicsArgs.filter) {
            const { tab, userId, nodeId } = topicsArgs.filter;
            if (!tab || tab === 'all') {
                where = {};
            } else if (tab === 'popular') {
                where = { good: true };
            } else {
                where = { type: TYPE[tab] };
            }
            if (nodeId) {
                where = { ...where, nodeId };
            }
            if (userId) {
                where = { ...where, userId };
            }
        }
        return await paging<Topic>(this.TOPIC_REPOSITORY, {
            where,
            order: [
                ['top', 'DESC'],
                ['created_at', 'DESC'],
            ],
            limit: topicsArgs.limit,
            offset,
        });
    }

    async findOneById(id: number): Promise<Topic> {
        return await this.TOPIC_REPOSITORY.findOne({
            where: {
                id: {
                    [Sequelize.Op.eq]: id,
                },
            },
        });
    }

    async findTopicPostListByTopicId(topicId: number) {
        return await this.TOPIC_POST_REPOSITORY.findAll({
            where: {
                topicId: {
                    [Sequelize.Op.eq]: topicId,
                },
            },
        });
    }

    async create(data) {
        return await this.TOPIC_POST_REPOSITORY.create(data);
    }

    async updateById(id, data) {
        return this.TOPIC_POST_REPOSITORY.update(data, { where: { id } });
    }

    async deleteById(id: number) {
        return await this.TOPIC_POST_REPOSITORY.destroy({
            where: {
                id,
            },
        });
    }
}
