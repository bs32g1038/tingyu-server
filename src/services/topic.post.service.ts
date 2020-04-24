import { Injectable, Inject } from '@nestjs/common';
import { DB_MODEL_TOKEN_TOPIC_POST } from '@src/common/constants';
import { TopicPost } from '@src/models';
import { TopicPostArgsType } from '@src/graphql-types';
import { paging } from '@src/utils/model.extend.method.util';

@Injectable()
export class TopicPostService {
    constructor(@Inject(DB_MODEL_TOKEN_TOPIC_POST) private readonly TOPIC_POST_REPOSITORY: typeof TopicPost) {}

    async findAndCountAll(args: TopicPostArgsType) {
        const offset = (args.page - 1) * 20;
        let where = {};
        if (args.filter) {
            const { topicId } = args.filter;
            if (topicId) {
                where = { ...where, topicId };
            }
        }
        return await paging<TopicPost>(this.TOPIC_POST_REPOSITORY, {
            where,
            order: [['createdAt', 'DESC']],
            limit: args.limit,
            offset,
        });
    }
}
