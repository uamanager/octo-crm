import { Logger, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { SOURCE_QUEUE } from '@octo-crm/core';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ServerWorkerSourceProcessor } from './source.processor';
import { ServerDomainSourceModule } from '@octo-crm/server-domain-source';
import { ServerDomainProjectModule } from '@octo-crm/server-domain-project';

@Module({
  imports: [
    BullModule.registerQueue({
      name: SOURCE_QUEUE,
    }),
    BullBoardModule.forFeature({
      name: SOURCE_QUEUE,
      adapter: BullMQAdapter,
    }),
    ServerDomainSourceModule,
    ServerDomainProjectModule,
  ],
  providers: [Logger, ServerWorkerSourceProcessor],
  exports: [],
})
export class ServerWorkerSourceModule {}
