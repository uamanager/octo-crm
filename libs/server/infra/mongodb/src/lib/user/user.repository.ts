import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateUserModel,
  UserCreateError,
  UserModel,
  UserRepository,
} from '@octo-crm/core';
import { User } from './user.schema';
import { LoggerHelper } from '@octo-crm/server-core';
import { ObjectId } from 'mongodb';

@Injectable()
export class ServerInfraMongodbUserRepository implements UserRepository {
  private readonly $_logger: LoggerHelper;

  constructor(
    $_logger: Logger,
    @InjectModel(User.name) private readonly _userModel: Model<User>,
  ) {
    this.$_logger = LoggerHelper.create($_logger, this.constructor.name);
  }

  async exists(id: string): Promise<boolean> {
    try {
      const _exists = await this._userModel
        .exists({
          _id: new ObjectId(id),
        })
        .exec();


      console.log('exists', _exists);

      return !!_exists;
    } catch (err) {
      this.$_logger.fromError(err, 'Error while validating user existence', {
        id,
      });

      return false;
    }
  }

  async createUser(user: CreateUserModel): Promise<UserModel> {
    try {
      const _newUser = new this._userModel({
        email: user.email,
        password: user.password,
      });

      const _createdUser = await _newUser.save();

      return new UserModel({
        id: _createdUser.id,
        email: _createdUser.email,
        password: _createdUser.password,
        created_at: _createdUser.created_at,
        updated_at: _createdUser.updated_at,
      });
    } catch (err) {
      this.$_logger.fromError(err, 'Error while creating user', {
        email: user.email,
      });

      throw new UserCreateError({
        email: user.email,
      });
    }
  }

  async getUserByEmail(email: string): Promise<UserModel | null> {
    try {
      const _user = await this._userModel
        .findOne({
          email,
        })
        .exec();

      return _user
        ? new UserModel({
            id: _user.id,
            email: _user.email,
            password: _user.password,
            created_at: _user.created_at,
            updated_at: _user.updated_at,
          })
        : null;
    } catch (err) {
      this.$_logger.fromError(err, 'Error while getting user by email', {
        email,
      });

      return null;
    }
  }
}
