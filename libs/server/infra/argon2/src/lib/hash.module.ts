import { Logger, Module } from '@nestjs/common';
import { ServerInfraArgon2HashProvider } from './hash.provider';

@Module({
  providers: [Logger, ServerInfraArgon2HashProvider],
  exports: [ServerInfraArgon2HashProvider],
})
export class ServerInfraArgon2HashModule {}
