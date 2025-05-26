import { Logger, Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { join } from 'node:path';
import { ServeStaticModule } from '@nestjs/serve-static';
import serveStaticConfig from './config/serve-static.config';
import mongodbConfig from './config/mongodb.config';
import bullmqConfig from './config/bullmq.config';
import bullmqDashboardConfig from './config/bullmq-dashboard.config';
import appConfig from './config/app.config';
import apiConfig from './config/api.config';
import swaggerConfig from './config/swagger.config';
import { ClsModule } from 'nestjs-cls';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullModule } from '@nestjs/bullmq';
import { ServerApiProjectModule } from '@octo-crm/server-api-project';
import { ServerDomainUserModule } from '@octo-crm/server-domain-user';
import { ServerDomainProjectModule } from '@octo-crm/server-domain-project';
import { ServerCoreInfraHostModule, ServerCoreModule } from '@octo-crm/server-core';
import {
  ServerInfraMongodbProjectModule,
  ServerInfraMongodbProjectRepository,
  ServerInfraMongodbSourceModule,
  ServerInfraMongodbSourceRepository,
  ServerInfraMongodbUserModule,
  ServerInfraMongodbUserRepository,
} from '@octo-crm/server-infra-mongodb';
import {
  ServerInfraBullmqSourceModule,
  ServerInfraBullmqSourceQueueProvider,
} from '@octo-crm/server-infra-bullmq';
import {
  ServerInfraGithubModule,
  ServerInfraGithubProvider,
} from '@octo-crm/server-infra-github';
import {
  GithubProvider,
  HashProvider,
  ProjectRepository,
  SourceQueueProvider,
  SourceRepository,
  UserRepository,
} from '@octo-crm/core';
import { ServerWorkerSourceModule } from '@octo-crm/server-worker-source';
import { ServerDomainSourceModule } from '@octo-crm/server-domain-source';
import { ServerApiAuthModule } from '@octo-crm/server-api-auth';
import {
  ServerInfraArgon2HashModule,
  ServerInfraArgon2HashProvider,
} from '@octo-crm/server-infra-argon2';
import { ServerDomainAuthModule } from '@octo-crm/server-domain-auth';
import authConfig from './config/auth.config';
import { AppJwtModule } from './jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [
        apiConfig,
        appConfig,
        authConfig,
        bullmqConfig,
        bullmqDashboardConfig,
        mongodbConfig,
        serveStaticConfig,
        swaggerConfig,
      ],
    }),

    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 5,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),

    AppJwtModule,

    ServeStaticModule.forRootAsync({
      useFactory: (_staticConfig: ConfigType<typeof serveStaticConfig>) => {
        return [
          {
            rootPath: join(__dirname, _staticConfig.rootPath),
            serveRoot: _staticConfig.serveRoot,
            renderPath: _staticConfig.renderPath,
          },
        ];
      },
      inject: [serveStaticConfig.KEY],
    }),

    ClsModule.forRoot(),

    BullModule.forRootAsync({
      useFactory: (_bullmqConfig: ConfigType<typeof bullmqConfig>) => {
        return {
          connection: {
            host: _bullmqConfig.host,
            port: _bullmqConfig.port,
          },
        };
      },
      inject: [bullmqConfig.KEY],
    }),

    BullBoardModule.forRootAsync({
      useFactory: (_bullmqDashboardConfig: ConfigType<typeof bullmqDashboardConfig>) => {
        return {
          route: _bullmqDashboardConfig.route,
          adapter: ExpressAdapter,
        };
      },
      inject: [bullmqDashboardConfig.KEY],
    }),

    MongooseModule.forRootAsync({
      useFactory: (_mongodbConfig: ConfigType<typeof mongodbConfig>) => {
        return {
          uri: _mongodbConfig.uri,
        };
      },
      inject: [mongodbConfig.KEY],
    }),

    // CORE
    ServerCoreModule,

    // AUTH
    ServerApiAuthModule,

    // INFRA
    ServerCoreInfraHostModule.register(
      {
        imports: [ServerInfraArgon2HashModule],
        providers: [
          {
            provide: HashProvider,
            useExisting: ServerInfraArgon2HashProvider,
          },
        ],
      },
      {
        imports: [ServerInfraGithubModule],
        providers: [
          {
            provide: GithubProvider,
            useExisting: ServerInfraGithubProvider,
          },
        ],
      },
      {
        imports: [ServerInfraMongodbProjectModule],
        providers: [
          {
            provide: ProjectRepository,
            useExisting: ServerInfraMongodbProjectRepository,
          },
        ],
      },
      {
        imports: [ServerInfraMongodbSourceModule],
        providers: [
          {
            provide: SourceRepository,
            useExisting: ServerInfraMongodbSourceRepository,
          },
        ],
      },
      {
        imports: [ServerInfraMongodbUserModule],
        providers: [
          {
            provide: UserRepository,
            useExisting: ServerInfraMongodbUserRepository,
          },
        ],
      },
      {
        imports: [ServerInfraBullmqSourceModule],
        providers: [
          {
            provide: SourceQueueProvider,
            useExisting: ServerInfraBullmqSourceQueueProvider,
          },
        ],
      },
    ),

    // DOMAIN
    ServerDomainAuthModule,
    ServerDomainUserModule,
    ServerDomainProjectModule,
    ServerDomainSourceModule,

    // API
    ServerApiProjectModule,

    // WORKER
    ServerWorkerSourceModule,
  ],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
