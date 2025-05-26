import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  IProjectEntity,
  ISourceEntity,
  ProjectModel,
  ProjectRepository,
} from '@octo-crm/core';
import { Project } from './project.schema';
import { LoggerHelper } from '@octo-crm/server-core';
import { ObjectId } from 'mongodb';

@Injectable()
export class ServerInfraMongodbProjectRepository implements ProjectRepository {
  private readonly $_logger: LoggerHelper;

  constructor(
    $_logger: Logger,
    @InjectModel(Project.name) private readonly _projectModel: Model<Project>,
  ) {
    this.$_logger = LoggerHelper.create($_logger, this.constructor.name);
  }

  async searchProjects(
    user: string,
    limit: number,
    offset: number,
  ): Promise<[ProjectModel[], number]> {
    try {
      const _result = await this._projectModel
        .find<IProjectEntity<string, string>>({
          user,
        })
        .limit(limit)
        .skip(offset)
        .populate<IProjectEntity<string, ISourceEntity>>('source')
        .exec();

      const _total = await this._projectModel
        .countDocuments({
          user,
        })
        .exec();

      return [
        _result.map((project) => {
          return new ProjectModel({
            id: project.id,
            key: project.key,
            user: project.user,
            source: project.source,
            created_at: project.created_at,
            updated_at: project.updated_at,
          });
        }),
        _total,
      ];
    } catch (err) {
      this.$_logger.fromError(err, 'Unable to search projects', {
        user,
        limit,
        offset,
      });

      throw err;
    }
  }

  async getProjectById(user: string, id: string): Promise<ProjectModel | null> {
    try {
      const _project = await this._projectModel
        .findOne<IProjectEntity<string, string>>({
          user,
          _id: new ObjectId(id),
        })
        .populate<IProjectEntity<string, ISourceEntity>>('source')
        .exec();

      if (!_project) {
        return null;
      }

      return new ProjectModel({
        id: _project.id,
        key: _project.key,
        user: _project.user,
        source: _project.source,
        created_at: _project.created_at,
        updated_at: _project.updated_at,
      });
    } catch (err) {
      this.$_logger.fromError(err, 'Unable to get project by id', {
        user,
        id,
      });

      throw err;
    }
  }

  async getProjectByKey(user: string, key: string): Promise<ProjectModel | null> {
    try {
      const _project = await this._projectModel
        .findOne<IProjectEntity<string, string>>({
          user,
          key,
        })
        .populate<IProjectEntity<string, ISourceEntity>>('source')
        .exec();

      if (!_project) {
        return null;
      }

      return new ProjectModel({
        id: _project.id,
        key: _project.key,
        user: _project.user,
        source: _project.source,
        created_at: _project.created_at,
        updated_at: _project.updated_at,
      });
    } catch (err) {
      this.$_logger.fromError(err, 'Unable to get project by key', {
        user,
        key,
      });

      throw err;
    }
  }

  async createProject(user: string, key: string): Promise<ProjectModel> {
    try {
      const _newProject = new this._projectModel({
        user,
        key,
      });

      const _createdProject = await _newProject.save();

      return new ProjectModel({
        id: _createdProject.id,
        key: _createdProject.key,
        user: _createdProject.user,
        source: null,
        created_at: _createdProject.created_at,
        updated_at: _createdProject.updated_at,
      });
    } catch (err) {
      this.$_logger.fromError(err, 'Unable to create project', {
        user,
        key,
      });

      throw err;
    }
  }

  async linkSource(key: string, source: string): Promise<void> {
    try {
      await this._projectModel.bulkWrite([
        {
          updateMany: {
            filter: {
              key,
              source: null,
            },
            update: {
              $set: {
                source,
                updated_at: new Date(),
              },
            },
          },
        },
      ]);
    } catch (err) {
      this.$_logger.fromError(err, 'Unable to link project source', {
        key,
        source,
      });

      throw err;
    }
  }

  async deleteProject(user: string, id: string): Promise<void> {
    try {
      await this._projectModel
        .deleteOne({
          _id: new ObjectId(id),
          user: user,
        })
        .exec();
    } catch (err) {
      this.$_logger.fromError(err, 'Unable to delete project', {
        id,
        user,
      });

      throw err;
    }
  }
}
