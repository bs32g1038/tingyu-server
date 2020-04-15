import { Model } from 'sequelize-typescript';

export declare type ModelType = typeof Model;
export declare type ModelCtor<M extends Model = Model> = (new () => M) & ModelType;

// 根据 Model 获取 Provider
export const getProviderByModel = (model: ModelCtor) => {
    return {
        provide: Symbol(),
        useValue: model,
    };
};

export const getProviderByModelAndToken = (model: ModelCtor, dbModelToken: symbol) => {
    return {
        provide: dbModelToken,
        useValue: model,
    };
};
