import { Table, Column, Model, AutoIncrement, Default } from 'sequelize-typescript';
import { NOW } from 'sequelize';

@Table({
    tableName: 'pangu_topic',
    freezeTableName: true,
})
export class Topic extends Model<Topic> {
    @AutoIncrement
    @Column({ primaryKey: true })
    id: number;

    @Column({ comment: '话题标题' })
    title: string;

    @Default(false)
    @Column({ comment: '是否置顶' })
    top: boolean;

    @Default(false)
    @Column({ comment: '是否精华' })
    good: boolean;

    @Default(false)
    @Column({ comment: '是否锁定' })
    locked: boolean;

    @Default(0)
    @Column({ comment: '浏览数量', field: 'visit_count' })
    visitCount: number;

    @Default(0)
    @Column({ comment: '回复数量', field: 'reply_count' })
    replyCount: number;

    @Default(0)
    @Column({ comment: '收藏数量', field: 'collect_count' })
    collectCount: number;

    @Column({ comment: '类型 1 分享 2 问答' })
    type: number;

    // @BelongsTo(() => Node, { as: 'node', foreignKey: 'nodeId' })
    // @Column({ comment: '节点id', field: 'node_id' })
    // nodeId: number;

    @Column({ comment: '标签id', field: 'tag_id' })
    tagId: number;

    // @BelongsTo(() => Recruit, { as: 'recruitInfo', foreignKey: 'recruitId' })
    // @Column({ comment: '招聘信息id', field: 'recruit_id' })
    // recruitId: number;

    // @BelongsTo(() => User, { as: 'user', foreignKey: 'userId' })
    @Column({ comment: '作者id', field: 'user_id' })
    userId: number;

    // @BelongsTo(() => User, { as: 'lastReplyUser', foreignKey: 'lastReplyUserId' })
    @Column({ comment: '最后回复的用户的id', field: 'last_reply_user_id' })
    lastReplyUserId: number;

    @Default(NOW)
    @Column({ comment: '最后回复时间', field: 'last_replied_at' })
    lastRepliedAt: Date;

    @Default(NOW)
    @Column({ field: 'created_at' })
    createdAt: Date;

    @Default(NOW)
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @Column({ field: 'deleted_at' })
    deletedAt: Date;
}
