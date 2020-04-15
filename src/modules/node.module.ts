import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { Tag } from '@src/models';
import { NodeResolver } from '../resolvers/node.resolver';
import { NodeService } from '@src/services';
import { DB_MODEL_TOKEN_TAG } from '@src/common/constants';
import { getProviderByModelAndToken } from '@src/utils/model.util';

@Module({
    providers: [getProviderByModelAndToken(Tag, DB_MODEL_TOKEN_TAG), NodeResolver, NodeService, DateScalar],
})
export class TagModule {}
