import { Injectable, Inject } from '@nestjs/common';
import { Link } from '@src/models';
import Sequelize from 'sequelize';
import { DB_MODEL_TOKEN_LINK } from '@src/common/constants';

@Injectable()
export class LinkService {
    constructor(@Inject(DB_MODEL_TOKEN_LINK) private readonly LINK_REPOSITORY: typeof Link) {}

    async findAll() {
        return await this.LINK_REPOSITORY.findAll<Link>();
    }

    async findById(id: number) {
        return await this.LINK_REPOSITORY.findOne<Link>({
            where: {
                id: {
                    [Sequelize.Op.eq]: id,
                },
            },
        });
    }

    async create(data) {
        return await this.LINK_REPOSITORY.create(data);
    }

    async updateById(id, data) {
        return this.LINK_REPOSITORY.update(data, { where: { id } });
    }
}
