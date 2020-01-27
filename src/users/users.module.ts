import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { QueryHandlers } from './queries/handlers';
import { UsersController } from './users.controller';
import { StateUpdaters } from './events/updaters';
import { EventSourcingModule } from 'event-sourcing-nestjs';
import { RediskModule } from 'redisk-nestjs';
import { config } from 'src/config';
import { UserResolver } from './graphql/user.resolver';

@Module({
    imports: [
        CqrsModule,
        RediskModule.forRoot({ url: config.REDIS_URL }),
        EventSourcingModule.forRoot({ mongoURL: config.MONGO_URL }),
    ],
    controllers: [UsersController],
    providers: [
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers,
        ...StateUpdaters,
        UserResolver,
    ],
})
export class UsersModule {}