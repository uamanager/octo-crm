import { Injectable, Logger } from '@nestjs/common';
import {
  GithubProvider,
  GithubRepositoryGenericError,
  GithubRepositoryModel,
  GithubRepositoryNotExistError,
  GithubRepositoryOwnerModel,
  GithubRepositoryRepositoryModel,
  RepositoryOwnerType,
} from '@octo-crm/core';
import { LoggerHelper } from '@octo-crm/server-core';
import { GithubClient } from './client/github.client';

@Injectable()
export class ServerInfraGithubProvider implements GithubProvider {
  private readonly $_logger: LoggerHelper;

  constructor($_logger: Logger, private readonly $_client: GithubClient) {
    this.$_logger = LoggerHelper.create($_logger, this.constructor.name);
  }

  async getRepository(key: string) {
    try {
      this.$_logger.debug(`Getting repository`, {
        key,
      });

      const [owner, repo] = key.split('/');

      const { data } = await this.$_client.rest.repos.get({ owner, repo });

      this.$_logger.debug(`Repository retrieved`, {
        key,
        id: data.id,
      });

      return new GithubRepositoryModel({
        key: data.full_name,
        owner: new GithubRepositoryOwnerModel({
          login: data.owner.login,
          avatar_url: data.owner.avatar_url,
          url: data.owner.html_url,
          type:
            data.owner.type.toUpperCase() === RepositoryOwnerType.USER
              ? RepositoryOwnerType.USER
              : RepositoryOwnerType.ORGANIZATION,
        }),
        repository: new GithubRepositoryRepositoryModel({
          name: data.name,
          description: data.description ?? '',
          topics: data.topics ?? [],
          license: data.license?.name ?? 'MIT',
          private: data.private,
          template: data.is_template ?? false,
          archived: data.archived,
          fork: data.fork,
          url: data.html_url,
          stars: data.stargazers_count,
          forks: data.forks_count,
          issues: data.open_issues_count,
          watchers: data.watchers,
          created_at: new Date(data.created_at),
          updated_at: new Date(data.updated_at),
          pushed_at: new Date(data.pushed_at),
        }),
      });
    } catch (err) {
      this.$_logger.fromError(err, 'Error while fetching repository', {
        key,
      });

      if (err instanceof Error && 'status' in err && err.status === 404) {
        throw new GithubRepositoryNotExistError({
          key,
        });
      }

      throw new GithubRepositoryGenericError({
        key,
      });
    }
  }
}
