import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from './database/database.module';
import { TopicModule } from './modules/topic.module';
import { TagModule } from './modules/node.module';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { TopicPostModule } from './modules/topic.post.module';
import { LinkModule } from './modules/link.module';
import { UploadModule } from './modules/upload.module';

@Module({
    imports: [
        DatabaseModule,
        TopicModule,
        TopicPostModule,
        TagModule,
        UserModule,
        LinkModule,
        AuthModule,
        UploadModule,
        GraphQLModule.forRoot({
            context: ({ req }) => ({ req }),
            installSubscriptionHandlers: true,
            autoSchemaFile: 'schema.gql',
        }),
    ],
})
export class AppModule {}
