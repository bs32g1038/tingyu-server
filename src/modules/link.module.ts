import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { Link } from '@src/models';
import { LinkResolver } from '../resolvers/link.resolver';
import { LinkService } from '@src/services';
import { DB_MODEL_TOKEN_LINK } from '@src/common/constants';
import { getProviderByModelAndToken } from '@src/utils/model.util';

@Module({
    providers: [getProviderByModelAndToken(Link, DB_MODEL_TOKEN_LINK), LinkResolver, LinkService, DateScalar],
})
export class LinkModule {}
