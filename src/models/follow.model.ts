import { Table, Column, Model, AutoIncrement, Default, BelongsTo } from 'sequelize-typescript';
import { NOW } from 'sequelize';
import { User } from './user.model';
import { getProviderByModel } from '../utils/model.util';

@Table({
    tableName: 'pangu_follow',
    freezeTableName: true,
})
export class Follow extends Model<Follow> {
    @AutoIncrement
    @Column({ primaryKey: true })
    id: number;

    @BelongsTo(() => User, { as: 'user', foreignKey: 'userId' })
    @Column({ comment: '用户id', field: 'user_id' })
    userId: number;

    @BelongsTo(() => User, { as: 'followUser', foreignKey: 'follow_user_id' })
    @Column({ comment: '跟随的用户id', field: 'follow_user_id' })
    followUserId: number;

    @Default(NOW)
    @Column({ field: 'created_at' })
    createdAt: Date;

    @Default(NOW)
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @Column({ field: 'deleted_at' })
    deletedAt: Date;
}

export const FollowModelProvider = getProviderByModel(Follow);
