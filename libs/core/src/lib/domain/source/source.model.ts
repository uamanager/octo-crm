import { Model } from '../../common/model/model';
import { GithubRepositoryOwnerModel, GithubRepositoryRepositoryModel } from '../github';

export class SourceModel extends Model<SourceModel> {
  id!: string;

  key!: string;

  owner!: GithubRepositoryOwnerModel;
  repository!: GithubRepositoryRepositoryModel;

  created_at!: Date;
  updated_at!: Date;
}
