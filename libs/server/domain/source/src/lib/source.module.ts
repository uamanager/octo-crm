import { Logger, Module } from '@nestjs/common';
import { ServerDomainSourceService } from './source.service';

@Module({
  controllers: [],
  providers: [Logger, ServerDomainSourceService],
  exports: [ServerDomainSourceService],
})
export class ServerDomainSourceModule {}
