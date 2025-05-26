import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiScope } from './api-scope.decorator';
import { ResponseDto } from '../../response';

export const API_SCOPE_PRIVATE = 'private';

export const PrivateApi = (...extensions: MethodDecorator[]) => {
  return applyDecorators(
    ApiScope(API_SCOPE_PRIVATE, ...extensions),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'Unauthorized Exception. Unauthorized to access this resource.',
      type: ResponseDto,
    }),
  );
};
