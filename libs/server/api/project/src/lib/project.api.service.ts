import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { LoggerHelper } from '@octo-crm/server-core';
import { ServerDomainProjectService } from '@octo-crm/server-domain-project';
import { ServerDomainSourceService } from '@octo-crm/server-domain-source';
import { ProjectDeleteRequestDtoParams } from './dto/delete.request.dto';
import { ProjectRefreshRequestDtoParams } from './dto/refresh.request.dto';
import { ProjectCreateRequestDtoBody } from './dto/create.request.dto';
import { ProjectSearchRequestDtoQuery } from './dto/search.request.dto';
import { ServerDomainAuthService } from '@octo-crm/server-domain-auth';
import { ProjectSearchResponseDto } from './dto/search.response.dto';
import { ProjectDeleteResponseDto } from './dto/delete.response.dto';
import { ProjectCreateResponseDto } from './dto/create.response.dto';

@Injectable()
export class ServerApiProjectService {
  private readonly $_logger: LoggerHelper;

  constructor(
    $_logger: Logger,
    private readonly $_auth: ServerDomainAuthService,
    private readonly $_project: ServerDomainProjectService,
    private readonly $_source: ServerDomainSourceService,
  ) {
    this.$_logger = LoggerHelper.create($_logger, this.constructor.name);
  }

  async search(query: ProjectSearchRequestDtoQuery) {
    try {
      const _session = this.$_auth.getSession();

      const [projects, total] = await this.$_project.search(
        _session.sub,
        query.limit,
        query.offset,
      );

      return ProjectSearchResponseDto.fromResult(projects).withPagination(
        total,
        query.limit,
        query.offset,
      );
    } catch (err) {
      this.$_logger.fromError(err, 'Unable to search projects', {
        limit: query.limit,
        offset: query.offset,
      });

      throw err;
    }
  }

  async create(body: ProjectCreateRequestDtoBody) {
    try {
      const _session = this.$_auth.getSession();

      const _existing = await this.$_project.getByKey(_session.sub, body.key);

      if (_existing) {
        throw new ConflictException('Project with this key already exists.');
      }

      const _project = await this.$_project.create(_session.sub, body.key);

      await this.$_source.scheduleFetch(body.key);

      return ProjectCreateResponseDto.fromResult(_project);
    } catch (err) {
      this.$_logger.fromError(err, 'Unable to create project', {
        key: body.key,
      });

      throw err;
    }
  }

  async delete(params: ProjectDeleteRequestDtoParams) {
    try {
      const _session = this.$_auth.getSession();

      await this.$_project.delete(_session.sub, params.id);

      return ProjectDeleteResponseDto.fromResult(undefined);
    } catch (err) {
      this.$_logger.fromError(err, 'Unable to delete project', {
        if: params.id,
      });

      throw err;
    }
  }

  async refresh(params: ProjectRefreshRequestDtoParams) {
    try {
      const _session = this.$_auth.getSession();

      const _project = await this.$_project.getById(_session.sub, params.id);

      if (!_project) {
        throw new ForbiddenException('User does not have access to this project.');
      }

      await this.$_source.scheduleRefresh(_project.key);

      return ProjectDeleteResponseDto.fromResult(undefined);
    } catch (err) {
      this.$_logger.fromError(err, 'Unable to refresh project', {
        id: params.id,
      });

      throw err;
    }
  }
}
