import { Table, Column, Model, AutoIncrement, Default } from 'sequelize-typescript';
import { NOW } from 'sequelize';
import { getProviderByModel } from '../utils/model.util';

@Table({
    tableName: 'pangu_recruit',
    freezeTableName: true,
})
export class Recruit extends Model<Recruit> {
    @AutoIncrement
    @Column({ primaryKey: true })
    id: number;

    @Column({ comment: '有效开始', field: 'start_time' })
    startTime: string;

    @Column({ comment: '有效结束时间', field: 'end_time' })
    endTime: string;

    @Column({ comment: '地点' })
    location: string;

    @Column({ comment: '职位' })
    job: string;

    @Default(1)
    @Column({ comment: '员工人数指标 1 代表 20人以下， 2代表 20 - 100人，以此类推' })
    staff: number;

    @Default(1)
    @Column({ comment: '融资情况，1代表不需要融资，2代表a轮，以此类推' })
    finance: number;

    @Default(1)
    @Column({ comment: '薪资范围，1代表3k-6k，2代表6k-10k，以此类推' })
    salary: number;

    @Default(1)
    @Column({ comment: '学历，1代表专科，2代表本科，以此类推' })
    education: number;

    @Default(1)
    @Column({ comment: '工作经验，1代表1年以下，2代表1-3年，以此类推' })
    experience: number;

    @Default(NOW)
    @Column({ field: 'created_at' })
    createdAt: Date;

    @Default(NOW)
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    @Column({ field: 'deleted_at' })
    deletedAt: Date;
}

export const RecruitModelProvider = getProviderByModel(Recruit);
