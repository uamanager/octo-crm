import { EntityRef } from '../../common/entity';
import { IUserEntity } from '../user';
import { ISourceEntity } from '../source';

export interface IProjectEntity<
  TUser extends EntityRef<IUserEntity>,
  TSource extends EntityRef<ISourceEntity>,
> {
  id: string;

  key: string;

  user: TUser;
  source: TSource;

  created_at: Date;
  updated_at: Date;
}
