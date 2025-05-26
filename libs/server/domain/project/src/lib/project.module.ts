import { Logger, Module } from '@nestjs/common';
import { ServerDomainProjectService } from './project.service';

@Module({
  controllers: [],
  providers: [Logger, ServerDomainProjectService],
  exports: [ServerDomainProjectService],
})
export class ServerDomainProjectModule {}
