import { Logger, Module } from '@nestjs/common';
import { ServerApiProjectService } from './project.api.service';
import { ServerApiProjectController } from './project.api.controller';
import { ServerDomainProjectModule } from '@octo-crm/server-domain-project';
import { ServerDomainAuthModule } from '@octo-crm/server-domain-auth';
import { ServerDomainSourceModule } from '@octo-crm/server-domain-source';

@Module({
  imports: [ServerDomainAuthModule, ServerDomainProjectModule, ServerDomainSourceModule],
  controllers: [ServerApiProjectController],
  providers: [Logger, ServerApiProjectService],
  exports: [],
})
export class ServerApiProjectModule {}
