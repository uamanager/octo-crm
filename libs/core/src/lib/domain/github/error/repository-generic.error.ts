import { BaseError } from '../../../common/error/base.error';
import { RequireAtLeastOneOf } from '../../../common/typing';

export class GithubRepositoryGenericError extends BaseError {
  constructor(context: RequireAtLeastOneOf<{ key: string }>) {
    super(`Unable to fetch repository with ${BaseError.mapContext(context)}.`);
  }
}
