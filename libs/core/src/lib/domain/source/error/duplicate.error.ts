import { BaseError } from '../../../common/error/base.error';
import { RequireAtLeastOneOf } from '../../../common/typing';

export class SourceDuplicateError extends BaseError {
  constructor(context: RequireAtLeastOneOf<{ key: string }>) {
    super(`Source with ${BaseError.mapContext(context)} already exists.`);
  }
}
