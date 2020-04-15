import { FindAndCountOptions } from 'sequelize';
import { Model } from 'sequelize-typescript';

export const paging = async <M extends Model>(model: { new (): M } & typeof Model, options?: FindAndCountOptions) => {
    const data = await model.findAndCountAll<M>(options);
    return {
        results: data.rows,
        paging: {
            currentPage: options.offset + 1,
            itemsPerPage: options.limit,
            totalPages: Math.ceil(data.count / options.limit),
            totalItems: data.count,
        },
    };
};
