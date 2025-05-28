import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { LoggerHelper } from '@octo-crm/server-core';
import {
  REFRESH_REPOSITORY_SOURCE_QUEUE_TASK,
  RefreshRepositorySourceQueueTask,
  SOURCE_QUEUE,
  UpdateSourceModel,
} from '@octo-crm/core';
import { ServerDomainSourceService } from '@octo-crm/server-domain-source';

export type TSourceTasksTypeData = RefreshRepositorySourceQueueTask['data'];

@Processor(SOURCE_QUEUE)
export class ServerWorkerSourceProcessor extends WorkerHost {
  private readonly $_logger: LoggerHelper;

  constructor($_logger: Logger, private readonly $_source: ServerDomainSourceService) {
    super();
    this.$_logger = LoggerHelper.create($_logger, this.constructor.name);
  }

  async process(job: Job<TSourceTasksTypeData>): Promise<void> {
    this.$_logger.debug(`Task`, job as unknown as Record<string, unknown>);
    try {
      switch (job.name) {
        case REFRESH_REPOSITORY_SOURCE_QUEUE_TASK:
          return await this.onRefresh(job);
        default:
          return;
      }
    } catch (err) {
      this.$_logger.fromError(err, 'Error while processing task', {
        id: job.id,
        name: job.name,
      });

      throw err;
    }
  }

  async onRefresh(job: Job<RefreshRepositorySourceQueueTask['data']>) {
    try {
      const _update = await this.$_source.fetchFromGithub(job.data.key);

      await this.$_source.upsertByKey(
        job.data.key,
        new UpdateSourceModel({
          key: _update.key,
          repository: _update.repository,
          owner: _update.owner,
        }),
      );
    } catch (err) {
      this.$_logger.fromError(err, 'Error while processing refresh task', {
        id: job.id,
        name: job.name,
      });

      throw err;
    }
  }
}
