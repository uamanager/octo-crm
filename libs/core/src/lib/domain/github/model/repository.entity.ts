import { RepositoryOwnerType } from './repository.owner.type';

export interface IGithubRepositoryEntity {
  key: string;
  owner: IGithubRepositoryOwnerEntity;
  repository: IGithubRepositoryRepositoryEntity;
}

export interface IGithubRepositoryOwnerEntity {
  login: string;
  avatar_url: string;
  url: string;
  type: RepositoryOwnerType;
}

export interface IGithubRepositoryRepositoryEntity {
  name: string;
  description: string;
  topics: string[];
  license: string;

  private: boolean;
  template: boolean;
  archived: boolean;
  fork: boolean;

  url: string;
  stars: number;
  forks: number;
  issues: number;
  watchers: number;

  created_at: Date;
  updated_at: Date;
  pushed_at: Date;
}
