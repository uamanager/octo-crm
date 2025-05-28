import { Injectable, Logger } from '@nestjs/common';
import { LoggerHelper } from '@octo-crm/server-core';
import {
  GithubProvider,
  SourceQueueProvider,
  SourceRepository,
  UpdateSourceModel,
} from '@octo-crm/core';

@Injectable()
export class ServerDomainSourceService {
  private readonly $_logger: LoggerHelper;

  constructor(
    $_logger: Logger,
    private readonly $_sourceQueue: SourceQueueProvider,
    private readonly $_sourceRepository: SourceRepository,
    private readonly $_githubProvider: GithubProvider,
  ) {
    this.$_logger = LoggerHelper.create($_logger, this.constructor.name);
  }

  async scheduleRefresh(key: string) {
    try {
      this.$_logger.debug(`Schedule refresh source`, {
        key,
      });

      await this.$_sourceQueue.refresh(key);
    } catch (err) {
      this.$_logger.fromError(err, 'Error while refreshing source', {
        key,
      });
    }
  }

  async findOrCreateByKey(key: string) {
    try {
      return await this.$_sourceRepository.findOrCreateByKey(key);
    } catch (err) {
      this.$_logger.fromError(err, 'Unable to find or create source by key', {
        key,
      });

      throw err;
    }
  }

  async upsertByKey(key: string, source: UpdateSourceModel) {
    try {
      return await this.$_sourceRepository.upsertByKey(key, source);
    } catch (err) {
      this.$_logger.fromError(err, 'Unable to upsert source', {
        key,
      });

      throw err;
    }
  }

  async fetchFromGithub(key: string) {
    try {
      return await this.$_githubProvider.getRepository(key);
    } catch (err) {
      this.$_logger.fromError(err, 'Unable to fetch source from github', {
        key,
      });

      throw err;
    }
  }
}
