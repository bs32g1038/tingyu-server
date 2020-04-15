import { Injectable, Inject } from '@nestjs/common';
import { Tag } from '@src/models';
import Sequelize from 'sequelize';
import { DB_MODEL_TOKEN_TAG } from '@src/common/constants';

@Injectable()
export class NodeService {
    constructor(@Inject(DB_MODEL_TOKEN_TAG) private readonly TAG_REPOSITORY: typeof Tag) {}

    async findAll() {
        return await this.TAG_REPOSITORY.findAll<Tag>();
    }

    async findById(id: number) {
        return await this.TAG_REPOSITORY.findOne<Tag>({
            where: {
                id: {
                    [Sequelize.Op.eq]: id,
                },
            },
        });
    }

    async create(data) {
        return await this.TAG_REPOSITORY.create(data);
    }

    async updateById(id, data) {
        return this.TAG_REPOSITORY.update(data, { where: { id } });
    }
}
