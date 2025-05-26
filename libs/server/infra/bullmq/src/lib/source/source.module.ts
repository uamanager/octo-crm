import { Logger, Module } from '@nestjs/common';
import { ServerInfraBullmqSourceQueueProvider } from './source.queue.provider';
import { BullModule } from '@nestjs/bullmq';
import { SOURCE_QUEUE } from '@octo-crm/core';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

@Module({
  imports: [
    BullModule.registerQueue({
      name: SOURCE_QUEUE,
    }),
    BullBoardModule.forFeature({
      name: SOURCE_QUEUE,
      adapter: BullMQAdapter,
    }),
  ],
  providers: [Logger, ServerInfraBullmqSourceQueueProvider],
  exports: [ServerInfraBullmqSourceQueueProvider],
})
export class ServerInfraBullmqSourceModule {}
