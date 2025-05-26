import { Logger, Provider } from '@nestjs/common';
import { LoggerHelper } from '@octo-crm/server-core';
import githubConfig from '../github.config';
import { ConfigType } from '@nestjs/config';
import { FullRepository } from './get-repository';

export abstract class GithubClient {
  abstract rest: {
    repos: {
      get(params: { owner: string; repo: string }): Promise<{ data: FullRepository }>;
    };
  };
}

export const provideGithubClient = (): Provider<GithubClient> => {
  return {
    provide: GithubClient,
    useFactory: async (
      _logger: Logger,
      _githubConfig: ConfigType<typeof githubConfig>,
    ) => {
      const { Octokit } = await import('@octokit/rest');
      const $_logger = LoggerHelper.create(_logger, GithubClient.name);
      return new Octokit({
        auth: _githubConfig.apiKey,
        log: {
          debug: (message) => {
            $_logger.debug(message);
          },
          info: (message) => {
            $_logger.log(message);
          },
          warn: (message) => {
            $_logger.warn(message);
          },
          error: (message) => {
            $_logger.error(message);
          },
        },
      });
    },
    inject: [Logger, githubConfig.KEY],
  };
};
