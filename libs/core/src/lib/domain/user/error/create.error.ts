import { BaseError } from '../../../common/error/base.error';
import { RequireAtLeastOneOf } from '../../../common/typing';

export class UserCreateError extends BaseError {
  constructor(context: RequireAtLeastOneOf<{ email: string }>) {
    super(`Unable to create ${BaseError.mapContext(context)}.`);
  }
}
