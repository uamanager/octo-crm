import { CanActivate, Provider, Type } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

export const provideAppGuard = (
  guard: Type<CanActivate>,
): Provider<CanActivate> => {
  return {
    provide: APP_GUARD,
    useClass: guard,
  };
};
