import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerInfraMongodbSourceRepository } from './source.repository';
import { Source, SourceSchema } from './source.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Source.name,
        schema: SourceSchema,
      },
    ]),
  ],
  providers: [Logger, ServerInfraMongodbSourceRepository],
  exports: [ServerInfraMongodbSourceRepository],
})
export class ServerInfraMongodbSourceModule {}
