import { Injectable, Inject } from '@nestjs/common';
import { DB_MODEL_TOKEN_TOPIC_POST } from '@src/common/constants';
import { TopicPost } from '@src/models';
import Sequelize from 'sequelize';

@Injectable()
export class TopicPostService {
    constructor(@Inject(DB_MODEL_TOKEN_TOPIC_POST) private readonly TOPIC_POST_REPOSITORY: typeof TopicPost) {}

    async findListByTopicId(topicId: number) {
        return await this.TOPIC_POST_REPOSITORY.findAll({
            where: {
                topicId: {
                    [Sequelize.Op.eq]: topicId,
                },
            },
        });
    }
}
