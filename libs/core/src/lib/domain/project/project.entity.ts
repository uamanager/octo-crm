import { EntityRef, OptionalEntityRef } from '../../common/entity';
import { IUserEntity } from '../user';
import { ISourceEntity } from '../source';

export interface IProjectEntity<
  TUser extends EntityRef<IUserEntity>,
  TSource extends OptionalEntityRef<ISourceEntity>,
> {
  id: string;

  key: string;

  user: TUser;
  source: TSource;

  created_at: Date;
  updated_at: Date;
}
