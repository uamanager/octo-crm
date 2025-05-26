import { BaseError } from '../../../common/error/base.error';
import { RequireAtLeastOneOf } from '../../../common/typing';

export class GithubRepositoryNotExistError extends BaseError {
  constructor(context: RequireAtLeastOneOf<{ key: string }>) {
    super(`Repository with ${BaseError.mapContext(context)} does not exist.`);
  }
}
