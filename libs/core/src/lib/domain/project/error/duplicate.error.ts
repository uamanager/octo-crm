import { BaseError } from '../../../common/error/base.error';
import { RequireAtLeastOneOf } from '../../../common/typing';

export class ProjectDuplicateError extends BaseError {
  constructor(context: RequireAtLeastOneOf<{ key: string }>) {
    super(`Project with ${BaseError.mapContext(context)} already exists.`);
  }
}
