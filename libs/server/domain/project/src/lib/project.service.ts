import { Injectable, Logger } from '@nestjs/common';
import { LoggerHelper } from '@octo-crm/server-core';
import { ProjectRepository } from '@octo-crm/core';

@Injectable()
export class ServerDomainProjectService {
  private readonly $_logger: LoggerHelper;

  constructor($_logger: Logger, private readonly $_projectRepository: ProjectRepository) {
    this.$_logger = LoggerHelper.create($_logger, this.constructor.name);
  }

  async search(user: string, limit: number, offset: number) {
    try {
      return await this.$_projectRepository.searchProjects(user, limit, offset);
    } catch (err) {
      this.$_logger.fromError(err, 'Error while searching projects', {
        user,
        limit,
        offset,
      });

      throw err;
    }
  }

  async getById(user: string, id: string){
    try {
      return await this.$_projectRepository.getProjectById(user, id);
    } catch (err) {
      this.$_logger.fromError(err, 'Unable to get project by id', {
        user,
        id,
      });

      throw err;
    }
  }

  async getByKey(user: string, key: string){
    try {
      return await this.$_projectRepository.getProjectByKey(user, key);
    } catch (err) {
      this.$_logger.fromError(err, 'Unable to get project by key', {
        user,
        key,
      });

      throw err;
    }
  }

  async create(user: string, key: string) {
    try {
      return await this.$_projectRepository.createProject(user, key);
    } catch (err) {
      this.$_logger.fromError(err, 'Unable to create project', {
        user,
        key,
      });

      throw err;
    }
  }

  async linkSource(key: string, source: string) {
    try {
      return await this.$_projectRepository.linkSource(key, source);
    } catch (err) {
      this.$_logger.fromError(err, 'Unable to link project source', {
        key,
        source,
      });

      throw err;
    }
  }

  async delete(user: string, id: string) {
    try {
      return await this.$_projectRepository.deleteProject(user, id);
    } catch (err) {
      this.$_logger.fromError(err, 'Unable to delete project', {
        user,
        id,
      });

      throw err;
    }
  }
}
