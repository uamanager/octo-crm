import { Logger, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { ServerDomainAuthService } from './auth.service';

@Module({
  imports: [ClsModule],
  providers: [Logger, ServerDomainAuthService],
  exports: [ServerDomainAuthService],
})
export class ServerDomainAuthModule {}
