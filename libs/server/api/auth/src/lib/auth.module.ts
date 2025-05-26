import { Logger, Module } from '@nestjs/common';
import { ServerApiAuthService } from './auth.api.service';
import { ServerApiAuthController } from './auth.api.controller';
import { JwtAuthGuard, provideAppGuard } from './guard';
import { ServerDomainAuthModule } from '@octo-crm/server-domain-auth';
import { ServerDomainUserModule } from '@octo-crm/server-domain-user';

@Module({
  imports: [ServerDomainAuthModule, ServerDomainUserModule],
  controllers: [ServerApiAuthController],
  providers: [Logger, JwtAuthGuard, provideAppGuard(JwtAuthGuard), ServerApiAuthService],
  exports: [],
})
export class ServerApiAuthModule {}
