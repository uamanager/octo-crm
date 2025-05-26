import { applyDecorators, SetMetadata } from '@nestjs/common';

export const API_SCOPE = 'API_SCOPE';

export const ApiScope = (scope: string, ...extensions: MethodDecorator[]) =>
  applyDecorators(SetMetadata(API_SCOPE, scope), ...(extensions ?? []));
