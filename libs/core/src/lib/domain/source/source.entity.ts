import {
  IGithubRepositoryOwnerEntity,
  IGithubRepositoryRepositoryEntity,
} from '../github';

export interface ISourceEntity {
  id: string;

  key: string;

  owner: IGithubRepositoryOwnerEntity | null;
  repository: IGithubRepositoryRepositoryEntity | null;

  created_at: Date;
  updated_at: Date;
}
