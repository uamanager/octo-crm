import { HashProvider } from '@octo-crm/core';
import { Injectable, Logger } from '@nestjs/common';
import { LoggerHelper } from '@octo-crm/server-core';
import * as argon2 from 'argon2';

@Injectable()
export class ServerInfraArgon2HashProvider implements HashProvider {
  private readonly $_logger: LoggerHelper;

  constructor($_logger: Logger) {
    this.$_logger = LoggerHelper.create($_logger, this.constructor.name);
  }

  async hash(data: string | Buffer): Promise<string> {
    try {
      return await argon2.hash(data);
    } catch (err) {
      this.$_logger.fromError(err);

      throw err;
    }
  }

  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    try {
      return await argon2.verify(encrypted, data);
    } catch (err) {
      this.$_logger.fromError(err);

      throw err;
    }
  }
}
