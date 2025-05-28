import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ServerDomainAuthService } from '@octo-crm/server-domain-auth';
import { API_SCOPE, API_SCOPE_PUBLIC, LoggerHelper } from '@octo-crm/server-core';
import { Request } from 'express';
import { ServerDomainUserService } from '@octo-crm/server-domain-user';

export const AUTHORIZATION_HEADER = 'Authorization';
export const AUTHORIZATION_HEADER_BEARER = 'Bearer';

export const extractTokenFromAuthorizationHeader = (req: Request): string => {
  const _authorizationHeader = req.get(AUTHORIZATION_HEADER);

  if (!_authorizationHeader) {
    return '';
  }

  const [_authorizationHeaderType, _authorizationHeaderValue] =
    _authorizationHeader.split(' ');

  if (_authorizationHeaderType !== AUTHORIZATION_HEADER_BEARER) {
    return '';
  }

  return _authorizationHeaderValue;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly $_logger: LoggerHelper;

  constructor(
    $_logger: Logger,
    private readonly $_reflector: Reflector,
    private readonly $_auth: ServerDomainAuthService,
    private readonly $_user: ServerDomainUserService,
  ) {
    this.$_logger = LoggerHelper.create($_logger, this.constructor.name);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const _scope = this.$_reflector.get<string>(API_SCOPE, context.getHandler());
      const _request = context.switchToHttp().getRequest();

      if (_scope === API_SCOPE_PUBLIC) {
        return true;
      }

      const _token = extractTokenFromAuthorizationHeader(_request);

      const _result = await this.$_auth.verifyToken(_token);

      if (!_result) {
        throw new UnauthorizedException();
      }

      const _session = this.$_auth.getSession();

      const _exists = await this.$_user.exists(_session.sub);

      if (!_exists) {
        throw new UnauthorizedException();
      }

      return true;
    } catch (err) {
      this.$_logger.fromError(err, 'Error while validating JWT');

      throw new UnauthorizedException();
    }
  }
}
