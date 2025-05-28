import { CreateUserModel, UserModel } from './model';

export abstract class UserRepository {
  abstract exists(id: string): Promise<boolean>

  abstract createUser(user: CreateUserModel): Promise<UserModel>;

  abstract getUserByEmail(email: string): Promise<UserModel | null>;
}
