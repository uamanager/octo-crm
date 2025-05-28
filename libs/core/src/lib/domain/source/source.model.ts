import { Model } from '../../common/model/model';
import { GithubRepositoryOwnerModel, GithubRepositoryRepositoryModel } from '../github';

export class SourceModel extends Model<SourceModel> {
  id!: string;

  key!: string;

  owner!: GithubRepositoryOwnerModel | null;
  repository!: GithubRepositoryRepositoryModel | null;

  created_at!: Date;
  updated_at!: Date;
}
