import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServerInfraMongodbProjectRepository } from './project.repository';
import { Project, ProjectSchema } from './project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
  ],
  providers: [
    Logger,
    ServerInfraMongodbProjectRepository,
  ],
  exports: [
    ServerInfraMongodbProjectRepository,
  ],
})
export class ServerInfraMongodbProjectModule {
}
