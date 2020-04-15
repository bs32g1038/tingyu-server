import { Table, Column, Model, AutoIncrement, Default } from 'sequelize-typescript';
import { NOW } from 'sequelize';

@Table({
    tableName: 'pangu_tag',
    freezeTableName: true,
})
export class Tag extends Model<Tag> {
    @AutoIncrement
    @Column({ primaryKey: true })
    id: number;

    @Column({ comment: '标签名' })
    name: string;

    @Column({ comment: '标签描述' })
    description: string;

    @Default(0)
    @Column({ comment: '话题数量', field: 'topic_count' })
    topicCount: number;

    @Column({ comment: '图标' })
    icon: string;

    @Default(0)
    @Column({ comment: '标签展示顺序' })
    displayOrder: number;

    @Default(false)
    @Column({ comment: '是否显示图标', field: 'is_show_icon' })
    isShowIcon: string;

    @Default(NOW)
    @Column({ field: 'created_at' })
    createdAt: Date;

    @Default(NOW)
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @Column({ field: 'deleted_at' })
    deletedAt: Date;
}
