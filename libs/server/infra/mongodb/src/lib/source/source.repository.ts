import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  flattenObject,
  SourceModel,
  SourceRepository,
  UpdateSourceModel,
} from '@octo-crm/core';
import { Source } from './source.schema';
import { LoggerHelper } from '@octo-crm/server-core';

@Injectable()
export class ServerInfraMongodbSourceRepository implements SourceRepository {
  private readonly $_logger: LoggerHelper;

  constructor(
    $_logger: Logger,
    @InjectModel(Source.name) private readonly _sourceModel: Model<Source>,
  ) {
    this.$_logger = LoggerHelper.create($_logger, this.constructor.name);
  }

  async findOrCreateByKey(key: string): Promise<SourceModel> {
    try {
      const _result = await this._sourceModel.findOne({ key }).exec();

      if (_result) {
        return new SourceModel({
          id: _result.id,
          key: _result.key,
          owner: _result.owner,
          repository: _result.repository,
          created_at: _result.created_at,
          updated_at: _result.updated_at,
        });
      }

      const _newSource = new this._sourceModel({
        key: key,
      });

      const _createSource = await _newSource.save();

      return new SourceModel({
        id: _createSource.id,
        key: _createSource.key,
        owner: _createSource.owner,
        repository: _createSource.repository,
        created_at: _createSource.created_at,
        updated_at: _createSource.updated_at,
      });
    } catch (error) {
      this.$_logger.fromError(error, 'Unable to find or create source by key', {
        key,
      });
      return Promise.reject(error);
    }
  }

  async upsertByKey(key: string, data: UpdateSourceModel): Promise<SourceModel> {
    try {
      const _patch = flattenObject(data);

      const _result = await this._sourceModel
        .findOneAndUpdate(
          {
            key,
          },
          {
            $set: {
              ..._patch,
              updated_at: new Date(),
            },
            $setOnInsert: {
              created_at: new Date(),
            },
          },
          { new: true, upsert: true },
        )
        .exec();

      return new SourceModel({
        id: _result.id,
        key: _result.key,
        owner: _result.owner,
        repository: _result.repository,
        created_at: _result.created_at,
        updated_at: _result.updated_at,
      });
    } catch (error) {
      this.$_logger.fromError(error, 'Unable to upsert source', {
        key,
      });
      return Promise.reject(error);
    }
  }
}
