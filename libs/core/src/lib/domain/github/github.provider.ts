import { GithubRepositoryModel } from './model';

export abstract class GithubProvider {
  abstract getRepository(key: string): Promise<GithubRepositoryModel>;
}
