import { Injectable, Logger } from '@nestjs/common';
import { LoggerHelper } from '@octo-crm/server-core';
import { HashProvider, SessionModel } from '@octo-crm/core';
import { JwtService } from '@nestjs/jwt';
import { ClsService } from 'nestjs-cls';

export const SESSION_CONTEXT_KEY = 'SESSION_CONTEXT';

@Injectable()
export class ServerDomainAuthService {
  private readonly $_logger: LoggerHelper;

  constructor(
    $_logger: Logger,
    private readonly $_cls: ClsService,
    private readonly $_jwt: JwtService,
    private readonly $_hashProvider: HashProvider,
  ) {
    this.$_logger = LoggerHelper.create($_logger, this.constructor.name);
  }

  async verifyToken(token: string) {
    try {
      const _decoded = await this.$_jwt.verifyAsync<SessionModel>(token);

      this.setSession(_decoded);

      return !!_decoded;
    } catch (err) {
      this.$_logger.fromError(err, 'Error while validating token');

      throw err;
    }
  }

  async signToken(session: SessionModel): Promise<string> {
    try {
      this.setSession(session);

      return await this.$_jwt.signAsync({
        sub: session.sub,
        email: session.email,
      });
    } catch (err) {
      this.$_logger.fromError(err, 'Error while signing token');

      throw err;
    }
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return await this.$_hashProvider.hash(password);
    } catch (err) {
      this.$_logger.fromError(err, 'Error while hashing password');

      throw err;
    }
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await this.$_hashProvider.compare(password, hashedPassword);
    } catch (err) {
      this.$_logger.fromError(err, 'Error while comparing password');

      throw err;
    }
  }

  getSession() {
    const _session = this.$_cls.get(SESSION_CONTEXT_KEY);
    return new SessionModel(_session);
  }

  setSession(session: SessionModel) {
    this.$_cls.set(SESSION_CONTEXT_KEY, new SessionModel(session));
  }
}
