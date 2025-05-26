import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { LoggerHelper } from '@octo-crm/server-core';
import { AuthSignInRequestDtoBody } from './dto/sigh-in.request.dto';
import { AuthSignUpRequestDtoBody } from './dto/sigh-up.request.dto';
import { CreateUserModel, ErrorMapper, SessionModel } from '@octo-crm/core';
import { ServerDomainAuthService } from '@octo-crm/server-domain-auth';
import { ServerDomainUserService } from '@octo-crm/server-domain-user';
import { AuthSignUpResponseDto } from './dto/sigh-up.response.dto';
import { AuthSignInResponseDto } from './dto/sigh-in.response.dto';

@Injectable()
export class ServerApiAuthService {
  private readonly $_logger: LoggerHelper;

  constructor(
    $_logger: Logger,
    private readonly $_auth: ServerDomainAuthService,
    private readonly $_user: ServerDomainUserService,
  ) {
    this.$_logger = LoggerHelper.create($_logger, this.constructor.name);
  }

  async signIn(body: AuthSignInRequestDtoBody): Promise<AuthSignInResponseDto> {
    try {
      const _user = await this.$_user.getUserByEmail(body.email);

      if (!_user) {
        throw new Error('User with this email does not exist.');
      }

      const _passwordMatches = await this.$_auth.comparePassword(
        body.password,
        _user.password,
      );

      if (!_passwordMatches) {
        throw new Error('Password does not match.');
      }

      const _sessionModel = new SessionModel({
        sub: _user.id,
        email: _user.email,
      });

      const _token = await this.$_auth.signToken(_sessionModel);

      return AuthSignInResponseDto.fromResult({
        access_token: _token,
      });
    } catch (err) {
      this.$_logger.fromError(err, 'Error while signing in', {
        email: body.email,
      });

      throw ErrorMapper.map(err as Error, {
        [ErrorMapper.DEFAULT_ERROR_CASE]: ErrorMapper.override(
          new BadRequestException(
            'Sign-in failed. Please try again or use a different email.',
          ),
        ),
      });
    }
  }

  async signUp(body: AuthSignUpRequestDtoBody): Promise<AuthSignUpResponseDto> {
    try {
      const _hashedPassword = await this.$_auth.hashPassword(body.password);

      const _createUserModel = new CreateUserModel({
        email: body.email,
        password: _hashedPassword,
      });

      await this.$_user.createUser(_createUserModel);

      return AuthSignUpResponseDto.fromResult(undefined);
    } catch (err) {
      this.$_logger.fromError(err, 'Error while signing up', {
        email: body.email,
      });

      throw ErrorMapper.map(err as Error, {
        [ErrorMapper.DEFAULT_ERROR_CASE]: ErrorMapper.override(
          new BadRequestException(
            'Sign-up failed. Please try again or use a different email.',
          ),
        ),
      });
    }
  }
}
