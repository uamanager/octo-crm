import { applyDecorators } from '@nestjs/common';
import { ApiScope } from './api-scope.decorator';

export const API_SCOPE_PUBLIC = 'public';

export const PublicApi = (...extensions: MethodDecorator[]) =>
  applyDecorators(ApiScope(API_SCOPE_PUBLIC, ...extensions));
