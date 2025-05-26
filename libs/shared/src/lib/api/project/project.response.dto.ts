import { RepositoryOwnerType } from '@octo-crm/core';

export interface IProjectResponseDto {
  id: string;

  key: string;

  user: string;
  source: IProjectSourceResponseDto | null;

  created_at: Date;
  updated_at: Date;
}

export interface IProjectSourceResponseDto {
  key: string;
  owner: IProjectSourceOwnerResponseDto;
  repository: IProjectSourceRepositoryResponseDto;
}

export interface IProjectSourceOwnerResponseDto {
  login: string;
  avatar_url: string;
  url: string;
  type: RepositoryOwnerType;
}

export interface IProjectSourceRepositoryResponseDto {
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
