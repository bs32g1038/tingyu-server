import { Table, Column, Model, AutoIncrement, Default, BelongsTo } from 'sequelize-typescript';
import { NOW } from 'sequelize';
import { User } from './user.model';
import { Topic } from './topic.model';
import { getProviderByModel } from '../utils/model.util';

@Table({
    tableName: 'pangu_topic_collect',
    freezeTableName: true,
})
export class TopicCollect extends Model<TopicCollect> {
    @AutoIncrement
    @Column({ primaryKey: true })
    id: number;

    @BelongsTo(() => User, { as: 'user', foreignKey: 'userId' })
    @Column({ comment: '用户id', field: 'user_id' })
    userId: number;

    @BelongsTo(() => Topic, { as: 'topic', foreignKey: 'topic_id' })
    @Column({ comment: '文章id', field: 'topic_id' })
    topicId: number;

    @Default(NOW)
    @Column({ field: 'created_at' })
    createdAt: Date;

    @Default(NOW)
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @Column({ field: 'deleted_at' })
    deletedAt: Date;
}

export const TopicCollectModelProvider = getProviderByModel(TopicCollect);
