import { Injectable, Logger } from '@nestjs/common';
import { LoggerHelper } from '@octo-crm/server-core';
import { CreateUserModel, UserModel, UserRepository } from '@octo-crm/core';

@Injectable()
export class ServerDomainUserService {
  private readonly $_logger: LoggerHelper;

  constructor($_logger: Logger, private readonly $_userRepository: UserRepository) {
    this.$_logger = LoggerHelper.create($_logger, this.constructor.name);
  }

  async createUser(user: CreateUserModel): Promise<UserModel> {
    try {
      return await this.$_userRepository.createUser(user);
    } catch (err) {
      this.$_logger.fromError(err, 'Error while creating user', {
        email: user.email,
      });
      throw err;
    }
  }

  async getUserByEmail(email: string): Promise<UserModel | null> {
    try {
      return await this.$_userRepository.getUserByEmail(email);
    } catch (err) {
      this.$_logger.fromError(err, 'Error while getting user by email', {
        email,
      });
      throw err;
    }
  }
}
