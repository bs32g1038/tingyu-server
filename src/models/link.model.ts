import { Table, Column, Model, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName: 'pangu_link',
    freezeTableName: true,
    timestamps: true,
    underscored: false,
})
export class Link extends Model<Link> {
    @AutoIncrement
    @Column({ primaryKey: true })
    id: number;

    @Column({ comment: '友链 URL' })
    url: string;

    @Column({ comment: '标题' })
    title: string;

    @Column({ comment: 'logo' })
    logo: string;

    @Column({ comment: '简介' })
    summary: string;

    @Column({ comment: '状态' })
    status: number;
}
