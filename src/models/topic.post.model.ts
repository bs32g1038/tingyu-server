import { Table, Column, Model, AutoIncrement, Default } from 'sequelize-typescript';

// 拆分话题内容到这个表中
@Table({
    tableName: 'pangu_topic_post',
    freezeTableName: true,
    timestamps: true,
    underscored: false,
})
export class TopicPost extends Model<TopicPost> {
    @AutoIncrement
    @Column({ primaryKey: true })
    id: number;

    @Column({ comment: '话题 Id' })
    topicId: number;

    @Column({ comment: '标签 Id' })
    tagId: number;

    @Column({ comment: '作者 Id' })
    userId: number;

    @Column({ comment: '话题内容' })
    content: string;

    @Default(0)
    @Column({ comment: '点赞数量' })
    likeCount: number;

    @Default(0)
    @Column({ comment: '评论数量' })
    commentCount: number;
}
