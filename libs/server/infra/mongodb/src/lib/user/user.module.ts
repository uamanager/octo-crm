import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerInfraMongodbUserRepository } from './user.repository';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [
    Logger,
    ServerInfraMongodbUserRepository,
  ],
  exports: [
    ServerInfraMongodbUserRepository,
  ],
})
export class ServerInfraMongodbUserModule {
}
