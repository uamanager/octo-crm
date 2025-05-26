import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import githubConfig from './github.config';
import { ServerInfraGithubProvider } from './github.provider';
import { provideGithubClient } from './client/github.client';

@Module({
  imports: [ConfigModule.forFeature(githubConfig)],
  providers: [Logger, provideGithubClient(), ServerInfraGithubProvider],
  exports: [ServerInfraGithubProvider],
})
export class ServerInfraGithubModule {}
