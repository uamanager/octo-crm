import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { LoggerHelper } from '@octo-crm/server-core';
import {
  FETCH_REPOSITORY_SOURCE_QUEUE_TASK,
  FetchRepositorySourceQueueTask,
  REFRESH_REPOSITORY_SOURCE_QUEUE_TASK,
  RefreshRepositorySourceQueueTask,
  SOURCE_QUEUE,
  UpdateSourceModel,
} from '@octo-crm/core';
import { ServerDomainSourceService } from '@octo-crm/server-domain-source';
import { ServerDomainProjectService } from '@octo-crm/server-domain-project';

export type TSourceTasksTypeData =
  | FetchRepositorySourceQueueTask['data']
  | RefreshRepositorySourceQueueTask['data'];

@Processor(SOURCE_QUEUE)
export class ServerWorkerSourceProcessor extends WorkerHost {
  private readonly $_logger: LoggerHelper;

  constructor(
    $_logger: Logger,
    private readonly $_source: ServerDomainSourceService,
    private readonly $_project: ServerDomainProjectService,
  ) {
    super();
    this.$_logger = LoggerHelper.create($_logger, this.constructor.name);
  }

  async process(job: Job<TSourceTasksTypeData>): Promise<void> {
    this.$_logger.debug(`Task`, job as unknown as Record<string, unknown>);
    try {
      switch (job.name) {
        case FETCH_REPOSITORY_SOURCE_QUEUE_TASK:
          return await this.onFetch(job);
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

  async onFetch(job: Job<FetchRepositorySourceQueueTask['data']>) {
    try {
      console.log(job);
      const _update = await this.$_source.fetchFromGithub(job.data.key);

      const _source = await this.$_source.upsertByKey(
        job.data.key,
        new UpdateSourceModel({
          key: _update.key,
          repository: _update.repository,
          owner: _update.owner,
        }),
      );

      await this.$_project.linkSource(job.data.key, _source.id);
    } catch (err) {
      this.$_logger.fromError(err, 'Error while processing fetch task', {
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
