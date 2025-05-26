import { Model } from '../../../common/model/model';

export class UserModel extends Model<UserModel> {
  id!: string;

  email!: string;
  password!: string;

  created_at!: Date;
  updated_at!: Date;
}
