import { Model } from '../../common/model/model';
import { GithubRepositoryOwnerModel, GithubRepositoryRepositoryModel } from '../github';

export class UpdateSourceModel extends Model<UpdateSourceModel> {
  key!: string;
  owner!: GithubRepositoryOwnerModel;
  repository!: GithubRepositoryRepositoryModel;
}
