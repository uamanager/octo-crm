import { Model } from '../../../common/model/model';

export class CreateUserModel extends Model<CreateUserModel> {
  email!: string;
  password!: string;
}
