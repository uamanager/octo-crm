import { Injectable, Logger } from '@nestjs/common';
import {
  FetchRepositorySourceQueueTask,
  QueueTask,
  RefreshRepositorySourceQueueTask,
  SOURCE_QUEUE,
  SourceQueueProvider,
} from '@octo-crm/core';
import { LoggerHelper } from '@octo-crm/server-core';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class ServerInfraBullmqSourceQueueProvider implements SourceQueueProvider {
  private readonly $_logger: LoggerHelper;

  constructor($_logger: Logger, @InjectQueue(SOURCE_QUEUE) private $_sourceQueue: Queue) {
    this.$_logger = LoggerHelper.create($_logger, this.constructor.name);
  }

  async enqueue<T>(task: QueueTask<T>) {
    try {
      this.$_logger.debug(`Enqueueing task`, {
        queue: this.$_sourceQueue.name,
        task: task,
      });
      await this.$_sourceQueue.add(task.type, task.data, task.options);
      this.$_logger.debug(`Task enqueued`, {
        queue: this.$_sourceQueue.name,
        task: task,
      });
    } catch (err) {
      this.$_logger.fromError(err, 'Error while enqueueing task', {
        queue: this.$_sourceQueue.name,
        task: task,
      });
      throw err;
    }
  }

  async fetch(key: string) {
    return this.enqueue(
      new FetchRepositorySourceQueueTask(key, {
        deduplication: {
          id: `fetch(${key})`,
          ttl: 1000 * 60 * 60,
        },
        removeOnComplete: 1,
        removeOnFail: 1,
      }),
    );
  }

  async refresh(key: string) {
    return this.enqueue(
      new RefreshRepositorySourceQueueTask(key, {
        deduplication: {
          id: `refresh(${key})`,
          ttl: 1000 * 60 * 60,
        },
        removeOnComplete: 1,
        removeOnFail: 1,
      }),
    );
  }
}
