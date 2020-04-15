import { Table, Column, Model, AutoIncrement, Default } from 'sequelize-typescript';
import { NOW } from 'sequelize';
import { getProviderByModel } from '../utils/model.util';

@Table({
    tableName: 'pangu_user',
    freezeTableName: true,
})
export class User extends Model<User> {
    @AutoIncrement
    @Column({ primaryKey: true })
    id: number;

    @Column({ comment: '账号' })
    account: string;

    @Column({ comment: '用户名' })
    username: string;

    @Column({ comment: '密码' })
    password: string;

    @Column({ comment: '邮箱' })
    email: string;

    @Column({ comment: '头像' })
    avatar: string;

    @Column({ comment: '位置' })
    location: string;

    @Default(false)
    @Column({ comment: '是否是vip' })
    vip: string;

    @Default(false)
    @Column({ comment: '签名' })
    signature: string;

    @Default(false)
    @Column({ comment: '是否激活' })
    active: string;

    @Default(false)
    @Column({ comment: '是否可用, 默认为true：开启' })
    enable: string;

    @Default(0)
    @Column({ comment: '用户积分' })
    score: number;

    @Default(0)
    @Column({ comment: '创建的话题数量', field: 'topic_count' })
    topicCount: number;

    @Default(0)
    @Column({ comment: '回复数量', field: 'reply_count' })
    replyCount: number;

    @Default(0)
    @Column({ comment: '跟随者的数量', field: 'follower_count' })
    followerCount: number;

    @Default(0)
    @Column({ comment: '关注他人的数量', field: 'following_count' })
    followingCount: number;

    @Default(0)
    @Column({ comment: '收藏的 标签 的数量', field: 'collect_tag_count' })
    collectTagCount: number;

    @Default(0)
    @Column({ comment: '收藏的话题数量', field: 'collect_topic_count' })
    collectTopicCount: number;

    @Default(NOW)
    @Column({ field: 'created_at' })
    createdAt: Date;

    @Default(NOW)
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @Column({ field: 'deleted_at' })
    deletedAt: Date;
}

export const UserModelProvider = getProviderByModel(User);
