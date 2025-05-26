import { Model } from '../../../common/model';
import { SourceModel } from '../../source';

export class ProjectModel extends Model<ProjectModel> {
  id!: string;

  key!: string;

  user!: string;
  source!: SourceModel | null;

  created_at!: Date;
  updated_at!: Date;
}
