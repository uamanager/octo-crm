import {
  IGithubRepositoryOwnerEntity,
  IGithubRepositoryRepositoryEntity,
} from '../github';

export interface ISourceEntity {
  id: string;

  key: string;

  owner: IGithubRepositoryOwnerEntity;
  repository: IGithubRepositoryRepositoryEntity;

  created_at: Date;
  updated_at: Date;
}
