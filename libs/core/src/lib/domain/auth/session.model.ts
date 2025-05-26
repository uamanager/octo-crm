import { Model } from '../../common/model/model';

export class SessionModel extends Model<SessionModel> {
  sub!: string;
  email!: string;
  iat?: number;
  exp?: number;
  aud?: string;
  iss?: string;
}
