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

  async findByKey(key: string): Promise<SourceModel | null> {
    try {
      const _result = await this._sourceModel.findOne({ key }).exec();

      return _result
        ? new SourceModel({
            id: _result.id,
            key: _result.key,
            owner: _result.owner,
            repository: _result.repository,
            created_at: _result.created_at,
            updated_at: _result.updated_at,
          })
        : null;
    } catch (error) {
      this.$_logger.fromError(error, 'Unable to find source', {
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
