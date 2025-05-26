import { RepositoryOwnerType } from './repository.owner.type';
import { Model } from '../../../common/model/model';

export class GithubRepositoryModel extends Model<GithubRepositoryModel> {
  key!: string;
  owner!: GithubRepositoryOwnerModel;
  repository!: GithubRepositoryRepositoryModel;
}

export class GithubRepositoryOwnerModel extends Model<GithubRepositoryOwnerModel> {
  login!: string;
  avatar_url!: string;
  url!: string;
  type!: RepositoryOwnerType;
}

export class GithubRepositoryRepositoryModel extends Model<GithubRepositoryRepositoryModel> {
  name!: string;
  description!: string;
  topics!: string[];
  license!: string;

  private!: boolean;
  template!: boolean;
  archived!: boolean;
  fork!: boolean;

  url!: string;
  stars!: number;
  forks!: number;
  issues!: number;
  watchers!: number;

  created_at!: Date;
  updated_at!: Date;
  pushed_at!: Date;
}
