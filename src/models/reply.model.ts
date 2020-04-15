import { Table, Column, Model, AutoIncrement, Default, BelongsTo } from 'sequelize-typescript';
import { NOW } from 'sequelize';
import { User } from './user.model';
import { Topic } from './topic.model';
import { getProviderByModel } from '../utils/model.util';

@Table({
    tableName: 'pangu_reply',
    freezeTableName: true,
})
export class Reply extends Model<Reply> {
    @AutoIncrement
    @Column({ primaryKey: true })
    id: number;

    @Column({ comment: '回复内容' })
    content: string;

    @Default(0)
    @Column({ comment: '喜欢的数量' })
    like: number;

    @BelongsTo(() => User, { as: 'user', foreignKey: 'userId' })
    @Column({ comment: '用户id', field: 'user_id' })
    userId: number;

    @BelongsTo(() => Topic, { as: 'topic', foreignKey: 'topic_id' })
    @Column({ comment: '文章id', field: 'topic_id' })
    topicId: number;

    @Column({ comment: '回复id', field: 'reply_id' })
    topicreplyId: number;

    @Default(false)
    @Column({ comment: '默认为 markdown', field: 'content_is_html' })
    contentIsHtml: boolean;

    @Default(NOW)
    @Column({ field: 'created_at' })
    createdAt: Date;

    @Default(NOW)
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @Column({ field: 'deleted_at' })
    deletedAt: Date;
}

export const ReplyModelProvider = getProviderByModel(Reply);
