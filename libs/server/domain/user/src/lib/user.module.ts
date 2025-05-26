import { Logger, Module } from '@nestjs/common';
import { ServerDomainUserService } from './user.service';

@Module({
  controllers: [],
  providers: [Logger, ServerDomainUserService],
  exports: [ServerDomainUserService],
})
export class ServerDomainUserModule {}
